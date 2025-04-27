import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: './tsconfig.json'
      },
      globals: {
        React: 'readonly',
        JSX: 'readonly'
      }
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {}
      }
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      prettier: prettierPlugin
    },
    rules: {
      // TypeScript specific
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports'
      }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',

      // React specific
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', {
        props: 'never',
        children: 'never'
      }],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-target-blank': 'error',
      'react/jsx-pascal-case': 'error',
      'react/self-closing-comp': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import rules
      'import/order': ['error', {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type'
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true }
      }],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',
      'import/first': 'error',
      'import/no-cycle': 'error',

      // General best practices
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-alert': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
      'curly': ['error', 'all'],
      'no-unused-expressions': ['error', {
        allowShortCircuit: true,
        allowTernary: true
      }],
      'no-param-reassign': 'error',
      'no-nested-ternary': 'warn',
      'no-multiple-empty-lines': ['error', {
        max: 1,
        maxEOF: 0
      }],
      'no-duplicate-imports': 'error',
      'no-template-curly-in-string': 'error',
      'prefer-template': 'error',
      'prefer-destructuring': ['error', {
        array: false,
        object: true
      }],
      'padding-line-between-statements': [
        'error',
        { 'blankLine': 'always', 'prev': '*', 'next': 'return' },
        { 'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*' },
        { 'blankLine': 'any', 'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var'] }
      ],
      'prettier/prettier': ['error', {
        endOfLine: 'auto',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5'
      }]
    }
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '**/*.config.*']
  }
);