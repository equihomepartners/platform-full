from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class SimulationLoan(BaseModel):
    """
    Simulation Loan Model
    
    This model represents a loan in the portfolio.
    """
    id: str = Field(..., description="Unique identifier for the loan")
    property_value: float = Field(..., description="Property value in USD")
    loan_amount: float = Field(..., description="Loan amount in USD")
    ltv: float = Field(..., description="Loan-to-Value ratio")
    zone: str = Field(..., description="Zone classification (green, orange, red)")
    exit_year: int = Field(..., description="Year of loan exit")
    appreciation_rate: float = Field(..., description="Annual appreciation rate")
    origination_year: int = Field(..., description="Year of loan origination")
    will_exit_early: bool = Field(..., description="Whether the loan will exit early")
    will_be_reinvested: bool = Field(..., description="Whether the loan will be reinvested")
    origination_fee: float = Field(..., description="Origination fee in USD")
    interest_rate: float = Field(..., description="Annual interest rate")
    expected_exit_value: float = Field(..., description="Expected exit value in USD")
    reinvested_from: Optional[str] = Field(None, description="ID of the loan this was reinvested from")

class PortfolioMetrics(BaseModel):
    """
    Portfolio Metrics Model
    
    This model represents the metrics for a portfolio.
    """
    initial_loans: int = Field(..., description="Number of initial loans")
    total_reinvestments: int = Field(..., description="Number of reinvestment loans")
    total_loans: int = Field(..., description="Total number of loans")
    average_loan_size: float = Field(..., description="Average loan size in USD")
    average_ltv: float = Field(..., description="Average Loan-to-Value ratio")
    weighted_appreciation: float = Field(..., description="Weighted average appreciation rate")
    extended_term: int = Field(..., description="Extended term in years")
    total_initial_value: float = Field(..., description="Total initial value in USD")
    total_reinvestment_value: float = Field(..., description="Total reinvestment value in USD")
    expected_irr: float = Field(..., description="Expected IRR")
    expected_multiple: float = Field(..., description="Expected equity multiple")

class Portfolio(BaseModel):
    """
    Portfolio Model
    
    This model represents a portfolio of loans.
    """
    loans: List[SimulationLoan] = Field(..., description="List of loans")
    reinvestments: List[SimulationLoan] = Field(..., description="List of reinvestment loans")
    metrics: PortfolioMetrics = Field(..., description="Portfolio metrics")

class PortfolioGeneration(BaseModel):
    """
    Portfolio Generation Model
    
    This model represents the parameters for portfolio generation.
    """
    num_loans: int = Field(default=400, description="Number of loans to generate")
    ltv_variance: float = Field(default=0.1, description="Variance in LTV ratios")
    property_value_variance: float = Field(default=0.2, description="Variance in property values")
    appreciation_rate_green: float = Field(default=0.05, description="Annual appreciation rate for green zone")
    appreciation_rate_orange: float = Field(default=0.03, description="Annual appreciation rate for orange zone")
    appreciation_rate_red: float = Field(default=0.01, description="Annual appreciation rate for red zone")
    
    class Config:
        schema_extra = {
            "example": {
                "num_loans": 400,
                "ltv_variance": 0.1,
                "property_value_variance": 0.2,
                "appreciation_rate_green": 0.05,
                "appreciation_rate_orange": 0.03,
                "appreciation_rate_red": 0.01
            }
        }
