import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { LoanApplication } from '@/systems/underwriting/modules/underwriting/types';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eyycsgfueefgdtqujwam.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eWNzZ2Z1ZWVmZ2R0cXVqd2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDUzNTUsImV4cCI6MjA1OTg4MTM1NX0.j795Be2iRyTmBwn-5g_bPPgVmppwnjTko_KWKAUyMhk';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for development
const mockApplications: LoanApplication[] = [
  {
    id: '1',
    status: 'submitted',
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
    status: 'approved',
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
    },
    decision: {
      id: '1',
      applicationId: '3',
      decision: 'approved',
      decisionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      decisionBy: 'system',
      automated: true,
      overridden: false,
      terms: {
        amount: 800000,
        interestRate: 5,
        term: 10,
        originationFee: 3,
        appreciationShare: 20
      },
      conditions: [
        'Property valuation must be confirmed',
        'Borrower must provide proof of income'
      ],
      rationale: [
        'Property is in a green zone',
        'LTV ratio is within acceptable range',
        'Borrower has strong income'
      ],
      financialProjections: {
        irr: 9.5,
        totalReturn: 1200000,
        yearlyBreakdown: [
          {
            year: 1,
            propertyValue: 3328000,
            accruedInterest: 40000,
            appreciationShare: 0,
            totalReturn: 40000
          },
          {
            year: 2,
            propertyValue: 3461120,
            accruedInterest: 82000,
            appreciationShare: 0,
            totalReturn: 82000
          }
        ]
      }
    }
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getApplications(req, res);
    case 'POST':
      return createApplication(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// GET /api/underwriting/applications
async function getApplications(req: NextApiRequest, res: NextApiResponse) {
  try {
    // In production, this would be a call to the Supabase API
    // const { data, error } = await supabase
    //   .from('loan_applications')
    //   .select('*')
    //   .order('submitted_at', { ascending: false });
    
    // if (error) throw error;
    
    // For now, we'll use mock data
    const data = mockApplications;
    
    // Apply filters if provided
    const { status, search } = req.query;
    
    let filteredApplications = [...data];
    
    if (status && status !== 'all') {
      filteredApplications = filteredApplications.filter(app => app.status === status);
    }
    
    if (search) {
      const searchTerm = String(search).toLowerCase();
      filteredApplications = filteredApplications.filter(app => 
        app.borrower.name.toLowerCase().includes(searchTerm) ||
        app.property.address.toLowerCase().includes(searchTerm) ||
        app.property.suburb.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply pagination
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const paginatedApplications = filteredApplications.slice(offset, offset + limit);
    
    return res.status(200).json({
      total: filteredApplications.length,
      limit,
      offset,
      applications: paginatedApplications
    });
  } catch (error) {
    console.error('Error getting applications:', error);
    return res.status(500).json({ error: 'Failed to get applications' });
  }
}

// POST /api/underwriting/applications
async function createApplication(req: NextApiRequest, res: NextApiResponse) {
  try {
    const applicationData = req.body;
    
    // Validate required fields
    if (!applicationData.borrower || !applicationData.property || !applicationData.loan) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // In production, this would be a call to the Supabase API
    // const { data, error } = await supabase
    //   .from('loan_applications')
    //   .insert([{
    //     ...applicationData,
    //     id: uuidv4(),
    //     status: 'submitted',
    //     submitted_at: new Date().toISOString(),
    //     last_updated_at: new Date().toISOString()
    //   }])
    //   .select();
    
    // if (error) throw error;
    
    // For now, we'll create a mock application
    const newApplication: LoanApplication = {
      ...applicationData,
      id: uuidv4(),
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString()
    };
    
    // Add to mock data (in a real implementation, this would be stored in the database)
    mockApplications.push(newApplication);
    
    return res.status(201).json({ application: newApplication });
  } catch (error) {
    console.error('Error creating application:', error);
    return res.status(500).json({ error: 'Failed to create application' });
  }
}
