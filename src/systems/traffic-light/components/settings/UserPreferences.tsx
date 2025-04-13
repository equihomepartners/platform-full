import React, { useState } from 'react';
import { UserCog, Save, RefreshCw, AlertCircle, CheckCircle, Eye, EyeOff, Map, BarChart } from 'lucide-react';

const UserPreferences: React.FC = () => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  // User preferences form state
  const [preferences, setPreferences] = useState({
    // Display Settings
    theme: 'light',
    mapDefaultView: 'suburbs',
    defaultZoom: 10,
    showConfidenceIndicators: true,
    
    // Data Visualization
    chartType: 'bar',
    colorScheme: 'blue',
    showDataLabels: true,
    animateCharts: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    notificationFrequency: 'daily',
    alertThreshold: 'medium',
    
    // Defaults
    defaultSuburb: 'Vaucluse',
    defaultTimeframe: '12months',
    defaultRiskLevel: 'medium',
    saveSearchHistory: true
  });

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setPreferences(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setSaveSuccess(false);
    setSaveError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setSaveError('Failed to save preferences. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Display Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Display Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                  Theme
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={preferences.theme}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="mapDefaultView" className="block text-sm font-medium text-gray-700 mb-1">
                  Default Map View
                </label>
                <select
                  id="mapDefaultView"
                  name="mapDefaultView"
                  value={preferences.mapDefaultView}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="suburbs">Suburbs</option>
                  <option value="postcodes">Postcodes</option>
                  <option value="regions">Regions</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="defaultZoom" className="block text-sm font-medium text-gray-700 mb-1">
                  Default Map Zoom Level
                </label>
                <input
                  type="range"
                  id="defaultZoom"
                  name="defaultZoom"
                  min="5"
                  max="15"
                  value={preferences.defaultZoom}
                  onChange={handleChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>City</span>
                  <span>Suburb</span>
                  <span>Street</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showConfidenceIndicators"
                  name="showConfidenceIndicators"
                  checked={preferences.showConfidenceIndicators}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="showConfidenceIndicators" className="ml-2 block text-sm text-gray-700">
                  Show Confidence Indicators
                </label>
              </div>
            </div>
          </div>
          
          {/* Data Visualization */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Data Visualization</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="chartType" className="block text-sm font-medium text-gray-700 mb-1">
                  Default Chart Type
                </label>
                <select
                  id="chartType"
                  name="chartType"
                  value={preferences.chartType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                  <option value="pie">Pie Chart</option>
                  <option value="radar">Radar Chart</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="colorScheme" className="block text-sm font-medium text-gray-700 mb-1">
                  Color Scheme
                </label>
                <select
                  id="colorScheme"
                  name="colorScheme"
                  value={preferences.colorScheme}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="orange">Orange</option>
                  <option value="rainbow">Rainbow</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showDataLabels"
                  name="showDataLabels"
                  checked={preferences.showDataLabels}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="showDataLabels" className="ml-2 block text-sm text-gray-700">
                  Show Data Labels
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="animateCharts"
                  name="animateCharts"
                  checked={preferences.animateCharts}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="animateCharts" className="ml-2 block text-sm text-gray-700">
                  Animate Charts
                </label>
              </div>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={preferences.emailNotifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                  Email Notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pushNotifications"
                  name="pushNotifications"
                  checked={preferences.pushNotifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="pushNotifications" className="ml-2 block text-sm text-gray-700">
                  Push Notifications
                </label>
              </div>
              
              <div>
                <label htmlFor="notificationFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                  Notification Frequency
                </label>
                <select
                  id="notificationFrequency"
                  name="notificationFrequency"
                  value={preferences.notificationFrequency}
                  onChange={handleChange}
                  disabled={!preferences.emailNotifications && !preferences.pushNotifications}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                >
                  <option value="realtime">Real-time</option>
                  <option value="daily">Daily Digest</option>
                  <option value="weekly">Weekly Summary</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="alertThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                  Alert Threshold
                </label>
                <select
                  id="alertThreshold"
                  name="alertThreshold"
                  value={preferences.alertThreshold}
                  onChange={handleChange}
                  disabled={!preferences.emailNotifications && !preferences.pushNotifications}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                >
                  <option value="low">Low (All Updates)</option>
                  <option value="medium">Medium (Important Changes)</option>
                  <option value="high">High (Critical Alerts Only)</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Defaults */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Default Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="defaultSuburb" className="block text-sm font-medium text-gray-700 mb-1">
                  Default Suburb
                </label>
                <input
                  type="text"
                  id="defaultSuburb"
                  name="defaultSuburb"
                  value={preferences.defaultSuburb}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="defaultTimeframe" className="block text-sm font-medium text-gray-700 mb-1">
                  Default Analysis Timeframe
                </label>
                <select
                  id="defaultTimeframe"
                  name="defaultTimeframe"
                  value={preferences.defaultTimeframe}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="3months">3 Months</option>
                  <option value="6months">6 Months</option>
                  <option value="12months">12 Months</option>
                  <option value="24months">24 Months</option>
                  <option value="60months">5 Years</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="defaultRiskLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Default Risk Level
                </label>
                <select
                  id="defaultRiskLevel"
                  name="defaultRiskLevel"
                  value={preferences.defaultRiskLevel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveSearchHistory"
                  name="saveSearchHistory"
                  checked={preferences.saveSearchHistory}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="saveSearchHistory" className="ml-2 block text-sm text-gray-700">
                  Save Search History
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Preview Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Preview</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Map className="h-4 w-4 mr-1" />
                Map Display
              </h4>
              <div className={`p-4 rounded-md ${preferences.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <div className="text-xs">
                  <p>View: {preferences.mapDefaultView}</p>
                  <p>Zoom Level: {preferences.defaultZoom}</p>
                  <p>Confidence Indicators: {preferences.showConfidenceIndicators ? 'Shown' : 'Hidden'}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <BarChart className="h-4 w-4 mr-1" />
                Chart Display
              </h4>
              <div className={`p-4 rounded-md ${preferences.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <div className="text-xs">
                  <p>Chart Type: {preferences.chartType}</p>
                  <p>Color Scheme: {preferences.colorScheme}</p>
                  <p>Data Labels: {preferences.showDataLabels ? 'Shown' : 'Hidden'}</p>
                  <p>Animations: {preferences.animateCharts ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end">
          {saveSuccess && (
            <div className="mr-4 flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-1" />
              <span>Preferences saved successfully</span>
            </div>
          )}
          
          {saveError && (
            <div className="mr-4 flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-1" />
              <span>{saveError}</span>
            </div>
          )}
          
          <button
            type="submit"
            disabled={saveLoading}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
          >
            {saveLoading ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Save Preferences
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserPreferences;
