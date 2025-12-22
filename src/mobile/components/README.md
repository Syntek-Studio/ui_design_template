# src/mobile/components/

## Table of Contents

- [Overview](#overview)
- [Directory Tree](#directory-tree)
- [Components](#components)
- [Component API](#component-api)
- [Usage Examples](#usage-examples)
- [Related Sections](#related-sections)

---

## Overview

This folder contains all mobile component implementations for React Native. Each component is built with:

- **React 18/19** for component logic
- **React Native** for cross-platform mobile UI
- **TypeScript** for type safety
- **Nativewind 4** for Tailwind CSS styling
- **Storybook** for documentation and testing

Components are organised into individual folders, each containing the component implementation, Storybook stories, and exports.

---

## Directory Tree

```
src/mobile/components/
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

Versatile button component with multiple variants and states for React Native.

**Location:** `Button/`

**Props:**
```typescript
interface ButtonProps {
  title: string;                          // Button text
  onPress?: () => void;                   // Press handler
  variant?: 'primary' | 'secondary';      // Visual variant
  disabled?: boolean;                     // Disabled state
  className?: string;                     // Custom Nativewind classes
}
```

**Import:**
```typescript
import { Mobile } from '@syntek/ui';

<Mobile.Button ... />
```

**Example:**
```typescript
<Mobile.Button
  title="Submit"
  variant="primary"
  onPress={() => console.log('Pressed')}
/>
```

**Variants:**
- **primary** - Blue background, white text
- **secondary** - Grey background, white text

**States:**
- Normal - Interactive
- Active/Pressed - Darker shade (active: class)
- Disabled - 50% opacity, no interaction

---

## Component API

### Button Component

```typescript
import { Pressable, Text } from 'react-native';

export interface ButtonProps {
  /** The button text content */
  title: string;

  /** Callback function when button is pressed */
  onPress?: () => void;

  /** Visual style of the button */
  variant?: 'primary' | 'secondary';

  /** Whether the button is disabled and not interactive */
  disabled?: boolean;

  /** Additional Nativewind CSS classes for customisation */
  className?: string;
}

export const Button: React.FC<ButtonProps>;
```

---

## Usage Examples

### Basic Button

```typescript
import { Mobile } from '@syntek/ui';

<Mobile.Button
  title="Press me"
  onPress={() => alert('Pressed!')}
/>
```

### Primary Button

```typescript
<Mobile.Button
  title="Submit Form"
  variant="primary"
  onPress={handleSubmit}
/>
```

### Secondary Button

```typescript
<Mobile.Button
  title="Cancel"
  variant="secondary"
  onPress={handleCancel}
/>
```

### Disabled Button

```typescript
<Mobile.Button
  title="Submit"
  disabled={true}
  onPress={handleSubmit}
/>
```

### Custom Styling

```typescript
<Mobile.Button
  title="Custom"
  className="bg-gradient-to-r from-blue-500 to-purple-600"
  onPress={() => {}}
/>
```

### Form Integration

```typescript
import { Mobile } from '@syntek/ui';
import { View, TextInput } from 'react-native';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log('Email:', email);
  };

  return (
    <View className="flex-1 justify-center items-center p-6">
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />
      <Mobile.Button
        title="Submit"
        variant="primary"
        onPress={handleSubmit}
      />
    </View>
  );
}
```

### Loading State Pattern

```typescript
import { Mobile } from '@syntek/ui';
import { View, ActivityIndicator } from 'react-native';
import { useState } from 'react';

export function AsyncButton() {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/submit');
      await response.json();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Mobile.Button
      title="Submit"
      onPress={handlePress}
      disabled={loading}
    />
  );
}
```

### Multiple Buttons Layout

```typescript
import { Mobile } from '@syntek/ui';
import { View } from 'react-native';

export function ConfirmDialog() {
  return (
    <View className="flex-row gap-4 p-4">
      <View className="flex-1">
        <Mobile.Button
          title="Cancel"
          variant="secondary"
          onPress={() => {}}
        />
      </View>
      <View className="flex-1">
        <Mobile.Button
          title="Confirm"
          variant="primary"
          onPress={() => {}}
        />
      </View>
    </View>
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
import { Pressable, Text } from 'react-native';

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded';
  const variantStyles =
    variant === 'primary'
      ? 'bg-blue-500'
      : 'bg-gray-500';
  const disabledStyles = disabled ? 'opacity-50' : '';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
    >
      <Text className="text-white font-semibold text-center">{title}</Text>
    </Pressable>
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

1. Create a folder: `src/mobile/components/ComponentName/`
2. Create three files:
   - `ComponentName.tsx` - Implementation (uses React Native components)
   - `ComponentName.stories.tsx` - Storybook stories
   - `index.ts` - Re-export
3. Update `src/mobile/components/index.ts` to export the new component
4. Also create the web equivalent in `src/web/components/ComponentName/`

---

## Styling Best Practices

### Use Nativewind Classes

```typescript
// Good - use Nativewind/Tailwind classes
className="px-4 py-2 rounded bg-blue-500 text-white"

// Avoid - custom StyleSheet (doesn't work well with Nativewind)
className="my-custom-button"
```

### Text Component Requirement

Always wrap text in `<Text>` component:

```typescript
// Good
<Pressable>
  <Text>Press me</Text>
</Pressable>

// Bad - text won't render
<Pressable>
  Press me
</Pressable>
```

### Responsive Design

Use responsive Tailwind classes (same as web):

```typescript
className="px-4 md:px-6 lg:px-8"  // Different padding on different screens
className="text-sm md:text-base"  // Responsive font sizes
```

### Design Tokens

Use design tokens for dynamic values:

```typescript
import { colours } from '@syntek/ui';

const bgColor = variant === 'primary' ? colours.primary[500] : colours.secondary[500];
```

---

## Testing

### Storybook

View and test components in Storybook:

```bash
npm run storybook:mobile
```

Note: Mobile Storybook requires configuration within your React Native project's `.ondevice/` setup.

### Unit Tests

Each component should have unit tests using Vitest:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  it('renders button with title', () => {
    render(<Button title="Press me" />);
    expect(screen.getByText('Press me')).toBeTruthy();
  });

  it('calls onPress handler', () => {
    const onPress = vi.fn();
    const { getByRole } = render(
      <Button title="Press me" onPress={onPress} />
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('disables button when disabled prop is true', () => {
    render(<Button title="Press me" disabled={true} />);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });
});
```

---

## Platform-Specific Considerations

### iOS vs Android

Most components work the same on both platforms, but be aware of:

- **Safe area** - Use `<SafeAreaView>` for notches and status bars
- **Gesture handling** - Different touch response on each platform
- **Status bar** - Different heights on iOS (with notch) vs Android
- **Keyboard** - Different keyboard appearance and handling

### Accessibility

Mobile components should have proper accessibility attributes:

```typescript
<Pressable
  onPress={handlePress}
  accessibilityLabel="Submit button"
  accessibilityRole="button"
  accessibilityHint="Submits the form with current values"
>
  <Text>Submit</Text>
</Pressable>
```

---

## Related Sections

- [../](../) - Parent mobile folder
- [../../web/components/](../../web/components/) - Web components
- [../../tokens/](../../tokens/) - Design system tokens
- [../../../README.md](../../../README.md) - Main project README

---

**Last Updated:** 22 December 2025
