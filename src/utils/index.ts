/**
 * utils/index.ts - Utility functions and component style mappings
 *
 * Central export point for all utility functions and shared component style
 * definitions. Provides type-safe class name manipulation utilities and
 * reusable style mappings for consistent component styling across web and
 * mobile platforms.
 *
 * ## Module Contents
 *
 * ### classNames
 * Utilities for combining and merging CSS class names:
 * - cn(): Combines multiple class names with conditional logic
 * - mergeClasses(): Merges and deduplicates class names
 *
 * @example
 * import { cn } from '@syntek-studio/ui';
 * const buttonClass = cn('btn', isActive && 'active', 'rounded');
 *
 * ### componentStyles
 * Type definitions and style mappings for component variants:
 * - ComponentSize: Size variants (xs, sm, md, lg, xl)
 * - ComponentVariant: Style variants (primary, secondary, destructive, etc.)
 * - ComponentRounded: Border radius variants
 * - sizeClasses: Padding and font size mappings
 * - variantClasses: Complete styling for each variant
 * - And many more style mapping constants
 *
 * @example
 * import { sizeClasses, variantClasses, cn } from '@syntek-studio/ui';
 * const buttonClass = cn(
 *   sizeClasses.md,
 *   variantClasses.primary
 * );
 *
 * ## Style Mapping Objects
 *
 * All style mappings are type-safe and include:
 * - **Web components**: Full Tailwind CSS class combinations
 * - **Mobile components**: Nativewind equivalents and mobile-specific values
 * - **Icons and spinners**: Size-specific icon and loader styling
 * - **Typography**: Font sizes and colours for mobile Text components
 *
 * These mappings centralise styling logic to ensure consistency and make
 * design system updates easier.
 *
 * @see {@link https://example.com/design-tokens} Design tokens documentation
 */

export * from './classNames'
export * from './componentStyles'
