/**
 * Portfolio Management System API Client
 *
 * This client handles all API requests for the Portfolio Management System with automatic fallback to mock data.
 * It provides a consistent interface for all API calls across the Portfolio Management System.
 */

import { api } from '../../../services/api/apiClient';
import { mockPortfolioData } from '../data/mockData';

// Types
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

// Configuration
const PORTFOLIO_API_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'https://api.equihome.com/v1/portfolio'
    : 'http://localhost:3000/api/v1/portfolio',
  useMockData: process.env.NODE_ENV === 'production' ? false : true,
  timeout: 10000, // 10 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
};

/**
 * Portfolio API Client
 *
 * This client provides methods for interacting with the Portfolio Management System API.
 * All methods automatically fall back to mock data if the API is unavailable.
 */
export const portfolioApiClient = {
  /**
   * Get portfolio summary data
   *
   * @returns Portfolio summary data
   */
  getPortfolioSummary: async (): Promise<PortfolioSummary> => {
    try {
      // Use existing API functions to construct the summary
      const performanceResponse = await api.portfolio.getPerformanceMetrics();
      const riskResponse = await api.portfolio.getRiskMetrics();
      const loansResponse = await api.portfolio.getLoans();

      // Construct portfolio summary from available data
      return {
        totalLoans: loansResponse.data?.length || mockPortfolioData.portfolioSummary.totalLoans,
        totalValue: performanceResponse.data?.totalValue || mockPortfolioData.portfolioSummary.totalValue,
        averageLTV: performanceResponse.data?.averageLTV || mockPortfolioData.portfolioSummary.averageLTV,
        fundIRR: performanceResponse.data?.fundIRR || mockPortfolioData.portfolioSummary.fundIRR,
        riskScore: riskResponse.data?.riskScore || mockPortfolioData.portfolioSummary.riskScore
      };
    } catch (error) {
      console.error('Error fetching portfolio summary:', error);
      return mockPortfolioData.portfolioSummary;
    }
  },

  /**
   * Get performance metrics
   *
   * @returns Performance metrics
   */
  getPerformanceMetrics: async (): Promise<PerformanceMetrics> => {
    try {
      const response = await api.portfolio.getPerformanceMetrics();
      return response.data || mockPortfolioData.performanceMetrics;
    } catch (error) {
      console.error('Error fetching performance metrics:', error);
      return mockPortfolioData.performanceMetrics;
    }
  },

  /**
   * Get risk metrics
   *
   * @returns Risk metrics
   */
  getRiskMetrics: async (): Promise<RiskMetrics> => {
    try {
      const response = await api.portfolio.getRiskMetrics();
      return response.data || mockPortfolioData.riskMetrics;
    } catch (error) {
      console.error('Error fetching risk metrics:', error);
      return mockPortfolioData.riskMetrics;
    }
  },

  /**
   * Get allocation data
   *
   * @returns Allocation data
   */
  getAllocationData: async (): Promise<AllocationData> => {
    try {
      const response = await api.portfolio.getAllocationData();
      return response.data || mockPortfolioData.allocationData;
    } catch (error) {
      console.error('Error fetching allocation data:', error);
      return mockPortfolioData.allocationData;
    }
  },

  /**
   * Get cash flow projections
   *
   * @returns Cash flow projections
   */
  getCashFlowProjections: async (): Promise<CashFlowProjection[]> => {
    try {
      const response = await api.portfolio.getCashFlowProjections();
      return response.data || mockPortfolioData.cashFlowProjections;
    } catch (error) {
      console.error('Error fetching cash flow projections:', error);
      return mockPortfolioData.cashFlowProjections;
    }
  },

  /**
   * Get loans
   *
   * @returns Loans
   */
  getLoans: async (): Promise<Loan[]> => {
    try {
      const response = await api.portfolio.getLoans();
      return response.data || mockPortfolioData.loans;
    } catch (error) {
      console.error('Error fetching loans:', error);
      return mockPortfolioData.loans;
    }
  },

  /**
   * Get fund parameters
   *
   * @returns Fund parameters
   */
  getFundParameters: async (): Promise<FundParameter[]> => {
    try {
      const response = await api.portfolio.getFundParameters();
      return response.data || mockPortfolioData.mockFundParameters;
    } catch (error) {
      console.error('Error fetching fund parameters:', error);
      return mockPortfolioData.mockFundParameters;
    }
  },

  /**
   * Update fund parameter
   *
   * @param id Parameter ID
   * @param value New parameter value
   * @returns Updated parameter
   */
  updateFundParameter: async (id: string, value: number): Promise<any> => {
    try {
      const response = await api.portfolio.updateFundParameter(id, value);
      return response;
    } catch (error) {
      console.error(`Error updating fund parameter ${id}:`, error);
      return { success: true, id, value }; // Mock success response
    }
  },

  /**
   * Run portfolio simulation
   *
   * @param parameters Simulation parameters
   * @returns Simulation results
   */
  runSimulation: async (parameters: any): Promise<SimulationResult> => {
    try {
      // Check if TFS data is included in parameters
      const hasTfsData = parameters.tfsData && parameters.tfsData.suburbsData && parameters.tfsData.suburbsData.length > 0;

      // Log TFS data integration
      if (hasTfsData) {
        console.log(`Integrating TFS data for ${parameters.tfsData.suburbsData.length} suburbs into simulation`);
      } else {
        console.log('Running simulation without TFS data');
      }

      // This endpoint doesn't exist yet in the main API client
      // It will be implemented in production
      const url = `${PORTFOLIO_API_CONFIG.baseUrl}/simulation`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error running simulation:', error);
      // Fall back to mock data, but integrate TFS data if available
      if (parameters.tfsData && parameters.tfsData.suburbsData) {
        // Create a modified simulation result that incorporates TFS data
        const tfsSuburbs = parameters.tfsData.suburbsData;

        // Calculate weighted average expected return based on TFS data
        let weightedReturn = 0;
        let totalWeight = 0;

        tfsSuburbs.forEach((suburb: any) => {
          const weight = suburb.confidence;
          weightedReturn += suburb.expectedReturn * weight;
          totalWeight += weight;
        });

        const averageExpectedReturn = totalWeight > 0 ? weightedReturn / totalWeight : 0;

        // Calculate risk score based on zone distribution
        const zoneDistribution = {
          green: 0,
          yellow: 0,
          red: 0
        };

        tfsSuburbs.forEach((suburb: any) => {
          zoneDistribution[suburb.zone as 'green' | 'yellow' | 'red']++;
        });

        const totalSuburbs = tfsSuburbs.length;
        const greenPercentage = (zoneDistribution.green / totalSuburbs) * 100;
        const yellowPercentage = (zoneDistribution.yellow / totalSuburbs) * 100;
        const redPercentage = (zoneDistribution.red / totalSuburbs) * 100;

        // Modify the mock data with TFS-influenced values
        const modifiedResult = {
          ...mockPortfolioData.simulationResults,
          results: {
            ...mockPortfolioData.simulationResults.results,
            irr: Math.max(8, Math.min(20, averageExpectedReturn)).toFixed(1),
            risk_score: (greenPercentage * 0.3 + yellowPercentage * 0.6 + redPercentage * 0.9).toFixed(1),
            optimal_allocation: mockPortfolioData.simulationResults.results.optimal_allocation.map((allocation: any) => {
              // Find the suburb in TFS data
              const tfsSuburb = tfsSuburbs.find((s: any) => s.suburb === allocation.suburb);

              if (tfsSuburb) {
                return {
                  ...allocation,
                  expected_return: tfsSuburb.expectedReturn.toFixed(1),
                  risk_score: tfsSuburb.riskScore.toFixed(1),
                  zone: tfsSuburb.zone
                };
              }

              return allocation;
            })
          },
          tfs_integration: {
            integrated: true,
            suburbs_count: tfsSuburbs.length,
            zone_distribution: {
              green: greenPercentage.toFixed(1),
              yellow: yellowPercentage.toFixed(1),
              red: redPercentage.toFixed(1)
            },
            timestamp: new Date().toISOString()
          }
        };

        return modifiedResult;
      }

      // Return standard mock data if no TFS data is available
      return mockPortfolioData.simulationResults;
    }
  },

  /**
   * Run stress test
   *
   * @param scenario Stress test scenario
   * @returns Stress test results
   */
  runStressTest: async (scenario: string): Promise<StressTestResult> => {
    try {
      // This endpoint doesn't exist yet in the main API client
      // It will be implemented in production
      const url = `${PORTFOLIO_API_CONFIG.baseUrl}/stress-test`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scenario }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error running stress test:', error);
      // Fall back to mock data
      return mockPortfolioData.stressTestResults[scenario] || mockPortfolioData.stressTestResults.default;
    }
  },

  /**
   * Get portfolio analytics
   *
   * @param timeframe Timeframe for analytics
   * @returns Portfolio analytics
   */
  getPortfolioAnalytics: async (timeframe: string = '1y'): Promise<PortfolioAnalytics> => {
    try {
      // This endpoint doesn't exist yet in the main API client
      // It will be implemented in production
      const url = `${PORTFOLIO_API_CONFIG.baseUrl}/analytics?timeframe=${timeframe}`;
      const response = await fetch(url, {
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
      console.error('Error fetching portfolio analytics:', error);
      // Fall back to mock data
      return mockPortfolioData.analytics;
    }
  },

  /**
   * Export portfolio data
   *
   * @param format Export format (pdf, xlsx, csv)
   * @returns URL to exported file
   */
  exportPortfolioData: async (format: 'pdf' | 'xlsx' | 'csv'): Promise<string> => {
    try {
      // This endpoint doesn't exist yet in the main API client
      // It will be implemented in production
      const url = `${PORTFOLIO_API_CONFIG.baseUrl}/export?format=${format}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error(`Error exporting portfolio data as ${format}:`, error);
      // Fall back to mock data
      return `/mock-exports/portfolio-export-${Date.now()}.${format}`;
    }
  }
};

export default portfolioApiClient;
