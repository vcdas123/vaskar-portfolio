import { defineConfig, devices } from '@playwright/test';

/** The five viewports the conversion brief requires. */
export const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 1000 },
  { name: 'tablet-1024', width: 1024, height: 1366 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-320', width: 320, height: 700 },
] as const;

export const WEB_BASE_URL = process.env.PLAYWRIGHT_WEB_URL ?? 'http://localhost:5173';
export const API_BASE_URL = process.env.PLAYWRIGHT_API_URL ?? 'http://localhost:4100/api';

export default defineConfig({
  testDir: './tests/visual',
  globalSetup: './tests/visual/global-setup.ts',
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],

  timeout: 60_000,
  expect: {
    // Font rasterisation differs slightly between runs; a small per-pixel
    // tolerance keeps the comparison meaningful without being flaky.
    toHaveScreenshot: { maxDiffPixelRatio: 0, threshold: 0, animations: 'disabled' },
  },

  use: {
    baseURL: WEB_BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    // Deterministic rendering for pixel comparison.
    colorScheme: 'dark',
    deviceScaleFactor: 1,
    // Parity screenshots run with reduced motion, which makes `useEntrance`
    // render every block in its final state on first paint. The comparison then
    // measures the reference layout instead of an arbitrary animation frame.
    contextOptions: { reducedMotion: 'reduce' },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], deviceScaleFactor: 1 },
    },
  ],
});
