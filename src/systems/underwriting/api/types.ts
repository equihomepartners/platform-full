// Underwriting System API Types
// This file contains the API types for the Underwriting System

import { 
  FormData, 
  LoanDecision, 
  PropertyValuation, 
  RiskAssessment, 
  LoanApplication 
} from '../types';

// API Request Types
export interface SubmitLoanApplicationRequest {
  formData: FormData;
}

export interface EvaluatePropertyRequest {
  address: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  landSize?: number;
  yearBuilt?: number;
}

export interface AssessRiskRequest {
  applicationId: string;
}

export interface EvaluateLoanRequest {
  applicationId: string;
}

// API Response Types
export interface SubmitLoanApplicationResponse {
  application: LoanApplication;
}

export interface GetLoanApplicationsResponse {
  total: number;
  limit: number;
  offset: number;
  applications: LoanApplication[];
}

export interface GetLoanApplicationResponse {
  application: LoanApplication;
}

export interface EvaluatePropertyResponse {
  id: string;
  address: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  landSize?: number;
  yearBuilt?: number;
  valuation: PropertyValuation;
  riskAssessment: RiskAssessment;
  trafficLightZone: 'Green' | 'Orange' | 'Red';
}

export interface GetPropertyValuationsResponse {
  total: number;
  limit: number;
  offset: number;
  valuations: PropertyValuation[];
}

export interface AssessRiskResponse {
  id: string;
  applicationId: string;
  assessment: RiskAssessment;
}

export interface EvaluateLoanResponse {
  id: string;
  applicationId: string;
  decision: LoanDecision;
}

export interface GetLoanDecisionsResponse {
  total: number;
  limit: number;
  offset: number;
  decisions: {
    id: string;
    applicationId: string;
    decision: LoanDecision;
  }[];
}

export interface GetTrafficLightIntegrationResponse {
  status: 'active' | 'inactive' | 'maintenance';
  greenZoneSuburbs: string[];
  orangeZoneSuburbs: string[];
  redZoneSuburbs: string[];
  lastUpdated: string;
  nextUpdate: string;
}

export interface GetPortfolioIntegrationResponse {
  status: 'active' | 'inactive' | 'maintenance';
  approvedLoans: {
    count: number;
    totalAmount: number;
    averageLTV: number;
    averageIRR: number;
  };
  pendingApplications: {
    count: number;
    totalAmount: number;
    averageLTV: number;
    projectedIRR: number;
  };
  zoneDistribution: {
    green: number;
    orange: number;
    red: number;
  };
  recentApprovals: {
    id: string;
    suburb: string;
    amount: number;
    ltv: number;
    irr: number;
  }[];
}

// Webhook Types
export interface TrafficLightFeedbackWebhook {
  suburb: string;
  feedback_type: 'loan_evaluation' | 'approval_rate' | 'default_rate';
  metrics: {
    approval_rate?: number;
    average_processing_time?: number;
    risk_factors?: {
      name: string;
      impact: number;
    }[];
    default_probability?: number;
  };
  recommendation: 'maintain_green' | 'upgrade_to_green' | 'downgrade_from_green';
  confidence: number;
  timestamp: string;
  additional_notes?: string;
}

export interface PortfolioFeedbackWebhook {
  application_id: string;
  feedback_type: 'portfolio_impact' | 'deal_ranking' | 'risk_exposure';
  metrics: {
    portfolio_impact?: number;
    deal_ranking?: number;
    risk_exposure?: number;
    irr_contribution?: number;
  };
  recommendation: 'approve' | 'reject' | 'modify';
  confidence: number;
  timestamp: string;
  additional_notes?: string;
}
