'use client';

import { Box } from '@mui/material';
import React, { FC, useState } from 'react';

import { useCourses } from '@/providers/CoursesProvider';

import FullDrawer from './FullDrawer';
import MiniDrawer from './MiniDrawer';

const Sidebar: FC = () => {
  const [open, setOpen] = useState(true);
  const { courses } = useCourses();

  return (
    <Box sx={{ display: 'flex' }}>
      {open ? (
        <FullDrawer
          courses={courses}
          open={open}
          onClose={() => setOpen(false)}
        />
      ) : (
        <MiniDrawer
          courses={courses}
          onOpen={() => setOpen(true)}
        />
      )}
    </Box>
  );
};

export default Sidebar;
