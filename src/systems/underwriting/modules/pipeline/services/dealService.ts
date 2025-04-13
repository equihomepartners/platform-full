import { Deal } from '../types';

// Deal Service
export const DealService = {
  // Get all deals
  getDeals: async (): Promise<Deal[]> => {
    try {
      const response = await fetch('/api/underwriting/pipeline/deals');
      const data = await response.json();
      return data.deals;
    } catch (error) {
      console.error('Error fetching deals:', error);
      throw error;
    }
  },

  // Get a deal by ID
  getDeal: async (id: string): Promise<Deal> => {
    try {
      const response = await fetch(`/api/underwriting/pipeline/deals/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching deal ${id}:`, error);
      throw error;
    }
  },

  // Create a new deal
  createDeal: async (deal: Omit<Deal, 'id'>): Promise<Deal> => {
    try {
      const response = await fetch('/api/underwriting/pipeline/deals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deal),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating deal:', error);
      throw error;
    }
  },

  // Update a deal
  updateDeal: async (id: string, deal: Partial<Deal>): Promise<Deal> => {
    try {
      const response = await fetch(`/api/underwriting/pipeline/deals/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deal),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating deal ${id}:`, error);
      throw error;
    }
  },

  // Delete a deal
  deleteDeal: async (id: string): Promise<void> => {
    try {
      await fetch(`/api/underwriting/pipeline/deals/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error deleting deal ${id}:`, error);
      throw error;
    }
  },
};
