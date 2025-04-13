import React from 'react';
import { DollarSign, Target, Users, Clock, Percent } from 'lucide-react';

const Pipeline: React.FC = () => {
  // Mock metrics for simplified version
  const metrics = {
    totalApplications: 25,
    totalPipelineVolume: 15000000,
    approvalRate: 68.5,
    averageLTV: 65.2
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Loan Pipeline
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Overview of loan applications in the pipeline
        </p>
      </div>

      {/* Pipeline Summary Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Pipeline Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-semibold mt-1">{metrics.totalApplications}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pipeline Volume</p>
                <p className="text-2xl font-semibold mt-1">
                  ${(metrics.totalPipelineVolume / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approval Rate</p>
                <p className="text-2xl font-semibold mt-1">{metrics.approvalRate.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average LTV</p>
                <p className="text-2xl font-semibold mt-1">{metrics.averageLTV.toFixed(1)}%</p>
              </div>
              <Percent className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Times</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Initial Review</span>
            </div>
            <p className="text-2xl font-semibold">2.4 days</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Due Diligence</span>
            </div>
            <p className="text-2xl font-semibold">5.2 days</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Final Approval</span>
            </div>
            <p className="text-2xl font-semibold">1.8 days</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Total Time</span>
            </div>
            <p className="text-2xl font-semibold">9.4 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
