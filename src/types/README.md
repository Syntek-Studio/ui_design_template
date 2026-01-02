# src/types/

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
- [Type Declarations](#type-declarations)
  - [CSS Module Declarations](#css-module-declarations)
  - [CSS Side-Effect Imports](#css-side-effect-imports)
- [Usage Guide](#usage-guide)
  - [CSS Modules (Scoped Styles)](#css-modules-scoped-styles)
  - [Global CSS](#global-css)
  - [Benefits](#benefits)
- [TypeScript Configuration](#typescript-configuration)
- [Related Sections](#related-sections)

---

## Overview

The `src/types/` directory contains TypeScript type declarations and module augmentations for the component library. These declarations provide type safety when importing CSS files and CSS modules throughout the codebase.

---

## Directory Tree

```
src/types/
├── README.md                          # This file
└── css.d.ts                           # CSS and CSS module type declarations
```

---

## Files

| File       | Purpose                                                        |
| ---------- | -------------------------------------------------------------- |
| `css.d.ts` | TypeScript module declarations for CSS imports and CSS modules |

---

## Type Declarations

### CSS Module Declarations

```typescript
declare module '*.module.css' {
  const classes: { [className: string]: string }
  export default classes
}
```

**Usage**:

```typescript
import styles from './Button.module.css'

<button className={styles.primary}>Click me</button>
```

### CSS Side-Effect Imports

```typescript
declare module '*.css'
```

**Usage**:

```typescript
import './tailwind.css'
import './global-styles.css'
```

---

## Usage Guide

### CSS Modules (Scoped Styles)

CSS modules export class names for type-safe usage:

```typescript
// Button.module.css
.primary { background: blue; }
.secondary { background: grey; }

// Button.tsx
import styles from './Button.module.css'

export const Button = ({ variant = 'primary' }) => (
  <button className={styles[variant]}>Click</button>
)
```

### Global CSS

Global CSS applies styles without scoping:

```typescript
// index.ts
import './global.css' // Applied globally
```

### Benefits

- Type-safe class name access
- IDE autocompletion for class names
- Prevents typos in class names
- Scoped styles prevent naming collisions

---

## TypeScript Configuration

These declarations are included via `tsconfig.json`:

```json
{
  "include": ["src/**/*", "src/types/**/*.d.ts"]
}
```

---

## Related Sections

- [../README.md](../README.md) - Source directory overview
- [../web/README.md](../web/README.md) - Web components
- [../mobile/README.md](../mobile/README.md) - Mobile components
- [../../tsconfig.json](../../tsconfig.json) - TypeScript configuration

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
