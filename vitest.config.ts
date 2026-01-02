/**
 * @fileoverview Vitest configuration for @syntek-studio/ui component library.
 *
 * Configures test discovery, execution, coverage analysis, and multi-format
 * reporting (console, JSON, JUnit XML) for CI/CD integration.
 *
 * Test scope:
 * - Scripts and utilities in scripts/__tests__/
 * - Component visual testing is done via Storybook stories
 *
 * @see {@link https://vitest.dev/} Vitest documentation
 * @version vitest 4.0.16
 */

import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    // Enable global test functions (describe, it, expect) without imports
    globals: true,

    // Run tests in Node.js environment (use jsdom for DOM testing)
    environment: 'node',

    // Output formats: console (default), JSON for CI/CD, JUnit XML for IDEs
    reporters: ['default', 'json', 'junit'],

    // Reporter output file paths
    outputFile: {
      json: './test_results/logs/result.json',
      junit: './test_results/logs/junit.xml',
    },

    // Code coverage configuration using V8 provider
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './test_results/coverage',
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData/**',
        'scripts/__tests__/**',
      ],
    },

    // Test file discovery patterns
    include: ['scripts/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules', 'dist', '.storybook-web'],
  },

  // Path alias matching tsconfig.json
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
