'use client'
import { useState, useEffect, useRef } from 'react';

const useCanvasAnimation = (initialColorScheme = null) => {
  // Referencias básicas
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const colorSchemeRef = useRef(initialColorScheme);
  const scrollYRef = useRef(0);
  const lastScrollYRef = useRef(0);
  
  // Estados
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Actualizar esquema de color cuando cambie
  useEffect(() => {
    colorSchemeRef.current = initialColorScheme;
  }, [initialColorScheme]);

  // Detectar modo oscuro
  useEffect(() => {
    if (!isClient) return;
    
    const checkDarkMode = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);
    
    return () => mediaQuery.removeEventListener('change', checkDarkMode);
  }, [isClient]);

  // Efecto principal
  useEffect(() => {
    setIsClient(true);
    
    // Manejar scroll
    const handleScroll = () => {
      const currentY = window.scrollY;
      lastScrollYRef.current = scrollYRef.current;
      scrollYRef.current = currentY;
      setScrollPosition(currentY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Efecto para la animación del canvas
  useEffect(() => {
    if (!isClient || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Ajustar tamaño del canvas
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      initParticles();
    };
    
    // Inicializar partículas
    const initParticles = () => {
      // Determinar número de partículas según el tamaño de pantalla
      const width = window.innerWidth;
      const particleCount = width < 768 ? 40 : width < 1024 ? 60 : 80;
      
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // Partículas más grandes en modo oscuro
          size: Math.random() * (isDarkMode ? 4 : 3) + (isDarkMode ? 2 : 1),
          speedX: (Math.random() * 2 - 1) * 0.2,
          speedY: (Math.random() * 2 - 1) * 0.2,
          color: getRandomColor(),
          initialX: 0, // Se establecerá después
          initialY: 0, // Se establecerá después
        });
      }
      
      // Guardar posiciones iniciales
      particlesRef.current.forEach(p => {
        p.initialX = p.x;
        p.initialY = p.y;
      });
    };
    
    // Obtener color aleatorio
    const getRandomColor = () => {
      if (colorSchemeRef.current) return colorSchemeRef.current;
      
      const colors = isDarkMode ? [
        'rgba(150, 140, 255, 0.6)', // Indigo más brillante con opacidad reducida
        'rgba(180, 180, 255, 0.6)', // Azul más brillante con opacidad reducida
        'rgba(210, 160, 255, 0.6)', // Púrpura más brillante con opacidad reducida
        'rgba(255, 140, 220, 0.6)', // Rosa más brillante con opacidad reducida
      ] : [
        'rgba(79, 70, 229, 0.3)', // Indigo con opacidad reducida
        'rgba(99, 102, 241, 0.3)', // Azul con opacidad reducida
        'rgba(139, 92, 246, 0.3)', // Púrpura con opacidad reducida
      ];
      
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    // Manejar movimiento del mouse
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    // Función de animación
    const animate = () => {
      // Limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calcular efecto de scroll
      const scrollDiff = scrollYRef.current - lastScrollYRef.current;
      const scrollEffect = scrollDiff * 0.02; // Factor de scroll sutil
      
      // Dibujar partículas
      particlesRef.current.forEach(particle => {
        // Movimiento normal
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Aplicar efecto de scroll muy sutil
        particle.y -= scrollEffect;
        
        // Rebote en los bordes
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Interacción con el mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x -= dx * force * 0.02;
          particle.y -= dy * force * 0.02;
        }
        
        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Dibujar conexiones entre partículas cercanas
      ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)';
      ctx.lineWidth = isDarkMode ? 0.8 : 0.5;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    // Inicializar
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    animate();
    
    // Limpiar
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isClient, isDarkMode]);

  // Función para actualizar el color desde fuera del hook
  const updateColor = (newColor) => {
    colorSchemeRef.current = newColor;
  };

  return {
    canvasRef,
    isClient,
    scrollPosition,
    updateColor
  };
};

export default useCanvasAnimation; 