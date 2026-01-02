# Release Notes

**Last Updated**: 02/01/2026
**Version**: 0.9.0
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Latest Release](#latest-release)
  - [Version 0.7.2 - 02 January 2026](#version-072---02-january-2026)
    - [What's New](#whats-new)
    - [For Developers](#for-developers)
- [Previous Releases](#previous-releases)
  - [Version 0.7.1 - 02 January 2026](#version-071---02-january-2026)
    - [What's New](#whats-new-1)
    - [For Developers](#for-developers-1)
  - [Version 0.7.0 - 01 January 2026](#version-070---01-january-2026)
    - [What's New](#whats-new-1)
    - [For Developers](#for-developers-1)
    - [Migration Note](#migration-note)
- [Previous Releases](#previous-releases-1)
  - [Version 0.6.0 - 01 January 2026](#version-060---01-january-2026)
    - [What's New](#whats-new-2)
    - [Workflow Automation](#workflow-automation)
  - [Version 0.5.1 - 29 December 2024](#version-051---29-december-2024)
    - [What's New](#whats-new-3)
  - [Version 0.5.0 - 29 December 2024](#version-050---29-december-2024)
    - [What's New](#whats-new-4)
  - [Version 0.4.0 - 29 December 2024](#version-040---29-december-2024)
    - [What's New](#whats-new-5)
  - [Version 0.3.0 - 29 December 2024](#version-030---29-december-2024)
    - [What's New](#whats-new-6)
  - [Version 0.2.1 - 29 December 2024](#version-021---29-december-2024)
    - [What's New](#whats-new-7)
  - [Version 0.2.0 - 29 December 2024](#version-020---29-december-2024)
    - [What's New](#whats-new-8)
  - [Version 0.1.1 - 29 December 2024](#version-011---29-december-2024)
    - [What's New](#whats-new-9)
  - [Version 0.1.0 - 29 December 2024](#version-010---29-december-2024)
    - [What's Included](#whats-included)
- [Coming Soon](#coming-soon)
- [Support \& Feedback](#support--feedback)

---

## Latest Release

### Version 0.9.0 - 02 January 2026

**Automated Template Customisation**

The template initialisation tool now does the heavy lifting for you. After answering a few simple questions, it automatically customises all the files in your project with your package name, client name, and brand colours.

#### What's New

- **Automatic File Updates**: The CLI now updates 15+ files throughout your project automatically, replacing template placeholders with your actual project details. No more manual find-and-replace across multiple files.

- **Smart Placeholder Replacement**: Simply answer the prompts about your project, and the tool intelligently replaces placeholders like `{{PACKAGE_NAME}}`, `{{CLIENT_NAME}}`, and `{{PRIMARY_COLOUR}}` throughout your codebase, including:
  - Package configuration files
  - README and documentation
  - Design token files with your brand colours
  - Component files and examples

- **Safety First**: Before making any changes, the tool creates automatic backups of all files (with `.bak` extension), so you can always restore if needed. It also verifies that all placeholders were successfully replaced before completing.

- **No Re-Runs**: The tool detects if you've already initialised your project and prevents accidental re-initialisation, protecting your customised configuration.

- **Configuration Saved**: Your initialisation settings are saved to a `template.config.json` file for future reference, making it easy to see how your project was configured.

#### For Developers

- This is Phase 2 (Placeholder Replacement Engine) of the 4-phase implementation
- All file operations include automatic backup and rollback capability
- Replacement engine uses regex-safe escaping to handle special characters
- Verification step ensures no placeholders remain in output files
- No changes to the component library itself - this is a development tool for template setup

---

## Previous Releases

### Version 0.8.0 - 02 January 2026

**Interactive Template Initialisation CLI**

We've implemented the first phase of an interactive command-line tool to help you quickly set up client-specific UI component libraries.

#### What's New

- **Interactive Setup Wizard**: Run `npm run init-template` to start an interactive setup process that guides you through configuring your new component library with prompts for package name, scope, description, client name, and primary brand colour.

- **Smart Validation**: The CLI validates all your inputs in real-time, ensuring package names follow npm conventions, colour codes are valid hex values, and descriptions meet length requirements.

- **User-Friendly Experience**: Features a welcoming branded interface with clear instructions, helpful error messages, and a confirmation step to review your choices before proceeding.

- **TypeScript-Powered**: Built with TypeScript for robust type safety and comprehensive JSDoc documentation for all functions.

#### For Developers

- This is Phase 1 (Core CLI Infrastructure) of a 4-phase implementation
- All input validation functions are fully tested and documented
- The CLI uses inquirer.js for professional interactive prompts
- Future phases will add file replacement, conflict detection, and comprehensive testing
- No changes to the component library itself - this is a development tool for template initialisation

---

## Previous Releases

### Version 0.7.2 - 02 January 2026

**Template Initialisation Testing Framework**

We've begun implementing a template initialisation CLI tool using Test-Driven Development (TDD) methodology.

#### What's New

- **Comprehensive Test Suite**: Added 154 tests that define the expected behaviour for the template initialisation CLI
  tool. These tests currently fail intentionally as part of the TDD RED phase.

- **Test Documentation**: Created detailed test plans, manual testing guides, and architectural documentation to guide
  the implementation process.

- **Testing Framework**: Configured Vitest for running unit tests with comprehensive test coverage reporting.

#### For Developers

- Tests cover four key areas: input validation, string replacements, file operations, and end-to-end initialisation
- Implementation stubs are in place, throwing "Not implemented" errors to ensure tests fail correctly
- This follows TDD RED phase - next steps are GREEN (implementation) and REFACTOR phases
- No changes to the library functionality - this is development infrastructure only

---

## Previous Releases

### Version 0.7.1 - 02 January 2026

**Documentation Quality Improvements**

We've improved the quality and consistency of all documentation across the project.

#### What's New

- **Improved Documentation Readability**: All 99 markdown files have been updated with consistent formatting, proper
  heading spacing, and standardised line lengths for better readability.

- **Enhanced Code Examples**: All code blocks now include proper language identifiers for improved syntax highlighting
  in documentation viewers.

- **Better Link Navigation**: Fixed over 600 broken reference links in CHANGELOG.md and VERSION-HISTORY.md, ensuring
  all version references work correctly.

- **Linting Configuration**: Added `.markdownlint.json` and `.remarkrc.json` configuration files to maintain
  documentation quality going forward.

#### For Developers

- All markdown files now pass markdownlint and remark-lint validation
- Consistent 120 character line length across all documentation
- Proper heading hierarchy maintained throughout
- No functional changes to the library itself

---

## Previous Releases

### Version 0.7.0 - 01 January 2026

**Enhanced Developer Experience & Security**

We've significantly improved the development workflow with comprehensive CI/CD infrastructure, automated security
scanning, and quality assurance tooling.

#### What's New

**Automated Quality Checks**
Every code change now goes through automatic validation:

- Code formatting and style checks

- TypeScript type validation

- Automated testing

- Build verification

**Security First**
Your code is now protected by multiple layers of security scanning:

- Automatic vulnerability detection in dependencies

- Weekly security updates via Dependabot

- Static code analysis for security issues

- Pre-commit hooks prevent common mistakes

**Streamlined Contributions**
Contributing to the project is now easier than ever:

- Clear contributing guidelines

- Issue templates for bugs and features

- Pull request templates for consistent reviews

- Code of Conduct for a welcoming community

**Package Update**
The package has been renamed from `@template/ui` to `@syntek-studio/ui` to better reflect the project identity.

#### For Developers

**Pre-Commit Hooks**
Your local commits now automatically check:

- TypeScript compilation

- ESLint rules

- Prettier formatting

**VS Code Integration**
Enhanced editor settings provide:

- Automatic formatting on save

- Consistent TypeScript configuration

- Better IntelliSense support

#### Migration Note

If you're using this library, update your imports:

```typescript
// Old
import { Button } from '@template/ui'

// New
import { Button } from '@syntek-studio/ui'
```

---

## Previous Releases

### Version 0.6.0 - 01 January 2026

**Project Management Integration**

We've added comprehensive ClickUp integration for seamless project management and workflow automation.

#### What's New

- **ClickUp Sync**: Bidirectional synchronisation between GitHub and ClickUp

- **Automatic Status Updates**: Branch pushes and PR events automatically update ClickUp task status

- **Sprint Planning**: 23 comprehensive sprint documents to guide development

- **User Stories**: 39 detailed user stories with acceptance criteria

- **PM Documentation**: Setup guides and troubleshooting documentation

#### Workflow Automation

| GitHub Event                    | ClickUp Status    |
| ------------------------------- | ----------------- |
| Branch `us###/*` pushed         | In Progress       |
| PR opened to `testing` or `dev` | In Review         |
| PR merged to `staging`          | Accepted          |
| PR merged to `main`             | Accepted Customer |

---

### Version 0.5.1 - 29 December 2024

**Documentation Overhaul**

We've completely refreshed all documentation across the project to make it easier to navigate and maintain.

#### What's New

- **Standardised Headers**: Every documentation file now includes consistent metadata (version, date, maintainer)

- **Better Organisation**: Added architectural planning documentation in `docs/PLANS/`

- **Improved Guides**: Enhanced README files for all components and tokens

- **British English**: Consistent language conventions throughout

---

### Version 0.5.0 - 29 December 2024

**Component Utilities**

New utility functions make component development faster and more consistent.

#### What's New

- **Utility Library**: New `src/utils/` folder with helper functions

- **Enhanced Buttons**: Both web and mobile Button components improved

- **Better Types**: Improved TypeScript definitions throughout

---

### Version 0.4.0 - 29 December 2024

**Type System Enhancement**

Full TypeScript support for all design tokens.

#### What's New

- **Design Token Types**: All tokens now have comprehensive TypeScript definitions

- **CSS Types**: New type definitions for styling

- **Better Autocomplete**: Your IDE will now suggest token values as you type

---

### Version 0.3.0 - 29 December 2024

**Storybook Improvements**

Enhanced component documentation with TypeScript support.

#### What's New

- **TypeScript Config**: Storybook now uses TypeScript throughout

- **Better Documentation**: Added comprehensive Storybook guide

- **Improved Preview**: Migrated preview configuration to TypeScript

---

### Version 0.2.1 - 29 December 2024

**Package Update**

Package configuration and dependency updates.

#### What's New

- **Package Renamed**: Changed from `@syntek/ui` to `@template/ui`

- **Updated Dependencies**: All packages updated to latest versions

---

### Version 0.2.0 - 29 December 2024

**Version Management**

Introduction of comprehensive version tracking.

#### What's New

- **VERSION-HISTORY.md**: Technical change log for developers

- **CHANGELOG.md**: Brief developer-focused summary

- **RELEASES.md**: User-facing release notes (this file!)

---

### Version 0.1.1 - 29 December 2024

**Project Configuration**

Tooling setup for consistent development experience.

#### What's New

- **EditorConfig**: Consistent formatting across all editors

- **Prettier**: Automated code formatting

- **Git Attributes**: Better line ending handling

- **TypeScript**: Stricter type checking enabled

---

### Version 0.1.0 - 29 December 2024

**Initial Release**

Welcome to the first release of **@template/ui**!

#### What's Included

**Cross-Platform Components**

- Button component for web and mobile

- Consistent API across platforms

**Design System**

- Colour palette with primary, secondary, and semantic colours

- Spacing scale (4px grid system)

- Typography tokens

- Responsive breakpoints

- Shadow and border definitions

**Developer Experience**

- Full TypeScript support

- Tailwind CSS 4 for web styling

- Nativewind 4 for React Native

- Storybook for component documentation

**Getting Started**

```typescript
// Web
import { Button } from '@template/ui'

// Mobile
import { Mobile } from '@template/ui'
```

---

## Coming Soon

In upcoming releases:

**New Components**

- Card component

- Input component

- Modal component

- Navigation components

**Features**

- Dark mode theme support

- Animation presets

- Enhanced accessibility

**Developer Experience**

- More Storybook examples

- Performance guides

- Migration documentation

---

## Support & Feedback

Questions or issues?

- Open an issue on our repository

- Check documentation in the `docs/` folder

- Review component examples in Storybook

---

**Note:** This library is in pre-release (0.x.x). Some breaking changes may occur before version 1.0.0.

Thank you for using @template/ui!
