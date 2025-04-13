import React from 'react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface LoanParametersPanelProps {
  settings: {
    average_property_value: number;
    average_ltv: number;
    average_appreciation_rate: number;
    average_exit_timeframe: number;
  };
  errors: Record<string, string>;
  onChange: (name: string, value: number) => void;
}

const LoanParametersPanel: React.FC<LoanParametersPanelProps> = ({
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
    } else if (name.includes('rate') || name.includes('ltv')) {
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
      <h3 className="banking-text-lg banking-font-semibold banking-text-primary banking-mb-4">Loan Parameters</h3>
      
      <div className="banking-grid banking-grid-cols-1 banking-md:banking-grid-cols-2 banking-gap-4">
        {/* Average Property Value */}
        <div className="banking-form-control">
          <label className="banking-label">
            <span className="banking-label-text">Average Property Value</span>
          </label>
          <input
            type="text"
            name="average_property_value"
            value={formatCurrency(settings.average_property_value)}
            onChange={handleInputChange}
            className={`banking-input banking-input-bordered banking-w-full ${errors.average_property_value ? 'banking-input-error' : ''}`}
          />
          {errors.average_property_value && (
            <div className="banking-text-error banking-text-xs banking-mt-1">{errors.average_property_value}</div>
          )}
        </div>
        
        {/* Average LTV */}
        <div className="banking-form-control">
          <label className="banking-label">
            <span className="banking-label-text">Average LTV</span>
          </label>
          <input
            type="text"
            name="average_ltv"
            value={formatPercentage(settings.average_ltv)}
            onChange={handleInputChange}
            className={`banking-input banking-input-bordered banking-w-full ${errors.average_ltv ? 'banking-input-error' : ''}`}
          />
          {errors.average_ltv && (
            <div className="banking-text-error banking-text-xs banking-mt-1">{errors.average_ltv}</div>
          )}
        </div>
        
        {/* Average Appreciation Rate */}
        <div className="banking-form-control">
          <label className="banking-label">
            <span className="banking-label-text">Average Appreciation Rate</span>
          </label>
          <input
            type="text"
            name="average_appreciation_rate"
            value={formatPercentage(settings.average_appreciation_rate)}
            onChange={handleInputChange}
            className={`banking-input banking-input-bordered banking-w-full ${errors.average_appreciation_rate ? 'banking-input-error' : ''}`}
          />
          {errors.average_appreciation_rate && (
            <div className="banking-text-error banking-text-xs banking-mt-1">{errors.average_appreciation_rate}</div>
          )}
        </div>
        
        {/* Average Exit Timeframe */}
        <div className="banking-form-control">
          <label className="banking-label">
            <span className="banking-label-text">Average Exit Timeframe (Years)</span>
          </label>
          <input
            type="number"
            name="average_exit_timeframe"
            value={settings.average_exit_timeframe}
            onChange={handleInputChange}
            min={3}
            max={settings.fund_term}
            step={1}
            className={`banking-input banking-input-bordered banking-w-full ${errors.average_exit_timeframe ? 'banking-input-error' : ''}`}
          />
          {errors.average_exit_timeframe && (
            <div className="banking-text-error banking-text-xs banking-mt-1">{errors.average_exit_timeframe}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanParametersPanel;
