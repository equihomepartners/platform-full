import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, PieChart, Settings, Brain, Info, ListFilter, Calculator } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          
          <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
            <Link 
              to="/deals" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium group transition-colors ${
                isActive('/deals') 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white'
              }`}
            >
              <LayoutGrid className={`h-5 w-5 transition-colors ${
                isActive('/deals') ? 'text-indigo-600' : 'group-hover:text-indigo-600'
              }`} />
              <span>Loans</span>
            </Link>
            
            <Link 
              to="/fund-dashboard" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium group transition-colors ${
                isActive('/fund-dashboard') 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white'
              }`}
            >
              <PieChart className={`h-5 w-5 transition-colors ${
                isActive('/fund-dashboard') ? 'text-indigo-600' : 'group-hover:text-indigo-600'
              }`} />
              <span>Report</span>
            </Link>
            
            <Link 
              to="/underwrite" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium group transition-colors ${
                isActive('/underwrite') 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white'
              }`}
            >
              <Brain className={`h-5 w-5 transition-colors ${
                isActive('/underwrite') ? 'text-indigo-600' : 'group-hover:text-indigo-600'
              }`} />
              <div className="flex items-center">
                <span>Underwrite</span>
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-mono">
                  alpha
                </span>
              </div>
            </Link>
            
            <Link 
              to="/cio-dashboard" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium group transition-colors ${
                isActive('/cio-dashboard') 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white'
              }`}
            >
              <Settings className={`h-5 w-5 transition-colors ${
                isActive('/cio-dashboard') ? 'text-indigo-600' : 'group-hover:text-indigo-600'
              }`} />
              <div className="flex items-center">
                <span>CIO</span>
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-mono">
                  alpha
                </span>
              </div>
            </Link>

            <Link 
              to="/pipeline" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium group transition-colors ${
                isActive('/pipeline') 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white'
              }`}
            >
              <ListFilter className={`h-5 w-5 transition-colors ${
                isActive('/pipeline') ? 'text-indigo-600' : 'group-hover:text-indigo-600'
              }`} />
              <div className="flex items-center">
                <span>Pipeline</span>
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-mono">
                  alpha
                </span>
              </div>
            </Link>

            <Link 
              to="/financial-modeling" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium group transition-colors ${
                isActive('/financial-modeling') 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white'
              }`}
            >
              <Calculator className={`h-5 w-5 transition-colors ${
                isActive('/financial-modeling') ? 'text-indigo-600' : 'group-hover:text-indigo-600'
              }`} />
              <div className="flex items-center">
                <span>Model</span>
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-mono">
                  alpha
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;