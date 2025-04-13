'use client';

import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { mockCourses } from '@/mocks/mockData';

export interface Course {
  id: string;
  title: string;
  description: string;
}

interface CoursesContextType {
  courses: Course[];
  loading: boolean;
  error: string | null;
  searchCourses: (query: string) => void;
  getCourseById: (id: string) => Course | undefined;
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export function useCourses() {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
}

interface CoursesProviderProps {
  children: ReactNode;
}

export function CoursesProvider({ children }: CoursesProviderProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar cursos al iniciar
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        // En una aplicación real, aquí haríamos una llamada a la API
        // Por ahora, usamos los datos mock
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular carga
        setCourses(mockCourses);
        setFilteredCourses(mockCourses);
        setError(null);
      } catch (err) {
        setError('Error al cargar los cursos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Buscar cursos por título o descripción
  const searchCourses = (query: string) => {
    if (!query.trim()) {
      setFilteredCourses(courses);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = courses.filter(
      course => 
        course.title.toLowerCase().includes(lowerQuery) || 
        course.description.toLowerCase().includes(lowerQuery)
    );
    setFilteredCourses(filtered);
  };

  // Obtener un curso por ID
  const getCourseById = (id: string) => {
    return courses.find(course => course.id === id);
  };

  // Añadir un nuevo curso
  const addCourse = (newCourse: Omit<Course, 'id'>) => {
    const id = Date.now().toString(); // Generar ID único
    const course: Course = { ...newCourse, id };
    setCourses(prev => [...prev, course]);
    setFilteredCourses(prev => [...prev, course]);
  };

  // Actualizar un curso existente
  const updateCourse = (id: string, updatedData: Partial<Course>) => {
    setCourses(prev => 
      prev.map(course => 
        course.id === id ? { ...course, ...updatedData } : course
      )
    );
    setFilteredCourses(prev => 
      prev.map(course => 
        course.id === id ? { ...course, ...updatedData } : course
      )
    );
  };

  // Eliminar un curso
  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(course => course.id !== id));
    setFilteredCourses(prev => prev.filter(course => course.id !== id));
  };

  const value = {
    courses: filteredCourses,
    loading,
    error,
    searchCourses,
    getCourseById,
    addCourse,
    updateCourse,
    deleteCourse
  };

  return (
    <CoursesContext.Provider value={value}>
      {children}
    </CoursesContext.Provider>
  );
}
