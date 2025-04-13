import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoanApplication } from '../../types';
import { formatCurrency } from '../../../../utils';

interface ApplicationDetailProps {
  applications: LoanApplication[];
  isLoading: boolean;
  onSelectApplication: (applicationId: string) => void;
  showSingle?: boolean;
}

const ApplicationDetail: React.FC<ApplicationDetailProps> = ({ 
  applications, 
  isLoading, 
  onSelectApplication,
  showSingle = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Filter applications based on search term and status filter
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.property.suburb.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'in-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading applications...</div>;
  }

  // If showing a single application
  if (showSingle && applications.length === 1) {
    const application = applications[0];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Application Details</h2>
            <p className="text-gray-500">ID: {application.id}</p>
          </div>
          <Badge className={getStatusBadgeColor(application.status)}>
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="borrower">Borrower</TabsTrigger>
            <TabsTrigger value="property">Property</TabsTrigger>
            <TabsTrigger value="loan">Loan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Summary</CardTitle>
                  <CardDescription>Overview of the application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Status:</div>
                    <div>
                      <Badge className={getStatusBadgeColor(application.status)}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="text-sm font-medium">Submitted:</div>
                    <div>{formatDate(application.submittedAt)}</div>
                    
                    <div className="text-sm font-medium">Last Updated:</div>
                    <div>{formatDate(application.lastUpdatedAt)}</div>
                    
                    <div className="text-sm font-medium">Borrower:</div>
                    <div>{application.borrower.name}</div>
                    
                    <div className="text-sm font-medium">Property:</div>
                    <div>{application.property.address}</div>
                    
                    <div className="text-sm font-medium">Loan Amount:</div>
                    <div>{formatCurrency(application.loan.amount)}</div>
                    
                    <div className="text-sm font-medium">LTV Ratio:</div>
                    <div>{((application.loan.amount / application.property.currentValue) * 100).toFixed(1)}%</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Decision</CardTitle>
                  <CardDescription>Loan decision details</CardDescription>
                </CardHeader>
                <CardContent>
                  {application.decision ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium">Decision:</div>
                        <div>
                          <Badge className={application.decision.decision === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {application.decision.decision.charAt(0).toUpperCase() + application.decision.decision.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="text-sm font-medium">Decision Date:</div>
                        <div>{formatDate(application.decision.decisionDate)}</div>
                        
                        <div className="text-sm font-medium">Decision By:</div>
                        <div>{application.decision.decisionBy}</div>
                        
                        <div className="text-sm font-medium">Automated:</div>
                        <div>{application.decision.automated ? 'Yes' : 'No'}</div>
                        
                        <div className="text-sm font-medium">Overridden:</div>
                        <div>{application.decision.overridden ? 'Yes' : 'No'}</div>
                      </div>

                      {application.decision.terms && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Terms:</h4>
                          <div className="grid grid-cols-2 gap-2 pl-4">
                            <div className="text-sm font-medium">Amount:</div>
                            <div>{formatCurrency(application.decision.terms.amount)}</div>
                            
                            <div className="text-sm font-medium">Interest Rate:</div>
                            <div>{application.decision.terms.interestRate}%</div>
                            
                            <div className="text-sm font-medium">Term:</div>
                            <div>{application.decision.terms.term} years</div>
                            
                            <div className="text-sm font-medium">Origination Fee:</div>
                            <div>{application.decision.terms.originationFee}%</div>
                            
                            <div className="text-sm font-medium">Appreciation Share:</div>
                            <div>{application.decision.terms.appreciationShare}%</div>
                          </div>
                        </div>
                      )}

                      {application.decision.rationale && application.decision.rationale.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Rationale:</h4>
                          <ul className="list-disc pl-6">
                            {application.decision.rationale.map((reason, index) => (
                              <li key={index} className="text-sm">{reason}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-32 bg-gray-50 rounded-md">
                      <p className="text-gray-500">No decision has been made yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="borrower" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Borrower Information</CardTitle>
                <CardDescription>Details about the borrower</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Name:</h4>
                    <p>{application.borrower.name}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Email:</h4>
                    <p>{application.borrower.email}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Phone:</h4>
                    <p>{application.borrower.phone}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Annual Income:</h4>
                    <p>{formatCurrency(application.borrower.annualIncome)}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Employment Status:</h4>
                    <p>{application.borrower.employmentStatus.charAt(0).toUpperCase() + application.borrower.employmentStatus.slice(1)}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Credit Score:</h4>
                    <p>{application.borrower.creditScore || 'Not available'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="property" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
                <CardDescription>Details about the property</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Address:</h4>
                    <p>{application.property.address}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Suburb:</h4>
                    <p>{application.property.suburb}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">State:</h4>
                    <p>{application.property.state}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Postcode:</h4>
                    <p>{application.property.postcode}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Type:</h4>
                    <p>{application.property.type.charAt(0).toUpperCase() + application.property.type.slice(1)}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Bedrooms:</h4>
                    <p>{application.property.bedrooms}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Bathrooms:</h4>
                    <p>{application.property.bathrooms}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Land Size:</h4>
                    <p>{application.property.landSize} m²</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Current Value:</h4>
                    <p>{formatCurrency(application.property.currentValue)}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Mortgage Balance:</h4>
                    <p>{formatCurrency(application.property.mortgageBalance)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loan" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Loan Information</CardTitle>
                <CardDescription>Details about the loan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Amount:</h4>
                    <p>{formatCurrency(application.loan.amount)}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Purpose:</h4>
                    <p>{application.loan.purpose.charAt(0).toUpperCase() + application.loan.purpose.slice(1)}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Term:</h4>
                    <p>{application.loan.term} years</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Interest Rate:</h4>
                    <p>{application.loan.interestRate ? `${application.loan.interestRate}%` : 'Not set'}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Origination Fee:</h4>
                    <p>{application.loan.originationFee ? `${application.loan.originationFee}%` : 'Not set'}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Appreciation Share:</h4>
                    <p>{application.loan.appreciationShare ? `${application.loan.appreciationShare}%` : 'Not set'}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">LTV Ratio:</h4>
                    <p>{((application.loan.amount / application.property.currentValue) * 100).toFixed(1)}%</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Combined LTV Ratio:</h4>
                    <p>{(((application.loan.amount + application.property.mortgageBalance) / application.property.currentValue) * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Back to List</Button>
          <Button variant="outline">Edit</Button>
          <Button>Process Application</Button>
        </div>
      </div>
    );
  }

  // If showing a list of applications
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search by name, address, or suburb"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="in-review">In Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Export</Button>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="flex justify-center items-center h-64 bg-gray-50 rounded-md">
          <p className="text-gray-500">No applications found matching your criteria.</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Borrower</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Loan Amount</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.borrower.name}</TableCell>
                  <TableCell>
                    <div>{application.property.address}</div>
                    <div className="text-sm text-gray-500">{application.property.suburb}, {application.property.state} {application.property.postcode}</div>
                  </TableCell>
                  <TableCell>{formatCurrency(application.loan.amount)}</TableCell>
                  <TableCell>{formatDate(application.submittedAt)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(application.status)}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => onSelectApplication(application.id)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetail;
