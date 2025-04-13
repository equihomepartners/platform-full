import React from 'react';
import BankingCard from './BankingCard';
import BankingInput from './BankingInput';
import './theme.css';

interface LoanParametersPanelProps {
  settings: {
    average_property_value: number;
    average_ltv: number;
    average_appreciation_rate: number;
    average_exit_timeframe: number;
    fund_term: number; // Needed for validation
  };
  onChange: (name: string, value: number) => void;
  errors: Record<string, string>;
}

const LoanParametersPanel: React.FC<LoanParametersPanelProps> = ({
  settings,
  onChange,
  errors
}) => {
  return (
    <BankingCard title="Loan Parameters">
      <div className="banking-grid banking-grid-2">
        <div className="banking-col-span-2">
          <BankingInput
            label="Average Property Value"
            name="average_property_value"
            value={settings.average_property_value}
            onChange={onChange}
            type="currency"
            min={100000}
            max={10000000}
            error={errors.average_property_value}
            helpText="Average value of properties in the portfolio"
            required
          />
        </div>
        
        <BankingInput
          label="Average LTV"
          name="average_ltv"
          value={settings.average_ltv}
          onChange={onChange}
          type="percentage"
          min={0.2}
          max={0.6}
          step={0.01}
          error={errors.average_ltv}
          helpText="Loan-to-Value ratio"
          required
        />
        
        <BankingInput
          label="Appreciation Rate"
          name="average_appreciation_rate"
          value={settings.average_appreciation_rate}
          onChange={onChange}
          type="percentage"
          min={0.02}
          max={0.06}
          step={0.001}
          error={errors.average_appreciation_rate}
          helpText="Annual property appreciation rate"
          required
        />
        
        <BankingInput
          label="Exit Timeframe"
          name="average_exit_timeframe"
          value={settings.average_exit_timeframe}
          onChange={onChange}
          type="years"
          min={3}
          max={settings.fund_term}
          step={1}
          error={errors.average_exit_timeframe}
          helpText="When homeowners exit through sale or refinance"
          required
        />
      </div>
    </BankingCard>
  );
};

export default LoanParametersPanel;
