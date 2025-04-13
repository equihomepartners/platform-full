import React from 'react';
import { DollarSign, Percent } from 'lucide-react';
import { formatNumber, formatPercentage } from '../../utils/formatters';

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

const FundSettingsPanel: React.FC<FundSettingsPanelProps> = ({ settings, onChange, errors }) => {
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle different input types
    if (name === 'fund_size') {
      // Remove commas and convert to number
      const numericValue = parseFloat(value.replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        onChange(name, numericValue);
      }
    } else if (name.includes('_rate') || name.includes('percentage')) {
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
        <h3 className="text-lg font-medium text-primary-900">Fund Settings</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Fund Size */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Fund Size ($)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="text"
                name="fund_size"
                value={formatNumber(settings.fund_size)}
                onChange={handleInputChange}
                className={`block w-full pl-8 pr-3 py-1.5 text-sm border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  errors.fund_size ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
              />
            </div>
            {errors.fund_size && (
              <p className="mt-1 text-xs text-red-600">{errors.fund_size}</p>
            )}
          </div>

          {/* Fund Term */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Fund Term (Years)</label>
            <input
              type="number"
              name="fund_term"
              value={settings.fund_term}
              onChange={handleInputChange}
              min={5}
              max={15}
              step={1}
              className={`block w-full px-3 py-1.5 text-sm border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                errors.fund_term ? 'border-red-300 bg-red-50' : 'border-neutral-300'
              }`}
            />
            {errors.fund_term && (
              <p className="mt-1 text-xs text-red-600">{errors.fund_term}</p>
            )}
          </div>

          {/* GP Investment Percentage */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">GP Investment (%)</label>
            <div className="relative">
              <input
                type="number"
                name="gp_investment_percentage"
                value={displayPercentage(settings.gp_investment_percentage)}
                onChange={handleInputChange}
                min={1}
                max={10}
                step={0.1}
                className={`block w-full pr-8 px-3 py-1.5 text-sm border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  errors.gp_investment_percentage ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Percent className="h-4 w-4 text-neutral-400" />
              </div>
            </div>
            {errors.gp_investment_percentage && (
              <p className="mt-1 text-xs text-red-600">{errors.gp_investment_percentage}</p>
            )}
          </div>

          {/* Management Fee Rate */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Management Fee (%)</label>
            <div className="relative">
              <input
                type="number"
                name="management_fee_rate"
                value={displayPercentage(settings.management_fee_rate)}
                onChange={handleInputChange}
                min={0.5}
                max={3}
                step={0.1}
                className={`block w-full pr-8 px-3 py-1.5 text-sm border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  errors.management_fee_rate ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Percent className="h-4 w-4 text-neutral-400" />
              </div>
            </div>
            {errors.management_fee_rate && (
              <p className="mt-1 text-xs text-red-600">{errors.management_fee_rate}</p>
            )}
          </div>

          {/* Hurdle Rate */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Hurdle Rate (%)</label>
            <div className="relative">
              <input
                type="number"
                name="hurdle_rate"
                value={displayPercentage(settings.hurdle_rate)}
                onChange={handleInputChange}
                min={4}
                max={8}
                step={0.1}
                className={`block w-full pr-8 px-3 py-1.5 text-sm border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  errors.hurdle_rate ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Percent className="h-4 w-4 text-neutral-400" />
              </div>
            </div>
            {errors.hurdle_rate && (
              <p className="mt-1 text-xs text-red-600">{errors.hurdle_rate}</p>
            )}
          </div>

          {/* Performance Fee Rate */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Performance Fee (%)</label>
            <div className="relative">
              <input
                type="number"
                name="performance_fee_rate"
                value={displayPercentage(settings.performance_fee_rate)}
                onChange={handleInputChange}
                min={10}
                max={30}
                step={1}
                className={`block w-full pr-8 px-3 py-1.5 text-sm border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  errors.performance_fee_rate ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Percent className="h-4 w-4 text-neutral-400" />
              </div>
            </div>
            {errors.performance_fee_rate && (
              <p className="mt-1 text-xs text-red-600">{errors.performance_fee_rate}</p>
            )}
          </div>

          {/* Origination Fee Rate */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Origination Fee (%)</label>
            <div className="relative">
              <input
                type="number"
                name="origination_fee_rate"
                value={displayPercentage(settings.origination_fee_rate)}
                onChange={handleInputChange}
                min={1}
                max={5}
                step={0.1}
                className={`block w-full pr-8 px-3 py-1.5 text-sm border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  errors.origination_fee_rate ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Percent className="h-4 w-4 text-neutral-400" />
              </div>
            </div>
            {errors.origination_fee_rate && (
              <p className="mt-1 text-xs text-red-600">{errors.origination_fee_rate}</p>
            )}
          </div>

          {/* Simple Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Simple Interest Rate (%)</label>
            <div className="relative">
              <input
                type="number"
                name="simple_interest_rate"
                value={displayPercentage(settings.simple_interest_rate)}
                onChange={handleInputChange}
                min={3}
                max={7}
                step={0.1}
                className={`block w-full pr-8 px-3 py-1.5 text-sm border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  errors.simple_interest_rate ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Percent className="h-4 w-4 text-neutral-400" />
              </div>
            </div>
            {errors.simple_interest_rate && (
              <p className="mt-1 text-xs text-red-600">{errors.simple_interest_rate}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundSettingsPanel;
