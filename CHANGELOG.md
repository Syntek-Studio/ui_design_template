# Changelog

**Last Updated**: 29/12/2024
**Version**: 0.1.0
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
- Environment shell scripts for different deployment stages
- Syntek Dev Suite plugin configuration
- Self-learning metrics system in `docs/METRICS/` for tracking agent performance
- Comprehensive documentation structure
- Build tooling with tsup for dual format output (CJS/ESM)
- TypeScript configuration with path aliases
- Storybook for web component documentation
- ESLint and code quality tools
- Version management system (VERSION-HISTORY.md, RELEASES.md, CHANGELOG.md)

### Changed
- Nothing yet (initial release)

### Fixed
- Nothing yet (initial release)

### Security
- TypeScript strict mode enabled for type safety
- ESLint configured for security linting
- No runtime dependencies (peer dependencies only)

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
