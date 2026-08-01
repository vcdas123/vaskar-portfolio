import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/**
 * `@portfolio/contracts` resolves through the workspace symlink to its built
 * `dist` output — the same resolution the running server uses, so tests cannot
 * pass against a source tree the server would not load.
 */
export default defineConfig({
  // Keeps the dep cache in the hoisted node_modules rather than creating an
  // `apps/api/node_modules` just to hold it.
  cacheDir: fileURLToPath(new URL('../../node_modules/.vite/api-tests', import.meta.url)),

  test: {
    environment: 'node',
    globals: false,
    include: ['tests/**/*.test.ts'],
    setupFiles: ['tests/setup.ts'],
    testTimeout: 20_000,
    hookTimeout: 30_000,
    // Integration tests share one Postgres database; a single fork keeps their
    // writes ordered and avoids cross-test interference.
    pool: 'forks',
    poolOptions: { forks: { singleFork: true } },
  },
});
