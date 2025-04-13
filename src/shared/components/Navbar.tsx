import React, { useState } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { Search, Bell, ChevronDown, HelpCircle, Settings as SettingsIcon, User } from 'lucide-react';
import Logo from './Logo';
import { useApi } from '../../services/api/ApiContext';
import NotificationsPanel from './NotificationsPanel';
import UserProfilePanel from './UserProfilePanel';

// More subtle, professional icons for institutional-grade UI
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9.5L12 4L21 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 21H4.6C4.26863 21 4 20.7314 4 20.4V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 8V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 13V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 10V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const TrafficLightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="2" width="8" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="7" r="2.5" fill="#10B981" />
    <circle cx="12" cy="12" r="2.5" fill="#FBBF24" />
    <circle cx="12" cy="17" r="2.5" fill="#EF4444" />
  </svg>
);

const UnderwritingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3V7C14 7.55228 14.4477 8 15 8H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 13H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 17H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PortfolioIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 21H4.6C4.26863 21 4 20.7314 4 20.4V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 8V17" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 11V17" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 6V17" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Custom user icon for the navbar
const CustomUserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const Navbar: React.FC = () => {
  const { user } = useApi();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);

  // Environment indicator (e.g., Production, Staging, Development)
  const environment = 'Equihome';
  const appVersion = 'Alpha 2.1.2';

  return (
    <>
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="px-2 py-0.5 text-xs font-medium bg-success bg-opacity-10 text-success rounded">
                  {environment}
                </div>
                <div className="ml-2 text-xs text-neutral-400">{appVersion}</div>
              </div>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-10">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium ${
                      isActive && location.pathname === '/'
                        ? 'border-primary-500 text-neutral-900'
                        : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
                    }`
                  }
                >
                  <span className="mr-2 text-neutral-400"><HomeIcon /></span>
                  Home
                </NavLink>

                <NavLink
                  to="/traffic-light"
                  className={({ isActive }) =>
                    `inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium ${
                      isActive || location.pathname.startsWith('/traffic-light')
                        ? 'border-secondary-500 text-neutral-900'
                        : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
                    }`
                  }
                >
                  <span className="mr-2 text-neutral-400"><TrafficLightIcon /></span>
                  Traffic Light System
                </NavLink>

                <NavLink
                  to="/portfolio"
                  className={({ isActive }) =>
                    `inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium ${
                      isActive || location.pathname.startsWith('/portfolio')
                        ? 'border-primary-500 text-neutral-900'
                        : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
                    }`
                  }
                >
                  <span className="mr-2 text-neutral-400"><AnalyticsIcon /></span>
                  Portfolio Management
                </NavLink>

                <NavLink
                  to="/underwriting"
                  className={({ isActive }) =>
                    `inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium ${
                      isActive || location.pathname.startsWith('/underwriting')
                        ? 'border-accent-500 text-neutral-900'
                        : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
                    }`
                  }
                >
                  <span className="mr-2 text-neutral-400"><UnderwritingIcon /></span>
                  Underwriting System
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-neutral-400" />
                </div>
                <input
                  type="text"
                  className="block w-64 pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Search..."
                />
              </div>

              <div className="h-6 border-r border-neutral-200"></div>

              <button
                className="flex items-center px-3 py-1.5 text-sm font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md focus:outline-none transition-colors duration-150"
                onClick={() => window.open('/help', '_blank')}
              >
                <HelpCircle className="h-4 w-4 mr-1.5" />
                Help
              </button>

              <Link
                to="/admin/settings"
                className="flex items-center px-3 py-1.5 text-sm font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md focus:outline-none transition-colors duration-150"
              >
                <SettingsIcon className="h-4 w-4 mr-1.5" />
                Settings
              </Link>

              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setUserProfileOpen(false);
                  setDropdownOpen(false);
                }}
                className="flex items-center px-3 py-1.5 text-sm font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md focus:outline-none transition-colors duration-150 relative"
              >
                <Bell className="h-4 w-4 mr-1.5" />
                Notifications
                <span className="absolute top-1 left-1.5 block h-2 w-2 rounded-full bg-accent-500 ring-1 ring-white"></span>
              </button>

              <div className="relative ml-3">
                <button
                  onClick={() => {
                    setNotificationsOpen(false);
                    setUserProfileOpen(!userProfileOpen);
                    setDropdownOpen(false);
                  }}
                  className="flex items-center text-sm rounded-md focus:outline-none border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 transition-colors duration-150 px-3 py-1.5 shadow-sm"
                >
                  <div className="h-7 w-7 rounded-full bg-primary-600 flex items-center justify-center text-white mr-2">
                    <User size={14} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-neutral-800">J. Smith</span>
                    <span className="text-xs text-neutral-500">Administrator</span>
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 text-neutral-400" />
                </button>
                <UserProfilePanel
                  isOpen={userProfileOpen}
                  onClose={() => setUserProfileOpen(false)}
                />

              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Notifications Panel */}
      <NotificationsPanel
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </>
  );

};

export default Navbar;