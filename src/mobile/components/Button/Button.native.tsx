/**
 * @fileoverview Button component for React Native mobile applications
 *
 * Implements a comprehensive, accessible button component with support for multiple
 * visual variants, sizes, loading states, and icons. Optimised for iOS and Android
 * with full WCAG 2.1 accessibility compliance.
 *
 * ## Key Features
 *
 * - **Touch Optimisation**: Minimum 44x44 point touch target (WCAG 2.5.5 Level AAA)
 * - **Multiple Variants**: 9 style options (primary, secondary, tertiary, outline, ghost,
 *   link, destructive, success, warning)
 * - **Size Options**: 5 sizes (xs, sm, md, lg, xl) with responsive scaling
 * - **Icon Support**: Left, right, and icon-only configurations
 * - **Loading States**: Native ActivityIndicator with loading animation
 * - **Accessibility**: Full screen reader support, semantic roles, and state management
 * - **Styling**: Nativewind (Tailwind CSS for React Native) with className customisation
 *
 * ## React Native Components Used
 *
 * - `Pressable`: Main interactive component (replaces `<button>` on web)
 * - `Text`: All text rendering (required in React Native)
 * - `View`: Container/wrapper component
 * - `ActivityIndicator`: Native loading spinner
 *
 * ## Accessibility Considerations
 *
 * - Uses React Native Pressable with onPress handler (not onClick)
 * - Provides accessibilityRole="button" for semantic meaning
 * - Requires accessibilityLabel for icon-only buttons
 * - Supports accessibilityState for toggle and expandable buttons
 * - Disabled state is announced to screen readers
 * - Loading state (busy) is announced during async operations
 *
 * @see {@link https://reactnative.dev/docs/pressable} React Native Pressable documentation
 * @see {@link https://reactnative.dev/docs/accessibility} React Native Accessibility
 * @see {@link https://www.nativewind.dev/} Nativewind documentation
 */

import React from 'react'
import { Pressable, Text, ActivityIndicator, View } from 'react-native'
import {
  type ComponentSize,
  type ComponentVariant,
  type ComponentRounded,
  sizeClasses,
  iconOnlyMobileSizeClasses,
  roundedClasses,
  mobileVariantClasses,
  textColorClasses,
  textSizeClasses,
  spinnerColors,
  cn,
} from '@/utils'

/**
 * Size variants for Button components
 */
export type ButtonSize = ComponentSize

/**
 * Visual style variants for Button components
 */
export type ButtonVariant = ComponentVariant

/**
 * Border radius variants for Button components
 * Maps to the borders.radius design tokens
 */
export type ButtonRounded = ComponentRounded

/**
 * Props for the mobile Button component
 */
export interface ButtonProps {
  /** The text or content displayed inside the button */
  children: React.ReactNode

  /** Callback function invoked when the button is pressed */
  onPress?: () => void

  /** Visual style variant of the button */
  variant?: ButtonVariant

  /** Size of the button */
  size?: ButtonSize

  /** Border radius of the button - defaults to 'lg' (8px) */
  rounded?: ButtonRounded

  /** Whether the button is disabled and should not respond to interactions */
  disabled?: boolean

  /** Whether the button is in a loading state */
  loading?: boolean

  /** Whether the button should take the full width of its container */
  fullWidth?: boolean

  /** Icon to display before the button text */
  iconLeft?: React.ReactNode

  /** Icon to display after the button text */
  iconRight?: React.ReactNode

  /** Whether the button is icon-only (no text) */
  iconOnly?: boolean

  /** Additional Nativewind CSS classes for custom styling */
  className?: string

  /** Accessible label for screen readers (required for icon-only buttons) */
  accessibilityLabel?: string

  /** Accessibility hint providing context about the button's action */
  accessibilityHint?: string

  /** Accessibility state for toggle buttons */
  accessibilityState?: {
    disabled?: boolean
    selected?: boolean
    checked?: boolean | 'mixed'
    busy?: boolean
    expanded?: boolean
  }

  /** Test ID for automated testing */
  testID?: string
}

/**
 * Button component for React Native mobile applications
 *
 * A comprehensive, accessible button component with support for multiple variants,
 * sizes, loading states, icons, and full WCAG 2.1 compliance. Optimised for touch
 * interfaces on iOS and Android platforms.
 *
 * ## Features
 *
 * **Visual Variants (9 options):**
 * - `primary`: Main call-to-action with solid background (blue by default)
 * - `secondary`: Secondary action with alternative background (grey by default)
 * - `tertiary`: Subtle emphasis for tertiary actions
 * - `outline`: Bordered button with transparent background
 * - `ghost`: Minimal styling that blends into interface
 * - `link`: Styled as text link for navigation and simple actions
 * - `destructive`: Red styling for delete/remove operations
 * - `success`: Green styling for confirmations and approvals
 * - `warning`: Yellow styling for cautionary actions
 *
 * **Sizes (5 options):**
 * - `xs`: Extra small (compact interfaces, inline actions)
 * - `sm`: Small (secondary actions, compact layouts)
 * - `md`: Medium (default, most common use case)
 * - `lg`: Large (primary actions, prominent CTAs)
 * - `xl`: Extra large (hero sections, very prominent actions)
 * - **All sizes maintain minimum 44x44 point touch target (WCAG 2.5.5)**
 *
 * **Border Radius Options:**
 * - `none`: Square corners for modern, sharp appearance
 * - `sm`, `base`, `md`, `lg`, `xl`, `2xl`, `3xl`: Increasing roundness
 * - `full`: Pill-shaped button (100% border-radius)
 *
 * **Icon Support:**
 * - `iconLeft`: Icon displayed before button text
 * - `iconRight`: Icon displayed after button text
 * - `iconOnly`: Icon without text (requires accessibilityLabel)
 *
 * **States:**
 * - Default: Interactive and responsive
 * - Loading: Shows native ActivityIndicator, disables interaction
 * - Disabled: Reduced opacity, no interaction, announced to screen readers
 * - Active/Pressed: Darker shade with active: Tailwind class
 *
 * ## Accessibility
 *
 * This component is fully accessible for iOS and Android screen readers:
 *
 * - **Touch Target**: Minimum 44x44 points (exceeds WCAG 2.5.5 Level AAA)
 * - **Role**: accessibilityRole="button" for semantic meaning
 * - **Label**: accessibilityLabel describes button purpose (required for icon-only)
 * - **Hint**: accessibilityHint provides additional context
 * - **State**: accessibilityState indicates disabled, loading, selected, checked states
 * - **Screen Readers**:
 *   - iOS VoiceOver announces role, label, hint, and state
 *   - Android TalkBack announces role, label, hint, and state
 * - **Disabled State**: Screen readers announce "disabled"
 * - **Loading State**: Screen readers announce "busy" during async operations
 *
 * ## Styling with Nativewind
 *
 * The component uses Nativewind (Tailwind CSS for React Native) for styling.
 * Default styles are applied automatically, and can be extended via the `className` prop:
 *
 * ```typescript
 * <Button className="shadow-lg md:w-full">
 *   Extended button
 * </Button>
 * ```
 *
 * Style Classes Applied:
 * - Base: `flex-row items-center justify-center min-h-[44px]`
 * - Variant: Colour and background based on `variant` prop
 * - Size: Padding and font size based on `size` prop
 * - Rounded: Border radius based on `rounded` prop
 * - Full Width: `w-full` when `fullWidth={true}`
 * - Disabled/Loading: `opacity-50` when disabled or loading
 *
 * @example
 * // Basic primary button with default styling
 * <Button onPress={() => console.log('pressed')}>
 *   Press me
 * </Button>
 *
 * @example
 * // Secondary button with icon on left
 * <Button
 *   variant="secondary"
 *   iconLeft={<SaveIcon />}
 *   onPress={handleSave}
 * >
 *   Save Draft
 * </Button>
 *
 * @example
 * // Loading state during async operation
 * <Button
 *   loading={isSubmitting}
 *   onPress={handleSubmit}
 * >
 *   {isSubmitting ? 'Submitting...' : 'Submit Form'}
 * </Button>
 *
 * @example
 * // Icon-only button (must have accessibilityLabel)
 * <Button
 *   iconOnly
 *   accessibilityLabel="Close navigation menu"
 *   onPress={handleClose}
 * >
 *   <CloseIcon />
 * </Button>
 *
 * @example
 * // Toggle button with accessibility state
 * <Button
 *   accessibilityState={{ selected: isActive }}
 *   accessibilityHint={isActive ? 'Feature is enabled' : 'Feature is disabled'}
 *   onPress={toggleFeature}
 * >
 *   {isActive ? 'Enabled' : 'Disabled'}
 * </Button>
 *
 * @example
 * // Form buttons (primary + secondary)
 * <View className="flex-row gap-3">
 *   <Button
 *     variant="outline"
 *     className="flex-1"
 *     onPress={handleCancel}
 *   >
 *     Cancel
 *   </Button>
 *   <Button
 *     variant="primary"
 *     className="flex-1"
 *     onPress={handleSubmit}
 *   >
 *     Submit
 *   </Button>
 * </View>
 *
 * @param props - Component props
 * @param props.children - Button text content or icon (required)
 * @param props.onPress - Callback when button is pressed (optional)
 * @param props.variant - Visual style (default: 'primary')
 * @param props.size - Button size (default: 'md')
 * @param props.rounded - Border radius (default: 'lg')
 * @param props.disabled - Disable interaction (default: false)
 * @param props.loading - Show loading state (default: false)
 * @param props.fullWidth - Take full container width (default: false)
 * @param props.iconLeft - Icon before text (optional)
 * @param props.iconRight - Icon after text (optional)
 * @param props.iconOnly - Icon without text (default: false)
 * @param props.className - Additional Nativewind classes (optional)
 * @param props.accessibilityLabel - Screen reader label (required if iconOnly)
 * @param props.accessibilityHint - Screen reader hint (optional)
 * @param props.accessibilityState - Accessibility state (optional)
 * @param props.testID - Test identifier (optional)
 *
 * @returns A rendered Pressable component with full accessibility support for iOS and Android
 *
 * @see {@link https://reactnative.dev/docs/pressable} React Native Pressable
 * @see {@link https://reactnative.dev/docs/accessibility} React Native Accessibility
 * @see {@link https://www.nativewind.dev/} Nativewind documentation
 * @see {@link https://www.w3.org/WAI/WCAG21/quickref/} WCAG 2.1 accessibility guidelines
 */
export const Button = ({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  rounded = 'lg',
  disabled = false,
  loading = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  iconOnly = false,
  className = '',
  accessibilityLabel,
  accessibilityHint,
  accessibilityState,
  testID,
}: ButtonProps) => {
  // Base styles applied to all buttons
  // flex-row: Horizontal layout for icon + text arrangement
  // items-center: Vertically centre children
  // justify-center: Horizontally centre children
  // min-h-[44px]: Minimum touch target height (WCAG 2.5.5 standard)
  const baseStyles = 'flex-row items-center justify-center min-h-[44px]'

  // Combine all button classes using the cn utility function
  // This merges and de-duplicates Nativewind classes
  const buttonClasses = cn(
    baseStyles,
    // Use icon-only size classes for icon-only buttons, otherwise use regular size classes
    // Icon-only buttons may have different padding since there's no text
    iconOnly ? iconOnlyMobileSizeClasses[size] : sizeClasses[size],
    // Border radius based on rounded prop
    roundedClasses[rounded],
    // Variant-specific styling (background, text colour, etc.)
    mobileVariantClasses[variant],
    // Full width: stretch to container width
    fullWidth && 'w-full',
    // Disabled/Loading: reduce opacity for visual feedback
    (disabled || loading) && 'opacity-50',
    // Custom classes from props for additional styling
    className
  )

  // Combine text classes for the button label
  // These classes are applied only to the Text component containing the label
  const textClasses = cn(
    // Font size based on button size
    textSizeClasses[size],
    // Text colour based on variant (e.g., white on primary, dark on light)
    textColorClasses[variant],
    // Always use semibold for better visibility
    'font-semibold',
    // Centre text horizontally
    'text-center'
  )

  // Accessibility warning: Icon-only buttons must have a label for screen readers
  // This helps users of VoiceOver (iOS) and TalkBack (Android) understand the button's purpose
  if (iconOnly && !accessibilityLabel) {
    console.warn('Icon-only buttons must have an accessibilityLabel for accessibility')
  }

  // Compute final accessibility state by merging user-provided state with computed state
  // This ensures loading and disabled states are properly announced to screen readers
  const computedAccessibilityState = {
    ...accessibilityState,
    // disabled state is announced to screen readers
    disabled: disabled || loading,
    // busy state is announced during loading (used by screen readers)
    busy: accessibilityState?.busy ?? loading,
  }

  return (
    <Pressable
      // onPress: Called when button is pressed (replaces onClick from web)
      onPress={onPress}
      // disabled: Prevents press handler from firing and provides visual feedback
      // Disabled state is also announced to screen readers
      disabled={disabled || loading}
      // className: Nativewind classes for styling
      className={buttonClasses}
      // accessibilityRole: Semantic role for screen readers (announces "button")
      accessibilityRole="button"
      // accessibilityLabel: Describes the button's purpose for screen readers
      // Critical for icon-only buttons, optional for text buttons
      accessibilityLabel={accessibilityLabel}
      // accessibilityHint: Additional context about the button's action
      // Used by screen readers to provide more information
      accessibilityHint={accessibilityHint}
      // accessibilityState: Indicates the current state of the button
      // Includes: disabled, busy (loading), selected, checked, expanded
      accessibilityState={computedAccessibilityState}
      // testID: Identifier for automated testing and debugging
      testID={testID}
    >
      {/* Show loading indicator when loading */}
      {loading && (
        <ActivityIndicator
          // Use smaller spinner for xs and sm buttons
          size={size === 'xs' || size === 'sm' ? 'small' : 'large'}
          // Colour spinner to match button variant
          color={spinnerColors[variant]}
        />
      )}
      {/* Show left icon when not loading */}
      {!loading && iconLeft && <View className="inline-flex">{iconLeft}</View>}
      {/* Show text label when not icon-only */}
      {!iconOnly && <Text className={textClasses}>{children}</Text>}
      {/* Show children directly for icon-only buttons */}
      {iconOnly && children}
      {/* Show right icon when not loading */}
      {!loading && iconRight && <View className="inline-flex">{iconRight}</View>}
    </Pressable>
  )
}
