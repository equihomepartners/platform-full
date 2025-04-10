const fs = require('fs');
const path = require('path');

// Read the GeoJSON file
const geojsonData = JSON.parse(fs.readFileSync(path.join(__dirname, 'temp_data', 'sydney-suburbs.geojson'), 'utf8'));

// Filter for Sydney suburbs (approximate bounding box for Greater Sydney)
const sydneyBounds = {
  minLat: -34.2,
  maxLat: -33.4,
  minLng: 150.5,
  maxLng: 151.5
};

// Function to check if a point is within Sydney bounds
function isInSydney(coordinates) {
  // For polygons, check if any point is within Sydney
  if (Array.isArray(coordinates[0]) && Array.isArray(coordinates[0][0])) {
    // Multi-polygon or polygon with holes
    for (const ring of coordinates) {
      for (const point of ring) {
        const lng = point[0];
        const lat = point[1];
        if (
          lat >= sydneyBounds.minLat &&
          lat <= sydneyBounds.maxLat &&
          lng >= sydneyBounds.minLng &&
          lng <= sydneyBounds.maxLng
        ) {
          return true;
        }
      }
    }
    return false;
  }
  
  // Simple polygon
  for (const point of coordinates) {
    const lng = point[0];
    const lat = point[1];
    if (
      lat >= sydneyBounds.minLat &&
      lat <= sydneyBounds.maxLat &&
      lng >= sydneyBounds.minLng &&
      lng <= sydneyBounds.maxLng
    ) {
      return true;
    }
  }
  return false;
}

// Filter features for Sydney suburbs
const sydneyFeatures = geojsonData.features.filter(feature => {
  if (feature.geometry.type === 'Polygon') {
    return isInSydney(feature.geometry.coordinates[0]);
  } else if (feature.geometry.type === 'MultiPolygon') {
    for (const polygon of feature.geometry.coordinates) {
      if (isInSydney(polygon[0])) {
        return true;
      }
    }
    return false;
  }
  return false;
});

console.log(`Found ${sydneyFeatures.length} Sydney suburbs`);

// Assign zones based on location (simplified for demo)
const zonedFeatures = sydneyFeatures.map(feature => {
  const name = feature.properties.name;
  let zone = 'orange'; // Default zone
  
  // Inner city and eastern suburbs (generally more expensive)
  const greenSuburbs = [
    'SYDNEY', 'BONDI', 'BONDI BEACH', 'BONDI JUNCTION', 'VAUCLUSE', 'DOUBLE BAY',
    'ROSE BAY', 'BELLEVUE HILL', 'PADDINGTON', 'WOOLLAHRA', 'DARLING POINT',
    'POINT PIPER', 'ELIZABETH BAY', 'RUSHCUTTERS BAY', 'POTTS POINT', 'DARLINGHURST',
    'SURRY HILLS', 'MOSMAN', 'CREMORNE', 'NEUTRAL BAY', 'KIRRIBILLI', 'MILSONS POINT',
    'BALMAIN', 'BIRCHGROVE', 'ROZELLE', 'LILYFIELD', 'ANNANDALE', 'GLEBE',
    'FOREST LODGE', 'PYRMONT', 'ULTIMO', 'CHIPPENDALE', 'REDFERN', 'WATERLOO',
    'ALEXANDRIA', 'ERSKINEVILLE', 'NEWTOWN', 'CAMPERDOWN', 'STANMORE', 'PETERSHAM',
    'LEICHHARDT', 'HABERFIELD', 'FIVE DOCK', 'ABBOTSFORD', 'DRUMMOYNE', 'RUSSELL LEA',
    'CHISWICK', 'RODD POINT', 'NORTH SYDNEY', 'LAVENDER BAY', 'MCMAHONS POINT',
    'WAVERTON', 'WOLLSTONECRAFT', 'CROWS NEST', 'CAMMERAY', 'NORTHBRIDGE', 'CASTLECRAG',
    'MIDDLE COVE', 'CASTLE COVE', 'WILLOUGHBY', 'ARTARMON', 'NAREMBURN', 'LANE COVE',
    'RIVERVIEW', 'LONGUEVILLE', 'NORTHWOOD', 'GREENWICH', 'HUNTERS HILL', 'WOOLWICH',
    'GLADESVILLE', 'TENNYSON POINT', 'PUTNEY', 'RYDE', 'EAST RYDE', 'NORTH RYDE',
    'MACQUARIE PARK', 'MARSFIELD', 'EPPING', 'EASTWOOD', 'DENISTONE', 'WEST RYDE',
    'MEADOWBANK', 'MELROSE PARK', 'ERMINGTON', 'RYDALMERE', 'DUNDAS', 'TELOPEA',
    'CARLINGFORD', 'BEECROFT', 'CHELTENHAM', 'PENNANT HILLS', 'THORNLEIGH', 'NORMANHURST',
    'WAHROONGA', 'WARRAWEE', 'TURRAMURRA', 'PYMBLE', 'GORDON', 'KILLARA',
    'LINDFIELD', 'ROSEVILLE', 'CHATSWOOD', 'CHATSWOOD WEST', 'ROSEVILLE CHASE', 'MIDDLE HARBOUR',
    'SEAFORTH', 'CLONTARF', 'BALGOWLAH', 'BALGOWLAH HEIGHTS', 'MANLY', 'FAIRLIGHT',
    'QUEENSCLIFF', 'FRESHWATER', 'CURL CURL', 'NORTH CURL CURL', 'DEE WHY', 'NARRAWEENA',
    'BEACON HILL', 'BROOKVALE', 'ALLAMBIE HEIGHTS', 'NORTH MANLY', 'MANLY VALE', 'FRENCHS FOREST',
    'FORESTVILLE', 'KILLARNEY HEIGHTS', 'DAVIDSON', 'BELROSE', 'OXFORD FALLS', 'CROMER',
    'NARRABEEN', 'NORTH NARRABEEN', 'ELANORA HEIGHTS', 'INGLESIDE', 'WARRIEWOOD', 'MONA VALE',
    'BAYVIEW', 'CHURCH POINT', 'NEWPORT', 'BILGOLA', 'AVALON', 'PALM BEACH'
  ];
  
  // Western and southwestern suburbs (generally less expensive)
  const redSuburbs = [
    'MOUNT DRUITT', 'BIDWILL', 'BLACKETT', 'DHARRUK', 'EMERTON', 'HEBERSHAM',
    'LETHBRIDGE PARK', 'TREGEAR', 'WHALAN', 'WILLMOT', 'HASSALL GROVE', 'OAKHURST',
    'PLUMPTON', 'ROOTY HILL', 'ROPES CROSSING', 'SHALVEY', 'SHANES PARK', 'ST MARYS',
    'COLYTON', 'ERSKINE PARK', 'MINCHINBURY', 'OXLEY PARK', 'ROPES CROSSING', 'WERRINGTON',
    'WERRINGTON COUNTY', 'WERRINGTON DOWNS', 'BLACKTOWN', 'DOONSIDE', 'ARNDELL PARK',
    'BUNGARRIBEE', 'DEAN PARK', 'GLENDENNING', 'HUNTINGWOOD', 'KINGS LANGLEY', 'KINGS PARK',
    'LALOR PARK', 'MARAYONG', 'PROSPECT', 'SEVEN HILLS', 'TOONGABBIE', 'WOODCROFT',
    'AUBURN', 'BERALA', 'LIDCOMBE', 'REGENTS PARK', 'ROOKWOOD', 'SILVERWATER',
    'SYDNEY OLYMPIC PARK', 'WENTWORTH POINT', 'BANKSTOWN', 'BASS HILL', 'BIRRONG',
    'CHESTER HILL', 'CHULLORA', 'CONDELL PARK', 'GREENACRE', 'MOUNT LEWIS', 'POTTS HILL',
    'SEFTON', 'VILLAWOOD', 'YAGOONA', 'FAIRFIELD', 'FAIRFIELD EAST', 'FAIRFIELD HEIGHTS',
    'FAIRFIELD WEST', 'LANSVALE', 'CABRAMATTA', 'CABRAMATTA WEST', 'CANLEY HEIGHTS',
    'CANLEY VALE', 'CARRAMAR', 'OLD GUILDFORD', 'GUILDFORD', 'GUILDFORD WEST', 'MERRYLANDS',
    'MERRYLANDS WEST', 'SMITHFIELD', 'YENNORA', 'GREYSTANES', 'PEMULWUY', 'PENDLE HILL',
    'WENTWORTHVILLE', 'WESTMEAD', 'PARRAMATTA', 'GRANVILLE', 'CLYDE', 'AUBURN', 'LIDCOMBE',
    'HOMEBUSH', 'HOMEBUSH WEST', 'STRATHFIELD', 'BURWOOD', 'CROYDON', 'CROYDON PARK',
    'ENFIELD', 'STRATHFIELD SOUTH', 'GREENACRE', 'CHULLORA', 'BELFIELD', 'BELMORE',
    'CAMPSIE', 'CANTERBURY', 'CLEMTON PARK', 'EARLWOOD', 'HURLSTONE PARK', 'KINGSGROVE',
    'LAKEMBA', 'NARWEE', 'PUNCHBOWL', 'RIVERWOOD', 'ROSELANDS', 'WILEY PARK', 'BEVERLY HILLS',
    'BEXLEY', 'BEXLEY NORTH', 'KINGSGROVE', 'KOGARAH', 'CARLTON', 'ALLAWAH', 'HURSTVILLE',
    'PENSHURST', 'MORTDALE', 'OATLEY', 'LUGARNO', 'PEAKHURST', 'PEAKHURST HEIGHTS', 'RIVERWOOD',
    'PADSTOW', 'PADSTOW HEIGHTS', 'REVESBY', 'REVESBY HEIGHTS', 'PANANIA', 'EAST HILLS',
    'MILPERRA', 'GEORGES HALL', 'YAGOONA', 'BANKSTOWN', 'PUNCHBOWL', 'GREENACRE', 'MOUNT LEWIS',
    'BIRRONG', 'SEFTON', 'CHESTER HILL', 'BASS HILL', 'LANSDOWNE', 'LANSVALE', 'CANLEY VALE',
    'CANLEY HEIGHTS', 'CABRAMATTA', 'CABRAMATTA WEST', 'WARWICK FARM', 'LIVERPOOL', 'CASULA',
    'LURNEA', 'PRESTONS', 'HOXTON PARK', 'GREEN VALLEY', 'HECKENBERG', 'BUSBY', 'MILLER',
    'CARTWRIGHT', 'SADLEIR', 'ASHCROFT', 'BONNYRIGG', 'BONNYRIGG HEIGHTS', 'ST JOHNS PARK',
    'EDENSOR PARK', 'BOSSLEY PARK', 'ABBOTSBURY', 'WAKELEY', 'FAIRFIELD', 'FAIRFIELD WEST',
    'FAIRFIELD HEIGHTS', 'PRAIRIEWOOD', 'WETHERILL PARK', 'CECIL PARK', 'HORSLEY PARK',
    'MOUNT VERNON', 'KEMPS CREEK', 'BADGERYS CREEK', 'LUDDENHAM', 'ORCHARD HILLS', 'ERSKINE PARK',
    'ST CLAIR', 'ERSKINE PARK', 'MINCHINBURY', 'EASTERN CREEK', 'ROOTY HILL', 'DOONSIDE',
    'WOODCROFT', 'BLACKTOWN', 'PROSPECT', 'ARNDELL PARK', 'HUNTINGWOOD', 'KINGS PARK',
    'MARAYONG', 'KINGS LANGLEY', 'LALOR PARK', 'SEVEN HILLS', 'TOONGABBIE', 'GIRRAWEEN',
    'PENDLE HILL', 'WENTWORTHVILLE', 'WESTMEAD', 'SOUTH WENTWORTHVILLE', 'MERRYLANDS',
    'MERRYLANDS WEST', 'GUILDFORD', 'GUILDFORD WEST', 'WOODPARK', 'OLD GUILDFORD', 'YENNORA',
    'FAIRFIELD EAST', 'VILLAWOOD', 'CARRAMAR', 'CHESTER HILL', 'SEFTON', 'BIRRONG', 'REGENTS PARK',
    'BERALA', 'LIDCOMBE', 'ROOKWOOD', 'SILVERWATER', 'NEWINGTON', 'WENTWORTH POINT',
    'SYDNEY OLYMPIC PARK', 'HOMEBUSH', 'HOMEBUSH WEST', 'FLEMINGTON', 'STRATHFIELD',
    'STRATHFIELD SOUTH', 'GREENACRE', 'CHULLORA', 'BELFIELD', 'CAMPSIE', 'CLEMTON PARK',
    'CANTERBURY', 'HURLSTONE PARK', 'ASHBURY', 'CROYDON PARK', 'CROYDON', 'ASHFIELD',
    'SUMMER HILL', 'LEWISHAM', 'PETERSHAM', 'STANMORE', 'ENMORE', 'MARRICKVILLE',
    'DULWICH HILL', 'HURLSTONE PARK', 'CANTERBURY', 'EARLWOOD', 'UNDERCLIFFE', 'TURRELLA',
    'BARDWELL PARK', 'BARDWELL VALLEY', 'BEXLEY', 'BEXLEY NORTH', 'KINGSGROVE', 'BEVERLY HILLS',
    'NARWEE', 'RIVERWOOD', 'PUNCHBOWL', 'WILEY PARK', 'LAKEMBA', 'BELMORE', 'BELFIELD',
    'CAMPSIE', 'CLEMTON PARK', 'EARLWOOD', 'HURLSTONE PARK', 'CANTERBURY', 'ASHBURY',
    'CROYDON PARK', 'CROYDON', 'ASHFIELD', 'SUMMER HILL', 'LEWISHAM', 'PETERSHAM',
    'STANMORE', 'ENMORE', 'MARRICKVILLE', 'DULWICH HILL', 'HURLSTONE PARK', 'CANTERBURY',
    'EARLWOOD', 'UNDERCLIFFE', 'TURRELLA', 'BARDWELL PARK', 'BARDWELL VALLEY', 'BEXLEY',
    'BEXLEY NORTH', 'KINGSGROVE', 'BEVERLY HILLS', 'NARWEE', 'RIVERWOOD', 'PUNCHBOWL',
    'WILEY PARK', 'LAKEMBA', 'BELMORE', 'BELFIELD', 'CAMPSIE', 'CLEMTON PARK', 'EARLWOOD'
  ];
  
  if (greenSuburbs.includes(name)) {
    zone = 'green';
  } else if (redSuburbs.includes(name)) {
    zone = 'red';
  }
  
  return {
    ...feature,
    properties: {
      ...feature.properties,
      zone
    }
  };
});

// Create the output file
const outputData = {
  type: 'FeatureCollection',
  features: zonedFeatures
};

// Write to file
fs.writeFileSync(
  path.join(__dirname, 'src', 'data', 'sydneySuburbBoundaries.js'),
  `// Sydney suburb boundaries extracted from NSW GeoJSON data
// Source: https://github.com/tonywr71/GeoJson-Data/blob/master/suburb-10-nsw.geojson

export const sydneySuburbBoundaries = ${JSON.stringify(outputData, null, 2)};

// Zone classifications for Sydney suburbs
export const suburbZones = {
  green: ${JSON.stringify(zonedFeatures.filter(f => f.properties.zone === 'green').map(f => f.properties.name))},
  orange: ${JSON.stringify(zonedFeatures.filter(f => f.properties.zone === 'orange').map(f => f.properties.name))},
  red: ${JSON.stringify(zonedFeatures.filter(f => f.properties.zone === 'red').map(f => f.properties.name))}
};

export default sydneySuburbBoundaries;`
);

console.log(`Processed data written to src/data/sydneySuburbBoundaries.js`);
console.log(`Green zones: ${zonedFeatures.filter(f => f.properties.zone === 'green').length}`);
console.log(`Orange zones: ${zonedFeatures.filter(f => f.properties.zone === 'orange').length}`);
console.log(`Red zones: ${zonedFeatures.filter(f => f.properties.zone === 'red').length}`);
