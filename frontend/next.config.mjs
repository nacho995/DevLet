/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  webpack: (config, { dev, isServer }) => {
    // Configuración de webpack
    return config;
  },
  // Configuración para evitar problemas de hidratación
  reactStrictMode: true,
};

export default nextConfig;
