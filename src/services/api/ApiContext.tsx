import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { ApiError, ApiErrorType } from './apiClient';

// Define the API context type
interface ApiContextType {
  api: typeof api;
  loading: boolean;
  error: ApiError | null;
  clearError: () => void;
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// Create the API context
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// API provider component
export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);

  // Clear error
  const clearError = () => setError(null);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.auth.login(email, password);
      setIsAuthenticated(true);
      await refreshUser();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError('Unknown error', ApiErrorType.UNKNOWN_ERROR));
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await api.auth.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError('Unknown error', ApiErrorType.UNKNOWN_ERROR));
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh user function
  const refreshUser = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = await api.auth.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(!!userData);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError('Unknown error', ApiErrorType.UNKNOWN_ERROR));
      }
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    refreshUser();
  }, []);

  // Context value
  const contextValue: ApiContextType = {
    api,
    loading,
    error,
    clearError,
    isAuthenticated,
    user,
    login,
    logout,
    refreshUser
  };

  return (
    <ApiContext.Provider value={contextValue}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the API context
export const useApi = () => {
  const context = useContext(ApiContext);
  
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  
  return context;
};

export default ApiContext;
