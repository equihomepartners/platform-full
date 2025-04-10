import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BarChart2, PieChart, Briefcase, TrendingUp, Settings, Sliders } from 'lucide-react';

const PortfolioLayout: React.FC = () => {
  const location = useLocation();

  const tabs = [
    { name: 'Dashboard', path: '/portfolio', icon: <BarChart2 className="h-5 w-5" /> },
    { name: 'Pipeline', path: '/portfolio/pipeline', icon: <TrendingUp className="h-5 w-5" /> },
    { name: 'Deals', path: '/portfolio/deals', icon: <Briefcase className="h-5 w-5" /> },
    { name: 'Analytics', path: '/portfolio/analytics', icon: <PieChart className="h-5 w-5" /> },
    { name: 'Fund Parameters', path: '/portfolio/fund-parameters', icon: <Sliders className="h-5 w-5" /> },
    { name: 'Settings', path: '/portfolio/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Optimize and manage your loan portfolio
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-6">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">Select a tab</label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              defaultValue={tabs.find(tab => location.pathname === tab.path)?.name}
              onChange={(e) => {
                const tab = tabs.find(tab => tab.name === e.target.value);
                if (tab) {
                  window.location.href = tab.path;
                }
              }}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => {
                  const isActive = location.pathname === tab.path;
                  return (
                    <Link
                      key={tab.name}
                      to={tab.path}
                      className={`
                        ${isActive
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }
                        whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
                      `}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className={`${isActive ? 'text-blue-500' : 'text-gray-400'} mr-2`}>
                        {tab.icon}
                      </span>
                      {tab.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 min-h-[calc(100vh-250px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default PortfolioLayout;
