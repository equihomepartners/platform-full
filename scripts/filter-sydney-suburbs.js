import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the NSW GeoJSON file
const nswGeoJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../temp_data/suburb-2-nsw.geojson'), 'utf8'));

// List of Sydney suburbs to include (partial list - add more as needed)
const sydneySuburbs = [
  'BONDI', 'BONDI BEACH', 'BONDI JUNCTION', 'BRONTE', 'CLOVELLY', 'COOGEE', 'DARLINGHURST',
  'DOUBLE BAY', 'ELIZABETH BAY', 'KINGS CROSS', 'PADDINGTON', 'POINT PIPER', 'POTTS POINT',
  'RANDWICK', 'ROSE BAY', 'RUSHCUTTERS BAY', 'SURRY HILLS', 'TAMARAMA', 'VAUCLUSE', 'WAVERLEY',
  'WOOLLAHRA', 'WOOLLOOMOOLOO', 'ALEXANDRIA', 'ANNANDALE', 'ASHFIELD', 'BALMAIN', 'BIRCHGROVE',
  'CAMPERDOWN', 'CHIPPENDALE', 'DARLINGTON', 'ERSKINEVILLE', 'EVELEIGH', 'FOREST LODGE',
  'GLEBE', 'HAYMARKET', 'LEICHHARDT', 'LILYFIELD', 'MARRICKVILLE', 'NEWTOWN', 'PYRMONT',
  'REDFERN', 'ROZELLE', 'ST PETERS', 'STANMORE', 'SYDNEY', 'ULTIMO', 'WATERLOO', 'ZETLAND',
  'NORTH SYDNEY', 'KIRRIBILLI', 'NEUTRAL BAY', 'CREMORNE', 'MOSMAN', 'MANLY', 'BALGOWLAH',
  'CHATSWOOD', 'WILLOUGHBY', 'ARTARMON', 'LANE COVE', 'GLADESVILLE', 'RYDE', 'EASTWOOD',
  'PARRAMATTA', 'AUBURN', 'LIDCOMBE', 'STRATHFIELD', 'BURWOOD', 'HOMEBUSH', 'CONCORD',
  'CANTERBURY', 'CAMPSIE', 'BELMORE', 'LAKEMBA', 'PUNCHBOWL', 'BANKSTOWN', 'HURSTVILLE',
  'KOGARAH', 'ROCKDALE', 'BRIGHTON-LE-SANDS', 'CRONULLA', 'MIRANDA', 'SUTHERLAND',
  'LIVERPOOL', 'FAIRFIELD', 'CABRAMATTA', 'PENRITH', 'BLACKTOWN', 'CASTLE HILL',
  'BAULKHAM HILLS', 'KELLYVILLE', 'HORNSBY', 'WAHROONGA', 'TURRAMURRA', 'GORDON',
  'KILLARA', 'LINDFIELD', 'ROSEVILLE', 'EPPING', 'CARLINGFORD', 'BEECROFT',
  'MAROUBRA', 'MALABAR', 'LITTLE BAY', 'LA PEROUSE', 'BOTANY', 'MASCOT', 'KINGSFORD',
  'KENSINGTON', 'CLOVELLY', 'COOGEE', 'MATRAVILLE', 'CHIFLEY', 'EASTLAKES', 'ROSEBERY'
];

// Filter features to only include Sydney suburbs
const sydneyFeatures = nswGeoJson.features.filter(feature => {
  const suburbName = feature.properties.nsw_loca_2;
  return sydneySuburbs.includes(suburbName);
});

// Create a new GeoJSON object with only Sydney suburbs
const sydneyGeoJson = {
  type: "FeatureCollection",
  features: sydneyFeatures.map(feature => {
    // Add a name property for easier access
    return {
      ...feature,
      properties: {
        ...feature.properties,
        name: feature.properties.nsw_loca_2
      }
    };
  })
};

// Write the filtered GeoJSON to a new file
fs.writeFileSync(
  path.join(__dirname, '../src/data/sydneySuburbBoundaries.new.js'),
  `// Sydney suburb boundaries from GeoJSON data
// Source: https://github.com/tonywr71/GeoJson-Data/blob/master/suburb-2-nsw.geojson

const sydneySuburbBoundaries = ${JSON.stringify(sydneyGeoJson, null, 2)};

export default sydneySuburbBoundaries;`
);

console.log(`Filtered ${sydneyFeatures.length} Sydney suburbs from ${nswGeoJson.features.length} NSW suburbs`);
