import { FundSettings, Portfolio, SimulationResult } from '../types/portfolioTypes';

/**
 * Mock Fund Settings
 */
export const mockFundSettings: FundSettings = {
  fund_name: 'Equihome Fund I',
  fund_size: 100000000,
  fund_term: 10,
  fund_type: 'closed',
  vintage_year: new Date().getFullYear(),
  time_horizon: 10,
  management_fee_rate: 0.02,
  hurdle_rate: 0.06,
  performance_fee_rate: 0.20,
  origination_fee_rate: 0.03,
  simple_interest_rate: 0.05,
  gp_investment_percentage: 0.05,
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
 * Mock Portfolio
 */
export const mockPortfolio: Portfolio = {
  loans: Array.from({ length: 200 }, (_, i) => ({
    id: `loan_${i + 1}`,
    propertyValue: 500000 + Math.random() * 200000 - 100000,
    loanAmount: 250000 + Math.random() * 100000 - 50000,
    ltv: 0.5 + Math.random() * 0.1 - 0.05,
    zone: Math.random() < 0.6 ? 'green' : Math.random() < 0.9 ? 'orange' : 'red',
    exitYear: Math.min(10, Math.max(1, Math.round(5 + Math.random() * 3 - 1.5))),
    appreciationRate: 0.03 + Math.random() * 0.02,
    originationYear: 0,
    willExitEarly: Math.random() < 0.1,
    willBeReinvested: Math.random() < 0.7,
    originationFee: 7500 + Math.random() * 2500,
    interestRate: 0.05,
    expectedExitValue: 350000 + Math.random() * 100000,
    reinvestedFrom: null
  })),
  reinvestments: Array.from({ length: 100 }, (_, i) => ({
    id: `reinv_loan_${i + 1}`,
    propertyValue: 550000 + Math.random() * 200000 - 100000,
    loanAmount: 275000 + Math.random() * 100000 - 50000,
    ltv: 0.5 + Math.random() * 0.1 - 0.05,
    zone: Math.random() < 0.6 ? 'green' : Math.random() < 0.9 ? 'orange' : 'red',
    exitYear: Math.min(10, Math.max(6, Math.round(8 + Math.random() * 2 - 1))),
    appreciationRate: 0.03 + Math.random() * 0.02,
    originationYear: Math.min(5, Math.max(2, Math.round(3 + Math.random() * 2 - 1))),
    willExitEarly: false,
    willBeReinvested: false,
    originationFee: 8250 + Math.random() * 2500,
    interestRate: 0.05,
    expectedExitValue: 385000 + Math.random() * 100000,
    reinvestedFrom: `loan_${Math.floor(Math.random() * 200) + 1}`
  })),
  metrics: {
    initialLoans: 200,
    totalReinvestments: 100,
    totalLoans: 300,
    averageLoanSize: 262500,
    averageLTV: 0.5,
    weightedAppreciation: 0.04,
    extendedTerm: 10,
    totalInitialValue: 50000000,
    totalReinvestmentValue: 27500000,
    expectedIRR: 0.143,
    expectedMultiple: 2.4
  }
};

/**
 * Mock Simulation Result
 */
export const mockSimulationResult: SimulationResult = {
  id: `sim_${new Date().getTime()}`,
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
    gross_irr: 17.9,
    equity_multiple: 2.4,
    moic: 2.4,
    total_investment: 100000000,
    total_return: 240000000,
    net_profit: 140000000,
    roi: 140,
    dpi: 2.4,
    rvpi: 0.0,
    tvpi: 2.4,
    sharpe_ratio: 1.8,
    sortino_ratio: 2.2,
    value_at_risk: 0.12,
    expected_shortfall: 0.15,
    optimal_allocation: [
      {
        suburb: 'Bondi',
        allocation: 15.0,
        expected_return: 12.5,
        risk_score: 0.8,
        zone: 'green'
      },
      {
        suburb: 'Manly',
        allocation: 12.0,
        expected_return: 11.8,
        risk_score: 0.7,
        zone: 'green'
      },
      {
        suburb: 'Cronulla',
        allocation: 10.0,
        expected_return: 10.5,
        risk_score: 0.6,
        zone: 'green'
      },
      {
        suburb: 'Parramatta',
        allocation: 8.0,
        expected_return: 9.8,
        risk_score: 1.2,
        zone: 'orange'
      },
      {
        suburb: 'Liverpool',
        allocation: 7.0,
        expected_return: 9.2,
        risk_score: 1.4,
        zone: 'orange'
      },
      {
        suburb: 'Penrith',
        allocation: 5.0,
        expected_return: 8.5,
        risk_score: 1.8,
        zone: 'red'
      }
    ]
  },
  gp_economics: {
    gp_investment: 5000000,
    management_fees: 20000000,
    carried_interest: 15000000,
    gp_irr: 21.5,
    gp_multiple: 8.0,
    gp_roi: 700
  },
  lp_economics: {
    lp_investment: 95000000,
    preferred_return: 57000000,
    lp_irr: 12.9,
    lp_multiple: 2.1,
    lp_roi: 110
  },
  yearly_metrics: Array.from({ length: 11 }, (_, i) => ({
    year: i,
    active_loans: i === 0 ? 200 : i < 5 ? 200 - Math.floor(i * 20) + Math.floor(i * 15) : 200 - Math.floor(i * 30) + Math.floor(5 * 15),
    deployed_capital: i === 0 ? 50000000 : i < 5 ? 50000000 - i * 5000000 + i * 4000000 : 50000000 - i * 7000000 + 5 * 4000000,
    portfolio_value: i === 0 ? 50000000 : 50000000 * Math.pow(1.1, i),
    yearly_return: i === 0 ? 0 : 0.1 + Math.random() * 0.05 - 0.025,
    cumulative_return: i === 0 ? 0 : Math.pow(1.1, i) - 1
  })),
  cash_flows: Array.from({ length: 11 }, (_, i) => ({
    year: i,
    inflow: i === 0 ? 0 : i < 5 ? i * 15000000 : (10 - i) * 40000000,
    outflow: i === 0 ? 50000000 : i < 5 ? i * 10000000 : 0,
    net_cash_flow: i === 0 ? -50000000 : i < 5 ? i * 5000000 : (10 - i) * 40000000,
    cumulative_cash_flow: i === 0 ? -50000000 : i === 1 ? -45000000 : i === 2 ? -35000000 : i === 3 ? -20000000 : i === 4 ? 0 : i === 5 ? 25000000 : i === 6 ? 65000000 : i === 7 ? 105000000 : i === 8 ? 145000000 : i === 9 ? 185000000 : 240000000
  })),
  tfs_integration: {
    integrated: true,
    suburbs_count: 120,
    zone_distribution: {
      green: '60.0%',
      yellow: '30.0%',
      red: '10.0%'
    },
    timestamp: new Date().toISOString()
  }
};
