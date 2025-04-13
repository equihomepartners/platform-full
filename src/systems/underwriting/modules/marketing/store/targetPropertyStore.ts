import { create } from 'zustand';
import { TargetProperty } from '../types';

interface TargetPropertyState {
  properties: TargetProperty[];
  selectedPropertyId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setProperties: (properties: TargetProperty[]) => void;
  setSelectedPropertyId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addProperty: (property: TargetProperty) => void;
  updateProperty: (id: string, property: Partial<TargetProperty>) => void;
  deleteProperty: (id: string) => void;
}

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

export const useTargetPropertyStore = create<TargetPropertyState>((set) => ({
  properties: mockTargetProperties,
  selectedPropertyId: null,
  isLoading: false,
  error: null,
  
  // Actions
  setProperties: (properties) => set({ properties }),
  setSelectedPropertyId: (id) => set({ selectedPropertyId: id }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addProperty: (property) => set((state) => ({
    properties: [...state.properties, property]
  })),
  
  updateProperty: (id, updatedProperty) => set((state) => ({
    properties: state.properties.map((prop) =>
      prop.id === id ? { ...prop, ...updatedProperty } : prop
    )
  })),
  
  deleteProperty: (id) => set((state) => ({
    properties: state.properties.filter((prop) => prop.id !== id)
  }))
}));
