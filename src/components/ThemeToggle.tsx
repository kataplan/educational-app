'use client';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { useThemeContext } from '@/providers/ThemeProvider';

const ThemeToggle: FC = (): React.ReactElement => {
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <Tooltip title={themeMode === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}>
      <IconButton onClick={toggleTheme} color="inherit">
        {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
} 

export default ThemeToggle;