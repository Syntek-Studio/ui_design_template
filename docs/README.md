# docs/

**Last Updated**: 01/01/2026
**Version**: 0.7.0
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [docs/](#docs)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Directory Tree](#directory-tree)
  - [Documentation Files](#documentation-files)
    - [CHANGELOG.md](#changelogmd)
    - [GITGUIDE.md](#gitguidemd)
    - [METRICS/](#metrics)
  - [Metrics System](#metrics-system)
    - [Key Components](#key-components)
    - [Benefits](#benefits)
    - [Usage](#usage)
  - [Navigation Guide](#navigation-guide)
    - [For Developers Starting Out](#for-developers-starting-out)
    - [For Component Development](#for-component-development)
    - [For Contributing](#for-contributing)
    - [For Understanding Design System](#for-understanding-design-system)
  - [Contributing to Docs](#contributing-to-docs)
    - [Adding Documentation](#adding-documentation)
    - [Updating CHANGELOG](#updating-changelog)
    - [Section README Requirements](#section-readme-requirements)
  - [Documentation Structure](#documentation-structure)
  - [Best Practices](#best-practices)
  - [Related Sections](#related-sections)

---

## Overview

The `docs/` folder contains comprehensive project documentation, guides, and the self-learning metrics system. All developer-facing documentation lives here, organised by category.

This folder is the single source of truth for:

- Developer guides and setup instructions
- API and component documentation
- Architecture and design system information
- Self-learning metrics and performance tracking

---

## Directory Tree

```
docs/
├── README.md                 # This file
├── CHANGELOG.md              # Version history and release notes
├── GITGUIDE.md              # Git workflow and commit conventions
├── METRICS/                 # Self-learning metrics system
│   ├── config.json
│   ├── runs/
│   ├── feedback/
│   ├── optimisations/
│   ├── aggregates/
│   ├── templates/
│   ├── variants/
│   └── README.md
```

---

## Documentation Files

### CHANGELOG.md

Version history and release notes following [Keep a Changelog](https://keepachangelog.com/) format.

**Purpose:**

- Track all changes across versions
- Document new features, fixes, and breaking changes
- Provide release dates and version information

**Structure:**

```
[Unreleased]       # Planned features
[0.2.0] - 22-12-2025    # Released version
[0.1.0] - 24-11-2025    # Previous version
```

**When to Update:**

- After implementing new features
- After fixing bugs
- After deprecating functionality
- Before creating a release

**See:** [CHANGELOG.md](CHANGELOG.md)

### GITGUIDE.md

Comprehensive Git workflow and commit conventions guide.

**Purpose:**

- Explain Conventional Commits format
- Document PR workflow and branch strategy
- Provide Git commands and best practices
- Show commit and PR templates

**Structure:**

- Commit template and definitions
- PR workflow (testing → dev → staging → main)
- Useful Git commands
- Pull request templates with examples

**When to Use:**

- Writing commit messages
- Creating pull requests
- Understanding branch strategy
- Learning Git best practices

**See:** [GITGUIDE.md](GITGUIDE.md)

### METRICS/

Self-learning metrics system for tracking agent performance and optimisations.

**Purpose:**

- Record agent runs and performance data
- Track improvements and optimisations
- Manage A/B testing for prompts
- Store learnings for future work

**See:** [METRICS/README.md](METRICS/README.md)

---

## Metrics System

The `METRICS/` folder implements a self-learning system:

### Key Components

- **config.json** - System configuration and settings
- **runs/** - Recorded agent runs with performance data
- **feedback/** - User feedback on agent outputs
- **optimisations/** - Applied optimisations and learnings
- **aggregates/** - Aggregated statistics and trends
- **templates/** - Reusable prompt templates
- **variants/** - A/B test variants for prompt optimisation

### Benefits

1. **Performance Tracking** - Measure agent effectiveness over time
2. **Continuous Learning** - Apply optimisations based on results
3. **Pattern Recognition** - Identify what works well
4. **Prompt Optimisation** - A/B test different approaches
5. **Knowledge Sharing** - Store learnings for team

### Usage

The metrics system tracks:

- Time taken for different tasks
- Quality of outputs (rated by users)
- Successful vs failed operations
- Common patterns and edge cases
- Improvements in prompt engineering

---

## Navigation Guide

### For Developers Starting Out

1. Read [../README.md](../README.md) - Project overview
2. Check [GITGUIDE.md](GITGUIDE.md) - Git and commit conventions
3. Review [../src/README.md](../src/README.md) - Source structure
4. Explore [CHANGELOG.md](CHANGELOG.md) - Recent changes

### For Component Development

1. Check [../src/web/README.md](../src/web/README.md) - Web components
2. Check [../src/mobile/README.md](../src/mobile/README.md) - Mobile components
3. Review [../src/tokens/README.md](../src/tokens/README.md) - Design tokens
4. See [CHANGELOG.md](CHANGELOG.md) - Recent component changes

### For Contributing

1. Read [GITGUIDE.md](GITGUIDE.md) - Commit and PR guidelines
2. Check [../README.md](../README.md#contributing) - Contributing section
3. Review [CHANGELOG.md](CHANGELOG.md) - Change documentation format
4. Check [../.claude/CLAUDE.md](../.claude/CLAUDE.md) - Project workflow

### For Understanding Design System

1. Read [../src/tokens/README.md](../src/tokens/README.md) - Token system
2. Check [../README.md](../README.md#design-tokens) - Token usage
3. Review specific token files in [../src/tokens/](../src/tokens/)

---

## Contributing to Docs

### Adding Documentation

1. **Create the file** with CAPITALISED name and `.md` extension
2. **Add table of contents** at the top (required)
3. **Use clear headings** with proper hierarchy
4. **Include examples** with code blocks
5. **Link to related docs** in "Related Sections" at bottom
6. **Keep British English** spelling (colour, not color)

### Updating CHANGELOG

When making changes:

1. Add entry under `[Unreleased]` section
2. Use category (Added, Changed, Fixed, etc.)
3. Write clear, concise descriptions
4. Link to PR/issue numbers if applicable

Example:

```markdown
## [Unreleased]

### Added

- New Input component for form handling
- Button loading state support

### Changed

- Updated colour palette for accessibility
- Improved spacing tokens documentation

### Fixed

- Card shadow not rendering on iOS
```

### Section README Requirements

Every significant folder in `src/` should have its own README.md:

- **Location** - Same folder as content
- **Format** - Follows section README template
- **Contents** - Overview, directory tree, files, usage, relationships
- **Examples** - Practical code examples
- **Navigation** - Links to related sections

---

## Documentation Structure

The complete documentation tree:

```
Project Root
├── README.md                    # Main project overview
├── .claude/
│   ├── README.md               # Claude configuration
│   └── CLAUDE.md               # Project guidance
├── src/
│   ├── README.md               # Source overview
│   ├── web/
│   │   ├── README.md
│   │   └── components/
│   │       └── README.md
│   ├── mobile/
│   │   ├── README.md
│   │   └── components/
│   │       └── README.md
│   └── tokens/
│       └── README.md
└── docs/
    ├── README.md               # This file
    ├── CHANGELOG.md            # Release notes
    ├── GITGUIDE.md            # Git workflow
    └── METRICS/               # Self-learning system
        └── README.md
```

---

## Best Practices

1. **Keep it current** - Update docs when code changes
2. **Be specific** - Include exact steps and examples
3. **Link generously** - Connect related documentation
4. **Use code blocks** - Show examples, not just descriptions
5. **Write clearly** - Use simple, direct language
6. **Document assumptions** - Explain prerequisites
7. **Include rationale** - Explain the "why" not just "what"

---

## Related Sections

- [../README.md](../README.md) - Main project documentation
- [../src/](../src/) - Source code with section READMEs
- [../.claude/](../.claude/) - Claude configuration
- [CHANGELOG.md](CHANGELOG.md) - Version history
- [GITGUIDE.md](GITGUIDE.md) - Git workflow guide
- [METRICS/](METRICS/) - Self-learning metrics system

---

**Last Updated:** 22 December 2025
