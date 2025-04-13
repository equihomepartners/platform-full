import React from 'react';
import BankingCard from './BankingCard';
import BankingMetric from './BankingMetric';
import BankingTabs from './BankingTabs';
import './theme.css';

interface ResultsPanelProps {
  results: any;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results }) => {
  if (!results) return null;

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Overview tab content
  const OverviewTab = () => (
    <div className="banking-grid banking-grid-2">
      <BankingMetric
        label="Fund Size"
        value={results.fundSize ? formatCurrency(results.fundSize) : 'N/A'}
      />
      <BankingMetric
        label="Number of Loans"
        value={results.numLoans || 'N/A'}
      />
      <BankingMetric
        label="Total Return"
        value={results.totalReturn ? formatCurrency(results.totalReturn) : 'N/A'}
      />
      <BankingMetric
        label="Total Profit"
        value={results.totalProfit ? formatCurrency(results.totalProfit) : 'N/A'}
      />
      <BankingMetric
        label="IRR"
        value={results.irr ? formatPercentage(results.irr) : 'N/A'}
      />
      <BankingMetric
        label="Equity Multiple"
        value={results.equityMultiple ? `${results.equityMultiple.toFixed(2)}x` : 'N/A'}
      />
      <BankingMetric
        label="ROI"
        value={results.roi ? formatPercentage(results.roi) : 'N/A'}
      />
    </div>
  );

  // GP Economics tab content
  const GPEconomicsTab = () => (
    <div className="banking-grid banking-grid-2">
      <BankingMetric
        label="GP Investment"
        value={results.gpEconomics?.investment ? formatCurrency(results.gpEconomics.investment) : 'N/A'}
      />
      <BankingMetric
        label="Management Fees"
        value={results.gpEconomics?.managementFees ? formatCurrency(results.gpEconomics.managementFees) : 'N/A'}
      />
      <BankingMetric
        label="Origination Fees"
        value={results.gpEconomics?.originationFees ? formatCurrency(results.gpEconomics.originationFees) : 'N/A'}
      />
      <BankingMetric
        label="GP Catch-up"
        value={results.gpEconomics?.catchup ? formatCurrency(results.gpEconomics.catchup) : 'N/A'}
      />
      <BankingMetric
        label="Carried Interest"
        value={results.gpEconomics?.carriedInterest ? formatCurrency(results.gpEconomics.carriedInterest) : 'N/A'}
      />
      <BankingMetric
        label="Total GP Return"
        value={results.gpEconomics?.totalReturn ? formatCurrency(results.gpEconomics.totalReturn) : 'N/A'}
      />
      <BankingMetric
        label="GP ROI"
        value={results.gpEconomics?.roi ? formatPercentage(results.gpEconomics.roi) : 'N/A'}
      />
    </div>
  );

  // LP Economics tab content
  const LPEconomicsTab = () => (
    <div className="banking-grid banking-grid-2">
      <BankingMetric
        label="LP Investment"
        value={results.lpEconomics?.investment ? formatCurrency(results.lpEconomics.investment) : 'N/A'}
      />
      <BankingMetric
        label="Preferred Return"
        value={results.lpEconomics?.preferredReturn ? formatCurrency(results.lpEconomics.preferredReturn) : 'N/A'}
      />
      <BankingMetric
        label="LP Residual"
        value={results.lpEconomics?.residual ? formatCurrency(results.lpEconomics.residual) : 'N/A'}
      />
      <BankingMetric
        label="Total LP Return"
        value={results.lpEconomics?.totalReturn ? formatCurrency(results.lpEconomics.totalReturn) : 'N/A'}
      />
      <BankingMetric
        label="LP ROI"
        value={results.lpEconomics?.roi ? formatPercentage(results.lpEconomics.roi) : 'N/A'}
      />
    </div>
  );

  // Sample Loan tab content
  const SampleLoanTab = () => (
    <div className="banking-grid banking-grid-2">
      <BankingMetric
        label="Loan Amount"
        value={results.loanExitResult?.loan?.loan_amount ? formatCurrency(results.loanExitResult.loan.loan_amount) : 'N/A'}
      />
      <BankingMetric
        label="Property Value"
        value={results.loanExitResult?.loan?.property_value ? formatCurrency(results.loanExitResult.loan.property_value) : 'N/A'}
      />
      <BankingMetric
        label="Years Held"
        value={results.loanExitResult?.yearsHeld || 'N/A'}
      />
      <BankingMetric
        label="Appreciated Value"
        value={results.loanExitResult?.appreciatedPropertyValue ? formatCurrency(results.loanExitResult.appreciatedPropertyValue) : 'N/A'}
      />
      <BankingMetric
        label="Appreciation"
        value={results.loanExitResult?.propertyAppreciation ? formatCurrency(results.loanExitResult.propertyAppreciation) : 'N/A'}
      />
      <BankingMetric
        label="Interest"
        value={results.loanExitResult?.interest ? formatCurrency(results.loanExitResult.interest) : 'N/A'}
      />
      <BankingMetric
        label="Appreciation Fee"
        value={results.loanExitResult?.appreciationFee ? formatCurrency(results.loanExitResult.appreciationFee) : 'N/A'}
      />
      <BankingMetric
        label="Exit Value"
        value={results.loanExitResult?.exitValue ? formatCurrency(results.loanExitResult.exitValue) : 'N/A'}
      />
    </div>
  );

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: <OverviewTab />
    },
    {
      id: 'gp',
      label: 'GP Economics',
      content: <GPEconomicsTab />
    },
    {
      id: 'lp',
      label: 'LP Economics',
      content: <LPEconomicsTab />
    },
    {
      id: 'loan',
      label: 'Sample Loan',
      content: <SampleLoanTab />
    }
  ];

  return (
    <>
      <BankingCard title="Results">
        <BankingTabs tabs={tabs} defaultTab="overview" />
      </BankingCard>

      <div className="banking-mt-4">
        <BankingCard>
          <div className="banking-flex banking-justify-between banking-items-center">
            <div>
              <h3 className="banking-text-lg banking-font-semibold banking-text-primary">Advanced Results</h3>
              <p className="banking-text-sm banking-text-secondary">View detailed portfolio analysis and advanced metrics</p>
            </div>
            <a
              href="#/portfolio/advanced-simulation"
              className="banking-button banking-button-primary"
              style={{ padding: '0.5rem 1rem', display: 'inline-block', textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                // Navigate to the advanced simulation page
                window.location.hash = '#/portfolio/advanced-simulation';
              }}
            >
              View Advanced Results
            </a>
          </div>
        </BankingCard>
      </div>
    </>
  );
};

export default ResultsPanel;
