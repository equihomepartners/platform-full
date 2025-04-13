import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lead } from '../../types';

interface LeadManagerProps {
  leads: Lead[];
  isLoading: boolean;
}

const LeadManager: React.FC<LeadManagerProps> = ({ leads, isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading leads...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lead Manager</CardTitle>
          <CardDescription>Manage and track leads from marketing campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Lead Manager component will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadManager;
