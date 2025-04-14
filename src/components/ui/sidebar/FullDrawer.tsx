'use client';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SchoolIcon from '@mui/icons-material/School';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
}

interface FullDrawerProps {
  courses: Course[];
  open: boolean;
  onClose: () => void;
  }

const DRAWER_WIDTH = 240;

const FullDrawer:FC<FullDrawerProps> = ({ courses, open, onClose }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCourseClick = (courseId: string): void => {
    router.push(`/courses/${courseId}`);
    if (isMobile) {
      onClose();
    }
  };
  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          top: '64px',
          height: 'calc(100% - 64px)',
        },
      }}
    >

      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1 }}>
        <Typography
          variant="h6"
          sx={{ px: 2, py: 1, color: 'text.secondary' }}
        >
          Mis Cursos
        </Typography>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
        </Stack>
        <List>
          {courses.map((course) => (
            <ListItem key={course.id} disablePadding>
              <ListItemButton onClick={() => handleCourseClick(course.id)}>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText
                  primary={course.title}
                  secondary={course.description}
                  primaryTypographyProps={{
                    noWrap: true,
                  }}
                  secondaryTypographyProps={{
                    noWrap: true,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
} 

export default FullDrawer;