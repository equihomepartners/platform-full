import React, { useState, useEffect } from 'react';
import { useApi } from '../../../services/api/ApiContext';
import { Search, Download, RefreshCw, Filter, Calendar } from 'lucide-react';

const AuditLogs: React.FC = () => {
  const { api } = useApi();
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<{
    user?: string;
    action?: string;
    resource?: string;
    dateRange?: {
      from?: string;
      to?: string;
    };
  }>({});

  useEffect(() => {
    const fetchAuditLogs = async () => {
      setLoading(true);
      try {
        const response = await api.admin.getAuditLogs(filters);
        const data = response.status === 'success' ? response.data : response;
        setAuditLogs(data);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, [api.admin, filters]);

  const filteredLogs = auditLogs.filter(log => {
    if (searchTerm === '') return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      log.user.toLowerCase().includes(searchLower) ||
      log.action.toLowerCase().includes(searchLower) ||
      log.resource.toLowerCase().includes(searchLower) ||
      log.details.toLowerCase().includes(searchLower) ||
      log.ipAddress.toLowerCase().includes(searchLower)
    );
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'All' ? undefined : value
    }));
  };

  const handleDateRangeChange = (key: 'from' | 'to', value: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [key]: value
      }
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const exportLogs = () => {
    // In a real implementation, this would trigger a download of the logs
    alert('Exporting logs...');
  };

  const refreshLogs = () => {
    // Refetch the logs
    const fetchAuditLogs = async () => {
      setLoading(true);
      try {
        const response = await api.admin.getAuditLogs(filters);
        const data = response.status === 'success' ? response.data : response;
        setAuditLogs(data);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  };

  const uniqueUsers = [...new Set(auditLogs.map(log => log.user))];
  const uniqueActions = [...new Set(auditLogs.map(log => log.action))];
  const uniqueResources = [...new Set(auditLogs.map(log => log.resource))];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">Audit Logs</h2>
        <div className="flex space-x-2">
          <button 
            className="flex items-center px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 transition-colors duration-150 text-sm"
            onClick={refreshLogs}
          >
            <RefreshCw size={14} className="mr-1" />
            Refresh
          </button>
          <button 
            className="flex items-center px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 transition-colors duration-150 text-sm"
            onClick={exportLogs}
          >
            <Download size={14} className="mr-1" />
            Export
          </button>
        </div>
      </div>

      <div className="mb-6 bg-white rounded-md shadow-sm border border-neutral-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search audit logs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">User</label>
            <select
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={filters.user || 'All'}
              onChange={(e) => handleFilterChange('user', e.target.value)}
            >
              <option value="All">All Users</option>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Action</label>
            <select
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={filters.action || 'All'}
              onChange={(e) => handleFilterChange('action', e.target.value)}
            >
              <option value="All">All Actions</option>
              {uniqueActions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Resource</label>
            <select
              className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={filters.resource || 'All'}
              onChange={(e) => handleFilterChange('resource', e.target.value)}
            >
              <option value="All">All Resources</option>
              {uniqueResources.map(resource => (
                <option key={resource} value={resource}>{resource}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">From Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="date"
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={filters.dateRange?.from || ''}
                onChange={(e) => handleDateRangeChange('from', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">To Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="date"
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={filters.dateRange?.to || ''}
                onChange={(e) => handleDateRangeChange('to', e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-end">
            <button 
              className="flex items-center px-3 py-2 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 transition-colors duration-150 text-sm"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-neutral-500">Loading audit logs...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{log.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{log.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{log.resource}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{log.ipAddress}</td>
                  <td className="px-6 py-4 text-sm text-neutral-500">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
