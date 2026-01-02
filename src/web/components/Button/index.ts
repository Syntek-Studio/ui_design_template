/**
 * @module web/components/Button/index
 * @description Button component export module
 *
 * Public API export file for the Button component and associated type definitions.
 *
 * This module serves as the primary entry point for importing the Button component
 * and its TypeScript type definitions into your React web applications.
 *
 * ## Exported Components
 *
 * ### Button Component
 * A versatile, accessible button component with support for:
 * - 9 visual variants (primary, secondary, tertiary, outline, ghost, link, destructive, success, warning)
 * - 5 size options (xs, sm, md, lg, xl)
 * - Loading states with animated spinner
 * - Icon support (left, right, icon-only)
 * - Full WCAG 2.1 AA accessibility
 * - Form integration (submit, reset, button types)
 *
 * ## Exported Type Definitions
 *
 * ### ButtonProps
 * Interface defining all available props for the Button component.
 * Provides full TypeScript type safety for consuming code.
 * Includes comprehensive JSDoc comments for each property.
 *
 * Properties:
 * - children: React.ReactNode - Button content
 * - onClick?: () => void - Click handler
 * - variant?: ButtonVariant - Visual style (9 options)
 * - size?: ButtonSize - Button dimensions (5 sizes)
 * - rounded?: ButtonRounded - Border radius (9 variants)
 * - disabled?: boolean - Disabled state
 * - loading?: boolean - Loading state with spinner
 * - fullWidth?: boolean - Full container width
 * - iconLeft?: React.ReactNode - Left icon
 * - iconRight?: React.ReactNode - Right icon
 * - iconOnly?: boolean - Icon-only mode (requires aria-label)
 * - className?: string - Custom Tailwind classes
 * - type?: 'button' | 'submit' | 'reset' - Form type
 * - ARIA attributes: aria-label, aria-pressed, aria-expanded, aria-haspopup, aria-busy
 *
 * ### ButtonVariant
 * Type union for visual style variants:
 * - 'primary' - Main call-to-action
 * - 'secondary' - Alternative action
 * - 'tertiary' - Subtle action
 * - 'ghost' - Minimal styling
 * - 'link' - Text link styling
 * - 'outline' - Bordered button
 * - 'destructive' - Warning for delete/remove
 * - 'success' - Positive confirmation
 * - 'warning' - Cautionary action
 *
 * ### ButtonSize
 * Type union for button sizes:
 * - 'xs' - 20px height (extra small)
 * - 'sm' - 32px height (small)
 * - 'md' - 40px height (medium, default)
 * - 'lg' - 48px height (large)
 * - 'xl' - 56px height (extra large)
 *
 * ### ButtonRounded
 * Type union for border radius variants:
 * - 'none' - Square corners
 * - 'sm' - 2px radius
 * - 'base' - 4px radius
 * - 'md' - 6px radius
 * - 'lg' - 8px radius (default)
 * - 'xl' - 12px radius
 * - '2xl' - 16px radius
 * - '3xl' - 24px radius
 * - 'full' - Pill-shaped (9999px)
 *
 * ## Import Patterns
 *
 * ### Standard import
 * ```typescript
 * import { Button } from '@syntek-studio/ui';
 *
 * <Button onClick={handleClick}>Click me</Button>
 * ```
 *
 * ### With type definitions
 * ```typescript
 * import { Button, type ButtonProps, type ButtonVariant } from '@syntek-studio/ui';
 *
 * const MyButton: React.FC<ButtonProps> = (props) => {
 *   return <Button {...props} />;
 * };
 * ```
 *
 * ### Type-only imports (TreeShakeable)
 * ```typescript
 * import type { ButtonProps, ButtonVariant, ButtonSize } from '@syntek-studio/ui';
 *
 * interface MyComponentProps extends ButtonProps {
 *   label: string;
 * }
 * ```
 *
 * ### Conditional imports
 * ```typescript
 * // Import only what you need
 * import { Button, type ButtonProps } from '@syntek-studio/ui';
 * ```
 *
 * ## Usage Examples
 *
 * ### Basic Button
 * ```typescript
 * import { Button } from '@syntek-studio/ui';
 *
 * export function MyComponent() {
 *   const handleClick = () => console.log('Button clicked');
 *
 *   return (
 *     <Button onClick={handleClick}>
 *       Click me
 *     </Button>
 *   );
 * }
 * ```
 *
 * ### With Type Safety
 * ```typescript
 * import { Button, type ButtonProps, type ButtonVariant } from '@syntek-studio/ui';
 *
 * interface ActionButtonProps extends ButtonProps {
 *   action: 'save' | 'delete' | 'cancel';
 * }
 *
 * export function ActionButton({ action, ...props }: ActionButtonProps) {
 *   const variantMap: Record<string, ButtonVariant> = {
 *     save: 'primary',
 *     delete: 'destructive',
 *     cancel: 'outline',
 *   };
 *
 *   return (
 *     <Button variant={variantMap[action]} {...props} />
 *   );
 * }
 * ```
 *
 * ### Multiple Variants
 * ```typescript
 * import { Button, type ButtonVariant } from '@syntek-studio/ui';
 *
 * const variants: ButtonVariant[] = ['primary', 'secondary', 'destructive'];
 *
 * export function VariantShowcase() {
 *   return (
 *     <div className="flex gap-2">
 *       {variants.map((variant) => (
 *         <Button key={variant} variant={variant}>
 *           {variant}
 *         </Button>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 *
 * ### With Controlled Props
 * ```typescript
 * import { Button, type ButtonProps } from '@syntek-studio/ui';
 * import { useState } from 'react';
 *
 * export function ControlledButton() {
 *   const [isLoading, setIsLoading] = useState(false);
 *
 *   const buttonProps: ButtonProps = {
 *     children: isLoading ? 'Submitting...' : 'Submit',
 *     loading: isLoading,
 *     disabled: isLoading,
 *     onClick: () => handleSubmit(),
 *   };
 *
 *   return <Button {...buttonProps} />;
 * }
 * ```
 *
 * ## Re-exports
 *
 * This module re-exports:
 * - Button component from './Button'
 * - All type definitions from './Button'
 *
 * Direct imports from './Button' are discouraged in favour of imports
 * from '@syntek-studio/ui' (the main library entry point) or '@syntek-studio/ui/Button'
 * for more specific imports.
 *
 * ## Tree-Shaking Support
 *
 * All exports are designed to be tree-shakeable:
 * - Type-only imports use TypeScript's type-only syntax
 * - Unused exports are automatically removed from production bundles
 * - Component code is minimal and optimized
 *
 * ## Accessibility Notes
 *
 * When using ButtonProps type in your own components:
 * - Always provide aria-label for icon-only buttons
 * - Use appropriate variant for semantic meaning
 * - Ensure keyboard navigation is supported
 * - Test with screen readers for button announcements
 *
 * ## Browser & Environment Support
 *
 * - React 18.0+
 * - TypeScript 4.9+ (for satisfies keyword)
 * - Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
 * - Node.js 16+
 *
 * ## Related Documentation
 *
 * - {@link ../Button.tsx Button Component Implementation}
 * - {@link ../Button.stories.tsx Button Storybook Stories}
 * - {@link ../README.md Button Component README}
 * - {@link ../../index.ts Web Components Main Export}
 * - {@link ../../../index.ts Library Main Export}
 *
 * @see https://react.dev/ React Documentation
 * @see https://www.typescriptlang.org/docs/ TypeScript Documentation
 * @see https://tailwindcss.com/docs Tailwind CSS Documentation
 */

export {
  Button,
  type ButtonProps,
  type ButtonRounded,
  type ButtonSize,
  type ButtonVariant,
} from './Button'
