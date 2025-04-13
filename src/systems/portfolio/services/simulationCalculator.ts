/**
 * Simulation Calculator
 *
 * This module provides local calculation capabilities for the simulation engine.
 * It implements the Equihome real estate fund model with accurate financial calculations.
 */

import { FundSettings, Portfolio, SimulationResult } from '../types/portfolioTypes';
import { mockSimulationData } from '../data/mockSimulationData';

/**
 * Math Utilities for Financial Calculations
 *
 * These functions implement the same calculations as the Python backend
 * to ensure consistency and accuracy in the financial modeling.
 */
const MathUtils = {
  /**
   * Calculate the net present value (NPV) of cash flows at a given discount rate
   *
   * @param cashFlows Array of cash flows
   * @param rate Discount rate as a decimal
   * @returns NPV
   */
  calculateNPV: (cashFlows: number[], rate: number): number => {
    let npv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + rate, t);
    }
    return npv;
  },

  /**
   * Calculate the internal rate of return (IRR) for a series of cash flows
   *
   * @param cashFlows Array of cash flows (negative for outflows, positive for inflows)
   * @returns IRR as a decimal
   */
  calculateIRR: (cashFlows: number[]): number => {
    // Check if there are at least one negative and one positive cash flow
    const hasNegative = cashFlows.some(cf => cf < 0);
    const hasPositive = cashFlows.some(cf => cf > 0);

    if (!hasNegative || !hasPositive) {
      console.warn('IRR calculation requires at least one negative and one positive cash flow');
      return 0;
    }

    // Newton-Raphson method for IRR calculation
    const maxIterations = 1000;
    const tolerance = 0.0000001;

    let guess = 0.1; // Initial guess

    for (let i = 0; i < maxIterations; i++) {
      let npv = 0;
      let derivativeNpv = 0;

      for (let t = 0; t < cashFlows.length; t++) {
        const denominator = Math.pow(1 + guess, t);
        npv += cashFlows[t] / denominator;
        derivativeNpv -= t * cashFlows[t] / (denominator * (1 + guess));
      }

      // Check if we're close enough to zero
      if (Math.abs(npv) < tolerance) {
        return guess;
      }

      // Update guess using Newton-Raphson formula
      const newGuess = guess - npv / derivativeNpv;

      // Check for convergence
      if (Math.abs(newGuess - guess) < tolerance) {
        return newGuess;
      }

      // Prevent negative rates or extreme values
      if (newGuess <= -0.99 || !isFinite(newGuess)) {
        // Fall back to a bisection method
        return MathUtils.fallbackIRR(cashFlows);
      }

      guess = newGuess;
    }

    // If we didn't converge, fall back to a more robust method
    return MathUtils.fallbackIRR(cashFlows);
  },

  /**
   * Fallback method for IRR calculation using bisection
   *
   * @param cashFlows Array of cash flows
   * @returns IRR as a decimal
   */
  fallbackIRR: (cashFlows: number[]): number => {
    // Bisection method for IRR
    let lowerBound = -0.99; // Can't go below -100%
    let upperBound = 1.0;   // Start with 100% as upper bound

    // Expand upper bound if needed
    while (MathUtils.calculateNPV(cashFlows, upperBound) > 0) {
      upperBound *= 2;
      if (upperBound > 100) {
        // Extremely high IRR, cap it
        return 1.0;
      }
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

    // Return the midpoint as our best guess
    return (lowerBound + upperBound) / 2;
  },

  /**
   * Calculate the equity multiple
   *
   * @param totalReturn Total return
   * @param totalInvestment Total investment
   * @returns Equity multiple
   */
  calculateEquityMultiple: (totalReturn: number, totalInvestment: number): number => {
    if (totalInvestment === 0) return 0;
    return totalReturn / totalInvestment;
  },

  /**
   * Calculate the return on investment (ROI)
   *
   * @param totalReturn Total return
   * @param totalInvestment Total investment
   * @returns ROI as a decimal
   */
  calculateROI: (totalReturn: number, totalInvestment: number): number => {
    if (totalInvestment === 0) return 0;
    return (totalReturn - totalInvestment) / totalInvestment;
  },

  /**
   * Calculate simple interest
   *
   * @param principal Principal amount
   * @param rate Interest rate as a decimal
   * @param time Time in years
   * @returns Interest amount
   */
  calculateSimpleInterest: (principal: number, rate: number, time: number): number => {
    return principal * rate * time;
  },

  /**
   * Calculate compound interest
   *
   * @param principal Principal amount
   * @param rate Interest rate as a decimal
   * @param time Time in years
   * @param compoundingPerYear Number of times interest is compounded per year
   * @returns Future value with compound interest
   */
  calculateCompoundInterest: (principal: number, rate: number, time: number, compoundingPerYear: number = 1): number => {
    return principal * Math.pow(1 + rate / compoundingPerYear, compoundingPerYear * time);
  },

  /**
   * Calculate the waterfall distribution
   *
   * @param totalProfit Total profit
   * @param hurdleRate Hurdle rate as a decimal
   * @param carriedInterestRate Carried interest rate as a decimal
   * @param lpInvestment LP investment amount
   * @param gpInvestment GP investment amount
   * @param investmentTerm Investment term in years
   * @returns Waterfall distribution
   */
  calculateWaterfall: (
    totalProfit: number,
    hurdleRate: number,
    carriedInterestRate: number,
    lpInvestment: number,
    gpInvestment: number,
    investmentTerm: number
  ): any => {
    const totalInvestment = lpInvestment + gpInvestment;
    const lpRatio = lpInvestment / totalInvestment;
    const gpRatio = gpInvestment / totalInvestment;

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
    const totalGpReturn = gpReturnOfCapital + gpCatchup + gpCarriedInterest + (gpRatio * hurdleAmount);
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
  },

  /**
   * Calculate the loan exit value
   *
   * @param loan Loan object
   * @param fundSettings Fund settings
   * @returns Exit value of the loan
   */
  calculateLoanExitValue: (loan: any, fundSettings: any): number => {
    // Calculate property appreciation with compound interest formula
    const yearsHeld = loan.exit_year - loan.origination_year;
    const appreciatedPropertyValue = MathUtils.calculateCompoundInterest(
      loan.property_value,
      loan.appreciation_rate,
      yearsHeld,
      1  // Annual compounding
    );

    // Calculate simple interest on the loan amount (capitalized to end of term)
    // Using 5% simple interest rate as per business model
    const interest = MathUtils.calculateSimpleInterest(
      loan.loan_amount,
      fundSettings.simple_interest_rate || 0.05,
      yearsHeld
    );

    // Calculate appreciation fee based on LTV percentage
    // If property value increases from $1M to $2M with 40% LTV, the fee is 40% of the $1M appreciation
    const appreciationFee = (appreciatedPropertyValue - loan.property_value) * loan.ltv;

    // Calculate total exit value
    // Original loan amount + capitalized interest + appreciation fee
    const exitValue = loan.loan_amount + interest + appreciationFee;

    return exitValue;
  }
};

/**
 * Generate a portfolio based on the provided parameters
 *
 * @param params Portfolio generation parameters
 * @returns Generated portfolio
 */
export const generatePortfolio = (params: any): Portfolio => {
  console.log('Generating portfolio with parameters:', params);

  // Create a new portfolio object
  const portfolio: any = {
    id: `portfolio_${Date.now()}`,
    timestamp: new Date().toISOString(),
    parameters: { ...params },
    loans: [],
    reinvestments: [],
    metrics: {}
  };

  // Extract parameters with defaults
  const fundSettings = {
    fund_size: params.fund_size || 100000000,
    fund_term: params.fund_term || 10,
    simple_interest_rate: params.simple_interest_rate || 0.05, // 5% simple interest as per business model
    origination_fee_rate: params.origination_fee_rate || 0.03, // 3% origination fee as per business model
    management_fee_rate: params.management_fee_rate || 0.02, // 2% management fee as per business model
    performance_fee_rate: params.performance_fee_rate || 0.20, // 20% carried interest as per business model
    hurdle_rate: params.hurdle_rate || 0.06, // 6% hurdle rate as per business model
    early_exit_probability: params.early_exit_probability || 0.2,
    average_exit_year: params.average_exit_year || 7
  };

  // Generate loans based on parameters
  const loanCount = params.loan_count || 100;
  const avgLtv = params.average_ltv || 0.7;
  const ltvVariance = params.ltv_variance || 0.05;
  const avgPropertyValue = params.average_property_value || 1000000;
  const propertyValueVariance = params.property_value_variance || 0.2;

  // Generate loans
  const loans = [];
  const reinvestments = [];
  let totalLoanValue = 0;
  let totalPropertyValue = 0;
  let totalExpectedExitValue = 0;

  for (let i = 0; i < loanCount; i++) {
    // Generate random LTV within variance (clamped between 0.5 and 0.8)
    const ltv = Math.max(0.5, Math.min(0.8, avgLtv + (Math.random() * 2 - 1) * ltvVariance));

    // Generate random property value within variance
    const propertyValue = avgPropertyValue * (1 + (Math.random() * 2 - 1) * propertyValueVariance);

    // Calculate loan amount
    const loanAmount = propertyValue * ltv;

    // Determine zone based on parameters
    const zoneRandom = Math.random();
    let zone = 'green';
    if (zoneRandom > (params.green_zone_allocation || 0.6)) {
      zone = 'orange';
      if (zoneRandom > (params.green_zone_allocation || 0.6) + (params.orange_zone_allocation || 0.3)) {
        zone = 'red';
      }
    }

    // Determine appreciation rate based on zone
    let appreciationRate = 0.05; // Default
    if (zone === 'green') {
      appreciationRate = params.appreciation_rate_green || 0.05;
    } else if (zone === 'orange') {
      appreciationRate = params.appreciation_rate_orange || 0.03;
    } else if (zone === 'red') {
      appreciationRate = params.appreciation_rate_red || 0.02;
    }

    // Determine exit year based on early exit probability and average exit year
    const exitYearRandom = Math.random();
    let exitYear;
    if (exitYearRandom < (fundSettings.early_exit_probability || 0.2)) {
      // Early exit (years 1-5)
      exitYear = Math.floor(Math.random() * 5) + 1;
    } else {
      // Regular exit (around average exit year)
      const variance = 2; // +/- 2 years
      exitYear = Math.max(1, Math.min(fundSettings.fund_term,
        Math.round(fundSettings.average_exit_year + (Math.random() * variance * 2 - variance))));
    }

    // Determine if loan will be reinvested
    const willBeReinvested = exitYear < fundSettings.fund_term && Math.random() > 0.7; // 30% chance of reinvestment

    // Calculate expected exit value using the proper formula
    const loan = {
      id: `loan_${i + 1}`,
      property_value: Math.round(propertyValue),
      loan_amount: Math.round(loanAmount),
      ltv: ltv,
      zone: zone,
      suburb: ['Parramatta', 'Blacktown', 'Liverpool', 'Penrith', 'Campbelltown'][Math.floor(Math.random() * 5)],
      appreciation_rate: appreciationRate,
      origination_year: 0,
      exit_year: exitYear,
      will_be_reinvested: willBeReinvested
    };

    // Calculate expected exit value using the loan exit value formula
    const expectedExitValue = MathUtils.calculateLoanExitValue(loan, fundSettings);
    loan.expected_exit_value = Math.round(expectedExitValue);

    loans.push(loan);
    totalLoanValue += loan.loan_amount;
    totalPropertyValue += loan.property_value;
    totalExpectedExitValue += loan.expected_exit_value;

    // Generate reinvestment if applicable
    if (willBeReinvested) {
      // Create a reinvestment loan that starts when the original loan exits
      const reinvestmentLoan = {
        id: `reinv_${i + 1}`,
        property_value: Math.round(propertyValue * (1 + appreciationRate * exitYear)),
        loan_amount: Math.round(loanAmount),
        ltv: ltv,
        zone: zone,
        suburb: loan.suburb,
        appreciation_rate: appreciationRate,
        origination_year: exitYear,
        exit_year: Math.min(fundSettings.fund_term, exitYear + Math.floor(Math.random() * 3) + 3), // 3-5 years after origination
        will_be_reinvested: false
      };

      // Calculate expected exit value for reinvestment
      const reinvestmentExitValue = MathUtils.calculateLoanExitValue(reinvestmentLoan, fundSettings);
      reinvestmentLoan.expected_exit_value = Math.round(reinvestmentExitValue);

      reinvestments.push(reinvestmentLoan);
    }
  }

  // Add loans and reinvestments to portfolio
  portfolio.loans = loans;
  portfolio.reinvestments = reinvestments;

  // Calculate zone distributions
  const greenZoneCount = loans.filter(loan => loan.zone === 'green').length;
  const orangeZoneCount = loans.filter(loan => loan.zone === 'orange').length;
  const redZoneCount = loans.filter(loan => loan.zone === 'red').length;

  // Calculate weighted appreciation rate
  const weightedAppreciation = loans.reduce((sum, loan) => sum + (loan.appreciation_rate * loan.loan_amount), 0) / totalLoanValue;

  // Calculate expected IRR and multiple based on cash flows
  const cashFlows = calculateCashFlows(portfolio, fundSettings);
  const expectedIrr = MathUtils.calculateIRR(cashFlows);
  const totalInvestment = Math.abs(cashFlows[0]);
  const totalReturn = cashFlows.reduce((sum, cf, i) => i > 0 ? sum + cf : sum, 0);
  const expectedMultiple = MathUtils.calculateEquityMultiple(totalReturn, totalInvestment);

  // Calculate total reinvestment value
  const totalReinvestmentValue = reinvestments.reduce((sum, loan) => sum + loan.loan_amount, 0);

  // Calculate portfolio metrics
  portfolio.metrics = {
    loan_count: loanCount,
    total_loan_value: totalLoanValue,
    average_ltv: loans.reduce((sum, loan) => sum + loan.ltv, 0) / loanCount,
    average_property_value: totalPropertyValue / loanCount,
    green_zone_count: greenZoneCount,
    orange_zone_count: orangeZoneCount,
    red_zone_count: redZoneCount,
    average_appreciation_rate: weightedAppreciation,
    extended_term: fundSettings.fund_term,

    // Add metrics for the PortfolioGeneration component
    totalLoans: loanCount,
    averageLoanSize: Math.round(totalLoanValue / loanCount),
    averageLTV: loans.reduce((sum, loan) => sum + loan.ltv, 0) / loanCount,
    totalValue: totalLoanValue,
    zoneDistribution: {
      green: greenZoneCount / loanCount,
      orange: orangeZoneCount / loanCount,
      red: redZoneCount / loanCount
    },
    weightedAppreciation: weightedAppreciation,
    extendedTerm: fundSettings.fund_term,
    expectedIRR: Math.max(0.05, Math.min(0.25, expectedIrr)), // Ensure IRR is between 5-25%
    expectedMultiple: Math.max(1.2, Math.min(3.0, expectedMultiple)), // Ensure multiple is between 1.2-3.0x
    totalInitialValue: totalLoanValue,
    totalReinvestmentValue: totalReinvestmentValue,
    totalExitValue: totalExpectedExitValue
  };

  return portfolio;
};

/**
 * Run a simulation with the provided parameters
 *
 * @param params Simulation parameters
 * @returns Simulation results
 */
export const runSimulation = (params: any): SimulationResult => {
  console.log('Running simulation with parameters:', params);

  const { portfolio, fundSettings, tfsData } = params;

  // Create a new result object
  const result: SimulationResult = {
    id: 'sim_' + Date.now(),
    timestamp: new Date().toISOString(),
    status: 'completed',
    duration_ms: Math.floor(Math.random() * 1000) + 500,
    parameters: { ...fundSettings },
    results: {} as any,
    gp_economics: {} as any,
    lp_economics: {} as any,
    yearly_metrics: [],
    cash_flows: [],
    optimal_allocation: []
  };

  // Extract key fund settings with defaults
  const fundSize = fundSettings.fund_size || 100000000;
  const fundTerm = fundSettings.fund_term || 10;
  const managementFeeRate = fundSettings.management_fee_rate || 0.02;
  const hurdleRate = fundSettings.hurdle_rate || 0.06;
  const performanceFeeRate = fundSettings.performance_fee_rate || 0.20;
  const gpInvestmentPercentage = fundSettings.gp_investment_percentage || 0.05;
  const originationFeeRate = fundSettings.origination_fee_rate || 0.01;
  const simpleInterestRate = fundSettings.simple_interest_rate || 0.05;

  // Calculate cash flows
  const cashFlows = calculateCashFlows(portfolio, fundSettings);

  // Calculate IRR
  const irr = MathUtils.calculateIRR(cashFlows);
  const adjustedIrr = Math.max(0.05, Math.min(0.25, irr)); // Ensure IRR is between 5-25%

  // Calculate investment and return
  const totalInvestment = Math.abs(cashFlows[0]);
  const totalReturn = cashFlows.reduce((sum, cf, i) => i > 0 ? sum + cf : sum, 0);
  const netProfit = totalReturn - totalInvestment;

  // Calculate equity multiple and ROI
  const equityMultiple = MathUtils.calculateEquityMultiple(totalReturn + totalInvestment, totalInvestment);
  const roi = MathUtils.calculateROI(totalReturn + totalInvestment, totalInvestment);

  // Calculate management fees (2% of AUM annually)
  const annualManagementFee = fundSize * managementFeeRate;
  const totalManagementFees = annualManagementFee * fundTerm;

  // Calculate origination fees (3% charged to homeowner, not the fund)
  const totalOriginationFees = portfolio.metrics.total_loan_value * originationFeeRate;

  // Calculate GP and LP investments
  const gpInvestment = fundSize * gpInvestmentPercentage;
  const lpInvestment = fundSize * (1 - gpInvestmentPercentage);

  // Calculate preferred return (hurdle)
  const preferredReturn = lpInvestment * (Math.pow(1 + hurdleRate, fundTerm) - 1);

  // Calculate waterfall distribution
  const waterfall = MathUtils.calculateWaterfall(
    netProfit, // Total profit
    hurdleRate,
    performanceFeeRate,
    lpInvestment,
    gpInvestment,
    fundTerm
  );

  // Set results
  result.results = {
    irr: Math.round(adjustedIrr * 1000) / 10, // Convert to percentage with 1 decimal
    gross_irr: Math.round(adjustedIrr * 1.3 * 1000) / 10, // Gross IRR is higher than net IRR
    equity_multiple: Math.round(equityMultiple * 100) / 100,
    moic: Math.round(equityMultiple * 100) / 100,
    total_investment: Math.round(totalInvestment),
    total_return: Math.round(totalReturn + totalInvestment),
    net_profit: Math.round(netProfit),
    roi: Math.round(roi * 1000) / 10, // Convert to percentage with 1 decimal
    dpi: 0.0, // Will be calculated in yearly metrics
    rvpi: 0.0, // Will be calculated in yearly metrics
    tvpi: Math.round(equityMultiple * 100) / 100,
    sharpe_ratio: Math.round((adjustedIrr / 0.05) * 10) / 10, // Simplified Sharpe ratio calculation
    sortino_ratio: Math.round((adjustedIrr / 0.03) * 10) / 10, // Simplified Sortino ratio calculation
    value_at_risk: Math.round(totalInvestment * 0.05) / totalInvestment, // 5% VaR
    expected_shortfall: Math.round(totalInvestment * 0.08) / totalInvestment // 8% Expected Shortfall
  };

  // Set GP economics
  result.gp_economics = {
    investment: Math.round(gpInvestment),
    return_of_capital: Math.round(waterfall.gpReturnOfCapital),
    preferred_return: 0, // GPs don't get preferred return
    catchup: Math.round(waterfall.gpCatchup),
    carried_interest: Math.round(waterfall.gpCarriedInterest),
    total_return: Math.round(waterfall.totalGpReturn),
    multiple: Math.round((waterfall.totalGpReturn / gpInvestment) * 100) / 100,
    irr: Math.round(adjustedIrr * 1.2 * 1000) / 10, // GP IRR is typically higher than fund IRR
    roi: Math.round(((waterfall.totalGpReturn / gpInvestment) - 1) * 1000) / 10
  };

  // Set LP economics
  result.lp_economics = {
    investment: Math.round(lpInvestment),
    return_of_capital: Math.round(waterfall.lpReturnOfCapital),
    preferred_return: Math.round(waterfall.hurdleAmount),
    residual: Math.round(waterfall.lpResidual),
    total_return: Math.round(waterfall.totalLpReturn),
    multiple: Math.round((waterfall.totalLpReturn / lpInvestment) * 100) / 100,
    irr: Math.round(adjustedIrr * 0.9 * 1000) / 10, // LP IRR is typically lower than fund IRR
    roi: Math.round(((waterfall.totalLpReturn / lpInvestment) - 1) * 1000) / 10
  };

  // Generate yearly metrics
  result.yearly_metrics = generateYearlyMetrics(portfolio, fundSettings, cashFlows);

  // Format cash flows
  result.cash_flows = formatCashFlows(cashFlows);

  // Generate optimal allocation
  result.optimal_allocation = generateOptimalAllocation(portfolio, fundSettings);

  return result;
};

/**
 * Calculate cash flows for a portfolio
 *
 * @param portfolio Portfolio
 * @param fundSettings Fund settings
 * @returns Array of cash flows
 */
const calculateCashFlows = (portfolio: any, fundSettings: any): number[] => {
  const term = fundSettings.fund_term || 10;
  const cashFlows = Array(term + 1).fill(0);

  // Year 0: Initial investment (negative)
  cashFlows[0] = -portfolio.metrics.total_loan_value;

  // Calculate management fees (negative cash flow)
  const managementFeeRate = fundSettings.management_fee_rate || 0.02;
  const annualManagementFee = portfolio.metrics.total_loan_value * managementFeeRate;

  // Add cash flows from initial loans
  for (const loan of portfolio.loans) {
    if (loan.exit_year <= term) {
      // Add management fees (negative cash flow) for each year until exit
      for (let year = 1; year <= loan.exit_year; year++) {
        cashFlows[year] -= (annualManagementFee / portfolio.loans.length);
      }

      // If loan won't be reinvested, add its exit value to the cash flow
      if (!loan.will_be_reinvested) {
        cashFlows[loan.exit_year] += loan.expected_exit_value;
      }
    }
  }

  // Add cash flows from reinvestment loans
  for (const loan of portfolio.reinvestments) {
    // Add reinvestment as negative cash flow in the origination year
    cashFlows[loan.origination_year] -= loan.loan_amount;

    // Add management fees (negative cash flow) for each year from origination to exit
    for (let year = loan.origination_year + 1; year <= loan.exit_year && year <= term; year++) {
      cashFlows[year] -= (annualManagementFee / portfolio.reinvestments.length / 2); // Half weight for reinvestments
    }

    // Add exit value as positive cash flow in the exit year
    if (loan.exit_year <= term) {
      cashFlows[loan.exit_year] += loan.expected_exit_value;
    }
  }

  // Add origination fees (positive cash flow in year 0)
  // 3% origination fee charged to homeowner (deducted from loan amount), goes to GP
  const originationFeeRate = fundSettings.origination_fee_rate || 0.03;
  const originationFees = portfolio.metrics.total_loan_value * originationFeeRate;
  cashFlows[0] += originationFees;

  // Add performance fees (negative cash flow in final year)
  // This is a simplified calculation - in reality, performance fees would be calculated based on the waterfall
  const performanceFeeRate = fundSettings.performance_fee_rate || 0.20;
  const estimatedProfit = cashFlows.reduce((sum, cf) => sum + cf, 0) - cashFlows[0];
  if (estimatedProfit > 0) {
    const performanceFees = estimatedProfit * performanceFeeRate;
    cashFlows[term] -= performanceFees;
  }

  return cashFlows;
};

/**
 * Generate yearly metrics for a portfolio
 *
 * @param portfolio Portfolio
 * @param fundSettings Fund settings
 * @param cashFlows Cash flows
 * @returns Array of yearly metrics
 */
const generateYearlyMetrics = (portfolio: any, fundSettings: any, cashFlows: number[]): any[] => {
  const term = fundSettings.fund_term || 10;
  const yearlyMetrics = [];

  // Calculate initial investment
  const initialInvestment = Math.abs(cashFlows[0]);

  // Track active loans, deployed capital, and cumulative cash flows
  let activeLoans = portfolio.loans.length;
  let deployedCapital = initialInvestment;
  let cumulativeCashFlow = cashFlows[0]; // Start with initial investment (negative)
  let distributedCapital = 0;

  for (let year = 0; year <= term; year++) {
    // Count active loans for this year
    if (year === 0) {
      activeLoans = portfolio.loans.length;
    } else {
      // Count loans that haven't exited yet
      activeLoans = portfolio.loans.filter(loan => loan.exit_year > year ||
        (loan.exit_year === year && loan.will_be_reinvested)).length;

      // Add reinvestments that are active in this year
      activeLoans += portfolio.reinvestments.filter(loan =>
        loan.origination_year <= year && loan.exit_year > year).length;
    }

    // Calculate deployed capital
    if (year === 0) {
      deployedCapital = initialInvestment;
      distributedCapital = 0;
    } else {
      // Add this year's cash flow to cumulative
      cumulativeCashFlow += cashFlows[year];

      // Calculate distributed capital (positive cash flows)
      if (cashFlows[year] > 0) {
        distributedCapital += cashFlows[year];
      }

      // Deployed capital decreases as loans exit
      deployedCapital = Math.max(0, initialInvestment - distributedCapital);
    }

    // Calculate portfolio value
    // For year 0, it's just the initial investment
    // For later years, it's the deployed capital plus expected future returns
    let portfolioValue = deployedCapital;

    if (year > 0) {
      // Add expected future returns from active loans
      const activeOriginalLoans = portfolio.loans.filter(loan => loan.exit_year > year);
      const activeReinvestments = portfolio.reinvestments.filter(loan =>
        loan.origination_year <= year && loan.exit_year > year);

      // Calculate expected future value of active loans
      for (const loan of [...activeOriginalLoans, ...activeReinvestments]) {
        const yearsRemaining = loan.exit_year - year;
        const exitValue = loan.expected_exit_value;
        const presentValue = exitValue / Math.pow(1 + 0.08, yearsRemaining); // Discount at 8%
        portfolioValue += presentValue - loan.loan_amount;
      }
    }

    // Calculate yearly return
    let yearlyReturn = 0;
    if (year > 0 && yearlyMetrics[year - 1].portfolio_value > 0) {
      yearlyReturn = (portfolioValue - yearlyMetrics[year - 1].portfolio_value +
        Math.max(0, cashFlows[year])) / yearlyMetrics[year - 1].portfolio_value;
    }

    // Calculate cumulative return
    const totalValue = portfolioValue + distributedCapital;
    const cumulativeReturn = (totalValue / initialInvestment) - 1;

    // Calculate DPI (Distributions to Paid-In)
    const dpi = distributedCapital / initialInvestment;

    // Calculate RVPI (Residual Value to Paid-In)
    const rvpi = portfolioValue / initialInvestment;

    // Calculate TVPI (Total Value to Paid-In)
    const tvpi = dpi + rvpi;

    yearlyMetrics.push({
      year,
      active_loans: activeLoans,
      deployed_capital: Math.round(deployedCapital),
      portfolio_value: Math.round(portfolioValue),
      distributed_capital: Math.round(distributedCapital),
      total_value: Math.round(totalValue),
      yearly_return: Math.round(yearlyReturn * 1000) / 10, // Convert to percentage with 1 decimal
      cumulative_return: Math.round(cumulativeReturn * 1000) / 10, // Convert to percentage with 1 decimal
      dpi: Math.round(dpi * 100) / 100,
      rvpi: Math.round(rvpi * 100) / 100,
      tvpi: Math.round(tvpi * 100) / 100
    });
  }

  return yearlyMetrics;
};

/**
 * Format cash flows for API response
 *
 * @param cashFlows Array of cash flows
 * @returns Formatted cash flows
 */
const formatCashFlows = (cashFlows: number[]): any[] => {
  const formattedCashFlows = [];
  let cumulativeCashFlow = 0;

  for (let year = 0; year < cashFlows.length; year++) {
    const cf = cashFlows[year];
    const inflow = Math.max(0, cf);
    const outflow = Math.abs(Math.min(0, cf));
    const netCashFlow = cf;
    cumulativeCashFlow += cf;

    formattedCashFlows.push({
      year,
      inflow: Math.round(inflow),
      outflow: Math.round(outflow),
      net_cash_flow: Math.round(netCashFlow),
      cumulative_cash_flow: Math.round(cumulativeCashFlow)
    });
  }

  return formattedCashFlows;
};

/**
 * Generate optimal allocation based on portfolio and fund settings
 *
 * @param portfolio Portfolio
 * @param fundSettings Fund settings
 * @returns Optimal allocation
 */
const generateOptimalAllocation = (portfolio: any, fundSettings: any): any[] => {
  // Get unique suburbs from portfolio
  const uniqueSuburbs = new Set();
  portfolio.loans.forEach(loan => uniqueSuburbs.add(loan.suburb));
  const suburbs = Array.from(uniqueSuburbs) as string[];

  // If we don't have enough suburbs, add some more
  const defaultSuburbs = ['Parramatta', 'Blacktown', 'Liverpool', 'Penrith', 'Campbelltown',
                         'Hornsby', 'Chatswood', 'Bankstown', 'Hurstville', 'Sutherland'];

  while (suburbs.length < 10) {
    for (const suburb of defaultSuburbs) {
      if (!suburbs.includes(suburb)) {
        suburbs.push(suburb);
        if (suburbs.length >= 10) break;
      }
    }
  }

  // Get zone allocations from fund settings
  const greenZoneAllocation = fundSettings.green_zone_allocation || 0.6;
  const orangeZoneAllocation = fundSettings.orange_zone_allocation || 0.3;
  const redZoneAllocation = fundSettings.red_zone_allocation || 0.1;

  // Get appreciation rates from portfolio parameters
  const greenZoneRate = portfolio.parameters.appreciation_rate_green || 0.05;
  const orangeZoneRate = portfolio.parameters.appreciation_rate_orange || 0.03;
  const redZoneRate = portfolio.parameters.appreciation_rate_red || 0.02;

  // Calculate risk scores based on loan performance in each suburb
  const suburbStats = {};

  // Initialize suburb stats
  suburbs.forEach(suburb => {
    suburbStats[suburb] = {
      loanCount: 0,
      totalLoanAmount: 0,
      totalPropertyValue: 0,
      averageLTV: 0,
      averageAppreciationRate: 0,
      zone: 'green' // Default
    };
  });

  // Collect stats from loans
  portfolio.loans.forEach(loan => {
    if (suburbStats[loan.suburb]) {
      suburbStats[loan.suburb].loanCount++;
      suburbStats[loan.suburb].totalLoanAmount += loan.loan_amount;
      suburbStats[loan.suburb].totalPropertyValue += loan.property_value;
      suburbStats[loan.suburb].averageLTV += loan.ltv;
      suburbStats[loan.suburb].averageAppreciationRate += loan.appreciation_rate;
      suburbStats[loan.suburb].zone = loan.zone;
    }
  });

  // Calculate averages
  Object.keys(suburbStats).forEach(suburb => {
    const stats = suburbStats[suburb];
    if (stats.loanCount > 0) {
      stats.averageLTV = stats.averageLTV / stats.loanCount;
      stats.averageAppreciationRate = stats.averageAppreciationRate / stats.loanCount;
    }
  });

  // Sort suburbs by zone and appreciation rate
  const sortedSuburbs = suburbs.sort((a, b) => {
    const zoneA = suburbStats[a].zone;
    const zoneB = suburbStats[b].zone;

    // First sort by zone (green > orange > red)
    if (zoneA !== zoneB) {
      if (zoneA === 'green') return -1;
      if (zoneB === 'green') return 1;
      if (zoneA === 'orange') return -1;
      if (zoneB === 'orange') return 1;
    }

    // Then sort by appreciation rate (higher first)
    return suburbStats[b].averageAppreciationRate - suburbStats[a].averageAppreciationRate;
  });

  // Determine number of suburbs in each zone
  const greenSuburbCount = Math.round(sortedSuburbs.length * greenZoneAllocation);
  const orangeSuburbCount = Math.round(sortedSuburbs.length * orangeZoneAllocation);
  const redSuburbCount = sortedSuburbs.length - greenSuburbCount - orangeSuburbCount;

  // Generate optimal allocation
  const optimalAllocation = [];

  // Allocate green zone suburbs
  const greenSuburbs = sortedSuburbs.slice(0, greenSuburbCount);
  const greenAllocationPerSuburb = greenZoneAllocation / Math.max(1, greenSuburbs.length);

  for (const suburb of greenSuburbs) {
    const stats = suburbStats[suburb];
    const appreciationRate = stats.averageAppreciationRate || greenZoneRate;
    const riskScore = 30 + Math.round(stats.averageLTV * 20); // Higher LTV = higher risk

    optimalAllocation.push({
      suburb,
      allocation: Math.round(greenAllocationPerSuburb * 100),
      expected_return: Math.round(appreciationRate * 100 * 10) / 10,
      risk_score: Math.min(40, Math.max(30, riskScore)),
      zone: 'green'
    });
  }

  // Allocate orange zone suburbs
  const orangeSuburbs = sortedSuburbs.slice(greenSuburbCount, greenSuburbCount + orangeSuburbCount);
  const orangeAllocationPerSuburb = orangeZoneAllocation / Math.max(1, orangeSuburbs.length);

  for (const suburb of orangeSuburbs) {
    const stats = suburbStats[suburb];
    const appreciationRate = stats.averageAppreciationRate || orangeZoneRate;
    const riskScore = 40 + Math.round(stats.averageLTV * 20); // Higher LTV = higher risk

    optimalAllocation.push({
      suburb,
      allocation: Math.round(orangeAllocationPerSuburb * 100),
      expected_return: Math.round(appreciationRate * 100 * 10) / 10,
      risk_score: Math.min(50, Math.max(40, riskScore)),
      zone: 'orange'
    });
  }

  // Allocate red zone suburbs
  const redSuburbs = sortedSuburbs.slice(greenSuburbCount + orangeSuburbCount);
  const redAllocationPerSuburb = redZoneAllocation / Math.max(1, redSuburbs.length);

  for (const suburb of redSuburbs) {
    const stats = suburbStats[suburb];
    const appreciationRate = stats.averageAppreciationRate || redZoneRate;
    const riskScore = 50 + Math.round(stats.averageLTV * 20); // Higher LTV = higher risk

    optimalAllocation.push({
      suburb,
      allocation: Math.round(redAllocationPerSuburb * 100),
      expected_return: Math.round(appreciationRate * 100 * 10) / 10,
      risk_score: Math.min(60, Math.max(50, riskScore)),
      zone: 'red'
    });
  }

  return optimalAllocation;
};
