import { PropertyValuation } from '../types';

// Property Service
export const PropertyService = {
  // Get property valuation
  getPropertyValuation: async (propertyId: string): Promise<PropertyValuation> => {
    try {
      const response = await fetch(`/api/underwriting/properties/${propertyId}/valuation`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching property valuation for property ${propertyId}:`, error);
      throw error;
    }
  },

  // Create property valuation
  createPropertyValuation: async (valuation: Omit<PropertyValuation, 'id'>): Promise<PropertyValuation> => {
    try {
      const response = await fetch('/api/underwriting/properties/valuation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valuation),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating property valuation:', error);
      throw error;
    }
  },

  // Update property valuation
  updatePropertyValuation: async (id: string, valuation: Partial<PropertyValuation>): Promise<PropertyValuation> => {
    try {
      const response = await fetch(`/api/underwriting/properties/valuation/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valuation),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating property valuation ${id}:`, error);
      throw error;
    }
  },

  // Get market trends for suburb
  getMarketTrends: async (suburb: string, state: string): Promise<any> => {
    try {
      const response = await fetch(`/api/underwriting/properties/market-trends?suburb=${suburb}&state=${state}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching market trends for ${suburb}, ${state}:`, error);
      throw error;
    }
  },

  // Get comparable properties
  getComparableProperties: async (propertyId: string): Promise<any> => {
    try {
      const response = await fetch(`/api/underwriting/properties/${propertyId}/comparable`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching comparable properties for property ${propertyId}:`, error);
      throw error;
    }
  },
};
