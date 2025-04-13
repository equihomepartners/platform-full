import React, { useState, useEffect } from 'react';
import { Save, AlertTriangle, Loader } from 'lucide-react';
import { FundSettings as FundSettingsType } from '../../types/portfolioTypes';

interface FundSettingsProps {
  initialSettings: FundSettingsType | null;
  onSave: (settings: FundSettingsType) => void;
  loading: boolean;
  error: string | null;
}

/**
 * Fund Settings Component
 *
 * This component allows users to configure fund settings for simulation.
 */
const FundSettings: React.FC<FundSettingsProps> = ({ initialSettings, onSave, loading, error }) => {
  const [settings, setSettings] = useState<FundSettingsType | null>(initialSettings);
  const [formTouched, setFormTouched] = useState<boolean>(false);

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const handleChange = (field: keyof FundSettingsType, value: any) => {
    if (!settings) return;

    setSettings({
      ...settings,
      [field]: value
    });
    setFormTouched(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (settings) {
      onSave(settings);
    }
  };

  if (!settings) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-primary-500 h-8 w-8" />
        <span className="ml-2 text-neutral-600">Loading fund settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-error-50 text-error-700 p-4 rounded-md flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Fund Information */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold text-primary-800 mb-4">Fund Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Fund Name
              </label>
              <input
                type="text"
                value={settings.fund_name}
                onChange={(e) => handleChange('fund_name', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Fund Size ($)
              </label>
              <input
                type="number"
                value={settings.fund_size || ''}
                onChange={(e) => handleChange('fund_size', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Fund Term (years)
              </label>
              <input
                type="number"
                value={settings.fund_term || ''}
                onChange={(e) => handleChange('fund_term', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Fund Type
              </label>
              <select
                value={settings.fund_type}
                onChange={(e) => handleChange('fund_type', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="closed">Closed</option>
                <option value="open">Open</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Vintage Year
              </label>
              <input
                type="number"
                value={settings.vintage_year || ''}
                onChange={(e) => handleChange('vintage_year', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Time Horizon (years)
              </label>
              <input
                type="number"
                value={settings.time_horizon || ''}
                onChange={(e) => handleChange('time_horizon', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Fee Structure */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold text-primary-800 mb-4">Fee Structure</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Management Fee Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={(settings.management_fee_rate || 0) * 100}
                onChange={(e) => handleChange('management_fee_rate', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Current: {((settings.management_fee_rate || 0) * 100).toFixed(1)}%</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Hurdle Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="20"
                value={(settings.hurdle_rate || 0) * 100}
                onChange={(e) => handleChange('hurdle_rate', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Current: {((settings.hurdle_rate || 0) * 100).toFixed(1)}%</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Performance Fee Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="50"
                value={(settings.performance_fee_rate || 0) * 100}
                onChange={(e) => handleChange('performance_fee_rate', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Current: {((settings.performance_fee_rate || 0) * 100).toFixed(1)}%</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Origination Fee Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={(settings.origination_fee_rate || 0) * 100}
                onChange={(e) => handleChange('origination_fee_rate', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Current: {((settings.origination_fee_rate || 0) * 100).toFixed(1)}%</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Simple Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="20"
                value={(settings.simple_interest_rate || 0) * 100}
                onChange={(e) => handleChange('simple_interest_rate', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Current: {((settings.simple_interest_rate || 0) * 100).toFixed(1)}%</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                GP Investment Percentage (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={(settings.gp_investment_percentage || 0) * 100}
                onChange={(e) => handleChange('gp_investment_percentage', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Current: {((settings.gp_investment_percentage || 0) * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* Capital Calls */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold text-primary-800 mb-4">Capital Calls</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Capital Call Schedule
            </label>
            <select
              value={settings.capital_call_schedule}
              onChange={(e) => handleChange('capital_call_schedule', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="upfront">Upfront</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {settings.capital_call_schedule === 'custom' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Initial Investment ($)
                  </label>
                  <input
                    type="number"
                    value={settings.initial_investment}
                    onChange={(e) => handleChange('initial_investment', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Call 1 Date (months)
                  </label>
                  <input
                    type="number"
                    value={settings.call1_date}
                    onChange={(e) => handleChange('call1_date', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Call 1 Amount ($)
                  </label>
                  <input
                    type="number"
                    value={settings.call1_amount}
                    onChange={(e) => handleChange('call1_amount', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Call 2 Date (months)
                  </label>
                  <input
                    type="number"
                    value={settings.call2_date}
                    onChange={(e) => handleChange('call2_date', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Call 2 Amount ($)
                  </label>
                  <input
                    type="number"
                    value={settings.call2_amount}
                    onChange={(e) => handleChange('call2_amount', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Call 3 Date (months)
                  </label>
                  <input
                    type="number"
                    value={settings.call3_date}
                    onChange={(e) => handleChange('call3_date', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Call 3 Amount ($)
                  </label>
                  <input
                    type="number"
                    value={settings.call3_amount}
                    onChange={(e) => handleChange('call3_amount', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Call 4 Date (months)
                  </label>
                  <input
                    type="number"
                    value={settings.call4_date}
                    onChange={(e) => handleChange('call4_date', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Call 4 Amount ($)
                  </label>
                  <input
                    type="number"
                    value={settings.call4_amount}
                    onChange={(e) => handleChange('call4_amount', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loan Parameters */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold text-primary-800 mb-4">Loan Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Average Property Value ($)
              </label>
              <input
                type="number"
                value={settings.average_property_value}
                onChange={(e) => handleChange('average_property_value', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Average LTV (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={(settings.average_ltv || 0) * 100}
                onChange={(e) => handleChange('average_ltv', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Current: {((settings.average_ltv || 0) * 100).toFixed(1)}%</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Max LTV (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={(settings.max_ltv || 0) * 100}
                onChange={(e) => handleChange('max_ltv', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Current: {((settings.max_ltv || 0) * 100).toFixed(1)}%</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Green Zone Allocation (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={(settings.green_zone_allocation || 0) * 100}
                onChange={(e) => handleChange('green_zone_allocation', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Current: {((settings.green_zone_allocation || 0) * 100).toFixed(1)}%</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Orange Zone Allocation (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={(settings.orange_zone_allocation || 0) * 100}
                onChange={(e) => handleChange('orange_zone_allocation', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Current: {((settings.orange_zone_allocation || 0) * 100).toFixed(1)}%</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Red Zone Allocation (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={(settings.red_zone_allocation || 0) * 100}
                onChange={(e) => handleChange('red_zone_allocation', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Current: {((settings.red_zone_allocation || 0) * 100).toFixed(1)}%</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Early Exit Probability (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={(settings.early_exit_probability || 0) * 100}
                onChange={(e) => handleChange('early_exit_probability', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              <p className="text-xs text-neutral-500 mt-1">Current: {((settings.early_exit_probability || 0) * 100).toFixed(1)}%</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Average Exit Year
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="10"
                value={settings.average_exit_year || ''}
                onChange={(e) => handleChange('average_exit_year', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Exit Year Std Dev
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="5"
                value={settings.exit_year_std_dev}
                onChange={(e) => handleChange('exit_year_std_dev', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Reinvestment Cap Year
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={settings.reinvestment_cap_year}
                onChange={(e) => handleChange('reinvestment_cap_year', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !formTouched}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              loading || !formTouched ? 'bg-neutral-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
          >
            {loading ? (
              <>
                <Loader size={16} className="animate-spin mr-1.5" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} className="mr-1.5" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FundSettings;
