# Web Storybook Configuration

**Last Updated**: 29/12/2024
**Version**: 0.5.1
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

This folder contains the Storybook configuration for web components.

## Table of Contents

- [Web Storybook Configuration](#web-storybook-configuration)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [File Structure](#file-structure)
  - [Commands](#commands)
  - [Configuration Details](#configuration-details)
    - [Story Discovery](#story-discovery)
    - [Addons](#addons)
    - [Webpack Configuration](#webpack-configuration)
    - [Tailwind CSS](#tailwind-css)
  - [Writing Stories](#writing-stories)
  - [Customisation](#customisation)
    - [Adding Global Decorators](#adding-global-decorators)
    - [Adding Webpack Plugins](#adding-webpack-plugins)
  - [Troubleshooting](#troubleshooting)
    - [Tailwind classes not working](#tailwind-classes-not-working)
    - [React Native components not rendering](#react-native-components-not-rendering)
    - [TypeScript errors in stories](#typescript-errors-in-stories)

## Overview

Web Storybook runs in the browser using Webpack 5 and supports:

- React components with TypeScript
- Tailwind CSS 4 via PostCSS
- React Native Web for cross-platform components
- Path aliases (`@/` → `src/`)

## File Structure

| File | Purpose |
|------|---------|
| `main.ts` | Webpack config, story discovery, and addons |
| `preview.tsx` | Global decorators, parameters, and Tailwind import |
| `README.md` | This documentation |

## Commands

```bash
# Start development server
npm run storybook:web

# Build static Storybook
npm run storybook:web:build
```

## Configuration Details

### Story Discovery

Stories are discovered from:
```
src/**/*.stories.@(js|jsx|ts|tsx|mdx)
```

This includes both web-only stories (`.stories.tsx`) and any MDX documentation.

### Addons

| Addon | Purpose |
|-------|---------|
| `@storybook/addon-links` | Navigation between stories |

Note: In Storybook 10, essentials (controls, actions, docs, viewport, backgrounds) are built-in.

### Webpack Configuration

The `webpackFinal` function in `main.ts` configures:

1. **React Native Web aliasing** - `react-native` → `react-native-web`
2. **Path aliases** - `@/` → `src/`
3. **Web extensions priority** - `.web.tsx` before `.tsx`
4. **Babel loader** - TypeScript and JSX transformation
5. **PostCSS loader** - Tailwind CSS 4 processing

### Tailwind CSS

Tailwind styles are loaded in `preview.tsx`:

```typescript
import '../src/tailwind.css'
```

This ensures all Tailwind utilities are available in stories.

## Writing Stories

Web stories use the `.stories.tsx` extension:

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Web/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Click me',
    variant: 'secondary',
  },
}
```

## Customisation

### Adding Global Decorators

Edit `preview.tsx` to add decorators:

```typescript
import type { Preview } from '@storybook/react'

const withThemeProvider = (Story: React.ComponentType) => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
)

const preview: Preview = {
  decorators: [withThemeProvider],
  // ...
}
```

### Adding Webpack Plugins

Edit `main.ts` in the `webpackFinal` function:

```typescript
webpackFinal: async (config) => {
  config.plugins?.push(new MyPlugin())
  return config
}
```

## Troubleshooting

### Tailwind classes not working

1. Ensure `src/tailwind.css` exists with `@import "tailwindcss"`
2. Check `postcss.config.mjs` includes `@tailwindcss/postcss`
3. Verify PostCSS loader is added in `main.ts`

### React Native components not rendering

1. Check `react-native-web` is aliased correctly
2. Ensure `.web.tsx` extensions are prioritised
3. Verify the component doesn't use unsupported RN APIs

### TypeScript errors in stories

1. Run `npm run type-check` to identify issues
2. Ensure `tsconfig.json` includes story files
3. Check Babel presets match TypeScript config
