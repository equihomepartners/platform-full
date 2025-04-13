import { Lead } from '../types';

// Lead Service
export const LeadService = {
  // Get all leads
  getLeads: async (): Promise<Lead[]> => {
    try {
      const response = await fetch('/api/underwriting/marketing/leads');
      const data = await response.json();
      return data.leads;
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  },

  // Get a lead by ID
  getLead: async (id: string): Promise<Lead> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/leads/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching lead ${id}:`, error);
      throw error;
    }
  },

  // Get leads by campaign
  getLeadsByCampaign: async (campaignId: string): Promise<Lead[]> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/campaigns/${campaignId}/leads`);
      const data = await response.json();
      return data.leads;
    } catch (error) {
      console.error(`Error fetching leads for campaign ${campaignId}:`, error);
      throw error;
    }
  },

  // Create a new lead
  createLead: async (lead: Omit<Lead, 'id'>): Promise<Lead> => {
    try {
      const response = await fetch('/api/underwriting/marketing/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  },

  // Update a lead
  updateLead: async (id: string, lead: Partial<Lead>): Promise<Lead> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating lead ${id}:`, error);
      throw error;
    }
  },

  // Delete a lead
  deleteLead: async (id: string): Promise<void> => {
    try {
      await fetch(`/api/underwriting/marketing/leads/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error deleting lead ${id}:`, error);
      throw error;
    }
  },

  // Add a note to a lead
  addLeadNote: async (id: string, note: { text: string }): Promise<Lead> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/leads/${id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error adding note to lead ${id}:`, error);
      throw error;
    }
  },

  // Convert lead to application
  convertLeadToApplication: async (id: string): Promise<any> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/leads/${id}/convert`, {
        method: 'POST',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error converting lead ${id} to application:`, error);
      throw error;
    }
  },
};
