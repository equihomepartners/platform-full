# Portfolio Management System API Integration

This document outlines how the Portfolio Management System integrates with the Traffic Light System and Underwriting System through its API endpoints.

## Overview

The Portfolio Management System exposes several API endpoints that allow other systems to access portfolio data, simulation results, and optimization recommendations. These endpoints are designed to be consumed by the Traffic Light System and Underwriting System to enable seamless integration across the Equihome platform.

## API Base URL

```
/api/portfolio
```

## Authentication

All API endpoints require authentication using JWT tokens. The tokens should be included in the `Authorization` header of each request:

```
Authorization: Bearer <token>
```

## Integration with Traffic Light System

The Portfolio Management System integrates with the Traffic Light System to incorporate suburb risk classifications and forecasts into portfolio optimization and risk assessment.

### Data Flow from Traffic Light System to Portfolio Management System

The Portfolio Management System consumes the following data from the Traffic Light System:

1. **Suburb Classifications**: Green, yellow, and red zone classifications for suburbs
2. **Risk Assessments**: Risk metrics for each suburb
3. **Growth Forecasts**: Projected property value growth for each suburb
4. **Market Cycle Positions**: Current and forecasted market cycle positions

#### API Endpoints Used

```
GET /api/traffic-light/suburbs/classification
GET /api/traffic-light/suburbs/analysis/{suburbName}
GET /api/traffic-light/risk/correlation
GET /api/traffic-light/market/cycle/{suburbName}
```

#### Integration Implementation

The Portfolio Management System integrates with the Traffic Light System through the following mechanisms:

1. **Scheduled Data Sync**: Periodically fetches updated data from the Traffic Light System
2. **Event-Driven Updates**: Subscribes to webhook notifications for significant changes
3. **On-Demand Queries**: Fetches specific data when needed for simulations or optimizations

#### Simulation Integration

The Portfolio Management System's simulation engine uses TFS data to run more accurate and realistic simulations. When running a simulation, the system:

1. Retrieves the latest TFS data including suburb classifications, risk correlations, growth forecasts, default rates, and market cycles
2. Transforms this data into formats suitable for portfolio optimization
3. Incorporates the transformed data into the simulation model
4. Generates optimized portfolio allocations based on TFS data
5. Provides risk-adjusted return projections that account for TFS risk assessments

#### Data Transformation

The integration service transforms TFS data into formats suitable for portfolio optimization:

```typescript
// Example of transformed TFS data for portfolio optimization
{
  suburb: "Parramatta",
  zone: "green",
  score: 85,
  confidence: 0.92,
  riskScore: 33.0,
  expectedReturn: 6.24,
  growthForecast: {
    shortTerm: 5.2,
    mediumTerm: 12.5,
    longTerm: 22.8,
    confidence: 0.85
  },
  defaultRate: {
    current: 0.8,
    forecast: 0.9
  },
  marketCycle: {
    position: "growth",
    confidence: 0.88
  },
  confidenceScore: 0.88
}
```

#### Fallback Mechanism

The integration includes a robust fallback mechanism to ensure the Portfolio Management System can function even when the TFS is unavailable:

1. The system first attempts to retrieve data from the TFS API
2. If the API is unavailable, it falls back to cached TFS data
3. If no cached data is available, it falls back to mock TFS data

#### Example: Fetching Suburb Classifications

```javascript
// Fetch suburb classifications from Traffic Light System
const fetchSuburbClassifications = async () => {
  try {
    const response = await fetch('/api/traffic-light/suburbs/classification', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      // Fall back to mock data if API call fails
      return mockSuburbClassifications;
    }

    const data = await response.json();
    return data.suburbs;
  } catch (error) {
    console.error('Error fetching suburb classifications:', error);
    // Fall back to mock data if API call fails
    return mockSuburbClassifications;
  }
};
```

### Data Flow from Portfolio Management System to Traffic Light System

The Portfolio Management System provides the following data to the Traffic Light System:

1. **Portfolio Allocation by Suburb**: Current allocation of the portfolio across different suburbs
2. **Suburb Performance**: Performance metrics for loans in each suburb
3. **Risk Exposure**: Portfolio risk exposure to different suburbs
4. **Investment Recommendations**: Recommended investment allocations based on portfolio optimization

#### API Endpoints Exposed

```
GET /api/portfolio/integration/traffic-light
```

#### Example Response

```json
{
  "status": "success",
  "data": {
    "portfolioAllocationByZone": [
      {
        "zone": "green",
        "allocation": 85,
        "value": 12750000,
        "performance": {
          "irr": 19.2,
          "defaultRate": 0.5
        }
      },
      {
        "zone": "yellow",
        "allocation": 15,
        "value": 2250000,
        "performance": {
          "irr": 14.8,
          "defaultRate": 1.2
        }
      },
      {
        "zone": "red",
        "allocation": 0,
        "value": 0,
        "performance": {
          "irr": 0,
          "defaultRate": 0
        }
      }
    ],
    "suburbPerformance": [
      {
        "suburb": "Mosman",
        "zone": "green",
        "allocation": 22,
        "value": 3300000,
        "performance": {
          "irr": 18.8,
          "roi": 22.6,
          "defaultRate": 0.4
        }
      },
      {
        "suburb": "Bondi",
        "zone": "green",
        "allocation": 18,
        "value": 2700000,
        "performance": {
          "irr": 19.5,
          "roi": 23.4,
          "defaultRate": 0.3
        }
      }
    ],
    "zoneTransitionImpact": [
      {
        "suburb": "Leichhardt",
        "currentZone": "yellow",
        "potentialZone": "green",
        "allocationImpact": 3,
        "performanceImpact": 2.1
      },
      {
        "suburb": "Strathfield",
        "currentZone": "yellow",
        "potentialZone": "red",
        "allocationImpact": -7,
        "performanceImpact": -1.8
      }
    ]
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

#### Webhook Integration

The Portfolio Management System also provides webhook endpoints for the Traffic Light System to receive real-time updates:

```
POST /api/webhooks/portfolio-feedback
```

**Request Format:**
```json
{
  "type": "portfolio_allocation_update",
  "data": {
    "timestamp": "2025-04-10T00:00:00Z",
    "portfolioAllocationByZone": {
      "green": 85,
      "yellow": 15,
      "red": 0
    },
    "suburbPerformance": [
      {
        "suburb": "Mosman",
        "allocation": 22,
        "performance": {
          "irr": 18.8,
          "defaultRate": 0.4
        }
      }
    ]
  }
}
```

## Integration with Underwriting System

The Portfolio Management System integrates with the Underwriting System to provide portfolio allocation recommendations and receive approved loans for inclusion in the portfolio.

### Data Flow from Underwriting System to Portfolio Management System

The Portfolio Management System consumes the following data from the Underwriting System:

1. **Approved Loans**: Details of loans approved for inclusion in the portfolio
2. **Loan Applications**: Information about pending loan applications
3. **Borrower Data**: Anonymized borrower information for risk assessment
4. **Property Valuations**: Property valuation data for portfolio analysis

#### API Endpoints Used

```
GET /api/underwriting/loans/approved
GET /api/underwriting/loans/applications
GET /api/underwriting/borrowers/summary
GET /api/underwriting/properties/valuations
```

#### Integration Implementation

The Portfolio Management System integrates with the Underwriting System through the following mechanisms:

1. **Scheduled Data Sync**: Periodically fetches approved loans and other data
2. **Event-Driven Updates**: Subscribes to webhook notifications for loan approvals
3. **On-Demand Queries**: Fetches specific data when needed for portfolio updates

#### Example: Fetching Approved Loans

```javascript
// Fetch approved loans from Underwriting System
const fetchApprovedLoans = async () => {
  try {
    const response = await fetch('/api/underwriting/loans/approved', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      // Fall back to mock data if API call fails
      return mockApprovedLoans;
    }

    const data = await response.json();
    return data.loans;
  } catch (error) {
    console.error('Error fetching approved loans:', error);
    // Fall back to mock data if API call fails
    return mockApprovedLoans;
  }
};
```

### Data Flow from Portfolio Management System to Underwriting System

The Portfolio Management System provides the following data to the Underwriting System:

1. **Portfolio Allocation Recommendations**: Recommended allocation of new loans across suburbs and property types
2. **Risk Exposure Limits**: Maximum exposure limits for different suburbs and property types
3. **Target Returns**: Target return metrics for new loans
4. **Portfolio Constraints**: Constraints for loan approval decisions

#### API Endpoints Exposed

```
GET /api/portfolio/integration/underwriting
```

#### Example Response

```json
{
  "status": "success",
  "data": {
    "dealRecommendations": {
      "targetSuburbs": [
        {
          "suburb": "Mosman",
          "targetAllocation": 22,
          "currentAllocation": 20,
          "allocationGap": 2,
          "maxLoanSize": 1000000
        },
        {
          "suburb": "Bondi",
          "targetAllocation": 18,
          "currentAllocation": 18,
          "allocationGap": 0,
          "maxLoanSize": 900000
        }
      ],
      "targetPropertyTypes": [
        {
          "type": "House",
          "targetAllocation": 45,
          "currentAllocation": 42,
          "allocationGap": 3
        },
        {
          "type": "Apartment",
          "targetAllocation": 35,
          "currentAllocation": 38,
          "allocationGap": -3
        }
      ]
    },
    "portfolioConstraints": {
      "maxLTV": 75,
      "maxLoanSize": 1500000,
      "minPropertyValue": 1000000,
      "maxSuburbExposure": 25,
      "maxPropertyTypeExposure": 50
    },
    "riskParameters": {
      "maxDefaultProbability": 2.5,
      "maxLossGivenDefault": 20,
      "maxExpectedLoss": 0.5,
      "minDebtServiceCoverageRatio": 1.5
    }
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

#### Webhook Integration

The Portfolio Management System also provides webhook endpoints for the Underwriting System to receive real-time updates:

```
POST /api/webhooks/portfolio-constraints
```

**Request Format:**
```json
{
  "type": "portfolio_constraints_update",
  "data": {
    "timestamp": "2025-04-10T00:00:00Z",
    "portfolioConstraints": {
      "maxLTV": 75,
      "maxLoanSize": 1500000,
      "minPropertyValue": 1000000
    },
    "suburbConstraints": [
      {
        "suburb": "Mosman",
        "maxAllocation": 25,
        "currentAllocation": 22,
        "remainingCapacity": 3
      }
    ]
  }
}
```

## Integration Architecture

The integration between the Portfolio Management System, Traffic Light System, and Underwriting System follows a microservices architecture with the following components:

### API Gateway

The API Gateway serves as the entry point for all API requests, handling authentication, rate limiting, and request routing.

### Service Discovery

The Service Discovery component allows services to discover and communicate with each other, enabling dynamic scaling and failover.

### Message Queue

The Message Queue enables asynchronous communication between services, ensuring reliable message delivery and decoupling service dependencies.

### Event Bus

The Event Bus provides a publish-subscribe mechanism for services to broadcast and receive events, enabling real-time updates and event-driven architecture.

## Integration Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Traffic Light  │     │    Portfolio    │     │   Underwriting  │
│     System      │◄────┤   Management    │◄────┤     System      │
└─────────────────┘     │     System      │     └─────────────────┘
         │              └─────────────────┘              │
         │                      ▲                        │
         │                      │                        │
         ▼                      ▼                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API Gateway                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     Service     │     │    Message      │     │    Event Bus    │
│    Discovery    │     │     Queue       │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Stress Testing Integration

The Portfolio Management System provides stress testing capabilities that integrate with both the Traffic Light System and Underwriting System to assess portfolio resilience under various scenarios.

### Stress Test Scenarios

The stress testing module supports the following scenarios:

1. **Interest Rate Shock**: Simulates a sudden increase in interest rates
2. **Property Market Crash**: Simulates a severe downturn in property values
3. **Economic Recession**: Simulates an economic recession with increased vacancy and reduced rents
4. **Regulatory Changes**: Simulates the impact of regulatory changes on the portfolio
5. **Liquidity Crisis**: Simulates a liquidity crisis with reduced access to funding

### Integration with Traffic Light System

The stress testing module integrates with the Traffic Light System to:

1. **Incorporate Suburb Risk Data**: Uses suburb risk classifications to assess vulnerability to stress scenarios
2. **Apply Differentiated Impacts**: Applies different stress impacts based on suburb characteristics
3. **Generate Suburb-Specific Recommendations**: Provides recommendations for portfolio adjustments based on suburb performance under stress

#### API Endpoints Used

```
GET /api/traffic-light/suburbs/risk-profile
GET /api/traffic-light/market/sensitivity/{scenario}
```

### Integration with Underwriting System

The stress testing module integrates with the Underwriting System to:

1. **Update Underwriting Criteria**: Provides recommendations for adjusting underwriting criteria based on stress test results
2. **Assess Loan Portfolio Resilience**: Evaluates the resilience of the loan portfolio under stress scenarios
3. **Identify Vulnerable Segments**: Identifies loan segments that are particularly vulnerable to stress scenarios

#### API Endpoints Used

```
GET /api/underwriting/loans/risk-profile
POST /api/underwriting/criteria/recommendations
```

### Stress Test API Endpoints

```
GET /api/portfolio/stress-test/scenarios
POST /api/portfolio/stress-test
GET /api/portfolio/stress-test/{id}
```

## Analytics Integration

The Portfolio Management System provides advanced analytics capabilities that integrate with both the Traffic Light System and Underwriting System to provide comprehensive insights.

### Analytics Capabilities

The analytics module provides the following capabilities:

1. **Performance Attribution**: Analyzes the sources of portfolio performance
2. **Risk Decomposition**: Breaks down portfolio risk into its components
3. **Scenario Analysis**: Evaluates portfolio performance under different scenarios
4. **Trend Analysis**: Identifies trends in portfolio performance over time
5. **Comparative Analysis**: Compares portfolio performance against benchmarks

### Integration with Traffic Light System

The analytics module integrates with the Traffic Light System to:

1. **Incorporate Market Cycle Data**: Uses market cycle data to contextualize portfolio performance
2. **Analyze Suburb Performance**: Evaluates the performance of different suburbs in the portfolio
3. **Identify Emerging Opportunities**: Identifies emerging opportunities based on suburb forecasts

#### API Endpoints Used

```
GET /api/traffic-light/market/cycle
GET /api/traffic-light/suburbs/performance
GET /api/traffic-light/forecasts/opportunities
```

### Integration with Underwriting System

The analytics module integrates with the Underwriting System to:

1. **Analyze Loan Performance**: Evaluates the performance of loans in the portfolio
2. **Identify Underwriting Factors**: Identifies underwriting factors that contribute to loan performance
3. **Optimize Underwriting Criteria**: Provides recommendations for optimizing underwriting criteria

#### API Endpoints Used

```
GET /api/underwriting/loans/performance
GET /api/underwriting/criteria/analysis
POST /api/underwriting/criteria/optimization
```

### Analytics API Endpoints

```
GET /api/portfolio/analytics
GET /api/portfolio/analytics/attribution
GET /api/portfolio/analytics/risk
GET /api/portfolio/analytics/trends
GET /api/portfolio/analytics/comparison
```

## Mock Data Implementation

During development, the integration between systems is simulated using mock data. This allows frontend development to proceed independently of backend implementation, while ensuring a smooth transition to production.

The mock data is structured to match the expected API responses, with realistic values and relationships between different data points. The system includes fallback mechanisms to use mock data when API calls fail, ensuring that the frontend components can be tested and demonstrated without a fully implemented backend.

Once the backend services are implemented, the mock data will be replaced with real data from the APIs. The integration contracts will remain the same, allowing for a seamless transition from development to production.
