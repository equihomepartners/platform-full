import React, { useState, useEffect } from 'react';
import { Settings, TrendingUp, Shield, Building, Percent, Loader } from 'lucide-react';
import { portfolioApiClient } from '../services/portfolioApiClient';
import { FundParameter } from '../types/portfolioTypes';

interface ZoneAllocation {
  green: number;
  orange: number;
  red: number;
}

const FundParameters: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [parameters, setParameters] = useState<FundParameter[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await portfolioApiClient.getFundParameters();
        setParameters(data);
      } catch (error) {
        console.error('Error fetching fund parameters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [zoneAllocation, setZoneAllocation] = useState<ZoneAllocation>({
    green: 90,
    orange: 10,
    red: 0
  });

  const handleParameterChange = (id: string, value: number) => {
    setParameters(parameters.map(param =>
      param.id === id ? { ...param, value } : param
    ));
  };

  const handleZoneChange = (zone: keyof ZoneAllocation, value: number) => {
    const newAllocation = { ...zoneAllocation };
    const oldValue = newAllocation[zone];
    newAllocation[zone] = value;

    // Adjust other zones proportionally
    const remaining = 100 - value;
    const otherZones = Object.keys(newAllocation).filter(k => k !== zone) as Array<keyof ZoneAllocation>;
    const oldSum = otherZones.reduce((sum, key) => sum + newAllocation[key], 0);

    if (oldSum > 0) {
      otherZones.forEach(key => {
        newAllocation[key] = Math.round((newAllocation[key] / oldSum) * remaining);
      });
    }

    // Ensure total is 100%
    const total = Object.values(newAllocation).reduce((sum, val) => sum + val, 0);
    if (total !== 100) {
      const diff = 100 - total;
      const lastZone = otherZones[otherZones.length - 1];
      newAllocation[lastZone] += diff;
    }

    setZoneAllocation(newAllocation);
  };

  const handleParameterChange = async (id: string, value: number) => {
    try {
      await portfolioApiClient.updateFundParameter(id, value);
      setParameters(parameters.map(param =>
        param.id === id ? { ...param, value } : param
      ));
    } catch (error) {
      console.error(`Error updating parameter ${id}:`, error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-primary-500 h-8 w-8" />
        <span className="ml-2 text-neutral-600">Loading fund parameters...</span>
      </div>
    );
  }

  if (parameters.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-neutral-600">No fund parameters available</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-primary-900">Fund Parameters</h1>
            <p className="text-sm text-neutral-600 mt-1">
              Configure and manage key parameters for portfolio optimization
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md shadow-sm hover:bg-primary-700 flex items-center">
              <Settings size={16} className="mr-1.5" />
              Save Parameters
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {parameters.map(param => (
          <div key={param.id} className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-primary-50 rounded-full mr-3 border border-primary-100">
                  {param.category === 'returns' && <TrendingUp className="h-5 w-5 text-primary-600" />}
                  {param.category === 'risk' && <Shield className="h-5 w-5 text-accent-600" />}
                  {param.category === 'property' && <Building className="h-5 w-5 text-secondary-600" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-800">
                    {param.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">{param.description || 'Configure this parameter to optimize portfolio performance'}</p>
                </div>
              </div>
              <span className="text-xl font-bold text-primary-700">
                {param.unit === '$'
                  ? `$${param.value.toLocaleString()}`
                  : `${param.value}${param.unit}`}
              </span>
            </div>

            <input
              type="range"
              min={param.min}
              max={param.max}
              step={param.step || 0.1}
              value={param.value}
              onChange={(e) => handleParameterChange(param.id, Number(e.target.value))}
              className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer border border-neutral-200"
            />

            <div className="flex justify-between mt-2 text-sm text-neutral-600">
              <span>{param.unit === '$'
                ? `$${param.min.toLocaleString()}`
                : `${param.min}${param.unit}`}</span>
              <span>{param.unit === '$'
                ? `$${param.max.toLocaleString()}`
                : `${param.max}${param.unit}`}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center mb-6">
          <Percent className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="text-lg font-semibold text-primary-800">Zone Allocation Targets</h3>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-success">Green Zone Target</label>
              <span className="text-sm text-success">{zoneAllocation.green}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={zoneAllocation.green}
              onChange={(e) => handleZoneChange('green', parseInt(e.target.value))}
              className="w-full h-2 bg-success bg-opacity-20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-warning">Orange Zone Target</label>
              <span className="text-sm text-warning">{zoneAllocation.orange}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={zoneAllocation.orange}
              onChange={(e) => handleZoneChange('orange', parseInt(e.target.value))}
              className="w-full h-2 bg-warning bg-opacity-20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-error">Red Zone Target</label>
              <span className="text-sm text-error">{zoneAllocation.red}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={zoneAllocation.red}
              onChange={(e) => handleZoneChange('red', parseInt(e.target.value))}
              className="w-full h-2 bg-error bg-opacity-20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg mt-4">
            <h4 className="text-sm font-medium text-neutral-700 mb-2">Current Allocation</h4>
            <div className="h-4 rounded-full overflow-hidden flex">
              <div
                className="bg-success h-full transition-all duration-300"
                style={{ width: `${zoneAllocation.green}%` }}
              />
              <div
                className="bg-warning h-full transition-all duration-300"
                style={{ width: `${zoneAllocation.orange}%` }}
              />
              <div
                className="bg-error h-full transition-all duration-300"
                style={{ width: `${zoneAllocation.red}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundParameters;