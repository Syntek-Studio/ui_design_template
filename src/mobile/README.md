# src/mobile/

**Last Updated**: 01/01/2026
**Version**: 0.7.0
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [src/mobile/](#srcmobile)
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
    - [React Native Components](#react-native-components)
    - [Key Differences from Web](#key-differences-from-web)
    - [Event Handlers](#event-handlers)
    - [CSS Classes with Nativewind](#css-classes-with-nativewind)
  - [Creating Components](#creating-components)
    - [Step 1: Create Component Folder](#step-1-create-component-folder)
    - [Step 2: Implement Component](#step-2-implement-component)
    - [Step 3: Create Stories](#step-3-create-stories)
    - [Step 4: Create Re-export](#step-4-create-re-export)
    - [Step 5: Update Components Index](#step-5-update-components-index)
  - [Styling Guidelines](#styling-guidelines)
    - [Using Nativewind (Tailwind for Mobile)](#using-nativewind-tailwind-for-mobile)
    - [Design Tokens](#design-tokens)
    - [Text Component Requirement](#text-component-requirement)
    - [Responsive Design](#responsive-design)
  - [Testing](#testing)
  - [Integration with React Native Projects](#integration-with-react-native-projects)
    - [Setup in Your App](#setup-in-your-app)
  - [Related Sections](#related-sections)

---

## Overview

The `src/mobile/` folder contains all React Native components built for iOS and Android platforms. Components in this folder use:

- **React 18/19** for component logic
- **React Native** for cross-platform mobile components
- **Nativewind 4** for Tailwind CSS support on mobile
- **Mobile APIs** for platform-specific interactions (onPress, gestures, etc.)

These components are exported as a namespaced `Mobile` object from the main library entry point for easy importing.

---

## Directory Tree

```
src/mobile/
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

| File/Folder           | Purpose                                                |
| --------------------- | ------------------------------------------------------ |
| `components/`         | Folder containing all mobile component implementations |
| `components/index.ts` | Re-exports all mobile components for public API        |

---

## Component Pattern

Every mobile component follows a consistent structure:

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
 * Button component for React Native
 *
 * @example
 * <Button title="Press me" variant="primary" onPress={() => {}} />
 */
import { Pressable, Text } from 'react-native';

export interface ButtonProps {
  /** The button text */
  title: string;

  /** Press handler function */
  onPress?: () => void;

  /** Visual variant of the button */
  variant?: 'primary' | 'secondary';

  /** Tailwind CSS classes for custom styling */
  className?: string;

  /** Whether the button is disabled */
  disabled?: boolean;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  className = '',
  disabled = false,
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

### React Native Components

Mobile components use React Native core components:

| Component            | Purpose                  | Web Equivalent            |
| -------------------- | ------------------------ | ------------------------- |
| `<View>`             | Container/layout         | `<div>`                   |
| `<Text>`             | Text content             | `<span>` or `<p>`         |
| `<Pressable>`        | Interactive element      | `<button>`                |
| `<ScrollView>`       | Scrollable container     | `<div>` with scroll       |
| `<FlatList>`         | Efficient list rendering | Multiple `<div>` elements |
| `<TextInput>`        | Text input field         | `<input>`                 |
| `<TouchableOpacity>` | Touch feedback           | Button with opacity       |
| `<SafeAreaView>`     | Safe area boundary       | Not needed on web         |

### Key Differences from Web

| Aspect           | Web                    | Mobile                       |
| ---------------- | ---------------------- | ---------------------------- |
| Click handler    | `onClick`              | `onPress`                    |
| Button element   | `<button>`             | `<Pressable>` with `<Text>`  |
| Hover states     | `hover:` CSS class     | Not supported                |
| Active states    | `:active` pseudo-class | `active:` class              |
| Text wrapper     | Not needed             | Required `<Text>` component  |
| Focus management | Browser default        | Manual implementation        |
| Scrolling        | Browser default        | `<ScrollView>` component     |
| Safe area        | Not needed             | `<SafeAreaView>` for notches |

### Event Handlers

Mobile components use React Native event handlers:

| Handler        | Purpose                |
| -------------- | ---------------------- |
| `onPress`      | Touch interaction      |
| `onLongPress`  | Long press interaction |
| `onPressIn`    | Touch starts           |
| `onPressOut`   | Touch ends             |
| `onChangeText` | Text input changes     |
| `onFocus`      | Input receives focus   |
| `onBlur`       | Input loses focus      |

### CSS Classes with Nativewind

Mobile components use Tailwind classes through Nativewind:

```typescript
// Spacing
'px-4 py-2'                    // Padding (horizontal and vertical)

// Colours
'bg-blue-500 text-white'       // Background and text colour

// Active states (on press)
'active:bg-blue-600'           // Pressed state

// Disabled states
'disabled:opacity-50'          // Disabled styling

// NOT supported on mobile
'hover:opacity-90'             // Hover not available
':active' pseudo-class         // Use active: class instead
```

---

## Creating Components

### Step 1: Create Component Folder

```bash
mkdir -p src/mobile/components/MyComponent
```

### Step 2: Implement Component

Create `src/mobile/components/MyComponent/MyComponent.tsx`:

```typescript
import { View, Text } from 'react-native';

/**
 * MyComponent description
 */
export interface MyComponentProps {
  /** Prop documentation */
  title: string;
}

export const MyComponent = ({ title }: MyComponentProps) => {
  return (
    <View className="p-4">
      <Text className="text-base">{title}</Text>
    </View>
  );
};
```

### Step 3: Create Stories

Create `src/mobile/components/MyComponent/MyComponent.stories.tsx`:

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

Create `src/mobile/components/MyComponent/index.ts`:

```typescript
export { MyComponent, type MyComponentProps } from './MyComponent'
```

### Step 5: Update Components Index

Update `src/mobile/components/index.ts`:

```typescript
export * from './Button'
export * from './MyComponent' // Add this line
```

---

## Styling Guidelines

### Using Nativewind (Tailwind for Mobile)

Always use Tailwind utility classes on mobile via Nativewind:

```typescript
// Good
className = 'px-4 py-2 rounded bg-blue-500 text-white'

// Avoid
className = 'my-button' // with custom CSS/StyleSheet
```

### Design Tokens

Use design tokens from `src/tokens/` for consistency:

```typescript
import { colours, spacing } from '@template/ui'

// Note: Design tokens are JavaScript values, not CSS classes
// Use them for logic-based styling or conditionals
const bgColor = variant === 'primary' ? colours.primary[500] : colours.secondary[500]
```

### Text Component Requirement

Always wrap text content in `<Text>` component:

```typescript
// Good
<Pressable className="bg-blue-500">
  <Text className="text-white">Click me</Text>
</Pressable>

// Bad - text won't render properly
<Pressable className="bg-blue-500">
  Click me
</Pressable>
```

### Responsive Design

Use responsive Tailwind classes (same as web):

```typescript
className = 'px-4 md:px-6 lg:px-8' // Different padding on different screens
className = 'text-base md:text-lg' // Responsive font sizes
className = 'flex-col md:flex-row' // Responsive direction
```

---

## Testing

Each component should have:

1. **Storybook stories** for visual testing and documentation
2. **Unit tests** (using Vitest) for functionality
3. **Cross-platform testing** for iOS and Android

Run Storybook to view and test components:

```bash
npm run storybook:mobile
```

Note: Mobile Storybook is configured within your React Native project's `.ondevice/` configuration.

---

## Integration with React Native Projects

### Setup in Your App

1. Install the library:

```bash
npm install @template/ui
```

2. Install Nativewind and required dependencies:

```bash
npm install nativewind react-native-reanimated
```

3. Configure tailwind.config.js (in your app):

```javascript
module.exports = {
  content: ['node_modules/@template/ui/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. Use components:

```typescript
import { Mobile } from '@template/ui';

export function App() {
  return (
    <Mobile.Button
      title="Press me"
      onPress={() => console.log('Pressed!')}
    />
  );
}
```

---

## Related Sections

- [components/](components/) - All mobile component implementations
- [../web/](../web/) - React web components
- [../tokens/](../tokens/) - Design system tokens
- [../../README.md](../../README.md) - Main project README
- [../../docs/](../../docs/) - Project documentation

---

**Last Updated:** 22 December 2025
