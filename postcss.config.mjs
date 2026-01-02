/**
 * @fileoverview PostCSS configuration for @syntek-studio/ui component library.
 *
 * PostCSS is a JavaScript tool for transforming CSS with plugins.
 * This configuration processes CSS files through Tailwind CSS 4 using its new
 * PostCSS plugin (@tailwindcss/postcss).
 *
 * Processing pipeline:
 *   1. Tailwind CSS PostCSS plugin processes Tailwind directives
 *   2. CSS is scanned for utility class usage
 *   3. Only used utilities are included in the final CSS
 *   4. Additional PostCSS plugins can be added as needed
 *
 * Used by:
 *   - tsup (build configuration) - processes CSS during build
 *   - Storybook - applies styles to components in the UI
 *   - Development mode - hot reloads when CSS changes
 *
 * Configuration format: CommonJS (ES Module syntax with .mjs extension)
 * This allows using import/export while remaining compatible with PostCSS.
 *
 * @see {@link ./src/tailwind.css} Tailwind CSS entry point
 * @see {@link https://postcss.org/} PostCSS documentation
 * @see {@link https://tailwindcss.com/docs/installation/using-postcss} Tailwind CSS with PostCSS
 *
 * @version PostCSS 8.5.6
 * @version @tailwindcss/postcss 4.1.18
 */

export default {
  /**
   * PostCSS plugins
   *
   * Defines the plugins that will process the CSS.
   * Plugins are applied in the order listed.
   *
   * Each plugin can be configured with options via its value.
   * An empty object {} means using the plugin's default configuration.
   */
  plugins: {
    /**
     * Tailwind CSS PostCSS plugin
     *
     * Main plugin that transforms CSS files containing Tailwind directives.
     * Processes:
     *   - @import 'tailwindcss' directives
     *   - @layer directives for base, components, utilities
     *   - Tailwind utility class generation
     *   - Theme customisation
     *   - CSS variable definitions
     *
     * The plugin:
     *   - Scans JavaScript/TypeScript files for Tailwind class usage
     *   - Generates CSS for used classes only (tree-shaking)
     *   - Applies Tailwind's default theme
     *   - Supports both web and React Native (via Nativewind)
     *
     * Configuration:
     *   - Empty object {} uses all Tailwind defaults
     *   - Customisation via tailwind.config.js if needed
     *
     * Input: CSS file with Tailwind directives (src/tailwind.css)
     * Output: Compiled CSS with used Tailwind utilities and custom CSS
     *
     * @see {@link ./src/tailwind.css} Where this plugin is applied
     * @see {@link https://tailwindcss.com/docs/using-with-preprocessors}
     *       Tailwind with preprocessors documentation
     */
    "@tailwindcss/postcss": {},
  },
};
