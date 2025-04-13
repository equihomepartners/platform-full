# Equihome Business Model Documentation

## Overview

This document provides a detailed explanation of Equihome's business model as implemented in the simulation engine. It serves as a reference for understanding the financial calculations, assumptions, and parameters used in the simulation.

## Loan Product

Equihome offers a unique no-monthly-payment loan product to homeowners, providing access to home equity without the burden of monthly payments.

### Key Features

1. **No Monthly Payments**: Homeowners are not required to make monthly payments on the loan.
2. **10-Year Term**: The loan has a 10-year term, but homeowners can exit at any time through refinance or property sale.
3. **Equity Access**: Homeowners can access their home equity without increasing their monthly debt burden.

### Fee Structure

1. **Origination Fee**: 3% of the loan amount, charged upfront and deducted from the loan amount.
2. **Simple Interest**: 5% simple interest per annum, capitalized to the end of the term or upon exit.
3. **Appreciation Fee**: Equal to the LTV percentage of the property's appreciation.
   - Example: If a property increases in value from $1M to $2M with a 40% LTV loan, the appreciation fee would be 40% of the $1M appreciation, or $400,000.

### Exit Scenarios

1. **Property Sale**: Homeowner sells the property and repays the loan plus accrued interest and appreciation fee.
2. **Refinance**: Homeowner refinances with another lender and repays the loan plus accrued interest and appreciation fee.
3. **End of Term**: At the end of the 10-year term, the loan becomes due, and the homeowner must repay the loan plus accrued interest and appreciation fee.

## Fund Structure

Equihome operates as an investment fund with General Partners (GPs) and Limited Partners (LPs).

### GP Economics

1. **Origination Fee**: The 3% origination fee charged to homeowners goes to the GP.
2. **Management Fee**: 2% annual management fee on assets under management (AUM).
3. **Performance Fee**: 20% of profits above a hurdle rate (typically 6%).
4. **GP Investment**: GPs typically invest 5% of the fund size alongside LPs.

### LP Economics

1. **Capital Contribution**: LPs provide the majority of the fund's capital (typically 95%).
2. **Preferred Return**: LPs receive a preferred return (hurdle rate, typically 6%) before GPs receive carried interest.
3. **Residual Returns**: After the preferred return and GP catch-up, LPs receive 80% of remaining profits.

### Waterfall Distribution

The distribution of profits follows a standard waterfall structure:

1. **Return of Capital**: All investors (LPs and GPs) receive their invested capital back.
2. **Preferred Return**: LPs receive their preferred return (hurdle rate) on invested capital.
3. **GP Catch-up**: GPs receive a catch-up allocation to reach their carried interest percentage.
4. **Carried Interest**: Remaining profits are split with 20% to GPs and 80% to LPs.

## Financial Calculations

### Loan Exit Value

The exit value of a loan is calculated as:

```
Exit Value = Loan Amount + Simple Interest + Appreciation Fee
```

Where:
- **Loan Amount**: The original loan amount (after deducting the 3% origination fee).
- **Simple Interest**: 5% simple interest on the loan amount for the duration of the loan.
- **Appreciation Fee**: LTV percentage of the property's appreciation.

### Property Appreciation

Property appreciation is calculated using compound interest:

```
Appreciated Property Value = Property Value * (1 + Appreciation Rate)^Years Held
```

Where:
- **Property Value**: The original property value at loan origination.
- **Appreciation Rate**: The annual appreciation rate for the property (varies by zone).
- **Years Held**: The number of years the loan is held.

### Fund Returns

Fund returns are calculated based on:

1. **Cash Inflows**:
   - Loan exit values (principal + interest + appreciation fees)
   - Origination fees

2. **Cash Outflows**:
   - Initial investment
   - Management fees
   - Performance fees

3. **Key Metrics**:
   - **IRR (Internal Rate of Return)**: The discount rate that makes the net present value of all cash flows equal to zero.
   - **Equity Multiple**: Total return divided by total investment.
   - **ROI (Return on Investment)**: (Total return - Total investment) / Total investment.

## Simulation Parameters

The simulation engine allows for configuring various parameters to model different scenarios:

### Fund Settings

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `fund_size` | Total size of the fund | $100,000,000 |
| `fund_term` | Duration of the fund in years | 10 |
| `simple_interest_rate` | Annual interest rate on loans | 5% |
| `origination_fee_rate` | Loan origination fee percentage | 3% |
| `management_fee_rate` | Annual management fee percentage | 2% |
| `performance_fee_rate` | Carried interest percentage | 20% |
| `hurdle_rate` | Minimum return to LPs before carried interest | 6% |
| `gp_investment_percentage` | GP's investment as percentage of fund size | 5% |

### Loan Parameters

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `average_property_value` | Average property value | $1,000,000 |
| `average_ltv` | Average Loan-to-Value ratio | 70% |
| `ltv_variance` | Variance in LTV ratios | 5% |
| `property_value_variance` | Variance in property values | 20% |
| `early_exit_probability` | Probability of early loan exit | 20% |
| `average_exit_year` | Average year of loan exit | 7 |

### Zone Allocations

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `green_zone_allocation` | Allocation to green zone properties | 60% |
| `orange_zone_allocation` | Allocation to orange zone properties | 30% |
| `red_zone_allocation` | Allocation to red zone properties | 10% |
| `appreciation_rate_green` | Annual appreciation rate for green zone | 5% |
| `appreciation_rate_orange` | Annual appreciation rate for orange zone | 3% |
| `appreciation_rate_red` | Annual appreciation rate for red zone | 2% |

## Integration with Traffic Light System

The simulation engine integrates with the Traffic Light System to incorporate suburb risk classifications and growth forecasts:

1. **Zone Classifications**:
   - **Green Zones**: Low-risk suburbs with high growth potential (default appreciation rate: 5%)
   - **Orange Zones**: Medium-risk suburbs with moderate growth (default appreciation rate: 3%)
   - **Red Zones**: Higher-risk suburbs with lower growth potential (default appreciation rate: 2%)

2. **Suburb Allocations**:
   - The simulation engine can optimize suburb allocations based on risk-return profiles from the Traffic Light System.
   - Optimal allocations aim to maximize returns while managing risk through diversification.

## Conclusion

This business model documentation provides a comprehensive overview of Equihome's unique loan product and fund structure as implemented in the simulation engine. It serves as a reference for understanding the financial calculations, assumptions, and parameters used in the simulation.

The simulation engine is designed to be highly configurable, allowing for manual financial modeling of various scenarios to optimize fund performance and risk management.
