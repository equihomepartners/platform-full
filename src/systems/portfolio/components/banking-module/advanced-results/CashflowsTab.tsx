import React from 'react';
import '../theme.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CashflowsTabProps {
  results: any;
  parameters: any;
}

/**
 * Cashflows Tab
 *
 * Displays detailed cashflow information for the fund over time.
 */
const CashflowsTab: React.FC<CashflowsTabProps> = ({ results, parameters }) => {
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
  const originationFeeRate = parameters.origination_fee_rate || 0.03;
  const simpleInterestRate = parameters.simple_interest_rate || 0.05;
  const gpInvestmentPercentage = parameters.gp_investment_percentage || 0.05;
  const averageExitTimeframe = parameters.average_exit_timeframe || 7;
  const averageAppreciationRate = parameters.average_appreciation_rate || 0.04;
  const averageLTV = parameters.average_ltv || 0.40;

  // Use the cashflows from the results provided by the Python simulation
  let yearlyCashflows = results?.cashflows || [];

  // Generate fallback cashflows if none are provided
  if (yearlyCashflows.length === 0) {
    yearlyCashflows = [];
    let cumulativeCashflow = 0;

    // Year 0: Initial investment and origination fees
    const originationFees = fundSize * originationFeeRate;
    cumulativeCashflow = -fundSize + originationFees;
    yearlyCashflows.push({
      year: 0,
      initialInvestment: -fundSize,
      originationFees: originationFees,
      managementFees: 0,
      loanExits: 0,
      netCashflow: -fundSize + originationFees,
      cumulativeCashflow: cumulativeCashflow
    });

    // Years 1 to fund term: Management fees and loan exits
    for (let year = 1; year <= fundTerm; year++) {
      const managementFees = -fundSize * managementFeeRate;
      let loanExits = 0;

      // All loan exits happen at the average exit timeframe
      if (year === averageExitTimeframe) {
        // Calculate simple interest
        const interest = fundSize * simpleInterestRate * year;

        // Calculate appreciation
        const appreciationMultiplier = Math.pow(1 + averageAppreciationRate, year);
        const appreciationFee = fundSize * (appreciationMultiplier - 1) * averageLTV;

        // Total loan exit value
        loanExits = fundSize + interest + appreciationFee;
      }

      const netCashflow = managementFees + loanExits;
      cumulativeCashflow += netCashflow;

      yearlyCashflows.push({
        year,
        initialInvestment: 0,
        originationFees: 0,
        managementFees,
        loanExits,
        netCashflow,
        cumulativeCashflow
      });
    }
  }

  return (
    <div>
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Cashflow Visualization</h3>
        <div className="banking-card banking-p-4">
          <div className="banking-h-64 banking-w-full banking-rounded">
            {yearlyCashflows.length > 0 && (
              <Line
                data={{
                  labels: yearlyCashflows.map(cf => `Year ${cf.year}`),
                  datasets: [
                    {
                      label: 'Cumulative Cashflow',
                      data: yearlyCashflows.map(cf => cf.cumulativeCashflow),
                      borderColor: 'rgb(53, 162, 235)',
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                      tension: 0.3,
                      yAxisID: 'y'
                    },
                    {
                      label: 'Net Cashflow',
                      data: yearlyCashflows.map(cf => cf.netCashflow),
                      borderColor: 'rgb(75, 192, 192)',
                      backgroundColor: 'rgba(75, 192, 192, 0.5)',
                      type: 'bar',
                      yAxisID: 'y1'
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      type: 'linear',
                      display: true,
                      position: 'left',
                      title: {
                        display: true,
                        text: 'Cumulative Cashflow'
                      },
                      grid: {
                        drawOnChartArea: false
                      }
                    },
                    y1: {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      title: {
                        display: true,
                        text: 'Net Cashflow'
                      },
                      grid: {
                        drawOnChartArea: false
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'top'
                    },
                    title: {
                      display: true,
                      text: 'Fund Cashflow Projection'
                    }
                  }
                }}
              />
            )}
            {yearlyCashflows.length === 0 && (
              <div className="banking-h-full banking-flex banking-items-center banking-justify-center banking-bg-neutral-100">
                <p className="banking-text-neutral-500">No cashflow data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Yearly Cashflows</h3>
        <div className="banking-card banking-p-4 banking-overflow-x-auto">
          <table className="banking-w-full banking-min-w-full banking-border-collapse">
            <thead>
              <tr className="banking-bg-neutral-100">
                <th className="banking-text-left banking-p-2 banking-border-b banking-border-neutral-200">Year</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Initial Investment</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Origination Fees</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Management Fees</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Loan Exits</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Net Cashflow</th>
                <th className="banking-text-right banking-p-2 banking-border-b banking-border-neutral-200">Cumulative</th>
              </tr>
            </thead>
            <tbody>
              {yearlyCashflows.map((cashflow) => (
                <tr key={cashflow.year} className="banking-border-b banking-border-neutral-200 hover:banking-bg-neutral-50">
                  <td className="banking-p-2">{cashflow.year}</td>
                  <td className="banking-text-right banking-p-2">
                    <span className={cashflow.initialInvestment < 0 ? 'banking-text-error' : 'banking-text-success'}>
                      {formatCurrency(cashflow.initialInvestment)}
                    </span>
                  </td>
                  <td className="banking-text-right banking-p-2">
                    <span className={cashflow.originationFees < 0 ? 'banking-text-error' : 'banking-text-success'}>
                      {formatCurrency(cashflow.originationFees)}
                    </span>
                  </td>
                  <td className="banking-text-right banking-p-2">
                    <span className={cashflow.managementFees < 0 ? 'banking-text-error' : 'banking-text-success'}>
                      {formatCurrency(cashflow.managementFees)}
                    </span>
                  </td>
                  <td className="banking-text-right banking-p-2">
                    <span className={cashflow.loanExits < 0 ? 'banking-text-error' : 'banking-text-success'}>
                      {formatCurrency(cashflow.loanExits)}
                    </span>
                  </td>
                  <td className="banking-text-right banking-p-2 banking-font-semibold">
                    <span className={cashflow.netCashflow < 0 ? 'banking-text-error' : 'banking-text-success'}>
                      {formatCurrency(cashflow.netCashflow)}
                    </span>
                  </td>
                  <td className="banking-text-right banking-p-2 banking-font-semibold">
                    <span className={cashflow.cumulativeCashflow < 0 ? 'banking-text-error' : 'banking-text-success'}>
                      {formatCurrency(cashflow.cumulativeCashflow)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Cashflow Metrics</h3>
        <div className="banking-grid banking-grid-3 banking-gap-4">
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-semibold banking-mb-2">Payback Period</h4>
            <div className="banking-text-2xl banking-font-bold banking-text-primary">
              {(() => {
                // Calculate payback period
                const breakeven = yearlyCashflows.findIndex(cf => cf.cumulativeCashflow >= 0);
                if (breakeven === -1) return 'N/A';

                // If breakeven is at year 0, return 0
                if (breakeven === 0) return '0 Years';

                // Calculate fractional year
                const prevYear = yearlyCashflows[breakeven - 1];
                const breakevenYear = yearlyCashflows[breakeven];

                const fraction = Math.abs(prevYear.cumulativeCashflow) /
                  (breakevenYear.cumulativeCashflow - prevYear.cumulativeCashflow);

                const paybackPeriod = (breakeven - 1) + fraction;
                return `${paybackPeriod.toFixed(1)} Years`;
              })()}
            </div>
            <p className="banking-text-xs banking-text-neutral-500 banking-mt-1">
              Time required to recover the initial investment
            </p>
          </div>

          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-semibold banking-mb-2">Breakeven Year</h4>
            <div className="banking-text-2xl banking-font-bold banking-text-primary">
              {(() => {
                const breakeven = yearlyCashflows.findIndex(cf => cf.cumulativeCashflow >= 0);
                return breakeven === -1 ? 'N/A' : `Year ${yearlyCashflows[breakeven].year}`;
              })()}
            </div>
            <p className="banking-text-xs banking-text-neutral-500 banking-mt-1">
              Year when cumulative cashflow becomes positive
            </p>
          </div>

          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-semibold banking-mb-2">Terminal Value</h4>
            <div className="banking-text-2xl banking-font-bold banking-text-primary">
              {yearlyCashflows.length > 0 ? formatCurrency(yearlyCashflows[yearlyCashflows.length - 1].cumulativeCashflow) : formatCurrency(0)}
            </div>
            <p className="banking-text-xs banking-text-neutral-500 banking-mt-1">
              Final cumulative cashflow at the end of the fund term
            </p>
          </div>
        </div>
      </div>

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Cashflow Distribution</h3>
        <div className="banking-grid banking-grid-cols-1 banking-md:banking-grid-cols-2 banking-gap-4">
          <div className="banking-card banking-p-4">
            <div className="banking-h-64 banking-w-full banking-rounded">
              {yearlyCashflows.length > 0 && (
                <Bar
                  data={{
                    labels: ['Initial Investment', 'Origination Fees', 'Management Fees', 'Loan Exits'],
                    datasets: [
                      {
                        label: 'Total Cashflow Components',
                        data: [
                          yearlyCashflows.reduce((sum, cf) => sum + cf.initialInvestment, 0),
                          yearlyCashflows.reduce((sum, cf) => sum + cf.originationFees, 0),
                          yearlyCashflows.reduce((sum, cf) => sum + cf.managementFees, 0),
                          yearlyCashflows.reduce((sum, cf) => sum + cf.loanExits, 0)
                        ],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.5)',  // Red for initial investment (negative)
                          'rgba(75, 192, 192, 0.5)',  // Green for origination fees
                          'rgba(255, 159, 64, 0.5)',  // Orange for management fees
                          'rgba(54, 162, 235, 0.5)'   // Blue for loan exits
                        ],
                        borderColor: [
                          'rgb(255, 99, 132)',
                          'rgb(75, 192, 192)',
                          'rgb(255, 159, 64)',
                          'rgb(54, 162, 235)'
                        ],
                        borderWidth: 1
                      }
                    ]
                  }}
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
                        text: 'Cashflow Components Distribution'
                      }
                    }
                  }}
                />
              )}
              {yearlyCashflows.length === 0 && (
                <div className="banking-h-full banking-flex banking-items-center banking-justify-center banking-bg-neutral-100">
                  <p className="banking-text-neutral-500">No cashflow data available</p>
                </div>
              )}
            </div>
          </div>

          <div className="banking-card banking-p-4">
            <div className="banking-h-64 banking-w-full banking-rounded">
              {yearlyCashflows.length > 0 && (
                <Bar
                  data={{
                    labels: yearlyCashflows.map(cf => `Year ${cf.year}`),
                    datasets: [
                      {
                        label: 'Loan Exits Distribution',
                        data: yearlyCashflows.map(cf => cf.loanExits),
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 1
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Exit Value ($)'
                        }
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Year'
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        position: 'top'
                      },
                      title: {
                        display: true,
                        text: 'Loan Exits Distribution by Year'
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const exitValue = context.raw as number;
                            const totalExits = yearlyCashflows.reduce((sum, cf) => sum + cf.loanExits, 0);
                            const percentage = totalExits > 0 ? (exitValue / totalExits) * 100 : 0;
                            return [
                              `Exit Value: ${formatCurrency(exitValue)}`,
                              `Percentage: ${percentage.toFixed(1)}%`
                            ];
                          }
                        }
                      }
                    }
                  }}
                />
              )}
              {yearlyCashflows.length === 0 && (
                <div className="banking-h-full banking-flex banking-items-center banking-justify-center banking-bg-neutral-100">
                  <p className="banking-text-neutral-500">No loan exit data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashflowsTab;
