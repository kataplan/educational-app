'use client';

import { AppBar, Toolbar as MuiToolbar, Typography } from '@mui/material';
import React from 'react';

import ThemeToggle from '@/components/ThemeToggle';

const Toolbar: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ borderRadius: '0px 0px 10px 10px' }}>
      <MuiToolbar sx={{ borderRadius: '0px 0px 10px 10px' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Educational App
        </Typography>
        <ThemeToggle />
      </MuiToolbar>
    </AppBar>
  );
};

export default Toolbar; 