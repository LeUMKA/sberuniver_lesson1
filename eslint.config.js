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

// Allowed dependency direction: app -> pages -> widgets -> features -> entities -> shared
const forbiddenDeps = {
  shared: ['entities', 'features', 'widgets', 'pages', 'app'],
  entities: ['features', 'widgets', 'pages', 'app'],
  features: ['widgets', 'pages', 'app'],
  widgets: ['pages', 'app'],
  pages: ['app'],
}

const fsdZones = Object.entries(forbiddenDeps).flatMap(([importerLayer, forbidden]) =>
  forbidden.map((blockedLayer) => ({
    // Files inside importerLayer must not import from blockedLayer
    target: layerPath(importerLayer),
    from: layerPath(blockedLayer),
    except:
      blockedLayer === 'app' && ['features', 'pages', 'widgets'].includes(importerLayer)
        ? ['./index.ts', './store/hooks.ts']
        : [],
  })),
)

const publicApiLayers = [
  {
    layer: 'shared',
    sliceDepth: 2, // e.g., shared/ui/Buttons is the public entry, anything deeper is internal
    message: 'Use shared public API (e.g., "@/shared/ui/Buttons")',
  },
  {
    layer: 'entities',
    sliceDepth: 1,
    message: 'Import entities via public API "@/entities/<slice>"',
  },
  {
    layer: 'features',
    sliceDepth: 1,
    message: 'Import features via public API "@/features/<slice>"',
  },
  {
    layer: 'widgets',
    sliceDepth: 1,
    message: 'Import widgets via public API "@/widgets/<slice>"',
  },
  {
    layer: 'pages',
    sliceDepth: 1,
    message: 'Import pages via public API "@/pages/<page>"',
  },
]

const publicApiPatterns = (layer, sliceDepth) => {
  const base = sliceDepth === 2 ? `${layer}/*/*/**` : `${layer}/*/**`
  return [`@/${base}`, base, `**/${base}`]
}

const publicApiRules = publicApiLayers.map(({ layer, sliceDepth, message }) => ({
  files: ['src/**/*.{ts,tsx}'],
  ignores: [`src/${layer}/**/*`],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: publicApiPatterns(layer, sliceDepth),
            message,
          },
        ],
      },
    ],
  },
}))

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
  ...publicApiRules,
])
