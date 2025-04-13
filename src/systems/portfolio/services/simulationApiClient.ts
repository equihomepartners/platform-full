/**
 * Simulation API Client
 *
 * This client handles all API requests for the Portfolio Simulation Engine.
 * It communicates with the Python backend for complex financial calculations.
 */

import { api } from '../../../services/api/apiClient';
import { mockSimulationData } from '../data/mockSimulationData';
import { SimulationResult, FundSettings, PortfolioGeneration } from '../types/portfolioTypes';
import { generatePortfolio as localGeneratePortfolio, runSimulation as localRunSimulation } from './simulationCalculator';

// Configuration
const SIMULATION_API_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'https://api.equihome.com/v1/simulation'
    : 'http://localhost:5000/api/simulation',
  // Always use mock data for now until the API server is properly set up
  useMockData: true,
  // Use local calculations instead of just returning static mock data
  useLocalCalculations: true,
  timeout: 30000, // 30 seconds for complex calculations
  retryAttempts: 2,
  retryDelay: 2000, // 2 seconds
};

/**
 * Simulation API Client
 *
 * This client provides methods for interacting with the Simulation API.
 * All methods automatically fall back to mock data if the API is unavailable.
 */
export const simulationApiClient = {
  /**
   * Save fund settings
   *
   * @param settings Fund settings
   * @returns Saved fund settings
   */
  saveFundSettings: async (settings: FundSettings): Promise<FundSettings> => {
    // If useMockData is true, return the settings immediately
    if (SIMULATION_API_CONFIG.useMockData) {
      console.log('Using mock data for saving fund settings');
      return {
        ...settings,
        id: 'mock-id',
        timestamp: new Date().toISOString()
      };
    }

    try {
      const response = await fetch(`${SIMULATION_API_CONFIG.baseUrl}/fund-settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving fund settings:', error);
      // Fall back to returning the input settings
      return {
        ...settings,
        id: 'mock-id',
        timestamp: new Date().toISOString()
      };
    }
  },

  /**
   * Get fund settings
   *
   * @returns Fund settings
   */
  getFundSettings: async (): Promise<FundSettings> => {
    // If useMockData is true, return mock data immediately
    if (SIMULATION_API_CONFIG.useMockData) {
      console.log('Using mock data for fund settings');
      return mockSimulationData.fundSettings;
    }

    try {
      // Check if API is available with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);

      try {
        const response = await fetch(`${SIMULATION_API_CONFIG.baseUrl}/fund-settings`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        return await response.json();
      } catch (fetchError) {
        clearTimeout(timeoutId);
        console.log('API server not available, falling back to mock data');
        return mockSimulationData.fundSettings;
      }
    } catch (error) {
      console.error('Error fetching fund settings:', error);
      // Fall back to mock data
      return mockSimulationData.fundSettings;
    }
  },

  /**
   * Generate portfolio based on fund settings
   *
   * @param params Portfolio generation parameters
   * @returns Generated portfolio
   */
  generatePortfolio: async (params: PortfolioGeneration): Promise<any> => {
    // If useMockData is true but useLocalCalculations is also true, use local calculations
    if (SIMULATION_API_CONFIG.useMockData && SIMULATION_API_CONFIG.useLocalCalculations) {
      console.log('Using local calculations for portfolio generation');
      return localGeneratePortfolio(params);
    }

    // If useMockData is true but useLocalCalculations is false, return static mock data
    if (SIMULATION_API_CONFIG.useMockData) {
      console.log('Using static mock data for portfolio generation');
      return mockSimulationData.portfolio;
    }

    try {
      const response = await fetch(`${SIMULATION_API_CONFIG.baseUrl}/generate-portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating portfolio:', error);
      // Fall back to local calculations or mock data
      if (SIMULATION_API_CONFIG.useLocalCalculations) {
        console.log('Falling back to local calculations for portfolio generation');
        return localGeneratePortfolio(params);
      } else {
        console.log('Falling back to static mock data for portfolio generation');
        return mockSimulationData.portfolio;
      }
    }
  },

  /**
   * Get generated portfolio
   *
   * @returns Generated portfolio
   */
  getPortfolio: async (): Promise<any> => {
    // If useMockData is true, return mock data immediately
    if (SIMULATION_API_CONFIG.useMockData) {
      console.log('Using mock data for portfolio');
      return mockSimulationData.portfolio;
    }

    try {
      const response = await fetch(`${SIMULATION_API_CONFIG.baseUrl}/portfolio`, {
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
      console.error('Error fetching portfolio:', error);
      // Fall back to mock data
      return mockSimulationData.portfolio;
    }
  },

  /**
   * Run simulation with portfolio and TFS data
   *
   * @param params Simulation parameters including portfolio and TFS data
   * @returns Simulation results
   */
  runSimulation: async (params: any): Promise<SimulationResult> => {
    // If useMockData is true but useLocalCalculations is also true, use local calculations
    if (SIMULATION_API_CONFIG.useMockData && SIMULATION_API_CONFIG.useLocalCalculations) {
      console.log('Using local calculations for simulation run');
      return localRunSimulation(params);
    }

    // If useMockData is true but useLocalCalculations is false, return static mock data
    if (SIMULATION_API_CONFIG.useMockData) {
      console.log('Using static mock data for simulation run');
      return mockSimulationData.simulationResult;
    }

    try {
      const response = await fetch(`${SIMULATION_API_CONFIG.baseUrl}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error running simulation:', error);
      // Fall back to local calculations or mock data
      if (SIMULATION_API_CONFIG.useLocalCalculations) {
        console.log('Falling back to local calculations for simulation run');
        return localRunSimulation(params);
      } else {
        console.log('Falling back to static mock data for simulation run');
        return mockSimulationData.simulationResult;
      }
    }
  },

  /**
   * Get simulation results
   *
   * @returns Simulation results
   */
  getSimulationResults: async (): Promise<SimulationResult> => {
    // If useMockData is true, return mock data immediately
    if (SIMULATION_API_CONFIG.useMockData) {
      console.log('Using mock data for simulation results');
      return mockSimulationData.simulationResult;
    }

    try {
      const response = await fetch(`${SIMULATION_API_CONFIG.baseUrl}/results`, {
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
      console.error('Error fetching simulation results:', error);
      // Fall back to mock data
      return mockSimulationData.simulationResult;
    }
  },

  /**
   * Integrate TFS data into simulation
   *
   * @param tfsData Traffic Light System data
   * @returns Integrated simulation data
   */
  integrateTFSData: async (tfsData: any): Promise<any> => {
    // If useMockData is true, return mock data immediately
    if (SIMULATION_API_CONFIG.useMockData) {
      console.log('Using mock data for TFS integration');
      return {
        integrated: true,
        message: 'TFS data integrated successfully (mock)',
        timestamp: new Date().toISOString()
      };
    }

    try {
      const response = await fetch(`${SIMULATION_API_CONFIG.baseUrl}/tfs-integration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tfsData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error integrating TFS data:', error);
      // Fall back to mock data
      return {
        integrated: true,
        message: 'TFS data integrated successfully (mock)',
        data: tfsData
      };
    }
  },

  /**
   * Calculate fund metrics
   *
   * @param params Fund metrics parameters
   * @returns Fund metrics
   */
  calculateFundMetrics: async (params: any): Promise<any> => {
    try {
      const response = await fetch(`${SIMULATION_API_CONFIG.baseUrl}/calculate-metrics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error calculating fund metrics:', error);
      // Fall back to mock data
      return mockSimulationData.fundMetrics;
    }
  },

  /**
   * Calculate waterfall distribution
   *
   * @param params Waterfall parameters
   * @returns Waterfall distribution
   */
  calculateWaterfall: async (params: any): Promise<any> => {
    try {
      const response = await fetch(`${SIMULATION_API_CONFIG.baseUrl}/calculate-waterfall`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error calculating waterfall distribution:', error);
      // Fall back to mock data
      return mockSimulationData.waterfallDistribution;
    }
  }
};

export default simulationApiClient;
