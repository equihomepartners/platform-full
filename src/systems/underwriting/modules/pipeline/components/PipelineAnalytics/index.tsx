import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Deal, PipelineAnalytics as PipelineAnalyticsType } from '../../types';

interface PipelineAnalyticsProps {
  deals: Deal[];
  isLoading: boolean;
}

const PipelineAnalytics: React.FC<PipelineAnalyticsProps> = ({ deals, isLoading }) => {
  // Generate analytics from deals
  const generateAnalytics = (deals: Deal[]): PipelineAnalyticsType => {
    // Calculate total deals
    const totalDeals = deals.length;
    
    // Calculate deals by status
    const statusCounts: Record<string, number> = {};
    deals.forEach(deal => {
      statusCounts[deal.status] = (statusCounts[deal.status] || 0) + 1;
    });
    
    const dealsByStatus = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      percentage: (count / totalDeals) * 100
    }));
    
    // Calculate conversion rates
    const conversionRates = [
      {
        stage: 'New to In-Review',
        rate: statusCounts['in-review'] ? (statusCounts['in-review'] / (statusCounts['new'] || 1)) * 100 : 0
      },
      {
        stage: 'In-Review to Underwriting',
        rate: statusCounts['underwriting'] ? (statusCounts['underwriting'] / (statusCounts['in-review'] || 1)) * 100 : 0
      },
      {
        stage: 'Underwriting to Approved',
        rate: statusCounts['approved'] ? (statusCounts['approved'] / (statusCounts['underwriting'] || 1)) * 100 : 0
      },
      {
        stage: 'Approved to Closed',
        rate: statusCounts['closed'] ? (statusCounts['closed'] / (statusCounts['approved'] || 1)) * 100 : 0
      }
    ];
    
    // Calculate average time by stage (mock data)
    const averageTimeByStage = [
      { stage: 'New to In-Review', time: 2.5 },
      { stage: 'In-Review to Underwriting', time: 3.2 },
      { stage: 'Underwriting to Approved', time: 1.8 },
      { stage: 'Approved to Closed', time: 5.5 }
    ];
    
    // Calculate top performing suburbs
    const suburbCounts: Record<string, { count: number; approved: number }> = {};
    deals.forEach(deal => {
      const suburb = deal.property.suburb;
      if (!suburbCounts[suburb]) {
        suburbCounts[suburb] = { count: 0, approved: 0 };
      }
      suburbCounts[suburb].count += 1;
      if (deal.status === 'approved' || deal.status === 'closed') {
        suburbCounts[suburb].approved += 1;
      }
    });
    
    const topPerformingSuburbs = Object.entries(suburbCounts)
      .map(([suburb, { count, approved }]) => ({
        suburb,
        count,
        approvalRate: (approved / count) * 100
      }))
      .sort((a, b) => b.approvalRate - a.approvalRate)
      .slice(0, 5);
    
    return {
      totalDeals,
      dealsByStatus,
      conversionRates,
      averageTimeByStage,
      topPerformingSuburbs
    };
  };

  const analytics = generateAnalytics(deals);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Deals</CardTitle>
            <CardDescription>All deals in the pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{analytics.totalDeals}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Deals</CardTitle>
            <CardDescription>Deals in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {analytics.dealsByStatus
                .filter(status => !['rejected', 'closed'].includes(status.status))
                .reduce((sum, status) => sum + status.count, 0)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Approval Rate</CardTitle>
            <CardDescription>Percentage of deals approved</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {analytics.dealsByStatus.find(status => status.status === 'approved')
                ? `${(analytics.dealsByStatus.find(status => status.status === 'approved')!.percentage).toFixed(1)}%`
                : '0%'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Avg. Processing Time</CardTitle>
            <CardDescription>Days from submission to decision</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {analytics.averageTimeByStage.reduce((sum, stage) => sum + stage.time, 0).toFixed(1)} days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Deals by Status</CardTitle>
            <CardDescription>Distribution of deals by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.dealsByStatus.map(status => (
                <div key={status.status} className="flex items-center">
                  <div className="w-1/3 font-medium capitalize">{status.status.replace('-', ' ')}</div>
                  <div className="w-2/3">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${status.percentage}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{status.count} ({status.percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rates</CardTitle>
            <CardDescription>Conversion rates between stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.conversionRates.map(rate => (
                <div key={rate.stage} className="flex items-center">
                  <div className="w-1/2 font-medium">{rate.stage}</div>
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: `${rate.rate}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{rate.rate.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Suburbs</CardTitle>
          <CardDescription>Suburbs with highest approval rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topPerformingSuburbs.map(suburb => (
              <div key={suburb.suburb} className="flex items-center">
                <div className="w-1/3 font-medium">{suburb.suburb}</div>
                <div className="w-1/3">
                  <div className="text-sm">{suburb.count} deals</div>
                </div>
                <div className="w-1/3">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${suburb.approvalRate}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm">{suburb.approvalRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PipelineAnalytics;
