import React from 'react';
import BankingMetric from '../BankingMetric';
import '../theme.css';

interface GPEconomicsTabProps {
  results: any;
  parameters: any;
}

/**
 * GP Economics Tab
 *
 * Displays detailed information about the GP economics.
 */
const GPEconomicsTab: React.FC<GPEconomicsTabProps> = ({ results, parameters }) => {
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
  const managementFeeRate = parameters.management_fee_rate || 0.02;
  const hurdleRate = parameters.hurdle_rate || 0.06;
  const performanceFeeRate = parameters.performance_fee_rate || 0.20;
  const originationFeeRate = parameters.origination_fee_rate || 0.03;
  const simpleInterestRate = parameters.simple_interest_rate || 0.05;
  const gpInvestmentPercentage = parameters.gp_investment_percentage || 0.05;
  const averagePropertyValue = parameters.average_property_value || 1000000;
  const averageLTV = parameters.average_ltv || 0.40;
  const averageAppreciationRate = parameters.average_appreciation_rate || 0.04;
  const averageExitTimeframe = parameters.average_exit_timeframe || 7;

  // Extract values from results if available
  const gpInvestment = results?.gpInvestment || (fundSize * gpInvestmentPercentage);
  const originationFees = results?.originationFees || (fundSize * originationFeeRate);
  const managementFees = results?.managementFees || (fundSize * managementFeeRate * fundTerm);
  const yearlyReturns = results?.gpYearlyReturns || [];

  // Generate simple yearly returns if not available from results
  if (yearlyReturns.length === 0) {
    // Year 0: Origination fees
    yearlyReturns.push({
      year: 0,
      managementFees: 0,
      originationFees: originationFees,
      carriedInterest: 0,
      total: originationFees
    });

    // Years 1 to fund term: Management fees
    for (let year = 1; year <= fundTerm; year++) {
      const yearlyManagementFee = fundSize * managementFeeRate;

      if (year === averageExitTimeframe) {
        // At exit timeframe, add carried interest and return of capital
        yearlyReturns.push({
          year,
          managementFees: yearlyManagementFee,
          originationFees: 0,
          carriedInterest: gpInvestment, // Return of GP capital at exit timeframe
          total: yearlyManagementFee + gpInvestment
        });
      } else {
        // Regular years, just management fees
        yearlyReturns.push({
          year,
          managementFees: yearlyManagementFee,
          originationFees: 0,
          carriedInterest: 0,
          total: yearlyManagementFee
        });
      }
    }
  }

  return (
    <div>
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">GP Economics Summary</h3>
        <div className="banking-grid banking-grid-3 banking-gap-4">
          <div className="banking-card banking-p-4 banking-bg-primary banking-text-white">
            <h4 className="banking-text-sm banking-uppercase banking-mb-1 banking-opacity-80">GP Investment</h4>
            <div className="banking-text-2xl banking-font-bold">
              {formatCurrency(gpInvestment)}
            </div>
          </div>

          <div className="banking-card banking-p-4 banking-bg-secondary banking-text-white">
            <h4 className="banking-text-sm banking-uppercase banking-mb-1 banking-opacity-80">Management Fees</h4>
            <div className="banking-text-2xl banking-font-bold">
              {formatCurrency(managementFees)}
            </div>
          </div>

          <div className="banking-card banking-p-4 banking-bg-accent banking-text-white">
            <h4 className="banking-text-sm banking-uppercase banking-mb-1 banking-opacity-80">Origination Fees</h4>
            <div className="banking-text-2xl banking-font-bold">
              {formatCurrency(originationFees)}
            </div>
          </div>
        </div>
      </div>

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">GP Return Composition</h3>
        <div className="banking-card banking-p-4">
          <div className="banking-h-64 banking-w-full banking-flex banking-items-center banking-justify-center banking-bg-neutral-100 banking-rounded">
            <p className="banking-text-neutral-500">GP Return Composition Chart will be displayed here</p>
            {/* Chart component will be added here */}
          </div>
        </div>
      </div>

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">GP Return Breakdown</h3>
        <div className="banking-grid banking-grid-2 banking-gap-6">
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-semibold banking-mb-4">Return Components</h4>
            <div className="banking-grid banking-grid-2 banking-gap-4">
              <BankingMetric
                label="Return of Capital"
                value={formatCurrency(gpInvestment)}
              />

              <BankingMetric
                label="Management Fees"
                value={formatCurrency(managementFees)}
              />

              <BankingMetric
                label="Origination Fees"
                value={formatCurrency(originationFees)}
              />

              <BankingMetric
                label="GP Investment %"
                value={formatPercentage(gpInvestmentPercentage)}
              />

              <BankingMetric
                label="Management Fee Rate"
                value={formatPercentage(managementFeeRate)}
              />

              <BankingMetric
                label="Origination Fee Rate"
                value={formatPercentage(originationFeeRate)}
              />
            </div>
          </div>

          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-semibold banking-mb-4">Performance Metrics</h4>
            <div className="banking-grid banking-grid-2 banking-gap-4">
              <BankingMetric
                label="Fund Term"
                value={`${fundTerm} Years`}
              />

              <BankingMetric
                label="Exit Timeframe"
                value={`${averageExitTimeframe} Years`}
              />

              <BankingMetric
                label="Hurdle Rate"
                value={formatPercentage(hurdleRate)}
              />

              <BankingMetric
                label="Performance Fee"
                value={formatPercentage(performanceFeeRate)}
              />

              <BankingMetric
                label="Simple Interest Rate"
                value={formatPercentage(simpleInterestRate)}
              />

              <BankingMetric
                label="Appreciation Rate"
                value={formatPercentage(averageAppreciationRate)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">GP Yearly Returns</h3>
        <div className="banking-card banking-p-4 banking-overflow-x-auto">
          <table className="banking-w-full banking-min-w-full banking-border-collapse">
            <thead>
              <tr className="banking-bg-neutral-100">
                <th className="banking-text-left banking-p-2 banking-border-b banking-border-neutral-200">Year</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Management Fees</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Origination Fees</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Carried Interest</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Total</th>
              </tr>
            </thead>
            <tbody>
              {yearlyReturns.map((yearData) => (
                <tr key={yearData.year} className="banking-border-b banking-border-neutral-200 hover:banking-bg-neutral-50">
                  <td className="banking-p-2">{yearData.year}</td>
                  <td className="banking-text-right banking-p-2">{formatCurrency(yearData.managementFees)}</td>
                  <td className="banking-text-right banking-p-2">{formatCurrency(yearData.originationFees)}</td>
                  <td className="banking-text-right banking-p-2">{formatCurrency(yearData.carriedInterest)}</td>
                  <td className="banking-text-right banking-p-2 banking-font-semibold">{formatCurrency(yearData.total)}</td>
                </tr>
              ))}
              <tr className="banking-bg-neutral-50">
                <td className="banking-p-2 banking-font-bold">Total</td>
                <td className="banking-text-right banking-p-2 banking-font-bold">{formatCurrency(managementFees)}</td>
                <td className="banking-text-right banking-p-2 banking-font-bold">{formatCurrency(originationFees)}</td>
                <td className="banking-text-right banking-p-2 banking-font-bold">{formatCurrency(0)}</td>
                <td className="banking-text-right banking-p-2 banking-font-bold">{formatCurrency(managementFees + originationFees)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">GP Cumulative Returns</h3>
        <div className="banking-card banking-p-4">
          <div className="banking-h-64 banking-w-full banking-flex banking-items-center banking-justify-center banking-bg-neutral-100 banking-rounded">
            <p className="banking-text-neutral-500">GP Cumulative Returns Chart will be displayed here</p>
            {/* Chart component will be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPEconomicsTab;
