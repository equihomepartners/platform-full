import { create } from 'zustand';
import { Dashboard } from '../types';

interface DashboardState {
  dashboards: Dashboard[];
  selectedDashboardId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setDashboards: (dashboards: Dashboard[]) => void;
  setSelectedDashboardId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addDashboard: (dashboard: Dashboard) => void;
  updateDashboard: (id: string, dashboard: Partial<Dashboard>) => void;
  deleteDashboard: (id: string) => void;
}

// Mock data for development
const mockDashboards: Dashboard[] = [
  {
    id: '1',
    name: 'Executive Dashboard',
    description: 'High-level overview for executives',
    createdBy: 'admin',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isPublic: true,
    layout: [
      {
        id: 'widget-1',
        type: 'metric',
        title: 'Approval Rate',
        metricId: '1',
        size: 'small',
        position: { x: 0, y: 0, w: 1, h: 1 }
      },
      {
        id: 'widget-2',
        type: 'metric',
        title: 'Average IRR',
        metricId: '2',
        size: 'small',
        position: { x: 1, y: 0, w: 1, h: 1 }
      },
      {
        id: 'widget-3',
        type: 'metric',
        title: 'Lead Conversion Rate',
        metricId: '3',
        size: 'small',
        position: { x: 2, y: 0, w: 1, h: 1 }
      },
      {
        id: 'widget-4',
        type: 'metric',
        title: 'Average Processing Time',
        metricId: '4',
        size: 'small',
        position: { x: 3, y: 0, w: 1, h: 1 }
      },
      {
        id: 'widget-5',
        type: 'chart',
        title: 'Portfolio Growth',
        chartType: 'area',
        dataSource: 'portfolio',
        period: 'last-12-months',
        size: 'large',
        position: { x: 0, y: 1, w: 2, h: 2 }
      },
      {
        id: 'widget-6',
        type: 'chart',
        title: 'Approval Rate Trend',
        chartType: 'line',
        dataSource: 'metrics',
        dataSourceId: '1',
        period: 'last-6-months',
        size: 'medium',
        position: { x: 2, y: 1, w: 2, h: 1 }
      },
      {
        id: 'widget-7',
        type: 'table',
        title: 'Top Performing Suburbs',
        dataSource: 'pipeline',
        columns: [
          { key: 'suburb', label: 'Suburb' },
          { key: 'approvalRate', label: 'Approval Rate' },
          { key: 'dealCount', label: 'Number of Deals' }
        ],
        limit: 5,
        size: 'medium',
        position: { x: 2, y: 2, w: 2, h: 1 }
      }
    ]
  },
  {
    id: '2',
    name: 'Marketing Dashboard',
    description: 'Overview of marketing performance',
    createdBy: 'marketing',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isPublic: true,
    layout: [
      {
        id: 'widget-1',
        type: 'metric',
        title: 'Lead Conversion Rate',
        metricId: '3',
        size: 'small',
        position: { x: 0, y: 0, w: 1, h: 1 }
      },
      {
        id: 'widget-2',
        type: 'metric',
        title: 'Campaign Open Rate',
        metricId: '8',
        size: 'small',
        position: { x: 1, y: 0, w: 1, h: 1 }
      },
      {
        id: 'widget-3',
        type: 'metric',
        title: 'Campaign Click Rate',
        metricId: '9',
        size: 'small',
        position: { x: 2, y: 0, w: 1, h: 1 }
      },
      {
        id: 'widget-4',
        type: 'chart',
        title: 'Lead Generation by Campaign',
        chartType: 'bar',
        dataSource: 'marketing',
        period: 'last-6-months',
        size: 'medium',
        position: { x: 0, y: 1, w: 2, h: 1 }
      },
      {
        id: 'widget-5',
        type: 'chart',
        title: 'Lead Conversion Funnel',
        chartType: 'funnel',
        dataSource: 'marketing',
        size: 'medium',
        position: { x: 2, y: 1, w: 1, h: 2 }
      },
      {
        id: 'widget-6',
        type: 'table',
        title: 'Recent Campaigns',
        dataSource: 'marketing',
        columns: [
          { key: 'name', label: 'Campaign' },
          { key: 'sentAt', label: 'Sent Date' },
          { key: 'openRate', label: 'Open Rate' },
          { key: 'clickRate', label: 'Click Rate' },
          { key: 'conversionRate', label: 'Conversion Rate' }
        ],
        limit: 5,
        size: 'medium',
        position: { x: 0, y: 2, w: 2, h: 1 }
      }
    ]
  }
];

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboards: mockDashboards,
  selectedDashboardId: null,
  isLoading: false,
  error: null,
  
  // Actions
  setDashboards: (dashboards) => set({ dashboards }),
  setSelectedDashboardId: (id) => set({ selectedDashboardId: id }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addDashboard: (dashboard) => set((state) => ({
    dashboards: [...state.dashboards, dashboard]
  })),
  
  updateDashboard: (id, updatedDashboard) => set((state) => ({
    dashboards: state.dashboards.map((dashboard) =>
      dashboard.id === id ? { ...dashboard, ...updatedDashboard } : dashboard
    )
  })),
  
  deleteDashboard: (id) => set((state) => ({
    dashboards: state.dashboards.filter((dashboard) => dashboard.id !== id)
  }))
}));
