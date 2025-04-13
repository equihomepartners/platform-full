import { TargetProperty } from '../types';

// Target Property Service
export const TargetPropertyService = {
  // Get all target properties
  getTargetProperties: async (): Promise<TargetProperty[]> => {
    try {
      const response = await fetch('/api/underwriting/marketing/target-properties');
      const data = await response.json();
      return data.properties;
    } catch (error) {
      console.error('Error fetching target properties:', error);
      throw error;
    }
  },

  // Get a target property by ID
  getTargetProperty: async (id: string): Promise<TargetProperty> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/target-properties/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching target property ${id}:`, error);
      throw error;
    }
  },

  // Get target properties by traffic light zone
  getTargetPropertiesByZone: async (zone: string): Promise<TargetProperty[]> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/target-properties/zone/${zone}`);
      const data = await response.json();
      return data.properties;
    } catch (error) {
      console.error(`Error fetching target properties for zone ${zone}:`, error);
      throw error;
    }
  },

  // Get target properties by suburb
  getTargetPropertiesBySuburb: async (suburb: string): Promise<TargetProperty[]> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/target-properties/suburb/${suburb}`);
      const data = await response.json();
      return data.properties;
    } catch (error) {
      console.error(`Error fetching target properties for suburb ${suburb}:`, error);
      throw error;
    }
  },

  // Update a target property
  updateTargetProperty: async (id: string, property: Partial<TargetProperty>): Promise<TargetProperty> => {
    try {
      const response = await fetch(`/api/underwriting/marketing/target-properties/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating target property ${id}:`, error);
      throw error;
    }
  },

  // Sync target properties from Traffic Light System
  syncTargetProperties: async (): Promise<TargetProperty[]> => {
    try {
      const response = await fetch('/api/underwriting/marketing/target-properties/sync', {
        method: 'POST',
      });
      const data = await response.json();
      return data.properties;
    } catch (error) {
      console.error('Error syncing target properties:', error);
      throw error;
    }
  },
};
