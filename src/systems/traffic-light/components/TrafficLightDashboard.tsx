import React from 'react';
import { CIODashboard } from './index';
import MLSystemIntegration from './MLSystemIntegration';

const TrafficLightDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Traffic Light System Dashboard</h2>
        <p className="text-gray-600">
          Monitor market analysis and opportunity identification across Sydney suburbs.
        </p>
      </div>

      <MLSystemIntegration />

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Suburb Classification</h3>
        <CIODashboard />
      </div>
    </div>
  );
};

export default TrafficLightDashboard;
