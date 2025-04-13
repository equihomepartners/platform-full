import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardBuilderProps {
  isLoading: boolean;
}

const DashboardBuilder: React.FC<DashboardBuilderProps> = ({ isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading dashboard builder...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Builder</CardTitle>
          <CardDescription>Create custom dashboards with drag-and-drop</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Dashboard Builder component will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardBuilder;
