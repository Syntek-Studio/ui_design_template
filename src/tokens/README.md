# src/tokens/

**Last Updated**: 29/12/2024
**Version**: 0.5.1
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [src/tokens/](#srctokens)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Directory Tree](#directory-tree)
  - [Files](#files)
  - [Token System](#token-system)
    - [Colours (`colours.ts`)](#colours-coloursts)
    - [Spacing (`spacing.ts`)](#spacing-spacingts)
    - [Typography (`typography.ts`)](#typography-typographyts)
    - [Breakpoints (`breakpoints.ts`)](#breakpoints-breakpointsts)
    - [Shadows (`shadows.ts`)](#shadows-shadowsts)
    - [Borders (`borders.ts`)](#borders-bordersts)
  - [Usage Guide](#usage-guide)
    - [Importing Tokens](#importing-tokens)
    - [Using Tokens in Components](#using-tokens-in-components)
    - [Type Safety](#type-safety)
  - [Design System](#design-system)
    - [Colour Palette Strategy](#colour-palette-strategy)
    - [Spacing Scale](#spacing-scale)
    - [Typography Hierarchy](#typography-hierarchy)
    - [Responsive Design](#responsive-design)
    - [Elevation System](#elevation-system)
  - [Extending Tokens](#extending-tokens)
  - [Best Practices](#best-practices)
  - [Related Sections](#related-sections)

---

## Overview

The `src/tokens/` folder contains the design system's central token definitions. These tokens define colours, spacing, typography, breakpoints, shadows, and borders used across all components in both web and mobile platforms.

Tokens are JavaScript constants that serve as a single source of truth for design decisions, ensuring consistency across the entire library.

---

## Directory Tree

```
src/tokens/
├── README.md              # This file
├── index.ts               # Main export file
├── colours.ts             # Colour palette tokens
├── spacing.ts             # Spacing scale tokens
├── typography.ts          # Typography scale tokens
├── breakpoints.ts         # Responsive breakpoint tokens
├── shadows.ts             # Shadow definition tokens
└── borders.ts             # Border radius and width tokens
```

---

## Files

| File | Purpose |
|------|---------|
| `colours.ts` | Colour palette with primary, secondary, semantic, and neutral colours |
| `spacing.ts` | Spacing scale based on 4px grid system (0px to 384px) |
| `typography.ts` | Font families, font sizes, and font weights |
| `breakpoints.ts` | Responsive breakpoints for mobile-first design |
| `shadows.ts` | Shadow definitions for elevation and depth |
| `borders.ts` | Border radius and width values |
| `index.ts` | Central export file for all tokens |

---

## Token System

### Colours (`colours.ts`)

The colour palette includes brand, semantic, and neutral colours.

```typescript
import { colours } from '@template/ui';

// Brand colours with shade variations
colours.primary;      // {50, 100, 200, ..., 900} - Blue shades
colours.secondary;    // {50, 100, 200, ..., 900} - Purple shades

// Semantic colours for status and intent
colours.success;      // #22c55e - Green
colours.warning;      // #f59e0b - Amber
colours.error;        // #ef4444 - Red
colours.info;         // #3b82f6 - Blue

// Neutral colours
colours.white;        // #ffffff
colours.black;        // #000000
colours.grey;         // {50, 100, 200, ..., 900} - Grey shades
```

**Example Usage:**
```typescript
const bgColor = colours.primary[500];     // #3b82f6
const textColor = colours.white;          // #ffffff
const borderColor = colours.grey[200];    // #e5e7eb
const errorColor = colours.error;         // #ef4444
```

### Spacing (`spacing.ts`)

4px-based spacing scale for consistent layout rhythm.

```typescript
import { spacing } from '@template/ui';

spacing[0];     // 0px
spacing[1];     // 4px
spacing[2];     // 8px
spacing[3];     // 12px
spacing[4];     // 16px
spacing[6];     // 24px
spacing[8];     // 32px
spacing[96];    // 384px
```

**Mapping:**
- `spacing[0]` = 0px
- `spacing[px]` = 1px
- `spacing[0.5]` = 2px
- `spacing[1]` = 4px (base unit)
- `spacing[2]` = 8px (2x)
- `spacing[4]` = 16px (4x)
- `spacing[6]` = 24px (6x)
- And so on...

**Example Usage:**
```typescript
const padding = spacing[4];     // 16px
const margin = spacing[6];      // 24px
const gap = spacing[3];         // 12px
```

### Typography (`typography.ts`)

Font families, sizes, and weights for consistent text styling.

```typescript
import { typography } from '@template/ui';

// Font families
typography.fontFamily.sans;   // Inter, system-ui, sans-serif
typography.fontFamily.serif;  // Georgia, serif
typography.fontFamily.mono;   // Fira Code, monospace

// Font sizes (size and lineHeight)
typography.fontSize.xs;       // { size: 12, lineHeight: 16 }
typography.fontSize.sm;       // { size: 14, lineHeight: 20 }
typography.fontSize.base;     // { size: 16, lineHeight: 24 }
typography.fontSize.lg;       // { size: 18, lineHeight: 28 }
typography.fontSize.xl;       // { size: 20, lineHeight: 28 }
typography.fontSize['2xl'];   // { size: 24, lineHeight: 32 }
typography.fontSize['3xl'];   // { size: 30, lineHeight: 36 }
typography.fontSize['4xl'];   // { size: 36, lineHeight: 40 }
typography.fontSize['5xl'];   // { size: 48, lineHeight: 1 }
typography.fontSize['6xl'];   // { size: 60, lineHeight: 1 }

// Font weights
typography.fontWeight.thin;       // 100
typography.fontWeight.light;      // 300
typography.fontWeight.normal;     // 400
typography.fontWeight.medium;     // 500
typography.fontWeight.semibold;   // 600
typography.fontWeight.bold;       // 700
typography.fontWeight.black;      // 900
```

**Example Usage:**
```typescript
const headingSize = typography.fontSize['2xl'];  // { size: 24, lineHeight: 32 }
const bodySize = typography.fontSize.base;      // { size: 16, lineHeight: 24 }
const boldWeight = typography.fontWeight.bold;  // 700
```

### Breakpoints (`breakpoints.ts`)

Responsive design breakpoints for mobile-first approach.

```typescript
import { breakpoints } from '@template/ui';

breakpoints.xs;     // 0px (default/mobile)
breakpoints.sm;     // 640px
breakpoints.md;     // 768px
breakpoints.lg;     // 1024px
breakpoints.xl;     // 1280px
breakpoints['2xl']; // 1536px
```

**Usage in Media Queries:**
```typescript
const isMobile = windowWidth < breakpoints.sm;
const isTablet = windowWidth >= breakpoints.md && windowWidth < breakpoints.lg;
const isDesktop = windowWidth >= breakpoints.lg;
```

**Usage with Tailwind CSS:**
```typescript
className="px-4 sm:px-6 md:px-8 lg:px-12"  // Responsive padding
className="text-sm md:text-base lg:text-lg"  // Responsive font
```

### Shadows (`shadows.ts`)

Shadow definitions for elevation and visual hierarchy.

```typescript
import { shadows } from '@template/ui';

shadows.none;   // none - No shadow
shadows.sm;     // Small shadow (1px elevation)
shadows.base;   // Base shadow (2px elevation)
shadows.md;     // Medium shadow (4px elevation)
shadows.lg;     // Large shadow (10px elevation)
shadows.xl;     // Extra large shadow (20px elevation)
shadows['2xl']; // 2XL shadow (25px elevation)
shadows.inner;  // Inner shadow (inset)
```

**Example Usage:**
```typescript
const cardShadow = shadows.md;      // 0 4px 6px -1px rgb(0 0 0 / 0.1), ...
const floatShadow = shadows.lg;     // 0 10px 15px -3px rgb(0 0 0 / 0.1), ...
const subtleShadow = shadows.sm;    // 0 1px 2px 0 rgb(0 0 0 / 0.05)
```

### Borders (`borders.ts`)

Border radius and width definitions for consistent rounded corners and strokes.

```typescript
import { borders } from '@template/ui';

// Border radius
borders.radius.none;      // 0px
borders.radius.sm;        // 2px
borders.radius.base;      // 4px
borders.radius.md;        // 6px
borders.radius.lg;        // 8px
borders.radius.xl;        // 12px
borders.radius['2xl'];    // 16px
borders.radius['3xl'];    // 24px
borders.radius.full;      // 9999px (full circle)

// Border width
borders.width[0];         // 0px (no border)
borders.width[1];         // 1px (thin)
borders.width[2];         // 2px
borders.width[4];         // 4px
borders.width[8];         // 8px (thick)
```

**Example Usage:**
```typescript
const roundedButton = borders.radius.lg;      // 8px corners
const circleAvatar = borders.radius.full;     // Perfect circle
const thinBorder = borders.width[1];          // 1px border
```

---

## Usage Guide

### Importing Tokens

**All tokens at once:**
```typescript
import { colours, spacing, typography, breakpoints, shadows, borders } from '@template/ui';
```

**Individual tokens:**
```typescript
import { colours } from '@template/ui';
import { spacing } from '@template/ui';
import { typography } from '@template/ui';
```

### Using Tokens in Components

**Web Component Example:**
```typescript
import { colours, spacing, typography, shadows } from '@template/ui';

export const Card = ({ children }) => {
  const bgColor = colours.white;
  const padding = spacing[6];
  const shadowStyle = shadows.md;

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: `${padding}px`,
        boxShadow: shadowStyle,
      }}
    >
      {children}
    </div>
  );
};
```

**Mobile Component Example:**
```typescript
import { colours, spacing } from '@template/ui';
import { View, Text } from 'react-native';

export const Card = ({ children }) => {
  return (
    <View
      style={{
        backgroundColor: colours.white,
        padding: spacing[6],
      }}
      className="rounded-lg"
    >
      {children}
    </View>
  );
};
```

**With Tailwind CSS:**
```typescript
// Tailwind handles the token values through configuration
<div className="bg-white p-6 rounded-lg shadow-md">
  {children}
</div>
```

### Type Safety

All tokens are fully typed with TypeScript:

```typescript
import { colours, type Colours } from '@template/ui';

// Type-safe access
const primaryColor: string = colours.primary[500];
const colourType: Colours = colours;
```

---

## Design System

### Colour Palette Strategy

The colour system uses:

1. **Brand colours** - Primary and secondary with 9 shades (50-900)
2. **Semantic colours** - Success, warning, error, info for status
3. **Neutral colours** - White, black, grey for text and backgrounds

### Spacing Scale

Based on 4px grid system for mathematical consistency:

- Multiples of 4 (4, 8, 12, 16, 20, 24...)
- Enables precise pixel-perfect designs
- Consistent vertical and horizontal rhythm

### Typography Hierarchy

Predefined scales ensure readability:

- **Heading levels** - 2xl to 6xl for H1 to H6
- **Body text** - base and sm for paragraphs
- **UI text** - xs and sm for labels and captions
- **Font weights** - thin to black for emphasis

### Responsive Design

Mobile-first breakpoints:

- **xs (0px)** - Mobile default
- **sm (640px)** - Large phone
- **md (768px)** - Tablet
- **lg (1024px)** - Desktop
- **xl (1280px)** - Large desktop
- **2xl (1536px)** - Ultra-wide

### Elevation System

Shadows create depth:

- **none/sm** - Subtle, flat design
- **base/md** - Standard elevation
- **lg/xl** - Floating, prominent
- **2xl** - Modal/overlay elevation
- **inner** - Inset/depressed

---

## Extending Tokens

To add new tokens:

1. Open the relevant file (e.g., `colours.ts`)
2. Add the new token to the exported object
3. Update the TypeScript type
4. Re-export from `index.ts`

**Example - Adding a new colour:**

```typescript
// In colours.ts
export const colours = {
  // ... existing colours ...
  tertiary: {
    50: '#fef3c7',
    100: '#fde68a',
    // ... continue shade pattern ...
  },
} as const;

export type Colours = typeof colours;
```

---

## Best Practices

1. **Always use tokens** - Don't hardcode colours or spacing values
2. **Consistent naming** - Follow token naming conventions
3. **Single source of truth** - Maintain tokens here, not in component styles
4. **Type safety** - Leverage TypeScript types for safety
5. **Documentation** - Document new tokens with comments
6. **Version control** - Track token changes in git history

---

## Related Sections

- [../web/components/](../web/components/) - Web components using tokens
- [../mobile/components/](../mobile/components/) - Mobile components using tokens
- [../../docs/TOKENS.md](../../docs/TOKENS.md) - Token documentation
- [../../README.md](../../README.md) - Main project README

---

**Last Updated:** 22 December 2025
