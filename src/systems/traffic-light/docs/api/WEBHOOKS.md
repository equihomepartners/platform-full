# Traffic Light System Webhooks

This document provides detailed information about the webhook endpoints exposed by the Traffic Light System.

## Overview

The Traffic Light System provides webhook endpoints to receive feedback from other systems. These webhooks allow the Portfolio Management System and Underwriting System to provide feedback that can be used to improve the ML models and suburb classifications.

## Authentication

All webhook endpoints require authentication using JWT tokens. The tokens should be included in the `Authorization` header of each request:

```
Authorization: Bearer <token>
```

## Webhook Endpoints

### Receive Portfolio Feedback

```
POST /api/webhooks/portfolio-feedback
```

Receives feedback from the Portfolio Management System about suburb performance.

**Request Format:**
```json
{
  "suburb": "Bondi",
  "feedback_type": "performance",
  "metrics": {
    "default_rate": 0.8,
    "roi": 9.2,
    "ltv_ratio": 65
  },
  "recommendation": "continue_prioritizing",
  "confidence": 0.92,
  "timestamp": "2025-04-10T00:00:00Z",
  "additional_notes": "Strong performance in this suburb"
}
```

**Response Format:**
```json
{
  "success": true,
  "message": "Feedback received successfully",
  "feedback_id": "fb-123456"
}
```

#### Feedback Types

The `feedback_type` field can have the following values:

- `performance`: Feedback about suburb performance
- `risk_assessment`: Feedback about risk assessment
- `diversification`: Feedback about portfolio diversification
- `recommendation`: Feedback about investment recommendations

#### Recommendation Types

The `recommendation` field can have the following values:

- `continue_prioritizing`: Continue prioritizing this suburb
- `reduce_exposure`: Reduce exposure to this suburb
- `increase_exposure`: Increase exposure to this suburb
- `pause_origination`: Pause loan origination in this suburb
- `adjust_risk_weights`: Adjust risk weights for this suburb

### Receive Underwriting Feedback

```
POST /api/webhooks/underwriting-feedback
```

Receives feedback from the Underwriting System about loan evaluations.

**Request Format:**
```json
{
  "suburb": "Bondi",
  "feedback_type": "loan_evaluation",
  "metrics": {
    "approval_rate": 92.5,
    "average_processing_time": 105,
    "risk_factors": [
      {
        "name": "property_value",
        "impact": 0.85
      },
      {
        "name": "owner_equity",
        "impact": 0.75
      }
    ],
    "default_probability": 0.8,
    "homeowner_metrics": {
      "credit_score_impact": 0.8,
      "income_stability_impact": 0.7
    }
  },
  "recommendation": "adjust_risk_weights",
  "confidence": 0.88,
  "timestamp": "2025-04-10T00:00:00Z",
  "additional_notes": "Consider adjusting risk weights for this suburb"
}
```

**Response Format:**
```json
{
  "success": true,
  "message": "Feedback received successfully",
  "feedback_id": "fb-123457"
}
```

## Error Handling

All webhook endpoints return standard HTTP status codes:

- 200: Success
- 400: Bad Request (invalid parameters)
- 401: Unauthorized (invalid or missing authentication)
- 500: Internal Server Error

Error responses include a JSON body with error details:

```json
{
  "error": {
    "code": "INVALID_FEEDBACK",
    "message": "Invalid feedback type",
    "details": {
      "feedback_type": "invalid_type"
    }
  }
}
```

## Webhook Implementation

The webhook endpoints are implemented in the `webhookApi.ts` file:

```typescript
/**
 * Receive feedback from the Portfolio Management System
 * 
 * API: POST /api/webhooks/portfolio-feedback
 * Receives feedback about suburb performance from the Portfolio Management System
 */
export const receivePortfolioFeedback = async (feedback: PortfolioFeedback): Promise<{ success: boolean }> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/webhooks/portfolio-feedback`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(feedback),
    // });
    // if (!response.ok) throw new Error('Failed to send portfolio feedback');
    // return await response.json();
    
    // Log the feedback for now
    console.log('Received portfolio feedback:', feedback);
    
    // Return success
    return { success: true };
  } catch (error) {
    console.error('Error sending portfolio feedback:', error);
    throw error;
  }
};
```

## Best Practices

1. **Validate Feedback**: Validate all feedback before processing it
2. **Log Feedback**: Log all feedback for audit purposes
3. **Process Asynchronously**: Process feedback asynchronously to avoid blocking the response
4. **Provide Feedback ID**: Provide a feedback ID in the response for tracking purposes
5. **Handle Errors Gracefully**: Implement proper error handling to ensure your application can handle webhook errors
