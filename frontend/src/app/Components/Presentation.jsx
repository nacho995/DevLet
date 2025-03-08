'use client'
import React, { useState, useEffect, useMemo } from 'react';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import ProcessSection from './ProcessSection';
import BenefitsSection from './BenefitsSection';
import CTASection from './CTASection';
import ClientReviewsSection from './ClientReviewsSection';
import useCanvasAnimation from './utils/useCanvasAnimation';

const Presentation = () => {
  // Estado para controlar la renderización del cliente
  const [isClient, setIsClient] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
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
    
    // Calcular la transición entre dos colores
    const nextColorIndex = colorIndex + 1;
    const colorRatio = (scrollPercentage * (colors.length - 1) * 0.8) - colorIndex;
    
    // Interpolar entre los dos colores
    const r = Math.round(colors[colorIndex].r + (colors[nextColorIndex].r - colors[colorIndex].r) * colorRatio);
    const g = Math.round(colors[colorIndex].g + (colors[nextColorIndex].g - colors[colorIndex].g) * colorRatio);
    const b = Math.round(colors[colorIndex].b + (colors[nextColorIndex].b - colors[colorIndex].b) * colorRatio);
    
    return `rgba(${r}, ${g}, ${b}, ${isDarkMode ? 'var(--canvas-particle-opacity)' : '1'})`;
  };

  // Usar el hook de animación de canvas con un color inicial
  const { canvasRef, scrollPosition, updateColor } = useCanvasAnimation(
    isDarkMode ? 'rgba(99, 90, 255, var(--canvas-particle-opacity))' : 'rgba(79, 70, 229, 1)'
  );

  // Actualizar el color basado en el scroll
  useEffect(() => {
    if (isClient) {
      const newColor = getColorFromScroll(scrollPosition);
      updateColor(newColor);
    }
  }, [scrollPosition, isDarkMode, isClient, updateColor]);

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

  // Detectar cuando el componente está en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calcular la altura del header para el padding
  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    if (isClient) {
      calculateHeaderHeight();
      window.addEventListener('resize', calculateHeaderHeight);
      
      return () => {
        window.removeEventListener('resize', calculateHeaderHeight);
      };
    }
  }, [isClient]);

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
        <HeroSection />

        {/* Sección de Servicios */}
        <ServicesSection />

        {/* Sección "Cómo Funciona" */}
        <ProcessSection />

        {/* Sección de Beneficios */}
        <BenefitsSection />
        
        {/* Sección de Reseñas */}
        <div className="relative z-50">
          <ClientReviewsSection />
        </div>
            
        {/* CTA final */}
        <CTASection />
      </div>
    </section>
  );
};

export default Presentation;
