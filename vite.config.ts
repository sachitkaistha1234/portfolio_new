import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion', 'aos'],
          forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
          icons: ['lucide-react'],
          utils: ['react-intersection-observer', 'react-hot-toast']
        },
      },
    },
    // Enable code splitting
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'react-intersection-observer',
      'react-hook-form',
      '@hookform/resolvers/yup',
      'yup',
      'react-hot-toast',
      'aos'
    ],
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  // Performance optimizations
  esbuild: {
    // Remove console logs in production
    drop: ['console', 'debugger'],
  },
  // Image optimization
  assetsInclude: ['**/*.webp', '**/*.avif'],
});