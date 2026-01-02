# scripts/env/

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
- [Scripts](#scripts)
  - [dev.sh - Development Environment](#devsh---development-environment)
  - [test.sh - Quality Checks](#testsh---quality-checks)
  - [staging.sh - Staging Build](#stagingsh---staging-build)
  - [production.sh - Production Build](#productionsh---production-build)
- [Workflows](#workflows)
  - [Local Development](#local-development)
  - [Release](#release)
- [Related Sections](#related-sections)

---

## Overview

The `env/` directory contains shell scripts for setting up different environments and building the component library for development, testing, staging, and production deployment.

All scripts use `set -e` to fail fast on errors.

---

## Directory Tree

```
env/
├── README.md         # This file
├── dev.sh            # Development environment setup
├── test.sh           # Test suite and quality checks
├── staging.sh        # Staging/prerelease build
└── production.sh     # Production build with confirmations
```

---

## Scripts

### dev.sh - Development Environment

```bash
./scripts/env/dev.sh
```

1. Installs npm dependencies (if needed)
2. Starts build in watch mode
3. Provides instructions for Storybook

**Next**: Run `npm run storybook:web` in another terminal.

### test.sh - Quality Checks

```bash
./scripts/env/test.sh
```

Runs:

1. Unit tests (vitest)
2. TypeScript type checking
3. ESLint linting

**Required before committing or pushing code.**

### staging.sh - Staging Build

```bash
./scripts/env/staging.sh
```

1. Runs test suite
2. Builds library for production
3. Outputs to `dist/`

### production.sh - Production Build

```bash
./scripts/env/production.sh
```

1. Requires explicit "yes" confirmation
2. Runs full test suite
3. Builds for production

**After successful build**:

```bash
npm version <patch|minor|major>
npm publish
```

---

## Workflows

### Local Development

```bash
./scripts/env/dev.sh      # Start watch mode
npm run storybook:web     # Start Storybook
# Edit components, watch mode rebuilds
./scripts/env/test.sh     # Before committing
```

### Release

```bash
./scripts/env/test.sh       # Verify tests
./scripts/env/staging.sh    # Test staging build
./scripts/env/production.sh # Production build
npm version patch           # Bump version
npm publish                 # Publish
```

---

## Related Sections

- [../README.md](../README.md) - Scripts overview
- [../pm/README.md](../pm/README.md) - Project management scripts
- [../../package.json](../../package.json) - npm scripts

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
