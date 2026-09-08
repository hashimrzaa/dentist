import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Keep the animation libraries out of the initial React chunk so the
        // first paint stays light; sections import them where they are used.
        manualChunks: {
          react: ['react', 'react-dom'],
          gsap: ['gsap', 'gsap/ScrollTrigger'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
