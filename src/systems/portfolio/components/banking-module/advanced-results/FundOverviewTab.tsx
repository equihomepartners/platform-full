import React from 'react';
import BankingMetric from '../BankingMetric';
import '../theme.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface FundOverviewTabProps {
  results: any;
  parameters: any;
}

/**
 * Fund Overview Tab
 *
 * Displays key metrics and overview of the fund performance.
 */
const FundOverviewTab: React.FC<FundOverviewTabProps> = ({ results, parameters }) => {
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
  const lpInvestment = results?.lpInvestment || (fundSize * (1 - gpInvestmentPercentage));
  const originationFees = results?.originationFees || (fundSize * originationFeeRate);
  const managementFees = results?.managementFees || (fundSize * managementFeeRate * fundTerm);

  // Calculate NAV over time
  const calculateNAV = () => {
    const navData = [];
    const years = fundTerm + 1; // Include year 0

    // Initial NAV is fund size
    let initialNAV = fundSize;
    navData.push({ year: 0, nav: initialNAV });

    for (let year = 1; year <= fundTerm; year++) {
      // Annual management fee reduces NAV
      const annualManagementFee = fundSize * managementFeeRate;

      // Interest accrual increases NAV
      const interestAccrual = fundSize * simpleInterestRate;

      // Property appreciation increases NAV
      const appreciationRate = averageAppreciationRate;
      const appreciationMultiplier = Math.pow(1 + appreciationRate, year);
      const propertyAppreciation = fundSize * (appreciationMultiplier - 1) * averageLTV;

      // Calculate NAV for this year
      let yearNAV = initialNAV - (annualManagementFee * year) + (interestAccrual * year) + propertyAppreciation;

      // At exit year, NAV changes significantly
      if (year === averageExitTimeframe) {
        // Add origination fees to NAV
        yearNAV += originationFees;
      }

      navData.push({ year, nav: yearNAV });
    }

    return navData;
  };

  // Generate NAV data
  const navData = calculateNAV();

  return (
    <div>
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Fund Performance Summary</h3>

        <div className="banking-grid banking-grid-3 banking-gap-4">
          <div className="banking-card banking-p-4 banking-bg-primary banking-text-white">
            <h4 className="banking-text-sm banking-uppercase banking-mb-1 banking-opacity-80">Fund Size</h4>
            <div className="banking-text-2xl banking-font-bold">
              {formatCurrency(fundSize)}
            </div>
          </div>

          <div className="banking-card banking-p-4 banking-bg-secondary banking-text-white">
            <h4 className="banking-text-sm banking-uppercase banking-mb-1 banking-opacity-80">Fund Term</h4>
            <div className="banking-text-2xl banking-font-bold">
              {fundTerm} Years
            </div>
          </div>

          <div className="banking-card banking-p-4 banking-bg-accent banking-text-white">
            <h4 className="banking-text-sm banking-uppercase banking-mb-1 banking-opacity-80">Exit Timeframe</h4>
            <div className="banking-text-2xl banking-font-bold">
              {averageExitTimeframe} Years
            </div>
          </div>
        </div>
      </div>

      <div className="banking-grid banking-grid-2 banking-gap-6 banking-mb-6">
        <div className="banking-card banking-p-4">
          <h4 className="banking-text-sm banking-font-semibold banking-mb-4">Key Performance Metrics</h4>
          <div className="banking-grid banking-grid-2 banking-gap-4">
            <BankingMetric
              label="Management Fee"
              value={formatPercentage(managementFeeRate)}
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
              label="Origination Fee"
              value={formatPercentage(originationFeeRate)}
            />
          </div>
        </div>

        <div className="banking-card banking-p-4">
          <h4 className="banking-text-sm banking-font-semibold banking-mb-4">Capital Structure</h4>
          <div className="banking-grid banking-grid-2 banking-gap-4">
            <div>
              <div className="banking-grid banking-grid-2 banking-gap-4">
                <BankingMetric
                  label="GP Investment"
                  value={formatCurrency(fundSize * gpInvestmentPercentage)}
                />

                <BankingMetric
                  label="LP Investment"
                  value={formatCurrency(fundSize * (1 - gpInvestmentPercentage))}
                />

                <BankingMetric
                  label="GP Percentage"
                  value={formatPercentage(gpInvestmentPercentage)}
                />

                <BankingMetric
                  label="LP Percentage"
                  value={formatPercentage(1 - gpInvestmentPercentage)}
                />
              </div>
            </div>
            <div className="banking-h-48">
              <Doughnut
                data={{
                  labels: ['GP Investment', 'LP Investment'],
                  datasets: [
                    {
                      data: [gpInvestmentPercentage, 1 - gpInvestmentPercentage],
                      backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 99, 132, 0.8)'
                      ],
                      borderColor: [
                        'rgb(54, 162, 235)',
                        'rgb(255, 99, 132)'
                      ],
                      borderWidth: 1
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    },
                    title: {
                      display: true,
                      text: 'Capital Structure'
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const value = context.raw as number;
                          return `${context.label}: ${formatPercentage(value)}`;
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

      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Fund NAV Progression</h3>
        <div className="banking-card banking-p-4">
          <div className="banking-h-64 banking-w-full banking-rounded">
            <Line
              data={{
                labels: navData.map(d => `Year ${d.year}`),
                datasets: [
                  {
                    label: 'Fund NAV',
                    data: navData.map(d => d.nav),
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.3
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
                      text: 'NAV ($)'
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
                    text: 'Fund NAV Progression Over Time'
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `NAV: ${formatCurrency(context.parsed.y)}`;
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
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Returns Distribution</h3>
        <div className="banking-grid banking-grid-2 banking-gap-6">
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-semibold banking-mb-4">GP Returns</h4>
            <div className="banking-grid banking-grid-2 banking-gap-4">
              <BankingMetric
                label="Management Fees"
                value={results.gpEconomics?.managementFees ? formatCurrency(results.gpEconomics.managementFees) : 'N/A'}
              />

              <BankingMetric
                label="Origination Fees"
                value={results.gpEconomics?.originationFees ? formatCurrency(results.gpEconomics.originationFees) : 'N/A'}
              />

              <BankingMetric
                label="Carried Interest"
                value={results.gpEconomics?.carriedInterest ? formatCurrency(results.gpEconomics.carriedInterest) : 'N/A'}
              />

              <BankingMetric
                label="Total GP Return"
                value={results.gpEconomics?.totalReturn ? formatCurrency(results.gpEconomics.totalReturn) : 'N/A'}
              />
            </div>
          </div>

          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-semibold banking-mb-4">LP Returns</h4>
            <div className="banking-grid banking-grid-2 banking-gap-4">
              <BankingMetric
                label="Preferred Return"
                value={results.lpEconomics?.preferredReturn ? formatCurrency(results.lpEconomics.preferredReturn) : 'N/A'}
              />

              <BankingMetric
                label="LP Residual"
                value={results.lpEconomics?.residual ? formatCurrency(results.lpEconomics.residual) : 'N/A'}
              />

              <BankingMetric
                label="Total LP Return"
                value={results.lpEconomics?.totalReturn ? formatCurrency(results.lpEconomics.totalReturn) : 'N/A'}
              />

              <BankingMetric
                label="LP ROI"
                value={results.lpEconomics?.roi ? formatPercentage(results.lpEconomics.roi) : 'N/A'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundOverviewTab;
