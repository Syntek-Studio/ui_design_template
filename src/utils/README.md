# src/utils/

**Last Updated**: 01/01/2026
**Version**: 0.7.0
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [src/utils/](#srcutils)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Directory Tree](#directory-tree)
  - [Files](#files)
  - [Utilities](#utilities)
    - [Class Name Utilities (`classNames.ts`)](#class-name-utilities-classnamests)
    - [Component Style Mappings (`componentStyles.ts`)](#component-style-mappings-componentstylests)
  - [Usage Guide](#usage-guide)
    - [Importing Utilities](#importing-utilities)
    - [Using Class Name Utilities](#using-class-name-utilities)
    - [Using Component Styles in Web Components](#using-component-styles-in-web-components)
    - [Using Component Styles in Mobile Components](#using-component-styles-in-mobile-components)
  - [Type Safety](#type-safety)
  - [Best Practices](#best-practices)
  - [Extending the Utilities](#extending-the-utilities)
    - [Adding a New Size Variant](#adding-a-new-size-variant)
    - [Adding a New Variant](#adding-a-new-variant)
    - [Creating a New Utility Function](#creating-a-new-utility-function)
  - [Related Sections](#related-sections)

---

## Overview

The `src/utils/` folder contains shared utility functions and component style mappings used across both web and mobile components. These utilities ensure consistency, type safety, and DRY principles throughout the component library.

**Key Features:**

- Type-safe class name manipulation utilities
- Centralised component style mappings (size, variant, rounded)
- Cross-platform compatibility (web Tailwind CSS and mobile Nativewind)
- Reusable patterns that prevent code duplication

---

## Directory Tree

```
src/utils/
├── README.md              # This file
├── index.ts               # Main export file
├── classNames.ts          # Class name utility functions
└── componentStyles.ts     # Shared component style mappings
```

---

## Files

| File                 | Purpose                                                |
| -------------------- | ------------------------------------------------------ |
| `classNames.ts`      | Utilities for combining and merging CSS class names    |
| `componentStyles.ts` | Centralised Tailwind CSS class mappings for components |
| `index.ts`           | Main export file for all utilities                     |

---

## Utilities

### Class Name Utilities (`classNames.ts`)

Provides helper functions for managing CSS class names in a type-safe manner.

**Functions:**

1. **`cn(...classes)`** - Combines multiple class names, filtering out falsy values
   - Useful for conditional class application
   - Handles strings, booleans, undefined, and null values
   - Returns a clean space-separated string

2. **`mergeClasses(...classes)`** - Merges class strings, removing duplicates
   - Deduplicates repeated class names
   - Useful when combining multiple class strings

### Component Style Mappings (`componentStyles.ts`)

Centralised style mappings for common component patterns.

**Types:**

- `ComponentSize` - Size variants: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- `ComponentVariant` - Visual variants: `'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'success' | 'warning'`
- `ComponentRounded` - Border radius: `'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'`

**Style Mappings:**

| Mapping                     | Description                                            | Platform |
| --------------------------- | ------------------------------------------------------ | -------- |
| `sizeClasses`               | Padding, text size, and gap spacing for each size      | Both     |
| `iconOnlySizeClasses`       | Square padding for icon-only components (web)          | Web      |
| `iconOnlyMobileSizeClasses` | Square padding with 44px minimum touch target (mobile) | Mobile   |
| `textSizeClasses`           | Text size classes for React Native Text components     | Mobile   |
| `roundedClasses`            | Border radius mappings aligned with design tokens      | Both     |
| `variantClasses`            | Complete variant styling for web (with hover states)   | Web      |
| `mobileVariantClasses`      | Variant styling for mobile (active states only)        | Mobile   |
| `textColorClasses`          | Text colour mappings for each variant                  | Mobile   |
| `spinnerColors`             | Hex colour values for loading spinners                 | Mobile   |
| `spinnerSizeClasses`        | Width/height for SVG loading spinners                  | Web      |

---

## Usage Guide

### Importing Utilities

**Import from the main library:**

```typescript
import { cn, mergeClasses, sizeClasses, variantClasses } from '@template/ui'
```

**Import from utils directly:**

```typescript
import { cn, mergeClasses } from '@/utils'
import { sizeClasses, variantClasses, ComponentSize } from '@/utils'
```

### Using Class Name Utilities

**Conditional Classes with `cn`:**

```typescript
import { cn } from '@/utils'

const buttonClass = cn(
  'base-button',
  isPrimary && 'bg-blue-600',
  isDisabled && 'opacity-50',
  isFullWidth && 'w-full',
  customClassName
)
// Result: "base-button bg-blue-600 w-full" (if isPrimary and isFullWidth are true)
```

**Merging Classes with `mergeClasses`:**

```typescript
import { mergeClasses } from '@/utils'

const merged = mergeClasses('px-4 py-2 text-white', 'px-4 bg-blue-600', 'rounded-lg')
// Result: "px-4 py-2 text-white bg-blue-600 rounded-lg" (duplicates removed)
```

### Using Component Styles in Web Components

**Example: Button Component**

```typescript
import {
  sizeClasses,
  iconOnlySizeClasses,
  roundedClasses,
  variantClasses,
  cn
} from '@/utils';

export const Button = ({ size = 'md', variant = 'primary', rounded = 'lg', iconOnly = false }) => {
  const buttonClasses = cn(
    'inline-flex items-center justify-center',
    iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
    roundedClasses[rounded],
    variantClasses[variant]
  );

  return <button className={buttonClasses}>Click me</button>;
};
```

### Using Component Styles in Mobile Components

**Example: Mobile Button Component**

```typescript
import {
  sizeClasses,
  iconOnlyMobileSizeClasses,
  roundedClasses,
  mobileVariantClasses,
  textColorClasses,
  textSizeClasses,
  spinnerColors,
  cn
} from '@/utils';
import { Pressable, Text } from 'react-native';

export const Button = ({ size = 'md', variant = 'primary', rounded = 'lg', iconOnly = false }) => {
  const buttonClasses = cn(
    'flex-row items-center justify-center min-h-[44px]',
    iconOnly ? iconOnlyMobileSizeClasses[size] : sizeClasses[size],
    roundedClasses[rounded],
    mobileVariantClasses[variant]
  );

  const textClasses = cn(
    textSizeClasses[size],
    textColorClasses[variant],
    'font-semibold'
  );

  return (
    <Pressable className={buttonClasses}>
      <Text className={textClasses}>Press me</Text>
    </Pressable>
  );
};
```

---

## Type Safety

All utilities are fully typed with TypeScript:

```typescript
import {
  type ComponentSize,
  type ComponentVariant,
  type ComponentRounded,
  sizeClasses,
} from '@/utils'

// Type-safe access
const size: ComponentSize = 'md'
const sizeClass: string = sizeClasses[size] // "px-4 py-2 text-base gap-2"

// TypeScript will error on invalid values
const invalid: ComponentSize = 'huge' // Error: Type '"huge"' is not assignable
```

---

## Best Practices

1. **Always use shared utilities** - Don't duplicate class mappings in components
2. **Use `cn` for conditional classes** - Cleaner than template literals
3. **Import types alongside values** - Ensure type safety across components
4. **Platform-specific mappings** - Use `mobileVariantClasses` for mobile, `variantClasses` for web
5. **Consistent naming** - Use the same prop names (`size`, `variant`, `rounded`) across components
6. **Extend, don't duplicate** - Add new mappings to `componentStyles.ts` rather than creating inline definitions

---

## Extending the Utilities

### Adding a New Size Variant

```typescript
// In componentStyles.ts
export const sizeClasses: Record<ComponentSize, string> = {
  xs: 'px-2 py-1 text-xs gap-1',
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
  xl: 'px-8 py-4 text-xl gap-3',
  // Add new size here and update the ComponentSize type
}

// Update the type
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
```

### Adding a New Variant

```typescript
// In componentStyles.ts
export const variantClasses: Record<ComponentVariant, string> = {
  primary: '...',
  secondary: '...',
  // Add new variant
  info: 'bg-cyan-600 text-white hover:bg-cyan-700 active:bg-cyan-800 focus:ring-cyan-500 shadow-sm',
}

// Update the type
export type ComponentVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info' // Add here
```

### Creating a New Utility Function

```typescript
// In classNames.ts
/**
 * Conditionally applies class names based on a boolean mapping.
 *
 * @param classMap - Object mapping class names to boolean conditions
 * @returns A space-separated string of active class names
 *
 * @example
 * const classes = classIf({
 *   'bg-blue-600': isPrimary,
 *   'bg-red-600': isDestructive,
 *   'w-full': isFullWidth,
 * });
 */
export function classIf(classMap: Record<string, boolean>): string {
  return Object.entries(classMap)
    .filter(([, condition]) => condition)
    .map(([className]) => className)
    .join(' ')
}
```

---

## Related Sections

- [../web/components/](../web/components/) - Web components using these utilities
- [../mobile/components/](../mobile/components/) - Mobile components using these utilities
- [../tokens/](../tokens/) - Design tokens that inform these style mappings
- [../../README.md](../../README.md) - Main project README

---

**Last Updated:** 29 December 2024
