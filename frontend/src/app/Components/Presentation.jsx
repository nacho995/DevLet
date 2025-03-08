'use client'
import React, { useState, useEffect, useMemo } from 'react';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import ProcessSection from './ProcessSection';
import BenefitsSection from './BenefitsSection';
import CTASection from './CTASection';
import useCanvasAnimation from './utils/useCanvasAnimation';

const Presentation = () => {
  // Estado para controlar la renderización del cliente
  const [isClient, setIsClient] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    services: false,
    benefits: false,
    cta: false
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Calcular el color basado en el scroll
  const getColorFromScroll = (scrollPos) => {
    // Definir colores para diferentes secciones de la página
    // Colores más brillantes para modo oscuro
    const colors = isDarkMode ? [
      { r: 99, g: 90, b: 255 },   // Indigo más brillante
      { r: 129, g: 132, b: 255 },  // Azul más brillante
      { r: 169, g: 122, b: 255 },  // Púrpura más brillante
      { r: 89, g: 160, b: 255 },  // Azul cielo más brillante
      { r: 46, g: 215, b: 159 }   // Esmeralda más brillante
    ] : [
      { r: 79, g: 70, b: 229 },   // Indigo (inicio)
      { r: 99, g: 102, b: 241 },  // Azul
      { r: 139, g: 92, b: 246 },  // Púrpura
      { r: 59, g: 130, b: 246 },  // Azul cielo
      { r: 16, g: 185, b: 129 }   // Esmeralda (final)
    ];
    
    // Calcular el índice de color basado en el scroll
    // Aumentar maxScroll para hacer el cambio de color más gradual
    const maxScroll = 6000; // Aumentado de 3000 a 6000 para un cambio más lento
    
    // Reducir la sensibilidad del scroll aplicando una función de suavizado
    // Esto hace que el cambio de color sea más gradual al principio y al final
    const scrollPercentage = Math.min(Math.pow(scrollPos / maxScroll, 0.8), 1);
    
    // Reducir el multiplicador para hacer el cambio entre colores más lento
    const colorIndex = Math.min(
      Math.floor(scrollPercentage * (colors.length - 1) * 0.8), // Reducido de 1.2 a 0.8
      colors.length - 2
    );
    
    // Calcular el porcentaje entre los dos colores
    const colorPercentage = (scrollPercentage * (colors.length - 1) * 0.8) - colorIndex; // Reducido de 1.2 a 0.8
    
    // Interpolar entre los dos colores
    const r = Math.round(colors[colorIndex].r + colorPercentage * (colors[colorIndex + 1].r - colors[colorIndex].r));
    const g = Math.round(colors[colorIndex].g + colorPercentage * (colors[colorIndex + 1].g - colors[colorIndex].g));
    const b = Math.round(colors[colorIndex].b + colorPercentage * (colors[colorIndex + 1].b - colors[colorIndex].b));
    
    // Usar opacidad variable según el modo
    const opacity = isDarkMode ? 'var(--canvas-particle-opacity)' : '1';
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Usar el hook de animación de canvas con un color inicial
  const { canvasRef, scrollPosition, updateColor } = useCanvasAnimation(
    // Usamos un color inicial
    isDarkMode ? 'rgba(99, 90, 255, var(--canvas-particle-opacity))' : 'rgba(79, 70, 229, 1)'
  );
  
  // Actualizar el color cuando scrollPosition cambie
  useEffect(() => {
    if (scrollPosition > 0) {
      const newColor = getColorFromScroll(scrollPosition);
      updateColor(newColor);
    }
  }, [scrollPosition, updateColor, isDarkMode]);

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
    
    // Usar addEventListener para compatibilidad con todos los navegadores
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback para navegadores antiguos
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

  // Efecto para marcar cuando estamos en el cliente y calcular la altura del header
  useEffect(() => {
    setIsClient(true);
    
    // Función para calcular la altura del header
    const calculateHeaderHeight = () => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        const height = headerElement.offsetHeight;
        setHeaderHeight(height);
      }
    };
    
    // Calcular inicialmente y luego en cada resize
    calculateHeaderHeight();
    window.addEventListener('resize', calculateHeaderHeight);

    // Configurar animaciones de entrada
    setTimeout(() => {
      setIsVisible(prev => ({ ...prev, hero: true }));
      
      setTimeout(() => {
        setIsVisible(prev => ({ ...prev, services: true }));
        
        setTimeout(() => {
          setIsVisible(prev => ({ ...prev, benefits: true }));
          
          setTimeout(() => {
            setIsVisible(prev => ({ ...prev, cta: true }));
          }, 400);
        }, 400);
      }, 400);
    }, 100);
    
    // Limpiar event listeners
    return () => {
      window.removeEventListener('resize', calculateHeaderHeight);
    };
  }, []);

  return (
    <section 
      className="relative overflow-hidden pb-20"
      style={{ paddingTop: `${headerHeight}px` }}
    >
      {/* Canvas interactivo para toda la página */}
      <div className="fixed inset-0 w-full h-full z-0 canvas-container">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
        />
      </div>

      {/* Contenido principal con z-index para estar por encima del canvas */}
      <div className="relative z-10">
        {/* Sección Hero */}
        <HeroSection isVisible={isVisible.hero} />

        {/* Sección de Servicios */}
        <div 
          className={`container relative mx-auto px-4 sm:px-6 lg:px-8 mt-32 transition-all duration-1000 transform ${
            isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
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
          
          <ServicesSection isVisible={isVisible.services} />
        </div>

        {/* Sección "Cómo Funciona" */}
        <ProcessSection isVisible={isVisible.services} />

        {/* Sección de Beneficios */}
        <BenefitsSection isVisible={isVisible.benefits} />
            
        {/* CTA final */}
        <CTASection isVisible={isVisible.cta} />
      </div>
    </section>
  );
};

export default Presentation;
