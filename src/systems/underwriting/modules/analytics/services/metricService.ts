import { PerformanceMetric } from '../types';

// Metric Service
export const MetricService = {
  // Get all metrics
  getMetrics: async (): Promise<PerformanceMetric[]> => {
    try {
      const response = await fetch('/api/underwriting/analytics/metrics');
      const data = await response.json();
      return data.metrics;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  },

  // Get a metric by ID
  getMetric: async (id: string): Promise<PerformanceMetric> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/metrics/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching metric ${id}:`, error);
      throw error;
    }
  },

  // Get metrics by category
  getMetricsByCategory: async (category: string): Promise<PerformanceMetric[]> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/metrics/category/${category}`);
      const data = await response.json();
      return data.metrics;
    } catch (error) {
      console.error(`Error fetching metrics for category ${category}:`, error);
      throw error;
    }
  },

  // Update a metric
  updateMetric: async (id: string, metric: Partial<PerformanceMetric>): Promise<PerformanceMetric> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/metrics/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating metric ${id}:`, error);
      throw error;
    }
  },

  // Get metric history
  getMetricHistory: async (id: string, period: string): Promise<any> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/metrics/${id}/history?period=${period}`);
      const data = await response.json();
      return data.history;
    } catch (error) {
      console.error(`Error fetching history for metric ${id}:`, error);
      throw error;
    }
  },

  // Calculate metrics
  calculateMetrics: async (): Promise<PerformanceMetric[]> => {
    try {
      const response = await fetch('/api/underwriting/analytics/metrics/calculate', {
        method: 'POST',
      });
      const data = await response.json();
      return data.metrics;
    } catch (error) {
      console.error('Error calculating metrics:', error);
      throw error;
    }
  },
};
