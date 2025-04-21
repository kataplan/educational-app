'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { FC, PropsWithChildren, useState, useEffect, createContext, useContext } from 'react';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { lightTheme, darkTheme } from '@/theme/theme';
type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

const ThemeProvider: FC<PropsWithChildren> = ({ children }): React.ReactElement => {
  const [savedTheme, setSavedTheme] = useLocalStorage<ThemeMode>('themeMode', 'light');
  const [themeMode, setThemeMode] = useState<ThemeMode>(savedTheme);

  // Initialize theme based on system preference if no saved theme
  useEffect((): void => {
    if (typeof window !== 'undefined' && !savedTheme) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme: ThemeMode = systemPrefersDark ? 'dark' : 'light';
      setThemeMode(initialTheme);
      setSavedTheme(initialTheme);
    }
  }, [savedTheme, setSavedTheme]);

  const toggleTheme = (): void => {
    const newTheme: ThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    setSavedTheme(newTheme);
  };

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
} 

export { ThemeProvider, useThemeContext };