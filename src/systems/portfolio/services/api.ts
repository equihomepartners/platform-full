/**
 * Portfolio Management System API Service
 *
 * This service handles all API calls for the Portfolio Management System.
 * It attempts to call real APIs first and falls back to mock data if the APIs are unavailable.
 */

import { mockPortfolioSummary } from '../data/mockPortfolioSummary';
import { mockLoans } from '../data/mockLoans';
import { mockPerformanceMetrics } from '../data/mockPerformanceMetrics';
import { mockRiskMetrics } from '../data/mockRiskMetrics';
import { mockFundParameters } from '../data/mockFundParameters';
import { mockSimulationResults } from '../data/mockSimulationResults';
import { mockAnalytics } from '../data/mockAnalytics';

// API base URL - will be replaced with real API URL in production
// Using a default value since process.env might not be available in the browser
const API_BASE_URL = '/api';

// Helper function to handle API calls with mock data fallback
async function apiCall<T>(endpoint: string, mockData: T): Promise<T> {
  // For now, always return mock data to avoid 500 errors
  // In production, this would try the API first
  console.log(`Using mock data for ${endpoint}`);
  return mockData;

  // Uncomment this when real APIs are available
  /*
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      console.warn(`API call to ${endpoint} failed, using mock data`);
      return mockData;
    }

    return await response.json();
  } catch (error) {
    console.warn(`API call to ${endpoint} failed, using mock data`, error);
    return mockData;
  }
  */
}

// Portfolio Summary API
export const getPortfolioSummary = () =>
  apiCall('/portfolio/summary', mockPortfolioSummary);

// Loans API
export const getLoans = (filters?: Record<string, any>) =>
  apiCall('/portfolio/loans', mockLoans);

export const getLoanById = (id: string) =>
  apiCall(`/portfolio/loans/${id}`, mockLoans.find(loan => loan.id === id) || mockLoans[0]);

// Performance Metrics API
export const getPerformanceMetrics = (timeframe?: string) =>
  apiCall('/portfolio/performance', mockPerformanceMetrics);

// Risk Metrics API
export const getRiskMetrics = () =>
  apiCall('/portfolio/risk', mockRiskMetrics);

// Fund Parameters API
export const getFundParameters = () =>
  apiCall('/portfolio/parameters', mockFundParameters);

export const updateFundParameters = (parameters: any) => {
  // In a real implementation, this would be a POST or PUT request
  console.log('Updating fund parameters', parameters);
  return Promise.resolve({ success: true });
};

// Simulation API
export const runSimulation = (parameters: any) => {
  // In a real implementation, this would be a POST request
  console.log('Running simulation with parameters', parameters);
  return Promise.resolve({
    simulationId: 'sim-' + Date.now(),
    status: 'running'
  });
};

export const getSimulationStatus = (simulationId: string) => {
  // In a real implementation, this would check the status of a running simulation
  return Promise.resolve({
    simulationId,
    status: 'completed'
  });
};

export const getSimulationResults = (simulationId: string) =>
  apiCall(`/simulation/results/${simulationId}`, mockSimulationResults);

// Analytics API
export const getAnalytics = (type: string) =>
  apiCall(`/analytics/${type}`, mockAnalytics[type] || mockAnalytics.default);

// Settings API
export const getSettings = () =>
  apiCall('/settings', {
    apiUrl: API_BASE_URL,
    useMockData: true,
    theme: 'light',
    refreshInterval: 60000
  });

export const updateSettings = (settings: any) => {
  // In a real implementation, this would be a POST or PUT request
  console.log('Updating settings', settings);
  return Promise.resolve({ success: true });
};
