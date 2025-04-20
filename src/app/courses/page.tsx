'use client';

import {
  Add as AddIcon,
  Close as CloseIcon,
  School as SchoolIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  TextField,
  InputAdornment,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  Snackbar,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { FC,   useState, useMemo } from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import { mockCourses } from '@/mocks/mockData';

const CoursesPage: FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [courses, setCourses] = useState(mockCourses);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleCourseClick = (courseId: string): void => {
    router.push(`/courses/${courseId}`);
  };

  const handleOpenDialog = (): void => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
    setNewCourse({ title: '', description: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setNewCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateCourse = (): void => {
    if (!newCourse.title.trim() || !newCourse.description.trim()) {
      return;
    }

    // Crear un nuevo curso con ID único
    const courseId = Date.now().toString();
    const course = {
      id: courseId,
      title: newCourse.title,
      description: newCourse.description,
    };

    // Agregar el nuevo curso a la lista
    setCourses(prev => [...prev, course]);
    
    // Mostrar mensaje de éxito
    setSnackbar({
      open: true,
      message: 'Curso creado exitosamente',
    });

    // Cerrar el diálogo
    handleCloseDialog();
  };

  const handleCloseSnackbar = (): void => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    
    const query = searchQuery.toLowerCase().trim();
    return courses.filter(course => 
      course.title.toLowerCase().includes(query) || 
      course.description.toLowerCase().includes(query)
    );
  }, [searchQuery, courses]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Breadcrumb />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" color="primary">
            Mis Cursos
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          >
            Crear Curso
          </Button>
        </Box>
        
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Explora tus cursos disponibles y comienza tu camino para enseñar.
        </Typography>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 4, 
            backgroundColor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar cursos por título o descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {filteredCourses.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No se encontraron cursos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Intenta con otros términos de búsqueda
            </Typography>
          </Box>
        ) : (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              md: 'repeat(3, 1fr)' 
            },
            gap: 3
          }}>
            {filteredCourses.map((course) => (
              <Card 
                key={course.id}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" component="h2">
                      {course.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={() => handleCourseClick(course.id)}
                  >
                    Ver Curso
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {/* Diálogo para crear nuevo curso */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Crear Nuevo Curso
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            id="title"
            name="title"
            label="Título del Curso"
            type="text"
            fullWidth
            variant="outlined"
            value={newCourse.title}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Descripción"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newCourse.description}
            onChange={handleInputChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={handleCreateCourse} 
            variant="contained" 
            color="primary"
            disabled={!newCourse.title.trim() || !newCourse.description.trim()}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mensajes de éxito */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CoursesPage;