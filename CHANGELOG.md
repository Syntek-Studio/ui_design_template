# Changelog

**Last Updated**: 01/01/2026
**Version**: 0.7.0
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Additional components (Card, Input, Modal, etc.)
- Dark mode theme support
- More comprehensive design tokens documentation
- Accessibility testing and ARIA enhancements

---

## [0.7.0] - 01/01/2026

### Added

- Comprehensive CI/CD pipeline with GitHub Actions workflows
  - CI workflow (`.github/workflows/ci.yml`) for linting, type-checking, testing, and building
  - Release workflow (`.github/workflows/release.yml`) for automated version releases
  - GitHub Packages publishing workflow (`.github/workflows/publish-github.yml`)
  - Version consistency check workflow (`.github/workflows/version-check.yml`)
- Security scanning infrastructure
  - CodeQL analysis workflow (`.github/workflows/codeql.yml`)
  - njsscan security scanning workflow (`.github/workflows/njsscan.yml`)
  - Codacy static analysis workflow (`.github/workflows/codacy-analysis.yml`)
  - Dependency review workflow (`.github/workflows/dependency-review.yml`)
- Dependabot configuration for automated dependency updates (`.github/dependabot.yml`)
- GitHub community health files
  - Contributing guidelines (`.github/CONTRIBUTING.md`)
  - Code of Conduct (`.github/CODE_OF_CONDUCT.md`)
  - Security policy (`.github/SECURITY.md`)
  - Issue templates for bug reports and feature requests
  - Pull request template
- Pre-commit hooks with Husky and lint-staged
- Enhanced VS Code workspace settings

### Changed

- Package renamed from `@template/ui` to `@syntek-studio/ui`
- Updated VS Code settings for improved developer experience
- Enhanced `package.json` with lint-staged configuration

### Security

- Multi-layered security scanning (CodeQL, njsscan, Codacy)
- Automated dependency vulnerability detection
- Weekly Dependabot security updates
- Pre-commit hooks enforce code quality and type safety

---

## [0.6.0] - 01/01/2026

### Added

- ClickUp project management integration with bidirectional GitHub synchronisation
- GitHub Actions workflow for automatic ClickUp status updates (`.github/workflows/clickup-sync.yml`)
- PM integration scripts in `scripts/pm/` for manual task management
- Environment variable template (`.env.example`) for ClickUp API configuration
- VS Code workspace settings and recommended extensions
- ClickUp API configuration (`config/clickup.json`)
- PM status mapping configuration (`config/pm-status-mapping.json`)
- PM integration documentation in `docs/PM-INTEGRATION/`
- 23 sprint planning documents in `docs/SPRINTS/`
- 39 user story definitions in `docs/STORIES/`

### Changed

- Moved environment scripts from root to `scripts/env/` for better organisation
- Updated `.claude/CLAUDE.md` with PM integration documentation
- Updated `.gitignore` to exclude environment files
- Updated `DOCUMENTATION-INDEX.md` with PM documentation links
- Updated `README.md` with PM integration section

### Removed

- `dev.sh`, `staging.sh`, `production.sh`, `test.sh` from root (moved to `scripts/env/`)

---

## [0.5.1] - 29/12/2024

### Documentation

- Comprehensive documentation overhaul across all `.md` files
- Added standardised metadata headers (Last Updated, Version, Maintained By, Language, Timezone)
- British English (en_GB) conventions applied throughout
- Added architectural planning documentation in `docs/PLANS/`
- Enhanced all component and token README files

---

## [0.5.0] - 29/12/2024

### Added

- Utility functions for component development in `src/utils/`
  - `classNames.ts` - Class name utility function
  - `componentStyles.ts` - Component styling utilities

### Changed

- Enhanced Button component (web) with utilities and improved types
- Enhanced Button component (mobile) with improved implementation
- Updated main entry point (`src/index.ts`) with improved type exports

---

## [0.4.0] - 29/12/2024

### Added

- Comprehensive type system for design tokens in `src/types/`
- CSS type definitions in `src/types/css.d.ts`

### Changed

- Enhanced all design token files with TypeScript types and metadata headers:
  - `src/tokens/borders.ts`
  - `src/tokens/breakpoints.ts`
  - `src/tokens/colours.ts`
  - `src/tokens/shadows.ts`
  - `src/tokens/spacing.ts`
  - `src/tokens/typography.ts`

---

## [0.3.0] - 29/12/2024

### Added

- TypeScript type definitions for Storybook in `.storybook-web/types.d.ts`
- Comprehensive Storybook documentation in `.storybook-web/README.md`

### Changed

- Enhanced Storybook configuration with TypeScript support (`.storybook-web/main.ts`)
- Migrated Storybook preview from `.ts` to `.tsx` (`.storybook-web/preview.tsx`)

### Removed

- `.storybook-web/preview.ts` (replaced with `.tsx` version)

---

## [0.2.1] - 29/12/2024

### Changed

- Renamed package from `@syntek/ui` to `@template/ui`
- Updated all dependencies to latest compatible versions

---

## [0.2.0] - 29/12/2024

### Added

- Version management system with three-tier documentation:
  - `VERSION-HISTORY.md` - Technical change log for developers
  - `CHANGELOG.md` - Brief developer-focused summary
  - `RELEASES.md` - User-facing feature highlights

### Removed

- `docs/CHANGELOG.md` (consolidated into root CHANGELOG.md)

---

## [0.1.1] - 29/12/2024

### Added

- EditorConfig file (`.editorconfig`) for consistent code formatting
- Git attributes file (`.gitattributes`) for line ending configuration
- npm configuration file (`.npmrc`) for package registry settings
- Prettier configuration (`.prettierrc`) for automated code formatting
- Global TypeScript type definitions in `global.d.ts`

### Changed

- Enhanced TypeScript configuration with stricter settings in `tsconfig.json`

---

## [0.1.0] - 29/12/2024

### Added

- Initial project setup and architecture
- Cross-platform component library structure for React Web and React Native
- Button component for web and mobile platforms
- Comprehensive design tokens system:
  - Colour palette with primary, secondary, and semantic colours
  - Spacing scale (4px grid system, 0px to 384px)
  - Typography scales with font families, sizes, and weights
  - Responsive breakpoints (xs to 2xl)
  - Shadow definitions (none to 2xl)
  - Border radius and width tokens
- Vitest testing framework integration
- Storybook for web component documentation
- Build tooling with tsup for dual format output (CJS/ESM)
- TypeScript configuration with path aliases
- ESLint and code quality tools
- Syntek Dev Suite plugin configuration
- Self-learning metrics system in `docs/METRICS/`
- Comprehensive documentation structure

### Security

- TypeScript strict mode enabled for type safety
- ESLint configured for security linting
- No runtime dependencies (peer dependencies only)

---

## Contributing

When adding entries to the changelog:

1. Add new changes under `[Unreleased]` section
2. Use proper category headings (Added, Changed, Fixed, etc.)
3. Write clear, concise descriptions
4. Link to PR/issue numbers when applicable
5. Move unreleased changes to a version section on release

### Types of Changes

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Vulnerability fixes
- **Documentation**: Documentation changes

### Semantic Versioning

- **MAJOR** (x.0.0): Breaking changes
- **MINOR** (0.x.0): New features, backwards compatible
- **PATCH** (0.0.x): Bug fixes, backwards compatible

---

[unreleased]: https://github.com/your-org/ui-design-template/compare/v0.5.1...HEAD
[0.5.1]: https://github.com/your-org/ui-design-template/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/your-org/ui-design-template/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/your-org/ui-design-template/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/your-org/ui-design-template/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/your-org/ui-design-template/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/your-org/ui-design-template/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/your-org/ui-design-template/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/your-org/ui-design-template/releases/tag/v0.1.0
