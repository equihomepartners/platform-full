import React from 'react';
import BankingCard from '../BankingCard';
import BankingTabs from '../BankingTabs';
import FundOverviewTab from './FundOverviewTab';
import CashflowsTab from './CashflowsTab';
import WaterfallTab from './WaterfallTab';
import GPEconomicsTab from './GPEconomicsTab';
import LPEconomicsTab from './LPEconomicsTab';
import PortfolioTab from './PortfolioTab';
import '../theme.css';

interface AdvancedResultsPanelProps {
  results: any;
  isLoading?: boolean;
  parameters?: any; // Simulation parameters
}

/**
 * Advanced Results Panel
 *
 * A comprehensive results panel for the advanced simulation with multiple tabs
 * showing different aspects of the simulation results.
 */
const AdvancedResultsPanel: React.FC<AdvancedResultsPanelProps> = ({
  results,
  isLoading = false,
  parameters = {}
}) => {
  if (isLoading) {
    return (
      <BankingCard className="banking-h-full banking-flex banking-items-center banking-justify-center">
        <div className="banking-text-center">
          <div className="banking-inline-block banking-h-8 banking-w-8 banking-spin banking-rounded-full banking-border-4 banking-border-solid banking-border-primary banking-border-r-transparent"></div>
          <p className="banking-mt-4 banking-text-secondary">Running advanced simulation...</p>
        </div>
      </BankingCard>
    );
  }

  if (!results) {
    return (
      <BankingCard className="banking-h-full banking-flex banking-items-center banking-justify-center">
        <div className="banking-text-center">
          <p className="banking-text-secondary">No simulation results available. Adjust parameters and run a simulation.</p>
        </div>
      </BankingCard>
    );
  }

  const tabs = [
    {
      id: 'overview',
      label: 'Fund Overview',
      content: <FundOverviewTab results={results} parameters={parameters} />
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      content: <PortfolioTab simulationResults={results} />
    },
    {
      id: 'cashflows',
      label: 'Cashflows',
      content: <CashflowsTab results={results} parameters={parameters} />
    },
    {
      id: 'waterfall',
      label: 'Waterfall',
      content: <WaterfallTab results={results} parameters={parameters} />
    },
    {
      id: 'gp-economics',
      label: 'GP Economics',
      content: <GPEconomicsTab results={results} parameters={parameters} />
    },
    {
      id: 'lp-economics',
      label: 'LP Economics',
      content: <LPEconomicsTab results={results} parameters={parameters} />
    }
  ];

  return (
    <BankingCard title="Advanced Simulation Results">
      <BankingTabs tabs={tabs} defaultTab="overview" />
    </BankingCard>
  );
};

export default AdvancedResultsPanel;
