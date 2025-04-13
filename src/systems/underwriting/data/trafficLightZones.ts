// Traffic Light Zones
// This file contains the traffic light zones for the Underwriting System

export interface TrafficLightZones {
  green: string[];
  orange: string[];
  red: string[];
}

// These are mock zones for development purposes
// In production, these would be fetched from the Traffic Light System API
export const trafficLightZones: TrafficLightZones = {
  green: [
    'Mosman',
    'Double Bay',
    'Bondi',
    'Vaucluse',
    'Rose Bay',
    'Paddington',
    'Woollahra',
    'Bellevue Hill',
    'Balmain',
    'Neutral Bay',
    'Cremorne',
    'Kirribilli',
    'Manly',
    'Coogee',
    'Bronte'
  ],
  orange: [
    'Randwick',
    'Surry Hills',
    'Newtown',
    'Leichhardt',
    'Marrickville',
    'Chatswood',
    'Lane Cove',
    'Willoughby',
    'North Sydney',
    'Rozelle',
    'Glebe',
    'Redfern',
    'Alexandria',
    'Erskineville',
    'Pyrmont'
  ],
  red: [
    'Blacktown',
    'Penrith',
    'Liverpool',
    'Campbelltown',
    'Parramatta',
    'Auburn',
    'Bankstown',
    'Fairfield',
    'Cabramatta',
    'Mount Druitt',
    'Rooty Hill',
    'Granville',
    'Merrylands',
    'Guildford',
    'Wentworthville'
  ]
};

// Function to get the traffic light zone for a suburb
export function getTrafficLightZone(suburb: string): 'Green' | 'Orange' | 'Red' {
  const normalizedSuburb = suburb.trim().toLowerCase();
  
  if (trafficLightZones.green.some(zone => normalizedSuburb.includes(zone.toLowerCase()))) {
    return 'Green';
  }
  
  if (trafficLightZones.orange.some(zone => normalizedSuburb.includes(zone.toLowerCase()))) {
    return 'Orange';
  }
  
  return 'Red';
}

// Function to get all green zone suburbs
export function getGreenZoneSuburbs(): string[] {
  return trafficLightZones.green;
}

// Function to get all orange zone suburbs
export function getOrangeZoneSuburbs(): string[] {
  return trafficLightZones.orange;
}

// Function to get all red zone suburbs
export function getRedZoneSuburbs(): string[] {
  return trafficLightZones.red;
}

// Function to get all suburbs
export function getAllSuburbs(): string[] {
  return [
    ...trafficLightZones.green,
    ...trafficLightZones.orange,
    ...trafficLightZones.red
  ];
}
