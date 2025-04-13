import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PerformanceMetric } from '../../types';

interface MetricsDashboardProps {
  metrics: PerformanceMetric[];
  isLoading: boolean;
}

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ metrics, isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading metrics...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Metrics Dashboard</CardTitle>
          <CardDescription>Key performance indicators and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-500">Metrics Dashboard component will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsDashboard;
