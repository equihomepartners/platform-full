import React, { useState } from 'react';
import { FileText, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const AssetReportButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4 w-96">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sample Asset Report</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            View our comprehensive asset performance report detailing portfolio metrics, market analysis, and investment insights.
          </p>
          <Link
            to="/asset-report"
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => setIsOpen(false)}
          >
            View Report
          </Link>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <FileText className="h-5 w-5 text-green-500" />
        <span className="font-medium">Sample Asset Report</span>
      </button>
    </div>
  );
};

export default AssetReportButton;