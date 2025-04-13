"""
FastAPI service for the Simulation Calculator

This module provides a REST API for the Python implementation of the simulation calculator.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Any, Optional
import uvicorn
import json

from simulation_calculator import SimulationCalculator

app = FastAPI(
    title="Equihome Simulation Calculator API",
    description="API for the Equihome fund simulation calculator",
    version="1.0.0"
)

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    """Health check endpoint to verify the API is running"""
    return {"status": "ok", "message": "Python simulation API is running"}

class SimulationParams(BaseModel):
    """
    Parameters for running a simulation
    """
    fund_size: Optional[float] = 100000000
    fund_term: Optional[int] = 10
    simple_interest_rate: Optional[float] = 0.05
    origination_fee_rate: Optional[float] = 0.03
    management_fee_rate: Optional[float] = 0.02
    performance_fee_rate: Optional[float] = 0.20
    hurdle_rate: Optional[float] = 0.06
    gp_investment_percentage: Optional[float] = 0.05
    average_property_value: Optional[float] = 1000000
    average_ltv: Optional[float] = 0.40
    average_appreciation_rate: Optional[float] = 0.04
    average_exit_timeframe: Optional[int] = 7  # When homeowners exit through sale or refinance

class LoanParams(BaseModel):
    """
    Parameters for a loan
    """
    loan_amount: float
    property_value: float
    ltv: float
    origination_year: int
    exit_year: int
    appreciation_rate: float

class WaterfallParams(BaseModel):
    """
    Parameters for waterfall calculation
    """
    total_profit: float
    hurdle_rate: float
    carried_interest_rate: float
    lp_investment: float
    gp_investment: float
    investment_term: float

@app.get("/")
async def root():
    """
    Root endpoint
    """
    return {
        "message": "Welcome to the Equihome Simulation Calculator API",
        "version": "1.0.0"
    }

@app.post("/api/simulation/run")
async def run_simulation(params: SimulationParams):
    """
    Run a simulation with the given parameters
    """
    try:
        result = SimulationCalculator.run_simulation(params.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/simulation/loan-exit-value")
async def calculate_loan_exit_value(loan: LoanParams, fund_settings: SimulationParams):
    """
    Calculate the exit value of a loan
    """
    try:
        result = SimulationCalculator.calculate_loan_exit_value(
            loan.dict(),
            fund_settings.dict()
        )
        return {"exit_value": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/simulation/waterfall")
async def calculate_waterfall(params: WaterfallParams):
    """
    Calculate the waterfall distribution
    """
    try:
        result = SimulationCalculator.calculate_waterfall(
            params.total_profit,
            params.hurdle_rate,
            params.carried_interest_rate,
            params.lp_investment,
            params.gp_investment,
            params.investment_term
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/simulation/irr")
async def calculate_irr(cash_flows: List[float]):
    """
    Calculate the internal rate of return (IRR) for a series of cash flows
    """
    try:
        result = SimulationCalculator.calculate_irr(cash_flows)
        return {"irr": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
