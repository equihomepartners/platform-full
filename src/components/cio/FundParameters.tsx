import React from 'react';
import { Settings, TrendingUp, Shield, Building, BarChart3, Clock, DollarSign, Percent } from 'lucide-react';
import { useFundParameters } from '../../store/fundParameters';

const FundParameters: React.FC = () => {
  const {
    interestRate,
    maxLoanSize,
    maxLTV,
    maxCombinedLTV,
    targetIRR,
    minPropertyValue,
    maxPropertyValue,
    maxSuburbExposure,
    weeklyApprovalTarget,
    remainingAllocation,
    zoneAllocation,
    setParameter,
    setZoneAllocation
  } = useFundParameters();

  const handleParameterChange = (key: string, value: number) => {
    setParameter(key as keyof Omit<typeof parameters, 'setParameter' | 'zoneAllocation'>, value);
  };

  const handleZoneChange = (zone: keyof typeof zoneAllocation, value: number) => {
    // Adjust other zones proportionally
    const remaining = 100 - value;
    const otherZones = Object.keys(zoneAllocation).filter(k => k !== zone) as Array<keyof typeof zoneAllocation>;
    const oldSum = otherZones.reduce((sum, key) => sum + zoneAllocation[key], 0);
    
    otherZones.forEach(key => {
      const newValue = oldSum > 0 ? Math.round((zoneAllocation[key] / oldSum) * remaining) : 0;
      setZoneAllocation(key, newValue);
    });
    
    setZoneAllocation(zone, value);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold">Returns Parameters</h3>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate ({interestRate}%)
              </label>
              <input
                type="range"
                min={0}
                max={20}
                step={0.5}
                value={interestRate}
                onChange={(e) => handleParameterChange('interestRate', Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target IRR ({targetIRR}%)
              </label>
              <input
                type="range"
                min={10}
                max={30}
                step={0.5}
                value={targetIRR}
                onChange={(e) => handleParameterChange('targetIRR', Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold">Risk Parameters</h3>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum LTV ({maxLTV}%)
              </label>
              <input
                type="range"
                min={50}
                max={85}
                step={5}
                value={maxLTV}
                onChange={(e) => handleParameterChange('maxLTV', Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Combined LTV ({maxCombinedLTV}%)
              </label>
              <input
                type="range"
                min={60}
                max={95}
                step={5}
                value={maxCombinedLTV}
                onChange={(e) => handleParameterChange('maxCombinedLTV', Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Suburb Exposure ({maxSuburbExposure}%)
              </label>
              <input
                type="range"
                min={10}
                max={40}
                step={5}
                value={maxSuburbExposure}
                onChange={(e) => handleParameterChange('maxSuburbExposure', Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold">Loan Parameters</h3>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Loan Size (${(maxLoanSize / 1000000).toFixed(1)}M)
              </label>
              <input
                type="range"
                min={500000}
                max={2000000}
                step={100000}
                value={maxLoanSize}
                onChange={(e) => handleParameterChange('maxLoanSize', Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Property Value (${(minPropertyValue / 1000000).toFixed(1)}M)
              </label>
              <input
                type="range"
                min={500000}
                max={2000000}
                step={100000}
                value={minPropertyValue}
                onChange={(e) => handleParameterChange('minPropertyValue', Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Property Value (${(maxPropertyValue / 1000000).toFixed(1)}M)
              </label>
              <input
                type="range"
                min={2000000}
                max={10000000}
                step={500000}
                value={maxPropertyValue}
                onChange={(e) => handleParameterChange('maxPropertyValue', Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-6">
            <Percent className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold">Zone Allocation Targets</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-green-700">Green Zone Target</label>
                <span className="text-sm text-green-700">{zoneAllocation.green}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={zoneAllocation.green}
                onChange={(e) => handleZoneChange('green', parseInt(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-yellow-700">Orange Zone Target</label>
                <span className="text-sm text-yellow-700">{zoneAllocation.orange}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={zoneAllocation.orange}
                onChange={(e) => handleZoneChange('orange', parseInt(e.target.value))}
                className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-red-700">Red Zone Target</label>
                <span className="text-sm text-red-700">{zoneAllocation.red}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={zoneAllocation.red}
                onChange={(e) => handleZoneChange('red', parseInt(e.target.value))}
                className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundParameters;