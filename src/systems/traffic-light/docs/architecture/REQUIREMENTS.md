# Traffic Light System (TFS) - Backend & ML Requirements

This document outlines the data requirements and API specifications for the Traffic Light System's backend and machine learning components.

## Data Requirements

### Core Data Sources

The system requires the following data sources to be integrated:

- **Property Data**: Historical and current property prices, sales volumes, time on market
- **Demographic Data**: Population growth, income levels, employment rates
- **Infrastructure Data**: Current and planned infrastructure projects
- **Market Indicators**: Interest rates, lending volumes, market sentiment
- **Geographic Data**: Suburb boundaries, proximity to amenities, natural features

### Data Processing Requirements

The backend system must:

1. **Collect and Normalize Data**: Standardize data from different sources
2. **Handle Missing Data**: Implement strategies for dealing with incomplete data
3. **Perform Feature Engineering**: Create derived features for ML models
4. **Maintain Historical Records**: Store historical data for trend analysis
5. **Update in Real-Time**: Refresh data as new information becomes available

## Machine Learning Requirements

### ML Model Architecture

The ML system requires:

1. **Classification Models**: For suburb zoning (green, yellow, red)
2. **Forecasting Models**: For predicting suburb transitions
3. **Risk Assessment Models**: For evaluating investment risks
4. **Correlation Analysis**: For identifying relationships between risk factors

### ML Model Features

The ML models should incorporate:

- **Property Value Metrics**: Historical growth, volatility, forecast growth
- **Market Cycle Position**: Current position in the property market cycle
- **Risk Factors**: Vacancy rates, time on market, price reductions
- **Demographic Trends**: Population growth, income changes, employment shifts
- **Infrastructure Impact**: Proximity to new infrastructure, development status

### ML Model Training

The ML system requires:

1. **Regular Retraining**: Weekly updates with new data
2. **Performance Monitoring**: Tracking of accuracy, precision, recall
3. **Version Control**: Management of model versions and deployments
4. **A/B Testing**: Comparison of different model configurations
5. **Feedback Integration**: Incorporation of feedback from other systems

## API Requirements

### API Endpoints

The following API endpoints are expected to be implemented by the backend:

```
GET /api/suburbs/classification
GET /api/suburbs/analysis/{suburbName}
GET /api/suburbs/comparable/{suburbName}
GET /api/market/cycle/{suburbName}
GET /api/risk/correlation
GET /api/ml/decisions/{suburbName}
GET /api/ml/system/status
GET /api/ml/model-info
GET /api/growth/corridors
GET /api/integration/underwriting
GET /api/integration/portfolio
POST /api/webhooks/portfolio-feedback
POST /api/webhooks/underwriting-feedback
```

### System Integration

For detailed information about how the Traffic Light System integrates with the Portfolio Management System and Underwriting System, see the [API Integration Documentation](../api/INTEGRATION.md).

## ML System Architecture

The Traffic Light System uses a machine learning system to analyze property market data and provide risk assessments for suburbs across Sydney. The current implementation is version 1.0, released on April 10, 2025.

### ML Model Features

- **Suburb Risk Classification**: Algorithm to classify suburbs into green, yellow, and red zones based on risk factors
- **Property Value Forecasting**: Predictive models for future property values in each suburb
- **Market Cycle Position Detection**: Analysis of where each suburb sits in the property market cycle
- **Infrastructure Impact Assessment**: Evaluation of how infrastructure projects affect property values
- **Comparable Suburb Identification**: Finding similar suburbs for comparison and analysis

### Data Sources

The ML system integrates with the following free government data sources:

- **RBA Housing Market Data**: Interest rates, housing credit, and market indicators
- **ABS Census Demographics**: Population and demographic information
- **ABS Property Price Index**: Quarterly property price changes across regions
- **NSW Government Infrastructure Plans**: Current and planned infrastructure projects
- **NSW Land Registry Services**: Property ownership and sales data

### Update Schedule

The ML model is updated weekly with fresh data from all sources. Each update includes:

- New property listings and sales data
- Updated market trends and indicators
- Refined risk assessments based on new data
- Improved accuracy metrics

The system currently processes approximately 250,000 data points with an accuracy of 85.7%.
