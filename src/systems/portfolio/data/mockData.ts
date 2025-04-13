/**
 * Mock data for the Portfolio Management System
 * This file contains mock data for the portfolio dashboard and other components
 */

import {
  PortfolioSummary,
  PerformanceMetrics,
  RiskMetrics,
  AllocationData,
  CashFlowProjection,
  Loan,
  FundParameter,
  SimulationResult,
  StressTestResult,
  PortfolioAnalytics
} from '../types/portfolioTypes';

export const mockPortfolioData = {
  // Portfolio summary data
  portfolioSummary: {
    totalValue: 24750000,
    totalProperties: 45,
    totalSuburbs: 18,
    averageLtv: 65.3,
    totalEquity: 8580000,
    totalDebt: 16170000,
    performanceScore: 82,
    fundIRR: 8.7,
    riskScore: 38,
    diversificationScore: 76,
    suburbCoverage: 68
  },

  // Performance metrics
  performanceMetrics: {
    irr: 8.7,
    roi: 12.4,
    cashYield: 5.2,
    sharpeRatio: 1.8,
    totalReturn: 3250000,
    annualizedReturn: 9.6,
    benchmarkComparison: 2.3,
    alphaGeneration: 1.4,
    betaValue: 0.85,
    volatility: 6.2
  },

  // Risk metrics
  riskMetrics: {
    riskScore: 38,
    defaultRate: 1.2,
    expectedLoss: 2.8,
    concentrationRisk: 42,
    liquidityRisk: 35,
    stressTestImpact: 8.5,
    valuationRisk: 3.2,
    interestRateRisk: 4.5,
    marketRisk: 5.1,
    creditRisk: 2.7
  },

  // Allocation data
  allocationData: {
    // Allocation by suburb
    suburbAllocation: [
      { suburb: 'Parramatta', allocation: 18, zone: 'green' },
      { suburb: 'Liverpool', allocation: 15, zone: 'green' },
      { suburb: 'Blacktown', allocation: 12, zone: 'yellow' },
      { suburb: 'Penrith', allocation: 10, zone: 'yellow' },
      { suburb: 'Campbelltown', allocation: 8, zone: 'red' },
      { suburb: 'Other', allocation: 37, zone: 'mixed' }
    ],

    // Allocation by property type
    propertyTypeAllocation: [
      { type: 'House', allocation: 45 },
      { type: 'Apartment', allocation: 30 },
      { type: 'Townhouse', allocation: 15 },
      { type: 'Land', allocation: 10 }
    ],

    // Allocation by zone
    zoneAllocation: {
      green: 55,
      yellow: 30,
      red: 15
    },

    // Target zone allocation
    targetZoneAllocation: {
      green: 60,
      yellow: 30,
      red: 10
    },

    // Top performing suburbs
    topSuburbs: [
      { name: 'Parramatta', growth: 8.2, zone: 'green' },
      { name: 'Liverpool', growth: 7.5, zone: 'green' },
      { name: 'Blacktown', growth: 6.8, zone: 'yellow' },
      { name: 'Penrith', growth: 6.2, zone: 'yellow' },
      { name: 'Campbelltown', growth: 5.5, zone: 'red' }
    ],

    // Allocation by risk level
    riskLevelAllocation: [
      { riskLevel: 'Low', allocation: 40 },
      { riskLevel: 'Medium', allocation: 45 },
      { riskLevel: 'High', allocation: 15 }
    ]
  },

  // Cash flow projections
  cashFlowProjections: [
    { month: 'Jan', income: 185000, expenses: 75000, netCashFlow: 110000 },
    { month: 'Feb', income: 182000, expenses: 78000, netCashFlow: 104000 },
    { month: 'Mar', income: 190000, expenses: 82000, netCashFlow: 108000 },
    { month: 'Apr', income: 187000, expenses: 80000, netCashFlow: 107000 },
    { month: 'May', income: 195000, expenses: 85000, netCashFlow: 110000 },
    { month: 'Jun', income: 192000, expenses: 83000, netCashFlow: 109000 }
  ],

  // Performance comparison
  performanceComparison: {
    currentReturn: 8.7,
    optimizedReturn: 10.2,
    returnDifference: 1.5,
    currentRisk: 6.2,
    optimizedRisk: 5.8,
    riskDifference: 0.4,
    currentSharpe: 1.8,
    optimizedSharpe: 2.1,
    sharpeDifference: 0.3,
    currentDrawdown: 12.5,
    optimizedDrawdown: 10.8,
    drawdownDifference: 1.7
  },

  // ESG metrics
  esgMetrics: {
    environmentalScore: 72,
    socialScore: 68,
    governanceScore: 75,
    overallEsgScore: 71,
    carbonFootprint: 28.5,
    energyEfficiency: 65,
    waterUsage: 42,
    wasteManagement: 58,
    communityImpact: 70,
    affordableHousing: 62
  },

  // Loan portfolio data
  loans: [
    {
      id: 'L001',
      borrowerName: 'John Smith',
      propertyAddress: '123 Main St, Parramatta NSW 2150',
      loanAmount: 650000,
      propertyValue: 950000,
      ltv: 68.4,
      interestRate: 4.25,
      term: 30,
      monthlyPayment: 3195,
      status: 'Active',
      zone: 'green',
      riskScore: 32
    },
    {
      id: 'L002',
      borrowerName: 'Sarah Johnson',
      propertyAddress: '45 Park Ave, Liverpool NSW 2170',
      loanAmount: 520000,
      propertyValue: 780000,
      ltv: 66.7,
      interestRate: 4.15,
      term: 30,
      monthlyPayment: 2525,
      status: 'Active',
      zone: 'green',
      riskScore: 28
    },
    {
      id: 'L003',
      borrowerName: 'Michael Brown',
      propertyAddress: '78 High St, Blacktown NSW 2148',
      loanAmount: 480000,
      propertyValue: 680000,
      ltv: 70.6,
      interestRate: 4.35,
      term: 30,
      monthlyPayment: 2390,
      status: 'Active',
      zone: 'yellow',
      riskScore: 45
    },
    {
      id: 'L004',
      borrowerName: 'Emily Wilson',
      propertyAddress: '12 River Rd, Penrith NSW 2750',
      loanAmount: 550000,
      propertyValue: 820000,
      ltv: 67.1,
      interestRate: 4.20,
      term: 30,
      monthlyPayment: 2690,
      status: 'Active',
      zone: 'yellow',
      riskScore: 41
    },
    {
      id: 'L005',
      borrowerName: 'David Lee',
      propertyAddress: '34 Queen St, Campbelltown NSW 2560',
      loanAmount: 420000,
      propertyValue: 580000,
      ltv: 72.4,
      interestRate: 4.50,
      term: 30,
      monthlyPayment: 2130,
      status: 'Active',
      zone: 'red',
      riskScore: 58
    }
  ],

  // Simulation results
  simulationResults: {
    id: 'sim-001',
    timestamp: new Date().toISOString(),
    parameters: {
      targetIRR: 12,
      maxLTV: 75,
      minDSCR: 1.25,
      investmentHorizon: 7,
      interestRateScenario: 'baseline',
      propertyAppreciationScenario: 'moderate',
      inflationScenario: 'moderate'
    },
    results: {
      irr: 14.2,
      roi: 98.5,
      npv: 3250000,
      paybackPeriod: 4.3,
      profitability: 1.32,
      riskScore: 42
    },
    cashFlows: [
      { period: 'Year 1', value: -15000000 },
      { period: 'Year 2', value: 1250000 },
      { period: 'Year 3', value: 1350000 },
      { period: 'Year 4', value: 1450000 },
      { period: 'Year 5', value: 1550000 },
      { period: 'Year 6', value: 1650000 },
      { period: 'Year 7', value: 26750000 }
    ],
    sensitivityAnalysis: [
      { parameter: 'Interest Rate', impact: -0.8 },
      { parameter: 'Property Appreciation', impact: 1.2 },
      { parameter: 'Vacancy Rate', impact: -0.5 },
      { parameter: 'Operating Expenses', impact: -0.3 },
      { parameter: 'Inflation', impact: -0.2 }
    ],
    probabilityDistribution: [
      { outcome: 'Below 10% IRR', probability: 0.15 },
      { outcome: '10-12% IRR', probability: 0.25 },
      { outcome: '12-14% IRR', probability: 0.30 },
      { outcome: '14-16% IRR', probability: 0.20 },
      { outcome: 'Above 16% IRR', probability: 0.10 }
    ],
    scenarios: [
      { name: 'Pessimistic', probability: 0.25, outcome: 10.5 },
      { name: 'Base Case', probability: 0.50, outcome: 14.2 },
      { name: 'Optimistic', probability: 0.25, outcome: 17.8 }
    ]
  },

  // Stress test results
  stressTestResults: {
    default: {
      id: 'st-001',
      scenario: 'Interest Rate Shock',
      description: 'Simulates a sudden 200 basis point increase in interest rates',
      impactSummary: {
        totalValue: 22275000,
        percentageChange: -10,
        riskScore: 65
      },
      metricImpacts: [
        { metric: 'IRR', baseValue: 14.2, stressedValue: 11.8, percentageChange: -16.9 },
        { metric: 'Cash Flow', baseValue: 1450000, stressedValue: 1050000, percentageChange: -27.6 },
        { metric: 'DSCR', baseValue: 1.35, stressedValue: 1.15, percentageChange: -14.8 },
        { metric: 'LTV', baseValue: 65.3, stressedValue: 72.5, percentageChange: 11.0 }
      ],
      suburbImpacts: [
        { suburb: 'Parramatta', baseValue: 3500000, stressedValue: 3080000, percentageChange: -12.0 },
        { suburb: 'Liverpool', baseValue: 2800000, stressedValue: 2520000, percentageChange: -10.0 },
        { suburb: 'Blacktown', baseValue: 2200000, stressedValue: 1980000, percentageChange: -10.0 },
        { suburb: 'Penrith', baseValue: 1800000, stressedValue: 1620000, percentageChange: -10.0 },
        { suburb: 'Campbelltown', baseValue: 1500000, stressedValue: 1320000, percentageChange: -12.0 }
      ],
      recommendations: [
        'Increase fixed-rate loan allocation to hedge against further rate increases',
        'Focus on properties with stronger cash flow to maintain DSCR',
        'Consider reducing leverage in high-risk suburbs',
        'Implement interest rate caps on variable rate loans'
      ]
    },
    'property-crash': {
      id: 'st-002',
      scenario: 'Property Market Crash',
      description: 'Simulates a severe downturn in the property market with 25% value reduction',
      impactSummary: {
        totalValue: 18562500,
        percentageChange: -25,
        riskScore: 85
      },
      metricImpacts: [
        { metric: 'IRR', baseValue: 14.2, stressedValue: 5.8, percentageChange: -59.2 },
        { metric: 'Cash Flow', baseValue: 1450000, stressedValue: 1250000, percentageChange: -13.8 },
        { metric: 'DSCR', baseValue: 1.35, stressedValue: 1.18, percentageChange: -12.6 },
        { metric: 'LTV', baseValue: 65.3, stressedValue: 87.1, percentageChange: 33.4 }
      ],
      suburbImpacts: [
        { suburb: 'Parramatta', baseValue: 3500000, stressedValue: 2450000, percentageChange: -30.0 },
        { suburb: 'Liverpool', baseValue: 2800000, stressedValue: 2100000, percentageChange: -25.0 },
        { suburb: 'Blacktown', baseValue: 2200000, stressedValue: 1540000, percentageChange: -30.0 },
        { suburb: 'Penrith', baseValue: 1800000, stressedValue: 1350000, percentageChange: -25.0 },
        { suburb: 'Campbelltown', baseValue: 1500000, stressedValue: 1050000, percentageChange: -30.0 }
      ],
      recommendations: [
        'Increase cash reserves to prepare for potential margin calls',
        'Identify properties for potential sale to reduce leverage',
        'Negotiate with lenders for covenant waivers',
        'Focus on operational improvements to maintain cash flow',
        'Consider hedging strategies to protect against further downside'
      ]
    },
    'recession': {
      id: 'st-003',
      scenario: 'Economic Recession',
      description: 'Simulates an economic recession with increased vacancy and reduced rents',
      impactSummary: {
        totalValue: 21037500,
        percentageChange: -15,
        riskScore: 75
      },
      metricImpacts: [
        { metric: 'IRR', baseValue: 14.2, stressedValue: 9.2, percentageChange: -35.2 },
        { metric: 'Cash Flow', baseValue: 1450000, stressedValue: 870000, percentageChange: -40.0 },
        { metric: 'DSCR', baseValue: 1.35, stressedValue: 0.95, percentageChange: -29.6 },
        { metric: 'LTV', baseValue: 65.3, stressedValue: 76.8, percentageChange: 17.6 }
      ],
      suburbImpacts: [
        { suburb: 'Parramatta', baseValue: 3500000, stressedValue: 2975000, percentageChange: -15.0 },
        { suburb: 'Liverpool', baseValue: 2800000, stressedValue: 2380000, percentageChange: -15.0 },
        { suburb: 'Blacktown', baseValue: 2200000, stressedValue: 1760000, percentageChange: -20.0 },
        { suburb: 'Penrith', baseValue: 1800000, stressedValue: 1440000, percentageChange: -20.0 },
        { suburb: 'Campbelltown', baseValue: 1500000, stressedValue: 1200000, percentageChange: -20.0 }
      ],
      recommendations: [
        'Implement tenant retention strategies to minimize vacancy',
        'Consider rent concessions to maintain occupancy',
        'Reduce non-essential capital expenditures',
        'Establish additional credit facilities for liquidity',
        'Focus on defensive suburbs with stable employment'
      ]
    }
  },

  // Portfolio analytics
  analytics: {
    timeframe: '1y',
    performanceSummary: {
      startValue: 22500000,
      endValue: 24750000,
      percentageChange: 10,
      annualizedReturn: 10
    },
    benchmarkComparison: [
      {
        benchmark: 'ASX 200 A-REIT',
        portfolioReturn: 10,
        benchmarkReturn: 7.5,
        alpha: 2.5,
        beta: 0.85
      },
      {
        benchmark: 'CoreLogic Residential Property Index',
        portfolioReturn: 10,
        benchmarkReturn: 8.2,
        alpha: 1.8,
        beta: 0.9
      },
      {
        benchmark: 'RBA Cash Rate + 5%',
        portfolioReturn: 10,
        benchmarkReturn: 6.1,
        alpha: 3.9,
        beta: 0.3
      }
    ],
    attributionAnalysis: [
      { factor: 'Suburb Selection', contribution: 3.8, percentage: 38 },
      { factor: 'Property Type', contribution: 2.2, percentage: 22 },
      { factor: 'Leverage', contribution: 2.5, percentage: 25 },
      { factor: 'Asset Management', contribution: 1.5, percentage: 15 }
    ],
    trendAnalysis: [
      {
        metric: 'Total Value',
        data: [
          { period: 'Jan', value: 22500000 },
          { period: 'Feb', value: 22750000 },
          { period: 'Mar', value: 23000000 },
          { period: 'Apr', value: 23250000 },
          { period: 'May', value: 23500000 },
          { period: 'Jun', value: 23750000 },
          { period: 'Jul', value: 24000000 },
          { period: 'Aug', value: 24250000 },
          { period: 'Sep', value: 24500000 },
          { period: 'Oct', value: 24750000 },
          { period: 'Nov', value: 24750000 },
          { period: 'Dec', value: 24750000 }
        ]
      },
      {
        metric: 'Cash Flow',
        data: [
          { period: 'Jan', value: 112500 },
          { period: 'Feb', value: 113750 },
          { period: 'Mar', value: 115000 },
          { period: 'Apr', value: 116250 },
          { period: 'May', value: 117500 },
          { period: 'Jun', value: 118750 },
          { period: 'Jul', value: 120000 },
          { period: 'Aug', value: 121250 },
          { period: 'Sep', value: 122500 },
          { period: 'Oct', value: 123750 },
          { period: 'Nov', value: 123750 },
          { period: 'Dec', value: 123750 }
        ]
      }
    ],
    correlationMatrix: {
      'Property Value': {
        'Property Value': 1.0,
        'Interest Rates': -0.65,
        'Unemployment': -0.72,
        'GDP Growth': 0.81,
        'Inflation': 0.45
      },
      'Interest Rates': {
        'Property Value': -0.65,
        'Interest Rates': 1.0,
        'Unemployment': 0.58,
        'GDP Growth': -0.62,
        'Inflation': 0.75
      },
      'Unemployment': {
        'Property Value': -0.72,
        'Interest Rates': 0.58,
        'Unemployment': 1.0,
        'GDP Growth': -0.85,
        'Inflation': -0.32
      },
      'GDP Growth': {
        'Property Value': 0.81,
        'Interest Rates': -0.62,
        'Unemployment': -0.85,
        'GDP Growth': 1.0,
        'Inflation': 0.38
      },
      'Inflation': {
        'Property Value': 0.45,
        'Interest Rates': 0.75,
        'Unemployment': -0.32,
        'GDP Growth': 0.38,
        'Inflation': 1.0
      }
    }
  }
};

// Fund parameters
export const mockFundParameters = [
  {
    id: 'fp001',
    name: 'Target IRR',
    value: 10,
    min: 5,
    max: 15,
    step: 0.5,
    category: 'returns',
    description: 'Target Internal Rate of Return for the portfolio'
  },
  {
    id: 'fp002',
    name: 'Maximum LTV',
    value: 75,
    min: 50,
    max: 90,
    step: 5,
    category: 'risk',
    description: 'Maximum Loan-to-Value ratio allowed for any loan in the portfolio'
  },
  {
    id: 'fp003',
    name: 'Minimum Cash Yield',
    value: 4,
    min: 2,
    max: 8,
    step: 0.25,
    category: 'returns',
    description: 'Minimum cash yield required for the portfolio'
  },
  {
    id: 'fp004',
    name: 'Maximum Default Rate',
    value: 2,
    min: 0.5,
    max: 5,
    step: 0.5,
    category: 'risk',
    description: 'Maximum acceptable default rate for the portfolio'
  },
  {
    id: 'fp005',
    name: 'Minimum Property Value',
    value: 500000,
    min: 300000,
    max: 1000000,
    step: 50000,
    category: 'property',
    description: 'Minimum property value for inclusion in the portfolio'
  },
  {
    id: 'fp006',
    name: 'Maximum Concentration',
    value: 20,
    min: 10,
    max: 40,
    step: 5,
    category: 'risk',
    description: 'Maximum concentration in any single suburb (percentage)'
  }
];

// Simulation parameters
export const mockSimulationParameters = {
  targetReturn: 9.5,
  riskTolerance: 'Medium',
  investmentHorizon: '5 years',
  rebalancingFrequency: 'Quarterly'
};

// Simulation results
export const mockSimulationResults = {
  expectedReturn: 10.2,
  risk: 5.8,
  sharpeRatio: 2.1,
  maxDrawdown: 10.8,
  suburbAllocation: [
    { suburb: 'Parramatta', allocation: 22, zone: 'green' },
    { suburb: 'Liverpool', allocation: 18, zone: 'green' },
    { suburb: 'Blacktown', allocation: 15, zone: 'yellow' },
    { suburb: 'Penrith', allocation: 12, zone: 'yellow' },
    { suburb: 'Campbelltown', allocation: 5, zone: 'red' },
    { suburb: 'Other', allocation: 28, zone: 'mixed' }
  ],
  riskLevelAllocation: [
    { riskLevel: 'Low', allocation: 45 },
    { riskLevel: 'Medium', allocation: 45 },
    { riskLevel: 'High', allocation: 10 }
  ]
};

// Settings
export const mockSettings = {
  apiUrl: 'https://api.equihome.com/v1',
  useMockData: true,
  theme: 'light',
  refreshInterval: 15
};
