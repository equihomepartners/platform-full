import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LoanApplication, TermSheet } from '../../types';
import { formatCurrency } from '../../../../utils';

interface TermSheetGeneratorProps {
  applications: LoanApplication[];
  isLoading: boolean;
}

const TermSheetGenerator: React.FC<TermSheetGeneratorProps> = ({ applications, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [termSheet, setTermSheet] = useState<TermSheet | null>(null);

  // Generate mock term sheet
  const generateTermSheet = (application: LoanApplication): TermSheet => {
    // Ensure application has a decision
    if (!application.decision) {
      throw new Error('Application does not have a decision');
    }
    
    return {
      id: `termsheet-${application.id}`,
      applicationId: application.id,
      decisionId: application.decision.id,
      generatedAt: new Date().toISOString(),
      generatedBy: 'system',
      status: 'draft',
      terms: {
        amount: application.decision.terms!.amount,
        interestRate: application.decision.terms!.interestRate,
        term: application.decision.terms!.term,
        originationFee: application.decision.terms!.originationFee,
        appreciationShare: application.decision.terms!.appreciationShare
      },
      conditions: application.decision.conditions || [],
      documentUrl: `/api/underwriting/termsheets/${application.id}/document`
    };
  };

  // Filter applications based on search term and approval status
  const filteredApplications = applications.filter(app => 
    (app.status === 'approved' || (app.decision && app.decision.decision === 'approved')) && // Only approved applications
    (
      app.property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.property.suburb.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.borrower.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handle application selection
  const handleApplicationSelect = (applicationId: string) => {
    setSelectedApplication(applicationId);
    
    // Find the application
    const application = applications.find(app => app.id === applicationId);
    
    if (application) {
      // Check if application already has a term sheet
      if (application.termSheet) {
        setTermSheet(application.termSheet);
      } else if (application.decision && application.decision.decision === 'approved') {
        // Generate term sheet
        const newTermSheet = generateTermSheet(application);
        setTermSheet(newTermSheet);
      } else {
        setTermSheet(null);
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

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-blue-100 text-blue-800';
      case 'sent':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
        <Button>Generate New Term Sheet</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Approved Applications</CardTitle>
              <CardDescription>Select an application to generate a term sheet</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredApplications.length === 0 ? (
                <div className="flex justify-center items-center h-32 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No approved applications found matching your criteria.</p>
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
                        <Badge className="bg-green-100 text-green-800">
                          Approved
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
          {selectedApplication && termSheet ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Term Sheet</CardTitle>
                      <CardDescription>
                        Term sheet for {applications.find(app => app.id === selectedApplication)?.borrower.name}'s application
                      </CardDescription>
                    </div>
                    <Badge className={getStatusBadgeColor(termSheet.status)}>
                      {termSheet.status.charAt(0).toUpperCase() + termSheet.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Generated At</div>
                      <div className="text-lg">{formatDate(termSheet.generatedAt)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Generated By</div>
                      <div className="text-lg capitalize">{termSheet.generatedBy}</div>
                    </div>
                    {termSheet.sentAt && (
                      <div>
                        <div className="text-sm font-medium text-gray-500">Sent At</div>
                        <div className="text-lg">{formatDate(termSheet.sentAt)}</div>
                      </div>
                    )}
                    {termSheet.respondedAt && (
                      <div>
                        <div className="text-sm font-medium text-gray-500">Responded At</div>
                        <div className="text-lg">{formatDate(termSheet.respondedAt)}</div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Loan Terms</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Loan Amount</TableCell>
                          <TableCell>{formatCurrency(termSheet.terms.amount)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Interest Rate</TableCell>
                          <TableCell>{termSheet.terms.interestRate}% simple interest (capitalized at term end)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Term</TableCell>
                          <TableCell>{termSheet.terms.term} years</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Origination Fee</TableCell>
                          <TableCell>{termSheet.terms.originationFee}% of loan amount</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Appreciation Share</TableCell>
                          <TableCell>{termSheet.terms.appreciationShare}% of property appreciation at exit</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Monthly Payments</TableCell>
                          <TableCell>None</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Prepayment Penalty</TableCell>
                          <TableCell>None</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {termSheet.conditions && termSheet.conditions.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Conditions</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        {termSheet.conditions.map((condition, index) => (
                          <li key={index}>{condition}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Edit Term Sheet</Button>
                  <div className="space-x-2">
                    <Button variant="outline">Download PDF</Button>
                    <Button>Send to Borrower</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-50 rounded-md">
              <p className="text-gray-500">Select an approved application to generate a term sheet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermSheetGenerator;
