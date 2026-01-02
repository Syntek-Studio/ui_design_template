# .github/

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
- [Files and Folders](#files-and-folders)
  - [Workflows Directory](#workflows-directory)
  - [Configuration Files](#configuration-files)
  - [Community Files](#community-files)
- [Workflow Automation](#workflow-automation)
  - [CI/CD Pipeline](#cicd-pipeline)
  - [Key Workflows](#key-workflows)
- [GitHub Configuration](#github-configuration)
  - [Dependabot](#dependabot)
  - [VERSION File Format](#version-file-format)
- [Contributing Guidelines](#contributing-guidelines)
- [Security and Community](#security-and-community)
  - [Security Policy](#security-policy)
  - [Code of Conduct](#code-of-conduct)
  - [Issue Templates](#issue-templates)
- [Related Sections](#related-sections)

---

## Overview

The `.github/` directory contains all GitHub-specific configuration files for the @syntek-studio/ui project. This includes:

- **Automated workflows** for continuous integration, testing, security scanning, and releases
- **Community guidelines** for contributing, code of conduct, and security policies
- **Issue and discussion templates** that guide contributors and maintainers
- **Dependency management** configuration via Dependabot
- **Integration settings** for project management tools like ClickUp

---

## Directory Tree

```
.github/
├── README.md                        # This file
├── workflows/                       # GitHub Actions workflow definitions
│   ├── README.md                    # Workflows documentation
│   ├── ci.yml                       # Continuous integration pipeline
│   ├── codeql.yml                   # GitHub CodeQL security analysis
│   ├── codacy.yml                   # Codacy code quality scanning
│   ├── njsscan.yml                  # Node.js security scanning
│   ├── dependency-review.yml        # Dependency vulnerability review
│   ├── publish-github.yml           # NPM package publication
│   ├── release.yml                  # Automated GitHub release creation
│   ├── version-check.yml            # Version file validation
│   └── clickup-sync.yml             # ClickUp project management sync
├── dependabot.yml                   # Dependabot configuration
├── ISSUE_TEMPLATE/                  # GitHub issue templates
│   ├── bug_report.md                # Bug report template
│   └── feature_request.md           # Feature request template
├── discussion_templates/            # GitHub discussions templates
├── CONTRIBUTING.md                  # Contributing guidelines
├── CODE_OF_CONDUCT.md               # Community code of conduct
├── SECURITY.md                      # Security reporting guidelines
└── DISCUSSIONS-SETUP.md             # Discussion feature documentation
```

---

## Files and Folders

### Workflows Directory

Located at `.github/workflows/`, containing 9 automated GitHub Actions workflows.

| File                    | Purpose                         | Trigger                             |
| ----------------------- | ------------------------------- | ----------------------------------- |
| `ci.yml`                | Lint, type-check, test, build   | Push/PR to main/staging/dev/testing |
| `codeql.yml`            | GitHub CodeQL security analysis | Push/PR + weekly schedule           |
| `codacy.yml`            | Codacy code quality scanning    | Push/PR                             |
| `njsscan.yml`           | Node.js security scanning       | Push/PR                             |
| `dependency-review.yml` | Dependency vulnerability review | PR to main                          |
| `publish-github.yml`    | NPM package publication         | Manual trigger                      |
| `release.yml`           | GitHub release creation         | VERSION file change on main         |
| `version-check.yml`     | VERSION file validation         | Push/PR                             |
| `clickup-sync.yml`      | ClickUp synchronisation         | Branch/PR events                    |

### Configuration Files

| File             | Purpose                                                     |
| ---------------- | ----------------------------------------------------------- |
| `dependabot.yml` | Automated dependency updates (weekly, Conventional Commits) |

### Community Files

| File                 | Purpose                                                       |
| -------------------- | ------------------------------------------------------------- |
| `CONTRIBUTING.md`    | Contributing guidelines, branch conventions, commit standards |
| `CODE_OF_CONDUCT.md` | Community behaviour standards                                 |
| `SECURITY.md`        | Security vulnerability reporting (private disclosure)         |

---

## Workflow Automation

### CI/CD Pipeline

1. **Lint & Type Check** - ESLint and TypeScript validation
2. **Tests** - Unit tests with Vitest, coverage reporting
3. **Build** - Production library build (dist/)
4. **Security Scans** - CodeQL, Codacy, njsscan
5. **Dependency Review** - Vulnerability checks
6. **Release** - Automated GitHub release creation

### Key Workflows

**ci.yml** - Main quality gate:

- Blocks PR merge if any job fails
- Generates coverage and dist artifacts (7 days retention)

**release.yml** - Automatic releases:

- Triggered by VERSION file changes on main
- Creates GitHub release with CHANGELOG content
- Supports pre-release versions (e.g., 1.0.0-alpha)

**clickup-sync.yml** - Project management:

- Syncs branch/PR activity with ClickUp tasks
- Branch pattern: `us###/description` (e.g., `us001/add-button`)

---

## GitHub Configuration

### Dependabot

- **NPM**: Weekly updates (patches for prod, minor for dev)
- **GitHub Actions**: Weekly updates
- **Commit prefix**: `deps:` for npm, `ci:` for actions

### VERSION File Format

Valid formats:

- `1.0.0` (stable)
- `1.0.0-alpha` (pre-release)
- `1.0.0-rc.1` (release candidate)

---

## Contributing Guidelines

- **Branch naming**: `us###/description`
- **Commits**: Conventional Commits format
- **PR target**: testing or dev branch first
- **Quality**: All CI checks must pass

---

## Security and Community

### Security Policy

Report vulnerabilities privately via GitHub security advisory - never in public issues.

### Code of Conduct

Expected behaviour standards for inclusive, welcoming community.

### Issue Templates

- **Bug Report**: Steps to reproduce, environment info
- **Feature Request**: Use cases, proposed implementation

---

## Related Sections

- [workflows/README.md](workflows/README.md) - Detailed workflow documentation
- [../CLAUDE.md](../CLAUDE.md) - Project configuration
- [../README.md](../README.md) - Main project documentation
- [../docs/PM-INTEGRATION/](../docs/PM-INTEGRATION/) - ClickUp integration

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
