import React from 'react';
import { DollarSign, Percent, PieChart, TrendingUp } from 'lucide-react';
import { FundSettings, SimulationResult } from '../../types/portfolioTypes';

interface LPEconomicsProps {
  simulationResult: SimulationResult | null;
  fundSettings: FundSettings | null;
}

/**
 * LP Economics Component
 * 
 * This component displays the economics for the Limited Partner.
 */
const LPEconomics: React.FC<LPEconomicsProps> = ({ simulationResult, fundSettings }) => {
  if (!simulationResult || !fundSettings) {
    return (
      <div className="bg-warning-50 text-warning-700 p-4 rounded-md">
        <p className="font-medium">Simulation Results Required</p>
        <p className="text-sm">Please run a simulation before viewing LP economics.</p>
      </div>
    );
  }

  const { lp_economics } = simulationResult;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <h3 className="text-lg font-semibold text-primary-800 mb-4">Limited Partner Economics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
            <div className="flex items-center mb-2">
              <Percent className="h-5 w-5 text-primary-600 mr-2" />
              <h4 className="text-md font-medium text-primary-700">LP IRR</h4>
            </div>
            <p className="text-2xl font-bold text-primary-800">{lp_economics.lp_irr.toFixed(1)}%</p>
            <p className="text-xs text-neutral-500 mt-1">Internal Rate of Return</p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-primary-600 mr-2" />
              <h4 className="text-md font-medium text-primary-700">LP Multiple</h4>
            </div>
            <p className="text-2xl font-bold text-primary-800">{lp_economics.lp_multiple.toFixed(2)}x</p>
            <p className="text-xs text-neutral-500 mt-1">Equity Multiple</p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-primary-600 mr-2" />
              <h4 className="text-md font-medium text-primary-700">LP Investment</h4>
            </div>
            <p className="text-2xl font-bold text-primary-800">${(lp_economics.lp_investment / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-neutral-500 mt-1">{(100 - fundSettings.gp_investment_percentage * 100).toFixed(1)}% of Fund Size</p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
            <div className="flex items-center mb-2">
              <Percent className="h-5 w-5 text-primary-600 mr-2" />
              <h4 className="text-md font-medium text-primary-700">LP ROI</h4>
            </div>
            <p className="text-2xl font-bold text-primary-800">{lp_economics.lp_roi.toFixed(1)}%</p>
            <p className="text-xs text-neutral-500 mt-1">Return on Investment</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold text-primary-800 mb-4">LP Return Waterfall</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <div>
                <p className="text-sm font-medium text-primary-700">Return of Capital</p>
                <p className="text-xs text-neutral-500">
                  100% return of initial investment
                </p>
              </div>
              <p className="text-lg font-semibold text-primary-800">${(lp_economics.lp_investment / 1000000).toFixed(1)}M</p>
            </div>

            <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <div>
                <p className="text-sm font-medium text-primary-700">Preferred Return</p>
                <p className="text-xs text-neutral-500">
                  {(fundSettings.hurdle_rate * 100).toFixed(1)}% hurdle rate
                </p>
              </div>
              <p className="text-lg font-semibold text-primary-800">${(lp_economics.preferred_return / 1000000).toFixed(1)}M</p>
            </div>

            <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <div>
                <p className="text-sm font-medium text-primary-700">Residual Profits</p>
                <p className="text-xs text-neutral-500">
                  {(100 - fundSettings.performance_fee_rate * 100).toFixed(1)}% of profits above hurdle
                </p>
              </div>
              <p className="text-lg font-semibold text-primary-800">
                ${((lp_economics.lp_investment * lp_economics.lp_multiple - lp_economics.lp_investment - lp_economics.preferred_return) / 1000000).toFixed(1)}M
              </p>
            </div>

            <div className="flex justify-between items-center p-3 bg-primary-50 rounded-lg border border-primary-200">
              <div>
                <p className="text-sm font-medium text-primary-700">Total LP Return</p>
                <p className="text-xs text-primary-500">
                  Total return to Limited Partners
                </p>
              </div>
              <p className="text-lg font-semibold text-primary-800">
                ${(lp_economics.lp_investment * lp_economics.lp_multiple / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h3 className="text-lg font-semibold text-primary-800 mb-4">LP Return Breakdown</h3>
          <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center border border-neutral-200">
            <PieChart className="h-8 w-8 text-neutral-400 mr-2" />
            <span className="text-neutral-500 text-sm">LP Return Breakdown Chart</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="p-2 bg-blue-50 rounded border border-blue-100 text-center">
              <p className="text-xs text-neutral-600">Return of Capital</p>
              <p className="text-sm font-medium text-primary-700">
                {((lp_economics.lp_investment / (lp_economics.lp_investment * lp_economics.lp_multiple)) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-2 bg-green-50 rounded border border-green-100 text-center">
              <p className="text-xs text-neutral-600">Preferred Return</p>
              <p className="text-sm font-medium text-primary-700">
                {((lp_economics.preferred_return / (lp_economics.lp_investment * lp_economics.lp_multiple)) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-2 bg-purple-50 rounded border border-purple-100 text-center">
              <p className="text-xs text-neutral-600">Residual Profits</p>
              <p className="text-sm font-medium text-primary-700">
                {(((lp_economics.lp_investment * lp_economics.lp_multiple - lp_economics.lp_investment - lp_economics.preferred_return) / (lp_economics.lp_investment * lp_economics.lp_multiple)) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <h3 className="text-lg font-semibold text-primary-800 mb-4">LP Return Comparison</h3>
        <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center border border-neutral-200">
          <span className="text-neutral-500 text-sm">LP Return Comparison Chart</span>
        </div>
        <p className="text-sm text-neutral-600 mt-4">
          This chart compares the LP returns to other investment alternatives such as public equities, 
          fixed income, and other real estate investments.
        </p>
      </div>
    </div>
  );
};

export default LPEconomics;
