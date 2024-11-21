import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import FundInputs from './FundInputs';
import PortfolioModel from './PortfolioModel';
import RiskAnalysis from './RiskAnalysis';
import ScenarioAnalysis from './ScenarioAnalysis';
import PropTrackAnalysis from './PropTrackAnalysis';

const FundModelTabs: React.FC = () => {
  return (
    <Tabs defaultValue="inputs" className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList>
          <TabsTrigger value="inputs">Fund Inputs</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Model</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
          <TabsTrigger value="proptrack">PropTrack</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="inputs">
        <FundInputs />
      </TabsContent>

      <TabsContent value="portfolio">
        <PortfolioModel />
      </TabsContent>

      <TabsContent value="risk">
        <RiskAnalysis />
      </TabsContent>

      <TabsContent value="scenarios">
        <ScenarioAnalysis />
      </TabsContent>

      <TabsContent value="proptrack">
        <PropTrackAnalysis />
      </TabsContent>
    </Tabs>
  );
};

export default FundModelTabs;