'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importar el componente ReviewsSection de manera dinámica para evitar problemas de hidratación
const ReviewsSection = dynamic(() => import('./ReviewsSection'), {
  ssr: false,
  loading: () => (
    <section 
      id="reviews-loading" 
      className="w-full py-16 min-h-[600px] relative z-50"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Lo que dicen</span> nuestros clientes
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Cargando reseñas...
          </p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    </section>
  )
});

const ClientReviewsSection = () => {
  // Estado para controlar si estamos en el cliente
  const [isClient, setIsClient] = useState(false);

  // Asegurarse de que el componente solo se renderice en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section 
        id="reviews-placeholder" 
        className="w-full py-16 min-h-[600px] relative z-50"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Lo que dicen</span> nuestros clientes
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cargando reseñas...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative z-50">
      <ReviewsSection />
    </div>
  );
};

export default ClientReviewsSection; 