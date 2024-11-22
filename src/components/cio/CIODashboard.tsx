import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrafficLightZones from './TrafficLightZones';
import FrontrunSuburbs from './FrontrunSuburbs';
import FundParameters from './FundParameters';

const CIODashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-4xl font-bold">CIO Dashboard</h1>
          <span className="text-green-600 text-sm">alpha</span>
        </div>
        <p className="text-gray-600 text-xl mt-2">Control center for our AI/ML underwriting system</p>
      </div>

      <Tabs defaultValue="fund-parameters">
        <TabsList>
          <TabsTrigger value="fund-parameters">
            Fund Parameters
          </TabsTrigger>
          <TabsTrigger value="traffic-light">
            Traffic Light Zones
          </TabsTrigger>
          <TabsTrigger value="frontrun">
            Frontrun Suburbs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fund-parameters">
          <FundParameters />
        </TabsContent>

        <TabsContent value="traffic-light">
          <TrafficLightZones />
        </TabsContent>

        <TabsContent value="frontrun">
          <FrontrunSuburbs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CIODashboard;