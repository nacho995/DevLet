'use client';

import { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

// Componente para renderizar estrellas
const StarRating = ({ rating, onRatingChange = null, interactive = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`text-2xl ${
            interactive 
              ? (star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300')
              : (star <= rating ? 'text-yellow-400' : 'text-gray-300')
          } ${interactive ? 'cursor-pointer transition-colors duration-200' : ''}`}
          onClick={interactive ? () => onRatingChange(star) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
        />
      ))}
    </div>
  );
};

// Componente para una tarjeta de reseña
const ReviewCard = ({ name, date, rating, comment }) => {
  return (
    <div className="relative backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/30 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <FaQuoteLeft className="absolute top-4 right-4 text-indigo-500/20 dark:text-indigo-400/20 text-4xl transform -rotate-12" />
      
      <div className="flex items-center mb-4 relative z-10">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold text-white mr-4 shadow-md">
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
        </div>
      </div>
      <div className="flex mb-3 relative z-10">
        <StarRating rating={rating} />
      </div>
      <p className="text-gray-700 dark:text-gray-300 relative z-10">{comment}</p>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

const ReviewsSection = () => {
  // Estados
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Cargar reseñas del backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // Intentar obtener reseñas del backend
        const response = await fetch('http://localhost:5000/api/reviews');
        
        if (!response.ok) {
          throw new Error('Error al cargar las reseñas del servidor');
        }
        
        const data = await response.json();
        setReviews(data.data || []);
      } catch (err) {
        console.error('Error al cargar reseñas:', err);
        setError('No se pudieron cargar las reseñas. Por favor, intenta de nuevo más tarde.');
        
        // Cargar datos de ejemplo como fallback
        setReviews([
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  // Manejar cambio de rating
  const handleRatingChange = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación
    if (!newReview.name.trim() || !newReview.comment.trim() || newReview.rating === 0) {
      setSubmitError('Por favor completa todos los campos y selecciona una calificación');
      return;
    }
    
    try {
      setLoading(true);
      setSubmitError('');
      
      // Enviar reseña al backend
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
      
      if (!response.ok) {
        throw new Error('Error al enviar la reseña');
      }
      
      const result = await response.json();
      
      // Actualizar la lista de reseñas
      setReviews(prev => [...prev, result.data]);
      
      // Resetear el formulario
      setNewReview({ name: '', rating: 0, comment: '' });
      
      // Mostrar mensaje de éxito
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
      
    } catch (err) {
      console.error('Error al enviar reseña:', err);
      setSubmitError('Hubo un problema al enviar tu reseña. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="reviews" 
      className="w-full py-16 min-h-[600px] relative z-50"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Lo que dicen</span> nuestros clientes
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nos enorgullece el trabajo que hacemos y valoramos la opinión de nuestros clientes. 
            Aquí puedes ver lo que dicen sobre nosotros y compartir tu propia experiencia.
          </p>
        </div>

        {/* Indicador de carga */}
        {loading && (
          <div className="flex justify-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="mb-8 p-4 bg-red-100/80 dark:bg-red-900/30 backdrop-blur-sm text-red-700 dark:text-red-300 rounded-lg max-w-3xl mx-auto text-center border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {/* Lista de reseñas */}
        {!loading && reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reviews.map((review) => (
              <ReviewCard 
                key={review.id}
                name={review.name}
                date={review.date}
                rating={review.rating}
                comment={review.comment}
              />
            ))}
          </div>
        )}

        {/* Mensaje si no hay reseñas */}
        {!loading && reviews.length === 0 && !error && (
          <div className="text-center mb-16 p-8 backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 rounded-lg max-w-3xl mx-auto border border-white/20 dark:border-gray-700/30">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Aún no hay reseñas. ¡Sé el primero en compartir tu experiencia!
            </p>
          </div>
        )}

        {/* Formulario para añadir reseña */}
        <div className="max-w-2xl mx-auto backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 p-8 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none"></div>
          
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white relative z-10">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Comparte</span> tu experiencia
          </h3>
          
          {/* Mensaje de éxito */}
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-100/80 dark:bg-green-900/30 backdrop-blur-sm text-green-700 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800 relative z-10">
              ¡Gracias por tu reseña! Ha sido enviada correctamente.
            </div>
          )}
          
          {/* Mensaje de error del formulario */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-100/80 dark:bg-red-900/30 backdrop-blur-sm text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800 relative z-10">
              {submitError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newReview.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Tu nombre"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Calificación</label>
              <StarRating rating={newReview.rating} onRatingChange={handleRatingChange} interactive={true} />
            </div>
            
            <div className="mb-6">
              <label htmlFor="comment" className="block text-gray-700 dark:text-gray-300 mb-2">Comentario</label>
              <textarea
                id="comment"
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Comparte tu experiencia con nosotros"
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Enviando...' : 'Enviar Reseña'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection; 