# Feature: Template Repository for Shared UI Design System

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Requirements](#requirements)
  - [Functional Requirements](#functional-requirements)
  - [Non-Functional Requirements](#non-functional-requirements)
- [Technical Design](#technical-design)
  - [1. Template Structure](#1-template-structure)
  - [2. Theme Configuration System](#2-theme-configuration-system)
    - [theme.config.ts Structure](#themeconfigts-structure)
  - [3. Token Generation System](#3-token-generation-system)
    - [scripts/generate-tokens.js](#scriptsgenerate-tokensjs)
  - [4. Template Initialisation System](#4-template-initialisation-system)
    - [scripts/init-template.js (Interactive CLI)](#scriptsinit-templatejs-interactive-cli)
  - [5. Component Architecture](#5-component-architecture)
    - [Base Component Pattern](#base-component-pattern)
  - [6. Build System](#6-build-system)
    - [Multi-Format Output](#multi-format-output)
    - [Publishing Workflow](#publishing-workflow)
  - [7. Testing Strategy](#7-testing-strategy)
    - [Unit Tests (Vitest)](#unit-tests-vitest)
    - [Accessibility Tests](#accessibility-tests)
  - [8. Documentation System](#8-documentation-system)
    - [Auto-Generated Component Docs](#auto-generated-component-docs)
    - [Storybook Integration](#storybook-integration)
  - [9. CI/CD Pipeline](#9-cicd-pipeline)
    - [GitHub Actions Workflows](#github-actions-workflows)
- [Implementation Phases](#implementation-phases)
  - [Phase 1: Template Infrastructure (Foundation)](#phase-1-template-infrastructure-foundation)
    - [Tasks](#tasks)
  - [Phase 2: Theme Configuration System (Design Tokens)](#phase-2-theme-configuration-system-design-tokens)
    - [Tasks](#tasks-1)
  - [Phase 3: Component Theming Integration (Dynamic Styling)](#phase-3-component-theming-integration-dynamic-styling)
    - [Tasks](#tasks-2)
  - [Phase 4: Build \& Publishing Pipeline (Deployment)](#phase-4-build--publishing-pipeline-deployment)
    - [Tasks](#tasks-3)
  - [Phase 5: Documentation \& Storybook (Developer Experience)](#phase-5-documentation--storybook-developer-experience)
    - [Tasks](#tasks-4)
  - [Phase 6: Testing Framework (Quality Assurance)](#phase-6-testing-framework-quality-assurance)
    - [Tasks](#tasks-5)
  - [Phase 7: Advanced Features \& Polish (Enhancement)](#phase-7-advanced-features--polish-enhancement)
    - [Tasks](#tasks-6)
- [Risks \& Mitigations](#risks--mitigations)
- [Open Questions](#open-questions)
  - [Critical (Need Answers Before Implementation)](#critical-need-answers-before-implementation)
  - [Important (Nice to Clarify)](#important-nice-to-clarify)
- [Success Criteria](#success-criteria)
  - [Must Have (Phase 1-4)](#must-have-phase-1-4)
  - [Should Have (Phase 5-6)](#should-have-phase-5-6)
  - [Nice to Have (Phase 7)](#nice-to-have-phase-7)
- [Dependencies \& Prerequisites](#dependencies--prerequisites)
  - [External Dependencies](#external-dependencies)
  - [Internal Dependencies](#internal-dependencies)
  - [Technical Skills Required](#technical-skills-required)
- [Timeline Estimate](#timeline-estimate)
- [Next Steps](#next-steps)
- [Appendix](#appendix)
  - [A. Example Theme Configurations](#a-example-theme-configurations)
  - [B. Token Generation Algorithm (Colour Shades)](#b-token-generation-algorithm-colour-shades)
  - [C. Placeholder Syntax](#c-placeholder-syntax)

## Overview

Transform the existing @syntek-studio/ui library into a reusable template repository that enables rapid creation of client-specific UI design systems. This template will allow teams to clone, customise branding/theming, and deploy client-specific component libraries within hours rather than weeks.

## Requirements

### Functional Requirements

1. **Template Initialisation**
   - Interactive CLI tool to scaffold a new client project from template
   - Automated replacement of package name, scope, and metadata
   - Git history reset with clean initial commit
   - Environment-specific configuration setup

2. **Design Token Customisation**
   - Centralised theme configuration file (e.g., `theme.config.ts`)
   - Automated token generation from theme config
   - Support for client-specific:
     - Brand colours (primary, secondary, tertiary)
     - Typography (font families, sizes, weights)
     - Spacing scales
     - Border radius and shadows
     - Breakpoints
   - Dark mode and theme variants support

3. **Component Variants**
   - Base component implementations that consume design tokens
   - Easy customisation of component defaults per client
   - Component-level theming overrides
   - Consistent API across web and mobile

4. **Build and Publishing**
   - Pre-configured build pipeline for npm publishing
   - Versioning strategy with semantic versioning
   - Automated changelog generation
   - CI/CD templates for GitHub Actions
   - Pre-commit hooks for quality assurance

5. **Documentation**
   - Auto-generated component documentation from TypeScript types
   - Storybook configuration for both web and mobile
   - Template usage guide
   - Contribution guidelines
   - Architecture decision records (ADRs)

6. **Testing Framework**
   - Unit test setup with Vitest
   - Component testing patterns
   - Visual regression testing setup (Chromatic/Percy)
   - Accessibility testing (jest-axe)
   - Cross-platform testing utilities

### Non-Functional Requirements

1. **Performance**
   - Tree-shakeable exports for minimal bundle size
   - Lazy loading support for components
   - Build time < 30 seconds for full library
   - Storybook build time < 2 minutes

2. **Developer Experience**
   - Hot module replacement in dev mode
   - TypeScript strict mode with comprehensive types
   - ESLint and Prettier configuration
   - Clear error messages and warnings
   - IntelliSense support for all tokens and components

3. **Maintainability**
   - Modular architecture with clear separation of concerns
   - Consistent code patterns and conventions
   - Automated dependency updates (Dependabot/Renovate)
   - Comprehensive inline documentation

4. **Accessibility**
   - WCAG 2.1 Level AA compliance
   - Keyboard navigation support
   - Screen reader compatibility
   - High contrast mode support

## Technical Design

### 1. Template Structure

```
template-root/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # Continuous integration
│   │   ├── release.yml               # Automated releases
│   │   └── storybook-deploy.yml      # Storybook deployment
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
├── .claude/
│   └── CLAUDE.md                      # AI assistant instructions (template)
├── docs/
│   ├── PLANS/                         # Implementation plans
│   ├── GUIDES/
│   │   ├── SETUP.md                  # Project setup guide
│   │   ├── CONTRIBUTING.md           # Contribution guide
│   │   ├── THEMING.md                # Theme customisation guide
│   │   ├── PUBLISHING.md             # Publishing workflow
│   │   └── MIGRATION.md              # Migration from template
│   ├── ADR/                          # Architecture decision records
│   │   ├── 001-design-tokens.md
│   │   ├── 002-component-api.md
│   │   └── 003-build-system.md
│   ├── ARCHITECTURE.md
│   ├── COMPONENTS.md
│   ├── TOKENS.md
│   ├── CHANGELOG.md
│   └── README.md
├── scripts/
│   ├── init-template.js              # Template initialisation CLI
│   ├── generate-tokens.js            # Token generation from theme config
│   ├── generate-docs.js              # Auto-generate component docs
│   └── validate-tokens.js            # Token validation
├── src/
│   ├── config/
│   │   ├── theme.config.ts           # MAIN THEME CONFIGURATION
│   │   ├── component-defaults.ts     # Default component props
│   │   └── platform-overrides.ts     # Platform-specific overrides
│   ├── tokens/
│   │   ├── generated/                # Auto-generated from theme.config.ts
│   │   │   ├── colours.ts
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   ├── shadows.ts
│   │   │   ├── borders.ts
│   │   │   └── breakpoints.ts
│   │   └── index.ts                  # Re-exports
│   ├── web/
│   │   ├── components/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── Button.stories.tsx
│   │   │   │   ├── Button.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── hooks/                    # Shared web hooks
│   ├── mobile/
│   │   ├── components/
│   │   │   ├── Button/
│   │   │   │   ├── Button.native.tsx
│   │   │   │   ├── Button.test.native.tsx
│   │   │   │   ├── Button.stories.native.tsx
│   │   │   │   ├── Button.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── hooks/                    # Shared mobile hooks
│   ├── shared/
│   │   ├── utils/                    # Cross-platform utilities
│   │   ├── hooks/                    # Shared hooks
│   │   └── types/                    # Shared TypeScript types
│   └── index.ts
├── .storybook-web/
│   ├── main.ts
│   ├── preview.ts
│   └── theme.ts                      # Storybook theme config
├── .storybook-mobile/                # React Native Storybook config
│   ├── main.ts
│   └── preview.ts
├── template.config.json              # Template metadata
├── package.template.json             # Package.json template with placeholders
├── .eslintrc.js
├── .prettierrc
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.ts
└── README.template.md                # README with placeholders
```

### 2. Theme Configuration System

**Core concept:** Single source of truth (`theme.config.ts`) that generates all design tokens.

#### theme.config.ts Structure

```typescript
export const themeConfig = {
  // Package metadata (replaced during init)
  package: {
    name: '@client/ui',
    scope: '@client',
    displayName: 'Client UI Library',
    description: 'Shared UI component library for Client applications',
    author: 'Client Team',
    repository: 'https://github.com/client/ui',
  },

  // Brand identity
  brand: {
    primary: {
      base: '#3b82f6', // Auto-generates 50-900 shades
      contrast: '#ffffff', // Text colour on primary background
    },
    secondary: {
      base: '#a855f7',
      contrast: '#ffffff',
    },
    // Optional tertiary, quaternary, etc.
  },

  // Semantic colours
  semantic: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Typography
  typography: {
    fontFamilies: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['Fira Code', 'monospace'],
    },
    fontSizeScale: 'minor-third', // or custom scale
    baseFontSize: 16,
    baseLineHeight: 1.5,
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },

  // Spacing system
  spacing: {
    baseUnit: 4, // 4px base
    scale: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96],
  },

  // Border radius
  borderRadius: {
    none: 0,
    sm: 2,
    base: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    full: 9999,
  },

  // Shadows
  shadows: {
    // Can be custom or use preset shadows
    preset: 'tailwind', // or 'material', 'custom'
  },

  // Breakpoints
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },

  // Component defaults (optional per-component customisation)
  components: {
    Button: {
      defaultVariant: 'primary',
      borderRadius: 'base',
      paddingX: 4,
      paddingY: 2,
    },
    Input: {
      borderRadius: 'base',
      paddingX: 3,
      paddingY: 2,
    },
  },

  // Platform-specific overrides
  platforms: {
    mobile: {
      // Mobile-specific adjustments
      typography: {
        baseFontSize: 14, // Smaller for mobile
      },
    },
  },

  // Theme variants (optional)
  variants: {
    dark: {
      enabled: true,
      semantic: {
        // Dark mode colour overrides
      },
    },
  },
}

export type ThemeConfig = typeof themeConfig
```

### 3. Token Generation System

**Automated token generation** from theme config using scripts.

#### scripts/generate-tokens.js

- Reads `theme.config.ts`
- Generates colour shades (50-900) from base colours using colour theory
- Creates TypeScript files in `src/tokens/generated/`
- Validates token consistency
- Updates exports in `src/tokens/index.ts`

**Features:**

- Colour shade generation using tinycolor2 or similar
- Modular scale calculation for typography
- Spacing scale generation
- Type-safe token exports
- Validation against WCAG colour contrast requirements

### 4. Template Initialisation System

#### scripts/init-template.js (Interactive CLI)

```bash
npm run init-template
# or
npx @tempalte/create-ui-template
```

**Workflow:**

1. Prompt for client information:
   - Package name (e.g., `@acme/ui`)
   - Display name (e.g., `Acme UI`)
   - Author
   - Repository URL
   - License

2. Prompt for theme basics:
   - Primary brand colour
   - Secondary brand colour
   - Font family preferences
   - Use preset theme or custom

3. Execute replacements:
   - Replace placeholders in `package.template.json` → `package.json`
   - Replace placeholders in `README.template.md` → `README.md`
   - Update `theme.config.ts` with provided values
   - Update `.claude/CLAUDE.md` with package name

4. Generate initial tokens:
   - Run `scripts/generate-tokens.js`
   - Create initial design token files

5. Git setup:
   - Remove template's git history
   - Initialize new repository
   - Create initial commit
   - Setup branch structure (main, dev, staging)

6. Install dependencies:
   - Run `npm install`
   - Setup git hooks (husky)

7. Verification:
   - Run `npm run type-check`
   - Run `npm run build`
   - Run `npm run test`

8. Success output:
   - Print next steps
   - Guide to customising theme
   - Guide to adding components
   - Link to documentation

### 5. Component Architecture

#### Base Component Pattern

All components follow a consistent pattern:

```typescript
// Button.types.ts
export interface BaseButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export interface WebButtonProps extends BaseButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface MobileButtonProps extends BaseButtonProps {
  onPress?: () => void;
  testID?: string;
}

// Button.tsx (Web)
import { WebButtonProps } from './Button.types';
import { getComponentDefaults } from '@/config/component-defaults';
import { colours } from '@/tokens';

export const Button: React.FC<WebButtonProps> = ({
  title,
  variant = getComponentDefaults('Button').defaultVariant,
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  type = 'button',
}) => {
  const variantStyles = {
    primary: `bg-[${colours.primary[500]}] text-white hover:opacity-90`,
    secondary: `bg-[${colours.secondary[500]}] text-white hover:opacity-90`,
    // ... other variants
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'px-4 py-2 rounded transition-all',
        variantStyles[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {title}
    </button>
  );
};
```

### 6. Build System

#### Multi-Format Output

**tsup.config.ts** generates:

- CommonJS (`dist/index.js`)
- ESM (`dist/index.mjs`)
- TypeScript declarations (`dist/index.d.ts`)

**Tree-shaking friendly:**

- Named exports for all components
- Side-effect free modules
- Proper package.json `exports` field

#### Publishing Workflow

1. Version bump (semantic versioning)
2. Update CHANGELOG.md
3. Run tests and build
4. Publish to npm
5. Create GitHub release
6. Deploy Storybook to GitHub Pages

### 7. Testing Strategy

#### Unit Tests (Vitest)

```typescript
// Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with title', () => {
    render(<Button title="Click me" />);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button title="Click" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant styles correctly', () => {
    render(<Button title="Primary" variant="primary" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[#3b82f6]');
  });
});
```

#### Accessibility Tests

```typescript
import { axe } from 'jest-axe';

it('has no accessibility violations', async () => {
  const { container } = render(<Button title="Accessible" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 8. Documentation System

#### Auto-Generated Component Docs

**scripts/generate-docs.js:**

- Parse TypeScript types from component files
- Extract JSDoc comments
- Generate markdown documentation
- Update `docs/COMPONENTS.md`

#### Storybook Integration

- Stories co-located with components
- Controls for all props
- Auto-generated args table from TypeScript
- Accessibility addon enabled
- Dark mode toggle

### 9. CI/CD Pipeline

#### GitHub Actions Workflows

**ci.yml:**

- Runs on every push and PR
- Lint, type-check, test
- Build library
- Comment test coverage on PR

**release.yml:**

- Triggered by version tag (e.g., `v1.2.3`)
- Build and publish to npm
- Create GitHub release
- Generate changelog

**storybook-deploy.yml:**

- Deploy Storybook to GitHub Pages
- Run visual regression tests (Chromatic)

## Implementation Phases

### Phase 1: Template Infrastructure (Foundation)

**Goal:** Establish the core template structure and initialisation system.

#### Tasks

- [ ] Create template directory structure
  - [ ] Setup `scripts/` folder
  - [ ] Create `docs/PLANS/`, `docs/GUIDES/`, `docs/ADR/` folders
  - [ ] Setup `.github/workflows/` templates
  - [ ] Create `src/config/` folder

- [ ] Implement `template.config.json` schema
  - [ ] Define metadata structure
  - [ ] Document placeholder syntax
  - [ ] Create validation schema

- [ ] Build `scripts/init-template.js` CLI
  - [ ] Interactive prompts using `inquirer`
  - [ ] Placeholder replacement engine
  - [ ] Git history reset functionality
  - [ ] Dependency installation
  - [ ] Verification steps

- [ ] Create `package.template.json`
  - [ ] Add placeholders for name, scope, description, author
  - [ ] Define scripts for all workflows
  - [ ] Configure peerDependencies

- [ ] Create `README.template.md`
  - [ ] Add placeholders for package name and metadata
  - [ ] Include template usage instructions
  - [ ] Document customisation steps

- [ ] Setup `.claude/CLAUDE.md` template
  - [ ] Add placeholders for project name
  - [ ] Document architecture patterns
  - [ ] Include agent workflow recommendations

**Deliverable:** Template can be cloned and initialised with custom package name and basic metadata. Running `npm run init-template` creates a new project with correct naming throughout.

**Testing:**

- Manual: Clone template and run init script
- Verify all placeholders are replaced
- Verify git history is reset
- Verify package installs and builds successfully

---

### Phase 2: Theme Configuration System (Design Tokens)

**Goal:** Implement centralised theme configuration and automated token generation.

#### Tasks

- [ ] Design `theme.config.ts` schema
  - [ ] Define brand colour structure
  - [ ] Define typography system
  - [ ] Define spacing, borders, shadows
  - [ ] Define component defaults
  - [ ] Define theme variants (dark mode)
  - [ ] Add TypeScript types for theme config

- [ ] Implement `scripts/generate-tokens.js`
  - [ ] Parse `theme.config.ts`
  - [ ] Generate colour shades (50-900) from base colours using colour algorithms
  - [ ] Generate typography scale from base size and scale ratio
  - [ ] Generate spacing scale
  - [ ] Create TypeScript files in `src/tokens/generated/`
  - [ ] Update `src/tokens/index.ts` exports

- [ ] Add colour shade generation
  - [ ] Use `tinycolor2` for colour manipulation
  - [ ] Generate accessible colour palettes
  - [ ] Validate WCAG contrast ratios

- [ ] Add typography scale generation
  - [ ] Support modular scale (minor third, major third, etc.)
  - [ ] Generate font size and line height pairs
  - [ ] Apply platform-specific adjustments

- [ ] Implement `scripts/validate-tokens.js`
  - [ ] Check colour contrast accessibility
  - [ ] Validate spacing consistency
  - [ ] Ensure all required tokens are present
  - [ ] Output validation report

- [ ] Migrate existing tokens to generated system
  - [ ] Move current `src/tokens/*.ts` to reference implementation
  - [ ] Create default `theme.config.ts` with current values
  - [ ] Generate tokens and verify output matches current
  - [ ] Update imports across components

- [ ] Document theming system
  - [ ] Create `docs/GUIDES/THEMING.md`
  - [ ] Add examples of common customisations
  - [ ] Document colour shade algorithm
  - [ ] Explain typography scale options

**Deliverable:** Developers can customise `theme.config.ts` and run `npm run generate-tokens` to automatically create all design token files. Tokens are type-safe and validated for accessibility.

**Testing:**

- Generate tokens from sample theme configs
- Verify colour shades have proper contrast
- Verify typography scales are mathematically correct
- Test token validation catches errors

---

### Phase 3: Component Theming Integration (Dynamic Styling)

**Goal:** Refactor components to consume generated design tokens and support theme customisation.

#### Tasks

- [ ] Create `src/config/component-defaults.ts`
  - [ ] Define default props for each component
  - [ ] Source defaults from `theme.config.ts`
  - [ ] Export `getComponentDefaults()` utility

- [ ] Create `src/config/platform-overrides.ts`
  - [ ] Define mobile-specific overrides
  - [ ] Apply platform-specific token adjustments
  - [ ] Export platform detection utilities

- [ ] Refactor Button component
  - [ ] Use generated colour tokens
  - [ ] Apply component defaults from config
  - [ ] Support theme variants
  - [ ] Update web and mobile versions
  - [ ] Update stories to show all variants

- [ ] Create component theming utilities
  - [ ] `src/shared/utils/theme.ts`
  - [ ] Helper: `getVariantStyles(component, variant)`
  - [ ] Helper: `applyThemeClasses(baseClasses, theme)`
  - [ ] Helper: `cn()` (class name merger)

- [ ] Document component theming
  - [ ] Add JSDoc to themed components
  - [ ] Create examples in Storybook
  - [ ] Update `docs/COMPONENTS.md`

- [ ] Add dark mode support
  - [ ] Create dark variant tokens
  - [ ] Implement theme switching hook
  - [ ] Add dark mode stories
  - [ ] Document dark mode usage

**Deliverable:** Components automatically adapt to theme configuration. Changing brand colours in `theme.config.ts` updates all components. Dark mode toggle works across all components.

**Testing:**

- Change theme config and verify component appearance updates
- Test dark mode variants render correctly
- Verify platform-specific overrides apply on mobile
- Test component defaults from config

---

### Phase 4: Build & Publishing Pipeline (Deployment)

**Goal:** Setup automated build, versioning, and publishing workflows.

#### Tasks

- [ ] Enhance tsup configuration
  - [ ] Optimize bundle splitting
  - [ ] Enable tree-shaking
  - [ ] Configure source maps
  - [ ] Add bundle size analysis

- [ ] Create versioning scripts
  - [ ] `scripts/version.js` - Interactive version bumping
  - [ ] Support semantic versioning (major, minor, patch)
  - [ ] Auto-update CHANGELOG.md
  - [ ] Create git tags

- [ ] Setup GitHub Actions CI
  - [ ] `.github/workflows/ci.yml`
  - [ ] Lint, type-check, test on every push
  - [ ] Build verification
  - [ ] Test coverage reporting
  - [ ] PR comments with results

- [ ] Setup GitHub Actions Release
  - [ ] `.github/workflows/release.yml`
  - [ ] Trigger on version tags (v\*)
  - [ ] Build library
  - [ ] Publish to npm (with provenance)
  - [ ] Create GitHub release with changelog
  - [ ] Deploy Storybook

- [ ] Configure npm publishing
  - [ ] Setup npm authentication
  - [ ] Configure package.json `publishConfig`
  - [ ] Add `.npmignore`
  - [ ] Test dry-run publish

- [ ] Setup pre-commit hooks
  - [ ] Install and configure Husky
  - [ ] Add lint-staged for formatting
  - [ ] Run type-check before commit
  - [ ] Validate commit message format

- [ ] Document publishing workflow
  - [ ] Create `docs/GUIDES/PUBLISHING.md`
  - [ ] Document versioning strategy
  - [ ] Explain release process
  - [ ] Add troubleshooting guide

**Deliverable:** Pushing a version tag (e.g., `v1.0.0`) automatically builds, tests, publishes to npm, and creates a GitHub release. Pre-commit hooks ensure code quality.

**Testing:**

- Test version bumping script
- Dry-run npm publish
- Test CI pipeline with sample PR
- Verify release workflow with test tag

---

### Phase 5: Documentation & Storybook (Developer Experience)

**Goal:** Provide comprehensive documentation and interactive component playground.

#### Tasks

- [ ] Implement `scripts/generate-docs.js`
  - [ ] Parse TypeScript component types
  - [ ] Extract JSDoc comments
  - [ ] Generate props tables
  - [ ] Create markdown for `docs/COMPONENTS.md`
  - [ ] Auto-run on component changes (watch mode)

- [ ] Enhance Storybook configuration
  - [ ] Apply theme tokens to Storybook UI
  - [ ] Add custom branding
  - [ ] Enable accessibility addon
  - [ ] Add dark mode toggle
  - [ ] Configure viewport addon for mobile testing

- [ ] Create component story templates
  - [ ] Standardize story structure
  - [ ] Add comprehensive controls
  - [ ] Include accessibility tests in stories
  - [ ] Add usage examples

- [ ] Write comprehensive guides
  - [ ] `docs/GUIDES/SETUP.md` - Getting started
  - [ ] `docs/GUIDES/CONTRIBUTING.md` - Contribution workflow
  - [ ] `docs/GUIDES/THEMING.md` - Theme customisation (from Phase 2)
  - [ ] `docs/GUIDES/PUBLISHING.md` - Publishing workflow (from Phase 4)
  - [ ] `docs/GUIDES/MIGRATION.md` - Migrating from template
  - [ ] `docs/GUIDES/TESTING.md` - Testing components

- [ ] Create Architecture Decision Records
  - [ ] `docs/ADR/001-design-tokens.md`
  - [ ] `docs/ADR/002-component-api.md`
  - [ ] `docs/ADR/003-build-system.md`
  - [ ] `docs/ADR/004-mono-repo-vs-multi-repo.md`
  - [ ] `docs/ADR/005-styling-approach.md`

- [ ] Setup Storybook deployment
  - [ ] Configure GitHub Pages
  - [ ] Add deployment step to release workflow
  - [ ] Setup custom domain (optional)
  - [ ] Add Chromatic integration for visual regression

- [ ] Create DOCUMENTATION-INDEX.md
  - [ ] Catalog all documentation files
  - [ ] Add descriptions for each doc
  - [ ] Organize by category
  - [ ] Include quick links

**Deliverable:** Developers have access to interactive Storybook with all components, comprehensive guides for all workflows, and auto-generated API documentation. Storybook is deployed and publicly accessible.

**Testing:**

- Generate docs from components and verify accuracy
- Review all guide documentation for completeness
- Test Storybook with all components
- Verify Storybook deploys successfully

---

### Phase 6: Testing Framework (Quality Assurance)

**Goal:** Establish comprehensive testing coverage for components and utilities.

#### Tasks

- [ ] Configure Vitest thoroughly
  - [ ] Setup test environment (jsdom for web, react-native for mobile)
  - [ ] Configure coverage thresholds
  - [ ] Setup test utilities and helpers
  - [ ] Add test scripts to package.json

- [ ] Create testing utilities
  - [ ] `src/shared/test-utils.tsx` - Custom render functions
  - [ ] Theme provider wrapper for tests
  - [ ] Mock utilities for platform-specific code
  - [ ] Accessibility testing helpers

- [ ] Write component test suite templates
  - [ ] Basic rendering tests
  - [ ] Props validation tests
  - [ ] Interaction tests (click, press, etc.)
  - [ ] Accessibility tests
  - [ ] Snapshot tests (optional)

- [ ] Test all existing components
  - [ ] Button (web and mobile)
  - [ ] Future components added to template

- [ ] Setup accessibility testing
  - [ ] Install and configure jest-axe
  - [ ] Add accessibility tests to all components
  - [ ] Document accessibility testing patterns

- [ ] Configure visual regression testing
  - [ ] Setup Chromatic or Percy
  - [ ] Integrate with CI pipeline
  - [ ] Add visual regression checks to release workflow

- [ ] Create testing documentation
  - [ ] `docs/GUIDES/TESTING.md`
  - [ ] Document testing patterns
  - [ ] Include examples for each test type
  - [ ] Add troubleshooting guide

- [ ] Setup test coverage reporting
  - [ ] Configure coverage thresholds (80% minimum)
  - [ ] Add coverage badge to README
  - [ ] Report coverage in CI

**Deliverable:** All components have comprehensive unit tests with 80%+ coverage. Accessibility tests catch common issues. Visual regression tests prevent unintended UI changes. Testing guide helps developers write consistent tests.

**Testing:**

- Run full test suite and verify all pass
- Check coverage reports meet thresholds
- Run accessibility tests on all components
- Verify visual regression tests detect changes

---

### Phase 7: Advanced Features & Polish (Enhancement)

**Goal:** Add advanced features and polish for production-ready template.

#### Tasks

- [ ] Implement multi-theme support
  - [ ] Allow multiple theme configs
  - [ ] Theme switching at runtime
  - [ ] Export multiple theme variants from package

- [ ] Add component composition utilities
  - [ ] Compound component patterns
  - [ ] Polymorphic component helpers
  - [ ] As prop support for semantic HTML

- [ ] Create component generator CLI
  - [ ] `npm run new-component ComponentName`
  - [ ] Generate web and mobile versions
  - [ ] Scaffold tests, stories, types
  - [ ] Update exports automatically

- [ ] Add bundle size optimization
  - [ ] Analyze bundle size in CI
  - [ ] Add size limit checks
  - [ ] Optimize heavy dependencies
  - [ ] Document tree-shaking setup

- [ ] Implement design token versioning
  - [ ] Version tokens separately from components
  - [ ] Support token migrations
  - [ ] Document breaking token changes

- [ ] Add internationalization (i18n) support
  - [ ] Setup i18n framework
  - [ ] Document i18n patterns for components
  - [ ] Add locale-specific token overrides

- [ ] Create migration tooling
  - [ ] Script to update from old versions
  - [ ] Codemod for breaking changes
  - [ ] Migration guide for major versions

- [ ] Performance monitoring
  - [ ] Add bundle size badges
  - [ ] Setup performance benchmarks
  - [ ] Monitor build times

- [ ] Security scanning
  - [ ] Setup Dependabot
  - [ ] Add npm audit checks to CI
  - [ ] Document security policy

**Deliverable:** Template includes advanced features like multi-theme support, component generators, and production-grade tooling. Template is optimized, secure, and ready for client projects.

**Testing:**

- Test component generator creates valid files
- Verify multi-theme switching works
- Run security scans and address findings
- Benchmark build and bundle sizes

---

## Risks & Mitigations

| Risk                                                           | Likelihood | Impact | Mitigation                                                                                                                                     |
| -------------------------------------------------------------- | ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Token generation produces inaccessible colour combinations** | Medium     | High   | Add WCAG contrast validation in `validate-tokens.js`. Fail build if violations found. Provide suggested fixes.                                 |
| **Template initialization fails on certain systems**           | Low        | Medium | Test init script on Windows, macOS, Linux. Add error handling and clear error messages. Provide manual setup guide as fallback.                |
| **Generated tokens don't match client's exact brand colours**  | High       | Low    | Allow overriding generated shades with custom values in theme config. Document shade generation algorithm for transparency.                    |
| **Build pipeline breaks with new React Native versions**       | Medium     | Medium | Pin React Native peer dependency versions. Test against multiple RN versions in CI. Document supported versions clearly.                       |
| **Components don't support client-specific requirements**      | High       | Medium | Design components with extension points (render props, slots). Provide composition utilities. Document customization patterns extensively.     |
| **Theme changes break existing client implementations**        | Medium     | High   | Version design tokens separately. Use semantic versioning strictly. Provide migration guides for breaking changes. Offer deprecation warnings. |
| **Storybook build fails in CI/CD**                             | Low        | Low    | Add Storybook build verification to CI. Cache Storybook dependencies. Provide troubleshooting guide.                                           |
| **TypeScript types are too complex for consuming projects**    | Low        | Medium | Keep type signatures simple. Use helper types. Provide comprehensive JSDoc. Test types with example projects.                                  |
| **Package size grows too large**                               | Medium     | Medium | Monitor bundle size in CI with size-limit. Tree-shake aggressively. Make heavy dependencies optional. Document bundle optimization.            |
| **Documentation becomes outdated**                             | High       | Medium | Auto-generate documentation from code where possible. Add docs checks to CI. Make docs updates part of PR requirements.                        |

---

## Open Questions

### Critical (Need Answers Before Implementation)

- [ ] **Q1:** Should the template support monorepo structure for clients with multiple apps, or remain a single-package library?
  - **Context:** Some clients may want web, mobile, and shared packages in one repo.
  - **Impact:** Affects repository structure, build system, and publishing workflow.
  - **Recommendation:** Start with single-package, add monorepo guide in docs as optional setup.

- [ ] **Q2:** What npm scopes should the template use? Should it support unscoped packages?
  - **Context:** Some clients may not have npm organization accounts.
  - **Impact:** Affects `package.template.json` and publishing workflow.
  - **Recommendation:** Support both scoped (`@client/ui`) and unscoped (`client-ui`) via init script prompts.

- [ ] **Q3:** Should design tokens be published as a separate npm package (`@client/design-tokens`)?
  - **Context:** Allows non-React projects to use tokens.
  - **Impact:** Requires additional build configuration and publishing setup.
  - **Recommendation:** Phase 7 enhancement. Start with tokens bundled in main package.

- [ ] **Q4:** What level of backwards compatibility should be maintained across template updates?
  - **Context:** Clients may want to pull updates from the template after initialization.
  - **Impact:** Affects how we structure updates and migrations.
  - **Recommendation:** Treat each client fork as independent. Provide opt-in upgrade scripts for major changes.

### Important (Nice to Clarify)

- [ ] **Q5:** Should the template include example components beyond Button, or remain minimal?
  - **Recommendation:** Include 3-5 foundational components (Button, Input, Card, Modal) to demonstrate patterns. More can be added incrementally.

- [ ] **Q6:** What testing frameworks should be included? Jest vs Vitest? React Testing Library?
  - **Recommendation:** Use Vitest (faster, better ESM support) + React Testing Library (industry standard).

- [ ] **Q7:** Should the template support CSS-in-JS (styled-components, emotion) as an alternative to Tailwind?
  - **Recommendation:** Keep Tailwind as primary styling approach for consistency. Document CSS-in-JS integration as advanced pattern.

- [ ] **Q8:** Should Storybook support be included for React Native, or web-only?
  - **Recommendation:** Include web Storybook initially. Add React Native Storybook in Phase 7 (complex setup).

- [ ] **Q9:** What level of accessibility documentation is required?
  - **Recommendation:** Include WCAG compliance checklist, accessibility testing guide, and ARIA pattern documentation for each component.

- [ ] **Q10:** Should the template include example CI/CD for platforms other than GitHub (GitLab, Bitbucket)?
  - **Recommendation:** Provide GitHub Actions as default. Add GitLab CI and Bitbucket Pipelines examples in docs.

---

## Success Criteria

### Must Have (Phase 1-4)

1. Template can be initialized in < 5 minutes with custom branding
2. Generated tokens are accessible (WCAG AA compliant)
3. Build and publish workflow is fully automated
4. All components support web and mobile platforms
5. TypeScript types are comprehensive and accurate
6. Documentation covers all common use cases

### Should Have (Phase 5-6)

7. Storybook is deployed and publicly accessible
8. Test coverage is > 80% for all components
9. Component API documentation is auto-generated
10. Migration from template to client project is documented
11. Accessibility tests catch common violations

### Nice to Have (Phase 7)

12. Multi-theme support (multiple brand variants)
13. Component generator CLI speeds up development
14. Bundle size is optimized and monitored
15. Visual regression tests prevent UI bugs
16. i18n support for international clients

---

## Dependencies & Prerequisites

### External Dependencies

- Node.js 18+ and npm 9+
- Git
- GitHub account (for CI/CD and Storybook deployment)
- npm account (for publishing)
- Optional: Chromatic account (for visual regression testing)

### Internal Dependencies

- None (this is a greenfield template project)

### Technical Skills Required

- TypeScript and React expertise
- Tailwind CSS and Nativewind knowledge
- Build tooling (tsup, webpack)
- CI/CD (GitHub Actions)
- npm publishing workflow
- Testing (Vitest, React Testing Library)

---

## Timeline Estimate

| Phase                                  | Effort     | Duration (1 developer) |
| -------------------------------------- | ---------- | ---------------------- |
| Phase 1: Template Infrastructure       | High       | 1-2 weeks              |
| Phase 2: Theme Configuration System    | High       | 1-2 weeks              |
| Phase 3: Component Theming Integration | Medium     | 1 week                 |
| Phase 4: Build & Publishing Pipeline   | Medium     | 1 week                 |
| Phase 5: Documentation & Storybook     | Medium     | 1 week                 |
| Phase 6: Testing Framework             | Medium     | 1 week                 |
| Phase 7: Advanced Features             | Low-Medium | 1-2 weeks              |
| **Total**                              |            | **7-10 weeks**         |

_Note: Timeline assumes a single experienced developer working full-time. Can be parallelized with multiple developers._

---

## Next Steps

After approval of this plan:

1. **Run `/syntek-dev-suite:stories`** to create user stories for each phase
2. **Run `/syntek-dev-suite:sprint`** to organize stories into balanced sprints
3. **Begin Phase 1 implementation** starting with template structure
4. **Schedule stakeholder review** after Phase 1 deliverable
5. **Iterate based on feedback** and proceed to Phase 2

---

## Appendix

### A. Example Theme Configurations

**Minimal Theme (Startup)**

```typescript
export const themeConfig = {
  brand: {
    primary: { base: '#6366f1' }, // Indigo
  },
  typography: {
    fontFamilies: { sans: ['Inter'] },
  },
}
```

**Enterprise Theme (Financial Services)**

```typescript
export const themeConfig = {
  brand: {
    primary: { base: '#1e3a8a' }, // Navy blue
    secondary: { base: '#059669' }, // Green
  },
  typography: {
    fontFamilies: {
      sans: ['Roboto'],
      serif: ['Merriweather'],
    },
    baseFontSize: 16,
  },
  borderRadius: {
    base: 2, // More conservative, squared design
  },
}
```

### B. Token Generation Algorithm (Colour Shades)

Using Lightness adjustment in HSL colour space:

```
Base colour: #3b82f6 (HSL: 217°, 91%, 60%)

50:  Lighten to 95% lightness
100: Lighten to 90% lightness
200: Lighten to 80% lightness
300: Lighten to 70% lightness
400: Lighten to 65% lightness
500: Base (60% lightness)
600: Darken to 50% lightness
700: Darken to 40% lightness
800: Darken to 30% lightness
900: Darken to 20% lightness
```

Alternative: Use perceptual colour spaces (LAB, LCH) for more accurate shade generation.

### C. Placeholder Syntax

In template files, use double curly braces for replacement:

```
{{PACKAGE_NAME}}      → @client/ui
{{PACKAGE_SCOPE}}     → @client
{{DISPLAY_NAME}}      → Client UI
{{DESCRIPTION}}       → Client-specific description
{{AUTHOR}}            → Client Team
{{REPOSITORY_URL}}    → https://github.com/client/ui
```

---

**Document Version:** 1.0
**Last Updated:** 22 December 2024
**Author:** System Architect (Claude)
**Status:** Draft - Awaiting Review
