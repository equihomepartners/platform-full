import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import PerformanceMetrics from './PerformanceMetrics';
import FundParameters from './FundParameters';
import TrafficLightZones from './TrafficLightZones';
import FundStrategy from './FundStrategy';
import GeoPortfolio from './GeoPortfolio';
import UnderwriteDemo from './UnderwriteDemo';
import TechnicalInfrastructure from './TechnicalInfrastructure';

const CIODashboard: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <h1 className="text-4xl font-bold text-gray-900">
            CIO Dashboard
          </h1>
          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full font-mono">
            alpha
          </span>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Control center for our AI/ML underwriting system
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="parameters">Fund Parameters</TabsTrigger>
            <TabsTrigger value="zones">Traffic Light Zones</TabsTrigger>
            <TabsTrigger value="strategy">Fund Strategy</TabsTrigger>
            <TabsTrigger value="geography">Geographic Analysis</TabsTrigger>
            <TabsTrigger value="tech">Technical Infrastructure</TabsTrigger>
            <TabsTrigger value="underwrite">Underwrite Demo</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <PerformanceMetrics />
        </TabsContent>

        <TabsContent value="parameters">
          <FundParameters />
        </TabsContent>

        <TabsContent value="zones">
          <TrafficLightZones />
        </TabsContent>

        <TabsContent value="strategy">
          <FundStrategy />
        </TabsContent>

        <TabsContent value="geography">
          <GeoPortfolio />
        </TabsContent>

        <TabsContent value="tech">
          <TechnicalInfrastructure />
        </TabsContent>

        <TabsContent value="underwrite">
          <UnderwriteDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CIODashboard;