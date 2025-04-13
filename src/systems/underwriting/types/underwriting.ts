export interface FormData {
  borrowerName: string;
  annualIncome: number;
  employmentStatus: string;
  propertyAddress: string;
  propertyType: string;
  currentValue: number;
  mortgageBalance: number;
  loanAmount: number;
  loanPurpose: string;
  loanTerm: number;
  forecastedGrowth?: number;
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

export interface LoanDecision {
  approved: boolean;
  loanAmount: number;
  interestRate: number;
  ltv: number;
  riskLevel: 'low' | 'medium' | 'high';
  explanation: string;
  returns: Returns;
  trafficLight: 'Green' | 'Orange' | 'Red';
  suburb: string;
}

export interface PropertyValuation {
  estimatedValue: number;
  confidenceScore: number;
  comparableProperties: ComparableProperty[];
  lastUpdated: string;
}

export interface ComparableProperty {
  address: string;
  salePrice: number;
  saleDate: string;
  bedrooms: number;
  bathrooms: number;
  landSize: number;
  distanceKm: number;
}

export interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high';
  riskScore: number;
  riskFactors: RiskFactor[];
  recommendations: string[];
}

export interface RiskFactor {
  factor: string;
  value: number | string;
  risk: 'low' | 'medium' | 'high';
  impact: 'positive' | 'negative' | 'neutral';
}

export interface LoanApplication {
  id: string;
  status: 'submitted' | 'in-review' | 'approved' | 'rejected';
  submittedAt: string;
  borrower: {
    name: string;
    annualIncome: number;
    employmentStatus: string;
  };
  property: {
    address: string;
    type: string;
    currentValue: number;
    mortgageBalance: number;
  };
  loan: {
    amount: number;
    purpose: string;
    term: number;
  };
  decision?: LoanDecision;
}
