# CLAUDE.md

**Last Updated**: 02/01/2026
**Version**: 0.9.0
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Project Overview](#project-overview)
- [Commands](#commands)
- [Architecture](#architecture)
  - [Entry Point \& Exports](#entry-point--exports)
  - [Component Structure](#component-structure)
  - [Import Patterns](#import-patterns)
  - [Platform Differences](#platform-differences)
  - [Styling](#styling)
  - [Path Aliases](#path-aliases)
  - [Storybook](#storybook)
- [Documentation Standards](#documentation-standards)
  - [File Documentation Requirements](#file-documentation-requirements)
    - [1. File Overview Header](#1-file-overview-header)
    - [2. Component/Function Documentation](#2-componentfunction-documentation)
    - [3. Inline Comments for Complex Logic](#3-inline-comments-for-complex-logic)
    - [4. Type Definitions](#4-type-definitions)
  - [Folder README Requirements](#folder-readme-requirements)
    - [Required Contents](#required-contents)
    - [Example Folder README Template](#example-folder-readme-template)
  - [Mobile](#mobile)
- [Accessibility Considerations](#accessibility-considerations)
- [Related Components](#related-components)
  - [Documentation Style Guide](#documentation-style-guide)
    - [Language and Spelling](#language-and-spelling)
    - [JSDoc Formatting](#jsdoc-formatting)
    - [Accessibility Documentation](#accessibility-documentation)
    - [Platform-Specific Notes](#platform-specific-notes)
    - [Version History](#version-history)
- [Commit Convention](#commit-convention)
- [PR Workflow](#pr-workflow)
- [Project Management](#project-management)
  - [ClickUp Status Flow](#clickup-status-flow)
- [Dev Team Agents](#dev-team-agents)
  - [Recommended Workflow](#recommended-workflow)

## Project Overview

This is @syntek-studio/ui, a shared UI component library for React Web and React Native applications. Built with TypeScript,
Tailwind CSS 4, and Nativewind 4.

## Commands

```bash

# Build the library (outputs to dist/)

npm run build

# Watch mode for development

npm run dev

# Run Storybook for web components

npm run storybook:web

# Type checking

npm run type-check

# Linting

npm run lint
npm run lint:fix
```

## Architecture

### Entry Point & Exports

- [src/index.ts](src/index.ts) - Main entry point that re-exports all components

- Build outputs CJS and ESM formats via tsup to `dist/`

### Component Structure

**Web Components** live in `src/web/components/`:

```markdown
src/web/components/
└── ComponentName/
├── ComponentName.tsx # Component implementation
├── ComponentName.stories.tsx # Storybook stories
└── index.ts # Re-exports
```

**Mobile Components**live in `src/mobile/components/`:

```markdown
src/mobile/components/
└── ComponentName/
├── ComponentName.native.tsx # React Native + Nativewind implementation
├── ComponentName.stories.native.tsx # Storybook stories
└── index.ts # Re-exports
```

> **Note:** Mobile files use the `.native.tsx` extension for clarity, indicating they are React Native specific.

### Import Patterns

```typescript
// Web components (default exports)
import { Button } from '@syntek-studio/ui';

// Mobile components (namespaced)
import { Mobile } from '@syntek-studio/ui';
<Mobile.Button title="Click me" onPress={() => {}} />
```

### Platform Differences

| Aspect         | Web        | Mobile            |
| -------------- | ---------- | ----------------- |
| Click handler  | `onClick`  | `onPress`         |
| Button element | `<button>` | `<Pressable>`     |
| Hover states   | `hover:`   | Not supported     |
| Active states  | `:active`  | `active:`         |
| Text wrapper   | Not needed | Required `<Text>` |

### Styling

- Uses Tailwind CSS 4 with Nativewind for React Native compatibility

- Tailwind classes applied directly via `className` prop

- PostCSS config at `postcss.config.mjs`

### Path Aliases

- `@/*` maps to `./src/*` (configured in tsconfig.json and Storybook webpack)

### Storybook

- Web Storybook config: `.storybook-web/`

- Uses react-webpack5 with Babel for TypeScript

- Stories auto-discovered from `src/**/*.stories.tsx`

## Documentation Standards

All code and directories in this project must be thoroughly documented to ensure maintainability and ease of onboarding for new developers.

### File Documentation Requirements

Every source file (`.ts`, `.tsx`, `.native.tsx`) must include:

#### 1. File Overview Header

All source files must begin with a `@fileoverview` JSDoc comment:

```typescript
/**
 * @fileoverview Button component for web applications with accessible design.
 * @module components/Button
 * @see {@link ../mobile/components/Button/Button.native.tsx} for mobile implementation
 */
```

#### 2. Component/Function Documentation

All exported components, functions, and hooks must have JSDoc comments including:

- **@param** - Parameter descriptions with types
- **@returns** - Return value description
- **@example** - Usage examples
- **@throws** - Any exceptions that may be thrown
- **@see** - Links to related files or components

**Example Component Documentation:**

````typescript
/**
 * Button component that provides consistent styling and behaviour across the application.
 *
 * @param {ButtonProps} props - The component props
 * @param {string} props.children - Button label text
 * @param {() => void} props.onClick - Click handler function
 * @param {'primary' | 'secondary' | 'danger'} props.variant - Visual style variant
 * @param {boolean} props.disabled - Whether the button is disabled
 *
 * @returns {JSX.Element} Rendered button component
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={() => console.log('Clicked')}>
 *   Click Me
 * </Button>
 * ```
 *
 * @see {@link ./Button.native.tsx} for React Native implementation
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  // Implementation
}
````

**Example Function Documentation:**

````typescript
/**
 * Formats a colour value to ensure consistent hex format.
 *
 * @param {string} colour - Colour value in hex, rgb, or named format
 * @returns {string} Normalised hex colour value (e.g., '#FF5733')
 * @throws {Error} If colour format is invalid
 *
 * @example
 * ```typescript
 * formatColour('red') // '#FF0000'
 * formatColour('rgb(255, 0, 0)') // '#FF0000'
 * ```
 */
export function formatColour(colour: string): string {
  // Implementation
}
````

#### 3. Inline Comments for Complex Logic

Use inline comments to explain:

- Non-obvious implementation details
- Performance optimisations
- Workarounds for platform-specific issues
- Complex calculations or algorithms

```typescript
// Using useCallback to prevent unnecessary re-renders of child components
// This is particularly important for list items that receive this handler
const handlePress = useCallback(() => {
  // Implementation
}, [dependencies])

// Workaround for React Native Android shadow rendering issue
// See: https://github.com/facebook/react-native/issues/xxxxx
const shadowStyle = Platform.OS === 'android' ? { elevation: 4 } : { shadowOpacity: 0.3 }
```

#### 4. Type Definitions

All TypeScript interfaces and types must be documented:

```typescript
/**
 * Props for the Button component.
 *
 * @interface ButtonProps
 */
export interface ButtonProps {
  /** Button label text or child elements */
  children: React.ReactNode

  /** Click handler invoked when button is pressed */
  onClick?: () => void

  /** Visual style variant affecting colours and appearance */
  variant?: 'primary' | 'secondary' | 'danger'

  /** Disables interaction and applies disabled styling */
  disabled?: boolean

  /** Additional CSS classes for custom styling */
  className?: string

  /**
   * Accessibility label for screen readers.
   * If not provided, children text content will be used.
   */
  accessibilityLabel?: string
}
```

### Folder README Requirements

**Every directory must contain a `README.md` file** that serves as documentation for that section of the codebase.

#### Required Contents

Each folder `README.md` must include:

1. **Purpose** - Clear explanation of what this folder contains
2. **File Listing** - Table describing key files and their responsibilities
3. **Usage Examples** - How to import and use code from this folder (where applicable)
4. **Related Folders** - Links to related sections of the codebase

#### Example Folder README Template

````markdown
# Component Name

## Purpose

This folder contains the [ComponentName] component, which provides [brief description of functionality].

## Files

| File                        | Purpose                                         |
| --------------------------- | ----------------------------------------------- |
| `ComponentName.tsx`         | Web implementation using React and Tailwind CSS |
| `ComponentName.native.tsx`  | React Native implementation using Nativewind    |
| `ComponentName.stories.tsx` | Storybook stories demonstrating component usage |
| `ComponentName.test.tsx`    | Unit tests for component behaviour              |
| `index.ts`                  | Public exports for the component                |
| `types.ts`                  | TypeScript type definitions and interfaces      |

## Usage

### Web

```tsx
import { ComponentName } from '@syntek-studio/ui'
;<ComponentName prop1="value" prop2={123} />
```
````

### Mobile

```tsx
import { Mobile } from '@syntek-studio/ui'
;<Mobile.ComponentName prop1="value" prop2={123} />
```

## Accessibility Considerations

- This component supports keyboard navigation via [describe approach]
- Screen reader announcements are provided for [describe what]
- Colour contrast ratios meet WCAG AA standards

## Related Components

- [../OtherComponent/](../OtherComponent/) - Related component that [description]
- [../../hooks/useComponentHook/](../../hooks/useComponentHook/) - Custom hook used by this component

````

#### Directory Structure READMEs

For directories containing multiple components or modules (e.g., `src/web/components/`, `src/mobile/components/`):

```markdown
# Web Components

## Purpose

This directory contains all React web components built with Tailwind CSS 4.

## Structure

Each component follows this pattern:

````

ComponentName/
├── ComponentName.tsx # Component implementation
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.test.tsx # Unit tests
├── index.ts # Exports
└── README.md # Component documentation

```

## Available Components

| Component | Purpose | Status |
|-----------|---------|--------|
| [Button](./Button/) | Clickable button with variants | ✅ Stable |
| [Input](./Input/) | Text input field | ✅ Stable |
| [Modal](./Modal/) | Accessible modal dialogue | 🚧 In Progress |

## Adding New Components

1. Create folder with component name in PascalCase
2. Implement component following [architecture guidelines](../../../.claude/CLAUDE.md#component-structure)
3. Add Storybook stories for all variants
4. Write unit tests achieving >80% coverage
5. Create component README.md
6. Export from `index.ts`
7. Update this README's component table
```

### Documentation Style Guide

#### Language and Spelling

- **Use British English** throughout all documentation (colour, behaviour, optimise, honour, etc.)
- Maintain consistency with project-wide `en_GB` locale setting

#### JSDoc Formatting

- Use proper JSDoc tags (`@param`, `@returns`, `@example`, `@see`, `@throws`)
- Include type information even though TypeScript provides types (for JSDoc consumers)
- Wrap code examples in triple backticks with language identifier
- Use `{@link}` syntax for cross-references to other files or documentation

```typescript
/**
 * @see {@link ./utils/formatters.ts} for related formatting functions
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API} for Fetch API documentation
 */
```

#### Accessibility Documentation

Components must document accessibility features including:

- **Keyboard Navigation** - Supported keyboard shortcuts and tab order
- **Screen Reader Support** - ARIA labels, roles, and live regions
- **Colour Contrast** - Confirmation of WCAG compliance
- **Focus Management** - How focus is handled in interactive components

Example accessibility documentation in component README:

```markdown
## Accessibility

### Keyboard Support

- `Enter` / `Space` - Activates the button
- `Tab` - Moves focus to the button
- `Shift + Tab` - Moves focus away from the button

### Screen Reader

- Announces button label from `children` or `accessibilityLabel` prop
- Communicates disabled state when `disabled={true}`
- Role is properly set to `button`

### Visual

- Colour contrast ratio: 4.5:1 (WCAG AA compliant)
- Focus indicator: 2px solid outline with 2px offset
- Disabled state: 50% opacity with cursor change
```

#### Platform-Specific Notes

When documenting code that differs between web and mobile:

- Clearly indicate which platform the documentation applies to
- Link to the counterpart implementation
- Explain any platform-specific workarounds

```typescript
/**
 * @fileoverview Button component for React Native applications.
 *
 * Platform differences from web implementation:
 * - Uses Pressable instead of button element
 * - Hover states not supported on mobile
 * - Active states use 'active:' prefix for Nativewind
 * - Text content must be wrapped in <Text> component
 *
 * @see {@link ../web/components/Button/Button.tsx} for web implementation
 */
```

#### Version History

For significant components or utilities, maintain a version history in the README:

```markdown
## Version History

| Version | Date       | Changes                                 |
| ------- | ---------- | --------------------------------------- |
| 1.2.0   | 2026-01-02 | Added loading state and spinner variant |
| 1.1.0   | 2025-12-15 | Added accessibility improvements        |
| 1.0.0   | 2025-12-01 | Initial release                         |
```

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
type(scope): Description

Body - What did you do?

Files Changed:

- list files

Still to do:

- remaining work
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

## PR Workflow

Branch structure: `user-story-number/your-feature-name` → `testing` → `dev` → `staging` → `main`

PR title format: `user-story-number/your-feature-name` (e.g., `US-123/add-loading-button-state`)

## Project Management

- **Tool:**ClickUp

-**Integration:**Bidirectional sync with GitHub

-**Branch Pattern:**`us###/description` (e.g., `us001/add-button-component`)

-**Auto-sync:**Enabled via GitHub Actions (`.github/workflows/clickup-sync.yml`)

-**Documentation:** See `docs/PM-INTEGRATION/` for setup and usage

### ClickUp Status Flow

| Branch/PR Event                 | ClickUp Status    |
| ------------------------------- | ----------------- |
| Branch `us###/*` pushed         | In Progress       |
| PR opened to `testing` or `dev` | In Review         |
| PR merged to `staging`          | Accepted          |
| PR merged to `main`             | Accepted Customer |

GitHub Secrets are configured for automatic workflow execution. Local `.env` file only needed for manual script
execution.

## Dev Team Agents

Use these agents for specialized tasks:

| Command                         | Purpose                                          |
| ------------------------------- | ------------------------------------------------ |
| `/syntek-dev-suite:review`      | Code review for security, performance, and style |
| `/syntek-dev-suite:test-writer` | Generate tests for components                    |
| `/syntek-dev-suite:frontend`    | UI/UX and accessibility review                   |
| `/syntek-dev-suite:qa-tester`   | Find bugs, security flaws, edge cases            |
| `/syntek-dev-suite:docs`        | Write documentation and docstrings               |
| `/syntek-dev-suite:refactor`    | Refactor without changing logic                  |
| `/syntek-dev-suite:plan`        | Create architectural plans                       |
| `/syntek-dev-suite:syntax`      | Fix syntax and linting errors                    |

### Recommended Workflow

1. **Planning**: `/syntek-dev-suite:plan` - Design the component architecture

2. **Implementation**: Write the component code

3. **Syntax Check**: `/syntek-dev-suite:syntax` - Fix any syntax/linting errors

4. **Testing**: `/syntek-dev-suite:test-writer` - Generate test cases

5. **QA**: `/syntek-dev-suite:qa-tester` - Find bugs and edge cases

6. **Review**: `/syntek-dev-suite:review` - Security and code quality check

7. **Accessibility**: `/syntek-dev-suite:frontend` - UI/UX and a11y review

8. **Refactor**: `/syntek-dev-suite:refactor` - Clean up code if needed

9. **Documentation**: `/syntek-dev-suite:docs` - Add documentation
