# Portfolio Management System API Endpoints

This document provides detailed information about the API endpoints exposed by the Portfolio Management System.

## Portfolio APIs

### Get Portfolio Summary

```
GET /api/portfolio/summary
```

Returns summary information about the portfolio, including total value, loan count, and key metrics.

**Response Format:**
```json
{
  "status": "success",
  "data": {
    "id": "portfolio-001",
    "name": "Equihome Main Portfolio",
    "totalValue": 15000000,
    "loanCount": 25,
    "averageLTV": 65,
    "weightedAverageInterestRate": 5.2,
    "weightedAverageMaturity": 7.5,
    "performanceMetrics": {
      "irr": 18.5,
      "roi": 22.3,
      "cashYield": 8.7,
      "totalReturn": 3350000
    },
    "riskMetrics": {
      "defaultRate": 0.8,
      "lossGivenDefault": 15.2,
      "expectedLoss": 0.12,
      "stressTestImpact": -5.3
    }
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

### Get Portfolio Allocation

```
GET /api/portfolio/allocation
```

Returns detailed allocation information for the portfolio, including allocation by suburb, property type, and zone.

**Response Format:**
```json
{
  "status": "success",
  "data": {
    "allocationBySuburb": [
      {
        "suburb": "Mosman",
        "allocation": 22,
        "value": 3300000,
        "zone": "green"
      },
      {
        "suburb": "Bondi",
        "allocation": 18,
        "value": 2700000,
        "zone": "green"
      }
    ],
    "allocationByPropertyType": [
      {
        "type": "House",
        "allocation": 45,
        "value": 6750000
      },
      {
        "type": "Apartment",
        "allocation": 35,
        "value": 5250000
      },
      {
        "type": "Townhouse",
        "allocation": 20,
        "value": 3000000
      }
    ],
    "allocationByZone": [
      {
        "zone": "green",
        "allocation": 85,
        "value": 12750000
      },
      {
        "zone": "yellow",
        "allocation": 15,
        "value": 2250000
      },
      {
        "zone": "red",
        "allocation": 0,
        "value": 0
      }
    ]
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

### Get Portfolio Performance

```
GET /api/portfolio/performance
```

Returns historical performance data for the portfolio, including returns, cash flows, and growth.

**Response Format:**
```json
{
  "status": "success",
  "data": {
    "historicalReturns": [
      {
        "date": "2024-01-01T00:00:00Z",
        "irr": 17.8,
        "roi": 21.5,
        "cashYield": 8.2
      },
      {
        "date": "2024-02-01T00:00:00Z",
        "irr": 18.1,
        "roi": 21.9,
        "cashYield": 8.4
      }
    ],
    "historicalCashFlows": [
      {
        "date": "2024-01-01T00:00:00Z",
        "interestIncome": 65000,
        "principalRepayments": 120000,
        "defaultLosses": 5000,
        "netCashFlow": 180000
      },
      {
        "date": "2024-02-01T00:00:00Z",
        "interestIncome": 67000,
        "principalRepayments": 125000,
        "defaultLosses": 3000,
        "netCashFlow": 189000
      }
    ],
    "historicalGrowth": [
      {
        "date": "2024-01-01T00:00:00Z",
        "portfolioValue": 14500000,
        "growth": 2.1
      },
      {
        "date": "2024-02-01T00:00:00Z",
        "portfolioValue": 14800000,
        "growth": 2.0
      }
    ]
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

### Get Portfolio Metrics

```
GET /api/portfolio/metrics
```

Returns key metrics for the portfolio, including risk metrics, performance metrics, and diversification metrics.

**Response Format:**
```json
{
  "status": "success",
  "data": {
    "riskMetrics": {
      "defaultRate": 0.8,
      "lossGivenDefault": 15.2,
      "expectedLoss": 0.12,
      "stressTestImpact": -5.3,
      "concentrationRisk": 0.35,
      "marketRisk": 0.42
    },
    "performanceMetrics": {
      "irr": 18.5,
      "roi": 22.3,
      "cashYield": 8.7,
      "totalReturn": 3350000,
      "sharpeRatio": 1.8,
      "alphaVsMarket": 3.2
    },
    "diversificationMetrics": {
      "suburbDiversification": 0.78,
      "propertyTypeDiversification": 0.65,
      "loanSizeDiversification": 0.72,
      "maturityDiversification": 0.81
    }
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

## Deal APIs

### Get Deals

```
GET /api/deals
```

Returns a list of deals in the portfolio, with basic information about each deal.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 20, max: 100)
- `filter[suburb]`: Filter by suburb
- `filter[propertyType]`: Filter by property type
- `filter[ltv]`: Filter by LTV range (e.g., `filter[ltv]=50-70`)
- `sort`: Sort by field (e.g., `sort=propertyValue` or `sort=-propertyValue` for descending)

**Response Format:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "deal-001",
      "suburb": "Mosman",
      "propertyValue": 4200000,
      "loanAmount": 850000,
      "ltv": 20.24,
      "interestRate": 5.5,
      "maturity": "2030-03-15T00:00:00Z",
      "status": "active"
    },
    {
      "id": "deal-002",
      "suburb": "Bondi",
      "propertyValue": 3800000,
      "loanAmount": 780000,
      "ltv": 20.53,
      "interestRate": 5.2,
      "maturity": "2029-05-22T00:00:00Z",
      "status": "active"
    }
  ],
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0",
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 25,
      "pages": 2
    }
  }
}
```

### Get Deal Details

```
GET /api/deals/{dealId}
```

Returns detailed information about a specific deal, including property details, loan terms, and performance metrics.

**Response Format:**
```json
{
  "status": "success",
  "data": {
    "id": "deal-001",
    "suburb": "Mosman",
    "propertyValue": 4200000,
    "loanAmount": 850000,
    "ltv": 20.24,
    "location": {
      "latitude": -33.8279,
      "longitude": 151.2412,
      "address": "42 Mosman Street, Mosman"
    },
    "loanTerms": {
      "startDate": "2024-03-15T00:00:00Z",
      "endDate": "2030-03-15T00:00:00Z",
      "interestRate": 5.5,
      "paymentFrequency": "monthly",
      "balloonPayment": 850000
    },
    "propertyDetails": {
      "type": "House",
      "bedrooms": 4,
      "bathrooms": 3,
      "landSize": 650,
      "yearBuilt": 1998,
      "condition": "Excellent"
    },
    "borrowerDetails": {
      "name": "James & Sarah Wilson",
      "income": 450000,
      "occupation": "Business Owners",
      "creditScore": 820
    },
    "performanceMetrics": {
      "irr": 18.4,
      "roi": 22.1,
      "cashYield": 8.5,
      "totalReturn": 156000
    },
    "riskMetrics": {
      "defaultProbability": 0.5,
      "lossGivenDefault": 12.8,
      "expectedLoss": 0.064,
      "stressTestImpact": -4.2
    }
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

### Get Deal Performance

```
GET /api/deals/{dealId}/performance
```

Returns performance data for a specific deal, including historical returns and projections.

**Response Format:**
```json
{
  "status": "success",
  "data": {
    "historicalReturns": [
      {
        "date": "2024-04-15T00:00:00Z",
        "irr": 18.4,
        "roi": 22.1,
        "cashYield": 8.5
      },
      {
        "date": "2024-05-15T00:00:00Z",
        "irr": 18.6,
        "roi": 22.3,
        "cashYield": 8.6
      }
    ],
    "projectedReturns": [
      {
        "date": "2025-03-15T00:00:00Z",
        "irr": 19.1,
        "roi": 23.0,
        "cashYield": 8.8,
        "confidence": 0.92
      },
      {
        "date": "2026-03-15T00:00:00Z",
        "irr": 19.8,
        "roi": 23.8,
        "cashYield": 9.0,
        "confidence": 0.85
      }
    ],
    "yearlyProjections": [
      {
        "year": 1,
        "totalReturn": 156000,
        "irr": 18.4
      },
      {
        "year": 2,
        "totalReturn": 325000,
        "irr": 19.1
      },
      {
        "year": 3,
        "totalReturn": 508000,
        "irr": 19.8
      },
      {
        "year": 4,
        "totalReturn": 706000,
        "irr": 20.2
      },
      {
        "year": 5,
        "totalReturn": 920000,
        "irr": 20.5
      }
    ]
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

## Simulation APIs

### Run Scenario Simulation

```
POST /api/simulations/scenario
```

Runs a simulation with custom scenario parameters, returning the results of the simulation.

**Request Format:**
```json
{
  "name": "Interest Rate Increase Scenario",
  "description": "Simulates the impact of a 2% increase in interest rates",
  "parameters": {
    "interestRateChange": 2.0,
    "propertyValueChange": -5.0,
    "defaultRateChange": 1.5,
    "simulationHorizon": 5,
    "confidenceLevel": 0.95
  }
}
```

**Response Format:**
```json
{
  "status": "success",
  "data": {
    "id": "sim-001",
    "name": "Interest Rate Increase Scenario",
    "description": "Simulates the impact of a 2% increase in interest rates",
    "parameters": {
      "interestRateChange": 2.0,
      "propertyValueChange": -5.0,
      "defaultRateChange": 1.5,
      "simulationHorizon": 5,
      "confidenceLevel": 0.95
    },
    "results": {
      "portfolioImpact": {
        "irrChange": -2.3,
        "roiChange": -3.1,
        "cashYieldChange": 1.8,
        "totalReturnChange": -520000
      },
      "riskImpact": {
        "defaultRateChange": 1.5,
        "expectedLossChange": 0.23,
        "stressTestImpactChange": -2.8
      },
      "suburbImpacts": [
        {
          "suburb": "Mosman",
          "irrChange": -2.1,
          "propertyValueChange": -4.5
        },
        {
          "suburb": "Bondi",
          "irrChange": -2.4,
          "propertyValueChange": -5.2
        }
      ],
      "recommendedActions": [
        {
          "action": "Reduce exposure to high-LTV loans",
          "impact": "Mitigate default risk increase",
          "priority": "High"
        },
        {
          "action": "Increase allocation to green-zone suburbs",
          "impact": "Minimize property value decline",
          "priority": "Medium"
        }
      ]
    }
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

### Run Portfolio Optimization

```
POST /api/simulations/optimization
```

Optimizes portfolio allocation based on constraints and objectives, returning the recommended allocation.

**Request Format:**
```json
{
  "name": "Maximum Return Optimization",
  "description": "Optimizes portfolio for maximum return with moderate risk",
  "constraints": {
    "maxRisk": 0.5,
    "maxSuburbExposure": 25,
    "maxPropertyTypeExposure": 50,
    "minGreenZoneAllocation": 80,
    "maxRedZoneAllocation": 0
  },
  "objectives": {
    "maximizeReturn": 0.7,
    "minimizeRisk": 0.3
  }
}
```

**Response Format:**
```json
{
  "status": "success",
  "data": {
    "id": "opt-001",
    "name": "Maximum Return Optimization",
    "description": "Optimizes portfolio for maximum return with moderate risk",
    "constraints": {
      "maxRisk": 0.5,
      "maxSuburbExposure": 25,
      "maxPropertyTypeExposure": 50,
      "minGreenZoneAllocation": 80,
      "maxRedZoneAllocation": 0
    },
    "objectives": {
      "maximizeReturn": 0.7,
      "minimizeRisk": 0.3
    },
    "results": {
      "optimizedAllocation": {
        "bySuburb": [
          {
            "suburb": "Mosman",
            "allocation": 22,
            "zone": "green"
          },
          {
            "suburb": "Bondi",
            "allocation": 18,
            "zone": "green"
          },
          {
            "suburb": "Manly",
            "allocation": 15,
            "zone": "green"
          },
          {
            "suburb": "Neutral Bay",
            "allocation": 12,
            "zone": "green"
          },
          {
            "suburb": "Coogee",
            "allocation": 10,
            "zone": "green"
          },
          {
            "suburb": "Randwick",
            "allocation": 8,
            "zone": "green"
          },
          {
            "suburb": "Leichhardt",
            "allocation": 8,
            "zone": "yellow"
          },
          {
            "suburb": "Strathfield",
            "allocation": 7,
            "zone": "yellow"
          }
        ],
        "byPropertyType": [
          {
            "type": "House",
            "allocation": 45
          },
          {
            "type": "Apartment",
            "allocation": 35
          },
          {
            "type": "Townhouse",
            "allocation": 20
          }
        ],
        "byZone": [
          {
            "zone": "green",
            "allocation": 85
          },
          {
            "zone": "yellow",
            "allocation": 15
          },
          {
            "zone": "red",
            "allocation": 0
          }
        ]
      },
      "projectedPerformance": {
        "irr": 19.2,
        "roi": 23.1,
        "cashYield": 8.9,
        "risk": 0.42,
        "sharpeRatio": 2.1
      },
      "implementationPlan": [
        {
          "action": "Increase allocation to Mosman by 2%",
          "currentAllocation": 20,
          "targetAllocation": 22,
          "priority": "High"
        },
        {
          "action": "Decrease allocation to Leichhardt by 2%",
          "currentAllocation": 10,
          "targetAllocation": 8,
          "priority": "Medium"
        }
      ]
    }
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

## Integration APIs

### Get Traffic Light Integration

```
GET /api/integration/traffic-light
```

Returns integration data specifically for the Traffic Light System, including portfolio allocation by zone and suburb performance.

**Response Format:**
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

### Get Underwriting Integration

```
GET /api/integration/underwriting
```

Returns integration data specifically for the Underwriting System, including deal recommendations and portfolio constraints.

**Response Format:**
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
  "status": "error",
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Deal not found: deal-999",
    "details": {
      "dealId": "deal-999"
    }
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

## Stress Testing APIs

### Get Available Stress Test Scenarios

```
GET /api/stress-test/scenarios
```

Returns a list of available stress test scenarios.

**Response Format:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "interest-rate-shock",
      "name": "Interest Rate Shock",
      "description": "Simulates a sudden 200 basis point increase in interest rates",
      "severity": "Medium"
    },
    {
      "id": "property-crash",
      "name": "Property Market Crash",
      "description": "Simulates a severe downturn in the property market with 25% value reduction",
      "severity": "High"
    },
    {
      "id": "recession",
      "name": "Economic Recession",
      "description": "Simulates an economic recession with increased vacancy and reduced rents",
      "severity": "Medium"
    }
  ],
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

### Run Stress Test

```
POST /api/stress-test
```

Runs a stress test with the specified scenario.

**Request Format:**
```json
{
  "scenario": "interest-rate-shock"
}
```

**Response Format:**
```json
{
  "status": "success",
  "data": {
    "id": "st-001",
    "scenario": "Interest Rate Shock",
    "description": "Simulates a sudden 200 basis point increase in interest rates",
    "impactSummary": {
      "totalValue": 22275000,
      "percentageChange": -10,
      "riskScore": 65
    },
    "metricImpacts": [
      { "metric": "IRR", "baseValue": 14.2, "stressedValue": 11.8, "percentageChange": -16.9 },
      { "metric": "Cash Flow", "baseValue": 1450000, "stressedValue": 1050000, "percentageChange": -27.6 },
      { "metric": "DSCR", "baseValue": 1.35, "stressedValue": 1.15, "percentageChange": -14.8 },
      { "metric": "LTV", "baseValue": 65.3, "stressedValue": 72.5, "percentageChange": 11.0 }
    ],
    "suburbImpacts": [
      { "suburb": "Parramatta", "baseValue": 3500000, "stressedValue": 3080000, "percentageChange": -12.0 },
      { "suburb": "Liverpool", "baseValue": 2800000, "stressedValue": 2520000, "percentageChange": -10.0 },
      { "suburb": "Blacktown", "baseValue": 2200000, "stressedValue": 1980000, "percentageChange": -10.0 },
      { "suburb": "Penrith", "baseValue": 1800000, "stressedValue": 1620000, "percentageChange": -10.0 },
      { "suburb": "Campbelltown", "baseValue": 1500000, "stressedValue": 1320000, "percentageChange": -12.0 }
    ],
    "recommendations": [
      "Increase fixed-rate loan allocation to hedge against further rate increases",
      "Focus on properties with stronger cash flow to maintain DSCR",
      "Consider reducing leverage in high-risk suburbs",
      "Implement interest rate caps on variable rate loans"
    ]
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

## Analytics APIs

### Get Portfolio Analytics

```
GET /api/analytics
```

Returns advanced analytics for the portfolio.

**Query Parameters:**
- `timeframe`: Timeframe for analytics (e.g., `1m`, `3m`, `6m`, `1y`, `3y`, `5y`, `all`)

**Response Format:**
```json
{
  "status": "success",
  "data": {
    "timeframe": "1y",
    "performanceSummary": {
      "startValue": 22500000,
      "endValue": 24750000,
      "percentageChange": 10,
      "annualizedReturn": 10
    },
    "benchmarkComparison": [
      {
        "benchmark": "ASX 200 A-REIT",
        "portfolioReturn": 10,
        "benchmarkReturn": 7.5,
        "alpha": 2.5,
        "beta": 0.85
      },
      {
        "benchmark": "CoreLogic Residential Property Index",
        "portfolioReturn": 10,
        "benchmarkReturn": 8.2,
        "alpha": 1.8,
        "beta": 0.9
      },
      {
        "benchmark": "RBA Cash Rate + 5%",
        "portfolioReturn": 10,
        "benchmarkReturn": 6.1,
        "alpha": 3.9,
        "beta": 0.3
      }
    ],
    "attributionAnalysis": [
      { "factor": "Suburb Selection", "contribution": 3.8, "percentage": 38 },
      { "factor": "Property Type", "contribution": 2.2, "percentage": 22 },
      { "factor": "Leverage", "contribution": 2.5, "percentage": 25 },
      { "factor": "Asset Management", "contribution": 1.5, "percentage": 15 }
    ],
    "trendAnalysis": [
      {
        "metric": "Total Value",
        "data": [
          { "period": "Jan", "value": 22500000 },
          { "period": "Feb", "value": 22750000 },
          { "period": "Mar", "value": 23000000 },
          { "period": "Apr", "value": 23250000 },
          { "period": "May", "value": 23500000 },
          { "period": "Jun", "value": 23750000 },
          { "period": "Jul", "value": 24000000 },
          { "period": "Aug", "value": 24250000 },
          { "period": "Sep", "value": 24500000 },
          { "period": "Oct", "value": 24750000 },
          { "period": "Nov", "value": 24750000 },
          { "period": "Dec", "value": 24750000 }
        ]
      },
      {
        "metric": "Cash Flow",
        "data": [
          { "period": "Jan", "value": 112500 },
          { "period": "Feb", "value": 113750 },
          { "period": "Mar", "value": 115000 },
          { "period": "Apr", "value": 116250 },
          { "period": "May", "value": 117500 },
          { "period": "Jun", "value": 118750 },
          { "period": "Jul", "value": 120000 },
          { "period": "Aug", "value": 121250 },
          { "period": "Sep", "value": 122500 },
          { "period": "Oct", "value": 123750 },
          { "period": "Nov", "value": 123750 },
          { "period": "Dec", "value": 123750 }
        ]
      }
    ],
    "correlationMatrix": {
      "Property Value": {
        "Property Value": 1.0,
        "Interest Rates": -0.65,
        "Unemployment": -0.72,
        "GDP Growth": 0.81,
        "Inflation": 0.45
      },
      "Interest Rates": {
        "Property Value": -0.65,
        "Interest Rates": 1.0,
        "Unemployment": 0.58,
        "GDP Growth": -0.62,
        "Inflation": 0.75
      },
      "Unemployment": {
        "Property Value": -0.72,
        "Interest Rates": 0.58,
        "Unemployment": 1.0,
        "GDP Growth": -0.85,
        "Inflation": -0.32
      },
      "GDP Growth": {
        "Property Value": 0.81,
        "Interest Rates": -0.62,
        "Unemployment": -0.85,
        "GDP Growth": 1.0,
        "Inflation": 0.38
      },
      "Inflation": {
        "Property Value": 0.45,
        "Interest Rates": 0.75,
        "Unemployment": -0.32,
        "GDP Growth": 0.38,
        "Inflation": 1.0
      }
    }
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

## Export APIs

### Export Portfolio Data

```
GET /api/export
```

Exports portfolio data in the specified format.

**Query Parameters:**
- `format`: Export format (e.g., `pdf`, `xlsx`, `csv`)

**Response Format:**
```json
{
  "status": "success",
  "data": {
    "url": "https://api.equihome.com/v1/portfolio/exports/portfolio-export-20230610.pdf",
    "expiresAt": "2023-06-17T14:30:00Z"
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

## Mock Data Implementation

During development, the API endpoints return mock data to simulate the functionality of the system. This allows frontend development to proceed independently of backend implementation, while ensuring a smooth transition to production.

The mock data is structured to match the expected API responses, with realistic values and relationships between different data points. The system includes fallback mechanisms to use mock data when API calls fail, ensuring that the frontend components can be tested and demonstrated without a fully implemented backend.

Once the backend services are implemented, the mock data will be replaced with real data from the database and external systems. The API contracts will remain the same, allowing for a seamless transition from development to production.
