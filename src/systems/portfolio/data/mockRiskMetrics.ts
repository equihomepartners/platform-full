/**
 * Mock Risk Metrics Data
 * 
 * This file contains mock data for portfolio risk metrics.
 * It will be used as a fallback when the real API is not available.
 */

export const mockRiskMetrics = {
  overall: {
    defaultRate: 0.8,
    lossGivenDefault: 15.2,
    expectedLoss: 0.12,
    stressTestImpact: -5.3,
    concentrationRisk: 0.35,
    marketRisk: 0.42,
    interestRateRisk: 0.38,
    liquidityRisk: 0.25
  },
  ltvDistribution: [
    { range: '0-20%', count: 5, value: 3000000 },
    { range: '20-40%', count: 12, value: 7200000 },
    { range: '40-60%', count: 6, value: 3600000 },
    { range: '60-70%', count: 2, value: 1200000 },
    { range: '70-80%', count: 0, value: 0 },
    { range: '80%+', count: 0, value: 0 }
  ],
  stressTestScenarios: [
    {
      name: 'Base Case',
      defaultRate: 0.8,
      lossGivenDefault: 15.2,
      expectedLoss: 0.12,
      portfolioImpact: 0
    },
    {
      name: 'Mild Downturn',
      defaultRate: 1.5,
      lossGivenDefault: 18.0,
      expectedLoss: 0.27,
      portfolioImpact: -2.1
    },
    {
      name: 'Moderate Recession',
      defaultRate: 3.2,
      lossGivenDefault: 22.5,
      expectedLoss: 0.72,
      portfolioImpact: -5.3
    },
    {
      name: 'Severe Recession',
      defaultRate: 6.5,
      lossGivenDefault: 28.0,
      expectedLoss: 1.82,
      portfolioImpact: -12.8
    }
  ],
  sensitivityAnalysis: {
    interestRates: [
      { change: -1.0, impact: 2.1 },
      { change: -0.5, impact: 1.0 },
      { change: 0, impact: 0 },
      { change: 0.5, impact: -0.9 },
      { change: 1.0, impact: -1.8 },
      { change: 2.0, impact: -3.5 },
      { change: 3.0, impact: -5.2 }
    ],
    propertyValues: [
      { change: -20, impact: -8.5 },
      { change: -15, impact: -6.2 },
      { change: -10, impact: -4.0 },
      { change: -5, impact: -1.9 },
      { change: 0, impact: 0 },
      { change: 5, impact: 1.8 },
      { change: 10, impact: 3.5 }
    ],
    defaultRates: [
      { change: -50, impact: 0.6 },
      { change: -25, impact: 0.3 },
      { change: 0, impact: 0 },
      { change: 25, impact: -0.3 },
      { change: 50, impact: -0.6 },
      { change: 100, impact: -1.2 },
      { change: 200, impact: -2.4 }
    ]
  },
  bySuburb: [
    {
      suburb: 'Mosman',
      defaultRate: 0.5,
      lossGivenDefault: 12.8,
      expectedLoss: 0.064,
      stressTestImpact: -4.2
    },
    {
      suburb: 'Bondi',
      defaultRate: 0.6,
      lossGivenDefault: 13.5,
      expectedLoss: 0.081,
      stressTestImpact: -4.5
    },
    {
      suburb: 'Manly',
      defaultRate: 0.4,
      lossGivenDefault: 12.0,
      expectedLoss: 0.048,
      stressTestImpact: -3.8
    },
    {
      suburb: 'Neutral Bay',
      defaultRate: 0.7,
      lossGivenDefault: 14.2,
      expectedLoss: 0.099,
      stressTestImpact: -4.8
    },
    {
      suburb: 'Coogee',
      defaultRate: 0.8,
      lossGivenDefault: 14.8,
      expectedLoss: 0.118,
      stressTestImpact: -5.0
    },
    {
      suburb: 'Randwick',
      defaultRate: 0.8,
      lossGivenDefault: 14.8,
      expectedLoss: 0.118,
      stressTestImpact: -5.0
    },
    {
      suburb: 'Leichhardt',
      defaultRate: 0.9,
      lossGivenDefault: 15.0,
      expectedLoss: 0.135,
      stressTestImpact: -5.2
    },
    {
      suburb: 'Strathfield',
      defaultRate: 1.0,
      lossGivenDefault: 15.5,
      expectedLoss: 0.155,
      stressTestImpact: -5.5
    }
  ],
  byPropertyType: [
    {
      type: 'House',
      defaultRate: 0.6,
      lossGivenDefault: 13.5,
      expectedLoss: 0.081,
      stressTestImpact: -4.5
    },
    {
      type: 'Apartment',
      defaultRate: 0.9,
      lossGivenDefault: 15.0,
      expectedLoss: 0.135,
      stressTestImpact: -5.2
    },
    {
      type: 'Townhouse',
      defaultRate: 0.8,
      lossGivenDefault: 14.8,
      expectedLoss: 0.118,
      stressTestImpact: -5.0
    }
  ],
  byZone: [
    {
      zone: 'green',
      defaultRate: 0.6,
      lossGivenDefault: 13.5,
      expectedLoss: 0.081,
      stressTestImpact: -4.5
    },
    {
      zone: 'yellow',
      defaultRate: 0.9,
      lossGivenDefault: 15.0,
      expectedLoss: 0.135,
      stressTestImpact: -5.2
    },
    {
      zone: 'red',
      defaultRate: 0,
      lossGivenDefault: 0,
      expectedLoss: 0,
      stressTestImpact: 0
    }
  ]
};
