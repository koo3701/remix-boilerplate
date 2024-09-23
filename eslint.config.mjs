// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import { FlatCompat } from '@eslint/eslintrc';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';

import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginTypeScript from 'typescript-eslint';
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginImportAlias from '@limegrass/eslint-plugin-import-alias';
import vitest from "@vitest/eslint-plugin";
import eslintConfigPrettier from 'eslint-config-prettier';

const compat = new FlatCompat();

export default tseslint.config(
  {
    ignores: ['node_modules', '.pnpm-store', '.cache', 'build', '.env'],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2015,
      },
    },
  },
  eslint.configs.recommended,

  // React
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      // @ts-ignore
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
    },
    extends: [
      eslintPluginReact.configs.flat.recommended,
      eslintPluginReact.configs.flat['jsx-runtime'],
      eslintPluginJsxA11y.flatConfigs.recommended,
      ...eslintPluginTailwindcss.configs['flat/recommended']
    ],
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
      'import-x/resolver': {
        typescript: {},
      },
    },
    // @ts-ignore
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          enableDangerousAutofixThisMayCauseInfiniteLoops: true,
        },
      ],
      'import/prefer-default-export': 'off',
    },
  },

  // TypeScript
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...eslintPluginTypeScript.configs.recommended,
      eslintPluginImportX.flatConfigs.recommended,
      ...compat.extends('plugin:@limegrass/import-alias/recommended'),
    ],
    plugins: {
      'unused-imports': eslintPluginUnusedImports,
      '@limegrass/import-alias': eslintPluginImportAlias,
    },
    settings: {
      'import-x/internal-regex': '^((@(components|routes|hooks|lib)?)|~)/',
      'import-x/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'valibot',
              message: 'Use @lib/valibot',
            },
          ],
        },
      ],
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'object',
            'type',
            'index',
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: '@remix-run/*',
              group: 'builtin',
              position: 'after',
            },
            {
              pattern: '{react,react-dom/*}',
              group: 'builtin',
              position: 'after',
            },
            {
              pattern: '@conform-to/*',
              group: 'builtin',
              position: 'after',
            },
            {
              pattern: '{conform-to-valibot,@lib/valibot}',
              group: 'builtin',
              position: 'after',
            },
            {
              pattern: 'tailwind-variants',
              group: 'builtin',
              position: 'after',
            },
            {
              pattern: 'clsx',
              group: 'builtin',
              position: 'after',
            },
            {
              pattern: '@components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@routes/**',
              group: 'internal',
              position: 'before',
            },
          ],
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      'unused-imports/no-unused-imports': 'error',
    },
  },

  // Testing
  {
    files: ['**/*.test.{js,jsx,ts,tsx}'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
    settings: {
      vitest: {
        typecheck: true
      }
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
  eslintConfigPrettier
);
