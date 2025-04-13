/**
 * Tests for the Simplified Simulation Calculator
 */

import { SimplifiedSimulationCalculator, CoreFundSettings, Loan } from './simplifiedSimulationCalculator.js';

/**
 * Test the loan exit value calculation
 */
const testLoanExitValue = () => {
  console.log('Testing loan exit value calculation...');

  // Create a test loan
  const loan: Loan = {
    loan_amount: 400000, // $400K loan
    property_value: 1000000, // $1M property
    ltv: 0.4, // 40% LTV
    origination_year: 0,
    exit_year: 5, // 5-year hold
    appreciation_rate: 0.04 // 4% annual appreciation
  };

  // Create test fund settings
  const fundSettings: CoreFundSettings = {
    fund_size: 100000000,
    fund_term: 10,
    management_fee_rate: 0.02,
    hurdle_rate: 0.06,
    performance_fee_rate: 0.20,
    origination_fee_rate: 0.03,
    simple_interest_rate: 0.05,
    gp_investment_percentage: 0.05,
    average_property_value: 1000000,
    average_ltv: 0.4,
    average_appreciation_rate: 0.04,
    average_exit_timeframe: 7 // When homeowners exit through sale or refinance
  };

  // Calculate exit value
  const exitValue = SimplifiedSimulationCalculator.calculateLoanExitValue(loan, fundSettings);

  // Calculate expected values for verification
  const yearsHeld = 5;
  const appreciatedPropertyValue = 1000000 * Math.pow(1.04, 5); // ~$1,216,653
  const propertyAppreciation = appreciatedPropertyValue - 1000000; // ~$216,653
  const appreciationFee = propertyAppreciation * 0.4; // ~$86,661
  const interest = 400000 * 0.05 * 5; // $100,000
  const expectedExitValue = 400000 + interest + appreciationFee; // ~$586,661

  console.log('Loan amount:', loan.loan_amount);
  console.log('Years held:', yearsHeld);
  console.log('Original property value:', loan.property_value);
  console.log('Appreciated property value:', appreciatedPropertyValue);
  console.log('Property appreciation:', propertyAppreciation);
  console.log('Appreciation fee (40%):', appreciationFee);
  console.log('Interest (5% simple):', interest);
  console.log('Expected exit value:', expectedExitValue);
  console.log('Calculated exit value:', exitValue);
  console.log('Difference:', exitValue - expectedExitValue);
  console.log('Test passed:', Math.abs(exitValue - expectedExitValue) < 0.01);
  console.log('');

  return Math.abs(exitValue - expectedExitValue) < 0.01;
};

/**
 * Test the waterfall calculation
 */
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
  const waterfall = SimplifiedSimulationCalculator.calculateWaterfall(
    totalProfit,
    hurdleRate,
    carriedInterestRate,
    lpInvestment,
    gpInvestment,
    investmentTerm
  );

  // Calculate expected values for verification
  const expectedHurdleAmount = lpInvestment * (Math.pow(1.06, 10) - 1); // ~$69.08M
  let remainingProfit = totalProfit - expectedHurdleAmount;

  console.log('Total profit:', totalProfit);
  console.log('LP investment:', lpInvestment);
  console.log('GP investment:', gpInvestment);
  console.log('Hurdle rate:', hurdleRate);
  console.log('Investment term:', investmentTerm);
  console.log('Expected hurdle amount:', expectedHurdleAmount);
  console.log('Calculated hurdle amount:', waterfall.hurdleAmount);
  console.log('Remaining profit after hurdle:', remainingProfit);

  // Since remaining profit is negative, there should be no GP catch-up or carried interest
  if (remainingProfit <= 0) {
    console.log('No remaining profit for GP catch-up or carried interest');
    console.log('Expected GP catch-up: 0');
    console.log('Calculated GP catch-up:', waterfall.gpCatchup);
    console.log('Expected GP carried interest: 0');
    console.log('Calculated GP carried interest:', waterfall.gpCarriedInterest);
    console.log('Expected LP residual: 0');
    console.log('Calculated LP residual:', waterfall.lpResidual);
  } else {
    // Calculate expected GP catch-up
    const expectedCatchupAmount = (expectedHurdleAmount * carriedInterestRate) / (1 - carriedInterestRate);
    const expectedGpCatchup = Math.min(remainingProfit, expectedCatchupAmount);
    remainingProfit -= expectedGpCatchup;

    // Calculate expected carried interest
    const expectedGpCarriedInterest = remainingProfit * carriedInterestRate;
    const expectedLpResidual = remainingProfit * (1 - carriedInterestRate);

    console.log('Expected GP catch-up:', expectedGpCatchup);
    console.log('Calculated GP catch-up:', waterfall.gpCatchup);
    console.log('Expected GP carried interest:', expectedGpCarriedInterest);
    console.log('Calculated GP carried interest:', waterfall.gpCarriedInterest);
    console.log('Expected LP residual:', expectedLpResidual);
    console.log('Calculated LP residual:', waterfall.lpResidual);
  }

  // Calculate expected total returns
  const expectedTotalGpReturn = gpInvestment;
  const expectedTotalLpReturn = lpInvestment + Math.min(totalProfit, expectedHurdleAmount);

  console.log('Expected total GP return:', expectedTotalGpReturn);
  console.log('Calculated total GP return:', waterfall.totalGpReturn);
  console.log('Expected total LP return:', expectedTotalLpReturn);
  console.log('Calculated total LP return:', waterfall.totalLpReturn);

  const gpReturnDiff = Math.abs(waterfall.totalGpReturn - expectedTotalGpReturn);
  const lpReturnDiff = Math.abs(waterfall.totalLpReturn - expectedTotalLpReturn);

  console.log('GP return difference:', gpReturnDiff);
  console.log('LP return difference:', lpReturnDiff);
  console.log('Test passed:', gpReturnDiff < 0.01 && lpReturnDiff < 0.01);
  console.log('');

  return gpReturnDiff < 0.01 && lpReturnDiff < 0.01;
};

/**
 * Test the full simulation
 */
const testSimulation = () => {
  console.log('Testing full simulation...');

  // Run simulation with default settings
  const result = SimplifiedSimulationCalculator.runSimulation();

  console.log('Fund size:', result.total_investment);
  console.log('Total return:', result.total_return);
  console.log('IRR:', result.irr);
  console.log('Equity multiple:', result.equity_multiple);
  console.log('ROI:', result.roi);
  console.log('');

  console.log('GP Economics:');
  console.log('GP investment:', result.gp_economics.investment);
  console.log('Management fees:', result.gp_economics.management_fees);
  console.log('Origination fees:', result.gp_economics.origination_fees);
  console.log('Carried interest:', result.gp_economics.carried_interest);
  console.log('Total GP return:', result.gp_economics.total_return);
  console.log('GP ROI:', result.gp_economics.roi);
  console.log('');

  console.log('LP Economics:');
  console.log('LP investment:', result.lp_economics.investment);
  console.log('Preferred return:', result.lp_economics.preferred_return);
  console.log('Residual profits:', result.lp_economics.residual_profits);
  console.log('Total LP return:', result.lp_economics.total_return);
  console.log('LP ROI:', result.lp_economics.roi);
  console.log('');

  console.log('Yearly Cash Flows:');
  result.yearly_cash_flows.forEach((flow, year) => {
    console.log(`Year ${year}: $${flow.toFixed(2)}`);
  });
  console.log('');

  console.log('Yearly NAV:');
  result.yearly_nav.forEach((nav, year) => {
    console.log(`Year ${year}: $${nav.toFixed(2)}`);
  });
  console.log('');

  // Basic validation - returns should be positive
  return result.total_return > 0 && result.irr > 0 && result.equity_multiple > 1;
};

/**
 * Run all tests
 */
const runTests = () => {
  console.log('Running tests for Simplified Simulation Calculator...');
  console.log('=================================================');

  const loanExitValueTestPassed = testLoanExitValue();
  const waterfallTestPassed = testWaterfall();
  const simulationTestPassed = testSimulation();

  console.log('=================================================');
  console.log('Test Results:');
  console.log('Loan Exit Value Test:', loanExitValueTestPassed ? 'PASSED' : 'FAILED');
  console.log('Waterfall Test:', waterfallTestPassed ? 'PASSED' : 'FAILED');
  console.log('Simulation Test:', simulationTestPassed ? 'PASSED' : 'FAILED');
  console.log('=================================================');

  return loanExitValueTestPassed && waterfallTestPassed && simulationTestPassed;
};

// Run the tests
runTests();
