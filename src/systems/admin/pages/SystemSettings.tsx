import React, { useState, useEffect } from 'react';
import { useApi } from '../../../services/api/ApiContext';
import { Save, RefreshCw } from 'lucide-react';

const SystemSettings: React.FC = () => {
  const { api } = useApi();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('general');

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const response = await api.admin.getSystemSettings();
        const data = response.status === 'success' ? response.data : response;
        setSettings(data);
      } catch (error) {
        console.error('Error fetching system settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [api.admin]);

  const handleChange = (section: string, field: string, value: any) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.admin.updateSystemSettings(settings);
      // Show success message
      alert('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      // Show error message
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">System Settings</h2>
        <button 
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-150"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? <RefreshCw size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
          Save Changes
        </button>
      </div>

      <div className="mb-6 border-b border-neutral-200">
        <nav className="flex -mb-px">
          <button
            className={`py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'general'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            className={`ml-8 py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'api'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
            onClick={() => setActiveTab('api')}
          >
            API
          </button>
          <button
            className={`ml-8 py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'notifications'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button
            className={`ml-8 py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'security'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </nav>
      </div>

      {activeTab === 'general' && settings?.general && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">System Name</label>
            <input
              type="text"
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={settings.general.systemName}
              onChange={(e) => handleChange('general', 'systemName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Environment</label>
            <select
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={settings.general.environment}
              onChange={(e) => handleChange('general', 'environment', e.target.value)}
            >
              <option value="Development">Development</option>
              <option value="Staging">Staging</option>
              <option value="Production">Production</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Version</label>
            <input
              type="text"
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={settings.general.version}
              onChange={(e) => handleChange('general', 'version', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Timezone</label>
            <select
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={settings.general.timezone}
              onChange={(e) => handleChange('general', 'timezone', e.target.value)}
            >
              <option value="Australia/Sydney">Australia/Sydney</option>
              <option value="Australia/Melbourne">Australia/Melbourne</option>
              <option value="Australia/Brisbane">Australia/Brisbane</option>
              <option value="Australia/Perth">Australia/Perth</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Date Format</label>
            <select
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={settings.general.dateFormat}
              onChange={(e) => handleChange('general', 'dateFormat', e.target.value)}
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Time Format</label>
            <select
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={settings.general.timeFormat}
              onChange={(e) => handleChange('general', 'timeFormat', e.target.value)}
            >
              <option value="12h">12-hour (AM/PM)</option>
              <option value="24h">24-hour</option>
            </select>
          </div>
        </div>
      )}

      {activeTab === 'api' && settings?.api && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">API Base URL</label>
            <input
              type="text"
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={settings.api.baseUrl}
              onChange={(e) => handleChange('api', 'baseUrl', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Request Timeout (ms)</label>
            <input
              type="number"
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={settings.api.timeout}
              onChange={(e) => handleChange('api', 'timeout', parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Retry Attempts</label>
            <input
              type="number"
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={settings.api.retryAttempts}
              onChange={(e) => handleChange('api', 'retryAttempts', parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Retry Delay (ms)</label>
            <input
              type="number"
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={settings.api.retryDelay}
              onChange={(e) => handleChange('api', 'retryDelay', parseInt(e.target.value))}
            />
          </div>
          <div className="flex items-center">
            <input
              id="useMockData"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              checked={settings.api.useMockData}
              onChange={(e) => handleChange('api', 'useMockData', e.target.checked)}
            />
            <label htmlFor="useMockData" className="ml-2 block text-sm text-neutral-700">
              Use Mock Data (for development only)
            </label>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && settings?.notifications && (
        <div className="space-y-6">
          <div className="flex items-center">
            <input
              id="emailNotifications"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              checked={settings.notifications.email}
              onChange={(e) => handleChange('notifications', 'email', e.target.checked)}
            />
            <label htmlFor="emailNotifications" className="ml-2 block text-sm text-neutral-700">
              Email Notifications
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="inAppNotifications"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              checked={settings.notifications.inApp}
              onChange={(e) => handleChange('notifications', 'inApp', e.target.checked)}
            />
            <label htmlFor="inAppNotifications" className="ml-2 block text-sm text-neutral-700">
              In-App Notifications
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="smsNotifications"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              checked={settings.notifications.sms}
              onChange={(e) => handleChange('notifications', 'sms', e.target.checked)}
            />
            <label htmlFor="smsNotifications" className="ml-2 block text-sm text-neutral-700">
              SMS Notifications
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email Frequency</label>
            <select
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={settings.notifications.emailFrequency}
              onChange={(e) => handleChange('notifications', 'emailFrequency', e.target.value)}
            >
              <option value="immediate">Immediate</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Digest</option>
            </select>
          </div>
        </div>
      )}

      {activeTab === 'security' && settings?.security && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Session Timeout (minutes)</label>
            <input
              type="number"
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleChange('security', 'sessionTimeout', parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Password Expiry (days)</label>
            <input
              type="number"
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={settings.security.passwordExpiry}
              onChange={(e) => handleChange('security', 'passwordExpiry', parseInt(e.target.value))}
            />
          </div>
          <div className="flex items-center">
            <input
              id="mfaRequired"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              checked={settings.security.mfaRequired}
              onChange={(e) => handleChange('security', 'mfaRequired', e.target.checked)}
            />
            <label htmlFor="mfaRequired" className="ml-2 block text-sm text-neutral-700">
              Require Multi-Factor Authentication
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="ipRestrictions"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              checked={settings.security.ipRestrictions}
              onChange={(e) => handleChange('security', 'ipRestrictions', e.target.checked)}
            />
            <label htmlFor="ipRestrictions" className="ml-2 block text-sm text-neutral-700">
              Enable IP Restrictions
            </label>
          </div>
          {settings.security.ipRestrictions && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Allowed IP Addresses</label>
              <textarea
                className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                rows={4}
                placeholder="Enter one IP address per line"
                value={settings.security.allowedIps.join('\n')}
                onChange={(e) => handleChange('security', 'allowedIps', e.target.value.split('\n').filter(ip => ip.trim() !== ''))}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SystemSettings;
