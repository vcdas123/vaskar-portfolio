import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envDir: fileURLToPath(new URL('../../', import.meta.url)),
  cacheDir: fileURLToPath(new URL('../../node_modules/.vite/web-tests', import.meta.url)),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@portfolio/contracts': fileURLToPath(
        new URL('../../packages/contracts/src/index.ts', import.meta.url),
      ),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['tests/setup.ts'],
    // Playwright owns `tests/visual`; Vitest must not try to run those specs.
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    css: false,
  },
});
