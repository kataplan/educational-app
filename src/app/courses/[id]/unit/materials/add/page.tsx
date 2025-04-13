'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Breadcrumb from '@/components/Breadcrumb';
import { styled } from '@mui/material/styles';

// Datos de ejemplo - En una aplicación real, esto vendría de una API o base de datos
const mockCourses = [
  {
    id: "1",
    title: "Introducción a la Programación",
    description: "Aprende los fundamentos de la programación",
  },
  {
    id: "2",
    title: "Desarrollo Web con React",
    description: "Crea aplicaciones web modernas con React",
  },
  {
    id: "3",
    title: "Bases de Datos SQL",
    description: "Domina el diseño y gestión de bases de datos",
  },
  {
    id: "4",
    title: "Inteligencia Artificial",
    description: "Introducción a los conceptos de IA y machine learning",
  },
  {
    id: "5",
    title: "Desarrollo de Aplicaciones Móviles",
    description: "Crea apps para iOS y Android con React Native",
  },
];

// Estilo personalizado para el área de carga de archivos
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface AddMaterialPageProps {
  params: {
    id: string;
  };
}

export default function AddMaterialPage({ params }: AddMaterialPageProps) {
  const router = useRouter();
  const course = mockCourses.find(c => c.id === params.id);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('document');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!course) {
    notFound();
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!title.trim()) {
      setError('El título es obligatorio');
      return;
    }
    
    if (!file) {
      setError('Debes seleccionar un archivo');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    // Simulación de carga - En una aplicación real, aquí se enviaría el archivo al servidor
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push(`/courses/${course.id}/materials`);
      }, 2000);
    }, 1500);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumb />
      
      <Typography variant="h4" component="h1" color="primary" gutterBottom>
        Agregar Material
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Curso: {course.title}
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <TextField
                label="Título del material"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Box>
            
            <Box>
              <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Tipo de material</InputLabel>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Tipo de material"
                >
                  <MenuItem value="Prueba">Documento</MenuItem>
                  <MenuItem value="Libro">Presentación</MenuItem>
                  <MenuItem value="other">Otro</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Archivo
              </Typography>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
              >
                Seleccionar archivo
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
              
              {file && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    Archivo seleccionado: {file.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Tamaño: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                </Box>
              )}
            </Box>
            
            <Box>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Material agregado correctamente. Redirigiendo...
                </Alert>
              )}
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1 }} />
                    Subiendo...
                  </>
                ) : (
                  'Subir Material'
                )}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
} 