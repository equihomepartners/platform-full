import React, { useState } from 'react';
import FundOverviewTab from './FundOverviewTab';

interface ResultsPanelProps {
  results: any;
  parameters: any;
  isCalculating: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, parameters, isCalculating }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (isCalculating) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '2rem'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#4a4a4a'
        }}>
          <div style={{
            border: '4px solid #e0e0e0',
            borderTopColor: '#0a2463',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            margin: '0 auto 1rem',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p>Running simulation calculations...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '2rem'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#4a4a4a'
        }}>
          <p>Run the simulation to see results</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e0e0e0',
        marginBottom: '1rem'
      }}>
        <TabButton
          isActive={true}
          onClick={() => {}}
          label="Fund Overview"
        />
      </div>

      {/* Tab Content */}
      <div>
        <FundOverviewTab
          results={results}
          parameters={parameters}
        />
      </div>
    </div>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.75rem 1rem',
        backgroundColor: isActive ? '#f5f7fa' : 'transparent',
        border: 'none',
        borderBottom: isActive ? '2px solid #0a2463' : '2px solid transparent',
        color: isActive ? '#0a2463' : '#4a4a4a',
        fontWeight: isActive ? 'bold' : 'normal',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      {label}
    </button>
  );
};

export default ResultsPanel;
