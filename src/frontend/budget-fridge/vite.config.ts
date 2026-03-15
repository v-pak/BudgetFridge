import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || 'http://localhost:3200',
        changeOrigin: true
      }
    }
  }
})