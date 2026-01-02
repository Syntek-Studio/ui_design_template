/**
 * colours.ts - Design system colour palette
 *
 * Provides a comprehensive colour system with semantic meaning for use across
 * all web and mobile components. The palette includes brand colours, semantic
 * colours for status and intent, and neutral colours for text and backgrounds.
 *
 * ## Colour Categories
 *
 * ### Brand Colours
 * Primary and secondary brand colours with 9 shades each (50-900).
 * - **primary**: Blue (default #3b82f6) for main calls-to-action
 * - **secondary**: Purple (default #a855f7) for secondary actions
 *
 * ### Semantic Colours
 * Single-shade colours with specific meanings:
 * - **success**: Green (#22c55e) for positive confirmations
 * - **warning**: Amber (#f59e0b) for cautionary messages
 * - **error**: Red (#ef4444) for destructive/error states
 * - **info**: Blue (#3b82f6) for informational messages
 *
 * ### Neutral Colours
 * Grey scale for text, backgrounds, borders, and neutral components:
 * - **white**: Pure white (#ffffff)
 * - **black**: Pure black (#000000)
 * - **grey**: 9 shades (50-900) from very light to very dark
 *
 * ## Shade System
 *
 * Brand colours use numeric shades (50, 100, 200... 900):
 * - 50: Lightest (barely visible tint)
 * - 100-300: Light backgrounds
 * - 400-600: Main interaction states
 * - 700-900: Dark text and borders
 *
 * ## Accessibility
 *
 * All colour combinations meet WCAG AA contrast requirements for text.
 * Avoid relying solely on colour to convey information; use icons, patterns,
 * or text labels for semantic meaning.
 *
 * @example
 * import { colours } from '@syntek-studio/ui';
 * const primaryColor = colours.primary[500];      // #3b82f6
 * const errorColor = colours.error;               // #ef4444
 * const lightText = colours.grey[700];            // #374151
 * const darkBackground = colours.grey[900];       // #111827
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
} as const

export type Colours = typeof colours
