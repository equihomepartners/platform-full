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
import sydneySuburbBoundaries from '../../../data/sydneySuburbBoundaries';
import sydneyPostcodeBoundaries from '../../../data/sydneyPostcodeBoundaries';
import suburbScores, { zoneStats } from '../../../data/suburbScores';
import { formatNumber } from '../../../shared/utils/formatters';
import { useMLData } from '../context/MLDataContext';
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
  const [isProcessingSuburbs, setIsProcessingSuburbs] = useState(false);

  // Get ML data for confidence levels
  const { modelInfo, systemStatus } = useMLData();

  // Debug logs
  useEffect(() => {
    console.log('Mapbox Token:', MAPBOX_TOKEN);
    console.log('Traffic Light Zones:', trafficLightZones);
    console.log('Suburb Coordinates:', suburbCoordinates);
    console.log('Sydney Suburbs:', sydneySuburbBoundaries.features.length);
    console.log('Sydney Postcodes:', sydneyPostcodeBoundaries.features.length);
  }, []);

  // Use suburb boundaries from GeoJSON with added scores and confidence levels
  const suburbFeatures = sydneySuburbBoundaries.features.map(feature => {
    const suburbName = feature.properties?.nsw_loca_2;

    // Get base score data from static data
    let scoreData = suburbScores[suburbName] || {
      score: Math.floor(Math.random() * 100),
      confidence: 0,
      zone: Math.random() > 0.66 ? 'green' : (Math.random() > 0.5 ? 'yellow' : 'red')
    };

    // Always use ML model confidence if available, overriding any hardcoded values
    if (modelInfo && systemStatus) {
      // Use the model's confidence level for all suburbs
      // In a real implementation, this would be suburb-specific from the API
      const mlConfidence = Math.round(modelInfo.metrics.confidence * 100);

      // Override any existing confidence value with the ML model confidence
      scoreData = {
        ...scoreData,
        confidence: mlConfidence
      };

      // Log for debugging
      if (suburbName === 'Vaucluse') {
        console.log('ML Model Confidence:', mlConfidence);
        console.log('Updated Suburb Data:', scoreData);
      }
    }

    return {
      ...feature,
      properties: {
        ...feature.properties,
        score: scoreData.score,
        confidence: scoreData.confidence,
        zone: scoreData.zone,
        transitionProbability: predictiveMode ? scoreData.confidence / 100 : 0 // Use confidence for predictive mode
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
  console.log('Total suburb features:', suburbFeatures.length);
  console.log('First 5 suburb features:', suburbFeatures.slice(0, 5));

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

  // Style for polygon features (suburb boundaries) with professional gradient color scheme
  const polygonLayerStyle = {
    id: 'suburb-polygons',
    type: 'fill',
    source: 'suburb-polygons',
    paint: {
      'fill-color': [
        'match',
        ['get', 'zone'],
        'green', 'rgba(74, 222, 128, 0.4)', // Green with fixed opacity
        'yellow', 'rgba(252, 211, 77, 0.4)', // Yellow with fixed opacity
        'red', 'rgba(252, 165, 165, 0.4)', // Red with fixed opacity
        'rgba(209, 213, 219, 0.4)' // Default gray with fixed opacity
      ],
      'fill-opacity': 1.0 // Using fixed opacity in colors above
    }
  };

  // Style for polygon outlines - cleaner and more visible
  const polygonOutlineStyle = {
    id: 'suburb-polygon-outlines',
    type: 'line',
    source: 'suburb-polygons',
    paint: {
      'line-color': '#000000',
      'line-width': 0.8,
      'line-opacity': 0.3
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
  const [filteredFeatures, setFilteredFeatures] = useState([]);

  // Use useEffect to filter features with processing state
  useEffect(() => {
    setIsProcessingSuburbs(true);

    // Use setTimeout to allow the UI to update before heavy processing
    setTimeout(() => {
      const filtered = selectedLayer === 'suburbs'
        ? suburbFeatures.filter(f =>
            (f.properties?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedTab === 'all' || f.properties?.zone === selectedTab)
          )
        : postcodeFeatures.filter(f =>
            (f.properties?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedTab === 'all' || f.properties?.zone === selectedTab)
          );

      setFilteredFeatures(filtered);
      setIsProcessingSuburbs(false);
    }, 100);
  }, [searchTerm, selectedTab, selectedLayer, suburbFeatures, postcodeFeatures]);

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search suburbs..."
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Zone Filter Tabs */}
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-2 rounded-md border ${
              selectedTab === 'all'
                ? 'bg-blue-50 text-blue-500 border-blue-100 font-medium'
                : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
            } transition-colors duration-150`}
          >
            All Zones
          </button>
          <button
            onClick={() => setSelectedTab('green')}
            className={`px-4 py-2 rounded-md border ${
              selectedTab === 'green'
                ? 'bg-green-50 text-green-600 border-green-100 font-medium'
                : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
            } transition-colors duration-150`}
          >
            Green Zone
          </button>
          <button
            onClick={() => setSelectedTab('yellow')}
            className={`px-4 py-2 rounded-md border ${
              selectedTab === 'yellow'
                ? 'bg-yellow-50 text-yellow-600 border-yellow-100 font-medium'
                : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
            } transition-colors duration-150`}
          >
            Yellow Zone
          </button>
          <button
            onClick={() => setSelectedTab('red')}
            className={`px-4 py-2 rounded-md border ${
              selectedTab === 'red'
                ? 'bg-red-50 text-red-500 border-red-100 font-medium'
                : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
            } transition-colors duration-150`}
          >
            Red Zone
          </button>
        </div>
      </div>

      {/* Layer Control - Professional styling */}
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2 text-neutral-700">Map Layers</h3>
        <div className="bg-white rounded-md border border-neutral-200 shadow-sm p-2 flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedLayer === 'suburbs'
                ? 'bg-blue-50 text-blue-500 border border-blue-100 font-medium'
                : 'text-neutral-600 hover:bg-neutral-50 border border-transparent'
            }`}
            onClick={() => setSelectedLayer('suburbs')}
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Suburbs
            </span>
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedLayer === 'postcodes'
                ? 'bg-blue-50 text-blue-500 border border-blue-100 font-medium'
                : 'text-neutral-500 border border-transparent opacity-60 cursor-not-allowed'
            }`}
            onClick={() => setSelectedLayer('postcodes')}
            disabled={true}
            title="Coming soon"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Postcodes
              <span className="ml-1 text-xs bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded-full text-[10px] font-medium">Soon</span>
            </span>
          </button>
        </div>
      </div>

      {/* Quick Stats - Professional styling */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-sm">
          <div className="text-sm text-neutral-600 font-medium">
            {selectedLayer === 'suburbs' ? 'Total Suburbs' : 'Total Postcodes'}
          </div>
          <div className="text-2xl font-bold text-neutral-800 mt-1">{filteredFeatures.length}</div>
          <div className="text-xs text-neutral-500 mt-1">
            {searchTerm ? `Matching "${searchTerm}"` : 'Currently visible'}
            {selectedTab !== 'all' && ` in ${selectedTab} zone`}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-sm">
          <div className="text-sm text-neutral-600 font-medium">Zone Distribution</div>
          <div className="flex space-x-1 mt-3 h-3">
            <div className="rounded-l-full border-l border-t border-b border-gray-300" style={{
              width: `${(filteredFeatures.filter(f => f.properties.zone === 'green').length / filteredFeatures.length) * 100}%`,
              backgroundColor: 'rgba(74, 222, 128, 0.4)'
            }} />
            <div className="border-t border-b border-gray-300" style={{
              width: `${(filteredFeatures.filter(f => f.properties.zone === 'yellow').length / filteredFeatures.length) * 100}%`,
              backgroundColor: 'rgba(252, 211, 77, 0.4)'
            }} />
            <div className="rounded-r-full border-r border-t border-b border-gray-300" style={{
              width: `${(filteredFeatures.filter(f => f.properties.zone === 'red').length / filteredFeatures.length) * 100}%`,
              backgroundColor: 'rgba(252, 165, 165, 0.4)'
            }} />
          </div>
          <div className="flex justify-between mt-1 text-xs text-neutral-500">
            <span>Green</span>
            <span>Yellow</span>
            <span>Red</span>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-sm">
          <div className="text-sm text-neutral-600 font-medium">Average Growth</div>
          <div className="text-2xl font-bold text-green-500 mt-1">+4.2%</div>
          <div className="text-xs text-neutral-500 mt-1">Last 12 months</div>
          <div className="mt-2 h-1.5 bg-neutral-100 rounded-full overflow-hidden border border-gray-200">
            <div className="h-full" style={{ width: '42%', backgroundColor: 'rgba(74, 222, 128, 0.6)' }}></div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-sm">
          <div className="text-sm text-neutral-600 font-medium">ML Confidence</div>
          <div className="text-2xl font-bold text-blue-500 mt-1">
            {modelInfo ? `${(modelInfo.metrics.confidence * 100).toFixed(1)}%` : 'Loading...'}
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            Based on {modelInfo ? `${(modelInfo.metrics.data_points / 1000).toFixed(0)}K` : 'Loading...'} data points
          </div>
          <div className="mt-2 h-1.5 bg-neutral-100 rounded-full overflow-hidden border border-gray-200">
            <div className="h-full"
                 style={{ width: modelInfo ? `${modelInfo.metrics.confidence * 100}%` : '0%', backgroundColor: 'rgba(96, 165, 250, 0.6)' }}></div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[700px] rounded-lg overflow-hidden relative shadow-lg border border-neutral-200">
        {/* Loading Indicators */}
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 bg-opacity-80 z-10">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg border border-neutral-200">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mb-3"></div>
              <p className="text-sm text-neutral-700 font-medium">Loading map data...</p>
              <p className="text-xs text-neutral-500 mt-1">Please wait while we load the Sydney suburbs</p>
            </div>
          </div>
        )}

        {/* Processing Suburbs Indicator */}
        {isProcessingSuburbs && isMapLoaded && (
          <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md z-10 flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-400"></div>
            <p className="text-sm text-neutral-700">Processing {suburbFeatures.length} suburbs...</p>
          </div>
        )}
        <Map
          initialViewState={{
            latitude: -33.8688, // Sydney CBD
            longitude: 151.2093,
            zoom: 9.0 // Zoomed out to show all Sydney suburbs
          }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={selectedLayer === 'suburbs' ? ['suburb-polygons', 'suburb-polygon-outlines'] : []}
          terrain={null}
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

          {/* Custom Layers for Better Map Visualization */}
          {/* Water Layer */}
          <Source
            id="water-layer"
            type="vector"
            url="mapbox://mapbox.mapbox-streets-v8"
          >
            <Layer
              id="water-layer"
              type="fill"
              source-layer="water"
              paint={{
                'fill-color': '#cae8ff', // Lighter blue for water
                'fill-opacity': 0.7
              }}
              beforeId="suburb-polygons"
            />
            <Layer
              id="water-outline"
              type="line"
              source-layer="water"
              paint={{
                'line-color': '#a3d2ff',
                'line-width': 1
              }}
              beforeId="suburb-polygons"
            />
          </Source>

          {/* Parks Layer */}
          <Source
            id="parks-layer"
            type="vector"
            url="mapbox://mapbox.mapbox-streets-v8"
          >
            <Layer
              id="parks-layer"
              type="fill"
              source-layer="landuse"
              filter={['==', 'class', 'park']}
              paint={{
                'fill-color': '#e6f5e6', // Light green for parks
                'fill-opacity': 0.5
              }}
              beforeId="suburb-polygons"
            />
          </Source>

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
                      className={`border ${
                        popupInfo.zone === 'green'
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : popupInfo.zone === 'yellow'
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                            : 'bg-red-100 text-red-800 border-red-300'
                      }`}
                    >
                      {popupInfo.zone === 'green' ? 'Green Zone' : popupInfo.zone === 'yellow' ? 'Yellow Zone' : 'Red Zone'}
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

          {/* Map Legend - Professional styling */}
          <div className="absolute bottom-5 right-5 bg-white p-4 rounded-lg shadow-lg z-10 max-w-xs border border-neutral-200">
            <h4 className="text-sm font-semibold mb-3 text-neutral-800">Zone Classification</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-sm border border-gray-300" style={{ backgroundColor: 'rgba(74, 222, 128, 0.4)' }}></div>
                <span className="text-xs text-neutral-700 ml-3">Green Zone - Premium investment areas</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-sm border border-gray-300" style={{ backgroundColor: 'rgba(252, 211, 77, 0.4)' }}></div>
                <span className="text-xs text-neutral-700 ml-3">Yellow Zone - Transitioning areas</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-sm border border-gray-300" style={{ backgroundColor: 'rgba(252, 165, 165, 0.4)' }}></div>
                <span className="text-xs text-neutral-700 ml-3">Red Zone - Higher risk areas</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-sm border border-gray-300" style={{ backgroundColor: 'rgba(209, 213, 219, 0.4)' }}></div>
                <span className="text-xs text-neutral-700 ml-3">Unclassified</span>
              </div>
            </div>
          </div>
        </Map>
      </div>

      {/* Bottom Legend - Professional styling */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: 'rgba(74, 222, 128, 0.4)' }} />
              <span className="text-sm text-neutral-700 font-medium">Green Zone</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: 'rgba(252, 211, 77, 0.4)' }} />
              <span className="text-sm text-neutral-700 font-medium">Yellow Zone</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: 'rgba(252, 165, 165, 0.4)' }} />
              <span className="text-sm text-neutral-700 font-medium">Red Zone</span>
            </div>
          </div>
          <div className="text-sm text-neutral-600 font-medium">
            Click on any suburb for detailed analysis
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLEnhancedMap;