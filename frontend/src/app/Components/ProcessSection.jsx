'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { steps } from './data/websiteData';

const ProcessSection = ({ isVisible }) => {
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
    <div className={`container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 transition-all duration-1000 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}>
      <div className="text-center mb-16">
        <span className={`inline-block px-4 py-1 rounded-full ${
          isDarkMode 
            ? 'bg-white/25 text-indigo-300 border-white/40' 
            : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 border-white/20'
        } text-sm font-medium mb-4 backdrop-blur-sm`}>
          Proceso Simple
        </span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Cómo Trabajamos Juntos
        </h2>
        <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6">
          Un proceso claro y sencillo para crear tu página web sin complicaciones
        </p>
      </div>
      
      {/* Línea de conexión */}
      <div className={`hidden md:block absolute left-1/2 top-[13rem] bottom-20 w-0.5 ${
        isDarkMode ? 'bg-gradient-to-b from-blue-300 via-indigo-400 to-purple-300' : 'bg-gradient-to-b from-blue-200 via-indigo-300 to-purple-200'
      } transform -translate-x-1/2 z-0`}></div>
      
      <div className="relative z-10">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`relative mb-20 last:mb-0 transition-all duration-700 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: `${200 + index * 200}ms` }}
          >
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
              {/* Número/Icono del paso */}
              <div className="relative flex-shrink-0 z-10">
                <div className={`relative w-20 h-20 rounded-full ${
                  isDarkMode 
                    ? 'bg-white/40 border-white/60' 
                    : 'bg-white/30 border-white/50'
                } backdrop-blur-md flex items-center justify-center text-3xl shadow-lg`}>
                  <div className={`absolute inset-0 rounded-full ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-blue-500/30 to-indigo-500/30' 
                      : 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20'
                  } animate-pulse`}></div>
                  <span className="relative z-10">{step.icon}</span>
                </div>
                <div className={`absolute -inset-3 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20' 
                    : 'bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10'
                } rounded-full blur-xl ${
                  isDarkMode ? 'opacity-90' : 'opacity-70'
                }`}></div>
              </div>
              
              {/* Contenido del paso */}
              <div className={`flex-grow ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <div className="relative p-6 rounded-2xl overflow-hidden">
                  {/* Fondo con efecto de vidrio */}
                  <div className={`absolute inset-0 ${
                    isDarkMode 
                      ? 'bg-gray-800/70 border-gray-700/50' 
                      : 'bg-white/20 border-white/30'
                  } backdrop-blur-md transition-all duration-300`}></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{step.description}</p>
                    
                    {/* Lista de beneficios */}
                    <ul className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                      {step.benefits.map((benefit, i) => (
                        <li 
                          key={i} 
                          className={`px-3 py-1 rounded-full ${
                            isDarkMode 
                              ? 'bg-blue-500/40 text-white font-bold shadow-md' 
                              : 'bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-blue-800 font-bold shadow-md'
                          } text-xs`}
                        >
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Elementos decorativos */}
                  <div className={`absolute ${index % 2 === 0 ? 'top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full' : 'top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-br-full'}`}></div>
                  <div className={`absolute ${index % 2 === 0 ? 'bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-tr-full' : 'bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-tl-full'}`}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* CTA intermedio */}
      <div className="mt-16 text-center">
        <Link 
          href="/solicitar-proyecto" 
          className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <span className="mr-2">Comienza Tu Proyecto Ahora</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProcessSection; 