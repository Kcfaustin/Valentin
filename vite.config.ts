
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Remplace process.env.API_KEY par la valeur réelle de Hostinger pendant le build
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  },
  base: './', // Utilise des chemins relatifs pour éviter les problèmes de page blanche sur Hostinger
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
