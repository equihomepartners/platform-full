# Traffic Light System API Overview

## Introduction

The Traffic Light System exposes a comprehensive set of API endpoints that allow other systems to access suburb classifications, ML model information, risk assessments, and other data. These endpoints are designed to be consumed by the Portfolio Management System and Underwriting System to enable seamless integration across the Equihome platform.

## API Base URL

```
/api
```

## Authentication

All API endpoints require authentication using JWT tokens. The tokens should be included in the `Authorization` header of each request:

```
Authorization: Bearer <token>
```

## API Categories

The Traffic Light System API is organized into the following categories:

### 1. Suburb APIs

Endpoints for accessing suburb data, classifications, and analysis:

- `GET /api/suburbs/classification` - Get all suburb classifications
- `GET /api/suburbs/analysis/{suburbName}` - Get detailed analysis for a specific suburb
- `GET /api/suburbs/comparable/{suburbName}` - Get comparable suburbs for a specific suburb

### 2. Market APIs

Endpoints for accessing market data and analysis:

- `GET /api/market/cycle/{suburbName}` - Get market cycle position for a specific suburb
- `GET /api/growth/corridors` - Get growth corridor information

### 3. ML APIs

Endpoints for accessing ML model information and decisions:

- `GET /api/ml/decisions/{suburbName}` - Get ML decisions for a specific suburb
- `GET /api/ml/system/status` - Get ML system status
- `GET /api/ml/model-info` - Get ML model information

### 4. Risk APIs

Endpoints for accessing risk data and analysis:

- `GET /api/risk/correlation` - Get risk correlation matrix

### 5. Integration APIs

Endpoints for integration with other systems:

- `GET /api/integration/underwriting` - Get integration data for the Underwriting System
- `GET /api/integration/portfolio` - Get integration data for the Portfolio Management System

### 6. Webhook APIs

Endpoints for receiving feedback from other systems:

- `POST /api/webhooks/portfolio-feedback` - Receive feedback from the Portfolio Management System
- `POST /api/webhooks/underwriting-feedback` - Receive feedback from the Underwriting System

## API Implementation Status

The API endpoints are currently defined but not yet implemented. The frontend components use mock data that matches the expected API response format. The backend and ML components will be implemented in future phases.

## API Documentation

For detailed information about the API endpoints, request/response formats, and integration with other systems, see:

- [API Endpoints Documentation](./ENDPOINTS.md)
- [API Integration Documentation](./INTEGRATION.md)
- [Webhooks Documentation](./WEBHOOKS.md)
