import React from 'react';
import { Brain, TrendingUp, Database, RefreshCw, Calendar, AlertCircle } from 'lucide-react';
import { useMLData } from '../context/MLDataContext';

const MLModelEvolution: React.FC = () => {
  // Use the ML Data Context
  const { modelInfo, loading, error, refreshData, lastUpdated } = useMLData();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">ML Model Information</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={refreshData}
            disabled={loading}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 disabled:text-gray-400"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-sm">Refresh</span>
          </button>
          {lastUpdated && (
            <span className="text-xs text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {loading && !modelInfo ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse flex flex-col items-center">
            <Brain className="h-10 w-10 text-blue-300 mb-2" />
            <span className="text-gray-400">Loading model information...</span>
          </div>
        </div>
      ) : modelInfo ? (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Version {modelInfo.version}</span>
              <span className="text-sm text-gray-500">
                Released: {new Date(modelInfo.release_date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm">Accuracy: {(modelInfo.metrics.accuracy * 100).toFixed(1)}%</span>
              </div>
              <div className="flex items-center space-x-1">
                <Database className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{(modelInfo.metrics.data_points / 1000).toFixed(0)}K data points</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Calendar className="h-4 w-4" />
            <span>Next scheduled update: {new Date(modelInfo.next_update).toLocaleDateString()} (weekly updates)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-medium mb-3">Core Features</h4>
              <div className="space-y-2">
                {modelInfo.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Data Sources</h4>
              <div className="space-y-2">
                {modelInfo.data_sources.map((source, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-sm text-gray-600">{source}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 border border-gray-200 rounded-md">
            <h4 className="font-medium mb-2">Training Information</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Last Training:</div>
              <div>{new Date(modelInfo.training_info.last_training).toLocaleDateString()}</div>
              <div>Training Duration:</div>
              <div>{modelInfo.training_info.training_duration} hours</div>
              <div>Iterations:</div>
              <div>{modelInfo.training_info.iterations.toLocaleString()}</div>
              <div>Convergence Rate:</div>
              <div>{(modelInfo.training_info.convergence_rate * 100).toFixed(1)}%</div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="bg-blue-50 rounded-md p-4 text-sm text-blue-800">
        <p className="font-medium mb-1">About This Model</p>
        <p>This is the initial version of our ML system designed to analyze property market data and provide risk assessments for suburbs across Sydney. The model is updated weekly with fresh data and continuously improved based on market performance.</p>
      </div>
    </div>
  );
};

export default MLModelEvolution;