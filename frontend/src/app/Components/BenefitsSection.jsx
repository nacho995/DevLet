'use client'
import React, { useState, useEffect } from 'react';
import { benefits, stats } from './data/websiteData';

const BenefitsSection = ({ isVisible = true }) => {
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
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`inline-block px-4 py-1 rounded-full ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-300' 
              : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600'
          } text-sm font-medium mb-4 backdrop-blur-sm`}>
            Ventajas
          </span>
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Beneficios de Tener una Web Profesional
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mt-6`}>
            Descubre cómo una página web bien diseñada puede transformar tu negocio
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="relative transition-all duration-700 transform group"
            >
              <div className="relative overflow-hidden rounded-2xl h-full">
                {/* Fondo con efecto de vidrio */}
                <div className={`absolute inset-0 ${
                  isDarkMode 
                    ? 'bg-gray-800/70 border-gray-700/50' 
                    : 'bg-white/20 border-white/30'
                } backdrop-blur-md border group-hover:bg-opacity-40 transition-all duration-300`}></div>
                
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20' 
                      : 'bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10'
                  }`}></div>
                  <div className="absolute -inset-[100%] animate-[spin_15s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md"></div>
                </div>
                
                <div className="relative z-10 p-6 flex flex-col h-full">
                  <div className="flex items-start gap-6">
                    {/* Icono con efecto */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full ${
                        isDarkMode 
                          ? 'bg-gray-700/70 border-gray-600/70 text-blue-300' 
                          : 'bg-white/30 border-white/50 text-gray-800'
                      } backdrop-blur-md border flex items-center justify-center text-3xl shadow-lg`}>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 animate-pulse"></div>
                        <span className="relative z-10">{benefit.icon}</span>
                      </div>
                      <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Contenido */}
                    <div className="flex-grow">
                      <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{benefit.title}</h3>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{benefit.description}</p>
                      
                      {/* Resultado destacado */}
                      <div className={`mb-4 inline-block px-3 py-1 rounded-full ${
                        isDarkMode 
                          ? 'bg-blue-500/40 text-white font-bold shadow-md' 
                          : 'bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-blue-800 font-bold shadow-md'
                      } text-sm`}>
                        {benefit.result}
                      </div>
                      
                      {/* Ejemplo práctico */}
                      <div className={`relative p-4 rounded-xl ${
                        isDarkMode 
                          ? 'bg-gray-200 border-gray-300 text-gray-900' 
                          : 'bg-white/30 border-white/20'
                      } backdrop-blur-sm border`}>
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-300/30 to-transparent"></div>
                        <p className={`${isDarkMode ? 'text-gray-900' : 'text-gray-700'} text-base md:text-lg italic`}>"{benefit.example}"</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Elementos decorativos */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-tr-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Estadísticas de resultados */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={`${
              isDarkMode 
                ? 'bg-gray-800 text-white shadow-lg shadow-indigo-500/10' 
                : 'bg-white text-gray-800 shadow-md'
            } rounded-xl p-6 text-center`}>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection; 