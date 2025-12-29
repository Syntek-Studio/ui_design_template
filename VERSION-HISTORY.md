# Version History

**Last Updated**: 29/12/2024
**Version**: 0.1.0
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [Unreleased](#unreleased)
- [0.1.0 - 29/12/2024](#010---29122024)

---

## [Unreleased]

### Technical Changes
- Nothing yet

---

## [0.1.0] - 29/12/2024

### Summary
Initial release of @tempalte/ui shared component library. Established core architecture for cross-platform React components with TypeScript, Tailwind CSS 4, and Nativewind 4. Implemented comprehensive design token system and development tooling.

### Breaking Changes
None - initial release.

### Database Migrations
Not applicable - library project.

### API Changes
Not applicable - initial release.

### Files Changed

| File | Changes |
|------|---------|
| `package.json` | Initial package configuration with build scripts, dependencies, and peer dependencies |
| `tsconfig.json` | TypeScript configuration with path aliases (@/*) |
| `tsup.config.ts` | Build configuration for CJS/ESM dual format output |
| `tailwind.config.ts` | Tailwind CSS 4 configuration |
| `postcss.config.mjs` | PostCSS configuration for Tailwind processing |
| `.storybook-web/` | Storybook configuration for web components |
| `src/index.ts` | Main entry point with re-exports for web, mobile, and tokens |
| `src/web/components/Button/` | Initial Button component implementation for web |
| `src/mobile/components/Button/` | Initial Button component implementation for React Native |
| `src/tokens/colours.ts` | Colour palette tokens (primary, secondary, semantic, neutral) |
| `src/tokens/spacing.ts` | Spacing scale tokens (0px to 384px, 4px grid) |
| `src/tokens/typography.ts` | Typography tokens (font families, sizes, weights) |
| `src/tokens/breakpoints.ts` | Responsive breakpoint tokens (xs to 2xl) |
| `src/tokens/shadows.ts` | Shadow definition tokens (none to 2xl) |
| `src/tokens/borders.ts` | Border radius and width tokens |
| `README.md` | Comprehensive project documentation |
| `docs/CHANGELOG.md` | Keep a Changelog format changelog |
| `docs/GITGUIDE.md` | Git workflow and commit conventions |
| `docs/METRICS/` | Self-learning metrics system for agent performance tracking |
| `.claude/CLAUDE.md` | Claude Code guidance and project conventions |
| `.claude/SYNTEK-GUIDE.md` | Syntek Dev Suite plugin usage guide |

### Dependencies Updated

| Package | Version | Notes |
|---------|---------|-------|
| `react` | ^18 \|\| ^19 | Peer dependency |
| `react-native` | >=0.70.0 | Optional peer dependency |
| `nativewind` | ^4.0.0 | Peer dependency for React Native styling |
| `tailwindcss` | ^4.1.17 | Dev dependency for styling |
| `typescript` | ^5.9.3 | Dev dependency for type safety |
| `tsup` | ^8.5.1 | Dev dependency for build tooling |
| `storybook` | ^8.6.14 | Dev dependency for component documentation |
| `vitest` | ^4.0.16 | Dev dependency for testing |

### Configuration Changes

| File | Key | Change |
|------|-----|--------|
| `package.json` | `name` | Set to @tempalte/ui |
| `package.json` | `version` | Set to 0.1.0 (pre-MVP) |
| `package.json` | `exports` | Configured dual format exports (CJS/ESM) |
| `package.json` | `scripts` | Added build, dev, test, lint, storybook commands |
| `tsconfig.json` | `paths` | Configured @/* alias mapping to ./src/* |
| `tsconfig.json` | `target` | Set to ES2020 |
| `tsconfig.json` | `jsx` | Set to react-jsx |

### Performance Notes
- Build outputs optimised dual format (CJS/ESM) for maximum compatibility
- Tsup configured with tree-shaking for minimal bundle size
- Path aliases reduce import statement complexity
- Design tokens centralised for consistent theming performance

### Security Notes
- TypeScript strict mode enabled for type safety
- ESLint configured for code quality and security linting
- No runtime dependencies in production build (only peer dependencies)
- All dependencies are development-only or peer-managed

### Architecture Notes

**Component Structure:**
- Platform-specific implementations in `src/web/` and `src/mobile/`
- Shared design tokens in `src/tokens/`
- Namespaced exports: default for web, `Mobile.*` namespace for React Native

**Build System:**
- Tsup for fast, modern bundling
- Dual format output (CommonJS and ESM)
- TypeScript declaration files generated automatically

**Styling System:**
- Tailwind CSS 4 for web components
- Nativewind 4 for React Native compatibility
- Design tokens exportable as JavaScript objects

**Development Workflow:**
- Storybook for component development and documentation
- Vitest for unit testing
- ESLint for code quality
- TypeScript for type safety
- Conventional Commits for semantic versioning

---

**Note:** This project is in pre-MVP (0.x.x) versioning. Breaking changes may occur between minor versions until 1.0.0 is released.
