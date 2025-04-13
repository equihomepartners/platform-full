import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Users, Settings, Shield, FileText, Activity, Lock } from 'lucide-react';

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900">Administration</h1>
          <p className="text-neutral-500 mt-1">Manage users, settings, and system configuration</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-md shadow-sm border border-neutral-200 overflow-hidden">
              <nav className="flex flex-col">
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`
                  }
                >
                  <Users size={18} className="mr-3" />
                  User Management
                </NavLink>
                <NavLink
                  to="/admin/settings"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`
                  }
                >
                  <Settings size={18} className="mr-3" />
                  System Settings
                </NavLink>
                <NavLink
                  to="/admin/security"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`
                  }
                >
                  <Shield size={18} className="mr-3" />
                  Security & Compliance
                </NavLink>
                <NavLink
                  to="/admin/docs"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`
                  }
                >
                  <FileText size={18} className="mr-3" />
                  Documentation
                </NavLink>
                <NavLink
                  to="/admin/audit"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`
                  }
                >
                  <Activity size={18} className="mr-3" />
                  Audit Logs
                </NavLink>
                <NavLink
                  to="/admin/api"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`
                  }
                >
                  <Lock size={18} className="mr-3" />
                  API Access
                </NavLink>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-md shadow-sm border border-neutral-200 p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
