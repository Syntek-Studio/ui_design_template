/**
 * @fileoverview tsup build configuration for @syntek-studio/ui component library.
 *
 * tsup is a zero-config TypeScript bundler built on top of esbuild.
 * This configuration handles building the component library into multiple
 * module formats (CommonJS and ES Modules) with TypeScript definitions.
 *
 * Build outputs:
 *   - dist/index.js (CommonJS)
 *   - dist/index.mjs (ES Modules)
 *   - dist/index.d.ts (TypeScript definitions)
 *   - dist/index.d.ts.map (Definition source maps)
 *
 * Build process:
 *   1. Transpile TypeScript to JavaScript
 *   2. Generate both CJS and ESM formats
 *   3. Create TypeScript declaration files
 *   4. Generate source maps for debugging
 *   5. Tree-shake unused code
 *
 * Used by:
 *   - npm run build (production build)
 *   - npm run dev (watch mode during development)
 *   - CI/CD pipelines when publishing to npm
 *
 * Design principles:
 *   - Zero configuration: Sensible defaults for React libraries
 *   - Fast builds: Uses esbuild internally
 *   - Dual module format: CJS for Node.js, ESM for modern bundlers
 *   - Platform-aware: Supports both web and React Native imports
 *
 * @see {@link https://tsup.egoist.dev/} tsup documentation
 * @see {@link https://esbuild.github.io/} esbuild (underlying tool)
 * @see {@link ./package.json} build scripts and export configuration
 *
 * @version tsup 8.5.1
 * @version TypeScript 5.9.3
 */

import { defineConfig } from 'tsup'

/**
 * tsup build configuration
 *
 * Uses TypeScript configuration file (tsconfig.json) for:
 *   - Compilation target (ES2020)
 *   - Module resolution (bundler)
 *   - Path aliases (@/*)
 *   - JSX transform (react-jsx)
 *   - Strict type checking
 *
 * @type {import('tsup').Options}
 */
export default defineConfig({
  /**
   * Entry points for the build
   *
   * Defines which files are the primary entry points.
   * tsup will bundle these files and all their dependencies.
   *
   * src/index.ts:
   *   - Main entry point for the library
   *   - Re-exports all components and utilities
   *   - Defines public API
   *   - See package.json exports for how these files are used
   *
   * @type {string[]}
   */
  entry: ['src/index.ts'],

  /**
   * Output formats
   *
   * Generates bundles in multiple module formats for compatibility:
   *
   * cjs (CommonJS):
   *   - Used by older Node.js tooling
   *   - Default for server-side applications
   *   - Output: dist/index.js
   *   - Import: const { Button } = require('@syntek-studio/ui')
   *
   * esm (ES Modules):
   *   - Modern standard module format
   *   - Supported by modern bundlers (webpack, Vite, Rollup)
   *   - Tree-shakeable (dead code elimination)
   *   - Output: dist/index.mjs
   *   - Import: import { Button } from '@syntek-studio/ui'
   *
   * package.json exports field maps these files:
   *   - require: ./dist/index.js (CommonJS)
   *   - import: ./dist/index.mjs (ES Modules)
   *
   * @type {('cjs' | 'esm')[]}
   */
  format: ['cjs', 'esm'],

  /**
   * Generate TypeScript declaration files (.d.ts)
   *
   * Creates TypeScript type definitions for the built library.
   * Allows consumers to use the library with full type support in TypeScript projects.
   *
   * Outputs:
   *   - dist/index.d.ts (Type definitions)
   *   - dist/index.d.ts.map (Definition source map for IDE tooltips)
   *
   * Benefits:
   *   - Type safety for library consumers
   *   - Autocomplete in IDEs (IntelliSense)
   *   - Documentation via JSDoc comments
   *   - Prevents common usage errors
   *
   * Referenced by package.json:
   *   - "types": "./dist/index.d.ts"
   *
   * @type {boolean}
   */
  dts: true,

  /**
   * Disable code splitting
   *
   * splitting: false ensures a single bundle per entry point.
   *
   * Why disabled:
   *   - Component library should be one file for simplicity
   *   - Consumers can tree-shake what they need
   *   - Single import statement for all components
   *   - Easier version management
   *
   * Alternative (splitting: true):
   *   - Creates separate chunks for each component
   *   - Useful for large applications with many route bundles
   *   - Not needed for a component library
   *
   * @type {boolean}
   */
  splitting: false,

  /**
   * Generate source maps
   *
   * Creates .js.map and .mjs.map files that map compiled code back to original
   * TypeScript source. Enables debugging with original source code in dev tools.
   *
   * Benefits:
   *   - Debug with original TypeScript code
   *   - Improved error messages in dev tools
   *   - Better IDE integration
   *
   * Source maps are only used during development and testing.
   * Minified production builds may include smaller source maps.
   *
   * @type {boolean}
   */
  sourcemap: true,

  /**
   * Clean output directory before build
   *
   * Removes the dist/ directory before building.
   * Ensures no stale files from previous builds remain.
   *
   * Benefits:
   *   - Prevents old files from contaminating the build
   *   - Ensures clean builds in CI/CD
   *   - Fails fast if build produces no output
   *
   * @type {boolean}
   */
  clean: true,

  /**
   * Enable tree-shaking of unused code
   *
   * Dead code elimination that removes unused imports and exports.
   * Works by marking unused code as dead and letting bundlers remove it.
   *
   * How it works:
   *   1. tsup marks unused imports/exports
   *   2. Consumer bundlers (webpack, Vite) remove dead code
   *   3. Final bundle only includes actually used code
   *
   * Example:
   *   Library exports: Button, Input, Select
   *   Consumer only imports: Button
   *   Result: Input and Select are tree-shaken from final bundle
   *
   * Benefits:
   *   - Smaller bundle sizes for consumers
   *   - Modern bundlers can optimise aggressively
   *   - Encourages granular component exports
   *
   * @type {boolean}
   */
  treeshake: true,

  /**
   * Disable minification
   *
   * Keeps built code readable and debuggable.
   * minify: false is appropriate for libraries because:
   *   - Consumers typically minify the final bundle themselves
   *   - Source maps are more useful without minification
   *   - Debugging component issues is easier
   *   - File size impact is minimal at library level
   *
   * Minification happens at the application level:
   *   - React app: webpack/Vite minifies during build
   *   - Next.js: automatically minifies for production
   *   - Node.js: usually not minified
   *
   * @type {boolean}
   */
  minify: false,

  /**
   * External dependencies
   *
   * Lists packages that should NOT be bundled into the library.
   * Declared as external so:
   *   1. Consumer projects provide these dependencies
   *   2. Duplicate code is avoided
   *   3. Version conflicts are prevented
   *   4. Library size is minimal
   *
   * External packages must be in package.json:
   *   - peerDependencies: React, Nativewind (required)
   *   - Optional peerDependencies: React Native specific packages
   *
   * If external is missing and dependency is peer dependency:
   *   - Library will be bloated with duplicate code
   *   - Version conflicts may occur
   *   - Consumers may have multiple React versions loaded
   *
   * Web dependencies:
   *   - react: Core React library
   *   - react-dom: React DOM rendering
   *   - react-native-web: React Native on web
   *
   * Mobile/Cross-platform dependencies:
   *   - react-native: React Native core
   *   - react-native-reanimated: Gesture animations
   *   - react-native-safe-area-context: Safe area handling
   *   - nativewind: Tailwind for React Native
   *
   * @type {string[]}
   */
  external: [
    'react',
    'react-dom',
    'react-native',
    'react-native-web',
    'react-native-reanimated',
    'react-native-safe-area-context',
    'nativewind',
  ],

  /**
   * esbuild options customisation
   *
   * Allows fine-tuning esbuild (the underlying bundler).
   * Used for platform-specific resolution and advanced options.
   *
   * @param {import('esbuild').BuildOptions} options - esbuild options object
   */
  esbuildOptions(options) {
    /**
     * Configure module resolution extensions
     *
     * Tells esbuild which file extensions to check when resolving imports.
     * Order matters: esbuild checks extensions in the specified order.
     *
     * Extensions:
     *   - .tsx: TypeScript JSX files (React components with types)
     *   - .ts: TypeScript files (utilities, logic without JSX)
     *   - .jsx: JavaScript JSX files (legacy, not used in this project)
     *   - .js: JavaScript files (legacy compatibility)
     *   - .json: JSON files (static data, package.json)
     *
     * Why customize:
     *   - React Native uses .native extension for platform-specific code
     *   - esbuild needs to understand .native files
     *   - Custom extensions for web vs mobile components
     *
     * Example resolution:
     *   import { Button } from './Button'
     *   esbuild looks for: Button.tsx, Button.ts, Button.jsx, Button.js, Button.json
     *   React Native can also have: Button.native.tsx
     *
     * Note: For full React Native support, ensure .storybook-web and consuming
     * projects also configure these extensions properly.
     */
    options.resolveExtensions = ['.tsx', '.ts', '.jsx', '.js', '.json']
  },
})
