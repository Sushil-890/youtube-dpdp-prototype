import React, { createContext, useContext, useState } from 'react';

export interface PrivacySettings {
  watchHistory: boolean;
  searchHistory: boolean;
  personalizedAds: boolean;
  location: boolean;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  timestamp: string;
  details: string;
}

export type AgeGroup = 'adult' | 'minor' | null;

interface PrivacyContextType {
  settings: PrivacySettings;
  pendingSettings: PrivacySettings;
  setPendingSettings: (s: PrivacySettings) => void;
  hasConsented: boolean;
  auditLogs: AuditLogEntry[];
  ageGroup: AgeGroup;
  setAgeGroup: (a: AgeGroup) => void;
  parentVerified: boolean;
  setParentVerified: (v: boolean) => void;
  updateSettings: (newSettings: Partial<PrivacySettings>) => void;
  acceptAllSettings: () => void;
  deleteData: (type: 'watch' | 'search' | 'google') => Promise<void>;
  downloadData: () => Promise<string>;
  addAuditLog: (action: string, details: string) => void;
  resetAll: () => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

const defaultSettings: PrivacySettings = {
  watchHistory: true,
  searchHistory: true,
  personalizedAds: true,
  location: true,
};

const minorSettings: PrivacySettings = {
  watchHistory: true,
  searchHistory: true,
  personalizedAds: false,
  location: false,
};

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export const PrivacyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<PrivacySettings>(() => {
    const saved = localStorage.getItem('yt_dpdp_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // pendingSettings holds the in-progress choices before the user hits "Confirm & Save"
  const [pendingSettings, setPendingSettingsState] = useState<PrivacySettings>(() => {
    const saved = localStorage.getItem('yt_dpdp_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const setPendingSettings = (s: PrivacySettings) => setPendingSettingsState(s);

  const [hasConsented, setHasConsented] = useState<boolean>(() => {
    const saved = localStorage.getItem('yt_dpdp_consented');
    return saved ? JSON.parse(saved) : false;
  });

  const [ageGroup, setAgeGroupState] = useState<AgeGroup>(() => {
    return (localStorage.getItem('yt_dpdp_age') as AgeGroup) || null;
  });

  const setAgeGroup = (a: AgeGroup) => {
    setAgeGroupState(a);
    if (a) localStorage.setItem('yt_dpdp_age', a);
    // Auto-apply minor restrictions
    if (a === 'minor') {
      setSettings(minorSettings);
      setPendingSettingsState(minorSettings);
      localStorage.setItem('yt_dpdp_settings', JSON.stringify(minorSettings));
    }
  };

  const [parentVerified, setParentVerifiedState] = useState<boolean>(() => {
    return localStorage.getItem('yt_dpdp_parent_verified') === 'true';
  });

  const setParentVerified = (v: boolean) => {
    setParentVerifiedState(v);
    localStorage.setItem('yt_dpdp_parent_verified', String(v));
  };

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('yt_dpdp_audit_logs');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'initial',
            action: 'Account Created',
            timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
            details: 'Default privacy settings applied per India DPDP Act 2023.',
          },
        ];
  });

  const [language, setLanguageState] = useState<'en' | 'hi'>(() => {
    return (localStorage.getItem('yt_dpdp_lang') as 'en' | 'hi') || 'en';
  });

  const setLanguage = (lang: 'en' | 'hi') => {
    setLanguageState(lang);
    localStorage.setItem('yt_dpdp_lang', lang);
  };

  const addAuditLog = (action: string, details: string) => {
    const newEntry: AuditLogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      action,
      timestamp: new Date().toLocaleString('en-IN'),
      details,
    };
    setAuditLogs(prev => {
      const updated = [newEntry, ...prev];
      localStorage.setItem('yt_dpdp_audit_logs', JSON.stringify(updated));
      return updated;
    });
  };

  const updateSettings = (newSettings: Partial<PrivacySettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('yt_dpdp_settings', JSON.stringify(updated));
      const nameMap: Record<keyof PrivacySettings, string> = {
        watchHistory: 'Watch History',
        searchHistory: 'Search History',
        personalizedAds: 'Personalized Ads',
        location: 'Location Services',
      };
      Object.keys(newSettings).forEach(key => {
        const field = key as keyof PrivacySettings;
        if (newSettings[field] !== prev[field]) {
          const action = newSettings[field] ? 'Consent Granted' : 'Consent Withdrawn';
          addAuditLog(action, `${nameMap[field]} updated by the user.`);
        }
      });
      return updated;
    });
    setHasConsented(true);
    localStorage.setItem('yt_dpdp_consented', JSON.stringify(true));
  };

  const acceptAllSettings = () => {
    const updated = { watchHistory: true, searchHistory: true, personalizedAds: true, location: true };
    setSettings(updated);
    setPendingSettingsState(updated);
    localStorage.setItem('yt_dpdp_settings', JSON.stringify(updated));
    setHasConsented(true);
    localStorage.setItem('yt_dpdp_consented', JSON.stringify(true));
    addAuditLog('Consent Granted (All)', 'User accepted all data collection categories.');
  };

  const deleteData = async (type: 'watch' | 'search' | 'google') => {
    await new Promise(resolve => setTimeout(resolve, 900));
    if (type === 'watch') {
      addAuditLog('Watch History Deleted', 'All watch history permanently deleted (DPDP Sec 12).');
    } else if (type === 'search') {
      addAuditLog('Search History Deleted', 'All search history permanently deleted (DPDP Sec 12).');
    } else {
      addAuditLog('All Google Data Deleted', 'All personal data queued for permanent deletion.');
      const off = { watchHistory: false, searchHistory: false, personalizedAds: false, location: false };
      setSettings(off);
      setPendingSettingsState(off);
      localStorage.setItem('yt_dpdp_settings', JSON.stringify(off));
    }
  };

  const downloadData = async (): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const exportData = {
      compliance: 'India DPDP Act 2023 – Right to Access (Sec 11)',
      timestamp: new Date().toLocaleString('en-IN'),
      jurisdiction: 'Republic of India',
      dataFiduciary: 'Google India Pvt. Ltd.',
      consentedCategories: settings,
      auditTrail: auditLogs,
    };
    addAuditLog('Data Exported', 'User downloaded personal data summary (DPDP Sec 11).');
    return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportData, null, 2))}`;
  };

  const resetAll = () => {
    setSettings(defaultSettings);
    setPendingSettingsState(defaultSettings);
    localStorage.setItem('yt_dpdp_settings', JSON.stringify(defaultSettings));
    setHasConsented(false);
    localStorage.setItem('yt_dpdp_consented', JSON.stringify(false));
    setAgeGroupState(null);
    localStorage.removeItem('yt_dpdp_age');
    setParentVerifiedState(false);
    localStorage.removeItem('yt_dpdp_parent_verified');
    const freshLogs = [
      {
        id: 'reset',
        action: 'Settings Reset',
        timestamp: new Date().toLocaleString('en-IN'),
        details: 'All settings reset to default.',
      },
    ];
    setAuditLogs(freshLogs);
    localStorage.setItem('yt_dpdp_audit_logs', JSON.stringify(freshLogs));
  };

  return (
    <PrivacyContext.Provider
      value={{
        settings,
        pendingSettings,
        setPendingSettings,
        hasConsented,
        auditLogs,
        ageGroup,
        setAgeGroup,
        parentVerified,
        setParentVerified,
        updateSettings,
        acceptAllSettings,
        deleteData,
        downloadData,
        addAuditLog,
        resetAll,
        language,
        setLanguage,
      }}
    >
      {children}
    </PrivacyContext.Provider>
  );
};

export const usePrivacy = () => {
  const context = useContext(PrivacyContext);
  if (context === undefined) throw new Error('usePrivacy must be used within a PrivacyProvider');
  return context;
};
