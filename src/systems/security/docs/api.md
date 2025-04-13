# Security & Compliance System API Documentation

## API Overview

The Security & Compliance System provides a comprehensive set of API endpoints for managing security settings, compliance tracking, and audit logging. This document outlines the API specifications for integrating with the Security & Compliance System.

## API Base URL

```
/api/v1/security
```

## Authentication

All API endpoints require authentication using a valid JWT token. The token should be included in the `Authorization` header of each request:

```
Authorization: Bearer <token>
```

## API Endpoints

### Compliance Reports

#### Get Compliance Reports

Retrieves a list of compliance reports based on the specified filters.

- **URL**: `/compliance/reports`
- **Method**: `GET`
- **Query Parameters**:
  - `authority` (optional): Filter by regulatory authority (e.g., ASIC, AUSTRAC)
  - `type` (optional): Filter by report type (e.g., Regulatory, Security)
  - `status` (optional): Filter by status (e.g., Compliant, Due Soon)
- **Response**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "report_1",
        "title": "AUSTRAC AML/CTF Compliance Report",
        "type": "Regulatory",
        "frequency": "Annual",
        "lastSubmitted": "2023-03-15",
        "nextDue": "2024-03-15",
        "status": "Compliant",
        "url": "/compliance/austrac-aml-ctf-2023.pdf",
        "authority": "AUSTRAC",
        "description": "Annual compliance report for Anti-Money Laundering and Counter-Terrorism Financing obligations."
      },
      // Additional reports...
    ],
    "meta": {
      "total": 8,
      "page": 1,
      "perPage": 10
    }
  }
  ```

#### Get Compliance Report by ID

Retrieves a specific compliance report by its ID.

- **URL**: `/compliance/reports/:id`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "id": "report_1",
      "title": "AUSTRAC AML/CTF Compliance Report",
      "type": "Regulatory",
      "frequency": "Annual",
      "lastSubmitted": "2023-03-15",
      "nextDue": "2024-03-15",
      "status": "Compliant",
      "url": "/compliance/austrac-aml-ctf-2023.pdf",
      "authority": "AUSTRAC",
      "description": "Annual compliance report for Anti-Money Laundering and Counter-Terrorism Financing obligations."
    }
  }
  ```

#### Submit Compliance Report

Submits a new compliance report.

- **URL**: `/compliance/reports`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "title": "AUSTRAC AML/CTF Compliance Report",
    "type": "Regulatory",
    "frequency": "Annual",
    "authority": "AUSTRAC",
    "description": "Annual compliance report for Anti-Money Laundering and Counter-Terrorism Financing obligations.",
    "file": "<base64_encoded_file>"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "id": "report_new",
      "title": "AUSTRAC AML/CTF Compliance Report",
      "type": "Regulatory",
      "frequency": "Annual",
      "lastSubmitted": "2023-07-15",
      "nextDue": "2024-07-15",
      "status": "Compliant",
      "url": "/compliance/austrac-aml-ctf-2023-new.pdf",
      "authority": "AUSTRAC",
      "description": "Annual compliance report for Anti-Money Laundering and Counter-Terrorism Financing obligations."
    }
  }
  ```

### Security Settings

#### Get Security Settings

Retrieves the current security settings.

- **URL**: `/settings`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "authentication": {
        "mfaEnabled": true,
        "mfaMethod": "app",
        "sessionTimeout": 30,
        "rememberMeEnabled": true,
        "rememberMeDuration": 7,
        "biometricEnabled": true
      },
      "passwords": {
        "minLength": 12,
        "requireUppercase": true,
        "requireLowercase": true,
        "requireNumbers": true,
        "requireSpecialChars": true,
        "expiryDays": 90,
        "preventReuse": 5,
        "passwordHistoryDays": 365
      },
      "access": {
        "ipRestrictions": false,
        "allowedIps": [],
        "loginAttempts": 5,
        "lockoutDuration": 30,
        "geoRestrictions": true,
        "allowedCountries": ["AU", "NZ"]
      },
      "compliance": {
        "dataRetention": 7,
        "auditLogRetention": 2,
        "appCompliant": true,
        "amlCtfCompliant": true,
        "pciDssCompliant": true,
        "cps234Compliant": true,
        "cdrCompliant": true
      },
      "australianRegulatory": {
        "aclCompliance": true,
        "afslCompliance": true,
        "austracReporting": true,
        "bearFarCompliance": true,
        "ndbScheme": true
      },
      "encryption": {
        "dataAtRest": true,
        "dataInTransit": true,
        "endToEndEncryption": true,
        "keyRotationDays": 90
      },
      "monitoring": {
        "realTimeAlerts": true,
        "anomalyDetection": true,
        "userBehaviorAnalytics": true,
        "dataLossPrevention": true
      }
    }
  }
  ```

#### Update Security Settings

Updates the security settings.

- **URL**: `/settings`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "authentication": {
      "mfaEnabled": true,
      "mfaMethod": "app",
      "sessionTimeout": 30,
      "rememberMeEnabled": true,
      "rememberMeDuration": 7,
      "biometricEnabled": true
    },
    "passwords": {
      "minLength": 12,
      "requireUppercase": true,
      "requireLowercase": true,
      "requireNumbers": true,
      "requireSpecialChars": true,
      "expiryDays": 90,
      "preventReuse": 5,
      "passwordHistoryDays": 365
    },
    // Additional settings...
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "authentication": {
        "mfaEnabled": true,
        "mfaMethod": "app",
        "sessionTimeout": 30,
        "rememberMeEnabled": true,
        "rememberMeDuration": 7,
        "biometricEnabled": true
      },
      // Additional settings...
    }
  }
  ```

### Audit Logs

#### Get Audit Logs

Retrieves audit logs based on the specified filters.

- **URL**: `/audit/logs`
- **Method**: `GET`
- **Query Parameters**:
  - `user` (optional): Filter by user
  - `action` (optional): Filter by action (e.g., Login, Update)
  - `resource` (optional): Filter by resource
  - `startDate` (optional): Filter by start date
  - `endDate` (optional): Filter by end date
- **Response**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "audit_1",
        "timestamp": "2023-06-10T09:45:00",
        "user": "John Smith",
        "action": "Login",
        "resource": "Authentication System",
        "ipAddress": "192.168.1.1",
        "details": "Successful login from Sydney, Australia"
      },
      // Additional logs...
    ],
    "meta": {
      "total": 100,
      "page": 1,
      "perPage": 10
    }
  }
  ```

#### Get Login History

Retrieves login history for the specified user.

- **URL**: `/audit/login-history`
- **Method**: `GET`
- **Query Parameters**:
  - `userId` (optional): Filter by user ID
  - `startDate` (optional): Filter by start date
  - `endDate` (optional): Filter by end date
- **Response**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "login_1",
        "timestamp": "2023-06-10T09:45:00",
        "user": "John Smith",
        "status": "Success",
        "ipAddress": "192.168.1.1",
        "location": "Sydney, Australia",
        "device": "Chrome on macOS"
      },
      // Additional login records...
    ],
    "meta": {
      "total": 50,
      "page": 1,
      "perPage": 10
    }
  }
  ```

### Data Privacy

#### Get Data Privacy Settings

Retrieves the current data privacy settings.

- **URL**: `/privacy/settings`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "retention": {
        "customerDataRetention": 7,
        "auditLogRetention": 2,
        "automaticDeletion": true,
        "dataAnonymization": true
      },
      "consent": {
        "explicitConsent": true,
        "consentWithdrawal": true,
        "dataPortability": true,
        "privacyNotices": true
      },
      "access": {
        "roleBasedAccess": true,
        "dataClassification": true,
        "accessLogging": true,
        "dataMinimization": true
      },
      "breach": {
        "breachDetection": true,
        "breachNotification": true,
        "breachResponse": true,
        "lastBreachDrill": "2023-05-15"
      }
    }
  }
  ```

#### Update Data Privacy Settings

Updates the data privacy settings.

- **URL**: `/privacy/settings`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "retention": {
      "customerDataRetention": 7,
      "auditLogRetention": 2,
      "automaticDeletion": true,
      "dataAnonymization": true
    },
    // Additional settings...
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "retention": {
        "customerDataRetention": 7,
        "auditLogRetention": 2,
        "automaticDeletion": true,
        "dataAnonymization": true
      },
      // Additional settings...
    }
  }
  ```

## Error Handling

All API endpoints return standardized error responses:

```json
{
  "status": "error",
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

Common error codes:

- `BAD_REQUEST`: Invalid request parameters
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `INTERNAL_SERVER_ERROR`: Server error

## Rate Limiting

API endpoints are rate-limited to prevent abuse. The rate limits are:

- 100 requests per minute for authenticated users
- 10 requests per minute for unauthenticated users

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1625097600
```

## Versioning

The API is versioned using URL path versioning (e.g., `/api/v1/security`). When a new version is released, the previous version will be maintained for a minimum of 6 months to allow for migration.

## Mock Data

During development, mock data is used for all API endpoints. To use mock data, set the `useMockData` flag to `true` in the API configuration:

```javascript
API_CONFIG.useMockData = true;
```

## Implementation Status

- **Current Status**: Mock data implementation complete
- **Next Steps**: Implement real API endpoints
- **Target Completion**: Q3 2024
