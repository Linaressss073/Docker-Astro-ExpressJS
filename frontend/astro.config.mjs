import { defineConfig } from 'astro/config';
import astroIcon from 'astro-icon';

export default defineConfig({
  site: 'http://localhost:4321', // o la URL de producción si ya está desplegado
  integrations: [astroIcon()],
  server: {
    host: '0.0.0.0',
    port: 4321
  }
});
