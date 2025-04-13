import React from 'react';
import { DollarSign, Percent, PieChart, TrendingUp } from 'lucide-react';
import { FundSettings, SimulationResult } from '../../types/portfolioTypes';

interface GPEconomicsProps {
  simulationResult: SimulationResult | null;
  fundSettings: FundSettings | null;
}

/**
 * GP Economics Component
 *
 * This component displays the economics for the General Partner.
 */
const GPEconomics: React.FC<GPEconomicsProps> = ({ simulationResult, fundSettings }) => {
  if (!simulationResult || !fundSettings) {
    return (
      <div className="bg-warning-50 text-warning-700 p-4 rounded-md">
        <p className="font-medium">Simulation Results Required</p>
        <p className="text-sm">Please run a simulation before viewing GP economics.</p>
      </div>
    );
  }

  const { gp_economics } = simulationResult;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <h3 className="text-lg font-semibold text-primary-800 mb-4">General Partner Economics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
            <div className="flex items-center mb-2">
              <Percent className="h-5 w-5 text-primary-600 mr-2" />
              <h4 className="text-md font-medium text-primary-700">GP IRR</h4>
            </div>
            <p className="text-2xl font-bold text-primary-800">{gp_economics.irr?.toFixed(1) || '0.0'}%</p>
            <p className="text-xs text-neutral-500 mt-1">Internal Rate of Return</p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-primary-600 mr-2" />
              <h4 className="text-md font-medium text-primary-700">GP Multiple</h4>
            </div>
            <p className="text-2xl font-bold text-primary-800">{gp_economics.multiple?.toFixed(2) || '0.00'}x</p>
            <p className="text-xs text-neutral-500 mt-1">Equity Multiple</p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-primary-600 mr-2" />
              <h4 className="text-md font-medium text-primary-700">GP Investment</h4>
            </div>
            <p className="text-2xl font-bold text-primary-800">${((gp_economics.investment || 0) / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-neutral-500 mt-1">{(fundSettings.gp_investment_percentage * 100).toFixed(1)}% of Fund Size</p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
            <div className="flex items-center mb-2">
              <Percent className="h-5 w-5 text-primary-600 mr-2" />
              <h4 className="text-md font-medium text-primary-700">GP ROI</h4>
            </div>
            <p className="text-2xl font-bold text-primary-800">{gp_economics.roi?.toFixed(1) || '0.0'}%</p>
            <p className="text-xs text-neutral-500 mt-1">Return on Investment</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold text-primary-800 mb-4">GP Revenue Streams</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <div>
                <p className="text-sm font-medium text-primary-700">Management Fees</p>
                <p className="text-xs text-neutral-500">
                  {(fundSettings.management_fee_rate * 100).toFixed(1)}% per year for {fundSettings.fund_term} years
                </p>
              </div>
              <p className="text-lg font-semibold text-primary-800">${(((fundSettings.fund_size || 0) * (fundSettings.management_fee_rate || 0) * (fundSettings.fund_term || 0)) / 1000000).toFixed(1)}M</p>
            </div>

            <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <div>
                <p className="text-sm font-medium text-primary-700">Carried Interest</p>
                <p className="text-xs text-neutral-500">
                  {(fundSettings.performance_fee_rate * 100).toFixed(1)}% of profits above {(fundSettings.hurdle_rate * 100).toFixed(1)}% hurdle
                </p>
              </div>
              <p className="text-lg font-semibold text-primary-800">${((gp_economics.carried_interest || 0) / 1000000).toFixed(1)}M</p>
            </div>

            <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <div>
                <p className="text-sm font-medium text-primary-700">GP Investment Return</p>
                <p className="text-xs text-neutral-500">
                  Return on {(fundSettings.gp_investment_percentage * 100).toFixed(1)}% GP investment
                </p>
              </div>
              <p className="text-lg font-semibold text-primary-800">
                ${(((gp_economics.investment || 0) * (gp_economics.multiple || 0) - (gp_economics.investment || 0)) / 1000000).toFixed(1)}M
              </p>
            </div>

            <div className="flex justify-between items-center p-3 bg-primary-50 rounded-lg border border-primary-200">
              <div>
                <p className="text-sm font-medium text-primary-700">Total GP Return</p>
                <p className="text-xs text-primary-500">
                  Total return to General Partner
                </p>
              </div>
              <p className="text-lg font-semibold text-primary-800">
                ${((gp_economics.total_return || 0) / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold text-primary-800 mb-4">GP Return Breakdown</h3>
          <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center border border-neutral-200">
            <PieChart className="h-8 w-8 text-neutral-400 mr-2" />
            <span className="text-neutral-500 text-sm">GP Return Breakdown Chart</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="p-2 bg-blue-50 rounded border border-blue-100 text-center">
              <p className="text-xs text-neutral-600">Management Fees</p>
              <p className="text-sm font-medium text-primary-700">
                {(((fundSettings.fund_size || 0) * (fundSettings.management_fee_rate || 0) * (fundSettings.fund_term || 0)) / ((gp_economics.total_return || 1)) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-2 bg-green-50 rounded border border-green-100 text-center">
              <p className="text-xs text-neutral-600">Carried Interest</p>
              <p className="text-sm font-medium text-primary-700">
                {(((gp_economics.carried_interest || 0) / (gp_economics.total_return || 1)) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-2 bg-purple-50 rounded border border-purple-100 text-center">
              <p className="text-xs text-neutral-600">Investment Return</p>
              <p className="text-sm font-medium text-primary-700">
                {((((gp_economics.investment || 0) * (gp_economics.multiple || 0) - (gp_economics.investment || 0)) / (gp_economics.total_return || 1)) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <h3 className="text-lg font-semibold text-primary-800 mb-4">GP Return Sensitivity</h3>
        <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center border border-neutral-200">
          <span className="text-neutral-500 text-sm">GP Return Sensitivity Chart</span>
        </div>
        <p className="text-sm text-neutral-600 mt-4">
          This chart shows how GP returns are affected by changes in key parameters such as fund performance,
          management fee rate, and carried interest rate.
        </p>
      </div>
    </div>
  );
};

export default GPEconomics;
