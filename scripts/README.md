# scripts/

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
- [Files and Directories](#files-and-directories)
- [Available Scripts](#available-scripts)
  - [Template Initialisation](#template-initialisation)
  - [Environment Scripts](#environment-scripts)
  - [Project Management Scripts](#project-management-scripts)
- [Quick Reference](#quick-reference)
- [Development Workflow](#development-workflow)
  - [Local Development](#local-development)
  - [Before Committing](#before-committing)
  - [Preparing for Release](#preparing-for-release)
- [Related Documentation](#related-documentation)

---

## Overview

The `scripts/` directory contains build utilities, environment setup scripts, and project management tools for the @syntek-studio/ui component library. These scripts automate:

- **Template initialisation** - Convert the template into a project-specific instance
- **Environment management** - Development, testing, staging, and production builds
- **Project management** - ClickUp integration and task synchronisation
- **Automated tests** - Unit tests for all script modules

---

## Directory Tree

```
scripts/
├── README.md                   # This file
├── init-template.ts            # Template initialisation CLI entry point
├── __tests__/                  # Test files for scripts
│   ├── README.md               # Test suite documentation
│   ├── validators.test.ts      # Tests for input validators
│   ├── file-operations.test.ts # Tests for file I/O operations
│   ├── replacements.test.ts    # Tests for placeholder replacement logic
│   └── init-template.test.ts   # Tests for template initialisation
├── lib/                        # Library utilities for template initialisation
│   ├── README.md               # Library modules documentation
│   ├── validators.ts           # Input validation functions
│   ├── prompts.ts              # Interactive CLI prompts
│   ├── file-operations.ts      # File read/write utilities
│   └── replacements.ts         # Placeholder replacement logic
├── env/                        # Environment-specific build scripts
│   ├── README.md               # Environment scripts documentation
│   ├── dev.sh                  # Development environment setup
│   ├── test.sh                 # Run test suite
│   ├── staging.sh              # Build for staging environment
│   └── production.sh           # Production build with safety checks
└── pm/                         # Project management integration
    ├── README.md               # ClickUp integration documentation
    ├── clickup-import.sh       # Import user stories to ClickUp
    ├── sync-status.sh          # Sync task status with ClickUp
    └── clickup-sync-ids.sh     # Synchronise story IDs
```

---

## Files and Directories

| File/Folder        | Purpose                                          |
| ------------------ | ------------------------------------------------ |
| `init-template.ts` | Main CLI entry point for template initialisation |
| `lib/`             | Library utilities for template initialisation    |
| `env/`             | Environment setup and build scripts              |
| `pm/`              | Project management and ClickUp integration       |
| `__tests__/`       | Automated tests for scripts                      |

---

## Available Scripts

### Template Initialisation

```bash
node --loader tsx scripts/init-template.ts
```

Converts the template into a project-specific instance by:

1. Checking for existing initialisation
2. Collecting user inputs (client name, package name, description, brand colour)
3. Confirming inputs with user
4. Replacing placeholders throughout the project
5. Creating a configuration record
6. Verifying all replacements succeeded

### Environment Scripts

```bash
./scripts/env/dev.sh        # Start development environment
./scripts/env/test.sh       # Run test suite
./scripts/env/staging.sh    # Build for staging
./scripts/env/production.sh # Production build with confirmation
```

### Project Management Scripts

```bash
./scripts/pm/clickup-import.sh           # Import stories to ClickUp
./scripts/pm/sync-status.sh 001 "In Progress" # Sync task status
./scripts/pm/clickup-sync-ids.sh         # Synchronise story IDs
```

---

## Quick Reference

| Task                 | Command                                         |
| -------------------- | ----------------------------------------------- |
| Initialise template  | `node --loader tsx scripts/init-template.ts`    |
| Start development    | `./scripts/env/dev.sh`                          |
| Run tests            | `./scripts/env/test.sh`                         |
| Build for staging    | `./scripts/env/staging.sh`                      |
| Build for production | `./scripts/env/production.sh`                   |
| Import ClickUp tasks | `./scripts/pm/clickup-import.sh`                |
| Sync ClickUp status  | `./scripts/pm/sync-status.sh 001 "In Progress"` |

---

## Development Workflow

### Local Development

1. Run development setup:

   ```bash
   ./scripts/env/dev.sh
   ```

2. Start Storybook in another terminal:

   ```bash
   npm run storybook:web
   ```

3. Edit components in `src/web/components/` or `src/mobile/components/`

### Before Committing

```bash
./scripts/env/test.sh
```

Runs unit tests, TypeScript type checking, and ESLint linting.

### Preparing for Release

```bash
./scripts/env/test.sh       # Verify tests pass
./scripts/env/staging.sh    # Build for staging
./scripts/env/production.sh # Production build
npm version <patch|minor|major>
npm publish
```

---

## Related Documentation

- [lib/README.md](lib/README.md) - Library utilities
- [env/README.md](env/README.md) - Environment scripts
- [pm/README.md](pm/README.md) - ClickUp integration
- [**tests**/README.md](__tests__/README.md) - Test suite
- [../.claude/CLAUDE.md](../.claude/CLAUDE.md) - Project conventions

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
