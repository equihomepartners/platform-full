/**
 * Mock Portfolio Summary Data
 * 
 * This file contains mock data for the portfolio summary.
 * It will be used as a fallback when the real API is not available.
 */

export const mockPortfolioSummary = {
  id: 'portfolio-001',
  name: 'Equihome Main Portfolio',
  totalValue: 15000000,
  loanCount: 25,
  averageLTV: 65,
  weightedAverageInterestRate: 5.2,
  weightedAverageMaturity: 7.5,
  riskScore: 0.42,
  diversificationScore: 0.78,
  performanceMetrics: {
    irr: 18.5,
    roi: 22.3,
    cashYield: 8.7,
    totalReturn: 3350000
  },
  riskMetrics: {
    defaultRate: 0.8,
    lossGivenDefault: 15.2,
    expectedLoss: 0.12,
    stressTestImpact: -5.3
  },
  allocationBySuburb: [
    {
      suburb: 'Mosman',
      allocation: 22,
      value: 3300000,
      zone: 'green'
    },
    {
      suburb: 'Bondi',
      allocation: 18,
      value: 2700000,
      zone: 'green'
    },
    {
      suburb: 'Manly',
      allocation: 15,
      value: 2250000,
      zone: 'green'
    },
    {
      suburb: 'Neutral Bay',
      allocation: 12,
      value: 1800000,
      zone: 'green'
    },
    {
      suburb: 'Coogee',
      allocation: 10,
      value: 1500000,
      zone: 'green'
    },
    {
      suburb: 'Randwick',
      allocation: 8,
      value: 1200000,
      zone: 'green'
    },
    {
      suburb: 'Leichhardt',
      allocation: 8,
      value: 1200000,
      zone: 'yellow'
    },
    {
      suburb: 'Strathfield',
      allocation: 7,
      value: 1050000,
      zone: 'yellow'
    }
  ],
  allocationByPropertyType: [
    {
      type: 'House',
      allocation: 45,
      value: 6750000
    },
    {
      type: 'Apartment',
      allocation: 35,
      value: 5250000
    },
    {
      type: 'Townhouse',
      allocation: 20,
      value: 3000000
    }
  ],
  allocationByZone: [
    {
      zone: 'green',
      allocation: 85,
      value: 12750000
    },
    {
      zone: 'yellow',
      allocation: 15,
      value: 2250000
    },
    {
      zone: 'red',
      allocation: 0,
      value: 0
    }
  ],
  cashFlowProjections: [
    {
      date: '2025-05-01',
      interestIncome: 65000,
      principalRepayments: 120000,
      defaultLosses: 5000,
      netCashFlow: 180000
    },
    {
      date: '2025-06-01',
      interestIncome: 67000,
      principalRepayments: 125000,
      defaultLosses: 3000,
      netCashFlow: 189000
    },
    {
      date: '2025-07-01',
      interestIncome: 68000,
      principalRepayments: 130000,
      defaultLosses: 4000,
      netCashFlow: 194000
    },
    {
      date: '2025-08-01',
      interestIncome: 70000,
      principalRepayments: 135000,
      defaultLosses: 2000,
      netCashFlow: 203000
    },
    {
      date: '2025-09-01',
      interestIncome: 72000,
      principalRepayments: 140000,
      defaultLosses: 3000,
      netCashFlow: 209000
    },
    {
      date: '2025-10-01',
      interestIncome: 73000,
      principalRepayments: 145000,
      defaultLosses: 4000,
      netCashFlow: 214000
    }
  ]
};
