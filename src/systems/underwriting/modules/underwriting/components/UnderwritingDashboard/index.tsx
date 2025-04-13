import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LoanApplication } from '../../types';
import ApplicationForm from '../ApplicationForm';
import ApplicationDetail from '../ApplicationDetail';
import PropertyEvaluation from '../PropertyEvaluation';
import RiskAssessment from '../RiskAssessment';
import DecisionEngine from '../DecisionEngine';
import TermSheetGenerator from '../TermSheetGenerator';
import DocumentManager from '../DocumentManager';

// Mock data for development
const mockApplications: LoanApplication[] = [
  {
    id: '1',
    status: 'submitted',
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
    status: 'approved',
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
    },
    decision: {
      id: '1',
      applicationId: '3',
      decision: 'approved',
      decisionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      decisionBy: 'system',
      automated: true,
      overridden: false,
      terms: {
        amount: 800000,
        interestRate: 5,
        term: 10,
        originationFee: 3,
        appreciationShare: 20
      },
      conditions: [
        'Property valuation must be confirmed',
        'Borrower must provide proof of income'
      ],
      rationale: [
        'Property is in a green zone',
        'LTV ratio is within acceptable range',
        'Borrower has strong income'
      ],
      financialProjections: {
        irr: 9.5,
        totalReturn: 1200000,
        yearlyBreakdown: [
          {
            year: 1,
            propertyValue: 3328000,
            accruedInterest: 40000,
            appreciationShare: 0,
            totalReturn: 40000
          },
          {
            year: 2,
            propertyValue: 3461120,
            accruedInterest: 82000,
            appreciationShare: 0,
            totalReturn: 82000
          }
        ]
      }
    }
  }
];

const UnderwritingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState<LoanApplication[]>(mockApplications);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);

  // In a real implementation, this would fetch data from the API
  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        // In production, this would be an API call
        // const response = await fetch('/api/underwriting/applications');
        // const data = await response.json();
        // setApplications(data.applications);
        
        // For now, we'll use mock data
        setApplications(mockApplications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleApplicationSelect = (applicationId: string) => {
    setSelectedApplicationId(applicationId);
    setActiveTab('application-detail');
  };

  const selectedApplication = selectedApplicationId 
    ? applications.find(app => app.id === selectedApplicationId) 
    : null;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Underwriting & Origination</h1>
        <Button onClick={() => setActiveTab('new-application')}>New Application</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Applications</CardTitle>
            <CardDescription>All loan applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{applications.length}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Updated just now</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>In Review</CardTitle>
            <CardDescription>Applications being reviewed</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {applications.filter(app => app.status === 'in-review').length}
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Updated just now</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Approved</CardTitle>
            <CardDescription>Approved applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {applications.filter(app => app.status === 'approved').length}
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Updated just now</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Rejected</CardTitle>
            <CardDescription>Rejected applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {applications.filter(app => app.status === 'rejected').length}
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Updated just now</p>
          </CardFooter>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-7 mb-6">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="new-application">New Application</TabsTrigger>
          <TabsTrigger value="property-evaluation">Property Evaluation</TabsTrigger>
          <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="decision-engine">Decision Engine</TabsTrigger>
          <TabsTrigger value="term-sheets">Term Sheets</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="mt-0">
          <ApplicationDetail 
            applications={applications} 
            isLoading={isLoading} 
            onSelectApplication={handleApplicationSelect}
          />
        </TabsContent>

        <TabsContent value="application-detail" className="mt-0">
          {selectedApplication ? (
            <ApplicationDetail 
              applications={[selectedApplication]} 
              isLoading={false} 
              onSelectApplication={() => {}}
              showSingle
            />
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-50 rounded-md">
              <p className="text-gray-500">No application selected.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="new-application" className="mt-0">
          <ApplicationForm />
        </TabsContent>

        <TabsContent value="property-evaluation" className="mt-0">
          <PropertyEvaluation applications={applications} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="risk-assessment" className="mt-0">
          <RiskAssessment applications={applications} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="decision-engine" className="mt-0">
          <DecisionEngine applications={applications} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="term-sheets" className="mt-0">
          <TermSheetGenerator applications={applications} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="documents" className="mt-0">
          <DocumentManager applications={applications} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnderwritingDashboard;
