// Mailchimp Service
export const MailchimpService = {
  // Connect to Mailchimp
  connect: async (apiKey: string): Promise<any> => {
    try {
      const response = await fetch('/api/underwriting/marketing/mailchimp/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error connecting to Mailchimp:', error);
      throw error;
    }
  },

  // Disconnect from Mailchimp
  disconnect: async (): Promise<void> => {
    try {
      await fetch('/api/underwriting/marketing/mailchimp/disconnect', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error disconnecting from Mailchimp:', error);
      throw error;
    }
  },

  // Get Mailchimp account info
  getAccountInfo: async (): Promise<any> => {
    try {
      const response = await fetch('/api/underwriting/marketing/mailchimp/account');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Mailchimp account info:', error);
      throw error;
    }
  },

  // Get Mailchimp audiences
  getAudiences: async (): Promise<any> => {
    try {
      const response = await fetch('/api/underwriting/marketing/mailchimp/audiences');
      const data = await response.json();
      return data.audiences;
    } catch (error) {
      console.error('Error fetching Mailchimp audiences:', error);
      throw error;
    }
  },

  // Create a Mailchimp audience
  createAudience: async (audience: { name: string; contact: any }): Promise<any> => {
    try {
      const response = await fetch('/api/underwriting/marketing/mailchimp/audiences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(audience),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating Mailchimp audience:', error);
      throw error;
    }
  },

  // Get Mailchimp templates
  getTemplates: async (): Promise<any> => {
    try {
      const response = await fetch('/api/underwriting/marketing/mailchimp/templates');
      const data = await response.json();
      return data.templates;
    } catch (error) {
      console.error('Error fetching Mailchimp templates:', error);
      throw error;
    }
  },

  // Create a Mailchimp campaign
  createCampaign: async (campaign: any): Promise<any> => {
    try {
      const response = await fetch('/api/underwriting/marketing/mailchimp/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaign),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating Mailchimp campaign:', error);
      throw error;
    }
  },

  // Send a Mailchimp campaign
  sendCampaign: async (campaignId: string): Promise<any> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/mailchimp/campaigns/${campaignId}/send`, {
        method: 'POST',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error sending Mailchimp campaign ${campaignId}:`, error);
      throw error;
    }
  },

  // Get Mailchimp campaign report
  getCampaignReport: async (campaignId: string): Promise<any> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/mailchimp/campaigns/${campaignId}/report`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching report for Mailchimp campaign ${campaignId}:`, error);
      throw error;
    }
  },

  // Sync leads from Mailchimp
  syncLeads: async (): Promise<any> => {
    try {
      const response = await fetch('/api/underwriting/marketing/mailchimp/sync-leads', {
        method: 'POST',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error syncing leads from Mailchimp:', error);
      throw error;
    }
  },
};
