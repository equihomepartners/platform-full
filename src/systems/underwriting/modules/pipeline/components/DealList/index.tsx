import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectOption } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Deal } from '../../types';
import { formatCurrency } from '../../../../utils';

interface DealListProps {
  deals: Deal[];
  isLoading: boolean;
}

const DealList: React.FC<DealListProps> = ({ deals, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter deals based on search term and status filter
  const filteredDeals = deals.filter(deal => {
    const matchesSearch =
      deal.borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.property.suburb.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || deal.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'underwriting':
        return 'bg-purple-100 text-purple-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'closing':
        return 'bg-orange-100 text-orange-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
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
    return <div className="flex justify-center items-center h-64">Loading deals...</div>;
  }

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
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
            className="w-full"
          >
            <SelectOption value="all">All Statuses</SelectOption>
            <SelectOption value="new">New</SelectOption>
            <SelectOption value="in-review">In Review</SelectOption>
            <SelectOption value="underwriting">Underwriting</SelectOption>
            <SelectOption value="approved">Approved</SelectOption>
            <SelectOption value="rejected">Rejected</SelectOption>
            <SelectOption value="closing">Closing</SelectOption>
            <SelectOption value="closed">Closed</SelectOption>
          </Select>
        </div>
        <Button>Export</Button>
      </div>

      {filteredDeals.length === 0 ? (
        <div className="flex justify-center items-center h-64 bg-gray-50 rounded-md">
          <p className="text-gray-500">No deals found matching your criteria.</p>
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
              {filteredDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.borrower.name}</TableCell>
                  <TableCell>
                    <div>{deal.property.address}</div>
                    <div className="text-sm text-gray-500">{deal.property.suburb}, {deal.property.state} {deal.property.postcode}</div>
                  </TableCell>
                  <TableCell>{formatCurrency(deal.loan.amount)}</TableCell>
                  <TableCell>{formatDate(deal.submittedAt)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(deal.status)}>
                      {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View</Button>
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

export default DealList;
