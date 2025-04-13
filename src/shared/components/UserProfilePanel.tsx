import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, Shield, Bell, Moon, Sun, HelpCircle } from 'lucide-react';
import { useApi } from '../../services/api/ApiContext';

interface UserProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfilePanel: React.FC<UserProfilePanelProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useApi();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  if (!isOpen || !user) return null;

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // In a real implementation, this would update the theme in the user preferences
  };

  const navigateTo = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 overflow-hidden border border-neutral-200">
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-neutral-900">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-neutral-500">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="py-1">
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
          onClick={() => navigateTo('/admin/users')}
        >
          <User size={16} className="mr-3 text-neutral-400" />
          My Profile
        </button>
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
          onClick={() => navigateTo('/admin/settings')}
        >
          <Bell size={16} className="mr-3 text-neutral-400" />
          Notification Settings
        </button>
      </div>

      <div className="border-t border-neutral-200 py-1">
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <>
              <Moon size={16} className="mr-3 text-neutral-400" />
              Dark Mode
            </>
          ) : (
            <>
              <Sun size={16} className="mr-3 text-neutral-400" />
              Light Mode
            </>
          )}
        </button>
      </div>

      <div className="border-t border-neutral-200 py-1">
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-accent-600 hover:bg-neutral-100"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-3 text-accent-600" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserProfilePanel;
