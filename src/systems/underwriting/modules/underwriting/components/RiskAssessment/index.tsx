import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LoanApplication, RiskAssessment as RiskAssessmentType, RiskFactor } from '../../types';
import { formatCurrency } from '../../../../utils';

interface RiskAssessmentProps {
  applications: LoanApplication[];
  isLoading: boolean;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ applications, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessmentType | null>(null);

  // Generate mock risk assessment
  const generateRiskAssessment = (application: LoanApplication): RiskAssessmentType => {
    // Calculate LTV
    const ltv = (application.loan.amount / application.property.currentValue) * 100;
    
    // Calculate combined LTV
    const combinedLtv = ((application.loan.amount + application.property.mortgageBalance) / application.property.currentValue) * 100;
    
    // Determine traffic light zone (mock)
    const trafficLightZone = application.property.suburb === 'Mosman' || application.property.suburb === 'Double Bay' || application.property.suburb === 'Bondi' ? 'Green' : 'Orange';
    
    // Generate risk factors
    const riskFactors: RiskFactor[] = [
      {
        factor: 'Traffic Light Zone',
        value: trafficLightZone,
        risk: trafficLightZone === 'Green' ? 'low' : trafficLightZone === 'Orange' ? 'medium' : 'high',
        impact: trafficLightZone === 'Green' ? 'positive' : trafficLightZone === 'Orange' ? 'neutral' : 'negative',
        weight: 0.3,
        score: trafficLightZone === 'Green' ? 0.9 : trafficLightZone === 'Orange' ? 0.7 : 0.5
      },
      {
        factor: 'LTV Ratio',
        value: ltv,
        risk: ltv <= 50 ? 'low' : ltv <= 70 ? 'medium' : 'high',
        impact: ltv <= 50 ? 'positive' : ltv <= 70 ? 'neutral' : 'negative',
        weight: 0.2,
        score: ltv <= 50 ? 0.9 : ltv <= 70 ? 0.7 : 0.5
      },
      {
        factor: 'Combined LTV',
        value: combinedLtv,
        risk: combinedLtv <= 60 ? 'low' : combinedLtv <= 80 ? 'medium' : 'high',
        impact: combinedLtv <= 60 ? 'positive' : combinedLtv <= 80 ? 'neutral' : 'negative',
        weight: 0.15,
        score: combinedLtv <= 60 ? 0.9 : combinedLtv <= 80 ? 0.7 : 0.5
      },
      {
        factor: 'Borrower Income',
        value: application.borrower.annualIncome,
        risk: application.borrower.annualIncome >= 150000 ? 'low' : application.borrower.annualIncome >= 100000 ? 'medium' : 'high',
        impact: application.borrower.annualIncome >= 150000 ? 'positive' : application.borrower.annualIncome >= 100000 ? 'neutral' : 'negative',
        weight: 0.15,
        score: application.borrower.annualIncome >= 150000 ? 0.9 : application.borrower.annualIncome >= 100000 ? 0.7 : 0.5
      },
      {
        factor: 'Employment Status',
        value: application.borrower.employmentStatus,
        risk: application.borrower.employmentStatus === 'employed' ? 'low' : application.borrower.employmentStatus === 'self-employed' ? 'medium' : 'high',
        impact: application.borrower.employmentStatus === 'employed' ? 'positive' : application.borrower.employmentStatus === 'self-employed' ? 'neutral' : 'negative',
        weight: 0.1,
        score: application.borrower.employmentStatus === 'employed' ? 0.9 : application.borrower.employmentStatus === 'self-employed' ? 0.7 : 0.5
      },
      {
        factor: 'Property Type',
        value: application.property.type,
        risk: application.property.type === 'house' ? 'low' : application.property.type === 'townhouse' ? 'low' : 'medium',
        impact: application.property.type === 'house' ? 'positive' : application.property.type === 'townhouse' ? 'positive' : 'neutral',
        weight: 0.1,
        score: application.property.type === 'house' ? 0.9 : application.property.type === 'townhouse' ? 0.9 : 0.7
      }
    ];
    
    // Calculate overall risk score
    const riskScore = riskFactors.reduce((sum, factor) => sum + factor.score * factor.weight, 0) * 100;
    
    // Determine overall risk
    const overallRisk = riskScore >= 80 ? 'low' : riskScore >= 60 ? 'medium' : 'high';
    
    // Generate mitigation recommendations
    const mitigationRecommendations = [
      'Verify property valuation with independent assessment',
      'Request additional income documentation',
      'Consider reducing loan amount to improve LTV ratio',
      'Verify property is in good condition with inspection'
    ];
    
    return {
      id: `risk-${application.id}`,
      applicationId: application.id,
      overallRisk,
      riskScore,
      assessmentDate: new Date().toISOString(),
      riskFactors,
      mitigationRecommendations
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
      // Generate risk assessment
      const assessment = generateRiskAssessment(application);
      setRiskAssessment(assessment);
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

  // Get risk badge color
  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get impact badge color
  const getImpactBadgeColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'neutral':
        return 'bg-blue-100 text-blue-800';
      case 'negative':
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
        <Button>Assess New Application</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>Select an application to assess</CardDescription>
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
          {selectedApplication && riskAssessment ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                  <CardDescription>
                    Assessment for {applications.find(app => app.id === selectedApplication)?.borrower.name}'s application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Overall Risk</div>
                      <div className="flex items-center">
                        <div className="text-2xl font-bold capitalize">{riskAssessment.overallRisk}</div>
                        <Badge className={`ml-2 ${getRiskBadgeColor(riskAssessment.overallRisk)}`}>
                          {riskAssessment.overallRisk.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Risk Score</div>
                      <div className="text-2xl font-bold">{riskAssessment.riskScore.toFixed(1)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Assessment Date</div>
                      <div className="text-lg">{formatDate(riskAssessment.assessmentDate)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Factors</CardTitle>
                  <CardDescription>Factors contributing to the risk assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Factor</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Risk</TableHead>
                        <TableHead>Impact</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {riskAssessment.riskFactors.map((factor, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{factor.factor}</TableCell>
                          <TableCell>
                            {typeof factor.value === 'number' && factor.factor === 'Borrower Income'
                              ? formatCurrency(factor.value)
                              : typeof factor.value === 'number' && (factor.factor === 'LTV Ratio' || factor.factor === 'Combined LTV')
                              ? `${factor.value.toFixed(1)}%`
                              : String(factor.value)}
                          </TableCell>
                          <TableCell>
                            <Badge className={getRiskBadgeColor(factor.risk)}>
                              {factor.risk.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getImpactBadgeColor(factor.impact)}>
                              {factor.impact.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>{(factor.weight * 100).toFixed(0)}%</TableCell>
                          <TableCell>{(factor.score * 100).toFixed(0)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mitigation Recommendations</CardTitle>
                  <CardDescription>Recommendations to mitigate risk</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    {riskAssessment.mitigationRecommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button>Generate Report</Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-50 rounded-md">
              <p className="text-gray-500">Select an application to view its risk assessment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
