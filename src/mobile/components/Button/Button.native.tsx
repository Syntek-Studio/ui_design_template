import React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
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
} from '@/utils';

/**
 * Size variants for Button components
 */
export type ButtonSize = ComponentSize;

/**
 * Visual style variants for Button components
 */
export type ButtonVariant = ComponentVariant;

/**
 * Border radius variants for Button components
 * Maps to the borders.radius design tokens
 */
export type ButtonRounded = ComponentRounded;

/**
 * Props for the mobile Button component
 */
export interface ButtonProps {
  /** The text or content displayed inside the button */
  children: React.ReactNode;

  /** Callback function invoked when the button is pressed */
  onPress?: () => void;

  /** Visual style variant of the button */
  variant?: ButtonVariant;

  /** Size of the button */
  size?: ButtonSize;

  /** Border radius of the button - defaults to 'lg' (8px) */
  rounded?: ButtonRounded;

  /** Whether the button is disabled and should not respond to interactions */
  disabled?: boolean;

  /** Whether the button is in a loading state */
  loading?: boolean;

  /** Whether the button should take the full width of its container */
  fullWidth?: boolean;

  /** Icon to display before the button text */
  iconLeft?: React.ReactNode;

  /** Icon to display after the button text */
  iconRight?: React.ReactNode;

  /** Whether the button is icon-only (no text) */
  iconOnly?: boolean;

  /** Additional Nativewind CSS classes for custom styling */
  className?: string;

  /** Accessible label for screen readers (required for icon-only buttons) */
  accessibilityLabel?: string;

  /** Accessibility hint providing context about the button's action */
  accessibilityHint?: string;

  /** Accessibility state for toggle buttons */
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
  };

  /** Test ID for automated testing */
  testID?: string;
}

/**
 * Button component for React Native mobile applications
 *
 * A comprehensive button component with support for multiple variants, sizes,
 * loading states, icons, and full accessibility compliance for iOS and Android.
 *
 * Variants include:
 * - primary: Main call-to-action with solid background
 * - secondary: Secondary actions with solid background
 * - tertiary/ghost: Minimal styling for subtle actions
 * - outline: Bordered button with transparent background
 * - link: Styled as a text link
 * - destructive: For dangerous or destructive actions
 * - success: For positive confirmation actions
 * - warning: For cautionary actions
 *
 * Sizes include: xs, sm, md (default), lg, xl
 *
 * Accessibility features:
 * - Minimum 44x44 touch target on all sizes (WCAG 2.5.5)
 * - accessibilityLabel for icon-only buttons
 * - accessibilityHint for contextual information
 * - accessibilityState for toggle/expandable buttons
 * - Screen reader support on iOS and Android
 * - Proper disabled state announcements
 *
 * @example
 * // Basic primary button
 * <Button onPress={() => console.log('pressed')}>Press me</Button>
 *
 * @example
 * // Secondary button with icon
 * <Button variant="secondary" iconLeft={<Icon />}>
 *   Save Draft
 * </Button>
 *
 * @example
 * // Loading state
 * <Button loading={true}>Submitting...</Button>
 *
 * @example
 * // Icon-only button (requires accessibilityLabel)
 * <Button iconOnly accessibilityLabel="Close menu">
 *   <CloseIcon />
 * </Button>
 *
 * @example
 * // Toggle button
 * <Button
 *   accessibilityState={{ selected: isSelected }}
 *   onPress={toggle}
 * >
 *   Toggle Feature
 * </Button>
 *
 * @param props - The button properties
 * @returns A rendered Pressable component with full accessibility support
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
  const baseStyles = 'flex-row items-center justify-center min-h-[44px]';

  // Combine all button classes using the cn utility
  const buttonClasses = cn(
    baseStyles,
    iconOnly ? iconOnlyMobileSizeClasses[size] : sizeClasses[size],
    roundedClasses[rounded],
    mobileVariantClasses[variant],
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-50',
    className
  );

  // Combine text classes using the cn utility
  const textClasses = cn(
    textSizeClasses[size],
    textColorClasses[variant],
    'font-semibold',
    'text-center'
  );

  // Icon-only buttons must have accessibilityLabel
  if (iconOnly && !accessibilityLabel) {
    console.warn('Icon-only buttons must have an accessibilityLabel for accessibility');
  }

  // Combine accessibility state with loading/disabled
  const computedAccessibilityState = {
    ...accessibilityState,
    disabled: disabled || loading,
    busy: accessibilityState?.busy ?? loading,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={buttonClasses}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={computedAccessibilityState}
      testID={testID}
    >
      {loading && (
        <ActivityIndicator
          size={size === 'xs' || size === 'sm' ? 'small' : 'large'}
          color={spinnerColors[variant]}
        />
      )}
      {!loading && iconLeft && <View className="inline-flex">{iconLeft}</View>}
      {!iconOnly && <Text className={textClasses}>{children}</Text>}
      {iconOnly && children}
      {!loading && iconRight && <View className="inline-flex">{iconRight}</View>}
    </Pressable>
  );
};
