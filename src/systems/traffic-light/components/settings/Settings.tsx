import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { Settings as SettingsIcon, Database, Brain, Sliders, UserCog, RefreshCw, AlertCircle } from 'lucide-react';
import { useMLData } from '../../context/MLDataContext';
import MLModelSettings from './MLModelSettings';
import DataSourceSettings from './DataSourceSettings';
import SystemSettings from './SystemSettings';
import UserPreferences from './UserPreferences';

const Settings: React.FC = () => {
  const { modelInfo, systemStatus, loading, error, refreshData } = useMLData();
  const [activeTab, setActiveTab] = useState('ml-model');
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  // Update last refreshed timestamp when data is refreshed
  useEffect(() => {
    if (!loading) {
      setLastRefreshed(new Date());
    }
  }, [loading, modelInfo, systemStatus]);

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="mt-2 text-lg text-gray-600">
              Configure ML model, data sources, and system preferences
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={refreshData}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            >
              <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
            {lastRefreshed && (
              <span className="text-sm text-gray-500">
                Last updated: {lastRefreshed.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {/* Settings Tabs */}
      <Tabs defaultValue="ml-model" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="ml-model" className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            <span>ML Model</span>
          </TabsTrigger>
          <TabsTrigger value="data-sources" className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            <span>Data Sources</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center">
            <Sliders className="h-5 w-5 mr-2" />
            <span>System</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center">
            <UserCog className="h-5 w-5 mr-2" />
            <span>Preferences</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ml-model" className="mt-0">
          <MLModelSettings />
        </TabsContent>

        <TabsContent value="data-sources" className="mt-0">
          <DataSourceSettings />
        </TabsContent>

        <TabsContent value="system" className="mt-0">
          <SystemSettings />
        </TabsContent>

        <TabsContent value="preferences" className="mt-0">
          <UserPreferences />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
