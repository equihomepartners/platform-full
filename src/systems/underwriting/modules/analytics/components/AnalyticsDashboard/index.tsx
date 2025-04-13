import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AnalyticsOverview, PerformanceMetric } from '../../types';
import MetricsDashboard from '../MetricsDashboard';
import ReportBuilder from '../ReportBuilder';
import ReportViewer from '../ReportViewer';
import DashboardBuilder from '../DashboardBuilder';
import DashboardViewer from '../DashboardViewer';
import ExportManager from '../ExportManager';
import { formatCurrency } from '../../../../utils';

// Mock data for development
const mockAnalyticsOverview: AnalyticsOverview = {
  pipelineMetrics: {
    totalDeals: 45,
    activeDeals: 32,
    approvalRate: 85,
    averageProcessingTime: 7.5
  },
  underwritingMetrics: {
    totalApplications: 38,
    approvedApplications: 25,
    rejectedApplications: 8,
    averageLTV: 65.2,
    averageIRR: 9.2
  },
  marketingMetrics: {
    totalCampaigns: 5,
    totalLeads: 87,
    conversionRate: 12.5,
    averageROI: 320
  },
  overallMetrics: {
    totalLoans: 25,
    totalLoanAmount: 12500000,
    averageIRR: 9.2,
    portfolioGrowth: 15.5
  }
};

const mockPerformanceMetrics: PerformanceMetric[] = [
  {
    id: '1',
    name: 'Approval Rate',
    description: 'Percentage of applications approved',
    category: 'underwriting',
    value: 85,
    unit: '%',
    target: 80,
    threshold: {
      warning: 70,
      critical: 60
    },
    trend: {
      direction: 'up',
      percentage: 5
    },
    history: [
      { timestamp: '2023-08-01', value: 80 },
      { timestamp: '2023-09-01', value: 82 },
      { timestamp: '2023-10-01', value: 85 }
    ],
    lastUpdatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Average IRR',
    description: 'Average internal rate of return',
    category: 'overall',
    value: 9.2,
    unit: '%',
    target: 8,
    threshold: {
      warning: 7,
      critical: 6
    },
    trend: {
      direction: 'up',
      percentage: 2.2
    },
    history: [
      { timestamp: '2023-08-01', value: 8.8 },
      { timestamp: '2023-09-01', value: 9.0 },
      { timestamp: '2023-10-01', value: 9.2 }
    ],
    lastUpdatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Lead Conversion Rate',
    description: 'Percentage of leads converted to applications',
    category: 'marketing',
    value: 12.5,
    unit: '%',
    target: 10,
    threshold: {
      warning: 8,
      critical: 5
    },
    trend: {
      direction: 'up',
      percentage: 25
    },
    history: [
      { timestamp: '2023-08-01', value: 9.5 },
      { timestamp: '2023-09-01', value: 10.8 },
      { timestamp: '2023-10-01', value: 12.5 }
    ],
    lastUpdatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Average Processing Time',
    description: 'Average time to process an application (days)',
    category: 'pipeline',
    value: 7.5,
    unit: 'days',
    target: 7,
    threshold: {
      warning: 10,
      critical: 14
    },
    trend: {
      direction: 'down',
      percentage: 6.25
    },
    history: [
      { timestamp: '2023-08-01', value: 8.5 },
      { timestamp: '2023-09-01', value: 8.0 },
      { timestamp: '2023-10-01', value: 7.5 }
    ],
    lastUpdatedAt: new Date().toISOString()
  }
];

const AnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [analyticsOverview, setAnalyticsOverview] = useState<AnalyticsOverview>(mockAnalyticsOverview);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>(mockPerformanceMetrics);
  const [isLoading, setIsLoading] = useState(false);

  // In a real implementation, this would fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In production, these would be API calls
        // const overviewResponse = await fetch('/api/underwriting/analytics/overview');
        // const overviewData = await overviewResponse.json();
        // setAnalyticsOverview(overviewData);
        
        // const metricsResponse = await fetch('/api/underwriting/analytics/metrics');
        // const metricsData = await metricsResponse.json();
        // setPerformanceMetrics(metricsData.metrics);
        
        // For now, we'll use mock data
        setAnalyticsOverview(mockAnalyticsOverview);
        setPerformanceMetrics(mockPerformanceMetrics);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get trend color
  const getTrendColor = (direction: string) => {
    return direction === 'up' ? 'text-green-600' : direction === 'down' ? 'text-red-600' : 'text-gray-600';
  };

  // Get trend arrow
  const getTrendArrow = (direction: string) => {
    return direction === 'up' ? '↑' : direction === 'down' ? '↓' : '→';
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading analytics...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics & Reporting</h1>
        <Button>Generate Report</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="report-builder">Report Builder</TabsTrigger>
          <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
          <TabsTrigger value="exports">Exports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Loans</CardTitle>
                  <CardDescription>Approved loans</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{analyticsOverview.overallMetrics.totalLoans}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">Updated just now</p>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Loan Amount</CardTitle>
                  <CardDescription>Value of approved loans</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{formatCurrency(analyticsOverview.overallMetrics.totalLoanAmount)}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">Updated just now</p>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Average IRR</CardTitle>
                  <CardDescription>Internal rate of return</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{analyticsOverview.overallMetrics.averageIRR}%</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">Updated just now</p>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Portfolio Growth</CardTitle>
                  <CardDescription>Year-over-year growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{analyticsOverview.overallMetrics.portfolioGrowth}%</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">Updated just now</p>
                </CardFooter>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Pipeline Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Deals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analyticsOverview.pipelineMetrics.totalDeals}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Active Deals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analyticsOverview.pipelineMetrics.activeDeals}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Approval Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analyticsOverview.pipelineMetrics.approvalRate}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Avg. Processing Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analyticsOverview.pipelineMetrics.averageProcessingTime} days</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Underwriting Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analyticsOverview.underwritingMetrics.totalApplications}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Approved</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analyticsOverview.underwritingMetrics.approvedApplications}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Rejected</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analyticsOverview.underwritingMetrics.rejectedApplications}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Average LTV</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analyticsOverview.underwritingMetrics.averageLTV}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Average IRR</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analyticsOverview.underwritingMetrics.averageIRR}%</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Marketing Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analyticsOverview.marketingMetrics.totalCampaigns}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analyticsOverview.marketingMetrics.totalLeads}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analyticsOverview.marketingMetrics.conversionRate}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Average ROI</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{analyticsOverview.marketingMetrics.averageROI}%</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Key Performance Indicators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {performanceMetrics.map((metric) => (
                <Card key={metric.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{metric.name}</CardTitle>
                    <CardDescription>{metric.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <p className="text-3xl font-bold">{metric.value}{metric.unit}</p>
                      <div className={`flex items-center ${getTrendColor(metric.trend.direction)}`}>
                        <span className="text-2xl mr-1">{getTrendArrow(metric.trend.direction)}</span>
                        <span>{metric.trend.percentage}%</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-gray-500">Target: {metric.target}{metric.unit}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div 
                          className={`h-2.5 rounded-full ${
                            metric.value >= metric.target ? 'bg-green-600' : 
                            metric.value >= metric.threshold?.warning ? 'bg-yellow-500' : 'bg-red-600'
                          }`} 
                          style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Category: {metric.category.charAt(0).toUpperCase() + metric.category.slice(1)}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="mt-0">
          <MetricsDashboard metrics={performanceMetrics} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="reports" className="mt-0">
          <ReportViewer isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="report-builder" className="mt-0">
          <ReportBuilder isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="dashboards" className="mt-0">
          <DashboardViewer isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="exports" className="mt-0">
          <ExportManager isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
