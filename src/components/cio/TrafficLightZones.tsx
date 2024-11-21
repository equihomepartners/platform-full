import React, { useState } from 'react';
import { AlertTriangle, Map, Info } from 'lucide-react';

const TrafficLightZones: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sydney Traffic Light Zones</h2>
            <p className="mt-1 text-sm text-gray-500">
              Investment zone classification based on risk assessment
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">Green Zone</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
              <span className="text-sm text-gray-600">Orange Zone</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-600">Red Zone</span>
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          <img 
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC08MTAwMTQ7QUE6Ozs6QTtFRUpLSlk6OT1BRUVOSUFNWnFLQUH/2wBDAR..." 
            alt="Sydney Traffic Light Zones"
            className="w-full rounded-lg border border-gray-200"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Green Zones</h3>
            <p className="text-sm text-green-800 mb-4">
              The most desirable areas, featuring strong economic growth, low crime rates, and high demand for properties. 
              These areas include vibrant commercial districts, reputable schools, and well-maintained infrastructure.
            </p>
            <div className="bg-white p-4 rounded-md">
              <h4 className="font-medium text-green-900 mb-2">Key Areas</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">North Shore</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Eastern Suburbs</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Northern Beaches</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-6 border-2 border-orange-200">
            <h3 className="text-lg font-semibold text-orange-900 mb-3">Orange Zones</h3>
            <p className="text-sm text-orange-800 mb-4">
              Transitional areas with moderate risks and opportunities. These regions might be undergoing development 
              or revitalization, with potential for significant value increases.
            </p>
            <div className="bg-white p-4 rounded-md">
              <h4 className="font-medium text-orange-900 mb-2">Key Areas</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Inner West</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Sutherland</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Hills District</span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
            <h3 className="text-lg font-semibold text-red-900 mb-3">Red Zones</h3>
            <p className="text-sm text-red-800 mb-4">
              Higher risk areas with economic challenges, infrastructure needs, or market volatility. 
              Properties in these areas require additional analysis and risk assessment.
            </p>
            <div className="bg-white p-4 rounded-md">
              <h4 className="font-medium text-red-900 mb-2">Key Areas</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Western Sydney</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">South West</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Outer West</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Investment Criteria by Zone</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center text-green-700">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <span className="font-medium">Green Zone Policy</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Automatic approval for analysis</li>
              <li>• Priority for fund allocation</li>
              <li>• Standard due diligence</li>
              <li>• Up to 75% LTV consideration</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center text-orange-700">
              <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
              <span className="font-medium">Orange Zone Policy</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Additional analysis required</li>
              <li>• Enhanced due diligence</li>
              <li>• Maximum 65% LTV</li>
              <li>• Growth potential focus</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center text-red-700">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
              <span className="font-medium">Red Zone Policy</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Automatic rejection</li>
              <li>• Case-by-case exceptions</li>
              <li>• Maximum 50% LTV if approved</li>
              <li>• Extensive risk assessment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficLightZones;