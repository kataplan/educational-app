// Datos de ejemplo - En una aplicación real, esto vendría de una API o base de datos
export const mockCourses = [
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

// Datos de ejemplo para unidades
export const mockUnits = [
  {
    id: "1",
    courseId: "1",
    title: "Introducción a la Programación",
    description: "Conceptos básicos y fundamentos de la programación",
    order: 1
  },
  {
    id: "2",
    courseId: "1",
    title: "Variables y Tipos de Datos",
    description: "Aprende sobre diferentes tipos de datos y cómo almacenarlos",
    order: 2
  },
  {
    id: "3",
    courseId: "1",
    title: "Estructuras de Control",
    description: "Condicionales, bucles y control de flujo",
    order: 3
  },
  {
    id: "4",
    courseId: "1",
    title: "Funciones y Módulos",
    description: "Organiza tu código con funciones y módulos",
    order: 4
  }
];

// Datos de ejemplo para materiales
export const mockMaterials = [
  {
    id: "1",
    unitId: "1",
    title: "Introducción a la Programación",
    description: "Conceptos básicos de programación y algoritmos",
    type: "PDF",
    fileName: "introduccion_programacion.pdf",
    uploadDate: "2023-01-15"
  },
  {
    id: "2",
    unitId: "1",
    title: "Ejercicios Prácticos",
    description: "Ejercicios para practicar los conceptos básicos",
    type: "DOCX",
    fileName: "ejercicios_practicos.docx",
    uploadDate: "2023-01-16"
  },
  {
    id: "3",
    unitId: "2",
    title: "Variables y Tipos de Datos",
    description: "Guía completa sobre variables y tipos de datos",
    type: "PDF",
    fileName: "variables_tipos_datos.pdf",
    uploadDate: "2023-01-20"
  }
];

// Datos de ejemplo para pruebas
export const mockTests = [
  {
    id: "1",
    unitId: "1",
    title: "Evaluación de Conceptos Básicos",
    description: "Prueba sobre los conceptos fundamentales de programación",
    questionCount: 10,
    timeLimit: 30, // minutos
    dueDate: "2023-02-01"
  },
  {
    id: "2",
    unitId: "2",
    title: "Evaluación de Variables y Tipos",
    description: "Prueba sobre variables y tipos de datos",
    questionCount: 15,
    timeLimit: 45, // minutos
    dueDate: "2023-02-15"
  }
]; 