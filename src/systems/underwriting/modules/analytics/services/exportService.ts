import { Export } from '../types';

// Export Service
export const ExportService = {
  // Get all exports
  getExports: async (): Promise<Export[]> => {
    try {
      const response = await fetch('/api/underwriting/analytics/exports');
      const data = await response.json();
      return data.exports;
    } catch (error) {
      console.error('Error fetching exports:', error);
      throw error;
    }
  },

  // Get an export by ID
  getExport: async (id: string): Promise<Export> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/exports/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching export ${id}:`, error);
      throw error;
    }
  },

  // Create a new export
  createExport: async (exportItem: Omit<Export, 'id'>): Promise<Export> => {
    try {
      const response = await fetch('/api/underwriting/analytics/exports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exportItem),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating export:', error);
      throw error;
    }
  },

  // Delete an export
  deleteExport: async (id: string): Promise<void> => {
    try {
      await fetch(`/api/underwriting/analytics/exports/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error deleting export ${id}:`, error);
      throw error;
    }
  },

  // Download an export
  downloadExport: async (id: string): Promise<Blob> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/exports/${id}/download`);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error(`Error downloading export ${id}:`, error);
      throw error;
    }
  },

  // Export a report
  exportReport: async (reportId: string, format: string): Promise<Export> => {
    try {
      const response = await fetch('/api/underwriting/analytics/exports/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportId, format }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error exporting report ${reportId}:`, error);
      throw error;
    }
  },

  // Export a dashboard
  exportDashboard: async (dashboardId: string, format: string): Promise<Export> => {
    try {
      const response = await fetch('/api/underwriting/analytics/exports/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dashboardId, format }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error exporting dashboard ${dashboardId}:`, error);
      throw error;
    }
  },

  // Export data
  exportData: async (dataType: string, filters: any, format: string): Promise<Export> => {
    try {
      const response = await fetch('/api/underwriting/analytics/exports/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dataType, filters, format }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error exporting ${dataType} data:`, error);
      throw error;
    }
  },
};
