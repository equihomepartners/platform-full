import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calculator, Info, Server, AlertTriangle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import PythonSimulationClient from '../services/pythonSimulationClient';

/**
 * Simplified Calculator Component
 *
 * This component provides a simple UI for testing the core financial calculations
 * of the Equihome business model.
 */
const SimplifiedCalculator: React.FC = () => {
  // Fund settings state
  const [fundSettings, setFundSettings] = useState({
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
  });

  // Results state
  const [results, setResults] = useState<any>(null);

  // Python API state
  const [isPythonAvailable, setIsPythonAvailable] = useState<boolean>(false);
  const [isCheckingPython, setIsCheckingPython] = useState<boolean>(true);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFundSettings({
      ...fundSettings,
      [name]: parseFloat(value)
    });
  };

  // Handle slider changes
  const handleSliderChange = (name: string, value: number) => {
    setFundSettings({
      ...fundSettings,
      [name]: value
    });
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Calculate loan exit value
  const calculateLoanExitValue = () => {
    // Create a sample loan
    const loan = {
      loan_amount: fundSettings.average_property_value * fundSettings.average_ltv,
      property_value: fundSettings.average_property_value,
      ltv: fundSettings.average_ltv,
      origination_year: 0,
      exit_year: fundSettings.average_exit_timeframe, // When homeowner exits through sale or refinance
      appreciation_rate: fundSettings.average_appreciation_rate
    };

    // Calculate years held
    const yearsHeld = loan.exit_year - loan.origination_year;

    // Calculate property appreciation
    const appreciatedPropertyValue = loan.property_value * Math.pow(1 + loan.appreciation_rate, yearsHeld);

    // Calculate simple interest on the loan amount
    const interest = loan.loan_amount * fundSettings.simple_interest_rate * yearsHeld;

    // Calculate appreciation fee (LTV% of appreciation)
    const propertyAppreciation = appreciatedPropertyValue - loan.property_value;
    const appreciationFee = propertyAppreciation * loan.ltv;

    // Calculate total exit value
    const exitValue = loan.loan_amount + interest + appreciationFee;

    return {
      loan,
      yearsHeld,
      appreciatedPropertyValue,
      propertyAppreciation,
      interest,
      appreciationFee,
      exitValue
    };
  };

  // Calculate fund performance
  const calculateFundPerformance = () => {
    // Calculate GP and LP investments
    const gpInvestment = fundSettings.fund_size * fundSettings.gp_investment_percentage;
    const lpInvestment = fundSettings.fund_size - gpInvestment;

    // Generate a simple portfolio
    const averageLoanAmount = fundSettings.average_property_value * fundSettings.average_ltv;
    const numLoans = Math.floor(fundSettings.fund_size / averageLoanAmount);

    // Calculate origination fees
    const totalLoanAmount = numLoans * averageLoanAmount;
    const originationFees = totalLoanAmount * fundSettings.origination_fee_rate;

    // Calculate management fees
    const annualManagementFee = fundSettings.fund_size * fundSettings.management_fee_rate;
    const totalManagementFees = annualManagementFee * fundSettings.fund_term;

    // Calculate loan exit values
    const loanExitResult = calculateLoanExitValue();
    const exitValue = loanExitResult.exitValue;

    // Calculate total return from all loans
    const totalLoanReturn = numLoans * exitValue;

    // Calculate total fund return
    const totalReturn = totalLoanReturn + originationFees - totalManagementFees;

    // Calculate profit
    const totalProfit = totalReturn - fundSettings.fund_size;

    // Calculate waterfall
    // Step 1: Return of capital
    const lpReturnOfCapital = lpInvestment;
    const gpReturnOfCapital = gpInvestment;

    // Step 2: Preferred return (hurdle)
    const hurdleAmount = lpInvestment * (Math.pow(1 + fundSettings.hurdle_rate, fundSettings.fund_term) - 1);

    // Remaining profit after return of capital and hurdle
    let remainingProfit = totalProfit - hurdleAmount;

    // Step 3: GP catch-up (if applicable)
    let gpCatchup = 0;
    if (remainingProfit > 0) {
      // Calculate catch-up amount
      const catchupAmount = (hurdleAmount * fundSettings.performance_fee_rate) / (1 - fundSettings.performance_fee_rate);
      gpCatchup = Math.min(remainingProfit, catchupAmount);
      remainingProfit -= gpCatchup;
    }

    // Step 4: Carried interest split
    let gpCarriedInterest = 0;
    let lpResidual = 0;

    if (remainingProfit > 0) {
      gpCarriedInterest = remainingProfit * fundSettings.performance_fee_rate;
      lpResidual = remainingProfit * (1 - fundSettings.performance_fee_rate);
    }

    // Calculate total GP and LP returns
    const totalGpReturn = gpReturnOfCapital + gpCatchup + gpCarriedInterest + originationFees + totalManagementFees;
    const totalLpReturn = lpReturnOfCapital + Math.min(hurdleAmount, totalProfit) + lpResidual;

    // Calculate IRR (simplified)
    const irr = totalProfit / fundSettings.fund_size / fundSettings.fund_term;

    // Calculate equity multiple
    const equityMultiple = totalReturn / fundSettings.fund_size;

    // Calculate ROI
    const roi = totalProfit / fundSettings.fund_size;

    return {
      fundSize: fundSettings.fund_size,
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
      loanExitResult,
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

  // Run calculations
  const runCalculations = async () => {
    let results;

    if (isPythonAvailable) {
      // Use Python backend
      results = await PythonSimulationClient.runSimulation(fundSettings);
    } else {
      // Use JavaScript implementation
      results = calculateFundPerformance();
    }

    setResults(results);
  };

  // Check if Python API is available
  useEffect(() => {
    const checkPythonAvailability = async () => {
      setIsCheckingPython(true);
      const available = await PythonSimulationClient.isAvailable();
      setIsPythonAvailable(available);
      setIsCheckingPython(false);
    };

    checkPythonAvailability();
  }, []);

  // Run calculations on mount and when settings change
  useEffect(() => {
    runCalculations();
  }, [fundSettings, isPythonAvailable]);

  // Custom slider component
  const Slider = ({ name, value, min, max, step, label, formatter }: {
    name: string,
    value: number,
    min: number,
    max: number,
    step: number,
    label: string,
    formatter: (value: number) => string
  }) => {
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-neutral-700">{label}</label>
          <span className="text-sm font-semibold text-primary-700">{formatter(value)}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => handleSliderChange(name, parseFloat(e.target.value))}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    );
  };

  // Custom card component
  const Card = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden mb-6">
        <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3">
          <h3 className="text-lg font-medium text-primary-900">{title}</h3>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    );
  };

  // Custom metric component
  const Metric = ({ label, value }: { label: string, value: string | number }) => {
    return (
      <div className="mb-4">
        <div className="text-sm font-medium text-neutral-500 mb-1">{label}</div>
        <div className="text-lg font-semibold text-primary-900">{value}</div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calculator className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold text-primary-900">Simplified Fund Calculator</h2>
          </div>
          <div className="flex items-center">
            {isCheckingPython ? (
              <div className="flex items-center text-neutral-500">
                <Server className="h-5 w-5 mr-1 animate-pulse" />
                <span className="text-sm">Checking Python API...</span>
              </div>
            ) : isPythonAvailable ? (
              <div className="flex items-center text-green-600">
                <Server className="h-5 w-5 mr-1" />
                <span className="text-sm">Using Python backend</span>
              </div>
            ) : (
              <div className="flex items-center text-amber-600">
                <AlertTriangle className="h-5 w-5 mr-1" />
                <span className="text-sm">Using JavaScript fallback</span>
              </div>
            )}
          </div>
        </div>
        <p className="text-neutral-600">
          This calculator implements the core financial calculations for the Equihome business model.
          Adjust the parameters below to see how they affect the fund performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fund Settings */}
        <div className="space-y-6">
          <Card title="Fund Settings">
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">Fund Size</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="number"
                  name="fund_size"
                  value={fundSettings.fund_size}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <Slider
              name="fund_term"
              value={fundSettings.fund_term}
              min={5}
              max={15}
              step={1}
              label="Fund Term"
              formatter={(value) => `${value} years`}
            />

            <Slider
              name="management_fee_rate"
              value={fundSettings.management_fee_rate}
              min={0.01}
              max={0.03}
              step={0.0025}
              label="Management Fee"
              formatter={formatPercentage}
            />

            <Slider
              name="hurdle_rate"
              value={fundSettings.hurdle_rate}
              min={0.04}
              max={0.08}
              step={0.005}
              label="Hurdle Rate"
              formatter={formatPercentage}
            />

            <Slider
              name="performance_fee_rate"
              value={fundSettings.performance_fee_rate}
              min={0.1}
              max={0.3}
              step={0.025}
              label="Performance Fee"
              formatter={formatPercentage}
            />

            <Slider
              name="origination_fee_rate"
              value={fundSettings.origination_fee_rate}
              min={0.01}
              max={0.05}
              step={0.005}
              label="Origination Fee"
              formatter={formatPercentage}
            />

            <Slider
              name="simple_interest_rate"
              value={fundSettings.simple_interest_rate}
              min={0.03}
              max={0.07}
              step={0.005}
              label="Simple Interest Rate"
              formatter={formatPercentage}
            />

            <Slider
              name="gp_investment_percentage"
              value={fundSettings.gp_investment_percentage}
              min={0.01}
              max={0.1}
              step={0.01}
              label="GP Investment"
              formatter={formatPercentage}
            />
          </Card>

          <Card title="Loan Parameters">
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">Average Property Value</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="number"
                  name="average_property_value"
                  value={fundSettings.average_property_value}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <Slider
              name="average_ltv"
              value={fundSettings.average_ltv}
              min={0.2}
              max={0.6}
              step={0.05}
              label="Average LTV"
              formatter={formatPercentage}
            />

            <Slider
              name="average_appreciation_rate"
              value={fundSettings.average_appreciation_rate}
              min={0.02}
              max={0.06}
              step={0.005}
              label="Average Appreciation Rate"
              formatter={formatPercentage}
            />

            <Slider
              name="average_exit_timeframe"
              value={fundSettings.average_exit_timeframe}
              min={3}
              max={10}
              step={1}
              label="Average Exit Timeframe"
              formatter={(value) => `${value} years`}
            />
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {results && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="gp">GP Economics</TabsTrigger>
                <TabsTrigger value="lp">LP Economics</TabsTrigger>
                <TabsTrigger value="loan">Sample Loan</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card title="Fund Performance">
                  <div className="grid grid-cols-2 gap-4">
                    <Metric label="Fund Size" value={results.fundSize ? formatCurrency(results.fundSize) : 'N/A'} />
                    <Metric label="Number of Loans" value={results.numLoans || 'N/A'} />
                    <Metric label="Total Return" value={results.totalReturn ? formatCurrency(results.totalReturn) : 'N/A'} />
                    <Metric label="Total Profit" value={results.totalProfit ? formatCurrency(results.totalProfit) : 'N/A'} />
                    <Metric label="IRR (Simplified)" value={results.irr ? formatPercentage(results.irr) : 'N/A'} />
                    <Metric label="Equity Multiple" value={results.equityMultiple ? `${results.equityMultiple.toFixed(2)}x` : 'N/A'} />
                    <Metric label="ROI" value={results.roi ? formatPercentage(results.roi) : 'N/A'} />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="gp">
                <Card title="GP Economics">
                  <div className="grid grid-cols-2 gap-4">
                    <Metric label="GP Investment" value={results.gpEconomics?.investment ? formatCurrency(results.gpEconomics.investment) : 'N/A'} />
                    <Metric label="Management Fees" value={results.gpEconomics?.managementFees ? formatCurrency(results.gpEconomics.managementFees) : 'N/A'} />
                    <Metric label="Origination Fees" value={results.gpEconomics?.originationFees ? formatCurrency(results.gpEconomics.originationFees) : 'N/A'} />
                    <Metric label="GP Catch-up" value={results.gpEconomics?.catchup ? formatCurrency(results.gpEconomics.catchup) : 'N/A'} />
                    <Metric label="Carried Interest" value={results.gpEconomics?.carriedInterest ? formatCurrency(results.gpEconomics.carriedInterest) : 'N/A'} />
                    <Metric label="Total GP Return" value={results.gpEconomics?.totalReturn ? formatCurrency(results.gpEconomics.totalReturn) : 'N/A'} />
                    <Metric label="GP ROI" value={results.gpEconomics?.roi ? formatPercentage(results.gpEconomics.roi) : 'N/A'} />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="lp">
                <Card title="LP Economics">
                  <div className="grid grid-cols-2 gap-4">
                    <Metric label="LP Investment" value={results.lpEconomics?.investment ? formatCurrency(results.lpEconomics.investment) : 'N/A'} />
                    <Metric label="Preferred Return" value={results.lpEconomics?.preferredReturn ? formatCurrency(results.lpEconomics.preferredReturn) : 'N/A'} />
                    <Metric label="LP Residual" value={results.lpEconomics?.residual ? formatCurrency(results.lpEconomics.residual) : 'N/A'} />
                    <Metric label="Total LP Return" value={results.lpEconomics?.totalReturn ? formatCurrency(results.lpEconomics.totalReturn) : 'N/A'} />
                    <Metric label="LP ROI" value={results.lpEconomics?.roi ? formatPercentage(results.lpEconomics.roi) : 'N/A'} />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="loan">
                <Card title="Sample Loan Exit Value">
                  <div className="grid grid-cols-2 gap-4">
                    <Metric label="Loan Amount" value={results.loanExitResult?.loan?.loan_amount ? formatCurrency(results.loanExitResult.loan.loan_amount) : 'N/A'} />
                    <Metric label="Property Value" value={results.loanExitResult?.loan?.property_value ? formatCurrency(results.loanExitResult.loan.property_value) : 'N/A'} />
                    <Metric label="Years Held" value={results.loanExitResult?.yearsHeld || 'N/A'} />
                    <Metric label="Appreciated Value" value={results.loanExitResult?.appreciatedPropertyValue ? formatCurrency(results.loanExitResult.appreciatedPropertyValue) : 'N/A'} />
                    <Metric label="Appreciation" value={results.loanExitResult?.propertyAppreciation ? formatCurrency(results.loanExitResult.propertyAppreciation) : 'N/A'} />
                    <Metric label="Interest" value={results.loanExitResult?.interest ? formatCurrency(results.loanExitResult.interest) : 'N/A'} />
                    <Metric label="Appreciation Fee" value={results.loanExitResult?.appreciationFee ? formatCurrency(results.loanExitResult.appreciationFee) : 'N/A'} />
                    <Metric label="Exit Value" value={results.loanExitResult?.exitValue ? formatCurrency(results.loanExitResult.exitValue) : 'N/A'} />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-blue-800 mb-1">About This Calculator</h4>
                <p className="text-sm text-blue-700">
                  This simplified calculator focuses on the core financial calculations of the Equihome business model.
                  It uses real calculations with no mock data to properly model financial inputs.
                </p>
                <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
                  <li>3% origination fee charged upfront</li>
                  <li>5% simple interest capitalized to the end of term</li>
                  <li>Appreciation fee equal to the LTV percentage of property appreciation</li>
                  <li>2% management fee on AUM</li>
                  <li>20% performance fee over a 6% hurdle</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedCalculator;
