import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
  borrowerName: string;
  borrowerEmail: string;
  borrowerPhone: string;
  borrowerIncome: string;
  borrowerEmploymentStatus: string;
  propertyAddress: string;
  propertySuburb: string;
  propertyState: string;
  propertyPostcode: string;
  propertyType: string;
  propertyBedrooms: string;
  propertyBathrooms: string;
  propertyLandSize: string;
  propertyValue: string;
  propertyMortgageBalance: string;
  loanAmount: string;
  loanPurpose: string;
  loanTerm: string;
}

const ApplicationForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState('borrower');
  const [formData, setFormData] = useState<FormData>({
    borrowerName: '',
    borrowerEmail: '',
    borrowerPhone: '',
    borrowerIncome: '',
    borrowerEmploymentStatus: 'employed',
    propertyAddress: '',
    propertySuburb: '',
    propertyState: 'NSW',
    propertyPostcode: '',
    propertyType: 'house',
    propertyBedrooms: '3',
    propertyBathrooms: '2',
    propertyLandSize: '',
    propertyValue: '',
    propertyMortgageBalance: '',
    loanAmount: '',
    loanPurpose: 'renovation',
    loanTerm: '10'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real implementation, this would call an API to submit the application
    alert('Application submitted successfully!');
  };

  const nextTab = () => {
    if (activeTab === 'borrower') setActiveTab('property');
    else if (activeTab === 'property') setActiveTab('loan');
  };

  const prevTab = () => {
    if (activeTab === 'loan') setActiveTab('property');
    else if (activeTab === 'property') setActiveTab('borrower');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Loan Application</CardTitle>
          <CardDescription>Submit a new loan application</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="borrower">Borrower Information</TabsTrigger>
                <TabsTrigger value="property">Property Information</TabsTrigger>
                <TabsTrigger value="loan">Loan Information</TabsTrigger>
              </TabsList>

              <TabsContent value="borrower" className="mt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="borrowerName">Full Name</Label>
                    <Input
                      id="borrowerName"
                      name="borrowerName"
                      value={formData.borrowerName}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="borrowerEmail">Email</Label>
                    <Input
                      id="borrowerEmail"
                      name="borrowerEmail"
                      type="email"
                      value={formData.borrowerEmail}
                      onChange={handleInputChange}
                      placeholder="john.smith@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="borrowerPhone">Phone</Label>
                    <Input
                      id="borrowerPhone"
                      name="borrowerPhone"
                      value={formData.borrowerPhone}
                      onChange={handleInputChange}
                      placeholder="0412 345 678"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="borrowerIncome">Annual Income (AUD)</Label>
                    <Input
                      id="borrowerIncome"
                      name="borrowerIncome"
                      type="number"
                      value={formData.borrowerIncome}
                      onChange={handleInputChange}
                      placeholder="150000"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="borrowerEmploymentStatus">Employment Status</Label>
                    <Select
                      value={formData.borrowerEmploymentStatus}
                      onValueChange={(value) => handleSelectChange('borrowerEmploymentStatus', value)}
                    >
                      <SelectTrigger id="borrowerEmploymentStatus">
                        <SelectValue placeholder="Select employment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employed">Employed</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="button" onClick={nextTab}>Next</Button>
                </div>
              </TabsContent>

              <TabsContent value="property" className="mt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="propertyAddress">Property Address</Label>
                    <Input
                      id="propertyAddress"
                      name="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={handleInputChange}
                      placeholder="123 Main St"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertySuburb">Suburb</Label>
                    <Input
                      id="propertySuburb"
                      name="propertySuburb"
                      value={formData.propertySuburb}
                      onChange={handleInputChange}
                      placeholder="Mosman"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyState">State</Label>
                    <Select
                      value={formData.propertyState}
                      onValueChange={(value) => handleSelectChange('propertyState', value)}
                    >
                      <SelectTrigger id="propertyState">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NSW">NSW</SelectItem>
                        <SelectItem value="VIC">VIC</SelectItem>
                        <SelectItem value="QLD">QLD</SelectItem>
                        <SelectItem value="SA">SA</SelectItem>
                        <SelectItem value="WA">WA</SelectItem>
                        <SelectItem value="TAS">TAS</SelectItem>
                        <SelectItem value="NT">NT</SelectItem>
                        <SelectItem value="ACT">ACT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyPostcode">Postcode</Label>
                    <Input
                      id="propertyPostcode"
                      name="propertyPostcode"
                      value={formData.propertyPostcode}
                      onChange={handleInputChange}
                      placeholder="2088"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => handleSelectChange('propertyType', value)}
                    >
                      <SelectTrigger id="propertyType">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyBedrooms">Bedrooms</Label>
                    <Select
                      value={formData.propertyBedrooms}
                      onValueChange={(value) => handleSelectChange('propertyBedrooms', value)}
                    >
                      <SelectTrigger id="propertyBedrooms">
                        <SelectValue placeholder="Select number of bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6+">6+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyBathrooms">Bathrooms</Label>
                    <Select
                      value={formData.propertyBathrooms}
                      onValueChange={(value) => handleSelectChange('propertyBathrooms', value)}
                    >
                      <SelectTrigger id="propertyBathrooms">
                        <SelectValue placeholder="Select number of bathrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5+">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyLandSize">Land Size (m²)</Label>
                    <Input
                      id="propertyLandSize"
                      name="propertyLandSize"
                      type="number"
                      value={formData.propertyLandSize}
                      onChange={handleInputChange}
                      placeholder="500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyValue">Current Property Value (AUD)</Label>
                    <Input
                      id="propertyValue"
                      name="propertyValue"
                      type="number"
                      value={formData.propertyValue}
                      onChange={handleInputChange}
                      placeholder="2500000"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyMortgageBalance">Current Mortgage Balance (AUD)</Label>
                    <Input
                      id="propertyMortgageBalance"
                      name="propertyMortgageBalance"
                      type="number"
                      value={formData.propertyMortgageBalance}
                      onChange={handleInputChange}
                      placeholder="1000000"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevTab}>Previous</Button>
                  <Button type="button" onClick={nextTab}>Next</Button>
                </div>
              </TabsContent>

              <TabsContent value="loan" className="mt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount (AUD)</Label>
                    <Input
                      id="loanAmount"
                      name="loanAmount"
                      type="number"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      placeholder="500000"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="loanPurpose">Loan Purpose</Label>
                    <Select
                      value={formData.loanPurpose}
                      onValueChange={(value) => handleSelectChange('loanPurpose', value)}
                    >
                      <SelectTrigger id="loanPurpose">
                        <SelectValue placeholder="Select loan purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="renovation">Renovation</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                    <Select
                      value={formData.loanTerm}
                      onValueChange={(value) => handleSelectChange('loanTerm', value)}
                    >
                      <SelectTrigger id="loanTerm">
                        <SelectValue placeholder="Select loan term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevTab}>Previous</Button>
                  <Button type="submit">Submit Application</Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationForm;
