# Traffic Light System (TFS) - Backend & ML Requirements

This document outlines the data requirements and API specifications for the Traffic Light System's backend and machine learning components.

## System Overview

The Traffic Light System is a sophisticated market analysis and opportunity identification platform that uses machine learning to:

1. Classify suburbs into green, orange, and red zones based on investment potential
2. Forecast suburb transitions and growth corridors
3. Analyze risk factors and their correlations
4. Provide decision support for property investment

## Data Requirements

### Core Data Sources

The system requires the following data sources to be integrated:

- **Property Data**: Historical and current property prices, sales volumes, time on market
- **Demographic Data**: Population growth, income levels, employment statistics
- **Infrastructure Data**: Current and planned infrastructure projects, transport accessibility
- **Market Indicators**: Rental yields, vacancy rates, auction clearance rates
- **Economic Indicators**: Interest rates, inflation, employment rates, GDP growth
- **Geographic Data**: Suburb boundaries, coordinates, proximity to amenities
- **News and Sentiment**: Property market news, sentiment analysis

## API Requirements

The backend should provide the following API endpoints:

### 1. Suburb Classification API

```
GET /api/suburbs/classification
```

Returns the classification of all suburbs into green, orange, and red zones with:
- Classification confidence scores
- Key factors influencing classification
- Historical classification changes

### 2. Suburb Analysis API

```
GET /api/suburbs/analysis/{suburbName}
```

Returns detailed analysis for a specific suburb:
- Growth metrics (historical and forecast)
- Risk assessment
- Infrastructure score
- Development status
- Transport and schools scores
- Market metrics (median price, price growth, rental yield)
- Historical growth data (5 years)
- Forecast growth data (4 years)

### 3. Risk Correlation API

```
GET /api/risk/correlation
```

Returns the correlation matrix between different risk factors:
- Market volatility
- Interest rate sensitivity
- Supply/demand imbalance
- Infrastructure dependency
- Economic exposure
- Demographic stability
- Regulatory risk

### 4. ML Decision Factors API

```
GET /api/ml/decisions/{suburbName}
```

Returns the ML decision factors for a specific suburb:
- Short-term prediction with confidence and factors
- Medium-term prediction with confidence and factors
- Long-term prediction with confidence and factors
- Decision weights for each factor

### 5. Comparable Suburbs API

```
GET /api/suburbs/comparable/{suburbName}
```

Returns suburbs comparable to the specified suburb:
- Similarity scores
- Key similarities and differences
- Comparative metrics
- Investment potential comparison

### 6. Market Cycle API

```
GET /api/market/cycle/{suburbName}
```

Returns the market cycle position for a specific suburb:
- Current cycle position
- Historical cycle data
- Forecast cycle movement
- Cycle comparison with broader market

### 7. Growth Corridor API

```
GET /api/growth/corridors
```

Returns information about growth corridors:
- Corridor definitions (geographic boundaries)
- Transition probabilities
- Key suburbs in each corridor
- Driving factors for growth
- Risk factors
- Timeline expectations

### 8. ML System Status API

```
GET /api/ml/system/status
```

Returns the status of the ML system:
- Last update timestamp
- Next scheduled update
- Data points processed
- Model metrics (accuracy, confidence, validation score)
- System health (status, uptime, latency)
- Integration statuses

### 9. Underwriting Integration API

```
GET /api/underwriting/integration
```

Returns the integration status with underwriting:
- Overall status
- Assessment statistics
- Processing metrics
- Confidence metrics by category
- Zone impact analysis
- Recent deals processed
- Risk factor impact

## ML System Requirements

The machine learning system needs to provide:

### 1. Classification Models

- Suburb classification into green/orange/red zones
- Confidence scores for classifications
- Feature importance for classifications

### 2. Forecasting Models

- Price growth forecasts (short, medium, long term)
- Suburb transition probability forecasts
- Confidence intervals for all forecasts

### 3. Risk Analysis Models

- Risk factor correlation analysis
- Risk exposure assessment
- Risk sensitivity analysis

### 4. Decision Support Models

- Investment recommendation engine
- Decision factor weighting
- Confidence scoring for recommendations

### 5. Clustering Models

- Suburb clustering and segmentation
- Comparable suburb identification
- Growth corridor identification

## Data Update Frequency

- Property data: Daily updates
- Market indicators: Daily updates
- Economic indicators: Weekly updates
- Infrastructure data: Monthly updates
- Demographic data: Quarterly updates
- ML model retraining: Weekly
- Classification updates: Daily

## Integration Architecture

The ML system should be designed as a pipeline with:

1. **Data Ingestion Layer**: Collects and normalizes data from various sources
2. **Processing Layer**: Cleans, transforms, and prepares data for ML models
3. **Model Layer**: Runs various ML models on the processed data
4. **Output Layer**: Formats model outputs for API consumption
5. **Feedback Loop**: Captures actual outcomes to improve model accuracy

## Performance Requirements

- API response times: < 200ms for most endpoints
- ML processing: Daily batch processing for all suburbs
- Real-time scoring: < 500ms for individual suburb analysis
- System uptime: 99.9%
- Data freshness: All data no more than 24 hours old

## Future Enhancements

- Predictive modeling for specific property types
- Investor portfolio optimization
- Scenario analysis for economic changes
- Integration with property-specific data
- Custom risk profile matching
