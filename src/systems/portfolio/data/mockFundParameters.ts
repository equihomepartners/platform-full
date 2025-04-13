/**
 * Mock Fund Parameters Data
 * 
 * This file contains mock data for fund parameters.
 * It will be used as a fallback when the real API is not available.
 */

export const mockFundParameters = {
  // Target parameters
  targetParameters: {
    targetIRR: 18,
    targetROI: 22,
    targetCashYield: 8,
    targetTotalReturn: 3500000,
    targetGrowth: 5.5
  },
  
  // Risk parameters
  riskParameters: {
    maxLTV: 75,
    maxDefaultProbability: 2.5,
    minCashReserve: 10,
    maxLoanSize: 1500000,
    minPropertyValue: 1000000,
    maxConcentrationRisk: 0.5,
    stressTestThreshold: -10
  },
  
  // Allocation parameters
  allocationParameters: {
    minGreenZoneAllocation: 80,
    maxYellowZoneAllocation: 20,
    maxRedZoneAllocation: 0,
    maxSuburbExposure: 25,
    maxPropertyTypeExposure: 50,
    targetSuburbAllocation: [
      { suburb: 'Mosman', target: 22 },
      { suburb: 'Bondi', target: 18 },
      { suburb: 'Manly', target: 15 },
      { suburb: 'Neutral Bay', target: 12 },
      { suburb: 'Coogee', target: 10 },
      { suburb: 'Randwick', target: 8 },
      { suburb: 'Leichhardt', target: 8 },
      { suburb: 'Strathfield', target: 7 }
    ],
    targetPropertyTypeAllocation: [
      { type: 'House', target: 45 },
      { type: 'Apartment', target: 35 },
      { type: 'Townhouse', target: 20 }
    ]
  },
  
  // Fund structure parameters
  fundStructureParameters: {
    fundSize: 20000000,
    deploymentPeriod: 12, // months
    fundTerm: 60, // months
    managementFee: 1.5, // percentage
    performanceFee: 20, // percentage
    hurdleRate: 8, // percentage
    minimumInvestment: 100000
  },
  
  // Product design parameters
  productDesignParameters: {
    loanTerm: {
      min: 12, // months
      max: 60, // months
      target: 36 // months
    },
    interestRate: {
      min: 4.5, // percentage
      max: 7.5, // percentage
      target: 5.5 // percentage
    },
    paymentFrequency: 'monthly', // monthly, quarterly, annually
    amortization: false, // true for amortizing loans, false for interest-only
    prepaymentPenalty: 2, // percentage
    originationFee: 1, // percentage
    exitFee: 0.5 // percentage
  },
  
  // Remaining allocation
  remainingAllocation: 5000000,
  
  // Parameter history
  parameterHistory: [
    {
      date: '2024-01-01',
      targetIRR: 17,
      maxLTV: 70,
      minGreenZoneAllocation: 75
    },
    {
      date: '2024-02-01',
      targetIRR: 17.5,
      maxLTV: 72,
      minGreenZoneAllocation: 78
    },
    {
      date: '2024-03-01',
      targetIRR: 18,
      maxLTV: 75,
      minGreenZoneAllocation: 80
    }
  ]
};
