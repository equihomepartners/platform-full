import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the NSW suburbs GeoJSON file
const nswSuburbs = JSON.parse(fs.readFileSync(path.join(__dirname, '../temp_data/suburb-2-nsw.geojson'), 'utf8'));

// Use all NSW suburbs as the base
const nswFeatures = nswSuburbs.features;

// Define Sydney region boundaries (approximate)
const SYDNEY_BOUNDS = {
  north: -33.4,
  south: -34.2,
  east: 151.4,
  west: 150.5
};

// Filter for Sydney suburbs based on coordinates and name
const sydneySuburbs = nswFeatures.filter(feature => {
  // Check if the suburb name contains Sydney or is a known Sydney suburb
  const suburbName = feature.properties.nsw_loca_2 || '';
  const isSydneyByName =
    suburbName.includes('SYDNEY') ||
    ['BONDI', 'MANLY', 'PARRAMATTA', 'CHATSWOOD', 'CRONULLA', 'NEWTOWN', 'PADDINGTON', 'SURRY HILLS'].some(
      suburb => suburbName.includes(suburb)
    );

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

// Assign random zones for demonstration
const zones = ['green', 'yellow', 'red'];
const zoneDistribution = [0.4, 0.35, 0.25]; // 40% green, 35% yellow, 25% red
const scoreRanges = {
  'green': [75, 95],
  'yellow': [50, 70],
  'red': [0, 45]
};

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

// Write the filtered GeoJSON to a new file
fs.writeFileSync(
  path.join(__dirname, '../src/data/sydneySuburbBoundaries.js'),
  `// Sydney suburb boundaries from GeoJSON data
// Source: https://github.com/tonywr71/GeoJson-Data/blob/master/australian-suburbs.geojson

const sydneySuburbBoundaries = ${JSON.stringify(sydneyGeoJson, null, 2)};

export default sydneySuburbBoundaries;`
);

console.log(`Filtered ${sydneySuburbsWithZones.length} Sydney suburbs from ${nswFeatures.length} NSW suburbs`);
