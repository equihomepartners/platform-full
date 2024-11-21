import React from 'react';
import { Line } from 'react-chartjs-2';
import { useFundStore } from './fundStore';
import { calculateFundMetrics } from './utils';

const ScenarioAnalysis: React.FC = () => {
  const { inputs } = useFundStore();

  // Define scenarios
  const scenarios = [
    { name: 'Bear Market', growthAdjustment: -4, ltvAdjustment: 5 },
    { name: 'Conservative', growthAdjustment: -2, ltvAdjustment: 2 },
    { name: 'Base Case', growthAdjustment: 0, ltvAdjustment: 0 },
    { name: 'Optimistic', growthAdjustment: 2, ltvAdjustment: -2 },
    { name: 'Bull Market', growthAdjustment: 4, ltvAdjustment: -5 }
  ];

  // Calculate metrics for each scenario
  const scenarioMetrics = scenarios.map(scenario => {
    const adjustedInputs = {
      ...inputs,
      growthDistribution: {
        ...inputs.growthDistribution,
        mean: inputs.growthDistribution.mean + scenario.growthAdjustment
      },
      ltvDistribution: {
        ...inputs.ltvDistribution,
        mean: inputs.ltvDistribution.mean + scenario.ltvAdjustment
      }
    };
    return {
      name: scenario.name,
      metrics: calculateFundMetrics(adjustedInputs)
    };
  });

  const irrData = {
    labels: Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`),
    datasets: scenarioMetrics.map((scenario, index) => ({
      label: scenario.name,
      data: scenario.metrics.yearlyReturns.map(r => r.irr),
      borderColor: [
        '#EF4444', // Bear Market (Red)
        '#F59E0B', // Conservative (Orange)
        '#3B82F6', // Base Case (Blue)
        '#10B981', // Optimistic (Green)
        '#8B5CF6'  // Bull Market (Purple)
      ][index],
      tension: 0.4
    }))
  };

  const returnData = {
    labels: Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`),
    datasets: scenarioMetrics.map((scenario, index) => ({
      label: scenario.name,
      data: scenario.metrics.yearlyReturns.map(r => r.totalReturn / 1000000), // Convert to millions
      borderColor: [
        '#EF4444',
        '#F59E0B',
        '#3B82F6',
        '#10B981',
        '#8B5CF6'
      ][index],
      tension: 0.4
    }))
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">IRR by Scenario</h3>
          <div className="h-[400px]">
            <Line
              data={irrData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'IRR (%)'
                    },
                    ticks: {
                      callback: (value: number) => `${value.toFixed(1)}%`
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Returns by Scenario</h3>
          <div className="h-[400px]">
            <Line
              data={returnData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Returns ($M)'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Scenario Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scenario
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  10-Year IRR
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Returns
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weighted LTV
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scenarioMetrics.map((scenario) => (
                <tr key={scenario.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {scenario.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {scenario.metrics.yearlyReturns[9].irr.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${(scenario.metrics.yearlyReturns[9].totalReturn / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {scenario.metrics.weightedLTV.toFixed(1)}%
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

export default ScenarioAnalysis;