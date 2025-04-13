/**
 * Financial and Mathematical Utility Functions
 * For accurate financial calculations in the Equihome Fund Modeling application
 */

/**
 * Generate a random number from a normal distribution
 * @param {number} mean - Mean of the distribution
 * @param {number} stdDev - Standard deviation of the distribution
 * @returns {number} Random number from the normal distribution
 */
function randomNormal(mean, stdDev) {
  // Box-Muller transform for normal distribution
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + z * stdDev;
}

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculate the present value of a future cash flow
 * @param {number} futureValue - Future value
 * @param {number} rate - Discount rate (decimal)
 * @param {number} periods - Number of periods
 * @returns {number} Present value
 */
function presentValue(futureValue, rate, periods) {
  return futureValue / Math.pow(1 + rate, periods);
}

/**
 * Calculate the future value of a present cash flow
 * @param {number} presentValue - Present value
 * @param {number} rate - Growth rate (decimal)
 * @param {number} periods - Number of periods
 * @returns {number} Future value
 */
function futureValue(presentValue, rate, periods) {
  return presentValue * Math.pow(1 + rate, periods);
}

/**
 * Calculate the internal rate of return (IRR) for a series of cash flows
 * @param {Array<number>} cashFlows - Array of cash flows (negative for outflows, positive for inflows)
 * @returns {number} IRR as a decimal
 */
function calculateIRR(cashFlows) {
  // Check if there are at least one negative and one positive cash flow
  let hasNegative = false;
  let hasPositive = false;
  
  for (const cf of cashFlows) {
    if (cf < 0) hasNegative = true;
    if (cf > 0) hasPositive = true;
    if (hasNegative && hasPositive) break;
  }
  
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
    if (newGuess <= -1 || !isFinite(newGuess)) {
      // Fall back to a bisection method or another approach
      return fallbackIRR(cashFlows);
    }
    
    guess = newGuess;
  }
  
  // If we didn't converge, fall back to a more robust method
  return fallbackIRR(cashFlows);
}

/**
 * Fallback method for IRR calculation using bisection
 * @param {Array<number>} cashFlows - Array of cash flows
 * @returns {number} IRR as a decimal
 */
function fallbackIRR(cashFlows) {
  // Bisection method for IRR
  let lowerBound = -0.99; // Can't go below -100%
  let upperBound = 1.0;   // Start with 100% as upper bound
  
  // Expand upper bound if needed
  while (calculateNPV(cashFlows, upperBound) > 0) {
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
    const npvAtMidpoint = calculateNPV(cashFlows, midpoint);
    
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
}

/**
 * Calculate the net present value (NPV) of cash flows at a given discount rate
 * @param {Array<number>} cashFlows - Array of cash flows
 * @param {number} rate - Discount rate as a decimal
 * @returns {number} NPV
 */
function calculateNPV(cashFlows, rate) {
  let npv = 0;
  
  for (let t = 0; t < cashFlows.length; t++) {
    npv += cashFlows[t] / Math.pow(1 + rate, t);
  }
  
  return npv;
}

/**
 * Calculate the money-weighted rate of return (MWRR)
 * @param {Array<{date: Date, amount: number}>} cashFlows - Array of cash flows with dates
 * @returns {number} MWRR as a decimal
 */
function calculateMWRR(cashFlows) {
  // Sort cash flows by date
  cashFlows.sort((a, b) => a.date - b.date);
  
  // Convert to days from first cash flow
  const startDate = cashFlows[0].date;
  const daysFromStart = cashFlows.map(cf => {
    const days = (cf.date - startDate) / (1000 * 60 * 60 * 24);
    return { days, amount: cf.amount };
  });
  
  // Convert to years for IRR calculation
  const yearsFromStart = daysFromStart.map(cf => ({
    years: cf.days / 365,
    amount: cf.amount
  }));
  
  // Create array of cash flows for IRR calculation
  const amounts = yearsFromStart.map(cf => cf.amount);
  const years = yearsFromStart.map(cf => cf.years);
  
  // Calculate IRR using XIRR-like approach
  return calculateXIRR(amounts, years);
}

/**
 * Calculate XIRR (IRR with irregular time periods)
 * @param {Array<number>} values - Cash flow amounts
 * @param {Array<number>} years - Years from start for each cash flow
 * @returns {number} XIRR as a decimal
 */
function calculateXIRR(values, years) {
  // Newton-Raphson method for XIRR
  const maxIterations = 100;
  const tolerance = 0.0000001;
  
  let guess = 0.1;
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let derivativeNpv = 0;
    
    for (let j = 0; j < values.length; j++) {
      const denominator = Math.pow(1 + guess, years[j]);
      npv += values[j] / denominator;
      derivativeNpv -= years[j] * values[j] / (denominator * (1 + guess));
    }
    
    if (Math.abs(npv) < tolerance) {
      return guess;
    }
    
    const newGuess = guess - npv / derivativeNpv;
    
    if (Math.abs(newGuess - guess) < tolerance) {
      return newGuess;
    }
    
    if (newGuess <= -1 || !isFinite(newGuess)) {
      return fallbackXIRR(values, years);
    }
    
    guess = newGuess;
  }
  
  return fallbackXIRR(values, years);
}

/**
 * Fallback method for XIRR calculation
 * @param {Array<number>} values - Cash flow amounts
 * @param {Array<number>} years - Years from start for each cash flow
 * @returns {number} XIRR as a decimal
 */
function fallbackXIRR(values, years) {
  // Bisection method for XIRR
  let lowerBound = -0.99;
  let upperBound = 1.0;
  
  // Expand upper bound if needed
  while (calculateXNPV(values, years, upperBound) > 0) {
    upperBound *= 2;
    if (upperBound > 100) {
      return 1.0;
    }
  }
  
  const tolerance = 0.0000001;
  const maxIterations = 100;
  
  for (let i = 0; i < maxIterations; i++) {
    const midpoint = (lowerBound + upperBound) / 2;
    const npvAtMidpoint = calculateXNPV(values, years, midpoint);
    
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
}

/**
 * Calculate XNPV (NPV with irregular time periods)
 * @param {Array<number>} values - Cash flow amounts
 * @param {Array<number>} years - Years from start for each cash flow
 * @param {number} rate - Discount rate
 * @returns {number} XNPV
 */
function calculateXNPV(values, years, rate) {
  let xnpv = 0;
  
  for (let i = 0; i < values.length; i++) {
    xnpv += values[i] / Math.pow(1 + rate, years[i]);
  }
  
  return xnpv;
}

/**
 * Calculate the equity multiple
 * @param {number} totalReturn - Total return
 * @param {number} totalInvestment - Total investment
 * @returns {number} Equity multiple
 */
function calculateEquityMultiple(totalReturn, totalInvestment) {
  if (totalInvestment === 0) return 0;
  return totalReturn / totalInvestment;
}

/**
 * Calculate the return on investment (ROI)
 * @param {number} totalReturn - Total return
 * @param {number} totalInvestment - Total investment
 * @returns {number} ROI as a decimal
 */
function calculateROI(totalReturn, totalInvestment) {
  if (totalInvestment === 0) return 0;
  return (totalReturn - totalInvestment) / totalInvestment;
}

/**
 * Calculate simple interest
 * @param {number} principal - Principal amount
 * @param {number} rate - Interest rate as a decimal
 * @param {number} time - Time in years
 * @returns {number} Interest amount
 */
function calculateSimpleInterest(principal, rate, time) {
  return principal * rate * time;
}

/**
 * Calculate compound interest
 * @param {number} principal - Principal amount
 * @param {number} rate - Interest rate as a decimal
 * @param {number} time - Time in years
 * @param {number} compoundingPerYear - Number of times interest is compounded per year
 * @returns {number} Future value with compound interest
 */
function calculateCompoundInterest(principal, rate, time, compoundingPerYear = 1) {
  return principal * Math.pow(1 + rate / compoundingPerYear, compoundingPerYear * time);
}

/**
 * Calculate the weighted average of values
 * @param {Array<number>} values - Array of values
 * @param {Array<number>} weights - Array of weights
 * @returns {number} Weighted average
 */
function calculateWeightedAverage(values, weights) {
  if (values.length !== weights.length) {
    throw new Error('Values and weights arrays must have the same length');
  }
  
  let sum = 0;
  let weightSum = 0;
  
  for (let i = 0; i < values.length; i++) {
    sum += values[i] * weights[i];
    weightSum += weights[i];
  }
  
  if (weightSum === 0) return 0;
  return sum / weightSum;
}

/**
 * Calculate the standard deviation of values
 * @param {Array<number>} values - Array of values
 * @returns {number} Standard deviation
 */
function calculateStandardDeviation(values) {
  const n = values.length;
  if (n === 0) return 0;
  
  const mean = values.reduce((sum, val) => sum + val, 0) / n;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
  
  return Math.sqrt(variance);
}

/**
 * Calculate the Sharpe ratio
 * @param {number} portfolioReturn - Portfolio return
 * @param {number} riskFreeRate - Risk-free rate
 * @param {number} portfolioStdDev - Portfolio standard deviation
 * @returns {number} Sharpe ratio
 */
function calculateSharpeRatio(portfolioReturn, riskFreeRate, portfolioStdDev) {
  if (portfolioStdDev === 0) return 0;
  return (portfolioReturn - riskFreeRate) / portfolioStdDev;
}

/**
 * Calculate the Sortino ratio
 * @param {number} portfolioReturn - Portfolio return
 * @param {number} riskFreeRate - Risk-free rate
 * @param {number} downside - Downside deviation
 * @returns {number} Sortino ratio
 */
function calculateSortinoRatio(portfolioReturn, riskFreeRate, downside) {
  if (downside === 0) return 0;
  return (portfolioReturn - riskFreeRate) / downside;
}

/**
 * Calculate the downside deviation
 * @param {Array<number>} returns - Array of returns
 * @param {number} threshold - Minimum acceptable return
 * @returns {number} Downside deviation
 */
function calculateDownsideDeviation(returns, threshold) {
  const n = returns.length;
  if (n === 0) return 0;
  
  const squaredDeviations = returns
    .filter(r => r < threshold)
    .map(r => Math.pow(threshold - r, 2));
  
  if (squaredDeviations.length === 0) return 0;
  
  const meanSquaredDeviation = squaredDeviations.reduce((sum, val) => sum + val, 0) / n;
  return Math.sqrt(meanSquaredDeviation);
}

/**
 * Calculate the Value at Risk (VaR)
 * @param {Array<number>} returns - Array of returns
 * @param {number} confidenceLevel - Confidence level (e.g., 0.95 for 95%)
 * @returns {number} Value at Risk
 */
function calculateVaR(returns, confidenceLevel) {
  const sortedReturns = [...returns].sort((a, b) => a - b);
  const index = Math.floor(sortedReturns.length * (1 - confidenceLevel));
  return -sortedReturns[index];
}

/**
 * Calculate the Expected Shortfall (Conditional VaR)
 * @param {Array<number>} returns - Array of returns
 * @param {number} confidenceLevel - Confidence level (e.g., 0.95 for 95%)
 * @returns {number} Expected Shortfall
 */
function calculateExpectedShortfall(returns, confidenceLevel) {
  const sortedReturns = [...returns].sort((a, b) => a - b);
  const varIndex = Math.floor(sortedReturns.length * (1 - confidenceLevel));
  
  let sum = 0;
  for (let i = 0; i < varIndex; i++) {
    sum += sortedReturns[i];
  }
  
  return -sum / varIndex;
}

/**
 * Calculate the waterfall distribution
 * @param {number} totalProfit - Total profit
 * @param {number} hurdleRate - Hurdle rate as a decimal
 * @param {number} catchupRate - Catch-up rate as a decimal
 * @param {number} carriedInterestRate - Carried interest rate as a decimal
 * @param {number} lpInvestment - LP investment amount
 * @param {number} gpInvestment - GP investment amount
 * @param {number} investmentTerm - Investment term in years
 * @returns {Object} Waterfall distribution
 */
function calculateWaterfall(totalProfit, hurdleRate, catchupRate, carriedInterestRate, lpInvestment, gpInvestment, investmentTerm) {
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
  if (catchupRate > 0 && remainingProfit > 0) {
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
  
  // Step 5: Pro-rata investment returns
  const gpInvestmentReturn = gpReturnOfCapital + (gpRatio * totalProfit);
  
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
}

// Export the math utilities
window.MathUtils = {
  randomNormal,
  clamp,
  presentValue,
  futureValue,
  calculateIRR,
  calculateNPV,
  calculateMWRR,
  calculateXIRR,
  calculateXNPV,
  calculateEquityMultiple,
  calculateROI,
  calculateSimpleInterest,
  calculateCompoundInterest,
  calculateWeightedAverage,
  calculateStandardDeviation,
  calculateSharpeRatio,
  calculateSortinoRatio,
  calculateDownsideDeviation,
  calculateVaR,
  calculateExpectedShortfall,
  calculateWaterfall
};
