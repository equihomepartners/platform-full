# Underwriting & Origination Module

## Overview

The Underwriting & Origination module is responsible for evaluating applications and generating term sheets for homeowners. It performs due diligence, financial modeling, and risk assessment to ensure each loan aligns with Equihome's investment criteria and financial goals.

## Key Features

### Loan Application Processing

The Loan Application Processing feature provides a comprehensive form for loan application submission. It collects all necessary information about the borrower, property, and loan requirements.

**Components:**
- **Application Form**: Form for submitting loan applications
- **Application Validation**: Validation of application data
- **Application Submission**: Submission of applications to the pipeline
- **Application Status Tracking**: Tracking of application status

### Property Evaluation

The Property Evaluation feature provides detailed property assessment with PropTrack integration. It evaluates the property's value, condition, and market trends.

**Components:**
- **PropTrack Integration**: Integration with PropTrack for property valuation
- **Comparable Property Analysis**: Analysis of comparable properties
- **Market Trend Analysis**: Analysis of market trends
- **Property Condition Assessment**: Assessment of property condition

### Risk Assessment

The Risk Assessment feature provides ML-powered risk scoring for loan applications. It evaluates the risk of each loan application based on multiple factors.

**Components:**
- **Risk Scoring Algorithm**: Algorithm that scores risk based on multiple factors
- **Risk Factor Analysis**: Analysis of individual risk factors
- **Risk Mitigation Recommendations**: Recommendations for mitigating identified risks
- **Risk Dashboard**: Dashboard for viewing risk assessments

### Decision Engine

The Decision Engine feature provides automated approval/rejection based on risk assessment. It applies business rules to risk assessments to make loan approval decisions.

**Components:**
- **Decision Rules Engine**: Engine that applies business rules to risk assessments
- **Decision Dashboard**: Dashboard for viewing and managing decisions
- **Manual Override**: Manual override of automated decisions
- **Decision Audit Trail**: Audit trail of all decisions

### Term Sheet Generation

The Term Sheet Generation feature generates term sheets for approved loans. It creates legally binding documents that outline the terms and conditions of the loan.

**Components:**
- **Term Sheet Template**: Template for generating term sheets
- **Term Sheet Customization**: Customization of term sheets based on loan details
- **Term Sheet Preview**: Preview of term sheets before generation
- **Term Sheet Distribution**: Distribution of term sheets to borrowers

### Document Management

The Document Management feature manages documents related to loan applications. It stores, organizes, and provides access to all documents related to a loan application.

**Components:**
- **Document Upload**: Upload of documents
- **Document Organization**: Organization of documents by category
- **Document Search**: Search for documents
- **Document Access Control**: Control of access to documents

## Integration with Other Modules

The Underwriting & Origination module integrates with:

- **Pipeline Management**: Receives applications from the pipeline and sends underwriting decisions back
- **Sales & Marketing Dashboard**: Provides data on approved loans for marketing analysis
- **Analytics & Reporting**: Provides data for analytics and reporting

## Integration with Other Systems

The Underwriting & Origination module integrates with:

- **Traffic Light System**: Consumes green-zone suburbs for loan origination
- **Portfolio Management System**: Consumes deal rankings for loan prioritization
- **PropTrack**: Integrates for property valuation and market data

## API Endpoints

The Underwriting & Origination module exposes the following API endpoints:

```
POST /api/underwriting/applications
GET /api/underwriting/applications
GET /api/underwriting/applications/{id}
PUT /api/underwriting/applications/{id}
DELETE /api/underwriting/applications/{id}
POST /api/underwriting/properties/evaluate
GET /api/underwriting/properties/valuations
GET /api/underwriting/properties/{id}
GET /api/underwriting/properties/comparable/{id}
POST /api/underwriting/risk/assess
GET /api/underwriting/risk/factors
GET /api/underwriting/risk/metrics
GET /api/underwriting/risk/assessment/{id}
POST /api/underwriting/decisions/evaluate
GET /api/underwriting/decisions
GET /api/underwriting/decisions/{id}
PUT /api/underwriting/decisions/{id}/override
POST /api/underwriting/termsheets/generate
GET /api/underwriting/termsheets
GET /api/underwriting/termsheets/{id}
POST /api/underwriting/documents/upload
GET /api/underwriting/documents
GET /api/underwriting/documents/{id}
DELETE /api/underwriting/documents/{id}
```

## Data Model

The Underwriting & Origination module uses the following data models:

### Loan Application

```typescript
interface LoanApplication {
  id: string;
  status: 'submitted' | 'in-review' | 'approved' | 'rejected';
  submittedAt: string;
  lastUpdatedAt: string;
  borrower: {
    name: string;
    email: string;
    phone: string;
    annualIncome: number;
    employmentStatus: string;
    creditScore?: number;
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
    interestRate?: number;
    originationFee?: number;
    appreciationShare?: number;
  };
  valuation?: PropertyValuation;
  riskAssessment?: RiskAssessment;
  decision?: LoanDecision;
  termSheet?: TermSheet;
  documents: Document[];
}
```

### Property Valuation

```typescript
interface PropertyValuation {
  id: string;
  propertyId: string;
  estimatedValue: number;
  confidenceScore: number;
  valuationDate: string;
  source: 'proptrack' | 'manual';
  comparableProperties: ComparableProperty[];
  marketTrends: {
    period: 'month' | 'quarter' | 'year';
    growthRate: number;
  }[];
}

interface ComparableProperty {
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  landSize: number;
  salePrice: number;
  saleDate: string;
  distanceKm: number;
}
```

### Risk Assessment

```typescript
interface RiskAssessment {
  id: string;
  applicationId: string;
  overallRisk: 'low' | 'medium' | 'high';
  riskScore: number;
  assessmentDate: string;
  riskFactors: RiskFactor[];
  mitigationRecommendations: string[];
}

interface RiskFactor {
  factor: string;
  value: number | string;
  risk: 'low' | 'medium' | 'high';
  impact: 'positive' | 'negative' | 'neutral';
  weight: number;
  score: number;
}
```

### Loan Decision

```typescript
interface LoanDecision {
  id: string;
  applicationId: string;
  decision: 'approved' | 'rejected';
  decisionDate: string;
  decisionBy: string;
  automated: boolean;
  overridden: boolean;
  originalDecision?: 'approved' | 'rejected';
  overrideReason?: string;
  terms?: {
    amount: number;
    interestRate: number;
    term: number;
    originationFee: number;
    appreciationShare: number;
  };
  conditions?: string[];
  rationale: string[];
  financialProjections: {
    irr: number;
    totalReturn: number;
    yearlyBreakdown: {
      year: number;
      propertyValue: number;
      accruedInterest: number;
      appreciationShare: number;
      totalReturn: number;
    }[];
  };
}
```

### Term Sheet

```typescript
interface TermSheet {
  id: string;
  applicationId: string;
  decisionId: string;
  generatedAt: string;
  generatedBy: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  sentAt?: string;
  respondedAt?: string;
  terms: {
    amount: number;
    interestRate: number;
    term: number;
    originationFee: number;
    appreciationShare: number;
  };
  conditions: string[];
  documentUrl: string;
}
```

### Document

```typescript
interface Document {
  id: string;
  applicationId: string;
  name: string;
  type: string;
  category: 'identity' | 'income' | 'property' | 'loan' | 'other';
  uploadedAt: string;
  uploadedBy: string;
  url: string;
}
```

## User Interface

The Underwriting & Origination module provides the following user interfaces:

- **Application Form**: Form for submitting loan applications
- **Application Detail View**: Detailed view of a specific application
- **Property Evaluation Dashboard**: Dashboard for property evaluations
- **Risk Assessment Dashboard**: Dashboard for risk assessments
- **Decision Dashboard**: Dashboard for loan decisions
- **Term Sheet Generator**: Interface for generating term sheets
- **Document Management Interface**: Interface for managing documents
