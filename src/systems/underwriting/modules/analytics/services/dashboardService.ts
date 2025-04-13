import { Dashboard } from '../types';

// Dashboard Service
export const DashboardService = {
  // Get all dashboards
  getDashboards: async (): Promise<Dashboard[]> => {
    try {
      const response = await fetch('/api/underwriting/analytics/dashboards');
      const data = await response.json();
      return data.dashboards;
    } catch (error) {
      console.error('Error fetching dashboards:', error);
      throw error;
    }
  },

  // Get a dashboard by ID
  getDashboard: async (id: string): Promise<Dashboard> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/dashboards/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching dashboard ${id}:`, error);
      throw error;
    }
  },

  // Create a new dashboard
  createDashboard: async (dashboard: Omit<Dashboard, 'id'>): Promise<Dashboard> => {
    try {
      const response = await fetch('/api/underwriting/analytics/dashboards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dashboard),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating dashboard:', error);
      throw error;
    }
  },

  // Update a dashboard
  updateDashboard: async (id: string, dashboard: Partial<Dashboard>): Promise<Dashboard> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/dashboards/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dashboard),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating dashboard ${id}:`, error);
      throw error;
    }
  },

  // Delete a dashboard
  deleteDashboard: async (id: string): Promise<void> => {
    try {
      await fetch(`/api/underwriting/analytics/dashboards/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error deleting dashboard ${id}:`, error);
      throw error;
    }
  },

  // Update dashboard layout
  updateDashboardLayout: async (id: string, layout: any[]): Promise<Dashboard> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/dashboards/${id}/layout`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ layout }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating layout for dashboard ${id}:`, error);
      throw error;
    }
  },

  // Share a dashboard
  shareDashboard: async (id: string, isPublic: boolean): Promise<Dashboard> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/dashboards/${id}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPublic }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error sharing dashboard ${id}:`, error);
      throw error;
    }
  },
};
