import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';

interface PortfolioTabProps {
  simulationResults: any;
}

export const PortfolioTab: React.FC<PortfolioTabProps> = ({ simulationResults }) => {
  const [showSampleLoans, setShowSampleLoans] = useState(false);
  
  // Extract portfolio data from simulation results
  const portfolio = simulationResults?.portfolio || {};
  const loans = portfolio.loans || [];
  const metrics = portfolio.metrics || {};
  
  // Calculate exit year distribution
  const exitYearDistribution: Record<number, number> = {};
  loans.forEach((loan: any) => {
    if (!exitYearDistribution[loan.exit_year]) {
      exitYearDistribution[loan.exit_year] = 0;
    }
    exitYearDistribution[loan.exit_year]++;
  });
  
  // Calculate LTV distribution (buckets: 0-20%, 20-40%, 40-60%, 60-80%)
  const ltvBuckets = {
    '0-20%': 0,
    '20-40%': 0,
    '40-60%': 0,
    '60-80%': 0
  };
  
  loans.forEach((loan: any) => {
    const ltv = loan.ltv;
    if (ltv <= 0.2) ltvBuckets['0-20%']++;
    else if (ltv <= 0.4) ltvBuckets['20-40%']++;
    else if (ltv <= 0.6) ltvBuckets['40-60%']++;
    else ltvBuckets['60-80%']++;
  });
  
  // Calculate zone distribution
  const zoneDistribution: Record<string, number> = {
    'green': 0,
    'orange': 0,
    'red': 0
  };
  
  loans.forEach((loan: any) => {
    if (zoneDistribution[loan.zone] !== undefined) {
      zoneDistribution[loan.zone]++;
    }
  });
  
  // Get sample loans (first 10)
  const sampleLoans = loans.slice(0, 10);
  
  // If no portfolio data is available
  if (!loans.length) {
    return (
      <div className="banking-p-6">
        <div className="banking-alert banking-alert-info">
          <p>No portfolio data available. Run a simulation to generate a portfolio.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="banking-p-6">
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Portfolio Overview</h3>
        <div className="banking-grid banking-grid-cols-1 banking-md:banking-grid-cols-2 banking-lg:banking-grid-cols-4 banking-gap-4">
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">Total Loans</h4>
            <p className="banking-text-2xl banking-font-bold">{metrics.total_loans || loans.length}</p>
          </div>
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">Average Loan Size</h4>
            <p className="banking-text-2xl banking-font-bold">{formatCurrency(metrics.average_loan_size || 0)}</p>
          </div>
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">Average LTV</h4>
            <p className="banking-text-2xl banking-font-bold">{formatPercentage(metrics.average_ltv || 0)}</p>
          </div>
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500">Total Portfolio Value</h4>
            <p className="banking-text-2xl banking-font-bold">{formatCurrency(metrics.total_initial_value || 0)}</p>
          </div>
        </div>
      </div>
      
      <div className="banking-mb-6">
        <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Portfolio Distribution</h3>
        <div className="banking-grid banking-grid-cols-1 banking-md:banking-grid-cols-2 banking-lg:banking-grid-cols-3 banking-gap-4">
          {/* Exit Year Distribution */}
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500 banking-mb-2">Exit Year Distribution</h4>
            <div className="banking-h-64">
              <Bar
                data={{
                  labels: Object.keys(exitYearDistribution).map(year => `Year ${year}`),
                  datasets: [
                    {
                      label: 'Number of Loans',
                      data: Object.values(exitYearDistribution),
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
                        text: 'Number of Loans'
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      display: false
                    },
                    title: {
                      display: true,
                      text: 'Exit Year Distribution'
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const count = context.raw as number;
                          const percentage = (count / loans.length) * 100;
                          return [
                            `Count: ${count}`,
                            `Percentage: ${percentage.toFixed(1)}%`
                          ];
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          {/* LTV Distribution */}
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500 banking-mb-2">LTV Distribution</h4>
            <div className="banking-h-64">
              <Pie
                data={{
                  labels: Object.keys(ltvBuckets),
                  datasets: [
                    {
                      data: Object.values(ltvBuckets),
                      backgroundColor: [
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(255, 99, 132, 0.5)'
                      ],
                      borderColor: [
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 206, 86)',
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
                      position: 'right'
                    },
                    title: {
                      display: true,
                      text: 'LTV Distribution'
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const count = context.raw as number;
                          const percentage = (count / loans.length) * 100;
                          return [
                            `Count: ${count}`,
                            `Percentage: ${percentage.toFixed(1)}%`
                          ];
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          {/* Zone Distribution */}
          <div className="banking-card banking-p-4">
            <h4 className="banking-text-sm banking-font-medium banking-text-neutral-500 banking-mb-2">Zone Distribution</h4>
            <div className="banking-h-64">
              <Pie
                data={{
                  labels: ['Green Zone', 'Orange Zone', 'Red Zone'],
                  datasets: [
                    {
                      data: [
                        zoneDistribution.green,
                        zoneDistribution.orange,
                        zoneDistribution.red
                      ],
                      backgroundColor: [
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 99, 132, 0.5)'
                      ],
                      borderColor: [
                        'rgb(75, 192, 192)',
                        'rgb(255, 159, 64)',
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
                      position: 'right'
                    },
                    title: {
                      display: true,
                      text: 'Zone Distribution'
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const count = context.raw as number;
                          const percentage = (count / loans.length) * 100;
                          return [
                            `Count: ${count}`,
                            `Percentage: ${percentage.toFixed(1)}%`
                          ];
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
        <div className="banking-flex banking-justify-between banking-items-center banking-mb-4">
          <h3 className="banking-text-lg banking-font-semibold banking-text-primary">Sample Loans</h3>
          <button 
            className="banking-btn banking-btn-sm banking-btn-outline" 
            onClick={() => setShowSampleLoans(!showSampleLoans)}
          >
            {showSampleLoans ? 'Hide' : 'Show'} Sample Loans
          </button>
        </div>
        
        {showSampleLoans && (
          <div className="banking-overflow-x-auto">
            <table className="banking-table banking-table-compact banking-w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Property Value</th>
                  <th>Loan Amount</th>
                  <th>LTV</th>
                  <th>Zone</th>
                  <th>Exit Year</th>
                  <th>Appreciation Rate</th>
                  <th>Expected Exit Value</th>
                </tr>
              </thead>
              <tbody>
                {sampleLoans.map((loan: any, index: number) => (
                  <tr key={loan.id || index}>
                    <td>{loan.id || `Loan ${index + 1}`}</td>
                    <td>{formatCurrency(loan.property_value)}</td>
                    <td>{formatCurrency(loan.loan_amount)}</td>
                    <td>{formatPercentage(loan.ltv)}</td>
                    <td>
                      <span className={`banking-badge ${
                        loan.zone === 'green' ? 'banking-badge-success' : 
                        loan.zone === 'orange' ? 'banking-badge-warning' : 
                        'banking-badge-error'
                      }`}>
                        {loan.zone}
                      </span>
                    </td>
                    <td>Year {loan.exit_year}</td>
                    <td>{formatPercentage(loan.appreciation_rate)}</td>
                    <td>{formatCurrency(loan.expected_exit_value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {!showSampleLoans && (
          <div className="banking-card banking-p-4 banking-text-center">
            <p className="banking-text-neutral-500">Click "Show Sample Loans" to view a sample of the generated loans.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioTab;
