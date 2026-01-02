# src/

**Last Updated**: 02/01/2026
**Version**: 0.7.1
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Directory Tree](#directory-tree)
- [Files](#files)
- [Structure](#structure)
  - [Entry Point (`index.ts`)](#entry-point-indexts)
  - [Web Components (`web/components/`)](#web-components-webcomponents)
  - [Mobile Components (`mobile/components/`)](#mobile-components-mobilecomponents)
  - [Design Tokens (`tokens/`)](#design-tokens-tokens)
- [Usage](#usage)
  - [Importing Web Components](#importing-web-components)
  - [Importing Mobile Components](#importing-mobile-components)
  - [Using Design Tokens](#using-design-tokens)
  - [Creating New Components](#creating-new-components)
- [Related Sections](#related-sections)

---

## Overview

The `src/` folder is the main source directory containing all component implementations, design tokens, and the
library's entry point. It's organised into three main sections:

1. **Web components**- React components for web browsers

2.**Mobile components**- React Native components

3.**Design tokens**- Shared design system values

All exports are consolidated at `index.ts` for easy importing by consumers of the library.

---

## Directory Tree

```markdown
src/
├── README.md # This file
├── index.ts # Main entry point
├── tailwind.css # Tailwind CSS entry
├── web/
│ ├── README.md
│ └── components/
│ ├── README.md
│ ├── Button/
│ │ ├── Button.tsx
│ │ ├── Button.stories.tsx
│ │ └── index.ts
│ └── index.ts
├── mobile/
│ ├── README.md
│ └── components/
│ ├── README.md
│ ├── Button/
│ │ ├── Button.tsx
│ │ ├── Button.stories.tsx
│ │ └── index.ts
│ └── index.ts
└── tokens/
├── README.md
├── index.ts
├── colours.ts
├── spacing.ts
├── typography.ts
├── breakpoints.ts
├── shadows.ts
└── borders.ts
```

---

## Files

| File/Folder    | Purpose                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| `index.ts`     | Main entry point that re-exports all web components, mobile components (namespaced), and design tokens |
| `tailwind.css` | Tailwind CSS entry file for processing                                                                 |
| `web/`         | React web components built with HTML and Tailwind CSS                                                  |
| `mobile/`      | React Native components using Nativewind                                                               |
| `tokens/`      | Shared design system tokens (colours, spacing, typography, etc.)                                       |

---

## Structure

### Entry Point (`index.ts`)

The main entry point re-exports all public API:

```typescript
// Web components (default exports)
export * from './web/components'

// Mobile components (namespaced)
export * as Mobile from './mobile/components'

// Design tokens
export * from './tokens'
```

### Web Components (`web/components/`)

Located in `src/web/components/`, each component follows this pattern:

```markdown
ComponentName/
├── ComponentName.tsx # Component implementation
├── ComponentName.stories.tsx # Storybook stories for testing and documentation
└── index.ts # Re-exports
```

**Example:**

```typescript
// src/web/components/Button/Button.tsx
export interface ButtonProps {
  title: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ title, onClick, variant = 'primary' }: ButtonProps) => {
  const bgColor = variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500';
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded ${bgColor} text-white`}>
      {title}
    </button>
  );
};
```

### Mobile Components (`mobile/components/`)

Located in `src/mobile/components/`, follows the same pattern as web but uses React Native APIs:

```markdown
ComponentName/
├── ComponentName.tsx # React Native implementation
├── ComponentName.stories.tsx # Storybook stories
└── index.ts # Re-exports
```

**Example:**

```typescript
// src/mobile/components/Button/Button.tsx
import { Pressable, Text } from 'react-native';

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ title, onPress, variant = 'primary' }: ButtonProps) => {
  const bgColor = variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500';
  return (
    <Pressable className={`px-4 py-2 rounded ${bgColor}`} onPress={onPress}>
      <Text className="text-white">{title}</Text>
    </Pressable>
  );
};
```

### Design Tokens (`tokens/`)

Centralised design system values that should be used across all components:

- **colours.ts**- Colour palette (primary, secondary, semantic, neutral)

-**spacing.ts**- Spacing scale (4px grid system, 0px to 384px)

-**typography.ts**- Font families, sizes, and weights

-**breakpoints.ts**- Responsive breakpoints (xs to 2xl)

-**shadows.ts**- Shadow definitions for depth and elevation

-**borders.ts** - Border radius and width values

---

## Usage

### Importing Web Components

```typescript
import { Button, Card, Input } from '@syntek-studio/ui';

// Use in your React component
<Button title="Click me" variant="primary" onClick={() => {}} />
```

### Importing Mobile Components

```typescript
import { Mobile } from '@syntek-studio/ui';

// Use in your React Native component
<Mobile.Button title="Click me" variant="primary" onPress={() => {}} />
```

### Using Design Tokens

```typescript
import { colours, spacing, typography, breakpoints, shadows, borders } from '@syntek-studio/ui'

// Use tokens for consistent styling
const primaryColor = colours.primary[500] // #3b82f6
const padding = spacing[4] // 16px
const fontSize = typography.fontSize.lg.size // 18
const breakpoint = breakpoints.md // 768px
const shadow = shadows.md // Box shadow string
const radius = borders.radius.lg // 8px
```

### Creating New Components

1. Create component folder in `src/web/components/ComponentName/`

2. Implement `ComponentName.tsx` using Tailwind CSS classes

3. Create `ComponentName.stories.tsx` for Storybook documentation

4. Add `index.ts` with re-export

5. Repeat process in `src/mobile/components/ComponentName/` for React Native

6. Import tokens from `src/tokens/` for consistent styling

---

## Related Sections

- [web/](web/) - React web components

- [mobile/](mobile/) - React Native components

- [tokens/](tokens/) - Design system tokens

- [../README.md](../README.md) - Main project README

- [../docs/](../docs/) - Project documentation

---

**Last Updated:** 02/01/2026
