// Analytics Service
export const PipelineAnalyticsService = {
  // Get pipeline analytics
  getPipelineAnalytics: async () => {
    try {
      const response = await fetch('/api/underwriting/pipeline/analytics');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching pipeline analytics:', error);
      throw error;
    }
  },

  // Get deal status distribution
  getDealStatusDistribution: async () => {
    try {
      const response = await fetch('/api/underwriting/pipeline/analytics/status-distribution');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching deal status distribution:', error);
      throw error;
    }
  },

  // Get conversion rates
  getConversionRates: async () => {
    try {
      const response = await fetch('/api/underwriting/pipeline/analytics/conversion-rates');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching conversion rates:', error);
      throw error;
    }
  },

  // Get top performing suburbs
  getTopPerformingSuburbs: async () => {
    try {
      const response = await fetch('/api/underwriting/pipeline/analytics/top-suburbs');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching top performing suburbs:', error);
      throw error;
    }
  },
};
