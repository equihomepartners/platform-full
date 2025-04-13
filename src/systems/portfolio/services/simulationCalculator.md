# Simulation Calculator Documentation

## Overview

The `simulationCalculator.ts` file implements a comprehensive financial calculation engine for the Equihome real estate fund model. It provides accurate calculations for portfolio generation, cash flows, IRR, waterfall distribution, and other financial metrics.

## Math Utilities

### NPV Calculation

```typescript
calculateNPV(cashFlows: number[], rate: number): number
```

Calculates the net present value of a series of cash flows at a given discount rate.

**Parameters:**
- `cashFlows`: Array of cash flows (negative for outflows, positive for inflows)
- `rate`: Discount rate as a decimal

**Returns:**
- NPV value

### IRR Calculation

```typescript
calculateIRR(cashFlows: number[]): number
```

Calculates the internal rate of return for a series of cash flows using the Newton-Raphson method.

**Parameters:**
- `cashFlows`: Array of cash flows (negative for outflows, positive for inflows)

**Returns:**
- IRR as a decimal

### Fallback IRR Calculation

```typescript
fallbackIRR(cashFlows: number[]): number
```

Fallback method for IRR calculation using bisection when Newton-Raphson doesn't converge.

**Parameters:**
- `cashFlows`: Array of cash flows

**Returns:**
- IRR as a decimal

### Equity Multiple Calculation

```typescript
calculateEquityMultiple(totalReturn: number, totalInvestment: number): number
```

Calculates the equity multiple (total return / total investment).

**Parameters:**
- `totalReturn`: Total return amount
- `totalInvestment`: Total investment amount

**Returns:**
- Equity multiple

### ROI Calculation

```typescript
calculateROI(totalReturn: number, totalInvestment: number): number
```

Calculates the return on investment ((total return - total investment) / total investment).

**Parameters:**
- `totalReturn`: Total return amount
- `totalInvestment`: Total investment amount

**Returns:**
- ROI as a decimal

### Simple Interest Calculation

```typescript
calculateSimpleInterest(principal: number, rate: number, time: number): number
```

Calculates simple interest.

**Parameters:**
- `principal`: Principal amount
- `rate`: Interest rate as a decimal
- `time`: Time in years

**Returns:**
- Interest amount

### Compound Interest Calculation

```typescript
calculateCompoundInterest(principal: number, rate: number, time: number, compoundingPerYear: number = 1): number
```

Calculates compound interest.

**Parameters:**
- `principal`: Principal amount
- `rate`: Interest rate as a decimal
- `time`: Time in years
- `compoundingPerYear`: Number of times interest is compounded per year (default: 1)

**Returns:**
- Future value with compound interest

### Waterfall Distribution Calculation

```typescript
calculateWaterfall(
  totalProfit: number, 
  hurdleRate: number, 
  carriedInterestRate: number, 
  lpInvestment: number, 
  gpInvestment: number, 
  investmentTerm: number
): any
```

Calculates the waterfall distribution of profits between GPs and LPs.

**Parameters:**
- `totalProfit`: Total profit amount
- `hurdleRate`: Hurdle rate as a decimal
- `carriedInterestRate`: Carried interest rate as a decimal
- `lpInvestment`: LP investment amount
- `gpInvestment`: GP investment amount
- `investmentTerm`: Investment term in years

**Returns:**
- Object containing waterfall distribution details

### Loan Exit Value Calculation

```typescript
calculateLoanExitValue(loan: any, fundSettings: any): number
```

Calculates the exit value of a loan.

**Parameters:**
- `loan`: Loan object
- `fundSettings`: Fund settings object

**Returns:**
- Exit value of the loan

## Portfolio Generation

```typescript
generatePortfolio(params: any): Portfolio
```

Generates a portfolio based on the provided parameters.

**Parameters:**
- `params`: Portfolio generation parameters

**Returns:**
- Generated portfolio

### Portfolio Generation Process

1. Create a new portfolio object
2. Extract parameters with defaults
3. Generate loans based on parameters
4. Calculate loan exit values
5. Generate reinvestments for loans that exit early
6. Calculate portfolio metrics
7. Return the portfolio

### Portfolio Metrics

The generated portfolio includes the following metrics:
- Loan count
- Total loan value
- Average LTV
- Average property value
- Zone counts (green, orange, red)
- Average appreciation rate
- Expected IRR and multiple
- Total initial value
- Total reinvestment value
- Total exit value

## Simulation

```typescript
runSimulation(params: any): SimulationResult
```

Runs a simulation with the provided parameters.

**Parameters:**
- `params`: Simulation parameters (portfolio, fundSettings, tfsData)

**Returns:**
- Simulation results

### Simulation Process

1. Create a new result object
2. Extract key fund settings with defaults
3. Calculate cash flows
4. Calculate IRR and equity multiple
5. Calculate waterfall distribution
6. Set results, GP economics, and LP economics
7. Generate yearly metrics
8. Format cash flows
9. Generate optimal allocation
10. Return the results

### Simulation Results

The simulation results include:
- Fund overview metrics (IRR, equity multiple, ROI, etc.)
- GP economics (investment, carried interest, total return, etc.)
- LP economics (investment, preferred return, total return, etc.)
- Yearly metrics (active loans, deployed capital, portfolio value, etc.)
- Cash flows (inflow, outflow, net cash flow, etc.)
- Optimal allocation (suburb allocations with expected returns and risk scores)

## Cash Flow Calculation

```typescript
calculateCashFlows(portfolio: any, fundSettings: any): number[]
```

Calculates cash flows for a portfolio.

**Parameters:**
- `portfolio`: Portfolio object
- `fundSettings`: Fund settings object

**Returns:**
- Array of cash flows

### Cash Flow Calculation Process

1. Initialize cash flows array
2. Set initial investment (negative cash flow in year 0)
3. Calculate management fees
4. Add cash flows from initial loans
5. Add cash flows from reinvestment loans
6. Add origination fees
7. Add performance fees
8. Return the cash flows

## Yearly Metrics Calculation

```typescript
generateYearlyMetrics(portfolio: any, fundSettings: any, cashFlows: number[]): any[]
```

Generates yearly metrics for a portfolio.

**Parameters:**
- `portfolio`: Portfolio object
- `fundSettings`: Fund settings object
- `cashFlows`: Cash flows array

**Returns:**
- Array of yearly metrics

### Yearly Metrics Calculation Process

1. Calculate initial investment
2. Track active loans, deployed capital, and cumulative cash flows
3. For each year:
   - Count active loans
   - Calculate deployed capital
   - Calculate portfolio value
   - Calculate yearly return
   - Calculate cumulative return
   - Calculate DPI, RVPI, and TVPI
4. Return the yearly metrics

## Cash Flow Formatting

```typescript
formatCashFlows(cashFlows: number[]): any[]
```

Formats cash flows for API response.

**Parameters:**
- `cashFlows`: Cash flows array

**Returns:**
- Formatted cash flows

## Optimal Allocation

```typescript
generateOptimalAllocation(portfolio: any, fundSettings: any): any[]
```

Generates optimal allocation based on portfolio and fund settings.

**Parameters:**
- `portfolio`: Portfolio object
- `fundSettings`: Fund settings object

**Returns:**
- Optimal allocation

### Optimal Allocation Process

1. Get unique suburbs from portfolio
2. Calculate risk scores based on loan performance in each suburb
3. Sort suburbs by zone and appreciation rate
4. Determine number of suburbs in each zone
5. Generate optimal allocation
6. Return the optimal allocation

## Usage Example

```typescript
// Generate portfolio
const portfolio = generatePortfolio({
  loan_count: 100,
  average_ltv: 0.7,
  ltv_variance: 0.05,
  average_property_value: 1000000,
  property_value_variance: 0.2,
  green_zone_allocation: 0.6,
  orange_zone_allocation: 0.3,
  red_zone_allocation: 0.1,
  appreciation_rate_green: 0.05,
  appreciation_rate_orange: 0.03,
  appreciation_rate_red: 0.02
});

// Run simulation
const result = runSimulation({
  portfolio: portfolio,
  fundSettings: {
    fund_size: 100000000,
    fund_term: 10,
    management_fee_rate: 0.02,
    hurdle_rate: 0.06,
    performance_fee_rate: 0.20,
    gp_investment_percentage: 0.05,
    origination_fee_rate: 0.01,
    simple_interest_rate: 0.05,
    early_exit_probability: 0.2,
    average_exit_year: 7
  }
});

// Access results
console.log(`IRR: ${result.results.irr}%`);
console.log(`Equity Multiple: ${result.results.equity_multiple}x`);
console.log(`GP Total Return: $${result.gp_economics.total_return}`);
console.log(`LP Total Return: $${result.lp_economics.total_return}`);
```
