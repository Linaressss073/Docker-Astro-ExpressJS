import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import astroIcon from 'astro-icon';

export default defineConfig({
  site: 'http://localhost:4321', // o la URL de producción si ya está desplegado
  integrations: [astroIcon()],
  server: {
    host: '0.0.0.0',
    port: 4321
  },
  output:'server',
   proxy: {
      // Configuración para redirigir solicitudes API al backend
      '/api': {
        target: 'http://localhost:5000', // Puerto donde corre Express
        changeOrigin: true,
        secure: false
      }
  },
  vite:  {
    plugins:[tailwindcss()]
  }
});

