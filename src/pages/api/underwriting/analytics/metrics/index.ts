import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { PerformanceMetric } from '@/systems/underwriting/modules/analytics/types';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eyycsgfueefgdtqujwam.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eWNzZ2Z1ZWVmZ2R0cXVqd2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDUzNTUsImV4cCI6MjA1OTg4MTM1NX0.j795Be2iRyTmBwn-5g_bPPgVmppwnjTko_KWKAUyMhk';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for development
const mockPerformanceMetrics: PerformanceMetric[] = [
  {
    id: '1',
    name: 'Approval Rate',
    description: 'Percentage of applications approved',
    category: 'underwriting',
    value: 85,
    unit: '%',
    target: 80,
    threshold: {
      warning: 70,
      critical: 60
    },
    trend: {
      direction: 'up',
      percentage: 5
    },
    history: [
      { timestamp: '2023-08-01', value: 80 },
      { timestamp: '2023-09-01', value: 82 },
      { timestamp: '2023-10-01', value: 85 }
    ],
    lastUpdatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Average IRR',
    description: 'Average internal rate of return',
    category: 'overall',
    value: 9.2,
    unit: '%',
    target: 8,
    threshold: {
      warning: 7,
      critical: 6
    },
    trend: {
      direction: 'up',
      percentage: 2.2
    },
    history: [
      { timestamp: '2023-08-01', value: 8.8 },
      { timestamp: '2023-09-01', value: 9.0 },
      { timestamp: '2023-10-01', value: 9.2 }
    ],
    lastUpdatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Lead Conversion Rate',
    description: 'Percentage of leads converted to applications',
    category: 'marketing',
    value: 12.5,
    unit: '%',
    target: 10,
    threshold: {
      warning: 8,
      critical: 5
    },
    trend: {
      direction: 'up',
      percentage: 25
    },
    history: [
      { timestamp: '2023-08-01', value: 9.5 },
      { timestamp: '2023-09-01', value: 10.8 },
      { timestamp: '2023-10-01', value: 12.5 }
    ],
    lastUpdatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Average Processing Time',
    description: 'Average time to process an application (days)',
    category: 'pipeline',
    value: 7.5,
    unit: 'days',
    target: 7,
    threshold: {
      warning: 10,
      critical: 14
    },
    trend: {
      direction: 'down',
      percentage: 6.25
    },
    history: [
      { timestamp: '2023-08-01', value: 8.5 },
      { timestamp: '2023-09-01', value: 8.0 },
      { timestamp: '2023-10-01', value: 7.5 }
    ],
    lastUpdatedAt: new Date().toISOString()
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getMetrics(req, res);
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// GET /api/underwriting/analytics/metrics
async function getMetrics(req: NextApiRequest, res: NextApiResponse) {
  try {
    // In production, this would be a call to the Supabase API
    // const { data, error } = await supabase
    //   .from('performance_metrics')
    //   .select('*')
    //   .order('name', { ascending: true });
    
    // if (error) throw error;
    
    // For now, we'll use mock data
    const data = mockPerformanceMetrics;
    
    // Apply filters if provided
    const { category } = req.query;
    
    let filteredMetrics = [...data];
    
    if (category && category !== 'all') {
      filteredMetrics = filteredMetrics.filter(metric => metric.category === category);
    }
    
    return res.status(200).json({
      total: filteredMetrics.length,
      metrics: filteredMetrics
    });
  } catch (error) {
    console.error('Error getting metrics:', error);
    return res.status(500).json({ error: 'Failed to get metrics' });
  }
}
