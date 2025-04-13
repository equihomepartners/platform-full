import numpy as np
import random
import uuid
from typing import List, Dict, Any, Optional
from models.portfolio import Portfolio, SimulationLoan, PortfolioMetrics, PortfolioGeneration
from models.fund_settings import FundSettings
from services.math_utils import MathUtils

class PortfolioGenerator:
    """
    Portfolio Generator

    This class generates portfolios for simulation.
    """

    def __init__(self):
        """
        Initialize the portfolio generator
        """
        self.math_utils = MathUtils()

    def generate_portfolio(self, params: PortfolioGeneration, fund_settings: FundSettings) -> Portfolio:
        """
        Generate a portfolio based on parameters and fund settings

        Args:
            params: Portfolio generation parameters
            fund_settings: Fund settings

        Returns:
            Generated portfolio
        """
        # Calculate number of loans if not specified
        num_loans = params.num_loans
        if num_loans <= 0:
            num_loans = int(fund_settings.fund_size / (fund_settings.average_property_value * fund_settings.average_ltv))

        # Generate initial loans
        loans = self.generate_loans(
            num_loans=num_loans,
            average_property_value=fund_settings.average_property_value,
            property_value_variance=params.property_value_variance,
            average_ltv=fund_settings.average_ltv,
            ltv_variance=params.ltv_variance,
            max_ltv=fund_settings.max_ltv,
            green_zone_allocation=fund_settings.green_zone_allocation,
            orange_zone_allocation=fund_settings.orange_zone_allocation,
            red_zone_allocation=fund_settings.red_zone_allocation,
            appreciation_rate_green=params.appreciation_rate_green,
            appreciation_rate_orange=params.appreciation_rate_orange,
            appreciation_rate_red=params.appreciation_rate_red,
            early_exit_probability=fund_settings.early_exit_probability,
            average_exit_year=fund_settings.average_exit_year,
            exit_year_std_dev=fund_settings.exit_year_std_dev,
            reinvestment_cap_year=fund_settings.reinvestment_cap_year,
            origination_fee_rate=fund_settings.origination_fee_rate,
            simple_interest_rate=fund_settings.simple_interest_rate
        )

        # Generate reinvestments
        reinvestments = self.generate_reinvestments(
            loans=loans,
            fund_settings=fund_settings,
            params=params
        )

        # Calculate portfolio metrics
        metrics = self.calculate_portfolio_metrics(
            loans=loans,
            reinvestments=reinvestments,
            fund_settings=fund_settings
        )

        # Create portfolio
        portfolio = Portfolio(
            loans=loans,
            reinvestments=reinvestments,
            metrics=metrics
        )

        return portfolio

    def generate_loans(
        self,
        num_loans: int,
        average_property_value: float,
        property_value_variance: float,
        average_ltv: float,
        ltv_variance: float,
        max_ltv: float,
        green_zone_allocation: float,
        orange_zone_allocation: float,
        red_zone_allocation: float,
        appreciation_rate_green: float,
        appreciation_rate_orange: float,
        appreciation_rate_red: float,
        early_exit_probability: float,
        average_exit_year: float,
        exit_year_std_dev: float,
        reinvestment_cap_year: int,
        origination_fee_rate: float,
        simple_interest_rate: float
    ) -> List[SimulationLoan]:
        """
        Generate loans for a portfolio

        Args:
            num_loans: Number of loans to generate
            average_property_value: Average property value
            property_value_variance: Variance in property values
            average_ltv: Average Loan-to-Value ratio
            ltv_variance: Variance in LTV ratios
            max_ltv: Maximum Loan-to-Value ratio
            green_zone_allocation: Allocation to green zone properties
            orange_zone_allocation: Allocation to orange zone properties
            red_zone_allocation: Allocation to red zone properties
            appreciation_rate_green: Annual appreciation rate for green zone
            appreciation_rate_orange: Annual appreciation rate for orange zone
            appreciation_rate_red: Annual appreciation rate for red zone
            early_exit_probability: Probability of early loan exit
            average_exit_year: Average year of loan exit
            exit_year_std_dev: Standard deviation of exit years
            reinvestment_cap_year: Last year for reinvestment
            origination_fee_rate: Loan origination fee percentage
            simple_interest_rate: Annual interest rate on loans

        Returns:
            List of generated loans
        """
        loans = []

        for i in range(num_loans):
            # Determine zone based on allocation percentages
            zone_rand = random.random()
            if zone_rand < green_zone_allocation:
                zone = "green"
                appreciation_rate = appreciation_rate_green
            elif zone_rand < green_zone_allocation + orange_zone_allocation:
                zone = "orange"
                appreciation_rate = appreciation_rate_orange
            else:
                zone = "red"
                appreciation_rate = appreciation_rate_red

            # Generate property value using normal distribution around average
            property_value = max(100000, self.math_utils.random_normal(
                average_property_value,
                average_property_value * property_value_variance
            ))

            # Generate LTV using normal distribution around average
            ltv = self.math_utils.clamp(
                self.math_utils.random_normal(average_ltv, ltv_variance),
                0.1,
                max_ltv
            )

            # Calculate loan amount
            loan_amount = property_value * ltv

            # Determine exit year using a more realistic distribution around average exit year
            # Use a truncated normal distribution centered around the average exit year
            # with a standard deviation that scales with the average exit year

            # Generate a random exit year from normal distribution
            raw_exit_year = self.math_utils.random_normal(
                average_exit_year,
                exit_year_std_dev if exit_year_std_dev > 0 else (average_exit_year * 0.3)  # Default to 30% of avg if not specified
            )

            # Clamp the exit year between 1 and 2x the average (or 10, whichever is less)
            min_exit = 1  # Minimum 1 year
            max_exit = min(average_exit_year * 2, 10)  # Cap at 10 years or 2x average

            # Round to nearest year and clamp
            exit_year = max(min_exit, min(max_exit, round(raw_exit_year)))

            # Determine if loan will exit early
            will_exit_early = random.random() < early_exit_probability

            # Determine if loan will be reinvested
            will_be_reinvested = exit_year <= reinvestment_cap_year

            # Calculate origination fee
            origination_fee = loan_amount * origination_fee_rate

            # Calculate expected exit value
            years_held = exit_year
            appreciated_property_value = self.math_utils.calculate_compound_interest(
                property_value,
                appreciation_rate,
                years_held,
                1  # Annual compounding
            )
            interest = self.math_utils.calculate_simple_interest(
                loan_amount,
                simple_interest_rate,
                years_held
            )
            appreciation_fee = (appreciated_property_value - property_value) * ltv
            expected_exit_value = loan_amount + interest + appreciation_fee

            # Create loan
            loan = SimulationLoan(
                id=f"loan_{i + 1}",
                property_value=property_value,
                loan_amount=loan_amount,
                ltv=ltv,
                zone=zone,
                exit_year=exit_year,
                appreciation_rate=appreciation_rate,
                origination_year=0,
                will_exit_early=will_exit_early,
                will_be_reinvested=will_be_reinvested,
                origination_fee=origination_fee,
                interest_rate=simple_interest_rate,
                expected_exit_value=expected_exit_value
            )

            loans.append(loan)

        return loans

    def generate_reinvestments(
        self,
        loans: List[SimulationLoan],
        fund_settings: FundSettings,
        params: PortfolioGeneration
    ) -> List[SimulationLoan]:
        """
        Generate reinvestment loans

        Args:
            loans: List of initial loans
            fund_settings: Fund settings
            params: Portfolio generation parameters

        Returns:
            List of reinvestment loans
        """
        reinvestments = []

        # Find loans that will be reinvested
        reinvestment_candidates = [loan for loan in loans if loan.will_be_reinvested]

        for i, loan in enumerate(reinvestment_candidates):
            # Use exit value as new loan amount
            new_loan_amount = loan.expected_exit_value

            # Calculate new property value based on LTV
            new_property_value = new_loan_amount / fund_settings.average_ltv

            # Determine zone based on allocation percentages
            zone_rand = random.random()
            if zone_rand < fund_settings.green_zone_allocation:
                zone = "green"
                appreciation_rate = params.appreciation_rate_green
            elif zone_rand < fund_settings.green_zone_allocation + fund_settings.orange_zone_allocation:
                zone = "orange"
                appreciation_rate = params.appreciation_rate_orange
            else:
                zone = "red"
                appreciation_rate = params.appreciation_rate_red

            # Set exit year to fund term
            exit_year = fund_settings.fund_term

            # Calculate origination fee
            origination_fee = new_loan_amount * fund_settings.origination_fee_rate

            # Calculate expected exit value
            years_held = exit_year - loan.exit_year
            appreciated_property_value = self.math_utils.calculate_compound_interest(
                new_property_value,
                appreciation_rate,
                years_held,
                1  # Annual compounding
            )
            interest = self.math_utils.calculate_simple_interest(
                new_loan_amount,
                fund_settings.simple_interest_rate,
                years_held
            )
            appreciation_fee = (appreciated_property_value - new_property_value) * fund_settings.average_ltv
            expected_exit_value = new_loan_amount + interest + appreciation_fee

            # Create reinvestment loan
            reinvestment = SimulationLoan(
                id=f"reinv_loan_{i + 1}",
                property_value=new_property_value,
                loan_amount=new_loan_amount,
                ltv=fund_settings.average_ltv,
                zone=zone,
                exit_year=exit_year,
                appreciation_rate=appreciation_rate,
                origination_year=loan.exit_year,
                will_exit_early=False,
                will_be_reinvested=False,
                origination_fee=origination_fee,
                interest_rate=fund_settings.simple_interest_rate,
                expected_exit_value=expected_exit_value,
                reinvested_from=loan.id
            )

            reinvestments.append(reinvestment)

        return reinvestments

    def calculate_portfolio_metrics(
        self,
        loans: List[SimulationLoan],
        reinvestments: List[SimulationLoan],
        fund_settings: FundSettings
    ) -> PortfolioMetrics:
        """
        Calculate portfolio metrics

        Args:
            loans: List of initial loans
            reinvestments: List of reinvestment loans
            fund_settings: Fund settings

        Returns:
            Portfolio metrics
        """
        # Calculate basic metrics
        initial_loans = len(loans)
        total_reinvestments = len(reinvestments)
        total_loans = initial_loans + total_reinvestments

        # Calculate average loan size
        total_loan_amount = sum(loan.loan_amount for loan in loans)
        average_loan_size = total_loan_amount / initial_loans if initial_loans > 0 else 0

        # Calculate average LTV
        total_ltv = sum(loan.ltv for loan in loans)
        average_ltv = total_ltv / initial_loans if initial_loans > 0 else 0

        # Calculate weighted appreciation
        total_weighted_appreciation = sum(loan.loan_amount * loan.appreciation_rate for loan in loans)
        weighted_appreciation = total_weighted_appreciation / total_loan_amount if total_loan_amount > 0 else 0

        # Calculate extended term
        extended_term = fund_settings.fund_term

        # Calculate total initial value
        total_initial_value = total_loan_amount

        # Calculate total reinvestment value
        total_reinvestment_value = sum(loan.loan_amount for loan in reinvestments)

        # Calculate expected IRR
        # This is a placeholder - actual IRR calculation would be more complex
        expected_irr = 0.143

        # Calculate expected multiple
        # This is a placeholder - actual multiple calculation would be more complex
        expected_multiple = 2.4

        # Create portfolio metrics
        metrics = PortfolioMetrics(
            initial_loans=initial_loans,
            total_reinvestments=total_reinvestments,
            total_loans=total_loans,
            average_loan_size=average_loan_size,
            average_ltv=average_ltv,
            weighted_appreciation=weighted_appreciation,
            extended_term=extended_term,
            total_initial_value=total_initial_value,
            total_reinvestment_value=total_reinvestment_value,
            expected_irr=expected_irr,
            expected_multiple=expected_multiple
        )

        return metrics
