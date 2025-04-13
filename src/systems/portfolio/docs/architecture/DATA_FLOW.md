# Portfolio Management System Data Flow

This document describes the data flow within the Portfolio Management System and its integration with other systems.

## Overview

The Portfolio Management System processes data from various sources to provide insights for portfolio management and optimization. The data flows through several stages:

1. **Data Collection**: Data is collected from various sources
2. **Data Processing**: Data is processed, normalized, and stored
3. **Simulation Processing**: The simulation engine processes the data
4. **API Exposure**: Results are exposed through API endpoints
5. **Frontend Display**: Frontend components display the results
6. **Integration**: Other systems consume the API endpoints

## Data Sources

The Portfolio Management System integrates with the following data sources:

### External Data Sources

- **Traffic Light System**: Suburb classifications, risk assessments, and growth forecasts
- **Underwriting System**: Approved loans, loan applications, and borrower data
- **Market Data**: Property market trends, interest rates, and economic indicators

### Internal Data Sources

- **Portfolio Database**: Current portfolio composition, loan performance, and historical data
- **User Inputs**: Fund parameters, risk preferences, and optimization constraints

## Data Processing Pipeline

The data processing pipeline consists of the following stages:

### 1. Data Collection

Data is collected from various sources through APIs and database queries. The data collection process is scheduled to run at regular intervals to ensure the data is up-to-date.

### 2. Data Preprocessing

The collected data is preprocessed to ensure it is clean, consistent, and ready for analysis. This includes:

- **Data Cleaning**: Removing duplicates, handling missing values, and correcting errors
- **Data Normalization**: Converting data to a consistent format
- **Feature Engineering**: Creating derived features for simulation models

### 3. Simulation Processing

The preprocessed data is fed into the simulation engine for analysis. The simulation engine performs the following tasks:

- **Portfolio Optimization**: Optimizing portfolio allocation
- **Scenario Analysis**: Simulating portfolio performance under different scenarios
- **Cash Flow Forecasting**: Projecting future cash flows
- **Risk Assessment**: Evaluating portfolio risk

### 4. Results Storage

The results of the simulation processing are stored in the database for later retrieval. This includes:

- **Optimization Results**: Optimal portfolio allocations
- **Scenario Results**: Performance under different scenarios
- **Cash Flow Projections**: Projected cash flows
- **Risk Metrics**: Portfolio risk assessments

### 5. API Exposure

The results are exposed through API endpoints for consumption by frontend components and other systems. The API endpoints provide access to:

- **Portfolio Performance**: Current and historical performance metrics
- **Optimization Recommendations**: Recommended portfolio allocations
- **Scenario Analysis**: Results of different scenario simulations
- **Risk Assessments**: Portfolio risk metrics and alerts

### 6. Frontend Display

The frontend components consume the API endpoints to display the results to users. The frontend components include:

- **Portfolio Dashboard**: Overview of portfolio performance
- **Fund Parameters**: Configuration for portfolio management
- **Analytics**: In-depth analysis of portfolio metrics and trends

### 7. Integration

Other systems consume the API endpoints for integration. The integration includes:

- **Traffic Light System**: Consumes portfolio performance data for suburb classification refinement
- **Underwriting System**: Consumes portfolio allocation recommendations for loan approval decisions

## Data Flow Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Data Sources   │────▶│ Data Processing │────▶│   Simulation    │
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

The Portfolio Management System uses the following data models:

### Portfolio

```typescript
interface Portfolio {
  id: string;
  name: string;
  totalValue: number;
  loanCount: number;
  averageLTV: number;
  weightedAverageInterestRate: number;
  weightedAverageMaturity: number;
  riskScore: number;
  diversificationScore: number;
  performanceMetrics: {
    irr: number;
    roi: number;
    cashYield: number;
    totalReturn: number;
  };
  allocationBySuburb: {
    suburb: string;
    allocation: number;
    zone: 'green' | 'yellow' | 'red';
  }[];
  allocationByPropertyType: {
    type: string;
    allocation: number;
  }[];
  cashFlowProjections: {
    date: string;
    interestIncome: number;
    principalRepayments: number;
    defaultLosses: number;
    netCashFlow: number;
  }[];
}
```

### Deal

```typescript
interface Deal {
  id: string;
  suburb: string;
  propertyValue: number;
  loanAmount: number;
  ltv: number;
  location: {
    latitude: number;
    longitude: number;
  };
  loanTerms: {
    startDate: string;
    endDate: string;
    interestRate: number;
  };
  propertyDetails: {
    address: string;
    yearlyGrowth: number;
  };
  performanceMetrics: {
    irr: number;
    roi: number;
    cashYield: number;
    totalReturn: number;
  };
  riskMetrics: {
    defaultProbability: number;
    lossGivenDefault: number;
    expectedLoss: number;
    stressTestImpact: number;
  };
}
```

### Simulation Result

```typescript
interface SimulationResult {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  parameters: {
    targetReturn: number;
    maxRisk: number;
    investmentHorizon: number;
    rebalancingFrequency: string;
    constraints: {
      maxSuburbExposure: number;
      maxPropertyTypeExposure: number;
      minCashReserve: number;
    };
  };
  results: {
    optimizedAllocation: {
      suburb: string;
      allocation: number;
      zone: 'green' | 'yellow' | 'red';
    }[];
    projectedPerformance: {
      expectedReturn: number;
      expectedRisk: number;
      sharpeRatio: number;
      maxDrawdown: number;
    };
    scenarioAnalysis: {
      scenario: string;
      return: number;
      risk: number;
      probability: number;
    }[];
    cashFlowProjections: {
      date: string;
      interestIncome: number;
      principalRepayments: number;
      defaultLosses: number;
      netCashFlow: number;
    }[];
  };
}
```

## Integration Data Flow

The Portfolio Management System integrates with other systems through the following data flows:

### Integration with Traffic Light System

1. **Traffic Light System to Portfolio Management System**:
   - Suburb classifications (green, yellow, red zones)
   - Risk assessments
   - Property value forecasts
   - Market cycle positions

2. **Portfolio Management System to Traffic Light System**:
   - Portfolio performance by suburb
   - Investment allocation by suburb
   - Risk-adjusted returns by suburb

### Integration with Underwriting System

1. **Underwriting System to Portfolio Management System**:
   - Approved loans
   - Loan applications
   - Borrower data

2. **Portfolio Management System to Underwriting System**:
   - Portfolio allocation recommendations
   - Risk exposure limits by suburb
   - Target returns by suburb

## Mock Data Approach

The current implementation uses mock data to simulate the functionality of the system. The mock data is structured to match the expected data models and API responses, ensuring that the frontend components can be developed and tested without waiting for the backend implementation.

The system includes fallback mechanisms to use mock data when API calls fail, allowing for a smooth transition from development to production. Once the backend services are implemented, the mock data will be replaced with real data from the APIs.
