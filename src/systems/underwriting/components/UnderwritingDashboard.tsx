import React from 'react';
import { FileCheck, Users, Home, TrendingUp } from 'lucide-react';

const UnderwritingDashboard: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Underwriting Dashboard</h2>
        <p className="text-gray-600">
          Welcome to the Underwriting System. This dashboard provides an overview of loan applications, 
          property evaluations, and underwriting metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center text-purple-600 mb-4">
            <FileCheck className="h-8 w-8 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Active Applications</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
          </div>
          <div className="text-xs text-green-600 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>12% increase</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center text-purple-600 mb-4">
            <Home className="h-8 w-8 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Properties Evaluated</p>
              <h3 className="text-2xl font-bold">156</h3>
            </div>
          </div>
          <div className="text-xs text-green-600 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>8% increase</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center text-purple-600 mb-4">
            <Users className="h-8 w-8 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Approved Loans</p>
              <h3 className="text-2xl font-bold">87</h3>
            </div>
          </div>
          <div className="text-xs text-green-600 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>15% increase</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center text-purple-600 mb-4">
            <TrendingUp className="h-8 w-8 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Approval Rate</p>
              <h3 className="text-2xl font-bold">68%</h3>
            </div>
          </div>
          <div className="text-xs text-green-600 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>5% increase</span>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 mb-8">
        <h3 className="text-lg font-semibold text-purple-800 mb-3">System Status</h3>
        <p className="text-purple-700">
          The Underwriting System is ready for implementation. This placeholder will be replaced with actual 
          underwriting components as they are developed. The system will include loan application processing, 
          property evaluation, risk assessment, and decision engine functionality.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Application #{1000 + i}</p>
                  <p className="text-sm text-gray-500">Property in Sydney, NSW</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  In Review
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Features</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
              <div>
                <p className="font-medium">Automated Property Valuation</p>
                <p className="text-sm text-gray-500">Integration with PropTrack for real-time property valuations</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
              <div>
                <p className="font-medium">Risk Assessment Engine</p>
                <p className="text-sm text-gray-500">ML-powered risk scoring for loan applications</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
              <div>
                <p className="font-medium">Decision Automation</p>
                <p className="text-sm text-gray-500">Automated approval/rejection based on risk assessment</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UnderwritingDashboard;
