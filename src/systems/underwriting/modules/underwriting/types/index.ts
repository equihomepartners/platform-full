// Underwriting & Origination Module Types
// This file exports all types for the Underwriting & Origination module

export interface LoanApplication {
  id: string;
  status: 'submitted' | 'in-review' | 'approved' | 'rejected';
  submittedAt: string;
  lastUpdatedAt: string;
  borrower: {
    name: string;
    email: string;
    phone: string;
    annualIncome: number;
    employmentStatus: string;
    creditScore?: number;
  };
  property: {
    address: string;
    suburb: string;
    state: string;
    postcode: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    landSize: number;
    currentValue: number;
    mortgageBalance: number;
  };
  loan: {
    amount: number;
    purpose: string;
    term: number;
    interestRate?: number;
    originationFee?: number;
    appreciationShare?: number;
  };
  valuation?: PropertyValuation;
  riskAssessment?: RiskAssessment;
  decision?: LoanDecision;
  termSheet?: TermSheet;
  documents?: Document[];
}

export interface PropertyValuation {
  id: string;
  propertyId: string;
  estimatedValue: number;
  confidenceScore: number;
  valuationDate: string;
  source: 'proptrack' | 'manual';
  comparableProperties: ComparableProperty[];
  marketTrends: {
    period: 'month' | 'quarter' | 'year';
    growthRate: number;
  }[];
}

export interface ComparableProperty {
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  landSize: number;
  salePrice: number;
  saleDate: string;
  distanceKm: number;
}

export interface RiskAssessment {
  id: string;
  applicationId: string;
  overallRisk: 'low' | 'medium' | 'high';
  riskScore: number;
  assessmentDate: string;
  riskFactors: RiskFactor[];
  mitigationRecommendations: string[];
}

export interface RiskFactor {
  factor: string;
  value: number | string;
  risk: 'low' | 'medium' | 'high';
  impact: 'positive' | 'negative' | 'neutral';
  weight: number;
  score: number;
}

export interface LoanDecision {
  id: string;
  applicationId: string;
  decision: 'approved' | 'rejected';
  decisionDate: string;
  decisionBy: string;
  automated: boolean;
  overridden: boolean;
  originalDecision?: 'approved' | 'rejected';
  overrideReason?: string;
  terms?: {
    amount: number;
    interestRate: number;
    term: number;
    originationFee: number;
    appreciationShare: number;
  };
  conditions?: string[];
  rationale: string[];
  financialProjections: {
    irr: number;
    totalReturn: number;
    yearlyBreakdown: {
      year: number;
      propertyValue: number;
      accruedInterest: number;
      appreciationShare: number;
      totalReturn: number;
    }[];
  };
}

export interface TermSheet {
  id: string;
  applicationId: string;
  decisionId: string;
  generatedAt: string;
  generatedBy: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  sentAt?: string;
  respondedAt?: string;
  terms: {
    amount: number;
    interestRate: number;
    term: number;
    originationFee: number;
    appreciationShare: number;
  };
  conditions: string[];
  documentUrl: string;
}

export interface Document {
  id: string;
  applicationId: string;
  name: string;
  type: string;
  category: 'identity' | 'income' | 'property' | 'loan' | 'other';
  uploadedAt: string;
  uploadedBy: string;
  url: string;
}

export interface YearlyBreakdown {
  year: number;
  propertyValue: number;
  accruedInterest: number;
  appreciationShare: number;
  totalReturn: number;
  irr: number;
}

export interface Returns {
  yearlyBreakdown: YearlyBreakdown[];
  totalInterest: number;
  totalAppreciationShare: number;
  totalReturn: number;
  irr: number;
}
