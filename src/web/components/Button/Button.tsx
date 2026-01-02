import React from 'react'
import {
  type ComponentSize,
  type ComponentVariant,
  type ComponentRounded,
  sizeClasses,
  iconOnlySizeClasses,
  roundedClasses,
  variantClasses,
  spinnerSizeClasses,
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
 * Props for the Button component
 */
export interface ButtonProps {
  /** The text or content displayed inside the button */
  children: React.ReactNode

  /** Callback function invoked when the button is clicked */
  onClick?: () => void

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

  /** Additional Tailwind CSS classes for custom styling */
  className?: string

  /** ARIA label for icon-only buttons */
  'aria-label'?: string

  /** ARIA pressed state for toggle buttons */
  'aria-pressed'?: boolean | 'false' | 'mixed' | 'true'

  /** ARIA expanded state for buttons that open menus */
  'aria-expanded'?: boolean

  /** ARIA haspopup for buttons that trigger menus */
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'

  /** ARIA busy state for loading buttons */
  'aria-busy'?: boolean

  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset'
}

/**
 * LoadingSpinner component for button loading states
 *
 * Renders an animated spinner icon to indicate loading state.
 * The spinner inherits the button's text colour for consistency.
 *
 * @param size - The size of the spinner based on button size
 * @returns An animated SVG spinner element
 */
const LoadingSpinner = ({ size }: { size: ButtonSize }) => {
  return (
    <svg
      className={cn('animate-spin', spinnerSizeClasses[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

/**
 * Button component for web applications
 *
 * A comprehensive button component with support for multiple variants, sizes,
 * loading states, icons, and full ARIA accessibility compliance.
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
 * ARIA features:
 * - Proper focus management with visible focus states
 * - aria-label support for icon-only buttons
 * - aria-pressed for toggle states
 * - aria-busy for loading states
 * - aria-expanded and aria-haspopup for menu buttons
 * - Keyboard navigation (Enter/Space activation)
 *
 * @example
 * // Basic primary button
 * <Button onClick={() => console.log('clicked')}>Click me</Button>
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
 * // Icon-only button (requires aria-label)
 * <Button iconOnly aria-label="Close menu">
 *   <CloseIcon />
 * </Button>
 *
 * @example
 * // Toggle button
 * <Button aria-pressed={isPressed} onClick={toggle}>
 *   Toggle Feature
 * </Button>
 *
 * @param props - The button properties
 * @returns A rendered button element with full accessibility support
 */
export const Button = ({
  children,
  onClick,
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
  type = 'button',
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
  'aria-expanded': ariaExpanded,
  'aria-haspopup': ariaHaspopup,
  'aria-busy': ariaBusy,
}: ButtonProps) => {
  // Base styles applied to all buttons (without rounded - applied separately)
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'

  // Combine all classes using the cn utility
  const buttonClasses = cn(
    baseStyles,
    iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
    roundedClasses[rounded],
    variantClasses[variant],
    fullWidth && 'w-full',
    loading && 'cursor-wait',
    className
  )

  // Icon-only buttons must have aria-label
  if (iconOnly && !ariaLabel) {
    console.warn('Icon-only buttons must have an aria-label for accessibility')
  }

  // Determine aria-busy state
  const computedAriaBusy = ariaBusy ?? loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      aria-busy={computedAriaBusy}
    >
      {loading && <LoadingSpinner size={size} />}
      {!loading && iconLeft && <span className="inline-flex">{iconLeft}</span>}
      {!iconOnly && <span>{children}</span>}
      {iconOnly && children}
      {!loading && iconRight && <span className="inline-flex">{iconRight}</span>}
    </button>
  )
}
