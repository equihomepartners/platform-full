import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

import { Loader } from 'lucide-react';
import FundSettings from './FundSettings';
import PortfolioGeneration from './PortfolioGeneration';
import FundOverview from './FundOverview';
import GPEconomics from './GPEconomics';
import LPEconomics from './LPEconomics';
import { simulationApiClient } from '../../services/simulationApiClient';
import { mockTfsIntegration } from '../../services/mockTfsIntegration';
import { FundSettings as FundSettingsType, Portfolio, SimulationResult } from '../../types/portfolioTypes';

/**
 * Simulation Layout Component
 *
 * This component serves as the main layout for the simulation engine.
 * It manages the state and navigation between different simulation steps.
 */
const SimulationLayout: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<string>('fund-settings');

  // State for simulation data
  const [fundSettings, setFundSettings] = useState<FundSettingsType | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [tfsData, setTfsData] = useState<any>(null);

  // Loading states
  const [loadingSettings, setLoadingSettings] = useState<boolean>(true);
  const [loadingPortfolio, setLoadingPortfolio] = useState<boolean>(false);
  const [loadingSimulation, setLoadingSimulation] = useState<boolean>(false);
  const [loadingTfsData, setLoadingTfsData] = useState<boolean>(false);

  // Error states
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [portfolioError, setPortfolioError] = useState<string | null>(null);
  const [simulationError, setSimulationError] = useState<string | null>(null);
  const [tfsError, setTfsError] = useState<string | null>(null);

  // User journey state
  const [userJourney, setUserJourney] = useState<{
    fundSettingsComplete: boolean;
    portfolioGenerationComplete: boolean;
    simulationComplete: boolean;
  }>({
    fundSettingsComplete: false,
    portfolioGenerationComplete: false,
    simulationComplete: false
  });

  // Load fund settings on component mount
  useEffect(() => {
    const loadFundSettings = async () => {
      setLoadingSettings(true);
      setSettingsError(null);

      try {
        const settings = await simulationApiClient.getFundSettings();
        setFundSettings(settings);
        setUserJourney(prev => ({ ...prev, fundSettingsComplete: true }));
      } catch (error) {
        console.error('Error loading fund settings:', error);
        setSettingsError('Failed to load fund settings. Please try again.');
      } finally {
        setLoadingSettings(false);
      }
    };

    loadFundSettings();
  }, []);

  // Load TFS data
  useEffect(() => {
    const loadTfsData = async () => {
      setLoadingTfsData(true);
      setTfsError(null);

      try {
        const data = await mockTfsIntegration.getAllTFSDataForSimulation();
        const transformedData = mockTfsIntegration.transformTFSDataForPortfolioOptimization(data);
        setTfsData(transformedData);
      } catch (error) {
        console.error('Error loading TFS data:', error);
        setTfsError('Failed to load Traffic Light System data. Please try again.');
      } finally {
        setLoadingTfsData(false);
      }
    };

    loadTfsData();
  }, []);

  // Handle fund settings save
  const handleSaveFundSettings = async (settings: FundSettingsType) => {
    setLoadingSettings(true);
    setSettingsError(null);

    try {
      const savedSettings = await simulationApiClient.saveFundSettings(settings);
      setFundSettings(savedSettings);
      setUserJourney(prev => ({ ...prev, fundSettingsComplete: true }));
      setActiveTab('portfolio-generation');
    } catch (error) {
      console.error('Error saving fund settings:', error);
      setSettingsError('Failed to save fund settings. Please try again.');
    } finally {
      setLoadingSettings(false);
    }
  };

  // Handle portfolio generation
  const handleGeneratePortfolio = async (params: any) => {
    setLoadingPortfolio(true);
    setPortfolioError(null);

    try {
      const generatedPortfolio = await simulationApiClient.generatePortfolio(params);
      setPortfolio(generatedPortfolio);
      setUserJourney(prev => ({ ...prev, portfolioGenerationComplete: true }));
      setActiveTab('fund-overview');
    } catch (error) {
      console.error('Error generating portfolio:', error);
      setPortfolioError('Failed to generate portfolio. Please try again.');
    } finally {
      setLoadingPortfolio(false);
    }
  };

  // Handle simulation run
  const handleRunSimulation = async () => {
    if (!portfolio || !fundSettings) {
      setSimulationError('Portfolio and fund settings are required to run simulation.');
      return;
    }

    setLoadingSimulation(true);
    setSimulationError(null);

    try {
      // Prepare simulation parameters
      const params = {
        portfolio,
        fundSettings,
        tfsData: tfsData || null
      };

      // Run simulation
      const result = await simulationApiClient.runSimulation(params);
      setSimulationResult(result);
      setUserJourney(prev => ({ ...prev, simulationComplete: true }));
    } catch (error) {
      console.error('Error running simulation:', error);
      setSimulationError('Failed to run simulation. Please try again.');
    } finally {
      setLoadingSimulation(false);
    }
  };

  // Render loading state
  if (loadingSettings && !fundSettings) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-primary-500 h-8 w-8" />
        <span className="ml-2 text-neutral-600">Loading simulation engine...</span>
      </div>
    );
  }

  // Render error state
  if (settingsError && !fundSettings) {
    return (
      <div className="bg-error-50 text-error-700 p-4 rounded-md">
        <h2 className="text-lg font-medium mb-2">Error Loading Simulation Engine</h2>
        <p>{settingsError}</p>
        <button
          className="px-4 py-2 mt-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <p className="text-neutral-600">
          Model and analyze fund performance with our advanced simulation engine.
        </p>
      </div>
      <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger
                value="fund-settings"
                disabled={loadingSettings}
              >
                Fund Settings
              </TabsTrigger>
              <TabsTrigger
                value="portfolio-generation"
                disabled={!userJourney.fundSettingsComplete || loadingPortfolio}
              >
                Portfolio Generation
              </TabsTrigger>
              <TabsTrigger
                value="fund-overview"
                disabled={!userJourney.portfolioGenerationComplete || loadingSimulation}
              >
                Fund Overview
              </TabsTrigger>
              <TabsTrigger
                value="gp-economics"
                disabled={!userJourney.simulationComplete}
              >
                GP Economics
              </TabsTrigger>
              <TabsTrigger
                value="lp-economics"
                disabled={!userJourney.simulationComplete}
              >
                LP Economics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fund-settings">
              <FundSettings
                initialSettings={fundSettings}
                onSave={handleSaveFundSettings}
                loading={loadingSettings}
                error={settingsError}
              />
            </TabsContent>

            <TabsContent value="portfolio-generation">
              <PortfolioGeneration
                fundSettings={fundSettings}
                onGenerate={handleGeneratePortfolio}
                loading={loadingPortfolio}
                error={portfolioError}
                portfolio={portfolio}
              />
            </TabsContent>

            <TabsContent value="fund-overview">
              <FundOverview
                portfolio={portfolio}
                fundSettings={fundSettings}
                simulationResult={simulationResult}
                onRunSimulation={handleRunSimulation}
                loading={loadingSimulation}
                error={simulationError}
                tfsData={tfsData}
                tfsLoading={loadingTfsData}
                tfsError={tfsError}
              />
            </TabsContent>

            <TabsContent value="gp-economics">
              <GPEconomics
                simulationResult={simulationResult}
                fundSettings={fundSettings}
              />
            </TabsContent>

            <TabsContent value="lp-economics">
              <LPEconomics
                simulationResult={simulationResult}
                fundSettings={fundSettings}
              />
            </TabsContent>
          </Tabs>
        </div>
    </div>
  );
};

export default SimulationLayout;
