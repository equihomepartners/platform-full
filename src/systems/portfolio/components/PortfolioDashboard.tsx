import React, { useEffect } from 'react';
import {
  BarChart2,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Percent,
  Shield,
  Map,
  PieChart,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { usePortfolioStore } from '../store';

const PortfolioDashboard: React.FC = () => {
  const {
    summary,
    performanceMetrics,
    riskMetrics,
    loadingSummary,
    loadingPerformanceMetrics,
    loadingRiskMetrics,
    fetchSummary,
    fetchPerformanceMetrics,
    fetchRiskMetrics
  } = usePortfolioStore();

  useEffect(() => {
    // Fetch data when component mounts
    fetchSummary();
    fetchPerformanceMetrics();
    fetchRiskMetrics();
  }, [fetchSummary, fetchPerformanceMetrics, fetchRiskMetrics]);

  // Loading state
  if (loadingSummary || loadingPerformanceMetrics || loadingRiskMetrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Error state
  if (!summary || !performanceMetrics || !riskMetrics) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Data Unavailable</h2>
        <p className="text-gray-500">
          Unable to load portfolio data. Please try again later.
        </p>
        <button
          onClick={() => {
            fetchSummary();
            fetchPerformanceMetrics();
            fetchRiskMetrics();
          }}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-800 mb-4">
          Portfolio Dashboard
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          Overview of your portfolio performance and key metrics
        </p>
      </div>

      {/* Portfolio Summary Section */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary-800">Portfolio Summary</h2>
          <span className="text-sm text-neutral-500">Last updated: Today</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Value</p>
                <p className="text-2xl font-semibold mt-1">
                  ${(summary.totalValue / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-secondary-600" />
            </div>
            <div className="mt-2 text-xs flex items-center text-secondary-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>5.2% from last month</span>
            </div>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">IRR</p>
                <p className="text-2xl font-semibold mt-1">{performanceMetrics.current.irr}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary-600" />
            </div>
            <div className="mt-2 text-xs flex items-center text-secondary-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>0.4% from last month</span>
            </div>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Average LTV</p>
                <p className="text-2xl font-semibold mt-1">{summary.averageLTV}%</p>
              </div>
              <Percent className="h-8 w-8 text-warning" />
            </div>
            <div className="mt-2 text-xs flex items-center text-accent-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>1.2% from last month</span>
            </div>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Risk Score</p>
                <p className="text-2xl font-semibold mt-1">{summary.riskScore.toFixed(2)}</p>
              </div>
              <Shield className="h-8 w-8 text-primary-600" />
            </div>
            <div className="mt-2 text-xs flex items-center text-green-600">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>0.03 from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-primary-800">Performance Metrics</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-600">IRR</span>
                <span className="font-medium">{performanceMetrics.current.irr}%</span>
              </div>
              <div className="h-2 bg-neutral-200 rounded-full">
                <div
                  className="h-full bg-primary-600 rounded-full"
                  style={{ width: `${(performanceMetrics.current.irr / 25) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-600">ROI</span>
                <span className="font-medium">{performanceMetrics.current.roi}%</span>
              </div>
              <div className="h-2 bg-neutral-200 rounded-full">
                <div
                  className="h-full bg-primary-400 rounded-full"
                  style={{ width: `${(performanceMetrics.current.roi / 30) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-600">Cash Yield</span>
                <span className="font-medium">{performanceMetrics.current.cashYield}%</span>
              </div>
              <div className="h-2 bg-neutral-200 rounded-full">
                <div
                  className="h-full bg-secondary-600 rounded-full"
                  style={{ width: `${(performanceMetrics.current.cashYield / 10) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-600">Sharpe Ratio</span>
                <span className="font-medium">{performanceMetrics.current.sharpeRatio}</span>
              </div>
              <div className="h-2 bg-neutral-200 rounded-full">
                <div
                  className="h-full bg-primary-500 rounded-full"
                  style={{ width: `${(performanceMetrics.current.sharpeRatio / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center mb-6">
            <Shield className="h-5 w-5 text-accent-600 mr-2" />
            <h3 className="text-lg font-semibold text-primary-800">Risk Metrics</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-600">Default Rate</span>
                <span className="font-medium">{riskMetrics.overall.defaultRate}%</span>
              </div>
              <div className="h-2 bg-neutral-200 rounded-full">
                <div
                  className="h-full bg-accent-600 rounded-full"
                  style={{ width: `${(riskMetrics.overall.defaultRate / 5) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-600">Expected Loss</span>
                <span className="font-medium">{riskMetrics.overall.expectedLoss}%</span>
              </div>
              <div className="h-2 bg-neutral-200 rounded-full">
                <div
                  className="h-full bg-warning rounded-full"
                  style={{ width: `${(riskMetrics.overall.expectedLoss / 1) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-600">Concentration Risk</span>
                <span className="font-medium">{riskMetrics.overall.concentrationRisk}</span>
              </div>
              <div className="h-2 bg-neutral-200 rounded-full">
                <div
                  className="h-full bg-warning rounded-full"
                  style={{ width: `${riskMetrics.overall.concentrationRisk * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-600">Liquidity Risk</span>
                <span className="font-medium">{riskMetrics.overall.liquidityRisk}</span>
              </div>
              <div className="h-2 bg-neutral-200 rounded-full">
                <div
                  className="h-full bg-accent-500 rounded-full"
                  style={{ width: `${riskMetrics.overall.liquidityRisk * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Allocation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center mb-6">
            <Map className="h-5 w-5 text-secondary-600 mr-2" />
            <h3 className="text-lg font-semibold text-primary-800">Suburb Allocation</h3>
          </div>

          <div className="space-y-3">
            {summary.allocationBySuburb.map((item: any) => (
              <div key={item.suburb}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">{item.suburb}</span>
                  <span className="font-medium">{item.allocation}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-full rounded-full ${
                      item.zone === 'green' ? 'bg-success' :
                      item.zone === 'yellow' ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${item.allocation}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center mb-6">
            <PieChart className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-primary-800">Property Type Allocation</h3>
          </div>

          <div className="space-y-3">
            {summary.allocationByPropertyType.map((item: any) => (
              <div key={item.type}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">{item.type}</span>
                  <span className="font-medium">{item.allocation}%</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full">
                  <div
                    className={`h-full bg-primary-600 rounded-full`}
                    style={{ width: `${item.allocation}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center mb-6">
            <BarChart2 className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-primary-800">Zone Allocation</h3>
          </div>

          <div className="space-y-3">
            {summary.allocationByZone.map((item: any) => (
              <div key={item.zone}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600 capitalize">{item.zone} Zone</span>
                  <span className="font-medium">{item.allocation}%</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full">
                  <div
                    className={`h-full rounded-full ${
                      item.zone === 'green' ? 'bg-success' :
                      item.zone === 'yellow' ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${item.allocation}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cash Flow Projections */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center mb-6">
          <DollarSign className="h-5 w-5 text-secondary-600 mr-2" />
          <h3 className="text-lg font-semibold text-primary-800">Cash Flow Projections</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Interest Income
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Principal Repayments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Default Losses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Net Cash Flow
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {summary.cashFlowProjections.map((item: any, index: number) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {new Date(item.date).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    ${item.interestIncome.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    ${item.principalRepayments.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-accent-600">
                    -${item.defaultLosses.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-600">
                    ${item.netCashFlow.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;
