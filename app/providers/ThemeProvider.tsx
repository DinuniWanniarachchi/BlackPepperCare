import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DarkTheme as NavDark, DefaultTheme as NavLight, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { useColorScheme as useSystemColorScheme } from 'react-native';

type ThemeMode = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'bp_theme_pref';

const ThemeContext = createContext<{
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  effective: 'light' | 'dark';
} | null>(null);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const system = useSystemColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');

  // Try dynamic import of AsyncStorage for optional persistence
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (mounted && stored) {
          if (stored === 'light' || stored === 'dark' || stored === 'system') setModeState(stored);
        }
      } catch (e) {
        // AsyncStorage not available, ignore
      }
    })();
    return () => { mounted = false; };
  }, []);

  const setMode = (m: ThemeMode) => {
    setModeState(m);
    (async () => {
      try {
        const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
        await AsyncStorage.setItem(STORAGE_KEY, m);
      } catch (e) {
        // ignore if not available
      }
    })();
  };

  const effective = useMemo(() => {
    if (mode === 'system') return system === 'dark' ? 'dark' : 'light';
    return mode === 'dark' ? 'dark' : 'light';
  }, [mode, system]);

  const navTheme = effective === 'dark' ? NavDark : NavLight;

  return (
    <ThemeContext.Provider value={{ mode, setMode, effective }}>
      <NavThemeProvider value={navTheme}>{children}</NavThemeProvider>
    </ThemeContext.Provider>
  );
};

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within AppThemeProvider');
  return ctx;
}

export default AppThemeProvider;
