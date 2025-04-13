import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../services/api/ApiContext';

// Security settings interface
export interface SecuritySettings {
  authentication: {
    mfaEnabled: boolean;
    mfaMethod: 'app' | 'sms' | 'email';
    sessionTimeout: number;
    rememberMeEnabled: boolean;
    rememberMeDuration: number;
  };
  passwords: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    expiryDays: number;
    preventReuse: number;
  };
  access: {
    ipRestrictions: boolean;
    allowedIps: string[];
    loginAttempts: number;
    lockoutDuration: number;
  };
  compliance: {
    dataRetention: number;
    auditLogRetention: number;
    gdprCompliant: boolean;
    hipaaCompliant: boolean;
    pciDssCompliant: boolean;
  };
}

// Login history entry interface
export interface LoginHistoryEntry {
  id: string;
  timestamp: string;
  ipAddress: string;
  location: string;
  device: string;
  status: 'Success' | 'Failed';
}

// Compliance report interface
export interface ComplianceReport {
  id: string;
  title: string;
  type: string;
  frequency: string;
  lastSubmitted: string;
  nextDue: string;
  status: string;
  url: string;
}

// Hook for security management
export const useSecurity = () => {
  const { api, loading: apiLoading, error: apiError } = useApi();
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings | null>(null);
  const [loginHistory, setLoginHistory] = useState<LoginHistoryEntry[]>([]);
  const [complianceReports, setComplianceReports] = useState<ComplianceReport[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch security settings
  const fetchSecuritySettings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.security.getSecuritySettings();

      // Handle the new response format with status, data, and meta fields
      const data = response.status === 'success' ? response.data : response;
      setSecuritySettings(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch security settings'));
    } finally {
      setLoading(false);
    }
  }, [api.security]);

  // Update security settings
  const updateSecuritySettings = useCallback(async (updates: Partial<SecuritySettings>) => {
    setLoading(true);
    setError(null);

    try {
      await api.security.updateSecuritySettings(updates);

      setSecuritySettings(prevSettings => {
        if (!prevSettings) return null;

        return {
          ...prevSettings,
          ...updates
        };
      });

      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update security settings'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api.security]);

  // Fetch login history
  const fetchLoginHistory = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.security.getLoginHistory();

      // Handle the new response format with status, data, and meta fields
      const data = response.status === 'success' ? response.data : response;
      setLoginHistory(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch login history'));
    } finally {
      setLoading(false);
    }
  }, [api.security]);

  // Fetch compliance reports
  const fetchComplianceReports = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.security.getComplianceReports();

      // Handle the new response format with status, data, and meta fields
      const data = response.status === 'success' ? response.data : response;
      setComplianceReports(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch compliance reports'));
    } finally {
      setLoading(false);
    }
  }, [api.security]);

  // Enable MFA
  const enableMfa = useCallback(async (method: 'app' | 'sms' | 'email') => {
    setLoading(true);
    setError(null);

    try {
      await updateSecuritySettings({
        authentication: {
          ...securitySettings?.authentication!,
          mfaEnabled: true,
          mfaMethod: method
        }
      });

      // In a real implementation, this would trigger MFA setup
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to enable MFA'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [securitySettings, updateSecuritySettings]);

  // Disable MFA
  const disableMfa = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await updateSecuritySettings({
        authentication: {
          ...securitySettings?.authentication!,
          mfaEnabled: false
        }
      });

      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to disable MFA'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [securitySettings, updateSecuritySettings]);

  // Update password settings
  const updatePasswordSettings = useCallback(async (updates: Partial<SecuritySettings['passwords']>) => {
    setLoading(true);
    setError(null);

    try {
      await updateSecuritySettings({
        passwords: {
          ...securitySettings?.passwords!,
          ...updates
        }
      });

      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update password settings'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [securitySettings, updateSecuritySettings]);

  // Update access settings
  const updateAccessSettings = useCallback(async (updates: Partial<SecuritySettings['access']>) => {
    setLoading(true);
    setError(null);

    try {
      await updateSecuritySettings({
        access: {
          ...securitySettings?.access!,
          ...updates
        }
      });

      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update access settings'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [securitySettings, updateSecuritySettings]);

  // Update compliance settings
  const updateComplianceSettings = useCallback(async (updates: Partial<SecuritySettings['compliance']>) => {
    setLoading(true);
    setError(null);

    try {
      await updateSecuritySettings({
        compliance: {
          ...securitySettings?.compliance!,
          ...updates
        }
      });

      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update compliance settings'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [securitySettings, updateSecuritySettings]);

  // Download compliance report
  const downloadComplianceReport = useCallback((report: ComplianceReport) => {
    // In a real implementation, this would trigger a download
    window.open(report.url, '_blank');
  }, []);

  // Fetch security data on mount
  useEffect(() => {
    fetchSecuritySettings();
    fetchLoginHistory();
    fetchComplianceReports();
  }, [fetchSecuritySettings, fetchLoginHistory, fetchComplianceReports]);

  return {
    securitySettings,
    loginHistory,
    complianceReports,
    loading: loading || apiLoading,
    error: error || apiError,
    fetchSecuritySettings,
    updateSecuritySettings,
    fetchLoginHistory,
    fetchComplianceReports,
    enableMfa,
    disableMfa,
    updatePasswordSettings,
    updateAccessSettings,
    updateComplianceSettings,
    downloadComplianceReport
  };
};

export default useSecurity;
