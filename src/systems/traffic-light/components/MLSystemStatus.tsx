import React, { useEffect, useState } from 'react';
import { getUnderwritingIntegration } from '../services/mlAnalytics';
import { Activity, Database, Cpu, RefreshCw, AlertTriangle, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useMLData } from '../context/MLDataContext';

const MLSystemStatus: React.FC = () => {
  const { systemStatus, loading, error, refreshData } = useMLData();
  const [underwritingStatus, setUnderwritingStatus] = useState(getUnderwritingIntegration());

  // Refresh underwriting status when system status is refreshed
  useEffect(() => {
    setUnderwritingStatus(getUnderwritingIntegration());
  }, [systemStatus]);

  return (
    <div className="space-y-6">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {loading && !systemStatus ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse flex flex-col items-center">
            <Activity className="h-10 w-10 text-blue-300 mb-2" />
            <span className="text-gray-400">Loading system status...</span>
          </div>
        </div>
      ) : systemStatus ? (
        <>
          {/* System Health Banner */}
          <div className={`border rounded-lg p-4 ${systemStatus.system_health.status === 'operational' ? 'bg-green-50 border-green-200' : systemStatus.system_health.status === 'degraded' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className={`h-5 w-5 ${systemStatus.system_health.status === 'operational' ? 'text-green-600' : systemStatus.system_health.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'}`} />
                <span className={`font-medium ${systemStatus.system_health.status === 'operational' ? 'text-green-800' : systemStatus.system_health.status === 'degraded' ? 'text-yellow-800' : 'text-red-800'}`}>
                  ML System {systemStatus.system_health.status.charAt(0).toUpperCase() + systemStatus.system_health.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">Last Update: {new Date(systemStatus.last_update).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <RefreshCw className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">Next Update: {new Date(systemStatus.next_update).toLocaleTimeString()}</span>
                </div>
                <button
                  onClick={refreshData}
                  disabled={loading}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 disabled:text-gray-400 text-sm"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Metrics Grid */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Database className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Data Processing</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Data Points</span>
                  <span className="font-medium">{systemStatus.data_points.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last 24h</span>
                  <span className="font-medium text-green-600">+{systemStatus.data_points.last_24h.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New Properties</span>
                  <span className="font-medium text-blue-600">+{systemStatus.data_points.new_properties}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Cpu className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Model Performance</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy</span>
                  <span className="font-medium">{(systemStatus.ml_model_metrics.accuracy * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Confidence</span>
                  <span className="font-medium">{(systemStatus.ml_model_metrics.confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Validation</span>
                  <span className="font-medium">{systemStatus.ml_model_metrics.validation_score.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Activity className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold">System Health</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${systemStatus.system_health.status === 'operational' ? 'text-green-600' : systemStatus.system_health.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {systemStatus.system_health.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Uptime</span>
                  <span className="font-medium">{systemStatus.system_health.uptime}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Latency</span>
                  <span className="font-medium">{systemStatus.system_health.latency}ms</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-3">
                <RefreshCw className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold">Data Sources</h3>
              </div>
              <div className="space-y-2">
                {Object.entries(systemStatus.integration_statuses).map(([source, status]) => (
                  <div key={source} className="flex justify-between items-center">
                    <span className="text-gray-600">{source}</span>
                    <span className={`flex items-center ${
                      status === 'connected' ? 'text-green-600' : status === 'degraded' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {status === 'connected' ? (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      ) : status === 'degraded' ? (
                        <AlertTriangle className="h-4 w-4 mr-1" />
                      ) : (
                        <AlertCircle className="h-4 w-4 mr-1" />
                      )}
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* Underwriting Integration */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Underwriting Integration</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Assessments</span>
              <span className="font-medium">{underwritingStatus.totalAssessments}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last 24h</span>
              <span className="font-medium text-green-600">+{underwritingStatus.last24h}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Automation Rate</span>
              <span className="font-medium">{underwritingStatus.automationRate}%</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Risk Assessments</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Approved</span>
                <span className="text-green-600 font-medium">{underwritingStatus.riskAssessments.approved}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Flagged</span>
                <span className="text-yellow-600 font-medium">{underwritingStatus.riskAssessments.flaggedForReview}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rejected</span>
                <span className="text-red-600 font-medium">{underwritingStatus.riskAssessments.rejected}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Recent Updates</h4>
            <div className="space-y-3">
              {underwritingStatus.recentUpdates.map((update, index) => (
                <div key={index} className="text-sm">
                  <div className="text-gray-600">{update.timestamp.toLocaleTimeString()}</div>
                  <div className="font-medium">{update.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLSystemStatus;