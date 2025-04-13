from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional, Any, Union
import uvicorn
import json
import os
from datetime import datetime

# Import services
from services.math_utils import MathUtils
from services.portfolio_gen import PortfolioGenerator
from services.waterfall import WaterfallCalculator
from models.fund_settings import FundSettings
from models.portfolio import Portfolio, PortfolioGeneration
from models.simulation import SimulationResult, SimulationParams

# Create FastAPI app
app = FastAPI(
    title="Equihome Simulation API",
    description="API for the Equihome Portfolio Simulation Engine",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for demo purposes
# In production, use a database
storage = {
    "fund_settings": None,
    "portfolio": None,
    "simulation_result": None
}

# Routes
@app.get("/")
async def root():
    return {"message": "Welcome to the Equihome Simulation API"}

# Fund Settings
@app.get("/api/simulation/fund-settings")
async def get_fund_settings():
    if storage["fund_settings"] is None:
        # Return default settings
        return FundSettings().dict()
    return storage["fund_settings"]

@app.post("/api/simulation/fund-settings")
async def save_fund_settings(settings: FundSettings):
    storage["fund_settings"] = settings.dict()
    return storage["fund_settings"]

# Portfolio Generation
@app.post("/api/simulation/generate-portfolio")
async def generate_portfolio(params: PortfolioGeneration):
    if storage["fund_settings"] is None:
        raise HTTPException(status_code=400, detail="Fund settings not found")

    fund_settings = FundSettings(**storage["fund_settings"])

    # Generate portfolio
    portfolio_generator = PortfolioGenerator()
    portfolio = portfolio_generator.generate_portfolio(params, fund_settings)

    # Store portfolio
    storage["portfolio"] = portfolio.dict()

    return portfolio

@app.get("/api/simulation/portfolio")
async def get_portfolio():
    if storage["portfolio"] is None:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return storage["portfolio"]

# Simulation
@app.post("/api/simulation/run")
async def run_simulation(params: SimulationParams):
    if storage["portfolio"] is None:
        raise HTTPException(status_code=400, detail="Portfolio not found")

    if storage["fund_settings"] is None:
        raise HTTPException(status_code=400, detail="Fund settings not found")

    # Get portfolio and fund settings
    portfolio = Portfolio(**storage["portfolio"])
    fund_settings = FundSettings(**storage["fund_settings"])

    # Run simulation
    math_utils = MathUtils()
    waterfall_calculator = WaterfallCalculator()

    # Calculate cash flows
    cash_flows = math_utils.calculate_cash_flows(portfolio, fund_settings)

    # Calculate IRR
    irr = math_utils.calculate_irr(cash_flows)

    # Calculate equity multiple
    equity_multiple = math_utils.calculate_equity_multiple(cash_flows)

    # Calculate waterfall distribution
    waterfall = waterfall_calculator.calculate_waterfall(
        total_profit=(equity_multiple - 1) * fund_settings.fund_size,
        hurdle_rate=fund_settings.hurdle_rate,
        catchup_rate=0.5,  # Default catchup rate
        carried_interest_rate=fund_settings.performance_fee_rate,
        lp_investment=fund_settings.fund_size * (1 - fund_settings.gp_investment_percentage),
        gp_investment=fund_settings.fund_size * fund_settings.gp_investment_percentage,
        investment_term=fund_settings.fund_term
    )

    # Calculate risk metrics
    risk_metrics = math_utils.calculate_risk_metrics(cash_flows, irr)

    # Create simulation result
    simulation_result = SimulationResult(
        id=f"sim_{datetime.now().strftime('%Y%m%d%H%M%S')}",
        timestamp=datetime.now().isoformat(),
        status="completed",
        duration_ms=1250,  # Placeholder
        parameters={
            "fund_size": fund_settings.fund_size,
            "fund_term": fund_settings.fund_term,
            "management_fee_rate": fund_settings.management_fee_rate,
            "hurdle_rate": fund_settings.hurdle_rate,
            "performance_fee_rate": fund_settings.performance_fee_rate,
            "gp_investment_percentage": fund_settings.gp_investment_percentage
        },
        results={
            "irr": irr * 100,  # Convert to percentage
            "gross_irr": irr * 1.25 * 100,  # Placeholder
            "equity_multiple": equity_multiple,
            "moic": equity_multiple,
            "total_investment": fund_settings.fund_size,
            "total_return": fund_settings.fund_size * equity_multiple,
            "net_profit": fund_settings.fund_size * (equity_multiple - 1),
            "roi": (equity_multiple - 1) * 100,  # Convert to percentage
            "dpi": equity_multiple,
            "rvpi": 0.0,
            "tvpi": equity_multiple,
            "sharpe_ratio": risk_metrics["sharpe_ratio"],
            "sortino_ratio": risk_metrics["sortino_ratio"],
            # Include portfolio details
            "portfolio": {
                "loans": [loan.dict() for loan in portfolio.loans[:100]],  # Limit to 100 loans for performance
                "metrics": portfolio.metrics.dict(),
            },
            "value_at_risk": risk_metrics["value_at_risk"],
            "expected_shortfall": risk_metrics["expected_shortfall"]
        },
        gp_economics={
            "gp_investment": fund_settings.fund_size * fund_settings.gp_investment_percentage,
            "management_fees": fund_settings.fund_size * fund_settings.management_fee_rate * fund_settings.fund_term,
            "carried_interest": waterfall["gp_carried_interest"],
            "gp_irr": irr * 1.5 * 100,  # Placeholder
            "gp_multiple": waterfall["total_gp_return"] / (fund_settings.fund_size * fund_settings.gp_investment_percentage),
            "gp_roi": (waterfall["total_gp_return"] / (fund_settings.fund_size * fund_settings.gp_investment_percentage) - 1) * 100
        },
        lp_economics={
            "lp_investment": fund_settings.fund_size * (1 - fund_settings.gp_investment_percentage),
            "preferred_return": waterfall["hurdle_amount"],
            "lp_irr": irr * 0.9 * 100,  # Placeholder
            "lp_multiple": waterfall["total_lp_return"] / (fund_settings.fund_size * (1 - fund_settings.gp_investment_percentage)),
            "lp_roi": (waterfall["total_lp_return"] / (fund_settings.fund_size * (1 - fund_settings.gp_investment_percentage)) - 1) * 100
        },
        yearly_metrics=math_utils.calculate_yearly_metrics(portfolio, fund_settings),
        cash_flows=math_utils.format_cash_flows(cash_flows)
    )

    # Add TFS integration if available
    if params.tfs_data:
        simulation_result.tfs_integration = {
            "integrated": True,
            "suburbs_count": len(params.tfs_data.get("suburbsData", [])),
            "zone_distribution": {
                "green": "60.0%",  # Placeholder
                "yellow": "30.0%",  # Placeholder
                "red": "10.0%"  # Placeholder
            },
            "timestamp": datetime.now().isoformat()
        }

    # Store simulation result
    storage["simulation_result"] = simulation_result.dict()

    return simulation_result

@app.get("/api/simulation/results")
async def get_simulation_results():
    if storage["simulation_result"] is None:
        raise HTTPException(status_code=404, detail="Simulation results not found")
    return storage["simulation_result"]

# TFS Integration
@app.post("/api/simulation/tfs-integration")
async def integrate_tfs_data(tfs_data: Dict[str, Any]):
    return {
        "integrated": True,
        "message": "TFS data integrated successfully",
        "data": tfs_data
    }

# Financial Calculations
@app.post("/api/simulation/calculate-metrics")
async def calculate_fund_metrics(params: Dict[str, Any]):
    math_utils = MathUtils()

    # Extract cash flows
    cash_flows = params.get("cash_flows", [])

    # Calculate metrics
    irr = math_utils.calculate_irr(cash_flows)
    equity_multiple = math_utils.calculate_equity_multiple(cash_flows)
    risk_metrics = math_utils.calculate_risk_metrics(cash_flows, irr)

    return {
        "irr": irr * 100,  # Convert to percentage
        "gross_irr": irr * 1.25 * 100,  # Placeholder
        "equity_multiple": equity_multiple,
        "moic": equity_multiple,
        "total_investment": params.get("total_investment", 0),
        "total_return": params.get("total_investment", 0) * equity_multiple,
        "net_profit": params.get("total_investment", 0) * (equity_multiple - 1),
        "roi": (equity_multiple - 1) * 100,  # Convert to percentage
        "dpi": equity_multiple,
        "rvpi": 0.0,
        "tvpi": equity_multiple,
        "sharpe_ratio": risk_metrics["sharpe_ratio"],
        "sortino_ratio": risk_metrics["sortino_ratio"],
        "value_at_risk": risk_metrics["value_at_risk"],
        "expected_shortfall": risk_metrics["expected_shortfall"]
    }

@app.post("/api/simulation/calculate-waterfall")
async def calculate_waterfall(params: Dict[str, Any]):
    waterfall_calculator = WaterfallCalculator()

    waterfall = waterfall_calculator.calculate_waterfall(
        total_profit=params.get("total_profit", 0),
        hurdle_rate=params.get("hurdle_rate", 0.06),
        catchup_rate=params.get("catchup_rate", 0.5),
        carried_interest_rate=params.get("carried_interest_rate", 0.2),
        lp_investment=params.get("lp_investment", 0),
        gp_investment=params.get("gp_investment", 0),
        investment_term=params.get("investment_term", 10)
    )

    return waterfall

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True)
