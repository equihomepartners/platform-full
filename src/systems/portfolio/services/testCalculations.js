/**
 * Simple test script for financial calculations
 */

// Basic financial calculations for testing
const calculateSimpleInterest = (principal, rate, time) => {
  return principal * rate * time;
};

const calculateCompoundInterest = (principal, rate, time) => {
  return principal * Math.pow(1 + rate, time);
};

// Test loan exit value calculation
const testLoanExitValue = () => {
  console.log('Testing loan exit value calculation...');
  
  // Test parameters
  const loanAmount = 400000; // $400K loan
  const propertyValue = 1000000; // $1M property
  const ltv = 0.4; // 40% LTV
  const appreciationRate = 0.04; // 4% annual appreciation
  const simpleInterestRate = 0.05; // 5% simple interest
  const yearsHeld = 5; // 5-year hold
  
  // Calculate exit value
  const appreciatedPropertyValue = propertyValue * Math.pow(1 + appreciationRate, yearsHeld);
  const propertyAppreciation = appreciatedPropertyValue - propertyValue;
  const appreciationFee = propertyAppreciation * ltv;
  const interest = loanAmount * simpleInterestRate * yearsHeld;
  const exitValue = loanAmount + interest + appreciationFee;
  
  // Print results
  console.log('Loan amount:', loanAmount);
  console.log('Years held:', yearsHeld);
  console.log('Original property value:', propertyValue);
  console.log('Appreciated property value:', appreciatedPropertyValue);
  console.log('Property appreciation:', propertyAppreciation);
  console.log('Appreciation fee (40%):', appreciationFee);
  console.log('Interest (5% simple):', interest);
  console.log('Exit value:', exitValue);
  console.log('');
  
  return {
    loanAmount,
    yearsHeld,
    propertyValue,
    appreciatedPropertyValue,
    propertyAppreciation,
    appreciationFee,
    interest,
    exitValue
  };
};

// Test waterfall calculation
const testWaterfall = () => {
  console.log('Testing waterfall calculation...');
  
  // Test parameters
  const totalProfit = 50000000; // $50M profit
  const hurdleRate = 0.06; // 6%
  const carriedInterestRate = 0.20; // 20%
  const lpInvestment = 95000000; // $95M
  const gpInvestment = 5000000; // $5M
  const investmentTerm = 10; // 10 years
  
  // Calculate waterfall
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
  
  // Print results
  console.log('Total profit:', totalProfit);
  console.log('LP investment:', lpInvestment);
  console.log('GP investment:', gpInvestment);
  console.log('Hurdle rate:', hurdleRate);
  console.log('Investment term:', investmentTerm);
  console.log('Hurdle amount:', hurdleAmount);
  console.log('Remaining profit after hurdle:', remainingProfit);
  
  if (remainingProfit <= 0) {
    console.log('No remaining profit for GP catch-up or carried interest');
  } else {
    console.log('GP catch-up:', gpCatchup);
    console.log('GP carried interest:', gpCarriedInterest);
    console.log('LP residual:', lpResidual);
  }
  
  console.log('Total GP return:', totalGpReturn);
  console.log('Total LP return:', totalLpReturn);
  console.log('');
  
  return {
    totalProfit,
    lpInvestment,
    gpInvestment,
    hurdleRate,
    investmentTerm,
    hurdleAmount,
    remainingProfit,
    gpCatchup,
    gpCarriedInterest,
    lpResidual,
    totalGpReturn,
    totalLpReturn
  };
};

// Test fund performance with a simple portfolio
const testFundPerformance = () => {
  console.log('Testing fund performance calculation...');
  
  // Fund settings
  const fundSize = 100000000; // $100M
  const fundTerm = 10; // 10 years
  const managementFeeRate = 0.02; // 2%
  const hurdleRate = 0.06; // 6%
  const performanceFeeRate = 0.20; // 20%
  const originationFeeRate = 0.03; // 3%
  const simpleInterestRate = 0.05; // 5%
  const gpInvestmentPercentage = 0.05; // 5%
  const averagePropertyValue = 1000000; // $1M
  const averageLtv = 0.40; // 40%
  const averageAppreciationRate = 0.04; // 4%
  const averageLoanTerm = 7; // 7 years
  
  // Calculate GP and LP investments
  const gpInvestment = fundSize * gpInvestmentPercentage;
  const lpInvestment = fundSize - gpInvestment;
  
  // Generate a simple portfolio
  const averageLoanAmount = averagePropertyValue * averageLtv;
  const numLoans = Math.floor(fundSize / averageLoanAmount);
  
  console.log('Fund size:', fundSize);
  console.log('Average loan amount:', averageLoanAmount);
  console.log('Number of loans:', numLoans);
  console.log('GP investment:', gpInvestment);
  console.log('LP investment:', lpInvestment);
  
  // Calculate origination fees
  const totalLoanAmount = numLoans * averageLoanAmount;
  const originationFees = totalLoanAmount * originationFeeRate;
  
  // Calculate management fees
  const annualManagementFee = fundSize * managementFeeRate;
  const totalManagementFees = annualManagementFee * fundTerm;
  
  // Calculate loan exit values
  const exitYear = averageLoanTerm;
  const appreciatedPropertyValue = averagePropertyValue * Math.pow(1 + averageAppreciationRate, exitYear);
  const propertyAppreciation = appreciatedPropertyValue - averagePropertyValue;
  const appreciationFee = propertyAppreciation * averageLtv;
  const interest = averageLoanAmount * simpleInterestRate * exitYear;
  const exitValue = averageLoanAmount + interest + appreciationFee;
  
  // Calculate total return from all loans
  const totalLoanReturn = numLoans * exitValue;
  
  // Calculate total fund return
  const totalReturn = totalLoanReturn + originationFees - totalManagementFees;
  
  // Calculate profit
  const totalProfit = totalReturn - fundSize;
  
  // Calculate waterfall
  // Step 1: Return of capital
  const lpReturnOfCapital = lpInvestment;
  const gpReturnOfCapital = gpInvestment;
  
  // Step 2: Preferred return (hurdle)
  const hurdleAmount = lpInvestment * (Math.pow(1 + hurdleRate, fundTerm) - 1);
  
  // Remaining profit after return of capital and hurdle
  let remainingProfit = totalProfit - hurdleAmount;
  
  // Step 3: GP catch-up (if applicable)
  let gpCatchup = 0;
  if (remainingProfit > 0) {
    // Calculate catch-up amount
    const catchupAmount = (hurdleAmount * performanceFeeRate) / (1 - performanceFeeRate);
    gpCatchup = Math.min(remainingProfit, catchupAmount);
    remainingProfit -= gpCatchup;
  }
  
  // Step 4: Carried interest split
  let gpCarriedInterest = 0;
  let lpResidual = 0;
  
  if (remainingProfit > 0) {
    gpCarriedInterest = remainingProfit * performanceFeeRate;
    lpResidual = remainingProfit * (1 - performanceFeeRate);
  }
  
  // Calculate total GP and LP returns
  const totalGpReturn = gpReturnOfCapital + gpCatchup + gpCarriedInterest + originationFees + totalManagementFees;
  const totalLpReturn = lpReturnOfCapital + Math.min(hurdleAmount, totalProfit) + lpResidual;
  
  // Calculate IRR (simplified)
  const irr = totalProfit / fundSize / fundTerm;
  
  // Calculate equity multiple
  const equityMultiple = totalReturn / fundSize;
  
  // Calculate ROI
  const roi = totalProfit / fundSize;
  
  // Print results
  console.log('Total loan return:', totalLoanReturn);
  console.log('Origination fees:', originationFees);
  console.log('Management fees:', totalManagementFees);
  console.log('Total return:', totalReturn);
  console.log('Total profit:', totalProfit);
  console.log('IRR (simplified):', irr);
  console.log('Equity multiple:', equityMultiple);
  console.log('ROI:', roi);
  console.log('');
  
  console.log('GP Economics:');
  console.log('GP investment:', gpInvestment);
  console.log('Management fees:', totalManagementFees);
  console.log('Origination fees:', originationFees);
  console.log('GP catch-up:', gpCatchup);
  console.log('GP carried interest:', gpCarriedInterest);
  console.log('Total GP return:', totalGpReturn);
  console.log('GP ROI:', (totalGpReturn - gpInvestment) / gpInvestment);
  console.log('');
  
  console.log('LP Economics:');
  console.log('LP investment:', lpInvestment);
  console.log('Preferred return:', Math.min(hurdleAmount, totalProfit));
  console.log('LP residual:', lpResidual);
  console.log('Total LP return:', totalLpReturn);
  console.log('LP ROI:', (totalLpReturn - lpInvestment) / lpInvestment);
  console.log('');
  
  return {
    fundSize,
    numLoans,
    gpInvestment,
    lpInvestment,
    totalLoanReturn,
    originationFees,
    totalManagementFees,
    totalReturn,
    totalProfit,
    irr,
    equityMultiple,
    roi,
    gpEconomics: {
      investment: gpInvestment,
      managementFees: totalManagementFees,
      originationFees: originationFees,
      catchup: gpCatchup,
      carriedInterest: gpCarriedInterest,
      totalReturn: totalGpReturn,
      roi: (totalGpReturn - gpInvestment) / gpInvestment
    },
    lpEconomics: {
      investment: lpInvestment,
      preferredReturn: Math.min(hurdleAmount, totalProfit),
      residual: lpResidual,
      totalReturn: totalLpReturn,
      roi: (totalLpReturn - lpInvestment) / lpInvestment
    }
  };
};

// Run all tests
const runTests = () => {
  console.log('Running financial calculation tests...');
  console.log('=================================================');
  
  const loanExitResults = testLoanExitValue();
  const waterfallResults = testWaterfall();
  const fundPerformanceResults = testFundPerformance();
  
  console.log('=================================================');
  console.log('Test Results Summary:');
  console.log('Loan Exit Value:', loanExitResults.exitValue);
  console.log('Waterfall - GP Return:', waterfallResults.totalGpReturn);
  console.log('Waterfall - LP Return:', waterfallResults.totalLpReturn);
  console.log('Fund Performance - Total Return:', fundPerformanceResults.totalReturn);
  console.log('Fund Performance - IRR:', fundPerformanceResults.irr);
  console.log('Fund Performance - Equity Multiple:', fundPerformanceResults.equityMultiple);
  console.log('=================================================');
  
  return {
    loanExitResults,
    waterfallResults,
    fundPerformanceResults
  };
};

// Run the tests
runTests();
