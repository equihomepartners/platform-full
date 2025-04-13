import React from 'react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

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
  errors: Record<string, string>;
  onChange: (name: string, value: number) => void;
}

const FundSettingsPanel: React.FC<FundSettingsPanelProps> = ({
  settings,
  errors,
  onChange
}) => {
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    // Convert to number
    let numericValue: number;
    
    if (type === 'number') {
      numericValue = parseFloat(value);
    } else if (name.includes('rate') || name.includes('percentage')) {
      // Convert percentage to decimal
      numericValue = parseFloat(value) / 100;
    } else {
      // Remove currency formatting and convert to number
      numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    }
    
    // Update state if valid number
    if (!isNaN(numericValue)) {
      onChange(name, numericValue);
    }
  };

  return (
    <div className="banking-card">
      <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Fund Settings</h3>
      
      <div className="banking-grid banking-grid-cols-1 banking-md:banking-grid-cols-2 banking-gap-4">
        {/* Fund Size */}
        <div className="banking-form-control">
          <label className="banking-label">
            <span className="banking-label-text">Fund Size</span>
          </label>
          <input
            type="text"
            name="fund_size"
            value={formatCurrency(settings.fund_size)}
            onChange={handleInputChange}
            className={`banking-input banking-input-bordered banking-w-full ${errors.fund_size ? 'banking-input-error' : ''}`}
          />
          {errors.fund_size && (
            <div className="banking-text-error banking-text-xs banking-mt-1">{errors.fund_size}</div>
          )}
        </div>
        
        {/* Fund Term */}
        <div className="banking-form-control">
          <label className="banking-label">
            <span className="banking-label-text">Fund Term (Years)</span>
          </label>
          <input
            type="number"
            name="fund_term"
            value={settings.fund_term}
            onChange={handleInputChange}
            min={5}
            max={15}
            step={1}
            className={`banking-input banking-input-bordered banking-w-full ${errors.fund_term ? 'banking-input-error' : ''}`}
          />
          {errors.fund_term && (
            <div className="banking-text-error banking-text-xs banking-mt-1">{errors.fund_term}</div>
          )}
        </div>
        
        {/* Management Fee Rate */}
        <div className="banking-form-control">
          <label className="banking-label">
            <span className="banking-label-text">Management Fee Rate</span>
          </label>
          <input
            type="text"
            name="management_fee_rate"
            value={formatPercentage(settings.management_fee_rate)}
            onChange={handleInputChange}
            className={`banking-input banking-input-bordered banking-w-full ${errors.management_fee_rate ? 'banking-input-error' : ''}`}
          />
          {errors.management_fee_rate && (
            <div className="banking-text-error banking-text-xs banking-mt-1">{errors.management_fee_rate}</div>
          )}
        </div>
        
        {/* Hurdle Rate */}
        <div className="banking-form-control">
          <label className="banking-label">
            <span className="banking-label-text">Hurdle Rate</span>
          </label>
          <input
            type="text"
            name="hurdle_rate"
            value={formatPercentage(settings.hurdle_rate)}
            onChange={handleInputChange}
            className={`banking-input banking-input-bordered banking-w-full ${errors.hurdle_rate ? 'banking-input-error' : ''}`}
          />
          {errors.hurdle_rate && (
            <div className="banking-text-error banking-text-xs banking-mt-1">{errors.hurdle_rate}</div>
          )}
        </div>
        
        {/* Performance Fee Rate */}
        <div className="banking-form-control">
          <label className="banking-label">
            <span className="banking-label-text">Performance Fee Rate</span>
          </label>
          <input
            type="text"
            name="performance_fee_rate"
            value={formatPercentage(settings.performance_fee_rate)}
            onChange={handleInputChange}
            className={`banking-input banking-input-bordered banking-w-full ${errors.performance_fee_rate ? 'banking-input-error' : ''}`}
          />
          {errors.performance_fee_rate && (
            <div className="banking-text-error banking-text-xs banking-mt-1">{errors.performance_fee_rate}</div>
          )}
        </div>
        
        {/* Origination Fee Rate */}
        <div className="banking-form-control">
          <label className="banking-label">
            <span className="banking-label-text">Origination Fee Rate</span>
          </label>
          <input
            type="text"
            name="origination_fee_rate"
            value={formatPercentage(settings.origination_fee_rate)}
            onChange={handleInputChange}
            className={`banking-input banking-input-bordered banking-w-full ${errors.origination_fee_rate ? 'banking-input-error' : ''}`}
          />
          {errors.origination_fee_rate && (
            <div className="banking-text-error banking-text-xs banking-mt-1">{errors.origination_fee_rate}</div>
          )}
        </div>
        
        {/* Simple Interest Rate */}
        <div className="banking-form-control">
          <label className="banking-label">
            <span className="banking-label-text">Simple Interest Rate</span>
          </label>
          <input
            type="text"
            name="simple_interest_rate"
            value={formatPercentage(settings.simple_interest_rate)}
            onChange={handleInputChange}
            className={`banking-input banking-input-bordered banking-w-full ${errors.simple_interest_rate ? 'banking-input-error' : ''}`}
          />
          {errors.simple_interest_rate && (
            <div className="banking-text-error banking-text-xs banking-mt-1">{errors.simple_interest_rate}</div>
          )}
        </div>
        
        {/* GP Investment Percentage */}
        <div className="banking-form-control">
          <label className="banking-label">
            <span className="banking-label-text">GP Investment Percentage</span>
          </label>
          <input
            type="text"
            name="gp_investment_percentage"
            value={formatPercentage(settings.gp_investment_percentage)}
            onChange={handleInputChange}
            className={`banking-input banking-input-bordered banking-w-full ${errors.gp_investment_percentage ? 'banking-input-error' : ''}`}
          />
          {errors.gp_investment_percentage && (
            <div className="banking-text-error banking-text-xs banking-mt-1">{errors.gp_investment_percentage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundSettingsPanel;
