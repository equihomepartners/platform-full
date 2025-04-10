# Traffic Light System API Integration

This document outlines how the Traffic Light System integrates with the Portfolio Management System (PMS) and Underwriting System through its API endpoints.

## Overview

The Traffic Light System exposes several API endpoints that allow other systems to access suburb classifications, ML model information, risk assessments, and other data. These endpoints are designed to be consumed by the Portfolio Management System and Underwriting System to enable seamless integration across the Equihome platform.

## API Base URL

```
/api
```

## Authentication

All API endpoints require authentication using JWT tokens. The tokens should be included in the `Authorization` header of each request:

```
Authorization: Bearer <token>
```

## API Endpoints

### Suburb Classification

#### Get All Suburb Classifications

```
GET /api/suburbs/classification
```

Returns a list of all suburbs with their classifications (green, yellow, red), scores, and confidence levels.

**Response Format:**
```json
{
  "suburbs": [
    {
      "suburb": "Bondi",
      "zone": "green",
      "score": 92,
      "confidence": 85.7,
      "key_factors": [
        "High equity",
        "Strong market demand",
        "Low foreclosure rate"
      ],
      "historical_changes": [
        {
          "date": "2025-03-15T00:00:00Z",
          "previous_zone": "yellow",
          "new_zone": "green"
        }
      ],
      "loan_metrics": {
        "average_ltv": 65,
        "foreclosure_rate": 0.5
      }
    }
  ],
  "last_updated": "2025-04-10T00:00:00Z",
  "next_update": "2025-04-17T00:00:00Z"
}
```

**Used By:**
- Portfolio Management System: For portfolio diversification and risk assessment
- Underwriting System: To identify green-zone suburbs for loan origination

### Suburb Analysis

#### Get Suburb Analysis

```
GET /api/suburbs/analysis/{suburbName}
```

Returns detailed analysis for a specific suburb, including property value metrics, loan risk assessment, and market metrics.

**Response Format:**
```json
{
  "suburb": "Bondi",
  "property_value_metrics": {
    "historical_growth": [
      {
        "date": "2024-04-10T00:00:00Z",
        "value": 2.5
      }
    ],
    "forecast_growth": [
      {
        "date": "2025-04-10T00:00:00Z",
        "value": 5.5,
        "confidence": 85.7
      }
    ],
    "stability": 85
  },
  "loan_risk_assessment": {
    "average_ltv": 65,
    "foreclosure_rate": 0.5,
    "homeowner_default_trends": [
      {
        "date": "2025-03-10T00:00:00Z",
        "rate": 0.8
      }
    ],
    "risk_score": 25
  },
  "infrastructure_score": 90,
  "development_status": "High",
  "transport_score": 85,
  "schools_score": 90,
  "market_metrics": {
    "median_price": 2800000,
    "price_growth": 5.5,
    "vacancy_rate": 1.2
  },
  "historical_property_value": [
    {
      "date": "2024-04-10T00:00:00Z",
      "value": 2650000
    }
  ],
  "forecast_property_value": [
    {
      "date": "2025-04-10T00:00:00Z",
      "value": 2800000,
      "confidence": 85.7
    }
  ],
  "loan_performance_metrics": {
    "default_rates": 0.8,
    "repayment_trends": [
      {
        "date": "2025-03-10T00:00:00Z",
        "rate": 99.2
      }
    ]
  }
}
```

**Used By:**
- Portfolio Management System: For detailed suburb analysis in portfolio simulations
- Underwriting System: For property risk assessment during loan evaluation

### ML Model Information

#### Get ML Model Information

```
GET /api/ml/model-info
```

Returns information about the current ML model, including version, features, data sources, and metrics.

**Response Format:**
```json
{
  "version": "1.0",
  "release_date": "2025-04-10T00:00:00Z",
  "next_update": "2025-04-17T00:00:00Z",
  "features": [
    "Suburb risk classification algorithm",
    "Property value forecasting",
    "Market cycle position detection",
    "Infrastructure impact assessment",
    "Comparable suburb identification"
  ],
  "data_sources": [
    "RBA Housing Market Data",
    "ABS Census Demographics",
    "ABS Property Price Index",
    "NSW Government Infrastructure Plans",
    "NSW Land Registry Services"
  ],
  "metrics": {
    "accuracy": 0.857,
    "confidence": 0.835,
    "data_points": 250000,
    "validation_score": 0.82
  },
  "training_info": {
    "last_training": "2025-04-03T00:00:00Z",
    "training_duration": 48,
    "iterations": 1250,
    "convergence_rate": 0.92
  }
}
```

**Used By:**
- Portfolio Management System: To understand ML model confidence and accuracy for risk assessment
- Underwriting System: To factor ML model confidence into loan decisions

#### Get ML System Status

```
GET /api/ml/system/status
```

Returns the current status of the ML system, including performance metrics and integration statuses.

**Response Format:**
```json
{
  "last_update": "2025-04-10T00:00:00Z",
  "next_update": "2025-04-17T00:00:00Z",
  "data_points": {
    "total": 250000,
    "last_24h": 2500,
    "new_properties": 120
  },
  "ml_model_metrics": {
    "accuracy": 0.857,
    "confidence": 0.835,
    "validation_score": 0.82
  },
  "llm_performance_metrics": {
    "rationale_coherence": 0.84,
    "business_model_alignment": 0.86,
    "explanation_quality": 0.82
  },
  "system_health": {
    "status": "operational",
    "uptime": 99.5,
    "latency": 180
  },
  "integration_statuses": {
    "rba": "connected",
    "absCensus": "connected",
    "absPriceIndex": "connected",
    "nswGovInfra": "connected",
    "nswLandRegistry": "connected"
  }
}
```

**Used By:**
- Portfolio Management System: To monitor ML system health for risk assessment
- Underwriting System: To factor ML system status into loan decisions

### Risk Correlation

#### Get Risk Correlation Matrix

```
GET /api/risk/correlation
```

Returns a correlation matrix of risk factors across suburbs.

**Response Format:**
```json
{
  "factors": [
    "property_value",
    "vacancy_rate",
    "foreclosure_rate",
    "infrastructure_score",
    "transport_score"
  ],
  "matrix": [
    [1.0, -0.7, -0.8, 0.6, 0.5],
    [-0.7, 1.0, 0.6, -0.4, -0.3],
    [-0.8, 0.6, 1.0, -0.5, -0.4],
    [0.6, -0.4, -0.5, 1.0, 0.8],
    [0.5, -0.3, -0.4, 0.8, 1.0]
  ],
  "risk_factors": [
    {
      "name": "property_value",
      "description": "Median property value in the suburb",
      "impact_score": 85,
      "correlation_summary": {
        "highest_correlation": {
          "factor": "foreclosure_rate",
          "value": -0.8
        },
        "lowest_correlation": {
          "factor": "transport_score",
          "value": 0.5
        }
      }
    }
  ],
  "suburb_correlations": [
    {
      "suburb_pair": ["Bondi", "Coogee"],
      "correlation": 0.85,
      "factors": ["proximity", "similar_demographics", "coastal_location"]
    }
  ]
}
```

**Used By:**
- Portfolio Management System: For risk assessment and portfolio diversification
- Underwriting System: For understanding correlated risks in loan evaluation

### Integration Endpoints

#### Get Underwriting Integration

```
GET /api/integration/underwriting
```

Returns integration data specifically for the Underwriting System.

**Response Format:**
```json
{
  "status": "active",
  "assessment_statistics": {
    "suburbs_analyzed": 150,
    "loans_evaluated": 500,
    "total_assessments": 1200,
    "last_24h": 25
  },
  "processing_metrics": {
    "average_time": 120,
    "automation_rate": 85
  },
  "confidence_metrics": {
    "overall": 87.5,
    "by_category": {
      "property_valuation": 90.2,
      "risk_assessment": 85.7,
      "homeowner_analysis": 86.8
    }
  },
  "zone_impact_analysis": {
    "green": {
      "default_rate": 0.8,
      "approval_rate": 92.5,
      "avg_processing_time": 110
    },
    "yellow": {
      "default_rate": 1.5,
      "approval_rate": 75.3,
      "avg_processing_time": 135
    },
    "red": {
      "default_rate": 3.2,
      "approval_rate": 45.1,
      "avg_processing_time": 160
    }
  },
  "recent_loan_applications": [
    {
      "id": "LOAN_001",
      "suburb": "Bondi",
      "status": "approved",
      "confidence": 92.5,
      "processing_time": 105
    }
  ],
  "risk_factor_impact": [
    {
      "factor": "property_value",
      "impact_on_approval": 0.85,
      "correlation_with_default": -0.72
    }
  ]
}
```

**Used By:**
- Underwriting System: For integration with the Traffic Light System

#### Get Portfolio Simulation Integration

```
GET /api/integration/portfolio
```

Returns integration data specifically for the Portfolio Management System.

**Response Format:**
```json
{
  "suburb_level_risk_correlations": [
    {
      "suburb_pair": ["Bondi", "Coogee"],
      "risk_correlation": 0.85,
      "diversification_benefit": 0.15
    }
  ],
  "forecast_confidence_intervals": [
    {
      "suburb": "Bondi",
      "forecast_period": "12_months",
      "lower_bound": 4.5,
      "expected_growth": 5.5,
      "upper_bound": 6.5,
      "confidence_level": 0.9
    }
  ],
  "loan_specific_metrics": [
    {
      "loan_id": "LOAN_001",
      "suburb": "Bondi",
      "risk_score": 25,
      "expected_roi": 9.5,
      "diversification_impact": 0.2
    }
  ],
  "historical_loan_performance": [
    {
      "suburb": "Bondi",
      "period": "2024_Q4",
      "default_rate": 0.8,
      "roi": 9.2,
      "ltv_ratio": 65
    }
  ],
  "simulation_data": {
    "time_series": [
      {
        "date": "2025-04-10T00:00:00Z",
        "portfolio_value": 15500000,
        "roi": 8.3,
        "default_rate": 1.0
      }
    ],
    "monte_carlo_parameters": {
      "iterations": 10000,
      "confidence_level": 0.95,
      "risk_factors": [
        {
          "name": "interest_rate",
          "distribution": "normal",
          "mean": 4.5,
          "std_dev": 0.5
        }
      ]
    }
  }
}
```

**Used By:**
- Portfolio Management System: For integration with the Traffic Light System

## Webhook Endpoints

The Traffic Light System also provides webhook endpoints to receive feedback from other systems:

### Receive Portfolio Feedback

```
POST /api/webhooks/portfolio-feedback
```

Receives feedback from the Portfolio Management System about suburb performance.

**Request Format:**
```json
{
  "suburb": "Bondi",
  "feedback_type": "performance",
  "metrics": {
    "default_rate": 0.8,
    "roi": 9.2,
    "ltv_ratio": 65
  },
  "recommendation": "continue_prioritizing",
  "confidence": 0.92
}
```

### Receive Underwriting Feedback

```
POST /api/webhooks/underwriting-feedback
```

Receives feedback from the Underwriting System about loan evaluations.

**Request Format:**
```json
{
  "suburb": "Bondi",
  "feedback_type": "loan_evaluation",
  "metrics": {
    "approval_rate": 92.5,
    "average_processing_time": 105,
    "risk_factors": [
      {
        "name": "property_value",
        "impact": 0.85
      }
    ]
  },
  "recommendation": "adjust_risk_weights",
  "confidence": 0.88
}
```

## Error Handling

All API endpoints return standard HTTP status codes:

- 200: Success
- 400: Bad Request (invalid parameters)
- 401: Unauthorized (invalid or missing authentication)
- 404: Not Found (resource not found)
- 500: Internal Server Error

Error responses include a JSON body with error details:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Suburb not found: Nonexistent Suburb",
    "details": {
      "suburb": "Nonexistent Suburb"
    }
  }
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse. The rate limits are:

- 100 requests per minute per API key
- 5,000 requests per day per API key

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1586941722
```

## Versioning

API versioning is handled through the URL path:

```
/api/v1/suburbs/classification
```

The current version is v1. When new versions are released, the old versions will be maintained for backward compatibility.

## Integration Best Practices

1. **Use Webhooks for Real-Time Updates**: Instead of polling the API endpoints, use webhooks to receive real-time updates.

2. **Cache Responses**: Cache API responses to reduce the number of requests and improve performance.

3. **Handle Errors Gracefully**: Implement proper error handling to ensure your application can handle API errors.

4. **Implement Retry Logic**: Implement retry logic with exponential backoff for failed requests.

5. **Monitor Rate Limits**: Monitor rate limit headers to avoid hitting rate limits.

6. **Use Pagination**: For endpoints that return large datasets, use pagination parameters to limit the amount of data returned.

7. **Validate Responses**: Validate API responses against the expected schema to catch any changes in the API.

## Future Enhancements

1. **GraphQL API**: A GraphQL API will be added to allow clients to request exactly the data they need.

2. **Real-Time Updates**: WebSocket support will be added for real-time updates.

3. **Bulk Operations**: Endpoints for bulk operations will be added to improve performance.

4. **Custom Webhooks**: Clients will be able to configure custom webhooks for specific events.

5. **API Keys Management**: A dashboard for managing API keys and monitoring usage will be added.
