# Portfolio Simulation Module

This module provides a sophisticated financial modeling tool for real estate investment funds, focusing on modeling a 10-year loan product for single-family properties with no monthly payments.

## Overview

The Portfolio Simulation Module is a critical component of the Equihome platform, providing portfolio optimization and risk management capabilities. It integrates with the Traffic Light System to incorporate suburb classifications, risk assessments, and growth forecasts into the portfolio simulation.

The module implements a comprehensive real estate fund model with accurate financial calculations for:
- Portfolio generation and loan modeling
- Cash flow projections and IRR calculations
- Waterfall distribution and carried interest
- GP/LP economics and performance metrics
- Yearly fund metrics and optimal suburb allocation

## Structure

- `api/`: Python FastAPI backend service for simulation calculations
  - `services/`: Core calculation services
    - `math_utils.py`: Financial calculation utilities
    - `portfolio_generator.py`: Portfolio generation logic
    - `fund_calculator.py`: Fund-level calculations
- `src/`: Original simulation engine source code
  - `js/`: JavaScript modules for core functionality and calculations
    - `math-utils.js`: Financial calculation utilities
    - `waterfall.js`: Waterfall distribution calculations
- `components/`: React components for the simulation UI (in `../components/simulation/`)
  - `FundSettings.tsx`: UI for configuring fund parameters
  - `PortfolioGeneration.tsx`: UI for configuring portfolio generation parameters
  - `FundOverview.tsx`: Displays fund performance metrics
  - `GPEconomics.tsx`: Displays GP economics and returns
  - `LPEconomics.tsx`: Displays LP economics and returns
  - `YearlyMetrics.tsx`: Displays fund performance over time
  - `OptimalAllocation.tsx`: Displays recommended suburb allocations
- `services/`: TypeScript services for API integration (in `../services/`)
  - `simulationApiClient.ts`: API client for communicating with the backend
  - `simulationCalculator.ts`: JavaScript implementation of financial calculations

## Financial Model

### Equihome Business Model

The simulation implements Equihome's unique no-monthly-payment loan product and fund structure. For a comprehensive explanation of the business model, see [BUSINESS_MODEL.md](./BUSINESS_MODEL.md).

Key features of the business model include:

1. **Loan Product**:
   - No monthly payments required from homeowners
   - 3% origination fee charged upfront
   - 5% simple interest capitalized to the end of term
   - Appreciation fee equal to the LTV percentage of property appreciation
   - 10-year term with option to exit anytime

2. **Fund Structure**:
   - GP Economics: 3% origination fee, 2% management fee, 20% performance fee
   - LP Economics: Preferred return (6% hurdle), 80% of profits above hurdle
   - Waterfall distribution with return of capital, preferred return, GP catch-up, and carried interest

### Real Estate Fund Model

The simulation implements a standard real estate fund model with the following characteristics:

1. **Fund Structure**
   - Fund size: Total capital raised
   - Fund term: Duration of the fund in years
   - Management fee: Annual fee as a percentage of fund size
   - Hurdle rate: Preferred return threshold for LPs
   - Performance fee: Carried interest percentage for GPs
   - GP investment: Percentage of fund invested by GPs

2. **Loan Structure**
   - Property value: Value of the underlying property
   - Loan amount: Amount loaned to the homeowner
   - LTV (Loan-to-Value): Ratio of loan amount to property value
   - Zone: Risk classification (green, orange, red)
   - Appreciation rate: Expected annual property appreciation
   - Exit year: Year when the loan is expected to exit
   - Reinvestment: Whether proceeds will be reinvested

3. **Waterfall Distribution**
   - Return of capital: Return of original investment
   - Preferred return: Hurdle rate return to LPs
   - GP catch-up: Bringing GP returns to carried interest percentage
   - Carried interest: GP share of profits above hurdle
   - Residual: Remaining profits distributed to LPs

### Key Financial Calculations

#### IRR (Internal Rate of Return)
The discount rate at which the net present value of all cash flows equals zero.
```
NPV = Σ(CF_t / (1 + IRR)^t) = 0
```

#### Equity Multiple
The ratio of total return to total investment.
```
Equity Multiple = Total Return / Total Investment
```

#### Loan Exit Value
The value of a loan at exit, including principal, interest, and appreciation.
```
Exit Value = Loan Amount + Simple Interest + Appreciation Fee
```
Where:
- Simple Interest = Loan Amount × Interest Rate × Years Held
- Appreciation Fee = (Appreciated Property Value - Original Property Value) × LTV

#### Waterfall Distribution
The distribution of profits according to the fund's waterfall structure:
1. Return of capital to all investors
2. Preferred return to LPs (hurdle rate)
3. GP catch-up (if applicable)
4. Carried interest split of remaining profits

## Features

- Fund settings configuration
- Portfolio generation with realistic distributions
- Financial calculations (IRR, NPV, compound interest, etc.)
- Waterfall distribution between GPs and LPs
- Risk metrics calculation (Sharpe ratio, Sortino ratio, VaR, etc.)
- Integration with Traffic Light System data
- Yearly metrics and performance tracking
- Optimal suburb allocation recommendations

## Getting Started

### Backend

1. Navigate to the `api` directory
2. Install dependencies: `pip install -r requirements.txt`
3. Run the API: `uvicorn app:app --reload`

### Frontend

The frontend components are integrated into the Portfolio Management System. They can be accessed through the Simulation tab in the Portfolio Management System.

### Usage Workflow

1. **Configure Fund Settings**
   - Set fund size, term, and fee structure
   - Define hurdle rate and carried interest
   - Set zone allocations and exit parameters

2. **Configure Portfolio Generation**
   - Set loan count and average LTV
   - Define property value parameters
   - Set appreciation rates for each zone

3. **Generate Portfolio**
   - System creates a portfolio of loans based on parameters
   - Loans are distributed across zones according to allocations
   - Exit years and reinvestments are determined

4. **Run Simulation**
   - System calculates cash flows for the entire fund term
   - IRR, equity multiple, and other metrics are calculated
   - Waterfall distribution determines GP/LP economics

5. **Analyze Results**
   - Review fund overview metrics
   - Analyze GP and LP economics
   - Examine yearly metrics and optimal allocation

## Integration with Traffic Light System

The simulation module integrates with the Traffic Light System to incorporate suburb risk classifications and growth forecasts:

1. **Zone Classifications**
   - Green zones: Low-risk suburbs with high growth potential
   - Orange zones: Medium-risk suburbs with moderate growth
   - Red zones: Higher-risk suburbs with lower growth potential

2. **Appreciation Rates**
   - Each zone has an associated appreciation rate
   - These rates affect loan exit values and fund returns

3. **Optimal Allocation**
   - The system recommends optimal suburb allocations
   - Allocations are based on risk-return profiles from the Traffic Light System

## Performance Considerations

- The simulation module performs complex financial calculations that may be computationally intensive
- For large portfolios (>1000 loans), consider using the backend Python implementation
- The JavaScript implementation is optimized for interactive use with smaller portfolios

## Error Handling

The simulation module includes robust error handling:
- Input validation for all parameters
- Fallback methods for numerical calculations that may not converge
- Graceful degradation to mock data if API calls fail

## Documentation

For detailed documentation, see:

- [Business Model Documentation](./BUSINESS_MODEL.md)
- [Simulation Engine Documentation](./SIMULATION.md)
- [Implementation Details](./SIMULATION_IMPLEMENTATION.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Detailed Documentation](./documentation.md)

## API Reference

### Portfolio Generation
```typescript
generatePortfolio(params: PortfolioGeneration): Portfolio
```
Generates a portfolio based on the provided parameters.

### Run Simulation
```typescript
runSimulation(params: {
  portfolio: Portfolio,
  fundSettings: FundSettings,
  tfsData?: any
}): SimulationResult
```
Runs a simulation with the provided parameters and returns the results.

## GitHub Repository

This module integrates algorithms and calculations from the [equihomepartners/simulation](https://github.com/equihomepartners/simulation) repository.

## Future Enhancements

Planned enhancements for the simulation module include:
- Monte Carlo simulations for risk analysis
- Sensitivity analysis for key parameters
- Integration with external economic data sources
- Advanced portfolio optimization algorithms
