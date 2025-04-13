import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { EmailCampaign } from '@/systems/underwriting/modules/marketing/types';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eyycsgfueefgdtqujwam.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eWNzZ2Z1ZWVmZ2R0cXVqd2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDUzNTUsImV4cCI6MjA1OTg4MTM1NX0.j795Be2iRyTmBwn-5g_bPPgVmppwnjTko_KWKAUyMhk';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getCampaigns(req, res);
    case 'POST':
      return createCampaign(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// GET /api/underwriting/marketing/campaigns
async function getCampaigns(req: NextApiRequest, res: NextApiResponse) {
  try {
    // In production, this would be a call to the Supabase API
    // const { data, error } = await supabase
    //   .from('email_campaigns')
    //   .select('*')
    //   .order('created_at', { ascending: false });
    
    // if (error) throw error;
    
    // For now, we'll use mock data
    const data = mockCampaigns;
    
    // Apply filters if provided
    const { status, search } = req.query;
    
    let filteredCampaigns = [...data];
    
    if (status && status !== 'all') {
      filteredCampaigns = filteredCampaigns.filter(campaign => campaign.status === status);
    }
    
    if (search) {
      const searchTerm = String(search).toLowerCase();
      filteredCampaigns = filteredCampaigns.filter(campaign => 
        campaign.name.toLowerCase().includes(searchTerm) ||
        campaign.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply pagination
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const paginatedCampaigns = filteredCampaigns.slice(offset, offset + limit);
    
    return res.status(200).json({
      total: filteredCampaigns.length,
      limit,
      offset,
      campaigns: paginatedCampaigns
    });
  } catch (error) {
    console.error('Error getting campaigns:', error);
    return res.status(500).json({ error: 'Failed to get campaigns' });
  }
}

// POST /api/underwriting/marketing/campaigns
async function createCampaign(req: NextApiRequest, res: NextApiResponse) {
  try {
    const campaignData = req.body;
    
    // Validate required fields
    if (!campaignData.name || !campaignData.audience || !campaignData.content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // In production, this would be a call to the Supabase API
    // const { data, error } = await supabase
    //   .from('email_campaigns')
    //   .insert([{
    //     ...campaignData,
    //     id: uuidv4(),
    //     status: 'draft',
    //     created_at: new Date().toISOString(),
    //     created_by: 'admin' // In a real implementation, this would be the authenticated user
    //   }])
    //   .select();
    
    // if (error) throw error;
    
    // For now, we'll create a mock campaign
    const newCampaign: EmailCampaign = {
      ...campaignData,
      id: uuidv4(),
      status: 'draft',
      createdAt: new Date().toISOString(),
      createdBy: 'admin', // In a real implementation, this would be the authenticated user
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
    };
    
    // Add to mock data (in a real implementation, this would be stored in the database)
    mockCampaigns.push(newCampaign);
    
    return res.status(201).json({ campaign: newCampaign });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return res.status(500).json({ error: 'Failed to create campaign' });
  }
}
