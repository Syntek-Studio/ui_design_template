/**
 * Shadow definitions for elevation and visual hierarchy
 *
 * Provides multiple shadow intensities for creating depth and visual prominence:
 * - none: No shadow (flat design)
 * - sm: Small shadow (1px elevation) - Subtle emphasis
 * - base: Base shadow (2px elevation) - Default elevation
 * - md: Medium shadow (4px elevation) - Standard cards and containers
 * - lg: Large shadow (10px elevation) - Elevated components
 * - xl: Extra large shadow (20px elevation) - Prominent elements
 * - 2xl: 2XL shadow (25px elevation) - Modal/overlay level
 * - inner: Inset shadow - Depressed or embedded effect
 *
 * Use to establish visual hierarchy and create depth perception.
 *
 * @example
 * import { shadows } from '@syntek/ui';
 * const cardShadow = shadows.md;
 * const floatingShadow = shadows.lg;
 * const subtleShadow = shadows.sm;
 *
 * @see {@link https://example.com/design-tokens} Design tokens documentation
 */
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

export type Shadows = typeof shadows;
