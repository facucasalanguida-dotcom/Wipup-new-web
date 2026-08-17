/**
 * El sitio no usa rutas de API, server actions ni renderizado dinámico, así que
 * puede exportarse como HTML estático y servirse desde un Apache/Nginx común.
 *
 * `STATIC_EXPORT=true npm run build` genera la carpeta `out/` lista para subir
 * por FTP. Sin esa variable el build es el normal de Vercel, que conserva la
 * optimización de imágenes de Next (no disponible en un export estático).
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport && {
    output: "export",
    // El optimizador de imágenes necesita un servidor Node; en estático se sirven tal cual.
    images: { unoptimized: true },
    // Genera `productos/index.html` en vez de `productos.html`, que es lo que
    // Apache resuelve solo cuando la URL no termina en archivo.
    trailingSlash: true,
  }),
};

export default nextConfig;
