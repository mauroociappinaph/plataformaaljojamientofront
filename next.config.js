/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "randomuser.me",
      "placehold.co",
      "example.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com", // Para avatares de Google
      "avatars.githubusercontent.com", // Para avatares de GitHub
      "platform-lookaside.fbsbx.com", // Para avatares de Facebook
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Otras configuraciones para evitar errores en el build
  eslint: {
    // Ignorar errores de ESLint durante el build para desarrollo
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorar errores de TypeScript durante el build para desarrollo
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
