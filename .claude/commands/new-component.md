---
description: Create a new component (web and/or mobile)
argument-hint: <ComponentName> [web|mobile|both]
---

Create a new component following the project structure.

Arguments:

- $1: Component name (e.g., Card, Input, Modal)

- $2: Platform - "web", "mobile", or "both" (default: both)

## Component Structure

For web components, create in `src/web/components/$1/`:

- `$1.tsx` - Component implementation

- `$1.stories.tsx` - Storybook stories

- `index.ts` - Re-exports

For mobile components, create in `src/mobile/components/$1/`:

- `$1.native.tsx` - React Native + Nativewind implementation

- `$1.stories.native.tsx` - Storybook stories

- `index.ts` - Re-exports

## After Creation

1. Update `src/web/components/index.ts` and/or `src/mobile/components/index.ts`

2. Run `/build` to verify the component builds correctly

3. Consider running `/dev-team:review` for a code review
