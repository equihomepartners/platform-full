import React from 'react';
import { DollarSign, Percent, Clock } from 'lucide-react';
import { formatNumber, formatPercentage } from '../../utils/formatters';

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

const LoanParametersPanel: React.FC<LoanParametersPanelProps> = ({ settings, onChange, errors }) => {
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle different input types
    if (name === 'average_property_value') {
      // Remove commas and convert to number
      const numericValue = parseFloat(value.replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        onChange(name, numericValue);
      }
    } else if (name.includes('_rate') || name === 'average_ltv') {
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

  // Format percentage for display (e.g., 0.05 -> 5%)
  const displayPercentage = (value: number) => {
    return (value * 100).toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3">
        <h3 className="text-lg font-medium text-primary-900">Loan Parameters</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Average Property Value */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Average Property Value ($)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="text"
                name="average_property_value"
                value={formatNumber(settings.average_property_value)}
                onChange={handleInputChange}
                className={`block w-full pl-8 pr-3 py-1.5 text-sm border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  errors.average_property_value ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
              />
            </div>
            {errors.average_property_value && (
              <p className="mt-1 text-xs text-red-600">{errors.average_property_value}</p>
            )}
          </div>

          {/* Average LTV */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Average LTV (%)</label>
            <div className="relative">
              <input
                type="number"
                name="average_ltv"
                value={displayPercentage(settings.average_ltv)}
                onChange={handleInputChange}
                min={20}
                max={60}
                step={1}
                className={`block w-full pr-8 px-3 py-1.5 text-sm border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  errors.average_ltv ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Percent className="h-4 w-4 text-neutral-400" />
              </div>
            </div>
            {errors.average_ltv && (
              <p className="mt-1 text-xs text-red-600">{errors.average_ltv}</p>
            )}
          </div>

          {/* Average Appreciation Rate */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Appreciation Rate (%)</label>
            <div className="relative">
              <input
                type="number"
                name="average_appreciation_rate"
                value={displayPercentage(settings.average_appreciation_rate)}
                onChange={handleInputChange}
                min={2}
                max={6}
                step={0.1}
                className={`block w-full pr-8 px-3 py-1.5 text-sm border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  errors.average_appreciation_rate ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Percent className="h-4 w-4 text-neutral-400" />
              </div>
            </div>
            {errors.average_appreciation_rate && (
              <p className="mt-1 text-xs text-red-600">{errors.average_appreciation_rate}</p>
            )}
          </div>

          {/* Average Exit Timeframe */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Exit Timeframe (Years)</label>
            <div className="relative">
              <input
                type="number"
                name="average_exit_timeframe"
                value={settings.average_exit_timeframe}
                onChange={handleInputChange}
                min={3}
                max={settings.fund_term}
                step={1}
                className={`block w-full pr-8 px-3 py-1.5 text-sm border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  errors.average_exit_timeframe ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Clock className="h-4 w-4 text-neutral-400" />
              </div>
            </div>
            {errors.average_exit_timeframe && (
              <p className="mt-1 text-xs text-red-600">{errors.average_exit_timeframe}</p>
            )}
            <p className="mt-1 text-xs text-neutral-500">
              When homeowners exit through sale or refinance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanParametersPanel;
