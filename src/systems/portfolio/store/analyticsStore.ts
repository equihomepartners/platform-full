/**
 * Analytics Store
 * 
 * This store manages the analytics state, including performance attribution,
 * risk decomposition, trend analysis, suburb comparison, and correlation analysis.
 */

import { create } from 'zustand';
import { getAnalytics } from '../services/api';

interface AnalyticsState {
  // Analytics data
  attribution: any | null;
  risk: any | null;
  trends: any | null;
  suburbs: any | null;
  correlation: any | null;
  
  // Loading states
  loadingAttribution: boolean;
  loadingRisk: boolean;
  loadingTrends: boolean;
  loadingSuburbs: boolean;
  loadingCorrelation: boolean;
  
  // Error states
  attributionError: Error | null;
  riskError: Error | null;
  trendsError: Error | null;
  suburbsError: Error | null;
  correlationError: Error | null;
  
  // Actions
  fetchAttribution: () => Promise<void>;
  fetchRisk: () => Promise<void>;
  fetchTrends: () => Promise<void>;
  fetchSuburbs: () => Promise<void>;
  fetchCorrelation: () => Promise<void>;
  fetchAllAnalytics: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  // Initial state
  attribution: null,
  risk: null,
  trends: null,
  suburbs: null,
  correlation: null,
  
  loadingAttribution: false,
  loadingRisk: false,
  loadingTrends: false,
  loadingSuburbs: false,
  loadingCorrelation: false,
  
  attributionError: null,
  riskError: null,
  trendsError: null,
  suburbsError: null,
  correlationError: null,
  
  // Actions
  fetchAttribution: async () => {
    try {
      set({ loadingAttribution: true, attributionError: null });
      const attribution = await getAnalytics('attribution');
      set({ attribution, loadingAttribution: false });
    } catch (error) {
      set({ attributionError: error as Error, loadingAttribution: false });
    }
  },
  
  fetchRisk: async () => {
    try {
      set({ loadingRisk: true, riskError: null });
      const risk = await getAnalytics('risk');
      set({ risk, loadingRisk: false });
    } catch (error) {
      set({ riskError: error as Error, loadingRisk: false });
    }
  },
  
  fetchTrends: async () => {
    try {
      set({ loadingTrends: true, trendsError: null });
      const trends = await getAnalytics('trends');
      set({ trends, loadingTrends: false });
    } catch (error) {
      set({ trendsError: error as Error, loadingTrends: false });
    }
  },
  
  fetchSuburbs: async () => {
    try {
      set({ loadingSuburbs: true, suburbsError: null });
      const suburbs = await getAnalytics('suburbs');
      set({ suburbs, loadingSuburbs: false });
    } catch (error) {
      set({ suburbsError: error as Error, loadingSuburbs: false });
    }
  },
  
  fetchCorrelation: async () => {
    try {
      set({ loadingCorrelation: true, correlationError: null });
      const correlation = await getAnalytics('correlation');
      set({ correlation, loadingCorrelation: false });
    } catch (error) {
      set({ correlationError: error as Error, loadingCorrelation: false });
    }
  },
  
  fetchAllAnalytics: async () => {
    const { fetchAttribution, fetchRisk, fetchTrends, fetchSuburbs, fetchCorrelation } = get();
    await Promise.all([
      fetchAttribution(),
      fetchRisk(),
      fetchTrends(),
      fetchSuburbs(),
      fetchCorrelation()
    ]);
  }
}));
