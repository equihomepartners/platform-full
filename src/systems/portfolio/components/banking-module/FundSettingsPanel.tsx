import React from 'react';
import BankingCard from './BankingCard';
import BankingInput from './BankingInput';
import './theme.css';

interface FundSettingsPanelProps {
  settings: {
    fund_size: number;
    fund_term: number;
    management_fee_rate: number;
    hurdle_rate: number;
    performance_fee_rate: number;
    origination_fee_rate: number;
    simple_interest_rate: number;
    gp_investment_percentage: number;
  };
  onChange: (name: string, value: number) => void;
  errors: Record<string, string>;
}

const FundSettingsPanel: React.FC<FundSettingsPanelProps> = ({
  settings,
  onChange,
  errors
}) => {
  return (
    <BankingCard title="Fund Parameters">
      <div className="banking-grid banking-grid-2">
        <BankingInput
          label="Fund Size"
          name="fund_size"
          value={settings.fund_size}
          onChange={onChange}
          type="currency"
          min={1000000}
          max={1000000000}
          error={errors.fund_size}
          helpText="Total capital raised for the fund"
          required
        />
        
        <BankingInput
          label="Fund Term"
          name="fund_term"
          value={settings.fund_term}
          onChange={onChange}
          type="years"
          min={5}
          max={15}
          step={1}
          error={errors.fund_term}
          helpText="Duration of the fund in years"
          required
        />
        
        <BankingInput
          label="GP Investment"
          name="gp_investment_percentage"
          value={settings.gp_investment_percentage}
          onChange={onChange}
          type="percentage"
          min={0.01}
          max={0.1}
          step={0.01}
          error={errors.gp_investment_percentage}
          helpText="Percentage of fund invested by GP"
          required
        />
        
        <BankingInput
          label="Management Fee"
          name="management_fee_rate"
          value={settings.management_fee_rate}
          onChange={onChange}
          type="percentage"
          min={0.005}
          max={0.03}
          step={0.001}
          error={errors.management_fee_rate}
          helpText="Annual fee charged on AUM"
          required
        />
        
        <BankingInput
          label="Hurdle Rate"
          name="hurdle_rate"
          value={settings.hurdle_rate}
          onChange={onChange}
          type="percentage"
          min={0.04}
          max={0.08}
          step={0.001}
          error={errors.hurdle_rate}
          helpText="Preferred return to LPs before carried interest"
          required
        />
        
        <BankingInput
          label="Performance Fee"
          name="performance_fee_rate"
          value={settings.performance_fee_rate}
          onChange={onChange}
          type="percentage"
          min={0.1}
          max={0.3}
          step={0.01}
          error={errors.performance_fee_rate}
          helpText="Carried interest on profits above hurdle"
          required
        />
        
        <BankingInput
          label="Origination Fee"
          name="origination_fee_rate"
          value={settings.origination_fee_rate}
          onChange={onChange}
          type="percentage"
          min={0.01}
          max={0.05}
          step={0.001}
          error={errors.origination_fee_rate}
          helpText="Fee charged on new loans"
          required
        />
        
        <BankingInput
          label="Simple Interest Rate"
          name="simple_interest_rate"
          value={settings.simple_interest_rate}
          onChange={onChange}
          type="percentage"
          min={0.03}
          max={0.07}
          step={0.001}
          error={errors.simple_interest_rate}
          helpText="Annual interest rate on loans"
          required
        />
      </div>
    </BankingCard>
  );
};

export default FundSettingsPanel;
