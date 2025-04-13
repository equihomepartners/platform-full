"""
Simulation Calculator - Python Implementation

This module provides advanced financial calculations for the Equihome fund model.
It implements complex calculations that are more efficiently handled in Python.
"""

import math
import json
from typing import Dict, List, Any, Optional, Union, Tuple


class SimulationCalculator:
    """
    Python implementation of the simulation calculator for Equihome's fund model.
    This class provides more advanced financial calculations than the JavaScript version.
    """

    @staticmethod
    def calculate_loan_exit_value(loan: Dict[str, Any], fund_settings: Dict[str, Any]) -> float:
        """
        Calculate the exit value of a loan.

        Args:
            loan: A dictionary containing loan details
            fund_settings: A dictionary containing fund settings

        Returns:
            The exit value of the loan
        """
        # Calculate years held
        years_held = loan["exit_year"] - loan["origination_year"]

        # Calculate property appreciation with compound interest formula
        appreciated_property_value = SimulationCalculator.calculate_compound_interest(
            loan["property_value"],
            loan["appreciation_rate"],
            years_held,
            1  # Annual compounding
        )

        # Calculate simple interest on the loan amount
        interest = SimulationCalculator.calculate_simple_interest(
            loan["loan_amount"],
            fund_settings.get("simple_interest_rate", 0.05),
            years_held
        )

        # Calculate appreciation fee (LTV% of appreciation)
        property_appreciation = appreciated_property_value - loan["property_value"]
        appreciation_fee = property_appreciation * loan["ltv"]

        # Calculate total exit value
        exit_value = loan["loan_amount"] + interest + appreciation_fee

        return exit_value

    @staticmethod
    def calculate_simple_interest(principal: float, rate: float, time: float) -> float:
        """
        Calculate simple interest.

        Args:
            principal: Principal amount
            rate: Interest rate as a decimal
            time: Time in years

        Returns:
            Interest amount
        """
        return principal * rate * time

    @staticmethod
    def calculate_compound_interest(
        principal: float, rate: float, time: float, compounding_per_year: int = 1
    ) -> float:
        """
        Calculate compound interest.

        Args:
            principal: Principal amount
            rate: Interest rate as a decimal
            time: Time in years
            compounding_per_year: Number of times interest is compounded per year

        Returns:
            Future value with compound interest
        """
        return principal * math.pow(1 + rate / compounding_per_year, compounding_per_year * time)

    @staticmethod
    def calculate_irr(cash_flows: List[float], max_iterations: int = 1000, tolerance: float = 1e-7) -> float:
        """
        Calculate the internal rate of return (IRR) for a series of cash flows.

        Args:
            cash_flows: List of cash flows (negative for outflows, positive for inflows)
            max_iterations: Maximum number of iterations for the calculation
            tolerance: Tolerance for convergence

        Returns:
            IRR as a decimal
        """
        # Check if there are at least one negative and one positive cash flow
        has_negative = any(cf < 0 for cf in cash_flows)
        has_positive = any(cf > 0 for cf in cash_flows)

        if not has_negative or not has_positive:
            print("IRR calculation requires at least one negative and one positive cash flow")
            return 0

        # Newton-Raphson method for IRR calculation
        guess = 0.1  # Initial guess

        for _ in range(max_iterations):
            npv = 0
            derivative_npv = 0

            for t, cf in enumerate(cash_flows):
                denominator = math.pow(1 + guess, t)
                npv += cf / denominator
                derivative_npv -= t * cf / (denominator * (1 + guess))

            # Check if we're close enough to zero
            if abs(npv) < tolerance:
                return guess

            # Update guess using Newton-Raphson formula
            if derivative_npv == 0:
                break

            new_guess = guess - npv / derivative_npv

            # Check for convergence
            if abs(new_guess - guess) < tolerance:
                return new_guess

            # Prevent negative rates or extreme values
            if new_guess <= -0.99 or not math.isfinite(new_guess):
                # Fall back to a bisection method
                return SimulationCalculator.fallback_irr(cash_flows)

            guess = new_guess

        # If we didn't converge, fall back to a more robust method
        return SimulationCalculator.fallback_irr(cash_flows)

    @staticmethod
    def fallback_irr(cash_flows: List[float]) -> float:
        """
        Fallback method for IRR calculation using bisection.

        Args:
            cash_flows: List of cash flows

        Returns:
            IRR as a decimal
        """
        # Bisection method for IRR
        lower_bound = -0.99  # Can't go below -100%
        upper_bound = 1.0    # Start with 100% as upper bound

        # Expand upper bound if needed
        while SimulationCalculator.calculate_npv(cash_flows, upper_bound) > 0:
            upper_bound *= 2
            if upper_bound > 100:
                # Extremely high IRR, cap it
                return 1.0

        tolerance = 1e-7
        max_iterations = 100

        for _ in range(max_iterations):
            midpoint = (lower_bound + upper_bound) / 2
            npv_at_midpoint = SimulationCalculator.calculate_npv(cash_flows, midpoint)

            if abs(npv_at_midpoint) < tolerance:
                return midpoint

            if npv_at_midpoint > 0:
                lower_bound = midpoint
            else:
                upper_bound = midpoint

            if upper_bound - lower_bound < tolerance:
                return midpoint

        # Return the midpoint as our best guess
        return (lower_bound + upper_bound) / 2

    @staticmethod
    def calculate_npv(cash_flows: List[float], rate: float) -> float:
        """
        Calculate the net present value (NPV) of cash flows.

        Args:
            cash_flows: List of cash flows
            rate: Discount rate as a decimal

        Returns:
            NPV
        """
        npv = 0
        for t, cf in enumerate(cash_flows):
            npv += cf / math.pow(1 + rate, t)
        return npv

    @staticmethod
    def calculate_waterfall(
        total_profit: float,
        hurdle_rate: float,
        carried_interest_rate: float,
        lp_investment: float,
        gp_investment: float,
        investment_term: float
    ) -> Dict[str, float]:
        """
        Calculate the waterfall distribution.

        Args:
            total_profit: Total profit
            hurdle_rate: Hurdle rate as a decimal
            carried_interest_rate: Carried interest rate as a decimal
            lp_investment: LP investment amount
            gp_investment: GP investment amount
            investment_term: Investment term in years

        Returns:
            Dictionary containing waterfall distribution details
        """
        total_investment = lp_investment + gp_investment
        lp_ratio = lp_investment / total_investment
        gp_ratio = gp_investment / total_investment

        # Step 1: Return of capital
        lp_return_of_capital = lp_investment
        gp_return_of_capital = gp_investment

        # Step 2: Preferred return (hurdle)
        hurdle_amount = lp_investment * (math.pow(1 + hurdle_rate, investment_term) - 1)

        # Remaining profit after return of capital and hurdle
        remaining_profit = total_profit - hurdle_amount

        # Step 3: GP catch-up (if applicable)
        gp_catchup = 0
        if remaining_profit > 0:
            # Calculate catch-up amount
            catchup_amount = (hurdle_amount * carried_interest_rate) / (1 - carried_interest_rate)
            gp_catchup = min(remaining_profit, catchup_amount)
            remaining_profit -= gp_catchup

        # Step 4: Carried interest split
        gp_carried_interest = 0
        lp_residual = 0

        if remaining_profit > 0:
            gp_carried_interest = remaining_profit * carried_interest_rate
            lp_residual = remaining_profit * (1 - carried_interest_rate)

        # Calculate total returns
        total_gp_return = gp_return_of_capital + gp_catchup + gp_carried_interest + (gp_ratio * hurdle_amount)
        total_lp_return = lp_return_of_capital + hurdle_amount + lp_residual

        return {
            "lp_return_of_capital": lp_return_of_capital,
            "gp_return_of_capital": gp_return_of_capital,
            "hurdle_amount": hurdle_amount,
            "gp_catchup": gp_catchup,
            "gp_carried_interest": gp_carried_interest,
            "lp_residual": lp_residual,
            "total_gp_return": total_gp_return,
            "total_lp_return": total_lp_return
        }

    @staticmethod
    def run_simulation(params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Run a full simulation with the given parameters.

        Args:
            params: Dictionary containing simulation parameters

        Returns:
            Dictionary containing simulation results
        """
        # Extract parameters with defaults
        fund_settings = {
            "fund_size": params.get("fund_size", 100000000),
            "fund_term": params.get("fund_term", 10),
            "simple_interest_rate": params.get("simple_interest_rate", 0.05),
            "origination_fee_rate": params.get("origination_fee_rate", 0.03),
            "management_fee_rate": params.get("management_fee_rate", 0.02),
            "performance_fee_rate": params.get("performance_fee_rate", 0.20),
            "hurdle_rate": params.get("hurdle_rate", 0.06),
            "gp_investment_percentage": params.get("gp_investment_percentage", 0.05),
            "average_property_value": params.get("average_property_value", 1000000),
            "average_ltv": params.get("average_ltv", 0.40),
            "average_appreciation_rate": params.get("average_appreciation_rate", 0.04),
            "average_exit_timeframe": params.get("average_exit_timeframe", 7) # When homeowners exit through sale or refinance
        }

        # Generate a simple portfolio
        average_loan_amount = fund_settings["average_property_value"] * fund_settings["average_ltv"]
        num_loans = int(fund_settings["fund_size"] / average_loan_amount)

        # Calculate GP and LP investments
        gp_investment = fund_settings["fund_size"] * fund_settings["gp_investment_percentage"]
        lp_investment = fund_settings["fund_size"] - gp_investment

        # Initialize yearly cash flows (year 0 is initial investment)
        yearly_flows = [0] * (fund_settings["fund_term"] + 1)
        yearly_flows[0] = -fund_settings["fund_size"]  # Initial investment (negative cash flow)

        # Calculate origination fees (positive cash flow in year 0)
        total_loan_amount = average_loan_amount * num_loans
        origination_fees = total_loan_amount * fund_settings["origination_fee_rate"]
        yearly_flows[0] += origination_fees

        # Calculate yearly management fees
        annual_management_fee = fund_settings["fund_size"] * fund_settings["management_fee_rate"]

        # Create a sample loan for exit value calculation
        sample_loan = {
            "loan_amount": average_loan_amount,
            "property_value": fund_settings["average_property_value"],
            "ltv": fund_settings["average_ltv"],
            "origination_year": 0,
            "exit_year": fund_settings["average_exit_timeframe"], # When homeowner exits through sale or refinance
            "appreciation_rate": fund_settings["average_appreciation_rate"]
        }

        # Calculate exit value for the sample loan
        sample_exit_value = SimulationCalculator.calculate_loan_exit_value(sample_loan, fund_settings)

        # Calculate loan exits and their impact on cash flows
        # For simplicity, we'll assume all loans exit at the average loan term
        exit_year = min(fund_settings["average_exit_timeframe"], fund_settings["fund_term"]) # When homeowners exit through sale or refinance
        total_exit_value = sample_exit_value * num_loans
        yearly_flows[exit_year] += total_exit_value

        # Subtract management fees from each year (except year 0)
        for year in range(1, fund_settings["fund_term"] + 1):
            yearly_flows[year] -= annual_management_fee

        # Calculate fund metrics
        total_investment = fund_settings["fund_size"]
        total_return = sum(max(flow, 0) for flow in yearly_flows)
        total_profit = total_return - total_investment

        # Calculate IRR
        irr = SimulationCalculator.calculate_irr(yearly_flows)

        # Calculate equity multiple
        equity_multiple = total_return / total_investment if total_investment > 0 else 0

        # Calculate ROI
        roi = total_profit / total_investment if total_investment > 0 else 0

        # Calculate waterfall distribution
        waterfall = SimulationCalculator.calculate_waterfall(
            total_profit,
            fund_settings["hurdle_rate"],
            fund_settings["performance_fee_rate"],
            lp_investment,
            gp_investment,
            fund_settings["fund_term"]
        )

        # Calculate yearly NAV (simplified)
        yearly_nav = [0] * (fund_settings["fund_term"] + 1)
        yearly_nav[0] = fund_settings["fund_size"]

        for year in range(1, fund_settings["fund_term"] + 1):
            yearly_nav[year] = yearly_nav[year - 1]

            # Add interest accrual (simplified)
            if year < exit_year:
                interest_accrual = total_loan_amount * fund_settings["simple_interest_rate"]
                yearly_nav[year] += interest_accrual

                # Add property appreciation (for appreciation fee calculation)
                appreciation_accrual = fund_settings["average_property_value"] * num_loans * fund_settings["average_appreciation_rate"] * fund_settings["average_ltv"]
                yearly_nav[year] += appreciation_accrual

            # Subtract management fee
            yearly_nav[year] -= annual_management_fee

            # Add/subtract cash flows
            yearly_nav[year] += yearly_flows[year]

        # Calculate GP economics
        gp_economics = {
            "investment": gp_investment,
            "management_fees": annual_management_fee * fund_settings["fund_term"],
            "origination_fees": origination_fees,
            "catchup": waterfall["gp_catchup"],
            "carried_interest": waterfall["gp_carried_interest"],
            "total_return": waterfall["total_gp_return"] + origination_fees + (annual_management_fee * fund_settings["fund_term"]),
            "roi": 0  # Calculated below
        }

        gp_economics["roi"] = (gp_economics["total_return"] - gp_investment) / gp_investment if gp_investment > 0 else 0

        # Calculate LP economics
        lp_economics = {
            "investment": lp_investment,
            "preferred_return": waterfall["hurdle_amount"],
            "residual": waterfall["lp_residual"],
            "total_return": waterfall["total_lp_return"],
            "roi": (waterfall["total_lp_return"] - lp_investment) / lp_investment if lp_investment > 0 else 0
        }

        # Prepare sample loan exit details
        loan_exit_result = {
            "loan": sample_loan,
            "years_held": sample_loan["exit_year"] - sample_loan["origination_year"],
            "appreciated_property_value": SimulationCalculator.calculate_compound_interest(
                sample_loan["property_value"],
                sample_loan["appreciation_rate"],
                sample_loan["exit_year"] - sample_loan["origination_year"]
            ),
            "interest": SimulationCalculator.calculate_simple_interest(
                sample_loan["loan_amount"],
                fund_settings["simple_interest_rate"],
                sample_loan["exit_year"] - sample_loan["origination_year"]
            ),
            "exit_value": sample_exit_value
        }

        loan_exit_result["property_appreciation"] = loan_exit_result["appreciated_property_value"] - sample_loan["property_value"]
        loan_exit_result["appreciation_fee"] = loan_exit_result["property_appreciation"] * sample_loan["ltv"]

        # Return the simulation results
        return {
            "fund_size": fund_settings["fund_size"],
            "num_loans": num_loans,
            "gp_investment": gp_investment,
            "lp_investment": lp_investment,
            "total_loan_return": total_exit_value,
            "origination_fees": origination_fees,
            "total_management_fees": annual_management_fee * fund_settings["fund_term"],
            "total_return": total_return,
            "total_profit": total_profit,
            "irr": irr,
            "equity_multiple": equity_multiple,
            "roi": roi,
            "yearly_cash_flows": yearly_flows,
            "yearly_nav": yearly_nav,
            "gp_economics": gp_economics,
            "lp_economics": lp_economics,
            "loan_exit_result": loan_exit_result
        }


# If this script is run directly, perform a test simulation
if __name__ == "__main__":
    # Run a test simulation with default parameters
    result = SimulationCalculator.run_simulation({})

    # Print the results
    print(json.dumps(result, indent=2))
