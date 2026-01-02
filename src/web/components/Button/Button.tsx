/**
 * @module web/components/Button/Button
 * @description Button component implementation for React web applications
 *
 * A versatile, accessible button component with support for multiple visual variants,
 * sizes, loading states, and icons. Built with TypeScript, React, and Tailwind CSS 4
 * for web applications.
 *
 * Features:
 * - 9 visual variants (primary, secondary, tertiary, outline, ghost, link, destructive, success, warning)
 * - 5 size options (xs, sm, md, lg, xl)
 * - 9 border radius variants (none, sm, base, md, lg, xl, 2xl, 3xl, full)
 * - Loading states with animated spinner
 * - Left, right, and icon-only icon support
 * - Full width support
 * - Complete WCAG 2.1 AA accessibility
 * - Type support (button, submit, reset)
 * - Custom className support for Tailwind extensions
 */

import {
  cn,
  type ComponentRounded,
  type ComponentSize,
  type ComponentVariant,
  iconOnlySizeClasses,
  roundedClasses,
  sizeClasses,
  spinnerSizeClasses,
  variantClasses,
} from '@/utils'
import React from 'react'

/**
 * Size variants for Button components
 *
 * Maps to design tokens for consistent spacing and font sizes:
 * - `xs`: 20px height, text-xs (small inline actions, compact interfaces)
 * - `sm`: 32px height, text-sm (secondary actions, toolbars)
 * - `md`: 40px height, text-base (default, general purpose use)
 * - `lg`: 48px height, text-lg (primary actions, prominent CTAs)
 * - `xl`: 56px height, text-xl (hero sections, large interactive areas)
 *
 * @type {('xs' | 'sm' | 'md' | 'lg' | 'xl')}
 *
 * @example
 * // Small button for compact UI
 * <Button size="sm">Add</Button>
 *
 * // Large button for primary CTA
 * <Button size="lg">Get Started</Button>
 */
export type ButtonSize = ComponentSize

/**
 * Visual style variants for Button components
 *
 * Variants provide semantic meaning and visual distinction:
 *
 * **Primary Actions:**
 * - `primary`: Main call-to-action, solid background with high contrast
 * - `secondary`: Alternative action, complementary to primary
 *
 * **Subtle Actions:**
 * - `tertiary`: Minimal visual emphasis, similar to secondary but lighter
 * - `ghost`: Minimal styling, blends into background
 * - `link`: Styled as text link for inline actions
 * - `outline`: Bordered button, transparent background
 *
 * **Semantic Actions:**
 * - `destructive`: Warns about irreversible actions (delete, remove)
 * - `success`: Indicates positive actions (approve, confirm)
 * - `warning`: Indicates cautionary actions (proceed with caution)
 *
 * @type {('primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'success' | 'warning')}
 *
 * @example
 * // Destructive action with clear warning
 * <Button variant="destructive">Delete Account</Button>
 *
 * // Success confirmation
 * <Button variant="success">Confirm Payment</Button>
 */
export type ButtonVariant = ComponentVariant

/**
 * Border radius variants for Button components
 *
 * Controls the button's corner rounding, mapping to Tailwind scale:
 * - `none`: Square corners (sharp, modern aesthetic)
 * - `sm`: 0.125rem (2px) - subtle rounding
 * - `base`: 0.25rem (4px) - minimal rounding
 * - `md`: 0.375rem (6px) - light rounding
 * - `lg`: 0.5rem (8px) - default, balanced rounding
 * - `xl`: 0.75rem (12px) - pronounced rounding
 * - `2xl`: 1rem (16px) - very rounded
 * - `3xl`: 1.5rem (24px) - highly rounded
 * - `full`: 9999px - pill-shaped (circular buttons, tags)
 *
 * Maps to the `borders.radius` design tokens in the design system.
 *
 * @type {('none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full')}
 *
 * @example
 * // Square button for sharp modern look
 * <Button rounded="none">Block</Button>
 *
 * // Pill-shaped button for tags/badges
 * <Button rounded="full">Follow</Button>
 */
export type ButtonRounded = ComponentRounded

/**
 * Props interface for the Button component
 *
 * Provides complete type safety and documentation for all button properties.
 * All ARIA attributes are supported for accessibility.
 *
 * @interface ButtonProps
 *
 * @example
 * // Strongly typed button with all props
 * const props: ButtonProps = {
 *   children: 'Save',
 *   variant: 'primary',
 *   size: 'lg',
 *   onClick: () => console.log('saved'),
 *   disabled: false,
 *   loading: false,
 *   type: 'submit',
 * };
 */
export interface ButtonProps {
  /**
   * The text or content displayed inside the button
   *
   * Can be text, React elements, or a mix of both. For icon-only buttons,
   * use the `iconOnly` prop and provide the icon as children.
   *
   * @type {React.ReactNode}
   *
   * @example
   * // Text content
   * <Button>Click me</Button>
   *
   * // With JSX
   * <Button>
   *   <span>Save</span> <SaveIcon />
   * </Button>
   */
  children: React.ReactNode

  /**
   * Callback function invoked when the button is clicked
   *
   * The function is called without arguments. For click events with details,
   * use a ref with standard button event handling.
   *
   * @type {() => void}
   * @optional
   *
   * @example
   * // Simple callback
   * <Button onClick={() => console.log('clicked')}>Submit</Button>
   *
   * // Form submission
   * <Button type="submit" onClick={() => {
   *   // Form submission is handled by the form, this is additional logic
   * }}>
   *   Submit Form
   * </Button>
   */
  onClick?: () => void

  /**
   * Visual style variant of the button
   *
   * Determines the button's appearance and semantic meaning.
   * Defaults to `primary` for main call-to-action buttons.
   *
   * @type {ButtonVariant}
   * @default 'primary'
   * @optional
   *
   * @example
   * // Cancel button
   * <Button variant="outline">Cancel</Button>
   *
   * // Dangerous action
   * <Button variant="destructive">Delete</Button>
   *
   * // Confirmation
   * <Button variant="success">Approve</Button>
   */
  variant?: ButtonVariant

  /**
   * Size of the button (height and padding)
   *
   * Controls the button's dimensions and internal spacing.
   * Defaults to `md` for standard buttons.
   *
   * @type {ButtonSize}
   * @default 'md'
   * @optional
   *
   * @example
   * // Compact button for toolbars
   * <Button size="sm">Edit</Button>
   *
   * // Large button for prominent CTAs
   * <Button size="lg">Get Started</Button>
   */
  size?: ButtonSize

  /**
   * Border radius of the button (corner rounding)
   *
   * Controls how rounded the button corners are. Maps to Tailwind scale
   * and design tokens. Defaults to `lg` (8px) for balanced appearance.
   *
   * @type {ButtonRounded}
   * @default 'lg'
   * @optional
   *
   * @example
   * // Square button
   * <Button rounded="none">Block</Button>
   *
   * // Pill-shaped button
   * <Button rounded="full">Follow</Button>
   */
  rounded?: ButtonRounded

  /**
   * Whether the button is disabled and should not respond to interactions
   *
   * Disabled buttons show reduced opacity and do not respond to clicks.
   * The cursor changes to not-allowed, and pointer events are disabled.
   * Screen readers announce the disabled state.
   *
   * @type {boolean}
   * @default false
   * @optional
   *
   * @example
   * // Disabled button (e.g., form not valid)
   * const [isFormValid, setIsFormValid] = useState(false);
   * <Button disabled={!isFormValid}>Submit</Button>
   */
  disabled?: boolean

  /**
   * Whether the button is in a loading state
   *
   * When true, displays an animated spinner and disables interaction.
   * The loading spinner inherits the button's text colour for consistency.
   * Use for async operations like form submission or API calls.
   *
   * @type {boolean}
   * @default false
   * @optional
   *
   * @example
   * // Loading state during API call
   * const [isLoading, setIsLoading] = useState(false);
   *
   * const handleSubmit = async () => {
   *   setIsLoading(true);
   *   try {
   *     await submitForm();
   *   } finally {
   *     setIsLoading(false);
   *   }
   * };
   *
   * <Button loading={isLoading} onClick={handleSubmit}>
   *   {isLoading ? 'Submitting...' : 'Submit'}
   * </Button>
   */
  loading?: boolean

  /**
   * Whether the button should take the full width of its container
   *
   * When true, applies `w-full` class. Useful for mobile layouts,
   * forms, or when button needs to span the full parent width.
   *
   * @type {boolean}
   * @default false
   * @optional
   *
   * @example
   * // Full width button in a form
   * <form className="space-y-4">
   *   <input type="email" placeholder="Email" />
   *   <Button fullWidth type="submit">Sign Up</Button>
   * </form>
   */
  fullWidth?: boolean

  /**
   * Icon to display before (left of) the button text
   *
   * Typically used for visual context (e.g., SaveIcon for Save button).
   * Icon receives `inline-flex` wrapper for proper alignment.
   * Wrapped in a span to maintain proper spacing.
   *
   * @type {React.ReactNode}
   * @optional
   *
   * @example
   * // Icon on left
   * import { SaveIcon } from '@/icons';
   * <Button iconLeft={<SaveIcon />}>Save Changes</Button>
   */
  iconLeft?: React.ReactNode

  /**
   * Icon to display after (right of) the button text
   *
   * Commonly used for dropdown indicators or action hints.
   * Icon receives `inline-flex` wrapper for proper alignment.
   * Wrapped in a span to maintain proper spacing.
   *
   * @type {React.ReactNode}
   * @optional
   *
   * @example
   * // Icon on right (dropdown indicator)
   * import { ChevronDownIcon } from '@/icons';
   * <Button iconRight={<ChevronDownIcon />}>More Options</Button>
   */
  iconRight?: React.ReactNode

  /**
   * Whether the button is icon-only (no text content)
   *
   * When true, applies icon-only sizing and layout. This prop REQUIRES
   * an `aria-label` for accessibility to inform screen readers of the button's purpose.
   *
   * Must be used with aria-label for WCAG compliance.
   * The component logs a warning if iconOnly=true but no aria-label provided.
   *
   * @type {boolean}
   * @default false
   * @optional
   *
   * @example
   * // Icon-only button (always requires aria-label)
   * import { TrashIcon } from '@/icons';
   * <Button iconOnly aria-label="Delete item">
   *   <TrashIcon />
   * </Button>
   *
   * // Common patterns
   * <Button iconOnly aria-label="Close">
   *   <CloseIcon />
   * </Button>
   *
   * <Button iconOnly aria-label="Add new">
   *   <PlusIcon />
   * </Button>
   */
  iconOnly?: boolean

  /**
   * Additional Tailwind CSS classes for custom styling
   *
   * Allows extending the button with custom Tailwind utilities.
   * Classes provided are merged with existing styles using the `cn` utility.
   * Useful for responsive sizing, shadows, transforms, etc.
   *
   * Note: variant and size classes take precedence. className extends them.
   *
   * @type {string}
   * @default ''
   * @optional
   *
   * @example
   * // Add shadow and responsive padding
   * <Button className="shadow-lg md:px-8">Styled Button</Button>
   *
   * // Responsive width
   * <Button className="w-full md:w-auto">Responsive</Button>
   *
   * // With transform on hover
   * <Button className="hover:scale-105 transition-transform">Hover Effect</Button>
   */
  className?: string

  /**
   * ARIA label for accessibility
   *
   * Required for icon-only buttons to inform screen readers of purpose.
   * Optional for text buttons (uses button text by default).
   * Use when button text is not descriptive enough (e.g., "...", icons).
   *
   * @type {string}
   * @optional
   *
   * @example
   * // Icon-only button (required)
   * <Button iconOnly aria-label="Delete item">
   *   <TrashIcon />
   * </Button>
   *
   * // Text button with additional context
   * <Button aria-label="Save and publish changes">
   *   Save
   * </Button>
   */
  'aria-label'?: string

  /**
   * ARIA pressed state for toggle buttons
   *
   * Use for buttons that toggle between pressed and unpressed states.
   * Can be a boolean or string representation ('true' | 'false' | 'mixed').
   * Informs screen readers of the button's toggle state.
   *
   * @type {boolean | 'false' | 'mixed' | 'true'}
   * @optional
   *
   * @example
   * // Toggle button
   * const [isPressed, setIsPressed] = useState(false);
   *
   * <Button
   *   aria-pressed={isPressed}
   *   onClick={() => setIsPressed(!isPressed)}
   * >
   *   {isPressed ? 'Enabled' : 'Disabled'}
   * </Button>
   */
  'aria-pressed'?: boolean | 'false' | 'mixed' | 'true'

  /**
   * ARIA expanded state for buttons that open menus or expandable content
   *
   * Use for buttons that expand/collapse content or open menus.
   * Helps screen readers understand if associated content is visible.
   * Usually paired with aria-haspopup.
   *
   * @type {boolean}
   * @optional
   *
   * @example
   * // Menu button
   * const [menuOpen, setMenuOpen] = useState(false);
   *
   * <Button
   *   aria-expanded={menuOpen}
   *   aria-haspopup="menu"
   *   onClick={() => setMenuOpen(!menuOpen)}
   * >
   *   Actions
   * </Button>
   */
  'aria-expanded'?: boolean

  /**
   * ARIA haspopup attribute for buttons that trigger menus or popups
   *
   * Indicates what type of content the button opens.
   * Values: true, false, 'menu', 'listbox', 'tree', 'grid', 'dialog'
   * Helps screen reader users understand the button's behaviour.
   *
   * @type {boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'}
   * @optional
   *
   * @example
   * // Dropdown menu
   * <Button aria-haspopup="menu" aria-expanded={isOpen}>
   *   Dropdown
   * </Button>
   *
   * // Dialog trigger
   * <Button aria-haspopup="dialog" onClick={openDialog}>
   *   Edit Profile
   * </Button>
   */
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'

  /**
   * ARIA busy state for loading buttons
   *
   * Explicitly indicates a loading/busy state for screen readers.
   * Automatically set to true when `loading` prop is true (unless explicitly set).
   * Useful when you need different visual and semantic states.
   *
   * @type {boolean}
   * @optional
   *
   * @example
   * // Loading state
   * <Button loading={true} aria-busy={true}>
   *   Processing...
   * </Button>
   */
  'aria-busy'?: boolean

  /**
   * HTML button type attribute
   *
   * Controls how the button behaves in forms:
   * - `button`: Standard button (default), does not submit
   * - `submit`: Submits the nearest form
   * - `reset`: Resets the nearest form
   *
   * @type {'button' | 'submit' | 'reset'}
   * @default 'button'
   * @optional
   *
   * @example
   * // Submit button in form
   * <form onSubmit={handleSubmit}>
   *   <input type="email" required />
   *   <Button type="submit">Sign Up</Button>
   * </form>
   *
   * // Reset button
   * <Button type="reset">Clear Form</Button>
   *
   * // Standard button (doesn't submit)
   * <Button type="button" onClick={handleCancel}>
   *   Cancel
   * </Button>
   */
  type?: 'button' | 'submit' | 'reset'
}

/**
 * LoadingSpinner component for button loading states
 *
 * A non-blocking internal component that renders an animated SVG spinner icon
 * to visually indicate a loading or busy state. The spinner is designed to:
 *
 * - Inherit the button's text colour for seamless visual integration
 * - Use CSS animation (animate-spin) for smooth, performant rotation
 * - Scale appropriately based on button size
 * - Be hidden from screen readers (aria-hidden="true")
 *
 * The spinner uses an SVG with two overlapping circles:
 * - Outer circle with 25% opacity (background)
 * - Inner path with 75% opacity (active indicator)
 * - Uses currentColor so it inherits the button's text colour
 *
 * @component
 * @internal This is an internal component - not exported publicly
 *
 * @param {Object} props - Component props
 * @param {ButtonSize} props.size - The button size, determines spinner dimensions:
 *   - `xs`: 12px × 12px
 *   - `sm`: 14px × 14px
 *   - `md`: 16px × 16px
 *   - `lg`: 18px × 18px
 *   - `xl`: 20px × 20px
 *
 * @returns {React.ReactElement} An animated SVG spinner element with:
 *   - CSS class: `animate-spin` (continuous rotation animation)
 *   - ARIA: `aria-hidden="true"` (hidden from screen readers)
 *   - Colour: Inherits from parent via `currentColor`
 *
 * @example
 * // Used internally by Button component
 * // Not meant to be used directly
 * {loading && <LoadingSpinner size="md" />}
 *
 * @see https://tailwindcss.com/docs/animation#spin Tailwind CSS animate-spin
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
      {/* Outer circle (background indicator) */}
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      {/* Inner path (active spinning indicator) */}
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
 * A comprehensive, production-ready button component with support for multiple
 * visual variants, sizes, loading states, and icons. Built with TypeScript,
 * React, and Tailwind CSS 4 for web applications.
 *
 * This component implements semantic HTML (`<button>` element) and provides
 * complete WCAG 2.1 AA accessibility support out of the box.
 *
 * ## Component Features
 *
 * ### Visual Variants (9 total)
 * - **primary**: Main call-to-action with solid background and high contrast
 * - **secondary**: Alternative action complementary to primary
 * - **tertiary**: Subtle styling for tertiary actions
 * - **ghost**: Minimal styling that blends into background
 * - **link**: Styled as text link for inline actions
 * - **outline**: Bordered button with transparent background
 * - **destructive**: Warning style for delete/remove actions
 * - **success**: Positive confirmation style
 * - **warning**: Cautionary style for actions requiring attention
 *
 * ### Sizes (5 total)
 * - **xs**: 20px height - for compact interfaces
 * - **sm**: 32px height - for secondary actions and toolbars
 * - **md**: 40px height - default, general purpose use
 * - **lg**: 48px height - for primary actions and prominent CTAs
 * - **xl**: 56px height - for hero sections and large interactive areas
 *
 * ### Border Radius Variants (9 total)
 * - **none**: Square corners (sharp, modern)
 * - **sm, base, md, lg, xl, 2xl, 3xl**: Increasing rounding amounts
 * - **full**: Pill-shaped (9999px radius)
 *
 * ### State Support
 * - **disabled**: Disabled state with visual and semantic indication
 * - **loading**: Animated spinner with disabled interaction
 * - **fullWidth**: 100% container width for responsive layouts
 *
 * ### Icon Support
 * - **iconLeft**: Icon before button text
 * - **iconRight**: Icon after button text
 * - **iconOnly**: Icon-only button (requires aria-label)
 *
 * ### Form Type Support
 * - **button**: Standard button (default)
 * - **submit**: Submits nearest form
 * - **reset**: Resets nearest form
 *
 * ## Accessibility (WCAG 2.1 AA)
 *
 * ### Keyboard Navigation
 * - Full keyboard support: Enter and Space activate buttons
 * - Visible focus ring using Tailwind focus utilities
 * - Focus ring offset for better visibility
 * - No keyboard traps
 * - Tab order follows DOM flow
 *
 * ### Screen Reader Support
 * - Semantic `<button>` element (implicit role="button")
 * - **aria-label**: For icon-only buttons (required)
 * - **aria-pressed**: For toggle buttons
 * - **aria-expanded**: For buttons opening menus/content
 * - **aria-haspopup**: Indicates menu/dialog popup
 * - **aria-busy**: For loading states
 * - Disabled state automatically announced
 *
 * ### Visual Accessibility
 * - Sufficient colour contrast (WCAG AA: 4.5:1 minimum)
 * - Clear visual disabled state (50% opacity)
 * - Visible focus indicators (2px ring with offset)
 * - No colour-only information conveyed
 * - Icon-only buttons protected with warnings
 *
 * ## Styling & Customisation
 *
 * ### Tailwind CSS Integration
 * - All styling uses Tailwind CSS 4 utility classes
 * - Design tokens from `src/utils` for consistency
 * - className prop extends default styles (merged with cn utility)
 * - Responsive design via Tailwind breakpoints (md:, lg:, etc.)
 * - Dark mode support via dark: prefix
 *
 * ### Class Composition
 * The component merges classes in this order:
 * 1. Base styles (flex, focus ring, transitions)
 * 2. Size classes (padding, font size, height)
 * 3. Border radius classes
 * 4. Variant classes (colours, backgrounds)
 * 5. Conditional classes (fullWidth, loading)
 * 6. Custom className prop (extends above)
 *
 * ## Performance Considerations
 *
 * - Lightweight implementation with minimal re-renders
 * - Inline SVG spinner (no external image requests)
 * - CSS animations for smooth 60fps spinner
 * - Semantic HTML prevents unnecessary JavaScript
 * - Tree-shakeable for optimal bundle size
 *
 * ## Browser Support
 *
 * - Chrome/Edge 90+
 * - Firefox 88+
 * - Safari 14+
 * - Mobile: iOS Safari 14+, Chrome Android
 * - IE11: Not supported (uses CSS Grid, Flexbox, modern CSS)
 *
 * ## Examples
 *
 * ### Basic Usage
 * ```typescript
 * import { Button } from '@syntek-studio/ui';
 *
 * <Button onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 *
 * ### With Variants and Sizes
 * ```typescript
 * <Button variant="secondary" size="lg">
 *   Save Changes
 * </Button>
 * ```
 *
 * ### With Icons
 * ```typescript
 * import { SaveIcon, ChevronIcon } from '@/icons';
 *
 * <Button iconLeft={<SaveIcon />}>Save</Button>
 * <Button iconRight={<ChevronIcon />}>More</Button>
 * <Button iconOnly aria-label="Delete">
 *   <TrashIcon />
 * </Button>
 * ```
 *
 * ### Loading State
 * ```typescript
 * const [isLoading, setIsLoading] = useState(false);
 *
 * const handleSubmit = async () => {
 *   setIsLoading(true);
 *   await submitForm();
 *   setIsLoading(false);
 * };
 *
 * <Button loading={isLoading} onClick={handleSubmit}>
 *   Submit
 * </Button>
 * ```
 *
 * ### Toggle Button
 * ```typescript
 * const [isPressed, setIsPressed] = useState(false);
 *
 * <Button
 *   aria-pressed={isPressed}
 *   onClick={() => setIsPressed(!isPressed)}
 * >
 *   {isPressed ? 'Enabled' : 'Disabled'}
 * </Button>
 * ```
 *
 * ### Menu Button
 * ```typescript
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Button
 *   aria-expanded={isOpen}
 *   aria-haspopup="menu"
 *   onClick={() => setIsOpen(!isOpen)}
 * >
 *   Actions
 * </Button>
 * ```
 *
 * ### Form Integration
 * ```typescript
 * <form onSubmit={handleSubmit}>
 *   <input type="email" required />
 *   <Button type="submit" fullWidth>
 *     Sign Up
 *   </Button>
 * </form>
 * ```
 *
 * ### Custom Styling
 * ```typescript
 * <Button className="shadow-lg md:w-full hover:shadow-xl">
 *   Extended Button
 * </Button>
 * ```
 *
 * ## Testing
 *
 * The component can be tested for:
 * - Keyboard accessibility (Enter, Space)
 * - Screen reader announcements (aria-label, aria-pressed, etc.)
 * - Focus visible states
 * - Colour contrast (accessibility checkers)
 * - Responsive behaviour
 * - Loading spinner animation
 * - Click handler invocation
 *
 * ## Related Documentation
 *
 * - {@link ButtonProps Button Props Interface}
 * - {@link ButtonVariant Button Variant Type}
 * - {@link ButtonSize Button Size Type}
 * - {@link ButtonRounded Button Rounded Type}
 *
 * @component
 * @param {ButtonProps} props - All button properties
 * @returns {React.ReactElement} A fully accessible button element
 *
 * @example
 * import { Button } from '@syntek-studio/ui';
 *
 * export function MyForm() {
 *   const [isLoading, setIsLoading] = useState(false);
 *
 *   const handleSubmit = async () => {
 *     setIsLoading(true);
 *     try {
 *       await submitForm();
 *     } finally {
 *       setIsLoading(false);
 *     }
 *   };
 *
 *   return (
 *     <Button
 *       loading={isLoading}
 *       onClick={handleSubmit}
 *       type="submit"
 *       fullWidth
 *     >
 *       {isLoading ? 'Submitting...' : 'Submit Form'}
 *     </Button>
 *   );
 * }
 *
 * @see https://www.w3.org/WAI/WCAG21/quickref/ WCAG 2.1 Guidelines
 * @see https://tailwindcss.com/docs Tailwind CSS Documentation
 * @see https://react.dev/ React Documentation
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
  // Base styles applied to all buttons
  // - inline-flex: Flexbox layout for proper alignment
  // - items-center: Vertical centre alignment for icons and text
  // - justify-center: Horizontal centre alignment
  // - font-medium: Medium font weight for emphasis
  // - transition-all duration-200: Smooth transitions (200ms) for hover/focus/active states
  // - focus: Visible focus ring for keyboard navigation
  //   - outline-none: Remove browser default outline
  //   - ring-2: 2px focus ring
  //   - ring-offset-2: 2px white space between ring and element
  // - disabled: Styles for disabled state
  //   - opacity-50: 50% opacity to show disabled state
  //   - cursor-not-allowed: Change cursor to indicate non-interactive
  //   - pointer-events-none: Disable all pointer events
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'

  // Merge all Tailwind classes using the cn utility function
  // Order matters for cascading - later classes can override earlier ones
  // 1. baseStyles: Always applied
  // 2. Size: Either iconOnly or standard sizes (affects padding/height)
  // 3. Rounded: Border radius variant
  // 4. Variant: Colour and background styles
  // 5. fullWidth: Width class if needed
  // 6. loading: Cursor change for loading state
  // 7. className: Consumer-provided extensions
  const buttonClasses = cn(
    baseStyles,
    iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
    roundedClasses[rounded],
    variantClasses[variant],
    fullWidth && 'w-full',
    loading && 'cursor-wait',
    className
  )

  // Accessibility warning: Icon-only buttons must have aria-label
  // This helps developers catch accessibility issues during development
  if (iconOnly && !ariaLabel) {
    console.warn(
      'Icon-only buttons must have an aria-label for accessibility. ' +
        'Screen readers need to know what the button does when there is no visible text. ' +
        'Example: <Button iconOnly aria-label="Delete item"><TrashIcon /></Button>'
    )
  }

  // Determine final aria-busy state
  // If explicitly provided, use that value
  // Otherwise, automatically set to true when loading is true
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
      {/* Show spinner when loading */}
      {loading && <LoadingSpinner size={size} />}

      {/* Show left icon when not loading and icon provided */}
      {!loading && iconLeft && <span className="inline-flex">{iconLeft}</span>}

      {/* Show button text unless icon-only */}
      {!iconOnly && <span>{children}</span>}

      {/* Show children directly for icon-only buttons */}
      {iconOnly && children}

      {/* Show right icon when not loading and icon provided */}
      {!loading && iconRight && <span className="inline-flex">{iconRight}</span>}
    </button>
  )
}
