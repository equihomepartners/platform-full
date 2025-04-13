/**
 * Portfolio Management System Types
 *
 * This file contains all the TypeScript interfaces for the Portfolio Management System.
 */

/**
 * Portfolio Summary
 *
 * Overall summary of the portfolio
 */
export interface PortfolioSummary {
  totalValue: number;
  totalProperties: number;
  totalSuburbs: number;
  averageLtv: number;
  totalEquity: number;
  totalDebt: number;
  performanceScore: number;
  fundIRR: number;
  riskScore: number;
  diversificationScore: number;
  suburbCoverage: number;
}

/**
 * Performance Metrics
 *
 * Metrics related to portfolio performance
 */
export interface PerformanceMetrics {
  irr: number;
  roi: number;
  cashOnCash: number;
  capRate: number;
  grossYield: number;
  netYield: number;
  cashFlow: number;
  appreciation: number;
  totalReturn: number;
  paybackPeriod: number;
  breakEvenOccupancy: number;
  debtServiceCoverageRatio: number;
  historicalPerformance: {
    period: string;
    value: number;
  }[];
}

/**
 * Risk Metrics
 *
 * Metrics related to portfolio risk
 */
export interface RiskMetrics {
  volatility: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maxDrawdown: number;
  valueAtRisk: number;
  stressTestResults: {
    scenario: string;
    impact: number;
  }[];
  concentrationRisk: {
    category: string;
    value: number;
  }[];
  riskFactors: {
    factor: string;
    impact: number;
    likelihood: number;
    score: number;
  }[];
}

/**
 * Allocation Data
 *
 * Data related to portfolio allocation
 */
export interface AllocationData {
  bySuburb: {
    suburb: string;
    value: number;
    percentage: number;
  }[];
  byPropertyType: {
    type: string;
    value: number;
    percentage: number;
  }[];
  byLoanType: {
    type: string;
    value: number;
    percentage: number;
  }[];
  byRiskCategory: {
    category: string;
    value: number;
    percentage: number;
  }[];
}

/**
 * Cash Flow Projection
 *
 * Projected cash flows
 */
export interface CashFlowProjection {
  period: string;
  inflows: number;
  outflows: number;
  netCashFlow: number;
  cumulativeCashFlow: number;
}

/**
 * Loan
 *
 * Information about a loan
 */
export interface Loan {
  id: string;
  propertyId: string;
  propertyAddress: string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  loanType: string;
  paymentAmount: number;
  remainingBalance: number;
  originationDate: string;
  maturityDate: string;
  loanToValue: number;
  status: string;
}

/**
 * Fund Parameter
 *
 * Parameter for fund management
 */
export interface FundParameter {
  id: string;
  name: string;
  category: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  default: number;
  description: string;
  impact: string;
}

/**
 * Fund Settings
 *
 * Settings for the fund simulation
 */
export interface FundSettings {
  // Fund Information
  fund_name: string;
  fund_size: number;
  fund_term: number;
  fund_type: string;
  vintage_year: number;
  time_horizon: number;

  // Fee Structure
  management_fee_rate: number;
  hurdle_rate: number;
  performance_fee_rate: number;
  origination_fee_rate: number;
  simple_interest_rate: number;
  gp_investment_percentage: number;

  // Capital Calls
  capital_call_schedule: string;
  initial_investment: number;
  call1_date: number;
  call1_amount: number;
  call2_date: number;
  call2_amount: number;
  call3_date: number;
  call3_amount: number;
  call4_date: number;
  call4_amount: number;

  // Loan Parameters
  average_property_value: number;
  average_ltv: number;
  max_ltv: number;
  green_zone_allocation: number;
  orange_zone_allocation: number;
  red_zone_allocation: number;
  early_exit_probability: number;
  average_exit_year: number;
  exit_year_std_dev: number;
  reinvestment_cap_year: number;
}

/**
 * Portfolio Generation
 *
 * Parameters for portfolio generation
 */
export interface PortfolioGeneration {
  // Portfolio Parameters
  num_loans: number;
  ltv_variance: number;
  property_value_variance: number;
  appreciation_rate_green: number;
  appreciation_rate_orange: number;
  appreciation_rate_red: number;
}

/**
 * Loan
 *
 * Represents a loan in the portfolio
 */
export interface SimulationLoan {
  id: string;
  propertyValue: number;
  loanAmount: number;
  ltv: number;
  zone: string;
  exitYear: number;
  appreciationRate: number;
  originationYear: number;
  willExitEarly: boolean;
  willBeReinvested: boolean;
  originationFee: number;
  interestRate: number;
  expectedExitValue: number;
  reinvestedFrom?: string;
}

/**
 * Portfolio
 *
 * Generated portfolio for simulation
 */
export interface Portfolio {
  loans: SimulationLoan[];
  reinvestments: SimulationLoan[];
  metrics: {
    initialLoans: number;
    totalReinvestments: number;
    totalLoans: number;
    averageLoanSize: number;
    averageLTV: number;
    weightedAppreciation: number;
    extendedTerm: number;
    totalInitialValue: number;
    totalReinvestmentValue: number;
    expectedIRR: number;
    expectedMultiple: number;
  };
}

/**
 * Simulation Parameters
 *
 * Parameters for running a simulation
 */
export interface SimulationParams {
  portfolio?: Portfolio;
  fund_settings?: FundSettings;
  tfs_data?: any;
}

/**
 * Simulation Result
 *
 * Result of a portfolio simulation
 */
export interface SimulationResult {
  id: string;
  timestamp: string;
  status: string;
  duration_ms: number;
  parameters: {
    fund_size: number;
    fund_term: number;
    management_fee_rate: number;
    hurdle_rate: number;
    performance_fee_rate: number;
    gp_investment_percentage: number;
    [key: string]: any;
  };
  results: {
    irr: number;
    gross_irr: number;
    equity_multiple: number;
    moic: number;
    total_investment: number;
    total_return: number;
    net_profit: number;
    roi: number;
    risk_score?: number;
    dpi: number;
    rvpi: number;
    tvpi: number;
    sharpe_ratio: number;
    sortino_ratio: number;
    value_at_risk: number;
    expected_shortfall: number;
    optimal_allocation?: {
      suburb: string;
      allocation: number;
      expected_return: number;
      risk_score: number;
      zone: string;
    }[];
  };
  gp_economics: {
    gp_investment: number;
    management_fees: number;
    carried_interest: number;
    gp_irr: number;
    gp_multiple: number;
    gp_roi: number;
  };
  lp_economics: {
    lp_investment: number;
    preferred_return: number;
    lp_irr: number;
    lp_multiple: number;
    lp_roi: number;
  };
  yearly_metrics: {
    year: number;
    active_loans: number;
    deployed_capital: number;
    portfolio_value: number;
    yearly_return: number;
    cumulative_return: number;
  }[];
  cash_flows: {
    year: number;
    inflow: number;
    outflow: number;
    net_cash_flow: number;
    cumulative_cash_flow: number;
  }[];
  tfs_integration?: {
    integrated: boolean;
    suburbs_count: number;
    zone_distribution: {
      green: string;
      yellow: string;
      red: string;
    };
    timestamp: string;
  };
}

/**
 * Stress Test Result
 *
 * Result of a portfolio stress test
 */
export interface StressTestResult {
  id: string;
  scenario: string;
  description: string;
  impactSummary: {
    totalValue: number;
    percentageChange: number;
    riskScore: number;
  };
  metricImpacts: {
    metric: string;
    baseValue: number;
    stressedValue: number;
    percentageChange: number;
  }[];
  suburbImpacts: {
    suburb: string;
    baseValue: number;
    stressedValue: number;
    percentageChange: number;
  }[];
  recommendations: string[];
}

/**
 * Portfolio Analytics
 *
 * Advanced analytics for the portfolio
 */
export interface PortfolioAnalytics {
  timeframe: string;
  performanceSummary: {
    startValue: number;
    endValue: number;
    percentageChange: number;
    annualizedReturn: number;
  };
  benchmarkComparison: {
    benchmark: string;
    portfolioReturn: number;
    benchmarkReturn: number;
    alpha: number;
    beta: number;
  }[];
  attributionAnalysis: {
    factor: string;
    contribution: number;
    percentage: number;
  }[];
  trendAnalysis: {
    metric: string;
    data: {
      period: string;
      value: number;
    }[];
  }[];
  correlationMatrix: {
    [key: string]: {
      [key: string]: number;
    };
  };
}
