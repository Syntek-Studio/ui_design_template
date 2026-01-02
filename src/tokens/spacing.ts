/**
 * spacing.ts - Spacing scale for consistent layout rhythm
 *
 * Defines a standardised spacing scale based on a 4px grid system to ensure
 * mathematical consistency and pixel-perfect designs. All spacing values are
 * multiples of 4px, creating a harmonious rhythm throughout the design system.
 *
 * ## Grid System
 *
 * The base spacing unit is 4px:
 * - spacing[0] = 0px
 * - spacing[1] = 4px (base unit)
 * - spacing[2] = 8px
 * - spacing[4] = 16px
 * - spacing[6] = 24px
 * - spacing[12] = 48px
 * - Up to spacing[96] = 384px
 *
 * Fractional values available: 0.5, 1.5, 2.5, 3.5 (2px, 6px, 10px, 14px)
 * Pixel-perfect value: `px` = 1px (for borders)
 *
 * ## Usage
 *
 * Use for:
 * - **Padding**: Internal space within components
 * - **Margins**: External space between components
 * - **Gaps**: Space between flex/grid children
 * - **Positioning**: top, right, bottom, left offsets
 * - **Sizing**: Width and height values
 *
 * ## Scale Guidance
 *
 * - **xs spacing** (0-2): Component internal padding
 * - **sm spacing** (3-4): Component gaps and tight layouts
 * - **md spacing** (5-8): Standard margins and gaps
 * - **lg spacing** (9-12): Generous spacing for visual breathing room
 * - **xl spacing** (16-96): Large sections and page-level spacing
 *
 * @example
 * import { spacing } from '@syntek-studio/ui';
 * const padding = spacing[4];      // 16px
 * const margin = spacing[6];       // 24px
 * const gap = spacing[3];          // 12px
 * const largeSpacing = spacing[16]; // 64px
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
} as const

export type Spacing = typeof spacing
