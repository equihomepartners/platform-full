# Sales & Marketing Dashboard Module

## Overview

The Sales & Marketing Dashboard module facilitates outreach through email marketing campaigns directed at properties in target Traffic Light System zones with the highest metrics. It integrates with Mailchimp for campaign management and provides tools for lead management and campaign analytics.

## Key Features

### Target Property Identification

The Target Property Identification feature identifies properties in target Traffic Light System zones. It uses data from the Traffic Light System to identify properties that match Equihome's investment criteria.

**Components:**
- **Zone Targeting**: Target properties in specific Traffic Light System zones
- **Property Search**: Search for properties based on various criteria
- **Property Filtering**: Filter properties based on various criteria
- **Property Ranking**: Rank properties based on investment potential

### Email Campaign Management

The Email Campaign Management feature allows users to create and manage email marketing campaigns. It provides tools for designing, scheduling, and tracking email campaigns.

**Components:**
- **Campaign Creation**: Create new email marketing campaigns
- **Campaign Scheduling**: Schedule campaigns for specific dates and times
- **Campaign Targeting**: Target campaigns to specific property owners
- **Campaign Templates**: Use templates for quick campaign creation

### Mailchimp Integration

The Mailchimp Integration feature provides seamless integration with Mailchimp for campaign delivery. It allows users to leverage Mailchimp's powerful email marketing platform while managing campaigns within the Underwriting System.

**Components:**
- **Mailchimp Authentication**: Authenticate with Mailchimp
- **Audience Synchronization**: Synchronize audiences between the Underwriting System and Mailchimp
- **Campaign Synchronization**: Synchronize campaigns between the Underwriting System and Mailchimp
- **Template Synchronization**: Synchronize templates between the Underwriting System and Mailchimp

### Campaign Analytics

The Campaign Analytics feature tracks campaign performance and conversion rates. It provides insights into the effectiveness of email marketing campaigns and helps identify opportunities for improvement.

**Components:**
- **Campaign Performance Dashboard**: Overview of campaign performance metrics
- **Email Metrics**: Track email open rates, click rates, and bounce rates
- **Conversion Tracking**: Track conversions from campaigns
- **A/B Testing**: Test different campaign variations

### Lead Management

The Lead Management feature tracks and manages leads generated from campaigns. It provides tools for lead qualification, assignment, and follow-up.

**Components:**
- **Lead Dashboard**: Overview of all leads
- **Lead Qualification**: Qualify leads based on various criteria
- **Lead Assignment**: Assign leads to team members
- **Lead Follow-up**: Track follow-up activities for leads

## Integration with Other Modules

The Sales & Marketing Dashboard module integrates with:

- **Pipeline Management**: Sends qualified leads to the pipeline
- **Underwriting & Origination**: Provides data on target properties for underwriting
- **Analytics & Reporting**: Provides data for analytics and reporting

## Integration with Other Systems

The Sales & Marketing Dashboard module integrates with:

- **Traffic Light System**: Consumes green-zone suburbs for targeting
- **Mailchimp**: Integrates for email marketing campaign management
- **PropTrack**: Integrates for property data

## API Endpoints

The Sales & Marketing Dashboard module exposes the following API endpoints:

```
GET /api/underwriting/marketing/properties
GET /api/underwriting/marketing/properties/{id}
POST /api/underwriting/marketing/properties/search
GET /api/underwriting/marketing/campaigns
GET /api/underwriting/marketing/campaigns/{id}
POST /api/underwriting/marketing/campaigns
PUT /api/underwriting/marketing/campaigns/{id}
DELETE /api/underwriting/marketing/campaigns/{id}
POST /api/underwriting/marketing/campaigns/{id}/schedule
POST /api/underwriting/marketing/campaigns/{id}/send
GET /api/underwriting/marketing/campaigns/{id}/analytics
GET /api/underwriting/marketing/leads
GET /api/underwriting/marketing/leads/{id}
POST /api/underwriting/marketing/leads
PUT /api/underwriting/marketing/leads/{id}
DELETE /api/underwriting/marketing/leads/{id}
POST /api/underwriting/marketing/leads/{id}/qualify
POST /api/underwriting/marketing/leads/{id}/assign
POST /api/underwriting/marketing/leads/{id}/convert
GET /api/underwriting/marketing/mailchimp/audiences
GET /api/underwriting/marketing/mailchimp/templates
POST /api/underwriting/marketing/mailchimp/sync
```

## Data Model

The Sales & Marketing Dashboard module uses the following data models:

### Target Property

```typescript
interface TargetProperty {
  id: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  landSize: number;
  estimatedValue: number;
  trafficLightZone: 'Green' | 'Orange' | 'Red';
  owner?: {
    name: string;
    email: string;
    phone: string;
  };
  investmentPotential: {
    score: number;
    rank: number;
    factors: {
      name: string;
      weight: number;
      score: number;
    }[];
  };
  campaigns: {
    id: string;
    name: string;
    sentAt: string;
    opened: boolean;
    clicked: boolean;
    converted: boolean;
  }[];
}
```

### Email Campaign

```typescript
interface EmailCampaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'cancelled';
  createdAt: string;
  createdBy: string;
  scheduledAt?: string;
  sentAt?: string;
  audience: {
    name: string;
    size: number;
    criteria: {
      trafficLightZones: ('Green' | 'Orange' | 'Red')[];
      suburbs?: string[];
      propertyTypes?: string[];
      minValue?: number;
      maxValue?: number;
    };
  };
  content: {
    subject: string;
    preheader?: string;
    template: string;
    body: string;
    variables: {
      name: string;
      value: string;
    }[];
  };
  mailchimp: {
    campaignId?: string;
    audienceId?: string;
    templateId?: string;
    status?: string;
  };
  analytics: {
    recipients: number;
    opens: number;
    openRate: number;
    clicks: number;
    clickRate: number;
    bounces: number;
    bounceRate: number;
    unsubscribes: number;
    unsubscribeRate: number;
    conversions: number;
    conversionRate: number;
  };
}
```

### Lead

```typescript
interface Lead {
  id: string;
  source: 'campaign' | 'website' | 'referral' | 'other';
  sourceId?: string;
  status: 'new' | 'qualified' | 'disqualified' | 'converted';
  createdAt: string;
  lastUpdatedAt: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  property: {
    address: string;
    suburb: string;
    state: string;
    postcode: string;
    type: string;
    estimatedValue: number;
    trafficLightZone: 'Green' | 'Orange' | 'Red';
  };
  qualification: {
    score: number;
    factors: {
      name: string;
      value: string | number;
      score: number;
    }[];
    notes: string;
    qualifiedBy?: string;
    qualifiedAt?: string;
  };
  assignment: {
    assignedTo?: string;
    assignedAt?: string;
    assignedBy?: string;
  };
  conversion: {
    converted: boolean;
    convertedAt?: string;
    convertedBy?: string;
    applicationId?: string;
  };
  activities: {
    id: string;
    type: 'email' | 'call' | 'meeting' | 'note';
    description: string;
    timestamp: string;
    user: string;
  }[];
}
```

### Mailchimp Integration

```typescript
interface MailchimpIntegration {
  connected: boolean;
  apiKey?: string;
  serverPrefix?: string;
  lastSyncedAt?: string;
  audiences: {
    id: string;
    name: string;
    memberCount: number;
    lastSyncedAt?: string;
  }[];
  templates: {
    id: string;
    name: string;
    category: string;
    lastSyncedAt?: string;
  }[];
}
```

## User Interface

The Sales & Marketing Dashboard module provides the following user interfaces:

- **Target Property Dashboard**: Overview of target properties
- **Campaign Dashboard**: Overview of all campaigns
- **Campaign Creator**: Interface for creating campaigns
- **Campaign Analytics**: Interface for viewing campaign analytics
- **Lead Dashboard**: Overview of all leads
- **Lead Detail View**: Detailed view of a specific lead
- **Mailchimp Integration Settings**: Settings for Mailchimp integration
