// Data Service
export const DataService = {
  // Get data for a specific source
  getData: async (source: string, filters?: any): Promise<any> => {
    try {
      let url = `/api/underwriting/analytics/data/${source}`;
      if (filters) {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`;
        }
      }
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data for source ${source}:`, error);
      throw error;
    }
  },

  // Get pipeline data
  getPipelineData: async (filters?: any): Promise<any> => {
    try {
      return await DataService.getData('pipeline', filters);
    } catch (error) {
      console.error('Error fetching pipeline data:', error);
      throw error;
    }
  },

  // Get underwriting data
  getUnderwritingData: async (filters?: any): Promise<any> => {
    try {
      return await DataService.getData('underwriting', filters);
    } catch (error) {
      console.error('Error fetching underwriting data:', error);
      throw error;
    }
  },

  // Get marketing data
  getMarketingData: async (filters?: any): Promise<any> => {
    try {
      return await DataService.getData('marketing', filters);
    } catch (error) {
      console.error('Error fetching marketing data:', error);
      throw error;
    }
  },

  // Get portfolio data
  getPortfolioData: async (filters?: any): Promise<any> => {
    try {
      return await DataService.getData('portfolio', filters);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      throw error;
    }
  },

  // Get traffic light system data
  getTrafficLightData: async (filters?: any): Promise<any> => {
    try {
      return await DataService.getData('traffic-light', filters);
    } catch (error) {
      console.error('Error fetching traffic light system data:', error);
      throw error;
    }
  },

  // Get data for a specific time period
  getTimeSeriesData: async (source: string, period: string, filters?: any): Promise<any> => {
    try {
      const periodFilters = { ...filters, period };
      return await DataService.getData(`${source}/time-series`, periodFilters);
    } catch (error) {
      console.error(`Error fetching time series data for source ${source}:`, error);
      throw error;
    }
  },
};
