'use client';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Alert,
  Divider,
  ListItemButton
} from '@mui/material';
import { notFound , useRouter } from 'next/navigation';
import React, { useState, type FC } from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import { mockCourses, mockUnits } from '@/mocks/mockData';

interface UnitsPageProps {
  params: {
    id: string;
  };
}

const UnitsPage: FC<UnitsPageProps> = ({ params }) => {
  const router = useRouter();
  const course = mockCourses.find(c => c.id === params.id);
  const [units, setUnits] = useState(mockUnits.filter(u => u.courseId === params.id));
  
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<typeof mockUnits[0] | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: 1
  });   
  const [successMessage, setSuccessMessage] = useState('');
  
  if (!course) {
    notFound();
  }

  const handleOpenDialog = (unit?: typeof mockUnits[0]): void => {
    if (unit) {
      setSelectedUnit(unit);
      setFormData({
        title: unit.title,
        description: unit.description,
        order: unit.order
      });
    } else {
      setSelectedUnit(null);
      setFormData({
        title: '',
        description: '',
        order: units.length + 1
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
    setSelectedUnit(null);
    setFormData({
      title: '',
      description: '',
      order: 1
    });
  };

  const handleOpenDeleteDialog = (unit: typeof mockUnits[0]): void => {
    setSelectedUnit(unit);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (): void => {
    setOpenDeleteDialog(false);
    setSelectedUnit(null);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (selectedUnit) {
      // Modificar unidad existente
      setUnits(units.map(u => 
        u.id === selectedUnit.id 
          ? { ...u, ...formData }
          : u
      ));
      setSuccessMessage('Unidad modificada correctamente');
    } else {
      // Crear nueva unidad
      const newUnit = {
        id: String(Date.now()),
        courseId: params.id,
        ...formData
      };
      setUnits([...units, newUnit]);
      setSuccessMessage('Unidad creada correctamente');
    }
    
    handleCloseDialog();
    
    // Ocultar mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleDelete = (): void => {
    if (selectedUnit) {
      setUnits(units.filter(u => u.id !== selectedUnit.id));
      setSuccessMessage('Unidad eliminada correctamente');
      handleCloseDeleteDialog();
      
      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  const handleUnitClick = (unitId: string): void => {
    router.push(`/courses/${params.id}/units/${unitId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumb />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" color="primary">
          Unidades del Curso: {course.title}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Agregar Unidad
        </Button>
      </Box>
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}
      
      <Paper elevation={2}>
        {units.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hay unidades disponibles para este curso
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Agrega unidades para organizar el contenido del curso
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Agregar Unidad
            </Button>
          </Box>
        ) : (
          <List>
            {units.sort((a, b) => a.order - b.order).map((unit, index) => (
              <React.Fragment key={unit.id}>
                <ListItemButton 
                  onClick={() => handleUnitClick(unit.id)}
                >
                  <ListItemText
                    primary={
                      <Typography variant="h6">
                        {unit.order}. {unit.title}
                      </Typography>
                    }
                    secondary={unit.description}
                  />
                  <Box sx={{ display: 'flex' }}>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDialog(unit);
                      }}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDeleteDialog(unit);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItemButton>
                {index < units.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
      
      {/* Diálogo para crear/modificar unidad */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {selectedUnit ? 'Modificar Unidad' : 'Crear Nueva Unidad'}
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Título"
              type="text"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Descripción"
              type="text"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Orden"
              type="number"
              fullWidth
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              required
              inputProps={{ min: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {selectedUnit ? 'Modificar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      
      {/* Diálogo para confirmar eliminación */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar la unidad &quot;{selectedUnit?.title}&quot;? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 

export default UnitsPage;