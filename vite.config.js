import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/solar': {
        target: 'https://api.le-systeme-solaire.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/solar/, '/rest'),
      },
      '/api/nasa': {
        target: 'https://api.nasa.gov',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/nasa/, ''),
      },
      '/api/wiki': {
        target: 'https://en.wikipedia.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wiki/, '/api/rest_v1'),
      },
    },
  },
})
