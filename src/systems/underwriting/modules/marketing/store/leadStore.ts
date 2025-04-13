import { create } from 'zustand';
import { Lead } from '../types';

interface LeadState {
  leads: Lead[];
  selectedLeadId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setLeads: (leads: Lead[]) => void;
  setSelectedLeadId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addLead: (lead: Lead) => void;
  updateLead: (id: string, lead: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
}

// Mock data for development
const mockLeads: Lead[] = [
  {
    id: '1',
    propertyId: '1',
    campaignId: '1',
    status: 'new',
    createdAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    owner: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '0412 345 678'
    },
    property: {
      address: '123 Main St',
      suburb: 'Mosman',
      state: 'NSW',
      postcode: '2088',
      estimatedValue: 2500000
    },
    interactions: [
      {
        type: 'email_open',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        details: {
          campaignId: '1',
          campaignName: 'Spring Campaign'
        }
      },
      {
        type: 'email_click',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        details: {
          campaignId: '1',
          campaignName: 'Spring Campaign',
          linkUrl: 'https://equihome.com/learn-more'
        }
      },
      {
        type: 'website_visit',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        details: {
          page: '/learn-more',
          duration: 120,
          source: 'email'
        }
      }
    ],
    notes: [
      {
        id: '1',
        text: 'Interested in learning more about the product',
        createdBy: 'system',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    score: 75
  },
  {
    id: '2',
    propertyId: '2',
    campaignId: '1',
    status: 'contacted',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    owner: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '0412 987 654'
    },
    property: {
      address: '456 High St',
      suburb: 'Double Bay',
      state: 'NSW',
      postcode: '2028',
      estimatedValue: 1800000
    },
    interactions: [
      {
        type: 'email_open',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        details: {
          campaignId: '1',
          campaignName: 'Spring Campaign'
        }
      },
      {
        type: 'phone_call',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        details: {
          duration: 15,
          outcome: 'interested',
          agent: 'Sarah Johnson'
        }
      }
    ],
    notes: [
      {
        id: '2',
        text: 'Called to discuss options, interested in scheduling a meeting',
        createdBy: 'Sarah Johnson',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    score: 85
  }
];

export const useLeadStore = create<LeadState>((set) => ({
  leads: mockLeads,
  selectedLeadId: null,
  isLoading: false,
  error: null,
  
  // Actions
  setLeads: (leads) => set({ leads }),
  setSelectedLeadId: (id) => set({ selectedLeadId: id }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addLead: (lead) => set((state) => ({
    leads: [...state.leads, lead]
  })),
  
  updateLead: (id, updatedLead) => set((state) => ({
    leads: state.leads.map((lead) =>
      lead.id === id ? { ...lead, ...updatedLead } : lead
    )
  })),
  
  deleteLead: (id) => set((state) => ({
    leads: state.leads.filter((lead) => lead.id !== id)
  }))
}));
