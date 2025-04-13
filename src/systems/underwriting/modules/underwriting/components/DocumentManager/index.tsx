import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LoanApplication, Document } from '../../types';

interface DocumentManagerProps {
  applications: LoanApplication[];
  isLoading: boolean;
}

const DocumentManager: React.FC<DocumentManagerProps> = ({ applications, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentType, setDocumentType] = useState('all');

  // Generate mock documents
  const generateDocuments = (application: LoanApplication): Document[] => {
    const docs: Document[] = [
      {
        id: `doc-${application.id}-1`,
        applicationId: application.id,
        name: 'Loan Application Form',
        type: 'application',
        status: 'approved',
        uploadedAt: application.submittedAt,
        uploadedBy: 'borrower',
        url: `/api/underwriting/documents/${application.id}/application-form.pdf`
      },
      {
        id: `doc-${application.id}-2`,
        applicationId: application.id,
        name: 'Property Valuation Report',
        type: 'valuation',
        status: 'approved',
        uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        uploadedBy: 'system',
        url: `/api/underwriting/documents/${application.id}/valuation-report.pdf`
      },
      {
        id: `doc-${application.id}-3`,
        applicationId: application.id,
        name: 'Proof of Income',
        type: 'income',
        status: 'pending',
        uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        uploadedBy: 'borrower',
        url: `/api/underwriting/documents/${application.id}/income-proof.pdf`
      }
    ];
    
    // Add term sheet if application is approved
    if (application.status === 'approved' || (application.decision && application.decision.decision === 'approved')) {
      docs.push({
        id: `doc-${application.id}-4`,
        applicationId: application.id,
        name: 'Term Sheet',
        type: 'term-sheet',
        status: 'approved',
        uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        uploadedBy: 'system',
        url: `/api/underwriting/documents/${application.id}/term-sheet.pdf`
      });
    }
    
    return docs;
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
      // Generate documents
      const docs = generateDocuments(application);
      setDocuments(docs);
    }
  };

  // Filter documents based on type
  const filteredDocuments = documentType === 'all' 
    ? documents 
    : documents.filter(doc => doc.type === documentType);

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
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
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
        <Button>Upload Document</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>Select an application to view documents</CardDescription>
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
                        <div className="text-sm text-gray-500">Submitted: {formatDate(application.submittedAt)}</div>
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
          {selectedApplication ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>
                      Documents for {applications.find(app => app.id === selectedApplication)?.borrower.name}'s application
                    </CardDescription>
                  </div>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Documents</SelectItem>
                      <SelectItem value="application">Application</SelectItem>
                      <SelectItem value="valuation">Valuation</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="term-sheet">Term Sheet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {filteredDocuments.length === 0 ? (
                  <div className="flex justify-center items-center h-32 bg-gray-50 rounded-md">
                    <p className="text-gray-500">No documents found matching your criteria.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Uploaded By</TableHead>
                        <TableHead>Uploaded At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.map((document) => (
                        <TableRow key={document.id}>
                          <TableCell className="font-medium">{document.name}</TableCell>
                          <TableCell className="capitalize">{document.type.replace('-', ' ')}</TableCell>
                          <TableCell className="capitalize">{document.uploadedBy}</TableCell>
                          <TableCell>{formatDate(document.uploadedAt)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeColor(document.status)}>
                              {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="space-x-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Download</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Request Documents</Button>
                <Button>Upload Document</Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-50 rounded-md">
              <p className="text-gray-500">Select an application to view its documents.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;
