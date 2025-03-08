'use client'
import React, { useState, useEffect } from 'react';
import { services } from './data/websiteData';

const ServicesSection = ({ isVisible }) => {
  const [activeService, setActiveService] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detectar modo oscuro
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    // Escuchar cambios en el modo de color
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => checkDarkMode();
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <div 
          key={index}
          className={`relative group overflow-hidden rounded-2xl transition-all duration-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } delay-${index * 100}`}
          style={{ 
            transitionDelay: `${index * 100}ms`,
            animationDelay: `${index * 100}ms`
          }}
          onMouseEnter={() => setActiveService(index)}
        >
          {/* Fondo con efecto de vidrio */}
          <div className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-white/15 backdrop-blur-md border border-white/40 group-hover:bg-white/25' 
              : 'bg-white/10 backdrop-blur-md border border-white/30 group-hover:bg-white/20'
          } transition-all duration-300`}></div>
          
          {/* Efecto de brillo en hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className={`absolute inset-0 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-blue-500/20' 
                : 'bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10'
            }`}></div>
            <div className="absolute -inset-[100%] animate-[spin_15s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md"></div>
          </div>
          
          {/* Contenido */}
          <div className="relative z-10 p-6 h-full flex flex-col">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 flex-grow">{service.description}</p>
            
            {/* Botón con efecto hover */}
            <div className="mt-6">
              <button className={`group/btn relative px-4 py-2 rounded-full ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-indigo-500/40 to-purple-500/40 text-white' 
                  : 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-indigo-700'
              } text-sm font-bold overflow-hidden shadow-md hover:shadow-lg transition-all duration-300`}>
                <span className={`absolute inset-0 w-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 opacity-50' 
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 opacity-40'
                } group-hover/btn:w-full transition-all duration-300`}></span>
                <span className="relative z-10 flex items-center">
                  Más información
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
            
            {/* Elementos decorativos */}
            <div className={`absolute top-0 right-0 w-20 h-20 ${
              isDarkMode 
                ? 'bg-gradient-to-bl from-indigo-500/20 to-transparent' 
                : 'bg-gradient-to-bl from-indigo-500/10 to-transparent'
            } rounded-bl-full`}></div>
            <div className={`absolute bottom-0 left-0 w-16 h-16 ${
              isDarkMode 
                ? 'bg-gradient-to-tr from-purple-500/20 to-transparent' 
                : 'bg-gradient-to-tr from-purple-500/10 to-transparent'
            } rounded-tr-full`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesSection; 