const fs = require('fs');
const path = require('path');

// Read the suburb boundaries file
const suburbBoundariesPath = path.join(__dirname, 'src', 'data', 'sydneySuburbBoundaries.js');
const suburbBoundariesContent = fs.readFileSync(suburbBoundariesPath, 'utf8');

// Extract the JSON data from the file
const suburbBoundariesMatch = suburbBoundariesContent.match(/export const sydneySuburbBoundaries = ({[\s\S]*?});/);
if (!suburbBoundariesMatch) {
  console.error('Could not extract suburb boundaries data');
  process.exit(1);
}

const suburbBoundaries = JSON.parse(suburbBoundariesMatch[1]);

// Group suburbs by postcode
const postcodeMap = {};
const postcodes = [
  '2000', '2010', '2020', '2030', '2040', '2050', '2060', '2070', '2080', '2090',
  '2100', '2110', '2120', '2130', '2140', '2150', '2160', '2170', '2190', '2200',
  '2210', '2220', '2230', '2750', '2760', '2770'
];

// Assign each suburb to a postcode region
suburbBoundaries.features.forEach((feature, index) => {
  const postcodeIndex = index % postcodes.length;
  const postcode = postcodes[postcodeIndex];
  
  if (!postcodeMap[postcode]) {
    postcodeMap[postcode] = {
      type: 'Feature',
      properties: {
        name: `Postcode ${postcode}`,
        postcode,
        zone: feature.properties.zone, // Inherit zone from a suburb
        population: Math.floor(50000 + Math.random() * 150000),
        median_income: Math.floor(70000 + Math.random() * 120000),
        area_sqkm: Math.floor(10 + Math.random() * 50 * 100) / 100,
        suburbs: []
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: []
      }
    };
  }
  
  // Add suburb name to the postcode's suburbs list
  if (feature.properties.name) {
    postcodeMap[postcode].properties.suburbs.push(feature.properties.name);
  }
  
  // Add suburb geometry to the postcode's MultiPolygon
  if (feature.geometry.type === 'Polygon') {
    postcodeMap[postcode].geometry.coordinates.push(feature.geometry.coordinates);
  } else if (feature.geometry.type === 'MultiPolygon') {
    postcodeMap[postcode].geometry.coordinates.push(...feature.geometry.coordinates);
  }
});

// Create the postcode features
const postcodeFeatures = Object.values(postcodeMap);

// Create the output file
const outputData = {
  type: 'FeatureCollection',
  features: postcodeFeatures
};

// Write to file
fs.writeFileSync(
  path.join(__dirname, 'src', 'data', 'sydneyPostcodeBoundaries.js'),
  `// Sydney postcode boundaries generated from suburb boundaries
// This is a simplified representation for demonstration purposes

export const sydneyPostcodeBoundaries = ${JSON.stringify(outputData, null, 2)};

// Postcode zone classifications
export const postcodeZones = {
  green: ${JSON.stringify(postcodeFeatures.filter(f => f.properties.zone === 'green').map(f => f.properties.postcode))},
  orange: ${JSON.stringify(postcodeFeatures.filter(f => f.properties.zone === 'orange').map(f => f.properties.postcode))},
  red: ${JSON.stringify(postcodeFeatures.filter(f => f.properties.zone === 'red').map(f => f.properties.postcode))}
};

export default sydneyPostcodeBoundaries;`
);

console.log(`Generated ${postcodeFeatures.length} postcode boundaries`);
console.log(`Green zones: ${postcodeFeatures.filter(f => f.properties.zone === 'green').length}`);
console.log(`Orange zones: ${postcodeFeatures.filter(f => f.properties.zone === 'orange').length}`);
console.log(`Red zones: ${postcodeFeatures.filter(f => f.properties.zone === 'red').length}`);
