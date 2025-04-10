import React, { useState } from 'react';
import { Database, Plus, RefreshCw, AlertTriangle, CheckCircle, Clock, Settings, Trash2, Save, Brain } from 'lucide-react';
import { useMLData } from '../../context/MLDataContext';

interface DataSource {
  id: string;
  name: string;
  type: 'api' | 'database' | 'feed' | 'file';
  status: 'connected' | 'disconnected' | 'error';
  lastUpdate: Date;
  frequency: string;
  endpoint?: string;
  apiKey?: string;
  description: string;
}

const DataSourceSettings: React.FC = () => {
  const { systemStatus } = useMLData();
  const [showAddSource, setShowAddSource] = useState(false);
  const [editingSource, setEditingSource] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initial data sources based on free government data
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: '1',
      name: 'RBA Housing Market Data',
      type: 'api',
      status: 'connected',
      lastUpdate: new Date(),
      frequency: 'Monthly',
      endpoint: 'https://api.rba.gov.au/housing-data',
      description: 'Interest rates, housing credit, and market indicators'
    },
    {
      id: '2',
      name: 'ABS Census Demographics',
      type: 'database',
      status: 'connected',
      lastUpdate: new Date(),
      frequency: 'Quarterly',
      endpoint: 'https://api.abs.gov.au/census',
      description: 'Population and demographic information'
    },
    {
      id: '3',
      name: 'ABS Property Price Index',
      type: 'feed',
      status: 'connected',
      lastUpdate: new Date(),
      frequency: 'Quarterly',
      endpoint: 'https://api.abs.gov.au/property-price-index',
      description: 'Quarterly property price changes across regions'
    },
    {
      id: '4',
      name: 'NSW Government Infrastructure Plans',
      type: 'api',
      status: 'connected',
      lastUpdate: new Date(),
      frequency: 'Monthly',
      endpoint: 'https://api.nsw.gov.au/infrastructure',
      description: 'Current and planned infrastructure projects'
    },
    {
      id: '5',
      name: 'NSW Land Registry Services',
      type: 'api',
      status: 'connected',
      lastUpdate: new Date(),
      frequency: 'Weekly',
      endpoint: 'https://api.nswlrs.com.au/property-data',
      description: 'Property ownership and sales data'
    }
  ]);

  // New data source form
  const [newSource, setNewSource] = useState<Omit<DataSource, 'id' | 'lastUpdate' | 'status'>>({
    name: '',
    type: 'api',
    frequency: 'Daily',
    endpoint: '',
    apiKey: '',
    description: ''
  });

  // Handle form changes
  const handleNewSourceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSource(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new data source
  const handleAddSource = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add new source
      const newId = (dataSources.length + 1).toString();
      setDataSources(prev => [
        ...prev,
        {
          id: newId,
          lastUpdate: new Date(),
          status: 'connected',
          ...newSource
        }
      ]);

      // Reset form and close modal
      setNewSource({
        name: '',
        type: 'api',
        frequency: 'Daily',
        endpoint: '',
        apiKey: '',
        description: ''
      });
      setShowAddSource(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding data source:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  // Delete data source
  const handleDeleteSource = (id: string) => {
    setDataSources(prev => prev.filter(source => source.id !== id));
  };

  // Toggle data source status
  const handleToggleStatus = (id: string) => {
    setDataSources(prev => prev.map(source => {
      if (source.id === id) {
        return {
          ...source,
          status: source.status === 'connected' ? 'disconnected' : 'connected'
        };
      }
      return source;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Data Sources</h3>
        <button
          onClick={() => setShowAddSource(true)}
          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Data Source
        </button>
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dataSources.map(source => (
          <div key={source.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <Database className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <h4 className="font-medium text-gray-900">{source.name}</h4>
                  <p className="text-xs text-gray-500">{source.type.toUpperCase()}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleStatus(source.id)}
                  className={`p-1 rounded-md ${
                    source.status === 'connected' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}
                  title={source.status === 'connected' ? 'Disconnect' : 'Connect'}
                >
                  {source.status === 'connected' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => setEditingSource(source.id === editingSource ? null : source.id)}
                  className="p-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                  title="Edit"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteSource(source.id)}
                  className="p-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">{source.description}</p>

            {editingSource === source.id ? (
              <div className="mt-3 space-y-3 border-t border-gray-200 pt-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Endpoint URL</label>
                  <input
                    type="text"
                    value={source.endpoint || ''}
                    onChange={(e) => {
                      setDataSources(prev => prev.map(s => {
                        if (s.id === source.id) {
                          return { ...s, endpoint: e.target.value };
                        }
                        return s;
                      }));
                    }}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Update Frequency</label>
                  <select
                    value={source.frequency}
                    onChange={(e) => {
                      setDataSources(prev => prev.map(s => {
                        if (s.id === source.id) {
                          return { ...s, frequency: e.target.value };
                        }
                        return s;
                      }));
                    }}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  >
                    <option value="Hourly">Hourly</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setEditingSource(null)}
                    className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700"
                  >
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Status:</span>
                  <span className={`ml-1 ${
                    source.status === 'connected' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Frequency:</span>
                  <span className="ml-1">{source.frequency}</span>
                </div>
                <div>
                  <span className="text-gray-500">Last Update:</span>
                  <span className="ml-1">{source.lastUpdate.toLocaleTimeString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Type:</span>
                  <span className="ml-1">{source.type.toUpperCase()}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Data Source Modal */}
      {showAddSource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Data Source</h3>

            <form onSubmit={handleAddSource} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={newSource.name}
                  onChange={handleNewSourceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={newSource.type}
                  onChange={handleNewSourceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="api">API</option>
                  <option value="database">Database</option>
                  <option value="feed">Data Feed</option>
                  <option value="file">File Import</option>
                </select>
              </div>

              <div>
                <label htmlFor="endpoint" className="block text-sm font-medium text-gray-700 mb-1">
                  Endpoint URL
                </label>
                <input
                  type="text"
                  id="endpoint"
                  name="endpoint"
                  value={newSource.endpoint}
                  onChange={handleNewSourceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                  API Key (if required)
                </label>
                <input
                  type="password"
                  id="apiKey"
                  name="apiKey"
                  value={newSource.apiKey}
                  onChange={handleNewSourceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                  Update Frequency
                </label>
                <select
                  id="frequency"
                  name="frequency"
                  value={newSource.frequency}
                  onChange={handleNewSourceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Hourly">Hourly</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={newSource.description}
                  onChange={handleNewSourceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddSource(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {saveLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-1 inline animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Data Source'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Data Flow Diagram */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Data Flow Architecture</h3>

        <div className="relative">
          {/* Data Flow Steps */}
          <div className="grid grid-cols-4 gap-6">
            {/* Data Sources */}
            <div className="text-center">
              <div className="bg-blue-50 p-4 rounded-lg mb-3">
                <Database className="h-8 w-8 text-blue-600 mx-auto" />
                <h4 className="font-medium text-blue-900 mt-2">Data Sources</h4>
              </div>
              <div className="text-sm text-gray-600">
                Government data APIs
              </div>
            </div>

            {/* Data Processing */}
            <div className="text-center">
              <div className="bg-purple-50 p-4 rounded-lg mb-3">
                <RefreshCw className="h-8 w-8 text-purple-600 mx-auto" />
                <h4 className="font-medium text-purple-900 mt-2">ETL Processing</h4>
              </div>
              <div className="text-sm text-gray-600">
                Data transformation
              </div>
            </div>

            {/* Data Storage */}
            <div className="text-center">
              <div className="bg-green-50 p-4 rounded-lg mb-3">
                <Database className="h-8 w-8 text-green-600 mx-auto" />
                <h4 className="font-medium text-green-900 mt-2">Data Lake</h4>
              </div>
              <div className="text-sm text-gray-600">
                Structured storage
              </div>
            </div>

            {/* ML Processing */}
            <div className="text-center">
              <div className="bg-orange-50 p-4 rounded-lg mb-3">
                <Brain className="h-8 w-8 text-orange-600 mx-auto" />
                <h4 className="font-medium text-orange-900 mt-2">ML Processing</h4>
              </div>
              <div className="text-sm text-gray-600">
                Model training & inference
              </div>
            </div>
          </div>

          {/* Connecting Arrows */}
          <div className="absolute top-1/2 left-0 w-full -mt-2 z-0">
            <div className="flex justify-between items-center">
              <div className="w-1/4 flex justify-center">
                <div className="w-1/2 h-0.5 bg-gray-300"></div>
              </div>
              <div className="w-1/4 flex justify-center">
                <div className="w-1/2 h-0.5 bg-gray-300"></div>
              </div>
              <div className="w-1/4 flex justify-center">
                <div className="w-1/2 h-0.5 bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Source Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Active Data Sources</h4>
            <ul className="text-sm space-y-1">
              {dataSources
                .filter(source => source.status === 'connected')
                .map(source => (
                  <li key={source.id} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>{source.name}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Update Schedule</h4>
            <ul className="text-sm space-y-1">
              {['Hourly', 'Daily', 'Weekly', 'Monthly', 'Quarterly'].map(frequency => {
                const count = dataSources.filter(s => s.status === 'connected' && s.frequency === frequency).length;
                if (count === 0) return null;
                return (
                  <li key={frequency} className="flex items-center">
                    <Clock className="h-4 w-4 text-blue-600 mr-2" />
                    <span>{frequency}: {count} source{count !== 1 ? 's' : ''}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSourceSettings;
