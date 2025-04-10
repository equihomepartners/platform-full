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


UPDATED - USE THIS INSTEAD:
Traffic Light System (TFS) - Backend & ML Requirements
This document outlines the data requirements and API specifications for the Traffic Light System's backend, machine learning, and LLM components.

System Overview
The Traffic Light System is a sophisticated market analysis and opportunity identification platform that uses a two-layer AI architecture to:

Classify suburbs into green, yellow, and red zones based on their suitability for no-monthly-payment loans, focusing on asset (property) security.
Forecast suburb transitions, property value stability, and loan risk factors.
Analyze risk factors and their correlations, with an emphasis on loan security and homeowner default risk.
Provide decision support for loan origination by identifying suburbs that align with Equihome’s business model.
The system consists of:

Machine Learning (ML) Prediction Engine: Analyzes historical and real-time data to identify suburbs with potential for loan origination.
OpenAI LLM Decision Layer: Refines ML outputs by applying Equihome’s business model criteria (e.g., high equity, low crime, high demand) and provides explainability for zoning decisions.
Data Requirements
Core Data Sources
The system requires the following data sources to be integrated:

Property Data: Historical and current property prices, sales volumes, foreclosure rates, average loan-to-value (LTV) ratios.
Demographic Data: Population growth, income levels, employment statistics, homeowner default trends.
Infrastructure Data: Current and planned infrastructure projects, transport accessibility.
Market Indicators: Vacancy rates, auction clearance rates, property value growth rates.
Economic Indicators: Interest rates, inflation, employment rates, GDP growth.
Geographic Data: Suburb boundaries, coordinates, proximity to amenities.
News and Sentiment: Property market news, sentiment analysis, lending market trends.
Regulatory Data: Lending regulations (e.g., APRA LTV caps, ASIC responsible lending guidelines), foreclosure laws.
Loan Performance Data: Historical loan performance in each suburb (e.g., default rates, repayment rates), sourced from Equihome’s portfolio and industry benchmarks.
API Requirements
The backend should provide the following API endpoints:

1. Suburb Classification API
text

Collapse

Wrap

Copy
GET /api/suburbs/classification
Returns the classification of all suburbs into green, yellow, and red zones with:

Classification confidence scores (from ML model).
Key factors influencing classification (from LLM rationale).
Historical classification changes (last 6 months).
Loan-specific metrics (e.g., average LTV, foreclosure rate).
2. Suburb Analysis API
text

Collapse

Wrap

Copy
GET /api/suburbs/analysis/{suburbName}
Returns detailed analysis for a specific suburb:

Property value metrics (historical and forecast growth, stability).
Loan risk assessment (e.g., average LTV, foreclosure rate, homeowner default trends).
Infrastructure score.
Development status.
Transport and schools scores.
Market metrics (median price, price growth, vacancy rate).
Historical property value data (5 years).
Forecast property value data (4 years, with confidence intervals).
Loan performance metrics (e.g., default rates, repayment trends).
3. Risk Correlation API
text

Collapse

Wrap

Copy
GET /api/risk/correlation
Returns the correlation matrix between different risk factors:

Property value volatility.
Interest rate sensitivity.
Supply/demand imbalance.
Infrastructure dependency.
Economic exposure.
Demographic stability.
Regulatory risk (e.g., changes in lending laws).
Homeowner default risk.
Negative equity risk (if property values decline).
4. ML and LLM Decision Factors API
text

Collapse

Wrap

Copy
GET /api/ml/decisions/{suburbName}
Returns the ML and LLM decision factors for a specific suburb:

Short-term property value prediction with confidence and factors (ML).
Medium-term property value prediction with confidence and factors (ML).
Long-term property value prediction with confidence and factors (ML).
LLM rationale for zoning (e.g., “Bondi zoned green due to high median price ($2.8M), low crime (300 incidents/100,000), and stable LTV (65%)”).
Decision weights for each factor (e.g., high equity: 20%, low crime: 10%).
5. Comparable Suburbs API
text

Collapse

Wrap

Copy
GET /api/suburbs/comparable/{suburbName}
Returns suburbs comparable to the specified suburb:

Similarity scores (based on property value trends, loan risk, demographics).
Key similarities and differences (e.g., similar median price but higher default risk).
Comparative metrics (e.g., LTV, foreclosure rate, growth rate).
Loan suitability comparison (e.g., “Mosman has lower default risk than Bondi”).
6. Market Cycle API
text

Collapse

Wrap

Copy
GET /api/market/cycle/{suburbName}
Returns the market cycle position for a specific suburb:

Current cycle position (e.g., peak, trough).
Historical cycle data (5 years).
Forecast cycle movement (4 years, with confidence intervals).
Cycle comparison with broader market.
Impact on loan security (e.g., “Peak cycle increases negative equity risk if values decline”).
7. Growth Corridor API
text

Collapse

Wrap

Copy
GET /api/growth/corridors
Returns information about growth corridors:

Corridor definitions (geographic boundaries).
Transition probabilities (e.g., likelihood of a suburb becoming a green zone).
Key suburbs in each corridor.
Driving factors for growth (e.g., infrastructure projects, population growth).
Risk factors (e.g., potential oversupply, regulatory changes).
Timeline expectations (e.g., “Parramatta corridor expected to mature by 2027”).
8. ML and LLM System Status API
text

Collapse

Wrap

Copy
GET /api/ml/system/status
Returns the status of the ML and LLM systems:

Last update timestamp.
Next scheduled update.
Data points processed.
ML model metrics (accuracy, confidence, validation score).
LLM performance metrics (e.g., rationale coherence, alignment with business model).
System health (status, uptime, latency).
Integration statuses (e.g., with CoreLogic API, OpenAI API).
9. Underwriting Integration API
text

Collapse

Wrap

Copy
GET /api/underwriting/integration
Returns the integration status with the Underwrite System:

Overall status.
Assessment statistics (e.g., number of suburbs analyzed, loans evaluated).
Processing metrics (e.g., average time to zone a suburb).
Confidence metrics by category (e.g., green zone confidence: 95%).
Zone impact analysis (e.g., “Green zones have 1% default rate vs. 3% in yellow zones”).
Recent loan applications processed (e.g., “Mosman loan application scored 88”).
Risk factor impact (e.g., “High LTV in Hurstville increased rejection rate by 10%”).
10. Portfolio Simulation Integration API (New)
text

Collapse

Wrap

Copy
GET /api/portfolio/simulation/integration
Returns data to support the PMS’s simulation engine:

Suburb-level risk correlations (e.g., property value vs. default rate).
Forecast confidence intervals (e.g., Bondi growth: 5% ± 1%).
Loan-specific metrics (e.g., average LTV, default rates, foreclosure rates).
Historical loan performance trends (e.g., “Mosman loans have 0.5% default rate over 2 years”).
Simulation-ready data format (e.g., time-series data for Monte Carlo simulations).
ML and LLM System Requirements
The machine learning and LLM systems need to provide:

1. Classification Models (ML)
Suburb classification into green/yellow/red zones based on loan suitability.
Confidence scores for classifications.
Feature importance for classifications (e.g., “median price contributed 30% to Bondi’s green zoning”).
2. Forecasting Models (ML)
Property value growth forecasts (short, medium, long term).
Suburb transition probability forecasts (e.g., likelihood of yellow to green).
Homeowner default rate forecasts (e.g., “Bondi default rate: 1% in 2 years”).
Confidence intervals for all forecasts.
3. Risk Analysis Models (ML)
Risk factor correlation analysis (e.g., property value decline vs. default rate).
Loan risk exposure assessment (e.g., negative equity risk if values drop 10%).
Risk sensitivity analysis (e.g., impact of 1% interest rate increase on default rates).
4. Decision Support Models (ML and LLM)
Loan suitability recommendation engine (ML).
Decision factor weighting (ML).
Confidence scoring for recommendations (ML).
LLM-driven rationale generation (e.g., “Bondi zoned green due to high equity and low LTV”).
LLM alignment with business model (e.g., applies criteria like high equity, low crime).
5. Clustering Models (ML)
Suburb clustering and segmentation (e.g., based on loan risk, property value trends).
Comparable suburb identification.
Growth corridor identification.
6. Context Management (LLM)
Use of Model Context Protocol (MCP) to maintain and share LLM context across systems.
Context includes: Equihome’s business model criteria, recent market trends, previous zoning decisions.
Example: MCP ensures the LLM “remembers” why Bondi was zoned green when the Underwrite System queries it.
Data Update Frequency
Property data: Daily updates.
Market indicators: Daily updates.
Economic indicators: Weekly updates.
Infrastructure data: Monthly updates.
Demographic data: Quarterly updates.
Loan performance data: Daily updates (from Equihome’s portfolio).
ML model retraining: Weekly.
LLM fine-tuning: Monthly (using feedback from PMS and Underwrite System).
Classification updates: Daily.
Integration Architecture
The ML and LLM systems should be designed as a pipeline with:

Data Ingestion Layer: Collects and normalizes data from various sources (e.g., CoreLogic, ABS, NSW Government).
Processing Layer: Cleans, transforms, and prepares data for ML models and LLM (e.g., tokenizes market news for sentiment analysis).
Model Layer:
ML: Runs classification, forecasting, risk analysis, and clustering models.
LLM: Refines ML outputs, applies business model criteria, and generates rationales.
Output Layer: Formats model outputs for API consumption (e.g., JSON responses with zoning data, rationales).
Feedback Loop:
Captures actual loan outcomes (e.g., default rates, repayment rates) from the PMS.
Uses outcomes to improve ML models (e.g., retrain with new default rate data).
Uses outcomes to fine-tune the LLM (e.g., adjust rationale generation if zoning decisions lead to high default rates).
Performance Requirements
API response times: < 200ms for most endpoints.
ML processing: Daily batch processing for all suburbs.
LLM processing: < 300ms for rationale generation and context application.
Real-time scoring: < 500ms for individual suburb analysis.
System uptime: 99.9%.
Data freshness: All data no more than 24 hours old.
Scalability: Handle 10,000 loan applications per month, with the ability to expand to other cities (e.g., Melbourne).
Future Enhancements
Predictive modeling for specific homeowner demographics (e.g., default risk by income level).
Portfolio simulation enhancements (e.g., more granular risk correlations).
Scenario analysis for regulatory changes (e.g., APRA LTV cap reduction to 70%).
Integration with homeowner-specific data (e.g., credit scores, income stability).
Custom risk profile matching for different loan products.
Ethical AI monitoring (e.g., bias detection in zoning decisions).
Why These Revised Requirements Are Better
Alignment with Business Model:
The revised requirements focus on loan suitability rather than property investment, emphasizing metrics like LTV, foreclosure rates, and homeowner default trends. This ensures the TFS identifies suburbs where properties are secure collateral for no-monthly-payment loans.
Example: The /suburbs/analysis API now includes loan-specific metrics (e.g., average LTV, default rates) instead of rental yields, which are less relevant for Equihome’s model.
Incorporation of OpenAI LLM Layer:
The LLM layer is now explicitly included, with requirements for context management (via MCP), rationale generation, and fine-tuning. This ensures the TFS aligns with Equihome’s business model and provides transparency for stakeholders.
Example: The /ml/decisions API now includes LLM rationales, ensuring explainability (e.g., “Bondi zoned green due to high equity and low LTV”).
Loan-Specific Risk Factors:
The risk factors now include loan-specific concerns like homeowner default risk, negative equity risk, and regulatory risk, which are critical for a lending platform.
Example: The /risk/correlation API now includes correlations between property value decline and default rates, helping the PMS simulate portfolio risks.
Integration with PMS Simulation Engine:
The new /portfolio/simulation/integration API provides data in a format that supports the PMS’s simulation engine (e.g., risk correlations, forecast confidence intervals), ensuring the TFS outputs are actionable for portfolio optimization.
Example: The API provides time-series data for Monte Carlo simulations, enabling the PMS to model loan outcomes accurately.
Regulatory and Ethical Considerations:
The requirements now include regulatory data (e.g., APRA LTV caps) and ethical AI monitoring (e.g., bias detection), ensuring compliance with Australian laws and ethical standards.
Example: The future enhancements include scenario analysis for regulatory changes, preparing Equihome for potential lending law updates.
Scalability and Real-Time Needs:
The performance requirements now include scalability goals (e.g., handling 10,000 loan applications per month), ensuring the TFS can grow with Equihome’s business.
Example: The system is designed to expand to other cities, with scalable architecture (e.g., sharded database, distributed computing).
Feedback Loop Specificity:
The feedback loop now specifies how it captures loan outcomes (e.g., default rates from the PMS) and uses them to improve both ML models and the LLM, ensuring continuous learning.
Example: If green-zone suburbs show high default rates, the feedback loop triggers ML retraining and LLM fine-tuning to adjust zoning criteria.
## Frontend Implementation

### Map Visualization

The Traffic Light System includes a sophisticated map visualization component with the following features:

#### Suburb Boundaries
- Comprehensive GeoJSON data for all Sydney suburbs with accurate geographic boundaries
- Classification of suburbs into green, orange, and red zones based on investment potential
- Additional metadata for each suburb (postcode, population, median income, area, etc.)
- Interactive popups with detailed suburb information

#### Layer Control
- Ability to switch between Suburbs and Postcodes views
- Future support for additional data layers (e.g., infrastructure projects, transport accessibility)

#### User Experience
- Loading indicator for map data
- Map legend for zone colors
- Filtering by zone type and search term
- Responsive design for various screen sizes

#### Technical Implementation
- Uses Mapbox GL JS for high-performance map rendering
- Optimized data files to meet GitHub size limitations
- Efficient filtering and rendering of large datasets
- Support for predictive mode with transition probabilities

### API Integration

The Traffic Light System is designed to integrate with backend APIs for real data. The frontend is currently using mock data but is prepared for API integration.

#### API Services

The following API services have been implemented:

1. **Suburb API**
   - `getSuburbClassifications`: Get classification for all suburbs
   - `getSuburbAnalysis`: Get detailed analysis for a specific suburb
   - `getComparableSuburbs`: Get comparable suburbs for a specific suburb
   - `getMarketCycle`: Get market cycle position for a specific suburb

2. **Risk API**
   - `getRiskCorrelationMatrix`: Get risk correlation matrix

3. **ML API**
   - `getMLDecisionFactors`: Get ML decision factors for a specific suburb
   - `getMLSystemStatus`: Get ML system status

4. **Growth API**
   - `getGrowthCorridors`: Get growth corridors

5. **Integration API**
   - `getUnderwritingIntegration`: Get underwriting integration status and metrics
   - `getPortfolioSimulationIntegration`: Get portfolio simulation integration data

#### API Integration Strategy

The frontend is designed to work with both mock data and real API data:

1. **Fallback Mechanism**: API services try to fetch data from the backend first, and fall back to mock data if the API call fails.

2. **Data Conversion**: API responses are converted to match the existing data structures used by the frontend components.

3. **TypeScript Interfaces**: All API responses have TypeScript interfaces defined to ensure type safety.

4. **Placeholder UI**: UI components are designed to handle empty/loading states gracefully until real data is available.

#### API Endpoints

The following API endpoints are expected to be implemented by the backend:

```
GET /api/suburbs/classification
GET /api/suburbs/analysis/{suburbName}
GET /api/suburbs/comparable/{suburbName}
GET /api/market/cycle/{suburbName}
GET /api/risk/correlation
GET /api/ml/decisions/{suburbName}
GET /api/ml/system/status
GET /api/growth/corridors
GET /api/integration/underwriting
GET /api/integration/portfolio
```

## Additional Recommendations

Security Requirements:
Add requirements for securing API endpoints (e.g., OAuth 2.0 authentication) and encrypting sensitive data (e.g., loan performance data) to comply with Australia’s Privacy Act 1988.
Example: “All API endpoints must use HTTPS and OAuth 2.0 authentication; sensitive data must be encrypted in transit and at rest.”
Monitoring and Alerting:
Include requirements for monitoring system health and alerting on issues (e.g., data pipeline failures, model drift).
Example: “Implement monitoring with Prometheus and Grafana; alert on ML model accuracy drops below 85% or API latency exceeds 300ms.”
Testing Requirements:
Add requirements for unit testing, integration testing, and stress testing to ensure reliability at production.
Example: “Achieve 90% unit test coverage for backend code; conduct stress tests to handle 20,000 API requests per minute.”
Documentation and Onboarding:
Include requirements for API documentation (e.g., OpenAPI/Swagger) and developer onboarding guides to facilitate collaboration with Augment and future teams.
Example: “Provide OpenAPI documentation for all endpoints; include a developer guide for integrating with the TFS.”