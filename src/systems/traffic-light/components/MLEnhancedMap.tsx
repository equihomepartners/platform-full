import React, { useState, useCallback, useEffect } from 'react';
import Map, {
  Source,
  Layer,
  NavigationControl,
  CircleLayer,
  Popup
} from 'react-map-gl';
import { Badge } from '../../../components/ui/badge';
import { trafficLightZones, suburbCoordinates } from '../../../data/zoneData';
import sydneySuburbBoundaries, { suburbZones } from '../../../data/sydneySuburbBoundaries';
import sydneyPostcodeBoundaries from '../../../data/sydneyPostcodeBoundaries';
import { formatNumber } from '../../../shared/utils/formatters';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { MapLayerMouseEvent } from 'react-map-gl';

interface Props {
  onSuburbSelect: (suburb: string) => void;
  predictiveMode?: boolean;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXF1aWhvbWVwYXJ0bmVycyIsImEiOiJjbTNzaDVnNnEwZTU0MmpyMGM1MWh0OWJvIn0.4-N9TZtnFGMNF9KYl34o5Q';

const MLEnhancedMap: React.FC<Props> = ({ onSuburbSelect, predictiveMode = false }) => {
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedLayer, setSelectedLayer] = useState('suburbs'); // 'suburbs', 'postcodes', etc.
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Debug logs
  useEffect(() => {
    console.log('Mapbox Token:', MAPBOX_TOKEN);
    console.log('Traffic Light Zones:', trafficLightZones);
    console.log('Suburb Coordinates:', suburbCoordinates);
    console.log('Sydney Suburbs:', sydneySuburbBoundaries.features.length);
    console.log('Sydney Postcodes:', sydneyPostcodeBoundaries.features.length);
  }, []);

  // Use suburb boundaries from GeoJSON with added transition probability for predictive mode
  const suburbFeatures = sydneySuburbBoundaries.features.map(feature => {
    return {
      ...feature,
      properties: {
        ...feature.properties,
        transitionProbability: Math.random() // Simulated probability for demo
      }
    };
  });

  // Use postcode boundaries from GeoJSON (currently empty, for future use)
  const postcodeFeatures = sydneyPostcodeBoundaries.features.map(feature => {
    return {
      ...feature,
      properties: {
        ...feature.properties,
        transitionProbability: Math.random() // Simulated probability for demo
      }
    };
  });

  console.log('All features:', suburbFeatures);

  // Define growth corridors for predictive mode
  const growthCorridors = [
    {
      name: 'Inner West → Eastern Suburbs',
      color: 'rgba(34, 197, 94, 0.2)', // green with transparency
      coordinates: [
        [-33.9111, 151.1549], // Marrickville
        [-33.8858, 151.2263], // Paddington
        [-33.8764, 151.2432]  // Double Bay
      ]
    },
    {
      name: 'South Sydney → Inner South',
      color: 'rgba(59, 130, 246, 0.2)', // blue with transparency
      coordinates: [
        [-33.9100, 151.1939], // Alexandria
        [-33.9033, 151.2094], // Waterloo
        [-33.9198, 151.2591]  // Coogee
      ]
    }
  ];

  // Define growth corridor analysis
  const corridorAnalysis = {
    'Inner West → Eastern Suburbs': {
      title: 'Inner West to Eastern Suburbs Corridor',
      metrics: {
        transitionProbability: 85,
        timeframe: '12-18 months',
        currentStage: 'Early Transition',
        keySuburbs: ['Marrickville', 'Alexandria', 'Waterloo']
      },
      drivers: [
        'New Metro Line',
        'Commercial Development',
        'Demographic Shift'
      ],
      risks: [
        'Construction Delays',
        'Price Speculation',
        'Development Oversupply'
      ]
    },
    'South Sydney → Inner South': {
      title: 'South Sydney to Inner South Corridor',
      metrics: {
        transitionProbability: 78,
        timeframe: '18-24 months',
        currentStage: 'Planning Phase',
        keySuburbs: ['Mascot', 'Rosebery', 'Eastlakes']
      },
      drivers: [
        'Infrastructure Investment',
        'Employment Growth',
        'Lifestyle Amenities'
      ],
      risks: [
        'Market Timing',
        'Competition for Sites',
        'Planning Changes'
      ]
    }
  };

  // Style for polygon features (suburb boundaries)
  const polygonLayerStyle = {
    id: 'suburb-polygons',
    type: 'fill',
    source: 'suburb-polygons',
    paint: {
      'fill-color': predictiveMode ? [
        'interpolate',
        ['linear'],
        ['get', 'transitionProbability'],
        0.3, '#ef4444',
        0.6, '#f97316',
        0.9, '#22c55e'
      ] : [
        'match',
        ['get', 'zone'],
        'green', '#22c55e',
        'orange', '#f97316',
        'red', '#ef4444',
        '#888888' // Default color for unclassified suburbs
      ],
      'fill-opacity': 0.7
    }
  };

  // Style for polygon outlines
  const polygonOutlineStyle = {
    id: 'suburb-polygon-outlines',
    type: 'line',
    source: 'suburb-polygons',
    paint: {
      'line-color': '#ffffff',
      'line-width': 1.5,
      'line-opacity': 0.8
    }
  };

  // No fallback style needed as we're using only polygon features

  // Add growth corridor layers
  const corridorLayers = predictiveMode ? growthCorridors.map((corridor, index) => ({
    id: `growth-corridor-${index}`,
    type: 'fill',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [corridor.coordinates]
        }
      }
    },
    paint: {
      'fill-color': corridor.color,
      'fill-opacity': 0.5
    }
  })) : [];

  // Add corridor click handler
  const handleCorridorClick = (corridorName: string) => {
    const analysis = corridorAnalysis[corridorName as keyof typeof corridorAnalysis];
    setPopupInfo({
      suburb: analysis.title,
      longitude: 151.2093, // Center coordinates
      latitude: -33.8688,
      isCorridorAnalysis: true,
      analysis
    });
  };

  const handleClick = useCallback((event: MapLayerMouseEvent) => {
    const features = event.features;
    if (features && features.length > 0) {
      const feature = features[0];
      const name = feature.properties?.name as string;
      if (name) {
        // For polygon features, use the click point as popup location
        const longitude = event.lngLat.lng;
        const latitude = event.lngLat.lat;

        // Extract additional metadata from feature properties
        const popupData = {
          suburb: name,
          longitude,
          latitude,
          zone: feature.properties?.zone,
          postcode: feature.properties?.postcode,
          population: feature.properties?.population,
          median_income: feature.properties?.median_income,
          area_sqkm: feature.properties?.area_sqkm,
          local_govt: feature.properties?.local_govt
        };

        setPopupInfo(popupData);
        onSuburbSelect(name);
      }
    }
  }, [onSuburbSelect]);

  const handleError = (error: any) => {
    console.error('Mapbox error:', error);
  };

  const handleLoad = (event: any) => {
    console.log('Map loaded:', event);
    setIsMapLoaded(true);
  };

  if (!MAPBOX_TOKEN) {
    console.error('No Mapbox token found');
    return <div>Error: No Mapbox token</div>;
  }

  // Filter features based on search, tab, and selected layer
  const filteredFeatures = selectedLayer === 'suburbs'
    ? suburbFeatures.filter(f =>
        f.properties.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedTab === 'all' || f.properties.zone === selectedTab)
      )
    : postcodeFeatures.filter(f =>
        (f.properties.name || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedTab === 'all' || f.properties.zone === selectedTab)
      );

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search suburbs..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Zone Filter Tabs */}
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === 'all'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedTab('green')}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === 'green'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Green
          </button>
          <button
            onClick={() => setSelectedTab('orange')}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === 'orange'
                ? 'bg-orange-100 text-orange-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Orange
          </button>
          <button
            onClick={() => setSelectedTab('red')}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === 'red'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Red
          </button>
        </div>
      </div>

      {/* Layer Control */}
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Map Layers</h3>
        <div className="bg-white rounded-lg border shadow-sm p-2 flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md transition-colors ${selectedLayer === 'suburbs' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setSelectedLayer('suburbs')}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Suburbs
            </span>
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-colors ${selectedLayer === 'postcodes' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100 opacity-70'}`}
            onClick={() => setSelectedLayer('postcodes')}
            disabled={true}
            title="Coming soon"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Postcodes
              <span className="ml-1 text-xs bg-gray-200 text-gray-700 px-1 rounded">Soon</span>
            </span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="text-sm text-gray-600">
            {selectedLayer === 'suburbs' ? 'Total Suburbs' : 'Total Postcodes'}
          </div>
          <div className="text-2xl font-bold">{filteredFeatures.length}</div>
          <div className="text-xs text-gray-500">
            {searchTerm ? `Matching "${searchTerm}"` : 'Currently visible'}
            {selectedTab !== 'all' && ` in ${selectedTab} zone`}
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-sm text-gray-600">Zone Distribution</div>
          <div className="flex space-x-2 mt-2">
            <div className="flex-1 bg-green-100 rounded h-2" style={{
              width: `${(filteredFeatures.filter(f => f.properties.zone === 'green').length / filteredFeatures.length) * 100}%`
            }} />
            <div className="flex-1 bg-orange-100 rounded h-2" style={{
              width: `${(filteredFeatures.filter(f => f.properties.zone === 'orange').length / filteredFeatures.length) * 100}%`
            }} />
            <div className="flex-1 bg-red-100 rounded h-2" style={{
              width: `${(filteredFeatures.filter(f => f.properties.zone === 'red').length / filteredFeatures.length) * 100}%`
            }} />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-sm text-gray-600">Average Growth</div>
          <div className="text-2xl font-bold text-green-600">+4.2%</div>
          <div className="text-xs text-gray-500">Last 12 months</div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-sm text-gray-600">ML Confidence</div>
          <div className="text-2xl font-bold text-blue-600">94.3%</div>
          <div className="text-xs text-gray-500">Based on 1.2M data points</div>
        </div>
      </div>



      {/* Map Container */}
      <div className="h-[500px] rounded-lg overflow-hidden relative">
        {/* Loading Indicator */}
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-2"></div>
              <p className="text-sm text-gray-700">Loading map data...</p>
            </div>
          </div>
        )}
        <Map
          initialViewState={{
            latitude: -33.8688,
            longitude: 151.2093,
            zoom: 11
          }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={selectedLayer === 'suburbs' ? ['suburb-polygons', 'suburb-polygon-outlines'] : []}
          onClick={handleClick}
          onError={handleError}
          onLoad={handleLoad}
        >
          {/* Growth Corridor Layers */}
          {predictiveMode && corridorLayers.map((layer, index) => (
            <Source key={layer.id} {...layer.source}>
              <Layer
                {...layer}
                onClick={() => handleCorridorClick(growthCorridors[index].name)}
              />
            </Source>
          ))}

          {/* Suburb Boundaries Layer - Only show when suburbs layer is selected */}
          {selectedLayer === 'suburbs' && (
            <Source
              id="suburb-polygons"
              type="geojson"
              data={{
                type: 'FeatureCollection',
                features: filteredFeatures
              }}
            >
              <Layer {...polygonLayerStyle} />
              <Layer {...polygonOutlineStyle} />
            </Source>
          )}

          {/* Postcodes Layer - Will be implemented in the future */}
          {selectedLayer === 'postcodes' && (
            <Source
              id="postcodes-placeholder"
              type="geojson"
              data={{
                type: 'FeatureCollection',
                features: filteredFeatures
              }}
            >
              <Layer {...polygonLayerStyle} />
              <Layer {...polygonOutlineStyle} />
            </Source>
          )}

          {/* Enhanced Popup */}
          {popupInfo && (
            <Popup
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              anchor="bottom"
              onClose={() => setPopupInfo(null)}
              className="suburb-popup"
            >
              {popupInfo.isCorridorAnalysis ? (
                <div className="p-4 max-w-sm">
                  <h3 className="font-semibold text-lg mb-2">{popupInfo.analysis.title}</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium">Transition Metrics</div>
                      <div className="text-sm">Probability: {popupInfo.analysis.metrics.transitionProbability}%</div>
                      <div className="text-sm">Timeframe: {popupInfo.analysis.metrics.timeframe}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Key Suburbs</div>
                      <div className="text-sm">{popupInfo.analysis.metrics.keySuburbs.join(', ')}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-2 max-w-xs">
                  <h3 className="font-semibold text-lg">{popupInfo.suburb}</h3>

                  {/* Zone Badge */}
                  <div className="mt-2">
                    <Badge
                      className={`${popupInfo.zone === 'green' ? 'bg-green-500' : popupInfo.zone === 'orange' ? 'bg-orange-500' : 'bg-red-500'}`}
                    >
                      {popupInfo.zone === 'green' ? 'Green Zone' : popupInfo.zone === 'orange' ? 'Orange Zone' : 'Red Zone'}
                    </Badge>
                  </div>

                  {/* Additional Metadata */}
                  {popupInfo.postcode && (
                    <div className="mt-2 text-sm">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-gray-500">Postcode:</div>
                        <div>{popupInfo.postcode}</div>

                        {popupInfo.population && (
                          <>
                            <div className="text-gray-500">Population:</div>
                            <div>{formatNumber(popupInfo.population)}</div>
                          </>
                        )}

                        {popupInfo.median_income && (
                          <>
                            <div className="text-gray-500">Median Income:</div>
                            <div>${formatNumber(popupInfo.median_income)}</div>
                          </>
                        )}

                        {popupInfo.area_sqkm && (
                          <>
                            <div className="text-gray-500">Area:</div>
                            <div>{popupInfo.area_sqkm} km²</div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  <p className="mt-2 text-sm text-gray-600">
                    {predictiveMode ? 'Click for transition analysis' : 'Click for detailed analysis'}
                  </p>
                </div>
              )}
            </Popup>
          )}

          <NavigationControl position="top-right" />

          {/* Map Legend */}
          <div className="absolute bottom-5 right-5 bg-white p-3 rounded-lg shadow-md z-10 max-w-xs">
            <h4 className="text-sm font-medium mb-2">Zone Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-sm bg-green-500 mr-2"></div>
                <span className="text-xs">Green Zone - Premium suburbs</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-sm bg-orange-500 mr-2"></div>
                <span className="text-xs">Orange Zone - Transitioning suburbs</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-sm bg-red-500 mr-2"></div>
                <span className="text-xs">Red Zone - Higher risk suburbs</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-sm bg-gray-400 mr-2"></div>
                <span className="text-xs">Unclassified</span>
              </div>
            </div>
          </div>
        </Map>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm">Green Zone</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-sm">Orange Zone</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm">Red Zone</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Click on any suburb for detailed analysis
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLEnhancedMap;