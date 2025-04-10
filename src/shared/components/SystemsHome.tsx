import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, BarChart2, FileCheck } from 'lucide-react';

const SystemsHome: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Equihome Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Select a system to begin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Traffic Light System */}
        <Link 
          to="/traffic-light"
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100"
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
            <Brain className="h-12 w-12 text-white mb-4" />
            <h2 className="text-2xl font-bold text-white">Traffic Light System</h2>
            <p className="text-green-100 mt-2">
              Market analysis and opportunity identification
            </p>
          </div>
          <div className="p-6 flex-grow">
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                AI-powered suburb classification
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                Risk-based zoning system
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                Market trend analysis
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                Investment opportunity mapping
              </li>
            </ul>
            <div className="mt-6 text-center">
              <span className="inline-flex items-center text-green-600 font-medium">
                Enter System <span className="ml-2">→</span>
              </span>
            </div>
          </div>
        </Link>

        {/* Portfolio Management System */}
        <Link 
          to="/portfolio"
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100"
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <BarChart2 className="h-12 w-12 text-white mb-4" />
            <h2 className="text-2xl font-bold text-white">Portfolio Management</h2>
            <p className="text-blue-100 mt-2">
              Optimize and manage your loan portfolio
            </p>
          </div>
          <div className="p-6 flex-grow">
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                Deal pipeline management
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                Portfolio performance tracking
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                Risk diversification tools
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                Financial modeling and simulation
              </li>
            </ul>
            <div className="mt-6 text-center">
              <span className="inline-flex items-center text-blue-600 font-medium">
                Enter System <span className="ml-2">→</span>
              </span>
            </div>
          </div>
        </Link>

        {/* Underwriting System */}
        <Link 
          to="/underwriting"
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100"
        >
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
            <FileCheck className="h-12 w-12 text-white mb-4" />
            <h2 className="text-2xl font-bold text-white">Underwriting System</h2>
            <p className="text-purple-100 mt-2">
              Evaluate properties and homeowners
            </p>
          </div>
          <div className="p-6 flex-grow">
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-500 rounded-full mr-2"></span>
                Automated loan evaluation
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-500 rounded-full mr-2"></span>
                Property risk assessment
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-500 rounded-full mr-2"></span>
                Financial modeling
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-500 rounded-full mr-2"></span>
                Decision engine
              </li>
            </ul>
            <div className="mt-6 text-center">
              <span className="inline-flex items-center text-purple-600 font-medium">
                Enter System <span className="ml-2">→</span>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SystemsHome;
