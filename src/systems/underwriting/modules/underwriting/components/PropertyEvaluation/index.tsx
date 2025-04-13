import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LoanApplication, PropertyValuation, ComparableProperty } from '../../types';
import { formatCurrency } from '../../../../utils';

interface PropertyEvaluationProps {
  applications: LoanApplication[];
  isLoading: boolean;
}

const PropertyEvaluation: React.FC<PropertyEvaluationProps> = ({ applications, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [propertyValuation, setPropertyValuation] = useState<PropertyValuation | null>(null);

  // Generate mock property valuation
  const generatePropertyValuation = (application: LoanApplication): PropertyValuation => {
    const estimatedValue = application.property.currentValue * (0.95 + Math.random() * 0.1); // +/- 5% of current value
    const confidenceScore = Math.floor(Math.random() * 20) + 80; // 80-99
    
    // Generate comparable properties
    const comparableProperties: ComparableProperty[] = Array.from({ length: 3 }, (_, i) => {
      const priceFactor = 0.9 + Math.random() * 0.2; // 90-110% of estimated value
      return {
        address: `${i + 1}23 ${application.property.suburb} St, ${application.property.suburb}, ${application.property.state}`,
        suburb: application.property.suburb,
        state: application.property.state,
        postcode: application.property.postcode,
        type: application.property.type,
        bedrooms: application.property.bedrooms,
        bathrooms: application.property.bathrooms,
        landSize: application.property.landSize,
        salePrice: estimatedValue * priceFactor,
        saleDate: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        distanceKm: Math.random() * 2
      };
    });
    
    // Generate market trends
    const marketTrends = [
      { period: 'month' as const, growthRate: 0.5 + Math.random() * 1 },
      { period: 'quarter' as const, growthRate: 1 + Math.random() * 2 },
      { period: 'year' as const, growthRate: 3 + Math.random() * 5 }
    ];
    
    return {
      id: `valuation-${application.id}`,
      propertyId: application.id,
      estimatedValue,
      confidenceScore,
      valuationDate: new Date().toISOString(),
      source: 'proptrack',
      comparableProperties,
      marketTrends
    };
  };

  // Filter applications based on search term
  const filteredApplications = applications.filter(app => 
    app.property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.property.suburb.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.borrower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle property selection
  const handlePropertySelect = (applicationId: string) => {
    setSelectedProperty(applicationId);
    
    // Find the application
    const application = applications.find(app => app.id === applicationId);
    
    if (application) {
      // Generate property valuation
      const valuation = generatePropertyValuation(application);
      setPropertyValuation(valuation);
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
    return <div className="flex justify-center items-center h-64">Loading properties...</div>;
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
        <Button>Evaluate New Property</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Properties</CardTitle>
              <CardDescription>Select a property to evaluate</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredApplications.length === 0 ? (
                <div className="flex justify-center items-center h-32 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No properties found matching your criteria.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApplications.map(application => (
                    <div
                      key={application.id}
                      className={`p-4 rounded-md cursor-pointer ${
                        selectedProperty === application.id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => handlePropertySelect(application.id)}
                    >
                      <div className="font-medium">{application.property.address}</div>
                      <div className="text-sm text-gray-500">{application.property.suburb}, {application.property.state} {application.property.postcode}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {application.property.type.charAt(0).toUpperCase() + application.property.type.slice(1)} | {application.property.bedrooms} bed | {application.property.bathrooms} bath
                      </div>
                      <div className="text-sm font-medium mt-2">{formatCurrency(application.property.currentValue)}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedProperty && propertyValuation ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Valuation</CardTitle>
                  <CardDescription>
                    Valuation for {applications.find(app => app.id === selectedProperty)?.property.address}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Estimated Value</div>
                      <div className="text-2xl font-bold">{formatCurrency(propertyValuation.estimatedValue)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Confidence Score</div>
                      <div className="flex items-center">
                        <div className="text-2xl font-bold">{propertyValuation.confidenceScore}%</div>
                        <Badge className="ml-2 bg-green-100 text-green-800">High</Badge>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Valuation Date</div>
                      <div className="text-lg">{formatDate(propertyValuation.valuationDate)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Source</div>
                      <div className="text-lg capitalize">{propertyValuation.source}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Trends</CardTitle>
                  <CardDescription>Growth rates for the property's suburb</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {propertyValuation.marketTrends.map(trend => (
                      <div key={trend.period} className="text-center p-4 bg-gray-50 rounded-md">
                        <div className="text-sm font-medium text-gray-500 capitalize">{trend.period}ly</div>
                        <div className="text-2xl font-bold text-green-600">+{trend.growthRate.toFixed(1)}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Comparable Properties</CardTitle>
                  <CardDescription>Recent sales in the area</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Address</TableHead>
                        <TableHead>Sale Price</TableHead>
                        <TableHead>Sale Date</TableHead>
                        <TableHead>Distance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {propertyValuation.comparableProperties.map((property, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>{property.address}</div>
                            <div className="text-sm text-gray-500">
                              {property.bedrooms} bed | {property.bathrooms} bath | {property.type}
                            </div>
                          </TableCell>
                          <TableCell>{formatCurrency(property.salePrice)}</TableCell>
                          <TableCell>{property.saleDate}</TableCell>
                          <TableCell>{property.distanceKm.toFixed(1)} km</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-50 rounded-md">
              <p className="text-gray-500">Select a property to view its valuation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyEvaluation;
