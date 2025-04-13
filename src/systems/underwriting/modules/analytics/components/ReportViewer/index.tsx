import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ReportViewerProps {
  isLoading: boolean;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading reports...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Report Viewer</CardTitle>
          <CardDescription>View and manage saved reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Report Viewer component will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportViewer;
