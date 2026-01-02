---
description: Create a new design token file
argument-hint: <tokenName>
---

Create a new shared design token file.

**Creates:**

- `src/tokens/$ARGUMENTS.ts` - Token definitions

**Token Types:**

- `colours.ts` - Brand colour palette

- `spacing.ts` - Spacing scale (4, 8, 12, 16, etc.)

- `typography.ts` - Font sizes, weights, line heights

- `breakpoints.ts` - Responsive breakpoints

- `shadows.ts` - Shadow definitions

- `borders.ts` - Border radii, widths

**Remember to:**

1. Export from `src/tokens/index.ts`

2. Add to main exports in `src/index.ts`

$ARGUMENTS
