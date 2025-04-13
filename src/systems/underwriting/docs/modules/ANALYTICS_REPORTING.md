# Analytics & Reporting Module

## Overview

The Analytics & Reporting module tracks performance metrics, generates reports, and provides insights into the underwriting process and portfolio performance. It helps stakeholders make data-driven decisions by providing comprehensive analytics and reporting capabilities.

## Key Features

### Performance Metrics

The Performance Metrics feature tracks key performance indicators across the Underwriting System. It provides real-time metrics on pipeline performance, underwriting decisions, marketing campaigns, and more.

**Components:**
- **Metrics Dashboard**: Overview of all key performance indicators
- **Metric Detail View**: Detailed view of specific metrics
- **Metric Alerts**: Alerts for metrics that exceed thresholds
- **Metric Trends**: Trends of metrics over time

### Custom Reports

The Custom Reports feature allows users to generate custom reports for different stakeholders. It provides a flexible reporting engine that can generate reports based on various criteria.

**Components:**
- **Report Builder**: Interface for building custom reports
- **Report Templates**: Templates for common reports
- **Report Scheduling**: Schedule reports for automatic generation
- **Report Distribution**: Distribute reports to stakeholders

### Data Visualization

The Data Visualization feature visualizes data through charts and graphs. It helps users understand complex data by presenting it in a visual format.

**Components:**
- **Chart Builder**: Interface for building custom charts
- **Dashboard Builder**: Interface for building custom dashboards
- **Interactive Visualizations**: Interactive charts and graphs
- **Visualization Templates**: Templates for common visualizations

### Export Functionality

The Export Functionality feature allows users to export data in various formats. It provides flexibility in how data is shared and used outside the system.

**Components:**
- **Data Export**: Export data in various formats (CSV, Excel, PDF)
- **Report Export**: Export reports in various formats
- **Chart Export**: Export charts as images
- **Dashboard Export**: Export dashboards as PDFs

## Integration with Other Modules

The Analytics & Reporting module integrates with:

- **Pipeline Management**: Consumes data on pipeline performance
- **Underwriting & Origination**: Consumes data on underwriting decisions
- **Sales & Marketing Dashboard**: Consumes data on marketing campaigns

## Integration with Other Systems

The Analytics & Reporting module integrates with:

- **Traffic Light System**: Consumes data on suburb classifications
- **Portfolio Management System**: Consumes data on portfolio performance
- **Mailchimp**: Consumes data on email campaign performance

## API Endpoints

The Analytics & Reporting module exposes the following API endpoints:

```
GET /api/underwriting/analytics/metrics
GET /api/underwriting/analytics/metrics/{id}
POST /api/underwriting/analytics/metrics/calculate
GET /api/underwriting/analytics/reports
GET /api/underwriting/analytics/reports/{id}
POST /api/underwriting/analytics/reports
PUT /api/underwriting/analytics/reports/{id}
DELETE /api/underwriting/analytics/reports/{id}
POST /api/underwriting/analytics/reports/{id}/generate
GET /api/underwriting/analytics/dashboards
GET /api/underwriting/analytics/dashboards/{id}
POST /api/underwriting/analytics/dashboards
PUT /api/underwriting/analytics/dashboards/{id}
DELETE /api/underwriting/analytics/dashboards/{id}
POST /api/underwriting/analytics/export
```

## Data Model

The Analytics & Reporting module uses the following data models:

### Performance Metric

```typescript
interface PerformanceMetric {
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
```

### Custom Report

```typescript
interface CustomReport {
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
```

### Dashboard

```typescript
interface Dashboard {
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
```

### Export

```typescript
interface Export {
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
```

## User Interface

The Analytics & Reporting module provides the following user interfaces:

- **Metrics Dashboard**: Overview of all key performance indicators
- **Report Builder**: Interface for building custom reports
- **Report Viewer**: Interface for viewing reports
- **Dashboard Builder**: Interface for building custom dashboards
- **Dashboard Viewer**: Interface for viewing dashboards
- **Export Manager**: Interface for managing exports
