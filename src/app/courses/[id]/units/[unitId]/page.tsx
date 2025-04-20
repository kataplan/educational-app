'use client';

import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert
} from '@mui/material';
import { notFound , useRouter } from 'next/navigation';
import React, { FC, PropsWithChildren, useState } from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import { mockCourses, mockMaterials, mockTests, mockUnits } from '@/mocks/mockData';

interface UnitPageProps {
  params: Promise<{
    id: string;
    unitId: string;
  }>;
}

interface TabPanelProps extends PropsWithChildren {
  index: number;
  value: number;
}

const TabPanel: FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const UnitPage: FC<UnitPageProps> = ({ params }) => {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const courseId = resolvedParams.id;
  const unitId = resolvedParams.unitId;
  
  const course = mockCourses.find(c => c.id === courseId);
  const unit = mockUnits.find(u => u.id === unitId && u.courseId === courseId);
  
  const [tabValue, setTabValue] = useState(0);
  const [materials, setMaterials] = useState(mockMaterials.filter(m => m.unitId === unitId));
  const [tests, setTests] = useState(mockTests.filter(t => t.unitId === unitId));
  
  const [deleteMaterialDialogOpen, setDeleteMaterialDialogOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<string | null>(null);
  const [deleteMaterialSuccess, setDeleteMaterialSuccess] = useState(false);
  
  const [deleteTestDialogOpen, setDeleteTestDialogOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState<string | null>(null);
  const [deleteTestSuccess, setDeleteTestSuccess] = useState(false);
  
  if (!course || !unit) {
    notFound();
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setTabValue(newValue);
  };

  const handleAddMaterial = (): void => {
    router.push(`/courses/${courseId}/materials/add?unitId=${unitId}`);
  };

  const handleAddTest = (): void => {
    router.push(`/courses/${courseId}/tests/create?unitId=${unitId}`);
  };

  const handleDeleteMaterialClick = (materialId: string): void => {
    setMaterialToDelete(materialId);
    setDeleteMaterialDialogOpen(true);
  };

  const handleDeleteMaterialConfirm = (): void   => {
    if (materialToDelete) {
      // En una aplicación real, aquí se haría una llamada a la API
      setMaterials(materials.filter(m => m.id !== materialToDelete));
      setDeleteMaterialDialogOpen(false);
      setMaterialToDelete(null);
      setDeleteMaterialSuccess(true);
      
      // Ocultar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setDeleteMaterialSuccess(false);
      }, 3000);
    }
  };

  const handleDeleteMaterialCancel = (): void  => {
    setDeleteMaterialDialogOpen(false);
    setMaterialToDelete(null);
  };

  const handleDeleteTestClick = (testId: string): void => {
    setTestToDelete(testId);
    setDeleteTestDialogOpen(true);
  };

  const handleDeleteTestConfirm = (): void => {
    if (testToDelete) {
      // En una aplicación real, aquí se haría una llamada a la API
      setTests(tests.filter(t => t.id !== testToDelete));
      setDeleteTestDialogOpen(false);
      setTestToDelete(null);
      setDeleteTestSuccess(true);
      
      // Ocultar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setDeleteTestSuccess(false);
      }, 3000);
    }
  };

  const handleDeleteTestCancel = (): void => {
    setDeleteTestDialogOpen(false);
    setTestToDelete(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumb />
      
      <Typography variant="h4" component="h1" color="primary" gutterBottom>
        {unit.title}
      </Typography>
      
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        {course.title} - {unit.description}
      </Typography>
      
      {deleteMaterialSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Material eliminado correctamente
        </Alert>
      )}
      
      {deleteTestSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Prueba eliminada correctamente
        </Alert>
      )}
      
      <Paper elevation={2} sx={{ mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Materiales" />
          <Tab label="Pruebas" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={handleAddMaterial}
            >
              Agregar Material
            </Button>
          </Box>
          
          {materials.length === 0 ? (
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: 'background.default' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No hay materiales disponibles para esta unidad
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Agrega materiales para que tus estudiantes puedan aprender
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleAddMaterial}
              >
                Agregar Material
              </Button>
            </Paper>
          ) : (
            <List>
              {materials.map((material, index) => (
                <React.Fragment key={material.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={() => handleDeleteMaterialClick(material.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="subtitle1">
                            {material.title}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" component="span">
                            {material.description}
                          </Typography>
                          <Typography variant="caption" display="block" color="text.secondary">
                            Tipo: {material.type} | Archivo: {material.fileName} | Subido: {material.uploadDate}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < materials.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={handleAddTest}
            >
              Crear Prueba
            </Button>
          </Box>
          
          {tests.length === 0 ? (
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: 'background.default' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No hay pruebas disponibles para esta unidad
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Crea pruebas para evaluar el conocimiento de tus estudiantes
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleAddTest}
              >
                Crear Prueba
              </Button>
            </Paper>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
              {tests.map((test) => (
                <Paper 
                  key={test.id}
                  elevation={2} 
                  sx={{ 
                    p: 2, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AssignmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6" component="h3">
                        {test.title}
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      aria-label="delete"
                      onClick={() => handleDeleteTestClick(test.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {test.description}
                  </Typography>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Preguntas: {test.questionCount} | Tiempo: {test.timeLimit} min | Fecha límite: {test.dueDate}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </TabPanel>
      </Paper>
      
      {/* Diálogo para eliminar material */}
      <Dialog
        open={deleteMaterialDialogOpen}
        onClose={handleDeleteMaterialCancel}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este material? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteMaterialCancel}>Cancelar</Button>
          <Button onClick={handleDeleteMaterialConfirm} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Diálogo para eliminar prueba */}
      <Dialog
        open={deleteTestDialogOpen}
        onClose={handleDeleteTestCancel}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta prueba? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteTestCancel}>Cancelar</Button>
          <Button onClick={handleDeleteTestConfirm} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 

export default UnitPage;