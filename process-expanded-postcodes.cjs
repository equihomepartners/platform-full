const fs = require('fs');
const path = require('path');

// List of Sydney and surrounding area postcodes (expanded)
const sydneyPostcodes = [
  // Sydney CBD and Inner East
  '2000', '2010', '2011', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039', '2040', '2041', '2042', '2043', '2044', '2045', '2046', '2047', '2048', '2049', '2050',
  // Inner West
  '2130', '2131', '2132', '2133', '2134', '2135', '2136', '2137', '2138', '2139', '2140', '2141', '2142', '2143', '2144', '2145',
  // North Shore
  '2060', '2061', '2062', '2063', '2064', '2065', '2066', '2067', '2068', '2069', '2070', '2071', '2072', '2073', '2074', '2075', '2076', '2077', '2079', '2080',
  // Northern Beaches
  '2084', '2085', '2086', '2087', '2088', '2089', '2090', '2092', '2093', '2094', '2095', '2096', '2097', '2099', '2100', '2101', '2102', '2103', '2104', '2105', '2106', '2107', '2108',
  // Western Sydney
  '2150', '2151', '2152', '2153', '2154', '2155', '2156', '2157', '2158', '2159', '2160', '2161', '2162', '2163', '2164', '2165', '2166', '2167', '2168', '2170',
  // South Sydney
  '2200', '2203', '2204', '2205', '2206', '2207', '2208', '2209', '2210', '2211', '2212', '2213', '2214', '2216', '2217', '2218', '2219', '2220', '2221', '2222', '2223', '2224', '2225', '2226', '2227', '2228', '2229', '2230', '2231', '2232', '2233', '2234'
];

// Define zone classifications based on postcode regions
const greenPostcodes = [
  // Eastern Suburbs and North Shore (premium areas)
  '2000', '2010', '2011', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034',
  '2060', '2061', '2062', '2063', '2064', '2065', '2066', '2067', '2068', '2069', '2088', '2089', '2090', '2092', '2093', '2094', '2095', '2096', '2097', '2099', '2100'
];

const redPostcodes = [
  // Western and South-Western Sydney (generally less expensive)
  '2160', '2161', '2162', '2163', '2164', '2165', '2166', '2167', '2168', '2170',
  '2200', '2213', '2214', '2216', '2217'
];

// Read and combine the postcode GeoJSON files
const features = [];
let greenCount = 0;
let orangeCount = 0;
let redCount = 0;
let processedCount = 0;

sydneyPostcodes.forEach(postcode => {
  try {
    const filePath = path.join(__dirname, 'temp_data', 'postcodes_expanded', `${postcode}.json`);
    if (!fs.existsSync(filePath)) {
      console.log(`File not found for postcode ${postcode}, skipping`);
      return;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const postcodeData = JSON.parse(fileContent);
    
    // Assign a zone based on the postcode
    let zone = 'orange'; // Default zone
    
    if (greenPostcodes.includes(postcode)) {
      zone = 'green';
      greenCount++;
    } else if (redPostcodes.includes(postcode)) {
      zone = 'red';
      redCount++;
    } else {
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
    processedCount++;
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

console.log(`Generated postcode boundaries with ${processedCount} postcodes`);
console.log(`Green zones: ${greenCount}`);
console.log(`Orange zones: ${orangeCount}`);
console.log(`Red zones: ${redCount}`);
