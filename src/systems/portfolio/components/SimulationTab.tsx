import React, { useState } from 'react';
import { Play, BarChart2, TrendingUp } from 'lucide-react';
import FullScreenSimulation from './simulation/FullScreenSimulation';

/**
 * Simulation Tab Component
 * 
 * This component serves as the entry point to the simulation engine.
 * It provides a button to launch the full-screen simulation.
 */
const SimulationTab: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const handleLaunchSimulation = () => {
    setIsFullScreen(true);
  };

  const handleCloseSimulation = () => {
    setIsFullScreen(false);
  };

  return (
    <>
      {isFullScreen ? (
        <FullScreenSimulation onClose={handleCloseSimulation} />
      ) : (
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary-800 mb-4">Portfolio Simulation Engine</h1>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Model and analyze fund performance with our advanced financial simulation tools.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-800 mb-2">Fund Modeling</h3>
                  <p className="text-neutral-600">
                    Configure fund parameters and model different investment strategies.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart2 className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-800 mb-2">Portfolio Generation</h3>
                  <p className="text-neutral-600">
                    Generate realistic loan portfolios with customizable distributions.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-800 mb-2">Financial Analysis</h3>
                  <p className="text-neutral-600">
                    Analyze fund performance, GP/LP economics, and risk metrics.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleLaunchSimulation}
                  className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium"
                >
                  Launch Simulation Engine
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold text-primary-800 mb-4">About the Simulation Engine</h2>
              <p className="text-neutral-600 mb-4">
                The Portfolio Simulation Engine is a sophisticated financial modeling tool designed for real estate investment funds. 
                It focuses on modeling a 10-year loan product for single-family properties with no monthly payments.
              </p>
              <p className="text-neutral-600 mb-4">
                Key features include fund settings configuration, portfolio generation with realistic distributions, 
                financial calculations (IRR, NPV, compound interest), waterfall distribution between GPs and LPs, 
                and risk metrics calculation (Sharpe ratio, Sortino ratio, VaR).
              </p>
              <p className="text-neutral-600">
                The engine integrates with the Traffic Light System to incorporate suburb classifications, 
                risk assessments, and growth forecasts into the portfolio simulation.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimulationTab;
