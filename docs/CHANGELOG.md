# Changelog

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

## [0.2.0] - 22-12-2025

### Added
- Syntek Dev Suite plugin configuration for enhanced development workflow
- Comprehensive design tokens system:
  - Colour palette with primary, secondary, and semantic colours
  - Spacing scale (4px grid system)
  - Typography scales with font families, sizes, and weights
  - Responsive breakpoints (xs to 2xl)
  - Shadow definitions (none to 2xl)
  - Border radius and width tokens
- Vitest testing framework integration
- Environment shell scripts for different deployment stages:
  - `dev.sh` - Development environment
  - `test.sh` - Testing environment
  - `staging.sh` - Staging environment
  - `production.sh` - Production environment
- Self-learning metrics system in `docs/METRICS/` for tracking agent performance and optimisations
- Comprehensive documentation:
  - Updated main README.md with installation, usage, and API examples
  - Design tokens documentation
  - Architecture overview
  - Contributing guidelines
  - JSDoc comments in token files
  - Section README files for project organisation

### Changed
- Updated package.json with new development scripts
- Enhanced project documentation structure
- Improved code comments for better maintainability

### Fixed
- Initial release stabilisation

---

---

## [0.1.0] - 24-11-2025

### Added - Initial Release

### Types of Changes
- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Vulnerability fixes

### Semantic Versioning
- **MAJOR** (x.0.0): Breaking changes
- **MINOR** (0.x.0): New features, backwards compatible
- **PATCH** (0.0.x): Bug fixes, backwards compatible

---

## Contributing

When adding entries to the changelog:

1. Add new changes under `[Unreleased]` section
2. Use proper category headings (Added, Changed, Fixed, etc.)
3. Write clear, concise descriptions
4. Link to PR/issue numbers when applicable
5. Move unreleased changes to a version section on release

### Example Entry
```markdown
## [0.2.0] - 2024-12-01

### Added
- Input component with validation support (#12)
- Dark mode theme variants (#15)

### Changed
- Button component now uses CSS variables for colors (#18)
- Updated spacing tokens to align with 8px grid (#20)

### Fixed
- Card shadow not rendering correctly on iOS (#16)
- TypeScript errors in native Button component (#19)
```

---

[unreleased]: https://github.com/your-org/ui-design-template/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/your-org/ui-design-template/releases/tag/v0.1.0
