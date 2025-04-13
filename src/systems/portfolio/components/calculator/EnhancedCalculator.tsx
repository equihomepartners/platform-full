import React, { useState, useEffect } from 'react';
import { Calculator, Info, Server, AlertTriangle } from 'lucide-react';
import FundSettingsPanel from './FundSettingsPanel';
import LoanParametersPanel from './LoanParametersPanel';
import ResultsPanel from './ResultsPanel';
import PythonSimulationClient from '../../services/pythonSimulationClient';

/**
 * Enhanced Calculator Component
 * 
 * This component provides an institutional-grade UI for the simulation calculator.
 */
const EnhancedCalculator: React.FC = () => {
  // Fund settings state
  const [fundSettings, setFundSettings] = useState({
    fund_size: 100000000, // $100M
    fund_term: 10, // 10 years
    management_fee_rate: 0.02, // 2%
    hurdle_rate: 0.06, // 6%
    performance_fee_rate: 0.20, // 20%
    origination_fee_rate: 0.03, // 3%
    simple_interest_rate: 0.05, // 5%
    gp_investment_percentage: 0.05, // 5%
    average_property_value: 1000000, // $1M
    average_ltv: 0.40, // 40%
    average_appreciation_rate: 0.04, // 4%
    average_exit_timeframe: 7 // 7 years (when homeowners exit through sale or refinance)
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Results state
  const [results, setResults] = useState<any>(null);
  
  // Python API state
  const [isPythonAvailable, setIsPythonAvailable] = useState<boolean>(false);
  const [isCheckingPython, setIsCheckingPython] = useState<boolean>(true);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Handle setting changes
  const handleSettingChange = (name: string, value: number) => {
    setFundSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate settings
  const validateSettings = () => {
    const newErrors: Record<string, string> = {};

    // Fund size validation
    if (fundSettings.fund_size <= 0) {
      newErrors.fund_size = 'Fund size must be greater than 0';
    } else if (fundSettings.fund_size > 1000000000) {
      newErrors.fund_size = 'Fund size must be less than or equal to $1B';
    }

    // Fund term validation
    if (fundSettings.fund_term < 5) {
      newErrors.fund_term = 'Fund term must be at least 5 years';
    } else if (fundSettings.fund_term > 15) {
      newErrors.fund_term = 'Fund term must be at most 15 years';
    }

    // Management fee validation
    if (fundSettings.management_fee_rate < 0.005) {
      newErrors.management_fee_rate = 'Management fee must be at least 0.5%';
    } else if (fundSettings.management_fee_rate > 0.03) {
      newErrors.management_fee_rate = 'Management fee must be at most 3%';
    }

    // Hurdle rate validation
    if (fundSettings.hurdle_rate < 0.04) {
      newErrors.hurdle_rate = 'Hurdle rate must be at least 4%';
    } else if (fundSettings.hurdle_rate > 0.08) {
      newErrors.hurdle_rate = 'Hurdle rate must be at most 8%';
    }

    // Performance fee validation
    if (fundSettings.performance_fee_rate < 0.1) {
      newErrors.performance_fee_rate = 'Performance fee must be at least 10%';
    } else if (fundSettings.performance_fee_rate > 0.3) {
      newErrors.performance_fee_rate = 'Performance fee must be at most 30%';
    }

    // Origination fee validation
    if (fundSettings.origination_fee_rate < 0.01) {
      newErrors.origination_fee_rate = 'Origination fee must be at least 1%';
    } else if (fundSettings.origination_fee_rate > 0.05) {
      newErrors.origination_fee_rate = 'Origination fee must be at most 5%';
    }

    // Simple interest rate validation
    if (fundSettings.simple_interest_rate < 0.03) {
      newErrors.simple_interest_rate = 'Simple interest rate must be at least 3%';
    } else if (fundSettings.simple_interest_rate > 0.07) {
      newErrors.simple_interest_rate = 'Simple interest rate must be at most 7%';
    }

    // GP investment percentage validation
    if (fundSettings.gp_investment_percentage < 0.01) {
      newErrors.gp_investment_percentage = 'GP investment must be at least 1%';
    } else if (fundSettings.gp_investment_percentage > 0.1) {
      newErrors.gp_investment_percentage = 'GP investment must be at most 10%';
    }

    // Average property value validation
    if (fundSettings.average_property_value <= 0) {
      newErrors.average_property_value = 'Property value must be greater than 0';
    } else if (fundSettings.average_property_value > 10000000) {
      newErrors.average_property_value = 'Property value must be less than or equal to $10M';
    }

    // Average LTV validation
    if (fundSettings.average_ltv < 0.2) {
      newErrors.average_ltv = 'LTV must be at least 20%';
    } else if (fundSettings.average_ltv > 0.6) {
      newErrors.average_ltv = 'LTV must be at most 60%';
    }

    // Average appreciation rate validation
    if (fundSettings.average_appreciation_rate < 0.02) {
      newErrors.average_appreciation_rate = 'Appreciation rate must be at least 2%';
    } else if (fundSettings.average_appreciation_rate > 0.06) {
      newErrors.average_appreciation_rate = 'Appreciation rate must be at most 6%';
    }

    // Average exit timeframe validation
    if (fundSettings.average_exit_timeframe < 3) {
      newErrors.average_exit_timeframe = 'Exit timeframe must be at least 3 years';
    } else if (fundSettings.average_exit_timeframe > fundSettings.fund_term) {
      newErrors.average_exit_timeframe = `Exit timeframe cannot exceed fund term (${fundSettings.fund_term} years)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Run calculations
  const runCalculations = async () => {
    if (!validateSettings()) {
      return;
    }

    setIsCalculating(true);
    
    try {
      let results;
      
      if (isPythonAvailable) {
        // Use Python backend
        results = await PythonSimulationClient.runSimulation(fundSettings);
      } else {
        // Use JavaScript implementation
        results = await PythonSimulationClient.runSimulation(fundSettings);
      }
      
      setResults(results);
    } catch (error) {
      console.error('Error running calculations:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  // Check if Python API is available
  useEffect(() => {
    const checkPythonAvailability = async () => {
      setIsCheckingPython(true);
      const available = await PythonSimulationClient.isAvailable();
      setIsPythonAvailable(available);
      setIsCheckingPython(false);
    };
    
    checkPythonAvailability();
  }, []);

  // Run calculations when settings change
  useEffect(() => {
    const timer = setTimeout(() => {
      runCalculations();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [fundSettings]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calculator className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold text-primary-900">Institutional-Grade Fund Calculator</h2>
          </div>
          <div className="flex items-center">
            {isCheckingPython ? (
              <div className="flex items-center text-neutral-500">
                <Server className="h-5 w-5 mr-1 animate-pulse" />
                <span className="text-sm">Checking Python API...</span>
              </div>
            ) : isPythonAvailable ? (
              <div className="flex items-center text-green-600">
                <Server className="h-5 w-5 mr-1" />
                <span className="text-sm">Using Python backend</span>
              </div>
            ) : (
              <div className="flex items-center text-amber-600">
                <AlertTriangle className="h-5 w-5 mr-1" />
                <span className="text-sm">Using JavaScript fallback</span>
              </div>
            )}
          </div>
        </div>
        <p className="text-neutral-600">
          This calculator implements the core financial calculations for the Equihome business model.
          Adjust the parameters below to see how they affect the fund performance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <FundSettingsPanel 
            settings={fundSettings} 
            onChange={handleSettingChange}
            errors={errors}
          />
          
          <LoanParametersPanel 
            settings={fundSettings} 
            onChange={handleSettingChange}
            errors={errors}
          />
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-blue-800 mb-1">About This Calculator</h4>
                <p className="text-sm text-blue-700">
                  This calculator focuses on the core financial calculations of the Equihome business model.
                  It uses real calculations with no mock data to properly model financial inputs.
                </p>
                <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
                  <li>3% origination fee charged upfront</li>
                  <li>5% simple interest capitalized to the end of term</li>
                  <li>Appreciation fee equal to the LTV percentage of property appreciation</li>
                  <li>2% management fee on AUM</li>
                  <li>20% performance fee over a 6% hurdle</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {isCalculating ? (
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 flex items-center justify-center h-64">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-neutral-600">Calculating results...</p>
              </div>
            </div>
          ) : (
            <ResultsPanel results={results} isPythonAvailable={isPythonAvailable} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedCalculator;
