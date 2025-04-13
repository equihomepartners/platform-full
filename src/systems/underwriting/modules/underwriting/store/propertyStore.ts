import { create } from 'zustand';
import { PropertyValuation, ComparableProperty } from '../types';

interface PropertyState {
  propertyValuations: PropertyValuation[];
  selectedPropertyId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setPropertyValuations: (valuations: PropertyValuation[]) => void;
  setSelectedPropertyId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addPropertyValuation: (valuation: PropertyValuation) => void;
  updatePropertyValuation: (id: string, valuation: Partial<PropertyValuation>) => void;
  deletePropertyValuation: (id: string) => void;
}

// Mock data for development
const mockPropertyValuations: PropertyValuation[] = [
  {
    id: 'valuation-1',
    propertyId: '1',
    estimatedValue: 2550000,
    confidenceScore: 85,
    valuationDate: new Date().toISOString(),
    source: 'proptrack',
    comparableProperties: [
      {
        address: '125 Main St, Mosman, NSW',
        suburb: 'Mosman',
        state: 'NSW',
        postcode: '2088',
        type: 'house',
        bedrooms: 4,
        bathrooms: 2,
        landSize: 520,
        salePrice: 2600000,
        saleDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        distanceKm: 0.2
      },
      {
        address: '127 Main St, Mosman, NSW',
        suburb: 'Mosman',
        state: 'NSW',
        postcode: '2088',
        type: 'house',
        bedrooms: 3,
        bathrooms: 2,
        landSize: 480,
        salePrice: 2450000,
        saleDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        distanceKm: 0.3
      },
      {
        address: '130 Main St, Mosman, NSW',
        suburb: 'Mosman',
        state: 'NSW',
        postcode: '2088',
        type: 'house',
        bedrooms: 4,
        bathrooms: 3,
        landSize: 550,
        salePrice: 2700000,
        saleDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        distanceKm: 0.5
      }
    ],
    marketTrends: [
      { period: 'month', growthRate: 0.8 },
      { period: 'quarter', growthRate: 2.1 },
      { period: 'year', growthRate: 5.5 }
    ]
  },
  {
    id: 'valuation-2',
    propertyId: '2',
    estimatedValue: 1850000,
    confidenceScore: 82,
    valuationDate: new Date().toISOString(),
    source: 'proptrack',
    comparableProperties: [
      {
        address: '458 High St, Double Bay, NSW',
        suburb: 'Double Bay',
        state: 'NSW',
        postcode: '2028',
        type: 'apartment',
        bedrooms: 3,
        bathrooms: 2,
        landSize: 0,
        salePrice: 1900000,
        saleDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        distanceKm: 0.1
      },
      {
        address: '460 High St, Double Bay, NSW',
        suburb: 'Double Bay',
        state: 'NSW',
        postcode: '2028',
        type: 'apartment',
        bedrooms: 3,
        bathrooms: 2,
        landSize: 0,
        salePrice: 1820000,
        saleDate: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        distanceKm: 0.2
      }
    ],
    marketTrends: [
      { period: 'month', growthRate: 0.6 },
      { period: 'quarter', growthRate: 1.8 },
      { period: 'year', growthRate: 4.9 }
    ]
  }
];

export const usePropertyStore = create<PropertyState>((set) => ({
  propertyValuations: mockPropertyValuations,
  selectedPropertyId: null,
  isLoading: false,
  error: null,
  
  // Actions
  setPropertyValuations: (valuations) => set({ propertyValuations: valuations }),
  setSelectedPropertyId: (id) => set({ selectedPropertyId: id }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addPropertyValuation: (valuation) => set((state) => ({
    propertyValuations: [...state.propertyValuations, valuation]
  })),
  
  updatePropertyValuation: (id, updatedValuation) => set((state) => ({
    propertyValuations: state.propertyValuations.map((val) =>
      val.id === id ? { ...val, ...updatedValuation } : val
    )
  })),
  
  deletePropertyValuation: (id) => set((state) => ({
    propertyValuations: state.propertyValuations.filter((val) => val.id !== id)
  }))
}));
