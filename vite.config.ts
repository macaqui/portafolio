import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// Configuración de Vite — https://vitejs.dev/config/
export default defineConfig({
  // Rutas relativas: así el build funciona igual servido desde la raíz,
  // desde un subdirectorio (GitHub Pages) o abierto con doble clic (file://).
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    // Permite importar desde "@/..." en lugar de rutas relativas largas.
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
