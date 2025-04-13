import React, { useState } from 'react';
import './theme.css';

interface BankingTabsProps {
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode;
  }[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

const BankingTabs: React.FC<BankingTabsProps> = ({ 
  tabs, 
  defaultTab, 
  onChange 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  return (
    <div>
      <div className="banking-tabs">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`banking-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      
      <div className="banking-tab-content">
        {tabs.map(tab => (
          <div
            key={tab.id}
            style={{ display: activeTab === tab.id ? 'block' : 'none' }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankingTabs;
