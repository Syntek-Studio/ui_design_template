/**
 * Responsive design breakpoints for mobile-first approach
 *
 * Defines screen width thresholds for responsive design:
 * - xs (0px): Mobile default/small phones
 * - sm (640px): Large phones
 * - md (768px): Tablets
 * - lg (1024px): Desktop
 * - xl (1280px): Large desktop
 * - 2xl (1536px): Ultra-wide displays
 *
 * Use these with Tailwind CSS responsive prefixes (sm:, md:, lg:, etc.)
 * or for conditional logic in components.
 *
 * @example
 * import { breakpoints } from '@template/ui';
 * const isMobile = windowWidth < breakpoints.sm;
 * const isTablet = windowWidth >= breakpoints.md;
 *
 * @see {@link https://example.com/design-tokens} Design tokens documentation
 */
export const breakpoints = {
  xs: 360,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoints = typeof breakpoints;
