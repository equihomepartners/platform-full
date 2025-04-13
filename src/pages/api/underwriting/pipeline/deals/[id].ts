import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { Deal } from '@/systems/underwriting/modules/pipeline/types';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eyycsgfueefgdtqujwam.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eWNzZ2Z1ZWVmZ2R0cXVqd2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDUzNTUsImV4cCI6MjA1OTg4MTM1NX0.j795Be2iRyTmBwn-5g_bPPgVmppwnjTko_KWKAUyMhk';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for development
const mockDeals: Deal[] = [
  {
    id: '1',
    status: 'new',
    submittedAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    borrower: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '0412 345 678',
      annualIncome: 150000,
      employmentStatus: 'employed'
    },
    property: {
      address: '123 Main St',
      suburb: 'Mosman',
      state: 'NSW',
      postcode: '2088',
      type: 'house',
      bedrooms: 4,
      bathrooms: 2,
      landSize: 500,
      currentValue: 2500000,
      mortgageBalance: 1000000
    },
    loan: {
      amount: 500000,
      purpose: 'renovation',
      term: 10
    }
  },
  {
    id: '2',
    status: 'in-review',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    borrower: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '0412 987 654',
      annualIncome: 180000,
      employmentStatus: 'self-employed'
    },
    property: {
      address: '456 High St',
      suburb: 'Double Bay',
      state: 'NSW',
      postcode: '2028',
      type: 'apartment',
      bedrooms: 3,
      bathrooms: 2,
      landSize: 0,
      currentValue: 1800000,
      mortgageBalance: 900000
    },
    loan: {
      amount: 300000,
      purpose: 'investment',
      term: 10
    }
  },
  {
    id: '3',
    status: 'underwriting',
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    borrower: {
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '0413 456 789',
      annualIncome: 200000,
      employmentStatus: 'employed'
    },
    property: {
      address: '789 Beach Rd',
      suburb: 'Bondi',
      state: 'NSW',
      postcode: '2026',
      type: 'house',
      bedrooms: 5,
      bathrooms: 3,
      landSize: 600,
      currentValue: 3200000,
      mortgageBalance: 1500000
    },
    loan: {
      amount: 800000,
      purpose: 'renovation',
      term: 10
    }
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid deal ID' });
  }

  switch (method) {
    case 'GET':
      return getDeal(req, res, id);
    case 'PUT':
      return updateDeal(req, res, id);
    case 'DELETE':
      return deleteDeal(req, res, id);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// GET /api/underwriting/pipeline/deals/[id]
async function getDeal(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    // In production, this would be a call to the Supabase API
    // const { data, error } = await supabase
    //   .from('deals')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    
    // if (error) throw error;
    // if (!data) return res.status(404).json({ error: 'Deal not found' });
    
    // For now, we'll use mock data
    const deal = mockDeals.find(deal => deal.id === id);
    
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    
    return res.status(200).json({ deal });
  } catch (error) {
    console.error('Error getting deal:', error);
    return res.status(500).json({ error: 'Failed to get deal' });
  }
}

// PUT /api/underwriting/pipeline/deals/[id]
async function updateDeal(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const dealData = req.body;
    
    // In production, this would be a call to the Supabase API
    // const { data, error } = await supabase
    //   .from('deals')
    //   .update({
    //     ...dealData,
    //     last_updated_at: new Date().toISOString()
    //   })
    //   .eq('id', id)
    //   .select();
    
    // if (error) throw error;
    // if (!data || data.length === 0) return res.status(404).json({ error: 'Deal not found' });
    
    // For now, we'll update the mock data
    const dealIndex = mockDeals.findIndex(deal => deal.id === id);
    
    if (dealIndex === -1) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    
    const updatedDeal: Deal = {
      ...mockDeals[dealIndex],
      ...dealData,
      id, // Ensure ID doesn't change
      lastUpdatedAt: new Date().toISOString()
    };
    
    mockDeals[dealIndex] = updatedDeal;
    
    return res.status(200).json({ deal: updatedDeal });
  } catch (error) {
    console.error('Error updating deal:', error);
    return res.status(500).json({ error: 'Failed to update deal' });
  }
}

// DELETE /api/underwriting/pipeline/deals/[id]
async function deleteDeal(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    // In production, this would be a call to the Supabase API
    // const { error } = await supabase
    //   .from('deals')
    //   .delete()
    //   .eq('id', id);
    
    // if (error) throw error;
    
    // For now, we'll update the mock data
    const dealIndex = mockDeals.findIndex(deal => deal.id === id);
    
    if (dealIndex === -1) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    
    mockDeals.splice(dealIndex, 1);
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting deal:', error);
    return res.status(500).json({ error: 'Failed to delete deal' });
  }
}
