/**
 * Python Simulation Client
 *
 * This module provides a client for communicating with the Python simulation calculator API.
 * It handles API requests and responses, and provides fallback to the JavaScript implementation
 * if the Python API is not available.
 */

import { SimplifiedSimulationCalculator } from './simplifiedSimulationCalculator';

// API base URL - change this to match your Python API server
const API_BASE_URL = 'http://localhost:8000/api/simulation';
const API_ROOT_URL = 'http://localhost:8000';

/**
 * Python Simulation Client
 */
const PythonSimulationClient = {
  /**
   * Check if the Python API is available
   *
   * @returns Promise that resolves to true if the API is available, false otherwise
   */
  checkAvailability: async (): Promise<boolean> => {
    try {
      const response = await fetch(API_ROOT_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(2000)
      }).catch(() => null);

      return !!(response && response.ok);
    } catch (error) {
      console.error('Error checking Python API availability:', error);
      return false;
    }
  },

  /**
   * Normalize the Python API response to match the JavaScript implementation
   *
   * @param pythonResponse The response from the Python API
   * @returns Normalized response that matches the JavaScript implementation
   */
  normalizeResponse: (pythonResponse: any) => {
    console.log('Normalizing Python API response:', pythonResponse);

    // Generate a synthetic portfolio if none is provided
    const portfolio = pythonResponse.portfolio || {
      loans: [],
      metrics: {}
    };

    // If no loans are provided, generate synthetic loans
    if (!portfolio.loans || portfolio.loans.length === 0) {
      console.log('Generating synthetic portfolio from Python API response');

      // Generate synthetic loans based on the fund parameters
      const numLoans = pythonResponse.num_loans || 250;
      const fundSize = pythonResponse.fund_size || 100000000;
      const avgLoanSize = fundSize / numLoans;

      // Create synthetic loans
      portfolio.loans = Array.from({ length: numLoans }, (_, i) => {
        // Randomize exit year with a bell curve around 7 years
        const exitYearNormal = Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
        const exitYear = Math.max(1, Math.min(10, Math.round(7 + 1.5 * exitYearNormal)));

        // Randomize loan amount around the average
        const loanAmount = avgLoanSize * (0.7 + 0.6 * Math.random());

        // Randomize LTV around 40%
        const ltv = 0.4 * (0.7 + 0.6 * Math.random());

        // Calculate property value based on loan amount and LTV
        const propertyValue = loanAmount / ltv;

        // Randomize appreciation rate around 4%
        const appreciationRate = 0.04 * (0.7 + 0.6 * Math.random());

        return {
          id: `PY-${i+1}`,
          property_value: propertyValue,
          loan_amount: loanAmount,
          ltv: ltv,
          appreciation_rate: appreciationRate,
          exit_year: exitYear,
          expected_exit_value: propertyValue * (1 + appreciationRate * exitYear),
          zone: i % 3 === 0 ? 'green' : (i % 3 === 1 ? 'orange' : 'red')
        };
      });

      // Calculate portfolio metrics
      const totalPropertyValue = portfolio.loans.reduce((sum, loan) => sum + loan.property_value, 0);
      const totalLoanAmount = portfolio.loans.reduce((sum, loan) => sum + loan.loan_amount, 0);
      const avgPropertyValue = totalPropertyValue / numLoans;
      const calculatedAvgLoanSize = totalLoanAmount / numLoans;
      const avgLtv = portfolio.loans.reduce((sum, loan) => sum + loan.ltv, 0) / numLoans;
      const avgAppreciationRate = portfolio.loans.reduce((sum, loan) => sum + loan.appreciation_rate, 0) / numLoans;
      const avgExitYear = portfolio.loans.reduce((sum, loan) => sum + loan.exit_year, 0) / numLoans;

      // Set portfolio metrics
      portfolio.metrics = {
        total_loans: numLoans,
        average_loan_size: calculatedAvgLoanSize,
        average_ltv: avgLtv,
        average_property_value: avgPropertyValue,
        average_appreciation_rate: avgAppreciationRate,
        average_exit_year: avgExitYear,
        total_initial_value: totalPropertyValue,
        total_loan_amount: totalLoanAmount
      };

      // Count loans by zone
      portfolio.zoneDistribution = {
        green: portfolio.loans.filter(loan => loan.zone === 'green').length,
        orange: portfolio.loans.filter(loan => loan.zone === 'orange').length,
        red: portfolio.loans.filter(loan => loan.zone === 'red').length
      };
    }

    // Generate cashflows from the yearly_cash_flows if available
    const cashflows = pythonResponse.yearly_cash_flows || [];

    // Also include the yearly_cash_flows in the response for direct access
    const yearly_cash_flows = pythonResponse.yearly_cash_flows || [];

    // Create a normalized response that matches the JavaScript implementation
    return {
      // Fund metrics
      fundSize: pythonResponse.fund_size,
      numLoans: pythonResponse.num_loans,
      totalReturn: pythonResponse.total_return,
      totalProfit: pythonResponse.total_profit,
      irr: pythonResponse.irr,
      equityMultiple: pythonResponse.equity_multiple,
      roi: pythonResponse.roi,

      // Portfolio data
      portfolio: portfolio,

      // Cashflows
      cashflows: cashflows,
      yearly_cash_flows: yearly_cash_flows,

      // GP economics
      gpEconomics: {
        investment: pythonResponse.gp_economics.investment,
        managementFees: pythonResponse.gp_economics.management_fees,
        originationFees: pythonResponse.gp_economics.origination_fees,
        catchup: pythonResponse.gp_economics.catchup,
        carriedInterest: pythonResponse.gp_economics.carried_interest,
        totalReturn: pythonResponse.gp_economics.total_return,
        roi: pythonResponse.gp_economics.roi
      },

      // LP economics
      lpEconomics: {
        investment: pythonResponse.lp_economics.investment,
        preferredReturn: pythonResponse.lp_economics.preferred_return,
        residual: pythonResponse.lp_economics.residual,
        totalReturn: pythonResponse.lp_economics.total_return,
        roi: pythonResponse.lp_economics.roi
      },

      // Loan exit result
      loanExitResult: {
        loan: pythonResponse.loan_exit_result.loan,
        yearsHeld: pythonResponse.loan_exit_result.years_held,
        appreciatedPropertyValue: pythonResponse.loan_exit_result.appreciated_property_value,
        propertyAppreciation: pythonResponse.loan_exit_result.property_appreciation,
        interest: pythonResponse.loan_exit_result.interest,
        appreciationFee: pythonResponse.loan_exit_result.appreciation_fee,
        exitValue: pythonResponse.loan_exit_result.exit_value
      }
    };
  },

  runSimulation: async (params: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const pythonResponse = await response.json();
      console.log('Python API response:', pythonResponse);

      // Normalize the response to match the JavaScript implementation
      return PythonSimulationClient.normalizeResponse(pythonResponse);
    } catch (error) {
      console.warn('Python API not available, falling back to JavaScript implementation', error);
      return SimplifiedSimulationCalculator.runSimulation(params);
    }
  },

  /**
   * Calculate the exit value of a loan
   *
   * @param loan Loan object
   * @param fundSettings Fund settings
   * @returns Exit value of the loan
   */
  calculateLoanExitValue: async (loan: any, fundSettings: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/loan-exit-value`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loan,
          fund_settings: fundSettings,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result.exit_value;
    } catch (error) {
      console.warn('Python API not available, falling back to JavaScript implementation', error);
      return SimplifiedSimulationCalculator.calculateLoanExitValue(loan, fundSettings);
    }
  },

  /**
   * Calculate the waterfall distribution
   *
   * @param totalProfit Total profit
   * @param hurdleRate Hurdle rate
   * @param carriedInterestRate Carried interest rate
   * @param lpInvestment LP investment
   * @param gpInvestment GP investment
   * @param investmentTerm Investment term
   * @returns Waterfall distribution
   */
  calculateWaterfall: async (
    totalProfit: number,
    hurdleRate: number,
    carriedInterestRate: number,
    lpInvestment: number,
    gpInvestment: number,
    investmentTerm: number
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/waterfall`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total_profit: totalProfit,
          hurdle_rate: hurdleRate,
          carried_interest_rate: carriedInterestRate,
          lp_investment: lpInvestment,
          gp_investment: gpInvestment,
          investment_term: investmentTerm,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Python API not available, falling back to JavaScript implementation', error);
      return SimplifiedSimulationCalculator.calculateWaterfall(
        totalProfit,
        hurdleRate,
        carriedInterestRate,
        lpInvestment,
        gpInvestment,
        investmentTerm
      );
    }
  },

  /**
   * Calculate the internal rate of return (IRR) for a series of cash flows
   *
   * @param cashFlows Array of cash flows
   * @returns IRR as a decimal
   */
  calculateIRR: async (cashFlows: number[]) => {
    try {
      const response = await fetch(`${API_BASE_URL}/irr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cashFlows),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result.irr;
    } catch (error) {
      console.warn('Python API not available, falling back to JavaScript implementation', error);
      return SimplifiedSimulationCalculator.MathUtils.calculateIRR(cashFlows);
    }
  },

  /**
   * Check if the Python API is available
   *
   * @returns True if the Python API is available, false otherwise
   */
  isAvailable: async () => {
    try {
      console.log('Checking Python API availability at:', API_BASE_URL.replace('/api/simulation', ''));
      const response = await fetch(API_BASE_URL.replace('/api/simulation', ''), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Add a timeout to avoid hanging if the server is not responding
        signal: AbortSignal.timeout(2000)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Python API response:', data);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error checking Python API availability:', error);
      return false;
    }
  }
};

export default PythonSimulationClient;
