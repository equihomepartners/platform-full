import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface LPEconomicsTabProps {
  results: any;
  parameters: any;
}

/**
 * LP Economics Tab
 *
 * Displays detailed economics for the Limited Partners (LP).
 */
const LPEconomicsTab: React.FC<LPEconomicsTabProps> = ({ results, parameters }) => {
  // Get parameters with defaults for display
  const fundSize = parameters.fund_size || 100000000;
  const fundTerm = parameters.fund_term || 10;
  const hurdleRate = parameters.hurdle_rate || 0.06;
  const performanceFeeRate = parameters.performance_fee_rate || 0.20;
  const gpInvestmentPercentage = parameters.gp_investment_percentage || 0.05;

  // Calculate LP economics
  const lpInvestment = fundSize * (1 - gpInvestmentPercentage);
  
  // Use results if available, otherwise calculate
  const totalReturn = results?.totalReturn || (fundSize * 1.8); // Assume 1.8x multiple as fallback
  const totalProfit = totalReturn - fundSize;
  
  // Calculate preferred return
  const preferredReturn = lpInvestment * hurdleRate * fundTerm;
  
  // Calculate catch-up (80/20 split until GP gets 20% of profits above preferred return)
  const excessProfit = Math.max(0, totalProfit - preferredReturn);
  const catchupAmount = Math.min(excessProfit * 0.25, excessProfit * performanceFeeRate / (1 - performanceFeeRate));
  
  // Calculate carried interest (20% of remaining profits)
  const remainingProfit = Math.max(0, excessProfit - catchupAmount);
  const carriedInterest = remainingProfit * performanceFeeRate;
  
  // Calculate final LP profit
  const lpProfit = preferredReturn + (excessProfit - catchupAmount - carriedInterest);
  
  // Calculate LP ROI
  const lpROI = lpProfit / lpInvestment;
  
  // Calculate LP multiple
  const lpMultiple = (lpInvestment + lpProfit) / lpInvestment;

  // Prepare LP return components chart data
  const lpReturnComponentsData = {
    labels: ['Preferred Return', 'Excess Return'],
    datasets: [
      {
        data: [preferredReturn, lpProfit - preferredReturn],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',  // Preferred return
          'rgba(54, 162, 235, 0.5)'   // Excess return
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Prepare LP vs GP profit split chart data
  const profitSplitData = {
    labels: ['LP Profit', 'GP Profit'],
    datasets: [
      {
        data: [lpProfit, totalProfit - lpProfit],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',  // LP profit
          'rgba(255, 99, 132, 0.5)'   // GP profit
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Prepare LP cashflow by year chart data (simplified model)
  const lpCashflowByYearData = {
    labels: Array.from({ length: fundTerm + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: 'LP Investment',
        data: Array.from({ length: fundTerm + 1 }, (_, i) => i === 0 ? -lpInvestment : 0),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
      },
      {
        label: 'LP Return',
        data: Array.from({ length: fundTerm + 1 }, (_, i) => i === fundTerm ? lpInvestment + lpProfit : 0),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="banking-p-6">
      {/* LP Economics Summary */}
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">LP Economics Summary</h3>
        <div className="banking-grid banking-grid-cols-2 banking-md:banking-grid-cols-4 banking-gap-4">
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">LP Investment</h4>
            <p className="banking-text-2xl banking-font-bold">{formatCurrency(lpInvestment)}</p>
            <p className="banking-text-sm banking-text-neutral-500">{formatPercentage(1 - gpInvestmentPercentage)} of fund</p>
          </div>
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">LP Profit</h4>
            <p className="banking-text-2xl banking-font-bold">{formatCurrency(lpProfit)}</p>
          </div>
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">LP ROI</h4>
            <p className="banking-text-2xl banking-font-bold">{formatPercentage(lpROI)}</p>
          </div>
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">LP Multiple</h4>
            <p className="banking-text-2xl banking-font-bold">{lpMultiple.toFixed(2)}x</p>
          </div>
        </div>
      </div>

      {/* LP Return Components and Profit Split */}
      <div className="banking-grid banking-grid-cols-1 banking-md:banking-grid-cols-2 banking-gap-6 banking-mb-6">
        <div>
          <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">LP Return Components</h3>
          <div className="banking-card banking-p-4">
            <div className="banking-h-64 banking-w-full banking-rounded">
              <Pie
                data={lpReturnComponentsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right'
                    },
                    title: {
                      display: true,
                      text: 'LP Return Components'
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const value = context.raw as number;
                          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                          const percentage = (value / total) * 100;
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
        <div>
          <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Profit Split</h3>
          <div className="banking-card banking-p-4">
            <div className="banking-h-64 banking-w-full banking-rounded">
              <Pie
                data={profitSplitData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right'
                    },
                    title: {
                      display: true,
                      text: 'LP vs GP Profit Split'
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const value = context.raw as number;
                          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                          const percentage = (value / total) * 100;
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
      </div>

      {/* LP Cashflow by Year */}
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">LP Cashflow by Year</h3>
        <div className="banking-card banking-p-4">
          <div className="banking-h-64 banking-w-full banking-rounded">
            <Bar
              data={lpCashflowByYearData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
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
                    text: 'LP Cashflow by Year'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* LP Economics Details */}
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">LP Economics Details</h3>
        <div className="banking-overflow-x-auto">
          <table className="banking-table banking-table-compact banking-w-full">
            <thead>
              <tr>
                <th>Component</th>
                <th>Amount</th>
                <th>% of Total</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>LP Investment</td>
                <td>{formatCurrency(lpInvestment)}</td>
                <td>-</td>
                <td>LP's initial investment ({formatPercentage(1 - gpInvestmentPercentage)} of fund)</td>
              </tr>
              <tr>
                <td>Preferred Return</td>
                <td>{formatCurrency(preferredReturn)}</td>
                <td>{formatPercentage(preferredReturn / lpProfit)}</td>
                <td>LP's preferred return at {formatPercentage(hurdleRate)} hurdle rate</td>
              </tr>
              <tr>
                <td>Excess Return</td>
                <td>{formatCurrency(lpProfit - preferredReturn)}</td>
                <td>{formatPercentage((lpProfit - preferredReturn) / lpProfit)}</td>
                <td>LP's share of profits above the hurdle rate</td>
              </tr>
              <tr className="banking-font-semibold">
                <td>Total LP Profit</td>
                <td>{formatCurrency(lpProfit)}</td>
                <td>{formatPercentage(1)}</td>
                <td>Total profit to LP</td>
              </tr>
              <tr className="banking-font-semibold">
                <td>LP ROI</td>
                <td>{formatPercentage(lpROI)}</td>
                <td>-</td>
                <td>Return on LP's invested capital</td>
              </tr>
              <tr className="banking-font-semibold">
                <td>LP Multiple</td>
                <td>{lpMultiple.toFixed(2)}x</td>
                <td>-</td>
                <td>Multiple on LP's invested capital</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* LP Performance Metrics */}
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">LP Performance Metrics</h3>
        <div className="banking-overflow-x-auto">
          <table className="banking-table banking-table-compact banking-w-full">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>IRR</td>
                <td>{formatPercentage(results?.lpIRR / 100 || Math.pow(lpMultiple, 1/fundTerm) - 1)}</td>
                <td>Internal Rate of Return for LP</td>
              </tr>
              <tr>
                <td>DPI (Distributions to Paid-In)</td>
                <td>{lpMultiple.toFixed(2)}x</td>
                <td>Total distributions divided by paid-in capital</td>
              </tr>
              <tr>
                <td>TVPI (Total Value to Paid-In)</td>
                <td>{lpMultiple.toFixed(2)}x</td>
                <td>Total value (distributions + NAV) divided by paid-in capital</td>
              </tr>
              <tr>
                <td>RVPI (Residual Value to Paid-In)</td>
                <td>0.00x</td>
                <td>Remaining NAV divided by paid-in capital (0 at fund termination)</td>
              </tr>
              <tr>
                <td>PIC (Paid-In Capital)</td>
                <td>{formatPercentage(1)}</td>
                <td>Percentage of committed capital that has been called</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LPEconomicsTab;
