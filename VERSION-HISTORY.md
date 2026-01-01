# Version History

**Last Updated**: 29/12/2024
**Version**: 0.5.1
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [\[Unreleased\]](#unreleased)
  - [Technical Changes](#technical-changes)
- [\[0.5.1\] - 29/12/2024](#051---29122024)
  - [Summary](#summary)
  - [Breaking Changes](#breaking-changes)
  - [Database Migrations](#database-migrations)
  - [API Changes](#api-changes)
  - [Files Changed](#files-changed)
  - [Documentation Notes](#documentation-notes)
- [\[0.5.0\] - 29/12/2024](#050---29122024)
  - [Summary](#summary-1)
  - [Breaking Changes](#breaking-changes-1)
  - [Database Migrations](#database-migrations-1)
  - [API Changes](#api-changes-1)
  - [Files Changed](#files-changed-1)
  - [Architecture Notes](#architecture-notes)
- [\[0.4.0\] - 29/12/2024](#040---29122024)
  - [Summary](#summary-2)
  - [Breaking Changes](#breaking-changes-2)
  - [Database Migrations](#database-migrations-2)
  - [API Changes](#api-changes-2)
  - [Files Changed](#files-changed-2)
  - [Performance Notes](#performance-notes)
- [\[0.3.0\] - 29/12/2024](#030---29122024)
  - [Summary](#summary-3)
  - [Breaking Changes](#breaking-changes-3)
  - [Database Migrations](#database-migrations-3)
  - [API Changes](#api-changes-3)
  - [Files Changed](#files-changed-3)
  - [Configuration Changes](#configuration-changes)
- [\[0.2.1\] - 29/12/2024](#021---29122024)
  - [Summary](#summary-4)
  - [Breaking Changes](#breaking-changes-4)
  - [Database Migrations](#database-migrations-4)
  - [API Changes](#api-changes-4)
  - [Files Changed](#files-changed-4)
  - [Dependencies Updated](#dependencies-updated)
- [\[0.2.0\] - 29/12/2024](#020---29122024)
  - [Summary](#summary-5)
  - [Breaking Changes](#breaking-changes-5)
  - [Database Migrations](#database-migrations-5)
  - [API Changes](#api-changes-5)
  - [Files Changed](#files-changed-5)
  - [Documentation Notes](#documentation-notes-1)
- [\[0.1.1\] - 29/12/2024](#011---29122024)
  - [Summary](#summary-6)
  - [Breaking Changes](#breaking-changes-6)
  - [Database Migrations](#database-migrations-6)
  - [API Changes](#api-changes-6)
  - [Files Changed](#files-changed-6)
  - [Configuration Changes](#configuration-changes-1)
- [\[0.1.0\] - 29/12/2024](#010---29122024)
  - [Summary](#summary-7)
  - [Breaking Changes](#breaking-changes-7)
  - [Database Migrations](#database-migrations-7)
  - [API Changes](#api-changes-7)
  - [Files Changed](#files-changed-7)
  - [Dependencies Updated](#dependencies-updated-1)
  - [Configuration Changes](#configuration-changes-2)
  - [Performance Notes](#performance-notes-1)
  - [Security Notes](#security-notes)
  - [Architecture Notes](#architecture-notes-1)

---

## [Unreleased]

### Technical Changes

- Nothing yet

---

## [0.5.1] - 29/12/2024

### Summary

Comprehensive documentation overhaul with standardised metadata headers, British English conventions, and improved structure across all documentation files.

### Breaking Changes

None - documentation only.

### Database Migrations

Not applicable - library project.

### API Changes

None - documentation only.

### Files Changed

| File                                     | Changes                                                                |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| `.claude/CLAUDE.md`                      | Enhanced with metadata headers and improved structure                  |
| `.claude/README.md`                      | Enhanced plugin documentation with metadata headers                    |
| `.claude/SYNTEK-GUIDE.md`                | Enhanced Syntek Dev Suite guide with metadata headers                  |
| `.claude/commands/link.md`               | Enhanced link command documentation                                    |
| `.claude/commands/new-component.md`      | Enhanced component creation documentation                              |
| `README.md`                              | Comprehensive overhaul with metadata headers and improved structure    |
| `DOCUMENTATION-INDEX.md`                 | Enhanced documentation index with metadata headers                     |
| `docs/README.md`                         | Added documentation hub with metadata headers                          |
| `docs/GITGUIDE.md`                       | Enhanced with metadata headers and improved Git workflow documentation |
| `docs/METRICS/README.md`                 | Enhanced metrics documentation with metadata headers                   |
| `docs/PLANS/PLAN-TEMPLATE-REPOSITORY.MD` | Added architectural planning documentation                             |
| `docs/PLANS/TEMPLATE-SUMMARY.MD`         | Added template summary documentation                                   |
| `src/README.md`                          | Enhanced source code structure documentation                           |
| `src/web/README.md`                      | Enhanced web components documentation                                  |
| `src/web/components/README.md`           | Enhanced web components usage guide                                    |
| `src/mobile/README.md`                   | Enhanced mobile components documentation                               |
| `src/mobile/components/README.md`        | Enhanced mobile components usage guide                                 |
| `src/tokens/README.md`                   | Enhanced design tokens documentation                                   |

### Documentation Notes

- All `.md` files now include standardised metadata headers
- Consistent British English (en_GB) used throughout
- DD/MM/YYYY date format applied consistently
- Europe/London timezone specified for all timestamps

---

## [0.5.0] - 29/12/2024

### Summary

Added utility system and enhanced Button components for both web and mobile platforms with improved styling utilities and type safety.

### Breaking Changes

None - all changes are backwards compatible.

### Database Migrations

Not applicable - library project.

### API Changes

- New utility functions exported from `src/utils/`
- Enhanced Button component props with improved types

### Files Changed

| File                                                     | Changes                                              |
| -------------------------------------------------------- | ---------------------------------------------------- |
| `src/utils/classNames.ts`                                | Added classNames utility function                    |
| `src/utils/componentStyles.ts`                           | Added component styling utilities                    |
| `src/utils/index.ts`                                     | Added utils barrel export                            |
| `src/utils/README.md`                                    | Added utility documentation                          |
| `src/index.ts`                                           | Enhanced main entry point with improved type exports |
| `src/web/components/Button/Button.tsx`                   | Enhanced with utilities and improved types           |
| `src/web/components/Button/Button.stories.tsx`           | Updated stories for enhanced Button                  |
| `src/web/components/Button/index.ts`                     | Updated exports                                      |
| `src/mobile/components/Button/Button.native.tsx`         | Enhanced mobile implementation                       |
| `src/mobile/components/Button/Button.stories.native.tsx` | Updated mobile stories                               |
| `src/mobile/components/Button/index.ts`                  | Updated mobile exports                               |

### Architecture Notes

- New utility system reduces code duplication in components
- Centralised styling logic for consistency across platforms

---

## [0.4.0] - 29/12/2024

### Summary

Added comprehensive type system for design tokens and enhanced all token files with TypeScript types and documentation headers.

### Breaking Changes

None - all changes are backwards compatible.

### Database Migrations

Not applicable - library project.

### API Changes

- All design tokens now have full TypeScript type definitions
- New CSS type definitions for improved styling support

### Files Changed

| File                        | Changes                                            |
| --------------------------- | -------------------------------------------------- |
| `src/types/css.d.ts`        | Added CSS type definitions                         |
| `src/tokens/borders.ts`     | Enhanced with TypeScript types and metadata header |
| `src/tokens/breakpoints.ts` | Enhanced with TypeScript types and metadata header |
| `src/tokens/colours.ts`     | Enhanced with TypeScript types and metadata header |
| `src/tokens/shadows.ts`     | Enhanced with TypeScript types and metadata header |
| `src/tokens/spacing.ts`     | Enhanced with TypeScript types and metadata header |
| `src/tokens/typography.ts`  | Enhanced with TypeScript types and metadata header |
| `src/tokens/README.md`      | Enhanced documentation                             |

### Performance Notes

- Enhanced type safety improves IDE autocomplete performance
- Compile-time type checking catches errors early

---

## [0.3.0] - 29/12/2024

### Summary

Enhanced Storybook configuration with TypeScript support, migrated preview configuration from JavaScript to TypeScript, and added comprehensive Storybook documentation.

### Breaking Changes

None - all changes are backwards compatible.

### Database Migrations

Not applicable - library project.

### API Changes

None - infrastructure changes only.

### Files Changed

| File                         | Changes                                     |
| ---------------------------- | ------------------------------------------- |
| `.storybook-web/main.ts`     | Enhanced TypeScript configuration           |
| `.storybook-web/preview.ts`  | Removed (replaced with .tsx)                |
| `.storybook-web/preview.tsx` | New TypeScript preview configuration        |
| `.storybook-web/types.d.ts`  | Added TypeScript type definitions           |
| `.storybook-web/README.md`   | Added comprehensive Storybook documentation |

### Configuration Changes

| File              | Key        | Change                                               |
| ----------------- | ---------- | ---------------------------------------------------- |
| `.storybook-web/` | TypeScript | Migrated from JavaScript to TypeScript configuration |

---

## [0.2.1] - 29/12/2024

### Summary

Updated package configuration with renamed package and updated dependencies.

### Breaking Changes

None - package rename only affects installation.

### Database Migrations

Not applicable - library project.

### API Changes

None - configuration changes only.

### Files Changed

| File                | Changes                                                       |
| ------------------- | ------------------------------------------------------------- |
| `package.json`      | Renamed from @syntek/ui to @template/ui, updated dependencies |
| `package-lock.json` | Updated dependency lock file                                  |

### Dependencies Updated

| Package | From | To     | Notes                                                  |
| ------- | ---- | ------ | ------------------------------------------------------ |
| Various | -    | Latest | Updated all dependencies to latest compatible versions |

---

## [0.2.0] - 29/12/2024

### Summary

Introduction of version management system with VERSION-HISTORY.md, CHANGELOG.md, and RELEASES.md for comprehensive version tracking.

### Breaking Changes

None - new feature addition.

### Database Migrations

Not applicable - library project.

### API Changes

None - documentation only.

### Files Changed

| File                 | Changes                                       |
| -------------------- | --------------------------------------------- |
| `CHANGELOG.md`       | Added developer-focused changelog             |
| `RELEASES.md`        | Added user-facing release notes               |
| `VERSION-HISTORY.md` | Added comprehensive technical version history |
| `docs/CHANGELOG.md`  | Removed (consolidated into root CHANGELOG.md) |

### Documentation Notes

- Established three-tier version documentation system
- VERSION-HISTORY.md for technical details (developers)
- CHANGELOG.md for brief developer summary
- RELEASES.md for user-facing feature highlights

---

## [0.1.1] - 29/12/2024

### Summary

Added project configuration and tooling setup including EditorConfig, Git attributes, npm configuration, Prettier, global TypeScript definitions, and enhanced TypeScript configuration.

### Breaking Changes

None - configuration additions only.

### Database Migrations

Not applicable - library project.

### API Changes

None - configuration changes only.

### Files Changed

| File             | Changes                                                  |
| ---------------- | -------------------------------------------------------- |
| `.editorconfig`  | Added EditorConfig for consistent code formatting        |
| `.gitattributes` | Added Git attributes for line endings and file handling  |
| `.npmrc`         | Added npm configuration                                  |
| `.prettierrc`    | Added Prettier configuration for code formatting         |
| `global.d.ts`    | Added global TypeScript type definitions                 |
| `tsconfig.json`  | Enhanced TypeScript configuration with stricter settings |

### Configuration Changes

| File             | Key      | Change                                        |
| ---------------- | -------- | --------------------------------------------- |
| `.editorconfig`  | -        | Added standard editor configuration           |
| `.npmrc`         | -        | Added npm registry and configuration settings |
| `.prettierrc`    | -        | Added code formatting rules                   |
| `.gitattributes` | -        | Added Git line ending and merge configuration |
| `tsconfig.json`  | `strict` | Enhanced strict mode settings                 |

---

## [0.1.0] - 29/12/2024

### Summary

Initial release of @template/ui shared component library. Established core architecture for cross-platform React components with TypeScript, Tailwind CSS 4, and Nativewind 4. Implemented comprehensive design token system and development tooling.

### Breaking Changes

None - initial release.

### Database Migrations

Not applicable - library project.

### API Changes

Not applicable - initial release.

### Files Changed

| File                            | Changes                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| `package.json`                  | Initial package configuration with build scripts, dependencies, and peer dependencies |
| `tsconfig.json`                 | TypeScript configuration with path aliases (@/\*)                                     |
| `tsup.config.ts`                | Build configuration for CJS/ESM dual format output                                    |
| `tailwind.config.ts`            | Tailwind CSS 4 configuration                                                          |
| `postcss.config.mjs`            | PostCSS configuration for Tailwind processing                                         |
| `.storybook-web/`               | Storybook configuration for web components                                            |
| `src/index.ts`                  | Main entry point with re-exports for web, mobile, and tokens                          |
| `src/web/components/Button/`    | Initial Button component implementation for web                                       |
| `src/mobile/components/Button/` | Initial Button component implementation for React Native                              |
| `src/tokens/colours.ts`         | Colour palette tokens (primary, secondary, semantic, neutral)                         |
| `src/tokens/spacing.ts`         | Spacing scale tokens (0px to 384px, 4px grid)                                         |
| `src/tokens/typography.ts`      | Typography tokens (font families, sizes, weights)                                     |
| `src/tokens/breakpoints.ts`     | Responsive breakpoint tokens (xs to 2xl)                                              |
| `src/tokens/shadows.ts`         | Shadow definition tokens (none to 2xl)                                                |
| `src/tokens/borders.ts`         | Border radius and width tokens                                                        |
| `README.md`                     | Comprehensive project documentation                                                   |
| `docs/CHANGELOG.md`             | Keep a Changelog format changelog                                                     |
| `docs/GITGUIDE.md`              | Git workflow and commit conventions                                                   |
| `docs/METRICS/`                 | Self-learning metrics system for agent performance tracking                           |
| `.claude/CLAUDE.md`             | Claude Code guidance and project conventions                                          |
| `.claude/SYNTEK-GUIDE.md`       | Syntek Dev Suite plugin usage guide                                                   |

### Dependencies Updated

| Package        | Version      | Notes                                      |
| -------------- | ------------ | ------------------------------------------ |
| `react`        | ^18 \|\| ^19 | Peer dependency                            |
| `react-native` | >=0.70.0     | Optional peer dependency                   |
| `nativewind`   | ^4.0.0       | Peer dependency for React Native styling   |
| `tailwindcss`  | ^4.1.17      | Dev dependency for styling                 |
| `typescript`   | ^5.9.3       | Dev dependency for type safety             |
| `tsup`         | ^8.5.1       | Dev dependency for build tooling           |
| `storybook`    | ^8.6.14      | Dev dependency for component documentation |
| `vitest`       | ^4.0.16      | Dev dependency for testing                 |

### Configuration Changes

| File            | Key       | Change                                           |
| --------------- | --------- | ------------------------------------------------ |
| `package.json`  | `name`    | Set to @template/ui                              |
| `package.json`  | `version` | Set to 0.1.0 (pre-MVP)                           |
| `package.json`  | `exports` | Configured dual format exports (CJS/ESM)         |
| `package.json`  | `scripts` | Added build, dev, test, lint, storybook commands |
| `tsconfig.json` | `paths`   | Configured @/_ alias mapping to ./src/_          |
| `tsconfig.json` | `target`  | Set to ES2020                                    |
| `tsconfig.json` | `jsx`     | Set to react-jsx                                 |

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
