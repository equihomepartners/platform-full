import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Equihome Simulation API"}

def test_get_fund_settings():
    response = client.get("/api/simulation/fund-settings")
    assert response.status_code == 200
    assert "fund_name" in response.json()
    assert "fund_size" in response.json()

def test_save_fund_settings():
    fund_settings = {
        "fund_name": "Test Fund",
        "fund_size": 50000000,
        "fund_term": 7,
        "fund_type": "closed",
        "vintage_year": 2023,
        "time_horizon": 7,
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
        "call3_amount": 0,
        "call4_date": 9,
        "call4_amount": 0,
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
    response = client.post("/api/simulation/fund-settings", json=fund_settings)
    assert response.status_code == 200
    assert response.json()["fund_name"] == "Test Fund"
    assert response.json()["fund_size"] == 50000000

def test_generate_portfolio():
    params = {
        "num_loans": 100,
        "ltv_variance": 0.1,
        "property_value_variance": 0.2,
        "appreciation_rate_green": 0.05,
        "appreciation_rate_orange": 0.03,
        "appreciation_rate_red": 0.01
    }
    response = client.post("/api/simulation/generate-portfolio", json=params)
    assert response.status_code == 200
    assert "loans" in response.json()
    assert "reinvestments" in response.json()
    assert "metrics" in response.json()

def test_run_simulation():
    params = {
        "portfolio": None,
        "fund_settings": None,
        "tfs_data": None
    }
    response = client.post("/api/simulation/run", json=params)
    assert response.status_code == 200
    assert "id" in response.json()
    assert "results" in response.json()
    assert "gp_economics" in response.json()
    assert "lp_economics" in response.json()

def test_calculate_metrics():
    params = {
        "cash_flows": [-100000, 20000, 30000, 40000, 50000, 60000],
        "total_investment": 100000
    }
    response = client.post("/api/simulation/calculate-metrics", json=params)
    assert response.status_code == 200
    assert "irr" in response.json()
    assert "equity_multiple" in response.json()

def test_calculate_waterfall():
    params = {
        "total_profit": 100000,
        "hurdle_rate": 0.06,
        "catchup_rate": 0.5,
        "carried_interest_rate": 0.2,
        "lp_investment": 95000,
        "gp_investment": 5000,
        "investment_term": 5
    }
    response = client.post("/api/simulation/calculate-waterfall", json=params)
    assert response.status_code == 200
    assert "lp_return_of_capital" in response.json()
    assert "gp_carried_interest" in response.json()
