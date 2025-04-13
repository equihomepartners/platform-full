# Underwriting System Component Structure

## Overview

This document provides an overview of the component structure of the Underwriting System. It covers the main components, their relationships, and their responsibilities.

## Component Hierarchy

The component hierarchy is as follows:

```
UnderwritingLayout
├── UnderwritingDashboard
├── UnderwritingForm
│   ├── BorrowerInformation
│   ├── PropertyInformation
│   └── LoanDetails
├── UnderwriteResults
│   ├── DecisionSummary
│   ├── RiskAnalysis
│   ├── FinancialAnalysis
│   └── PropertyReport
├── Pipeline
│   ├── PipelineSummary
│   ├── ApplicationList
│   └── ProcessingMetrics
└── Settings
    ├── LoanParameters
    ├── RiskParameters
    └── IntegrationSettings
```

## Key Components

### UnderwritingLayout

The UnderwritingLayout component is the main layout component for the Underwriting System. It provides the overall structure and navigation for the system.

**Responsibilities:**
- Provide the overall layout structure
- Handle navigation between different sections
- Manage authentication and authorization

**Props:**
- `children`: React nodes to render within the layout

**Example:**
```tsx
<UnderwritingLayout>
  <UnderwritingDashboard />
</UnderwritingLayout>
```

### UnderwritingDashboard

The UnderwritingDashboard component is the main dashboard component for the Underwriting System. It displays key metrics and provides access to different sections of the system.

**Responsibilities:**
- Display key metrics
- Provide access to different sections
- Show system status

**Props:**
- None

**Example:**
```tsx
<UnderwritingDashboard />
```

### UnderwritingForm

The UnderwritingForm component is the main form component for submitting loan applications. It collects borrower information, property details, and loan requirements.

**Responsibilities:**
- Collect borrower information
- Collect property details
- Collect loan requirements
- Validate form data
- Submit loan application

**Props:**
- `onSubmit`: Function to call when the form is submitted

**Example:**
```tsx
<UnderwritingForm onSubmit={handleSubmit} />
```

### UnderwriteResults

The UnderwriteResults component displays the results of a loan application evaluation. It shows the decision, risk analysis, financial analysis, and property report.

**Responsibilities:**
- Display loan decision
- Show risk analysis
- Show financial analysis
- Show property report

**Props:**
- `decision`: Loan decision object

**Example:**
```tsx
<UnderwriteResults decision={decision} />
```

### Pipeline

The Pipeline component displays the loan application pipeline. It shows a summary of the pipeline, a list of applications, and processing metrics.

**Responsibilities:**
- Display pipeline summary
- Show application list
- Show processing metrics

**Props:**
- None

**Example:**
```tsx
<Pipeline />
```

### Settings

The Settings component provides access to system settings. It allows users to configure loan parameters, risk parameters, and integration settings.

**Responsibilities:**
- Configure loan parameters
- Configure risk parameters
- Configure integration settings

**Props:**
- None

**Example:**
```tsx
<Settings />
```

## Component Relationships

### Parent-Child Relationships

- **UnderwritingLayout** is the parent of all main components
- **UnderwritingForm** is the parent of BorrowerInformation, PropertyInformation, and LoanDetails
- **UnderwriteResults** is the parent of DecisionSummary, RiskAnalysis, FinancialAnalysis, and PropertyReport
- **Pipeline** is the parent of PipelineSummary, ApplicationList, and ProcessingMetrics
- **Settings** is the parent of LoanParameters, RiskParameters, and IntegrationSettings

### Component Communication

- **UnderwritingForm** communicates with the backend API to submit loan applications
- **UnderwriteResults** receives loan decision data from the backend API
- **Pipeline** receives pipeline data from the backend API
- **Settings** communicates with the backend API to update settings

## Component Implementation

### Component Structure

Each component should follow this structure:

```tsx
import React from 'react';
import { ComponentProps } from './types';

const Component: React.FC<ComponentProps> = (props) => {
  // Component implementation
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default Component;
```

### Component Types

Component types should be defined in a separate file:

```tsx
// types.ts
export interface ComponentProps {
  // Props definition
}
```

### Component Styling

Components should be styled using Tailwind CSS:

```tsx
<div className="bg-white p-6 rounded-lg shadow-sm">
  {/* Component content */}
</div>
```

## Component Best Practices

- Keep components focused on a single responsibility
- Use TypeScript for type safety
- Follow the container/presentational component pattern
- Use React hooks for state and side effects
- Implement proper error handling
- Write comprehensive tests
- Document component props and behavior
