# Contributing to @template/ui

Thank you for your interest in contributing! This document provides guidelines and information for contributors.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Becoming a Contributor

If you'd like to contribute regularly:

1. Open an issue or discussion expressing your interest

2. Describe what you'd like to work on

3. Once approved, you'll be added as a collaborator with write access

### One-off Contributions

For smaller contributions, you can fork the repository and submit a PR.

## Getting Started

1. Clone the repository: `git clone git@github.com:Syntek-Studio/ui_design_template.git`

2. Install dependencies: `npm install`

3. Create a branch: `git checkout -b us###/your-feature-name`

## Development Workflow

### Branch Naming

Use the pattern: `us###/description` (e.g., `us001/add-button-component`)

### Running Development Server

````bash
npm run dev           # Watch mode for building
npm run storybook:web # View components in Storybook
```markdown

### Code Quality

Before committing, ensure:

```bash
npm run check         # Type-check and lint
npm run test          # Run tests
npm run build         # Verify build
```markdown

These run automatically via pre-commit hooks.

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

````

type(scope): Description

Body - What did you do?

Files Changed:

- list files

````

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

## Pull Request Process

1. Ensure all tests pass and the build succeeds

2. Update documentation if needed

3. Fill out the PR template completely

4. Request review from maintainers

5. Address any feedback

### PR Requirements

- All CI checks must pass

- At least one approval required

- Branch must be up to date with target branch

## Component Guidelines

### Web Components

Location: `src/web/components/ComponentName/`

```text
ComponentName/
├── ComponentName.tsx
├── ComponentName.stories.tsx
├── ComponentName.test.tsx
└── index.ts
````

### Mobile Components

Location: `src/mobile/components/ComponentName/`

```text
ComponentName/
├── ComponentName.native.tsx
├── ComponentName.stories.native.tsx
├── ComponentName.test.tsx
└── index.ts
```

### Styling

- Use Tailwind CSS classes via `className`

- Follow existing patterns in the codebase

- Ensure accessibility (WCAG 2.1 AA)

## Testing

- Write tests for all new components

- Aim for meaningful coverage, not just high percentages

- Test accessibility with appropriate tools

## Questions?

Open a [discussion](../../discussions) for questions or ideas.
