import { create } from 'zustand';
import { PerformanceMetric } from '../types';

interface MetricState {
  metrics: PerformanceMetric[];
  selectedMetricId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setMetrics: (metrics: PerformanceMetric[]) => void;
  setSelectedMetricId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addMetric: (metric: PerformanceMetric) => void;
  updateMetric: (id: string, metric: Partial<PerformanceMetric>) => void;
  deleteMetric: (id: string) => void;
}

// Mock data for development
const mockPerformanceMetrics: PerformanceMetric[] = [
  {
    id: '1',
    name: 'Approval Rate',
    description: 'Percentage of applications approved',
    category: 'underwriting',
    value: 85,
    unit: '%',
    target: 80,
    threshold: {
      warning: 70,
      critical: 60
    },
    trend: {
      direction: 'up',
      percentage: 5
    },
    history: [
      { timestamp: '2023-08-01', value: 80 },
      { timestamp: '2023-09-01', value: 82 },
      { timestamp: '2023-10-01', value: 85 }
    ],
    lastUpdatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Average IRR',
    description: 'Average internal rate of return',
    category: 'overall',
    value: 9.2,
    unit: '%',
    target: 8,
    threshold: {
      warning: 7,
      critical: 6
    },
    trend: {
      direction: 'up',
      percentage: 2.2
    },
    history: [
      { timestamp: '2023-08-01', value: 8.8 },
      { timestamp: '2023-09-01', value: 9.0 },
      { timestamp: '2023-10-01', value: 9.2 }
    ],
    lastUpdatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Lead Conversion Rate',
    description: 'Percentage of leads converted to applications',
    category: 'marketing',
    value: 12.5,
    unit: '%',
    target: 10,
    threshold: {
      warning: 8,
      critical: 5
    },
    trend: {
      direction: 'up',
      percentage: 25
    },
    history: [
      { timestamp: '2023-08-01', value: 9.5 },
      { timestamp: '2023-09-01', value: 10.8 },
      { timestamp: '2023-10-01', value: 12.5 }
    ],
    lastUpdatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Average Processing Time',
    description: 'Average time to process an application (days)',
    category: 'pipeline',
    value: 7.5,
    unit: 'days',
    target: 7,
    threshold: {
      warning: 10,
      critical: 14
    },
    trend: {
      direction: 'down',
      percentage: 6.25
    },
    history: [
      { timestamp: '2023-08-01', value: 8.5 },
      { timestamp: '2023-09-01', value: 8.0 },
      { timestamp: '2023-10-01', value: 7.5 }
    ],
    lastUpdatedAt: new Date().toISOString()
  }
];

export const useMetricStore = create<MetricState>((set) => ({
  metrics: mockPerformanceMetrics,
  selectedMetricId: null,
  isLoading: false,
  error: null,
  
  // Actions
  setMetrics: (metrics) => set({ metrics }),
  setSelectedMetricId: (id) => set({ selectedMetricId: id }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addMetric: (metric) => set((state) => ({
    metrics: [...state.metrics, metric]
  })),
  
  updateMetric: (id, updatedMetric) => set((state) => ({
    metrics: state.metrics.map((metric) =>
      metric.id === id ? { ...metric, ...updatedMetric } : metric
    )
  })),
  
  deleteMetric: (id) => set((state) => ({
    metrics: state.metrics.filter((metric) => metric.id !== id)
  }))
}));
