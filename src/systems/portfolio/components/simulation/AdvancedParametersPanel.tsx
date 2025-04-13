import React, { useState } from 'react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface AdvancedParametersPanelProps {
  settings: any;
  errors: Record<string, string>;
  onChange: (name: string, value: any) => void;
}

const AdvancedParametersPanel: React.FC<AdvancedParametersPanelProps> = ({
  settings,
  errors,
  onChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      onChange(name, checked);
      return;
    }

    // Convert to number
    let numericValue: number;

    if (type === 'number') {
      numericValue = parseFloat(value);
    } else if (name.includes('rate') || name.includes('percentage')) {
      // Convert percentage to decimal
      numericValue = parseFloat(value) / 100;
    } else {
      // Remove currency formatting and convert to number
      numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    }

    // Update state if valid number
    if (!isNaN(numericValue)) {
      onChange(name, numericValue);
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: isExpanded ? '1.5rem' : '0'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#0f172a'
        }}>Advanced Parameters</h3>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#3b82f6',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          {isExpanded ? 'Hide' : 'Show'} Advanced Parameters
        </button>
      </div>

      {isExpanded && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '1rem'
        }}>
          <div style={{
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '1rem',
            marginBottom: '1rem'
          }}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#0f172a',
              marginBottom: '1rem'
            }}>Portfolio Generation</h4>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem'
            }}>
              {/* Number of Loans */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.25rem'
                }}>
                  Number of Loans
                </label>
                <input
                  type="number"
                  name="number_of_loans"
                  value={settings.number_of_loans || ''}
                  onChange={handleInputChange}
                  placeholder="Auto"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: errors.number_of_loans ? '1px solid #ef4444' : '1px solid #cbd5e1',
                    fontSize: '0.875rem'
                  }}
                />
                {errors.number_of_loans && (
                  <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {errors.number_of_loans}
                  </p>
                )}
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  Leave empty to auto-calculate based on fund size
                </p>
              </div>

              {/* Capital Recycling */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <input
                    type="checkbox"
                    id="capital_recycling_enabled"
                    name="capital_recycling_enabled"
                    checked={settings.capital_recycling_enabled || false}
                    onChange={handleInputChange}
                    style={{
                      marginRight: '0.5rem'
                    }}
                  />
                  <label
                    htmlFor="capital_recycling_enabled"
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#64748b'
                    }}
                  >
                    Enable Capital Recycling
                  </label>
                </div>

                {settings.capital_recycling_enabled && (
                  <>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#64748b',
                      marginBottom: '0.25rem'
                    }}>
                      Recycling Percentage
                    </label>
                    <input
                      type="text"
                      name="capital_recycling_percentage"
                      value={((settings.capital_recycling_percentage || 0.7) * 100).toFixed(0)}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        borderRadius: '0.375rem',
                        border: errors.capital_recycling_percentage ? '1px solid #ef4444' : '1px solid #cbd5e1',
                        fontSize: '0.875rem'
                      }}
                    />
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                      Percentage of exits to reinvest
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div style={{
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '1rem',
            marginBottom: '1rem'
          }}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#0f172a',
              marginBottom: '1rem'
            }}>Portfolio Volatility Controls</h4>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              {/* Loan Amount Volatility */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <label style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#64748b'
                  }}>
                    Loan Amount Volatility (%)
                  </label>
                  <button
                    onClick={() => {
                      const defaultValue = 20;
                      setSettings(prev => ({
                        ...prev,
                        loan_amount_volatility: defaultValue / 100
                      }));
                    }}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    Set Default (20%)
                  </button>
                </div>
                <input
                  type="number"
                  name="loan_amount_volatility"
                  value={(settings.loan_amount_volatility || 0.2) * 100}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem'
                  }}
                />
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  Controls volatility in loan amounts (standard deviation as % of mean)
                </p>
              </div>

              {/* LTV Volatility */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <label style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#64748b'
                  }}>
                    LTV Volatility (%)
                  </label>
                  <button
                    onClick={() => {
                      const defaultValue = 15;
                      setSettings(prev => ({
                        ...prev,
                        ltv_volatility: defaultValue / 100
                      }));
                    }}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    Set Default (15%)
                  </button>
                </div>
                <input
                  type="number"
                  name="ltv_volatility"
                  value={(settings.ltv_volatility || 0.15) * 100}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem'
                  }}
                />
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  Controls volatility in loan-to-value ratios (standard deviation as % of mean)
                </p>
              </div>

              {/* Exit Timeframe Volatility */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <label style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#64748b'
                  }}>
                    Exit Timeframe Volatility (years)
                  </label>
                  <button
                    onClick={() => {
                      const defaultValue = 1.5;
                      setSettings(prev => ({
                        ...prev,
                        exit_timeframe_volatility: defaultValue
                      }));
                    }}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    Set Default (1.5)
                  </button>
                </div>
                <input
                  type="number"
                  name="exit_timeframe_volatility"
                  value={settings.exit_timeframe_volatility || 1.5}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem'
                  }}
                />
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  Controls volatility in exit timeframes (standard deviation in years)
                </p>
              </div>

              {/* Appreciation Rate Volatility */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <label style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#64748b'
                  }}>
                    Appreciation Rate Volatility (%)
                  </label>
                  <button
                    onClick={() => {
                      const defaultValue = 25;
                      setSettings(prev => ({
                        ...prev,
                        appreciation_rate_volatility: defaultValue / 100
                      }));
                    }}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    Set Default (25%)
                  </button>
                </div>
                <input
                  type="number"
                  name="appreciation_rate_volatility"
                  value={(settings.appreciation_rate_volatility || 0.25) * 100}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem'
                  }}
                />
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  Controls volatility in appreciation rates (standard deviation as % of mean)
                </p>
              </div>
            </div>

            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#0f172a',
              marginBottom: '1rem'
            }}>Monte Carlo Simulation</h4>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem'
            }}>
              {/* Enable Monte Carlo */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <input
                    type="checkbox"
                    id="monte_carlo_enabled"
                    name="monte_carlo_enabled"
                    checked={settings.monte_carlo_enabled || false}
                    onChange={handleInputChange}
                    style={{
                      marginRight: '0.5rem'
                    }}
                  />
                  <label
                    htmlFor="monte_carlo_enabled"
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#64748b'
                    }}
                  >
                    Enable Monte Carlo Simulation
                  </label>
                </div>

                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  Run multiple simulations to find the efficient frontier
                </p>
              </div>

              {/* Number of Simulations */}
              {settings.monte_carlo_enabled && (
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#64748b',
                    marginBottom: '0.25rem'
                  }}>
                    Number of Simulations
                  </label>
                  <input
                    type="number"
                    name="number_of_simulations"
                    value={settings.number_of_simulations || 100}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '0.375rem',
                      border: errors.number_of_simulations ? '1px solid #ef4444' : '1px solid #cbd5e1',
                      fontSize: '0.875rem'
                    }}
                  />
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                    More simulations = more accurate results but slower
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#0f172a',
              marginBottom: '1rem'
            }}>Tranche Structure</h4>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <input
                type="checkbox"
                id="enable_tranches"
                name="enable_tranches"
                checked={settings.enable_tranches || false}
                onChange={handleInputChange}
                style={{
                  marginRight: '0.5rem'
                }}
              />
              <label
                htmlFor="enable_tranches"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b'
                }}
              >
                Enable Tranche Structure
              </label>
            </div>

            {settings.enable_tranches && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem'
              }}>
                {/* Senior Tranche */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#64748b',
                    marginBottom: '0.25rem'
                  }}>
                    Senior Tranche %
                  </label>
                  <input
                    type="text"
                    name="senior_tranche_percentage"
                    value={((settings.senior_tranche_percentage || 0.5) * 100).toFixed(0)}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '0.375rem',
                      border: errors.senior_tranche_percentage ? '1px solid #ef4444' : '1px solid #cbd5e1',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#64748b',
                    marginBottom: '0.25rem'
                  }}>
                    Senior Tranche Rate
                  </label>
                  <input
                    type="text"
                    name="senior_tranche_rate"
                    value={((settings.senior_tranche_rate || 0.05) * 100).toFixed(1)}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '0.375rem',
                      border: errors.senior_tranche_rate ? '1px solid #ef4444' : '1px solid #cbd5e1',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                {/* Mezzanine Tranche */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#64748b',
                    marginBottom: '0.25rem'
                  }}>
                    Mezzanine Tranche %
                  </label>
                  <input
                    type="text"
                    name="mez_tranche_percentage"
                    value={((settings.mez_tranche_percentage || 0.3) * 100).toFixed(0)}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '0.375rem',
                      border: errors.mez_tranche_percentage ? '1px solid #ef4444' : '1px solid #cbd5e1',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#64748b',
                    marginBottom: '0.25rem'
                  }}>
                    Mezzanine Tranche Rate
                  </label>
                  <input
                    type="text"
                    name="mez_tranche_rate"
                    value={((settings.mez_tranche_rate || 0.08) * 100).toFixed(1)}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '0.375rem',
                      border: errors.mez_tranche_rate ? '1px solid #ef4444' : '1px solid #cbd5e1',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                {/* Equity Tranche (calculated) */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#64748b',
                    marginBottom: '0.25rem'
                  }}>
                    Equity Tranche %
                  </label>
                  <input
                    type="text"
                    disabled
                    value={((1 - (settings.senior_tranche_percentage || 0.5) - (settings.mez_tranche_percentage || 0.3)) * 100).toFixed(0)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '0.375rem',
                      border: '1px solid #cbd5e1',
                      backgroundColor: '#f8fafc',
                      fontSize: '0.875rem'
                    }}
                  />
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                    Calculated automatically
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedParametersPanel;
