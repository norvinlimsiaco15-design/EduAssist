import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  optimizeDeps: {
    entries: ['index.html', 'src/**/*.{js,jsx}'],
  },
  build: {
    rollupOptions: {
      input: path.resolve(rootDir, 'index.html'),
    },
  },
})
