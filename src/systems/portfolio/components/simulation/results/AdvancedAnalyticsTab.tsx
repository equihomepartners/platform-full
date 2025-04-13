import React, { useState } from 'react';
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
  ScatterController
} from 'chart.js';
import { Scatter, Line, Bar } from 'react-chartjs-2';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ScatterController,
  Title,
  Tooltip,
  Legend
);

interface AdvancedAnalyticsTabProps {
  results: any;
  parameters: any;
}

/**
 * Advanced Analytics Tab
 *
 * Displays portfolio optimization insights, correlations, and sensitivity analysis
 */
const AdvancedAnalyticsTab: React.FC<AdvancedAnalyticsTabProps> = ({ results, parameters }) => {
  const [selectedSection, setSelectedSection] = useState<string>('optimization');

  // Check if Monte Carlo results are available
  if (!results) {
    return (
      <div style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20rem'
      }}>
        <div style={{
          backgroundColor: '#f0f9ff',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid #bae6fd',
          maxWidth: '30rem',
          textAlign: 'center'
        }}>
          <p style={{ color: '#0369a1', fontSize: '1rem' }}>
            Please run a simulation to see advanced analytics.
          </p>
        </div>
      </div>
    );
  }

  // Ensure we have the required data structures, even if empty
  const monteCarloResults = results.monteCarloResults || [];
  const efficientFrontier = results.efficientFrontier || [];
  const optimizedResult = results.optimizedResult || results;
  const correlations = results.correlations || {};
  const sensitivityAnalysis = results.sensitivityAnalysis || {};

  // Navigation tabs
  const renderNavigation = () => (
    <div style={{
      display: 'flex',
      borderBottom: '1px solid #e2e8f0',
      marginBottom: '1.5rem'
    }}>
      {['optimization', 'correlations', 'sensitivity'].map(section => (
        <button
          key={section}
          onClick={() => setSelectedSection(section)}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: selectedSection === section ? '#f8fafc' : 'transparent',
            borderBottom: selectedSection === section ? '2px solid #3b82f6' : 'none',
            color: selectedSection === section ? '#1e40af' : '#64748b',
            fontWeight: selectedSection === section ? '600' : '400',
            cursor: 'pointer',
            border: 'none',
            outline: 'none',
            fontSize: '0.875rem',
            textTransform: 'capitalize'
          }}
        >
          {section}
        </button>
      ))}
    </div>
  );

  // Render optimization section
  const renderOptimization = () => (
    <div>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: '1rem'
      }}>Portfolio Optimization</h3>

      {/* Efficient Frontier Chart */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#0f172a',
          marginBottom: '1rem'
        }}>Efficient Frontier</h4>

        <div style={{ height: '20rem' }}>
          <Scatter
            data={{
              datasets: [
                {
                  label: 'Efficient Frontier',
                  data: efficientFrontier.map((point: any) => ({
                    x: point.risk * 100, // Convert to percentage
                    y: point.return * 100 // Convert to percentage
                  })),
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderColor: 'rgb(75, 192, 192)',
                  showLine: true,
                  tension: 0.4
                },
                {
                  label: 'Simulation Results',
                  data: monteCarloResults.map((result: any) => ({
                    x: (1 / result.sharpeRatio) * 100, // Risk (inverse of Sharpe ratio)
                    y: result.roi * 100 // Return
                  })),
                  backgroundColor: 'rgba(54, 162, 235, 0.3)',
                  borderColor: 'rgba(54, 162, 235, 0.1)',
                  pointRadius: 3,
                  showLine: false
                },
                {
                  label: 'Current Portfolio',
                  data: [{
                    x: (1 / (results?.sharpeRatio || 1)) * 100,
                    y: (results?.roi || 0) * 100
                  }],
                  backgroundColor: 'rgba(255, 99, 132, 1)',
                  borderColor: 'rgb(255, 99, 132)',
                  pointRadius: 6,
                  showLine: false
                },
                {
                  label: 'Optimized Portfolio',
                  data: [{
                    x: (1 / (optimizedResult?.sharpeRatio || 1)) * 100,
                    y: (optimizedResult?.roi || 0) * 100
                  }],
                  backgroundColor: 'rgba(75, 192, 75, 1)',
                  borderColor: 'rgb(75, 192, 75)',
                  pointRadius: 6,
                  showLine: false
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Risk (%)'
                  },
                  min: 0
                },
                y: {
                  title: {
                    display: true,
                    text: 'Return (%)'
                  },
                  min: 0
                }
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const point = context.raw as { x: number, y: number };
                      return [
                        `Risk: ${point.x.toFixed(2)}%`,
                        `Return: ${point.y.toFixed(2)}%`
                      ];
                    }
                  }
                },
                legend: {
                  position: 'top'
                },
                title: {
                  display: true,
                  text: 'Risk-Return Profile (Modern Portfolio Theory)'
                }
              }
            }}
          />
        </div>
      </div>

      {/* Optimized Portfolio Metrics */}
      {optimizedResult && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#0f172a',
            marginBottom: '1rem'
          }}>Optimized Portfolio Metrics</h4>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem'
          }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>IRR</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#0f172a' }}>
                {formatPercentage(optimizedResult.irr)}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>ROI</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#0f172a' }}>
                {formatPercentage(optimizedResult.roi)}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Sharpe Ratio</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#0f172a' }}>
                {optimizedResult.sharpeRatio?.toFixed(2) || 'N/A'}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Max Drawdown</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#0f172a' }}>
                {formatPercentage(optimizedResult.maxDrawdown || 0)}
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <h5 style={{
              fontSize: '0.875rem',
              fontWeight: 'bold',
              color: '#0f172a',
              marginBottom: '0.5rem'
            }}>Optimized Parameters</h5>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem'
            }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Appreciation Rate</p>
                <p style={{ fontSize: '0.875rem', color: '#0f172a' }}>
                  {formatPercentage(optimizedResult.portfolio.metrics.average_appreciation_rate)}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>LTV</p>
                <p style={{ fontSize: '0.875rem', color: '#0f172a' }}>
                  {formatPercentage(optimizedResult.portfolio.metrics.average_ltv)}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Property Value</p>
                <p style={{ fontSize: '0.875rem', color: '#0f172a' }}>
                  {formatCurrency(optimizedResult.portfolio.metrics.average_property_value)}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Number of Loans</p>
                <p style={{ fontSize: '0.875rem', color: '#0f172a' }}>
                  {optimizedResult.portfolio.metrics.total_loans}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ padding: '1.5rem' }}>
      {renderNavigation()}

      {selectedSection === 'optimization' && renderOptimization()}

      {selectedSection === 'correlations' && (
        <div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#0f172a',
            marginBottom: '1rem'
          }}>Parameter Correlations</h3>

          {correlations && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#0f172a',
                marginBottom: '1rem'
              }}>Correlation with IRR</h4>

              <div style={{ height: '16rem' }}>
                <Bar
                  data={{
                    labels: [
                      'Appreciation Rate',
                      'LTV',
                      'Property Value',
                      'Exit Timeframe'
                    ],
                    datasets: [
                      {
                        label: 'Correlation Coefficient',
                        data: [
                          correlations.averageAppreciationRate || 0,
                          correlations.averageLTV || 0,
                          correlations.averagePropertyValue || 0,
                          correlations.averageExitTimeframe || 0
                        ],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.6)',
                          'rgba(54, 162, 235, 0.6)',
                          'rgba(255, 206, 86, 0.6)',
                          'rgba(75, 192, 192, 0.6)'
                        ],
                        borderColor: [
                          'rgb(255, 99, 132)',
                          'rgb(54, 162, 235)',
                          'rgb(255, 206, 86)',
                          'rgb(75, 192, 192)'
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
                        beginAtZero: true,
                        min: -1,
                        max: 1,
                        title: {
                          display: true,
                          text: 'Correlation Coefficient'
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        display: false
                      },
                      title: {
                        display: true,
                        text: 'Parameter Correlation with IRR'
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const value = context.raw as number;
                            return `Correlation: ${value.toFixed(3)}`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <h5 style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: '#0f172a',
                  marginBottom: '0.5rem'
                }}>Interpretation</h5>

                <ul style={{
                  fontSize: '0.875rem',
                  color: '#334155',
                  paddingLeft: '1.5rem'
                }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Strong positive correlation (0.7 to 1.0):</strong> Parameter has a strong positive impact on IRR
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Moderate positive correlation (0.3 to 0.7):</strong> Parameter has a moderate positive impact on IRR
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Weak correlation (-0.3 to 0.3):</strong> Parameter has minimal impact on IRR
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Moderate negative correlation (-0.7 to -0.3):</strong> Parameter has a moderate negative impact on IRR
                  </li>
                  <li>
                    <strong>Strong negative correlation (-1.0 to -0.7):</strong> Parameter has a strong negative impact on IRR
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedSection === 'sensitivity' && (
        <div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#0f172a',
            marginBottom: '1rem'
          }}>Sensitivity Analysis</h3>

          {sensitivityAnalysis && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#0f172a',
                marginBottom: '1rem'
              }}>IRR Sensitivity to Parameters</h4>

              <div style={{ height: '16rem' }}>
                <Line
                  data={{
                    labels: sensitivityAnalysis.appreciationRate?.map((item: any) =>
                      `${(item.factor * 100).toFixed(0)}%`) || [],
                    datasets: [
                      {
                        label: 'Appreciation Rate',
                        data: sensitivityAnalysis.appreciationRate?.map((item: any) =>
                          item.irr * 100) || [],
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        tension: 0.1
                      },
                      {
                        label: 'LTV',
                        data: sensitivityAnalysis.ltv?.map((item: any) =>
                          item.irr * 100) || [],
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        tension: 0.1
                      },
                      {
                        label: 'Exit Timeframe',
                        data: sensitivityAnalysis.exitTimeframe?.map((item: any) =>
                          item.irr * 100) || [],
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        tension: 0.1
                      },
                      {
                        label: 'Interest Rate',
                        data: sensitivityAnalysis.interestRate?.map((item: any) =>
                          item.irr * 100) || [],
                        borderColor: 'rgb(255, 206, 86)',
                        backgroundColor: 'rgba(255, 206, 86, 0.5)',
                        tension: 0.1
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        title: {
                          display: true,
                          text: 'IRR (%)'
                        }
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Parameter Value (% of Base)'
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        position: 'top'
                      },
                      title: {
                        display: true,
                        text: 'Parameter Sensitivity Analysis'
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const value = context.raw as number;
                            return `IRR: ${value.toFixed(2)}%`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          )}

          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            border: '1px solid #e2e8f0'
          }}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#0f172a',
              marginBottom: '1rem'
            }}>Recommendations to Maximize IRR</h4>

            <div style={{ fontSize: '0.875rem', color: '#334155' }}>
              <p style={{ marginBottom: '1rem' }}>
                Based on the sensitivity analysis and correlations, here are recommendations to optimize your portfolio:
              </p>

              <ul style={{ paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Focus on appreciation rate:</strong> Target properties in areas with higher appreciation potential.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Optimize LTV ratio:</strong> Adjust your LTV ratio based on the sensitivity curve to find the optimal balance.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Manage exit timeframes:</strong> Structure the portfolio to have a balanced distribution of exit timeframes.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Consider interest rate impact:</strong> Be aware of how changes in interest rates affect your overall returns.
                </li>
                <li>
                  <strong>Diversify across zones:</strong> Maintain a balanced distribution across green, orange, and red zones to optimize risk-return profile.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedAnalyticsTab;
