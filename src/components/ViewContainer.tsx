'use client';

import { Box } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';


const ViewContainer: FC<PropsWithChildren> = ({ children }): React.ReactElement => {
  
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
} 

export default ViewContainer;