import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: './postcss.config.cjs'
  },
  server: {
    port: 5179, // Match the port your browser is using
    strictPort: true, // Don't try another port if 5179 is already in use
    hmr: {
      clientPort: 5179 // Ensure WebSocket connections use the same port
    }
  }
})
