import React from 'react';
import SimulationModule from './simulation/SimulationModule';
import { ExternalLink } from 'lucide-react';

/**
 * Portfolio Simulation Component
 *
 * This component serves as the entry point for the simulation engine.
 * It provides a full-featured simulation with portfolio generation and analysis.
 */

const Simulation: React.FC = () => {
  // Open in new window
  const openInNewWindow = () => {
    const url = '/portfolio/simulation/fullscreen';
    window.open(url, '_blank', 'width=1200,height=800');
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-primary-900 mb-2">Portfolio Simulation</h1>
        <p className="text-neutral-600">
          Model and analyze fund performance with our institutional-grade simulation engine.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-primary-900">Equihome Fund Simulator</h2>
            <p className="text-neutral-600 mt-1">
              Advanced portfolio modeling with realistic exit timeframe distribution.
            </p>
          </div>
          <button
            onClick={openInNewWindow}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            <ExternalLink size={16} className="mr-2" />
            Open in Fullscreen
          </button>
        </div>
        <SimulationModule />
      </div>
    </div>
  );
};

export default Simulation;
