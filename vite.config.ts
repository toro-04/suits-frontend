import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // 👈 important for clean routing on Vercel
  css: {
    devSourcemap: true,
  },
  build: {
    cssCodeSplit: false, // Inline CSS to prevent FOUC
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
})
