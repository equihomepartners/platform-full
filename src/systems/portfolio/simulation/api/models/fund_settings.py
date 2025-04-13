from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class FundSettings(BaseModel):
    """
    Fund Settings Model
    
    This model represents the settings for a fund simulation.
    """
    # Fund Information
    fund_name: str = Field(default="Equihome Fund I", description="Name of the fund")
    fund_size: float = Field(default=100000000, description="Total size of the fund in USD")
    fund_term: int = Field(default=10, description="Duration of the fund in years")
    fund_type: str = Field(default="closed", description="Type of fund (closed/open)")
    vintage_year: int = Field(default=datetime.now().year, description="Year the fund was established")
    time_horizon: int = Field(default=10, description="Investment time horizon in years")
    
    # Fee Structure
    management_fee_rate: float = Field(default=0.02, description="Annual management fee as percentage")
    hurdle_rate: float = Field(default=0.06, description="Minimum return to LPs before carried interest")
    performance_fee_rate: float = Field(default=0.20, description="Carried interest percentage")
    origination_fee_rate: float = Field(default=0.03, description="Loan origination fee percentage")
    simple_interest_rate: float = Field(default=0.05, description="Annual interest rate on loans")
    gp_investment_percentage: float = Field(default=0.05, description="GP's investment as percentage of fund size")
    
    # Capital Calls
    capital_call_schedule: str = Field(default="custom", description="Schedule type for capital calls")
    initial_investment: float = Field(default=25000000, description="Initial capital call amount")
    call1_date: int = Field(default=0, description="Months after fund inception for call 1")
    call1_amount: float = Field(default=25000000, description="Amount for capital call 1")
    call2_date: int = Field(default=3, description="Months after fund inception for call 2")
    call2_amount: float = Field(default=25000000, description="Amount for capital call 2")
    call3_date: int = Field(default=6, description="Months after fund inception for call 3")
    call3_amount: float = Field(default=25000000, description="Amount for capital call 3")
    call4_date: int = Field(default=9, description="Months after fund inception for call 4")
    call4_amount: float = Field(default=25000000, description="Amount for capital call 4")
    
    # Loan Parameters
    average_property_value: float = Field(default=500000, description="Average property value in USD")
    average_ltv: float = Field(default=0.5, description="Average Loan-to-Value ratio")
    max_ltv: float = Field(default=0.75, description="Maximum Loan-to-Value ratio")
    green_zone_allocation: float = Field(default=0.6, description="Allocation to green zone properties")
    orange_zone_allocation: float = Field(default=0.3, description="Allocation to orange zone properties")
    red_zone_allocation: float = Field(default=0.1, description="Allocation to red zone properties")
    early_exit_probability: float = Field(default=0.1, description="Probability of early loan exit")
    average_exit_year: float = Field(default=5, description="Average year of loan exit")
    exit_year_std_dev: float = Field(default=1.5, description="Standard deviation of exit years")
    reinvestment_cap_year: int = Field(default=5, description="Last year for reinvestment")
    
    class Config:
        schema_extra = {
            "example": {
                "fund_name": "Equihome Fund I",
                "fund_size": 100000000,
                "fund_term": 10,
                "fund_type": "closed",
                "vintage_year": 2023,
                "time_horizon": 10,
                "management_fee_rate": 0.02,
                "hurdle_rate": 0.06,
                "performance_fee_rate": 0.20,
                "origination_fee_rate": 0.03,
                "simple_interest_rate": 0.05,
                "gp_investment_percentage": 0.05,
                "capital_call_schedule": "custom",
                "initial_investment": 25000000,
                "call1_date": 0,
                "call1_amount": 25000000,
                "call2_date": 3,
                "call2_amount": 25000000,
                "call3_date": 6,
                "call3_amount": 25000000,
                "call4_date": 9,
                "call4_amount": 25000000,
                "average_property_value": 500000,
                "average_ltv": 0.5,
                "max_ltv": 0.75,
                "green_zone_allocation": 0.6,
                "orange_zone_allocation": 0.3,
                "red_zone_allocation": 0.1,
                "early_exit_probability": 0.1,
                "average_exit_year": 5,
                "exit_year_std_dev": 1.5,
                "reinvestment_cap_year": 5
            }
        }
