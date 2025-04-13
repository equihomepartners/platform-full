# Traffic Light System API Endpoints

This document provides detailed information about the API endpoints exposed by the Traffic Light System.

## Suburb APIs

### Get All Suburb Classifications

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
      ]
    }
  ],
  "last_updated": "2025-04-10T00:00:00Z",
  "next_update": "2025-04-17T00:00:00Z"
}
```

### Get Suburb Analysis

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
    "risk_score": 25
  },
  "market_metrics": {
    "median_price": 2800000,
    "price_growth": 5.5,
    "vacancy_rate": 1.2
  }
}
```

### Get Comparable Suburbs

```
GET /api/suburbs/comparable/{suburbName}
```

Returns a list of suburbs that are comparable to the specified suburb.

**Response Format:**
```json
{
  "suburb": "Bondi",
  "comparable_suburbs": [
    {
      "suburb": "Coogee",
      "similarity_score": 85,
      "similarity_factors": [
        "Coastal location",
        "Similar demographics",
        "Similar price range"
      ]
    }
  ]
}
```

## Market APIs

### Get Market Cycle Position

```
GET /api/market/cycle/{suburbName}
```

Returns the market cycle position for a specific suburb.

**Response Format:**
```json
{
  "suburb": "Bondi",
  "cycle_position": "growth",
  "cycle_metrics": {
    "price_momentum": 0.8,
    "demand_supply_ratio": 1.2,
    "days_on_market": 28
  },
  "historical_positions": [
    {
      "date": "2024-04-10T00:00:00Z",
      "position": "recovery"
    }
  ],
  "forecast_positions": [
    {
      "date": "2025-04-10T00:00:00Z",
      "position": "peak",
      "confidence": 75.5
    }
  ]
}
```

### Get Growth Corridors

```
GET /api/growth/corridors
```

Returns information about growth corridors.

**Response Format:**
```json
{
  "growth_corridors": [
    {
      "name": "Eastern Suburbs",
      "suburbs": [
        "Bondi",
        "Coogee",
        "Randwick"
      ],
      "growth_metrics": {
        "average_growth": 5.5,
        "growth_momentum": 0.8,
        "infrastructure_score": 85
      }
    }
  ]
}
```

## ML APIs

### Get ML Decisions

```
GET /api/ml/decisions/{suburbName}
```

Returns ML decisions for a specific suburb.

**Response Format:**
```json
{
  "suburb": "Bondi",
  "decisions": {
    "zone_classification": {
      "zone": "green",
      "confidence": 85.7,
      "factors": [
        {
          "name": "owner_equity",
          "impact": 0.8,
          "direction": "positive"
        }
      ]
    },
    "investment_recommendation": {
      "recommendation": "buy",
      "confidence": 82.5,
      "rationale": "Strong growth potential with low risk"
    }
  }
}
```

### Get ML System Status

```
GET /api/ml/system/status
```

Returns the current status of the ML system.

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
  "system_health": {
    "status": "operational",
    "uptime": 99.5,
    "latency": 180
  }
}
```

### Get ML Model Information

```
GET /api/ml/model-info
```

Returns information about the current ML model.

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
  }
}
```

## Risk APIs

### Get Risk Correlation Matrix

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
  ]
}
```

## Integration APIs

### Get Underwriting Integration

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
  }
}
```

### Get Portfolio Integration

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
  ]
}
```

## Webhook APIs

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
