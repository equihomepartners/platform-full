# Underwriting System API Endpoints

## Overview

The Underwriting System exposes a comprehensive set of API endpoints that allow other systems to access loan application data, property evaluations, risk assessments, and decision data. These endpoints are designed to be consumed by the Portfolio Management System and other internal systems to enable seamless integration across the Equihome platform.

## API Base URL

```
/api/underwriting
```

## Authentication

All API endpoints require authentication using JWT tokens. The tokens should be included in the `Authorization` header of each request:

```
Authorization: Bearer <token>
```

## API Categories

The Underwriting System API is organized into the following categories:

### 1. Loan Application APIs

Endpoints for managing loan applications:

- `POST /api/underwriting/applications` - Submit a new loan application
- `GET /api/underwriting/applications` - Get all loan applications
- `GET /api/underwriting/applications/{id}` - Get a specific loan application
- `PUT /api/underwriting/applications/{id}` - Update a loan application
- `DELETE /api/underwriting/applications/{id}` - Delete a loan application

### 2. Property Evaluation APIs

Endpoints for property evaluations:

- `POST /api/underwriting/properties/evaluate` - Evaluate a property
- `GET /api/underwriting/properties/valuations` - Get property valuations
- `GET /api/underwriting/properties/{id}` - Get a specific property
- `GET /api/underwriting/properties/comparable/{id}` - Get comparable properties

### 3. Risk Assessment APIs

Endpoints for risk assessments:

- `POST /api/underwriting/risk/assess` - Assess risk for a loan application
- `GET /api/underwriting/risk/factors` - Get risk factors
- `GET /api/underwriting/risk/metrics` - Get risk metrics
- `GET /api/underwriting/risk/assessment/{id}` - Get a specific risk assessment

### 4. Decision APIs

Endpoints for loan decisions:

- `POST /api/underwriting/decisions/evaluate` - Evaluate a loan application for decision
- `GET /api/underwriting/decisions` - Get all loan decisions
- `GET /api/underwriting/decisions/{id}` - Get a specific loan decision
- `PUT /api/underwriting/decisions/{id}/override` - Override a loan decision

### 5. Integration APIs

Endpoints for integration with other systems:

- `GET /api/underwriting/integration/traffic-light` - Get integration data for the Traffic Light System
- `GET /api/underwriting/integration/portfolio` - Get integration data for the Portfolio Management System

### 6. Webhook APIs

Endpoints for receiving feedback from other systems:

- `POST /api/underwriting/webhooks/traffic-light-feedback` - Receive feedback from the Traffic Light System
- `POST /api/underwriting/webhooks/portfolio-feedback` - Receive feedback from the Portfolio Management System

## API Endpoint Details

### Loan Application APIs

#### Submit a new loan application

```
POST /api/underwriting/applications
```

Submits a new loan application for evaluation.

**Request Body:**
```json
{
  "borrower": {
    "name": "John Doe",
    "annualIncome": 120000,
    "employmentStatus": "employed"
  },
  "property": {
    "address": "123 Main St, Sydney, NSW 2000",
    "type": "single-family",
    "currentValue": 1500000,
    "mortgageBalance": 500000
  },
  "loan": {
    "amount": 300000,
    "purpose": "renovation",
    "term": 10
  }
}
```

**Response:**
```json
{
  "id": "12345",
  "status": "submitted",
  "submittedAt": "2023-05-15T10:30:00Z",
  "borrower": {
    "name": "John Doe",
    "annualIncome": 120000,
    "employmentStatus": "employed"
  },
  "property": {
    "address": "123 Main St, Sydney, NSW 2000",
    "type": "single-family",
    "currentValue": 1500000,
    "mortgageBalance": 500000
  },
  "loan": {
    "amount": 300000,
    "purpose": "renovation",
    "term": 10
  }
}
```

#### Get all loan applications

```
GET /api/underwriting/applications
```

Returns a list of all loan applications.

**Query Parameters:**
- `status` (optional): Filter by status (submitted, in-review, approved, rejected)
- `limit` (optional): Limit the number of results
- `offset` (optional): Offset for pagination

**Response:**
```json
{
  "total": 100,
  "limit": 10,
  "offset": 0,
  "applications": [
    {
      "id": "12345",
      "status": "submitted",
      "submittedAt": "2023-05-15T10:30:00Z",
      "borrower": {
        "name": "John Doe"
      },
      "property": {
        "address": "123 Main St, Sydney, NSW 2000"
      },
      "loan": {
        "amount": 300000
      }
    },
    // More applications...
  ]
}
```

### Property Evaluation APIs

#### Evaluate a property

```
POST /api/underwriting/properties/evaluate
```

Evaluates a property for loan consideration.

**Request Body:**
```json
{
  "address": "123 Main St, Sydney, NSW 2000",
  "type": "single-family",
  "bedrooms": 4,
  "bathrooms": 2,
  "landSize": 500,
  "yearBuilt": 2000
}
```

**Response:**
```json
{
  "id": "67890",
  "address": "123 Main St, Sydney, NSW 2000",
  "type": "single-family",
  "bedrooms": 4,
  "bathrooms": 2,
  "landSize": 500,
  "yearBuilt": 2000,
  "valuation": {
    "estimatedValue": 1500000,
    "confidenceScore": 85,
    "comparableProperties": [
      // Comparable properties...
    ]
  },
  "riskAssessment": {
    "overallRisk": "low",
    "riskFactors": [
      // Risk factors...
    ]
  },
  "trafficLightZone": "green"
}
```

### Risk Assessment APIs

#### Assess risk for a loan application

```
POST /api/underwriting/risk/assess
```

Assesses risk for a loan application.

**Request Body:**
```json
{
  "applicationId": "12345"
}
```

**Response:**
```json
{
  "id": "54321",
  "applicationId": "12345",
  "overallRisk": "low",
  "riskScore": 85,
  "riskFactors": [
    {
      "factor": "ltv",
      "value": 20,
      "risk": "low",
      "impact": "positive"
    },
    {
      "factor": "borrowerCredit",
      "value": 750,
      "risk": "low",
      "impact": "positive"
    },
    {
      "factor": "propertyLocation",
      "value": "green",
      "risk": "low",
      "impact": "positive"
    }
  ],
  "recommendations": [
    // Recommendations...
  ]
}
```

### Decision APIs

#### Evaluate a loan application for decision

```
POST /api/underwriting/decisions/evaluate
```

Evaluates a loan application for decision.

**Request Body:**
```json
{
  "applicationId": "12345"
}
```

**Response:**
```json
{
  "id": "98765",
  "applicationId": "12345",
  "decision": "approved",
  "decisionDate": "2023-05-16T14:30:00Z",
  "terms": {
    "amount": 300000,
    "interestRate": 5,
    "term": 10,
    "originationFee": 3,
    "appreciationShare": "LTV-based"
  },
  "rationale": {
    "overallRisk": "low",
    "riskScore": 85,
    "keyFactors": [
      "Low LTV ratio (20%)",
      "Strong borrower credit (750)",
      "Property in green zone",
      "High projected IRR (9.5%)"
    ]
  },
  "financialProjections": {
    "irr": 9.5,
    "totalReturn": 150000,
    "yearlyBreakdown": [
      // Yearly breakdown...
    ]
  }
}
```

### Integration APIs

#### Get integration data for the Portfolio Management System

```
GET /api/underwriting/integration/portfolio
```

Returns integration data specifically for the Portfolio Management System.

**Response:**
```json
{
  "status": "active",
  "approvedLoans": {
    "count": 87,
    "totalAmount": 26100000,
    "averageLTV": 65.2,
    "averageIRR": 9.2
  },
  "pendingApplications": {
    "count": 24,
    "totalAmount": 7200000,
    "averageLTV": 68.5,
    "projectedIRR": 8.8
  },
  "zoneDistribution": {
    "green": 85,
    "yellow": 12,
    "red": 3
  },
  "recentApprovals": [
    // Recent approvals...
  ]
}
```
