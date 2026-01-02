/**
 * Storybook Web Configuration
 *
 * This is the main configuration file for Storybook on the web platform.
 * It configures:
 * - Story file discovery and loading
 * - Webpack module resolution and aliases
 * - Babel transpilation for TypeScript and JSX
 * - PostCSS processing for Tailwind CSS
 * - Storybook addons
 *
 * The configuration uses ES modules (import/export) and requires Node.js
 * to define __dirname for this modern module system.
 *
 * @see {@link https://storybook.js.org/docs/react/configure/overview}
 */

import type { StorybookConfig } from '@storybook/react-webpack5'
import type { TransformOptions } from '@babel/core'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Get the directory path of the current file in ES modules.
 * This is necessary because __dirname is not defined in ES modules by default.
 *
 * @see {@link https://nodejs.org/api/esm.html#esm_no_filename_or_dirname}
 */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Storybook configuration object.
 *
 * Configuration for the React web platform using Webpack 5.
 * Includes story discovery, addon setup, and build tool configuration.
 */
const config: StorybookConfig = {
  /**
   * Story file discovery pattern.
   *
   * Discovers story files in any subdirectory of src/ that match:
   * - .stories.js (JavaScript)
   * - .stories.jsx (React)
   * - .stories.ts (TypeScript)
   * - .stories.tsx (React with TypeScript)
   * - .stories.mdx (MDX documentation)
   *
   * This allows co-locating stories with their components.
   * Example: src/web/components/Button/Button.stories.tsx
   */
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],

  /**
   * Storybook addons.
   *
   * - @storybook/addon-docs: Enables the Docs tab and automatic documentation generation
   * - @storybook/addon-links: Provides Story linking functionality
   *
   * Built-in essentials (controls, actions, viewport, backgrounds) are included automatically.
   *
   * @see {@link https://storybook.js.org/docs/react/addons/addon-list}
   */
  addons: ['@storybook/addon-docs', '@storybook/addon-links'],

  /**
   * Framework configuration.
   *
   * Uses @storybook/react-webpack5 which provides:
   * - React component support
   * - Webpack 5 bundling
   * - Fast development server
   */
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  /**
   * TypeScript configuration.
   *
   * - reactDocgen: 'react-docgen-typescript' auto-generates component documentation
   *   from TypeScript prop types and JSDoc comments
   * - check: false disables type-checking during Storybook startup for faster builds
   *   (type-checking should be done separately via `npm run type-check`)
   */
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    check: false,
  },

  /**
   * Babel configuration function.
   *
   * Configures Babel presets for transpiling:
   * - @babel/preset-env: Transpiles modern JavaScript to browser-compatible code
   *   targets: '>0.25%' market share and browsers that are not dead
   * - @babel/preset-react: Transforms JSX with automatic runtime (no React import needed)
   * - @babel/preset-typescript: Strips TypeScript type annotations
   *
   * @see {@link https://babeljs.io/docs/presets}
   */
  babel: async (options: TransformOptions) => ({
    ...options,
    presets: [
      ['@babel/preset-env', { targets: { browsers: ['>0.25%', 'not dead'] } }],
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
  }),
  /**
   * Webpack configuration function.
   *
   * Customises the default Webpack configuration for:
   * 1. Module resolution (aliases, extensions)
   * 2. Babel loader for TypeScript/JSX
   * 3. PostCSS loader for Tailwind CSS
   *
   * This function is called during Storybook's Webpack build process.
   * The config object is modified in place and returned.
   *
   * @see {@link https://storybook.js.org/docs/react/builders/webpack#custom-webpack-config}
   */
  webpackFinal: async (config) => {
    // ========================================
    // Module Resolution Configuration
    // ========================================

    // Ensure resolve object exists
    config.resolve = config.resolve || {}

    /**
     * Configure module aliases for import paths.
     *
     * - 'react-native$': Redirects 'react-native' imports to 'react-native-web'
     *   This allows cross-platform components to work in the browser.
     *   The $ suffix ensures exact matching (not partial path matching).
     *
     * - '@': Allows imports like `import Button from '@/components/Button'`
     *   Maps to the src/ directory for cleaner, more maintainable imports.
     */
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      '@': path.resolve(__dirname, '../src'),
    }

    /**
     * Configure extension resolution order.
     *
     * Prioritise web-specific extensions (.web.tsx, .web.ts) before
     * platform-agnostic extensions (.tsx, .ts). This allows components to
     * have both web and native implementations:
     *
     * Example:
     * - src/components/Button.web.tsx (web-specific)
     * - src/components/Button.native.tsx (React Native-specific)
     * - src/components/Button.tsx (shared/fallback)
     *
     * When importing Button in web Storybook, .web.tsx is preferred.
     */
    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      ...(config.resolve.extensions || []),
    ]

    // ========================================
    // Module Loaders Configuration
    // ========================================

    // Ensure module.rules exists
    config.module = config.module || { rules: [] }
    config.module.rules = config.module.rules || []

    /**
     * Add Babel loader for TypeScript and JSX files.
     *
     * This is placed at the start of the rules array (unshift) to take
     * precedence over other loaders. Babel will transpile:
     * - TypeScript: Strips type annotations
     * - JSX: Converts JSX syntax to React.createElement calls
     * - Modern JavaScript: Down-compiles to browser-compatible code
     *
     * The same Babel presets are used as in the babel config function above.
     */
    config.module.rules.unshift({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: { browsers: ['>0.25%', 'not dead'] } }],
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript',
          ],
        },
      },
    })

    // ========================================
    // PostCSS Configuration for Tailwind CSS
    // ========================================

    /**
     * Find the existing CSS rule and add PostCSS loader.
     *
     * Webpack's default CSS loader chain is:
     * style-loader → css-loader → [we add postcss-loader here]
     *
     * PostCSS processes CSS with the configuration from postcss.config.mjs,
     * which includes @tailwindcss/postcss for Tailwind CSS 4 support.
     *
     * Type assertion is used because the rules array has loose typing.
     */
    const rules = config.module.rules as Array<{ test?: RegExp; use?: unknown[] }>
    const cssRuleIndex = rules.findIndex(
      (rule) => rule && rule.test && rule.test.toString().includes('css')
    )

    if (cssRuleIndex !== -1) {
      const cssRule = rules[cssRuleIndex]
      // Verify the CSS rule has a use array and add PostCSS loader
      if (cssRule.use && Array.isArray(cssRule.use)) {
        // PostCSS loader processes CSS through postcss.config.mjs
        // This enables Tailwind CSS, autoprefixer, and other PostCSS plugins
        cssRule.use.push({
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: path.resolve(__dirname, '../postcss.config.mjs'),
            },
          },
        })
      }
    }

    return config
  },
}

export default config
