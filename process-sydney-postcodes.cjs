const fs = require('fs');
const path = require('path');

// List of Sydney postcodes to include
const sydneyPostcodes = ['2000', '2010', '2020', '2030', '2040', '2050'];

// Read and combine the postcode GeoJSON files
const features = [];
let greenCount = 0;
let orangeCount = 0;
let redCount = 0;

sydneyPostcodes.forEach(postcode => {
  try {
    const filePath = path.join(__dirname, 'temp_data', 'postcodes', `${postcode}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const postcodeData = JSON.parse(fileContent);
    
    // Assign a zone based on the postcode
    let zone = 'orange'; // Default zone
    
    // Eastern Sydney (generally more expensive)
    if (['2000', '2010', '2030'].includes(postcode)) {
      zone = 'green';
      greenCount++;
    } 
    // Western Sydney (generally less expensive)
    else if (['2050'].includes(postcode)) {
      zone = 'red';
      redCount++;
    }
    else {
      orangeCount++;
    }
    
    // Add metadata
    const feature = {
      ...postcodeData,
      properties: {
        ...postcodeData.properties,
        name: `Postcode ${postcode}`,
        postcode,
        zone,
        population: Math.floor(50000 + Math.random() * 150000),
        median_income: Math.floor(70000 + Math.random() * 120000),
        area_sqkm: Math.floor(10 + Math.random() * 50 * 100) / 100
      }
    };
    
    features.push(feature);
    console.log(`Processed postcode ${postcode}`);
  } catch (error) {
    console.error(`Error processing postcode ${postcode}:`, error.message);
  }
});

// Create the output file
const outputData = {
  type: 'FeatureCollection',
  features
};

// Write to file
fs.writeFileSync(
  path.join(__dirname, 'src', 'data', 'sydneyPostcodeBoundaries.js'),
  `// Sydney postcode boundaries from michalsn/australian-suburbs
// Source: https://github.com/michalsn/australian-suburbs

export const sydneyPostcodeBoundaries = ${JSON.stringify(outputData, null, 2)};

// Postcode zone classifications
export const postcodeZones = {
  green: ${JSON.stringify(features.filter(f => f.properties.zone === 'green').map(f => f.properties.postcode))},
  orange: ${JSON.stringify(features.filter(f => f.properties.zone === 'orange').map(f => f.properties.postcode))},
  red: ${JSON.stringify(features.filter(f => f.properties.zone === 'red').map(f => f.properties.postcode))}
};

export default sydneyPostcodeBoundaries;`
);

console.log(`Generated postcode boundaries with ${features.length} postcodes`);
console.log(`Green zones: ${greenCount}`);
console.log(`Orange zones: ${orangeCount}`);
console.log(`Red zones: ${redCount}`);
