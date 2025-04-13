/**
 * Mock Simulation Data
 * 
 * This file contains mock data for the Simulation API client.
 * It is used as a fallback when the API is unavailable.
 */

/**
 * Mock Fund Settings
 */
export const mockFundSettings = {
  // Fund Information
  fund_name: 'Equihome Fund I',
  fund_size: 100000000,
  fund_term: 10,
  fund_type: 'closed',
  vintage_year: new Date().getFullYear(),
  time_horizon: 10,

  // Fee Structure
  management_fee_rate: 0.02,
  hurdle_rate: 0.06,
  performance_fee_rate: 0.20,
  origination_fee_rate: 0.03,
  simple_interest_rate: 0.05,
  gp_investment_percentage: 0.05,

  // Capital Calls
  capital_call_schedule: 'custom',
  initial_investment: 25000000,
  call1_date: 0,
  call1_amount: 25000000,
  call2_date: 3,
  call2_amount: 25000000,
  call3_date: 6,
  call3_amount: 25000000,
  call4_date: 9,
  call4_amount: 25000000,

  // Loan Parameters
  average_property_value: 500000,
  average_ltv: 0.5,
  max_ltv: 0.75,
  green_zone_allocation: 0.6,
  orange_zone_allocation: 0.3,
  red_zone_allocation: 0.1,
  early_exit_probability: 0.1,
  average_exit_year: 5,
  exit_year_std_dev: 1.5,
  reinvestment_cap_year: 5
};

/**
 * Mock Portfolio Generation Parameters
 */
export const mockPortfolioGeneration = {
  // Portfolio Parameters
  num_loans: 400,
  ltv_variance: 0.1,
  property_value_variance: 0.2,
  appreciation_rate_green: 0.05,
  appreciation_rate_orange: 0.03,
  appreciation_rate_red: 0.01,
};

/**
 * Mock Portfolio
 */
export const mockPortfolio = {
  loans: Array(20).fill(null).map((_, i) => ({
    id: `loan_${i + 1}`,
    propertyValue: 500000 + (Math.random() * 200000 - 100000),
    loanAmount: 250000 + (Math.random() * 100000 - 50000),
    ltv: 0.5 + (Math.random() * 0.1 - 0.05),
    zone: ['green', 'orange', 'red'][Math.floor(Math.random() * 3)],
    exitYear: Math.floor(Math.random() * 10) + 1,
    appreciationRate: 0.03 + (Math.random() * 0.04 - 0.02),
    originationYear: 0,
    willExitEarly: Math.random() > 0.9,
    willBeReinvested: Math.random() > 0.7,
    originationFee: 7500 + (Math.random() * 3000 - 1500),
    interestRate: 0.05,
    expectedExitValue: 300000 + (Math.random() * 100000)
  })),
  reinvestments: Array(5).fill(null).map((_, i) => ({
    id: `reinv_loan_${i + 1}`,
    propertyValue: 550000 + (Math.random() * 200000 - 100000),
    loanAmount: 275000 + (Math.random() * 100000 - 50000),
    ltv: 0.5 + (Math.random() * 0.1 - 0.05),
    zone: ['green', 'orange', 'red'][Math.floor(Math.random() * 3)],
    exitYear: 10,
    appreciationRate: 0.03 + (Math.random() * 0.04 - 0.02),
    originationYear: 5,
    willExitEarly: false,
    willBeReinvested: false,
    reinvestedFrom: `loan_${i + 1}`,
    originationFee: 8250 + (Math.random() * 3000 - 1500),
    interestRate: 0.05,
    expectedExitValue: 330000 + (Math.random() * 100000)
  })),
  metrics: {
    initialLoans: 400,
    totalReinvestments: 5,
    totalLoans: 405,
    averageLoanSize: 250000,
    averageLTV: 0.5,
    weightedAppreciation: 0.038,
    extendedTerm: 15,
    totalInitialValue: 100000000,
    totalReinvestmentValue: 1375000,
    expectedIRR: 0.143,
    expectedMultiple: 2.4
  }
};

/**
 * Mock Simulation Result
 */
export const mockSimulationResult = {
  id: 'sim_12345',
  timestamp: new Date().toISOString(),
  status: 'completed',
  duration_ms: 1250,
  parameters: {
    fund_size: 100000000,
    fund_term: 10,
    management_fee_rate: 0.02,
    hurdle_rate: 0.06,
    performance_fee_rate: 0.20,
    gp_investment_percentage: 0.05
  },
  results: {
    irr: 14.3,
    gross_irr: 18.7,
    equity_multiple: 2.4,
    moic: 2.4,
    total_investment: 100000000,
    total_return: 240000000,
    net_profit: 140000000,
    roi: 140.0,
    dpi: 2.4,
    rvpi: 0.0,
    tvpi: 2.4,
    sharpe_ratio: 1.8,
    sortino_ratio: 2.5,
    value_at_risk: 0.05,
    expected_shortfall: 0.08,
    optimal_allocation: [
      { suburb: 'Parramatta', allocation: 15, expected_return: 16.5, risk_score: 35, zone: 'green' },
      { suburb: 'Blacktown', allocation: 12, expected_return: 15.2, risk_score: 38, zone: 'green' },
      { suburb: 'Liverpool', allocation: 10, expected_return: 14.8, risk_score: 42, zone: 'yellow' },
      { suburb: 'Penrith', allocation: 8, expected_return: 13.5, risk_score: 45, zone: 'yellow' },
      { suburb: 'Hornsby', allocation: 15, expected_return: 17.2, risk_score: 32, zone: 'green' },
      { suburb: 'Chatswood', allocation: 18, expected_return: 18.5, risk_score: 30, zone: 'green' },
      { suburb: 'Bankstown', allocation: 10, expected_return: 14.2, risk_score: 44, zone: 'yellow' },
      { suburb: 'Hurstville', allocation: 8, expected_return: 13.8, risk_score: 46, zone: 'yellow' },
      { suburb: 'Sutherland', allocation: 4, expected_return: 12.5, risk_score: 50, zone: 'red' }
    ]
  },
  gp_economics: {
    gp_investment: 5000000,
    management_fees: 20000000,
    carried_interest: 16000000,
    gp_irr: 28.5,
    gp_multiple: 7.2,
    gp_roi: 620.0
  },
  lp_economics: {
    lp_investment: 95000000,
    preferred_return: 60000000,
    lp_irr: 13.2,
    lp_multiple: 2.15,
    lp_roi: 115.0
  },
  yearly_metrics: Array(11).fill(null).map((_, i) => ({
    year: i,
    active_loans: i === 0 ? 400 : Math.max(0, 400 - (i * 40)),
    deployed_capital: i === 0 ? 100000000 : Math.max(0, 100000000 - (i * 10000000)),
    portfolio_value: i === 0 ? 100000000 : 100000000 * Math.pow(1.1, i),
    yearly_return: i === 0 ? 0 : 0.1 + (Math.random() * 0.05 - 0.025),
    cumulative_return: i === 0 ? 0 : (1.1 ** i) - 1
  })),
  cash_flows: Array(11).fill(null).map((_, i) => ({
    year: i,
    inflow: i === 0 ? 0 : 10000000 + (i * 2000000) + (Math.random() * 1000000 - 500000),
    outflow: i === 0 ? 100000000 : 2000000 + (Math.random() * 500000 - 250000),
    net_cash_flow: i === 0 ? -100000000 : (10000000 + (i * 2000000)) - 2000000,
    cumulative_cash_flow: i === 0 ? -100000000 : -100000000 + ((10000000 + (i * 1000000)) * i)
  }))
};

/**
 * Mock Fund Metrics
 */
export const mockFundMetrics = {
  irr: 14.3,
  gross_irr: 18.7,
  equity_multiple: 2.4,
  moic: 2.4,
  total_investment: 100000000,
  total_return: 240000000,
  net_profit: 140000000,
  roi: 140.0,
  dpi: 2.4,
  rvpi: 0.0,
  tvpi: 2.4,
  sharpe_ratio: 1.8,
  sortino_ratio: 2.5,
  value_at_risk: 0.05,
  expected_shortfall: 0.08
};

/**
 * Mock Waterfall Distribution
 */
export const mockWaterfallDistribution = {
  lpReturnOfCapital: 95000000,
  gpReturnOfCapital: 5000000,
  hurdleAmount: 60000000,
  gpCatchup: 15000000,
  gpCarriedInterest: 16000000,
  lpResidual: 49000000,
  totalGpReturn: 36000000,
  totalLpReturn: 204000000
};

/**
 * Export all mock data
 */
export const mockSimulationData = {
  fundSettings: mockFundSettings,
  portfolioGeneration: mockPortfolioGeneration,
  portfolio: mockPortfolio,
  simulationResult: mockSimulationResult,
  fundMetrics: mockFundMetrics,
  waterfallDistribution: mockWaterfallDistribution
};

export default mockSimulationData;
