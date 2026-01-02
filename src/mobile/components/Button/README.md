# Button (Mobile)

**Last Updated**: 02/01/2026
**Version**: 0.7.1
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [Overview](#overview)
- [Directory Tree](#directory-tree)
- [Props Interface](#props-interface)
- [Platform Differences](#platform-differences)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Related Sections](#related-sections)

---

## Overview

The Mobile Button component is a React Native button built with Nativewind 4. It provides the same design system as the web Button but uses native mobile components and patterns:

- **React Native Pressable** for touch handling
- **Nativewind** for Tailwind CSS styling
- **Native accessibility** with VoiceOver (iOS) and TalkBack (Android)
- **Touch targets** meeting WCAG 2.5.5 Level AAA (44×44 points minimum)

---

## Directory Tree

```
src/mobile/components/Button/
├── README.md                    # This file
├── Button.native.tsx            # Component implementation
├── Button.stories.native.tsx    # Storybook stories
└── index.ts                     # Re-export
```

---

## Props Interface

| Prop                 | Type              | Default     | Description                                 |
| -------------------- | ----------------- | ----------- | ------------------------------------------- |
| `children`           | `React.ReactNode` | -           | Button content (wrapped in Text)            |
| `onPress`            | `() => void`      | -           | Press handler (not onClick)                 |
| `variant`            | `ButtonVariant`   | `'primary'` | Visual style variant                        |
| `size`               | `ButtonSize`      | `'md'`      | Button size                                 |
| `rounded`            | `ButtonRounded`   | `'md'`      | Border radius                               |
| `disabled`           | `boolean`         | `false`     | Disable interaction                         |
| `loading`            | `boolean`         | `false`     | Show ActivityIndicator                      |
| `fullWidth`          | `boolean`         | `false`     | Full container width                        |
| `iconLeft`           | `React.ReactNode` | -           | Icon before text                            |
| `iconRight`          | `React.ReactNode` | -           | Icon after text                             |
| `iconOnly`           | `boolean`         | `false`     | Icon-only (requires accessibilityLabel)     |
| `className`          | `string`          | -           | Additional Nativewind classes               |
| `accessibilityLabel` | `string`          | -           | Screen reader label (required for iconOnly) |
| `accessibilityHint`  | `string`          | -           | Additional context for action               |
| `accessibilityState` | `object`          | -           | State for toggle/expandable buttons         |

---

## Platform Differences

| Aspect            | Web              | Mobile                |
| ----------------- | ---------------- | --------------------- |
| Click handler     | `onClick`        | `onPress`             |
| Button element    | `<button>`       | `<Pressable>`         |
| Text wrapper      | Not needed       | Required `<Text>`     |
| Hover states      | `hover:` class   | Not supported         |
| Active states     | `:active` pseudo | `active:` class       |
| Loading indicator | CSS spinner      | `<ActivityIndicator>` |
| ARIA attributes   | `aria-*`         | `accessibility*`      |

---

## Accessibility

### Touch Targets

All buttons have minimum 44×44 point touch targets (WCAG 2.5.5 Level AAA):

```typescript
// Even small buttons have adequate touch area
<Mobile.Button size="xs">Small</Mobile.Button>
// Touch target: 44×44 points, visual: smaller
```

### Screen Reader Support

**iOS (VoiceOver)**:

- Reads button label and role
- Announces disabled/selected state
- Supports custom hints

**Android (TalkBack)**:

- Reads accessibility label
- Announces button role
- Supports state descriptions

### Required Accessibility Props

```typescript
// Icon-only button - REQUIRES accessibilityLabel
<Mobile.Button iconOnly accessibilityLabel="Close modal">
  <CloseIcon />
</Mobile.Button>

// With hint for additional context
<Mobile.Button
  accessibilityLabel="Delete item"
  accessibilityHint="Removes this item from your cart"
>
  Delete
</Mobile.Button>

// Toggle button state
<Mobile.Button
  accessibilityState={{ selected: isActive }}
  onPress={toggle}
>
  Toggle
</Mobile.Button>

// Expandable state
<Mobile.Button
  accessibilityState={{ expanded: isOpen }}
  onPress={() => setIsOpen(!isOpen)}
>
  Show Details
</Mobile.Button>
```

---

## Usage Examples

### Basic Usage

```typescript
import { Mobile } from '@syntek-studio/ui'

<Mobile.Button onPress={() => console.log('Pressed!')}>
  Press me
</Mobile.Button>
```

### Variants

```typescript
<Mobile.Button variant="primary">Primary</Mobile.Button>
<Mobile.Button variant="secondary">Secondary</Mobile.Button>
<Mobile.Button variant="destructive">Delete</Mobile.Button>
```

### With Icons

```typescript
import { Plus, ArrowRight } from 'lucide-react-native'

<Mobile.Button iconLeft={<Plus />}>Add Item</Mobile.Button>
<Mobile.Button iconRight={<ArrowRight />}>Continue</Mobile.Button>
<Mobile.Button iconOnly accessibilityLabel="Add item">
  <Plus />
</Mobile.Button>
```

### Loading State

```typescript
<Mobile.Button loading disabled>
  Submitting...
</Mobile.Button>
```

### Full Width

```typescript
<Mobile.Button fullWidth variant="primary">
  Full Width Button
</Mobile.Button>
```

### In a View

```typescript
import { View } from 'react-native'
import { Mobile } from '@syntek-studio/ui'

<View className="p-4 space-y-2">
  <Mobile.Button variant="primary" onPress={handleSubmit}>
    Submit
  </Mobile.Button>
  <Mobile.Button variant="ghost" onPress={handleCancel}>
    Cancel
  </Mobile.Button>
</View>
```

---

## Nativewind Styling

The Mobile Button uses Nativewind for styling, which translates Tailwind CSS to React Native StyleSheet:

```typescript
// Nativewind classes work the same as web
<Mobile.Button className="bg-blue-500 px-4 py-2 rounded-lg">
  Custom Styled
</Mobile.Button>

// Active states use active: prefix
// (hover: is not supported on mobile)
className="bg-blue-500 active:bg-blue-600"
```

### Supported Tailwind Features

- Background colours: `bg-*`
- Text colours: `text-*`
- Padding: `p-*`, `px-*`, `py-*`
- Margin: `m-*`, `mx-*`, `my-*`
- Border radius: `rounded-*`
- Shadows: `shadow-*`
- Opacity: `opacity-*`
- Active states: `active:*`

### Not Supported

- Hover states: `hover:*` (no hover on touch devices)
- Focus states: `focus:*` (handled differently in React Native)
- Pseudo-elements: `::before`, `::after`

---

## Related Sections

- [../README.md](../README.md) - Mobile components overview
- [../../../web/components/Button/README.md](../../../web/components/Button/README.md) - Web Button
- [../../../tokens/README.md](../../../tokens/README.md) - Design tokens
- [../../../utils/README.md](../../../utils/README.md) - Style utilities

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
