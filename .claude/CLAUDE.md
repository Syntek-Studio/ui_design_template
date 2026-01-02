# CLAUDE.md

**Last Updated**: 02/01/2026
**Version**: 0.7.1
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Table of Contents

- [CLAUDE.md](#claudemd)
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
  - [Commit Convention](#commit-convention)
  - [PR Workflow](#pr-workflow)
  - [Dev Team Agents](#dev-team-agents)
    - [Recommended Workflow](#recommended-workflow)

## Project Overview

This is @template/ui, a shared UI component library for React Web and React Native applications. Built with TypeScript,
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
import { Button } from '@template/ui';

// Mobile components (namespaced)
import { Mobile } from '@template/ui';
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
