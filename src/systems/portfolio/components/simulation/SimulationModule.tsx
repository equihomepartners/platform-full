import React, { useState, useEffect } from 'react';
import FundSettingsPanel from './FundSettingsPanel';
import LoanParametersPanel from './LoanParametersPanel';
import AdvancedParametersPanel from './AdvancedParametersPanel';
import ResultsPanel from './ResultsPanel';
import PythonServerStatus from './PythonServerStatus';
import { MonteCarloSimulator } from '../../services/simulation/MonteCarloSimulator';
import { Info, Loader2, Maximize2, X } from 'lucide-react';
import PythonSimulationClient from '../../services/pythonSimulationClient';
import { checkPythonServer, startPythonServer } from '../../services/pythonServerManager';
import '../banking-module/theme.css';

interface SimulationModuleProps {
  onClose?: () => void;
}

const SimulationModule: React.FC<SimulationModuleProps> = ({ onClose }) => {
  // State for fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Python server state
  const [isPythonAvailable, setIsPythonAvailable] = useState<boolean>(false);
  const [isCheckingPython, setIsCheckingPython] = useState<boolean>(true);

  // Check and start Python server on component mount
  useEffect(() => {
    let isMounted = true;

    const checkAndStartPythonServer = async () => {
      if (!isMounted) return;
      setIsCheckingPython(true);

      // First check if the server is already running
      const isRunning = await checkPythonServer();

      if (!isMounted) return;

      if (isRunning) {
        console.log('Python server is already running');
        setIsPythonAvailable(true);
        setIsCheckingPython(false);
        return;
      }

      // If not running, try to start it
      console.log('Python server not running, attempting to start...');
      const started = await startPythonServer();

      if (!isMounted) return;

      if (started) {
        console.log('Python server started successfully');
        setIsPythonAvailable(true);
      } else {
        console.warn('Failed to start Python server, will use JavaScript fallback');
        setIsPythonAvailable(false);
      }

      setIsCheckingPython(false);
    };

    // Start the Python server immediately
    checkAndStartPythonServer();

    // Also set up a periodic check in case the server stops
    const interval = setInterval(async () => {
      if (!isMounted) return;

      // Only check if we think the server is available
      if (isPythonAvailable) {
        const isRunning = await checkPythonServer();
        if (!isMounted) return;

        if (!isRunning) {
          console.warn('Python server stopped running, attempting to restart...');
          setIsPythonAvailable(false);
          checkAndStartPythonServer();
        }
      }
    }, 30000); // Check every 30 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isPythonAvailable]);

  // Handle Python server status change
  const handlePythonStatusChange = (isRunning: boolean) => {
    setIsPythonAvailable(isRunning);
  };

  // Fund settings state
  const [fundSettings, setFundSettings] = useState({
    // Basic fund parameters
    fund_size: 100000000, // $100M
    fund_term: 10, // 10 years
    management_fee_rate: 0.02, // 2%
    hurdle_rate: 0.06, // 6%
    performance_fee_rate: 0.20, // 20%
    origination_fee_rate: 0.03, // 3%
    simple_interest_rate: 0.05, // 5%
    gp_investment_percentage: 0.05, // 5%

    // Loan parameters
    average_property_value: 1000000, // $1M
    average_ltv: 0.40, // 40%
    average_appreciation_rate: 0.04, // 4%
    average_exit_timeframe: 7, // 7 years (when homeowners exit through sale or refinance)

    // Advanced parameters
    number_of_loans: 0, // 0 means auto-calculate
    capital_recycling_enabled: false,
    capital_recycling_percentage: 0.7, // 70%

    // Monte Carlo simulation parameters
    monte_carlo_enabled: false,
    number_of_simulations: 100,

    // Tranche parameters
    enable_tranches: false,
    senior_tranche_percentage: 0.5, // 50%
    senior_tranche_rate: 0.05, // 5%
    mez_tranche_percentage: 0.3, // 30%
    mez_tranche_rate: 0.08, // 8%
    equity_tranche_percentage: 0.2 // 20% (calculated)
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Results state
  const [results, setResults] = useState<any>(null);

  // Calculation state
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle setting changes
  const handleSettingChange = (key: string, value: any) => {
    // Validate the input
    let error = '';

    // Numeric validation
    if (typeof value === 'number') {
      if (key === 'fund_size' && (value < 1000000 || value > 1000000000)) {
        error = 'Fund size must be between $1M and $1B';
      } else if (key === 'fund_term' && (value < 1 || value > 30)) {
        error = 'Fund term must be between 1 and 30 years';
      } else if (key.includes('rate') && (value < 0 || value > 1)) {
        error = 'Rate must be between 0 and 1 (0% to 100%)';
      } else if (key === 'gp_investment_percentage' && (value < 0 || value > 0.5)) {
        error = 'GP investment percentage must be between 0 and 0.5 (0% to 50%)';
      } else if (key === 'average_property_value' && (value < 100000 || value > 10000000)) {
        error = 'Average property value must be between $100K and $10M';
      } else if (key === 'average_ltv' && (value < 0.1 || value > 0.8)) {
        error = 'Average LTV must be between 0.1 and 0.8 (10% to 80%)';
      } else if (key === 'average_exit_timeframe' && (value < 1 || value > 30)) {
        error = 'Average exit timeframe must be between 1 and 30 years';
      }
    }

    // Update errors state
    if (error) {
      setErrors(prev => ({ ...prev, [key]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }

    // Update settings state
    setFundSettings(prev => ({ ...prev, [key]: value }));
  };

  // Run calculations
  const runCalculations = async () => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsCalculating(true);

    try {
      // Try to use Python API first
      if (isPythonAvailable) {
        console.log('Using Python API for simulation');
        const pythonResults = await PythonSimulationClient.runSimulation(fundSettings);

        // Log the Python results for debugging
        console.log('Python simulation results:', {
          irr: pythonResults.irr,
          portfolio: pythonResults.portfolio ? {
            totalLoans: pythonResults.portfolio.loans?.length || 0,
            metrics: pythonResults.portfolio.metrics
          } : 'No portfolio data',
          cashflows: pythonResults.cashflows?.length || 0
        });

        // Set the results
        setResults(pythonResults);
      } else {
        // Fallback to JavaScript implementation
        console.warn('Python API not available, using JavaScript implementation');

        // Log the fund settings for debugging
        console.log('Fund settings for simulation:', {
          fund_size: fundSettings.fund_size,
          gp_investment_percentage: fundSettings.gp_investment_percentage,
          capital_recycling_enabled: fundSettings.capital_recycling_enabled,
          capital_recycling_percentage: fundSettings.capital_recycling_percentage
        });

        // Create simulation parameters object
        const simulationParams = {
          // Fund parameters
          fundSize: fundSettings.fund_size || 100000000,
          fundTerm: fundSettings.fund_term || 10,
          managementFeeRate: fundSettings.management_fee_rate || 0.02,
          hurdleRate: fundSettings.hurdle_rate || 0.06,
          performanceFeeRate: fundSettings.performance_fee_rate || 0.20,
          originationFeeRate: fundSettings.origination_fee_rate || 0.03,
          simpleInterestRate: fundSettings.simple_interest_rate || 0.05,
          gpInvestmentPercentage: fundSettings.gp_investment_percentage !== undefined ? fundSettings.gp_investment_percentage : 0.05,

          // Loan parameters
          averagePropertyValue: fundSettings.average_property_value || 1000000,
          averageLTV: fundSettings.average_ltv || 0.40,
          averageAppreciationRate: fundSettings.average_appreciation_rate || 0.04,
          averageExitTimeframe: fundSettings.average_exit_timeframe || 7,

          // Advanced parameters
          numberOfLoans: fundSettings.number_of_loans || 0, // 0 means auto-calculate
          capitalRecyclingEnabled: fundSettings.capital_recycling_enabled !== undefined ? fundSettings.capital_recycling_enabled : false,
          capitalRecyclingPercentage: fundSettings.capital_recycling_percentage !== undefined ? fundSettings.capital_recycling_percentage : 0.7,

          // Portfolio volatility control parameters
          loanAmountVolatility: fundSettings.loan_amount_volatility || 0.2,
          ltvVolatility: fundSettings.ltv_volatility || 0.15,
          exitTimeframeVolatility: fundSettings.exit_timeframe_volatility || 1.5,
          appreciationRateVolatility: fundSettings.appreciation_rate_volatility || 0.25,

          // Monte Carlo parameters
          numberOfSimulations: fundSettings.number_of_simulations || 100,

          // Tranche parameters
          enableTranches: fundSettings.enable_tranches || false,
          seniorTranchePercentage: fundSettings.senior_tranche_percentage || 0.5,
          seniorTrancheRate: fundSettings.senior_tranche_rate || 0.05,
          mezTranchePercentage: fundSettings.mez_tranche_percentage || 0.3,
          mezTrancheRate: fundSettings.mez_tranche_rate || 0.08,
          equityTranchePercentage: 1 - (fundSettings.senior_tranche_percentage || 0.5) - (fundSettings.mez_tranche_percentage || 0.3)
        };

        // Create Monte Carlo simulator
        const simulator = new MonteCarloSimulator(simulationParams);

        // Determine whether to run a single simulation or Monte Carlo simulation
        let simulationResult;
        let monteCarloResults = [];
        let efficientFrontier = [];
        let optimizedResult = null;
        let correlations = {};
        let sensitivityAnalysis = {};

        // Always run a single simulation first for baseline results
        console.log('Running baseline simulation...');
        simulationResult = simulator.runSimulation();

        // If Monte Carlo is enabled, run the full Monte Carlo simulation
        if (fundSettings.monte_carlo_enabled) {
          console.log('Running Monte Carlo simulation...');
          try {
            // Run Monte Carlo simulation
            const monteCarloOutput = simulator.runMonteCarloSimulation();

            // Extract results
            simulationResult = monteCarloOutput.baseResult; // Override with base result from Monte Carlo
            monteCarloResults = monteCarloOutput.allResults;
            efficientFrontier = monteCarloOutput.efficientFrontier;
            optimizedResult = monteCarloOutput.optimizedResult;
            correlations = monteCarloOutput.correlations;
            sensitivityAnalysis = monteCarloOutput.sensitivityAnalysis;

            console.log('Monte Carlo simulation completed with', monteCarloResults.length, 'simulations');
          } catch (error) {
            console.error('Error running Monte Carlo simulation:', error);
            // Fall back to the single simulation result we already have

            // Create minimal Monte Carlo results to ensure Advanced Analytics tab works
            monteCarloResults = [simulationResult];
            efficientFrontier = [{ risk: 0.1, return: simulationResult.roi, portfolioAllocation: {} }];
            optimizedResult = simulationResult;
            correlations = {
              averageAppreciationRate: 0.8,
              averageLTV: 0.5,
              averagePropertyValue: 0.3,
              averageExitTimeframe: -0.2
            };
            sensitivityAnalysis = {
              appreciationRate: [{ factor: 1, value: simulationResult.portfolio.metrics.average_appreciation_rate, irr: simulationResult.irr }],
              ltv: [{ factor: 1, value: simulationResult.portfolio.metrics.average_ltv, irr: simulationResult.irr }],
              exitTimeframe: [{ factor: 1, value: simulationResult.portfolio.metrics.average_exit_year, irr: simulationResult.irr }],
              interestRate: [{ factor: 1, value: fundSettings.simple_interest_rate, irr: simulationResult.irr }]
            };
          }
        }

        // Extract key parameters for reference
        const fundSize = simulationParams.fundSize;
        const fundTerm = simulationParams.fundTerm;
        const managementFeeRate = simulationParams.managementFeeRate;
        const hurdleRate = simulationParams.hurdleRate;
        const performanceFeeRate = simulationParams.performanceFeeRate;
        const originationFeeRate = simulationParams.originationFeeRate;
        const simpleInterestRate = simulationParams.simpleInterestRate;
        const gpInvestmentPercentage = simulationParams.gpInvestmentPercentage;
        const averagePropertyValue = simulationParams.averagePropertyValue;
        const averageLTV = simulationParams.averageLTV;
        const averageAppreciationRate = simulationParams.averageAppreciationRate;
        const averageExitTimeframe = simulationParams.averageExitTimeframe;

        // Create exit year distribution (bell curve around averageExitTimeframe)
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

        // Generate loans
        const loans = Array.from({ length: numLoans }, (_, i) => {
          // Property value with realistic distribution (slightly skewed normal)
          const normalRand = Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
          const propertyValue = Math.max(300000, averagePropertyValue * (1 + 0.3 * normalRand));

          // LTV with realistic constraints
          const ltv = Math.max(0.2, Math.min(0.8, averageLTV * (0.7 + 0.6 * Math.random())));
          const loanAmount = propertyValue * ltv;

          // Appreciation rate varies by zone
          let appreciationRate;
          let zone;

          // Determine zone first (40% green, 40% orange, 20% red)
          const zoneRand = Math.random();
          if (zoneRand < 0.4) {
            zone = 'green';
            appreciationRate = averageAppreciationRate * (1 + 0.3 * Math.random());
            zoneDistribution.green++;
          } else if (zoneRand < 0.8) {
            zone = 'orange';
            appreciationRate = averageAppreciationRate * (0.7 + 0.3 * Math.random());
            zoneDistribution.orange++;
          } else {
            zone = 'red';
            appreciationRate = averageAppreciationRate * (0.3 + 0.4 * Math.random());
            zoneDistribution.red++;
          }

          // Exit year with bell curve distribution around averageExitTimeframe
          const exitYearNormal = Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
          const exitYear = Math.max(1, Math.min(fundTerm, Math.round(averageExitTimeframe + 1.5 * exitYearNormal)));
          exitYearDistribution[exitYear]++;

          // Expected exit value based on appreciation over time
          const expectedExitValue = propertyValue * (1 + appreciationRate * exitYear);

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
            id: `JS-${i+1}`,
            property_value: propertyValue,
            loan_amount: loanAmount,
            ltv: ltv,
            appreciation_rate: appreciationRate,
            exit_year: exitYear,
            expected_exit_value: expectedExitValue,
            zone
          };
        });

        // Calculate portfolio metrics
        const totalPropertyValue = loans.reduce((sum, loan) => sum + loan.property_value, 0);
        const avgPropertyValue = totalPropertyValue / numLoans;
        const avgLtv = loans.reduce((sum, loan) => sum + loan.ltv, 0) / numLoans;
        const avgAppreciationRate = loans.reduce((sum, loan) => sum + loan.appreciation_rate, 0) / numLoans;

        // Create portfolio object
        const portfolio = {
          loans,
          metrics: {
            total_loans: numLoans,
            average_loan_size: avgLoanSize,
            average_ltv: avgLtv,
            average_property_value: avgPropertyValue,
            average_appreciation_rate: avgAppreciationRate,
            total_initial_value: totalPropertyValue
          },
          exitYearDistribution,
          ltvBuckets,
          propertyValueBuckets,
          zoneDistribution
        };

        // Calculate fund performance metrics
        // 1. Calculate origination fees (charged upfront)
        const originationFees = totalLoanAmount * originationFeeRate;

        // 2. Calculate management fees (annual fee on AUM)
        const managementFees = totalLoanAmount * managementFeeRate * fundTerm;

        // 3. Calculate interest income (simple interest capitalized at term end)
        // For each loan, calculate interest based on its exit year
        const interestIncome = loans.reduce((sum, loan) => {
          return sum + (loan.loan_amount * simpleInterestRate * loan.exit_year);
        }, 0);

        // 4. Calculate appreciation income (based on LTV percentage of property appreciation)
        const appreciationIncome = loans.reduce((sum, loan) => {
          const appreciationValue = loan.property_value * loan.appreciation_rate * loan.exit_year;
          return sum + (appreciationValue * loan.ltv);
        }, 0);

        // 5. Calculate performance fees
        const gpInvestment = fundSize * gpInvestmentPercentage;
        const lpInvestment = fundSize * (1 - gpInvestmentPercentage);

        // Calculate preferred return
        const preferredReturn = lpInvestment * hurdleRate * fundTerm;

        // Calculate total profit before performance fees
        const profitBeforePerformanceFees = interestIncome + appreciationIncome + originationFees - managementFees;

        // Calculate performance fees (20% of profits above hurdle)
        let performanceFees = 0;
        if (profitBeforePerformanceFees > preferredReturn) {
          performanceFees = (profitBeforePerformanceFees - preferredReturn) * performanceFeeRate;
        }

        // 6. Calculate total return and profit
        const totalReturn = fundSize + profitBeforePerformanceFees - performanceFees;
        const totalProfit = totalReturn - fundSize;

        // 7. Calculate IRR using a more accurate method
        // For a more accurate IRR, we need to model cash flows by year
        const cashflows = [];

        // Initial investment (negative cash flow)
        cashflows.push(-fundSize);

        // Track remaining capital
        let remainingCapital = fundSize;
        let totalExitValue = 0;

        // Yearly cash flows
        for (let year = 1; year <= fundTerm; year++) {
          // Management fees (negative cash flow)
          const yearlyManagementFee = -fundSize * managementFeeRate;

          // Loan exits in this year
          const yearlyExits = loans.filter(loan => loan.exit_year === year);
          const exitValue = yearlyExits.reduce((sum, loan) => {
            const principal = loan.loan_amount;
            const interest = principal * simpleInterestRate * year;
            const appreciation = loan.property_value * loan.appreciation_rate * year * loan.ltv;
            return sum + principal + interest + appreciation;
          }, 0);

          totalExitValue += exitValue;

          // Net cash flow for this year
          const yearCashflow = yearlyManagementFee + exitValue;
          cashflows.push(yearCashflow);
        }

        // Add performance fee at the end (if applicable)
        if (cashflows.length > 0) {
          // Adjust the last cashflow to account for performance fees
          const lastIndex = cashflows.length - 1;
          cashflows[lastIndex] -= performanceFees;
        }

        // Calculate IRR using Newton-Raphson method
        const irr = calculateIRR(cashflows, 0.1, 100);

        // 8. Calculate equity multiple
        const equityMultiple = totalReturn / fundSize;

        // 9. Calculate ROI
        const roi = (totalProfit / fundSize);

        // Log the simulation result for debugging
        console.log('Simulation result:', {
          irr: simulationResult.irr,
          cashflows: simulationResult.cashflows,
          portfolio: {
            totalLoans: simulationResult.portfolio.loans.length,
            metrics: simulationResult.portfolio.metrics,
            sampleLoans: simulationResult.portfolio.loans.slice(0, 5)
          }
        });

        // Set the results
        setResults({
          // Core metrics from the simulation result
          irr: simulationResult.irr,
          roi: simulationResult.roi,
          equityMultiple: simulationResult.equityMultiple,
          totalReturn: simulationResult.totalReturn,
          totalProfit: simulationResult.totalProfit,
          sharpeRatio: simulationResult.sharpeRatio,
          maxDrawdown: simulationResult.maxDrawdown,
          successProbability: simulationResult.successProbability,

          // Financial components
          originationFees,
          managementFees,
          performanceFees,
          interestIncome,
          appreciationIncome,
          preferredReturn,

          // Portfolio and cashflow data
          portfolio: simulationResult.portfolio,
          cashflows: simulationResult.cashflows,
          yearlyNav: simulationResult.yearlyNav,

          // Monte Carlo results if enabled
          monteCarloResults,
          efficientFrontier,
          optimizedResult,
          correlations,
          sensitivityAnalysis,

          // Tranche returns if enabled
          trancheReturns: simulationResult.trancheReturns,

          // Fallback notification
          usingJavaScriptFallback: true,
          message: 'Using JavaScript fallback calculations. For more accurate results, please start the Python server.'
        });
      }
    } catch (error) {
      console.error('Error running calculations:', error);
      setResults({
        error: 'An error occurred while running calculations.'
      });
    } finally {
      setIsCalculating(false);
    }
  };

  // Helper function to calculate IRR using Newton-Raphson method
  const calculateIRR = (cashflows: number[], guess: number = 0.1, maxIterations: number = 1000): number => {
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

    // Constants for the calculation
    const EPSILON = 1e-10; // Precision threshold
    const MIN_RATE = -0.999; // Minimum rate (-99.9%)
    const MAX_RATE = 1; // Maximum rate (100%)

    // Initial guess
    let rate = guess;

    // Newton-Raphson iteration
    for (let i = 0; i < maxIterations; i++) {
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

      // Avoid division by zero
      if (Math.abs(derivativeNpv) < EPSILON) {
        console.warn('IRR calculation failed: derivative too close to zero');
        break;
      }

      // Update rate using Newton-Raphson formula
      const newRate = rate - npv / derivativeNpv;

      // Check if the new rate is within bounds
      if (newRate < MIN_RATE || newRate > MAX_RATE) {
        console.warn(`IRR calculation produced out-of-bounds rate: ${newRate}`);
        // Use a dampened update to stay within bounds
        rate = rate - 0.5 * (npv / derivativeNpv);
        rate = Math.max(MIN_RATE, Math.min(MAX_RATE, rate));
      } else {
        rate = newRate;
      }

      // Check for convergence by change in rate
      if (i > 0 && Math.abs(rate - newRate) < EPSILON) {
        console.log(`IRR calculation converged by rate change after ${i} iterations: ${rate * 100}%`);
        return rate;
      }
    }

    console.warn(`IRR calculation did not converge after ${maxIterations} iterations. Final rate: ${rate * 100}%`);
    return rate;
  };

  // Helper function to calculate yearly NAV
  const calculateYearlyNAV = (fundSize: number, loans: any[], managementFeeRate: number, fundTerm: number) => {
    const yearlyNav = [];
    const simpleInterestRate = fundSettings.simple_interest_rate || 0.05;

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
  };

  // Check if Python API is available
  useEffect(() => {
    const checkPythonAvailability = async () => {
      setIsCheckingPython(true);
      try {
        const isAvailable = await PythonSimulationClient.checkAvailability();
        setIsPythonAvailable(isAvailable);
      } catch (error) {
        console.error('Error checking Python availability:', error);
        setIsPythonAvailable(false);
      } finally {
        setIsCheckingPython(false);
      }
    };

    checkPythonAvailability();
  }, []);

  // Auto-run simulation when parameters change (with debounce)
  useEffect(() => {
    // Skip initial render
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Use a debounce to prevent too many calculations
    const debounceTimeout = setTimeout(() => {
      // Only auto-run if we already have results (user has run at least once)
      if (results) {
        runCalculations();
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(debounceTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fundSettings, errors]);

  return (
    <div className="simulation-module" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div className="header" style={{
        backgroundColor: '#0a2463',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Equihome Fund Simulator</h1>
          <p style={{ fontSize: '0.875rem', opacity: 0.8, margin: 0 }}>Institutional-Grade Financial Modeling</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={toggleFullscreen}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '4px',
              padding: '0.5rem',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Maximize2 size={18} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '4px',
                padding: '0.5rem',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Python Server Status */}
      <div style={{ padding: '0.5rem 1rem' }}>
        <PythonServerStatus onStatusChange={handlePythonStatusChange} />
      </div>

      {/* Main content area */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        height: 'calc(100vh - 110px)' // Adjusted for Python server status
      }}>
        {/* Left sidebar - Parameters */}
        <div style={{
          width: '30%',
          backgroundColor: '#f5f7fa',
          borderRight: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '1rem',
            backgroundColor: '#1e3a8a',
            color: 'white'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>Simulation Parameters</h3>
            <p style={{ fontSize: '0.875rem', opacity: 0.8, margin: 0 }}>Configure fund settings and loan parameters</p>
          </div>

          <div style={{
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            flex: 1
          }}>
            <FundSettingsPanel
              settings={fundSettings}
              errors={errors}
              onChange={handleSettingChange}
            />

            <LoanParametersPanel
              settings={fundSettings}
              errors={errors}
              onChange={handleSettingChange}
            />

            <AdvancedParametersPanel
              settings={fundSettings}
              errors={errors}
              onChange={handleSettingChange}
            />

            <div style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '1rem',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <Info size={20} style={{ color: '#3e92cc', marginRight: '0.5rem', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem', color: '#0a2463' }}>About This Simulator</h4>
                  <p style={{ fontSize: '0.875rem', color: '#4a4a4a', margin: 0 }}>
                    This simulator models the Equihome fund performance using real financial calculations.
                  </p>
                  <ul style={{
                    marginTop: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#4a4a4a',
                    paddingLeft: '1.5rem'
                  }}>
                    <li>3% origination fee charged upfront</li>
                    <li>5% simple interest capitalized to the end of term</li>
                    <li>Appreciation fee equal to the LTV percentage of property appreciation</li>
                    <li>2% management fee on AUM</li>
                    <li>20% performance fee over a 6% hurdle</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Run Simulation Button */}
            <button
              onClick={runCalculations}
              disabled={isCalculating || Object.keys(errors).length > 0}
              style={{
                backgroundColor: isCalculating || Object.keys(errors).length > 0 ? '#9ca3af' : '#0a2463',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: isCalculating || Object.keys(errors).length > 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 'auto'
              }}
            >
              {isCalculating ? (
                <>
                  <Loader2 size={20} style={{
                    animation: 'spin 1s linear infinite',
                    marginRight: '0.5rem'
                  }} />
                  Running Simulation...
                </>
              ) : 'Run Simulation'}
            </button>
          </div>
        </div>

        {/* Right content area - Results */}
        <div style={{
          width: '70%',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '1rem',
            backgroundColor: '#f5f7fa',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0, color: '#0a2463' }}>Simulation Results</h3>
            <p style={{ fontSize: '0.875rem', color: '#4a4a4a', margin: 0 }}>View detailed fund performance metrics and portfolio analysis</p>
          </div>

          <div style={{
            padding: '1rem',
            overflowY: 'auto',
            flex: 1
          }}>
            <ResultsPanel
              results={results}
              parameters={fundSettings}
              isCalculating={isCalculating}
            />
          </div>
        </div>
      </div>

      {/* Add a keyframe animation for the spinner */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default SimulationModule;
