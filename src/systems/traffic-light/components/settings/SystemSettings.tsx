import React, { useState } from 'react';
import { Sliders, Save, RefreshCw, AlertCircle, CheckCircle, Server, Shield, Clock, Database } from 'lucide-react';
import { useMLData } from '../../context/MLDataContext';

const SystemSettings: React.FC = () => {
  const { systemStatus } = useMLData();
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  // System settings form state
  const [settings, setSettings] = useState({
    // API Settings
    apiRateLimit: 100,
    apiTimeout: 30,
    enableCaching: true,
    cacheTTL: 3600,
    
    // Security Settings
    enableAuditLogging: true,
    dataEncryption: true,
    accessControl: 'role-based',
    sessionTimeout: 30,
    
    // Performance Settings
    maxConcurrentRequests: 50,
    batchProcessingSize: 1000,
    enableAutoScaling: true,
    lowPriorityJobDelay: 60,
    
    // Backup Settings
    backupFrequency: 'daily',
    backupRetention: 30,
    enableAutoRestore: true,
    backupEncryption: true
  });

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setSettings(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) : value
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
      setSaveError('Failed to save settings. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">System Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-md p-3">
            <div className="flex items-center">
              <Server className="h-5 w-5 text-green-600 mr-2" />
              <h4 className="font-medium text-green-900">API Server</h4>
            </div>
            <div className="mt-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-700">Operational</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Uptime:</span>
                <span className="text-green-700">
                  {systemStatus?.system_health.uptime || 99.5}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-md p-3">
            <div className="flex items-center">
              <Database className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="font-medium text-blue-900">Database</h4>
            </div>
            <div className="mt-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-blue-700">Operational</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Latency:</span>
                <span className="text-blue-700">
                  {systemStatus?.system_health.latency || 180}ms
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-md p-3">
            <div className="flex items-center">
              <Sliders className="h-5 w-5 text-purple-600 mr-2" />
              <h4 className="font-medium text-purple-900">ML Service</h4>
            </div>
            <div className="mt-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-purple-700">Operational</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Accuracy:</span>
                <span className="text-purple-700">
                  {systemStatus ? (systemStatus.ml_model_metrics.accuracy * 100).toFixed(1) : 85.7}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 rounded-md p-3">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-orange-600 mr-2" />
              <h4 className="font-medium text-orange-900">Scheduled Jobs</h4>
            </div>
            <div className="mt-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-orange-700">Operational</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Update:</span>
                <span className="text-orange-700">
                  {systemStatus ? new Date(systemStatus.next_update).toLocaleDateString() : 'Loading...'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* API Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">API Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="apiRateLimit" className="block text-sm font-medium text-gray-700 mb-1">
                  API Rate Limit (requests per minute)
                </label>
                <input
                  type="number"
                  id="apiRateLimit"
                  name="apiRateLimit"
                  min="10"
                  max="1000"
                  value={settings.apiRateLimit}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="apiTimeout" className="block text-sm font-medium text-gray-700 mb-1">
                  API Timeout (seconds)
                </label>
                <input
                  type="number"
                  id="apiTimeout"
                  name="apiTimeout"
                  min="5"
                  max="120"
                  value={settings.apiTimeout}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableCaching"
                  name="enableCaching"
                  checked={settings.enableCaching}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableCaching" className="ml-2 block text-sm text-gray-700">
                  Enable API Response Caching
                </label>
              </div>
              
              <div>
                <label htmlFor="cacheTTL" className="block text-sm font-medium text-gray-700 mb-1">
                  Cache TTL (seconds)
                </label>
                <input
                  type="number"
                  id="cacheTTL"
                  name="cacheTTL"
                  min="60"
                  max="86400"
                  value={settings.cacheTTL}
                  onChange={handleChange}
                  disabled={!settings.enableCaching}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>
          
          {/* Security Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Security Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableAuditLogging"
                  name="enableAuditLogging"
                  checked={settings.enableAuditLogging}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableAuditLogging" className="ml-2 block text-sm text-gray-700">
                  Enable Audit Logging
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="dataEncryption"
                  name="dataEncryption"
                  checked={settings.dataEncryption}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="dataEncryption" className="ml-2 block text-sm text-gray-700">
                  Enable Data Encryption
                </label>
              </div>
              
              <div>
                <label htmlFor="accessControl" className="block text-sm font-medium text-gray-700 mb-1">
                  Access Control Model
                </label>
                <select
                  id="accessControl"
                  name="accessControl"
                  value={settings.accessControl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="role-based">Role-Based Access Control</option>
                  <option value="attribute-based">Attribute-Based Access Control</option>
                  <option value="discretionary">Discretionary Access Control</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  id="sessionTimeout"
                  name="sessionTimeout"
                  min="5"
                  max="240"
                  value={settings.sessionTimeout}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Performance Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Performance Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="maxConcurrentRequests" className="block text-sm font-medium text-gray-700 mb-1">
                  Max Concurrent Requests
                </label>
                <input
                  type="number"
                  id="maxConcurrentRequests"
                  name="maxConcurrentRequests"
                  min="10"
                  max="500"
                  value={settings.maxConcurrentRequests}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="batchProcessingSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Batch Processing Size
                </label>
                <input
                  type="number"
                  id="batchProcessingSize"
                  name="batchProcessingSize"
                  min="100"
                  max="10000"
                  value={settings.batchProcessingSize}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableAutoScaling"
                  name="enableAutoScaling"
                  checked={settings.enableAutoScaling}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableAutoScaling" className="ml-2 block text-sm text-gray-700">
                  Enable Auto-Scaling
                </label>
              </div>
              
              <div>
                <label htmlFor="lowPriorityJobDelay" className="block text-sm font-medium text-gray-700 mb-1">
                  Low Priority Job Delay (seconds)
                </label>
                <input
                  type="number"
                  id="lowPriorityJobDelay"
                  name="lowPriorityJobDelay"
                  min="0"
                  max="3600"
                  value={settings.lowPriorityJobDelay}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Backup Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Backup & Recovery</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="backupFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                  Backup Frequency
                </label>
                <select
                  id="backupFrequency"
                  name="backupFrequency"
                  value={settings.backupFrequency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="backupRetention" className="block text-sm font-medium text-gray-700 mb-1">
                  Backup Retention (days)
                </label>
                <input
                  type="number"
                  id="backupRetention"
                  name="backupRetention"
                  min="1"
                  max="365"
                  value={settings.backupRetention}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableAutoRestore"
                  name="enableAutoRestore"
                  checked={settings.enableAutoRestore}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableAutoRestore" className="ml-2 block text-sm text-gray-700">
                  Enable Auto-Restore on Failure
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="backupEncryption"
                  name="backupEncryption"
                  checked={settings.backupEncryption}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="backupEncryption" className="ml-2 block text-sm text-gray-700">
                  Enable Backup Encryption
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end">
          {saveSuccess && (
            <div className="mr-4 flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-1" />
              <span>Settings saved successfully</span>
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
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SystemSettings;
