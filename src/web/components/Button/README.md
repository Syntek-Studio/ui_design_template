# Button (Web)

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
- [Variants](#variants)
- [Sizes](#sizes)
- [Border Radius](#border-radius)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Related Sections](#related-sections)

---

## Overview

The Button component is a versatile, accessible web button built with React and Tailwind CSS 4. It supports:

- **9 visual variants**: primary, secondary, tertiary, outline, ghost, link, destructive, success, warning
- **5 sizes**: xs, sm, md, lg, xl
- **9 border radius options**: none, sm, base, md, lg, xl, 2xl, 3xl, full
- **Loading states**: With spinner and disabled interaction
- **Icons**: Left, right, or icon-only configurations
- **Full accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support

---

## Directory Tree

```
src/web/components/Button/
├── README.md                # This file
├── Button.tsx               # Component implementation
├── Button.stories.tsx       # Storybook stories
└── index.ts                 # Re-export
```

---

## Props Interface

| Prop            | Type                              | Default     | Description                                 |
| --------------- | --------------------------------- | ----------- | ------------------------------------------- |
| `children`      | `React.ReactNode`                 | -           | Button content                              |
| `onClick`       | `() => void`                      | -           | Click handler                               |
| `variant`       | `ButtonVariant`                   | `'primary'` | Visual style variant                        |
| `size`          | `ButtonSize`                      | `'md'`      | Button size                                 |
| `rounded`       | `ButtonRounded`                   | `'md'`      | Border radius                               |
| `disabled`      | `boolean`                         | `false`     | Disable interaction                         |
| `loading`       | `boolean`                         | `false`     | Show loading spinner                        |
| `fullWidth`     | `boolean`                         | `false`     | Full container width                        |
| `iconLeft`      | `React.ReactNode`                 | -           | Icon before text                            |
| `iconRight`     | `React.ReactNode`                 | -           | Icon after text                             |
| `iconOnly`      | `boolean`                         | `false`     | Icon-only button (requires aria-label)      |
| `className`     | `string`                          | -           | Additional Tailwind classes                 |
| `type`          | `'button' \| 'submit' \| 'reset'` | `'button'`  | HTML button type                            |
| `aria-label`    | `string`                          | -           | Accessibility label (required for iconOnly) |
| `aria-pressed`  | `boolean`                         | -           | Toggle button state                         |
| `aria-expanded` | `boolean`                         | -           | Expandable element state                    |
| `aria-haspopup` | `boolean \| 'menu' \| 'dialog'`   | -           | Popup indicator                             |
| `aria-busy`     | `boolean`                         | -           | Loading state for screen readers            |

---

## Variants

| Variant       | Use Case               | Colour Scheme                     |
| ------------- | ---------------------- | --------------------------------- |
| `primary`     | Main call-to-action    | Blue background, white text       |
| `secondary`   | Alternative actions    | Grey background, dark text        |
| `tertiary`    | Subtle emphasis        | Light grey, dark text             |
| `outline`     | Bordered button        | Transparent with border           |
| `ghost`       | Minimal styling        | Transparent, coloured text        |
| `link`        | Text link style        | No background, underline on hover |
| `destructive` | Delete/remove actions  | Red background, white text        |
| `success`     | Positive confirmations | Green background, white text      |
| `warning`     | Cautionary actions     | Amber background, dark text       |

---

## Sizes

| Size | Padding     | Font Size | Min Height |
| ---- | ----------- | --------- | ---------- |
| `xs` | px-2 py-1   | text-xs   | 24px       |
| `sm` | px-3 py-1.5 | text-sm   | 32px       |
| `md` | px-4 py-2   | text-base | 40px       |
| `lg` | px-5 py-2.5 | text-lg   | 48px       |
| `xl` | px-6 py-3   | text-xl   | 56px       |

---

## Border Radius

| Rounded | Tailwind Class | Pixels |
| ------- | -------------- | ------ |
| `none`  | rounded-none   | 0px    |
| `sm`    | rounded-sm     | 2px    |
| `base`  | rounded        | 4px    |
| `md`    | rounded-md     | 6px    |
| `lg`    | rounded-lg     | 8px    |
| `xl`    | rounded-xl     | 12px   |
| `2xl`   | rounded-2xl    | 16px   |
| `3xl`   | rounded-3xl    | 24px   |
| `full`  | rounded-full   | 9999px |

---

## Accessibility

### WCAG 2.1 AA Compliance

- **Colour Contrast**: All variants meet 4.5:1 minimum contrast ratio
- **Focus Visible**: Clear focus ring on keyboard navigation
- **Keyboard Support**: Enter and Space keys trigger click
- **Screen Reader**: Proper button role and state announcements

### Required ARIA Attributes

```typescript
// Icon-only button - REQUIRES aria-label
<Button iconOnly aria-label="Close modal">
  <CloseIcon />
</Button>

// Toggle button
<Button aria-pressed={isActive} onClick={toggle}>
  Toggle Feature
</Button>

// Expandable trigger
<Button aria-expanded={isOpen} aria-haspopup="menu">
  Open Menu
</Button>

// Loading state
<Button loading aria-busy={true}>
  Submitting...
</Button>
```

### Focus Management

- Tab navigation moves to/from button
- Enter/Space activates button
- Disabled buttons are not focusable
- Loading buttons maintain focus but ignore input

---

## Usage Examples

### Basic Usage

```typescript
import { Button } from '@syntek-studio/ui'

<Button onClick={() => console.log('Clicked!')}>
  Click me
</Button>
```

### Variants

```typescript
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="success">Confirm</Button>
```

### With Icons

```typescript
import { ArrowRight, Plus } from 'lucide-react'

<Button iconLeft={<Plus />}>Add Item</Button>
<Button iconRight={<ArrowRight />}>Continue</Button>
<Button iconOnly aria-label="Add item"><Plus /></Button>
```

### Loading State

```typescript
<Button loading disabled>
  Submitting...
</Button>
```

### Form Submit

```typescript
<Button type="submit" variant="primary">
  Submit Form
</Button>
```

### Full Width

```typescript
<Button fullWidth variant="primary">
  Full Width Button
</Button>
```

---

## Related Sections

- [../README.md](../README.md) - Web components overview
- [../../../mobile/components/Button/README.md](../../../mobile/components/Button/README.md) - Mobile Button
- [../../../tokens/README.md](../../../tokens/README.md) - Design tokens
- [../../../utils/README.md](../../../utils/README.md) - Style utilities

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
