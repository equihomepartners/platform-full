import React from 'react';

interface MonteCarloTabProps {
  results: any;
  parameters: any;
}

const MonteCarloTab: React.FC<MonteCarloTabProps> = ({ results, parameters }) => {
  return (
    <div style={{ padding: '1rem' }}>
      <p>Monte Carlo tab is under reconstruction. Please use the Fund Overview tab for now.</p>
    </div>
  );
};

export default MonteCarloTab;
