import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    reporters: ['default', 'json', 'junit'],
    outputFile: {
      json: './test_results/logs/result.json',
      junit: './test_results/logs/junit.xml',
    },
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
    include: ['scripts/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules', 'dist', '.storybook-web'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
