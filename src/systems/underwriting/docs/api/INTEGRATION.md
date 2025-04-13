# Underwriting System API Integration

This document outlines how the Underwriting System integrates with the Traffic Light System and Portfolio Management System through its API endpoints.

## Overview

The Underwriting System exposes several API endpoints that allow other systems to access loan application data, property evaluations, risk assessments, and decision data. These endpoints are designed to be consumed by the Portfolio Management System and other internal systems to enable seamless integration across the Equihome platform.

## API Base URL

```
/api/underwriting
```

## Authentication

All API endpoints require authentication using JWT tokens. The tokens should be included in the `Authorization` header of each request:

```
Authorization: Bearer <token>
```

## Integration with Traffic Light System

### Data Flow from Traffic Light System to Underwriting System

The Underwriting System consumes the following data from the Traffic Light System:

1. **Green-Zone Suburbs**: List of suburbs classified as green zones for loan origination
2. **Risk Assessments**: Risk assessments for specific suburbs
3. **Property Value Forecasts**: Forecasts for property values in specific suburbs
4. **Market Cycle Positions**: Market cycle positions for specific suburbs

#### API Endpoints Used

```
GET /api/traffic-light/suburbs/classification
GET /api/traffic-light/suburbs/analysis/{suburbName}
GET /api/traffic-light/market/cycle/{suburbName}
GET /api/traffic-light/risk/correlation
```

#### Integration Implementation

The Underwriting System integrates with the Traffic Light System through the following mechanisms:

1. **Scheduled Data Sync**: Periodically fetches suburb classifications and other data
2. **Event-Driven Updates**: Subscribes to webhook notifications for suburb classification changes
3. **On-Demand Queries**: Fetches specific data when needed for loan evaluations

#### Example: Fetching Green-Zone Suburbs

```typescript
// Fetch green-zone suburbs from Traffic Light System
async function fetchGreenZoneSuburbs() {
  try {
    const response = await fetch('/api/traffic-light/suburbs/classification', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    // Filter for green zones only
    const greenZones = data.suburbs.filter(suburb => suburb.zone === 'green');
    
    return greenZones;
  } catch (error) {
    console.error('Error fetching green-zone suburbs:', error);
    return [];
  }
}
```

### Data Flow from Underwriting System to Traffic Light System

The Underwriting System provides the following data to the Traffic Light System:

1. **Loan Evaluation Feedback**: Feedback on loan evaluations for specific suburbs
2. **Approval Rate Statistics**: Statistics on loan approval rates by suburb
3. **Default Rate Statistics**: Statistics on loan default rates by suburb

#### API Endpoints Exposed

```
POST /api/underwriting/webhooks/traffic-light-feedback
```

#### Example Webhook Payload

```json
{
  "suburb": "Mosman",
  "feedback_type": "loan_evaluation",
  "metrics": {
    "approval_rate": 92.5,
    "average_processing_time": 110,
    "risk_factors": [
      {
        "name": "property_value",
        "impact": 0.8
      },
      {
        "name": "ltv_ratio",
        "impact": 0.6
      }
    ],
    "default_probability": 0.8
  },
  "recommendation": "maintain_green",
  "confidence": 0.95,
  "timestamp": "2023-05-16T14:30:00Z",
  "additional_notes": "Strong performance in this suburb with high approval rates and low default probability."
}
```

## Integration with Portfolio Management System

### Data Flow from Portfolio Management System to Underwriting System

The Underwriting System consumes the following data from the Portfolio Management System:

1. **Deal Rankings**: Rankings of potential loan deals based on portfolio impact
2. **Portfolio Allocation Recommendations**: Recommended allocation of new loans across suburbs and property types
3. **Risk Exposure Limits**: Maximum exposure limits for different suburbs and property types
4. **Target Return Metrics**: Target return metrics for new loans

#### API Endpoints Used

```
GET /api/portfolio/deal-rankings
GET /api/portfolio/allocation-recommendations
GET /api/portfolio/risk-exposure-limits
GET /api/portfolio/target-returns
```

#### Integration Implementation

The Underwriting System integrates with the Portfolio Management System through the following mechanisms:

1. **Scheduled Data Sync**: Periodically fetches deal rankings and other data
2. **Event-Driven Updates**: Subscribes to webhook notifications for portfolio changes
3. **On-Demand Queries**: Fetches specific data when needed for loan evaluations

#### Example: Fetching Deal Rankings

```typescript
// Fetch deal rankings from Portfolio Management System
async function fetchDealRankings() {
  try {
    const response = await fetch('/api/portfolio/deal-rankings', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    return data.rankings;
  } catch (error) {
    console.error('Error fetching deal rankings:', error);
    return [];
  }
}
```

### Data Flow from Underwriting System to Portfolio Management System

The Underwriting System provides the following data to the Portfolio Management System:

1. **Approved Loans**: Details of loans approved for inclusion in the portfolio
2. **Loan Applications**: Information about pending loan applications
3. **Property Valuations**: Property valuation data for portfolio analysis
4. **Risk Assessments**: Risk assessment data for portfolio risk management

#### API Endpoints Exposed

```
GET /api/underwriting/loans/approved
GET /api/underwriting/loans/applications
GET /api/underwriting/properties/valuations
GET /api/underwriting/risk/assessments
```

#### Example Response: Approved Loans

```json
{
  "total": 87,
  "limit": 10,
  "offset": 0,
  "loans": [
    {
      "id": "98765",
      "applicationId": "12345",
      "borrower": {
        "name": "John Doe"
      },
      "property": {
        "address": "123 Main St, Mosman, NSW 2088",
        "value": 1500000,
        "type": "single-family",
        "zone": "green"
      },
      "loan": {
        "amount": 300000,
        "ltv": 20,
        "term": 10,
        "interestRate": 5,
        "originationFee": 3,
        "appreciationShare": "LTV-based"
      },
      "risk": {
        "score": 85,
        "level": "low"
      },
      "financials": {
        "irr": 9.5,
        "totalReturn": 150000
      },
      "approvedAt": "2023-05-16T14:30:00Z"
    },
    // More loans...
  ]
}
```

## Webhook Integration

### Webhook Endpoints

The Underwriting System exposes the following webhook endpoints:

```
POST /api/underwriting/webhooks/traffic-light-feedback
POST /api/underwriting/webhooks/portfolio-feedback
```

### Webhook Authentication

Webhooks are authenticated using a shared secret key. The key should be included in the `X-Webhook-Secret` header of each request:

```
X-Webhook-Secret: <secret-key>
```

### Webhook Payload Validation

The Underwriting System validates webhook payloads using the following steps:

1. Verify the `X-Webhook-Secret` header matches the expected secret key
2. Verify the payload structure matches the expected schema
3. Process the webhook payload

### Webhook Retry Mechanism

If a webhook fails to deliver, the sending system should retry with exponential backoff:

1. First retry: 5 seconds after failure
2. Second retry: 10 seconds after first retry
3. Third retry: 20 seconds after second retry
4. Fourth retry: 40 seconds after third retry
5. Fifth retry: 80 seconds after fourth retry

After 5 failed attempts, the webhook should be considered failed and manual intervention may be required.
