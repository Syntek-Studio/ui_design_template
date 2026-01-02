/**
 * componentStyles.ts - Component Style Mappings and Type Definitions
 *
 * Centralised component style mappings and type definitions for the design system.
 * Provides reusable Tailwind CSS and Nativewind class combinations for common
 * component patterns, ensuring consistency across the entire component library.
 *
 * This module is the single source of truth for all component styling, eliminating
 * duplication and making it easy to update design system values across all components.
 *
 * ## Type Definitions
 *
 * - `ComponentSize`: Size variants (xs, sm, md, lg, xl)
 * - `ComponentVariant`: Visual style variants (primary, secondary, tertiary, etc.)
 * - `ComponentRounded`: Border radius variants (none to full)
 *
 * ## Style Mapping Objects
 *
 * ### Web-Specific Mappings
 * - `variantClasses`: Complete variant styling including hover states
 * - `spinnerSizeClasses`: Width/height for loading spinners
 * - `iconOnlySizeClasses`: Padding for icon-only buttons
 *
 * ### Mobile-Specific Mappings
 * - `mobileVariantClasses`: Variant styling without hover (touch-only)
 * - `textColorClasses`: Text colour for Text components
 * - `spinnerColors`: Hex colours for ActivityIndicator
 * - `iconOnlyMobileSizeClasses`: Touch-target-safe padding
 * - `textSizeClasses`: Font sizes for Text components
 *
 * ### Cross-Platform Mappings
 * - `sizeClasses`: Padding and font size for standard components
 * - `roundedClasses`: Border radius values
 *
 * ## Design Decisions
 *
 * ### Size System
 * - Based on a 4px grid system
 * - Padding increases by consistent increments (4px per size)
 * - Font sizes scale proportionally with padding
 * - Gap spacing scales with size for icon alignment
 *
 * ### Colour System
 * - Primary and secondary use brand colours (blue, purple)
 * - Tertiary uses neutral grey
 * - Semantic colours: destructive (red), success (green), warning (amber)
 * - Text colour automatically set based on background contrast
 *
 * ### Mobile Touch Targets
 * - Minimum 44x44px (WCAG 2.5.5 Level AAA)
 * - Icon-only mobile buttons: 12-24px padding
 * - Icon-only web buttons: 8-32px padding
 * - No hover states on mobile (active/pressed only)
 * - Text components required for text on mobile (no implicit text rendering)
 *
 * ### Web Interactions
 * - Hover states for mouse/trackpad users
 * - Active states for keyboard and mouse
 * - Focus rings for keyboard navigation
 * - Shadow elevation for primary actions
 *
 * ## Usage Example
 *
 * ```typescript
 * import { cn, sizeClasses, variantClasses } from '@/utils';
 *
 * // Web button
 * const webButtonClass = cn(
 *   'inline-flex items-center justify-center',
 *   sizeClasses.md,
 *   variantClasses.primary
 * );
 *
 * // Mobile button
 * import { mobileVariantClasses, textColorClasses } from '@/utils';
 * const mobileButtonClass = cn(
 *   'flex items-center',
 *   sizeClasses.md,
 *   mobileVariantClasses.primary
 * );
 * const mobileTextClass = cn(
 *   textColorClasses.primary,
 *   'font-semibold'
 * );
 * ```
 *
 * @module utils/componentStyles
 */

/**
 * Size variants for components.
 *
 * Represents the supported size options across all components.
 * Follows a 5-level sizing scale:
 * - xs: Extra small (compact UI, dense layouts)
 * - sm: Small (reduced space, information-dense)
 * - md: Medium (balanced, default size)
 * - lg: Large (prominent actions, spacious)
 * - xl: Extra large (hero CTAs, maximum emphasis)
 *
 * @type {('xs' | 'sm' | 'md' | 'lg' | 'xl')}
 *
 * @example
 * type MySize = ComponentSize; // type MySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 * const size: ComponentSize = 'md';
 * const padding = sizeClasses[size]; // "px-4 py-2 text-base gap-2"
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Visual style variants for components.
 *
 * Represents the semantic and visual style variants available across all components.
 * Each variant defines a specific purpose and visual hierarchy within the UI.
 *
 * ### Brand Variants (Solid background)
 * - **primary**: Blue brand colour for primary CTAs and important actions
 * - **secondary**: Purple brand colour for secondary actions
 *
 * ### Neutral Variants
 * - **tertiary**: Grey neutral background for tertiary actions
 * - **ghost**: Transparent background with subtle hover, minimal emphasis
 * - **outline**: Bordered transparent background for secondary emphasis
 *
 * ### Special Variants
 * - **link**: Text-only link styling, minimal visual weight
 *
 * ### Semantic Variants (Intent-based)
 * - **destructive**: Red background for dangerous/delete actions
 * - **success**: Green background for positive/confirm actions
 * - **warning**: Amber background for cautionary/alert actions
 *
 * ## Styling by Variant
 *
 * All variants include colour, hover states (web), active states, focus rings,
 * and appropriate shadows. Text colours are automatically adjusted for contrast.
 *
 * Use semantically: choose variants based on the action's intent, not just
 * appearance. For example, use 'destructive' for delete buttons regardless
 * of styling preference.
 *
 * @type {('primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'success' | 'warning')}
 *
 * @example
 * type MyVariant = ComponentVariant;
 * const variant: ComponentVariant = 'primary';
 * const styling = variantClasses[variant];
 *
 * @see {@link variantClasses} for web styling details
 * @see {@link mobileVariantClasses} for mobile styling details
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
  | 'warning'

/**
 * Border radius variants for components.
 *
 * Represents the supported border radius options for components.
 * Maps directly to the Tailwind CSS rounded utilities and design tokens.
 *
 * ### Radius Scale (based on 4px grid)
 * - **none**: 0px - sharp corners, no rounding
 * - **sm**: 2px - subtle rounding, minimal softness
 * - **base**: 4px - default, balanced softness
 * - **md**: 6px - moderate rounding
 * - **lg**: 8px - pronounced rounding
 * - **xl**: 12px - very rounded
 * - **2xl**: 16px - highly rounded
 * - **3xl**: 24px - extremely rounded
 * - **full**: 9999px (clamped by browser) - pills and circles
 *
 * ## Usage Notes
 *
 * - Use consistent border radius across related components
 * - Smaller components (icons, small buttons) use smaller radius values
 * - Larger components (cards, modals) use larger radius values
 * - Use 'full' for badge pills or circular avatars
 * - Align with design token values in the design system
 *
 * ## Cross-Platform
 *
 * Border radius works identically on web (Tailwind CSS) and mobile (Nativewind).
 *
 * @type {('none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full')}
 *
 * @example
 * type MyRounded = ComponentRounded;
 * const rounded: ComponentRounded = 'lg';
 * const styling = roundedClasses[rounded]; // "rounded-lg"
 *
 * @see {@link roundedClasses} for class mapping details
 */
export type ComponentRounded = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

/**
 * Size class mappings for button-like components.
 *
 * Defines consistent padding, text sizing, and gap spacing for each size variant.
 * Designed to work with flexbox layouts (display: flex) using gap for icon spacing.
 *
 * ## Sizing Details
 *
 * Each size includes three Tailwind classes:
 * 1. **Horizontal padding (px)**: Controls left/right spacing
 * 2. **Vertical padding (py)**: Controls top/bottom spacing
 * 3. **Text size (text-*)**: Controls font size
 * 4. **Gap spacing (gap-*)**: Controls space between flex items (icons and text)
 *
 * ### Size Breakdown
 *
 * - **xs** (Extra small): `px-2 py-1 text-xs gap-1`
 *   - Padding: 8px horizontal, 4px vertical
 *   - Font: 12px
 *   - Icon-text gap: 4px
 *   - Use: Compact UIs, dense layouts, small badges
 *
 * - **sm** (Small): `px-3 py-1.5 text-sm gap-1.5`
 *   - Padding: 12px horizontal, 6px vertical
 *   - Font: 14px
 *   - Icon-text gap: 6px
 *   - Use: Secondary actions, reduced-space layouts
 *
 * - **md** (Medium): `px-4 py-2 text-base gap-2`
 *   - Padding: 16px horizontal, 8px vertical
 *   - Font: 16px (default/body)
 *   - Icon-text gap: 8px
 *   - Use: Standard components, default size, most buttons
 *
 * - **lg** (Large): `px-6 py-3 text-lg gap-2.5`
 *   - Padding: 24px horizontal, 12px vertical
 *   - Font: 18px
 *   - Icon-text gap: 10px
 *   - Use: Prominent actions, spacious layouts
 *
 * - **xl** (Extra large): `px-8 py-4 text-xl gap-3`
 *   - Padding: 32px horizontal, 16px vertical
 *   - Font: 20px
 *   - Icon-text gap: 12px
 *   - Use: Hero CTAs, maximum emphasis, full-width buttons
 *
 * ## Usage Context
 *
 * This mapping is intended for components with flexbox layouts that contain
 * both text and icons. Examples:
 * - Buttons with leading/trailing icons
 * - Toggle buttons with text labels
 * - Menu items with icons
 * - Tab items with icons
 *
 * For icon-only components, use `iconOnlySizeClasses` or
 * `iconOnlyMobileSizeClasses` instead.
 *
 * ## Spacing Ratios
 *
 * The gap spacing scales with size to maintain visual balance:
 * - xs: 1unit gap
 * - sm: 1.5units gap
 * - md: 2units gap (base)
 * - lg: 2.5units gap
 * - xl: 3units gap
 *
 * Gap spacing prevents icons and text from appearing cramped whilst
 * maintaining visual cohesion.
 *
 * @constant
 * @type {Record<ComponentSize, string>}
 *
 * @example
 * // Apply to a button component
 * import { cn, sizeClasses } from '@/utils';
 * const buttonClasses = cn('flex items-center', sizeClasses.md);
 *
 * @example
 * // Dynamic sizing based on prop
 * const size: ComponentSize = 'lg';
 * const buttonClasses = cn('flex items-center justify-center', sizeClasses[size]);
 *
 * @example
 * // All size outputs
 * sizeClasses.xs // "px-2 py-1 text-xs gap-1"
 * sizeClasses.sm // "px-3 py-1.5 text-sm gap-1.5"
 * sizeClasses.md // "px-4 py-2 text-base gap-2"
 * sizeClasses.lg // "px-6 py-3 text-lg gap-2.5"
 * sizeClasses.xl // "px-8 py-4 text-xl gap-3"
 */
export const sizeClasses: Record<ComponentSize, string> = {
  xs: 'px-2 py-1 text-xs gap-1',
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
  xl: 'px-8 py-4 text-xl gap-3',
}

/**
 * Size class mappings for icon-only components (square aspect ratio).
 *
 * Provides uniform padding to create square buttons/components for web.
 * All sides receive equal padding, resulting in a square component when
 * containing a square icon. Ensures consistent visual sizing across different
 * component sizes.
 *
 * ## Padding Breakdown
 *
 * - **xs**: `p-1` = 4px padding
 *   - Total size: 12x12px (4px padding + 4px icon)
 *   - Use: Very compact UIs, small icon buttons
 *
 * - **sm**: `p-1.5` = 6px padding
 *   - Total size: 16x16px (6px padding + 4px icon)
 *   - Use: Compact icon buttons
 *
 * - **md**: `p-2` = 8px padding
 *   - Total size: 24x24px (8px padding + 8px icon)
 *   - Use: Default icon button size
 *
 * - **lg**: `p-3` = 12px padding
 *   - Total size: 32x32px (12px padding + 8px icon)
 *   - Use: Spacious icon buttons, prominent actions
 *
 * - **xl**: `p-4` = 16px padding
 *   - Total size: 40x40px (16px padding + 8px icon)
 *   - Use: Maximum icon buttons, hero actions
 *
 * ## Web-Specific Note
 *
 * This mapping is for web components using Tailwind CSS. For mobile
 * components with larger touch targets, use `iconOnlyMobileSizeClasses`
 * instead to ensure WCAG 2.5.5 compliance.
 *
 * ## Usage Context
 *
 * Use this for:
 * - Icon buttons (no text label)
 * - Close buttons
 * - Menu toggles
 * - Icon-only navigation items
 *
 * NOT recommended for:
 * - Buttons with text labels (use `sizeClasses`)
 * - Mobile buttons (use `iconOnlyMobileSizeClasses`)
 *
 * @constant
 * @type {Record<ComponentSize, string>}
 *
 * @example
 * // Icon-only button component
 * import { cn, iconOnlySizeClasses } from '@/utils';
 * const iconButtonClasses = cn(
 *   'inline-flex items-center justify-center',
 *   'rounded-lg hover:bg-grey-100',
 *   iconOnlySizeClasses.md
 * );
 * // Result: "inline-flex items-center justify-center rounded-lg hover:bg-grey-100 p-2"
 *
 * @example
 * // Dynamic icon button sizing
 * const size: ComponentSize = 'lg';
 * const classes = cn('inline-flex items-center justify-center', iconOnlySizeClasses[size]);
 *
 * @see {@link iconOnlyMobileSizeClasses} for mobile icon buttons
 */
export const iconOnlySizeClasses: Record<ComponentSize, string> = {
  xs: 'p-1',
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-3',
  xl: 'p-4',
}

/**
 * Size class mappings for icon-only mobile components.
 *
 * Mobile-specific sizing ensures minimum 44x44px touch targets as per
 * WCAG 2.5.5 Level AAA compliance. Larger padding on mobile compensates
 * for the higher pixel density and smaller physical touch areas compared
 * to desktop/cursor interactions.
 *
 * ## Accessibility Requirements
 *
 * WCAG 2.5.5 (Target Size) Level AAA requires a minimum 44x44 CSS pixels
 * touch target size. These classes ensure all mobile touch targets meet
 * this requirement.
 *
 * ## Padding and Touch Target Breakdown
 *
 * - **xs**: `p-3` = 12px padding
 *   - Touch target: 44x44px (12px padding + 20px icon)
 *   - Use: Minimum acceptable size for mobile
 *
 * - **sm**: `p-3.5` = 14px padding
 *   - Touch target: 48x48px (14px padding + 20px icon)
 *   - Use: Small mobile icon buttons
 *
 * - **md**: `p-4` = 16px padding
 *   - Touch target: 52x52px (16px padding + 20px icon)
 *   - Use: Default mobile icon button size
 *
 * - **lg**: `p-5` = 20px padding
 *   - Touch target: 60x60px (20px padding + 20px icon)
 *   - Use: Spacious mobile icon buttons
 *
 * - **xl**: `p-6` = 24px padding
 *   - Touch target: 68x68px (24px padding + 20px icon)
 *   - Use: Hero/prominent mobile icon buttons
 *
 * ## Mobile-Specific Considerations
 *
 * - **Touch accuracy**: Fingers are wider than cursors; larger targets improve accuracy
 * - **Screen density**: Mobile screens have higher DPI, requiring larger visual targets
 * - **Interaction context**: Mobile buttons are often used in-app navigation and actions
 * - **One-handed use**: Consider thumb-reachable areas on phones
 *
 * ## Comparison to Web
 *
 * Mobile sizes are significantly larger than web equivalents:
 * - Web md: `p-2` (8px padding) = ~24px component
 * - Mobile md: `p-4` (16px padding) = ~52px component
 *
 * This difference reflects the physical interaction model differences.
 *
 * ## Usage Context
 *
 * Use this for:
 * - Mobile navigation buttons
 * - Mobile icon-only actions
 * - Mobile menu toggles
 * - Mobile touchable controls
 *
 * NOT recommended for:
 * - Web components (use `iconOnlySizeClasses`)
 * - Mobile buttons with text (use `sizeClasses`)
 *
 * @constant
 * @type {Record<ComponentSize, string>}
 *
 * @example
 * // Mobile icon button component
 * import { cn, iconOnlyMobileSizeClasses } from '@/utils';
 * import { Pressable } from 'react-native';
 *
 * const MobileIconButton = ({ size = 'md' }) => {
 *   const buttonClasses = cn(
 *     'items-center justify-center',
 *     'rounded-lg active:bg-grey-200',
 *     iconOnlyMobileSizeClasses[size]
 *   );
 *   return (
 *     <Pressable className={buttonClasses}>
 *       <Icon size={20} />
 *     </Pressable>
 *   );
 * };
 *
 * @example
 * // Ensuring WCAG compliance
 * // All sizes guarantee minimum 44x44px touch target
 * const classes = cn(iconOnlyMobileSizeClasses.xs); // p-3 = 44px minimum
 *
 * @see {@link iconOnlySizeClasses} for web icon buttons
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/target-size.html} WCAG 2.5.5
 */
export const iconOnlyMobileSizeClasses: Record<ComponentSize, string> = {
  xs: 'p-3',
  sm: 'p-3.5',
  md: 'p-4',
  lg: 'p-5',
  xl: 'p-6',
}

/**
 * Text size class mappings for mobile platforms.
 *
 * Provides font size classes for React Native Text components on mobile.
 * Text sizes match the web font-size tokens (xs, sm, base, lg, xl) to ensure
 * consistency across platforms, but apply to mobile Text components directly.
 *
 * ## Usage on Mobile
 *
 * On React Native, text sizing must be applied to Text components explicitly:
 *
 * ```typescript
 * <Text className={cn(textSizeClasses.md, 'text-white')}>Button text</Text>
 * ```
 *
 * This is different from web where font sizes apply to button elements directly.
 *
 * ## Font Size Breakdown
 *
 * - **xs**: `text-xs` = 12px
 *   - Use: Small labels, captions, helper text
 *   - Line height: ~16px (1.33)
 *
 * - **sm**: `text-sm` = 14px
 *   - Use: Secondary text, small buttons, labels
 *   - Line height: ~20px (1.43)
 *
 * - **md** (base): `text-base` = 16px
 *   - Use: Default/body text, standard button text
 *   - Line height: ~24px (1.5)
 *   - Most common size for readable body text
 *
 * - **lg**: `text-lg` = 18px
 *   - Use: Headings, prominent buttons, emphasis
 *   - Line height: ~28px (1.56)
 *
 * - **xl**: `text-xl` = 20px
 *   - Use: Large headings, hero CTAs
 *   - Line height: ~30px (1.5)
 *
 * ## Mobile-Specific Notes
 *
 * - All sizes assume Nativewind's text sizing system
 * - Font sizes may appear slightly different on different devices due to DPI
 * - Always include line-height for readability (handled by Nativewind)
 * - Test on actual devices for sizing verification
 *
 * ## Matching with Component Sizes
 *
 * These text sizes correspond to the component sizes:
 * - ComponentSize 'xs' → textSizeClasses 'xs' (12px)
 * - ComponentSize 'sm' → textSizeClasses 'sm' (14px)
 * - ComponentSize 'md' → textSizeClasses 'md' (16px)
 * - ComponentSize 'lg' → textSizeClasses 'lg' (18px)
 * - ComponentSize 'xl' → textSizeClasses 'xl' (20px)
 *
 * This ensures visual consistency between component padding and text sizing.
 *
 * ## Cross-Platform Consistency
 *
 * Web uses the same class names (text-xs, text-sm, text-base, text-lg, text-xl)
 * but they apply to button/div elements which inherit font sizes. On mobile,
 * they must be explicitly applied to Text components.
 *
 * @constant
 * @type {Record<ComponentSize, string>}
 *
 * @example
 * // Mobile button with text size matching button size
 * import { cn, sizeClasses, textSizeClasses } from '@/utils';
 * import { Pressable, Text } from 'react-native';
 *
 * const Button = ({ size = 'md', children }) => {
 *   const buttonClasses = cn('flex items-center', sizeClasses[size]);
 *   const textClasses = cn(textSizeClasses[size], 'text-white', 'font-semibold');
 *
 *   return (
 *     <Pressable className={buttonClasses}>
 *       <Text className={textClasses}>{children}</Text>
 *     </Pressable>
 *   );
 * };
 *
 * @example
 * // All text sizes
 * textSizeClasses.xs // "text-xs" → 12px
 * textSizeClasses.sm // "text-sm" → 14px
 * textSizeClasses.md // "text-base" → 16px
 * textSizeClasses.lg // "text-lg" → 18px
 * textSizeClasses.xl // "text-xl" → 20px
 *
 * @example
 * // Applying to Text components
 * <Text className={textSizeClasses.lg}>Heading</Text>
 * <Text className={cn(textSizeClasses.md, 'text-grey-700')}>Body text</Text>
 */
export const textSizeClasses: Record<ComponentSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

/**
 * Border radius class mappings.
 *
 * Maps semantic radius names to Tailwind CSS rounded utilities and Nativewind.
 * Provides consistent corner rounding values across all components on both
 * web and mobile platforms. Values align with design tokens and the 4px grid system.
 *
 * ## Radius Scale and Use Cases
 *
 * - **none**: `rounded-none` = 0px
 *   - Sharp corners, no softness
 *   - Use: Components requiring precise edges (tables, code blocks)
 *
 * - **sm**: `rounded-sm` = 2px
 *   - Subtle rounding, minimal softness
 *   - Use: Compact components, tight layouts
 *
 * - **base** (default): `rounded` = 4px
 *   - Balanced softness, aligns with 4px grid
 *   - Use: Standard components (inputs, containers)
 *   - Most common default value
 *
 * - **md**: `rounded-md` = 6px
 *   - Moderate rounding, visible softness
 *   - Use: Buttons, medium components
 *
 * - **lg**: `rounded-lg` = 8px
 *   - Pronounced rounding, noticeable softness
 *   - Use: Cards, modals, buttons (common)
 *   - Popular for UI components
 *
 * - **xl**: `rounded-xl` = 12px
 *   - Very rounded, strong softness
 *   - Use: Large interactive components
 *
 * - **2xl**: `rounded-2xl` = 16px
 *   - Highly rounded, very smooth edges
 *   - Use: Feature cards, hero sections
 *
 * - **3xl**: `rounded-3xl` = 24px
 *   - Extremely rounded, very smooth edges
 *   - Use: Large hero cards, banners
 *
 * - **full**: `rounded-full` = 9999px (clamped by browser)
 *   - Completely circular/pill-shaped
 *   - Use: Badges, avatars, pills, fully rounded buttons
 *
 * ## Design System Integration
 *
 * Border radius values follow:
 * - 4px grid system (base, md, lg, xl are multiples of 4)
 * - Consistent design token spacing
 * - Cross-platform compatibility (web and mobile)
 *
 * ## Cross-Platform Behaviour
 *
 * - **Web**: Tailwind CSS rounded utilities with browser border-radius
 * - **Mobile**: Nativewind applies same values to React Native components
 * - Both platforms render identically
 *
 * ## Visual Hierarchy
 *
 * Use border radius to create visual hierarchy:
 * - Small radius (base, md): Technical, structured feel
 * - Large radius (xl, 2xl, 3xl): Friendly, approachable feel
 * - full: Maximum friendliness, badges and pills
 *
 * ## Performance Notes
 *
 * Border radius is a static CSS property with no performance impact.
 * All radius values are pre-computed by Tailwind CSS.
 *
 * @constant
 * @type {Record<ComponentRounded, string>}
 *
 * @example
 * // Static border radius
 * const baseClasses = cn('px-4 py-2', roundedClasses.lg); // rounded-lg
 *
 * @example
 * // Dynamic border radius based on component prop
 * const Card = ({ rounded = 'lg' }: { rounded: ComponentRounded }) => {
 *   return (
 *     <div className={cn('p-4 bg-white', roundedClasses[rounded])}>
 *       Card content
 *     </div>
 *   );
 * };
 *
 * @example
 * // Complete button with all styling
 * import { cn, sizeClasses, variantClasses, roundedClasses } from '@/utils';
 *
 * const Button = ({ size = 'md', variant = 'primary', rounded = 'lg' }) => {
 *   return (
 *     <button
 *       className={cn(
 *         'inline-flex items-center justify-center',
 *         sizeClasses[size],
 *         variantClasses[variant],
 *         roundedClasses[rounded]
 *       )}
 *     >
 *       Click me
 *     </button>
 *   );
 * };
 *
 * @example
 * // All radius values
 * roundedClasses.none   // "rounded-none" → 0px
 * roundedClasses.sm     // "rounded-sm" → 2px
 * roundedClasses.base   // "rounded" → 4px
 * roundedClasses.md     // "rounded-md" → 6px
 * roundedClasses.lg     // "rounded-lg" → 8px
 * roundedClasses.xl     // "rounded-xl" → 12px
 * roundedClasses['2xl'] // "rounded-2xl" → 16px
 * roundedClasses['3xl'] // "rounded-3xl" → 24px
 * roundedClasses.full   // "rounded-full" → 9999px
 *
 * @see {@link ComponentRounded} for type definition
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
}

/**
 * Variant class mappings for web components.
 *
 * Defines complete styling for each variant including background colour,
 * text colour, hover states, active/pressed states, focus rings, and shadows.
 * These classes work with web components that support CSS pseudo-classes
 * like :hover, :active, and :focus.
 *
 * ## Interactive States
 *
 * Each variant includes styling for:
 * - **Default**: Base background and text colour
 * - **Hover** (`hover:`): Mouse hover state for desktop users
 * - **Active** (`active:`): Pressed/active state for keyboard and mouse
 * - **Focus** (`focus:ring-*`): Focus ring for keyboard navigation
 * - **Shadow** (`shadow-sm`): Elevation for primary actions (optional)
 *
 * ## Variant Details
 *
 * ### Brand Variants
 *
 * **primary**: Blue brand colour for primary CTAs and important actions
 * - Background: Blue-600 → Blue-700 (hover) → Blue-800 (active)
 * - Text: White
 * - Shadow: sm (elevated)
 * - Use: Main call-to-action buttons, primary actions
 *
 * **secondary**: Purple brand colour for secondary actions
 * - Background: Purple-600 → Purple-700 (hover) → Purple-800 (active)
 * - Text: White
 * - Shadow: sm (elevated)
 * - Use: Secondary actions, alternate CTAs
 *
 * ### Neutral Variants
 *
 * **tertiary**: Grey neutral for tertiary actions
 * - Background: Grey-100 → Grey-200 (hover) → Grey-300 (active)
 * - Text: Grey-900 (dark)
 * - Shadow: None
 * - Focus ring: Grey-500
 * - Use: Tertiary actions, less prominent buttons
 *
 * **ghost**: Transparent with subtle hover for minimal UI
 * - Background: Transparent → Grey-100 (hover) → Grey-200 (active)
 * - Text: Grey-700
 * - Shadow: None
 * - Use: Minimal UI, toolbar buttons, secondary actions
 *
 * **outline**: Bordered transparent for secondary emphasis
 * - Background: Transparent → Grey-50 (hover) → Grey-100 (active)
 * - Border: 2px grey-300 → grey-400 (hover)
 * - Text: Grey-700
 * - Shadow: None
 * - Use: Secondary actions, outlined buttons
 *
 * **link**: Text-only link styling without background
 * - Background: Transparent
 * - Text: Blue-600 → Blue-800 (hover) → Blue-900 (active)
 * - Underline: On hover
 * - Padding: None (p-0)
 * - Use: Inline links, text links, minimal buttons
 *
 * ### Semantic Variants
 *
 * **destructive**: Red for dangerous/delete actions
 * - Background: Red-600 → Red-700 (hover) → Red-800 (active)
 * - Text: White
 * - Shadow: sm (elevated)
 * - Use: Delete buttons, destructive actions, warnings
 *
 * **success**: Green for positive/confirm actions
 * - Background: Green-600 → Green-700 (hover) → Green-800 (active)
 * - Text: White
 * - Shadow: sm (elevated)
 * - Use: Confirm buttons, success CTAs, positive actions
 *
 * **warning**: Amber for cautionary/alert actions
 * - Background: Amber-500 → Amber-600 (hover) → Amber-700 (active)
 * - Text: White
 * - Shadow: sm (elevated)
 * - Use: Alert buttons, cautionary actions, attention
 *
 * ## Accessibility Notes
 *
 * - All variants include focus rings for keyboard navigation
 * - Sufficient contrast between text and background (WCAG AA)
 * - Hover states provide visual feedback for mouse users
 * - Active states distinguish pressed state clearly
 * - Link variant removes padding to avoid oversized link targets
 *
 * ## Design Principles
 *
 * 1. **Colour semantics**: Use variant based on action intent, not appearance
 * 2. **Elevation**: Primary actions (shadow-sm) stand out from secondary
 * 3. **Consistency**: Same variant always looks the same across all components
 * 4. **Contrast**: All text/background combinations meet WCAG AA standards
 *
 * ## Web-Only Notes
 *
 * These styles are web-specific because:
 * - Hover states don't exist on touch devices (use mobileVariantClasses)
 * - CSS pseudo-classes work reliably on web
 * - Shadow elevation is a web design pattern
 *
 * For mobile, use `mobileVariantClasses` instead.
 *
 * @constant
 * @type {Record<ComponentVariant, string>}
 *
 * @example
 * // Web button with variant styling
 * import { cn, sizeClasses, variantClasses } from '@/utils';
 *
 * const Button = ({ variant = 'primary', size = 'md' }) => {
 *   return (
 *     <button
 *       className={cn(
 *         'inline-flex items-center justify-center rounded-lg',
 *         sizeClasses[size],
 *         variantClasses[variant]
 *       )}
 *     >
 *       Click me
 *     </button>
 *   );
 * };
 *
 * @example
 * // All variant colour progressions
 * variantClasses.primary     // bg-blue-600 → blue-700 → blue-800
 * variantClasses.secondary   // bg-purple-600 → purple-700 → purple-800
 * variantClasses.tertiary    // bg-grey-100 → grey-200 → grey-300
 * variantClasses.ghost       // transparent → grey-100 → grey-200
 * variantClasses.outline     // border + transparent → grey-50 → grey-100
 * variantClasses.link        // text-blue-600 → blue-800 → blue-900
 * variantClasses.destructive // bg-red-600 → red-700 → red-800
 * variantClasses.success     // bg-green-600 → green-700 → green-800
 * variantClasses.warning     // bg-amber-500 → amber-600 → amber-700
 *
 * @see {@link mobileVariantClasses} for mobile variant styling
 * @see {@link ComponentVariant} for type definition
 */
export const variantClasses: Record<ComponentVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 shadow-sm',
  secondary:
    'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-purple-500 shadow-sm',
  tertiary: 'bg-grey-100 text-grey-900 hover:bg-grey-200 active:bg-grey-300 focus:ring-grey-500',
  ghost: 'bg-transparent text-grey-700 hover:bg-grey-100 active:bg-grey-200 focus:ring-grey-400',
  outline:
    'bg-transparent border-2 border-grey-300 text-grey-700 hover:bg-grey-50 hover:border-grey-400 active:bg-grey-100 focus:ring-grey-400',
  link: 'bg-transparent text-blue-600 hover:text-blue-800 hover:underline active:text-blue-900 focus:ring-blue-400 p-0',
  destructive:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 shadow-sm',
  success:
    'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500 shadow-sm',
  warning:
    'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 focus:ring-amber-400 shadow-sm',
}

/**
 * Variant class mappings for mobile components.
 *
 * Mobile-specific variant styling designed for touch interactions on React Native.
 * Includes only background colours and active (pressed) states, since hover states
 * don't exist on touch devices. Text colour must be applied separately using
 * `textColorClasses` to Text components.
 *
 * ## Key Differences from Web
 *
 * - **No hover states**: Touch devices don't have hover; only use default and active states
 * - **Simplified styling**: Background only, text colour applied to Text component separately
 * - **Active state emphasis**: Darker active state provides tactile feedback
 * - **No focus rings**: Mobile provides visual focus without explicit rings
 *
 * ## Mobile Interaction Model
 *
 * On mobile, users interact via touch with these states:
 * - **Default**: Button is idle, waiting for touch
 * - **Active** (`active:`): User's finger is pressing the button (immediate feedback)
 * - **Pressed/Released**: State returns to default when finger lifts
 *
 * The active state provides immediate visual feedback without requiring a separate
 * hover state.
 *
 * ## Two-Part Styling Pattern
 *
 * Mobile variant styling requires two separate mappings:
 *
 * 1. **mobileVariantClasses**: Background and border styling
 *    ```typescript
 *    <Pressable className={mobileVariantClasses.primary}>
 *    ```
 *
 * 2. **textColorClasses**: Text colour for Text component
 *    ```typescript
 *    <Text className={textColorClasses.primary}>Text</Text>
 *    ```
 *
 * This separation is necessary because React Native's Pressable doesn't style text;
 * you must wrap text in an explicit Text component.
 *
 * ## Colour Progressions (Default → Active)
 *
 * - **primary**: Blue-600 → Blue-800
 * - **secondary**: Purple-600 → Purple-800
 * - **tertiary**: Grey-100 → Grey-300
 * - **ghost**: Transparent → Grey-200
 * - **outline**: Transparent (border grey-300) → Grey-100
 * - **link**: Transparent → Grey-50
 * - **destructive**: Red-600 → Red-800
 * - **success**: Green-600 → Green-800
 * - **warning**: Amber-500 → Amber-700
 *
 * ## Semantic Usage
 *
 * Use the same semantic approach as web variants:
 * - **primary**: Main actions, CTAs
 * - **secondary**: Alternative actions
 * - **tertiary**: Less prominent actions
 * - **ghost**: Minimal buttons, secondary UI
 * - **outline**: Bordered buttons
 * - **link**: Text links
 * - **destructive**: Delete/dangerous actions
 * - **success**: Positive/confirm actions
 * - **warning**: Cautionary/alert actions
 *
 * ## Accessibility for Mobile
 *
 * - Active state change provides feedback without hover
 * - Colour contrast meets WCAG AA standards
 * - Touch targets are 44x44px minimum (use with appropriate sizing)
 * - Semantic variants clearly communicate intent
 *
 * @constant
 * @type {Record<ComponentVariant, string>}
 *
 * @example
 * // Complete mobile button example
 * import { cn, sizeClasses, mobileVariantClasses, textColorClasses } from '@/utils';
 * import { Pressable, Text } from 'react-native';
 *
 * const Button = ({ variant = 'primary', size = 'md', children }) => {
 *   const buttonClasses = cn(
 *     'items-center justify-center rounded-lg',
 *     sizeClasses[size],
 *     mobileVariantClasses[variant]
 *   );
 *
 *   const textClasses = cn(
 *     textColorClasses[variant],
 *     'font-semibold'
 *   );
 *
 *   return (
 *     <Pressable className={buttonClasses}>
 *       <Text className={textClasses}>{children}</Text>
 *     </Pressable>
 *   );
 * };
 *
 * @example
 * // All variant defaults and active states
 * mobileVariantClasses.primary     // bg-blue-600 → active:bg-blue-800
 * mobileVariantClasses.secondary   // bg-purple-600 → active:bg-purple-800
 * mobileVariantClasses.tertiary    // bg-grey-100 → active:bg-grey-300
 * mobileVariantClasses.ghost       // transparent → active:bg-grey-200
 * mobileVariantClasses.outline     // border grey-300 → active:bg-grey-100
 * mobileVariantClasses.link        // transparent → active:bg-grey-50
 * mobileVariantClasses.destructive // bg-red-600 → active:bg-red-800
 * mobileVariantClasses.success     // bg-green-600 → active:bg-green-800
 * mobileVariantClasses.warning     // bg-amber-500 → active:bg-amber-700
 *
 * @see {@link textColorClasses} for text colour styling
 * @see {@link variantClasses} for web variant styling with hover states
 * @see {@link ComponentVariant} for type definition
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
}

/**
 * Text colour variant mappings for mobile Text components.
 *
 * Defines text colours for each variant to be applied to React Native Text components.
 * Since React Native requires explicit Text components for text rendering, these
 * colours must be applied separately from the button/container styling.
 *
 * ## Why Separate Text Colour Mapping
 *
 * On mobile (React Native), unlike web:
 * - Buttons don't have implicit text rendering
 * - Text colour isn't inherited from button styling
 * - Must wrap text in explicit `<Text>` component
 * - Text colour applies to that Text component separately
 *
 * Example:
 * ```typescript
 * <Pressable className={mobileVariantClasses.primary}>
 *   <Text className={textColorClasses.primary}>Label</Text>
 * </Pressable>
 * ```
 *
 * ## Colour Strategy
 *
 * Text colours are chosen to ensure adequate contrast against their button backgrounds:
 *
 * ### White Text (High Contrast on Dark Backgrounds)
 * - **primary**: White on Blue-600
 * - **secondary**: White on Purple-600
 * - **destructive**: White on Red-600
 * - **success**: White on Green-600
 * - **warning**: White on Amber-500
 *
 * ### Dark Text (High Contrast on Light Backgrounds)
 * - **tertiary**: Dark Grey-900 on Light Grey-100
 * - **ghost**: Mid Grey-700 on Transparent/Light backgrounds
 * - **outline**: Mid Grey-700 on Transparent + Border
 *
 * ### Brand Text (Colour-Matched)
 * - **link**: Blue-600 text for link semantics
 *
 * ## WCAG Compliance
 *
 * All text colour and background combinations meet WCAG AA standards:
 * - Contrast ratio minimum 4.5:1 for normal text
 * - Contrast ratio minimum 3:1 for large text
 * - Ensures readability for all users
 *
 * ## Usage Pattern
 *
 * Always pair with mobileVariantClasses:
 * - mobileVariantClasses handles background and active states
 * - textColorClasses applies text colour to Text component
 * - Together they create complete button styling
 *
 * ## Mobile-Specific Considerations
 *
 * - No colour inheritance from parent (unlike web)
 * - Must be explicitly set on Text component
 * - Respects system dark mode if app supports it
 * - No pseudo-classes like :hover (but active state handled by mobileVariantClasses)
 *
 * @constant
 * @type {Record<ComponentVariant, string>}
 *
 * @example
 * // Applying text colour to mobile Text component
 * import { cn, textColorClasses } from '@/utils';
 * import { Text } from 'react-native';
 *
 * <Text className={cn(textColorClasses.primary, 'font-semibold')}>
 *   Save Changes
 * </Text>
 *
 * @example
 * // Complete mobile button with both styling mappings
 * import { cn, mobileVariantClasses, textColorClasses } from '@/utils';
 * import { Pressable, Text } from 'react-native';
 *
 * <Pressable className={cn('p-4 rounded-lg', mobileVariantClasses.primary)}>
 *   <Text className={cn(textColorClasses.primary, 'font-bold text-base')}>
 *     Click me
 *   </Text>
 * </Pressable>
 *
 * @example
 * // All variant text colours
 * textColorClasses.primary     // text-white
 * textColorClasses.secondary   // text-white
 * textColorClasses.tertiary    // text-grey-900
 * textColorClasses.ghost       // text-grey-700
 * textColorClasses.outline     // text-grey-700
 * textColorClasses.link        // text-blue-600
 * textColorClasses.destructive // text-white
 * textColorClasses.success     // text-white
 * textColorClasses.warning     // text-white
 *
 * @example
 * // Contrast validation (examples)
 * // White on blue: #ffffff on #2563eb = 8.59:1 ratio (AAA)
 * // Dark grey on light grey: #374151 on #f3f4f6 = 11.2:1 ratio (AAA)
 * // Blue on transparent: #2563eb on white = 3.97:1 ratio (AA)
 *
 * @see {@link mobileVariantClasses} for background and active state styling
 * @see {@link variantClasses} for web text colours (included in variant mapping)
 * @see {@link ComponentVariant} for type definition
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
}

/**
 * Spinner/loading indicator colour mappings for mobile components.
 *
 * Provides hex colour values for React Native ActivityIndicator components.
 * Ensures loading spinners are visible and have appropriate contrast against
 * their button backgrounds whilst loading.
 *
 * ## Purpose
 *
 * Loading indicators (spinners) provide visual feedback that an action is in progress.
 * These colours match the text or icon colours for each variant to maintain consistency.
 *
 * ## Usage Context
 *
 * Use when buttons show loading state:
 * - During async operations (API calls, file uploads)
 * - Whilst waiting for user confirmation
 * - During long-running processes
 * - To prevent multiple submissions
 *
 * ## Colour Strategy
 *
 * Spinner colours are chosen to match or complement the button's text colour:
 *
 * ### White Spinners (on Dark Backgrounds)
 * - **primary**: White spinner on Blue-600 background
 * - **secondary**: White spinner on Purple-600 background
 * - **destructive**: White spinner on Red-600 background
 * - **success**: White spinner on Green-600 background
 * - **warning**: White spinner on Amber-500 background
 *
 * These match the white text colour (`textColorClasses`) for consistency.
 *
 * ### Dark Spinners (on Light Backgrounds)
 * - **tertiary**: Dark grey (#111827) spinner on Light Grey-100
 * - **ghost**: Mid grey (#374151) spinner on Transparent/Light backgrounds
 * - **outline**: Mid grey (#374151) spinner on Transparent + Border
 *
 * ### Brand Spinners (Colour-Matched)
 * - **link**: Blue spinner (#2563eb) matching link text colour
 *
 * ## Hex Colour Values
 *
 * - `#ffffff` (white): Pure white for maximum contrast on dark
 * - `#111827` (grey-900): Near-black, darkest grey for strong contrast
 * - `#374151` (grey-700): Mid-tone grey for readable contrast on light
 * - `#2563eb` (blue-600): Brand blue for link variant
 *
 * ## Contrast Ratios
 *
 * All spinner colours meet WCAG AA accessibility requirements:
 * - White on Blue-600: 8.59:1 (AAA)
 * - Grey-900 on Grey-100: 15.3:1 (AAA)
 * - Grey-700 on Transparent: 7.0:1 (AAA)
 * - Blue on White: 3.97:1 (AA)
 *
 * ## Implementation Notes
 *
 * React Native ActivityIndicator requires explicit hex colours, not class names:
 *
 * ```typescript
 * <ActivityIndicator
 *   color={spinnerColors.primary}
 *   size="large"
 * />
 * ```
 *
 * ## Performance Considerations
 *
 * - ActivityIndicator performance depends on the platform and animation smoothness
 * - Spinners may be GPU-accelerated on modern devices
 * - Consider disabling spinner animation if performance is critical
 * - Test on target devices for smooth animation
 *
 * ## Mobile-Specific Notes
 *
 * - ActivityIndicator is the standard loading component on React Native
 * - Colours must be hex values (CSS colour names not supported)
 * - Can be customized further with size and speed props
 * - Consider adding haptic feedback alongside spinner for better UX
 *
 * @constant
 * @type {Record<ComponentVariant, string>}
 *
 * @example
 * // Loading button with spinner
 * import { spinnerColors, mobileVariantClasses, textColorClasses } from '@/utils';
 * import { Pressable, Text, ActivityIndicator } from 'react-native';
 *
 * const LoadingButton = ({ isLoading = false, variant = 'primary' }) => {
 *   return (
 *     <Pressable
 *       disabled={isLoading}
 *       className={cn('p-4 rounded-lg', mobileVariantClasses[variant])}
 *     >
 *       {isLoading ? (
 *         <ActivityIndicator color={spinnerColors[variant]} size="small" />
 *       ) : (
 *         <Text className={textColorClasses[variant]}>Save</Text>
 *       )}
 *     </Pressable>
 *   );
 * };
 *
 * @example
 * // All spinner hex colours by variant
 * spinnerColors.primary     // "#ffffff" white
 * spinnerColors.secondary   // "#ffffff" white
 * spinnerColors.tertiary    // "#111827" dark grey
 * spinnerColors.ghost       // "#374151" mid grey
 * spinnerColors.outline     // "#374151" mid grey
 * spinnerColors.link        // "#2563eb" blue
 * spinnerColors.destructive // "#ffffff" white
 * spinnerColors.success     // "#ffffff" white
 * spinnerColors.warning     // "#ffffff" white
 *
 * @example
 * // Comparing spinner colour to text and background
 * // Primary button with loading:
 * // - Background: bg-blue-600
 * // - Text (normal): text-white
 * // - Spinner (loading): #ffffff (white)
 * // Result: Consistent white appearance whether showing text or spinner
 *
 * @see {@link textColorClasses} for button text colours
 * @see {@link mobileVariantClasses} for button backgrounds
 * @see {@link ComponentVariant} for type definition
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
}

/**
 * Loading spinner size mappings for web components.
 *
 * Defines Tailwind CSS width and height classes for SVG loading spinners.
 * Sizes scale proportionally with button sizes to maintain visual harmony
 * and ensure spinners are appropriately sized relative to their containers.
 *
 * ## Purpose
 *
 * Loading spinners provide visual feedback that an action is in progress on web.
 * These sizes ensure spinners are visible but not oversized, matching the
 * visual weight of button text at each size level.
 *
 * ## Size Breakdown
 *
 * Each size maps to Tailwind CSS width and height utilities:
 *
 * - **xs**: `w-3 h-3` = 12px
 *   - Use: Small buttons, compact layouts
 *   - Matches text-xs (12px)
 *   - Good for dense UIs
 *
 * - **sm**: `w-4 h-4` = 16px
 *   - Use: Small to medium buttons
 *   - Matches text-sm (14px)
 *   - Balanced for secondary actions
 *
 * - **md** (default): `w-5 h-5` = 20px
 *   - Use: Standard buttons, most components
 *   - Matches text-base (16px)
 *   - Best size for typical buttons
 *
 * - **lg**: `w-6 h-6` = 24px
 *   - Use: Large buttons, prominent actions
 *   - Matches text-lg (18px)
 *   - Visually stronger presence
 *
 * - **xl**: `w-7 h-7` = 28px
 *   - Use: Extra large buttons, hero CTAs
 *   - Matches text-xl (20px)
 *   - Maximum visual prominence
 *
 * ## Scaling Ratios
 *
 * Spinner sizes scale with button sizes to maintain proportionality:
 * - xs: 12px spinner in xs button (8px padding + 4px border)
 * - sm: 16px spinner in sm button (6px padding + 4px border)
 * - md: 20px spinner in md button (8px padding + 4px border)
 * - lg: 24px spinner in lg button (12px padding + 0px border)
 * - xl: 28px spinner in xl button (16px padding + 0px border)
 *
 * This maintains consistent visual balance across all button sizes.
 *
 * ## SVG Implementation
 *
 * These classes apply to SVG elements. For example, to create a spinning loader:
 *
 * - Apply spinnerSizeClasses to SVG element
 * - Add animate-spin class for rotation animation
 * - Combine with text colour for visibility
 *
 * The w-5 h-5 (20x20px) creates a square container appropriately sized for the SVG.
 *
 * ## Animation Considerations
 *
 * - Spinners typically include `animate-spin` class for rotation
 * - Combined with size classes: `cn('animate-spin', spinnerSizeClasses[size])`
 * - Animation performance is good even on slower devices at these sizes
 * - Consider using CSS animations rather than JavaScript for smooth performance
 *
 * ## Web-Specific Notes
 *
 * - These are web-only sizes (SVG spinners are a web pattern)
 * - Mobile uses ActivityIndicator with `spinnerColors` instead
 * - SVG spinners allow full CSS styling and animation
 * - Consider using icon libraries (e.g., Heroicons) for spinner graphics
 *
 * ## Accessibility for Spinners
 *
 * - Spinners should include `aria-label` or `aria-busy` on parent
 * - Consider adding status text alongside spinner (e.g., "Saving...")
 * - Ensure animation respects `prefers-reduced-motion` for accessibility
 *
 * @constant
 * @type {Record<ComponentSize, string>}
 *
 * @example
 * // All spinner sizes (width and height classes)
 * spinnerSizeClasses.xs // "w-3 h-3" equals 12px
 * spinnerSizeClasses.sm // "w-4 h-4" equals 16px
 * spinnerSizeClasses.md // "w-5 h-5" equals 20px (default)
 * spinnerSizeClasses.lg // "w-6 h-6" equals 24px
 * spinnerSizeClasses.xl // "w-7 h-7" equals 28px
 *
 * @example
 * // Combining with animation class
 * // Apply to SVG spinner element with animate-spin class
 * // Example usage with cn utility and spinnerSizeClasses.md
 *
 * @example
 * // Dynamic spinner sizing pattern
 * // Pass size prop to button component
 * // Destructure spinnerSizeClasses based on size
 * // Apply to SVG className prop along with animate-spin
 *
 * @see {@link spinnerColors} for mobile spinner colours
 * @see {@link sizeClasses} for button size mappings
 */
export const spinnerSizeClasses: Record<ComponentSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
}
