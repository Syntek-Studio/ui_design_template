/**
 * @fileoverview Global TypeScript type declarations for @syntek-studio/ui.
 *
 * This file provides ambient type definitions for modules and file types that
 * TypeScript does not natively understand. These declarations allow importing
 * CSS and other assets without TypeScript errors.
 *
 * Global declarations are automatically included in all TypeScript files.
 * No need to import this file explicitly.
 *
 * Declarations include:
 *   - CSS side-effect imports
 *   - CSS module imports
 *
 * Note: React and React Native types are defined in tsconfig.json via the
 * "types" compiler option which includes "nativewind/types" and "node".
 *
 * @see {@link ../tsconfig.json} TypeScript compiler configuration
 * @see {@link https://www.typescriptlang.org/docs/handbook/declaration-files/index.html}
 *       TypeScript declaration file documentation
 *
 * @version TypeScript 5.9.3
 */

/**
 * CSS side-effect imports
 *
 * Allows importing CSS files for their side effects (applying styles to the DOM).
 * Used in the component library entry point and individual component styles.
 *
 * Usage:
 *   import './styles.css'
 *   import '@/tailwind.css'
 *   import '../styles/global.css'
 *
 * When imported, the CSS file is processed by PostCSS (which includes Tailwind)
 * and the resulting styles are injected into the page or application.
 *
 * TypeScript sees this as importing a module with no exports, which is valid.
 *
 * @example
 *   import './index.css'  // Valid: side-effect import
 *   const styles = import('./index.css')  // Invalid: cannot import as value
 */
declare module '*.css'

/**
 * CSS Modules imports
 *
 * Allows importing CSS Module files that export an object mapping class names
 * to their mangled CSS class names. Useful for component-scoped styling.
 *
 * Usage:
 *   import styles from './Button.module.css'
 *   <button className={styles.primary}></button>
 *
 * When imported, TypeScript treats the module as an object where each CSS class
 * name becomes a property. The readonly constraint prevents accidental mutations.
 *
 * Example CSS Module file (Button.module.css):
 *   .primary { background: blue; }
 *   .secondary { background: gray; }
 *
 * Becomes TypeScript object:
 *   {
 *     primary: string
 *     secondary: string
 *   }
 *
 * @example
 *   import styles from './Button.module.css'
 *   type ButtonStyles = {
 *     readonly primary: string
 *     readonly secondary: string
 *   }
 */
declare module '*.module.css' {
  /**
   * CSS Module exports object
   *
   * Maps each CSS class name to its compiled class name string.
   * The 'readonly' constraint prevents assignment to properties.
   *
   * @type {Record<string, string>} Map of CSS class names to compiled names
   */
  const classes: { readonly [key: string]: string }

  /**
   * Default export is the classes object
   *
   * Allows destructuring or accessing as named properties:
   *   import styles from './Button.module.css'
   *   styles.primary
   *   styles.secondary
   */
  export default classes
}
