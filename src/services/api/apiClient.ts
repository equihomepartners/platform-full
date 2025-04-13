/**
 * API Client for Equihome Platform
 *
 * This client handles all API requests with automatic fallback to mock data.
 * It provides a consistent interface for all API calls across the platform.
 */

import { createClient } from '@supabase/supabase-js';
import { mockPortfolioData } from '../../systems/portfolio/data/mockData';
import { mockUserData } from '../data/mockUserData';
import { mockSystemData } from '../data/mockSystemData';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eyycsgfueefgdtqujwam.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eWNzZ2Z1ZWVmZ2R0cXVqd2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDUzNTUsImV4cCI6MjA1OTg4MTM1NX0.j795Be2iRyTmBwn-5g_bPPgVmppwnjTko_KWKAUyMhk';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration
const API_CONFIG = {
  useMockData: process.env.NODE_ENV === 'production' ? false : true, // Use real API in production, mock in development
  apiBaseUrl: process.env.NODE_ENV === 'production' ? 'https://api.equihome.com/v1' : 'http://localhost:3000/api/v1',
  timeout: 10000, // 10 seconds timeout
  retryAttempts: 3,
  retryDelay: 1000, // 1 second between retries
};

// Error types
export enum ApiErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// API Error class
export class ApiError extends Error {
  type: ApiErrorType;
  status?: number;
  data?: any;

  constructor(message: string, type: ApiErrorType, status?: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.status = status;
    this.data = data;
  }
}

// Generic API request function with retry logic and mock data fallback
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  mockData?: T,
  skipMockFallback = false
): Promise<T> {
  // If using mock data and mock data is provided, return it immediately
  if (API_CONFIG.useMockData && mockData && !skipMockFallback) {
    console.log(`[API] Using mock data for ${endpoint}`);
    // Add a small delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData;
  }

  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add authentication token if available
  const session = await supabase.auth.getSession();
  if (session?.data?.session?.access_token) {
    headers['Authorization'] = `Bearer ${session.data.session.access_token}`;
  }

  // Prepare request options
  const requestOptions: RequestInit = {
    ...options,
    headers,
  };

  // Retry logic
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < API_CONFIG.retryAttempts; attempt++) {
    try {
      // Add timeout using AbortController
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

      requestOptions.signal = controller.signal;

      // Make the request
      const response = await fetch(`${API_CONFIG.apiBaseUrl}${endpoint}`, requestOptions);
      clearTimeout(timeoutId);

      // Handle HTTP errors
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: 'Unknown error' };
        }

        let errorType: ApiErrorType;
        switch (response.status) {
          case 401:
          case 403:
            errorType = ApiErrorType.AUTH_ERROR;
            break;
          case 404:
            errorType = ApiErrorType.NOT_FOUND;
            break;
          case 422:
            errorType = ApiErrorType.VALIDATION_ERROR;
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            errorType = ApiErrorType.SERVER_ERROR;
            break;
          default:
            errorType = ApiErrorType.UNKNOWN_ERROR;
        }

        throw new ApiError(
          errorData.message || `HTTP error ${response.status}`,
          errorType,
          response.status,
          errorData
        );
      }

      // Parse response
      const data = await response.json();
      return data as T;
    } catch (error: any) {
      lastError = error;

      // Don't retry if it's a client error (4xx)
      if (error instanceof ApiError && error.status && error.status >= 400 && error.status < 500) {
        break;
      }

      // Don't retry if it's an abort error (timeout)
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', ApiErrorType.TIMEOUT_ERROR);
      }

      // Wait before retrying
      if (attempt < API_CONFIG.retryAttempts - 1) {
        await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay));
      }
    }
  }

  // If we've exhausted all retry attempts and still have an error
  if (lastError) {
    // If mock data is available and we're not explicitly skipping fallback, use it
    if (mockData !== undefined && !skipMockFallback) {
      console.warn(`[API] Failed to fetch ${endpoint}, falling back to mock data`);
      return mockData;
    }

    // If it's already an ApiError, rethrow it
    if (lastError instanceof ApiError) {
      throw lastError;
    }

    // Otherwise, wrap it in an ApiError
    throw new ApiError(
      lastError.message || 'Network error',
      ApiErrorType.NETWORK_ERROR
    );
  }

  // This should never happen, but TypeScript requires a return statement
  throw new ApiError('Unknown error', ApiErrorType.UNKNOWN_ERROR);
}

// API endpoints
export const api = {
  // User and authentication
  auth: {
    login: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new ApiError(error.message, ApiErrorType.AUTH_ERROR);
      }

      return data;
    },

    logout: async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new ApiError(error.message, ApiErrorType.AUTH_ERROR);
      }

      return true;
    },

    getCurrentUser: async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        if (API_CONFIG.useMockData) {
          return mockUserData.currentUser;
        }
        throw new ApiError(error.message, ApiErrorType.AUTH_ERROR);
      }

      return data.user;
    },

    updateProfile: async (profile: any) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', profile.id);

      if (error) {
        throw new ApiError(error.message, ApiErrorType.UNKNOWN_ERROR);
      }

      return data;
    },
  },

  // Dashboard
  dashboard: {
    getRecentActivities: async () => {
      return apiRequest<any[]>(
        '/api/v1/dashboard/activities',
        { method: 'GET' },
        mockSystemData.recentActivities
      );
    },

    getPendingTasks: async () => {
      return apiRequest<any[]>(
        '/api/v1/dashboard/tasks',
        { method: 'GET' },
        mockSystemData.pendingTasks
      );
    },

    getSystemAlerts: async () => {
      return apiRequest<any[]>(
        '/api/v1/dashboard/alerts',
        { method: 'GET' },
        mockSystemData.systemAlerts
      );
    },

    getUpcomingEvents: async () => {
      return apiRequest<any[]>(
        '/api/v1/dashboard/events',
        { method: 'GET' },
        mockSystemData.upcomingEvents
      );
    },

    getDocumentation: async () => {
      return apiRequest<any[]>(
        '/api/v1/dashboard/documentation',
        { method: 'GET' },
        mockSystemData.documentation
      );
    },
  },

  // Portfolio Management
  portfolio: {
    getSummary: async () => {
      return apiRequest<any>(
        '/api/v1/portfolio/summary',
        { method: 'GET' },
        {
          status: "success",
          data: mockPortfolioData.portfolioSummary,
          meta: {
            timestamp: new Date().toISOString(),
            version: "1.0"
          }
        }
      );
    },

    getPerformanceMetrics: async () => {
      return apiRequest<any>(
        '/portfolio/performance',
        { method: 'GET' },
        mockPortfolioData.performanceMetrics
      );
    },

    getRiskMetrics: async () => {
      return apiRequest<any>(
        '/portfolio/risk',
        { method: 'GET' },
        mockPortfolioData.riskMetrics
      );
    },

    getAllocationData: async () => {
      return apiRequest<any>(
        '/portfolio/allocation',
        { method: 'GET' },
        mockPortfolioData.allocationData
      );
    },

    getCashFlowProjections: async () => {
      return apiRequest<any[]>(
        '/portfolio/cashflow',
        { method: 'GET' },
        mockPortfolioData.cashFlowProjections
      );
    },

    getLoans: async () => {
      return apiRequest<any[]>(
        '/portfolio/loans',
        { method: 'GET' },
        mockPortfolioData.loans
      );
    },

    getFundParameters: async () => {
      return apiRequest<any[]>(
        '/portfolio/fund-parameters',
        { method: 'GET' },
        mockPortfolioData.mockFundParameters
      );
    },

    updateFundParameter: async (id: string, value: number) => {
      return apiRequest<any>(
        `/portfolio/fund-parameters/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ value }),
        },
        { success: true, id, value }
      );
    },

    runSimulation: async (parameters: any) => {
      return apiRequest<any>(
        '/portfolio/simulation',
        {
          method: 'POST',
          body: JSON.stringify(parameters),
        },
        mockPortfolioData.mockSimulationResults
      );
    },
  },

  // Admin
  admin: {
    getUsers: async () => {
      return apiRequest<any[]>(
        '/admin/users',
        { method: 'GET' },
        mockSystemData.users
      );
    },

    updateUser: async (id: string, userData: any) => {
      return apiRequest<any>(
        `/admin/users/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(userData),
        },
        { success: true, id, ...userData }
      );
    },

    getAuditLogs: async (filters: any = {}) => {
      return apiRequest<any[]>(
        '/admin/audit-logs',
        {
          method: 'GET',
          body: JSON.stringify(filters),
        },
        mockSystemData.auditLogs
      );
    },

    getSystemSettings: async () => {
      return apiRequest<any>(
        '/admin/settings',
        { method: 'GET' },
        mockSystemData.systemSettings
      );
    },

    updateSystemSettings: async (settings: any) => {
      return apiRequest<any>(
        '/admin/settings',
        {
          method: 'PATCH',
          body: JSON.stringify(settings),
        },
        { success: true, ...settings }
      );
    },

    getApiKeys: async () => {
      return apiRequest<any[]>(
        '/admin/api-keys',
        { method: 'GET' },
        mockSystemData.apiKeys
      );
    },

    createApiKey: async (name: string, permissions: string[]) => {
      return apiRequest<any>(
        '/admin/api-keys',
        {
          method: 'POST',
          body: JSON.stringify({ name, permissions }),
        },
        {
          id: `key_${Date.now()}`,
          name,
          permissions,
          key: `sk_${Math.random().toString(36).substring(2, 15)}`,
          created: new Date().toISOString(),
        }
      );
    },

    revokeApiKey: async (id: string) => {
      return apiRequest<any>(
        `/admin/api-keys/${id}`,
        { method: 'DELETE' },
        { success: true, id }
      );
    },
  },

  // Security
  security: {
    getSecuritySettings: async () => {
      return apiRequest<any>(
        '/security/settings',
        { method: 'GET' },
        mockSystemData.securitySettings
      );
    },

    updateSecuritySettings: async (settings: any) => {
      return apiRequest<any>(
        '/security/settings',
        {
          method: 'PATCH',
          body: JSON.stringify(settings),
        },
        { success: true, ...settings }
      );
    },

    getLoginHistory: async () => {
      return apiRequest<any[]>(
        '/security/login-history',
        { method: 'GET' },
        mockSystemData.loginHistory
      );
    },

    getComplianceReports: async () => {
      return apiRequest<any[]>(
        '/security/compliance',
        { method: 'GET' },
        mockSystemData.complianceReports
      );
    },
  },

  // Preferences
  preferences: {
    getUserPreferences: async () => {
      return apiRequest<any>(
        '/preferences',
        { method: 'GET' },
        mockUserData.preferences
      );
    },

    updateUserPreferences: async (preferences: any) => {
      return apiRequest<any>(
        '/preferences',
        {
          method: 'PATCH',
          body: JSON.stringify(preferences),
        },
        { success: true, ...preferences }
      );
    },
  },

  // Calendar
  calendar: {
    getEvents: async (start: string, end: string) => {
      return apiRequest<any[]>(
        `/calendar/events?start=${start}&end=${end}`,
        { method: 'GET' },
        mockSystemData.calendarEvents
      );
    },

    createEvent: async (event: any) => {
      return apiRequest<any>(
        '/calendar/events',
        {
          method: 'POST',
          body: JSON.stringify(event),
        },
        {
          id: `event_${Date.now()}`,
          ...event,
          created: new Date().toISOString(),
        }
      );
    },

    updateEvent: async (id: string, event: any) => {
      return apiRequest<any>(
        `/calendar/events/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(event),
        },
        { success: true, id, ...event }
      );
    },

    deleteEvent: async (id: string) => {
      return apiRequest<any>(
        `/calendar/events/${id}`,
        { method: 'DELETE' },
        { success: true, id }
      );
    },
  },

  // Reports
  reports: {
    getAvailableReports: async () => {
      return apiRequest<any[]>(
        '/reports',
        { method: 'GET' },
        mockSystemData.availableReports
      );
    },

    generateReport: async (reportId: string, parameters: any) => {
      return apiRequest<any>(
        `/reports/${reportId}/generate`,
        {
          method: 'POST',
          body: JSON.stringify(parameters),
        },
        {
          id: `report_${Date.now()}`,
          reportId,
          parameters,
          url: `https://reports.equihome.com/reports/${reportId}_${Date.now()}.pdf`,
          created: new Date().toISOString(),
        }
      );
    },

    getReportHistory: async () => {
      return apiRequest<any[]>(
        '/reports/history',
        { method: 'GET' },
        mockSystemData.reportHistory
      );
    },
  },

  // Documents
  documents: {
    getDocuments: async (filters: any = {}) => {
      return apiRequest<any[]>(
        '/documents',
        {
          method: 'GET',
          body: JSON.stringify(filters),
        },
        mockSystemData.documents
      );
    },

    uploadDocument: async (document: any) => {
      // In a real implementation, this would use FormData for file upload
      return apiRequest<any>(
        '/documents',
        {
          method: 'POST',
          body: JSON.stringify(document),
        },
        {
          id: `doc_${Date.now()}`,
          ...document,
          uploaded: new Date().toISOString(),
        }
      );
    },

    updateDocument: async (id: string, document: any) => {
      return apiRequest<any>(
        `/documents/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(document),
        },
        { success: true, id, ...document }
      );
    },

    deleteDocument: async (id: string) => {
      return apiRequest<any>(
        `/documents/${id}`,
        { method: 'DELETE' },
        { success: true, id }
      );
    },
  },
};

export default api;
