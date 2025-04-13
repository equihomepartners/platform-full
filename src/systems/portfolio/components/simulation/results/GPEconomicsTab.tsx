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

interface GPEconomicsTabProps {
  results: any;
  parameters: any;
}

/**
 * GP Economics Tab
 *
 * Displays detailed economics for the General Partner (GP).
 */
const GPEconomicsTab: React.FC<GPEconomicsTabProps> = ({ results, parameters }) => {
  // Get parameters with defaults for display
  const fundSize = parameters.fund_size || 100000000;
  const fundTerm = parameters.fund_term || 10;
  const managementFeeRate = parameters.management_fee_rate || 0.02;
  const hurdleRate = parameters.hurdle_rate || 0.06;
  const performanceFeeRate = parameters.performance_fee_rate || 0.20;
  const originationFeeRate = parameters.origination_fee_rate || 0.03;
  const gpInvestmentPercentage = parameters.gp_investment_percentage || 0.05;

  // Calculate GP economics
  const gpInvestment = fundSize * gpInvestmentPercentage;
  const originationFees = fundSize * originationFeeRate;
  const managementFees = fundSize * managementFeeRate * fundTerm;
  
  // Use results if available, otherwise calculate
  const totalReturn = results?.totalReturn || (fundSize * 1.8); // Assume 1.8x multiple as fallback
  const totalProfit = totalReturn - fundSize;
  
  // Calculate preferred return
  const lpInvestment = fundSize * (1 - gpInvestmentPercentage);
  const preferredReturn = lpInvestment * hurdleRate * fundTerm;
  
  // Calculate catch-up (80/20 split until GP gets 20% of profits above preferred return)
  const excessProfit = Math.max(0, totalProfit - preferredReturn);
  const catchupAmount = Math.min(excessProfit * 0.25, excessProfit * performanceFeeRate / (1 - performanceFeeRate));
  
  // Calculate carried interest (20% of remaining profits)
  const remainingProfit = Math.max(0, excessProfit - catchupAmount);
  const carriedInterest = remainingProfit * performanceFeeRate;
  
  // Calculate GP investment return
  const gpInvestmentReturn = (gpInvestment / fundSize) * totalProfit;
  
  // Calculate total GP return
  const gpTotalReturn = gpInvestmentReturn + originationFees + managementFees + catchupAmount + carriedInterest;
  
  // Calculate GP ROI
  const gpROI = (gpTotalReturn / gpInvestment) - 1;

  // Prepare GP revenue sources chart data
  const gpRevenueSourcesData = {
    labels: ['Investment Return', 'Origination Fees', 'Management Fees', 'Catch-up', 'Carried Interest'],
    datasets: [
      {
        data: [gpInvestmentReturn, originationFees, managementFees, catchupAmount, carriedInterest],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',  // Investment return
          'rgba(75, 192, 192, 0.5)',  // Origination fees
          'rgba(255, 206, 86, 0.5)',  // Management fees
          'rgba(255, 99, 132, 0.5)',  // Catch-up
          'rgba(153, 102, 255, 0.5)'  // Carried interest
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)',
          'rgb(255, 206, 86)',
          'rgb(255, 99, 132)',
          'rgb(153, 102, 255)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Prepare GP revenue by year chart data (simplified model)
  const gpRevenueByYearData = {
    labels: Array.from({ length: fundTerm + 1 }, (_, i) => `Year ${i}`),
    datasets: [
      {
        label: 'Investment Return',
        data: Array.from({ length: fundTerm + 1 }, (_, i) => i === fundTerm ? gpInvestmentReturn : 0),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
        stack: 'stack0'
      },
      {
        label: 'Origination Fees',
        data: Array.from({ length: fundTerm + 1 }, (_, i) => i === 0 ? originationFees : 0),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
        stack: 'stack0'
      },
      {
        label: 'Management Fees',
        data: Array.from({ length: fundTerm + 1 }, (_, i) => i > 0 && i <= fundTerm ? managementFees / fundTerm : 0),
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgb(255, 206, 86)',
        borderWidth: 1,
        stack: 'stack0'
      },
      {
        label: 'Performance Fees',
        data: Array.from({ length: fundTerm + 1 }, (_, i) => i === fundTerm ? catchupAmount + carriedInterest : 0),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        stack: 'stack0'
      }
    ]
  };

  return (
    <div className="banking-p-6">
      {/* GP Economics Summary */}
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">GP Economics Summary</h3>
        <div className="banking-grid banking-grid-cols-2 banking-md:banking-grid-cols-4 banking-gap-4">
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">GP Investment</h4>
            <p className="banking-text-2xl banking-font-bold">{formatCurrency(gpInvestment)}</p>
            <p className="banking-text-sm banking-text-neutral-500">{formatPercentage(gpInvestmentPercentage)} of fund</p>
          </div>
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">Total GP Return</h4>
            <p className="banking-text-2xl banking-font-bold">{formatCurrency(gpTotalReturn)}</p>
          </div>
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">GP ROI</h4>
            <p className="banking-text-2xl banking-font-bold">{formatPercentage(gpROI)}</p>
          </div>
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">GP Multiple</h4>
            <p className="banking-text-2xl banking-font-bold">{(gpTotalReturn / gpInvestment).toFixed(2)}x</p>
          </div>
        </div>
      </div>

      {/* GP Revenue Sources */}
      <div className="banking-grid banking-grid-cols-1 banking-md:banking-grid-cols-2 banking-gap-6 banking-mb-6">
        <div>
          <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">GP Revenue Sources</h3>
          <div className="banking-card banking-p-4">
            <div className="banking-h-64 banking-w-full banking-rounded">
              <Pie
                data={gpRevenueSourcesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right'
                    },
                    title: {
                      display: true,
                      text: 'GP Revenue Sources'
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
          <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">GP Revenue by Year</h3>
          <div className="banking-card banking-p-4">
            <div className="banking-h-64 banking-w-full banking-rounded">
              <Bar
                data={gpRevenueByYearData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      stacked: true,
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Amount ($)'
                      }
                    },
                    x: {
                      stacked: true
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'top'
                    },
                    title: {
                      display: true,
                      text: 'GP Revenue by Year'
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* GP Economics Details */}
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">GP Economics Details</h3>
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
                <td>GP Investment</td>
                <td>{formatCurrency(gpInvestment)}</td>
                <td>-</td>
                <td>GP's initial investment ({formatPercentage(gpInvestmentPercentage)} of fund)</td>
              </tr>
              <tr>
                <td>Investment Return</td>
                <td>{formatCurrency(gpInvestmentReturn)}</td>
                <td>{formatPercentage(gpInvestmentReturn / gpTotalReturn)}</td>
                <td>Return on GP's invested capital</td>
              </tr>
              <tr>
                <td>Origination Fees</td>
                <td>{formatCurrency(originationFees)}</td>
                <td>{formatPercentage(originationFees / gpTotalReturn)}</td>
                <td>Fees charged at loan origination ({formatPercentage(originationFeeRate)} of loan amount)</td>
              </tr>
              <tr>
                <td>Management Fees</td>
                <td>{formatCurrency(managementFees)}</td>
                <td>{formatPercentage(managementFees / gpTotalReturn)}</td>
                <td>Annual management fees ({formatPercentage(managementFeeRate)} of AUM)</td>
              </tr>
              <tr>
                <td>Catch-up</td>
                <td>{formatCurrency(catchupAmount)}</td>
                <td>{formatPercentage(catchupAmount / gpTotalReturn)}</td>
                <td>GP catch-up to reach {formatPercentage(performanceFeeRate)} of profits above hurdle</td>
              </tr>
              <tr>
                <td>Carried Interest</td>
                <td>{formatCurrency(carriedInterest)}</td>
                <td>{formatPercentage(carriedInterest / gpTotalReturn)}</td>
                <td>GP's {formatPercentage(performanceFeeRate)} of remaining profits</td>
              </tr>
              <tr className="banking-font-semibold">
                <td>Total GP Return</td>
                <td>{formatCurrency(gpTotalReturn)}</td>
                <td>{formatPercentage(1)}</td>
                <td>Total return to GP</td>
              </tr>
              <tr className="banking-font-semibold">
                <td>GP ROI</td>
                <td>{formatPercentage(gpROI)}</td>
                <td>-</td>
                <td>Return on GP's invested capital</td>
              </tr>
              <tr className="banking-font-semibold">
                <td>GP Multiple</td>
                <td>{(gpTotalReturn / gpInvestment).toFixed(2)}x</td>
                <td>-</td>
                <td>Multiple on GP's invested capital</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GPEconomicsTab;
