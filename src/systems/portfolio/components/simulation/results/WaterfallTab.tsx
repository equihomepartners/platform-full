import React from 'react';
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
import { formatCurrency, formatPercentage } from '../../../utils/formatters';

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
  // Get parameters with defaults for display
  const fundSize = parameters.fund_size || 100000000;
  const hurdleRate = parameters.hurdle_rate || 0.06;
  const performanceFeeRate = parameters.performance_fee_rate || 0.20;
  const gpInvestmentPercentage = parameters.gp_investment_percentage || 0.05;

  // Calculate waterfall components
  const gpInvestment = fundSize * gpInvestmentPercentage;
  const lpInvestment = fundSize * (1 - gpInvestmentPercentage);
  
  // Use results if available, otherwise calculate
  const totalReturn = results?.totalReturn || (fundSize * 1.8); // Assume 1.8x multiple as fallback
  const totalProfit = totalReturn - fundSize;
  
  // Calculate preferred return
  const preferredReturn = lpInvestment * hurdleRate * parameters.fund_term;
  
  // Calculate catch-up (80/20 split until GP gets 20% of profits above preferred return)
  const excessProfit = Math.max(0, totalProfit - preferredReturn);
  const catchupAmount = Math.min(excessProfit * 0.25, excessProfit * performanceFeeRate / (1 - performanceFeeRate));
  
  // Calculate carried interest (20% of remaining profits)
  const remainingProfit = Math.max(0, excessProfit - catchupAmount);
  const carriedInterest = remainingProfit * performanceFeeRate;
  
  // Calculate final LP profit
  const lpProfit = preferredReturn + (excessProfit - catchupAmount - carriedInterest);
  
  // Calculate final GP profit (including investment return)
  const gpProfit = (gpInvestment / fundSize) * totalProfit + catchupAmount + carriedInterest;

  // Prepare waterfall chart data
  const waterfallChartData = {
    labels: ['Total Profit', 'Preferred Return (LP)', 'Catch-up (GP)', 'Carried Interest (GP)', 'Residual (LP)'],
    datasets: [
      {
        label: 'Waterfall Distribution',
        data: [totalProfit, preferredReturn, catchupAmount, carriedInterest, lpProfit - preferredReturn],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',  // Total profit
          'rgba(54, 162, 235, 0.5)',  // Preferred return
          'rgba(255, 99, 132, 0.5)',  // Catch-up
          'rgba(255, 99, 132, 0.5)',  // Carried interest
          'rgba(54, 162, 235, 0.5)'   // Residual
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Prepare GP/LP split chart data
  const splitChartData = {
    labels: ['GP', 'LP'],
    datasets: [
      {
        label: 'Profit Distribution',
        data: [gpProfit, lpProfit],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',  // GP
          'rgba(54, 162, 235, 0.5)'   // LP
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="banking-p-6">
      {/* Waterfall Summary */}
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Waterfall Summary</h3>
        <div className="banking-grid banking-grid-cols-2 banking-md:banking-grid-cols-4 banking-gap-4">
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">Total Profit</h4>
            <p className="banking-text-2xl banking-font-bold">{formatCurrency(totalProfit)}</p>
          </div>
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">Preferred Return</h4>
            <p className="banking-text-2xl banking-font-bold">{formatCurrency(preferredReturn)}</p>
          </div>
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">GP Profit</h4>
            <p className="banking-text-2xl banking-font-bold">{formatCurrency(gpProfit)}</p>
            <p className="banking-text-sm banking-text-neutral-500">{formatPercentage(gpProfit / totalProfit)} of profit</p>
          </div>
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">LP Profit</h4>
            <p className="banking-text-2xl banking-font-bold">{formatCurrency(lpProfit)}</p>
            <p className="banking-text-sm banking-text-neutral-500">{formatPercentage(lpProfit / totalProfit)} of profit</p>
          </div>
        </div>
      </div>

      {/* Waterfall Chart */}
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Waterfall Distribution</h3>
        <div className="banking-card banking-p-4">
          <div className="banking-h-64 banking-w-full banking-rounded">
            <Bar
              data={waterfallChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Amount ($)'
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  },
                  title: {
                    display: true,
                    text: 'Waterfall Distribution'
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const value = context.raw as number;
                        const percentage = (value / totalProfit) * 100;
                        return `${context.label}: ${formatCurrency(value)} (${percentage.toFixed(1)}%)`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* GP/LP Split Chart */}
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">GP/LP Profit Split</h3>
        <div className="banking-card banking-p-4">
          <div className="banking-h-64 banking-w-full banking-rounded">
            <Bar
              data={splitChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Amount ($)'
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  },
                  title: {
                    display: true,
                    text: 'GP/LP Profit Split'
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const value = context.raw as number;
                        const percentage = (value / totalProfit) * 100;
                        return `${context.label}: ${formatCurrency(value)} (${percentage.toFixed(1)}%)`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Waterfall Details */}
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Waterfall Details</h3>
        <div className="banking-overflow-x-auto">
          <table className="banking-table banking-table-compact banking-w-full">
            <thead>
              <tr>
                <th>Component</th>
                <th>Amount</th>
                <th>% of Total Profit</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Profit</td>
                <td>{formatCurrency(totalProfit)}</td>
                <td>{formatPercentage(1)}</td>
                <td>Total profit generated by the fund</td>
              </tr>
              <tr>
                <td>Preferred Return (LP)</td>
                <td>{formatCurrency(preferredReturn)}</td>
                <td>{formatPercentage(preferredReturn / totalProfit)}</td>
                <td>LP's preferred return at {formatPercentage(hurdleRate)} hurdle rate</td>
              </tr>
              <tr>
                <td>Catch-up (GP)</td>
                <td>{formatCurrency(catchupAmount)}</td>
                <td>{formatPercentage(catchupAmount / totalProfit)}</td>
                <td>GP catch-up to reach {formatPercentage(performanceFeeRate)} of profits above hurdle</td>
              </tr>
              <tr>
                <td>Carried Interest (GP)</td>
                <td>{formatCurrency(carriedInterest)}</td>
                <td>{formatPercentage(carriedInterest / totalProfit)}</td>
                <td>GP's {formatPercentage(performanceFeeRate)} of remaining profits</td>
              </tr>
              <tr>
                <td>Residual Profits (LP)</td>
                <td>{formatCurrency(lpProfit - preferredReturn)}</td>
                <td>{formatPercentage((lpProfit - preferredReturn) / totalProfit)}</td>
                <td>LP's share of remaining profits</td>
              </tr>
              <tr className="banking-font-semibold">
                <td>GP Total Profit</td>
                <td>{formatCurrency(gpProfit)}</td>
                <td>{formatPercentage(gpProfit / totalProfit)}</td>
                <td>GP's total profit (including investment return)</td>
              </tr>
              <tr className="banking-font-semibold">
                <td>LP Total Profit</td>
                <td>{formatCurrency(lpProfit)}</td>
                <td>{formatPercentage(lpProfit / totalProfit)}</td>
                <td>LP's total profit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WaterfallTab;
