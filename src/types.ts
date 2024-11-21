// ... existing types ...

export interface PipelineDeal {
  id: string;
  propertyDetails: {
    address: string;
    currentValue: number;
    latitude: number;
    longitude: number;
    medianPriceByType: number;
    riskAdjustment: number;
    forecastedGrowthRate: number;
  };
  loanRequest: {
    amount: number;
    existingMortgage: number;
    ltv: number;
    purpose: string;
  };
  borrowerDetails: {
    name: string;
    income: number;
    occupation: string;
  };
  underwriteScore: number;
  applicationDate: string;
  expectedFundingDate: string;
  returns: {
    forecastedIrr: number;
    yearlyProjections: Array<{
      year: number;
      totalReturn: number;
      irr: number;
    }>;
  };
}