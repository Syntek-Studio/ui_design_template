import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: false,
    check: false,
  },
  babel: async (options: any) => ({
    ...options,
    presets: [
      ['@babel/preset-env', { targets: { browsers: ['>0.25%', 'not dead'] } }],
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
  }),
  webpackFinal: async (config) => {
    // Add React Native Web alias and path aliases
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      '@': path.resolve(__dirname, '../src'),
    };

    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      ...(config.resolve.extensions || []),
    ];

    // Add babel-loader for TypeScript files
    config.module = config.module || { rules: [] };
    config.module.rules = config.module.rules || [];

    // Add babel-loader for .ts and .tsx files
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
    });

    // Find and modify existing CSS rule to add PostCSS
    const rules = config.module.rules as any[];
    const cssRuleIndex = rules.findIndex(
      (rule) => rule && rule.test && rule.test.toString().includes('css')
    );

    if (cssRuleIndex !== -1) {
      const cssRule = rules[cssRuleIndex];
      // Find the use array in the CSS rule
      if (cssRule.use && Array.isArray(cssRule.use)) {
        // Add postcss-loader after css-loader
        cssRule.use.push({
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: path.resolve(__dirname, '../postcss.config.mjs'),
            },
          },
        });
      }
    }

    return config;
  },
};

export default config;
