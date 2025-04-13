import React, { useState, useEffect } from 'react';
import { useApi } from '../../../services/api/ApiContext';
import { Key, Plus, Copy, Trash2, Eye, EyeOff, RefreshCw } from 'lucide-react';

const ApiAccess: React.FC = () => {
  const { api } = useApi();
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [newKeyName, setNewKeyName] = useState<string>('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [creatingKey, setCreatingKey] = useState<boolean>(false);
  const [showKeys, setShowKeys] = useState<{[key: string]: boolean}>({});

  const availablePermissions = [
    { id: 'read:portfolio', name: 'Read Portfolio Data' },
    { id: 'write:portfolio', name: 'Write Portfolio Data' },
    { id: 'read:underwriting', name: 'Read Underwriting Data' },
    { id: 'write:underwriting', name: 'Write Underwriting Data' },
    { id: 'read:traffic-light', name: 'Read Traffic Light Data' },
    { id: 'write:traffic-light', name: 'Write Traffic Light Data' },
    { id: 'read:admin', name: 'Read Admin Data' },
    { id: 'write:admin', name: 'Write Admin Data' }
  ];

  useEffect(() => {
    const fetchApiKeys = async () => {
      setLoading(true);
      try {
        const response = await api.admin.getApiKeys();
        const data = response.status === 'success' ? response.data : response;
        setApiKeys(data);
        
        // Initialize showKeys state
        const initialShowKeys: {[key: string]: boolean} = {};
        data.forEach((key: any) => {
          initialShowKeys[key.id] = false;
        });
        setShowKeys(initialShowKeys);
      } catch (error) {
        console.error('Error fetching API keys:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApiKeys();
  }, [api.admin]);

  const handlePermissionChange = (permissionId: string) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permissionId)) {
        return prev.filter(id => id !== permissionId);
      } else {
        return [...prev, permissionId];
      }
    });
  };

  const createApiKey = async () => {
    if (!newKeyName || selectedPermissions.length === 0) {
      alert('Please provide a name and select at least one permission');
      return;
    }

    setCreatingKey(true);
    try {
      const newKey = await api.admin.createApiKey(newKeyName, selectedPermissions);
      setApiKeys(prev => [newKey, ...prev]);
      setShowCreateForm(false);
      setNewKeyName('');
      setSelectedPermissions([]);
      
      // Show the new key
      setShowKeys(prev => ({
        ...prev,
        [newKey.id]: true
      }));
      
      // Alert the user to copy the key
      alert('API key created successfully. Please copy the key now as it will not be shown again.');
    } catch (error) {
      console.error('Error creating API key:', error);
      alert('Failed to create API key');
    } finally {
      setCreatingKey(false);
    }
  };

  const revokeApiKey = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      return;
    }

    try {
      await api.admin.revokeApiKey(id);
      setApiKeys(prev => prev.filter(key => key.id !== id));
    } catch (error) {
      console.error('Error revoking API key:', error);
      alert('Failed to revoke API key');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  const toggleShowKey = (id: string) => {
    setShowKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">API Access</h2>
        <button 
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-150"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? (
            <>Cancel</>
          ) : (
            <>
              <Plus size={16} className="mr-2" />
              Create API Key
            </>
          )}
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-6 bg-white rounded-md shadow-sm border border-neutral-200 p-4">
          <h3 className="text-md font-medium text-neutral-900 mb-4">Create New API Key</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Key Name</label>
              <input
                type="text"
                className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="e.g., Production API Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Permissions</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {availablePermissions.map(permission => (
                  <div key={permission.id} className="flex items-center">
                    <input
                      id={permission.id}
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={() => handlePermissionChange(permission.id)}
                    />
                    <label htmlFor={permission.id} className="ml-2 block text-sm text-neutral-700">
                      {permission.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-150"
                onClick={createApiKey}
                disabled={creatingKey}
              >
                {creatingKey ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Key size={16} className="mr-2" />
                    Create API Key
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-neutral-500">Loading API keys...</p>
        </div>
      ) : apiKeys.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-md shadow-sm border border-neutral-200">
          <p className="text-neutral-500">No API keys found. Create your first API key to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {apiKeys.map(apiKey => (
            <div key={apiKey.id} className="bg-white rounded-md shadow-sm border border-neutral-200 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-md font-medium text-neutral-900">{apiKey.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-neutral-500">Created: {new Date(apiKey.created).toLocaleString()}</span>
                    {apiKey.lastUsed && (
                      <>
                        <span className="mx-2 text-neutral-300">•</span>
                        <span className="text-xs text-neutral-500">Last used: {new Date(apiKey.lastUsed).toLocaleString()}</span>
                      </>
                    )}
                  </div>
                </div>
                <button 
                  className="text-accent-600 hover:text-accent-900"
                  onClick={() => revokeApiKey(apiKey.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-neutral-700">API Key</label>
                  <div className="flex space-x-2">
                    <button 
                      className="text-neutral-500 hover:text-neutral-700"
                      onClick={() => toggleShowKey(apiKey.id)}
                    >
                      {showKeys[apiKey.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button 
                      className="text-neutral-500 hover:text-neutral-700"
                      onClick={() => copyToClipboard(apiKey.key)}
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                <div className="mt-1 flex items-center">
                  <input
                    type={showKeys[apiKey.id] ? "text" : "password"}
                    className="block w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    value={apiKey.key}
                    readOnly
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-neutral-700 mb-1">Permissions</label>
                <div className="flex flex-wrap gap-2">
                  {apiKey.permissions.map((permission: string) => (
                    <span 
                      key={permission} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiAccess;
