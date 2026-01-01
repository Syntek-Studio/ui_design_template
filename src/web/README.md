# src/web/

**Last Updated**: 01/01/2026
**Version**: 0.7.0
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [src/web/](#srcweb)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Directory Tree](#directory-tree)
  - [Files](#files)
  - [Component Pattern](#component-pattern)
    - [Component Folder Structure](#component-folder-structure)
    - [Component Implementation (`ComponentName.tsx`)](#component-implementation-componentnametsx)
    - [Storybook Stories (`ComponentName.stories.tsx`)](#storybook-stories-componentnamestoriestsx)
    - [Re-export (`index.ts`)](#re-export-indexts)
  - [Platform Details](#platform-details)
    - [HTML Elements](#html-elements)
    - [Event Handlers](#event-handlers)
    - [CSS Classes](#css-classes)
    - [Focus \& Accessibility](#focus--accessibility)
  - [Creating Components](#creating-components)
    - [Step 1: Create Component Folder](#step-1-create-component-folder)
    - [Step 2: Implement Component](#step-2-implement-component)
    - [Step 3: Create Stories](#step-3-create-stories)
    - [Step 4: Create Re-export](#step-4-create-re-export)
    - [Step 5: Update Components Index](#step-5-update-components-index)
  - [Styling Guidelines](#styling-guidelines)
    - [Using Tailwind CSS](#using-tailwind-css)
    - [Design Tokens](#design-tokens)
    - [Responsive Design](#responsive-design)
  - [Testing](#testing)
  - [Related Sections](#related-sections)

---

## Overview

The `src/web/` folder contains all React web components built for browser environments. Components in this folder use:

- **React 18/19** for component logic
- **Tailwind CSS 4** for styling
- **HTML elements** (`<button>`, `<div>`, etc.)
- **Browser APIs** for interactions (onClick, focus, etc.)

These components are exported as default exports from the main library entry point for easy importing.

---

## Directory Tree

```
src/web/
├── README.md              # This file
└── components/
    ├── README.md
    ├── Button/
    │   ├── Button.tsx
    │   ├── Button.stories.tsx
    │   └── index.ts
    └── index.ts
```

---

## Files

| File/Folder           | Purpose                                             |
| --------------------- | --------------------------------------------------- |
| `components/`         | Folder containing all web component implementations |
| `components/index.ts` | Re-exports all web components for public API        |

---

## Component Pattern

Every web component follows a consistent structure:

### Component Folder Structure

```
ComponentName/
├── ComponentName.tsx           # Main component file
├── ComponentName.stories.tsx   # Storybook stories
└── index.ts                    # Re-export
```

### Component Implementation (`ComponentName.tsx`)

```typescript
/**
 * Button component for web
 *
 * @example
 * <Button title="Click me" variant="primary" onClick={() => {}} />
 */
export interface ButtonProps {
  /** The button text */
  title: string;

  /** Click handler function */
  onClick?: () => void;

  /** Visual variant of the button */
  variant?: 'primary' | 'secondary';

  /** Tailwind CSS classes for custom styling */
  className?: string;

  /** Whether the button is disabled */
  disabled?: boolean;
}

export const Button = ({
  title,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded font-semibold transition-opacity';
  const variantStyles =
    variant === 'primary'
      ? 'bg-blue-500 text-white hover:opacity-90 disabled:opacity-50'
      : 'bg-gray-500 text-white hover:opacity-90 disabled:opacity-50';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {title}
    </button>
  );
};
```

### Storybook Stories (`ComponentName.stories.tsx`)

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'Primary Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    title: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    title: 'Disabled Button',
    disabled: true,
  },
}
```

### Re-export (`index.ts`)

```typescript
export { Button, type ButtonProps } from './Button'
```

---

## Platform Details

### HTML Elements

Web components use standard HTML elements:

- `<button>` - Button interactions
- `<div>` - Layout and containers
- `<input>` - Form inputs
- `<textarea>` - Multi-line text input
- `<select>` - Dropdown selections
- `<form>` - Form grouping
- Semantic HTML elements for accessibility

### Event Handlers

Web components use React event handlers:

| Handler        | Purpose                  |
| -------------- | ------------------------ |
| `onClick`      | Click interactions       |
| `onChange`     | Input/form value changes |
| `onFocus`      | Element receives focus   |
| `onBlur`       | Element loses focus      |
| `onSubmit`     | Form submission          |
| `onMouseEnter` | Mouse enters element     |
| `onMouseLeave` | Mouse leaves element     |

### CSS Classes

All styling uses Tailwind CSS utility classes:

```typescript
// Spacing
'px-4 py-2' // Padding

// Colours
'bg-blue-500 text-white' // Background and text colour

// Hover states
'hover:opacity-90' // Hover effects

// Active states
'active:bg-blue-600' // Active/pressed state

// Disabled states
'disabled:opacity-50' // Disabled styling

// Responsive
'md:px-6 lg:px-8' // Responsive classes
```

### Focus & Accessibility

Web components should include focus states for accessibility:

```typescript
className = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
```

---

## Creating Components

### Step 1: Create Component Folder

```bash
mkdir -p src/web/components/MyComponent
```

### Step 2: Implement Component

Create `src/web/components/MyComponent/MyComponent.tsx`:

```typescript
/**
 * MyComponent description
 */
export interface MyComponentProps {
  /** Prop documentation */
  title: string;
}

export const MyComponent = ({ title }: MyComponentProps) => {
  return <div className="p-4">{title}</div>;
};
```

### Step 3: Create Stories

Create `src/web/components/MyComponent/MyComponent.stories.tsx`:

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { MyComponent } from './MyComponent'

const meta = {
  component: MyComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'My Component',
  },
}
```

### Step 4: Create Re-export

Create `src/web/components/MyComponent/index.ts`:

```typescript
export { MyComponent, type MyComponentProps } from './MyComponent'
```

### Step 5: Update Components Index

Update `src/web/components/index.ts`:

```typescript
export * from './Button'
export * from './MyComponent' // Add this line
```

---

## Styling Guidelines

### Using Tailwind CSS

Always prefer Tailwind utility classes over custom CSS:

```typescript
// Good
className = 'px-4 py-2 rounded bg-blue-500 text-white hover:opacity-90'

// Avoid
className = 'custom-button' // with custom CSS
```

### Design Tokens

Use design tokens from `src/tokens/` for consistency:

```typescript
import { colours, spacing } from '@template/ui'

// In component styling
const bgColor = variant === 'primary' ? colours.primary[500] : colours.secondary[500]
```

### Responsive Design

Use responsive Tailwind classes:

```typescript
className = 'px-4 md:px-6 lg:px-8' // Different padding on different screens
className = 'text-base md:text-lg' // Responsive font sizes
className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' // Responsive grids
```

---

## Testing

Each component should have:

1. **Storybook stories** for visual testing and documentation
2. **Unit tests** (using Vitest) for functionality
3. **Accessibility tests** for WCAG compliance

Run Storybook to view and test components:

```bash
npm run storybook:web
```

---

## Related Sections

- [components/](components/) - All web component implementations
- [../mobile/](../mobile/) - React Native mobile components
- [../tokens/](../tokens/) - Design system tokens
- [../../README.md](../../README.md) - Main project README
- [../../docs/](../../docs/) - Project documentation

---

**Last Updated:** 22 December 2025
