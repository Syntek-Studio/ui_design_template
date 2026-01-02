/**
 * breakpoints.ts - Responsive design breakpoints for mobile-first approach
 *
 * Defines screen width thresholds for responsive design. Uses a mobile-first
 * approach where base styles are for mobile and breakpoints add more specific
 * styles for larger screens.
 *
 * ## Breakpoint Strategy
 *
 * Mobile-first methodology:
 * 1. Design and code for mobile (xs) first
 * 2. Use breakpoint prefixes for increasingly larger screens
 * 3. Avoid mobile-specific code paths; use CSS media queries instead
 *
 * ## Breakpoints
 *
 * - **xs** (0-359px): Small phones, default baseline
 * - **sm** (640px): Large phones, landscape phones
 * - **md** (768px): Tablets, iPad mini
 * - **lg** (1024px): iPad Pro, small laptops
 * - **xl** (1280px): Standard desktop, large laptop
 * - **2xl** (1536px): Ultra-wide displays, 4K monitors
 *
 * ## Usage
 *
 * ### CSS Media Queries
 * Use with Tailwind CSS responsive prefixes:
 * ```
 * <div className="text-sm sm:text-base md:text-lg lg:text-xl">
 * ```
 *
 * ### JavaScript Conditionals
 * For component logic based on screen size:
 * ```javascript
 * const isMobile = typeof window !== 'undefined' && window.innerWidth < breakpoints.sm;
 * const isDesktop = typeof window !== 'undefined' && window.innerWidth >= breakpoints.lg;
 * ```
 *
 * ### Media Query Objects
 * Match common device categories:
 * - Mobile: < 640px (xs, sm)
 * - Tablet: 640px - 1024px (md, lg)
 * - Desktop: >= 1024px (lg, xl, 2xl)
 *
 * @example
 * import { breakpoints } from '@syntek-studio/ui';
 * const isMobile = windowWidth < breakpoints.sm;      // < 640px
 * const isTablet = windowWidth >= breakpoints.md;     // >= 768px
 * const isDesktop = windowWidth >= breakpoints.lg;    // >= 1024px
 * const isLargeScreen = windowWidth >= breakpoints.xl; // >= 1280px
 *
 * @see {@link https://example.com/design-tokens} Design tokens documentation
 * @see {@link https://tailwindcss.com/docs/responsive-design} Tailwind Responsive Design
 */
export const breakpoints = {
  xs: 360,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoints = typeof breakpoints
