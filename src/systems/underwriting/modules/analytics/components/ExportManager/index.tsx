import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ExportManagerProps {
  isLoading: boolean;
}

const ExportManager: React.FC<ExportManagerProps> = ({ isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading export manager...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Export Manager</CardTitle>
          <CardDescription>Export data in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Export Manager component will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportManager;
