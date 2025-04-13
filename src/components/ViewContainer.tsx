'use client';

import { Box } from '@mui/material';
import type { ReactNode } from "react";

interface ViewContainerProps {
  children: ReactNode;
}

export default function ViewContainer({ children }: ViewContainerProps): React.ReactElement {
  
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