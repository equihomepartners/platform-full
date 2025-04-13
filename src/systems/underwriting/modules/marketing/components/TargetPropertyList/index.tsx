import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TargetProperty } from '../../types';

interface TargetPropertyListProps {
  properties: TargetProperty[];
  isLoading: boolean;
}

const TargetPropertyList: React.FC<TargetPropertyListProps> = ({ properties, isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading properties...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Target Properties</CardTitle>
          <CardDescription>Properties in green zones for targeted marketing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Target Property List component will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TargetPropertyList;
