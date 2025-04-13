import React from 'react';
import { Play, AlertTriangle, Loader, TrendingUp, BarChart2, PieChart, DollarSign, Percent } from 'lucide-react';
import { FundSettings, Portfolio, SimulationResult } from '../../types/portfolioTypes';

interface FundOverviewProps {
  portfolio: Portfolio | null;
  fundSettings: FundSettings | null;
  simulationResult: SimulationResult | null;
  onRunSimulation: () => void;
  loading: boolean;
  error: string | null;
  tfsData: any;
  tfsLoading: boolean;
  tfsError: string | null;
}

/**
 * Fund Overview Component
 * 
 * This component displays the overview of the fund simulation results.
 */
const FundOverview: React.FC<FundOverviewProps> = ({
  portfolio,
  fundSettings,
  simulationResult,
  onRunSimulation,
  loading,
  error,
  tfsData,
  tfsLoading,
  tfsError
}) => {
  if (!portfolio || !fundSettings) {
    return (
      <div className="bg-warning-50 text-warning-700 p-4 rounded-md">
        <p className="font-medium">Portfolio and Fund Settings Required</p>
        <p className="text-sm">Please generate a portfolio before viewing the fund overview.</p>
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

      {tfsError && (
        <div className="bg-warning-50 text-warning-700 p-4 rounded-md flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Traffic Light System Data Error</p>
            <p className="text-sm">{tfsError}</p>
            <p className="text-sm mt-1">Simulation will proceed without TFS data.</p>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-primary-800">Fund Overview</h3>
            <p className="text-sm text-neutral-600">
              {simulationResult ? 'Simulation results for ' : 'Run simulation for '} 
              {fundSettings.fund_name}
            </p>
          </div>
          <button
            onClick={onRunSimulation}
            disabled={loading}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              loading ? 'bg-neutral-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
          >
            {loading ? (
              <>
                <Loader size={16} className="animate-spin mr-1.5" />
                Running Simulation...
              </>
            ) : (
              <>
                <Play size={16} className="mr-1.5" />
                Run Simulation
              </>
            )}
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-primary-500 h-8 w-8" />
            <span className="ml-2 text-neutral-600">Running simulation...</span>
          </div>
        )}

        {!loading && simulationResult && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div className="flex items-center mb-2">
                  <Percent className="h-5 w-5 text-primary-600 mr-2" />
                  <h4 className="text-md font-medium text-primary-700">IRR</h4>
                </div>
                <p className="text-2xl font-bold text-primary-800">{simulationResult.results.irr}%</p>
                <p className="text-xs text-neutral-500 mt-1">Gross IRR: {simulationResult.results.gross_irr}%</p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-primary-600 mr-2" />
                  <h4 className="text-md font-medium text-primary-700">Equity Multiple</h4>
                </div>
                <p className="text-2xl font-bold text-primary-800">{simulationResult.results.equity_multiple.toFixed(2)}x</p>
                <p className="text-xs text-neutral-500 mt-1">MOIC: {simulationResult.results.moic.toFixed(2)}x</p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-5 w-5 text-primary-600 mr-2" />
                  <h4 className="text-md font-medium text-primary-700">Net Profit</h4>
                </div>
                <p className="text-2xl font-bold text-primary-800">${(simulationResult.results.net_profit / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-neutral-500 mt-1">ROI: {simulationResult.results.roi}%</p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div className="flex items-center mb-2">
                  <BarChart2 className="h-5 w-5 text-primary-600 mr-2" />
                  <h4 className="text-md font-medium text-primary-700">Risk Metrics</h4>
                </div>
                <p className="text-2xl font-bold text-primary-800">{simulationResult.results.sharpe_ratio.toFixed(2)}</p>
                <p className="text-xs text-neutral-500 mt-1">Sharpe Ratio</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <h4 className="text-md font-medium text-primary-700 mb-3">Cash Flows</h4>
                <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center border border-neutral-200">
                  <span className="text-neutral-500 text-sm">Cash Flow Chart</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <h4 className="text-md font-medium text-primary-700 mb-3">Portfolio Value</h4>
                <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center border border-neutral-200">
                  <span className="text-neutral-500 text-sm">Portfolio Value Chart</span>
                </div>
              </div>
            </div>

            {simulationResult.results.optimal_allocation && (
              <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <h4 className="text-md font-medium text-primary-700 mb-3">Optimal Allocation</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Suburb</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Zone</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Allocation (%)</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Expected Return (%)</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Risk Score</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                      {simulationResult.results.optimal_allocation.map((allocation, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{allocation.suburb}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              allocation.zone === 'green' ? 'bg-success-100 text-success-800' :
                              allocation.zone === 'yellow' ? 'bg-warning-100 text-warning-800' :
                              'bg-error-100 text-error-800'
                            }`}>
                              {allocation.zone.charAt(0).toUpperCase() + allocation.zone.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{allocation.allocation}%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{allocation.expected_return}%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{allocation.risk_score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {simulationResult.tfs_integration && (
              <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-md font-medium text-primary-700">Traffic Light System Integration</h4>
                  <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-xs font-medium">Integrated</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                    <p className="text-sm text-neutral-600">Suburbs Analyzed</p>
                    <p className="text-lg font-semibold text-primary-800">{simulationResult.tfs_integration.suburbs_count}</p>
                  </div>
                  <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                    <p className="text-sm text-neutral-600">Zone Distribution</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                        Green: {simulationResult.tfs_integration.zone_distribution.green}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
                        Yellow: {simulationResult.tfs_integration.zone_distribution.yellow}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
                        Red: {simulationResult.tfs_integration.zone_distribution.red}
                      </span>
                    </div>
                  </div>
                  <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                    <p className="text-sm text-neutral-600">Last Updated</p>
                    <p className="text-sm font-medium text-primary-800">
                      {new Date(simulationResult.tfs_integration.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!loading && !simulationResult && (
          <div className="text-center py-12 bg-neutral-50 rounded-lg border border-neutral-200">
            <Play className="h-16 w-16 text-primary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-primary-800 mb-2">Run Simulation</h3>
            <p className="text-neutral-600 max-w-md mx-auto mb-6">
              Click the "Run Simulation" button to run a simulation based on your fund settings and portfolio.
              {tfsData && " Traffic Light System data will be incorporated into the simulation."}
            </p>
            <button
              onClick={onRunSimulation}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Play size={16} className="mr-1.5" />
              Run Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundOverview;
