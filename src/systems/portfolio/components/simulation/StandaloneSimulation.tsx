import React from 'react';
import SimulationModule from './SimulationModule';

/**
 * Standalone Simulation Component
 * 
 * This component is used when the simulation is opened in a new window.
 */
const StandaloneSimulation: React.FC = () => {
  // Handle close
  const handleClose = () => {
    window.close();
  };

  return (
    <div className="h-screen">
      <SimulationModule onClose={handleClose} />
    </div>
  );
};

export default StandaloneSimulation;
