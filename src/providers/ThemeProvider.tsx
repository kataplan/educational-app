'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { FC, PropsWithChildren, useState, useEffect, createContext, useContext } from 'react';

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


const getThemeMode = (): ThemeMode => {
  const savedTheme = localStorage.getItem('themeMode') as ThemeMode;

  if (savedTheme) {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

}
const ThemeProvider: FC<PropsWithChildren> = ({ children }): React.ReactElement => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getThemeMode());

  // Guardar preferencia de tema en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const toggleTheme = (): void => {
    setThemeMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
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