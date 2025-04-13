import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EmailCampaign } from '../../types';

interface CampaignManagerProps {
  campaigns: EmailCampaign[];
  isLoading: boolean;
}

const CampaignManager: React.FC<CampaignManagerProps> = ({ campaigns, isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading campaigns...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Manager</CardTitle>
          <CardDescription>Manage your email marketing campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Campaign Manager component will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignManager;
