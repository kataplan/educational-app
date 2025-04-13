'use client';

import { Box, Typography, Paper, Container, Stack } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Educational Platform
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Your learning journey starts here. Explore our courses and begin your educational adventure.
        </Typography>
      </Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        <Box sx={{ width: '100%' }}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TimelineIcon sx={{ mr: 1 }} />
              <Typography variant="h5" component="h2">
                Your Progress
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Track your learning progress and achievements across all your enrolled courses.
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LibraryBooksIcon sx={{ mr: 1 }} />
              <Typography variant="h5" component="h2">
                Available Resources
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Access course materials, assignments, and additional learning resources.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
}
