import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../services/api/ApiContext';

// User preferences interface
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  notifications: {
    email: boolean;
    inApp: boolean;
    sms: boolean;
    emailFrequency: 'immediate' | 'daily' | 'weekly';
  };
  dashboard: {
    defaultView: string;
    widgets: string[];
    widgetLayout: Record<string, { x: number; y: number; w: number; h: number }>;
  };
  portfolio: {
    defaultTab: string;
    defaultTimeframe: string;
    favoriteSuburbs: string[];
    chartColors: 'default' | 'colorblind' | 'monochrome';
  };
  security: {
    mfaEnabled: boolean;
    mfaMethod: 'app' | 'sms' | 'email';
    sessionTimeout: number;
    rememberMe: boolean;
  };
}

// Hook for user preferences management
export const usePreferences = () => {
  const { api, loading: apiLoading, error: apiError } = useApi();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch user preferences
  const fetchPreferences = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.preferences.getUserPreferences();

      // Handle the new response format with status, data, and meta fields
      const data = response.status === 'success' ? response.data : response;
      setPreferences(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch user preferences'));
    } finally {
      setLoading(false);
    }
  }, [api.preferences]);

  // Update user preferences
  const updatePreferences = useCallback(async (updates: Partial<UserPreferences>) => {
    setLoading(true);
    setError(null);

    try {
      await api.preferences.updateUserPreferences(updates);

      setPreferences(prevPreferences => {
        if (!prevPreferences) return null;

        return {
          ...prevPreferences,
          ...updates
        };
      });

      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update user preferences'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api.preferences]);

  // Update theme
  const updateTheme = useCallback(async (theme: UserPreferences['theme']) => {
    return updatePreferences({ theme });
  }, [updatePreferences]);

  // Update language
  const updateLanguage = useCallback(async (language: string) => {
    return updatePreferences({ language });
  }, [updatePreferences]);

  // Update timezone
  const updateTimezone = useCallback(async (timezone: string) => {
    return updatePreferences({ timezone });
  }, [updatePreferences]);

  // Update date and time formats
  const updateDateTimeFormats = useCallback(async (dateFormat: string, timeFormat: UserPreferences['timeFormat']) => {
    return updatePreferences({ dateFormat, timeFormat });
  }, [updatePreferences]);

  // Update notification settings
  const updateNotificationSettings = useCallback(async (settings: Partial<UserPreferences['notifications']>) => {
    return updatePreferences({
      notifications: {
        ...preferences?.notifications!,
        ...settings
      }
    });
  }, [preferences, updatePreferences]);

  // Update dashboard settings
  const updateDashboardSettings = useCallback(async (settings: Partial<UserPreferences['dashboard']>) => {
    return updatePreferences({
      dashboard: {
        ...preferences?.dashboard!,
        ...settings
      }
    });
  }, [preferences, updatePreferences]);

  // Update portfolio settings
  const updatePortfolioSettings = useCallback(async (settings: Partial<UserPreferences['portfolio']>) => {
    return updatePreferences({
      portfolio: {
        ...preferences?.portfolio!,
        ...settings
      }
    });
  }, [preferences, updatePreferences]);

  // Update security settings
  const updateSecuritySettings = useCallback(async (settings: Partial<UserPreferences['security']>) => {
    return updatePreferences({
      security: {
        ...preferences?.security!,
        ...settings
      }
    });
  }, [preferences, updatePreferences]);

  // Reset preferences to defaults
  const resetPreferences = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Default preferences
      const defaultPreferences: UserPreferences = {
        theme: 'light',
        language: 'en-AU',
        timezone: 'Australia/Sydney',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        notifications: {
          email: true,
          inApp: true,
          sms: false,
          emailFrequency: 'immediate'
        },
        dashboard: {
          defaultView: 'overview',
          widgets: [
            'portfolio-summary',
            'recent-activity',
            'pending-tasks',
            'upcoming-events'
          ],
          widgetLayout: {
            'portfolio-summary': { x: 0, y: 0, w: 12, h: 2 },
            'recent-activity': { x: 0, y: 2, w: 6, h: 4 },
            'pending-tasks': { x: 6, y: 2, w: 6, h: 4 },
            'upcoming-events': { x: 0, y: 6, w: 12, h: 2 }
          }
        },
        portfolio: {
          defaultTab: 'dashboard',
          defaultTimeframe: '1y',
          favoriteSuburbs: [],
          chartColors: 'default'
        },
        security: {
          mfaEnabled: false,
          mfaMethod: 'app',
          sessionTimeout: 30,
          rememberMe: true
        }
      };

      await api.preferences.updateUserPreferences(defaultPreferences);
      setPreferences(defaultPreferences);

      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to reset preferences'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api.preferences]);

  // Fetch preferences on mount
  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  return {
    preferences,
    loading: loading || apiLoading,
    error: error || apiError,
    fetchPreferences,
    updatePreferences,
    updateTheme,
    updateLanguage,
    updateTimezone,
    updateDateTimeFormats,
    updateNotificationSettings,
    updateDashboardSettings,
    updatePortfolioSettings,
    updateSecuritySettings,
    resetPreferences
  };
};

export default usePreferences;
