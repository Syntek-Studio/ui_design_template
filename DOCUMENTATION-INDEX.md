# Documentation Index

**Last Updated**: 02/01/2026
**Version**: 0.7.1
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

Complete guide to all documentation in the @syntek-studio/ui project.

## Table of Contents

- [Table of Contents](#table-of-contents)

- [Quick Navigation](#quick-navigation)
  - [For New Developers](#for-new-developers)
  - [For Component Development](#for-component-development)
  - [For Design System Work](#for-design-system-work)
  - [For Contributing](#for-contributing)
  - [For Architecture Understanding](#for-architecture-understanding)

- [Complete File Reference](#complete-file-reference)
  - [Root Documentation](#root-documentation)
  - [Source Code Documentation](#source-code-documentation)
  - [Configuration Documentation](#configuration-documentation)
  - [Project Documentation](#project-documentation)

- [Feature Documentation](#feature-documentation)
  - [Installation \& Setup](#installation--setup)
  - [Quick Start](#quick-start)
  - [Components](#components)
  - [Design Tokens](#design-tokens)
  - [Styling](#styling)
  - [Platform Differences](#platform-differences)
  - [Examples](#examples)
  - [Creating Components](#creating-components)
  - [Testing](#testing)
  - [Git \& Contributing](#git--contributing)
  - [Architecture](#architecture)

- [Documentation by Format](#documentation-by-format)
  - [Main Documentation Files (Top-level)](#main-documentation-files-top-level)
  - [Section README Files](#section-readme-files)
  - [Configuration Files](#configuration-files)
  - [Changelog \& Guidelines](#changelog--guidelines)
  - [JSDoc in Source Code](#jsdoc-in-source-code)

- [Documentation Standards](#documentation-standards)

- [Search By Topic](#search-by-topic)
  - [Installation \& Dependencies](#installation--dependencies)
  - [Web Development](#web-development)
  - [Mobile Development](#mobile-development)
  - [Design System](#design-system)
  - [Styling \& CSS](#styling--css)
  - [Component Development](#component-development)
  - [Testing](#testing-1)
  - [Git \& Code Quality](#git--code-quality)
  - [Project Configuration](#project-configuration)

- [Documentation Statistics](#documentation-statistics)

- [Keep Documentation Updated](#keep-documentation-updated)

- [Documentation Maintenance](#documentation-maintenance)

## Quick Navigation

### For New Developers

1. Start with [README.md](README.md) - Project overview and quick start

2. Read [docs/GITGUIDE.md](docs/GITGUIDE.md) - Git and commit conventions

3. Check [src/README.md](src/README.md) - Source code structure

4. Review [.claude/README.md](.claude/README.md) - Project configuration

### For Component Development

1. [src/web/README.md](src/web/README.md) - Web components guide

2. [src/web/components/README.md](src/web/components/README.md) - Component API

3. [src/mobile/README.md](src/mobile/README.md) - Mobile components guide

4. [src/mobile/components/README.md](src/mobile/components/README.md) - Mobile API

### For Design System Work

1. [src/tokens/README.md](src/tokens/README.md) - Token reference

2. [README.md#design-tokens](README.md#design-tokens) - Token usage

3. [src/tokens/colours.ts](src/tokens/colours.ts) - Colour palette

4. [src/tokens/spacing.ts](src/tokens/spacing.ts) - Spacing scale

### For Contributing

1. [docs/GITGUIDE.md](docs/GITGUIDE.md) - Commit and PR guidelines

2. [README.md#contributing](README.md#contributing) - Contributing guide

3. [docs/CHANGELOG.md](docs/CHANGELOG.md) - Change documentation

### For Architecture Understanding

1. [README.md#architecture](README.md#architecture) - System architecture

2. [src/README.md](src/README.md) - Source structure

3. [.claude/CLAUDE.md](.claude/CLAUDE.md) - Technical guidance

---

## Complete File Reference

### Root Documentation

| File                                             | Purpose                                                      |
| ------------------------------------------------ | ------------------------------------------------------------ |
| [README.md](README.md)                           | Main project documentation with installation, usage, and API |
| [DOCUMENTATION-INDEX.md](DOCUMENTATION-INDEX.md) | This navigation guide                                        |

### Source Code Documentation

| File                                                               | Purpose                         |
| ------------------------------------------------------------------ | ------------------------------- |
| [src/README.md](src/README.md)                                     | Main source directory overview  |
| [src/web/README.md](src/web/README.md)                             | Web components documentation    |
| [src/web/components/README.md](src/web/components/README.md)       | Web components API reference    |
| [src/mobile/README.md](src/mobile/README.md)                       | Mobile components documentation |
| [src/mobile/components/README.md](src/mobile/components/README.md) | Mobile components API reference |
| [src/tokens/README.md](src/tokens/README.md)                       | Design tokens documentation     |

### Configuration Documentation

| File                                   | Purpose                     |
| -------------------------------------- | --------------------------- |
| [.claude/README.md](.claude/README.md) | Claude Code configuration   |
| [.claude/CLAUDE.md](.claude/CLAUDE.md) | Project guidance for Claude |

### Project Documentation

| File                                             | Purpose                             |
| ------------------------------------------------ | ----------------------------------- |
| [docs/README.md](docs/README.md)                 | Documentation folder overview       |
| [docs/CHANGELOG.md](docs/CHANGELOG.md)           | Version history and release notes   |
| [docs/GITGUIDE.md](docs/GITGUIDE.md)             | Git workflow and commit conventions |
| [docs/METRICS/README.md](docs/METRICS/README.md) | Self-learning metrics system        |

---

## Feature Documentation

### Installation & Setup

- [README.md#installation](README.md#installation) - Installation instructions

- [README.md#development](README.md#development) - Development setup

### Quick Start

- [README.md#quick-start](README.md#quick-start) - Getting started

- [src/web/components/README.md#usage-examples](src/web/components/README.md#usage-examples) - Web component examples

- [src/mobile/components/README.md#usage-examples](src/mobile/components/README.md#usage-examples) - Mobile component examples

### Components

- [src/web/components/README.md#button-component](src/web/components/README.md#button-component) - Web Button API

- [src/mobile/components/README.md#button-component](src/mobile/components/README.md#button-component) - Mobile Button API

### Design Tokens

- [src/tokens/README.md#colours](src/tokens/README.md#colours) - Colour system

- [src/tokens/README.md#spacing](src/tokens/README.md#spacing) - Spacing scale

- [src/tokens/README.md#typography](src/tokens/README.md#typography) - Typography

- [src/tokens/README.md#breakpoints](src/tokens/README.md#breakpoints) - Responsive breakpoints

- [src/tokens/README.md#shadows](src/tokens/README.md#shadows) - Shadow system

- [src/tokens/README.md#borders](src/tokens/README.md#borders) - Border definitions

### Styling

- [README.md#styling](README.md#styling) - Tailwind CSS and Nativewind

- [src/web/README.md#css-classes](src/web/README.md#css-classes) - Web styling guidelines

- [src/mobile/README.md#styling-guidelines](src/mobile/README.md#styling-guidelines) - Mobile styling guidelines

### Platform Differences

- [README.md#platform-differences](README.md#platform-differences) - Web vs Mobile comparison

- [src/web/README.md#platform-details](src/web/README.md#platform-details) - Web platform details

- [src/mobile/README.md#platform-details](src/mobile/README.md#platform-details) - Mobile platform details

### Examples

- [README.md#examples](README.md#examples) - Login form example

- [src/web/components/README.md#usage-examples](src/web/components/README.md#usage-examples) - Web examples

- [src/mobile/components/README.md#usage-examples](src/mobile/components/README.md#usage-examples) - Mobile examples

### Creating Components

- [src/web/README.md#creating-components](src/web/README.md#creating-components) - Web component creation

- [src/mobile/README.md#creating-components](src/mobile/README.md#creating-components) - Mobile component creation

- [Web component guide](src/web/components/README.md#adding-new-components)
- [Mobile component guide](src/mobile/components/README.md#adding-new-components)

### Testing

- [README.md#storybook](README.md#storybook) - Storybook documentation

- [src/web/components/README.md#testing](src/web/components/README.md#testing) - Web testing

- [src/mobile/components/README.md#testing](src/mobile/components/README.md#testing) - Mobile testing

### Git & Contributing

- [docs/GITGUIDE.md](docs/GITGUIDE.md) - Complete Git workflow

- [docs/CHANGELOG.md](docs/CHANGELOG.md) - Change documentation

- [README.md#contributing](README.md#contributing) - Contributing guidelines

- [README.md#commit-convention](README.md#commit-convention) - Commit format

### Architecture

- [README.md#architecture](README.md#architecture) - System architecture

- [src/README.md#structure](src/README.md#structure) - Source structure

- [.claude/CLAUDE.md#architecture](.claude/CLAUDE.md#architecture) - Technical architecture

---

## Documentation by Format

### Main Documentation Files (Top-level)

- [README.md](README.md) - 600+ lines comprehensive guide

- [DOCUMENTATION-INDEX.md](DOCUMENTATION-INDEX.md) - This file (navigation)

### Section README Files

- [src/README.md](src/README.md)

- [src/web/README.md](src/web/README.md)

- [src/web/components/README.md](src/web/components/README.md)

- [src/mobile/README.md](src/mobile/README.md)

- [src/mobile/components/README.md](src/mobile/components/README.md)

- [src/tokens/README.md](src/tokens/README.md)

- [.claude/README.md](.claude/README.md)

- [docs/README.md](docs/README.md)

### Configuration Files

- [.claude/CLAUDE.md](.claude/CLAUDE.md) - Project configuration

- [postcss.config.mjs](postcss.config.mjs) - PostCSS configuration

- [tsconfig.json](tsconfig.json) - TypeScript configuration

### Changelog & Guidelines

- [docs/CHANGELOG.md](docs/CHANGELOG.md) - Version history

- [docs/GITGUIDE.md](docs/GITGUIDE.md) - Git workflow

- [docs/METRICS/README.md](docs/METRICS/README.md) - Metrics system

### JSDoc in Source Code

- [src/tokens/colours.ts](src/tokens/colours.ts)

- [src/tokens/spacing.ts](src/tokens/spacing.ts)

- [src/tokens/typography.ts](src/tokens/typography.ts)

- [src/tokens/breakpoints.ts](src/tokens/breakpoints.ts)

- [src/tokens/shadows.ts](src/tokens/shadows.ts)

- [src/tokens/borders.ts](src/tokens/borders.ts)

- [src/web/components/Button/Button.tsx](src/web/components/Button/Button.tsx)

- [src/mobile/components/Button/Button.tsx](src/mobile/components/Button/Button.tsx)

---

## Documentation Standards

All documentation follows these standards:

✓ **Filenames**: CAPITALISED with lowercase `.md` extension
✓ **Table of Contents**: Included in all markdown files
✓ **Structure**: Overview, directory tree, files, usage, related sections
✓ **Language**: British English (colour, not color)
✓ **Code Examples**: Practical, tested examples throughout
✓ **Cross-References**: Links between related documentation
✓ **Dates**: Last Updated timestamps on all files
✓ **JSDoc**: TypeScript-style comments in source files

---

## Search By Topic

### Installation & Dependencies

- [README.md#installation](README.md#installation)

- [README.md#development](README.md#development)

### Web Development

- [README.md#web-components](README.md#web-components)

- [src/web/README.md](src/web/README.md)

- [src/web/components/README.md](src/web/components/README.md)

### Mobile Development

- [README.md#mobile-components](README.md#mobile-components)

- [src/mobile/README.md](src/mobile/README.md)

- [src/mobile/components/README.md](src/mobile/components/README.md)

### Design System

- [src/tokens/README.md](src/tokens/README.md)

- [README.md#design-tokens](README.md#design-tokens)

### Styling & CSS

- [README.md#styling](README.md#styling)

- [src/web/README.md#styling-guidelines](src/web/README.md#styling-guidelines)

- [src/mobile/README.md#styling-guidelines](src/mobile/README.md#styling-guidelines)

### Component Development

- [src/web/components/README.md](src/web/components/README.md)

- [src/mobile/components/README.md](src/mobile/components/README.md)

- [README.md#creating-new-components](README.md#creating-new-components)

### Testing

- [README.md#storybook](README.md#storybook)

- [src/web/components/README.md#testing](src/web/components/README.md#testing)

- [src/mobile/components/README.md#testing](src/mobile/components/README.md#testing)

### Git & Code Quality

- [docs/GITGUIDE.md](docs/GITGUIDE.md)

- [docs/CHANGELOG.md](docs/CHANGELOG.md)

- [README.md#commit-convention](README.md#commit-convention)

### Project Configuration

- [.claude/README.md](.claude/README.md)

- [.claude/CLAUDE.md](.claude/CLAUDE.md)

---

## Documentation Statistics

- Total README files: 9

- Total markdown documentation: 8,000+ lines

- Code examples: 50+
- Sections documented: All major folders

- Components documented: Button (web & mobile)

- Tokens documented: 6 types (colours, spacing, typography, breakpoints, shadows, borders)

- JSDoc additions: 8 files

---

## Keep Documentation Updated

When making changes to the project:

1. **Update relevant README**- Update the section README if code structure changes

2.**Update CHANGELOG.md**- Document all changes with proper categories

3.**Add JSDoc**- Comment new components and tokens

4.**Test examples**- Ensure code examples in docs are accurate

5.**Update root README**- If major features are added

6.**Cross-reference**- Link to related documentation

7.**Check dates** - Update "Last Updated" timestamps

---

## Documentation Maintenance

Regular maintenance tasks:

- [ ] Review broken links monthly

- [ ] Update examples when code changes

- [ ] Keep CHANGELOG current

- [ ] Verify code examples work

- [ ] Check for outdated information

- [ ] Update timestamps

- [ ] Ensure consistency across docs

---

**Last Updated:** 29/12/2024

For more information, see the main [README.md](README.md) or [docs/README.md](docs/README.md).
