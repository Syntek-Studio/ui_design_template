# Release Notes

**Last Updated**: 01/01/2026
**Version**: 0.6.0
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Latest Release](#latest-release)
  - [Version 0.6.0 - 01 January 2026](#version-060---01-january-2026)
    - [What's New](#whats-new)
    - [Workflow Automation](#workflow-automation)
- [Previous Releases](#previous-releases)
  - [Version 0.5.1 - 29 December 2024](#version-051---29-december-2024)
    - [What's New](#whats-new-1)
  - [Version 0.5.0 - 29 December 2024](#version-050---29-december-2024)
    - [What's New](#whats-new-2)
  - [Version 0.4.0 - 29 December 2024](#version-040---29-december-2024)
    - [What's New](#whats-new-3)
  - [Version 0.3.0 - 29 December 2024](#version-030---29-december-2024)
    - [What's New](#whats-new-4)
  - [Version 0.2.1 - 29 December 2024](#version-021---29-december-2024)
    - [What's New](#whats-new-5)
  - [Version 0.2.0 - 29 December 2024](#version-020---29-december-2024)
    - [What's New](#whats-new-6)
  - [Version 0.1.1 - 29 December 2024](#version-011---29-december-2024)
    - [What's New](#whats-new-7)
  - [Version 0.1.0 - 29 December 2024](#version-010---29-december-2024)
    - [What's Included](#whats-included)
- [Coming Soon](#coming-soon)
- [Support \& Feedback](#support--feedback)

---

## Latest Release

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

## Previous Releases

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
