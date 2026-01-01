import type { Preview } from '@storybook/react'
import React from 'react'
import '../src/tailwind.css'

/**
 * Decorator to wrap stories in a consistent container
 */
const withContainer = (Story: React.ComponentType) => (
  <div style={{ padding: '1rem' }}>
    <Story />
  </div>
)

const preview: Preview = {
  decorators: [withContainer],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
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

export default preview
