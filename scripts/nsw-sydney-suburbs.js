import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the NSW suburbs GeoJSON file directly from tonywr71/GeoJson-Data
console.log('Reading NSW suburbs GeoJSON file...');
const nswSuburbs = JSON.parse(fs.readFileSync(path.join(__dirname, '../temp_data/suburb-2-nsw.geojson'), 'utf8'));

// Use all NSW suburbs as the base
const nswFeatures = nswSuburbs.features;
console.log(`Total NSW features: ${nswFeatures.length}`);

// Define Sydney region boundaries (expanded to include more suburbs)
const SYDNEY_BOUNDS = {
  north: -33.0, // Expanded north to include Central Coast
  south: -34.5, // Expanded south to include Wollongong
  east: 151.7,  // Expanded east to include coastal areas
  west: 150.0   // Expanded west to include Blue Mountains and Penrith
};

// List of known Sydney regions and major suburbs
const SYDNEY_REGIONS = [
  'SYDNEY', 'NORTH SYDNEY', 'INNER WEST', 'EASTERN SUBURBS', 'WESTERN SYDNEY', 
  'NORTHERN BEACHES', 'NORTH SHORE', 'HILLS DISTRICT', 'SUTHERLAND SHIRE',
  'CANTERBURY-BANKSTOWN', 'PARRAMATTA', 'BLACKTOWN', 'LIVERPOOL', 'CAMPBELLTOWN',
  'PENRITH', 'BLUE MOUNTAINS', 'CENTRAL COAST', 'MACARTHUR'
];

const MAJOR_SYDNEY_SUBURBS = [
  'BONDI', 'MANLY', 'CHATSWOOD', 'CRONULLA', 'NEWTOWN', 'PADDINGTON', 'SURRY HILLS',
  'PARRAMATTA', 'PENRITH', 'LIVERPOOL', 'BANKSTOWN', 'HURSTVILLE', 'HORNSBY',
  'BLACKTOWN', 'CASTLE HILL', 'BAULKHAM HILLS', 'RYDE', 'EPPING', 'STRATHFIELD',
  'BURWOOD', 'ASHFIELD', 'LEICHHARDT', 'MARRICKVILLE', 'RANDWICK', 'MAROUBRA',
  'COOGEE', 'MASCOT', 'BOTANY', 'MIRANDA', 'SUTHERLAND', 'CAMPBELLTOWN', 'CAMDEN',
  'RICHMOND', 'WINDSOR', 'KATOOMBA', 'SPRINGWOOD', 'GOSFORD', 'WYONG', 'TERRIGAL',
  'AVALON', 'PALM BEACH', 'MONA VALE', 'DEE WHY', 'BROOKVALE', 'MOSMAN', 'NEUTRAL BAY',
  'CREMORNE', 'LANE COVE', 'GLADESVILLE', 'HUNTERS HILL', 'DRUMMOYNE', 'BALMAIN',
  'GLEBE', 'PYRMONT', 'ULTIMO', 'REDFERN', 'WATERLOO', 'ALEXANDRIA', 'ZETLAND',
  'KENSINGTON', 'KINGSFORD', 'MALABAR', 'LA PEROUSE', 'LITTLE BAY', 'MATRAVILLE',
  'EASTLAKES', 'ROSEBERY', 'EASTGARDENS', 'PAGEWOOD', 'MAROUBRA', 'CLOVELLY',
  'BRONTE', 'TAMARAMA', 'BONDI JUNCTION', 'DOUBLE BAY', 'ROSE BAY', 'VAUCLUSE',
  'WATSONS BAY', 'DOVER HEIGHTS', 'NORTH BONDI', 'BELLEVUE HILL', 'POINT PIPER',
  'DARLING POINT', 'EDGECLIFF', 'WOOLLAHRA', 'QUEENS PARK', 'WAVERLEY', 'BONDI BEACH'
];

// Filter for Sydney suburbs based on coordinates, name, and region
console.log('Filtering Sydney suburbs...');
const sydneySuburbs = nswFeatures.filter(feature => {
  // Skip features without properties
  if (!feature.properties) return false;
  
  // Get the suburb name
  const suburbName = (feature.properties.nsw_loca_2 || '').toUpperCase();
  if (!suburbName) return false;
  
  // Check if the suburb name contains Sydney or is a known Sydney suburb/region
  const isSydneyByName = 
    SYDNEY_REGIONS.some(region => suburbName.includes(region)) ||
    MAJOR_SYDNEY_SUBURBS.some(suburb => suburbName.includes(suburb));
  
  if (isSydneyByName) return true;
  
  // Get the centroid coordinates from properties
  const longitude = parseFloat(feature.properties.longitude);
  const latitude = parseFloat(feature.properties.latitude);
  
  if (!isNaN(longitude) && !isNaN(latitude)) {
    // Check if the coordinate is within Sydney bounds
    return longitude >= SYDNEY_BOUNDS.west && 
           longitude <= SYDNEY_BOUNDS.east && 
           latitude >= SYDNEY_BOUNDS.south && 
           latitude <= SYDNEY_BOUNDS.north;
  }
  
  return false;
});

console.log(`Filtered ${sydneySuburbs.length} Sydney suburbs from ${nswFeatures.length} NSW features`);

// Assign zones for demonstration
const zones = ['green', 'yellow', 'red'];
const zoneDistribution = [0.4, 0.35, 0.25]; // 40% green, 35% yellow, 25% red
const scoreRanges = {
  'green': [75, 95],
  'yellow': [50, 70],
  'red': [0, 45]
};

console.log('Assigning zones to suburbs...');
const sydneySuburbsWithZones = sydneySuburbs.map(feature => {
  // Generate a random number between 0 and 1
  const random = Math.random();
  
  // Determine zone based on distribution
  let zone;
  if (random < zoneDistribution[0]) {
    zone = zones[0]; // green
  } else if (random < zoneDistribution[0] + zoneDistribution[1]) {
    zone = zones[1]; // yellow
  } else {
    zone = zones[2]; // red
  }
  
  // Generate a score within the appropriate range for the zone
  const [min, max] = scoreRanges[zone];
  const score = Math.floor(Math.random() * (max - min + 1)) + min;
  
  // Add zone and score to properties
  return {
    ...feature,
    properties: {
      ...feature.properties,
      name: feature.properties.nsw_loca_2,
      zone,
      score
    }
  };
});

// Create a new GeoJSON object with only Sydney suburbs
const sydneyGeoJson = {
  type: "FeatureCollection",
  features: sydneySuburbsWithZones
};

console.log('Writing Sydney suburbs GeoJSON to file...');
// Write the filtered GeoJSON to a new file
fs.writeFileSync(
  path.join(__dirname, '../src/data/sydneySuburbBoundaries.js'),
  `// Sydney suburb boundaries from GeoJSON data
// Source: https://github.com/tonywr71/GeoJson-Data/blob/master/suburb-2-nsw.geojson
// Filtered to include only Sydney suburbs
// Direct implementation from tonywr71/GeoJson-Data repository

const sydneySuburbBoundaries = ${JSON.stringify(sydneyGeoJson, null, 2)};

export default sydneySuburbBoundaries;`
);

console.log(`Successfully filtered and processed ${sydneySuburbsWithZones.length} Sydney suburbs`);
