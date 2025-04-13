import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { AnalyticsOverview } from '@/systems/underwriting/modules/analytics/types';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eyycsgfueefgdtqujwam.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eWNzZ2Z1ZWVmZ2R0cXVqd2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDUzNTUsImV4cCI6MjA1OTg4MTM1NX0.j795Be2iRyTmBwn-5g_bPPgVmppwnjTko_KWKAUyMhk';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for development
const mockAnalyticsOverview: AnalyticsOverview = {
  pipelineMetrics: {
    totalDeals: 45,
    activeDeals: 32,
    approvalRate: 85,
    averageProcessingTime: 7.5
  },
  underwritingMetrics: {
    totalApplications: 38,
    approvedApplications: 25,
    rejectedApplications: 8,
    averageLTV: 65.2,
    averageIRR: 9.2
  },
  marketingMetrics: {
    totalCampaigns: 5,
    totalLeads: 87,
    conversionRate: 12.5,
    averageROI: 320
  },
  overallMetrics: {
    totalLoans: 25,
    totalLoanAmount: 12500000,
    averageIRR: 9.2,
    portfolioGrowth: 15.5
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getAnalyticsOverview(req, res);
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// GET /api/underwriting/analytics/overview
async function getAnalyticsOverview(req: NextApiRequest, res: NextApiResponse) {
  try {
    // In production, this would be a call to the Supabase API or a calculation based on other data
    // For now, we'll use mock data
    return res.status(200).json(mockAnalyticsOverview);
  } catch (error) {
    console.error('Error getting analytics overview:', error);
    return res.status(500).json({ error: 'Failed to get analytics overview' });
  }
}
