'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { features } from './data/websiteData';

const CTASection = ({ isVisible }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detectar modo oscuro
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);
    
    return () => mediaQuery.removeEventListener('change', checkDarkMode);
  }, []);

  return (
    <div className={`container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 transition-all duration-1000 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}>
      <div className="relative overflow-hidden rounded-3xl">
        {/* Fondo con efecto de vidrio */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-indigo-600/80 to-purple-600/80 backdrop-blur-md"></div>
        
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        {/* Patrón de puntos */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Líneas decorativas */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
        
        {/* Contenido */}
        <div className="relative z-10 py-16 px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para Impulsar tu Presencia Online?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg">
            Conversemos sobre cómo puedo ayudarte a crear una web que atraiga clientes y potencie tu negocio.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contacto" 
              className={`group relative px-8 py-4 rounded-full ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white border border-blue-300 shadow-lg shadow-indigo-500/30' 
                  : 'bg-white text-indigo-600'
              } font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
            >
              <span className={`absolute inset-0 w-full h-full ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-400 to-indigo-500' 
                  : 'bg-white'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></span>
              <span className={`absolute inset-0 w-0 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-300 to-indigo-400' 
                  : 'bg-gradient-to-r from-blue-100 to-indigo-100'
              } group-hover:w-full transition-all duration-300 opacity-20`}></span>
              <span className="relative z-10 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contactar Ahora
              </span>
            </Link>
            
            <Link 
              href="/portfolio" 
              className="group relative px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white/20 transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse animate-duration-[3s]"></span>
              <span className="relative z-10 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Ver Proyectos
              </span>
            </Link>
          </div>
          
          {/* Indicadores de confianza */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Respuesta en 24h</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Presupuesto sin compromiso</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Satisfacción garantizada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection; 