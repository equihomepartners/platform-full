import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { Deal, DealRankingResult, RankingCriteria } from '@/systems/underwriting/modules/pipeline/types';

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

// Mock ranking criteria
const mockRankingCriteria: RankingCriteria[] = [
  { id: '1', name: 'Traffic Light Zone', description: 'Ranking based on Traffic Light System zone', weight: 0.3, source: 'tfs', active: true },
  { id: '2', name: 'LTV Ratio', description: 'Ranking based on loan-to-value ratio', weight: 0.2, source: 'manual', active: true },
  { id: '3', name: 'Property Value', description: 'Ranking based on property value', weight: 0.15, source: 'manual', active: true },
  { id: '4', name: 'Borrower Income', description: 'Ranking based on borrower income', weight: 0.15, source: 'manual', active: true },
  { id: '5', name: 'Portfolio Fit', description: 'Ranking based on fit with current portfolio', weight: 0.2, source: 'pms', active: true }
];

// Mock rankings
let mockRankings: DealRankingResult[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getRankings(req, res);
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// GET /api/underwriting/pipeline/rankings
async function getRankings(req: NextApiRequest, res: NextApiResponse) {
  try {
    // In production, this would be a call to the Supabase API
    // const { data, error } = await supabase
    //   .from('deal_rankings')
    //   .select('*')
    //   .order('rank', { ascending: true });
    
    // if (error) throw error;
    
    // If no rankings exist, calculate them
    if (mockRankings.length === 0) {
      mockRankings = calculateRankings(mockDeals, mockRankingCriteria);
    }
    
    return res.status(200).json({
      rankings: mockRankings,
      criteria: mockRankingCriteria
    });
  } catch (error) {
    console.error('Error getting rankings:', error);
    return res.status(500).json({ error: 'Failed to get rankings' });
  }
}

// Calculate rankings for deals
function calculateRankings(deals: Deal[], criteria: RankingCriteria[]): DealRankingResult[] {
  const rankings: DealRankingResult[] = deals.map(deal => {
    // Calculate scores for each criterion
    const criteriaScores = criteria.map(criterion => {
      let score = 0;
      
      // Calculate score based on criterion
      switch (criterion.name) {
        case 'Traffic Light Zone':
          // Green zones get higher scores
          score = deal.property.suburb === 'Mosman' || deal.property.suburb === 'Double Bay' || deal.property.suburb === 'Bondi' ? 0.9 : 0.7;
          break;
        case 'LTV Ratio':
          // Lower LTV ratios get higher scores
          const ltv = (deal.loan.amount / deal.property.currentValue) * 100;
          score = ltv < 50 ? 0.9 : ltv < 70 ? 0.7 : 0.5;
          break;
        case 'Property Value':
          // Higher property values get higher scores
          score = deal.property.currentValue > 2000000 ? 0.8 : 0.6;
          break;
        case 'Borrower Income':
          // Higher incomes get higher scores
          score = deal.borrower.annualIncome > 150000 ? 0.85 : 0.65;
          break;
        case 'Portfolio Fit':
          // Random score for portfolio fit
          score = Math.random() * 0.5 + 0.5; // Random score between 0.5 and 1.0
          break;
        default:
          score = 0.5;
      }
      
      return {
        name: criterion.name,
        weight: criterion.weight,
        score
      };
    });
    
    // Calculate overall score
    const overallScore = criteriaScores.reduce((sum, criterion) => sum + criterion.score * criterion.weight, 0);
    
    return {
      dealId: deal.id,
      score: overallScore,
      rank: 0, // Will be set after sorting
      criteria: criteriaScores
    };
  });
  
  // Sort by score (descending) and assign ranks
  rankings.sort((a, b) => b.score - a.score);
  rankings.forEach((ranking, index) => {
    ranking.rank = index + 1;
  });
  
  return rankings;
}
