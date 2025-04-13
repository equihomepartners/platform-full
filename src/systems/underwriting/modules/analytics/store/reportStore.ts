import { create } from 'zustand';
import { Report } from '../types';

interface ReportState {
  reports: Report[];
  selectedReportId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setReports: (reports: Report[]) => void;
  setSelectedReportId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addReport: (report: Report) => void;
  updateReport: (id: string, report: Partial<Report>) => void;
  deleteReport: (id: string) => void;
}

// Mock data for development
const mockReports: Report[] = [
  {
    id: '1',
    name: 'Monthly Performance Report',
    description: 'Overview of key performance metrics for the month',
    type: 'performance',
    createdBy: 'admin',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    schedule: {
      frequency: 'monthly',
      day: 1,
      time: '09:00',
      recipients: ['team@equihome.com']
    },
    sections: [
      {
        id: '1-1',
        type: 'metrics',
        title: 'Key Performance Indicators',
        metrics: ['1', '2', '3', '4']
      },
      {
        id: '1-2',
        type: 'chart',
        title: 'Approval Rate Trend',
        chartType: 'line',
        dataSource: 'metrics',
        dataSourceId: '1',
        period: 'last-6-months'
      },
      {
        id: '1-3',
        type: 'table',
        title: 'Top Performing Suburbs',
        dataSource: 'pipeline',
        columns: [
          { key: 'suburb', label: 'Suburb' },
          { key: 'approvalRate', label: 'Approval Rate' },
          { key: 'averageValue', label: 'Average Property Value' },
          { key: 'dealCount', label: 'Number of Deals' }
        ],
        limit: 10
      }
    ]
  },
  {
    id: '2',
    name: 'Quarterly Business Review',
    description: 'Comprehensive review of business performance for the quarter',
    type: 'business',
    createdBy: 'admin',
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    schedule: {
      frequency: 'quarterly',
      day: 5,
      time: '10:00',
      recipients: ['executives@equihome.com']
    },
    sections: [
      {
        id: '2-1',
        type: 'text',
        title: 'Executive Summary',
        content: 'This report provides a comprehensive overview of our business performance for the quarter.'
      },
      {
        id: '2-2',
        type: 'metrics',
        title: 'Financial Performance',
        metrics: ['2', '5', '6', '7']
      },
      {
        id: '2-3',
        type: 'chart',
        title: 'Portfolio Growth',
        chartType: 'area',
        dataSource: 'portfolio',
        period: 'last-12-months'
      }
    ]
  }
];

export const useReportStore = create<ReportState>((set) => ({
  reports: mockReports,
  selectedReportId: null,
  isLoading: false,
  error: null,
  
  // Actions
  setReports: (reports) => set({ reports }),
  setSelectedReportId: (id) => set({ selectedReportId: id }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addReport: (report) => set((state) => ({
    reports: [...state.reports, report]
  })),
  
  updateReport: (id, updatedReport) => set((state) => ({
    reports: state.reports.map((report) =>
      report.id === id ? { ...report, ...updatedReport } : report
    )
  })),
  
  deleteReport: (id) => set((state) => ({
    reports: state.reports.filter((report) => report.id !== id)
  }))
}));
