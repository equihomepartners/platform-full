import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TargetProperty, EmailCampaign, Lead } from '../../types';
import TargetPropertyList from '../TargetPropertyList';
import CampaignManager from '../CampaignManager';
import CampaignCreator from '../CampaignCreator';
import CampaignAnalytics from '../CampaignAnalytics';
import LeadManager from '../LeadManager';
import MailchimpIntegration from '../MailchimpIntegration';

// Mock data for development
const mockTargetProperties: TargetProperty[] = [
  {
    id: '1',
    address: '123 Main St',
    suburb: 'Mosman',
    state: 'NSW',
    postcode: '2088',
    type: 'house',
    bedrooms: 4,
    bathrooms: 2,
    landSize: 500,
    estimatedValue: 2500000,
    trafficLightZone: 'Green',
    owner: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '0412 345 678'
    },
    investmentPotential: {
      score: 85,
      rank: 1,
      factors: [
        { name: 'Location', weight: 0.3, score: 0.9 },
        { name: 'Property Value', weight: 0.2, score: 0.8 },
        { name: 'Growth Potential', weight: 0.5, score: 0.8 }
      ]
    },
    campaigns: [
      { id: '1', name: 'Spring Campaign', sentAt: '2023-09-15', opened: true, clicked: true, converted: false }
    ]
  },
  {
    id: '2',
    address: '456 High St',
    suburb: 'Double Bay',
    state: 'NSW',
    postcode: '2028',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    landSize: 0,
    estimatedValue: 1800000,
    trafficLightZone: 'Green',
    owner: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '0412 987 654'
    },
    investmentPotential: {
      score: 80,
      rank: 2,
      factors: [
        { name: 'Location', weight: 0.3, score: 0.9 },
        { name: 'Property Value', weight: 0.2, score: 0.7 },
        { name: 'Growth Potential', weight: 0.5, score: 0.75 }
      ]
    },
    campaigns: [
      { id: '1', name: 'Spring Campaign', sentAt: '2023-09-15', opened: true, clicked: false, converted: false }
    ]
  },
  {
    id: '3',
    address: '789 Beach Rd',
    suburb: 'Bondi',
    state: 'NSW',
    postcode: '2026',
    type: 'house',
    bedrooms: 5,
    bathrooms: 3,
    landSize: 600,
    estimatedValue: 3200000,
    trafficLightZone: 'Green',
    owner: {
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '0413 456 789'
    },
    investmentPotential: {
      score: 78,
      rank: 3,
      factors: [
        { name: 'Location', weight: 0.3, score: 0.85 },
        { name: 'Property Value', weight: 0.2, score: 0.9 },
        { name: 'Growth Potential', weight: 0.5, score: 0.7 }
      ]
    },
    campaigns: []
  }
];

const mockCampaigns: EmailCampaign[] = [
  {
    id: '1',
    name: 'Spring Campaign',
    description: 'Campaign targeting homeowners in green zones for spring season',
    status: 'sent',
    createdAt: '2023-09-01',
    createdBy: 'admin',
    scheduledAt: '2023-09-15',
    sentAt: '2023-09-15',
    audience: {
      name: 'Green Zone Homeowners',
      size: 150,
      criteria: {
        trafficLightZones: ['Green'],
        suburbs: ['Mosman', 'Double Bay', 'Bondi'],
        propertyTypes: ['house', 'apartment'],
        minValue: 1000000
      }
    },
    content: {
      subject: 'Unlock Your Home\'s Value with Equihome',
      preheader: 'No monthly payments, access your equity today',
      template: 'spring-template',
      body: '<h1>Unlock Your Home\'s Value</h1><p>Dear {{name}},</p><p>As a homeowner in {{suburb}}, you may be eligible for our no-monthly-payment home equity solution.</p>',
      variables: [
        { name: 'name', value: 'owner.name' },
        { name: 'suburb', value: 'property.suburb' }
      ]
    },
    mailchimp: {
      campaignId: 'mc123456',
      audienceId: 'mc-audience-123',
      templateId: 'mc-template-456',
      status: 'sent'
    },
    analytics: {
      recipients: 150,
      opens: 75,
      openRate: 50,
      clicks: 30,
      clickRate: 20,
      bounces: 5,
      bounceRate: 3.33,
      unsubscribes: 2,
      unsubscribeRate: 1.33,
      conversions: 5,
      conversionRate: 3.33
    }
  },
  {
    id: '2',
    name: 'Summer Campaign',
    description: 'Campaign targeting homeowners in green zones for summer season',
    status: 'draft',
    createdAt: '2023-11-15',
    createdBy: 'admin',
    audience: {
      name: 'Green Zone Homeowners - Summer',
      size: 200,
      criteria: {
        trafficLightZones: ['Green'],
        suburbs: ['Mosman', 'Double Bay', 'Bondi', 'Vaucluse', 'Rose Bay'],
        propertyTypes: ['house', 'apartment'],
        minValue: 1500000
      }
    },
    content: {
      subject: 'Summer Equity Release Program',
      preheader: 'Access your equity with no monthly payments',
      template: 'summer-template',
      body: '<h1>Summer Equity Release Program</h1><p>Dear {{name}},</p><p>This summer, access your home\'s equity with our no-monthly-payment solution.</p>',
      variables: [
        { name: 'name', value: 'owner.name' },
        { name: 'suburb', value: 'property.suburb' }
      ]
    },
    mailchimp: {
      audienceId: 'mc-audience-123',
      templateId: 'mc-template-789'
    },
    analytics: {
      recipients: 0,
      opens: 0,
      openRate: 0,
      clicks: 0,
      clickRate: 0,
      bounces: 0,
      bounceRate: 0,
      unsubscribes: 0,
      unsubscribeRate: 0,
      conversions: 0,
      conversionRate: 0
    }
  }
];

const mockLeads: Lead[] = [
  {
    id: '1',
    source: 'campaign',
    sourceId: '1',
    status: 'qualified',
    createdAt: '2023-09-16',
    lastUpdatedAt: '2023-09-18',
    contact: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '0412 345 678'
    },
    property: {
      address: '123 Main St',
      suburb: 'Mosman',
      state: 'NSW',
      postcode: '2088',
      type: 'house',
      estimatedValue: 2500000,
      trafficLightZone: 'Green'
    },
    qualification: {
      score: 85,
      factors: [
        { name: 'Property Value', value: 2500000, score: 90 },
        { name: 'Location', value: 'Green', score: 90 },
        { name: 'Interest Level', value: 'High', score: 80 }
      ],
      notes: 'Homeowner expressed strong interest in the product',
      qualifiedBy: 'admin',
      qualifiedAt: '2023-09-18'
    },
    assignment: {
      assignedTo: 'sales-rep-1',
      assignedAt: '2023-09-18',
      assignedBy: 'admin'
    },
    conversion: {
      converted: false
    },
    activities: [
      { id: '1', type: 'email', description: 'Initial follow-up email sent', timestamp: '2023-09-16', user: 'system' },
      { id: '2', type: 'call', description: 'Qualification call completed', timestamp: '2023-09-17', user: 'admin' },
      { id: '3', type: 'note', description: 'Homeowner interested in learning more about the product', timestamp: '2023-09-17', user: 'admin' }
    ]
  },
  {
    id: '2',
    source: 'website',
    status: 'new',
    createdAt: '2023-09-20',
    lastUpdatedAt: '2023-09-20',
    contact: {
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      phone: '0413 789 012'
    },
    property: {
      address: '42 Park Ave',
      suburb: 'Paddington',
      state: 'NSW',
      postcode: '2021',
      type: 'townhouse',
      estimatedValue: 2200000,
      trafficLightZone: 'Green'
    },
    qualification: {
      score: 0,
      factors: [],
      notes: ''
    },
    conversion: {
      converted: false
    },
    activities: [
      { id: '1', type: 'email', description: 'Automated welcome email sent', timestamp: '2023-09-20', user: 'system' }
    ]
  }
];

const MarketingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [targetProperties, setTargetProperties] = useState<TargetProperty[]>(mockTargetProperties);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(mockCampaigns);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [isLoading, setIsLoading] = useState(false);
  const [showCampaignCreator, setShowCampaignCreator] = useState(false);

  // In a real implementation, this would fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In production, these would be API calls
        // const propertiesResponse = await fetch('/api/underwriting/marketing/properties');
        // const propertiesData = await propertiesResponse.json();
        // setTargetProperties(propertiesData.properties);
        
        // const campaignsResponse = await fetch('/api/underwriting/marketing/campaigns');
        // const campaignsData = await campaignsResponse.json();
        // setCampaigns(campaignsData.campaigns);
        
        // const leadsResponse = await fetch('/api/underwriting/marketing/leads');
        // const leadsData = await leadsResponse.json();
        // setLeads(leadsData.leads);
        
        // For now, we'll use mock data
        setTargetProperties(mockTargetProperties);
        setCampaigns(mockCampaigns);
        setLeads(mockLeads);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateCampaign = () => {
    setShowCampaignCreator(true);
    setActiveTab('campaign-creator');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sales & Marketing Dashboard</h1>
        <Button onClick={handleCreateCampaign}>Create Campaign</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Target Properties</CardTitle>
            <CardDescription>Properties in green zones</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{targetProperties.length}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Updated just now</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Campaigns</CardTitle>
            <CardDescription>Email marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{campaigns.length}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Updated just now</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Leads</CardTitle>
            <CardDescription>Generated leads</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{leads.length}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Updated just now</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Conversion Rate</CardTitle>
            <CardDescription>Lead to application</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {leads.filter(lead => lead.conversion.converted).length > 0
                ? `${((leads.filter(lead => lead.conversion.converted).length / leads.length) * 100).toFixed(1)}%`
                : '0%'}
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Updated just now</p>
          </CardFooter>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="properties">Target Properties</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="campaign-creator">Campaign Creator</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="mailchimp">Mailchimp Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="mt-0">
          <TargetPropertyList properties={targetProperties} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="campaigns" className="mt-0">
          <CampaignManager campaigns={campaigns} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="campaign-creator" className="mt-0">
          <CampaignCreator properties={targetProperties} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="leads" className="mt-0">
          <LeadManager leads={leads} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="mailchimp" className="mt-0">
          <MailchimpIntegration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingDashboard;
