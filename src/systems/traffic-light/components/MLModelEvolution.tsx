import React, { useEffect, useState } from 'react';
import { Brain, TrendingUp, Database, RefreshCw, Calendar } from 'lucide-react';

interface ModelEvolution {
  version: string;
  date: Date;
  features: string[];
  dataSources: string[];
  accuracy: number;
  dataPoints: number;
  nextUpdate: Date;
}

// Initial model data
const initialModel: ModelEvolution = {
  version: '1.0',
  date: new Date('2025-04-10'), // Today's date in 2025
  features: [
    'Suburb risk classification algorithm',
    'Property value forecasting',
    'Market cycle position detection',
    'Infrastructure impact assessment',
    'Comparable suburb identification'
  ],
  dataSources: [
    'PropTrack API',
    'CoreLogic Property Data',
    'Domain Group Market Data',
    'ABS Census Demographics',
    'NSW Government Infrastructure Plans'
  ],
  accuracy: 85.7,
  dataPoints: 250000,
  nextUpdate: new Date('2025-04-17') // Weekly updates
};

const MLModelEvolution: React.FC = () => {
  const [model, setModel] = useState<ModelEvolution>(initialModel);
  const [loading, setLoading] = useState<boolean>(false);

  // Simulate API call to get model information
  const fetchModelInfo = async () => {
    setLoading(true);
    try {
      // This would be a real API call in production
      // const response = await fetch('/api/ml/model-info');
      // const data = await response.json();
      // setModel(data);

      // For now, we'll just use the initial model data
      // with a slight delay to simulate an API call
      setTimeout(() => {
        setModel({
          ...initialModel,
          dataPoints: initialModel.dataPoints + Math.floor(Math.random() * 1000)
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching model info:', error);
      setLoading(false);
    }
  };

  // Fetch model info on component mount
  useEffect(() => {
    fetchModelInfo();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">ML Model Information</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={fetchModelInfo}
            disabled={loading}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 disabled:text-gray-400"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">Version {model.version}</span>
            <span className="text-sm text-gray-500">
              Released: {model.date.toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm">Accuracy: {model.accuracy}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Database className="h-4 w-4 text-blue-600" />
              <span className="text-sm">{(model.dataPoints / 1000).toFixed(0)}K data points</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <Calendar className="h-4 w-4" />
          <span>Next scheduled update: {model.nextUpdate.toLocaleDateString()} (weekly updates)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h4 className="font-medium mb-3">Core Features</h4>
            <div className="space-y-2">
              {model.features.map((feature, i) => (
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
              {model.dataSources.map((source, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-sm text-gray-600">{source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-md p-4 text-sm text-blue-800">
        <p className="font-medium mb-1">About This Model</p>
        <p>This is the initial version of our ML system designed to analyze property market data and provide risk assessments for suburbs across Sydney. The model is updated weekly with fresh data and continuously improved based on market performance.</p>
      </div>
    </div>
  );
};

export default MLModelEvolution;