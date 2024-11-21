import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { sampleDeals } from '../../data/sampleDeals';
import 'leaflet/dist/leaflet.css';

const GeographicDistribution: React.FC = () => {
  const center = [-33.8688, 151.2093]; // Sydney CBD coordinates

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
      <div className="h-[400px]">
        <MapContainer
          center={center}
          zoom={11}
          style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {sampleDeals.map((deal) => (
            <CircleMarker
              key={deal.id}
              center={[deal.location.latitude, deal.location.longitude]}
              radius={deal.propertyValue / 100000}
              fillColor="#3B82F6"
              color="#2563EB"
              weight={1}
              opacity={0.8}
              fillOpacity={0.4}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-semibold">{deal.suburb}</h4>
                  <p className="text-sm text-gray-600">${deal.propertyValue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">LTV: {deal.ltv.toFixed(2)}%</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Circle size represents relative property value
      </div>
    </div>
  );
};

export default GeographicDistribution;