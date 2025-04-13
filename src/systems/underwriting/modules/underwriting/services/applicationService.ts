import { LoanApplication } from '../types';

// Application Service
export const ApplicationService = {
  // Get all applications
  getApplications: async (): Promise<LoanApplication[]> => {
    try {
      const response = await fetch('/api/underwriting/applications');
      const data = await response.json();
      return data.applications;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  // Get an application by ID
  getApplication: async (id: string): Promise<LoanApplication> => {
    try {
      const response = await fetch(`/api/underwriting/applications/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching application ${id}:`, error);
      throw error;
    }
  },

  // Create a new application
  createApplication: async (application: Omit<LoanApplication, 'id'>): Promise<LoanApplication> => {
    try {
      const response = await fetch('/api/underwriting/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(application),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  },

  // Update an application
  updateApplication: async (id: string, application: Partial<LoanApplication>): Promise<LoanApplication> => {
    try {
      const response = await fetch(`/api/underwriting/applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(application),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating application ${id}:`, error);
      throw error;
    }
  },

  // Delete an application
  deleteApplication: async (id: string): Promise<void> => {
    try {
      await fetch(`/api/underwriting/applications/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error deleting application ${id}:`, error);
      throw error;
    }
  },

  // Submit an application
  submitApplication: async (application: Omit<LoanApplication, 'id' | 'status' | 'submittedAt' | 'lastUpdatedAt'>): Promise<LoanApplication> => {
    try {
      const response = await fetch('/api/underwriting/applications/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(application),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },
};
