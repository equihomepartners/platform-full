# Traffic Light System Data Flow

This document describes the data flow within the Traffic Light System and its integration with other systems.

## Overview

The Traffic Light System processes data from various sources to provide insights for property investment decisions. The data flows through several stages:

1. **Data Collection**: Data is collected from various sources
2. **Data Processing**: Data is processed, normalized, and stored
3. **ML Processing**: ML models analyze the data
4. **API Exposure**: Results are exposed through API endpoints
5. **Frontend Display**: Frontend components display the results
6. **Integration**: Other systems consume the API endpoints

## Data Sources

The Traffic Light System integrates with the following data sources:

### Government Data Sources

- **RBA Housing Market Data**: Interest rates, housing credit, and market indicators
- **ABS Census Demographics**: Population and demographic information
- **ABS Property Price Index**: Quarterly property price changes across regions
- **NSW Government Infrastructure Plans**: Current and planned infrastructure projects
- **NSW Land Registry Services**: Property ownership and sales data

### Internal Data Sources

- **Portfolio Management System**: Feedback on suburb performance
- **Underwriting System**: Feedback on loan evaluations

## Data Processing Pipeline

The data processing pipeline consists of the following stages:

### 1. Data Collection

Data is collected from various sources through APIs, web scraping, and file imports. The data collection process is scheduled to run at regular intervals to ensure the data is up-to-date.

### 2. Data Preprocessing

The collected data is preprocessed to ensure it is clean, consistent, and ready for analysis. This includes:

- **Data Cleaning**: Removing duplicates, handling missing values, and correcting errors
- **Data Normalization**: Converting data to a consistent format
- **Feature Engineering**: Creating derived features for ML models

### 3. ML Processing

The preprocessed data is fed into ML models for analysis. The ML models perform the following tasks:

- **Suburb Classification**: Classifying suburbs into green, yellow, and red zones
- **Property Value Forecasting**: Predicting future property values
- **Market Cycle Analysis**: Analyzing market cycle positions
- **Risk Assessment**: Evaluating investment risks

### 4. Results Storage

The results of the ML processing are stored in the database for later retrieval. This includes:

- **Suburb Classifications**: Zone classifications for each suburb
- **Property Value Forecasts**: Forecasted property values
- **Market Cycle Positions**: Current and forecasted market cycle positions
- **Risk Assessments**: Risk scores and factors

### 5. API Exposure

The results are exposed through API endpoints for consumption by frontend components and other systems. The API endpoints provide access to:

- **Suburb Classifications**: Zone classifications for each suburb
- **Suburb Analysis**: Detailed analysis for specific suburbs
- **ML Model Information**: Information about the ML models
- **Risk Correlation**: Correlation matrix of risk factors

### 6. Frontend Display

The frontend components consume the API endpoints to display the results to users. The frontend components include:

- **ML-Enhanced Map**: Interactive map showing suburb classifications
- **Suburb Forecasting**: Predictive analytics for suburb transitions
- **Settings**: Configuration for ML model, data sources, and system preferences

### 7. Integration

Other systems consume the API endpoints for integration. The integration includes:

- **Portfolio Management System**: Consumes suburb classifications and risk assessments
- **Underwriting System**: Consumes green-zone suburbs for loan origination

## Data Flow Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Data Sources   │────▶│ Data Processing │────▶│  ML Processing  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Integration   │◀────│  API Exposure   │◀────│ Results Storage │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │
         │                      ▼
         │             ┌─────────────────┐
         └───────────▶│ Frontend Display │
                      └─────────────────┘
```

## Data Models

The Traffic Light System uses the following data models:

### Suburb Classification

```typescript
interface SuburbClassification {
  suburb: string;
  zone: 'green' | 'yellow' | 'red';
  score: number;
  confidence: number;
  key_factors: string[];
  historical_changes: {
    date: string;
    previous_zone: 'green' | 'yellow' | 'red';
    new_zone: 'green' | 'yellow' | 'red';
  }[];
  loan_metrics: {
    average_ltv: number;
    foreclosure_rate: number;
  };
}
```

### Suburb Analysis

```typescript
interface SuburbAnalysis {
  suburb: string;
  property_value_metrics: {
    historical_growth: {
      date: string;
      value: number;
    }[];
    forecast_growth: {
      date: string;
      value: number;
      confidence: number;
    }[];
    stability: number;
  };
  loan_risk_assessment: {
    average_ltv: number;
    foreclosure_rate: number;
    homeowner_default_trends: {
      date: string;
      rate: number;
    }[];
    risk_score: number;
  };
  infrastructure_score: number;
  development_status: 'High' | 'Medium' | 'Low';
  transport_score: number;
  schools_score: number;
  market_metrics: {
    median_price: number;
    price_growth: number;
    vacancy_rate: number;
  };
}
```

### ML Model Information

```typescript
interface MLModelInfo {
  version: string;
  release_date: string;
  next_update: string;
  features: string[];
  data_sources: string[];
  metrics: {
    accuracy: number;
    confidence: number;
    data_points: number;
    validation_score: number;
  };
  training_info: {
    last_training: string;
    training_duration: number;
    iterations: number;
    convergence_rate: number;
  };
}
```

## Integration Data Flow

The Traffic Light System integrates with other systems through the following data flows:

### Integration with Portfolio Management System

1. **Traffic Light System to Portfolio Management System**:
   - Suburb classifications (green, yellow, red zones)
   - Risk assessments
   - Property value forecasts
   - Market cycle positions

2. **Portfolio Management System to Traffic Light System**:
   - Feedback on suburb performance
   - Portfolio diversification recommendations
   - Risk exposure alerts

### Integration with Underwriting System

1. **Traffic Light System to Underwriting System**:
   - Green-zone suburbs for loan origination
   - Risk assessments for specific suburbs
   - Property value forecasts
   - Market cycle positions

2. **Underwriting System to Traffic Light System**:
   - Feedback on loan evaluations
   - Approval rate statistics
   - Default rate statistics
