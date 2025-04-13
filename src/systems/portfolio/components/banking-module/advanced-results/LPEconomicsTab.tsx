import React from 'react';
import BankingMetric from '../BankingMetric';
import '../theme.css';

interface LPEconomicsTabProps {
  results: any;
  parameters: any;
}

/**
 * LP Economics Tab
 *
 * Displays detailed information about the LP economics.
 */
const LPEconomicsTab: React.FC<LPEconomicsTabProps> = ({ results, parameters }) => {
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Get parameters with defaults for display
  const fundSize = parameters.fund_size || 100000000;
  const fundTerm = parameters.fund_term || 10;
  const hurdleRate = parameters.hurdle_rate || 0.06;
  const performanceFeeRate = parameters.performance_fee_rate || 0.20;
  const simpleInterestRate = parameters.simple_interest_rate || 0.05;
  const gpInvestmentPercentage = parameters.gp_investment_percentage || 0.05;
  const averagePropertyValue = parameters.average_property_value || 1000000;
  const averageLTV = parameters.average_ltv || 0.40;
  const averageAppreciationRate = parameters.average_appreciation_rate || 0.04;
  const averageExitTimeframe = parameters.average_exit_timeframe || 7;

  // Extract values from results if available
  const lpInvestment = results?.lpInvestment || (fundSize * (1 - gpInvestmentPercentage));
  const lpPreferredReturn = results?.lpPreferredReturn || (lpInvestment * hurdleRate * fundTerm);
  const yearlyReturns = results?.lpYearlyReturns || [];

  // Generate simple yearly returns if not available from results
  if (yearlyReturns.length === 0) {
    // Years 0 to fund term
    for (let year = 0; year <= fundTerm; year++) {
      if (year === averageExitTimeframe) {
        // All returns happen at the average exit timeframe
        yearlyReturns.push({
          year,
          returnOfCapital: lpInvestment,
          preferredReturn: lpPreferredReturn,
          residual: 0,
          total: lpInvestment + lpPreferredReturn
        });
      } else {
        // No returns in other years
        yearlyReturns.push({
          year,
          returnOfCapital: 0,
          preferredReturn: 0,
          residual: 0,
          total: 0
        });
      }
    }
  }

  return (
    <div>
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">LP Economics Summary</h3>
        <div className="banking-grid banking-grid-3 banking-gap-4">
          <div className="banking-card banking-p-4 banking-bg-primary banking-text-white">
            <h4 className="banking-text-sm banking-uppercase banking-mb-1 banking-opacity-80">LP Investment</h4>
            <div className="banking-text-2xl banking-font-bold">
              {formatCurrency(lpInvestment)}
            </div>
          </div>

          <div className="banking-card banking-p-4 banking-bg-secondary banking-text-white">
            <h4 className="banking-text-sm banking-uppercase banking-mb-1 banking-opacity-80">Preferred Return</h4>
            <div className="banking-text-2xl banking-font-bold">
              {formatCurrency(lpPreferredReturn)}
            </div>
          </div>

          <div className="banking-card banking-p-4 banking-bg-accent banking-text-white">
            <h4 className="banking-text-sm banking-uppercase banking-mb-1 banking-opacity-80">Total Return</h4>
            <div className="banking-text-2xl banking-font-bold">
              {formatCurrency(lpInvestment + lpPreferredReturn)}
            </div>
          </div>
        </div>
      </div>

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">LP Return Composition</h3>
        <div className="banking-card banking-p-4">
          <div className="banking-h-64 banking-w-full banking-flex banking-items-center banking-justify-center banking-bg-neutral-100 banking-rounded">
            <p className="banking-text-neutral-500">LP Return Composition Chart will be displayed here</p>
            {/* Chart component will be added here */}
          </div>
        </div>
      </div>

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">LP Return Breakdown</h3>
        <div className="banking-grid banking-grid-2 banking-gap-6">
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-semibold banking-mb-4">Return Components</h4>
            <div className="banking-grid banking-grid-2 banking-gap-4">
              <BankingMetric
                label="Return of Capital"
                value={formatCurrency(lpInvestment)}
              />

              <BankingMetric
                label="Preferred Return"
                value={formatCurrency(lpPreferredReturn)}
              />

              <BankingMetric
                label="LP Investment %"
                value={formatPercentage(1 - gpInvestmentPercentage)}
              />

              <BankingMetric
                label="Total LP Return"
                value={formatCurrency(lpInvestment + lpPreferredReturn)}
              />
            </div>
          </div>

          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-semibold banking-mb-4">Performance Metrics</h4>
            <div className="banking-grid banking-grid-2 banking-gap-4">
              <BankingMetric
                label="Hurdle Rate"
                value={formatPercentage(hurdleRate)}
              />

              <BankingMetric
                label="Fund Term"
                value={`${fundTerm} Years`}
              />

              <BankingMetric
                label="Exit Timeframe"
                value={`${averageExitTimeframe} Years`}
              />

              <BankingMetric
                label="Simple Interest Rate"
                value={formatPercentage(simpleInterestRate)}
              />

              <BankingMetric
                label="Appreciation Rate"
                value={formatPercentage(averageAppreciationRate)}
              />

              <BankingMetric
                label="Average LTV"
                value={formatPercentage(averageLTV)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">LP Yearly Returns</h3>
        <div className="banking-card banking-p-4 banking-overflow-x-auto">
          <table className="banking-w-full banking-min-w-full banking-border-collapse">
            <thead>
              <tr className="banking-bg-neutral-100">
                <th className="banking-text-left banking-p-2 banking-border-b banking-border-neutral-200">Year</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Return of Capital</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Preferred Return</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Residual</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Total</th>
              </tr>
            </thead>
            <tbody>
              {yearlyReturns.map((yearData) => (
                <tr key={yearData.year} className="banking-border-b banking-border-neutral-200 hover:banking-bg-neutral-50">
                  <td className="banking-p-2">{yearData.year}</td>
                  <td className="banking-text-right banking-p-2">{formatCurrency(yearData.returnOfCapital)}</td>
                  <td className="banking-text-right banking-p-2">{formatCurrency(yearData.preferredReturn)}</td>
                  <td className="banking-text-right banking-p-2">{formatCurrency(yearData.residual)}</td>
                  <td className="banking-text-right banking-p-2 banking-font-semibold">{formatCurrency(yearData.total)}</td>
                </tr>
              ))}
              <tr className="banking-bg-neutral-50">
                <td className="banking-p-2 banking-font-bold">Total</td>
                <td className="banking-text-right banking-p-2 banking-font-bold">{formatCurrency(lpInvestment)}</td>
                <td className="banking-text-right banking-p-2 banking-font-bold">{formatCurrency(lpPreferredReturn)}</td>
                <td className="banking-text-right banking-p-2 banking-font-bold">{formatCurrency(0)}</td>
                <td className="banking-text-right banking-p-2 banking-font-bold">{formatCurrency(lpInvestment + lpPreferredReturn)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">LP Cumulative Returns</h3>
        <div className="banking-card banking-p-4">
          <div className="banking-h-64 banking-w-full banking-flex banking-items-center banking-justify-center banking-bg-neutral-100 banking-rounded">
            <p className="banking-text-neutral-500">LP Cumulative Returns Chart will be displayed here</p>
            {/* Chart component will be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPEconomicsTab;
