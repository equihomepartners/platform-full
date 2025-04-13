import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const UnderwritingLayout: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Equihome Underwriting System</h1>
            <p className="mt-1 text-sm text-gray-500">
              Pipeline Management, Underwriting & Origination, Sales & Marketing, Analytics & Reporting
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg min-h-[calc(100vh-250px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default UnderwritingLayout;
