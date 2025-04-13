import { create } from 'zustand';

interface MailchimpAccount {
  id: string;
  name: string;
  email: string;
  username: string;
  apiKey: string;
  isConnected: boolean;
  lastSyncedAt: string | null;
}

interface MailchimpAudience {
  id: string;
  name: string;
  memberCount: number;
  dateCreated: string;
  stats: {
    openRate: number;
    clickRate: number;
    unsubscribeRate: number;
  };
}

interface MailchimpTemplate {
  id: string;
  name: string;
  type: string;
  dateCreated: string;
  lastModified: string;
  previewUrl: string;
  thumbnailUrl: string;
}

interface MailchimpState {
  account: MailchimpAccount | null;
  audiences: MailchimpAudience[];
  templates: MailchimpTemplate[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setAccount: (account: MailchimpAccount | null) => void;
  setAudiences: (audiences: MailchimpAudience[]) => void;
  setTemplates: (templates: MailchimpTemplate[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  connectAccount: (apiKey: string) => void;
  disconnectAccount: () => void;
  syncAudiences: () => void;
  syncTemplates: () => void;
}

// Mock data for development
const mockAccount: MailchimpAccount = {
  id: 'mc-account-123',
  name: 'Equihome Marketing',
  email: 'marketing@equihome.com',
  username: 'equihome',
  apiKey: 'abc123def456ghi789',
  isConnected: true,
  lastSyncedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
};

const mockAudiences: MailchimpAudience[] = [
  {
    id: 'mc-audience-123',
    name: 'Green Zone Homeowners',
    memberCount: 150,
    dateCreated: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    stats: {
      openRate: 45.5,
      clickRate: 22.3,
      unsubscribeRate: 1.2
    }
  },
  {
    id: 'mc-audience-456',
    name: 'High-Value Properties',
    memberCount: 75,
    dateCreated: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    stats: {
      openRate: 52.8,
      clickRate: 28.6,
      unsubscribeRate: 0.8
    }
  },
  {
    id: 'mc-audience-789',
    name: 'Previous Inquiries',
    memberCount: 210,
    dateCreated: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    stats: {
      openRate: 38.2,
      clickRate: 15.7,
      unsubscribeRate: 2.1
    }
  }
];

const mockTemplates: MailchimpTemplate[] = [
  {
    id: 'mc-template-123',
    name: 'Standard Equity Release',
    type: 'user',
    dateCreated: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    lastModified: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    previewUrl: 'https://mailchimp.com/templates/preview/123',
    thumbnailUrl: 'https://mailchimp.com/templates/thumbnail/123'
  },
  {
    id: 'mc-template-456',
    name: 'Spring Campaign',
    type: 'user',
    dateCreated: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    lastModified: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    previewUrl: 'https://mailchimp.com/templates/preview/456',
    thumbnailUrl: 'https://mailchimp.com/templates/thumbnail/456'
  },
  {
    id: 'mc-template-789',
    name: 'Summer Campaign',
    type: 'user',
    dateCreated: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    previewUrl: 'https://mailchimp.com/templates/preview/789',
    thumbnailUrl: 'https://mailchimp.com/templates/thumbnail/789'
  }
];

export const useMailchimpStore = create<MailchimpState>((set) => ({
  account: mockAccount,
  audiences: mockAudiences,
  templates: mockTemplates,
  isLoading: false,
  error: null,
  
  // Actions
  setAccount: (account) => set({ account }),
  setAudiences: (audiences) => set({ audiences }),
  setTemplates: (templates) => set({ templates }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  connectAccount: (apiKey) => {
    set({ isLoading: true });
    
    // In a real implementation, this would call an API to connect to Mailchimp
    // For now, we'll just simulate a successful connection
    
    setTimeout(() => {
      set({
        account: {
          ...mockAccount,
          apiKey,
          isConnected: true,
          lastSyncedAt: new Date().toISOString()
        },
        isLoading: false
      });
    }, 1000);
  },
  
  disconnectAccount: () => {
    set({ isLoading: true });
    
    // In a real implementation, this would call an API to disconnect from Mailchimp
    // For now, we'll just simulate a successful disconnection
    
    setTimeout(() => {
      set({
        account: null,
        audiences: [],
        templates: [],
        isLoading: false
      });
    }, 1000);
  },
  
  syncAudiences: () => {
    set({ isLoading: true });
    
    // In a real implementation, this would call an API to sync audiences from Mailchimp
    // For now, we'll just simulate a successful sync
    
    setTimeout(() => {
      set((state) => ({
        account: state.account ? {
          ...state.account,
          lastSyncedAt: new Date().toISOString()
        } : null,
        audiences: mockAudiences,
        isLoading: false
      }));
    }, 1000);
  },
  
  syncTemplates: () => {
    set({ isLoading: true });
    
    // In a real implementation, this would call an API to sync templates from Mailchimp
    // For now, we'll just simulate a successful sync
    
    setTimeout(() => {
      set((state) => ({
        account: state.account ? {
          ...state.account,
          lastSyncedAt: new Date().toISOString()
        } : null,
        templates: mockTemplates,
        isLoading: false
      }));
    }, 1000);
  }
}));
