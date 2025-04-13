import React from 'react';

interface PortfolioTabProps {
  results: any;
  parameters: any;
}

const PortfolioTab: React.FC<PortfolioTabProps> = ({ results, parameters }) => {
  return (
    <div style={{ padding: '1rem' }}>
      <p>Portfolio tab is under reconstruction. Please use the Fund Overview tab for now.</p>
    </div>
  );
};

export default PortfolioTab;
