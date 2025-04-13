'use client';

import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import React, { type FC } from 'react';

interface FunctionCardProps {
  title: string;
  description: string;
  icon: React.ReactElement<SvgIconProps>;
  buttonText: string;
  onClick: () => void;
}

const FunctionCard:FC<FunctionCardProps> = ({ 
  title, 
  description, 
  icon, 
  buttonText, 
  onClick 
}) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {React.cloneElement(icon, { sx: { mr: 1, color: 'primary.main' } })}
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          variant="contained" 
          startIcon={icon}
          onClick={onClick}
          fullWidth
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
} 

export default FunctionCard;