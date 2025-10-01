import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  build: {
    lib: {
      entry: 'web_src/index.js',   // your library entry
      name: 'UIDesign',        // global name if used via script tag
      fileName: (format) => `ui-design.${format}.js`,
    },
    rollupOptions: {
      // prevent bundling react into your library
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
