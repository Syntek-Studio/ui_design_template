/**
 * css.d.ts - TypeScript declarations for CSS and CSS module imports
 *
 * Provides TypeScript type definitions for importing CSS files in the project.
 * This enables importing CSS files both as side-effects and as CSS modules
 * with full type safety.
 *
 * ## CSS Side-Effect Imports
 *
 * Standard CSS file imports that execute for their side-effects (applying styles).
 * These are typically used for global styles, resets, and variable definitions.
 *
 * @example
 * import './tailwind.css';          // Applies Tailwind CSS reset and utilities
 * import './styles/globals.css';    // Global styles
 *
 * ## CSS Module Imports
 *
 * CSS modules that export a namespace of class names. Each class name becomes
 * a property on the imported object, providing type-safe class name access
 * and preventing naming collisions.
 *
 * @example
 * import styles from './Button.module.css';
 * <button className={styles.primary}>Click me</button>
 *
 * The imported `styles` object has type safety:
 * ```typescript
 * styles.primary        // Valid
 * styles['primary']     // Valid
 * styles.nonexistent    // Type error
 * ```
 *
 * ## Module Declarations
 *
 * - `*.css`: Global CSS files (side-effect imports)
 * - `*.module.css`: CSS modules (class name namespace exports)
 *
 * Both declarations allow TypeScript to understand CSS imports without
 * treating them as errors.
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/declaration-files.html} TypeScript Declaration Files
 * @see {@link https://github.com/css-modules/css-modules} CSS Modules Specification
 */

// Side-effect imports (import './styles.css')
declare module '*.css'

// CSS modules with default export (import styles from './styles.module.css')
declare module '*.module.css' {
  const classes: { [className: string]: string }
  export default classes
}
