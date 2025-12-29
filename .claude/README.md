# .claude/

**Last Updated**: 29/12/2024
**Version**: 0.1.0
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [.claude/](#claude)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Directory Tree](#directory-tree)
  - [Files](#files)
  - [CLAUDE.md](#claudemd)
    - [Project Overview](#project-overview)
    - [Available Commands](#available-commands)
    - [Architecture](#architecture)
    - [Import Patterns](#import-patterns)
    - [Platform Differences](#platform-differences)
    - [Commit Convention](#commit-convention)
    - [PR Workflow](#pr-workflow)
    - [Dev Team Agents](#dev-team-agents)
    - [Recommended Workflow](#recommended-workflow)
  - [Commands](#commands)
    - [Using Claude Code](#using-claude-code)
  - [Metrics System](#metrics-system)
  - [Project Guidelines](#project-guidelines)
  - [Related Sections](#related-sections)

---

## Overview

The `.claude/` folder contains Claude Code configuration files and self-learning metrics for the @template/ui project. This configuration helps Claude understand the project structure, conventions, and provides guidance for development tasks.

---

## Directory Tree

```
.claude/
├── README.md              # This file
└── CLAUDE.md              # Main project configuration file
```

---

## Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project guidance and configuration for Claude Code |

---

## CLAUDE.md

The `CLAUDE.md` file provides essential information about the project:

### Project Overview

Defines what the project is:
- Name: @template/ui
- Type: Shared UI component library
- Platforms: React Web and React Native
- Tech stack: TypeScript, Tailwind CSS 4, Nativewind 4

### Available Commands

Lists all npm scripts available for development:

```bash
npm run build              # Build library outputs to dist/
npm run dev                # Watch mode for development
npm run storybook:web      # Run Storybook for web components
npm run type-check         # TypeScript type checking
npm run lint               # ESLint code quality checks
npm run lint:fix           # Auto-fix ESLint issues
npm run test               # Run Vitest test suite
npm run test:coverage      # Generate coverage report
```

### Architecture

Explains the project structure:

- **Entry Point** - `src/index.ts` re-exports all components and tokens
- **Component Structure** - Web components in `src/web/components/`, mobile in `src/mobile/components/`
- **Design Tokens** - Shared tokens in `src/tokens/`
- **Build System** - tsup for bundling CJS and ESM formats
- **Styling** - Tailwind CSS 4 with Nativewind for mobile

### Import Patterns

Shows how to import components:

```typescript
// Web components (default exports)
import { Button } from '@template/ui';

// Mobile components (namespaced)
import { Mobile } from '@template/ui';
<Mobile.Button ... />
```

### Platform Differences

Documents differences between web and mobile implementations:

| Aspect | Web | Mobile |
|--------|-----|--------|
| Click handler | `onClick` | `onPress` |
| Button element | `<button>` | `<Pressable>` |
| Text wrapper | Not needed | Required `<Text>` |
| Hover states | `hover:` | Not supported |

### Commit Convention

References [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

Body explaining what and why

Files Changed:
- src/web/components/Button.tsx

Still to do:
- Future improvements
```

**Types:** feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert

### PR Workflow

Defines the branch structure and approval workflow:

```
feature/your-feature → testing → dev → staging → main
```

PR title format: `user-story-number/your-feature-name`

### Dev Team Agents

Lists available specialized agents for tasks:

- `/syntek-dev-suite:review` - Code review
- `/syntek-dev-suite:test-writer` - Generate tests
- `/syntek-dev-suite:frontend` - UI/UX and accessibility
- `/syntek-dev-suite:qa-tester` - Find bugs and edge cases
- And many more...

### Recommended Workflow

1. **Planning** - Use `/syntek-dev-suite:plan`
2. **Implementation** - Write code
3. **Syntax Check** - Use `/syntek-dev-suite:syntax`
4. **Testing** - Use `/syntek-dev-suite:test-writer`
5. **QA** - Use `/syntek-dev-suite:qa-tester`
6. **Review** - Use `/syntek-dev-suite:review`
7. **Accessibility** - Use `/syntek-dev-suite:frontend`
8. **Refactor** - Use `/syntek-dev-suite:refactor`
9. **Documentation** - Use `/syntek-dev-suite:docs`

---

## Commands

### Using Claude Code

When working with Claude Code in this project, you can invoke the available agents:

```bash
# For code reviews
/syntek-dev-suite:review

# For test generation
/syntek-dev-suite:test-writer

# For UI/UX and accessibility
/syntek-dev-suite:frontend

# For documentation
/syntek-dev-suite:docs
```

See CLAUDE.md for the complete list of available agents and their purposes.

---

## Metrics System

The project includes a self-learning metrics system for tracking Claude's performance and optimisations:

**Location:** `docs/METRICS/`

**Contents:**
- `config.json` - Metrics configuration
- `runs/` - Recorded agent runs and performance data
- `feedback/` - User feedback on agent outputs
- `optimisations/` - Applied optimisations and learnings
- `aggregates/` - Aggregated performance statistics
- `templates/` - Prompt templates for common tasks
- `variants/` - A/B test variants for prompt optimisation

This system helps improve the development workflow by:
1. Recording what works well
2. Identifying common patterns
3. Optimising prompts for better results
4. Learning from user feedback

---

## Project Guidelines

When working on this project:

1. **Read CLAUDE.md first** - It contains essential project information
2. **Follow commit conventions** - Use Conventional Commits format
3. **Use the recommended workflow** - Leverage available agents
4. **Document your work** - Add comments and documentation
5. **Test thoroughly** - Use Vitest for unit tests
6. **Check accessibility** - Ensure WCAG compliance
7. **Build before committing** - Ensure no build errors

---

## Related Sections

- [CLAUDE.md](CLAUDE.md) - Full project configuration
- [../README.md](../README.md) - Main project README
- [../src/](../src/) - Source code
- [../docs/](../docs/) - Project documentation

---

**Last Updated:** 22 December 2025
