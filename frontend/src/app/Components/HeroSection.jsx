'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { marketingPhrases } from './data/websiteData';

const HeroSection = ({ isVisible = true }) => {
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

  return (
    <div className="relative z-10 w-full">
      <div className="relative min-h-[90vh] w-full overflow-hidden">
        {/* Elementos flotantes - Ocultos en pantallas muy pequeñas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-24 sm:h-24 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-white/20 animate-bounce animate-duration-[8s] animate-ease-in-out"></div>
          <div className="absolute top-2/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-20 sm:h-20 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500/10 to-sky-500/10 backdrop-blur-sm border border-white/20 animate-pulse animate-duration-[6s] animate-ease-in-out"></div>
          <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-16 sm:h-16 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-sm border border-white/20 animate-bounce animate-duration-[4s] animate-ease-in-out"></div>
          
          {/* Elementos geométricos - Ocultos en pantallas muy pequeñas */}
          <div className="hidden xs:block absolute top-1/3 right-1/3 transform rotate-45 w-8 h-8 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-gradient-to-br from-indigo-500/5 to-transparent backdrop-blur-sm border border-white/10 animate-spin animate-duration-[15s] animate-linear"></div>
          <div className="hidden xs:block absolute bottom-1/4 left-1/3 transform -rotate-12 w-10 h-10 sm:w-16 sm:h-16 md:w-32 md:h-32 bg-gradient-to-br from-blue-500/5 to-transparent backdrop-blur-sm border border-white/10 animate-pulse animate-duration-[4s]"></div>
        </div>
        
        {/* Contenido principal */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Título con efecto de perspectiva */}
              <div className="perspective-[1000px] mb-6 sm:mb-12">
                <div className={`inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-1 sm:py-2 rounded-full bg-box text-box ${
                  isDarkMode ? 'bg-white/20 border-white/40' : 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-white/20'
                }`}>
                  Diseño Web Profesional y Accesible
                </div>
                
                <div className="relative group">
                  <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2 transform transition-all duration-700 group-hover:translate-z-10 group-hover:rotate-x-12">
                    <span className="block mb-1 sm:mb-2 transform transition-transform duration-700 group-hover:translate-y-[-10px]">Páginas Web</span>
                    <span className="relative">
                      <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20"></span>
                      <span className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent transform transition-transform duration-700 group-hover:translate-y-[10px]">
                        A Tu Medida
                      </span>
                    </span>
                  </h1>
                  
                  {/* Elementos decorativos del título - Ajustados para pantallas pequeñas */}
                  <div className="absolute -right-2 sm:-right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-md animate-pulse animate-duration-[3s]"></div>
                  <div className="absolute -left-2 sm:-left-4 top-1/4 transform -translate-y-1/2 w-6 h-6 sm:w-12 sm:h-12 md:w-20 md:h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-md animate-pulse animate-duration-[4s] animate-delay-300"></div>
                </div>
              </div>
              
              {/* Descripción con efecto de desplazamiento */}
              <div className="relative overflow-hidden rounded-2xl mb-6 sm:mb-12">
                <div className={`absolute inset-0 ${
                  isDarkMode ? 'bg-gradient-to-r from-indigo-500/15 to-purple-500/15' : 'bg-gradient-to-r from-indigo-500/5 to-purple-500/5'
                } backdrop-blur-sm`}></div>
                <p className="relative z-10 mt-3 sm:mt-6 text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-200 leading-relaxed p-3 sm:p-6 backdrop-blur-sm">
                  Diseño páginas web sencillas y efectivas que presentan tu negocio de forma profesional y atraen a tus clientes ideales.
                </p>
                
                {/* Líneas decorativas */}
                <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent ${
                  isDarkMode ? 'via-indigo-500/50' : 'via-indigo-500/30'
                } to-transparent`}></div>
                <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent ${
                  isDarkMode ? 'via-purple-500/50' : 'via-purple-500/30'
                } to-transparent`}></div>
                <div className={`absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent ${
                  isDarkMode ? 'via-indigo-500/50' : 'via-indigo-500/30'
                } to-transparent`}></div>
                <div className={`absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent ${
                  isDarkMode ? 'via-purple-500/50' : 'via-purple-500/30'
                } to-transparent`}></div>
              </div>
              
              {/* Botones con efectos avanzados */}
              <div className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-6">
                <Link 
                  href="/solicitar-proyecto" 
                  className="group relative px-4 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></span>
                  <span className="absolute inset-0 w-full h-full">
                    <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </span>
                  <span className="relative z-10 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 animate-pulse animate-duration-[2s]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="relative">
                      <span className="block transition-transform duration-300 group-hover:translate-y-[-100%] group-hover:opacity-0">
                        Iniciar Proyecto
                      </span>
                      <span className="absolute inset-0 transition-transform duration-300 translate-y-[100%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        ¡Comencemos!
                      </span>
                    </span>
                  </span>
                </Link>
                
                <Link 
                  href="/ejemplos" 
                  className={`group relative px-4 sm:px-8 py-3 sm:py-4 rounded-full ${
                    isDarkMode ? 'bg-white/30 text-white' : 'bg-white/20 text-gray-800'
                  } backdrop-blur-md border ${
                    isDarkMode ? 'border-white/50' : 'border-white/30'
                  } font-bold text-sm sm:text-lg hover:bg-white/30 transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg`}
                >
                  <span className={`absolute inset-0 ${
                    isDarkMode ? 'bg-gradient-to-r from-indigo-500/20 via-indigo-500/25 to-indigo-500/20' : 'bg-gradient-to-r from-indigo-500/10 via-indigo-500/15 to-indigo-500/10'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse animate-duration-[3s]`}></span>
                  <span className="relative z-10 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 transition-transform duration-300 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    Explorar Trabajos
                  </span>
                </Link>
              </div>
              
              {/* Scroll indicator - Movido arriba de las frases de marketing */}
              <div className="flex flex-col items-center justify-center mt-8 sm:mt-12 mb-4 sm:mb-6 animate-bounce z-20">
                <span className={`text-gray-500 dark:text-gray-300 text-xs sm:text-sm mb-1 sm:mb-2 ${
                  isDarkMode ? 'bg-white/30' : 'bg-white/50'
                } px-2 py-1 rounded-full backdrop-blur-sm`}>Descubre más</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 sm:h-6 sm:w-6 text-gray-500 dark:text-gray-300 ${
                  isDarkMode ? 'bg-white/30' : 'bg-white/50'
                } p-1 rounded-full backdrop-blur-sm`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              {/* Indicadores de tecnologías con efecto de desplazamiento - Mejorado para pantallas pequeñas */}
              <div className="mt-2 sm:mt-4 relative">
                <div className={`absolute inset-0 ${
                  isDarkMode ? 'bg-gradient-to-r from-indigo-500/15 to-purple-500/15' : 'bg-gradient-to-r from-indigo-500/5 to-purple-500/5'
                } rounded-xl backdrop-blur-sm`}></div>
                <div className="relative z-10 py-2 sm:py-4 overflow-hidden">
                  <div className="flex animate-marquee">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex shrink-0 gap-2 sm:gap-6 px-1 sm:px-2">
                        {marketingPhrases.map((phrase, index) => (
                          <div 
                            key={`${i}-${index}`} 
                            className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg ${
                              isDarkMode 
                                ? 'bg-white/25 text-white font-semibold shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
                                : 'bg-white/10 text-gray-700'
                            } backdrop-blur-sm border ${
                              isDarkMode ? 'border-white/40' : 'border-white/10'
                            } text-xs sm:text-sm font-medium whitespace-nowrap hover:bg-white/20 transition-all duration-300 transform hover:scale-105`}
                          >
                            {phrase}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 