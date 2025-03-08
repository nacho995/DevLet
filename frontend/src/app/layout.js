import './globals.css';
import Header from './Components/Header';

export const metadata = {
  title: 'DevLet - Desarrollo Web Profesional',
  description: 'Servicios de desarrollo web profesional, creación de sitios web y aplicaciones a medida.',
  keywords: 'desarrollo web, páginas web, aplicaciones web, diseño web',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Header />
        {children}
      </body>
    </html>
  )
}
