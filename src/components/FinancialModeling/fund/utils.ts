import type { FundModelInputs } from './fundStore';

interface YearlyReturn {
  year: number;
  interestReturn: number;
  appreciationReturn: number;
  totalReturn: number;
  irr: number;
}

interface FundMetrics {
  averageDealSize: number;
  weightedLTV: number;
  weightedGrowthRate: number;
  yearlyReturns: YearlyReturn[];
}

export const calculateFundMetrics = (inputs: FundModelInputs): FundMetrics => {
  // Ensure all values are numbers
  const averageDealSize = Number(inputs.targetAUM) / Number(inputs.numberOfDeals);
  const weightedLTV = Number(inputs.ltvDistribution.mean);
  const weightedGrowthRate = Number(inputs.growthDistribution.mean);
  
  // Calculate portfolio returns over time (10 years)
  const yearlyReturns = Array.from({ length: 10 }, (_, year) => {
    const yearNum = year + 1;
    
    // Calculate interest returns (5% interest rate)
    const interestReturn = Number(inputs.targetAUM) * 0.05 * yearNum;
    
    // Calculate appreciation returns based on weighted growth rate
    const appreciationReturn = Number(inputs.targetAUM) * (weightedLTV / 100) * 
      (Math.pow(1 + weightedGrowthRate / 100, yearNum) - 1);
    
    // Calculate total return and IRR
    const totalReturn = interestReturn + appreciationReturn;
    const irr = (Math.pow((totalReturn + Number(inputs.targetAUM)) / Number(inputs.targetAUM), 1 / yearNum) - 1) * 100;

    return {
      year: yearNum,
      interestReturn,
      appreciationReturn,
      totalReturn,
      irr
    };
  });

  return {
    averageDealSize,
    weightedLTV,
    weightedGrowthRate,
    yearlyReturns
  };
};

// Normal distribution function for generating random values
export const normalDistribution = (mean: number, stdDev: number): number => {
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  const value = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return Number(value * stdDev + mean);
};

// Generate a random deal within the given parameters
export const generateRandomDeal = (inputs: FundModelInputs) => {
  const ltv = normalDistribution(Number(inputs.ltvDistribution.mean), Number(inputs.ltvDistribution.standardDev));
  const growthRate = normalDistribution(Number(inputs.growthDistribution.mean), Number(inputs.growthDistribution.standardDev));
  const propertyValue = normalDistribution(
    Number(inputs.propertyValueDistribution.mean),
    Number(inputs.propertyValueDistribution.standardDev)
  );

  return {
    ltv: Math.max(Number(inputs.ltvDistribution.min), Math.min(Number(inputs.ltvDistribution.max), ltv)),
    growthRate: Math.max(Number(inputs.growthDistribution.min), Math.min(Number(inputs.growthDistribution.max), growthRate)),
    propertyValue: Math.max(Number(inputs.propertyValueDistribution.min), Math.min(Number(inputs.propertyValueDistribution.max), propertyValue))
  };
};