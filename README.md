# UI Design Template

A shared UI component library for React Web and React Native applications. Built with TypeScript, Tailwind CSS 4, and Nativewind 4.

## Features

- **Platform-specific components**: Separate implementations for web (`.web.tsx`) and native (`.native.tsx`)
- **Shared design tokens**: Consistent colors, spacing, and typography across platforms
- **Tailwind CSS 4**: Modern CSS-based configuration with `@theme` directive
- **Nativewind 4**: Same Tailwind classes work in React Native
- **TypeScript**: Full type safety and IntelliSense
- **Storybook**: Interactive component documentation
- **Tree-shakeable**: Only import what you need

## Installation

```bash
npm install @your-org/ui-design-template
```

### Peer Dependencies

For React Web projects:
```bash
npm install react react-dom tailwindcss
```

For React Native projects:
```bash
npm install react react-native nativewind tailwindcss react-native-reanimated react-native-safe-area-context
```

## Usage

### React Web

```tsx
import { Button, Card } from '@your-org/ui-design-template/web'
// or use the default export
import { Button, Card } from '@your-org/ui-design-template'

function App() {
  return (
    <Card title="Welcome" subtitle="Get started">
      <Button variant="primary" onPress={() => alert('Clicked!')}>
        Click Me
      </Button>
    </Card>
  )
}
```

### React Native

```tsx
import { Button, Card } from '@your-org/ui-design-template/native'

function App() {
  return (
    <Card title="Welcome" subtitle="Get started">
      <Button variant="primary" onPress={() => console.log('Clicked!')}>
        Click Me
      </Button>
    </Card>
  )
}
```

### Design Tokens

```tsx
import { colors, spacing, fontSize } from '@your-org/ui-design-template/tokens'

const customStyle = {
  color: colors.primary[600],
  padding: spacing.md,
  fontSize: fontSize.lg,
}
```

## Setup in Your Project

> **Note**: This library requires custom fonts (Inter & Poppins). See [FONTS.md](FONTS.md) for detailed font setup instructions for both web and React Native.

### Web Project Setup

1. Install Tailwind CSS 4:
```bash
npm install -D tailwindcss @tailwindcss/postcss
```

2. Create `postcss.config.js`:
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

3. Import the CSS in your app entry:
```tsx
import '@your-org/ui-design-template/dist/styles/tailwind.css'
```

### React Native Project Setup

1. Install Nativewind and dependencies:
```bash
npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
```

2. Create `tailwind.config.js`:
```js
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@your-org/ui-design-template/**/*.native.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Extend with your custom theme
    },
  },
}
```

3. Configure Metro bundler (`metro.config.js`):
```js
const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './global.css' })
```

4. Create `global.css`:
```css
@import "@your-org/ui-design-template/dist/styles/tailwind.css";
```

5. Import in your root component:
```tsx
import './global.css'
```

## Components

### Button

Interactive button component with multiple variants and sizes.

**Props:**
- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `disabled`: `boolean` (default: `false`)
- `fullWidth`: `boolean` (default: `false`)
- `onPress`: `() => void`

```tsx
<Button variant="primary" size="lg" onPress={() => {}}>
  Submit
</Button>
```

### Card

Container component with optional title, subtitle, and elevation.

**Props:**
- `title`: `string`
- `subtitle`: `string`
- `elevation`: `'none' | 'sm' | 'md' | 'lg' | 'xl'` (default: `'md'`)
- `padding`: `'none' | 'sm' | 'md' | 'lg'` (default: `'md'`)
- `onPress`: `() => void` (makes card interactive)

```tsx
<Card title="Card Title" subtitle="Subtitle" elevation="lg">
  <Text>Card content</Text>
</Card>
```

## Development

### Install Dependencies

```bash
npm install
```

### Start Storybook

```bash
npm run storybook
```

### Build Library

```bash
npm run build
```

### Type Check

```bash
npm run type-check
```

## Project Structure

```
ui-design-template/
├── src/
│   ├── components/          # Component implementations
│   │   ├── Button/
│   │   │   ├── Button.types.ts      # Shared types
│   │   │   ├── Button.web.tsx       # Web implementation
│   │   │   ├── Button.native.tsx    # Native implementation
│   │   │   └── index.ts
│   │   └── Card/
│   ├── tokens/              # Design tokens
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   └── typography.ts
│   ├── styles/
│   │   └── tailwind.css     # Tailwind 4 config with @theme
│   ├── index.ts             # Main entry (web)
│   ├── web.ts              # Web-specific exports
│   └── native.ts           # Native-specific exports
├── stories/                # Storybook stories
├── .storybook/            # Storybook config
└── dist/                  # Build output
```

## Design Tokens

The library uses a shared `@theme` configuration in `src/styles/tailwind.css` that works with both Tailwind CSS 4 and Nativewind 4.

### Colors
- `primary`: Blue scale (50-950)
- `secondary`: Slate scale (50-950)
- `success`, `warning`, `error`, `info`: Semantic colors

### Typography
- Font families: `Inter` (sans), `Poppins` (display)
- Font sizes: `xs` to `5xl`
- Font weights: `thin` to `black`

### Spacing
- Scale: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- Border radius: `sm` to `full`

## Publishing

1. Update version in `package.json`
2. Build the library: `npm run build`
3. Publish to npm: `npm publish`

## License

MIT
