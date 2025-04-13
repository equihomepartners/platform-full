from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from .fund_settings import FundSettings
from .portfolio import Portfolio

class OptimalAllocation(BaseModel):
    """
    Optimal Allocation Model
    
    This model represents an optimal allocation for a suburb.
    """
    suburb: str = Field(..., description="Suburb name")
    allocation: float = Field(..., description="Allocation percentage")
    expected_return: float = Field(..., description="Expected return percentage")
    risk_score: float = Field(..., description="Risk score")
    zone: str = Field(..., description="Zone classification (green, orange, red)")

class SimulationResults(BaseModel):
    """
    Simulation Results Model
    
    This model represents the results of a simulation.
    """
    irr: float = Field(..., description="Internal Rate of Return percentage")
    gross_irr: float = Field(..., description="Gross Internal Rate of Return percentage")
    equity_multiple: float = Field(..., description="Equity multiple")
    moic: float = Field(..., description="Multiple on Invested Capital")
    total_investment: float = Field(..., description="Total investment in USD")
    total_return: float = Field(..., description="Total return in USD")
    net_profit: float = Field(..., description="Net profit in USD")
    roi: float = Field(..., description="Return on Investment percentage")
    risk_score: Optional[float] = Field(None, description="Risk score")
    dpi: float = Field(..., description="Distributions to Paid-In")
    rvpi: float = Field(..., description="Residual Value to Paid-In")
    tvpi: float = Field(..., description="Total Value to Paid-In")
    sharpe_ratio: float = Field(..., description="Sharpe ratio")
    sortino_ratio: float = Field(..., description="Sortino ratio")
    value_at_risk: float = Field(..., description="Value at Risk")
    expected_shortfall: float = Field(..., description="Expected Shortfall")
    optimal_allocation: Optional[List[OptimalAllocation]] = Field(None, description="Optimal allocation by suburb")

class GPEconomics(BaseModel):
    """
    GP Economics Model
    
    This model represents the economics for the General Partner.
    """
    gp_investment: float = Field(..., description="GP investment in USD")
    management_fees: float = Field(..., description="Management fees in USD")
    carried_interest: float = Field(..., description="Carried interest in USD")
    gp_irr: float = Field(..., description="GP Internal Rate of Return percentage")
    gp_multiple: float = Field(..., description="GP equity multiple")
    gp_roi: float = Field(..., description="GP Return on Investment percentage")

class LPEconomics(BaseModel):
    """
    LP Economics Model
    
    This model represents the economics for the Limited Partner.
    """
    lp_investment: float = Field(..., description="LP investment in USD")
    preferred_return: float = Field(..., description="Preferred return in USD")
    lp_irr: float = Field(..., description="LP Internal Rate of Return percentage")
    lp_multiple: float = Field(..., description="LP equity multiple")
    lp_roi: float = Field(..., description="LP Return on Investment percentage")

class YearlyMetric(BaseModel):
    """
    Yearly Metric Model
    
    This model represents metrics for a specific year.
    """
    year: int = Field(..., description="Year")
    active_loans: int = Field(..., description="Number of active loans")
    deployed_capital: float = Field(..., description="Deployed capital in USD")
    portfolio_value: float = Field(..., description="Portfolio value in USD")
    yearly_return: float = Field(..., description="Yearly return percentage")
    cumulative_return: float = Field(..., description="Cumulative return percentage")

class CashFlow(BaseModel):
    """
    Cash Flow Model
    
    This model represents a cash flow for a specific year.
    """
    year: int = Field(..., description="Year")
    inflow: float = Field(..., description="Cash inflow in USD")
    outflow: float = Field(..., description="Cash outflow in USD")
    net_cash_flow: float = Field(..., description="Net cash flow in USD")
    cumulative_cash_flow: float = Field(..., description="Cumulative cash flow in USD")

class TFSIntegration(BaseModel):
    """
    TFS Integration Model
    
    This model represents the integration with the Traffic Light System.
    """
    integrated: bool = Field(..., description="Whether TFS data is integrated")
    suburbs_count: int = Field(..., description="Number of suburbs in TFS data")
    zone_distribution: Dict[str, str] = Field(..., description="Distribution of zones")
    timestamp: str = Field(..., description="Timestamp of integration")

class SimulationResult(BaseModel):
    """
    Simulation Result Model
    
    This model represents the result of a simulation.
    """
    id: str = Field(..., description="Unique identifier for the simulation")
    timestamp: str = Field(..., description="Timestamp of the simulation")
    status: str = Field(..., description="Status of the simulation")
    duration_ms: int = Field(..., description="Duration of the simulation in milliseconds")
    parameters: Dict[str, Any] = Field(..., description="Simulation parameters")
    results: SimulationResults = Field(..., description="Simulation results")
    gp_economics: GPEconomics = Field(..., description="GP economics")
    lp_economics: LPEconomics = Field(..., description="LP economics")
    yearly_metrics: List[YearlyMetric] = Field(..., description="Yearly metrics")
    cash_flows: List[CashFlow] = Field(..., description="Cash flows")
    tfs_integration: Optional[TFSIntegration] = Field(None, description="TFS integration")

class SimulationParams(BaseModel):
    """
    Simulation Parameters Model
    
    This model represents the parameters for a simulation.
    """
    portfolio: Optional[Portfolio] = Field(None, description="Portfolio")
    fund_settings: Optional[FundSettings] = Field(None, description="Fund settings")
    tfs_data: Optional[Dict[str, Any]] = Field(None, description="TFS data")
    
    class Config:
        schema_extra = {
            "example": {
                "portfolio": None,
                "fund_settings": None,
                "tfs_data": None
            }
        }
