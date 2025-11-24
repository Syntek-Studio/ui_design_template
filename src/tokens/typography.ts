/**
 * Design Tokens - Typography
 *
 * Typography scale and font families for consistent text styling
 */

export const fontFamily = {
  sans: ['Inter', 'system-ui', 'sans-serif'].join(', '),
  display: ['Poppins', 'sans-serif'].join(', '),
} as const

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const

export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const

export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const

export type FontFamilyToken = typeof fontFamily
export type FontSizeToken = typeof fontSize
export type FontWeightToken = typeof fontWeight
export type LineHeightToken = typeof lineHeight
