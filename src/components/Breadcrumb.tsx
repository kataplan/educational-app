'use client';

import { 
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { 
  Breadcrumbs, 
  Link, 
  Typography, 
  Box,
  useTheme
} from '@mui/material';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react';

import { mockCourses } from '@/mocks/mockData';


// Mapeo de rutas a nombres legibles
const routeNames: Record<string, string> = {
  'courses': 'Cursos',
  'materials': 'Materiales',
  'add': 'Agregar',
  'tests': 'Pruebas',
  'create': 'Crear',
  'units': 'Unidad',
};

const Breadcrumb: FC = (): React.ReactElement => {
  const pathname = usePathname();
  const theme = useTheme();
  
  // Dividir la ruta en segmentos
  const segments = pathname.split('/').filter(Boolean);
  
  // Construir las rutas acumulativas
  const breadcrumbs = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;
    
    // Obtener el nombre legible para el segmento
    let name = routeNames[segment] || segment;
    
    // Si es un ID de curso, buscar el título del curso
    if (segment.match(/^[0-9a-f]+$/) && segments[index - 1] === 'courses') {
      const course = mockCourses.find(c => c.id === segment);
      if (course) {
        name = course.title;
      }
    }
    
    return {
      path,
      name,
      isLast
    };
  });
  
  // Si no hay segmentos, mostrar solo el inicio
  if (breadcrumbs.length === 0) {
    return (
      <Box sx={{ py: 2 }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link 
            href="/" 
            color="inherit" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: theme.palette.primary.main,
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Inicio
          </Link>
        </Breadcrumbs>
      </Box>
    );
  }
  
  return (
    <Box sx={{ py: 2 }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link 
          href="/" 
          color="inherit" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: theme.palette.primary.main,
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Inicio
        </Link>
        
        {breadcrumbs.map((breadcrumb) => (
          breadcrumb.isLast ? (
            <Typography 
              key={breadcrumb.path} 
              color="text.primary"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {breadcrumb.name}
            </Typography>
          ) : (
            <Link
              key={breadcrumb.path}
              href={breadcrumb.path}
              color="inherit"
              sx={{ 
                color: theme.palette.primary.main,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              {breadcrumb.name}
            </Link>
          )
        ))}
      </Breadcrumbs>
    </Box>
  );
} 

export default Breadcrumb;