const fs = require('fs');
const path = require('path');
const https = require('https');

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

// Function to download a file
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there's an error
      reject(err);
    });
  });
}

// Download all postcode files
async function downloadPostcodes() {
  const baseUrl = 'https://raw.githubusercontent.com/michalsn/australian-suburbs/master/GeoJSON/postcodes/';
  const downloadDir = path.join(__dirname, 'temp_data', 'postcodes_expanded');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }
  
  console.log(`Downloading ${sydneyPostcodes.length} postcode files...`);
  
  // Download files in batches to avoid overwhelming the server
  const batchSize = 5;
  for (let i = 0; i < sydneyPostcodes.length; i += batchSize) {
    const batch = sydneyPostcodes.slice(i, i + batchSize);
    const promises = batch.map(postcode => {
      const url = `${baseUrl}${postcode}.json`;
      const filePath = path.join(downloadDir, `${postcode}.json`);
      return downloadFile(url, filePath)
        .then(() => console.log(`Downloaded ${postcode}.json`))
        .catch(err => console.error(`Error downloading ${postcode}.json:`, err.message));
    });
    
    await Promise.all(promises);
  }
  
  console.log('All downloads completed');
}

// Run the download
downloadPostcodes().catch(err => console.error('Download failed:', err));
