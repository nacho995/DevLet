'use client'
import React, { useState, useEffect } from 'react';
import { services } from './data/websiteData';

const ServicesSection = ({ isVisible = true }) => {
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
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Cambiar el servicio activo cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
            Mis Servicios
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Soluciones Web a Tu Medida
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6">
            Servicios de diseño web profesional adaptados a tus necesidades
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden rounded-xl group transition-all duration-500 h-[300px] transform`}
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
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{service.description}</p>
                <div className="mt-auto">
                  <span className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline">
                    Saber más
                    <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Servicio destacado */}
        <div className="mt-20 relative overflow-hidden rounded-xl p-8 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
          {/* Capa de brillo superior */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent"></div>
          
          {/* Fondo con efecto de vidrio mejorado */}
          <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-sm"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="text-white max-w-2xl mb-6 md:mb-0">
              <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-3">
                Servicio destacado
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{services[activeService].title}</h3>
              <p className="mb-6 text-white/90">{services[activeService].description}</p>
              <button className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-600">
                Solicitar información
              </button>
            </div>
            
            <div className="relative">
              {/* Contenedor del icono con mejor visibilidad */}
              <div className="relative w-40 h-40 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/30 shadow-lg overflow-hidden">
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5"></div>
                
                {/* Icono con mejor visibilidad */}
                <div className="text-[100px] text-white relative z-10 filter drop-shadow-lg">
                  {services[activeService].icon}
                </div>
              </div>
              
              {/* Círculos decorativos */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"></div>
            </div>
          </div>
          
          {/* Indicadores de navegación */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {services.map((_, index) => (
              <button 
                key={index}
                onClick={() => setActiveService(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeService 
                    ? 'bg-white w-6' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Ver servicio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 