import React, { useState } from 'react';
import { X } from 'lucide-react';
import SimulationLayout from './SimulationLayout';

interface FullScreenSimulationProps {
  onClose: () => void;
}

/**
 * Full Screen Simulation Component
 * 
 * This component renders the simulation in full-screen mode.
 */
const FullScreenSimulation: React.FC<FullScreenSimulationProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="p-4 flex justify-between items-center border-b border-neutral-200">
        <h1 className="text-2xl font-semibold text-primary-800">Portfolio Simulation Engine</h1>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
          aria-label="Close full-screen mode"
        >
          <X size={24} className="text-neutral-600" />
        </button>
      </div>
      <div className="p-6">
        <SimulationLayout />
      </div>
    </div>
  );
};

export default FullScreenSimulation;
