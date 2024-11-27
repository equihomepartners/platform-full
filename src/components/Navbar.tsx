import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, PieChart, Settings, Brain, ListFilter, Calculator } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link to="/" className="flex items-center -ml-2">
            <Logo />
          </Link>
          
          <div className="bg-gray-50 rounded-xl p-1 flex space-x-0.5 shadow-sm border border-gray-100">
            <Link 
              to="/cio" 
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium group transition-all duration-200 ${
                isActive('/cio') 
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-100' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <Settings className={`h-4 w-4 transition-colors ${
                isActive('/cio') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'
              }`} />
              <div className="flex items-center">
                <span>CIO</span>
                <span className="ml-1.5 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-mono">
                  alpha
                </span>
              </div>
            </Link>
            
            <Link 
              to="/underwrite" 
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium group transition-all duration-200 ${
                isActive('/underwrite') 
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-100' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <Brain className={`h-4 w-4 transition-colors ${
                isActive('/underwrite') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'
              }`} />
              <div className="flex items-center">
                <span>Underwrite</span>
                <span className="ml-1.5 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-mono">
                  alpha
                </span>
              </div>
            </Link>

            <Link 
              to="/pipeline" 
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium group transition-all duration-200 ${
                isActive('/pipeline') 
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-100' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <ListFilter className={`h-5 w-5 transition-colors ${
                isActive('/pipeline') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'
              }`} />
              <div className="flex items-center">
                <span>Pipeline</span>
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-mono">
                  alpha
                </span>
              </div>
            </Link>

            <Link 
              to="/model" 
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium group transition-all duration-200 ${
                isActive('/model') 
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-100' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <Calculator className={`h-5 w-5 transition-colors ${
                isActive('/model') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'
              }`} />
              <div className="flex items-center">
                <span>Model</span>
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-mono">
                  alpha
                </span>
              </div>
            </Link>
            
            <Link 
              to="/report" 
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium group transition-all duration-200 ${
                isActive('/report') 
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-100' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <PieChart className={`h-5 w-5 transition-colors ${
                isActive('/report') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'
              }`} />
              <div className="flex items-center">
                <span>Report</span>
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">
                  example
                </span>
              </div>
            </Link>
            
            <Link 
              to="/loans" 
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-medium group transition-all duration-200 ${
                isActive('/loans') 
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-100' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <LayoutGrid className={`h-5 w-5 transition-colors ${
                isActive('/loans') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'
              }`} />
              <div className="flex items-center">
                <span>Loans</span>
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">
                  example
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