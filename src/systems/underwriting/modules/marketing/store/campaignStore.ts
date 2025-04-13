import { create } from 'zustand';
import { EmailCampaign } from '../types';

interface CampaignState {
  campaigns: EmailCampaign[];
  selectedCampaignId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCampaigns: (campaigns: EmailCampaign[]) => void;
  setSelectedCampaignId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addCampaign: (campaign: EmailCampaign) => void;
  updateCampaign: (id: string, campaign: Partial<EmailCampaign>) => void;
  deleteCampaign: (id: string) => void;
}

// Mock data for development
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

export const useCampaignStore = create<CampaignState>((set) => ({
  campaigns: mockCampaigns,
  selectedCampaignId: null,
  isLoading: false,
  error: null,
  
  // Actions
  setCampaigns: (campaigns) => set({ campaigns }),
  setSelectedCampaignId: (id) => set({ selectedCampaignId: id }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addCampaign: (campaign) => set((state) => ({
    campaigns: [...state.campaigns, campaign]
  })),
  
  updateCampaign: (id, updatedCampaign) => set((state) => ({
    campaigns: state.campaigns.map((camp) =>
      camp.id === id ? { ...camp, ...updatedCampaign } : camp
    )
  })),
  
  deleteCampaign: (id) => set((state) => ({
    campaigns: state.campaigns.filter((camp) => camp.id !== id)
  }))
}));
