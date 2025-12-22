/**
 * Typography scale for text styling consistency
 *
 * Provides predefined font families, sizes, and weights for:
 * - Font families: sans-serif (Inter), serif (Georgia), monospace (Fira Code)
 * - Font sizes: xs to 6xl with corresponding line heights
 * - Font weights: thin (100) to black (900)
 *
 * Ensures consistent typography hierarchy across web and mobile platforms.
 *
 * @example
 * import { typography } from '@syntek/ui';
 * const fontSize = typography.fontSize.lg;        // { size: 18, lineHeight: 28 }
 * const fontWeight = typography.fontWeight.bold;  // 700
 * const fontFamily = typography.fontFamily.mono;  // Fira Code, monospace
 *
 * @see {@link https://example.com/design-tokens} Design tokens documentation
 */
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['Fira Code', 'monospace'],
  },
  fontSize: {
    xs: { size: 12, lineHeight: 16 },
    sm: { size: 14, lineHeight: 20 },
    base: { size: 16, lineHeight: 24 },
    lg: { size: 18, lineHeight: 28 },
    xl: { size: 20, lineHeight: 28 },
    '2xl': { size: 24, lineHeight: 32 },
    '3xl': { size: 30, lineHeight: 36 },
    '4xl': { size: 36, lineHeight: 40 },
    '5xl': { size: 48, lineHeight: 1 },
    '6xl': { size: 60, lineHeight: 1 },
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
} as const;

export type Typography = typeof typography;
