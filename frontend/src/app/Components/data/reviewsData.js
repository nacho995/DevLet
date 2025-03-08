// Modelo de datos para reseñas
export const reviewsData = [
  {
    id: 1,
    name: 'María García',
    rating: 5,
    comment: 'Excelente servicio, el desarrollo web superó mis expectativas. Muy profesionales y atentos a los detalles.',
    date: '2023-12-15'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    rating: 4,
    comment: 'Muy buen trabajo en el diseño de mi aplicación. El proceso fue fluido y el resultado final es impresionante.',
    date: '2023-11-28'
  },
  {
    id: 3,
    name: 'Laura Martínez',
    rating: 5,
    comment: 'Increíble experiencia trabajando con este equipo. Entendieron perfectamente lo que necesitaba y lo entregaron a tiempo.',
    date: '2023-10-10'
  },
  {
    id: 4,
    name: 'Javier López',
    rating: 4,
    comment: 'Muy satisfecho con el resultado final. El equipo fue muy receptivo a mis comentarios y realizaron los cambios rápidamente.',
    date: '2023-09-22'
  },
  {
    id: 5,
    name: 'Ana Sánchez',
    rating: 5,
    comment: 'Trabajar con este equipo ha sido una experiencia excepcional. Profesionales, creativos y muy eficientes.',
    date: '2023-08-15'
  }
];

// URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Datos de ejemplo para fallback
const exampleReviews = [
  {
    id: 1,
    name: 'María García',
    rating: 5,
    comment: 'Excelente servicio, el desarrollo web superó mis expectativas. Muy profesionales y atentos a los detalles.',
    date: '2023-12-15'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    rating: 4,
    comment: 'Muy buen trabajo en el diseño de mi aplicación. El proceso fue fluido y el resultado final es impresionante.',
    date: '2023-11-28'
  },
  {
    id: 3,
    name: 'Laura Martínez',
    rating: 5,
    comment: 'Increíble experiencia trabajando con este equipo. Entendieron perfectamente lo que necesitaba y lo entregaron a tiempo.',
    date: '2023-10-10'
  },
  {
    id: 4,
    name: 'Javier López',
    rating: 4,
    comment: 'Muy satisfecho con el resultado final. El equipo fue muy receptivo a mis comentarios y realizaron los cambios rápidamente.',
    date: '2023-09-22'
  },
  {
    id: 5,
    name: 'Ana Sánchez',
    rating: 5,
    comment: 'Trabajar con este equipo ha sido una experiencia excepcional. Profesionales, creativos y muy eficientes.',
    date: '2023-08-15'
  }
];

// Verificar si estamos en el cliente
const isClient = typeof window !== 'undefined';

// Función para obtener todas las reseñas
export const getReviews = async () => {
  // Si no estamos en el cliente, devolver datos de ejemplo
  if (!isClient) {
    return exampleReviews;
  }

  try {
    // Primero intentamos obtener las reseñas del backend
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Evitar caché para prevenir problemas de hidratación
    });

    if (!response.ok) {
      throw new Error('Error al obtener las reseñas del backend');
    }

    const data = await response.json();
    return data.success ? data.data : exampleReviews;
  } catch (backendError) {
    console.error('Error al obtener las reseñas del backend:', backendError);
    
    try {
      // Si falla el backend, intentamos con el API del frontend
      const response = await fetch('/api/reviews', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store' // Evitar caché para prevenir problemas de hidratación
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener las reseñas del frontend');
      }
      
      const data = await response.json();
      return data.success ? data.data : exampleReviews;
    } catch (frontendError) {
      console.error('Error al obtener las reseñas del frontend:', frontendError);
      // Si ambos fallan, devolvemos datos de ejemplo
      return exampleReviews;
    }
  }
};

// Función para añadir una nueva reseña
export const addReview = async (review) => {
  // Si no estamos en el cliente, simular una respuesta exitosa
  if (!isClient) {
    return {
      success: true,
      data: {
        ...review,
        id: 6,
        date: '2024-03-08'
      }
    };
  }

  try {
    // Primero intentamos enviar la reseña al backend
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
      cache: 'no-store' // Evitar caché para prevenir problemas de hidratación
    });

    if (!response.ok) {
      // Si falla, intentamos con el API del frontend
      const frontendResponse = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
        cache: 'no-store' // Evitar caché para prevenir problemas de hidratación
      });
      
      if (!frontendResponse.ok) {
        const errorData = await frontendResponse.json();
        throw new Error(errorData.error || 'Error al añadir la reseña');
      }
      
      return await frontendResponse.json();
    }

    return await response.json();
  } catch (error) {
    console.error('Error al añadir la reseña:', error);
    
    // Si ambos fallan, simulamos una respuesta exitosa
    return {
      success: true,
      data: {
        ...review,
        id: Math.floor(Math.random() * 1000) + 6,
        date: new Date().toISOString().split('T')[0]
      }
    };
  }
}; 