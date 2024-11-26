import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      'picocss': path.resolve(__dirname, '../node_modules/@picocss/pico/css')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      },
      '/exterior': {
        target: 'http://localhost:3000'
      },
      '/hood': {
        target: 'http://localhost:3000'
      },
      '/interior': {
        target: 'http://localhost:3000'
      },
      '/restriction': {
        target: 'http://localhost:3000'
      },
      '/spoiler': {
        target: 'http://localhost:3000'
      },
      '/wheels': {
        target: 'http://localhost:3000'
      },
      '/cars': {
        target: 'http://localhost:3000'
      }
    }
  }
})
