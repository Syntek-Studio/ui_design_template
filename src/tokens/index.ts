/**
 * Design system tokens
 *
 * Central export point for all design tokens used consistently across the component library.
 * These tokens represent the visual language and are used to maintain consistency across
 * all web and mobile components.
 *
 * ## Available Tokens
 *
 * - **colours**: Complete colour palette with semantic meanings
 * - **spacing**: 4px grid-based spacing scale for layouts
 * - **typography**: Font families, sizes, and weights
 * - **breakpoints**: Responsive design breakpoints for mobile-first approach
 * - **shadows**: Elevation and depth effects
 * - **borders**: Border radius and width definitions
 *
 * @example
 * import {
 *   colours,
 *   spacing,
 *   typography,
 *   breakpoints,
 *   shadows,
 *   borders
 * } from '@syntek-studio/ui';
 *
 * // Use in component styles
 * const primaryColor = colours.primary[500];
 * const padding = spacing[4];
 * const fontSize = typography.fontSize.lg;
 *
 * @see {@link https://example.com/design-tokens} Design tokens documentation
 */

export { borders, type Borders } from './borders'
export { breakpoints, type Breakpoints } from './breakpoints'
export { colours, type Colours } from './colours'
export { shadows, type Shadows } from './shadows'
export { spacing, type Spacing } from './spacing'
export { typography, type Typography } from './typography'
