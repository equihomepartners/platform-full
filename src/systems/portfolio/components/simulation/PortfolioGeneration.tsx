import React, { useState } from 'react';
import { Play, AlertTriangle, Loader, BarChart2, PieChart, TrendingUp } from 'lucide-react';
import { FundSettings, Portfolio, PortfolioGeneration as PortfolioGenerationParams } from '../../types/portfolioTypes';

interface PortfolioGenerationProps {
  fundSettings: FundSettings | null;
  onGenerate: (params: PortfolioGenerationParams) => void;
  loading: boolean;
  error: string | null;
  portfolio: Portfolio | null;
}

/**
 * Portfolio Generation Component
 *
 * This component allows users to generate a portfolio based on fund settings.
 */
const PortfolioGeneration: React.FC<PortfolioGenerationProps> = ({
  fundSettings,
  onGenerate,
  loading,
  error,
  portfolio
}) => {
  const [params, setParams] = useState<PortfolioGenerationParams>({
    num_loans: 400,
    ltv_variance: 0.1,
    property_value_variance: 0.2,
    appreciation_rate_green: 0.05,
    appreciation_rate_orange: 0.03,
    appreciation_rate_red: 0.01
  });

  const handleChange = (field: keyof PortfolioGenerationParams, value: any) => {
    setParams({
      ...params,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(params);
  };

  if (!fundSettings) {
    return (
      <div className="bg-warning-50 text-warning-700 p-4 rounded-md">
        <p className="font-medium">Fund Settings Required</p>
        <p className="text-sm">Please configure fund settings before generating a portfolio.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-error-50 text-error-700 p-4 rounded-md flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <h3 className="text-lg font-semibold text-primary-800 mb-4">Portfolio Generation Parameters</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Number of Loans
              </label>
              <input
                type="number"
                min="1"
                max="1000"
                value={params.num_loans}
                onChange={(e) => handleChange('num_loans', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Recommended: {Math.floor(fundSettings.fund_size / (fundSettings.average_property_value * fundSettings.average_ltv))}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                LTV Variance (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="50"
                value={(params.ltv_variance || 0) * 100}
                onChange={(e) => handleChange('ltv_variance', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Current: {((params.ltv_variance || 0) * 100).toFixed(1)}%</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Property Value Variance (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="50"
                value={(params.property_value_variance || 0) * 100}
                onChange={(e) => handleChange('property_value_variance', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Current: {((params.property_value_variance || 0) * 100).toFixed(1)}%</p>
            </div>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
            <h4 className="text-md font-medium text-primary-700 mb-3">Appreciation Rates by Zone</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Green Zone (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  value={(params.appreciation_rate_green || 0) * 100}
                  onChange={(e) => handleChange('appreciation_rate_green', parseFloat(e.target.value) / 100)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="text-xs text-neutral-500 mt-1">Current: {((params.appreciation_rate_green || 0) * 100).toFixed(1)}%</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Orange Zone (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  value={(params.appreciation_rate_orange || 0) * 100}
                  onChange={(e) => handleChange('appreciation_rate_orange', parseFloat(e.target.value) / 100)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="text-xs text-neutral-500 mt-1">Current: {((params.appreciation_rate_orange || 0) * 100).toFixed(1)}%</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Red Zone (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  value={(params.appreciation_rate_red || 0) * 100}
                  onChange={(e) => handleChange('appreciation_rate_red', parseFloat(e.target.value) / 100)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="text-xs text-neutral-500 mt-1">Current: {((params.appreciation_rate_red || 0) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                loading ? 'bg-neutral-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin mr-1.5" />
                  Generating...
                </>
              ) : (
                <>
                  <Play size={16} className="mr-1.5" />
                  Generate Portfolio
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {portfolio && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h3 className="text-lg font-semibold text-primary-800 mb-4">Portfolio Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div className="flex items-center mb-2">
                  <BarChart2 className="h-5 w-5 text-primary-600 mr-2" />
                  <h4 className="text-md font-medium text-primary-700">Loan Metrics</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Initial Loans:</span>
                    <span className="text-sm font-medium">{portfolio.metrics.initialLoans}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Reinvestments:</span>
                    <span className="text-sm font-medium">{portfolio.metrics.totalReinvestments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Total Loans:</span>
                    <span className="text-sm font-medium">{portfolio.metrics.totalLoans}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Average Loan Size:</span>
                    <span className="text-sm font-medium">${portfolio.metrics.averageLoanSize.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Average LTV:</span>
                    <span className="text-sm font-medium">{(portfolio.metrics.averageLTV * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-primary-600 mr-2" />
                  <h4 className="text-md font-medium text-primary-700">Performance Metrics</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Weighted Appreciation:</span>
                    <span className="text-sm font-medium">{(portfolio.metrics.weightedAppreciation * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Extended Term:</span>
                    <span className="text-sm font-medium">{portfolio.metrics.extendedTerm} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Expected IRR:</span>
                    <span className="text-sm font-medium">{(portfolio.metrics.expectedIRR * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Expected Multiple:</span>
                    <span className="text-sm font-medium">{portfolio.metrics.expectedMultiple.toFixed(2)}x</span>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div className="flex items-center mb-2">
                  <PieChart className="h-5 w-5 text-primary-600 mr-2" />
                  <h4 className="text-md font-medium text-primary-700">Value Metrics</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Total Initial Value:</span>
                    <span className="text-sm font-medium">${portfolio.metrics.totalInitialValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Total Reinvestment Value:</span>
                    <span className="text-sm font-medium">${portfolio.metrics.totalReinvestmentValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Total Portfolio Value:</span>
                    <span className="text-sm font-medium">${(portfolio.metrics.totalInitialValue + portfolio.metrics.totalReinvestmentValue).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h3 className="text-lg font-semibold text-primary-800 mb-4">Loan Distribution</h3>
            <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center border border-neutral-200">
              <span className="text-neutral-500 text-sm">Loan Distribution Chart</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioGeneration;
