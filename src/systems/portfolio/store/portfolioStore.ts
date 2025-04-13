/**
 * Portfolio Store
 * 
 * This store manages the portfolio data, including summary, loans, and metrics.
 */

import { create } from 'zustand';
import { getPortfolioSummary, getLoans, getPerformanceMetrics, getRiskMetrics } from '../services/api';

interface PortfolioState {
  // Portfolio data
  summary: any | null;
  loans: any[];
  performanceMetrics: any | null;
  riskMetrics: any | null;
  
  // Loading states
  loadingSummary: boolean;
  loadingLoans: boolean;
  loadingPerformanceMetrics: boolean;
  loadingRiskMetrics: boolean;
  
  // Error states
  summaryError: Error | null;
  loansError: Error | null;
  performanceMetricsError: Error | null;
  riskMetricsError: Error | null;
  
  // Actions
  fetchSummary: () => Promise<void>;
  fetchLoans: (filters?: Record<string, any>) => Promise<void>;
  fetchPerformanceMetrics: (timeframe?: string) => Promise<void>;
  fetchRiskMetrics: () => Promise<void>;
  fetchAllData: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  // Initial state
  summary: null,
  loans: [],
  performanceMetrics: null,
  riskMetrics: null,
  
  loadingSummary: false,
  loadingLoans: false,
  loadingPerformanceMetrics: false,
  loadingRiskMetrics: false,
  
  summaryError: null,
  loansError: null,
  performanceMetricsError: null,
  riskMetricsError: null,
  
  // Actions
  fetchSummary: async () => {
    try {
      set({ loadingSummary: true, summaryError: null });
      const summary = await getPortfolioSummary();
      set({ summary, loadingSummary: false });
    } catch (error) {
      set({ summaryError: error as Error, loadingSummary: false });
    }
  },
  
  fetchLoans: async (filters = {}) => {
    try {
      set({ loadingLoans: true, loansError: null });
      const loans = await getLoans(filters);
      set({ loans, loadingLoans: false });
    } catch (error) {
      set({ loansError: error as Error, loadingLoans: false });
    }
  },
  
  fetchPerformanceMetrics: async (timeframe) => {
    try {
      set({ loadingPerformanceMetrics: true, performanceMetricsError: null });
      const performanceMetrics = await getPerformanceMetrics(timeframe);
      set({ performanceMetrics, loadingPerformanceMetrics: false });
    } catch (error) {
      set({ performanceMetricsError: error as Error, loadingPerformanceMetrics: false });
    }
  },
  
  fetchRiskMetrics: async () => {
    try {
      set({ loadingRiskMetrics: true, riskMetricsError: null });
      const riskMetrics = await getRiskMetrics();
      set({ riskMetrics, loadingRiskMetrics: false });
    } catch (error) {
      set({ riskMetricsError: error as Error, loadingRiskMetrics: false });
    }
  },
  
  fetchAllData: async () => {
    const { fetchSummary, fetchLoans, fetchPerformanceMetrics, fetchRiskMetrics } = get();
    await Promise.all([
      fetchSummary(),
      fetchLoans(),
      fetchPerformanceMetrics(),
      fetchRiskMetrics()
    ]);
  }
}));
