/**
 * Mock TFS Integration Service
 * 
 * This is a mock version of the tfsPortfolioIntegration service
 * to avoid issues with the real service during development.
 */

// Mock data
const mockTFSData = {
  suburbClassifications: [
    { suburb: 'Parramatta', zone: 'green', score: 85, confidence: 0.92 },
    { suburb: 'Blacktown', zone: 'green', score: 82, confidence: 0.89 },
    { suburb: 'Liverpool', zone: 'yellow', score: 65, confidence: 0.87 },
    { suburb: 'Penrith', zone: 'yellow', score: 62, confidence: 0.85 },
    { suburb: 'Campbelltown', zone: 'red', score: 45, confidence: 0.91 },
    { suburb: 'Hornsby', zone: 'green', score: 88, confidence: 0.94 },
    { suburb: 'Chatswood', zone: 'green', score: 90, confidence: 0.95 },
    { suburb: 'Bankstown', zone: 'yellow', score: 68, confidence: 0.86 },
    { suburb: 'Hurstville', zone: 'yellow', score: 64, confidence: 0.84 },
    { suburb: 'Fairfield', zone: 'red', score: 48, confidence: 0.90 }
  ],
  riskCorrelations: [
    { factor1: 'property_value', factor2: 'ltv', correlation: 0.65 },
    { factor1: 'property_value', factor2: 'default_risk', correlation: -0.45 },
    { factor1: 'ltv', factor2: 'default_risk', correlation: 0.72 },
    { factor1: 'zone_score', factor2: 'property_value', correlation: 0.58 },
    { factor1: 'zone_score', factor2: 'default_risk', correlation: -0.62 }
  ],
  growthForecasts: [
    { suburb: 'Parramatta', year1: 0.05, year2: 0.048, year3: 0.052, year4: 0.047, year5: 0.045 },
    { suburb: 'Blacktown', year1: 0.048, year2: 0.045, year3: 0.05, year4: 0.044, year5: 0.042 },
    { suburb: 'Liverpool', year1: 0.035, year2: 0.032, year3: 0.034, year4: 0.03, year5: 0.028 },
    { suburb: 'Penrith', year1: 0.032, year2: 0.03, year3: 0.033, year4: 0.028, year5: 0.026 },
    { suburb: 'Campbelltown', year1: 0.02, year2: 0.018, year3: 0.022, year4: 0.017, year5: 0.015 }
  ],
  defaultRates: [
    { zone: 'green', default_rate: 0.015, recovery_rate: 0.92 },
    { zone: 'yellow', default_rate: 0.035, recovery_rate: 0.85 },
    { zone: 'red', default_rate: 0.065, recovery_rate: 0.75 }
  ],
  marketCycles: [
    { year: 1, cycle: 'expansion', impact: 0.02 },
    { year: 2, cycle: 'expansion', impact: 0.025 },
    { year: 3, cycle: 'peak', impact: 0.015 },
    { year: 4, cycle: 'contraction', impact: -0.01 },
    { year: 5, cycle: 'trough', impact: -0.02 },
    { year: 6, cycle: 'recovery', impact: 0.01 },
    { year: 7, cycle: 'expansion', impact: 0.02 },
    { year: 8, cycle: 'expansion', impact: 0.025 },
    { year: 9, cycle: 'peak', impact: 0.015 },
    { year: 10, cycle: 'contraction', impact: -0.01 }
  ]
};

/**
 * Mock TFS Integration Service
 */
export const mockTfsIntegration = {
  /**
   * Get all TFS data for portfolio simulation
   * 
   * @returns All TFS data needed for portfolio simulation
   */
  getAllTFSDataForSimulation: async () => {
    console.log('Using mock TFS data for simulation');
    return {
      suburbClassifications: mockTFSData.suburbClassifications,
      riskCorrelations: { correlations: mockTFSData.riskCorrelations },
      growthForecasts: { forecasts: mockTFSData.growthForecasts },
      defaultRates: { default_rates: mockTFSData.defaultRates },
      marketCycles: { market_cycles: mockTFSData.marketCycles }
    };
  },

  /**
   * Transform TFS data for portfolio optimization
   * 
   * @param tfsData TFS data from getAllTFSDataForSimulation
   * @returns Transformed data for portfolio optimization
   */
  transformTFSDataForPortfolioOptimization: (tfsData: any) => {
    // This would normally transform the data into a format needed by the portfolio optimization algorithm
    return {
      zoneWeights: {
        green: 0.6,
        yellow: 0.3,
        red: 0.1
      },
      growthRates: {
        green: 0.05,
        yellow: 0.03,
        red: 0.02
      },
      riskFactors: {
        green: 0.2,
        yellow: 0.4,
        red: 0.7
      }
    };
  }
};
