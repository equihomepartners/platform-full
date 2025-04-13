import React, { useEffect, useState } from 'react';
import { Settings as SettingsIcon, Database, Moon, Sun, RefreshCw, Save, AlertTriangle, FileText, Upload, Search, Filter, Trash2, Eye, Edit, Plus, ChevronDown, Download } from 'lucide-react';
import { useSettingsStore } from '../store';

const Settings: React.FC = () => {
  const {
    apiUrl,
    useMockData,
    theme,
    refreshInterval,
    loading,
    error,
    fetchSettings,
    updateSettings
  } = useSettingsStore();

  const [formValues, setFormValues] = useState({
    apiUrl: '',
    useMockData: false,
    theme: 'light' as 'light' | 'dark',
    refreshInterval: 60000
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (apiUrl && !loading) {
      setFormValues({
        apiUrl,
        useMockData,
        theme,
        refreshInterval
      });
    }
  }, [apiUrl, useMockData, theme, refreshInterval, loading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormValues({
      ...formValues,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : name === 'refreshInterval'
          ? parseInt(value, 10)
          : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await updateSettings(formValues);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save settings', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-primary-900">System Settings</h1>
            <p className="text-sm text-neutral-600 mt-1">
              Configure your Portfolio Management System settings and manage documents
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={isSaving}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                isSaving ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-150'
              }`}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-accent-50 border-l-4 border-accent-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-accent-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-accent-700">
                {error.message || 'An error occurred while loading settings.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {saveSuccess && (
        <div className="bg-success-50 border-l-4 border-success p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Save className="h-5 w-5 text-success" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-success-700">
                Settings saved successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* API Settings */}
        <div className="bg-white rounded-lg shadow-card p-6 mb-8">
          <div className="flex items-center mb-6">
            <Database className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-primary-800">API Settings</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="apiUrl" className="block text-sm font-medium text-neutral-700 mb-1">
                API URL
              </label>
              <input
                type="text"
                id="apiUrl"
                name="apiUrl"
                value={formValues.apiUrl}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="https://api.example.com"
              />
              <p className="mt-1 text-xs text-neutral-500">
                The base URL for API requests. Leave empty to use the default.
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="useMockData"
                name="useMockData"
                checked={formValues.useMockData}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label htmlFor="useMockData" className="ml-2 block text-sm text-neutral-700">
                Use mock data when API is unavailable
              </label>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white rounded-lg shadow-card p-6 mb-8">
          <div className="flex items-center mb-6">
            <SettingsIcon className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-primary-800">Display Settings</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-neutral-700 mb-1">
                Theme
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="themeLight"
                    name="theme"
                    value="light"
                    checked={formValues.theme === 'light'}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                  />
                  <label htmlFor="themeLight" className="ml-2 flex items-center text-sm text-neutral-700">
                    <Sun className="h-4 w-4 mr-1" /> Light
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="themeDark"
                    name="theme"
                    value="dark"
                    checked={formValues.theme === 'dark'}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                  />
                  <label htmlFor="themeDark" className="ml-2 flex items-center text-sm text-neutral-700">
                    <Moon className="h-4 w-4 mr-1" /> Dark
                  </label>
                </div>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                Note: Dark theme is currently in development.
              </p>
            </div>
          </div>
        </div>

        {/* Data Refresh Settings */}
        <div className="bg-white rounded-lg shadow-card p-6 mb-8">
          <div className="flex items-center mb-6">
            <RefreshCw className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-primary-800">Data Refresh Settings</h3>
          </div>

          <div>
            <label htmlFor="refreshInterval" className="block text-sm font-medium text-neutral-700 mb-1">
              Auto-refresh Interval (milliseconds)
            </label>
            <select
              id="refreshInterval"
              name="refreshInterval"
              value={formValues.refreshInterval}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value={30000}>30 seconds</option>
              <option value={60000}>1 minute</option>
              <option value={300000}>5 minutes</option>
              <option value={600000}>10 minutes</option>
              <option value={1800000}>30 minutes</option>
              <option value={3600000}>1 hour</option>
            </select>
            <p className="mt-1 text-xs text-neutral-500">
              How often the dashboard data should automatically refresh.
            </p>
          </div>
        </div>

        {/* Document Management */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-primary-50 rounded-full mr-3 border border-primary-100">
              <FileText className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-800">Document Management</h3>
              <p className="text-sm text-neutral-600 mt-1">Manage and organize portfolio documents and reports</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search documents..."
              />
            </div>

            <div className="flex space-x-2">
              <button className="inline-flex items-center px-3 py-2 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none transition-colors duration-150">
                <Filter size={14} className="mr-1.5" />
                Filter
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none transition-colors duration-150">
                <Upload size={14} className="mr-1.5" />
                Upload
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-primary-500 shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none transition-colors duration-150">
                <Plus size={14} className="mr-1.5" />
                New Document
              </button>
            </div>
          </div>

          <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 text-center">
            <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
            <h4 className="text-lg font-medium text-neutral-700 mb-2">Document Management</h4>
            <p className="text-neutral-600 max-w-md mx-auto mb-4">
              Manage all your portfolio documents, reports, and files in one centralized location.
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-150">
              <FileText className="h-4 w-4 mr-2" />
              Go to Document Management
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
