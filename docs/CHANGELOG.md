# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Additional form components (Input, Select, Checkbox, Radio)
- Modal/Dialog component
- Toast/Notification system
- Tabs component
- Accordion component
- Dark mode support
- Animation utilities

---

## [0.1.0] - 2024-11-24

### Added - Initial Release

#### Core Setup
- **TypeScript Configuration**: Full TypeScript support with strict mode
- **Build System**: tsup bundler with ESM and CJS output
- **Multiple Entry Points**: Separate exports for web, native, and tokens
- **Storybook**: Interactive component documentation and development environment

#### Styling System
- **Tailwind CSS 4**: Modern CSS-based configuration with `@theme` directive
- **Nativewind 4**: React Native support with shared design tokens
- **Shared CSS**: Single `tailwind.css` file works for both web and native platforms
- **PostCSS Configuration**: Modern CSS processing pipeline

#### Design Tokens
- **Colors**: Primary (blue) and secondary (slate) color scales with 50-950 shades
- **Typography**: Font families (Inter, Poppins), sizes, weights, and line heights
- **Spacing**: Consistent spacing scale (xs to 2xl)
- **Border Radius**: Predefined radius tokens (sm to full)
- **Shadows**: Elevation system for web components

#### Components

**Button Component**
- Platform-specific implementations (`.web.tsx` and `.native.tsx`)
- 4 variants: primary, secondary, outline, ghost
- 3 sizes: sm, md, lg
- Disabled state support
- Full width option
- TypeScript types with full IntelliSense
- Storybook stories with 9 variants

**Card Component**
- Platform-specific implementations for web and native
- Optional title and subtitle
- Configurable elevation (none, sm, md, lg, xl)
- Flexible padding options (none, sm, md, lg)
- Interactive variant with onPress handler
- Storybook stories with 12 variants

#### Documentation
- **README.md**: Comprehensive usage guide with setup instructions
- **FONTS.md**: Font setup guide for web (WOFF2/WOFF) and native (TTF)
- **GITGUIDE.md**: Git workflow, commit conventions, and PR templates
- **Component Documentation**: Inline TypeScript documentation

#### Development Tooling
- **ESLint**: TypeScript linting with recommended rules
- **Scripts**: Build, dev, storybook, and type-check commands
- **.gitignore**: Proper exclusions for build artifacts and dependencies

### Project Structure
```
ui-design-template/
├── src/
│   ├── components/          # Button, Card with web/native implementations
│   ├── tokens/              # Design tokens (colors, spacing, typography)
│   ├── styles/              # Tailwind CSS configuration
│   ├── index.ts             # Main entry (web)
│   ├── web.ts              # Web-specific exports
│   └── native.ts           # Native-specific exports
├── stories/                # Storybook stories
├── .storybook/            # Storybook configuration
└── docs/                  # Documentation
```

### Technical Specifications
- **React**: 18.x (peer dependency)
- **React Native**: 0.70+ (optional peer dependency)
- **TypeScript**: 5.7.x
- **Tailwind CSS**: 4.0.x
- **Nativewind**: 4.1.x
- **Storybook**: 8.4.x
- **tsup**: 8.3.x

---

## Version History Format

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
