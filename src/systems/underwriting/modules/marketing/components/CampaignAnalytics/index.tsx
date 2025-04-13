import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CampaignAnalyticsProps {
  isLoading: boolean;
}

const CampaignAnalytics: React.FC<CampaignAnalyticsProps> = ({ isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Analytics</CardTitle>
          <CardDescription>Performance metrics for your email campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Campaign Analytics component will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignAnalytics;
