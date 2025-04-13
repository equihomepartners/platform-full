import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PipelineDashboard } from './modules/pipeline/components';
import { UnderwritingDashboard as UnderwritingDashboardNew } from './modules/underwriting/components';
import { MarketingDashboard } from './modules/marketing/components';
import { AnalyticsDashboard } from './modules/analytics/components';

const UnderwritingSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pipeline');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Equihome Underwriting System</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="pipeline">Pipeline Management</TabsTrigger>
          <TabsTrigger value="underwriting">Underwriting & Origination</TabsTrigger>
          <TabsTrigger value="marketing">Sales & Marketing</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Reporting</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="mt-0">
          <PipelineDashboard />
        </TabsContent>

        <TabsContent value="underwriting" className="mt-0">
          <UnderwritingDashboardNew />
        </TabsContent>

        <TabsContent value="marketing" className="mt-0">
          <MarketingDashboard />
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <AnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnderwritingSystem;
