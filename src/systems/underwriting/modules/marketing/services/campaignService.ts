import { EmailCampaign } from '../types';

// Campaign Service
export const CampaignService = {
  // Get all campaigns
  getCampaigns: async (): Promise<EmailCampaign[]> => {
    try {
      const response = await fetch('/api/underwriting/marketing/campaigns');
      const data = await response.json();
      return data.campaigns;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  },

  // Get a campaign by ID
  getCampaign: async (id: string): Promise<EmailCampaign> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/campaigns/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching campaign ${id}:`, error);
      throw error;
    }
  },

  // Create a new campaign
  createCampaign: async (campaign: Omit<EmailCampaign, 'id'>): Promise<EmailCampaign> => {
    try {
      const response = await fetch('/api/underwriting/marketing/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaign),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  },

  // Update a campaign
  updateCampaign: async (id: string, campaign: Partial<EmailCampaign>): Promise<EmailCampaign> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/campaigns/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaign),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating campaign ${id}:`, error);
      throw error;
    }
  },

  // Delete a campaign
  deleteCampaign: async (id: string): Promise<void> => {
    try {
      await fetch(`/api/underwriting/marketing/campaigns/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error deleting campaign ${id}:`, error);
      throw error;
    }
  },

  // Schedule a campaign
  scheduleCampaign: async (id: string, scheduledAt: string): Promise<EmailCampaign> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/campaigns/${id}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scheduledAt }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error scheduling campaign ${id}:`, error);
      throw error;
    }
  },

  // Send a campaign
  sendCampaign: async (id: string): Promise<EmailCampaign> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/campaigns/${id}/send`, {
        method: 'POST',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error sending campaign ${id}:`, error);
      throw error;
    }
  },

  // Get campaign analytics
  getCampaignAnalytics: async (id: string): Promise<any> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/campaigns/${id}/analytics`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching analytics for campaign ${id}:`, error);
      throw error;
    }
  },
};
