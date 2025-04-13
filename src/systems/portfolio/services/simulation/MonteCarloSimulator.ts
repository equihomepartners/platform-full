/**
 * Monte Carlo Simulator for Portfolio Optimization
 *
 * This module implements Monte Carlo simulations to find the efficient frontier
 * according to Modern Portfolio Theory.
 */

export interface SimulationParameters {
  // Fund parameters
  fundSize: number;
  fundTerm: number;
  managementFeeRate: number;
  hurdleRate: number;
  performanceFeeRate: number;
  originationFeeRate: number;
  simpleInterestRate: number;
  gpInvestmentPercentage: number;

  // Loan parameters
  averagePropertyValue: number;
  averageLTV: number;
  averageAppreciationRate: number;
  averageExitTimeframe: number;

  // Advanced parameters
  numberOfLoans: number;
  capitalRecyclingEnabled: boolean;
  capitalRecyclingPercentage: number;
  numberOfSimulations: number;

  // Portfolio volatility control parameters
  loanAmountVolatility?: number;
  ltvVolatility?: number;
  exitTimeframeVolatility?: number;
  appreciationRateVolatility?: number;

  // Tranche parameters
  enableTranches: boolean;
  seniorTranchePercentage: number;
  seniorTrancheRate: number;
  mezTranchePercentage: number;
  mezTrancheRate: number;
  equityTranchePercentage: number;
}

export interface SimulationResult {
  irr: number;
  roi: number;
  equityMultiple: number;
  totalReturn: number;
  totalProfit: number;
  sharpeRatio: number;
  maxDrawdown: number;
  successProbability: number;
  portfolio: any;
  cashflows: number[];
  yearlyNav: any[];
  trancheReturns?: {
    senior: {
      irr: number;
      totalReturn: number;
    };
    mezzanine: {
      irr: number;
      totalReturn: number;
    };
    equity: {
      irr: number;
      totalReturn: number;
    };
  };
}

export interface EfficientFrontierPoint {
  risk: number;
  return: number;
  portfolioAllocation: any;
}

export class MonteCarloSimulator {
  private parameters: SimulationParameters;

  constructor(parameters: SimulationParameters) {
    this.parameters = parameters;
  }

  /**
   * Run a single simulation with the current parameters
   */
  public runSimulation(): SimulationResult {
    // Log the parameters for debugging
    console.log('MonteCarloSimulator - Running with parameters:', {
      fundSize: this.parameters.fundSize,
      fundTerm: this.parameters.fundTerm,
      gpInvestmentPercentage: this.parameters.gpInvestmentPercentage,
      capitalRecyclingEnabled: this.parameters.capitalRecyclingEnabled,
      capitalRecyclingPercentage: this.parameters.capitalRecyclingPercentage,
      numberOfLoans: this.parameters.numberOfLoans
    });

    // Generate a portfolio of loans
    const portfolio = this.generatePortfolio();

    // Calculate detailed cashflows and IRR cashflows
    const { detailedCashflows, irrCashflows } = this.calculateDetailedCashflows(portfolio);

    // Calculate NAV progression
    const yearlyNav = this.calculateYearlyNAV(portfolio);

    // Log the portfolio and cashflows for debugging
    console.log('MonteCarloSimulator - Generated portfolio:', {
      totalLoans: portfolio.loans.length,
      recycledLoans: portfolio.loans.filter(loan => loan.isRecycled).length,
      initialLoans: portfolio.loans.filter(loan => !loan.isRecycled).length,
      metrics: portfolio.metrics,
      sampleLoans: portfolio.loans.slice(0, 5)
    });

    console.log('MonteCarloSimulator - Generated cashflows:', {
      length: irrCashflows.length,
      sample: irrCashflows.slice(0, 5)
    });

    // Calculate IRR
    const irr = this.calculateIRR(irrCashflows);

    // Calculate other metrics
    const totalReturn = this.calculateTotalReturn(irrCashflows);
    const totalProfit = totalReturn - this.parameters.fundSize;
    const roi = totalProfit / this.parameters.fundSize;
    const equityMultiple = totalReturn / this.parameters.fundSize;

    // Calculate GP and LP investments
    const gpInvestment = this.parameters.fundSize * this.parameters.gpInvestmentPercentage;
    const lpInvestment = this.parameters.fundSize * (1 - this.parameters.gpInvestmentPercentage);

    // Calculate risk metrics
    const sharpeRatio = this.calculateSharpeRatio(roi, irrCashflows);
    const maxDrawdown = this.calculateMaxDrawdown(yearlyNav);
    const successProbability = this.calculateSuccessProbability(irr);

    // Calculate tranche returns if enabled
    let trancheReturns;
    if (this.parameters.enableTranches) {
      trancheReturns = this.calculateTrancheReturns(irrCashflows);
    }

    // Create the result object
    const result = {
      irr,
      roi,
      equityMultiple,
      totalReturn,
      totalProfit,
      sharpeRatio,
      maxDrawdown,
      successProbability,
      portfolio,
      cashflows: irrCashflows,
      detailedCashflows,
      yearlyNav,
      trancheReturns,
      gpInvestment,
      lpInvestment,
      capitalRecyclingEnabled: this.parameters.capitalRecyclingEnabled,
      capitalRecyclingPercentage: this.parameters.capitalRecyclingPercentage
    };

    // Log the final result
    console.log('MonteCarloSimulator - Simulation result:', {
      irr,
      roi,
      equityMultiple,
      cashflowsLength: irrCashflows.length,
      gpInvestment,
      lpInvestment,
      capitalRecyclingEnabled: this.parameters.capitalRecyclingEnabled,
      recycledLoansCount: portfolio.loans.filter(loan => loan.isRecycled).length
    });

    return result;
  }

  /**
   * Run Monte Carlo simulations and return comprehensive results
   */
  public runMonteCarloSimulation(): {
    baseResult: SimulationResult,
    allResults: SimulationResult[],
    efficientFrontier: EfficientFrontierPoint[],
    optimizedResult: SimulationResult,
    correlations: Record<string, number>,
    sensitivityAnalysis: Record<string, any>
  } {
    // Run the base simulation first
    const baseResult = this.runSimulation();

    // Number of simulations to run
    const numSimulations = this.parameters.numberOfSimulations || 100;
    const results: SimulationResult[] = [];

    // Run multiple simulations with varying parameters
    for (let i = 0; i < numSimulations; i++) {
      // Vary parameters slightly for each simulation
      const variationParameters = this.varyParameters();

      // Create a new simulator with the varied parameters
      const simulator = new MonteCarloSimulator(variationParameters);

      // Run the simulation and store the result
      results.push(simulator.runSimulation());
    }

    // Calculate the efficient frontier
    const efficientFrontier = this.calculateEfficientFrontier(results);

    // Find the optimized result (highest Sharpe ratio)
    const optimizedResult = results.reduce((best, current) => {
      return current.sharpeRatio > best.sharpeRatio ? current : best;
    }, results[0]);

    // Calculate correlations between parameters and IRR
    const correlations = this.calculateCorrelations(results);

    // Perform sensitivity analysis
    const sensitivityAnalysis = this.performSensitivityAnalysis();

    return {
      baseResult,
      allResults: results,
      efficientFrontier,
      optimizedResult,
      correlations,
      sensitivityAnalysis
    };
  }

  /**
   * Run multiple simulations to find the efficient frontier
   */
  public findEfficientFrontier(): EfficientFrontierPoint[] {
    const numSimulations = this.parameters.numberOfSimulations || 100;
    const results: SimulationResult[] = [];

    // Run multiple simulations with varying parameters
    for (let i = 0; i < numSimulations; i++) {
      // Vary parameters slightly for each simulation
      const variationParameters = this.varyParameters();

      // Create a new simulator with the varied parameters
      const simulator = new MonteCarloSimulator(variationParameters);

      // Run the simulation and store the result
      results.push(simulator.runSimulation());
    }

    // Calculate the efficient frontier
    return this.calculateEfficientFrontier(results);
  }

  /**
   * Generate a portfolio of loans based on the parameters with high variance
   * and include capital recycling if enabled
   */
  private generatePortfolio() {
    const {
      fundSize,
      fundTerm,
      averagePropertyValue,
      averageLTV,
      averageAppreciationRate,
      averageExitTimeframe,
      numberOfLoans,
      capitalRecyclingEnabled,
      capitalRecyclingPercentage,
      originationFeeRate,
      simpleInterestRate
    } = this.parameters;

    // Calculate the number of loans based on fund size and average loan size if not specified
    const numLoans = numberOfLoans || Math.floor(fundSize / (averagePropertyValue * averageLTV));

    // Create exit year distribution (wider distribution around averageExitTimeframe)
    const exitYearDistribution: Record<number, number> = {};
    for (let year = 1; year <= fundTerm; year++) {
      exitYearDistribution[year] = 0;
    }

    // Create LTV buckets for distribution
    const ltvBuckets: Record<string, number> = {
      '0-20%': 0,
      '20-40%': 0,
      '40-60%': 0,
      '60-80%': 0
    };

    // Create property value buckets
    const propertyValueBuckets: Record<string, number> = {
      '0-1M': 0,
      '1-2M': 0,
      '2-3M': 0,
      '3M+': 0
    };

    // Zone distribution
    const zoneDistribution = {
      green: 0,
      orange: 0,
      red: 0
    };

    // Get volatility parameters with more realistic defaults
    const loanAmountVolatility = this.parameters.loanAmountVolatility || 0.2; // Default 20%
    const ltvVolatility = this.parameters.ltvVolatility || 0.15; // Default 15%
    const exitTimeframeVolatility = this.parameters.exitTimeframeVolatility || 1.5; // Default 1.5 years
    const appreciationRateVolatility = this.parameters.appreciationRateVolatility || 0.25; // Default 25%

    console.log('Using portfolio volatility parameters:', {
      loanAmountVolatility,
      ltvVolatility,
      exitTimeframeVolatility,
      appreciationRateVolatility
    });

    // Helper function to generate normally distributed random numbers
    const generateNormal = (mean: number, stdDev: number): number => {
      const u1 = Math.random();
      const u2 = Math.random();
      const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      return mean + z0 * stdDev;
    };

    // Helper function to create a skewed normal distribution
    const generateSkewedNormal = (mean: number, stdDev: number, skew: number = 0): number => {
      // Generate a normal random variable
      const normal = generateNormal(0, 1);

      // Apply skew transformation (modified from Azzalini's skew-normal distribution)
      const delta = skew / Math.sqrt(1 + skew * skew);
      const skewed = normal + delta * Math.abs(generateNormal(0, 1));

      // Scale and shift to desired mean and standard deviation
      return mean + stdDev * skewed;
    };

    // Helper function to generate a bimodal distribution
    const generateBimodal = (mean1: number, stdDev1: number, mean2: number, stdDev2: number, weight: number): number => {
      // Use weight to determine which mode to sample from
      if (Math.random() < weight) {
        return generateNormal(mean1, stdDev1);
      } else {
        return generateNormal(mean2, stdDev2);
      }
    };

    // Generate initial loans with more realistic distributions
    const initialLoans = Array.from({ length: numLoans }, (_, i) => {
      // Property value with skewed distribution (more lower-value properties, fewer high-value ones)
      // Use a right-skewed distribution for property values
      const propertyValueSkew = 1.5; // Positive skew means more mass on lower values, tail to the right
      const propertyValue = Math.max(300000, generateSkewedNormal(averagePropertyValue, averagePropertyValue * loanAmountVolatility, propertyValueSkew));

      // LTV with bimodal distribution (clusters around conservative and aggressive LTVs)
      // Many loans are either conservative (~30%) or aggressive (~60%)
      const conservativeLTV = averageLTV * 0.75; // e.g., 30% if average is 40%
      const aggressiveLTV = Math.min(0.75, averageLTV * 1.5); // e.g., 60% if average is 40%, capped at 75%
      const conservativeWeight = 0.6; // 60% of loans are conservative

      // Generate LTV using bimodal distribution
      const rawLtv = generateBimodal(conservativeLTV, ltvVolatility * conservativeLTV,
                                    aggressiveLTV, ltvVolatility * aggressiveLTV,
                                    conservativeWeight);

      // Ensure LTV is within reasonable bounds
      const ltv = Math.max(0.1, Math.min(0.8, rawLtv));

      // Calculate loan amount based on property value and LTV
      const loanAmount = propertyValue * ltv;

      // Appreciation rate varies by zone with controlled variance
      let appreciationRate;
      let zone;

      // Determine zone with more realistic distribution (35% green, 45% orange, 20% red)
      const zoneRand = Math.random();
      if (zoneRand < 0.35) {
        zone = 'green';
        // Green zone with controlled volatility (higher appreciation)
        const baseMultiplier = 1.25; // 25% higher than average
        // Use normal distribution for appreciation rate
        appreciationRate = generateNormal(averageAppreciationRate * baseMultiplier, averageAppreciationRate * appreciationRateVolatility);
        zoneDistribution.green++;
      } else if (zoneRand < 0.8) {
        zone = 'orange';
        // Orange zone with controlled volatility (average appreciation)
        const baseMultiplier = 1.0; // Same as average
        // Use normal distribution for appreciation rate
        appreciationRate = generateNormal(averageAppreciationRate * baseMultiplier, averageAppreciationRate * appreciationRateVolatility);
        zoneDistribution.orange++;
      } else {
        zone = 'red';
        // Red zone with controlled volatility (lower appreciation)
        const baseMultiplier = 0.75; // 25% lower than average
        // Use normal distribution for appreciation rate
        appreciationRate = generateNormal(averageAppreciationRate * baseMultiplier, averageAppreciationRate * appreciationRateVolatility);
        zoneDistribution.red++;
      }

      // Ensure appreciation rate is positive and has a reasonable upper bound
      appreciationRate = Math.max(0.005, Math.min(0.15, appreciationRate));

      // Exit year with more realistic distribution patterns
      // Use a mixture of distributions to create a realistic exit pattern

      // Create a trimodal distribution for exit years:
      // 1. Early exits (refinance in years 1-3)
      // 2. Mid-term exits (around the average exit timeframe)
      // 3. Late exits (hold until near fund term end)

      let exitYear;
      const exitDistributionRoll = Math.random();

      // 20% are early exits (years 1-3) - refinance or quick sale
      if (exitDistributionRoll < 0.2) {
        // Use a right-skewed distribution for early exits (more in year 2-3 than year 1)
        exitYear = Math.ceil(generateSkewedNormal(2, 0.8, -0.5));
        exitYear = Math.max(1, Math.min(3, exitYear));
      }
      // 60% are mid-term exits (clustered around average exit timeframe)
      else if (exitDistributionRoll < 0.8) {
        // Use a normal distribution with controlled standard deviation
        // But add some randomness to the mean to avoid too much clustering
        const adjustedMean = averageExitTimeframe + (Math.random() - 0.5) * 0.5;
        exitYear = Math.round(generateNormal(adjustedMean, exitTimeframeVolatility * 0.7));
      }
      // 20% are late exits (last 3 years of fund)
      else {
        // Use a left-skewed distribution for late exits (more in years 8-9 than year 10)
        const lateBase = Math.max(5, fundTerm - 3);
        exitYear = lateBase + Math.ceil(generateSkewedNormal(1.5, 0.8, 0.5));
      }

      // Apply zone-based adjustments to exit timeframe
      // Green zones tend to have faster exits
      if (zone === 'green' && exitYear > 2) {
        // Use a smaller adjustment based on volatility
        const adjustment = Math.floor(exitTimeframeVolatility * 0.7 * Math.random());
        exitYear = Math.max(1, exitYear - adjustment);
      }
      // Red zones tend to have slower exits
      else if (zone === 'red' && exitYear < fundTerm - 1) {
        // Use a smaller adjustment based on volatility
        const adjustment = Math.floor(exitTimeframeVolatility * 0.7 * Math.random());
        exitYear = Math.min(fundTerm, exitYear + adjustment);
      }

      // Ensure exit year is within fund term
      exitYear = Math.max(1, Math.min(fundTerm, exitYear));
      exitYearDistribution[exitYear]++;

      // Expected exit value based on compound appreciation over time
      const expectedExitValue = propertyValue * Math.pow(1 + appreciationRate, exitYear);

      // Update LTV buckets
      if (ltv <= 0.2) ltvBuckets['0-20%']++;
      else if (ltv <= 0.4) ltvBuckets['20-40%']++;
      else if (ltv <= 0.6) ltvBuckets['40-60%']++;
      else ltvBuckets['60-80%']++;

      // Update property value buckets
      if (propertyValue < 1000000) propertyValueBuckets['0-1M']++;
      else if (propertyValue < 2000000) propertyValueBuckets['1-2M']++;
      else if (propertyValue < 3000000) propertyValueBuckets['2-3M']++;
      else propertyValueBuckets['3M+']++;

      return {
        id: `MC-${i+1}`,
        property_value: propertyValue,
        loan_amount: loanAmount,
        ltv: ltv,
        appreciation_rate: appreciationRate,
        origination_year: 0, // Initial loans are originated at year 0
        exit_year: exitYear,
        expected_exit_value: expectedExitValue,
        zone,
        isRecycled: false // Flag to identify initial loans
      };
    });

    // If capital recycling is enabled, simulate the cashflows to generate recycled loans
    let allLoans = [...initialLoans];
    let recycledLoans: any[] = [];

    if (capitalRecyclingEnabled) {
      console.log('Capital recycling is enabled with parameters:', {
        capitalRecyclingPercentage: capitalRecyclingPercentage || 0.7,
        fundTerm,
        initialLoansCount: initialLoans.length
      });

      // Create a detailed cashflow model to track exits and recycling
      const detailedCashflows: Record<number, { inflows: number, outflows: number, principalRepayments: number }> = {};

      // Initialize cashflows for each year
      for (let year = 0; year <= fundTerm; year++) {
        detailedCashflows[year] = { inflows: 0, outflows: 0, principalRepayments: 0 };
      }

      // Year 0: Initial investment (negative cashflow)
      detailedCashflows[0].outflows = fundSize;

      // Year 0: Origination fees (positive cashflow)
      const initialOriginationFees = initialLoans.reduce((sum, loan) => sum + loan.loan_amount * originationFeeRate, 0);
      detailedCashflows[0].inflows += initialOriginationFees;

      // Process each year's cashflows
      for (let year = 1; year <= fundTerm; year++) {
        // Process loan exits in this year (initial loans)
        const yearlyExits = initialLoans.filter(loan => loan.exit_year === year);

        // Log the exits for debugging
        console.log(`Year ${year} - Initial loan exits:`, {
          count: yearlyExits.length,
          totalAmount: yearlyExits.reduce((sum, loan) => sum + loan.loan_amount, 0)
        });

        yearlyExits.forEach(loan => {
          // Principal repayment
          detailedCashflows[year].inflows += loan.loan_amount;
          detailedCashflows[year].principalRepayments += loan.loan_amount;

          // Interest payment (simple interest from origination year)
          const interestPeriod = year - loan.origination_year;
          const interest = loan.loan_amount * simpleInterestRate * interestPeriod;
          detailedCashflows[year].inflows += interest;

          // Appreciation fee
          const appreciationValue = loan.property_value * (Math.pow(1 + loan.appreciation_rate, interestPeriod) - 1);
          const appreciationFee = appreciationValue * loan.ltv;
          detailedCashflows[year].inflows += appreciationFee;
        });

        // Process recycled loan exits from previous years
        const recycledExits = recycledLoans.filter(loan => loan.exit_year === year);

        // Log the recycled exits for debugging
        if (recycledExits.length > 0) {
          console.log(`Year ${year} - Recycled loan exits:`, {
            count: recycledExits.length,
            totalAmount: recycledExits.reduce((sum, loan) => sum + loan.loan_amount, 0)
          });
        }

        recycledExits.forEach(loan => {
          // Principal repayment
          detailedCashflows[year].inflows += loan.loan_amount;
          detailedCashflows[year].principalRepayments += loan.loan_amount;

          // Interest payment (simple interest from origination year)
          const interestPeriod = year - loan.origination_year;
          const interest = loan.loan_amount * simpleInterestRate * interestPeriod;
          detailedCashflows[year].inflows += interest;

          // Appreciation fee
          const appreciationValue = loan.property_value * (Math.pow(1 + loan.appreciation_rate, interestPeriod) - 1);
          const appreciationFee = appreciationValue * loan.ltv;
          detailedCashflows[year].inflows += appreciationFee;
        });

        // Handle capital recycling for this year
        if (year < fundTerm) {
          // Only recycle principal repayments, not interest or appreciation fees
          const recyclePercentage = capitalRecyclingPercentage || 0.7;
          const recycleAmount = detailedCashflows[year].principalRepayments * recyclePercentage;

          // Generate new loans with recycled capital
          if (recycleAmount > 0) {
            console.log(`Year ${year} - Recycling $${recycleAmount.toLocaleString()} of capital (${recyclePercentage * 100}% of $${detailedCashflows[year].principalRepayments.toLocaleString()})`);

            // Calculate the average loan size from initial loans to determine how many recycled loans to create
            const avgInitialLoanSize = initialLoans.reduce((sum, loan) => sum + loan.loan_amount, 0) / initialLoans.length;

            // Ensure we create a reasonable number of recycled loans
            const estimatedLoanCount = Math.max(3, Math.round(recycleAmount / avgInitialLoanSize));

            console.log(`Year ${year} - Estimated recycled loan count: ${estimatedLoanCount} (avg loan size: $${avgInitialLoanSize.toLocaleString()})`);

            const newLoans = this.generateRecycledLoans(recycleAmount, year, fundTerm, estimatedLoanCount);
            recycledLoans = [...recycledLoans, ...newLoans];

            console.log(`Year ${year} - Generated ${newLoans.length} new recycled loans with total amount: $${newLoans.reduce((sum, loan) => sum + loan.loan_amount, 0).toLocaleString()}`);
          }
        }
      }

      // Combine initial and recycled loans
      allLoans = [...initialLoans, ...recycledLoans];

      console.log('Capital recycling summary:', {
        initialLoansCount: initialLoans.length,
        recycledLoansCount: recycledLoans.length,
        totalLoansCount: allLoans.length,
        initialLoanAmount: initialLoans.reduce((sum, loan) => sum + loan.loan_amount, 0),
        recycledLoanAmount: recycledLoans.reduce((sum, loan) => sum + loan.loan_amount, 0),
        totalLoanAmount: allLoans.reduce((sum, loan) => sum + loan.loan_amount, 0)
      });
    }

    // Calculate portfolio metrics
    const totalPropertyValue = allLoans.reduce((sum, loan) => sum + loan.property_value, 0);
    const totalLoanAmount = allLoans.reduce((sum, loan) => sum + loan.loan_amount, 0);
    const avgPropertyValue = totalPropertyValue / allLoans.length;
    const avgLoanSize = totalLoanAmount / allLoans.length;
    const avgLtv = allLoans.reduce((sum, loan) => sum + loan.ltv, 0) / allLoans.length;
    const avgAppreciationRate = allLoans.reduce((sum, loan) => sum + loan.appreciation_rate, 0) / allLoans.length;
    const avgExitYear = allLoans.reduce((sum, loan) => sum + loan.exit_year, 0) / allLoans.length;

    // Log portfolio statistics for debugging
    console.log('Portfolio statistics:', {
      totalLoans: allLoans.length,
      initialLoans: initialLoans.length,
      recycledLoans: recycledLoans.length,
      avgPropertyValue,
      avgLoanSize,
      avgLtv,
      avgAppreciationRate,
      avgExitYear,
      zoneDistribution
    });

    return {
      loans: allLoans,
      metrics: {
        total_loans: allLoans.length,
        initial_loans: initialLoans.length,
        recycled_loans: recycledLoans.length,
        average_loan_size: avgLoanSize,
        average_ltv: avgLtv,
        average_property_value: avgPropertyValue,
        average_appreciation_rate: avgAppreciationRate,
        average_exit_year: avgExitYear,
        total_initial_value: totalPropertyValue,
        total_loan_amount: totalLoanAmount,
        capital_recycling_enabled: capitalRecyclingEnabled,
        capital_recycling_percentage: capitalRecyclingPercentage || 0.7
      },
      exitYearDistribution,
      ltvBuckets,
      propertyValueBuckets,
      zoneDistribution
    };
  }

  /**
   * Calculate cashflows for the portfolio, including capital recycling if enabled
   *
   * This method generates a detailed cashflow model for IRR calculation.
   * It accounts for:
   * - Initial investment (negative cashflow)
   * - Management fees (annual negative cashflows)
   * - Loan exits (positive cashflows when loans are repaid)
   * - Capital recycling (reinvestment of exits)
   * - Performance fees (reduction in final cashflow)
   */
  /**
   * Calculate detailed cashflows and IRR cashflows
   * @returns An object containing both detailed cashflows and IRR cashflows
   */
  private calculateDetailedCashflows(portfolio: any): { detailedCashflows: Record<number, { inflows: number, outflows: number }>, irrCashflows: number[] } {
    const {
      fundSize,
      fundTerm,
      managementFeeRate,
      originationFeeRate,
      simpleInterestRate,
      performanceFeeRate,
      hurdleRate,
      gpInvestmentPercentage
    } = this.parameters;

    // Extract all loans from the portfolio (both initial and recycled)
    const loans = portfolio.loans || [];

    // Create a detailed cashflow model
    // We'll track all cashflows by year, then convert to the format needed for IRR
    const detailedCashflows: Record<number, { inflows: number, outflows: number }> = {};

    // Initialize cashflows for each year
    for (let year = 0; year <= fundTerm; year++) {
      detailedCashflows[year] = { inflows: 0, outflows: 0 };
    }

    // Year 0: Initial investment (negative cashflow)
    detailedCashflows[0].outflows = fundSize;

    // Process origination fees for initial loans (year 0)
    const initialLoans = loans.filter((loan: any) => !loan.isRecycled);
    const initialOriginationFees = initialLoans.reduce((sum: number, loan: any) =>
      sum + loan.loan_amount * originationFeeRate, 0);
    detailedCashflows[0].inflows += initialOriginationFees;

    // Process each year's cashflows
    for (let year = 1; year <= fundTerm; year++) {
      // Management fees (annual negative cashflow)
      detailedCashflows[year].outflows += fundSize * managementFeeRate;

      // Process all loan exits in this year (both initial and recycled)
      const yearlyExits = loans.filter((loan: any) => loan.exit_year === year);

      yearlyExits.forEach((loan: any) => {
        // Principal repayment
        detailedCashflows[year].inflows += loan.loan_amount;

        // Interest payment (simple interest from origination year)
        const interestPeriod = year - loan.origination_year;
        const interest = loan.loan_amount * simpleInterestRate * interestPeriod;
        detailedCashflows[year].inflows += interest;

        // Appreciation fee - use compound appreciation for more accuracy
        const appreciationValue = loan.property_value * (Math.pow(1 + loan.appreciation_rate, interestPeriod) - 1);
        const appreciationFee = appreciationValue * loan.ltv;
        detailedCashflows[year].inflows += appreciationFee;
      });

      // Process origination fees for recycled loans originated in this year
      const recycledLoansOriginatedThisYear = loans.filter((loan: any) =>
        loan.isRecycled && loan.origination_year === year);

      if (recycledLoansOriginatedThisYear.length > 0) {
        // Add origination fees as inflows
        const recycledOriginationFees = recycledLoansOriginatedThisYear.reduce(
          (sum: number, loan: any) => sum + loan.loan_amount * originationFeeRate, 0);
        detailedCashflows[year].inflows += recycledOriginationFees;

        // Add loan amounts as outflows (capital being deployed)
        const recycledCapital = recycledLoansOriginatedThisYear.reduce(
          (sum: number, loan: any) => sum + loan.loan_amount, 0);
        detailedCashflows[year].outflows += recycledCapital;

        console.log(`Year ${year} - Recycled loans originated:`, {
          count: recycledLoansOriginatedThisYear.length,
          capital: recycledCapital,
          originationFees: recycledOriginationFees
        });
      }
    }

    // Calculate performance fees at the end of the fund term
    // First, calculate total profit
    let totalInflows = 0;
    let totalOutflows = 0;

    for (let year = 0; year <= fundTerm; year++) {
      totalInflows += detailedCashflows[year].inflows;
      totalOutflows += detailedCashflows[year].outflows;
    }

    const totalProfit = totalInflows - totalOutflows;

    // Calculate preferred return
    const lpInvestment = fundSize * (1 - gpInvestmentPercentage);
    const preferredReturn = lpInvestment * hurdleRate * fundTerm;

    // Calculate performance fees
    if (totalProfit > preferredReturn) {
      const performanceFees = (totalProfit - preferredReturn) * performanceFeeRate;

      // Subtract performance fees from the final year's inflows
      detailedCashflows[fundTerm].outflows += performanceFees;

      console.log('Performance fee calculation:', {
        totalProfit,
        preferredReturn,
        performanceFees
      });
    }

    // Convert detailed cashflows to the format needed for IRR calculation
    // For IRR, we need net cashflows (inflows - outflows) for each period
    const irrCashflows: number[] = [];

    for (let year = 0; year <= fundTerm; year++) {
      const netCashflow = detailedCashflows[year].inflows - detailedCashflows[year].outflows;
      irrCashflows.push(netCashflow);
    }

    // Log the cashflows for debugging
    console.log('Detailed cashflows:', detailedCashflows);
    console.log('IRR cashflows:', irrCashflows);

    return { detailedCashflows, irrCashflows };
  }

  /**
   * Calculate cashflows for the portfolio (backward compatibility method)
   */
  private calculateCashflows(portfolio: any): number[] {
    const { irrCashflows } = this.calculateDetailedCashflows(portfolio);
    return irrCashflows;
  }

  /**
   * Generate recycled loans for capital recycling with improved distribution
   * @param capital The amount of capital to recycle
   * @param originationYear The year in which the recycled loans are originated
   * @param fundTerm The total term of the fund
   * @param suggestedNumLoans Optional parameter to suggest how many loans to create
   */
  private generateRecycledLoans(capital: number, originationYear: number, fundTerm: number, suggestedNumLoans?: number): any[] {
    const {
      averagePropertyValue,
      averageLTV,
      averageAppreciationRate,
      averageExitTimeframe,
      loanAmountVolatility,
      ltvVolatility,
      exitTimeframeVolatility,
      appreciationRateVolatility
    } = this.parameters;

    // Use volatility parameters with defaults if not provided
    const propertyValueStdDev = loanAmountVolatility || 0.2;
    const ltvStdDev = ltvVolatility || 0.15;
    const exitTimeframeStdDev = exitTimeframeVolatility || 1.5;
    const appreciationRateStdDev = appreciationRateVolatility || 0.25;

    // Calculate how many loans we can generate with the available capital
    const avgLoanSize = averagePropertyValue * averageLTV;

    // Use suggested number of loans if provided, otherwise calculate based on capital
    const numLoans = suggestedNumLoans || Math.max(3, Math.floor(capital / avgLoanSize));

    console.log(`Generating recycled loans: capital=$${capital.toLocaleString()}, avgLoanSize=$${avgLoanSize.toLocaleString()}, numLoans=${numLoans}`);

    if (numLoans === 0 || capital <= 0) {
      return [];
    }

    // Adjust the average loan size to match the total capital
    const adjustedAvgLoanSize = capital / numLoans;

    // Helper function to create a skewed normal distribution
    const generateSkewedNormal = (mean: number, stdDev: number, skew: number = 0): number => {
      // Generate a normal random variable
      const normal = generateNormal(0, 1);

      // Apply skew transformation (modified from Azzalini's skew-normal distribution)
      const delta = skew / Math.sqrt(1 + skew * skew);
      const skewed = normal + delta * Math.abs(generateNormal(0, 1));

      // Scale and shift to desired mean and standard deviation
      return mean + stdDev * skewed;
    };

    // Helper function to generate a bimodal distribution
    const generateBimodal = (mean1: number, stdDev1: number, mean2: number, stdDev2: number, weight: number): number => {
      // Use weight to determine which mode to sample from
      if (Math.random() < weight) {
        return generateNormal(mean1, stdDev1);
      } else {
        return generateNormal(mean2, stdDev2);
      }
    };

    // Helper function to generate normally distributed random numbers
    const generateNormal = (mean: number, stdDev: number): number => {
      const u1 = Math.random();
      const u2 = Math.random();
      const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      return mean + z0 * stdDev;
    };

    // Generate new loans with more realistic distributions
    return Array.from({ length: numLoans }, (_, i) => {
      // For recycled loans, we need to ensure the total matches the recycled capital
      // So we'll adjust the property values and LTVs to achieve the desired loan amounts

      // First, generate a target loan amount for this specific loan
      // Use a skewed normal distribution to create more variation
      const targetLoanAmount = Math.max(100000, generateSkewedNormal(adjustedAvgLoanSize, adjustedAvgLoanSize * 0.3, 0.5));

      // Then, generate property value and LTV that will result in approximately the target loan amount
      // Property value with skewed distribution (more lower-value properties, fewer high-value ones)
      const propertyValueSkew = 1.5; // Positive skew means more mass on lower values, tail to the right
      const basePropertyValue = Math.max(300000, generateSkewedNormal(averagePropertyValue, averagePropertyValue * propertyValueStdDev, propertyValueSkew));

      // LTV with bimodal distribution (clusters around conservative and aggressive LTVs)
      const conservativeLTV = averageLTV * 0.75; // e.g., 30% if average is 40%
      const aggressiveLTV = Math.min(0.75, averageLTV * 1.5); // e.g., 60% if average is 40%, capped at 75%
      const conservativeWeight = 0.6; // 60% of loans are conservative

      // Generate LTV using bimodal distribution
      const baseLtv = generateBimodal(conservativeLTV, ltvStdDev * conservativeLTV,
                                    aggressiveLTV, ltvStdDev * aggressiveLTV,
                                    conservativeWeight);

      // Ensure LTV is within reasonable bounds
      const ltv = Math.max(0.1, Math.min(0.8, baseLtv));

      // Adjust property value to achieve the target loan amount given the LTV
      const propertyValue = targetLoanAmount / ltv;

      // Calculate final loan amount
      const loanAmount = propertyValue * ltv;

      // Log for debugging
      if (i < 3) {
        console.log(`Recycled loan ${i+1}: target=$${targetLoanAmount.toLocaleString()}, actual=$${loanAmount.toLocaleString()}, property=$${propertyValue.toLocaleString()}, ltv=${(ltv * 100).toFixed(1)}%`);
      }

      // Appreciation rate varies by zone
      // Determine zone with realistic distribution (35% green, 45% orange, 20% red)
      let zone;
      let appreciationRate;

      const zoneRand = Math.random();
      if (zoneRand < 0.35) {
        zone = 'green';
        // Green zone has higher appreciation (25% above average)
        appreciationRate = generateNormal(
          averageAppreciationRate * 1.25,
          averageAppreciationRate * appreciationRateStdDev
        );
      } else if (zoneRand < 0.8) {
        zone = 'orange';
        // Orange zone has average appreciation
        appreciationRate = generateNormal(
          averageAppreciationRate,
          averageAppreciationRate * appreciationRateStdDev
        );
      } else {
        zone = 'red';
        // Red zone has lower appreciation (25% below average)
        appreciationRate = generateNormal(
          averageAppreciationRate * 0.75,
          averageAppreciationRate * appreciationRateStdDev
        );
      }

      // Ensure appreciation rate is positive and reasonable
      appreciationRate = Math.max(0.005, Math.min(0.15, appreciationRate));

      // Exit year calculation with more realistic distributions
      const maxPossibleTerm = fundTerm - originationYear;

      // If there's not enough time left in the fund, most loans will exit at fund end
      if (maxPossibleTerm <= 3) {
        // For very short remaining terms, create a left-skewed distribution
        // that favors exits closer to fund end
        const exitYearOffset = Math.max(1, Math.min(maxPossibleTerm,
          Math.ceil(generateSkewedNormal(maxPossibleTerm * 0.7, maxPossibleTerm * 0.3, 0.8))));
        const exitYear = originationYear + exitYearOffset;
        return {
          id: `RC-${originationYear}-${i+1}`,
          property_value: propertyValue,
          loan_amount: loanAmount,
          ltv: ltv,
          appreciation_rate: appreciationRate,
          origination_year: originationYear,
          exit_year: exitYear,
          expected_exit_value: propertyValue * Math.pow(1 + appreciationRate, exitYearOffset),
          zone,
          isRecycled: true // Flag to identify recycled loans
        };
      }

      // For normal recycled loans with sufficient fund term remaining
      // Create a trimodal distribution similar to initial loans but compressed
      let exitYearOffset;
      const exitDistributionRoll = Math.random();

      // Base exit timeframe on zone (green exits faster, red slower)
      let baseExitTimeframe = Math.min(averageExitTimeframe, maxPossibleTerm * 0.7);
      if (zone === 'green') baseExitTimeframe *= 0.8; // 20% faster
      if (zone === 'red') baseExitTimeframe *= 1.2; // 20% slower

      // 25% are early exits (years 1-2) - refinance or quick sale
      if (exitDistributionRoll < 0.25) {
        exitYearOffset = Math.max(1, Math.min(2, Math.ceil(generateSkewedNormal(1.5, 0.5, -0.5))));
      }
      // 50% are mid-term exits (clustered around adjusted average exit timeframe)
      else if (exitDistributionRoll < 0.75) {
        // Add some randomness to the mean to avoid too much clustering
        const adjustedMean = baseExitTimeframe + (Math.random() - 0.5) * 0.5;
        exitYearOffset = Math.max(2, Math.min(maxPossibleTerm - 1,
          Math.round(generateNormal(adjustedMean, exitTimeframeStdDev * 0.6))));
      }
      // 25% exit at or near fund end
      else {
        exitYearOffset = Math.max(3, Math.min(maxPossibleTerm,
          Math.round(generateSkewedNormal(maxPossibleTerm - 1, 1, -0.5))));
      }

      const exitYear = originationYear + exitYearOffset;

      // Expected exit value using compound appreciation
      const expectedExitValue = propertyValue * Math.pow(1 + appreciationRate, exitYearOffset);

      return {
        id: `RC-${originationYear}-${i+1}`,
        property_value: propertyValue,
        loan_amount: loanAmount,
        ltv: ltv,
        appreciation_rate: appreciationRate,
        origination_year: originationYear,
        exit_year: exitYear,
        expected_exit_value: expectedExitValue,
        zone,
        isRecycled: true // Flag to identify recycled loans
      };
    });
  }

  /**
   * Calculate yearly NAV progression
   */
  private calculateYearlyNAV(portfolio: any): any[] {
    const {
      fundSize,
      fundTerm,
      managementFeeRate,
      simpleInterestRate
    } = this.parameters;

    const loans = portfolio.loans;
    const yearlyNav = [];

    // Initial NAV is fund size
    yearlyNav.push({ year: 0, nav: fundSize });

    // Track outstanding loans and their values
    let outstandingLoans = [...loans];
    let currentNav = fundSize;

    for (let year = 1; year <= fundTerm; year++) {
      // Management fee reduces NAV
      const managementFee = fundSize * managementFeeRate;
      currentNav -= managementFee;

      // Loans exiting this year
      const exitingLoans = outstandingLoans.filter(loan => loan.exit_year === year);
      outstandingLoans = outstandingLoans.filter(loan => loan.exit_year !== year);

      // Calculate exit value of loans (principal + interest + appreciation)
      const exitValue = exitingLoans.reduce((sum, loan) => {
        const principal = loan.loan_amount;
        const interest = principal * simpleInterestRate * year;
        const appreciation = loan.property_value * loan.appreciation_rate * year * loan.ltv;
        return sum + principal + interest + appreciation;
      }, 0);

      // Exiting loans increase NAV
      currentNav += exitValue;

      // For remaining loans, calculate accrued interest and appreciation (unrealized)
      const unrealizedGains = outstandingLoans.reduce((sum, loan) => {
        const interest = loan.loan_amount * simpleInterestRate * year;
        const appreciation = loan.property_value * loan.appreciation_rate * year * loan.ltv;
        return sum + interest + appreciation;
      }, 0);

      // Calculate NAV for this year (including unrealized gains)
      const totalNav = currentNav + unrealizedGains;

      yearlyNav.push({ year, nav: Math.max(0, totalNav) });
    }

    return yearlyNav;
  }

  /**
   * Calculate IRR using a more robust implementation
   *
   * This implementation uses a combination of bisection and Newton-Raphson methods
   * to ensure reliable convergence.
   */
  private calculateIRR(cashflows: number[]): number {
    // Validate that we have at least one positive and one negative cashflow
    let hasPositive = false;
    let hasNegative = false;

    for (const cf of cashflows) {
      if (cf > 0) hasPositive = true;
      if (cf < 0) hasNegative = true;
    }

    // If we don't have both positive and negative cashflows, IRR is undefined
    if (!hasPositive || !hasNegative) {
      console.warn('IRR calculation requires both positive and negative cashflows');
      return 0;
    }

    // Log cashflows for debugging
    console.log('Calculating IRR for cashflows:', cashflows);

    // Constants for the calculation
    const EPSILON = 1e-10; // Precision threshold
    const MAX_ITERATIONS = 1000; // Maximum number of iterations

    // Function to calculate NPV at a given rate
    const calculateNPV = (rate: number): number => {
      let npv = 0;
      for (let i = 0; i < cashflows.length; i++) {
        npv += cashflows[i] / Math.pow(1 + rate, i);
      }
      return npv;
    };

    // First, try to bracket the IRR using bisection method
    let lowerRate = -0.99; // -99%
    let upperRate = 2.0;   // 200%
    let lowerNPV = calculateNPV(lowerRate);
    let upperNPV = calculateNPV(upperRate);

    // Check if we can bracket the IRR
    if (lowerNPV * upperNPV > 0) {
      // Try a wider range
      lowerRate = -0.999;
      upperRate = 10.0;
      lowerNPV = calculateNPV(lowerRate);
      upperNPV = calculateNPV(upperRate);

      if (lowerNPV * upperNPV > 0) {
        console.warn('Failed to bracket IRR. NPV does not change sign in the range.');

        // Fallback to a simple estimation based on total return
        const initialInvestment = -cashflows[0];
        const totalReturn = cashflows.reduce((sum, cf) => sum + cf, 0) + initialInvestment;
        const years = cashflows.length - 1;

        // Simple IRR approximation: (totalReturn/initialInvestment)^(1/years) - 1
        if (initialInvestment > 0 && totalReturn > initialInvestment && years > 0) {
          const estimatedIRR = Math.pow(totalReturn / initialInvestment, 1 / years) - 1;
          console.log(`Using simple IRR approximation: ${estimatedIRR * 100}%`);
          return estimatedIRR;
        }

        return 0.1; // Default to 10% if we can't calculate
      }
    }

    // Use a combination of bisection and Newton-Raphson
    let rate = (lowerRate + upperRate) / 2; // Start with midpoint

    for (let i = 0; i < MAX_ITERATIONS; i++) {
      // Calculate NPV and its derivative at current rate
      let npv = 0;
      let derivativeNpv = 0;

      for (let j = 0; j < cashflows.length; j++) {
        const factor = Math.pow(1 + rate, j);
        npv += cashflows[j] / factor;
        derivativeNpv += -j * cashflows[j] / (factor * (1 + rate));
      }

      // If NPV is close enough to zero, we've found the IRR
      if (Math.abs(npv) < EPSILON) {
        console.log(`IRR calculation converged after ${i} iterations: ${rate * 100}%`);
        return rate;
      }

      // Update brackets
      if (npv > 0) {
        lowerRate = rate;
        lowerNPV = npv;
      } else {
        upperRate = rate;
        upperNPV = npv;
      }

      // Try Newton-Raphson step
      let newtonRate = rate;
      if (Math.abs(derivativeNpv) > EPSILON) {
        newtonRate = rate - npv / derivativeNpv;
      }

      // If Newton-Raphson step is within brackets, use it
      if (newtonRate > lowerRate && newtonRate < upperRate) {
        rate = newtonRate;
      }
      // Otherwise use bisection
      else {
        rate = (lowerRate + upperRate) / 2;
      }

      // Check for convergence by bracket size
      if (upperRate - lowerRate < EPSILON) {
        console.log(`IRR calculation converged by bracket size after ${i} iterations: ${rate * 100}%`);
        return rate;
      }
    }

    console.warn(`IRR calculation did not fully converge after ${MAX_ITERATIONS} iterations. Using best estimate: ${rate * 100}%`);
    return rate;
  }

  /**
   * Calculate total return from cashflows
   */
  private calculateTotalReturn(cashflows: number[]): number {
    // Total return is the sum of all positive cashflows minus the initial investment
    return cashflows.reduce((sum, cf, index) => {
      if (index === 0) {
        return sum; // Skip initial investment
      }
      return sum + cf;
    }, 0) + Math.abs(cashflows[0]); // Add back the initial investment
  }

  /**
   * Calculate Sharpe ratio (return / risk)
   */
  private calculateSharpeRatio(roi: number, cashflows: number[]): number {
    // Calculate standard deviation of returns as a measure of risk
    const returns = this.calculatePeriodicReturns(cashflows);
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    const stdDev = Math.sqrt(variance);

    // Risk-free rate (assume 2%)
    const riskFreeRate = 0.02;

    // Sharpe ratio = (portfolio return - risk-free rate) / standard deviation
    return stdDev > 0 ? (roi - riskFreeRate) / stdDev : 0;
  }

  /**
   * Calculate periodic returns from cashflows
   */
  private calculatePeriodicReturns(cashflows: number[]): number[] {
    const returns = [];
    let cumulativeValue = Math.abs(cashflows[0]); // Initial investment

    for (let i = 1; i < cashflows.length; i++) {
      const newValue = cumulativeValue + cashflows[i];
      const periodReturn = (newValue - cumulativeValue) / cumulativeValue;
      returns.push(periodReturn);
      cumulativeValue = newValue;
    }

    return returns;
  }

  /**
   * Calculate maximum drawdown
   */
  private calculateMaxDrawdown(yearlyNav: any[]): number {
    let maxDrawdown = 0;
    let peak = yearlyNav[0].nav;

    for (let i = 1; i < yearlyNav.length; i++) {
      const nav = yearlyNav[i].nav;

      // Update peak if we have a new high
      if (nav > peak) {
        peak = nav;
      }

      // Calculate drawdown
      const drawdown = (peak - nav) / peak;

      // Update max drawdown
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }

    return maxDrawdown;
  }

  /**
   * Calculate success probability based on IRR
   */
  private calculateSuccessProbability(irr: number): number {
    // Simple model: probability of success increases with IRR
    // 0% IRR = 50% probability, 20% IRR = 100% probability
    return Math.min(1, 0.5 + irr * 2.5);
  }

  /**
   * Calculate returns for each tranche
   */
  private calculateTrancheReturns(cashflows: number[]): any {
    const {
      fundSize,
      seniorTranchePercentage,
      seniorTrancheRate,
      mezTranchePercentage,
      mezTrancheRate
    } = this.parameters;

    // Calculate tranche sizes
    const seniorTrancheSize = fundSize * (seniorTranchePercentage || 0.5);
    const mezTrancheSize = fundSize * (mezTranchePercentage || 0.3);
    const equityTrancheSize = fundSize - seniorTrancheSize - mezTrancheSize;

    // Create separate cashflows for each tranche
    const seniorCashflows = [-seniorTrancheSize];
    const mezCashflows = [-mezTrancheSize];
    const equityCashflows = [-equityTrancheSize];

    // Distribute returns according to the waterfall structure
    for (let i = 1; i < cashflows.length; i++) {
      const yearCashflow = cashflows[i];

      if (yearCashflow <= 0) {
        // If negative cashflow, distribute proportionally
        seniorCashflows.push(yearCashflow * (seniorTrancheSize / fundSize));
        mezCashflows.push(yearCashflow * (mezTrancheSize / fundSize));
        equityCashflows.push(yearCashflow * (equityTrancheSize / fundSize));
      } else {
        // If positive cashflow, distribute according to waterfall
        // 1. Senior tranche gets its fixed return
        const seniorReturn = seniorTrancheSize * (seniorTrancheRate || 0.05);

        // 2. Mezzanine tranche gets its fixed return
        const mezReturn = mezTrancheSize * (mezTrancheRate || 0.08);

        // 3. Remaining goes to equity tranche
        const equityReturn = Math.max(0, yearCashflow - seniorReturn - mezReturn);

        // Add to cashflows
        seniorCashflows.push(seniorReturn);
        mezCashflows.push(mezReturn);
        equityCashflows.push(equityReturn);
      }
    }

    // Calculate IRR for each tranche
    const seniorIRR = this.calculateIRR(seniorCashflows);
    const mezIRR = this.calculateIRR(mezCashflows);
    const equityIRR = this.calculateIRR(equityCashflows);

    // Calculate total return for each tranche
    const seniorTotalReturn = this.calculateTotalReturn(seniorCashflows);
    const mezTotalReturn = this.calculateTotalReturn(mezCashflows);
    const equityTotalReturn = this.calculateTotalReturn(equityCashflows);

    return {
      senior: {
        irr: seniorIRR,
        totalReturn: seniorTotalReturn
      },
      mezzanine: {
        irr: mezIRR,
        totalReturn: mezTotalReturn
      },
      equity: {
        irr: equityIRR,
        totalReturn: equityTotalReturn
      }
    };
  }

  /**
   * Vary parameters for Monte Carlo simulation using a more sophisticated approach
   * that respects correlations between parameters
   */
  private varyParameters(): SimulationParameters {
    // Create a copy of the parameters
    const params = { ...this.parameters };

    // Use Box-Muller transform to generate normally distributed random numbers
    const generateNormal = (mean: number, stdDev: number): number => {
      const u1 = Math.random();
      const u2 = Math.random();
      const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      return mean + z0 * stdDev;
    };

    // Define standard deviations for each parameter (as percentage of mean)
    const propertyValueStdDev = 0.15; // 15% standard deviation
    const ltvStdDev = 0.10; // 10% standard deviation
    const appreciationRateStdDev = 0.20; // 20% standard deviation
    const exitTimeframeStdDev = 0.15; // 15% standard deviation
    const interestRateStdDev = 0.08; // 8% standard deviation

    // Generate correlated random variations
    // First, generate a base random factor that will influence all parameters
    // This creates correlation between parameters
    const baseRandomFactor = generateNormal(0, 1);

    // Then add specific variation for each parameter
    const propertyValueFactor = 0.7 * baseRandomFactor + 0.3 * generateNormal(0, 1);
    const ltvFactor = 0.5 * baseRandomFactor + 0.5 * generateNormal(0, 1);
    const appreciationRateFactor = 0.6 * baseRandomFactor + 0.4 * generateNormal(0, 1);
    const exitTimeframeFactor = -0.3 * baseRandomFactor + 0.7 * generateNormal(0, 1); // Negative correlation with property value
    const interestRateFactor = 0.4 * baseRandomFactor + 0.6 * generateNormal(0, 1);

    // Apply variations to parameters with bounds checking
    params.averagePropertyValue = Math.max(
      params.averagePropertyValue * 0.5,
      Math.min(
        params.averagePropertyValue * 1.5,
        params.averagePropertyValue * (1 + propertyValueStdDev * propertyValueFactor)
      )
    );

    params.averageLTV = Math.max(
      0.1,
      Math.min(
        0.8,
        params.averageLTV * (1 + ltvStdDev * ltvFactor)
      )
    );

    params.averageAppreciationRate = Math.max(
      0.01,
      Math.min(
        0.12,
        params.averageAppreciationRate * (1 + appreciationRateStdDev * appreciationRateFactor)
      )
    );

    params.averageExitTimeframe = Math.max(
      1,
      Math.min(
        params.fundTerm,
        params.averageExitTimeframe * (1 + exitTimeframeStdDev * exitTimeframeFactor)
      )
    );

    params.simpleInterestRate = Math.max(
      0.02,
      Math.min(
        0.10,
        params.simpleInterestRate * (1 + interestRateStdDev * interestRateFactor)
      )
    );

    return params;
  }

  /**
   * Calculate correlations between parameters and IRR
   */
  private calculateCorrelations(results: SimulationResult[]): Record<string, number> {
    // Extract parameters and IRRs from results
    const data = results.map(result => {
      // We need to extract the parameters that were used for this simulation
      // This is a simplification - in a real implementation, we would track the parameters used
      return {
        irr: result.irr,
        averageAppreciationRate: result.portfolio.metrics.average_appreciation_rate,
        averageLTV: result.portfolio.metrics.average_ltv,
        averagePropertyValue: result.portfolio.metrics.average_property_value,
        averageExitTimeframe: result.portfolio.loans.reduce((sum, loan) => sum + loan.exit_year, 0) / result.portfolio.loans.length
      };
    });

    // Calculate correlation for each parameter with IRR
    const correlations: Record<string, number> = {};

    // Helper function to calculate correlation coefficient
    const calculateCorrelation = (xValues: number[], yValues: number[]): number => {
      const n = xValues.length;

      // Calculate means
      const xMean = xValues.reduce((sum, x) => sum + x, 0) / n;
      const yMean = yValues.reduce((sum, y) => sum + y, 0) / n;

      // Calculate covariance and standard deviations
      let covariance = 0;
      let xVariance = 0;
      let yVariance = 0;

      for (let i = 0; i < n; i++) {
        const xDiff = xValues[i] - xMean;
        const yDiff = yValues[i] - yMean;
        covariance += xDiff * yDiff;
        xVariance += xDiff * xDiff;
        yVariance += yDiff * yDiff;
      }

      // Calculate correlation coefficient
      const xStdDev = Math.sqrt(xVariance / n);
      const yStdDev = Math.sqrt(yVariance / n);

      return covariance / (n * xStdDev * yStdDev);
    };

    // Calculate correlation for each parameter
    const irrValues = data.map(d => d.irr);

    correlations['averageAppreciationRate'] = calculateCorrelation(
      data.map(d => d.averageAppreciationRate),
      irrValues
    );

    correlations['averageLTV'] = calculateCorrelation(
      data.map(d => d.averageLTV),
      irrValues
    );

    correlations['averagePropertyValue'] = calculateCorrelation(
      data.map(d => d.averagePropertyValue),
      irrValues
    );

    correlations['averageExitTimeframe'] = calculateCorrelation(
      data.map(d => d.averageExitTimeframe),
      irrValues
    );

    return correlations;
  }

  /**
   * Perform comprehensive sensitivity analysis on key parameters
   *
   * This method analyzes how changes in various parameters affect the IRR, ROI,
   * and other key metrics of the fund. It provides insights into which parameters
   * have the most significant impact on fund performance.
   */
  private performSensitivityAnalysis(): Record<string, any> {
    // Run the base simulation first
    const baseResult = this.runSimulation();
    const baseIRR = baseResult.irr;
    const baseROI = baseResult.roi;
    const baseSharpeRatio = baseResult.sharpeRatio;
    const baseEquityMultiple = baseResult.equityMultiple;

    const sensitivityResults: Record<string, any> = {};

    // Define the parameters to test and their ranges
    const parametersToTest = [
      {
        name: 'appreciationRate',
        displayName: 'Appreciation Rate',
        baseValue: this.parameters.averageAppreciationRate,
        minFactor: 0.5,
        maxFactor: 1.5,
        steps: 11,
        formatter: (value: number) => `${(value * 100).toFixed(2)}%`,
        setter: (params: SimulationParameters, value: number) => {
          params.averageAppreciationRate = value;
          return params;
        }
      },
      {
        name: 'ltv',
        displayName: 'Loan-to-Value Ratio',
        baseValue: this.parameters.averageLTV,
        minFactor: 0.7,
        maxFactor: 1.3,
        steps: 7,
        formatter: (value: number) => `${(value * 100).toFixed(2)}%`,
        setter: (params: SimulationParameters, value: number) => {
          params.averageLTV = Math.min(0.8, value);
          return params;
        }
      },
      {
        name: 'exitTimeframe',
        displayName: 'Exit Timeframe',
        baseValue: this.parameters.averageExitTimeframe,
        minFactor: 0.5,
        maxFactor: 1.5,
        steps: 11,
        formatter: (value: number) => `${value.toFixed(1)} years`,
        setter: (params: SimulationParameters, value: number) => {
          params.averageExitTimeframe = Math.min(params.fundTerm, Math.max(1, value));
          return params;
        }
      },
      {
        name: 'interestRate',
        displayName: 'Interest Rate',
        baseValue: this.parameters.simpleInterestRate,
        minFactor: 0.5,
        maxFactor: 1.5,
        steps: 11,
        formatter: (value: number) => `${(value * 100).toFixed(2)}%`,
        setter: (params: SimulationParameters, value: number) => {
          params.simpleInterestRate = value;
          return params;
        }
      },
      {
        name: 'capitalRecycling',
        displayName: 'Capital Recycling %',
        baseValue: this.parameters.capitalRecyclingPercentage || 0.7,
        minFactor: 0,
        maxFactor: 1.5,
        steps: 6,
        formatter: (value: number) => `${(value * 100).toFixed(0)}%`,
        setter: (params: SimulationParameters, value: number) => {
          params.capitalRecyclingEnabled = value > 0;
          params.capitalRecyclingPercentage = Math.min(1.0, Math.max(0, value));
          return params;
        }
      }
    ];

    // Run sensitivity analysis for each parameter
    for (const param of parametersToTest) {
      const sensitivity = [];
      const stepSize = (param.maxFactor - param.minFactor) / (param.steps - 1);

      for (let i = 0; i < param.steps; i++) {
        const factor = param.minFactor + i * stepSize;
        const value = param.baseValue * factor;

        // Create a new set of parameters with this value
        const params = { ...this.parameters };
        param.setter(params, value);

        // Run a simulation with these parameters
        const simulator = new MonteCarloSimulator(params);
        const result = simulator.runSimulation();

        // Calculate changes from base case
        const irrChange = result.irr - baseIRR;
        const roiChange = result.roi - baseROI;
        const sharpeRatioChange = result.sharpeRatio - baseSharpeRatio;
        const equityMultipleChange = result.equityMultiple - baseEquityMultiple;

        // Calculate elasticity (% change in output / % change in input)
        // This measures how sensitive the output is to changes in the input
        const irrElasticity = factor !== 1 ? (irrChange / baseIRR) / (factor - 1) : 0;
        const roiElasticity = factor !== 1 ? (roiChange / baseROI) / (factor - 1) : 0;

        sensitivity.push({
          factor,
          value,
          formattedValue: param.formatter(value),
          irr: result.irr,
          irrChange,
          irrElasticity,
          roi: result.roi,
          roiChange,
          roiElasticity,
          sharpeRatio: result.sharpeRatio,
          sharpeRatioChange,
          equityMultiple: result.equityMultiple,
          equityMultipleChange
        });
      }

      sensitivityResults[param.name] = {
        displayName: param.displayName,
        baseValue: param.baseValue,
        formattedBaseValue: param.formatter(param.baseValue),
        data: sensitivity
      };
    }

    // Calculate parameter importance based on elasticity
    const parameterImportance = parametersToTest.map(param => {
      const sensitivity = sensitivityResults[param.name].data;

      // Calculate average absolute elasticity (ignoring the base case where factor = 1)
      const elasticities = sensitivity
        .filter(point => point.factor !== 1)
        .map(point => Math.abs(point.irrElasticity));

      const avgElasticity = elasticities.length > 0 ?
        elasticities.reduce((sum, e) => sum + e, 0) / elasticities.length : 0;

      return {
        parameter: param.name,
        displayName: param.displayName,
        importance: avgElasticity
      };
    });

    // Sort by importance (descending)
    parameterImportance.sort((a, b) => b.importance - a.importance);

    sensitivityResults.parameterImportance = parameterImportance;

    return sensitivityResults;
  }

  /**
   * Calculate the efficient frontier from simulation results
   */
  /**
   * Calculate the efficient frontier using a more sophisticated approach
   * based on Modern Portfolio Theory
   */
  private calculateEfficientFrontier(results: SimulationResult[]): EfficientFrontierPoint[] {
    // Filter out invalid results
    const validResults = results.filter(r =>
      r.irr > -1 &&
      r.sharpeRatio > 0 &&
      !isNaN(r.irr) &&
      !isNaN(r.sharpeRatio) &&
      !isNaN(r.maxDrawdown)
    );

    if (validResults.length < 5) {
      console.warn('Not enough valid results to calculate efficient frontier');
      return [];
    }

    // Extract risk and return metrics
    const riskReturnPairs = validResults.map(result => ({
      risk: result.maxDrawdown, // Use maximum drawdown as risk measure
      return: result.irr,
      sharpeRatio: result.sharpeRatio,
      result
    }));

    // Sort by risk (ascending)
    riskReturnPairs.sort((a, b) => a.risk - b.risk);

    // Find the efficient frontier using a convex hull approach
    const efficientFrontier: EfficientFrontierPoint[] = [];
    let maxReturn = -Infinity;

    // For each risk level, find the portfolio with the highest return
    // This is a simplified convex hull algorithm for the efficient frontier
    for (let i = 0; i < riskReturnPairs.length; i++) {
      const current = riskReturnPairs[i];

      // If this portfolio has a higher return than any we've seen at lower risk levels,
      // it's on the efficient frontier
      if (current.return > maxReturn) {
        maxReturn = current.return;

        efficientFrontier.push({
          risk: current.risk,
          return: current.return,
          portfolioAllocation: {
            // Extract the actual parameters that led to this result
            averageAppreciationRate: current.result.portfolio.metrics.average_appreciation_rate,
            averageLTV: current.result.portfolio.metrics.average_ltv,
            averagePropertyValue: current.result.portfolio.metrics.average_property_value,
            averageExitTimeframe: current.result.portfolio.loans.reduce((sum: number, loan: any) => sum + loan.exit_year, 0) / current.result.portfolio.loans.length,
            sharpeRatio: current.sharpeRatio,
            irr: current.return,
            maxDrawdown: current.risk
          }
        });
      }
    }

    // If we have too many points, sample them to get a reasonable number
    if (efficientFrontier.length > 15) {
      const sampledFrontier: EfficientFrontierPoint[] = [];
      const step = efficientFrontier.length / 15;

      for (let i = 0; i < 15; i++) {
        const index = Math.min(Math.floor(i * step), efficientFrontier.length - 1);
        sampledFrontier.push(efficientFrontier[index]);
      }

      // Always include the highest return portfolio
      if (sampledFrontier[sampledFrontier.length - 1] !== efficientFrontier[efficientFrontier.length - 1]) {
        sampledFrontier.push(efficientFrontier[efficientFrontier.length - 1]);
      }

      return sampledFrontier;
    }

    return efficientFrontier;
  }
}
