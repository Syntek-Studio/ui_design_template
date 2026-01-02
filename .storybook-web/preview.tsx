/**
 * Storybook Preview Configuration
 *
 * This file configures the Storybook canvas where stories are rendered.
 * It defines:
 * - Global decorators that wrap every story
 * - Preview parameters (controls, backgrounds, layout)
 * - Global styling (Tailwind CSS)
 *
 * The Preview object is applied to all stories unless overridden at the
 * story or component level.
 *
 * @see {@link https://storybook.js.org/docs/react/configure/overview#configure-story-rendering}
 */

import type { Preview } from '@storybook/react'
import React from 'react'

/**
 * Import global styles.
 *
 * This imports the compiled Tailwind CSS file which provides:
 * - Tailwind utility classes (@tailwind directives)
 * - Custom theme variables and extensions
 * - Reset/normalisation styles
 *
 * CSS is imported here (rather than in HTML) so that it's processed
 * through PostCSS and webpack's CSS loaders, enabling all Tailwind features.
 */
import '../src/tailwind.css'

/**
 * Global decorator: Wraps every story in a container with padding.
 *
 * This provides consistent spacing around stories in the canvas,
 * preventing components from being rendered flush to the edges.
 *
 * Decorators are higher-order components that receive the story as a prop.
 * They can be used to:
 * - Wrap stories in context providers (e.g., theme providers)
 * - Add consistent layout/spacing
 * - Mock global dependencies
 * - Add visual backgrounds or containers
 *
 * @param Story - The story component to be rendered
 * @returns JSX element wrapping the story with padding
 *
 * @see {@link https://storybook.js.org/docs/react/writing-stories/decorators}
 */
const withContainer = (Story: React.ComponentType) => (
  <div style={{ padding: '1rem' }}>
    <Story />
  </div>
)

/**
 * Storybook preview configuration.
 *
 * Global settings applied to all stories unless explicitly overridden.
 */
const preview: Preview = {
  /**
   * Global decorators.
   *
   * Decorators are applied in order:
   * 1. withContainer: Adds padding around the story
   *
   * Additional decorators can be added for:
   * - Theme providers
   * - Layout wrappers
   * - Redux/Context providers
   * - Accessibility features
   *
   * Example:
   * decorators: [withContainer, withTheme, withA11yProvider]
   */
  decorators: [withContainer],

  /**
   * Global parameters for all stories.
   *
   * Parameters can be overridden at the component or story level.
   * Access parameters in stories via the 'meta' object:
   *
   * const meta: Meta<typeof Button> = {
   *   parameters: {
   *     backgrounds: { default: 'dark' },
   *   },
   * }
   */
  parameters: {
    /**
     * Controls addon configuration.
     *
     * The 'matchers' object defines how Storybook matches component props
     * to control types:
     *
     * - color: Matches props ending with "background" or "color"
     *   Creates a color picker control (e.g., backgroundColor, textColor)
     *
     * - date: Matches props ending with "Date"
     *   Creates a date picker control (e.g., createdDate, modifiedDate)
     *
     * @see {@link https://storybook.js.org/docs/react/essentials/controls#annotation}
     */
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    /**
     * Layout mode for the canvas.
     *
     * - 'fullscreen': Story uses the entire canvas
     * - 'centered': Story is centred with padding (default)
     * - 'padded': Story has padding around it
     *
     * Can be overridden per story via:
     * export const MyStory = {
     *   parameters: { layout: 'centered' },
     * }
     */
    layout: 'fullscreen',

    /**
     * Background options for the story canvas.
     *
     * Provides a background selector button in the toolbar to help
     * visualise components against different backgrounds.
     *
     * - default: 'light' sets the initial background
     * - values: Array of background options with name and colour
     *
     * Useful for checking contrast, visibility, and component
     * appearance on different backgrounds.
     *
     * @see {@link https://storybook.js.org/docs/react/essentials/backgrounds}
     */
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'grey', value: '#f5f5f5' },
      ],
    },
  },
}

/**
 * Export the preview configuration.
 *
 * This is imported by Storybook's preview manager and applied globally.
 */
export default preview
