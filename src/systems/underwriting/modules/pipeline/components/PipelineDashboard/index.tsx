import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Deal } from '../../types';
import DealList from '../DealList';
import DealRanking from '../DealRanking';
import TaskManager from '../TaskManager';
import PipelineAnalytics from '../PipelineAnalytics';

// Mock data for development
const mockDeals: Deal[] = [
  {
    id: '1',
    status: 'new',
    submittedAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    borrower: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '0412 345 678',
      annualIncome: 150000,
      employmentStatus: 'employed'
    },
    property: {
      address: '123 Main St',
      suburb: 'Mosman',
      state: 'NSW',
      postcode: '2088',
      type: 'house',
      bedrooms: 4,
      bathrooms: 2,
      landSize: 500,
      currentValue: 2500000,
      mortgageBalance: 1000000
    },
    loan: {
      amount: 500000,
      purpose: 'renovation',
      term: 10
    }
  },
  {
    id: '2',
    status: 'in-review',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    borrower: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '0412 987 654',
      annualIncome: 180000,
      employmentStatus: 'self-employed'
    },
    property: {
      address: '456 High St',
      suburb: 'Double Bay',
      state: 'NSW',
      postcode: '2028',
      type: 'apartment',
      bedrooms: 3,
      bathrooms: 2,
      landSize: 0,
      currentValue: 1800000,
      mortgageBalance: 900000
    },
    loan: {
      amount: 300000,
      purpose: 'investment',
      term: 10
    }
  },
  {
    id: '3',
    status: 'underwriting',
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    borrower: {
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '0413 456 789',
      annualIncome: 200000,
      employmentStatus: 'employed'
    },
    property: {
      address: '789 Beach Rd',
      suburb: 'Bondi',
      state: 'NSW',
      postcode: '2026',
      type: 'house',
      bedrooms: 5,
      bathrooms: 3,
      landSize: 600,
      currentValue: 3200000,
      mortgageBalance: 1500000
    },
    loan: {
      amount: 800000,
      purpose: 'renovation',
      term: 10
    }
  }
];

const PipelineDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('deals');
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [isLoading, setIsLoading] = useState(false);

  // In a real implementation, this would fetch data from the API
  useEffect(() => {
    const fetchDeals = async () => {
      setIsLoading(true);
      try {
        // In production, this would be an API call
        // const response = await fetch('/api/underwriting/pipeline/deals');
        // const data = await response.json();
        // setDeals(data.deals);
        
        // For now, we'll use mock data
        setDeals(mockDeals);
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pipeline Management</h1>
        <Button>New Application</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Deals</CardTitle>
            <CardDescription>All deals in the pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{deals.length}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Updated just now</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Deals</CardTitle>
            <CardDescription>Deals in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {deals.filter(deal => deal.status !== 'closed' && deal.status !== 'rejected').length}
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Updated just now</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Approval Rate</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">85%</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Updated just now</p>
          </CardFooter>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="deals" className="mt-0">
          <DealList deals={deals} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="ranking" className="mt-0">
          <DealRanking deals={deals} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="tasks" className="mt-0">
          <TaskManager deals={deals} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <PipelineAnalytics deals={deals} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PipelineDashboard;
