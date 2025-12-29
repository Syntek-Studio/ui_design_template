# @template/ui

**Last Updated**: 29/12/2024
**Version**: 0.1.0
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

A shared UI component library for React Web and React Native applications. Built with TypeScript, Tailwind CSS 4, and Nativewind 4.

## Table of Contents

- [@template/ui](#tempalteui)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
    - [Peer Dependencies](#peer-dependencies)
  - [Quick Start](#quick-start)
    - [Web Components](#web-components)
    - [Mobile Components](#mobile-components)
    - [Design Tokens](#design-tokens)
  - [Architecture](#architecture)
    - [Platform-Specific Implementation](#platform-specific-implementation)
      - [Web Components](#web-components-1)
      - [Mobile Components](#mobile-components-1)
    - [Import Patterns](#import-patterns)
    - [Platform Differences](#platform-differences)
  - [Components](#components)
    - [Button](#button)
  - [Design Tokens](#design-tokens-1)
    - [Colours](#colours)
    - [Spacing](#spacing)
    - [Typography](#typography)
    - [Breakpoints](#breakpoints)
    - [Shadows](#shadows)
    - [Borders](#borders)
  - [Styling](#styling)
    - [Tailwind CSS 4](#tailwind-css-4)
    - [Custom Styling](#custom-styling)
    - [PostCSS Configuration](#postcss-configuration)
  - [Examples](#examples)
    - [Creating a Login Form](#creating-a-login-form)
  - [Documentation](#documentation)
    - [Storybook](#storybook)
  - [Development](#development)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Available Commands](#available-commands)
    - [Project Structure](#project-structure)
    - [Creating New Components](#creating-new-components)
  - [Contributing](#contributing)
    - [Commit Convention](#commit-convention)
    - [Pull Request Workflow](#pull-request-workflow)
  - [License](#license)
  - [Support](#support)

---

## Features

- **Cross-Platform**: Single codebase for both web and React Native
- **TypeScript First**: Fully typed for excellent developer experience
- **Design Tokens**: Comprehensive colour, spacing, typography, and shadow tokens
- **Tailwind CSS 4**: Modern utility-first styling with Nativewind support
- **Storybook**: Interactive component documentation and testing
- **Responsive**: Built-in support for mobile and desktop layouts
- **Accessible**: WCAG compliance with semantic HTML and ARIA attributes

---

## Installation

Install the library using npm or yarn:

```bash
npm install @template/ui
```

Or with yarn:

```bash
yarn add @template/ui
```

### Peer Dependencies

This library requires the following peer dependencies:

```json
{
  "react": "^18 || ^19",
  "react-dom": "^18 || ^19",
  "nativewind": "^4.0.0"
}
```

For React Native projects, also install:

```bash
npm install react-native react-native-web nativewind
```

---

## Quick Start

### Web Components

```typescript
import { Button } from '@template/ui';

export function App() {
  return (
    <Button
      title="Click me"
      variant="primary"
      onClick={() => console.log('Clicked!')}
    />
  );
}
```

### Mobile Components

```typescript
import { Mobile } from '@template/ui';

export function App() {
  return (
    <Mobile.Button
      title="Click me"
      variant="primary"
      onPress={() => console.log('Pressed!')}
    />
  );
}
```

### Design Tokens

```typescript
import { colours, spacing, typography, breakpoints } from '@template/ui';

// Colours
const primaryColor = colours.primary[500]; // #3b82f6
const errorColor = colours.error; // #ef4444

// Spacing
const padding = spacing[4]; // 16px
const margin = spacing[6]; // 24px

// Typography
const fontSize = typography.fontSize.lg; // { size: 18, lineHeight: 28 }
const fontWeight = typography.fontWeight.semibold; // 600

// Breakpoints
const mobileBreakpoint = breakpoints.sm; // 640px
const desktopBreakpoint = breakpoints.lg; // 1024px
```

---

## Architecture

### Platform-Specific Implementation

The library maintains separate implementations for web and mobile platforms:

```
src/
├── web/components/        # React web components
├── mobile/components/     # React Native components
├── tokens/               # Shared design tokens
└── index.ts             # Main entry point
```

#### Web Components

Located in `src/web/components/`, built with:
- React 18/19
- Tailwind CSS 4 utilities
- HTML elements (`<button>`, `<div>`, etc.)

#### Mobile Components

Located in `src/mobile/components/`, built with:
- React Native
- Nativewind 4 for styling
- React Native components (`<Pressable>`, `<Text>`, etc.)

### Import Patterns

**Web (default exports):**
```typescript
import { Button, Card, Input } from '@template/ui';
```

**Mobile (namespaced):**
```typescript
import { Mobile } from '@template/ui';

<Mobile.Button />
<Mobile.Card />
<Mobile.Input />
```

### Platform Differences

| Aspect | Web | Mobile |
|--------|-----|--------|
| Click handler | `onClick` | `onPress` |
| Button element | `<button>` | `<Pressable>` |
| Hover states | `hover:` class | Not supported |
| Active states | `:active` pseudo-class | `active:` class |
| Text wrapper | Not needed | Required `<Text>` |
| Focus management | Browser default | Manual implementation |

---

## Components

### Button

Versatile button component supporting multiple variants and states.

**Web:**
```typescript
import { Button } from '@template/ui';

<Button
  title="Submit"
  variant="primary"
  onClick={() => {}}
/>
```

**Mobile:**
```typescript
import { Mobile } from '@template/ui';

<Mobile.Button
  title="Submit"
  variant="primary"
  onPress={() => {}}
  disabled={false}
/>
```

**Props:**
- `title` (string) - Button text
- `variant` ('primary' | 'secondary') - Visual style
- `onClick`/`onPress` (function, optional) - Click handler
- `disabled` (boolean, optional, mobile only) - Disable interaction

For more components and detailed documentation, see [docs/COMPONENTS.md](docs/COMPONENTS.md).

---

## Design Tokens

The library includes comprehensive design tokens for consistent styling:

### Colours

```typescript
import { colours } from '@template/ui';

colours.primary;    // 50-900 shades
colours.secondary;  // 50-900 shades
colours.success;    // #22c55e
colours.error;      // #ef4444
colours.warning;    // #f59e0b
colours.info;       // #3b82f6
colours.grey;       // 50-900 shades
colours.white;      // #ffffff
colours.black;      // #000000
```

### Spacing

```typescript
import { spacing } from '@template/ui';

spacing[0];     // 0px
spacing[1];     // 4px
spacing[2];     // 8px
spacing[4];     // 16px
spacing[6];     // 24px
// ... up to spacing[96] (384px)
```

### Typography

```typescript
import { typography } from '@template/ui';

// Font families
typography.fontFamily.sans;  // Inter, system-ui, sans-serif
typography.fontFamily.serif; // Georgia, serif
typography.fontFamily.mono;  // Fira Code, monospace

// Font sizes
typography.fontSize.base;     // { size: 16, lineHeight: 24 }
typography.fontSize.lg;       // { size: 18, lineHeight: 28 }
typography.fontSize['2xl'];   // { size: 24, lineHeight: 32 }

// Font weights
typography.fontWeight.normal;    // 400
typography.fontWeight.semibold;  // 600
typography.fontWeight.bold;      // 700
```

### Breakpoints

```typescript
import { breakpoints } from '@template/ui';

breakpoints.sm;   // 640px
breakpoints.md;   // 768px
breakpoints.lg;   // 1024px
breakpoints.xl;   // 1280px
breakpoints['2xl']; // 1536px
```

### Shadows

```typescript
import { shadows } from '@template/ui';

shadows.none;   // none
shadows.sm;     // Small shadow
shadows.base;   // Base shadow
shadows.lg;     // Large shadow
shadows.xl;     // Extra large shadow
shadows.inner;  // Inset shadow
```

### Borders

```typescript
import { borders } from '@template/ui';

// Border radius
borders.radius.none;   // 0
borders.radius.sm;     // 2px
borders.radius.base;   // 4px
borders.radius.lg;     // 8px
borders.radius.full;   // 9999px (full circle)

// Border width
borders.width[0];   // 0
borders.width[1];   // 1px
borders.width[2];   // 2px
borders.width[4];   // 4px
```

For detailed token documentation, see [docs/TOKENS.md](docs/TOKENS.md).

---

## Styling

### Tailwind CSS 4

The library uses Tailwind CSS 4 for both web and mobile platforms through Nativewind.

**Web Example:**
```typescript
<Button className="px-4 py-2 rounded bg-blue-500 text-white hover:opacity-90" />
```

**Mobile Example:**
```typescript
<Mobile.Button className="px-4 py-2 rounded bg-blue-500 text-white" />
```

### Custom Styling

Components accept a `className` prop for customisation:

```typescript
<Button
  title="Custom"
  className="bg-gradient-to-r from-blue-500 to-purple-600"
/>
```

### PostCSS Configuration

The library includes PostCSS configuration for processing Tailwind CSS. See [postcss.config.mjs](postcss.config.mjs).

---

## Examples

### Creating a Login Form

**Web:**
```typescript
import { Button, Input } from '@template/ui';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Login:', { email, password });
  };

  return (
    <form className="space-y-4 p-6">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button title="Login" onClick={handleSubmit} />
    </form>
  );
}
```

**Mobile:**
```typescript
import { Mobile } from '@template/ui';
import { View } from 'react-native';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Login:', { email, password });
  };

  return (
    <View className="space-y-4 p-6">
      <Mobile.Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Mobile.Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Mobile.Button title="Login" onPress={handleSubmit} />
    </View>
  );
}
```

---

## Documentation

Comprehensive documentation is available in the [`docs/`](docs/) folder:

- [Component Reference](docs/COMPONENTS.md) - Detailed component API documentation
- [Design Tokens](docs/TOKENS.md) - Complete token reference
- [Setup Guides](docs/SETUP/) - Installation and configuration
- [Architecture Overview](docs/ARCHITECTURE.md) - System design and patterns
- [Contributing Guide](docs/GUIDES/CONTRIBUTING.md) - Contribution guidelines
- [Changelog](docs/CHANGELOG.md) - Version history and release notes

### Storybook

View interactive component stories:

```bash
npm run storybook:web
```

This opens Storybook at [http://localhost:6006](http://localhost:6006) with component examples and documentation.

---

## Development

### Prerequisites

- Node.js 18+
- npm 9+ or yarn 3+
- Git

### Setup

```bash
# Clone the repository
git clone git@github-syntek:Syntek-Studio/ui_design_template.git
cd ui_design_template

# Install dependencies
npm install

# Start development mode
npm run dev
```

### Available Commands

```bash
# Build the library (outputs to dist/)
npm run build

# Watch mode for development
npm run dev

# Run Storybook for web components
npm run storybook:web

# Build Storybook static site
npm run storybook:web:build

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Running tests
npm run test
npm run test:coverage
```

### Project Structure

```
src/
├── index.ts                    # Main entry point
├── web/
│   └── components/
│       ├── Button/
│       │   ├── Button.tsx
│       │   ├── Button.stories.tsx
│       │   └── index.ts
│       └── index.ts
├── mobile/
│   └── components/
│       ├── Button/
│       │   ├── Button.tsx
│       │   ├── Button.stories.tsx
│       │   └── index.ts
│       └── index.ts
└── tokens/
    ├── colours.ts
    ├── spacing.ts
    ├── typography.ts
    ├── breakpoints.ts
    ├── shadows.ts
    ├── borders.ts
    └── index.ts
```

### Creating New Components

Follow the component structure to add new components:

1. Create a folder: `src/web/components/ComponentName/`
2. Add implementation: `ComponentName.tsx`
3. Add stories: `ComponentName.stories.tsx`
4. Add export: `index.ts`
5. Repeat for mobile in `src/mobile/components/ComponentName/`

For detailed guidelines, see [CONTRIBUTING.md](docs/GUIDES/CONTRIBUTING.md).

---

## Contributing

We welcome contributions! Please read our [Contributing Guide](docs/GUIDES/CONTRIBUTING.md) for:

- Code style guidelines
- Commit conventions
- Pull request process
- Testing requirements

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear, semantic commit history:

```
type(scope): description

Body explaining what and why

Files Changed:
- src/web/components/Button.tsx
- src/mobile/components/Button.tsx

Still to do:
- Add accessibility tests
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

### Pull Request Workflow

Branch structure:

```
feature/your-feature → testing → dev → staging → main
```

Create PRs with clear descriptions and include:
- What changed
- Why it changed
- Testing performed
- Screenshots (if UI changes)

---

## License

ISC

---

## Support

For questions, issues, or feature requests, please open an issue on the repository or contact the development team.

---

**Last Updated:** 22 December 2025
