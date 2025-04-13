// Sales & Marketing Dashboard Module Types
// This file exports all types for the Sales & Marketing Dashboard module

export interface TargetProperty {
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

export interface EmailCampaign {
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

export interface Lead {
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

export interface MailchimpIntegration {
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

export interface CampaignAnalytics {
  campaignId: string;
  name: string;
  sentAt: string;
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
  revenue: number;
  roi: number;
}

export interface LeadAnalytics {
  totalLeads: number;
  leadsBySource: {
    source: string;
    count: number;
    percentage: number;
  }[];
  leadsByStatus: {
    status: string;
    count: number;
    percentage: number;
  }[];
  conversionRate: number;
  averageQualificationScore: number;
  topPerformingCampaigns: {
    id: string;
    name: string;
    leads: number;
    conversionRate: number;
  }[];
}
