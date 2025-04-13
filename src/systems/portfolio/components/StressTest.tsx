import React, { useState, useEffect } from 'react';
import { AlertTriangle, ArrowRight, BarChart2, Download, RefreshCw } from 'lucide-react';
import { portfolioApiClient } from '../services/portfolioApiClient';
import { StressTestResult } from '../types/portfolioTypes';

const StressTest: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedScenario, setSelectedScenario] = useState<string>('default');
  const [stressTestResult, setStressTestResult] = useState<StressTestResult | null>(null);

  const scenarios = [
    { id: 'default', name: 'Interest Rate Shock', description: 'Simulates a sudden 200 basis point increase in interest rates' },
    { id: 'property-crash', name: 'Property Market Crash', description: 'Simulates a severe downturn in the property market with 25% value reduction' },
    { id: 'recession', name: 'Economic Recession', description: 'Simulates an economic recession with increased vacancy and reduced rents' }
  ];

  useEffect(() => {
    runStressTest(selectedScenario);
  }, [selectedScenario]);

  const runStressTest = async (scenario: string) => {
    setLoading(true);
    try {
      const result = await portfolioApiClient.runStressTest(scenario);
      setStressTestResult(result);
    } catch (error) {
      console.error('Error running stress test:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value);
  };

  const getPercentageColor = (value: number) => {
    if (value > 0) return 'text-success';
    if (value < 0) return 'text-danger';
    return 'text-neutral-500';
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-primary-900">Portfolio Stress Testing</h1>
            <p className="text-sm text-neutral-600 mt-1">
              Evaluate portfolio resilience under various market scenarios and economic conditions
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right mr-4">
              <p className="text-sm font-medium text-neutral-500">Risk Score</p>
              <p className="text-xl font-bold text-primary-700">{stressTestResult ? `${stressTestResult.impactSummary.riskScore}/100` : 'N/A'}</p>
            </div>
            <button
              className="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md shadow-sm hover:bg-primary-700 flex items-center"
              onClick={() => runStressTest(selectedScenario)}
              disabled={loading}
            >
              <RefreshCw size={16} className={`mr-1.5 ${loading ? 'animate-spin' : ''}`} />
              Run Test
            </button>
          </div>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary-800">Stress Test Scenarios</h2>
          <div className="flex space-x-2">
            <button
              className="flex items-center px-3 py-2 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 transition-colors duration-150 text-sm"
              onClick={() => runStressTest(selectedScenario)}
              disabled={loading}
            >
              <RefreshCw size={14} className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Running...' : 'Run Test'}
            </button>
            <button className="flex items-center px-3 py-2 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 transition-colors duration-150 text-sm">
              <Download size={14} className="mr-1" />
              Export Results
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors duration-150 ${
                selectedScenario === scenario.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
              }`}
              onClick={() => setSelectedScenario(scenario.id)}
            >
              <div className="flex items-start mb-2">
                <AlertTriangle
                  size={18}
                  className={`mr-2 mt-0.5 ${
                    scenario.id === 'default'
                      ? 'text-yellow-500'
                      : scenario.id === 'property-crash'
                        ? 'text-red-500'
                        : 'text-orange-500'
                  }`}
                />
                <h3 className="text-lg font-medium text-neutral-800">{scenario.name}</h3>
              </div>
              <p className="text-sm text-neutral-600 ml-6">{scenario.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stress Test Results */}
      {stressTestResult && (
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-xl font-semibold text-primary-800 mb-6">Stress Test Results: {stressTestResult.scenario}</h2>

          {/* Impact Summary */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-neutral-700 mb-4">Impact Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                <p className="text-sm font-medium text-neutral-500">Portfolio Value</p>
                <div className="flex items-baseline mt-1">
                  <p className="text-xl font-semibold text-neutral-900">{formatCurrency(stressTestResult.impactSummary.totalValue)}</p>
                  <p className={`ml-2 text-sm ${getPercentageColor(stressTestResult.impactSummary.percentageChange)}`}>
                    {formatPercentage(stressTestResult.impactSummary.percentageChange)}
                  </p>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                <p className="text-sm font-medium text-neutral-500">Risk Score</p>
                <div className="flex items-baseline mt-1">
                  <p className="text-xl font-semibold text-neutral-900">{stressTestResult.impactSummary.riskScore}/100</p>
                  <p className="ml-2 text-sm text-danger">
                    {formatPercentage((stressTestResult.impactSummary.riskScore / 38 - 1) * 100)}
                  </p>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                <p className="text-sm font-medium text-neutral-500">Severity</p>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        stressTestResult.impactSummary.percentageChange > -10
                          ? 'bg-yellow-500'
                          : stressTestResult.impactSummary.percentageChange > -20
                            ? 'bg-orange-500'
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(Math.abs(stressTestResult.impactSummary.percentageChange) * 2, 100)}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-neutral-700">
                    {Math.abs(stressTestResult.impactSummary.percentageChange) < 10
                      ? 'Moderate'
                      : Math.abs(stressTestResult.impactSummary.percentageChange) < 20
                        ? 'Significant'
                        : 'Severe'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Impacts */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-neutral-700 mb-4">Metric Impacts</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Metric</th>
                    <th className="px-6 py-3 bg-neutral-50 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Base Value</th>
                    <th className="px-6 py-3 bg-neutral-50 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Stressed Value</th>
                    <th className="px-6 py-3 bg-neutral-50 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Change</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {stressTestResult.metricImpacts.map((impact, index) => (
                    <tr key={index} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-700">{impact.metric}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 text-right">{impact.baseValue}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 text-right">{impact.stressedValue}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${getPercentageColor(impact.percentageChange)}`}>
                        {formatPercentage(impact.percentageChange)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Suburb Impacts */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-neutral-700 mb-4">Suburb Impacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Suburb</th>
                      <th className="px-6 py-3 bg-neutral-50 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Base Value</th>
                      <th className="px-6 py-3 bg-neutral-50 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Stressed Value</th>
                      <th className="px-6 py-3 bg-neutral-50 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Change</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    {stressTestResult.suburbImpacts.map((impact, index) => (
                      <tr key={index} className="hover:bg-neutral-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-700">{impact.suburb}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 text-right">{formatCurrency(impact.baseValue)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 text-right">{formatCurrency(impact.stressedValue)}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${getPercentageColor(impact.percentageChange)}`}>
                          {formatPercentage(impact.percentageChange)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200 h-full">
                  <h4 className="text-md font-medium text-neutral-700 mb-4">Impact Visualization</h4>
                  <div className="flex justify-center items-center h-64">
                    <BarChart2 size={64} className="text-neutral-300" />
                    <p className="text-neutral-400 text-sm mt-2">Chart visualization will be implemented in production</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-lg font-medium text-neutral-700 mb-4">Recommendations</h3>
            <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-md">
              <ul className="space-y-2">
                {stressTestResult.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight size={16} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-neutral-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StressTest;
