import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useFundStore } from './fundStore';
import { generateRandomDeal } from './utils';

const RiskAnalysis: React.FC = () => {
  const { inputs } = useFundStore();

  // Generate sample deals for distribution analysis
  const sampleSize = 1000;
  const deals = Array.from({ length: sampleSize }, () => generateRandomDeal(inputs));

  // LTV Distribution
  const ltvBins = Array.from({ length: 12 }, (_, i) => i * 5 + 15); // 15% to 70% in 5% increments
  const ltvDistribution = ltvBins.map(bin => ({
    bin,
    count: deals.filter(deal => deal.ltv >= bin && deal.ltv < bin + 5).length
  }));

  // Growth Rate Distribution
  const growthBins = Array.from({ length: 11 }, (_, i) => i + 2); // 2% to 12% in 1% increments
  const growthDistribution = growthBins.map(bin => ({
    bin,
    count: deals.filter(deal => deal.growthRate >= bin && deal.growthRate < bin + 1).length
  }));

  const ltvData = {
    labels: ltvDistribution.map(d => `${d.bin}%-${d.bin + 5}%`),
    datasets: [{
      label: 'Number of Deals',
      data: ltvDistribution.map(d => d.count),
      backgroundColor: '#3B82F6'
    }]
  };

  const growthData = {
    labels: growthDistribution.map(d => `${d.bin}%-${d.bin + 1}%`),
    datasets: [{
      label: 'Number of Deals',
      data: growthDistribution.map(d => d.count),
      backgroundColor: '#10B981'
    }]
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">LTV Distribution</h3>
          <div className="h-[400px]">
            <Bar
              data={ltvData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Number of Deals'
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Rate Distribution</h3>
          <div className="h-[400px]">
            <Bar
              data={growthData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Number of Deals'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Average LTV</div>
            <div className="text-2xl font-semibold">
              {(deals.reduce((sum, deal) => sum + deal.ltv, 0) / deals.length).toFixed(1)}%
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">LTV Standard Deviation</div>
            <div className="text-2xl font-semibold">
              {Math.sqrt(
                deals.reduce((sum, deal) => sum + Math.pow(deal.ltv - inputs.ltvDistribution.mean, 2), 0) / deals.length
              ).toFixed(1)}%
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">High LTV Deals (&gt;50%)</div>
            <div className="text-2xl font-semibold">
              {((deals.filter(deal => deal.ltv > 50).length / deals.length) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;