/**
 * Mock Simulation Results Data
 * 
 * This file contains mock data for simulation results.
 * It will be used as a fallback when the real API is not available.
 */

export const mockSimulationResults = {
  id: 'sim-001',
  name: 'Portfolio Optimization Simulation',
  description: 'Simulation to optimize portfolio allocation based on risk-return profile',
  createdAt: '2024-04-10T00:00:00Z',
  completedAt: '2024-04-10T00:05:23Z',
  status: 'completed',
  parameters: {
    targetReturn: 18,
    maxRisk: 0.5,
    investmentHorizon: 60, // months
    rebalancingFrequency: 'quarterly',
    constraints: {
      maxSuburbExposure: 25,
      maxPropertyTypeExposure: 50,
      minCashReserve: 10,
      minGreenZoneAllocation: 80,
      maxYellowZoneAllocation: 20,
      maxRedZoneAllocation: 0
    }
  },
  results: {
    optimizedAllocation: {
      bySuburb: [
        { suburb: 'Mosman', allocation: 22, zone: 'green' },
        { suburb: 'Bondi', allocation: 18, zone: 'green' },
        { suburb: 'Manly', allocation: 15, zone: 'green' },
        { suburb: 'Neutral Bay', allocation: 12, zone: 'green' },
        { suburb: 'Coogee', allocation: 10, zone: 'green' },
        { suburb: 'Randwick', allocation: 8, zone: 'green' },
        { suburb: 'Leichhardt', allocation: 8, zone: 'yellow' },
        { suburb: 'Strathfield', allocation: 7, zone: 'yellow' }
      ],
      byPropertyType: [
        { type: 'House', allocation: 45 },
        { type: 'Apartment', allocation: 35 },
        { type: 'Townhouse', allocation: 20 }
      ],
      byZone: [
        { zone: 'green', allocation: 85 },
        { zone: 'yellow', allocation: 15 },
        { zone: 'red', allocation: 0 }
      ]
    },
    efficientFrontier: [
      { risk: 0.2, return: 12.5 },
      { risk: 0.25, return: 14.2 },
      { risk: 0.3, return: 15.8 },
      { risk: 0.35, return: 16.9 },
      { risk: 0.4, return: 17.8 },
      { risk: 0.45, return: 18.5 },
      { risk: 0.5, return: 19.2 },
      { risk: 0.55, return: 19.8 },
      { risk: 0.6, return: 20.3 },
      { risk: 0.65, return: 20.7 },
      { risk: 0.7, return: 21.0 }
    ],
    currentPortfolio: { risk: 0.42, return: 18.5 },
    optimizedPortfolio: { risk: 0.45, return: 19.2 },
    projectedPerformance: {
      expectedReturn: 19.2,
      expectedRisk: 0.45,
      sharpeRatio: 2.1,
      maxDrawdown: 8.5,
      probabilityOfTarget: 0.85
    },
    scenarioAnalysis: [
      {
        scenario: 'Base Case',
        return: 19.2,
        risk: 0.45,
        probability: 0.6
      },
      {
        scenario: 'Mild Downturn',
        return: 15.8,
        risk: 0.52,
        probability: 0.25
      },
      {
        scenario: 'Moderate Recession',
        return: 10.5,
        risk: 0.68,
        probability: 0.12
      },
      {
        scenario: 'Severe Recession',
        return: 2.8,
        risk: 0.85,
        probability: 0.03
      }
    ],
    monteCarlo: {
      simulations: 10000,
      confidenceInterval: 0.95,
      percentiles: [
        { percentile: 5, return: 12.5 },
        { percentile: 25, return: 16.8 },
        { percentile: 50, return: 19.2 },
        { percentile: 75, return: 21.5 },
        { percentile: 95, return: 24.8 }
      ]
    },
    cashFlowProjections: [
      {
        date: '2024-05-01',
        interestIncome: 68000,
        principalRepayments: 130000,
        defaultLosses: 3000,
        netCashFlow: 195000
      },
      {
        date: '2024-06-01',
        interestIncome: 70000,
        principalRepayments: 135000,
        defaultLosses: 2500,
        netCashFlow: 202500
      },
      {
        date: '2024-07-01',
        interestIncome: 72000,
        principalRepayments: 140000,
        defaultLosses: 3000,
        netCashFlow: 209000
      },
      {
        date: '2024-08-01',
        interestIncome: 74000,
        principalRepayments: 145000,
        defaultLosses: 2000,
        netCashFlow: 217000
      }
    ],
    implementationPlan: [
      {
        action: 'Increase allocation to Mosman by 2%',
        currentAllocation: 20,
        targetAllocation: 22,
        priority: 'High'
      },
      {
        action: 'Decrease allocation to Leichhardt by 2%',
        currentAllocation: 10,
        targetAllocation: 8,
        priority: 'Medium'
      },
      {
        action: 'Increase allocation to Houses by 3%',
        currentAllocation: 42,
        targetAllocation: 45,
        priority: 'Medium'
      },
      {
        action: 'Decrease allocation to Apartments by 3%',
        currentAllocation: 38,
        targetAllocation: 35,
        priority: 'Low'
      }
    ]
  }
};
