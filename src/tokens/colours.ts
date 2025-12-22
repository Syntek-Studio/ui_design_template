/**
 * Design system colour palette
 *
 * Provides a comprehensive colour system with:
 * - Brand colours (primary, secondary) with 9 shades each
 * - Semantic colours for status and intent (success, warning, error, info)
 * - Neutral colours for text, backgrounds, and borders (white, black, grey)
 *
 * Use these colours consistently across components for visual cohesion.
 *
 * @example
 * import { colours } from '@syntek/ui';
 * const primaryColor = colours.primary[500];
 * const errorColor = colours.error;
 * const textColor = colours.grey[900];
 *
 * @see {@link https://example.com/design-tokens} Design tokens documentation
 */
export const colours = {
  // Brand
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Default
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7', // Default
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },

  // Semantic
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Neutral
  white: '#ffffff',
  black: '#000000',
  grey: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const;

export type Colours = typeof colours;
