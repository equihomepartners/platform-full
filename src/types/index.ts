export interface LoanDecision {
    approved: boolean;
    amount?: number;
    rate?: number;
    term?: number;
    reason?: string;
  }
  
  export interface FundParameters {
    maxLTV: number;
    targetIRR: number;
    geographicLimits: {
      maxPerSuburb: number;
    };
    propertyTypes: string[];
  }
  
  export interface PropTrackData {
    propertyValue: number;
    confidence: number;
    lastUpdated: string;
    comparableSales: Array<{
      address: string;
      price: number;
      saleDate: string;
    }>;
  }