import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Ruta al archivo JSON que almacenará las reseñas
const dataFilePath = path.join(process.cwd(), 'src/app/api/reviews/reviews.json');

// Función para leer las reseñas del archivo JSON
const getReviewsFromFile = () => {
  try {
    // Verificar si el archivo existe
    if (!fs.existsSync(dataFilePath)) {
      // Si no existe, crear un archivo con datos iniciales
      const initialData = [
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
        }
      ];
      fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    
    // Leer el archivo
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error al leer las reseñas:', error);
    return [];
  }
};

// Función para escribir las reseñas en el archivo JSON
const saveReviewsToFile = (reviews) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(reviews, null, 2));
    return true;
  } catch (error) {
    console.error('Error al guardar las reseñas:', error);
    return false;
  }
};

// GET: Obtener todas las reseñas
export async function GET() {
  try {
    const reviews = getReviewsFromFile();
    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error('Error en GET /api/reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener las reseñas' },
      { status: 500 }
    );
  }
}

// POST: Añadir una nueva reseña
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validación básica
    if (!body.name || !body.comment || !body.rating) {
      return NextResponse.json(
        { success: false, error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }
    
    // Obtener las reseñas existentes
    const reviews = getReviewsFromFile();
    
    // Crear una nueva reseña
    const newReview = {
      id: reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1,
      name: body.name,
      rating: body.rating,
      comment: body.comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Añadir la nueva reseña
    reviews.push(newReview);
    
    // Guardar las reseñas actualizadas
    const saved = saveReviewsToFile(reviews);
    
    if (saved) {
      return NextResponse.json({ success: true, data: newReview });
    } else {
      return NextResponse.json(
        { success: false, error: 'Error al guardar la reseña' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error en POST /api/reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
} 