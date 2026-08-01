import reactConfig from '@portfolio/eslint-config/react';

export default [
  ...reactConfig,
  {
    ignores: ['dist/**', 'playwright-report/**', 'test-results/**'],
  },
];
