import React from 'react';

interface CashflowsTabProps {
  results: any;
  parameters: any;
}

const CashflowsTab: React.FC<CashflowsTabProps> = ({ results, parameters }) => {
  return (
    <div style={{ padding: '1rem' }}>
      <p>Cashflows tab is under reconstruction. Please use the Fund Overview tab for now.</p>
    </div>
  );
};

export default CashflowsTab;
