import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BarChart2, PieChart, Calculator, Settings, Sliders, Database, HelpCircle, FileText, AlertTriangle, Download, RefreshCw } from 'lucide-react';

const PortfolioLayout: React.FC = () => {
  const location = useLocation();

  const tabs = [
    { name: 'Dashboard', path: '/portfolio', icon: <BarChart2 className="h-5 w-5" /> },
    { name: 'Portfolio Management', path: '/portfolio/management', icon: <Database className="h-5 w-5" /> },
    { name: 'Fund Parameters', path: '/portfolio/fund-parameters', icon: <Sliders className="h-5 w-5" /> },
    { name: 'Simulation', path: '/portfolio/simulation', icon: <Calculator className="h-5 w-5" /> },
    { name: 'Analytics', path: '/portfolio/analytics', icon: <PieChart className="h-5 w-5" /> },
    { name: 'Stress Test', path: '/portfolio/stress-test', icon: <AlertTriangle className="h-5 w-5" /> },
    { name: 'Settings', path: '/portfolio/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-primary-900">Portfolio Management System</h1>
            <p className="mt-1 text-sm text-neutral-600">
              Institutional-grade portfolio optimization and management
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-3 py-2 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none transition-colors duration-150">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none transition-colors duration-150">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-primary-500 shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none transition-colors duration-150">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg border border-neutral-200">
          <div className="border-b border-neutral-200 bg-neutral-50">
            <nav className="flex space-x-1 px-4" aria-label="Tabs">
              {tabs.map((tab) => {
                const isActive = location.pathname === tab.path;
                return (
                  <Link
                    key={tab.name}
                    to={tab.path}
                    className={`
                      ${isActive
                        ? 'bg-white text-primary-700 border-t-2 border-primary-500 shadow-sm'
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-100'
                      }
                      whitespace-nowrap py-4 px-5 font-medium text-sm flex items-center transition-colors duration-150 rounded-t-md
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className={`${isActive ? 'text-primary-500' : 'text-neutral-400'} mr-2`}>
                      {tab.icon}
                    </span>
                    {tab.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="p-8 min-h-[calc(100vh-250px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioLayout;
