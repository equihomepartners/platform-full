import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../services/api/ApiContext';

// Report type interface
export interface ReportType {
  id: string;
  name: string;
  description: string;
  formats: string[];
  parameters: {
    name: string;
    type: string;
    required: boolean;
    default?: any;
  }[];
}

// Generated report interface
export interface GeneratedReport {
  id: string;
  reportId: string;
  name: string;
  format: string;
  parameters: Record<string, any>;
  url: string;
  created: string;
  createdBy: string;
  size: string;
}

// Report filters interface
export interface ReportFilters {
  reportTypes?: string[];
  dateRange?: {
    from?: string;
    to?: string;
  };
  createdBy?: string[];
  search?: string;
}

// Hook for reports management
export const useReports = () => {
  const { api, loading: apiLoading, error: apiError } = useApi();
  const [reportTypes, setReportTypes] = useState<ReportType[]>([]);
  const [reportHistory, setReportHistory] = useState<GeneratedReport[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<ReportFilters>({});

  // Fetch available report types
  const fetchReportTypes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.reports.getAvailableReports();

      // Handle the new response format with status, data, and meta fields
      const data = response.status === 'success' ? response.data : response;
      setReportTypes(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch report types'));
    } finally {
      setLoading(false);
    }
  }, [api.reports]);

  // Fetch report history
  const fetchReportHistory = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.reports.getReportHistory();

      // Handle the new response format with status, data, and meta fields
      const data = response.status === 'success' ? response.data : response;
      setReportHistory(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch report history'));
    } finally {
      setLoading(false);
    }
  }, [api.reports]);

  // Apply filters
  const applyFilters = useCallback((newFilters: ReportFilters) => {
    setFilters(newFilters);
  }, []);

  // Get filtered report history
  const getFilteredReportHistory = useCallback(() => {
    return reportHistory.filter(report => {
      // Filter by report types
      if (filters.reportTypes && filters.reportTypes.length > 0) {
        if (!filters.reportTypes.includes(report.reportId)) {
          return false;
        }
      }

      // Filter by date range
      if (filters.dateRange) {
        const reportDate = new Date(report.created);

        if (filters.dateRange.from) {
          const fromDate = new Date(filters.dateRange.from);
          if (reportDate < fromDate) {
            return false;
          }
        }

        if (filters.dateRange.to) {
          const toDate = new Date(filters.dateRange.to);
          if (reportDate > toDate) {
            return false;
          }
        }
      }

      // Filter by created by
      if (filters.createdBy && filters.createdBy.length > 0) {
        if (!filters.createdBy.includes(report.createdBy)) {
          return false;
        }
      }

      // Filter by search term
      if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.toLowerCase();
        const nameMatch = report.name.toLowerCase().includes(searchTerm);

        if (!nameMatch) {
          return false;
        }
      }

      return true;
    });
  }, [reportHistory, filters]);

  // Generate report
  const generateReport = useCallback(async (reportId: string, parameters: any, name?: string) => {
    setLoading(true);
    setError(null);

    try {
      const reportType = reportTypes.find(type => type.id === reportId);

      if (!reportType) {
        throw new Error(`Report type with ID ${reportId} not found`);
      }

      // Generate a name if not provided
      const reportName = name || `${reportType.name} - ${new Date().toLocaleDateString()}`;

      const generatedReport = await api.reports.generateReport(reportId, {
        ...parameters,
        name: reportName
      });

      setReportHistory(prevHistory => [generatedReport, ...prevHistory]);

      return generatedReport;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to generate report'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api.reports, reportTypes]);

  // Download report
  const downloadReport = useCallback((report: GeneratedReport) => {
    // In a real implementation, this would trigger a download
    window.open(report.url, '_blank');
  }, []);

  // Fetch report types and history on mount
  useEffect(() => {
    fetchReportTypes();
    fetchReportHistory();
  }, [fetchReportTypes, fetchReportHistory]);

  return {
    reportTypes,
    reportHistory,
    filteredReportHistory: getFilteredReportHistory(),
    loading: loading || apiLoading,
    error: error || apiError,
    filters,
    applyFilters,
    fetchReportTypes,
    fetchReportHistory,
    generateReport,
    downloadReport
  };
};

export default useReports;
