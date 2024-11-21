import React from 'react';
import { Line } from 'react-chartjs-2';
import { DollarSign, TrendingUp, Building2, Percent, Clock } from 'lucide-react';
import { useFundStore } from './fundStore';
import { calculateFundMetrics } from './utils';

const PortfolioModel: React.FC = () => {
  const { inputs } = useFundStore();
  const metrics = calculateFundMetrics(inputs);

  const returnData = {
    labels: metrics.yearlyReturns.map(r => `Year ${r.year}`),
    datasets: [
      {
        label: 'Interest Returns',
        data: metrics.yearlyReturns.map(r => r.interestReturn / 1000000), // Convert to millions
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      },
      {
        label: 'Appreciation Returns',
        data: metrics.yearlyReturns.map(r => r.appreciationReturn / 1000000), // Convert to millions
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      }
    ]
  };

  const irrData = {
    labels: metrics.yearlyReturns.map(r => `Year ${r.year}`),
    datasets: [{
      label: 'Portfolio IRR',
      data: metrics.yearlyReturns.map(r => r.irr),
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const cumulativeData = {
    labels: metrics.yearlyReturns.map(r => `Year ${r.year}`),
    datasets: [{
      label: 'Cumulative Returns',
      data: metrics.yearlyReturns.map(r => r.totalReturn / 1000000),
      borderColor: '#F59E0B',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total AUM</p>
              <p className="text-2xl font-semibold mt-1">
                ${(inputs.targetAUM / 1000000).toFixed(1)}M
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Deal Size</p>
              <p className="text-2xl font-semibold mt-1">
                ${(inputs.averageDealSize / 1000000).toFixed(1)}M
              </p>
            </div>
            <Building2 className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Exit Term</p>
              <p className="text-2xl font-semibold mt-1">
                {inputs.averageExitTerm} years
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Target IRR</p>
              <p className="text-2xl font-semibold mt-1">
                {metrics.yearlyReturns[Math.floor(inputs.averageExitTerm) - 1].irr.toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Components</h3>
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

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio IRR</h3>
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
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cumulative Returns</h3>
        <div className="h-[400px]">
          <Line
            data={cumulativeData}
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
                    text: 'Cumulative Returns ($M)'
                  }
                }
              }
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Composition</h4>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Number of Deals</div>
              <div className="text-2xl font-semibold">{inputs.numberOfDeals}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Weighted LTV</div>
              <div className="text-2xl font-semibold">{metrics.weightedLTV.toFixed(1)}%</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Return Metrics</h4>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total Returns at Exit</div>
              <div className="text-2xl font-semibold">
                ${(metrics.yearlyReturns[Math.floor(inputs.averageExitTerm) - 1].totalReturn / 1000000).toFixed(1)}M
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Average Growth Rate</div>
              <div className="text-2xl font-semibold">{metrics.weightedGrowthRate.toFixed(1)}%</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Return Components</h4>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Interest Returns at Exit</div>
              <div className="text-2xl font-semibold">
                ${(metrics.yearlyReturns[Math.floor(inputs.averageExitTerm) - 1].interestReturn / 1000000).toFixed(1)}M
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Appreciation Returns at Exit</div>
              <div className="text-2xl font-semibold">
                ${(metrics.yearlyReturns[Math.floor(inputs.averageExitTerm) - 1].appreciationReturn / 1000000).toFixed(1)}M
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModel;