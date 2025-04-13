/**
 * Traffic Light System and Portfolio Management System Integration
 *
 * This service handles the integration between the Traffic Light System (TFS) and
 * the Portfolio Management System (PMS), particularly for simulations.
 *
 * It provides methods to fetch TFS data and transform it into formats needed by the PMS.
 */

import { api } from '../api/apiClient';
import { Zone } from '../../systems/traffic-light/api/types';

// Mock data fallback
const mockTFSIntegrationData = {
  suburbClassifications: [
    { suburb: 'Parramatta', zone: 'green', score: 85, confidence: 0.92 },
    { suburb: 'Blacktown', zone: 'green', score: 82, confidence: 0.89 },
    { suburb: 'Liverpool', zone: 'yellow', score: 65, confidence: 0.87 },
    { suburb: 'Penrith', zone: 'yellow', score: 62, confidence: 0.85 },
    { suburb: 'Campbelltown', zone: 'red', score: 45, confidence: 0.91 },
    { suburb: 'Hornsby', zone: 'green', score: 88, confidence: 0.94 },
    { suburb: 'Chatswood', zone: 'green', score: 90, confidence: 0.95 },
    { suburb: 'Bankstown', zone: 'yellow', score: 68, confidence: 0.88 },
    { suburb: 'Hurstville', zone: 'yellow', score: 64, confidence: 0.86 },
    { suburb: 'Sutherland', zone: 'green', score: 79, confidence: 0.90 }
  ],
  riskCorrelations: [
    { suburb1: 'Parramatta', suburb2: 'Blacktown', correlation: 0.75 },
    { suburb1: 'Parramatta', suburb2: 'Liverpool', correlation: 0.45 },
    { suburb1: 'Parramatta', suburb2: 'Penrith', correlation: 0.35 },
    { suburb1: 'Blacktown', suburb2: 'Liverpool', correlation: 0.65 },
    { suburb1: 'Blacktown', suburb2: 'Penrith', correlation: 0.70 },
    { suburb1: 'Liverpool', suburb2: 'Penrith', correlation: 0.55 }
  ],
  growthForecasts: [
    { suburb: 'Parramatta', shortTerm: 5.2, mediumTerm: 12.5, longTerm: 22.8, confidence: 0.85 },
    { suburb: 'Blacktown', shortTerm: 4.8, mediumTerm: 11.2, longTerm: 20.5, confidence: 0.82 },
    { suburb: 'Liverpool', shortTerm: 3.5, mediumTerm: 8.7, longTerm: 16.2, confidence: 0.79 },
    { suburb: 'Penrith', shortTerm: 3.2, mediumTerm: 7.8, longTerm: 15.5, confidence: 0.77 },
    { suburb: 'Campbelltown', shortTerm: 2.1, mediumTerm: 5.5, longTerm: 11.2, confidence: 0.75 },
    { suburb: 'Hornsby', shortTerm: 5.5, mediumTerm: 13.2, longTerm: 24.5, confidence: 0.87 },
    { suburb: 'Chatswood', shortTerm: 5.8, mediumTerm: 14.5, longTerm: 26.8, confidence: 0.89 },
    { suburb: 'Bankstown', shortTerm: 3.8, mediumTerm: 9.2, longTerm: 17.5, confidence: 0.80 },
    { suburb: 'Hurstville', shortTerm: 3.6, mediumTerm: 8.8, longTerm: 16.8, confidence: 0.78 },
    { suburb: 'Sutherland', shortTerm: 4.5, mediumTerm: 10.8, longTerm: 19.5, confidence: 0.83 }
  ],
  defaultRates: [
    { suburb: 'Parramatta', zone: 'green', defaultRate: 0.8, forecastDefaultRate: 0.9 },
    { suburb: 'Blacktown', zone: 'green', defaultRate: 1.0, forecastDefaultRate: 1.1 },
    { suburb: 'Liverpool', zone: 'yellow', defaultRate: 1.8, forecastDefaultRate: 2.0 },
    { suburb: 'Penrith', zone: 'yellow', defaultRate: 2.0, forecastDefaultRate: 2.2 },
    { suburb: 'Campbelltown', zone: 'red', defaultRate: 3.5, forecastDefaultRate: 3.8 },
    { suburb: 'Hornsby', zone: 'green', defaultRate: 0.7, forecastDefaultRate: 0.8 },
    { suburb: 'Chatswood', zone: 'green', defaultRate: 0.6, forecastDefaultRate: 0.7 },
    { suburb: 'Bankstown', zone: 'yellow', defaultRate: 1.7, forecastDefaultRate: 1.9 },
    { suburb: 'Hurstville', zone: 'yellow', defaultRate: 1.9, forecastDefaultRate: 2.1 },
    { suburb: 'Sutherland', zone: 'green', defaultRate: 0.9, forecastDefaultRate: 1.0 }
  ],
  marketCycles: [
    { suburb: 'Parramatta', position: 'growth', confidence: 0.88 },
    { suburb: 'Blacktown', position: 'growth', confidence: 0.85 },
    { suburb: 'Liverpool', position: 'recovery', confidence: 0.82 },
    { suburb: 'Penrith', position: 'recovery', confidence: 0.80 },
    { suburb: 'Campbelltown', position: 'trough', confidence: 0.85 },
    { suburb: 'Hornsby', position: 'peak', confidence: 0.87 },
    { suburb: 'Chatswood', position: 'peak', confidence: 0.89 },
    { suburb: 'Bankstown', position: 'recovery', confidence: 0.83 },
    { suburb: 'Hurstville', position: 'recovery', confidence: 0.81 },
    { suburb: 'Sutherland', position: 'growth', confidence: 0.84 }
  ]
};

/**
 * Traffic Light System and Portfolio Management System Integration Service
 */
export const tfsPortfolioIntegration = {
  /**
   * Get suburb classifications for portfolio simulation
   *
   * @returns Suburb classifications with zone, score, and confidence
   */
  getSuburbClassifications: async () => {
    try {
      const response = await fetch('/api/traffic-light/suburbs/classification', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      return data.suburbs;
    } catch (error) {
      console.error('Error fetching suburb classifications:', error);
      // Fall back to mock data
      return mockTFSIntegrationData.suburbClassifications;
    }
  },

  /**
   * Get risk correlations between suburbs for portfolio diversification
   *
   * @returns Risk correlations between suburbs
   */
  getRiskCorrelations: async () => {
    try {
      const response = await fetch('/api/traffic-light/risk/correlations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching risk correlations:', error);
      // Fall back to mock data
      return { correlations: mockTFSIntegrationData.riskCorrelations };
    }
  },

  /**
   * Get growth forecasts for suburbs
   *
   * @returns Growth forecasts for suburbs
   */
  getGrowthForecasts: async () => {
    try {
      const response = await fetch('/api/traffic-light/growth/forecasts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching growth forecasts:', error);
      // Fall back to mock data
      return { forecasts: mockTFSIntegrationData.growthForecasts };
    }
  },

  /**
   * Get default rates by suburb and zone
   *
   * @returns Default rates by suburb and zone
   */
  getDefaultRates: async () => {
    try {
      const response = await fetch('/api/traffic-light/risk/default-rates', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching default rates:', error);
      // Fall back to mock data
      return { default_rates: mockTFSIntegrationData.defaultRates };
    }
  },

  /**
   * Get market cycle positions for suburbs
   *
   * @returns Market cycle positions for suburbs
   */
  getMarketCycles: async () => {
    try {
      const response = await fetch('/api/traffic-light/market/cycles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching market cycles:', error);
      // Fall back to mock data
      return { market_cycles: mockTFSIntegrationData.marketCycles };
    }
  },

  /**
   * Get all TFS data for portfolio simulation
   *
   * @returns All TFS data needed for portfolio simulation
   */
  getAllTFSDataForSimulation: async () => {
    // For now, use mock data directly since the TFS API is not ready
    console.log('Using mock TFS data for simulation');
    return {
        suburbClassifications: mockTFSIntegrationData.suburbClassifications,
        riskCorrelations: { correlations: mockTFSIntegrationData.riskCorrelations },
        growthForecasts: { forecasts: mockTFSIntegrationData.growthForecasts },
        defaultRates: { default_rates: mockTFSIntegrationData.defaultRates },
        marketCycles: { market_cycles: mockTFSIntegrationData.marketCycles }
      };
    }
  },

  /**
   * Transform TFS data for portfolio optimization
   *
   * @param tfsData TFS data
   * @returns Transformed data for portfolio optimization
   */
  transformTFSDataForPortfolioOptimization: (tfsData: any) => {
    // Extract suburb classifications
    const suburbClassifications = tfsData.suburbClassifications || mockTFSIntegrationData.suburbClassifications;

    // Extract growth forecasts
    const growthForecasts = tfsData.growthForecasts?.forecasts || mockTFSIntegrationData.growthForecasts;

    // Extract default rates
    const defaultRates = tfsData.defaultRates?.default_rates || mockTFSIntegrationData.defaultRates;

    // Extract market cycles
    const marketCycles = tfsData.marketCycles?.market_cycles || mockTFSIntegrationData.marketCycles;

    // Transform data for portfolio optimization
    const suburbsData = suburbClassifications.map((suburb: any) => {
      // Find corresponding growth forecast
      const growthForecast = growthForecasts.find((forecast: any) => forecast.suburb === suburb.suburb) || {
        shortTerm: 0,
        mediumTerm: 0,
        longTerm: 0,
        confidence: 0
      };

      // Find corresponding default rate
      const defaultRate = defaultRates.find((rate: any) => rate.suburb === suburb.suburb) || {
        defaultRate: 0,
        forecastDefaultRate: 0
      };

      // Find corresponding market cycle
      const marketCycle = marketCycles.find((cycle: any) => cycle.suburb === suburb.suburb) || {
        position: 'unknown',
        confidence: 0
      };

      // Calculate risk score based on zone and default rate
      let riskScore = 0;
      if (suburb.zone === 'green') {
        riskScore = 25;
      } else if (suburb.zone === 'yellow') {
        riskScore = 50;
      } else if (suburb.zone === 'red') {
        riskScore = 75;
      }

      // Adjust risk score based on default rate
      riskScore += defaultRate.defaultRate * 10;

      // Calculate expected return based on growth forecast and zone
      let expectedReturn = growthForecast.mediumTerm;

      // Adjust expected return based on zone
      if (suburb.zone === 'green') {
        expectedReturn *= 1.2;
      } else if (suburb.zone === 'yellow') {
        expectedReturn *= 1.0;
      } else if (suburb.zone === 'red') {
        expectedReturn *= 0.8;
      }

      // Calculate confidence score
      const confidenceScore = (suburb.confidence + growthForecast.confidence + marketCycle.confidence) / 3;

      return {
        suburb: suburb.suburb,
        zone: suburb.zone,
        score: suburb.score,
        confidence: suburb.confidence,
        riskScore,
        expectedReturn,
        growthForecast: {
          shortTerm: growthForecast.shortTerm,
          mediumTerm: growthForecast.mediumTerm,
          longTerm: growthForecast.longTerm,
          confidence: growthForecast.confidence
        },
        defaultRate: {
          current: defaultRate.defaultRate,
          forecast: defaultRate.forecastDefaultRate
        },
        marketCycle: {
          position: marketCycle.position,
          confidence: marketCycle.confidence
        },
        confidenceScore
      };
    });

    return {
      suburbsData,
      timestamp: new Date().toISOString()
    };
  }
};

export default tfsPortfolioIntegration;
