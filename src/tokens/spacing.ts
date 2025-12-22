/**
 * Spacing scale for consistent layout rhythm
 *
 * Based on 4px grid system (0px to 384px) to ensure mathematical consistency
 * and help achieve pixel-perfect designs.
 *
 * Each spacing value represents a multiple of 4px:
 * - spacing[1] = 4px (base unit)
 * - spacing[2] = 8px
 * - spacing[4] = 16px
 * - spacing[6] = 24px
 * - And so on...
 *
 * Use for padding, margins, gaps, and other layout spacing.
 *
 * @example
 * import { spacing } from '@syntek/ui';
 * const padding = spacing[4];  // 16px
 * const margin = spacing[6];   // 24px
 * const gap = spacing[3];      // 12px
 *
 * @see {@link https://example.com/design-tokens} Design tokens documentation
 */
export const spacing = {
  0: 0,
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
} as const;

export type Spacing = typeof spacing;
