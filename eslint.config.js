import path from 'node:path'
import js from '@eslint/js'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'

const layerPath = (segment) => path.resolve(import.meta.dirname, 'src', segment)

const fsdZones = [
  // shared cannot depend on anything else
  { target: layerPath('entities'), from: layerPath('shared') },
  { target: layerPath('features'), from: layerPath('shared') },
  { target: layerPath('widgets'), from: layerPath('shared') },
  { target: layerPath('pages'), from: layerPath('shared') },
  { target: layerPath('app'), from: layerPath('shared') },

  // entities cannot depend on features/widgets/pages/app
  { target: layerPath('features'), from: layerPath('entities') },
  { target: layerPath('widgets'), from: layerPath('entities') },
  { target: layerPath('pages'), from: layerPath('entities') },
  { target: layerPath('app'), from: layerPath('entities') },

  // features cannot depend on widgets/pages/app
  { target: layerPath('widgets'), from: layerPath('features') },
  { target: layerPath('pages'), from: layerPath('features') },
  { target: layerPath('app'), from: layerPath('features') },

  // widgets cannot depend on pages/app
  { target: layerPath('pages'), from: layerPath('widgets') },
  { target: layerPath('app'), from: layerPath('widgets') },

  // pages cannot depend on app
  { target: layerPath('app'), from: layerPath('pages') },
]

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: path.resolve(import.meta.dirname, 'tsconfig.app.json'),
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      'import/no-restricted-paths': ['error', { zones: fsdZones }],
    },
  },
  // Public API only: block deep imports into shared segments from outside shared
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/shared/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/shared/*/*', 'shared/*/*', '**/shared/*/*'],
              message:
                'Use shared segment public API only (e.g., "@/shared/ui" instead of deep path)',
            },
          ],
        },
      ],
    },
  },
  // Entities: external imports only via "@/entities/<Slice>"
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/entities/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/entities/*/*', 'entities/*/*', '**/entities/*/*'],
              message:
                'Import entities via public API "@/entities/<Slice>" (no deep paths)',
            },
          ],
        },
      ],
    },
  },
  // Features: external imports only via "@/features/<Feature>" or "@/features/<feature>/<segment>"
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/features/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/features/*/*/*',
                'features/*/*/*',
                '**/features/*/*/*',
              ],
              message:
                'Import features via public API barrel (e.g., "@/features/Auth" or "@/features/auth/login")',
            },
          ],
        },
      ],
    },
  },
  // Widgets: external imports only via "@/widgets/<Widget>"
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/widgets/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/widgets/*/*', 'widgets/*/*', '**/widgets/*/*'],
              message: 'Import widgets via public API "@/widgets/<Widget>"',
            },
          ],
        },
      ],
    },
  },
  // Pages: external imports only via "@/pages/<Page>"
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/pages/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/pages/*/*', 'pages/*/*', '**/pages/*/*'],
              message: 'Import pages via public API "@/pages/<Page>"',
            },
          ],
        },
      ],
    },
  },
])
