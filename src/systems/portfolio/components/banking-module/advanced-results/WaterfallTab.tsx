import React from 'react';
import BankingMetric from '../BankingMetric';
import '../theme.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WaterfallTabProps {
  results: any;
  parameters: any;
}

/**
 * Waterfall Tab
 *
 * Displays the waterfall distribution of returns between GP and LP.
 */
const WaterfallTab: React.FC<WaterfallTabProps> = ({ results, parameters }) => {
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
  const gpInvestmentPercentage = parameters.gp_investment_percentage || 0.05;
  const averageExitTimeframe = parameters.average_exit_timeframe || 7;

  // Extract values from results if available
  const gpInvestment = results?.gpInvestment || (fundSize * gpInvestmentPercentage);
  const lpInvestment = results?.lpInvestment || (fundSize * (1 - gpInvestmentPercentage));
  const lpPreferredReturn = results?.lpPreferredReturn || (lpInvestment * hurdleRate * fundTerm);

  // Calculate additional waterfall components
  const simpleInterestRate = parameters.simple_interest_rate || 0.05;
  const averageAppreciationRate = parameters.average_appreciation_rate || 0.04;
  const averageLTV = parameters.average_ltv || 0.40;

  // Calculate total fund return
  const interestReturn = fundSize * simpleInterestRate * averageExitTimeframe;
  const appreciationMultiplier = Math.pow(1 + averageAppreciationRate, averageExitTimeframe);
  const appreciationReturn = fundSize * (appreciationMultiplier - 1) * averageLTV;
  const totalReturn = fundSize + interestReturn + appreciationReturn;

  // Calculate profit
  const totalProfit = totalReturn - fundSize;

  // Calculate waterfall components
  const returnOfCapital = fundSize;
  const preferredReturn = lpInvestment * hurdleRate * fundTerm;
  const catchup = totalProfit > preferredReturn ?
    Math.min((preferredReturn / (1 - performanceFeeRate)) * performanceFeeRate, totalProfit - preferredReturn) : 0;
  const residualProfit = Math.max(0, totalProfit - preferredReturn - catchup);
  const gpResidual = residualProfit * performanceFeeRate;
  const lpResidual = residualProfit * (1 - performanceFeeRate);

  // Calculate total GP and LP returns
  const gpReturn = gpInvestment + catchup + gpResidual;
  const lpReturn = lpInvestment + preferredReturn + lpResidual;

  return (
    <div>
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Waterfall Distribution</h3>
        <div className="banking-card banking-p-4">
          <div className="banking-h-64 banking-w-full banking-rounded">
            <Bar
              data={{
                labels: ['Return of Capital', 'Preferred Return', 'GP Catch-up', 'GP Residual', 'LP Residual'],
                datasets: [
                  {
                    label: 'LP',
                    data: [lpInvestment, preferredReturn, 0, 0, lpResidual],
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    stack: 'Stack 0'
                  },
                  {
                    label: 'GP',
                    data: [gpInvestment, 0, catchup, gpResidual, 0],
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    stack: 'Stack 0'
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    stacked: true,
                    title: {
                      display: true,
                      text: 'Waterfall Component'
                    }
                  },
                  y: {
                    stacked: true,
                    title: {
                      display: true,
                      text: 'Amount ($)'
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top'
                  },
                  title: {
                    display: true,
                    text: 'Waterfall Distribution'
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Waterfall Breakdown</h3>
        <div className="banking-card banking-p-4 banking-overflow-x-auto">
          <table className="banking-w-full banking-min-w-full banking-border-collapse">
            <thead>
              <tr className="banking-bg-neutral-100">
                <th className="banking-text-left banking-p-2 banking-border-b banking-border-neutral-200">Waterfall Step</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">LP Amount</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">GP Amount</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="banking-border-b banking-border-neutral-200 hover:banking-bg-neutral-50">
                <td className="banking-p-2 banking-font-semibold">Return of Capital</td>
                <td className="banking-text-right banking-p-2">{formatCurrency(lpInvestment)}</td>
                <td className="banking-text-right banking-p-2">{formatCurrency(gpInvestment)}</td>
                <td className="banking-text-right banking-p-2 banking-font-semibold">
                  {formatCurrency(fundSize)}
                </td>
              </tr>
              <tr className="banking-border-b banking-border-neutral-200 hover:banking-bg-neutral-50">
                <td className="banking-p-2 banking-font-semibold">Preferred Return ({(hurdleRate * 100).toFixed(0)}%)</td>
                <td className="banking-text-right banking-p-2">{formatCurrency(lpInvestment * hurdleRate * fundTerm)}</td>
                <td className="banking-text-right banking-p-2">{formatCurrency(0)}</td>
                <td className="banking-text-right banking-p-2 banking-font-semibold">
                  {formatCurrency(lpInvestment * hurdleRate * fundTerm)}
                </td>
              </tr>
              <tr className="banking-border-b banking-border-neutral-200 hover:banking-bg-neutral-50">
                <td className="banking-p-2 banking-font-semibold">GP Catch-up</td>
                <td className="banking-text-right banking-p-2">{formatCurrency(0)}</td>
                <td className="banking-text-right banking-p-2">{formatCurrency(0)}</td>
                <td className="banking-text-right banking-p-2 banking-font-semibold">
                  {formatCurrency(0)}
                </td>
              </tr>
              <tr className="banking-border-b banking-border-neutral-200 hover:banking-bg-neutral-50">
                <td className="banking-p-2 banking-font-semibold">Residual ({(100 - performanceFeeRate * 100).toFixed(0)}/{(performanceFeeRate * 100).toFixed(0)} Split)</td>
                <td className="banking-text-right banking-p-2">{formatCurrency(0)}</td>
                <td className="banking-text-right banking-p-2">{formatCurrency(0)}</td>
                <td className="banking-text-right banking-p-2 banking-font-semibold">
                  {formatCurrency(0)}
                </td>
              </tr>
              <tr className="banking-bg-neutral-50">
                <td className="banking-p-2 banking-font-bold">Total</td>
                <td className="banking-text-right banking-p-2 banking-font-bold">{formatCurrency(lpInvestment + lpInvestment * hurdleRate * fundTerm)}</td>
                <td className="banking-text-right banking-p-2 banking-font-bold">{formatCurrency(gpInvestment)}</td>
                <td className="banking-text-right banking-p-2 banking-font-bold">
                  {formatCurrency(fundSize + lpInvestment * hurdleRate * fundTerm)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Waterfall Metrics</h3>
        <div className="banking-grid banking-grid-3 banking-gap-4">
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-semibold banking-mb-2">Fund Size</h4>
            <div className="banking-text-2xl banking-font-bold banking-text-primary">
              {formatCurrency(fundSize)}
            </div>
            <p className="banking-text-xs banking-text-neutral-500 banking-mt-1">
              Total capital committed
            </p>
          </div>

          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-semibold banking-mb-2">Hurdle Rate</h4>
            <div className="banking-text-2xl banking-font-bold banking-text-primary">
              {formatPercentage(hurdleRate)}
            </div>
            <p className="banking-text-xs banking-text-neutral-500 banking-mt-1">
              Preferred return rate
            </p>
          </div>

          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-semibold banking-mb-2">Performance Fee</h4>
            <div className="banking-text-2xl banking-font-bold banking-text-primary">
              {formatPercentage(performanceFeeRate)}
            </div>
            <p className="banking-text-xs banking-text-neutral-500 banking-mt-1">
              GP's carried interest percentage
            </p>
          </div>
        </div>
      </div>

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Waterfall Sensitivity Analysis</h3>
        <div className="banking-card banking-p-4">
          <div className="banking-h-64 banking-w-full banking-flex banking-items-center banking-justify-center banking-bg-neutral-100 banking-rounded">
            <p className="banking-text-neutral-500">Waterfall Sensitivity Chart will be displayed here</p>
            {/* Chart component will be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterfallTab;
