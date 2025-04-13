import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ReportBuilderProps {
  isLoading: boolean;
}

const ReportBuilder: React.FC<ReportBuilderProps> = ({ isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading report builder...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Report Builder</CardTitle>
          <CardDescription>Create custom reports with drag-and-drop</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Report Builder component will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportBuilder;
