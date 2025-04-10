import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import viteImagemin from 'vite-plugin-imagemin'
import { configDefaults } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 80
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      },
      webp: {
        quality: 80
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: './postcss.config.cjs'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    transformMode: {
      web: [/\.[jt]sx$/]
    }
  },
  server: {
    // Don't specify a port to let Vite choose an available one
    strictPort: false,
    hmr: {
      // Disable HMR completely to prevent WebSocket errors
      protocol: 'ws',
      host: 'localhost',
      clientPort: null,
      overlay: false // Disable the error overlay
    }
  },

  // Build optimization options
  build: {
    // Generate hashed filenames for better caching
    rollupOptions: {
      output: {
        // Chunk files by type
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Group node_modules into vendor chunk
            if (id.includes('vue') || id.includes('router')) {
              return 'vendor-vue';
            } else if (id.includes('gsap')) {
              return 'vendor-gsap';
            } else {
              return 'vendor';
            }
          } else if (id.includes('/components/')) {
            // Group components by type
            if (id.includes('/sections/')) {
              return 'components-sections';
            } else if (id.includes('/ui/')) {
              return 'components-ui';
            } else {
              return 'components';
            }
          }
        },
        // Use hashed filenames
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // Enable source maps in production for debugging
    sourcemap: mode === 'production' ? 'hidden' : true,
    // Minify the output
    minify: mode === 'production' ? 'terser' : false,
    // Terser options
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production'
      }
    }
  }
}));
