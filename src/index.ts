/**
 * @syntek-studio/ui - Shared UI component library
 *
 * Main entry point for the @syntek-studio/ui component library.
 * Exports web components, mobile components, design tokens, and utility functions
 * for use in React and React Native applications.
 *
 * ## Modules
 *
 * ### Web Components
 * React components for web applications.
 * All web components use Tailwind CSS 4 for styling.
 *
 * @example
 * import { Button } from '@syntek-studio/ui';
 * <Button onClick={() => console.log('clicked')}>Click me</Button>
 *
 * ### Mobile Components
 * React Native components for mobile applications.
 * All mobile components use Nativewind 4 (Tailwind CSS for React Native).
 * Accessed via the Mobile namespace.
 *
 * @example
 * import { Mobile } from '@syntek-studio/ui';
 * <Mobile.Button onPress={() => console.log('pressed')}>Press me</Mobile.Button>
 *
 * ### Design Tokens
 * Shared design system tokens including:
 * - colours: Colour palette with brand and semantic colours
 * - spacing: 4px grid-based spacing scale
 * - typography: Font families, sizes, and weights
 * - breakpoints: Responsive design breakpoints
 * - shadows: Elevation and depth effects
 * - borders: Border radius and width definitions
 *
 * @example
 * import { colours, spacing, typography } from '@syntek-studio/ui';
 * const primaryColor = colours.primary[500];
 * const padding = spacing[4];
 *
 * ### Utility Functions
 * Helper functions for class name manipulation and component styling:
 * - cn(): Combines multiple class names
 * - mergeClasses(): Merges and deduplicates class names
 * - Component style mappings for consistent styling across components
 *
 * @example
 * import { cn } from '@syntek-studio/ui';
 * const buttonClass = cn('btn', isActive && 'active', 'rounded');
 *
 * ## Browser and Platform Support
 *
 * **Web**: All modern browsers (Chrome, Firefox, Safari, Edge)
 * **Mobile**: iOS 12+ and Android 8+
 *
 * ## TypeScript
 *
 * Full TypeScript support with exported type definitions for all components,
 * tokens, and utilities. Import types using:
 *
 * @example
 * import { Button, type ButtonProps } from '@syntek-studio/ui';
 *
 * @see {@link https://github.com/syntek/ui-design-template} GitHub Repository
 * @see {@link https://storybook.example.com} Storybook Documentation
 */

// Web components
export * from './web/components'

// Mobile components (React Native + Nativewind)
export * as Mobile from './mobile/components'

// Design tokens
export * from './tokens'

// Utility functions and shared styles
export * from './utils'
