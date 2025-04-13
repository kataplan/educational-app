'use client';

import {
  School as SchoolIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
}

interface MiniDrawerProps {
  courses: Course[];
  onOpen: () => void;
}

const MiniDrawer:FC<MiniDrawerProps> = ({ courses, onOpen }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawer = (
    <Box sx={{ width: 65 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <IconButton onClick={onOpen}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <List>
        {courses.map((course) => (
          <ListItem key={course.id} disablePadding>
            <ListItemButton
              onClick={() => router.push(`/courses/${course.id}`)}
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                <SchoolIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: 65 },
        flexShrink: { sm: 0 },
      }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={true}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 65,
              borderRight: '1px solid',
              borderColor: 'divider',
              top: '64px',
              height: 'calc(100% - 64px)',
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 65,
              borderRight: '1px solid',
              borderColor: 'divider',
              top: '64px',
              height: 'calc(100% - 64px)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
} 

export default MiniDrawer;