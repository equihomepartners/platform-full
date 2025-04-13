import React, { useState } from 'react';
import { Brain, Save, RefreshCw, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { useMLData } from '../../context/MLDataContext';

const MLModelSettings: React.FC = () => {
  const { modelInfo, systemStatus, loading } = useMLData();
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  // Form state
  const [settings, setSettings] = useState({
    confidenceThreshold: 80,
    riskTolerance: 'medium',
    updateFrequency: 'weekly',
    dataRetentionPeriod: 90,
    modelVersion: modelInfo?.version || '1.0',
    enabledFeatures: {
      suburbRiskClassification: true,
      propertyValueForecasting: true,
      marketCycleDetection: true,
      infrastructureImpact: true,
      comparableSuburbs: true
    },
    businessModelWeights: {
      ownerEquity: 30,
      valueStability: 25,
      marketLiquidity: 20,
      growthPotential: 15,
      premiumLocation: 10
    }
  });

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setSettings(prev => ({
        ...prev,
        enabledFeatures: {
          ...prev.enabledFeatures,
          [name]: checkbox.checked
        }
      }));
    } else if (name.startsWith('weight-')) {
      const weightKey = name.replace('weight-', '');
      setSettings(prev => ({
        ...prev,
        businessModelWeights: {
          ...prev.businessModelWeights,
          [weightKey]: parseInt(value)
        }
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
    <div className="space-y-8">
      {/* Model Information */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start">
          <Brain className="h-6 w-6 text-blue-600 mt-1 mr-3" />
          <div>
            <h3 className="font-semibold text-blue-900">ML Model Information</h3>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Current Version:</span>
                <span className="ml-2">{modelInfo?.version || 'Loading...'}</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Release Date:</span>
                <span className="ml-2">
                  {modelInfo ? new Date(modelInfo.release_date).toLocaleDateString() : 'Loading...'}
                </span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Accuracy:</span>
                <span className="ml-2">
                  {modelInfo ? `${(modelInfo.metrics.accuracy * 100).toFixed(1)}%` : 'Loading...'}
                </span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Data Points:</span>
                <span className="ml-2">
                  {modelInfo ? modelInfo.metrics.data_points.toLocaleString() : 'Loading...'}
                </span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Next Update:</span>
                <span className="ml-2">
                  {modelInfo ? new Date(modelInfo.next_update).toLocaleDateString() : 'Loading...'}
                </span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Training Duration:</span>
                <span className="ml-2">
                  {modelInfo ? `${modelInfo.training_info.training_duration} hours` : 'Loading...'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Model Configuration */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Model Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="confidenceThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                  Confidence Threshold (%)
                </label>
                <input
                  type="number"
                  id="confidenceThreshold"
                  name="confidenceThreshold"
                  min="0"
                  max="100"
                  value={settings.confidenceThreshold}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Minimum confidence level required for ML predictions to be displayed
                </p>
              </div>
              
              <div>
                <label htmlFor="riskTolerance" className="block text-sm font-medium text-gray-700 mb-1">
                  Risk Tolerance
                </label>
                <select
                  id="riskTolerance"
                  name="riskTolerance"
                  value={settings.riskTolerance}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low - Conservative predictions</option>
                  <option value="medium">Medium - Balanced approach</option>
                  <option value="high">High - Aggressive predictions</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Affects how the model weighs risk factors in predictions
                </p>
              </div>
              
              <div>
                <label htmlFor="updateFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                  Update Frequency
                </label>
                <select
                  id="updateFrequency"
                  name="updateFrequency"
                  value={settings.updateFrequency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  How often the ML model is retrained with new data
                </p>
              </div>
              
              <div>
                <label htmlFor="dataRetentionPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                  Data Retention Period (days)
                </label>
                <input
                  type="number"
                  id="dataRetentionPeriod"
                  name="dataRetentionPeriod"
                  min="30"
                  max="365"
                  value={settings.dataRetentionPeriod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  How long historical data is kept for training and analysis
                </p>
              </div>
            </div>
          </div>
          
          {/* Equihome Business Model */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Equihome Business Model Weights</h3>
            <p className="text-sm text-gray-600 mb-4">
              Adjust how different factors are weighted in the ML model to align with Equihome's business objectives.
              Total weights must equal 100%.
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="weight-ownerEquity" className="block text-sm font-medium text-gray-700 mb-1">
                  Owner Equity (%)
                </label>
                <input
                  type="number"
                  id="weight-ownerEquity"
                  name="weight-ownerEquity"
                  min="0"
                  max="100"
                  value={settings.businessModelWeights.ownerEquity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Weight given to high owner equity in properties
                </p>
              </div>
              
              <div>
                <label htmlFor="weight-valueStability" className="block text-sm font-medium text-gray-700 mb-1">
                  Value Stability (%)
                </label>
                <input
                  type="number"
                  id="weight-valueStability"
                  name="weight-valueStability"
                  min="0"
                  max="100"
                  value={settings.businessModelWeights.valueStability}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Weight given to property value stability
                </p>
              </div>
              
              <div>
                <label htmlFor="weight-marketLiquidity" className="block text-sm font-medium text-gray-700 mb-1">
                  Market Liquidity (%)
                </label>
                <input
                  type="number"
                  id="weight-marketLiquidity"
                  name="weight-marketLiquidity"
                  min="0"
                  max="100"
                  value={settings.businessModelWeights.marketLiquidity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Weight given to market liquidity
                </p>
              </div>
              
              <div>
                <label htmlFor="weight-growthPotential" className="block text-sm font-medium text-gray-700 mb-1">
                  Growth Potential (%)
                </label>
                <input
                  type="number"
                  id="weight-growthPotential"
                  name="weight-growthPotential"
                  min="0"
                  max="100"
                  value={settings.businessModelWeights.growthPotential}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Weight given to growth potential
                </p>
              </div>
              
              <div>
                <label htmlFor="weight-premiumLocation" className="block text-sm font-medium text-gray-700 mb-1">
                  Premium Location (%)
                </label>
                <input
                  type="number"
                  id="weight-premiumLocation"
                  name="weight-premiumLocation"
                  min="0"
                  max="100"
                  value={settings.businessModelWeights.premiumLocation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Weight given to premium location factors
                </p>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total:</span>
                  <span className={`text-sm font-medium ${
                    Object.values(settings.businessModelWeights).reduce((a, b) => a + b, 0) === 100
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {Object.values(settings.businessModelWeights).reduce((a, b) => a + b, 0)}%
                  </span>
                </div>
                {Object.values(settings.businessModelWeights).reduce((a, b) => a + b, 0) !== 100 && (
                  <p className="mt-1 text-xs text-red-500">
                    Total weights must equal 100%
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Toggles */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">ML Features</h3>
          <p className="text-sm text-gray-600 mb-4">
            Enable or disable specific ML model features
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="suburbRiskClassification"
                name="suburbRiskClassification"
                checked={settings.enabledFeatures.suburbRiskClassification}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="suburbRiskClassification" className="ml-2 block text-sm text-gray-700">
                Suburb Risk Classification
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="propertyValueForecasting"
                name="propertyValueForecasting"
                checked={settings.enabledFeatures.propertyValueForecasting}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="propertyValueForecasting" className="ml-2 block text-sm text-gray-700">
                Property Value Forecasting
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="marketCycleDetection"
                name="marketCycleDetection"
                checked={settings.enabledFeatures.marketCycleDetection}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="marketCycleDetection" className="ml-2 block text-sm text-gray-700">
                Market Cycle Detection
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="infrastructureImpact"
                name="infrastructureImpact"
                checked={settings.enabledFeatures.infrastructureImpact}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="infrastructureImpact" className="ml-2 block text-sm text-gray-700">
                Infrastructure Impact Assessment
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="comparableSuburbs"
                name="comparableSuburbs"
                checked={settings.enabledFeatures.comparableSuburbs}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="comparableSuburbs" className="ml-2 block text-sm text-gray-700">
                Comparable Suburb Identification
              </label>
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
            disabled={saveLoading || Object.values(settings.businessModelWeights).reduce((a, b) => a + b, 0) !== 100}
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

export default MLModelSettings;
