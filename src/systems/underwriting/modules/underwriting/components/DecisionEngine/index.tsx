import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoanApplication, LoanDecision } from '../../types';
import { formatCurrency } from '../../../../utils';

interface DecisionEngineProps {
  applications: LoanApplication[];
  isLoading: boolean;
}

const DecisionEngine: React.FC<DecisionEngineProps> = ({ applications, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [decision, setDecision] = useState<LoanDecision | null>(null);
  const [activeTab, setActiveTab] = useState('decision');

  // Generate mock decision
  const generateDecision = (application: LoanApplication): LoanDecision => {
    // Calculate LTV
    const ltv = (application.loan.amount / application.property.currentValue) * 100;
    
    // Determine if application should be approved
    const shouldApprove = 
      ltv <= 70 && // LTV is acceptable
      application.borrower.annualIncome >= 100000 && // Income is sufficient
      (application.property.suburb === 'Mosman' || application.property.suburb === 'Double Bay' || application.property.suburb === 'Bondi'); // Property is in a green zone
    
    // Generate rationale
    const rationale: string[] = [];
    
    if (application.property.suburb === 'Mosman' || application.property.suburb === 'Double Bay' || application.property.suburb === 'Bondi') {
      rationale.push('Property is in a green zone');
    } else {
      rationale.push('Property is not in a green zone');
    }
    
    if (ltv <= 70) {
      rationale.push('LTV ratio is within acceptable range');
    } else {
      rationale.push('LTV ratio is above acceptable range');
    }
    
    if (application.borrower.annualIncome >= 100000) {
      rationale.push('Borrower has strong income');
    } else {
      rationale.push('Borrower income is below threshold');
    }
    
    // Generate conditions
    const conditions = shouldApprove ? [
      'Property valuation must be confirmed',
      'Borrower must provide proof of income',
      'Property must be in good condition'
    ] : [];
    
    // Generate financial projections
    const yearlyBreakdown = Array.from({ length: 5 }, (_, i) => {
      const year = i + 1;
      const propertyValue = application.property.currentValue * Math.pow(1.04, year); // 4% annual appreciation
      const accruedInterest = application.loan.amount * 0.05 * year; // 5% simple interest
      const appreciationShare = year === 5 ? (propertyValue - application.property.currentValue) * 0.2 : 0; // 20% appreciation share at exit
      const totalReturn = accruedInterest + appreciationShare;
      
      return {
        year,
        propertyValue,
        accruedInterest,
        appreciationShare,
        totalReturn
      };
    });
    
    const totalReturn = yearlyBreakdown.reduce((sum, year) => sum + year.totalReturn, 0);
    const irr = 9.5; // Mock IRR calculation
    
    return {
      id: `decision-${application.id}`,
      applicationId: application.id,
      decision: shouldApprove ? 'approved' : 'rejected',
      decisionDate: new Date().toISOString(),
      decisionBy: 'system',
      automated: true,
      overridden: false,
      terms: shouldApprove ? {
        amount: application.loan.amount,
        interestRate: 5,
        term: 10,
        originationFee: 3,
        appreciationShare: 20
      } : undefined,
      conditions,
      rationale,
      financialProjections: {
        irr,
        totalReturn,
        yearlyBreakdown
      }
    };
  };

  // Filter applications based on search term
  const filteredApplications = applications.filter(app => 
    app.property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.property.suburb.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.borrower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle application selection
  const handleApplicationSelect = (applicationId: string) => {
    setSelectedApplication(applicationId);
    
    // Find the application
    const application = applications.find(app => app.id === applicationId);
    
    if (application) {
      // Check if application already has a decision
      if (application.decision) {
        setDecision(application.decision);
      } else {
        // Generate decision
        const newDecision = generateDecision(application);
        setDecision(newDecision);
      }
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get decision badge color
  const getDecisionBadgeColor = (decision: string) => {
    return decision === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading applications...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="Search by address, suburb, or borrower name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>Process New Application</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>Select an application to process</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredApplications.length === 0 ? (
                <div className="flex justify-center items-center h-32 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No applications found matching your criteria.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApplications.map(application => (
                    <div
                      key={application.id}
                      className={`p-4 rounded-md cursor-pointer ${
                        selectedApplication === application.id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => handleApplicationSelect(application.id)}
                    >
                      <div className="font-medium">{application.borrower.name}</div>
                      <div className="text-sm text-gray-500">{application.property.address}</div>
                      <div className="text-sm text-gray-500">{application.property.suburb}, {application.property.state} {application.property.postcode}</div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-sm font-medium">{formatCurrency(application.loan.amount)}</div>
                        <Badge className={`${
                          application.status === 'approved' ? 'bg-green-100 text-green-800' :
                          application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedApplication && decision ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Loan Decision</CardTitle>
                  <CardDescription>
                    Decision for {applications.find(app => app.id === selectedApplication)?.borrower.name}'s application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="decision">Decision</TabsTrigger>
                      <TabsTrigger value="rationale">Rationale</TabsTrigger>
                      <TabsTrigger value="projections">Financial Projections</TabsTrigger>
                    </TabsList>

                    <TabsContent value="decision" className="mt-0 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-gray-500">Decision</div>
                          <div className="flex items-center">
                            <div className="text-2xl font-bold capitalize">{decision.decision}</div>
                            <Badge className={`ml-2 ${getDecisionBadgeColor(decision.decision)}`}>
                              {decision.decision.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Decision Date</div>
                          <div className="text-lg">{formatDate(decision.decisionDate)}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Decision By</div>
                          <div className="text-lg capitalize">{decision.decisionBy}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Automated</div>
                          <div className="text-lg">{decision.automated ? 'Yes' : 'No'}</div>
                        </div>
                      </div>

                      {decision.terms && (
                        <div className="mt-6">
                          <h3 className="text-lg font-medium mb-2">Loan Terms</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm font-medium text-gray-500">Loan Amount</div>
                              <div className="text-lg">{formatCurrency(decision.terms.amount)}</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-500">Interest Rate</div>
                              <div className="text-lg">{decision.terms.interestRate}%</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-500">Term</div>
                              <div className="text-lg">{decision.terms.term} years</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-500">Origination Fee</div>
                              <div className="text-lg">{decision.terms.originationFee}%</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-500">Appreciation Share</div>
                              <div className="text-lg">{decision.terms.appreciationShare}%</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {decision.conditions && decision.conditions.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-lg font-medium mb-2">Conditions</h3>
                          <ul className="list-disc pl-6 space-y-2">
                            {decision.conditions.map((condition, index) => (
                              <li key={index}>{condition}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="rationale" className="mt-0">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Decision Rationale</h3>
                        <ul className="list-disc pl-6 space-y-2">
                          {decision.rationale.map((reason, index) => (
                            <li key={index}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="projections" className="mt-0">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500">IRR</div>
                            <div className="text-2xl font-bold">{decision.financialProjections.irr}%</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Total Return</div>
                            <div className="text-2xl font-bold">{formatCurrency(decision.financialProjections.totalReturn)}</div>
                          </div>
                        </div>

                        <h3 className="text-lg font-medium mt-4">Yearly Breakdown</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Year</TableHead>
                              <TableHead>Property Value</TableHead>
                              <TableHead>Accrued Interest</TableHead>
                              <TableHead>Appreciation Share</TableHead>
                              <TableHead>Total Return</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {decision.financialProjections.yearlyBreakdown.map((year) => (
                              <TableRow key={year.year}>
                                <TableCell>{year.year}</TableCell>
                                <TableCell>{formatCurrency(year.propertyValue)}</TableCell>
                                <TableCell>{formatCurrency(year.accruedInterest)}</TableCell>
                                <TableCell>{formatCurrency(year.appreciationShare)}</TableCell>
                                <TableCell>{formatCurrency(year.totalReturn)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Override Decision</Button>
                  <Button>Generate Term Sheet</Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-50 rounded-md">
              <p className="text-gray-500">Select an application to view its decision.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DecisionEngine;
