import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Deal } from '../../types';
import { formatCurrency } from '../../../../utils';

interface DealDetailProps {
  deal?: Deal;
  isLoading?: boolean;
}

const DealDetail: React.FC<DealDetailProps> = ({ deal, isLoading }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading deal details...</div>;
  }

  if (!deal) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded-md">
        <p className="text-gray-500">Select a deal to view its details.</p>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Deal Details</CardTitle>
          <CardDescription>Detailed information about the selected deal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Borrower Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Name:</span>
                  <span className="ml-2">{deal.borrower.name}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                  <span className="ml-2">{deal.borrower.email}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Phone:</span>
                  <span className="ml-2">{deal.borrower.phone}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Annual Income:</span>
                  <span className="ml-2">{formatCurrency(deal.borrower.annualIncome)}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Employment Status:</span>
                  <span className="ml-2 capitalize">{deal.borrower.employmentStatus}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Property Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Address:</span>
                  <span className="ml-2">{deal.property.address}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Location:</span>
                  <span className="ml-2">{deal.property.suburb}, {deal.property.state} {deal.property.postcode}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Property Type:</span>
                  <span className="ml-2 capitalize">{deal.property.type}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Details:</span>
                  <span className="ml-2">{deal.property.bedrooms} bed, {deal.property.bathrooms} bath{deal.property.landSize > 0 ? `, ${deal.property.landSize}m²` : ''}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Current Value:</span>
                  <span className="ml-2">{formatCurrency(deal.property.currentValue)}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Mortgage Balance:</span>
                  <span className="ml-2">{formatCurrency(deal.property.mortgageBalance)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Loan Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Loan Amount:</span>
                  <span className="ml-2">{formatCurrency(deal.loan.amount)}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Purpose:</span>
                  <span className="ml-2 capitalize">{deal.loan.purpose}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Term:</span>
                  <span className="ml-2">{deal.loan.term} years</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">LTV Ratio:</span>
                  <span className="ml-2">{((deal.loan.amount / deal.property.currentValue) * 100).toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Combined LTV:</span>
                  <span className="ml-2">{(((deal.loan.amount + deal.property.mortgageBalance) / deal.property.currentValue) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Deal Status</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <span className="ml-2 capitalize">{deal.status}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Submitted At:</span>
                  <span className="ml-2">{formatDate(deal.submittedAt)}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Last Updated At:</span>
                  <span className="ml-2">{formatDate(deal.lastUpdatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealDetail;
