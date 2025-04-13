import React, { useState, useEffect } from 'react';
import { useApi } from '../../../services/api/ApiContext';
import {
  Shield,
  Download,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Lock,
  User,
  Database,
  Globe,
  Server,
  Key,
  Eye,
  Bell,
  FileCheck,
  Building
} from 'lucide-react';

const SecurityCompliance: React.FC = () => {
  const { api } = useApi();
  const [complianceReports, setComplianceReports] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('reports');
  const [securitySettings, setSecuritySettings] = useState<any>(null);
  const [loginHistory, setLoginHistory] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [selectedRegulation, setSelectedRegulation] = useState<string>('all');

  useEffect(() => {
    const fetchSecurityData = async () => {
      setLoading(true);
      try {
        // Fetch all security data in parallel
        const [reportsResponse, settingsResponse, loginHistoryResponse] = await Promise.all([
          api.security.getComplianceReports(),
          api.security.getSecuritySettings(),
          api.security.getLoginHistory()
        ]);

        // Handle the responses
        const reportsData = reportsResponse.status === 'success' ? reportsResponse.data : reportsResponse;
        const settingsData = settingsResponse.status === 'success' ? settingsResponse.data : settingsResponse;
        const loginHistoryData = loginHistoryResponse.status === 'success' ? loginHistoryResponse.data : loginHistoryResponse;

        setComplianceReports(reportsData);
        setSecuritySettings(settingsData);
        setLoginHistory(loginHistoryData);

        // Generate mock audit logs based on login history
        const mockAuditLogs = loginHistoryData.map((login: any) => ({
          id: `audit_${login.id}`,
          timestamp: login.timestamp,
          user: 'John Smith',
          action: login.status === 'Success' ? 'Login' : 'Failed Login Attempt',
          resource: 'Authentication System',
          ipAddress: login.ipAddress,
          details: `${login.status} login from ${login.location} using ${login.device}`
        }));

        // Add some additional audit logs for system activities
        mockAuditLogs.push(
          {
            id: 'audit_sys_1',
            timestamp: '2023-06-09T10:15:00',
            user: 'Sarah Johnson',
            action: 'Update',
            resource: 'Security Settings',
            ipAddress: '192.168.1.2',
            details: 'Updated password policy settings'
          },
          {
            id: 'audit_sys_2',
            timestamp: '2023-06-08T14:30:00',
            user: 'System',
            action: 'Scan',
            resource: 'Vulnerability Scanner',
            ipAddress: 'Internal',
            details: 'Completed weekly security scan'
          },
          {
            id: 'audit_sys_3',
            timestamp: '2023-06-07T09:45:00',
            user: 'Michael Brown',
            action: 'Export',
            resource: 'Customer Data',
            ipAddress: '192.168.1.4',
            details: 'Exported customer data report for compliance review'
          }
        );

        setAuditLogs(mockAuditLogs);
      } catch (error) {
        console.error('Error fetching security data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSecurityData();
  }, [api.security]);

  const downloadReport = (url: string) => {
    window.open(url, '_blank');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant':
        return <CheckCircle size={16} className="text-success" />;
      case 'Due Soon':
        return <Clock size={16} className="text-warning" />;
      default:
        return <AlertTriangle size={16} className="text-accent-500" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">Security & Compliance</h2>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-150">
          <Shield size={16} className="mr-2" />
          Run Security Scan
        </button>
      </div>

      <div className="mb-6 border-b border-neutral-200">
        <nav className="flex -mb-px">
          <button
            className={`py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'reports'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
            onClick={() => setActiveTab('reports')}
          >
            <FileCheck size={16} className="inline mr-1" />
            Compliance Reports
          </button>
          <button
            className={`ml-8 py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'security'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
            onClick={() => setActiveTab('security')}
          >
            <Lock size={16} className="inline mr-1" />
            Security Settings
          </button>
          <button
            className={`ml-8 py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'audit'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
            onClick={() => setActiveTab('audit')}
          >
            <Eye size={16} className="inline mr-1" />
            Audit History
          </button>
          <button
            className={`ml-8 py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'regulatory'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
            onClick={() => setActiveTab('regulatory')}
          >
            <Building size={16} className="inline mr-1" />
            Regulatory Compliance
          </button>
          <button
            className={`ml-8 py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'data'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
            onClick={() => setActiveTab('data')}
          >
            <Database size={16} className="inline mr-1" />
            Data Privacy
          </button>
        </nav>
      </div>

      {activeTab === 'reports' && (
        <>
          <div className="mb-6 bg-white rounded-md shadow-sm border border-neutral-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-medium text-neutral-900">Compliance Reports</h3>
              <div className="flex space-x-2">
                <select
                  className="block w-48 px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  value={selectedRegulation}
                  onChange={(e) => setSelectedRegulation(e.target.value)}
                >
                  <option value="all">All Regulations</option>
                  <option value="AUSTRAC">AUSTRAC (AML/CTF)</option>
                  <option value="ASIC">ASIC (ACL/AFSL)</option>
                  <option value="APRA">APRA (CPS 234/BEAR)</option>
                  <option value="OAIC">OAIC (Privacy)</option>
                  <option value="ACCC">ACCC (CDR)</option>
                </select>
                <button className="flex items-center px-3 py-2 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 transition-colors duration-150 text-sm">
                  <RefreshCw size={14} className="mr-1" />
                  Refresh
                </button>
              </div>
            </div>
            <p className="text-sm text-neutral-500 mb-4">
              These reports are required for compliance with Australian financial regulations. Regular submission is mandatory to maintain regulatory licenses and approvals.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-neutral-500">Loading compliance reports...</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-md shadow-sm border border-neutral-200">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Report</th>
                    <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Authority</th>
                    <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Frequency</th>
                    <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Last Submitted</th>
                    <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Next Due</th>
                    <th className="px-6 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 bg-neutral-50 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {complianceReports
                    .filter(report => selectedRegulation === 'all' || report.authority === selectedRegulation)
                    .map((report) => (
                    <tr key={report.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                        <div>{report.title}</div>
                        <div className="text-xs text-neutral-500 mt-1">{report.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{report.authority}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{report.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{report.frequency}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{report.lastSubmitted}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{report.nextDue}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(report.status)}
                          <span className={`ml-2 text-sm ${
                            report.status === 'Compliant' ? 'text-success' :
                            report.status === 'Due Soon' ? 'text-warning' : 'text-accent-500'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-primary-600 hover:text-primary-900"
                          onClick={() => downloadReport(report.url)}
                        >
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {activeTab === 'security' && securitySettings && (
        <div className="space-y-6">
          <div className="mb-6 bg-white rounded-md shadow-sm border border-neutral-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-medium text-neutral-900">Security Settings</h3>
              <div className="flex space-x-2">
                <button className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-150 text-sm">
                  <RefreshCw size={14} className="mr-1" />
                  Save Changes
                </button>
              </div>
            </div>
            <p className="text-sm text-neutral-500 mb-4">
              These security settings are configured to comply with Australian financial regulations including APRA CPS 234 (Information Security) and the Privacy Act 1988.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-md border border-neutral-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Lock size={20} className="text-primary-500 mr-2" />
                <h3 className="text-md font-medium text-neutral-900">Authentication</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="mfaEnabled"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={securitySettings.authentication.mfaEnabled}
                  />
                  <label htmlFor="mfaEnabled" className="ml-2 block text-sm text-neutral-700">
                    Multi-Factor Authentication (MFA)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="biometricEnabled"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={securitySettings.authentication.biometricEnabled}
                  />
                  <label htmlFor="biometricEnabled" className="ml-2 block text-sm text-neutral-700">
                    Biometric Authentication
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">MFA Method</label>
                  <select
                    className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    defaultValue={securitySettings.authentication.mfaMethod}
                  >
                    <option value="app">Authenticator App</option>
                    <option value="sms">SMS</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    defaultValue={securitySettings.authentication.sessionTimeout}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border border-neutral-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Key size={20} className="text-primary-500 mr-2" />
                <h3 className="text-md font-medium text-neutral-900">Password Policy</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Minimum Length</label>
                  <input
                    type="number"
                    className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    defaultValue={securitySettings.passwords.minLength}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      id="requireUppercase"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={securitySettings.passwords.requireUppercase}
                    />
                    <label htmlFor="requireUppercase" className="ml-2 block text-sm text-neutral-700">
                      Uppercase Letters
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="requireLowercase"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={securitySettings.passwords.requireLowercase}
                    />
                    <label htmlFor="requireLowercase" className="ml-2 block text-sm text-neutral-700">
                      Lowercase Letters
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="requireNumbers"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={securitySettings.passwords.requireNumbers}
                    />
                    <label htmlFor="requireNumbers" className="ml-2 block text-sm text-neutral-700">
                      Numbers
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="requireSpecialChars"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={securitySettings.passwords.requireSpecialChars}
                    />
                    <label htmlFor="requireSpecialChars" className="ml-2 block text-sm text-neutral-700">
                      Special Characters
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Password Expiry (days)</label>
                  <input
                    type="number"
                    className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    defaultValue={securitySettings.passwords.expiryDays}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border border-neutral-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Globe size={20} className="text-primary-500 mr-2" />
                <h3 className="text-md font-medium text-neutral-900">Access Controls</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="ipRestrictions"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={securitySettings.access.ipRestrictions}
                  />
                  <label htmlFor="ipRestrictions" className="ml-2 block text-sm text-neutral-700">
                    IP Restrictions
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="geoRestrictions"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={securitySettings.access.geoRestrictions}
                  />
                  <label htmlFor="geoRestrictions" className="ml-2 block text-sm text-neutral-700">
                    Geo-Restrictions (Australia/NZ Only)
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Max Failed Login Attempts</label>
                  <input
                    type="number"
                    className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    defaultValue={securitySettings.access.loginAttempts}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Account Lockout Duration (minutes)</label>
                  <input
                    type="number"
                    className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    defaultValue={securitySettings.access.lockoutDuration}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border border-neutral-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Database size={20} className="text-primary-500 mr-2" />
                <h3 className="text-md font-medium text-neutral-900">Encryption</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="dataAtRest"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={securitySettings.encryption.dataAtRest}
                  />
                  <label htmlFor="dataAtRest" className="ml-2 block text-sm text-neutral-700">
                    Data Encryption at Rest
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="dataInTransit"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={securitySettings.encryption.dataInTransit}
                  />
                  <label htmlFor="dataInTransit" className="ml-2 block text-sm text-neutral-700">
                    Data Encryption in Transit
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="endToEndEncryption"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={securitySettings.encryption.endToEndEncryption}
                  />
                  <label htmlFor="endToEndEncryption" className="ml-2 block text-sm text-neutral-700">
                    End-to-End Encryption
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Key Rotation Period (days)</label>
                  <input
                    type="number"
                    className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    defaultValue={securitySettings.encryption.keyRotationDays}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="mb-6 bg-white rounded-md shadow-sm border border-neutral-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-medium text-neutral-900">Audit Logs</h3>
              <div className="flex space-x-2">
                <div className="relative w-64">
                  <input
                    type="text"
                    className="block w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search audit logs"
                  />
                </div>
                <button className="flex items-center px-3 py-2 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 transition-colors duration-150 text-sm">
                  <RefreshCw size={14} className="mr-1" />
                  Refresh
                </button>
                <button className="flex items-center px-3 py-2 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 transition-colors duration-150 text-sm">
                  <Download size={14} className="mr-1" />
                  Export
                </button>
              </div>
            </div>
            <p className="text-sm text-neutral-500 mb-4">
              Audit logs are maintained for compliance with Australian regulatory requirements. All system activities are logged and retained for {securitySettings?.compliance.auditLogRetention} years.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-md shadow-sm border border-neutral-200">
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
                {auditLogs.map((log) => (
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
        </div>
      )}

      {activeTab === 'regulatory' && securitySettings && (
        <div className="space-y-6">
          <div className="mb-6 bg-white rounded-md shadow-sm border border-neutral-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-medium text-neutral-900">Australian Regulatory Compliance</h3>
              <div className="flex space-x-2">
                <button className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-150 text-sm">
                  <FileCheck size={14} className="mr-1" />
                  Run Compliance Check
                </button>
              </div>
            </div>
            <p className="text-sm text-neutral-500 mb-4">
              Equihome maintains compliance with all relevant Australian financial regulations. This dashboard shows the current compliance status for each regulatory framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-md border border-neutral-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Building size={20} className="text-primary-500 mr-2" />
                <h3 className="text-md font-medium text-neutral-900">ASIC Compliance</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="aclCompliance"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={securitySettings.australianRegulatory.aclCompliance}
                      readOnly
                    />
                    <label htmlFor="aclCompliance" className="ml-2 block text-sm text-neutral-700">
                      Australian Credit License (ACL)
                    </label>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                    Compliant
                  </span>
                </div>
                <p className="text-xs text-neutral-500 ml-6">License Number: 123456</p>
                <p className="text-xs text-neutral-500 ml-6">Last Audit: 2023-03-15</p>
                <p className="text-xs text-neutral-500 ml-6">Next Audit Due: 2024-03-15</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <input
                      id="afslCompliance"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={securitySettings.australianRegulatory.afslCompliance}
                      readOnly
                    />
                    <label htmlFor="afslCompliance" className="ml-2 block text-sm text-neutral-700">
                      Australian Financial Services License (AFSL)
                    </label>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                    Compliant
                  </span>
                </div>
                <p className="text-xs text-neutral-500 ml-6">License Number: 789012</p>
                <p className="text-xs text-neutral-500 ml-6">Last Audit: 2023-04-15</p>
                <p className="text-xs text-neutral-500 ml-6">Next Audit Due: 2024-04-15</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border border-neutral-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Shield size={20} className="text-primary-500 mr-2" />
                <h3 className="text-md font-medium text-neutral-900">AUSTRAC Compliance</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="amlCtfCompliance"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={securitySettings.compliance.amlCtfCompliant}
                      readOnly
                    />
                    <label htmlFor="amlCtfCompliance" className="ml-2 block text-sm text-neutral-700">
                      Anti-Money Laundering and Counter-Terrorism Financing (AML/CTF)
                    </label>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                    Compliant
                  </span>
                </div>
                <p className="text-xs text-neutral-500 ml-6">Registration Number: AUSTRAC-345678</p>
                <p className="text-xs text-neutral-500 ml-6">Last Report: 2023-03-15</p>
                <p className="text-xs text-neutral-500 ml-6">Next Report Due: 2024-03-15</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <input
                      id="kycVerification"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={true}
                      readOnly
                    />
                    <label htmlFor="kycVerification" className="ml-2 block text-sm text-neutral-700">
                      Know Your Customer (KYC) Verification
                    </label>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                    Active
                  </span>
                </div>
                <p className="text-xs text-neutral-500 ml-6">Verification Provider: GreenID</p>
                <p className="text-xs text-neutral-500 ml-6">Last System Test: 2023-06-01</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border border-neutral-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Server size={20} className="text-primary-500 mr-2" />
                <h3 className="text-md font-medium text-neutral-900">APRA Compliance</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="cps234Compliance"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={securitySettings.compliance.cps234Compliant}
                      readOnly
                    />
                    <label htmlFor="cps234Compliance" className="ml-2 block text-sm text-neutral-700">
                      CPS 234 Information Security
                    </label>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                    Compliant
                  </span>
                </div>
                <p className="text-xs text-neutral-500 ml-6">Last Assessment: 2023-01-10</p>
                <p className="text-xs text-neutral-500 ml-6">Next Assessment Due: 2024-01-10</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <input
                      id="bearFarCompliance"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={securitySettings.australianRegulatory.bearFarCompliance}
                      readOnly
                    />
                    <label htmlFor="bearFarCompliance" className="ml-2 block text-sm text-neutral-700">
                      Banking Executive Accountability Regime (BEAR) / Financial Accountability Regime (FAR)
                    </label>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                    Compliant
                  </span>
                </div>
                <p className="text-xs text-neutral-500 ml-6">Last Assessment: 2023-05-15</p>
                <p className="text-xs text-neutral-500 ml-6">Next Assessment Due: 2024-05-15</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border border-neutral-200 shadow-sm">
              <div className="flex items-center mb-4">
                <User size={20} className="text-primary-500 mr-2" />
                <h3 className="text-md font-medium text-neutral-900">Privacy Compliance</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="appCompliance"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={securitySettings.compliance.appCompliant}
                      readOnly
                    />
                    <label htmlFor="appCompliance" className="ml-2 block text-sm text-neutral-700">
                      Australian Privacy Principles (APPs)
                    </label>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                    Compliant
                  </span>
                </div>
                <p className="text-xs text-neutral-500 ml-6">Last Assessment: 2023-05-20</p>
                <p className="text-xs text-neutral-500 ml-6">Next Assessment Due: 2023-11-20</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <input
                      id="ndbCompliance"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={securitySettings.australianRegulatory.ndbScheme}
                      readOnly
                    />
                    <label htmlFor="ndbCompliance" className="ml-2 block text-sm text-neutral-700">
                      Notifiable Data Breaches (NDB) Scheme
                    </label>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                    Compliant
                  </span>
                </div>
                <p className="text-xs text-neutral-500 ml-6">Last Register Update: 2023-06-30</p>
                <p className="text-xs text-neutral-500 ml-6">Next Update Due: 2023-09-30</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <input
                      id="cdrCompliance"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={securitySettings.compliance.cdrCompliant}
                      readOnly
                    />
                    <label htmlFor="cdrCompliance" className="ml-2 block text-sm text-neutral-700">
                      Consumer Data Right (CDR)
                    </label>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                    Compliant
                  </span>
                </div>
                <p className="text-xs text-neutral-500 ml-6">Last Assessment: 2023-07-10</p>
                <p className="text-xs text-neutral-500 ml-6">Next Assessment Due: 2024-07-10</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'data' && securitySettings && (
        <div className="space-y-6">
          <div className="mb-6 bg-white rounded-md shadow-sm border border-neutral-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-medium text-neutral-900">Data Privacy Management</h3>
              <div className="flex space-x-2">
                <button className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-150 text-sm">
                  <FileCheck size={14} className="mr-1" />
                  Run Privacy Impact Assessment
                </button>
              </div>
            </div>
            <p className="text-sm text-neutral-500 mb-4">
              Equihome is committed to protecting customer data in accordance with the Australian Privacy Principles (APPs) and the Privacy Act 1988.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-md border border-neutral-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Database size={20} className="text-primary-500 mr-2" />
                <h3 className="text-md font-medium text-neutral-900">Data Retention</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Customer Data Retention Period (years)</label>
                  <input
                    type="number"
                    className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    defaultValue={securitySettings.compliance.dataRetention}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Audit Log Retention Period (years)</label>
                  <input
                    type="number"
                    className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    defaultValue={securitySettings.compliance.auditLogRetention}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    id="automaticDeletion"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={true}
                  />
                  <label htmlFor="automaticDeletion" className="ml-2 block text-sm text-neutral-700">
                    Automatic Data Deletion After Retention Period
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="dataAnonymization"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={true}
                  />
                  <label htmlFor="dataAnonymization" className="ml-2 block text-sm text-neutral-700">
                    Data Anonymization for Analytics
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border border-neutral-200 shadow-sm">
              <div className="flex items-center mb-4">
                <User size={20} className="text-primary-500 mr-2" />
                <h3 className="text-md font-medium text-neutral-900">Consent Management</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="explicitConsent"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={true}
                  />
                  <label htmlFor="explicitConsent" className="ml-2 block text-sm text-neutral-700">
                    Require Explicit Consent for Data Collection
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="consentWithdrawal"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={true}
                  />
                  <label htmlFor="consentWithdrawal" className="ml-2 block text-sm text-neutral-700">
                    Allow Consent Withdrawal
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="dataPortability"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={true}
                  />
                  <label htmlFor="dataPortability" className="ml-2 block text-sm text-neutral-700">
                    Data Portability (CDR Compliance)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="privacyNotices"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={true}
                  />
                  <label htmlFor="privacyNotices" className="ml-2 block text-sm text-neutral-700">
                    Automated Privacy Notices
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border border-neutral-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Eye size={20} className="text-primary-500 mr-2" />
                <h3 className="text-md font-medium text-neutral-900">Data Access Controls</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="roleBasedAccess"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={true}
                  />
                  <label htmlFor="roleBasedAccess" className="ml-2 block text-sm text-neutral-700">
                    Role-Based Access Control (RBAC)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="dataClassification"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={true}
                  />
                  <label htmlFor="dataClassification" className="ml-2 block text-sm text-neutral-700">
                    Data Classification
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="accessLogging"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={true}
                  />
                  <label htmlFor="accessLogging" className="ml-2 block text-sm text-neutral-700">
                    Data Access Logging
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="dataMinimization"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={true}
                  />
                  <label htmlFor="dataMinimization" className="ml-2 block text-sm text-neutral-700">
                    Data Minimization
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border border-neutral-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Bell size={20} className="text-primary-500 mr-2" />
                <h3 className="text-md font-medium text-neutral-900">Breach Management</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="breachDetection"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={true}
                  />
                  <label htmlFor="breachDetection" className="ml-2 block text-sm text-neutral-700">
                    Automated Breach Detection
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="breachNotification"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={true}
                  />
                  <label htmlFor="breachNotification" className="ml-2 block text-sm text-neutral-700">
                    Automated Breach Notification (NDB Scheme)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="breachResponse"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    checked={true}
                  />
                  <label htmlFor="breachResponse" className="ml-2 block text-sm text-neutral-700">
                    Breach Response Plan
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Last Breach Response Drill</label>
                  <input
                    type="date"
                    className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    defaultValue="2023-05-15"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityCompliance;
