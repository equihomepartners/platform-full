import React from 'react';
import { DollarSign, Percent, Clock, Hash } from 'lucide-react';
import './theme.css';

interface BankingInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (name: string, value: number) => void;
  type?: 'text' | 'number' | 'currency' | 'percentage' | 'years';
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  helpText?: string;
  disabled?: boolean;
  required?: boolean;
}

const BankingInput: React.FC<BankingInputProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  min,
  max,
  step,
  error,
  helpText,
  disabled = false,
  required = false
}) => {
  // Format currency for display
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Format percentage for display
  const formatPercentage = (value: number): string => {
    return (value * 100).toFixed(2);
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    if (type === 'currency') {
      // Remove commas and convert to number
      const numericValue = parseFloat(value.replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        onChange(name, numericValue);
      }
    } else if (type === 'percentage') {
      // Convert percentage to decimal (e.g., 5% -> 0.05)
      const percentValue = parseFloat(value) / 100;
      if (!isNaN(percentValue)) {
        onChange(name, percentValue);
      }
    } else {
      // Regular number input
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        onChange(name, numericValue);
      }
    }
  };

  // Determine display value based on type
  const getDisplayValue = (): string => {
    if (typeof value === 'number') {
      if (type === 'currency') {
        return formatCurrency(value);
      } else if (type === 'percentage') {
        return formatPercentage(value);
      }
    }
    return value.toString();
  };

  // Get input type
  const getInputType = (): string => {
    if (type === 'currency' || type === 'text') {
      return 'text';
    }
    return 'number';
  };

  // Get icon based on type
  const getIcon = () => {
    switch (type) {
      case 'currency':
        return <DollarSign size={16} className="banking-text-secondary" />;
      case 'percentage':
        return <Percent size={16} className="banking-text-secondary" />;
      case 'years':
        return <Clock size={16} className="banking-text-secondary" />;
      case 'number':
        return <Hash size={16} className="banking-text-secondary" />;
      default:
        return null;
    }
  };

  return (
    <div className="banking-mb-3">
      <label className="banking-label">
        {label}
        {required && <span className="banking-text-error"> *</span>}
      </label>
      
      <div className="banking-relative">
        {getIcon() && (
          <div className="banking-absolute banking-inset-y-0 banking-left-0 banking-pl-3 banking-flex banking-items-center banking-pointer-events-none">
            {getIcon()}
          </div>
        )}
        
        <input
          type={getInputType()}
          value={getDisplayValue()}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`banking-input ${error ? 'error' : ''} ${getIcon() ? 'banking-pl-8' : ''}`}
        />
        
        {type === 'percentage' && (
          <div className="banking-absolute banking-inset-y-0 banking-right-0 banking-pr-3 banking-flex banking-items-center banking-pointer-events-none">
            <Percent size={16} className="banking-text-secondary" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="banking-text-xs banking-text-error banking-mt-1">{error}</p>
      )}
      
      {helpText && !error && (
        <p className="banking-text-xs banking-text-secondary banking-mt-1">{helpText}</p>
      )}
    </div>
  );
};

export default BankingInput;
