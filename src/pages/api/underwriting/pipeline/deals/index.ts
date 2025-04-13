import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
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

  switch (method) {
    case 'GET':
      return getDeals(req, res);
    case 'POST':
      return createDeal(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// GET /api/underwriting/pipeline/deals
async function getDeals(req: NextApiRequest, res: NextApiResponse) {
  try {
    // In production, this would be a call to the Supabase API
    // const { data, error } = await supabase
    //   .from('deals')
    //   .select('*')
    //   .order('created_at', { ascending: false });
    
    // if (error) throw error;
    
    // For now, we'll use mock data
    const data = mockDeals;
    
    // Apply filters if provided
    const { status, search } = req.query;
    
    let filteredDeals = [...data];
    
    if (status && status !== 'all') {
      filteredDeals = filteredDeals.filter(deal => deal.status === status);
    }
    
    if (search) {
      const searchTerm = String(search).toLowerCase();
      filteredDeals = filteredDeals.filter(deal => 
        deal.borrower.name.toLowerCase().includes(searchTerm) ||
        deal.property.address.toLowerCase().includes(searchTerm) ||
        deal.property.suburb.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply pagination
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const paginatedDeals = filteredDeals.slice(offset, offset + limit);
    
    return res.status(200).json({
      total: filteredDeals.length,
      limit,
      offset,
      deals: paginatedDeals
    });
  } catch (error) {
    console.error('Error getting deals:', error);
    return res.status(500).json({ error: 'Failed to get deals' });
  }
}

// POST /api/underwriting/pipeline/deals
async function createDeal(req: NextApiRequest, res: NextApiResponse) {
  try {
    const dealData = req.body;
    
    // Validate required fields
    if (!dealData.borrower || !dealData.property || !dealData.loan) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // In production, this would be a call to the Supabase API
    // const { data, error } = await supabase
    //   .from('deals')
    //   .insert([{
    //     ...dealData,
    //     id: uuidv4(),
    //     status: 'new',
    //     submitted_at: new Date().toISOString(),
    //     last_updated_at: new Date().toISOString()
    //   }])
    //   .select();
    
    // if (error) throw error;
    
    // For now, we'll create a mock deal
    const newDeal: Deal = {
      ...dealData,
      id: uuidv4(),
      status: 'new',
      submittedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString()
    };
    
    // Add to mock data (in a real implementation, this would be stored in the database)
    mockDeals.push(newDeal);
    
    return res.status(201).json({ deal: newDeal });
  } catch (error) {
    console.error('Error creating deal:', error);
    return res.status(500).json({ error: 'Failed to create deal' });
  }
}
