import math
from typing import Dict, Any

class WaterfallCalculator:
    """
    Waterfall Calculator
    
    This class calculates the waterfall distribution of returns between GPs and LPs.
    """
    
    def calculate_waterfall(
        self,
        total_profit: float,
        hurdle_rate: float,
        catchup_rate: float,
        carried_interest_rate: float,
        lp_investment: float,
        gp_investment: float,
        investment_term: int
    ) -> Dict[str, float]:
        """
        Calculate the waterfall distribution
        
        Args:
            total_profit: Total profit
            hurdle_rate: Hurdle rate as a decimal
            catchup_rate: Catch-up rate as a decimal
            carried_interest_rate: Carried interest rate as a decimal
            lp_investment: LP investment amount
            gp_investment: GP investment amount
            investment_term: Investment term in years
            
        Returns:
            Waterfall distribution
        """
        total_investment = lp_investment + gp_investment
        lp_ratio = lp_investment / total_investment if total_investment > 0 else 0
        gp_ratio = gp_investment / total_investment if total_investment > 0 else 0
        
        # Step 1: Return of capital
        lp_return_of_capital = lp_investment
        gp_return_of_capital = gp_investment
        
        # Step 2: Preferred return (hurdle)
        hurdle_amount = lp_investment * (math.pow(1 + hurdle_rate, investment_term) - 1)
        
        # Remaining profit after return of capital and hurdle
        remaining_profit = total_profit - hurdle_amount
        
        # Step 3: GP catch-up (if applicable)
        gp_catchup = 0
        if catchup_rate > 0 and remaining_profit > 0:
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
