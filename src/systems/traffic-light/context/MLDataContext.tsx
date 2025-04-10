import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MLModelInfo, MLSystemStatus } from '../api/types';
import { getMLModelInfo, getMLSystemStatus } from '../api/mlApi';

// Define the context shape
interface MLDataContextType {
  modelInfo: MLModelInfo | null;
  systemStatus: MLSystemStatus | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  lastUpdated: Date | null;
}

// Create the context with a default value
const MLDataContext = createContext<MLDataContextType>({
  modelInfo: null,
  systemStatus: null,
  loading: false,
  error: null,
  refreshData: async () => {},
  lastUpdated: null
});

// Custom hook to use the ML data context
export const useMLData = () => useContext(MLDataContext);

interface MLDataProviderProps {
  children: ReactNode;
  refreshInterval?: number; // in milliseconds, default is 5 minutes
}

export const MLDataProvider: React.FC<MLDataProviderProps> = ({ 
  children, 
  refreshInterval = 5 * 60 * 1000 // 5 minutes default
}) => {
  const [modelInfo, setModelInfo] = useState<MLModelInfo | null>(null);
  const [systemStatus, setSystemStatus] = useState<MLSystemStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Function to fetch all ML data
  const fetchMLData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch model info and system status in parallel
      const [modelInfoData, systemStatusData] = await Promise.all([
        getMLModelInfo(),
        getMLSystemStatus()
      ]);
      
      setModelInfo(modelInfoData);
      setSystemStatus(systemStatusData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching ML data:', err);
      setError('Failed to fetch ML data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchMLData();
    
    // Set up interval for periodic refreshes
    const intervalId = setInterval(fetchMLData, refreshInterval);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  // Provide the context value
  const contextValue: MLDataContextType = {
    modelInfo,
    systemStatus,
    loading,
    error,
    refreshData: fetchMLData,
    lastUpdated
  };

  return (
    <MLDataContext.Provider value={contextValue}>
      {children}
    </MLDataContext.Provider>
  );
};

export default MLDataProvider;
