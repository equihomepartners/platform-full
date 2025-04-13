# Pipeline Management Module

## Overview

The Pipeline Management module is responsible for tracking and ranking deals based on criteria from the Traffic Light System and Portfolio Management System. It manages the flow of applications through the evaluation process, from submission to closing.

## Key Features

### Deal Tracking

The Deal Tracking feature allows users to track applications from submission to closing. It provides a comprehensive view of all applications in the pipeline, their current status, and next steps.

**Components:**
- **Pipeline Dashboard**: Overview of all applications in the pipeline
- **Deal Detail View**: Detailed view of a specific application
- **Status Tracking**: Track the status of each application
- **Timeline View**: View the timeline of an application's progress

### Deal Ranking

The Deal Ranking feature ranks deals based on criteria from the Traffic Light System and Portfolio Management System. It helps prioritize applications that align with Equihome's investment criteria and financial goals.

**Components:**
- **Ranking Algorithm**: Algorithm that ranks deals based on multiple criteria
- **Ranking Dashboard**: View of all applications ranked by priority
- **Criteria Management**: Manage the criteria used for ranking
- **Manual Override**: Manually override the ranking of specific applications

### Pipeline Analytics

The Pipeline Analytics feature provides insights into pipeline performance and conversion rates. It helps identify bottlenecks in the process and opportunities for improvement.

**Components:**
- **Pipeline Performance Dashboard**: Overview of pipeline performance metrics
- **Conversion Rate Analysis**: Analysis of conversion rates at each stage
- **Bottleneck Identification**: Identification of bottlenecks in the process
- **Trend Analysis**: Analysis of trends over time

### Task Management

The Task Management feature allows users to assign and track tasks related to deal processing. It helps ensure that all necessary steps are completed in a timely manner.

**Components:**
- **Task Dashboard**: Overview of all tasks
- **Task Assignment**: Assign tasks to team members
- **Task Tracking**: Track the status of each task
- **Reminder System**: Send reminders for upcoming and overdue tasks

## Integration with Other Modules

The Pipeline Management module integrates with:

- **Underwriting & Origination**: Provides applications for underwriting and receives underwriting decisions
- **Sales & Marketing Dashboard**: Receives leads from marketing campaigns
- **Analytics & Reporting**: Provides data for analytics and reporting

## Integration with Other Systems

The Pipeline Management module integrates with:

- **Traffic Light System**: Consumes green-zone suburbs for deal ranking
- **Portfolio Management System**: Consumes deal rankings and portfolio optimization criteria

## API Endpoints

The Pipeline Management module exposes the following API endpoints:

```
GET /api/underwriting/pipeline/deals
GET /api/underwriting/pipeline/deals/{id}
POST /api/underwriting/pipeline/deals
PUT /api/underwriting/pipeline/deals/{id}
DELETE /api/underwriting/pipeline/deals/{id}
GET /api/underwriting/pipeline/rankings
POST /api/underwriting/pipeline/rankings/calculate
GET /api/underwriting/pipeline/tasks
POST /api/underwriting/pipeline/tasks
PUT /api/underwriting/pipeline/tasks/{id}
DELETE /api/underwriting/pipeline/tasks/{id}
GET /api/underwriting/pipeline/analytics
```

## Data Model

The Pipeline Management module uses the following data models:

### Deal

```typescript
interface Deal {
  id: string;
  status: 'new' | 'in-review' | 'underwriting' | 'approved' | 'rejected' | 'closing' | 'closed';
  submittedAt: string;
  lastUpdatedAt: string;
  borrower: {
    name: string;
    email: string;
    phone: string;
    annualIncome: number;
    employmentStatus: string;
  };
  property: {
    address: string;
    suburb: string;
    state: string;
    postcode: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    landSize: number;
    currentValue: number;
    mortgageBalance: number;
  };
  loan: {
    amount: number;
    purpose: string;
    term: number;
  };
  ranking: {
    score: number;
    rank: number;
    criteria: {
      name: string;
      weight: number;
      score: number;
    }[];
  };
  tasks: {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    dueDate: string;
    status: 'pending' | 'in-progress' | 'completed';
  }[];
  notes: {
    id: string;
    text: string;
    createdBy: string;
    createdAt: string;
  }[];
  documents: {
    id: string;
    name: string;
    type: string;
    url: string;
    uploadedBy: string;
    uploadedAt: string;
  }[];
  timeline: {
    id: string;
    event: string;
    timestamp: string;
    user: string;
  }[];
}
```

### Ranking Criteria

```typescript
interface RankingCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  source: 'tfs' | 'pms' | 'manual';
  active: boolean;
}
```

### Task

```typescript
interface Task {
  id: string;
  dealId: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdBy: string;
  createdAt: string;
  lastUpdatedAt: string;
}
```

## User Interface

The Pipeline Management module provides the following user interfaces:

- **Pipeline Dashboard**: Overview of all applications in the pipeline
- **Deal Detail View**: Detailed view of a specific application
- **Ranking Dashboard**: View of all applications ranked by priority
- **Task Dashboard**: Overview of all tasks
- **Analytics Dashboard**: Overview of pipeline performance metrics
