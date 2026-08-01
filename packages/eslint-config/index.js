import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Shared base config: strict TypeScript, no `any`, no unused code.
 * @type {import('eslint').Linter.Config[]}
 */
export const baseConfig = [
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**', '**/*.d.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.node, ...globals.es2022 },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'smart'],
      'prefer-const': 'error',
      'object-shorthand': 'error',
    },
  },
];

export default baseConfig;
