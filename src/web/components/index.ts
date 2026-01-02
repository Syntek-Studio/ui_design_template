/**
 * @module web/components
 * @description Central export module for all React web components
 *
 * Provides a unified public API for React web components built with TypeScript,
 * React 18/19, Tailwind CSS 4, and comprehensive accessibility support.
 *
 * This module serves as the main entry point for all web component exports.
 * Components are designed for modern browsers and strictly follow WCAG 2.1 AA
 * accessibility standards.
 *
 * ## Available Components
 *
 * ### Button Component
 * - **Location**: `./Button/`
 * - **Export**: `Button`, `ButtonProps`, `ButtonSize`, `ButtonVariant`, `ButtonRounded`
 * - **Description**: Versatile interactive button with multiple variants, sizes, and states
 * - **Features**:
 *   - 9 visual variants (primary, secondary, tertiary, outline, ghost, link, destructive, success, warning)
 *   - 5 size options (xs, sm, md, lg, xl)
 *   - 9 border radius variants (none, sm, base, md, lg, xl, 2xl, 3xl, full)
 *   - Loading states with animated spinner
 *   - Icon support (left, right, or icon-only)
 *   - Full width support
 *   - Complete ARIA accessibility support (aria-label, aria-pressed, aria-busy, aria-expanded, aria-haspopup)
 *   - Type variants (button, submit, reset)
 *
 * ## Component Conventions & Patterns
 *
 * All web components follow these consistent patterns:
 *
 * ### TypeScript & Type Safety
 * - Fully typed with TypeScript interfaces for all props
 * - Type unions for variants (primary, secondary, etc.)
 * - Clear documentation of optional vs required props
 * - Export both component and Props interface for consumer type safety
 *
 * ### Styling with Tailwind CSS 4
 * - All styling uses Tailwind CSS utility classes
 * - No inline styles or custom CSS modules
 * - Support for responsive design via Tailwind breakpoints
 * - Customisation via `className` prop for adding additional Tailwind classes
 * - Design tokens from `src/utils` for consistent styling
 *
 * ### Accessibility (WCAG 2.1 AA Compliance)
 * - Semantic HTML elements (`<button>`, not `<div>`)
 * - Full keyboard navigation support (Enter, Space activation)
 * - Visible focus indicators (focus:ring-2 focus:ring-offset-2)
 * - ARIA attributes for enhanced screen reader support
 * - Colour contrast compliance (minimum 4.5:1 for normal text)
 * - Support for high contrast mode
 * - Proper disabled state handling
 *
 * ### Component Documentation
 * - JSDoc comments for all exported functions and types
 * - @param and @returns documentation for all functions
 * - @example blocks showing common usage patterns
 * - Clear property descriptions in interfaces
 * - Inline comments explaining complex logic
 *
 * ## Accessibility Features
 *
 * All components provide built-in accessibility features:
 *
 * ### Keyboard Navigation
 * - Full keyboard operability (no keyboard traps)
 * - Enter and Space keys activate buttons
 * - Focus management and visible focus states
 * - Tab order follows logical DOM flow
 *
 * ### Screen Reader Support
 * - Semantic HTML for implicit roles
 * - Explicit aria-label for icon-only buttons
 * - aria-pressed for toggle buttons
 * - aria-busy for loading states
 * - aria-expanded and aria-haspopup for menu/dropdown buttons
 * - aria-disabled for disabled state (when appropriate)
 *
 * ### Visual Accessibility
 * - Visible focus indicators using focus:ring utilities
 * - Focus ring offset for better visibility
 * - Sufficient colour contrast (WCAG AA minimum 4.5:1)
 * - No reliance on colour alone for information
 * - Clear disabled state with reduced opacity
 *
 * ## Styling with Tailwind CSS
 *
 * ### Adding Custom Styles
 * ```typescript
 * // Extend with additional Tailwind classes
 * <Button className="shadow-lg md:w-full lg:px-8">
 *   Extended Button
 * </Button>
 * ```
 *
 * ### Responsive Design
 * ```typescript
 * // Use Tailwind breakpoints for responsive layouts
 * <Button className="text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8">
 *   Responsive Button
 * </Button>
 * ```
 *
 * ### Dark Mode Support
 * ```typescript
 * // Tailwind dark mode utilities are available
 * <Button className="bg-white dark:bg-slate-900 text-black dark:text-white">
 *   Dark Mode Button
 * </Button>
 * ```
 *
 * ## Usage Examples
 *
 * ### Basic Button Usage
 * ```typescript
 * import { Button } from '@syntek-studio/ui';
 *
 * export function MyComponent() {
 *   return (
 *     <Button onClick={() => console.log('clicked')}>
 *       Click me
 *     </Button>
 *   );
 * }
 * ```
 *
 * ### Button Variants & Sizes
 * Import the Button component and use different variants and sizes:
 * - Variants: primary, secondary, tertiary, outline, ghost, link, destructive, success, warning
 * - Sizes: xs, sm, md, lg, xl
 *
 * ### Button with Icons
 * Use iconLeft for left-side icons, iconRight for right-side icons.
 * For icon-only buttons, set iconOnly={true} and provide aria-label for accessibility
 * ```
 *
 * ### Loading States
 * Use the loading prop to show a spinner during async operations.
 * The button is automatically disabled when loading={true}.
 * Combines with aria-busy for screen reader announcements.
 *
 * ### Toggle & Menu Buttons
 * Use aria-pressed for toggle buttons that switch between states.
 * Use aria-expanded and aria-haspopup for buttons that open menus or dialogs.
 * Helps screen readers understand button behavior and current state.
 *
 * ### Form Integration
 * Use type="submit" for form submission buttons.
 * Use type="reset" for form reset buttons.
 * Use type="button" for standard buttons (default).
 * Pair with form elements for complete form workflows
 * ```
 *
 * ## Import Patterns
 *
 * ```typescript
 * // Import component and types
 * import { Button, type ButtonProps, type ButtonVariant } from '@syntek-studio/ui';
 *
 * // Use with TypeScript
 * const buttonProps: ButtonProps = {
 *   children: 'Click me',
 *   variant: 'primary' as ButtonVariant,
 *   onClick: () => {},
 * };
 * ```
 *
 * ## Browser Support
 *
 * - Chrome/Edge 90+
 * - Firefox 88+
 * - Safari 14+
 * - Mobile browsers (iOS Safari 14+, Chrome Android)
 *
 * ## Performance Considerations
 *
 * - Components are lightweight and optimized for performance
 * - No unnecessary re-renders (proper React.memo usage where appropriate)
 * - Inline SVG spinners for loading states (no external image requests)
 * - Minimal bundle size (components are tree-shakeable)
 *
 * ## Testing
 *
 * Components are tested with:
 * - Storybook for visual regression and interactive testing
 * - Vitest for unit testing
 * - Accessibility testing tools (axe-core, Lighthouse)
 * - Manual WCAG 2.1 AA compliance verification
 *
 * Run tests locally:
 * ```bash
 * # View components in Storybook
 * npm run storybook:web
 *
 * # Run unit tests
 * npm run test
 *
 * # Type checking
 * npm run type-check
 * ```
 *
 * ## Related Resources
 *
 * - {@link ../Button/ Button Component Documentation}
 * - {@link ../../README.md Root Project README}
 * - {@link ../../../docs/ Project Documentation}
 * - WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
 * - Tailwind CSS Documentation: https://tailwindcss.com/docs
 * - React Documentation: https://react.dev/
 *
 * @see {@link ../Button/Button.tsx Button Component Implementation}
 * @see {@link ../Button/Button.stories.tsx Button Storybook Stories}
 * @see {@link ../Button/index.ts Button Export Module}
 */

// Export all web components
export * from './Button'
