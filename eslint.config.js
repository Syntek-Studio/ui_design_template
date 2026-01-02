/**
 * @fileoverview ESLint configuration for @syntek-studio/ui component library.
 *
 * This configuration file enforces code quality and consistency across the TypeScript/React
 * codebase. It applies to web components, mobile components, and all source files.
 *
 * Configuration applies to:
 *   - Web components (src/web/components/)
 *   - Mobile components (src/mobile/components/)
 *   - Utilities and hooks (src/)
 *   - Storybook stories (src/**\/*.stories.tsx)
 *
 * Uses:
 *   - @eslint/js (recommended rules for JavaScript)
 *   - @typescript-eslint/eslint-plugin (TypeScript-specific rules)
 *   - @typescript-eslint/parser (TypeScript parser for JSX/TSX)
 *
 * Rules philosophy:
 *   - Use 'warn' for fixable issues (can be auto-fixed)
 *   - Use 'error' for critical issues (must be fixed manually)
 *   - Allow unused variables starting with underscore (_) convention
 *   - Flexible with 'any' types (use 'warn' only) for pragmatic development
 *
 * @see {@link https://eslint.org/docs/latest/use/} ESLint documentation
 * @see {@link https://typescript-eslint.io/} TypeScript ESLint documentation
 *
 * @version ESLint 9.39.2
 * @version @typescript-eslint/eslint-plugin 8.51.0
 * @version @typescript-eslint/parser 8.51.0
 */

import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

/**
 * ESLint configuration array
 *
 * Uses the new flat config format (eslint.config.js) instead of .eslintrc.json
 * Provides better control over rule application per file pattern.
 *
 * @type {Array<Object>} ESLint config objects
 */
export default [
  /**
   * Base JavaScript configuration
   *
   * Applies recommended ESLint rules from @eslint/js package.
   * These rules catch common JavaScript errors and enforce best practices.
   *
   * Rules include: prefer-const, no-unused-vars, no-undef, etc.
   */
  js.configs.recommended,

  /**
   * TypeScript-specific configuration
   *
   * Applies to all .ts and .tsx files including:
   *   - Component implementations (*.tsx)
   *   - Storybook stories (*.stories.tsx)
   *   - Utility functions (*.ts)
   *   - Type definitions (*.d.ts)
   *
   * Configuration includes:
   *   - TypeScript parser for proper AST generation
   *   - JSX/TSX support for React components
   *   - Global variables for React, React Native, and browser APIs
   *   - TypeScript-specific linting rules
   */
  {
    files: ['**/*.{ts,tsx}'],

    /**
     * Language options
     *
     * Configures how files are parsed and what globals are available.
     */
    languageOptions: {
      /**
       * Use TypeScript parser instead of default JavaScript parser
       *
       * The TypeScript parser understands TypeScript-specific syntax:
       *   - Interface declarations
       *   - Type annotations
       *   - Generics
       *   - Enums
       *   - Access modifiers (public, private, protected)
       */
      parser: tsparser,

      /**
       * Parser options
       *
       * ecmaVersion 'latest' - Support all modern JavaScript features
       * sourceType 'module' - Files are ES modules (import/export syntax)
       * jsx true - Enable JSX parsing for React components
       */
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },

      /**
       * Global variables
       *
       * Declares variables that are available globally in each file.
       * Prevents 'is not defined' errors from ESLint.
       *
       * React globals:
       *   - React: Implicit react import (React.Fragment, React.memo, etc.)
       *   - JSX: JSX syntax global
       *
       * React Native globals:
       *   - __DEV__: Development mode flag in React Native
       *
       * Node/Browser globals:
       *   - console: console.log, console.error, etc.
       *   - module: CommonJS module object
       *   - require: CommonJS require function
       *   - process: Node.js process object
       *
       * NativeWind globals:
       *   - className: Augmented by NativeWind for React Native styling
       */
      globals: {
        // React globals
        React: 'readonly',
        JSX: 'readonly',
        // React Native globals
        __DEV__: 'readonly',
        // Browser/Node globals
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        // NativeWind augmented className prop
        className: 'readonly',
      },
    },

    /**
     * Linting plugins
     *
     * Plugins provide additional linting rules beyond the ESLint core.
     * Each plugin can define rules that are referenced as plugin:rule-name.
     */
    plugins: {
      /**
       * TypeScript ESLint plugin
       *
       * Provides TypeScript-specific rules:
       *   - @typescript-eslint/no-unused-vars
       *   - @typescript-eslint/no-explicit-any
       *   - @typescript-eslint/explicit-module-boundary-types
       *   - And many more...
       */
      '@typescript-eslint': tseslint,
    },

    /**
     * Linting rules
     *
     * Rule severity levels:
     *   - 'off' (0): Disabled
     *   - 'warn' (1): Warning (doesn't fail build, shown in console)
     *   - 'error' (2): Error (fails build, must fix)
     *
     * Rules can be a string (severity only) or array [severity, options]
     */
    rules: {
      /**
       * Apply all recommended TypeScript ESLint rules
       *
       * This includes important rules for:
       *   - Type correctness
       *   - Module boundaries
       *   - Naming conventions
       *   - Safety checks
       */
      ...tseslint.configs.recommended.rules,

      /**
       * Warn about unused variables and parameters
       *
       * Options:
       *   - argsIgnorePattern: '^_' - Allows unused parameters prefixed with underscore
       *
       * This follows the convention where underscore prefix indicates intentionally
       * unused parameters (e.g., (event: Event, _metadata: Meta) => {...})
       *
       * Helps catch accidental unused variables while supporting valid patterns.
       *
       * Examples:
       *   - const unused = 5; // Warns
       *   - const _intentional = 5; // Allowed
       *   - function handler(_event, data) {} // _event allowed
       */
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      /**
       * Warn (not error) about 'any' type usage
       *
       * Set to 'warn' instead of 'error' because:
       *   - Sometimes 'any' is necessary (third-party types, complex migrations)
       *   - Allows pragmatic development without constant overrides
       *   - Still alerts developers to potentially unsafe code
       *
       * When encountering 'any' types:
       *   1. Try to improve typing if feasible
       *   2. If not, add a comment explaining why 'any' is necessary
       *   3. Consider // @ts-ignore if no better alternative
       */
      '@typescript-eslint/no-explicit-any': 'warn',

      /**
       * Turn off requirement for explicit return types on exported functions
       *
       * Set to 'off' because:
       *   - TypeScript can infer return types in most cases
       *   - Reduces boilerplate in component definitions
       *   - Type hints for exported functions are available via IDE
       *
       * Exported functions still get proper types through:
       *   - Parameter type annotations
       *   - TypeScript type inference
       *   - Generated .d.ts declaration files
       */
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  /**
   * File ignore patterns
   *
   * Files matching these patterns are excluded from linting.
   * Useful for:
   *   - Generated files
   *   - Dependencies
   *   - Build outputs
   *   - Configuration files
   *
   * Patterns:
   *   - dist: Build output directory (created by tsup)
   *   - node_modules: Package dependencies
   *   - *.config.js/ts/mjs: Configuration files (not source code)
   */
  {
    ignores: ['dist', 'node_modules', '*.config.js', '*.config.ts', '*.config.mjs'],
  },
]
