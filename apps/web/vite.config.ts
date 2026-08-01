import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // A single `.env` lives at the repository root, shared with the API.
  envDir: fileURLToPath(new URL('../../', import.meta.url)),

  // Keep the dependency cache in the one hoisted node_modules instead of
  // creating an `apps/web/node_modules` just to hold it.
  cacheDir: fileURLToPath(new URL('../../node_modules/.vite/web', import.meta.url)),

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@portfolio/contracts': fileURLToPath(
        new URL('../../packages/contracts/src/index.ts', import.meta.url),
      ),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        // Vendor code changes far less often than app code; splitting it keeps the
        // long-lived chunks cacheable across deploys.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          motion: ['framer-motion'],
          mantine: ['@mantine/core', '@mantine/hooks'],
        },
      },
    },
  },
});
