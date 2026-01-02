/**
 * Type Declarations for Storybook Web
 *
 * This file provides TypeScript type definitions for assets that don't
 * have built-in type support, allowing them to be imported without errors.
 */

/**
 * CSS Module Declaration
 *
 * Declares that .css files can be imported as modules.
 * This is necessary because TypeScript doesn't have a built-in type
 * for CSS imports, even though Webpack/Storybook can bundle them.
 *
 * When a .css file is imported:
 * - Webpack processes it through the CSS loader chain
 * - PostCSS transforms Tailwind directives
 * - The processed CSS is injected into the DOM
 *
 * TypeScript needs this declaration to:
 * 1. Allow 'import "path/to/file.css"' statements
 * 2. Suppress "Cannot find module" errors
 * 3. Enable type checking for other TypeScript code
 *
 * Usage:
 * import '../src/tailwind.css'  // No TS error with this declaration
 *
 * @see {@link https://webpack.js.org/guides/typescript/#using-custom-properties}
 * @see {@link https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html}
 */
declare module '*.css'
