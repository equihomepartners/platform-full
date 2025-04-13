import React, { useState, useEffect } from 'react';
import { PieChart, BarChart2, TrendingUp, Map, RefreshCw, AlertTriangle, Loader } from 'lucide-react';
import { portfolioApiClient } from '../services/portfolioApiClient';
import { PortfolioAnalytics } from '../types/portfolioTypes';

const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<PortfolioAnalytics | null>(null);
  const [timeframe, setTimeframe] = useState('1y');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await portfolioApiClient.getPortfolioAnalytics(timeframe);
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeframe]);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await portfolioApiClient.getPortfolioAnalytics(timeframe);
      setAnalytics(data);
    } catch (error) {
      console.error('Error refreshing analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-primary-500 h-8 w-8" />
        <span className="ml-2 text-neutral-600">Loading analytics data...</span>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-neutral-600">No analytics data available</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-primary-900">Portfolio Analytics</h1>
            <p className="text-sm text-neutral-600 mt-1">
              Comprehensive analysis and visualization of portfolio performance metrics
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 mr-4">
              <span className="text-sm text-neutral-600">Timeframe:</span>
              <select
                className="text-sm border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option value="1m">1 Month</option>
                <option value="3m">3 Months</option>
                <option value="6m">6 Months</option>
                <option value="1y">1 Year</option>
                <option value="3y">3 Years</option>
                <option value="5y">5 Years</option>
              </select>
            </div>
            <button
              className="px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md shadow-sm hover:bg-neutral-50 flex items-center"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw size={16} className={`mr-1.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-primary-50 rounded-full mr-3 border border-primary-100">
              <BarChart2 size={20} className="text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary-800">Analytics Overview</h2>
              <p className="text-sm text-neutral-600 mt-1">Key performance indicators and metrics</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-neutral-600 mr-2">Last updated: Today</span>
            <button className="text-primary-600 hover:text-primary-800 transition-colors duration-150">
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Performance Score</p>
                <p className="text-2xl font-semibold mt-1">85/100</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary-600" />
            </div>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Risk Score</p>
                <p className="text-2xl font-semibold mt-1">42/100</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Diversification</p>
                <p className="text-2xl font-semibold mt-1">78%</p>
              </div>
              <PieChart className="h-8 w-8 text-primary-600" />
            </div>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Suburb Coverage</p>
                <p className="text-2xl font-semibold mt-1">8</p>
              </div>
              <Map className="h-8 w-8 text-secondary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Attribution */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="text-lg font-semibold text-primary-800">Performance Attribution</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-medium text-neutral-700 mb-4">Attribution by Factor</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Suburb Selection</span>
                  <span className="font-medium">5.2%</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full">
                  <div
                    className="h-full bg-primary-600 rounded-full"
                    style={{ width: '28%' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Property Type Selection</span>
                  <span className="font-medium">3.8%</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full">
                  <div
                    className="h-full bg-primary-500 rounded-full"
                    style={{ width: '21%' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Interest Rate</span>
                  <span className="font-medium">4.5%</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full">
                  <div
                    className="h-full bg-secondary-600 rounded-full"
                    style={{ width: '24%' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Loan Term</span>
                  <span className="font-medium">2.1%</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full">
                  <div
                    className="h-full bg-warning rounded-full"
                    style={{ width: '11%' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">LTV Ratio</span>
                  <span className="font-medium">1.8%</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full">
                  <div
                    className="h-full bg-error rounded-full"
                    style={{ width: '10%' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Market Timing</span>
                  <span className="font-medium">1.1%</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full">
                  <div
                    className="h-full bg-primary-400 rounded-full"
                    style={{ width: '6%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-neutral-700 mb-4">Attribution by Suburb</h4>
            <div className="h-64 bg-neutral-100 rounded-lg flex items-center justify-center">
              <span className="text-neutral-400">Suburb Attribution Chart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Decomposition */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center mb-6">
          <AlertTriangle className="h-5 w-5 text-warning mr-2" />
          <h3 className="text-lg font-semibold text-primary-800">Risk Decomposition</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-medium text-neutral-700 mb-4">Risk by Factor</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Market Risk</span>
                  <span className="font-medium">0.18</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full">
                  <div
                    className="h-full bg-error rounded-full"
                    style={{ width: '43%' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Credit Risk</span>
                  <span className="font-medium">0.12</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full">
                  <div
                    className="h-full bg-accent-500 rounded-full"
                    style={{ width: '29%' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Interest Rate Risk</span>
                  <span className="font-medium">0.08</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full">
                  <div
                    className="h-full bg-warning rounded-full"
                    style={{ width: '19%' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Concentration Risk</span>
                  <span className="font-medium">0.04</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full">
                  <div
                    className="h-full bg-primary-600 rounded-full"
                    style={{ width: '9%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-neutral-700 mb-4">Risk by Suburb</h4>
            <div className="h-64 bg-neutral-100 rounded-lg flex items-center justify-center">
              <span className="text-neutral-400">Suburb Risk Chart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center mb-6">
          <BarChart2 className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="text-lg font-semibold text-primary-800">Trend Analysis</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-medium text-neutral-700 mb-4">Performance Trends</h4>
            <div className="h-64 bg-neutral-100 rounded-lg flex items-center justify-center">
              <span className="text-neutral-400">Performance Trend Chart</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-neutral-700 mb-4">Risk Trends</h4>
            <div className="h-64 bg-neutral-100 rounded-lg flex items-center justify-center">
              <span className="text-neutral-400">Risk Trend Chart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Correlation Analysis */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center mb-6">
          <PieChart className="h-5 w-5 text-secondary-600 mr-2" />
          <h3 className="text-lg font-semibold text-primary-800">Correlation Analysis</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Metric 1
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Metric 2
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Correlation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Strength
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Direction
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  IRR
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  Property Value
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  0.72
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  Strong
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                  Positive
                </td>
              </tr>
              <tr className="bg-neutral-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  IRR
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  LTV Ratio
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  -0.35
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  Moderate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-accent-600">
                  Negative
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  Default Rate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  Property Value
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  -0.68
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  Strong
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-accent-600">
                  Negative
                </td>
              </tr>
              <tr className="bg-neutral-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  Default Rate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  LTV Ratio
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  0.81
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  Strong
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                  Positive
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  Cash Yield
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  Interest Rate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  0.92
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  Very Strong
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                  Positive
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
