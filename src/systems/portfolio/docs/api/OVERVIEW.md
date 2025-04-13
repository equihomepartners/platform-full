# Portfolio Management System API Overview

## Introduction

The Portfolio Management System API provides programmatic access to portfolio data, simulation capabilities, and optimization tools. It enables integration with other systems, automation of portfolio management tasks, and access to advanced financial analytics.

## API Design Principles

The Portfolio Management System API is designed with the following principles:

1. **RESTful**: The API follows REST principles for resource-oriented design
2. **JSON-based**: All requests and responses use JSON format
3. **Versioned**: API versioning ensures backward compatibility
4. **Authenticated**: All API calls require authentication
5. **Rate-limited**: API calls are rate-limited to prevent abuse
6. **Documented**: Comprehensive documentation is provided for all endpoints

## API Base URL

```
/api/portfolio
```

## Authentication

All API endpoints require authentication using JWT tokens. The tokens should be included in the `Authorization` header of each request:

```
Authorization: Bearer <token>
```

## API Categories

The Portfolio Management System API is organized into the following categories:

### Portfolio APIs

Endpoints for accessing and managing portfolio data:

- **Get Portfolio Summary**: Retrieve summary information about the portfolio
- **Get Portfolio Allocation**: Retrieve detailed allocation information
- **Get Portfolio Performance**: Retrieve historical performance data
- **Get Portfolio Metrics**: Retrieve key portfolio metrics

### Deal APIs

Endpoints for accessing and managing deal data:

- **Get Deals**: Retrieve a list of deals in the portfolio
- **Get Deal Details**: Retrieve detailed information about a specific deal
- **Get Deal Performance**: Retrieve performance data for a specific deal
- **Get Deal Metrics**: Retrieve key metrics for a specific deal

### Simulation APIs

Endpoints for running simulations and optimizations:

- **Run Scenario Simulation**: Run a simulation with custom scenario parameters
- **Run Portfolio Optimization**: Optimize portfolio allocation based on constraints
- **Get Simulation Results**: Retrieve results of a previous simulation
- **Get Optimization Results**: Retrieve results of a previous optimization

### Integration APIs

Endpoints for integration with other systems:

- **Get Traffic Light Integration**: Retrieve integration data for the Traffic Light System
- **Get Underwriting Integration**: Retrieve integration data for the Underwriting System
- **Sync External Data**: Synchronize data with external systems

## Response Format

All API responses follow a consistent format:

```json
{
  "status": "success",
  "data": {
    // Response data specific to the endpoint
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

For error responses:

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {
      // Additional error details
    }
  },
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0"
  }
}
```

## Pagination

Endpoints that return lists of items support pagination through the following query parameters:

- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 20, max: 100)

Paginated responses include pagination metadata:

```json
{
  "status": "success",
  "data": [
    // List of items
  ],
  "meta": {
    "timestamp": "2025-04-10T00:00:00Z",
    "version": "1.0",
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  }
}
```

## Filtering and Sorting

Endpoints that return lists of items support filtering and sorting through the following query parameters:

- `filter[field]`: Filter by field value (e.g., `filter[suburb]=Bondi`)
- `sort`: Sort by field (e.g., `sort=propertyValue` or `sort=-propertyValue` for descending)

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
/api/v1/portfolio/summary
```

The current version is v1. When new versions are released, the old versions will be maintained for backward compatibility.

## Mock Data Implementation

During development, the API endpoints return mock data to simulate the functionality of the system. This allows frontend development to proceed independently of backend implementation, while ensuring a smooth transition to production.

The mock data is structured to match the expected API responses, with realistic values and relationships between different data points. The system includes fallback mechanisms to use mock data when API calls fail, ensuring that the frontend components can be tested and demonstrated without a fully implemented backend.

Once the backend services are implemented, the mock data will be replaced with real data from the database and external systems. The API contracts will remain the same, allowing for a seamless transition from development to production.
