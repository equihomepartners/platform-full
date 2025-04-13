import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardViewerProps {
  isLoading: boolean;
}

const DashboardViewer: React.FC<DashboardViewerProps> = ({ isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading dashboards...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Viewer</CardTitle>
          <CardDescription>View and manage saved dashboards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Dashboard Viewer component will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardViewer;
