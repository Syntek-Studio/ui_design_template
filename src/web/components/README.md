# src/web/components/

## Table of Contents

- [Overview](#overview)
- [Directory Tree](#directory-tree)
- [Components](#components)
- [Component API](#component-api)
- [Usage Examples](#usage-examples)
- [Related Sections](#related-sections)

---

## Overview

This folder contains all web component implementations for React. Each component is built with:

- **React 18/19** for component logic
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **Storybook** for documentation and testing

Components are organised into individual folders, each containing the component implementation, Storybook stories, and exports.

---

## Directory Tree

```
src/web/components/
├── README.md              # This file
├── index.ts               # Main export file
└── Button/
    ├── Button.tsx
    ├── Button.stories.tsx
    └── index.ts
```

---

## Components

### Button

Versatile button component with multiple variants and states.

**Location:** `Button/`

**Props:**
```typescript
interface ButtonProps {
  title: string;                          // Button text
  onClick?: () => void;                   // Click handler
  variant?: 'primary' | 'secondary';      // Visual variant
  disabled?: boolean;                     // Disabled state
  className?: string;                     // Custom Tailwind classes
}
```

**Import:**
```typescript
import { Button } from '@syntek/ui';
```

**Example:**
```typescript
<Button
  title="Submit"
  variant="primary"
  onClick={() => console.log('Clicked')}
/>
```

**Variants:**
- **primary** - Blue background, white text
- **secondary** - Grey background, white text

**States:**
- Normal - Interactive
- Hover - Reduced opacity
- Disabled - 50% opacity

---

## Component API

### Button Component

```typescript
export interface ButtonProps {
  /** The button text content */
  title: string;

  /** Callback function when button is clicked */
  onClick?: () => void;

  /** Visual style of the button */
  variant?: 'primary' | 'secondary';

  /** Whether the button is disabled */
  disabled?: boolean;

  /** Additional Tailwind CSS classes for customisation */
  className?: string;
}

export const Button: React.FC<ButtonProps>;
```

---

## Usage Examples

### Basic Button

```typescript
import { Button } from '@syntek/ui';

<Button
  title="Click me"
  onClick={() => alert('Clicked!')}
/>
```

### Primary Button

```typescript
<Button
  title="Submit Form"
  variant="primary"
  onClick={handleSubmit}
/>
```

### Secondary Button

```typescript
<Button
  title="Cancel"
  variant="secondary"
  onClick={handleCancel}
/>
```

### Disabled Button

```typescript
<Button
  title="Submit"
  disabled={true}
  onClick={handleSubmit}
/>
```

### Custom Styling

```typescript
<Button
  title="Custom"
  className="bg-gradient-to-r from-blue-500 to-purple-600"
  onClick={() => {}}
/>
```

### Form Integration

```typescript
import { Button } from '@syntek/ui';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 border rounded"
      />
      <Button
        title="Submit"
        variant="primary"
        onClick={handleSubmit}
      />
    </form>
  );
}
```

### Loading State Pattern

```typescript
import { Button } from '@syntek/ui';
import { useState } from 'react';

export function AsyncButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await fetch('/api/submit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      title={loading ? 'Loading...' : 'Submit'}
      onClick={handleClick}
      disabled={loading}
    />
  );
}
```

---

## Component Structure

### Button Component Example

```
Button/
├── Button.tsx              # Component implementation
├── Button.stories.tsx      # Storybook documentation
└── index.ts                # TypeScript re-export
```

### Button.tsx

Implements the component logic and styling:

```typescript
export interface ButtonProps {
  title: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  title,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded font-semibold transition-opacity';
  const variantStyles =
    variant === 'primary'
      ? 'bg-blue-500 text-white hover:opacity-90'
      : 'bg-gray-500 text-white hover:opacity-90';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
    >
      {title}
    </button>
  );
};
```

### Button.stories.tsx

Provides Storybook documentation and examples:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Button',
    disabled: true,
  },
};
```

### index.ts

Re-exports the component for public API:

```typescript
export { Button, type ButtonProps } from './Button';
```

---

## Adding New Components

1. Create a folder: `src/web/components/ComponentName/`
2. Create three files:
   - `ComponentName.tsx` - Implementation
   - `ComponentName.stories.tsx` - Storybook stories
   - `index.ts` - Re-export
3. Update `src/web/components/index.ts` to export the new component
4. Run `npm run storybook:web` to view in Storybook

---

## Styling Best Practices

### Use Tailwind CSS Classes

```typescript
// Good
className="px-4 py-2 rounded bg-blue-500 text-white"

// Avoid custom CSS
className="my-custom-button"
```

### Responsive Design

```typescript
className="px-4 md:px-6 lg:px-8 text-sm md:text-base lg:text-lg"
```

### Design Tokens

```typescript
import { colours } from '@syntek/ui';

const bgColor = colours.primary[500];  // #3b82f6
const textColor = colours.white;        // #ffffff
```

---

## Testing

### Storybook

View and test components interactively:

```bash
npm run storybook:web
```

### Unit Tests

Each component should have unit tests using Vitest:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders button with title', () => {
    render(<Button title="Click me" />);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick handler', () => {
    const onClick = vi.fn();
    render(<Button title="Click me" onClick={onClick} />);
    screen.getByRole('button').click();
    expect(onClick).toHaveBeenCalled();
  });
});
```

---

## Related Sections

- [../](../) - Parent web folder
- [../../mobile/components/](../../mobile/components/) - Mobile components
- [../../tokens/](../../tokens/) - Design system tokens
- [../../../README.md](../../../README.md) - Main project README

---

**Last Updated:** 22 December 2025
