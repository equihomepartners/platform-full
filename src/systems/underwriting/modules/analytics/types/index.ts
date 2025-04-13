// Analytics & Reporting Module Types
// This file exports all types for the Analytics & Reporting module

export interface PerformanceMetric {
  id: string;
  name: string;
  description: string;
  category: 'pipeline' | 'underwriting' | 'marketing' | 'overall';
  value: number;
  unit: string;
  target?: number;
  threshold?: {
    warning: number;
    critical: number;
  };
  trend: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
  };
  history: {
    timestamp: string;
    value: number;
  }[];
  lastUpdatedAt: string;
}

export interface CustomReport {
  id: string;
  name: string;
  description: string;
  category: 'pipeline' | 'underwriting' | 'marketing' | 'overall';
  createdBy: string;
  createdAt: string;
  lastUpdatedAt: string;
  lastGeneratedAt?: string;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    day?: number;
    time: string;
    recipients: string[];
  };
  parameters: {
    dateRange: {
      start: string;
      end: string;
    };
    filters: {
      name: string;
      value: any;
    }[];
    groupBy?: string;
    sortBy?: string;
    limit?: number;
  };
  sections: {
    id: string;
    title: string;
    type: 'table' | 'chart' | 'summary';
    data: any;
    visualization?: {
      type: 'bar' | 'line' | 'pie' | 'scatter' | 'heatmap';
      options: any;
    };
  }[];
  outputs: {
    id: string;
    format: 'pdf' | 'excel' | 'csv';
    url: string;
    generatedAt: string;
  }[];
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  category: 'pipeline' | 'underwriting' | 'marketing' | 'overall';
  createdBy: string;
  createdAt: string;
  lastUpdatedAt: string;
  layout: {
    rows: number;
    columns: number;
  };
  widgets: {
    id: string;
    title: string;
    type: 'metric' | 'chart' | 'table' | 'summary';
    position: {
      row: number;
      column: number;
      rowSpan: number;
      columnSpan: number;
    };
    data: {
      source: 'metric' | 'report' | 'custom';
      sourceId?: string;
      query?: string;
    };
    visualization?: {
      type: 'bar' | 'line' | 'pie' | 'scatter' | 'heatmap';
      options: any;
    };
  }[];
}

export interface Export {
  id: string;
  name: string;
  description: string;
  type: 'data' | 'report' | 'dashboard';
  format: 'pdf' | 'excel' | 'csv' | 'image';
  createdBy: string;
  createdAt: string;
  parameters: {
    sourceId: string;
    filters?: {
      name: string;
      value: any;
    }[];
    options?: any;
  };
  url: string;
  expiresAt: string;
}

export interface AnalyticsOverview {
  pipelineMetrics: {
    totalDeals: number;
    activeDeals: number;
    approvalRate: number;
    averageProcessingTime: number;
  };
  underwritingMetrics: {
    totalApplications: number;
    approvedApplications: number;
    rejectedApplications: number;
    averageLTV: number;
    averageIRR: number;
  };
  marketingMetrics: {
    totalCampaigns: number;
    totalLeads: number;
    conversionRate: number;
    averageROI: number;
  };
  overallMetrics: {
    totalLoans: number;
    totalLoanAmount: number;
    averageIRR: number;
    portfolioGrowth: number;
  };
}
