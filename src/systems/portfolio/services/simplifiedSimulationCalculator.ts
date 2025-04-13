/**
 * Simplified Simulation Calculator
 *
 * This module provides basic calculation capabilities for the Equihome fund model.
 * It focuses on core variables and accurate calculations without unnecessary complexity.
 */

/**
 * Core Fund Settings
 * These are the essential parameters needed for the Equihome fund model
 */
export interface CoreFundSettings {
  fund_size: number;                // Total size of the fund in USD
  fund_term: number;                // Duration of the fund in years
  management_fee_rate: number;      // Annual management fee as percentage (e.g., 0.02 for 2%)
  hurdle_rate: number;              // Minimum return to LPs before carried interest (e.g., 0.06 for 6%)
  performance_fee_rate: number;     // Carried interest percentage (e.g., 0.20 for 20%)
  origination_fee_rate: number;     // Loan origination fee percentage (e.g., 0.03 for 3%)
  simple_interest_rate: number;     // Annual interest rate on loans (e.g., 0.05 for 5%)
  gp_investment_percentage: number; // GP's investment as percentage of fund size (e.g., 0.05 for 5%)
  average_property_value: number;   // Average property value in USD
  average_ltv: number;              // Average Loan-to-Value ratio (e.g., 0.40 for 40%)
  average_appreciation_rate: number; // Average annual property appreciation rate (e.g., 0.04 for 4%)
  average_exit_timeframe: number;  // Average exit timeframe in years (when homeowners exit through sale or refinance)
}

/**
 * Loan object representing a single loan in the portfolio
 */
export interface Loan {
  loan_amount: number;           // Amount of the loan in USD
  property_value: number;        // Value of the property in USD
  ltv: number;                   // Loan-to-Value ratio
  origination_year: number;      // Year the loan was originated (0-based from fund start)
  exit_year: number;             // Year the loan exits (0-based from fund start)
  appreciation_rate: number;     // Annual property appreciation rate
}

/**
 * Fund Performance metrics
 */
export interface FundPerformance {
  total_investment: number;      // Total investment in the fund
  total_return: number;          // Total return from the fund
  irr: number;                   // Internal Rate of Return
  equity_multiple: number;       // Equity Multiple
  roi: number;                   // Return on Investment
  yearly_cash_flows: number[];   // Cash flows for each year
  yearly_nav: number[];          // Net Asset Value for each year
  portfolio?: {                  // Portfolio details
    loans: Loan[];              // List of loans in the portfolio
    metrics: {                  // Portfolio metrics
      total_loans: number;      // Total number of loans
      average_loan_size: number; // Average loan size
      average_ltv: number;      // Average LTV
      total_initial_value: number; // Total initial portfolio value
    };
  };
  gp_economics: {                // GP economics
    investment: number;          // GP investment
    management_fees: number;     // Total management fees
    origination_fees: number;    // Total origination fees
    carried_interest: number;    // Total carried interest
    total_return: number;        // Total GP return
    roi: number;                 // GP ROI
  };
  lp_economics: {                // LP economics
    investment: number;          // LP investment
    preferred_return: number;    // Preferred return (hurdle)
    residual_profits: number;    // Residual profits after hurdle and carried interest
    total_return: number;        // Total LP return
    roi: number;                 // LP ROI
  };
}

/**
 * Math Utilities for Financial Calculations
 */
const MathUtils = {
  /**
   * Generate a random number from a normal distribution
   * Uses the Box-Muller transform
   */
  randomNormal: (mean: number, stdDev: number): number => {
    // Box-Muller transform to generate normal distribution
    let u1 = 0, u2 = 0;
    while (u1 === 0) u1 = Math.random(); // Convert [0,1) to (0,1)
    while (u2 === 0) u2 = Math.random();

    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return mean + z0 * stdDev;
  },

  /**
   * Calculate simple interest
   */
  calculateSimpleInterest: (principal: number, rate: number, time: number): number => {
    return principal * rate * time;
  },

  /**
   * Calculate compound interest
   */
  calculateCompoundInterest: (principal: number, rate: number, time: number): number => {
    return principal * Math.pow(1 + rate, time);
  },

  /**
   * Calculate the net present value (NPV) of cash flows
   */
  calculateNPV: (cashFlows: number[], rate: number): number => {
    let npv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + rate, t);
    }
    return npv;
  },

  /**
   * Calculate the internal rate of return (IRR)
   */
  calculateIRR: (cashFlows: number[]): number => {
    // Simple implementation using bisection method
    let lowerBound = -0.99;
    let upperBound = 1.0;

    // Expand upper bound if needed
    while (MathUtils.calculateNPV(cashFlows, upperBound) > 0) {
      upperBound *= 2;
      if (upperBound > 100) return 1.0; // Cap at 100% IRR
    }

    const tolerance = 0.0000001;
    const maxIterations = 100;

    for (let i = 0; i < maxIterations; i++) {
      const midpoint = (lowerBound + upperBound) / 2;
      const npvAtMidpoint = MathUtils.calculateNPV(cashFlows, midpoint);

      if (Math.abs(npvAtMidpoint) < tolerance) {
        return midpoint;
      }

      if (npvAtMidpoint > 0) {
        lowerBound = midpoint;
      } else {
        upperBound = midpoint;
      }

      if (upperBound - lowerBound < tolerance) {
        return midpoint;
      }
    }

    return (lowerBound + upperBound) / 2;
  },

  /**
   * Calculate the equity multiple
   */
  calculateEquityMultiple: (totalReturn: number, totalInvestment: number): number => {
    if (totalInvestment === 0) return 0;
    return totalReturn / totalInvestment;
  },

  /**
   * Calculate the return on investment (ROI)
   */
  calculateROI: (totalReturn: number, totalInvestment: number): number => {
    if (totalInvestment === 0) return 0;
    return (totalReturn - totalInvestment) / totalInvestment;
  }
};

/**
 * Calculate the exit value of a loan
 */
export const calculateLoanExitValue = (loan: Loan, fundSettings: CoreFundSettings): number => {
  // Calculate years held
  const yearsHeld = loan.exit_year - loan.origination_year;

  // Calculate property appreciation
  const appreciatedPropertyValue = MathUtils.calculateCompoundInterest(
    loan.property_value,
    loan.appreciation_rate,
    yearsHeld
  );

  // Calculate simple interest on the loan amount
  const interest = MathUtils.calculateSimpleInterest(
    loan.loan_amount,
    fundSettings.simple_interest_rate,
    yearsHeld
  );

  // Calculate appreciation fee (LTV% of appreciation)
  const propertyAppreciation = appreciatedPropertyValue - loan.property_value;
  const appreciationFee = propertyAppreciation * loan.ltv;

  // Calculate total exit value
  const exitValue = loan.loan_amount + interest + appreciationFee;

  return exitValue;
};

/**
 * Generate a simple portfolio of loans with realistic exit year distribution
 */
export const generateSimplePortfolio = (fundSettings: CoreFundSettings): Loan[] => {
  const loans: Loan[] = [];

  // Calculate number of loans based on fund size, average property value, and average LTV
  const averageLoanAmount = fundSettings.average_property_value * fundSettings.average_ltv;
  const numLoans = Math.floor(fundSettings.fund_size / averageLoanAmount);

  // Generate loans
  for (let i = 0; i < numLoans; i++) {
    // Generate a realistic exit year using a normal distribution
    const meanExitYear = fundSettings.average_exit_timeframe;
    const stdDev = meanExitYear * 0.3; // 30% standard deviation

    // Generate random exit year from normal distribution
    let exitYear = Math.round(MathUtils.randomNormal(meanExitYear, stdDev));

    // Clamp exit year between 1 and 2x the average (or fund term, whichever is less)
    const minExit = 1; // Minimum 1 year
    const maxExit = Math.min(meanExitYear * 2, fundSettings.fund_term);
    exitYear = Math.max(minExit, Math.min(maxExit, exitYear));

    // Create a loan with realistic values
    const loan: Loan = {
      loan_amount: averageLoanAmount,
      property_value: fundSettings.average_property_value,
      ltv: fundSettings.average_ltv,
      origination_year: 0, // All loans start at year 0 for simplicity
      exit_year: exitYear, // Realistic exit year based on distribution
      appreciation_rate: fundSettings.average_appreciation_rate
    };

    loans.push(loan);
  }

  return loans;
};

/**
 * Calculate waterfall distribution
 */
export const calculateWaterfall = (
  totalProfit: number,
  hurdleRate: number,
  carriedInterestRate: number,
  lpInvestment: number,
  gpInvestment: number,
  investmentTerm: number
): any => {
  const totalInvestment = lpInvestment + gpInvestment;

  // Step 1: Return of capital
  const lpReturnOfCapital = lpInvestment;
  const gpReturnOfCapital = gpInvestment;

  // Step 2: Preferred return (hurdle)
  const hurdleAmount = lpInvestment * (Math.pow(1 + hurdleRate, investmentTerm) - 1);

  // Remaining profit after return of capital and hurdle
  let remainingProfit = totalProfit - hurdleAmount;

  // Step 3: GP catch-up (if applicable)
  let gpCatchup = 0;
  if (remainingProfit > 0) {
    // Calculate catch-up amount
    const catchupAmount = (hurdleAmount * carriedInterestRate) / (1 - carriedInterestRate);
    gpCatchup = Math.min(remainingProfit, catchupAmount);
    remainingProfit -= gpCatchup;
  }

  // Step 4: Carried interest split
  let gpCarriedInterest = 0;
  let lpResidual = 0;

  if (remainingProfit > 0) {
    gpCarriedInterest = remainingProfit * carriedInterestRate;
    lpResidual = remainingProfit * (1 - carriedInterestRate);
  }

  // Calculate total returns
  const totalGpReturn = gpReturnOfCapital + gpCatchup + gpCarriedInterest;
  const totalLpReturn = lpReturnOfCapital + hurdleAmount + lpResidual;

  return {
    lpReturnOfCapital,
    gpReturnOfCapital,
    hurdleAmount,
    gpCatchup,
    gpCarriedInterest,
    lpResidual,
    totalGpReturn,
    totalLpReturn
  };
};

/**
 * Calculate fund performance
 */
export const calculateFundPerformance = (fundSettings: CoreFundSettings): FundPerformance => {
  // Generate a simple portfolio
  const loans = generateSimplePortfolio(fundSettings);

  // Calculate GP and LP investments
  const gpInvestment = fundSettings.fund_size * fundSettings.gp_investment_percentage;
  const lpInvestment = fundSettings.fund_size - gpInvestment;

  // Initialize yearly cash flows (year 0 is initial investment)
  const yearlyFlows: number[] = Array(fundSettings.fund_term + 1).fill(0);
  yearlyFlows[0] = -fundSettings.fund_size; // Initial investment (negative cash flow)

  // Calculate origination fees (positive cash flow in year 0)
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.loan_amount, 0);
  const originationFees = totalLoanAmount * fundSettings.origination_fee_rate;
  yearlyFlows[0] += originationFees;

  // Calculate yearly management fees
  const annualManagementFee = fundSettings.fund_size * fundSettings.management_fee_rate;

  // Calculate loan exits and their impact on cash flows
  loans.forEach(loan => {
    const exitYear = loan.exit_year;
    if (exitYear <= fundSettings.fund_term) {
      const exitValue = calculateLoanExitValue(loan, fundSettings);
      yearlyFlows[exitYear] += exitValue;
    }
  });

  // Subtract management fees from each year (except year 0)
  for (let year = 1; year <= fundSettings.fund_term; year++) {
    yearlyFlows[year] -= annualManagementFee;
  }

  // Calculate fund metrics
  const totalInvestment = fundSettings.fund_size;
  const totalReturn = yearlyFlows.reduce((sum, flow) => sum + (flow > 0 ? flow : 0), 0);
  const irr = MathUtils.calculateIRR(yearlyFlows);
  const equityMultiple = MathUtils.calculateEquityMultiple(totalReturn, totalInvestment);
  const roi = MathUtils.calculateROI(totalReturn, totalInvestment);

  // Calculate waterfall distribution
  const totalProfit = totalReturn - totalInvestment;
  const waterfall = calculateWaterfall(
    totalProfit,
    fundSettings.hurdle_rate,
    fundSettings.performance_fee_rate,
    lpInvestment,
    gpInvestment,
    fundSettings.fund_term
  );

  // Calculate yearly NAV (simplified)
  const yearlyNav: number[] = Array(fundSettings.fund_term + 1).fill(0);
  yearlyNav[0] = fundSettings.fund_size;

  for (let year = 1; year <= fundSettings.fund_term; year++) {
    yearlyNav[year] = yearlyNav[year - 1];

    // Add interest accrual
    const outstandingLoans = loans.filter(loan =>
      loan.origination_year <= year && loan.exit_year > year
    );

    const totalOutstandingLoanAmount = outstandingLoans.reduce(
      (sum, loan) => sum + loan.loan_amount, 0
    );

    const interestAccrual = totalOutstandingLoanAmount * fundSettings.simple_interest_rate;
    yearlyNav[year] += interestAccrual;

    // Add property appreciation (for appreciation fee calculation)
    const appreciationAccrual = outstandingLoans.reduce((sum, loan) => {
      const propertyAppreciation = loan.property_value * loan.appreciation_rate;
      return sum + (propertyAppreciation * loan.ltv);
    }, 0);

    yearlyNav[year] += appreciationAccrual;

    // Subtract management fee
    yearlyNav[year] -= annualManagementFee;

    // Add/subtract cash flows
    yearlyNav[year] += yearlyFlows[year];
  }

  // Calculate GP economics
  const gpEconomics = {
    investment: gpInvestment,
    management_fees: annualManagementFee * fundSettings.fund_term,
    origination_fees: originationFees,
    carried_interest: waterfall.gpCarriedInterest + waterfall.gpCatchup,
    total_return: waterfall.totalGpReturn + originationFees + (annualManagementFee * fundSettings.fund_term),
    roi: 0 // Calculated below
  };

  gpEconomics.roi = MathUtils.calculateROI(gpEconomics.total_return, gpInvestment);

  // Calculate LP economics
  const lpEconomics = {
    investment: lpInvestment,
    preferred_return: waterfall.hurdleAmount,
    residual_profits: waterfall.lpResidual,
    total_return: waterfall.totalLpReturn,
    roi: MathUtils.calculateROI(waterfall.totalLpReturn, lpInvestment)
  };

  // Calculate portfolio metrics
  const totalLoans = loans.length;
  const averageLoanSize = loans.reduce((sum, loan) => sum + loan.loan_amount, 0) / totalLoans;
  const averageLtv = loans.reduce((sum, loan) => sum + loan.ltv, 0) / totalLoans;
  const totalInitialValue = loans.reduce((sum, loan) => sum + loan.loan_amount, 0);

  // Create portfolio object
  const portfolio = {
    loans,
    metrics: {
      total_loans: totalLoans,
      average_loan_size: averageLoanSize,
      average_ltv: averageLtv,
      total_initial_value: totalInitialValue
    }
  };

  return {
    total_investment: totalInvestment,
    total_return: totalReturn,
    irr,
    equity_multiple: equityMultiple,
    roi,
    yearly_cash_flows: yearlyFlows,
    yearly_nav: yearlyNav,
    portfolio,
    gp_economics: gpEconomics,
    lp_economics: lpEconomics
  };
};

/**
 * Run a simulation with the given fund settings
 */
export const runSimulation = (fundSettings: Partial<CoreFundSettings> = {}): FundPerformance => {
  // Set default values for any missing settings
  const defaultSettings: CoreFundSettings = {
    fund_size: 100000000, // $100M
    fund_term: 10, // 10 years
    management_fee_rate: 0.02, // 2%
    hurdle_rate: 0.06, // 6%
    performance_fee_rate: 0.20, // 20%
    origination_fee_rate: 0.03, // 3%
    simple_interest_rate: 0.05, // 5%
    gp_investment_percentage: 0.05, // 5%
    average_property_value: 1000000, // $1M
    average_ltv: 0.40, // 40%
    average_appreciation_rate: 0.04, // 4%
    average_exit_timeframe: 7 // 7 years (when homeowners exit through sale or refinance)
  };

  // Merge provided settings with defaults
  const settings: CoreFundSettings = {
    ...defaultSettings,
    ...fundSettings
  };

  // Calculate fund performance
  return calculateFundPerformance(settings);
};

// Export the simplified calculator
export const SimplifiedSimulationCalculator = {
  runSimulation,
  calculateLoanExitValue,
  generateSimplePortfolio,
  calculateWaterfall,
  calculateFundPerformance,
  MathUtils
};

export default SimplifiedSimulationCalculator;
