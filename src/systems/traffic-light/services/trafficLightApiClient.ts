/**
 * Traffic Light System API Client
 * 
 * This client handles all API requests for the Traffic Light System with automatic fallback to mock data.
 * It provides a consistent interface for all API calls across the Traffic Light System.
 */

import { api } from '../../../services/api/apiClient';
import { mockTrafficLightData } from '../data/mockData';

// Configuration
const TRAFFIC_LIGHT_API_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://api.equihome.com/v1/traffic-light' 
    : 'http://localhost:3000/api/v1/traffic-light',
  useMockData: process.env.NODE_ENV === 'production' ? false : true,
  timeout: 10000, // 10 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
};

/**
 * Traffic Light API Client
 * 
 * This client provides methods for interacting with the Traffic Light System API.
 * All methods automatically fall back to mock data if the API is unavailable.
 */
export const trafficLightApiClient = {
  /**
   * Get all suburb classifications
   * 
   * @returns Suburb classifications (green, yellow, red zones)
   */
  getSuburbClassifications: async () => {
    try {
      const response = await fetch(`${TRAFFIC_LIGHT_API_CONFIG.baseUrl}/suburbs/classification`, {
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
      console.error('Error fetching suburb classifications:', error);
      // Fall back to mock data
      return { suburbs: mockTrafficLightData.suburbClassifications };
    }
  },

  /**
   * Get suburb analysis
   * 
   * @param suburbName Suburb name
   * @returns Detailed analysis for a specific suburb
   */
  getSuburbAnalysis: async (suburbName: string) => {
    try {
      const response = await fetch(`${TRAFFIC_LIGHT_API_CONFIG.baseUrl}/suburbs/analysis/${suburbName}`, {
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
      console.error(`Error fetching suburb analysis for ${suburbName}:`, error);
      // Fall back to mock data
      return mockTrafficLightData.suburbAnalysis[suburbName] || mockTrafficLightData.suburbAnalysis.default;
    }
  },

  /**
   * Get comparable suburbs
   * 
   * @param suburbName Suburb name
   * @returns List of comparable suburbs
   */
  getComparableSuburbs: async (suburbName: string) => {
    try {
      const response = await fetch(`${TRAFFIC_LIGHT_API_CONFIG.baseUrl}/suburbs/comparable/${suburbName}`, {
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
      console.error(`Error fetching comparable suburbs for ${suburbName}:`, error);
      // Fall back to mock data
      return mockTrafficLightData.comparableSuburbs[suburbName] || mockTrafficLightData.comparableSuburbs.default;
    }
  },

  /**
   * Get market cycle position
   * 
   * @param suburbName Suburb name
   * @returns Market cycle position for a specific suburb
   */
  getMarketCyclePosition: async (suburbName: string) => {
    try {
      const response = await fetch(`${TRAFFIC_LIGHT_API_CONFIG.baseUrl}/market/cycle/${suburbName}`, {
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
      console.error(`Error fetching market cycle position for ${suburbName}:`, error);
      // Fall back to mock data
      return mockTrafficLightData.marketCyclePositions[suburbName] || mockTrafficLightData.marketCyclePositions.default;
    }
  },

  /**
   * Get growth corridors
   * 
   * @returns Information about growth corridors
   */
  getGrowthCorridors: async () => {
    try {
      const response = await fetch(`${TRAFFIC_LIGHT_API_CONFIG.baseUrl}/growth/corridors`, {
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
      console.error('Error fetching growth corridors:', error);
      // Fall back to mock data
      return { growth_corridors: mockTrafficLightData.growthCorridors };
    }
  },

  /**
   * Get ML decisions
   * 
   * @param suburbName Suburb name
   * @returns ML decisions for a specific suburb
   */
  getMLDecisions: async (suburbName: string) => {
    try {
      const response = await fetch(`${TRAFFIC_LIGHT_API_CONFIG.baseUrl}/ml/decisions/${suburbName}`, {
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
      console.error(`Error fetching ML decisions for ${suburbName}:`, error);
      // Fall back to mock data
      return mockTrafficLightData.mlDecisions[suburbName] || mockTrafficLightData.mlDecisions.default;
    }
  },

  /**
   * Get ML system status
   * 
   * @returns Current status of the ML system
   */
  getMLSystemStatus: async () => {
    try {
      const response = await fetch(`${TRAFFIC_LIGHT_API_CONFIG.baseUrl}/ml/system/status`, {
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
      console.error('Error fetching ML system status:', error);
      // Fall back to mock data
      return mockTrafficLightData.mlSystemStatus;
    }
  },

  /**
   * Get ML model information
   * 
   * @returns Information about the current ML model
   */
  getMLModelInfo: async () => {
    try {
      const response = await fetch(`${TRAFFIC_LIGHT_API_CONFIG.baseUrl}/ml/model-info`, {
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
      console.error('Error fetching ML model information:', error);
      // Fall back to mock data
      return mockTrafficLightData.mlModelInfo;
    }
  },

  /**
   * Get risk correlation matrix
   * 
   * @returns Correlation matrix of risk factors across suburbs
   */
  getRiskCorrelationMatrix: async () => {
    try {
      const response = await fetch(`${TRAFFIC_LIGHT_API_CONFIG.baseUrl}/risk/correlation`, {
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
      console.error('Error fetching risk correlation matrix:', error);
      // Fall back to mock data
      return mockTrafficLightData.riskCorrelationMatrix;
    }
  },

  /**
   * Get portfolio integration data
   * 
   * @returns Integration data specifically for the Portfolio Management System
   */
  getPortfolioIntegration: async () => {
    try {
      const response = await fetch(`${TRAFFIC_LIGHT_API_CONFIG.baseUrl}/integration/portfolio`, {
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
      console.error('Error fetching portfolio integration data:', error);
      // Fall back to mock data
      return mockTrafficLightData.portfolioIntegration;
    }
  },

  /**
   * Send portfolio feedback
   * 
   * @param feedback Feedback data
   * @returns Response from the API
   */
  sendPortfolioFeedback: async (feedback: any) => {
    try {
      const response = await fetch(`${TRAFFIC_LIGHT_API_CONFIG.baseUrl}/webhooks/portfolio-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error sending portfolio feedback:', error);
      // Return mock success response
      return { success: true, message: 'Feedback received successfully' };
    }
  }
};

export default trafficLightApiClient;
