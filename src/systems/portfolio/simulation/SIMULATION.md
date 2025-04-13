# Portfolio Simulation Engine Documentation

## Overview

The Portfolio Simulation Engine is a sophisticated financial modeling tool designed to simulate and analyze real estate investment funds. It focuses on modeling a 10-year loan product for single-family properties with no monthly payments, incorporating various financial metrics, Monte Carlo simulations, and portfolio optimization techniques.

This documentation provides a detailed overview of the simulation engine, its components, configuration parameters, algorithms, and integration with the Traffic Light System.

## Architecture

The simulation engine is implemented as a Python backend service with a React frontend. This architecture provides several advantages:

1. **Performance**: Complex financial calculations are performed on the backend using Python's numerical libraries (NumPy, SciPy, pandas).
2. **Precision**: Python's numerical libraries provide better precision for financial calculations.
3. **Maintainability**: Calculation logic is centralized on the backend.
4. **Security**: Proprietary calculation logic is protected on the server.
5. **Consistency**: All clients receive the same calculation results.

### Backend Components

The Python backend includes the following components:

1. **Financial Calculation Engine**: Implements all financial calculations (IRR, NPV, compound interest, etc.).
2. **Portfolio Generation Engine**: Generates realistic loan portfolios based on fund parameters.
3. **Waterfall Distribution Engine**: Calculates the distribution of returns between GPs and LPs.
4. **Risk Analysis Engine**: Calculates risk metrics (Sharpe ratio, Sortino ratio, VaR, etc.).
5. **TFS Integration Engine**: Integrates data from the Traffic Light System.

### Frontend Components

The React frontend includes the following components:

1. **Fund Settings**: UI for configuring fund parameters.
2. **Portfolio Generation**: UI for generating and visualizing portfolios.
3. **Fund Overview**: UI for viewing fund performance metrics.
4. **GP Economics**: UI for analyzing GP returns.
5. **LP Economics**: UI for analyzing LP returns.

## Configuration Parameters

### Fund Settings

| Parameter | Description | Default Value | Range |
|-----------|-------------|---------------|-------|
| `fund_name` | Name of the fund | "Equihome Fund I" | String |
| `fund_size` | Total size of the fund in USD | 100,000,000 | > 0 |
| `fund_term` | Duration of the fund in years | 10 | 1-30 |
| `fund_type` | Type of fund (closed/open) | "closed" | "closed", "open" |
| `vintage_year` | Year the fund was established | Current year | Integer |
| `time_horizon` | Investment time horizon in years | 10 | 1-30 |

### Fee Structure

| Parameter | Description | Default Value | Range |
|-----------|-------------|---------------|-------|
| `management_fee_rate` | Annual management fee as percentage | 0.02 (2%) | 0-0.05 |
| `hurdle_rate` | Minimum return to LPs before carried interest | 0.06 (6%) | 0-0.15 |
| `performance_fee_rate` | Carried interest percentage | 0.20 (20%) | 0-0.30 |
| `origination_fee_rate` | Loan origination fee percentage | 0.03 (3%) | 0-0.05 |
| `simple_interest_rate` | Annual interest rate on loans | 0.05 (5%) | 0-0.15 |
| `gp_investment_percentage` | GP's investment as percentage of fund size | 0.05 (5%) | 0-0.20 |

### Capital Calls

| Parameter | Description | Default Value | Range |
|-----------|-------------|---------------|-------|
| `capital_call_schedule` | Schedule type for capital calls | "custom" | "upfront", "custom" |
| `initial_investment` | Initial capital call amount | 25,000,000 | > 0 |
| `call1_date` | Months after fund inception for call 1 | 0 | 0-120 |
| `call1_amount` | Amount for capital call 1 | 25,000,000 | > 0 |
| `call2_date` | Months after fund inception for call 2 | 3 | 0-120 |
| `call2_amount` | Amount for capital call 2 | 25,000,000 | > 0 |
| `call3_date` | Months after fund inception for call 3 | 6 | 0-120 |
| `call3_amount` | Amount for capital call 3 | 25,000,000 | > 0 |
| `call4_date` | Months after fund inception for call 4 | 9 | 0-120 |
| `call4_amount` | Amount for capital call 4 | 25,000,000 | > 0 |

### Loan Parameters

| Parameter | Description | Default Value | Range |
|-----------|-------------|---------------|-------|
| `average_property_value` | Average property value in USD | 500,000 | > 0 |
| `average_ltv` | Average Loan-to-Value ratio | 0.5 (50%) | 0.1-0.9 |
| `max_ltv` | Maximum Loan-to-Value ratio | 0.75 (75%) | 0.1-0.9 |
| `green_zone_allocation` | Allocation to green zone properties | 0.6 (60%) | 0-1 |
| `orange_zone_allocation` | Allocation to orange zone properties | 0.3 (30%) | 0-1 |
| `red_zone_allocation` | Allocation to red zone properties | 0.1 (10%) | 0-1 |
| `early_exit_probability` | Probability of early loan exit | 0.1 (10%) | 0-1 |
| `average_exit_year` | Average year of loan exit | 5 | 1-10 |
| `exit_year_std_dev` | Standard deviation of exit years | 1.5 | 0.1-5 |
| `reinvestment_cap_year` | Last year for reinvestment | 5 | 1-10 |

### Portfolio Generation Parameters

| Parameter | Description | Default Value | Range |
|-----------|-------------|---------------|-------|
| `num_loans` | Number of loans to generate | Calculated | > 0 |
| `ltv_variance` | Variance in LTV ratios | 0.1 (10%) | 0-0.5 |
| `property_value_variance` | Variance in property values | 0.2 (20%) | 0-0.5 |
| `appreciation_rate_green` | Annual appreciation rate for green zone | 0.05 (5%) | 0-0.15 |
| `appreciation_rate_orange` | Annual appreciation rate for orange zone | 0.03 (3%) | 0-0.15 |
| `appreciation_rate_red` | Annual appreciation rate for red zone | 0.01 (1%) | 0-0.15 |

## Core Algorithms

### Portfolio Generation Algorithm

1. **Calculate Number of Loans**:
   ```python
   num_loans = math.floor(fund_size / (average_property_value * average_ltv))
   ```

2. **Generate Loans**:
   - For each loan:
     - Determine zone based on allocation percentages
     - Generate property value using normal distribution around average
     - Generate LTV using normal distribution around average
     - Calculate loan amount as property value * LTV
     - Assign appreciation rate based on zone
     - Determine exit year using normal distribution around average exit year
     - Calculate expected exit value

3. **Determine Reinvestments**:
   - For each loan that exits before the reinvestment cap year:
     - Mark as reinvestment candidate
     - Generate new loan with exit value as principal
     - Adjust exit year for reinvestment loan

4. **Calculate Portfolio Metrics**:
   - Total initial value
   - Total loan amount
   - Average LTV
   - Weighted appreciation rate
   - Expected IRR and multiple
   - Risk metrics (standard deviation, Sharpe ratio, etc.)

### Loan Exit Value Calculation

The exit value of a loan is calculated as:

```python
def calculate_loan_exit_value(loan, fund_settings):
    # Calculate property appreciation with compound interest formula
    years_held = loan.exit_year - loan.origination_year
    appreciated_property_value = calculate_compound_interest(
        loan.property_value,
        loan.appreciation_rate,
        years_held,
        1  # Annual compounding
    )
    
    # Calculate simple interest on the loan amount
    interest = calculate_simple_interest(
        loan.loan_amount,
        fund_settings.simple_interest_rate,
        years_held
    )
    
    # Calculate appreciation fee (equivalent to LTV entry point)
    appreciation_fee = (appreciated_property_value - loan.property_value) * loan.ltv
    
    # Calculate total exit value
    exit_value = loan.loan_amount + interest + appreciation_fee
    
    return exit_value
```

### Fund Returns Calculation

Fund returns are calculated using the following steps:

1. **Create Cash Flow Array**:
   - Year 0: Initial investment (negative)
   - Years 1-N: Cash inflows from loan exits

2. **Calculate IRR**:
   - Use Newton-Raphson method to find the rate where NPV = 0

3. **Calculate Equity Multiple**:
   - Total inflows / Total outflows

4. **Calculate Risk Metrics**:
   - Standard deviation of returns
   - Sharpe ratio
   - Sortino ratio
   - Value at Risk
   - Expected Shortfall

### Waterfall Distribution Algorithm

The waterfall distribution algorithm calculates how profits are distributed between GPs and LPs:

```python
def calculate_waterfall(total_profit, hurdle_rate, catchup_rate, carried_interest_rate, lp_investment, gp_investment, investment_term):
    # Step 1: Return of capital
    lp_return_of_capital = lp_investment
    gp_return_of_capital = gp_investment
    
    # Step 2: Preferred return (hurdle)
    hurdle_amount = lp_investment * (math.pow(1 + hurdle_rate, investment_term) - 1)
    remaining_profit = total_profit - hurdle_amount
    
    # Step 3: GP catch-up (if applicable)
    gp_catchup = 0
    if catchup_rate > 0 and remaining_profit > 0:
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
    total_gp_return = gp_return_of_capital + gp_catchup + gp_carried_interest
    total_lp_return = lp_return_of_capital + hurdle_amount + lp_residual
    
    return {
        'lp_return_of_capital': lp_return_of_capital,
        'gp_return_of_capital': gp_return_of_capital,
        'hurdle_amount': hurdle_amount,
        'gp_catchup': gp_catchup,
        'gp_carried_interest': gp_carried_interest,
        'lp_residual': lp_residual,
        'total_gp_return': total_gp_return,
        'total_lp_return': total_lp_return
    }
```

## Traffic Light System Integration

The simulation engine integrates with the Traffic Light System (TFS) to incorporate suburb classifications, risk assessments, and growth forecasts into the portfolio simulation.

### Integration Points

1. **Suburb Classifications**: The simulation engine uses suburb classifications (green, yellow, red zones) from the TFS to determine the risk level of different suburbs.

2. **Risk Correlations**: The simulation engine uses risk correlation data from the TFS to optimize portfolio diversification across suburbs.

3. **Growth Forecasts**: The simulation engine incorporates growth forecasts from the TFS to project future portfolio performance.

4. **Default Rates**: The simulation engine uses default rate data from the TFS to assess the risk of loans in different suburbs.

5. **Market Cycles**: The simulation engine considers market cycle positions from the TFS to time investment decisions.

### Integration Process

1. **Data Retrieval**: The simulation engine retrieves data from the TFS API.
2. **Data Transformation**: The TFS data is transformed into formats suitable for portfolio simulation.
3. **Portfolio Generation**: The transformed data is used to generate a portfolio of loans.
4. **Simulation**: The portfolio is simulated using the financial calculation engine.
5. **Results**: The simulation results are returned to the frontend for visualization.

### TFS Data Structure

The TFS data used in the simulation includes:

```typescript
{
  suburbClassifications: [
    { suburb: string, zone: 'green' | 'yellow' | 'red', score: number, confidence: number }
  ],
  riskCorrelations: [
    { suburb1: string, suburb2: string, correlation: number }
  ],
  growthForecasts: [
    { suburb: string, shortTerm: number, mediumTerm: number, longTerm: number, confidence: number }
  ],
  defaultRates: [
    { suburb: string, zone: string, defaultRate: number, forecastDefaultRate: number }
  ],
  marketCycles: [
    { suburb: string, position: string, confidence: number }
  ]
}
```

## API Endpoints

The simulation engine exposes the following API endpoints:

### Fund Settings

- `GET /api/simulation/fund-settings`: Get fund settings
- `POST /api/simulation/fund-settings`: Save fund settings

### Portfolio Generation

- `POST /api/simulation/generate-portfolio`: Generate portfolio based on settings
- `GET /api/simulation/portfolio`: Get generated portfolio

### Simulation

- `POST /api/simulation/run`: Run simulation with portfolio and TFS data
- `GET /api/simulation/results`: Get simulation results

### TFS Integration

- `POST /api/simulation/tfs-integration`: Integrate TFS data into simulation

### Financial Calculations

- `POST /api/simulation/calculate-metrics`: Calculate fund metrics
- `POST /api/simulation/calculate-waterfall`: Calculate waterfall distribution

## Frontend Components

The frontend components for the simulation engine include:

### SimulationLayout

The main layout component that manages the state and navigation between different simulation steps.

### FundSettings

Component for configuring fund parameters.

### PortfolioGeneration

Component for generating and visualizing portfolios.

### FundOverview

Component for viewing fund performance metrics.

### GPEconomics

Component for analyzing GP returns.

### LPEconomics

Component for analyzing LP returns.

## Integration with Portfolio Management System

The simulation engine is integrated with the Portfolio Management System (PMS) to provide portfolio optimization and risk management capabilities.

### Integration Points

1. **Data Sharing**: The simulation engine shares data with the PMS, including portfolio metrics, risk assessments, and optimization results.

2. **API Integration**: The simulation engine exposes API endpoints that the PMS can call to run simulations and retrieve results.

3. **UI Integration**: The simulation engine's UI components are integrated into the PMS UI to provide a seamless user experience.

## Error Handling

The simulation engine includes robust error handling to ensure reliable operation:

1. **Input Validation**: All input parameters are validated before processing.

2. **Fallback Mechanisms**: If the API is unavailable, the frontend falls back to mock data.

3. **Error Reporting**: Errors are logged and reported to the user with clear messages.

4. **Retry Logic**: API calls include retry logic to handle transient failures.

## Performance Considerations

The simulation engine is designed for high performance:

1. **Asynchronous Processing**: Long-running calculations are performed asynchronously.

2. **Caching**: Results are cached to avoid redundant calculations.

3. **Pagination**: Large datasets are paginated to improve performance.

4. **Lazy Loading**: Components are loaded lazily to improve initial load time.

## Security Considerations

The simulation engine includes security measures to protect sensitive data:

1. **Authentication**: API endpoints require authentication.

2. **Authorization**: Access to sensitive data is restricted based on user roles.

3. **Input Sanitization**: All user input is sanitized to prevent injection attacks.

4. **Data Encryption**: Sensitive data is encrypted in transit and at rest.

## Conclusion

The Portfolio Simulation Engine is a powerful tool for modeling and analyzing real estate investment funds. It provides sophisticated financial calculations, portfolio optimization, and risk management capabilities, all integrated with the Traffic Light System for accurate suburb-level analysis.

By leveraging Python for backend calculations and React for frontend visualization, the simulation engine delivers high performance, precision, and a seamless user experience.
