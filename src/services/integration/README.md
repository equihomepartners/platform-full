# Integration Services

This directory contains services that handle integration between different systems in the Equihome platform.

## Traffic Light System and Portfolio Management System Integration

The `tfsPortfolioIntegration.ts` service handles the integration between the Traffic Light System (TFS) and the Portfolio Management System (PMS), particularly for simulations.

### Overview

The integration service provides methods to fetch TFS data and transform it into formats needed by the PMS. It includes:

- Methods to fetch suburb classifications, risk correlations, growth forecasts, default rates, and market cycles from the TFS
- A method to fetch all TFS data needed for portfolio simulation in a single call
- A method to transform TFS data into a format suitable for portfolio optimization

### Key Features

1. **Data Retrieval**: The service provides methods to fetch various types of data from the TFS API.
2. **Data Transformation**: The service transforms TFS data into formats suitable for portfolio optimization.
3. **Fallback Mechanism**: The service includes a robust fallback mechanism to ensure the PMS can function even when the TFS is unavailable.
4. **Caching**: The service caches TFS data to reduce API calls and improve performance.

### Usage

```typescript
import { tfsPortfolioIntegration } from '../../../services/integration/tfsPortfolioIntegration';

// Get all TFS data for simulation
const tfsData = await tfsPortfolioIntegration.getAllTFSDataForSimulation();

// Transform TFS data for portfolio optimization
const transformedData = tfsPortfolioIntegration.transformTFSDataForPortfolioOptimization(tfsData);

// Use transformed data in simulation
const simulationResult = await portfolioApiClient.runSimulation({
  ...simulationParameters,
  tfsData: transformedData
});
```

### Data Flow

1. The PMS requests data from the TFS through the integration service.
2. The integration service fetches data from the TFS API.
3. If the TFS API is unavailable, the integration service falls back to mock data.
4. The integration service transforms the data into a format suitable for portfolio optimization.
5. The PMS uses the transformed data in its simulation engine.

### Mock Data

The integration service includes mock data for development and testing purposes. This mock data is used as a fallback when the TFS API is unavailable.

### Future Enhancements

1. **Real-time Updates**: Implement WebSocket connections for real-time updates from the TFS.
2. **Caching Improvements**: Implement more sophisticated caching strategies to reduce API calls.
3. **Error Handling**: Enhance error handling and reporting for better debugging.
4. **Performance Optimization**: Optimize data transformation for better performance.
5. **Analytics Integration**: Integrate with analytics services for better insights.
