/**
 * componentStyles.ts
 *
 * Centralised component style mappings for the design system.
 * Provides reusable Tailwind CSS class combinations for common component patterns.
 * Works across both web (Tailwind CSS) and mobile (Nativewind) platforms.
 */

/**
 * Size variants for components
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Visual style variants for components
 */
export type ComponentVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'destructive'
  | 'success'
  | 'warning';

/**
 * Border radius variants for components
 * Maps directly to the borders.radius design tokens
 */
export type ComponentRounded = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

/**
 * Size class mappings for button-like components.
 *
 * Defines consistent padding, text sizing, and gap spacing for each size variant.
 * Designed to work with flexbox layouts using gap for icon spacing.
 *
 * - xs: Extra small - minimal padding for compact UIs
 * - sm: Small - reduced padding for dense layouts
 * - md: Medium - default balanced size for most use cases
 * - lg: Large - increased padding for prominent actions
 * - xl: Extra large - maximum padding for hero CTAs
 */
export const sizeClasses: Record<ComponentSize, string> = {
  xs: 'px-2 py-1 text-xs gap-1',
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
  xl: 'px-8 py-4 text-xl gap-3',
};

/**
 * Size class mappings for icon-only components (square aspect ratio).
 *
 * Provides uniform padding to create square buttons/components.
 * Ensures consistent touch targets across different sizes.
 *
 * - xs: 8px padding (very compact)
 * - sm: 12px padding (compact)
 * - md: 16px padding (default)
 * - lg: 24px padding (spacious)
 * - xl: 32px padding (maximum)
 */
export const iconOnlySizeClasses: Record<ComponentSize, string> = {
  xs: 'p-1',
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-3',
  xl: 'p-4',
};

/**
 * Size class mappings for icon-only mobile components.
 *
 * Mobile-specific sizing ensures minimum 44x44px touch targets (WCAG 2.5.5).
 * Larger padding compensates for smaller icon sizes on mobile devices.
 *
 * - xs: 12px padding (44px minimum touch target)
 * - sm: 14px padding
 * - md: 16px padding
 * - lg: 20px padding
 * - xl: 24px padding
 */
export const iconOnlyMobileSizeClasses: Record<ComponentSize, string> = {
  xs: 'p-3',
  sm: 'p-3.5',
  md: 'p-4',
  lg: 'p-5',
  xl: 'p-6',
};

/**
 * Text size class mappings for mobile platforms.
 *
 * Separate text sizing for React Native Text components.
 * Mobile text sizes match web font-size tokens but apply to Text components directly.
 *
 * - xs: 12px
 * - sm: 14px
 * - md: 16px (default body text)
 * - lg: 18px
 * - xl: 20px
 */
export const textSizeClasses: Record<ComponentSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

/**
 * Border radius class mappings.
 *
 * Maps semantic radius names to Tailwind CSS rounded utilities.
 * Provides consistent corner rounding across all components.
 * Values align with design tokens defined in borders.ts.
 *
 * - none: No rounding (sharp corners)
 * - sm: 2px radius (subtle)
 * - base: 4px radius (default)
 * - md: 6px radius (moderate)
 * - lg: 8px radius (pronounced)
 * - xl: 12px radius (very rounded)
 * - 2xl: 16px radius (highly rounded)
 * - 3xl: 24px radius (extremely rounded)
 * - full: 9999px radius (pills/circles)
 */
export const roundedClasses: Record<ComponentRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  base: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
};

/**
 * Variant class mappings for web components.
 *
 * Defines complete styling for each variant including:
 * - Background colour
 * - Text colour
 * - Hover state
 * - Active/pressed state
 * - Focus ring colour
 * - Shadow elevation
 *
 * Variants:
 * - primary: Blue brand colour for primary CTAs
 * - secondary: Purple brand colour for secondary actions
 * - tertiary: Grey neutral for tertiary actions
 * - ghost: Transparent with subtle hover for minimal UI
 * - outline: Bordered transparent for secondary emphasis
 * - link: Text-only link styling
 * - destructive: Red for dangerous/delete actions
 * - success: Green for positive/confirm actions
 * - warning: Amber for cautionary actions
 */
export const variantClasses: Record<ComponentVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 shadow-sm',
  secondary:
    'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-purple-500 shadow-sm',
  tertiary:
    'bg-grey-100 text-grey-900 hover:bg-grey-200 active:bg-grey-300 focus:ring-grey-500',
  ghost:
    'bg-transparent text-grey-700 hover:bg-grey-100 active:bg-grey-200 focus:ring-grey-400',
  outline:
    'bg-transparent border-2 border-grey-300 text-grey-700 hover:bg-grey-50 hover:border-grey-400 active:bg-grey-100 focus:ring-grey-400',
  link: 'bg-transparent text-blue-600 hover:text-blue-800 hover:underline active:text-blue-900 focus:ring-blue-400 p-0',
  destructive:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 shadow-sm',
  success:
    'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500 shadow-sm',
  warning:
    'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 focus:ring-amber-400 shadow-sm',
};

/**
 * Variant class mappings for mobile components.
 *
 * Mobile-specific variant styling without hover states (not supported on touch).
 * Includes background colour and active (pressed) state only.
 * Text colour is applied separately to Text components.
 *
 * Note: Mobile platforms don't support CSS hover, only active/pressed states.
 */
export const mobileVariantClasses: Record<ComponentVariant, string> = {
  primary: 'bg-blue-600 active:bg-blue-800',
  secondary: 'bg-purple-600 active:bg-purple-800',
  tertiary: 'bg-grey-100 active:bg-grey-300',
  ghost: 'bg-transparent active:bg-grey-200',
  outline: 'bg-transparent border-2 border-grey-300 active:bg-grey-100',
  link: 'bg-transparent active:bg-grey-50',
  destructive: 'bg-red-600 active:bg-red-800',
  success: 'bg-green-600 active:bg-green-800',
  warning: 'bg-amber-500 active:bg-amber-700',
};

/**
 * Text colour variant mappings for mobile Text components.
 *
 * Defines text colours for each variant to be applied to React Native Text components.
 * Ensures proper contrast and semantic meaning across different button styles.
 *
 * - White text for solid colour variants (primary, secondary, destructive, success, warning)
 * - Dark text for light backgrounds (tertiary, ghost, outline)
 * - Blue text for link variant
 */
export const textColorClasses: Record<ComponentVariant, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  tertiary: 'text-grey-900',
  ghost: 'text-grey-700',
  outline: 'text-grey-700',
  link: 'text-blue-600',
  destructive: 'text-white',
  success: 'text-white',
  warning: 'text-white',
};

/**
 * Spinner/loading indicator colour mappings for mobile components.
 *
 * Provides hex colour values for ActivityIndicator components on mobile.
 * Ensures loading spinners have appropriate contrast against button backgrounds.
 *
 * - White (#ffffff) for solid colour variants
 * - Dark grey for light/transparent backgrounds
 * - Blue for link variant
 */
export const spinnerColors: Record<ComponentVariant, string> = {
  primary: '#ffffff',
  secondary: '#ffffff',
  tertiary: '#111827',
  ghost: '#374151',
  outline: '#374151',
  link: '#2563eb',
  destructive: '#ffffff',
  success: '#ffffff',
  warning: '#ffffff',
};

/**
 * Loading spinner size mappings for web components.
 *
 * Defines width and height classes for SVG loading spinners.
 * Scales proportionally with button size for visual consistency.
 *
 * - xs: 12px (w-3 h-3)
 * - sm: 16px (w-4 h-4)
 * - md: 20px (w-5 h-5)
 * - lg: 24px (w-6 h-6)
 * - xl: 28px (w-7 h-7)
 */
export const spinnerSizeClasses: Record<ComponentSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
};
