import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { TargetProperty } from '@/systems/underwriting/modules/marketing/types';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eyycsgfueefgdtqujwam.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eWNzZ2Z1ZWVmZ2R0cXVqd2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDUzNTUsImV4cCI6MjA1OTg4MTM1NX0.j795Be2iRyTmBwn-5g_bPPgVmppwnjTko_KWKAUyMhk';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for development
const mockTargetProperties: TargetProperty[] = [
  {
    id: '1',
    address: '123 Main St',
    suburb: 'Mosman',
    state: 'NSW',
    postcode: '2088',
    type: 'house',
    bedrooms: 4,
    bathrooms: 2,
    landSize: 500,
    estimatedValue: 2500000,
    trafficLightZone: 'Green',
    owner: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '0412 345 678'
    },
    investmentPotential: {
      score: 85,
      rank: 1,
      factors: [
        { name: 'Location', weight: 0.3, score: 0.9 },
        { name: 'Property Value', weight: 0.2, score: 0.8 },
        { name: 'Growth Potential', weight: 0.5, score: 0.8 }
      ]
    },
    campaigns: [
      { id: '1', name: 'Spring Campaign', sentAt: '2023-09-15', opened: true, clicked: true, converted: false }
    ]
  },
  {
    id: '2',
    address: '456 High St',
    suburb: 'Double Bay',
    state: 'NSW',
    postcode: '2028',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    landSize: 0,
    estimatedValue: 1800000,
    trafficLightZone: 'Green',
    owner: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '0412 987 654'
    },
    investmentPotential: {
      score: 80,
      rank: 2,
      factors: [
        { name: 'Location', weight: 0.3, score: 0.9 },
        { name: 'Property Value', weight: 0.2, score: 0.7 },
        { name: 'Growth Potential', weight: 0.5, score: 0.75 }
      ]
    },
    campaigns: [
      { id: '1', name: 'Spring Campaign', sentAt: '2023-09-15', opened: true, clicked: false, converted: false }
    ]
  },
  {
    id: '3',
    address: '789 Beach Rd',
    suburb: 'Bondi',
    state: 'NSW',
    postcode: '2026',
    type: 'house',
    bedrooms: 5,
    bathrooms: 3,
    landSize: 600,
    estimatedValue: 3200000,
    trafficLightZone: 'Green',
    owner: {
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '0413 456 789'
    },
    investmentPotential: {
      score: 78,
      rank: 3,
      factors: [
        { name: 'Location', weight: 0.3, score: 0.85 },
        { name: 'Property Value', weight: 0.2, score: 0.9 },
        { name: 'Growth Potential', weight: 0.5, score: 0.7 }
      ]
    },
    campaigns: []
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getTargetProperties(req, res);
    case 'POST':
      return createTargetProperty(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// GET /api/underwriting/marketing/properties
async function getTargetProperties(req: NextApiRequest, res: NextApiResponse) {
  try {
    // In production, this would be a call to the Supabase API
    // const { data, error } = await supabase
    //   .from('target_properties')
    //   .select('*')
    //   .order('investment_potential->score', { ascending: false });
    
    // if (error) throw error;
    
    // For now, we'll use mock data
    const data = mockTargetProperties;
    
    // Apply filters if provided
    const { zone, suburb, type, minValue, maxValue, search } = req.query;
    
    let filteredProperties = [...data];
    
    if (zone && zone !== 'all') {
      filteredProperties = filteredProperties.filter(property => property.trafficLightZone === zone);
    }
    
    if (suburb && suburb !== 'all') {
      filteredProperties = filteredProperties.filter(property => property.suburb === suburb);
    }
    
    if (type && type !== 'all') {
      filteredProperties = filteredProperties.filter(property => property.type === type);
    }
    
    if (minValue) {
      const min = parseInt(minValue as string);
      filteredProperties = filteredProperties.filter(property => property.estimatedValue >= min);
    }
    
    if (maxValue) {
      const max = parseInt(maxValue as string);
      filteredProperties = filteredProperties.filter(property => property.estimatedValue <= max);
    }
    
    if (search) {
      const searchTerm = String(search).toLowerCase();
      filteredProperties = filteredProperties.filter(property => 
        property.address.toLowerCase().includes(searchTerm) ||
        property.suburb.toLowerCase().includes(searchTerm) ||
        (property.owner?.name && property.owner.name.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply pagination
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const paginatedProperties = filteredProperties.slice(offset, offset + limit);
    
    return res.status(200).json({
      total: filteredProperties.length,
      limit,
      offset,
      properties: paginatedProperties
    });
  } catch (error) {
    console.error('Error getting target properties:', error);
    return res.status(500).json({ error: 'Failed to get target properties' });
  }
}

// POST /api/underwriting/marketing/properties
async function createTargetProperty(req: NextApiRequest, res: NextApiResponse) {
  try {
    const propertyData = req.body;
    
    // Validate required fields
    if (!propertyData.address || !propertyData.suburb || !propertyData.state || !propertyData.postcode || !propertyData.type || !propertyData.estimatedValue || !propertyData.trafficLightZone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // In production, this would be a call to the Supabase API
    // const { data, error } = await supabase
    //   .from('target_properties')
    //   .insert([{
    //     ...propertyData,
    //     id: uuidv4(),
    //     campaigns: []
    //   }])
    //   .select();
    
    // if (error) throw error;
    
    // For now, we'll create a mock property
    const newProperty: TargetProperty = {
      ...propertyData,
      id: uuidv4(),
      investmentPotential: propertyData.investmentPotential || {
        score: Math.floor(Math.random() * 20) + 70, // Random score between 70 and 90
        rank: mockTargetProperties.length + 1,
        factors: [
          { name: 'Location', weight: 0.3, score: Math.random() * 0.3 + 0.6 },
          { name: 'Property Value', weight: 0.2, score: Math.random() * 0.3 + 0.6 },
          { name: 'Growth Potential', weight: 0.5, score: Math.random() * 0.3 + 0.6 }
        ]
      },
      campaigns: []
    };
    
    // Add to mock data (in a real implementation, this would be stored in the database)
    mockTargetProperties.push(newProperty);
    
    // Re-rank properties
    mockTargetProperties.sort((a, b) => b.investmentPotential.score - a.investmentPotential.score);
    mockTargetProperties.forEach((property, index) => {
      property.investmentPotential.rank = index + 1;
    });
    
    return res.status(201).json({ property: newProperty });
  } catch (error) {
    console.error('Error creating target property:', error);
    return res.status(500).json({ error: 'Failed to create target property' });
  }
}
