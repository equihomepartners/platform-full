import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TargetProperty } from '../../types';

interface CampaignCreatorProps {
  properties: TargetProperty[];
  isLoading: boolean;
}

const CampaignCreator: React.FC<CampaignCreatorProps> = ({ properties, isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading properties...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Creator</CardTitle>
          <CardDescription>Create a new email marketing campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Campaign Creator component will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignCreator;
