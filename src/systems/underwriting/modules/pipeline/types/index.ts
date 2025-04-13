// Pipeline Management Module Types
// This file exports all types for the Pipeline Management module

export interface Deal {
  id: string;
  status: 'new' | 'in-review' | 'underwriting' | 'approved' | 'rejected' | 'closing' | 'closed';
  submittedAt: string;
  lastUpdatedAt: string;
  borrower: {
    name: string;
    email: string;
    phone: string;
    annualIncome: number;
    employmentStatus: string;
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
  };
  ranking?: {
    score: number;
    rank: number;
    criteria: {
      name: string;
      weight: number;
      score: number;
    }[];
  };
  tasks?: Task[];
  notes?: Note[];
  documents?: Document[];
  timeline?: TimelineEvent[];
}

export interface RankingCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  source: 'tfs' | 'pms' | 'manual';
  active: boolean;
}

export interface Task {
  id: string;
  dealId: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdBy: string;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface Note {
  id: string;
  dealId: string;
  text: string;
  createdBy: string;
  createdAt: string;
}

export interface Document {
  id: string;
  dealId: string;
  name: string;
  type: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface TimelineEvent {
  id: string;
  dealId: string;
  event: string;
  timestamp: string;
  user: string;
}

export interface PipelineAnalytics {
  totalDeals: number;
  dealsByStatus: {
    status: string;
    count: number;
    percentage: number;
  }[];
  conversionRates: {
    stage: string;
    rate: number;
  }[];
  averageTimeByStage: {
    stage: string;
    time: number; // in days
  }[];
  topPerformingSuburbs: {
    suburb: string;
    count: number;
    approvalRate: number;
  }[];
}

export interface DealRankingResult {
  dealId: string;
  score: number;
  rank: number;
  criteria: {
    name: string;
    weight: number;
    score: number;
  }[];
}
