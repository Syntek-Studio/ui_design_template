/**
 * Border definitions for rounded corners and border widths
 *
 * Provides predefined values for:
 * - Border radius: From sharp corners (none) to full circles (full)
 * - Border width: From no border (0) to thick borders (8px)
 *
 * Radius values:
 * - none (0px): Sharp corners
 * - sm/base/md/lg/xl/2xl/3xl: Progressive rounding
 * - full (9999px): Perfect circles (for avatars, badges, etc.)
 *
 * Width values:
 * - 0px (no border)
 * - 1px (thin, subtle)
 * - 2px (standard)
 * - 4px (prominent)
 * - 8px (thick, bold)
 *
 * Use for consistent rounded corners and border styles.
 *
 * @example
 * import { borders } from '@syntek/ui';
 * const roundedButton = borders.radius.lg;    // 8px
 * const circleAvatar = borders.radius.full;   // Perfect circle
 * const thinBorder = borders.width[1];        // 1px
 *
 * @see {@link https://example.com/design-tokens} Design tokens documentation
 */
export const borders = {
  radius: {
    none: 0,
    sm: 2,
    base: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    '3xl': 24,
    full: 9999,
  },
  width: {
    0: 0,
    1: 1,
    2: 2,
    4: 4,
    8: 8,
  },
} as const;

export type Borders = typeof borders;
