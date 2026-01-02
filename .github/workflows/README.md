# workflows/

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
- [Workflow Files](#workflow-files)
- [Code Quality Workflows](#code-quality-workflows)
  - [ci.yml - Continuous Integration](#ciyml---continuous-integration)
  - [version-check.yml - VERSION Validation](#version-checkyml---version-validation)
- [Security Workflows](#security-workflows)
  - [codeql.yml - CodeQL Analysis](#codeqlyml---codeql-analysis)
  - [codacy.yml - Codacy Scanning](#codacyyml---codacy-scanning)
  - [njsscan.yml - Node.js Security](#njsscanyml---nodejs-security)
  - [dependency-review.yml - Dependency Review](#dependency-reviewyml---dependency-review)
- [Release Workflows](#release-workflows)
  - [release.yml - GitHub Release Creation](#releaseyml---github-release-creation)
  - [publish-github.yml - NPM Publication](#publish-githubyml---npm-publication)
- [Integration Workflows](#integration-workflows)
  - [clickup-sync.yml - ClickUp Synchronisation](#clickup-syncyml---clickup-synchronisation)
- [Troubleshooting](#troubleshooting)
  - [Workflow Not Triggering](#workflow-not-triggering)
  - [Workflow Failed](#workflow-failed)
  - [Release Not Created](#release-not-created)
- [Related Sections](#related-sections)

---

## Overview

The `workflows/` directory contains 9 GitHub Actions workflows that automate:

- **Continuous Integration**: Linting, type checking, testing, and building
- **Security Scanning**: CodeQL, Codacy, and Node.js security analysis
- **Release Management**: Automated GitHub release creation
- **Project Integration**: ClickUp synchronisation

---

## Directory Tree

```
.github/workflows/
├── README.md                    # This file
├── ci.yml                       # Continuous integration pipeline
├── codeql.yml                   # GitHub CodeQL security analysis
├── codacy.yml                   # Codacy code quality scanning
├── njsscan.yml                  # Node.js security scanning
├── dependency-review.yml        # Dependency vulnerability review
├── publish-github.yml           # NPM package publication
├── release.yml                  # GitHub release creation
├── version-check.yml            # VERSION file validation
└── clickup-sync.yml             # ClickUp project management sync
```

---

## Workflow Files

| File                    | Purpose           | Trigger          | Blocks PR |
| ----------------------- | ----------------- | ---------------- | --------- |
| `ci.yml`                | Lint, test, build | Push/PR          | Yes       |
| `codeql.yml`            | Security analysis | Push/PR/Schedule | Yes       |
| `codacy.yml`            | Code quality      | Push/PR          | Yes       |
| `njsscan.yml`           | Node.js security  | Push/PR          | Yes       |
| `dependency-review.yml` | Dependency check  | PR to main       | Yes       |
| `publish-github.yml`    | Publish package   | Manual           | No        |
| `release.yml`           | Create release    | VERSION change   | No        |
| `version-check.yml`     | Validate VERSION  | Push/PR          | Yes       |
| `clickup-sync.yml`      | ClickUp sync      | Branch/PR        | No        |

---

## Code Quality Workflows

### ci.yml - Continuous Integration

**Jobs**:

1. **Lint & Type Check**: ESLint + TypeScript validation
2. **Tests**: Vitest with coverage (if test files exist)
3. **Build**: Production build (depends on jobs 1 & 2)

**Artifacts** (7 days retention):

- `coverage-report/` - HTML test coverage
- `dist/` - Compiled library (CJS/ESM)

**Exit Criteria**: PR blocked if any job fails.

### version-check.yml - VERSION Validation

Validates VERSION file format:

- Valid: `1.0.0`, `1.0.0-alpha`, `1.0.0-rc.1`
- Invalid: `1.0`, `1.0.0.0`, empty

---

## Security Workflows

### codeql.yml - CodeQL Analysis

**Detects**:

- SQL injection, XSS, path traversal
- Code quality issues and anti-patterns

**Schedule**: Weekly Monday 06:00 UTC

### codacy.yml - Codacy Scanning

Static analysis for code quality, security vulnerabilities, and code smells.

### njsscan.yml - Node.js Security

Security scanning specific to Node.js code patterns.

### dependency-review.yml - Dependency Review

Scans new/updated dependencies for known vulnerabilities before merging to main.

---

## Release Workflows

### release.yml - GitHub Release Creation

**Trigger**: VERSION file change on main branch

**Process**:

1. Extract version from VERSION file
2. Retrieve changelog from CHANGELOG.md
3. Detect pre-release (contains hyphen)
4. Create GitHub release with changelog

**Pre-release Detection**:

- `1.0.0-alpha` → Pre-release
- `1.0.0` → Stable release

### publish-github.yml - NPM Publication

**Trigger**: Manual (workflow_dispatch)

Publishes to GitHub Package Registry as `@syntek-studio/ui`.

---

## Integration Workflows

### clickup-sync.yml - ClickUp Synchronisation

**Triggers**:

- Branch push: `us###/*` pattern
- PR: opened or closed
- Manual: workflow_dispatch

**Status Mapping**:

| GitHub Event             | ClickUp Status    |
| ------------------------ | ----------------- |
| Branch `us###/*` pushed  | In Progress       |
| PR opened to testing/dev | In Review         |
| PR merged to staging     | Accepted          |
| PR merged to main        | Accepted Customer |

**Manual Trigger**:

```bash
gh workflow run clickup-sync.yml -f task_id=123 -f status="In Progress"
```

---

## Troubleshooting

### Workflow Not Triggering

1. Check workflow is enabled in Settings > Actions
2. Verify branch matches trigger pattern
3. Wait 1-2 minutes for GitHub processing

### Workflow Failed

1. Click "Details" on failed check
2. View logs for failed step
3. Run locally: `npm run lint`, `npm run type-check`, `npm test`
4. Fix and push again

### Release Not Created

1. Confirm VERSION file changed on main
2. Verify VERSION format is valid
3. Check CHANGELOG.md has matching `## [VERSION]` section

---

## Related Sections

- [../README.md](../README.md) - GitHub configuration overview
- [../../CLAUDE.md](../../CLAUDE.md) - Project conventions
- [../../docs/GUIDES/CONTRIBUTING.md](../../docs/GUIDES/CONTRIBUTING.md) - Contributing guidelines

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
