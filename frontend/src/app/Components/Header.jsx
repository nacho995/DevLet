'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Efecto para detectar el scroll y actualizar el valor de scrollY
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Animación de entrada del header
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto para cerrar el menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Calcular la opacidad basada en el scroll (valores entre 0.92 y 0.98)
  const opacity = Math.min(0.92 + (scrollY / 200) * 0.06, 0.98);
  // Calcular el valor de blur basado en el scroll (valores entre 0 y 4)
  const blurValue = Math.min(0 + (scrollY / 100) * 4, 4);
  // Calcular el padding basado en el scroll (valores entre 1.25rem y 0.75rem)
  const paddingY = Math.max(1.25 - (scrollY / 100) * 0.5, 0.75);

  // Rutas de navegación
  const navRoutes = [
    { name: 'Inicio', path: '/' },
    { name: 'Ejemplos', path: '/ejemplos' },
    { name: 'Nosotros', path: '/nosotros' }
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Fondo con efecto de cristal */}
      <div 
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: `linear-gradient(to right, rgba(44, 27, 76, ${opacity}), rgba(30, 41, 82, ${opacity}), rgba(25, 30, 65, ${opacity}))`,
          backdropFilter: blurValue > 0 ? `blur(${blurValue}px)` : 'none',
          borderBottom: scrollY > 10 ? '1px solid rgba(79, 70, 229, 0.15)' : 'none',
          boxShadow: scrollY > 10 ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none'
        }}
      ></div>
      
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500"></div>
      
      {/* Contenido del header */}
      <div 
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500"
        style={{
          paddingTop: `${paddingY}rem`,
          paddingBottom: `${paddingY}rem`,
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 relative group">
            <Link 
              href="/" 
              className="flex items-center transition-transform duration-300 transform group-hover:scale-105"
              aria-label="DevLet - Inicio"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-sky-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image 
                src="/DevletBrillanteSinFondo.png" 
                alt="DevLet Logo" 
                width={800} 
                height={800} 
                className="h-28 w-auto relative z-10"
                priority
              />
            </Link>
          </div>

          {/* Navegación para escritorio */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {navRoutes.map((route) => (
              <div 
                key={route.path} 
                className="relative group"
                onMouseEnter={() => setIsHovering(route.path)}
                onMouseLeave={() => setIsHovering('')}
              >
                <NavLink 
                  href={route.path} 
                  active={pathname === route.path || (route.submenu && route.submenu.some(item => pathname === item.path))}
                  hasSubmenu={!!route.submenu}
                  isHovering={isHovering === route.path}
                >
                  {route.name}
                  {route.submenu && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline-block transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </NavLink>
                
                {/* Submenú */}
                {route.submenu && (
                  <div className={`absolute left-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 transform origin-top-left ${
                    isHovering === route.path ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                  }`}>
                    <div className="py-1">
                      {route.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200 ${
                            pathname === subItem.path ? 'bg-gray-100 text-blue-600' : ''
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Botón de contacto */}
            <Link 
              href="/solicitar-proyecto" 
              className="relative ml-6 px-6 py-2.5 rounded-full overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-sky-600 group-hover:from-indigo-500 group-hover:to-sky-500 transition-colors duration-300"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600/50 to-sky-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
              <span className="absolute -inset-px rounded-full border border-white/20"></span>
              <span className="relative flex items-center justify-center text-white font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Solicitar Web
              </span>
            </Link>
          </nav>

          {/* Botón de menú móvil */}
          <div className="md:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center p-2 rounded-md text-white overflow-hidden group focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Menú principal"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
              <span className="sr-only">Abrir menú</span>
              {!isMenuOpen ? (
                <svg className="h-6 w-6 relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6 relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="relative mx-4 mt-2 mb-4 rounded-xl overflow-hidden">
          {/* Fondo con efecto de cristal */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2c1b4c]/98 to-[#191e41]/98 backdrop-blur-sm border border-indigo-500/20 rounded-xl"></div>
          
          {/* Contenido del menú */}
          <div className="relative p-4">
            {navRoutes.map((route) => (
              <div key={route.path} className="mb-2">
                <MobileNavLink 
                  href={route.path} 
                  active={pathname === route.path || (route.submenu && route.submenu.some(item => pathname === item.path))}
                  onClick={() => !route.submenu && setIsMenuOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span>{route.name}</span>
                    {route.submenu && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                </MobileNavLink>
                
                {/* Submenú móvil */}
                {route.submenu && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-indigo-500/20 pl-4">
                    {route.submenu.map((subItem) => (
                      <MobileNavLink 
                        key={subItem.path} 
                        href={subItem.path} 
                        active={pathname === subItem.path}
                        onClick={() => setIsMenuOpen(false)}
                        isSubmenu
                      >
                        {subItem.name}
                      </MobileNavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 mt-3 border-t border-indigo-500/20">
              <Link
                href="/solicitar-proyecto"
                className="block w-full py-3 px-4 rounded-lg text-center text-white font-medium bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  Solicitar Mi Página Web
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Componente para enlaces de navegación en escritorio
const NavLink = ({ href, active, children, hasSubmenu, isHovering }) => {
  return (
    <Link 
      href={hasSubmenu ? '#' : href}
      onClick={(e) => hasSubmenu && e.preventDefault()}
      className={`relative px-4 py-2 text-base font-medium transition-all duration-300 rounded-lg ${
        active 
          ? 'text-white' 
          : 'text-gray-300 hover:text-white'
      }`}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Fondo animado al hover */}
      <span 
        className={`absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-sky-500/20 rounded-lg transition-all duration-300 ${
          isHovering && !active ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      ></span>
      
      {/* Indicador de página activa */}
      {active && (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-sky-600/20 rounded-lg"></span>
          <span className="absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full transform -translate-x-1/2"></span>
        </>
      )}
    </Link>
  );
};

// Componente para enlaces de navegación en móvil
const MobileNavLink = ({ href, active, children, onClick, isSubmenu = false }) => {
  return (
    <Link
      href={href}
      className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
        isSubmenu ? 'text-sm' : ''
      } ${
        active
          ? 'bg-gradient-to-r from-indigo-600/20 to-sky-600/20 text-white'
          : 'text-gray-300 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-sky-500/10 hover:text-white'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;
