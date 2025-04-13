import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LeadDetailProps {
  leadId?: string;
  isLoading: boolean;
}

const LeadDetail: React.FC<LeadDetailProps> = ({ leadId, isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading lead details...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lead Detail</CardTitle>
          <CardDescription>Detailed information about a lead</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Lead Detail component will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadDetail;
