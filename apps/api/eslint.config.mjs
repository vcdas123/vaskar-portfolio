import baseConfig from '@portfolio/eslint-config';

export default [
  ...baseConfig,
  {
    files: ['prisma/seed.ts'],
    rules: { 'no-console': 'off' },
  },
];
