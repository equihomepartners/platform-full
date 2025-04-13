import { Report } from '../types';

// Report Service
export const ReportService = {
  // Get all reports
  getReports: async (): Promise<Report[]> => {
    try {
      const response = await fetch('/api/underwriting/analytics/reports');
      const data = await response.json();
      return data.reports;
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  },

  // Get a report by ID
  getReport: async (id: string): Promise<Report> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/reports/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching report ${id}:`, error);
      throw error;
    }
  },

  // Get reports by type
  getReportsByType: async (type: string): Promise<Report[]> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/reports/type/${type}`);
      const data = await response.json();
      return data.reports;
    } catch (error) {
      console.error(`Error fetching reports for type ${type}:`, error);
      throw error;
    }
  },

  // Create a new report
  createReport: async (report: Omit<Report, 'id'>): Promise<Report> => {
    try {
      const response = await fetch('/api/underwriting/analytics/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating report:', error);
      throw error;
    }
  },

  // Update a report
  updateReport: async (id: string, report: Partial<Report>): Promise<Report> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/reports/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating report ${id}:`, error);
      throw error;
    }
  },

  // Delete a report
  deleteReport: async (id: string): Promise<void> => {
    try {
      await fetch(`/api/underwriting/analytics/reports/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error deleting report ${id}:`, error);
      throw error;
    }
  },

  // Generate a report
  generateReport: async (id: string): Promise<any> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/reports/${id}/generate`, {
        method: 'POST',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error generating report ${id}:`, error);
      throw error;
    }
  },

  // Schedule a report
  scheduleReport: async (id: string, schedule: any): Promise<Report> => {
    try {
      const response = await fetch(`/api/underwriting/analytics/reports/${id}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schedule),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error scheduling report ${id}:`, error);
      throw error;
    }
  },
};
