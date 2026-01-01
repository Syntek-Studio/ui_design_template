import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  external: [
    'react',
    'react-dom',
    'react-native',
    'react-native-web',
    'react-native-reanimated',
    'react-native-safe-area-context',
    'nativewind',
  ],
  esbuildOptions(options) {
    // Support for React Native's platform-specific extensions
    options.resolveExtensions = ['.tsx', '.ts', '.jsx', '.js', '.json']
  },
})
