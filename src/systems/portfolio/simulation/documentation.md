# Equihome Fund Modeling - Comprehensive Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Fund Settings](#fund-settings)
4. [Portfolio Generation](#portfolio-generation)
5. [Financial Calculations](#financial-calculations)
6. [Fund Overview](#fund-overview)
7. [GP Economics](#gp-economics)
8. [LP Economics](#lp-economics)
9. [Portfolio Growth](#portfolio-growth)
10. [Mathematical Utilities](#mathematical-utilities)
11. [State Management](#state-management)
12. [Appendix: Formulas and Algorithms](#appendix-formulas-and-algorithms)

## Introduction

The Equihome Fund Modeling application is a comprehensive financial modeling tool designed to simulate and analyze real estate investment funds. It focuses on modeling a 10-year loan product for single-family properties with no monthly payments, incorporating various financial metrics, Monte Carlo simulations, and portfolio optimization techniques.

### Equihome Business Model

Equihome offers a unique no-monthly-payment loan product to homeowners, providing access to home equity without the burden of monthly payments. The core business model includes:

1. **Loan Structure**:
   - **3% Origination Fee**: Charged upfront and deducted from the loan amount
   - **5% Simple Interest**: Capitalized to the end of the term or upon exit
   - **Appreciation Fee**: Equal to the LTV percentage of the property's appreciation (e.g., 40% LTV loan = 40% of appreciation)
   - **10-Year Term**: Homeowners can exit at any time through refinance or property sale

2. **Fund Structure**:
   - **GP Economics**:
     - 3% Origination fee (charged to homeowner, not the fund)
     - 2% Annual management fee on AUM
     - 20% Performance fee over a hurdle rate (typically 6%)
   - **LP Economics**:
     - Returns through the product's interest and appreciation fees
     - Waterfall distribution with hurdle, catch-up, and carried interest

This documentation provides a detailed overview of all components, variables, calculations, and algorithms used in the application.

## System Architecture

The application is built using a client-side architecture with HTML, CSS, and JavaScript. It consists of several interconnected modules:

- **State Manager**: Handles data persistence across pages
- **Math Utilities**: Provides financial calculation functions
- **Navigation**: Manages page navigation and user journey
- **UI Components**: Renders the user interface and handles user interactions

### File Structure

```
equihome-html/
├── index.html                # Home page
├── fund-settings.html        # Fund settings configuration
├── portfolio-generation.html # Portfolio generation and simulation
├── fund-overview.html        # Fund performance overview
├── gp-economics.html         # General Partner economics
├── lp-economics.html         # Limited Partner economics
├── portfolio-growth.html     # Portfolio growth analysis
├── css/
│   └── styles.css            # Application styles
└── js/
    ├── utils.js              # Utility functions
    ├── navigation.js         # Navigation management
    ├── state-manager.js      # State management
    └── math-utils.js         # Mathematical and financial utilities
```

## Fund Settings

The Fund Settings module allows users to configure the parameters of the investment fund.

### Key Variables

#### Fund Information
| Variable | Description | Default Value | Range |
|----------|-------------|---------------|-------|
| `fund_name` | Name of the fund | "Equihome Fund I" | String |
| `fund_size` | Total size of the fund in USD | 100,000,000 | > 0 |
| `fund_term` | Duration of the fund in years | 10 | 1-30 |
| `fund_type` | Type of fund (closed/open) | "closed" | "closed", "open" |
| `vintage_year` | Year the fund was established | Current year | Integer |
| `time_horizon` | Investment time horizon in years | 10 | 1-30 |

#### Fee Structure
| Variable | Description | Default Value | Range |
|----------|-------------|---------------|-------|
| `management_fee_rate` | Annual management fee as percentage | 0.02 (2%) | 0-0.05 |
| `hurdle_rate` | Minimum return to LPs before carried interest | 0.06 (6%) | 0-0.15 |
| `performance_fee_rate` | Carried interest percentage | 0.20 (20%) | 0-0.30 |
| `origination_fee_rate` | Loan origination fee percentage | 0.03 (3%) | 0-0.05 |
| `simple_interest_rate` | Annual interest rate on loans | 0.05 (5%) | 0-0.15 |
| `gp_investment_percentage` | GP's investment as percentage of fund size | 0.05 (5%) | 0-0.20 |
| `gp_catchup_rate` | GP catch-up rate after hurdle | 0.50 (50%) | 0-1.0 |

#### Capital Calls
| Variable | Description | Default Value | Range |
|----------|-------------|---------------|-------|
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

#### Loan Parameters
| Variable | Description | Default Value | Range |
|----------|-------------|---------------|-------|
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

### Derived Values
| Variable | Description | Calculation |
|----------|-------------|-------------|
| `lpInvestment` | LP's investment amount | `fund_size * (1 - gp_investment_percentage)` |
| `gpInvestment` | GP's investment amount | `fund_size * gp_investment_percentage` |
| `extendedFundTerm` | Extended fund term accounting for reinvestments | `fund_term + Math.ceil(fund_term / 2)` |

## Portfolio Generation

The Portfolio Generation module creates a simulated loan portfolio based on the fund settings.

### Key Variables

#### Portfolio Parameters
| Variable | Description | Default Value | Range |
|----------|-------------|---------------|-------|
| `num_loans` | Number of loans to generate | Calculated | > 0 |
| `ltv_variance` | Variance in LTV ratios | 0.1 (10%) | 0-0.5 |
| `property_value_variance` | Variance in property values | 0.2 (20%) | 0-0.5 |
| `appreciation_rate_green` | Annual appreciation rate for green zone | 0.05 (5%) | 0-0.15 |
| `appreciation_rate_orange` | Annual appreciation rate for orange zone | 0.03 (3%) | 0-0.15 |
| `appreciation_rate_red` | Annual appreciation rate for red zone | 0.01 (1%) | 0-0.15 |

### Portfolio Structure
The generated portfolio is an object with the following structure:

```javascript
{
  loans: [
    {
      id: String,                    // Unique identifier
      loanAmount: Number,            // Loan amount in USD
      propertyValue: Number,         // Property value in USD
      ltv: Number,                   // Loan-to-Value ratio
      zone: String,                  // "green", "orange", or "red"
      appreciationRate: Number,      // Annual appreciation rate
      originationYear: Number,       // Year of loan origination
      exitYear: Number,              // Expected exit year
      willBeReinvested: Boolean,     // Whether loan will be reinvested
      expectedExitValue: Number,     // Expected value at exit
      originationFee: Number         // Origination fee amount
    },
    // More loans...
  ],
  reinvestments: [
    // Similar structure to loans
  ],
  metrics: {
    totalInitialValue: Number,       // Total initial portfolio value
    totalLoanAmount: Number,         // Total loan amount
    averageLTV: Number,              // Average LTV across portfolio
    weightedAppreciationRate: Number, // Weighted average appreciation rate
    expectedIRR: Number,             // Expected IRR
    expectedMultiple: Number,        // Expected equity multiple
    extendedTerm: Number,            // Extended term accounting for reinvestments
    returnStdDev: Number,            // Standard deviation of returns
    sharpeRatio: Number,             // Sharpe ratio
    sortinoRatio: Number,            // Sortino ratio
    downsideDeviation: Number,       // Downside deviation
    valueAtRisk: Number,             // Value at Risk (95% confidence)
    expectedShortfall: Number        // Expected Shortfall (95% confidence)
  }
}
```

### Portfolio Generation Algorithm

1. **Calculate Number of Loans**:
   ```javascript
   const numLoans = Math.floor(fundSettings.fund_size / (fundSettings.average_property_value * fundSettings.average_ltv));
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

## Financial Calculations

### Loan Exit Value Calculation

The exit value of a loan is calculated as:

```javascript
function calculateLoanExitValue(loan, fundSettings) {
  // Calculate property appreciation with compound interest formula
  const yearsHeld = loan.exitYear - loan.originationYear;
  const appreciatedPropertyValue = MathUtils.calculateCompoundInterest(
    loan.propertyValue,
    loan.appreciationRate,
    yearsHeld,
    1 // Annual compounding
  );

  // Calculate simple interest on the loan amount (capitalized to end of term)
  const interest = MathUtils.calculateSimpleInterest(
    loan.loanAmount,
    fundSettings.simple_interest_rate,
    yearsHeld
  );

  // Calculate appreciation fee based on LTV percentage
  // If property value increases from $1M to $2M with 40% LTV, the fee is 40% of the $1M appreciation
  const appreciationFee = (appreciatedPropertyValue - loan.propertyValue) * loan.ltv;

  // Calculate total exit value
  // Original loan amount + capitalized interest + appreciation fee
  const exitValue = loan.loanAmount + interest + appreciationFee;

  return exitValue;
}
```

### Fund Returns Calculation

Fund returns are calculated using the following steps:

1. **Initialize yearly metrics** for each year in the extended fund term
2. **Process capital calls** based on the capital call schedule
3. **Process loan cash flows** including:
   - Origination fees (3% charged to homeowner, goes to GP)
   - Interest income (5% simple interest, capitalized to end of term)
   - Appreciation income (LTV% of property appreciation)
   - Exit values (loan amount + interest + appreciation fee)
4. **Calculate management fees** (2% of AUM annually)
5. **Calculate net cash flows** and cumulative cash flows
6. **Calculate NAV** (Net Asset Value) for each year
7. **Calculate IRR** using the cash flow array
8. **Calculate equity multiple** and other return metrics
9. **Calculate waterfall distribution** between GP and LP:
   - Return of capital to all investors
   - Preferred return to LPs (hurdle rate, typically 6%)
   - GP catch-up (if applicable)
   - Carried interest (20% of profits above hurdle)
10. **Calculate risk metrics** including Sharpe ratio, Sortino ratio, etc.

### GP and LP Economics

GP and LP economics are calculated based on the waterfall distribution:

1. **Return of Capital**: LPs and GPs receive their invested capital back
2. **Preferred Return**: LPs receive the hurdle rate (typically 6%) on their investment
3. **Catch-up (if applicable)**: GPs receive a portion to "catch up" to the agreed split
4. **Carried Interest**: Remaining profits are split with 20% to GP and 80% to LPs

Additionally, GPs receive:
- 3% origination fee on all loans (charged to homeowners, not the fund)
- 2% annual management fee on assets under management (AUM)

## Fund Overview

The Fund Overview module displays comprehensive fund performance metrics.

### Key Metrics

| Metric | Description | Calculation |
|--------|-------------|-------------|
| `irr` | Internal Rate of Return after fees | Calculated from cash flows |
| `gross_irr` | Internal Rate of Return before fees | Calculated from cash flows |
| `equity_multiple` | Total return / Total investment | `total_return / total_investment` |
| `moic` | Multiple on Invested Capital | Same as equity multiple |
| `total_investment` | Total capital deployed | Sum of all capital calls |
| `total_return` | Total value returned to investors | Sum of all distributions |
| `net_profit` | Total return minus total investment | `total_return - total_investment` |
| `roi` | Return on Investment percentage | `net_profit / total_investment` |
| `hurdle_amount` | Minimum return to LPs before carried interest | Compound interest on LP investment at hurdle rate |
| `gp_carried_interest` | GP's share of profits above hurdle | Calculated from waterfall distribution |
| `lp_return` | Total return to Limited Partners | Calculated from waterfall distribution |
| `gp_return` | Total return to General Partner | Calculated from waterfall distribution |
| `dpi` | Distributions to Paid-In | `totalDistributions / totalCapitalCalled` |
| `rvpi` | Residual Value to Paid-In | `finalNAV / totalCapitalCalled` |
| `tvpi` | Total Value to Paid-In | `dpi + rvpi` |
| `sharpe_ratio` | Risk-adjusted return measure | `(irr - riskFreeRate) / returnStdDev` |
| `sortino_ratio` | Downside risk-adjusted return | `(irr - riskFreeRate) / downsideDeviation` |
| `value_at_risk` | Maximum loss at 95% confidence | Calculated from return distribution |
| `expected_shortfall` | Expected loss beyond VaR | Calculated from return distribution |

## GP Economics

The GP Economics module focuses on the General Partner's returns and incentives.

### Key Metrics

| Metric | Description | Calculation |
|--------|-------------|-------------|
| `gp_investment` | GP's capital contribution | `fund_size * gp_investment_percentage` |
| `management_fees` | Total management fees | `fund_size * management_fee_rate * fund_term` |
| `carried_interest` | GP's share of profits above hurdle | Calculated from waterfall distribution |
| `gp_irr` | GP's Internal Rate of Return | Calculated from GP cash flows |
| `gp_multiple` | GP's equity multiple | `gp_return / gp_investment` |
| `gp_roi` | GP's Return on Investment | `(gp_return - gp_investment) / gp_investment` |

### GP Cash Flows

GP cash flows include:
1. Initial investment (negative)
2. Annual management fees (positive)
3. Carried interest at the end of the fund (positive)
4. Return on GP's investment (positive)

## LP Economics

The LP Economics module focuses on the Limited Partners' returns.

### Key Metrics

| Metric | Description | Calculation |
|--------|-------------|-------------|
| `lp_investment` | LP's capital contribution | `fund_size * (1 - gp_investment_percentage)` |
| `preferred_return` | Return at the hurdle rate | Compound interest on LP investment at hurdle rate |
| `lp_irr` | LP's Internal Rate of Return | Calculated from LP cash flows |
| `lp_multiple` | LP's equity multiple | `lp_return / lp_investment` |
| `lp_roi` | LP's Return on Investment | `(lp_return - lp_investment) / lp_investment` |

### LP Cash Flows

LP cash flows include:
1. Capital calls (negative)
2. Return of capital (positive)
3. Preferred return (positive)
4. Share of profits above hurdle (positive)

## Portfolio Growth

The Portfolio Growth module analyzes how the portfolio evolves over time.

### Key Metrics

| Metric | Description | Calculation |
|--------|-------------|-------------|
| `active_loans` | Number of active loans per year | Count of loans active in each year |
| `deployed_capital` | Capital deployed per year | Sum of loan amounts active in each year |
| `portfolio_value` | Total portfolio value per year | Sum of loan values in each year |
| `yearly_returns` | Returns generated each year | Calculated from yearly cash flows |
| `reinvestment_impact` | Impact of reinvestments on IRR | Difference in IRR with and without reinvestments |

### Loan Value Calculation

The value of a loan at a specific year is calculated as:

```javascript
function calculateLoanValueAtYear(loan, fundSettings, yearsElapsed) {
  if (yearsElapsed < 0) return 0;
  if (yearsElapsed > loan.exitYear - loan.originationYear) return 0;

  // Calculate property appreciation with compound interest formula
  const appreciatedPropertyValue = MathUtils.calculateCompoundInterest(
    loan.propertyValue,
    loan.appreciationRate,
    yearsElapsed,
    1 // Annual compounding
  );

  // Calculate simple interest on the loan amount
  const interest = MathUtils.calculateSimpleInterest(
    loan.loanAmount,
    loan.interestRate || fundSettings.simple_interest_rate,
    yearsElapsed
  );

  // Calculate appreciation fee (equivalent to LTV entry point)
  const appreciationFee = (appreciatedPropertyValue - loan.propertyValue) * loan.ltv;

  // Calculate total loan value with precise decimal math
  const loanValue = loan.loanAmount + interest + appreciationFee;

  return loanValue;
}
```

## Mathematical Utilities

The Math Utilities module provides financial and statistical functions used throughout the application.

### Financial Functions

| Function | Description | Formula |
|----------|-------------|---------|
| `calculateIRR` | Internal Rate of Return | Newton-Raphson method to find rate where NPV = 0 |
| `calculateNPV` | Net Present Value | Sum of discounted cash flows |
| `calculateCompoundInterest` | Compound interest | `principal * (1 + rate)^time` |
| `calculateSimpleInterest` | Simple interest | `principal * rate * time` |
| `calculateROI` | Return on Investment | `(finalValue - initialValue) / initialValue` |
| `calculateEquityMultiple` | Equity Multiple | `finalValue / initialValue` |
| `calculateWaterfall` | Waterfall distribution | Complex algorithm for LP/GP split |

### Statistical Functions

| Function | Description | Formula |
|----------|-------------|---------|
| `calculateMean` | Arithmetic mean | Sum of values divided by count |
| `calculateStandardDeviation` | Standard deviation | Square root of variance |
| `calculateDownsideDeviation` | Downside deviation | Standard deviation of negative returns |
| `calculateSharpeRatio` | Sharpe ratio | `(return - riskFreeRate) / standardDeviation` |
| `calculateSortinoRatio` | Sortino ratio | `(return - riskFreeRate) / downsideDeviation` |
| `calculateVaR` | Value at Risk | Quantile of return distribution |
| `calculateExpectedShortfall` | Expected Shortfall | Average of returns beyond VaR |
| `generateNormalRandom` | Normal random variable | Box-Muller transform |
| `clamp` | Constrain value to range | `Math.min(Math.max(value, min), max)` |

## State Management

The State Manager module handles data persistence across pages and maintains the application state.

### State Structure

```javascript
{
  // Fund Settings
  fundSettings: {
    // Fund Information
    fund_name: String,
    fund_size: Number,
    fund_term: Number,
    fund_type: String,
    vintage_year: Number,
    time_horizon: Number,

    // Fee Structure
    management_fee_rate: Number,
    hurdle_rate: Number,
    performance_fee_rate: Number,
    origination_fee_rate: Number,
    simple_interest_rate: Number,
    gp_investment_percentage: Number,

    // Capital Calls
    capital_call_schedule: String,
    initial_investment: Number,
    call1_date: Number,
    call1_amount: Number,
    call2_date: Number,
    call2_amount: Number,
    call3_date: Number,
    call3_amount: Number,
    call4_date: Number,
    call4_amount: Number,

    // Loan Parameters
    average_property_value: Number,
    average_ltv: Number,
    max_ltv: Number,
    green_zone_allocation: Number,
    orange_zone_allocation: Number,
    red_zone_allocation: Number,
    early_exit_probability: Number,
    average_exit_year: Number,
    exit_year_std_dev: Number,
    reinvestment_cap_year: Number
  },

  // Portfolio Generation
  portfolioGeneration: {
    // Portfolio Parameters
    num_loans: Number,
    ltv_variance: Number,
    property_value_variance: Number,
    appreciation_rate_green: Number,
    appreciation_rate_orange: Number,
    appreciation_rate_red: Number,

    // Generated Portfolio
    portfolio: Object,
    portfolioGenerated: Boolean,
    generationDate: String
  },

  // Fund Returns
  fundReturns: {
    // Return Metrics
    irr: Number,
    gross_irr: Number,
    equity_multiple: Number,
    moic: Number,
    total_investment: Number,
    total_return: Number,
    net_profit: Number,
    roi: Number,

    // GP/LP Split
    hurdle_amount: Number,
    gp_carried_interest: Number,
    lp_return: Number,
    gp_return: Number,

    // Cash Flows
    cashFlows: Array,

    // Calculated
    calculationComplete: Boolean,
    calculationDate: String
  },

  // User Journey
  userJourney: {
    fundSettingsComplete: Boolean,
    portfolioGenerationComplete: Boolean,
    fundOverviewViewed: Boolean,
    gpEconomicsViewed: Boolean,
    lpEconomicsViewed: Boolean
  }
}
```

### State Management Functions

| Function | Description |
|----------|-------------|
| `getState` | Get the entire application state |
| `getStateSection` | Get a specific section of the state |
| `updateState` | Update a specific section of the state |
| `resetState` | Reset the state to default values |
| `isJourneyStepComplete` | Check if a journey step is complete |
| `completeJourneyStep` | Mark a journey step as complete |
| `calculateDerivedValues` | Calculate derived values from the state |

## Appendix: Formulas and Algorithms

### IRR Calculation

The Internal Rate of Return (IRR) is calculated using the Newton-Raphson method:

```javascript
function calculateIRR(cashFlows, guess = 0.1, maxIterations = 1000, tolerance = 1e-10) {
  // Implementation of Newton-Raphson method to find IRR
  let rate = guess;

  for (let i = 0; i < maxIterations; i++) {
    const npv = calculateNPV(cashFlows, rate);
    const derivative = calculateNPVDerivative(cashFlows, rate);

    if (Math.abs(derivative) < tolerance) {
      throw new Error('Derivative too small, cannot continue');
    }

    const newRate = rate - npv / derivative;

    if (Math.abs(newRate - rate) < tolerance) {
      return newRate;
    }

    rate = newRate;
  }

  throw new Error('IRR calculation did not converge');
}
```

### Waterfall Distribution

The waterfall distribution algorithm:

```javascript
function calculateWaterfall(netProfit, hurdleRate, catchupRate, carriedInterestRate, lpInvestment, gpInvestment, fundTerm) {
  // 1. Return of capital
  let remainingProfit = netProfit;
  let lpReturn = lpInvestment;
  let gpReturn = gpInvestment;

  // 2. Preferred return (hurdle)
  const hurdleAmount = calculateCompoundInterest(lpInvestment, hurdleRate, fundTerm) - lpInvestment;

  if (remainingProfit <= hurdleAmount) {
    // Not enough profit to fully pay the hurdle
    lpReturn += remainingProfit;
    remainingProfit = 0;
  } else {
    // Pay full hurdle
    lpReturn += hurdleAmount;
    remainingProfit -= hurdleAmount;
  }

  // 3. GP catch-up (if applicable)
  let gpCatchup = 0;

  if (catchupRate > 0 && remainingProfit > 0) {
    const catchupAmount = (hurdleAmount / (1 - catchupRate)) * catchupRate;

    if (remainingProfit <= catchupAmount) {
      // Not enough profit for full catch-up
      gpCatchup = remainingProfit;
      gpReturn += gpCatchup;
      remainingProfit = 0;
    } else {
      // Full catch-up
      gpCatchup = catchupAmount;
      gpReturn += gpCatchup;
      remainingProfit -= catchupAmount;
    }
  }

  // 4. Carried interest on remaining profit
  let gpCarriedInterest = 0;

  if (remainingProfit > 0) {
    gpCarriedInterest = remainingProfit * carriedInterestRate;
    gpReturn += gpCarriedInterest;
    lpReturn += remainingProfit - gpCarriedInterest;
  }

  return {
    totalLpReturn: lpReturn,
    totalGpReturn: gpReturn,
    gpCarriedInterest,
    gpCatchup
  };
}
```

### Normal Distribution Random Number Generation

The Box-Muller transform for generating normally distributed random numbers:

```javascript
function generateNormalRandom(mean = 0, stdDev = 1) {
  let u1, u2;

  // Generate two uniform random numbers between 0 and 1
  do {
    u1 = Math.random();
    u2 = Math.random();
  } while (u1 <= Number.EPSILON); // Avoid log(0)

  // Box-Muller transform
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

  // Scale and shift to get desired mean and standard deviation
  return z0 * stdDev + mean;
}
```

### Risk Metrics Calculations

```javascript
// Sharpe Ratio
function calculateSharpeRatio(returnRate, riskFreeRate, standardDeviation) {
  if (standardDeviation === 0) return 0;
  return (returnRate - riskFreeRate) / standardDeviation;
}

// Sortino Ratio
function calculateSortinoRatio(returnRate, riskFreeRate, downsideDeviation) {
  if (downsideDeviation === 0) return 0;
  return (returnRate - riskFreeRate) / downsideDeviation;
}

// Downside Deviation
function calculateDownsideDeviation(returns, minAcceptableReturn) {
  const squaredDownsideDeviations = returns
    .filter(r => r < minAcceptableReturn)
    .map(r => Math.pow(minAcceptableReturn - r, 2));

  if (squaredDownsideDeviations.length === 0) return 0;

  const meanSquaredDownsideDeviation = squaredDownsideDeviations.reduce((sum, val) => sum + val, 0) / squaredDownsideDeviations.length;
  return Math.sqrt(meanSquaredDownsideDeviation);
}

// Value at Risk (VaR)
function calculateVaR(returns, confidenceLevel) {
  const sortedReturns = [...returns].sort((a, b) => a - b);
  const index = Math.floor(sortedReturns.length * (1 - confidenceLevel));
  return -sortedReturns[index];
}

// Expected Shortfall (Conditional VaR)
function calculateExpectedShortfall(returns, confidenceLevel) {
  const sortedReturns = [...returns].sort((a, b) => a - b);
  const varIndex = Math.floor(sortedReturns.length * (1 - confidenceLevel));
  const tailReturns = sortedReturns.slice(0, varIndex);

  if (tailReturns.length === 0) return 0;

  const tailAverage = tailReturns.reduce((sum, val) => sum + val, 0) / tailReturns.length;
  return -tailAverage;
}
```

This documentation provides a comprehensive overview of the Equihome Fund Modeling application, including all variables, calculations, algorithms, and implementation details. It serves as a reference for understanding the financial model and its components.
