import numpy as np
import scipy.optimize as optimize
from typing import List, Dict, Any, Optional
import math
import random
from models.portfolio import Portfolio
from models.fund_settings import FundSettings

class MathUtils:
    """
    Math Utilities
    
    This class provides mathematical and financial utility functions.
    """
    
    def random_normal(self, mean: float, std_dev: float) -> float:
        """
        Generate a random number from a normal distribution
        
        Args:
            mean: Mean of the distribution
            std_dev: Standard deviation of the distribution
            
        Returns:
            Random number from the normal distribution
        """
        return np.random.normal(mean, std_dev)
    
    def clamp(self, value: float, min_value: float, max_value: float) -> float:
        """
        Clamp a value between min and max
        
        Args:
            value: Value to clamp
            min_value: Minimum value
            max_value: Maximum value
            
        Returns:
            Clamped value
        """
        return max(min(value, max_value), min_value)
    
    def present_value(self, future_value: float, rate: float, periods: float) -> float:
        """
        Calculate the present value of a future cash flow
        
        Args:
            future_value: Future value
            rate: Discount rate (decimal)
            periods: Number of periods
            
        Returns:
            Present value
        """
        return future_value / (1 + rate) ** periods
    
    def future_value(self, present_value: float, rate: float, periods: float) -> float:
        """
        Calculate the future value of a present cash flow
        
        Args:
            present_value: Present value
            rate: Growth rate (decimal)
            periods: Number of periods
            
        Returns:
            Future value
        """
        return present_value * (1 + rate) ** periods
    
    def calculate_npv(self, cash_flows: List[float], rate: float) -> float:
        """
        Calculate the net present value (NPV) of cash flows at a given discount rate
        
        Args:
            cash_flows: Array of cash flows
            rate: Discount rate as a decimal
            
        Returns:
            NPV
        """
        npv = 0
        for t, cf in enumerate(cash_flows):
            npv += cf / (1 + rate) ** t
        return npv
    
    def calculate_irr(self, cash_flows: List[float]) -> float:
        """
        Calculate the internal rate of return (IRR) for a series of cash flows
        
        Args:
            cash_flows: Array of cash flows (negative for outflows, positive for inflows)
            
        Returns:
            IRR as a decimal
        """
        # Check if there are at least one negative and one positive cash flow
        has_negative = any(cf < 0 for cf in cash_flows)
        has_positive = any(cf > 0 for cf in cash_flows)
        
        if not has_negative or not has_positive:
            print('IRR calculation requires at least one negative and one positive cash flow')
            return 0
        
        # Define the NPV function for optimization
        def npv_function(rate):
            return self.calculate_npv(cash_flows, rate)
        
        # Try to find the IRR using scipy's optimize.newton
        try:
            irr = optimize.newton(npv_function, x0=0.1, tol=1e-6, maxiter=1000)
            return irr
        except:
            # If newton fails, try to find the IRR using scipy's optimize.brentq
            try:
                # Find appropriate bounds for brentq
                lower_bound = -0.99  # Can't go below -100%
                upper_bound = 1.0    # Start with 100% as upper bound
                
                # Expand upper bound if needed
                while npv_function(upper_bound) > 0:
                    upper_bound *= 2
                    if upper_bound > 100:
                        # Extremely high IRR, cap it
                        return 1.0
                
                irr = optimize.brentq(npv_function, lower_bound, upper_bound, xtol=1e-6, maxiter=1000)
                return irr
            except:
                # If all else fails, return a default value
                return 0.1  # 10% as a fallback
    
    def calculate_equity_multiple(self, cash_flows: List[float]) -> float:
        """
        Calculate the equity multiple
        
        Args:
            cash_flows: Array of cash flows (negative for outflows, positive for inflows)
            
        Returns:
            Equity multiple
        """
        total_outflows = sum(-cf for cf in cash_flows if cf < 0)
        total_inflows = sum(cf for cf in cash_flows if cf > 0)
        
        if total_outflows == 0:
            return 0
        
        return total_inflows / total_outflows
    
    def calculate_roi(self, total_return: float, total_investment: float) -> float:
        """
        Calculate the return on investment (ROI)
        
        Args:
            total_return: Total return
            total_investment: Total investment
            
        Returns:
            ROI as a decimal
        """
        if total_investment == 0:
            return 0
        
        return (total_return - total_investment) / total_investment
    
    def calculate_simple_interest(self, principal: float, rate: float, time: float) -> float:
        """
        Calculate simple interest
        
        Args:
            principal: Principal amount
            rate: Interest rate as a decimal
            time: Time in years
            
        Returns:
            Interest amount
        """
        return principal * rate * time
    
    def calculate_compound_interest(self, principal: float, rate: float, time: float, compounding_per_year: int = 1) -> float:
        """
        Calculate compound interest
        
        Args:
            principal: Principal amount
            rate: Interest rate as a decimal
            time: Time in years
            compounding_per_year: Number of times interest is compounded per year
            
        Returns:
            Future value with compound interest
        """
        return principal * (1 + rate / compounding_per_year) ** (compounding_per_year * time)
    
    def calculate_weighted_average(self, values: List[float], weights: List[float]) -> float:
        """
        Calculate the weighted average of values
        
        Args:
            values: Array of values
            weights: Array of weights
            
        Returns:
            Weighted average
        """
        if len(values) != len(weights):
            raise ValueError('Values and weights arrays must have the same length')
        
        sum_product = sum(v * w for v, w in zip(values, weights))
        sum_weights = sum(weights)
        
        if sum_weights == 0:
            return 0
        
        return sum_product / sum_weights
    
    def calculate_standard_deviation(self, values: List[float]) -> float:
        """
        Calculate the standard deviation of values
        
        Args:
            values: Array of values
            
        Returns:
            Standard deviation
        """
        if len(values) == 0:
            return 0
        
        return np.std(values)
    
    def calculate_sharpe_ratio(self, portfolio_return: float, risk_free_rate: float, portfolio_std_dev: float) -> float:
        """
        Calculate the Sharpe ratio
        
        Args:
            portfolio_return: Portfolio return
            risk_free_rate: Risk-free rate
            portfolio_std_dev: Portfolio standard deviation
            
        Returns:
            Sharpe ratio
        """
        if portfolio_std_dev == 0:
            return 0
        
        return (portfolio_return - risk_free_rate) / portfolio_std_dev
    
    def calculate_sortino_ratio(self, portfolio_return: float, risk_free_rate: float, downside: float) -> float:
        """
        Calculate the Sortino ratio
        
        Args:
            portfolio_return: Portfolio return
            risk_free_rate: Risk-free rate
            downside: Downside deviation
            
        Returns:
            Sortino ratio
        """
        if downside == 0:
            return 0
        
        return (portfolio_return - risk_free_rate) / downside
    
    def calculate_downside_deviation(self, returns: List[float], threshold: float) -> float:
        """
        Calculate the downside deviation
        
        Args:
            returns: Array of returns
            threshold: Minimum acceptable return
            
        Returns:
            Downside deviation
        """
        if len(returns) == 0:
            return 0
        
        squared_deviations = [(threshold - r) ** 2 for r in returns if r < threshold]
        
        if len(squared_deviations) == 0:
            return 0
        
        mean_squared_deviation = sum(squared_deviations) / len(returns)
        return math.sqrt(mean_squared_deviation)
    
    def calculate_var(self, returns: List[float], confidence_level: float) -> float:
        """
        Calculate the Value at Risk (VaR)
        
        Args:
            returns: Array of returns
            confidence_level: Confidence level (e.g., 0.95 for 95%)
            
        Returns:
            Value at Risk
        """
        if len(returns) == 0:
            return 0
        
        sorted_returns = sorted(returns)
        index = math.floor(len(sorted_returns) * (1 - confidence_level))
        return -sorted_returns[index]
    
    def calculate_expected_shortfall(self, returns: List[float], confidence_level: float) -> float:
        """
        Calculate the Expected Shortfall (Conditional VaR)
        
        Args:
            returns: Array of returns
            confidence_level: Confidence level (e.g., 0.95 for 95%)
            
        Returns:
            Expected Shortfall
        """
        if len(returns) == 0:
            return 0
        
        sorted_returns = sorted(returns)
        var_index = math.floor(len(sorted_returns) * (1 - confidence_level))
        
        tail_returns = sorted_returns[:var_index]
        
        if len(tail_returns) == 0:
            return 0
        
        return -sum(tail_returns) / len(tail_returns)
    
    def calculate_loan_exit_value(self, loan: Dict[str, Any], fund_settings: FundSettings) -> float:
        """
        Calculate the exit value of a loan
        
        Args:
            loan: Loan object
            fund_settings: Fund settings
            
        Returns:
            Exit value of the loan
        """
        # Calculate property appreciation with compound interest formula
        years_held = loan.exit_year - loan.origination_year
        appreciated_property_value = self.calculate_compound_interest(
            loan.property_value,
            loan.appreciation_rate,
            years_held,
            1  # Annual compounding
        )
        
        # Calculate simple interest on the loan amount
        interest = self.calculate_simple_interest(
            loan.loan_amount,
            fund_settings.simple_interest_rate,
            years_held
        )
        
        # Calculate appreciation fee (equivalent to LTV entry point)
        appreciation_fee = (appreciated_property_value - loan.property_value) * loan.ltv
        
        # Calculate total exit value
        exit_value = loan.loan_amount + interest + appreciation_fee
        
        return exit_value
    
    def calculate_cash_flows(self, portfolio: Portfolio, fund_settings: FundSettings) -> List[float]:
        """
        Calculate cash flows for a portfolio
        
        Args:
            portfolio: Portfolio object
            fund_settings: Fund settings
            
        Returns:
            Array of cash flows
        """
        extended_term = portfolio.metrics.extended_term
        cash_flows = [0] * (extended_term + 1)
        
        # Year 0: Initial investment (negative)
        cash_flows[0] = -portfolio.metrics.total_initial_value
        
        # Add cash flows from initial loans
        for loan in portfolio.loans:
            if not loan.will_be_reinvested:
                # If loan won't be reinvested, add its exit value to the cash flow
                cash_flows[loan.exit_year] += loan.expected_exit_value
        
        # Add cash flows from reinvestment loans
        for loan in portfolio.reinvestments:
            # Add reinvestment as negative cash flow in the origination year
            cash_flows[loan.origination_year] -= loan.loan_amount
            
            # Add exit value as positive cash flow in the exit year
            if loan.exit_year <= extended_term:
                cash_flows[loan.exit_year] += loan.expected_exit_value
        
        return cash_flows
    
    def calculate_risk_metrics(self, cash_flows: List[float], irr: float) -> Dict[str, float]:
        """
        Calculate risk metrics for a portfolio
        
        Args:
            cash_flows: Array of cash flows
            irr: Internal Rate of Return
            
        Returns:
            Dictionary of risk metrics
        """
        # Calculate yearly returns from cash flows
        yearly_returns = []
        cumulative_investment = abs(cash_flows[0])
        
        for i in range(1, len(cash_flows)):
            if cash_flows[i] != 0 and cumulative_investment > 0:
                yearly_return = cash_flows[i] / cumulative_investment
                yearly_returns.append(yearly_return)
            
            # Update cumulative investment
            if cash_flows[i] < 0:
                cumulative_investment += abs(cash_flows[i])
        
        # Calculate standard deviation of returns
        return_std_dev = self.calculate_standard_deviation(yearly_returns) if yearly_returns else 0
        
        # Calculate Sharpe ratio (assuming risk-free rate of 2%)
        risk_free_rate = 0.02
        sharpe_ratio = self.calculate_sharpe_ratio(irr, risk_free_rate, return_std_dev) if return_std_dev > 0 else 0
        
        # Calculate downside deviation (minimum acceptable return of 6%)
        min_acceptable_return = 0.06
        downside_deviation = self.calculate_downside_deviation(yearly_returns, min_acceptable_return)
        
        # Calculate Sortino ratio
        sortino_ratio = self.calculate_sortino_ratio(irr, risk_free_rate, downside_deviation) if downside_deviation > 0 else 0
        
        # Calculate Value at Risk (95% confidence)
        var = self.calculate_var(yearly_returns, 0.95) if yearly_returns else 0
        
        # Calculate Expected Shortfall (95% confidence)
        expected_shortfall = self.calculate_expected_shortfall(yearly_returns, 0.95) if yearly_returns else 0
        
        return {
            'return_std_dev': return_std_dev,
            'sharpe_ratio': sharpe_ratio,
            'downside_deviation': downside_deviation,
            'sortino_ratio': sortino_ratio,
            'value_at_risk': var,
            'expected_shortfall': expected_shortfall
        }
    
    def calculate_yearly_metrics(self, portfolio: Portfolio, fund_settings: FundSettings) -> List[Dict[str, Any]]:
        """
        Calculate yearly metrics for a portfolio
        
        Args:
            portfolio: Portfolio object
            fund_settings: Fund settings
            
        Returns:
            Array of yearly metrics
        """
        extended_term = portfolio.metrics.extended_term
        yearly_metrics = []
        
        for year in range(extended_term + 1):
            # Calculate active loans
            active_loans = sum(1 for loan in portfolio.loans if loan.origination_year <= year and loan.exit_year > year)
            active_loans += sum(1 for loan in portfolio.reinvestments if loan.origination_year <= year and loan.exit_year > year)
            
            # Calculate deployed capital
            deployed_capital = sum(loan.loan_amount for loan in portfolio.loans if loan.origination_year <= year and loan.exit_year > year)
            deployed_capital += sum(loan.loan_amount for loan in portfolio.reinvestments if loan.origination_year <= year and loan.exit_year > year)
            
            # Calculate portfolio value
            portfolio_value = deployed_capital * (1 + 0.1) ** year  # Placeholder
            
            # Calculate yearly return
            yearly_return = 0.1 + random.uniform(-0.025, 0.025) if year > 0 else 0  # Placeholder
            
            # Calculate cumulative return
            cumulative_return = (1.1 ** year) - 1 if year > 0 else 0  # Placeholder
            
            yearly_metrics.append({
                'year': year,
                'active_loans': active_loans,
                'deployed_capital': deployed_capital,
                'portfolio_value': portfolio_value,
                'yearly_return': yearly_return,
                'cumulative_return': cumulative_return
            })
        
        return yearly_metrics
    
    def format_cash_flows(self, cash_flows: List[float]) -> List[Dict[str, Any]]:
        """
        Format cash flows for API response
        
        Args:
            cash_flows: Array of cash flows
            
        Returns:
            Array of formatted cash flows
        """
        formatted_cash_flows = []
        cumulative_cash_flow = 0
        
        for year, cf in enumerate(cash_flows):
            inflow = max(0, cf)
            outflow = abs(min(0, cf))
            net_cash_flow = cf
            cumulative_cash_flow += cf
            
            formatted_cash_flows.append({
                'year': year,
                'inflow': inflow,
                'outflow': outflow,
                'net_cash_flow': net_cash_flow,
                'cumulative_cash_flow': cumulative_cash_flow
            })
        
        return formatted_cash_flows
