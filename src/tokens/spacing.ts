/**
 * Design Tokens - Spacing
 *
 * Spacing scale for consistent layout across web and native platforms
 */

export const spacing = {
  xs: 8,    // 0.5rem
  sm: 12,   // 0.75rem
  md: 16,   // 1rem
  lg: 24,   // 1.5rem
  xl: 32,   // 2rem
  '2xl': 48, // 3rem
} as const

export const borderRadius = {
  sm: 4,    // 0.25rem
  md: 6,    // 0.375rem
  lg: 8,    // 0.5rem
  xl: 12,   // 0.75rem
  '2xl': 16, // 1rem
  full: 9999,
} as const

export type SpacingToken = typeof spacing
export type BorderRadiusToken = typeof borderRadius
