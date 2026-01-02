# Design Token Initialisation Analysis

**Date:** 02/01/2026
**Reviewer:** Code Review Agent
**Version:** 0.7.2
**Language:** British English (en_GB)
**Timezone:** Europe/London

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Executive Summary](#executive-summary)
- [1. Current State Analysis](#1-current-state-analysis)
  - [1.1 What's Currently Planned (US001)](#11-whats-currently-planned-us001)
  - [1.2 Existing Token Infrastructure](#12-existing-token-infrastructure)
  - [1.3 Token Generation System (Sprint 03)](#13-token-generation-system-sprint-03)
- [2. Gap Analysis](#2-gap-analysis)
  - [2.1 Missing Token Initialisation Capabilities](#21-missing-token-initialisation-capabilities)
  - [2.2 Fallback/Default System Gaps](#22-fallbackdefault-system-gaps)
  - [2.3 Integration Gaps](#23-integration-gaps)
- [3. Existing Token Defaults (Current Codebase)](#3-existing-token-defaults-current-codebase)
  - [3.1 Colour Defaults](#31-colour-defaults)
  - [3.2 Typography Defaults](#32-typography-defaults)
  - [3.3 Other Token Defaults](#33-other-token-defaults)
- [4. User Story Dependencies](#4-user-story-dependencies)
  - [4.1 Relevant User Stories](#41-relevant-user-stories)
  - [4.2 Critical Path for Token Initialisation](#42-critical-path-for-token-initialisation)
- [5. Recommended Token Initialisation Strategy](#5-recommended-token-initialisation-strategy)
  - [5.1 Comprehensive Token Prompts](#51-comprehensive-token-prompts)
  - [5.2 Default Token Configuration](#52-default-token-configuration)
  - [5.3 Three-Tier Customisation Levels](#53-three-tier-customisation-levels)
- [6. Critical Issues and Recommendations](#6-critical-issues-and-recommendations)
  - [6.1 Critical Issue: Primary Colour Not Used](#61-critical-issue-primary-colour-not-used)
  - [6.2 Critical Issue: No Fallback System](#62-critical-issue-no-fallback-system)
  - [6.3 High Priority: Typography Configuration Missing](#63-high-priority-typography-configuration-missing)
  - [6.4 Medium Priority: No Integration with US006](#64-medium-priority-no-integration-with-us006)
  - [6.5 Low Priority: Missing Secondary Colour](#65-low-priority-missing-secondary-colour)
- [7. Proposed Enhancements](#7-proposed-enhancements)
  - [7.1 Enhanced US001 Acceptance Criteria](#71-enhanced-us001-acceptance-criteria)
  - [7.2 New User Story: US001.5 - Enhanced Token Init](#72-new-user-story-us0015---enhanced-token-init)
  - [7.3 Configuration File Schema](#73-configuration-file-schema)
- [8. Implementation Priority Matrix](#8-implementation-priority-matrix)
- [9. Token Types Checklist](#9-token-types-checklist)
  - [High Priority (Should configure during init)](#high-priority-should-configure-during-init)
  - [Medium Priority (Optional, good defaults exist)](#medium-priority-optional-good-defaults-exist)
  - [Low Priority (Advanced mode only)](#low-priority-advanced-mode-only)
  - [Not Configurable (System-generated)](#not-configurable-system-generated)
- [10. Documentation Gaps](#10-documentation-gaps)
- [11. Testing Gaps](#11-testing-gaps)
- [12. Summary and Action Items](#12-summary-and-action-items)
  - [Current State](#current-state)
  - [Critical Path to Complete Token Init](#critical-path-to-complete-token-init)
  - [Recommendations](#recommendations)
- [Appendix A: Token Initialisation Examples](#appendix-a-token-initialisation-examples)
  - [Example 1: Quick Start (All Defaults)](#example-1-quick-start-all-defaults)
  - [Example 2: Standard Init (Brand Colours)](#example-2-standard-init-brand-colours)
  - [Example 3: Advanced Init (Full Customisation)](#example-3-advanced-init-full-customisation)
- [Appendix B: Theme Config Schema Reference](#appendix-b-theme-config-schema-reference)

## Executive Summary

This review analyses the current design token initialisation plan for the US001 Template Init CLI and identifies gaps in the comprehensive token configuration strategy. While the current plan includes a primary colour prompt, there is significant opportunity to enhance the initialisation process with a complete design token configuration system.

**Current Status:**

- ✅ Primary colour prompt exists in US001
- ❌ No font/typography configuration during init
- ❌ No spacing/breakpoint configuration during init
- ❌ No shadow/border configuration during init
- ❌ No fallback/default token system
- ❌ No theme.config.ts centralised configuration (planned for Sprint 02)

**Recommendation:** Enhance US001 or create a follow-up story to implement comprehensive token initialisation with sensible defaults and optional customisation.

---

## 1. Current State Analysis

### 1.1 What's Currently Planned (US001)

The Template Init CLI (US001) currently collects:

| Input Field        | Type   | Validation      | Usage                              |
| ------------------ | ------ | --------------- | ---------------------------------- |
| Client Name        | String | Required        | Used in README, docs, metadata     |
| Package Name       | String | npm rules       | Used in package.json, all imports  |
| Description        | String | Required        | Used in package.json, README       |
| **Primary Colour** | String | Hex colour code | Used for brand colour token (ONLY) |

**Evidence from scripts/init-template.ts:**

```typescript
// Lines 48-49
primaryColour: string // ✅ Exists
description: string
```

**Current Token Replacement:**

- Only replaces `@syntek-studio/ui` with the new package name
- Does NOT generate or replace design tokens
- Does NOT configure theme.config.ts (doesn't exist yet)

### 1.2 Existing Token Infrastructure

The codebase already has comprehensive token files in `src/tokens/`:

| Token File       | Coverage                         | Shades/Values | Status         |
| ---------------- | -------------------------------- | ------------- | -------------- |
| `colours.ts`     | Brand, semantic, neutral colours | 9 shades each | ✅ Implemented |
| `typography.ts`  | Font families, sizes, weights    | 10 sizes      | ✅ Implemented |
| `spacing.ts`     | 4px grid system spacing          | 34 values     | ✅ Implemented |
| `breakpoints.ts` | Responsive breakpoints           | 6 breakpoints | ✅ Implemented |
| `shadows.ts`     | Elevation shadows                | 8 levels      | ✅ Implemented |
| `borders.ts`     | Border radius and width          | 9 radii       | ✅ Implemented |

**Key Finding:** All token infrastructure exists, but it's **hardcoded with default values**. The init CLI doesn't configure or customise these tokens.

### 1.3 Token Generation System (Sprint 03)

**US006: Automated Token Generation Script** is planned for Sprint 03 and includes:

- Reads from `src/config/theme.config.ts` (doesn't exist yet)
- Generates all token files from centralised configuration
- Creates TypeScript, CSS, and JSON exports
- Automatic colour shade generation (50-900 from base colour)
- Accessibility validation

**Dependency Chain:**

US005 (theme.config.ts) → US006 (generate-tokens) → Token files

**Critical Gap:** US001 (init CLI) collects primary colour but doesn't integrate with US005/US006 token generation system.

---

## 2. Gap Analysis

### 2.1 Missing Token Initialisation Capabilities

| Token Category  | What Should Be Configurable     | Current Status         | Impact  |
| --------------- | ------------------------------- | ---------------------- | ------- |
| **Colours**     | Primary, secondary, semantic    | Only primary collected | 🔴 High |
| **Typography**  | Font family (sans, serif, mono) | Not configurable       | 🔴 High |
| **Typography**  | Font scale (base size)          | Not configurable       | 🟡 Med  |
| **Spacing**     | Base unit (4px default)         | Not configurable       | 🟢 Low  |
| **Breakpoints** | Mobile-first breakpoints        | Not configurable       | 🟢 Low  |
| **Shadows**     | Shadow intensity/opacity        | Not configurable       | 🟢 Low  |
| **Borders**     | Border radius default           | Not configurable       | 🟡 Med  |

### 2.2 Fallback/Default System Gaps

**Critical Missing Feature:** No fallback to standard defaults when user doesn't provide custom values.

| Scenario                         | Current Behaviour | Desired Behaviour                |
| -------------------------------- | ----------------- | -------------------------------- |
| User skips primary colour        | Required (blocks) | Use default (#3b82f6 blue)       |
| User skips font selection        | N/A (not asked)   | Use default (Inter)              |
| User wants "quick start"         | Must answer all   | Accept all defaults, skip wizard |
| User wants minimal customisation | N/A               | Only ask for brand colours       |

**Recommendation:** Implement optional prompts with sensible defaults for all token categories.

### 2.3 Integration Gaps

**US001 → US005 → US006 Flow is Broken:**

```
Current Flow:
US001 (init CLI) → Collects primary colour
                    ❌ NO CONNECTION
                    ↓
US005 (theme.config.ts) → Not created during init
                          ↓
US006 (generate-tokens) → Cannot run without theme.config.ts

Desired Flow:
US001 (init CLI) → Collects design tokens
                    ↓
                   Creates theme.config.ts with user values + defaults
                    ↓
US006 (generate-tokens) → Runs automatically during init
                          ↓
                         Token files generated with custom values
```

**Issue:** US001 doesn't create `theme.config.ts` even though it collects `primaryColour`. This means the primary colour input is collected but **never used** until US005 is implemented.

---

## 3. Existing Token Defaults (Current Codebase)

### 3.1 Colour Defaults

**Current Hardcoded Values (src/tokens/colours.ts):**

| Colour    | Default Value   | Shade System      | Source          |
| --------- | --------------- | ----------------- | --------------- |
| Primary   | #3b82f6         | 50-900 (9 shades) | Tailwind Blue   |
| Secondary | #a855f7         | 50-900 (9 shades) | Tailwind Purple |
| Success   | #22c55e         | Single shade      | Tailwind Green  |
| Warning   | #f59e0b         | Single shade      | Tailwind Amber  |
| Error     | #ef4444         | Single shade      | Tailwind Red    |
| Info      | #3b82f6         | Single shade      | Tailwind Blue   |
| Grey      | #111827-#f9fafb | 50-900 (9 shades) | Tailwind Grey   |

**Observation:** These are Tailwind CSS v3 colour palette values. Good defaults, but should be customisable during init.

### 3.2 Typography Defaults

**Current Hardcoded Values (src/tokens/typography.ts):**

| Token      | Default Value                | Customisable? |
| ---------- | ---------------------------- | ------------- |
| Sans Font  | Inter, system-ui, sans-serif | Should be     |
| Serif Font | Georgia, serif               | Should be     |
| Mono Font  | Fira Code, monospace         | Should be     |
| Base Size  | 16px / 24px line-height      | Should be     |

**Recommendation:** At minimum, allow user to specify custom font families during init.

### 3.3 Other Token Defaults

**These are well-chosen defaults that don't need customisation:**

- **Spacing:** 4px grid system (industry standard)
- **Breakpoints:** Mobile-first 640/768/1024/1280/1536 (Tailwind standard)
- **Shadows:** 8-level elevation system (Material Design inspired)
- **Borders:** 0-24px radius scale (Tailwind standard)

**Recommendation:** Keep these as defaults, optionally expose in "advanced mode".

---

## 4. User Story Dependencies

### 4.1 Relevant User Stories

| Story | Title                     | Sprint    | Relevance to Token Init    |
| ----- | ------------------------- | --------- | -------------------------- |
| US001 | Template Init CLI         | Sprint 01 | 🔴 Critical (entry point)  |
| US005 | Centralised Theme Config  | Sprint 02 | 🔴 Critical (token source) |
| US006 | Token Generation Script   | Sprint 03 | 🔴 Critical (generation)   |
| US008 | Component Defaults Config | Sprint 04 | 🟡 Medium (uses tokens)    |
| US011 | Dark Mode Support         | Sprint 06 | 🟡 Medium (colour tokens)  |
| US012 | Theme Switching Hook      | Sprint 07 | 🟢 Low (runtime only)      |
| US025 | Multi-Theme Support       | Sprint 21 | 🟢 Low (advanced feature)  |
| US027 | Token Versioning          | Sprint 17 | 🟢 Low (tracking only)     |

### 4.2 Critical Path for Token Initialisation

**Must Complete in Order:**

1. **US005** (Sprint 02) - Create `src/config/theme.config.ts` structure
2. **US006** (Sprint 03) - Create token generation script
3. **US001 Enhancement** - Integrate init CLI with theme.config.ts creation

**Current Problem:** US001 is in Sprint 01, but US005 (theme config) is Sprint 02. This means US001 completes **before** the theme configuration system exists.

**Recommendation:** Either:

- Option A: Move US005 to Sprint 01 alongside US001
- Option B: Create US001.5 story to enhance init CLI after US005/US006 are complete
- Option C: Implement basic theme.config.ts in US001 (lightweight version)

---

## 5. Recommended Token Initialisation Strategy

### 5.1 Comprehensive Token Prompts

**Proposed Init CLI Flow:**

```
┌─────────────────────────────────────────────┐
│ Welcome to UI Design System Template Init  │
└─────────────────────────────────────────────┘

Step 1: Project Configuration
─────────────────────────────
? Client Name: [Acme Corporation]
? Package Name: [@acme/ui]
? Description: [Acme design system]

Step 2: Brand Colours
──────────────────────
? Primary Brand Colour: [#3b82f6] (blue)
? Secondary Brand Colour: [#a855f7] (purple)
? Use default semantic colours? (Y/n) [Yes]
  ↳ Success: #22c55e (green)
  ↳ Warning: #f59e0b (amber)
  ↳ Error: #ef4444 (red)
  ↳ Info: #3b82f6 (blue)

Step 3: Typography (Optional)
──────────────────────────────
? Customise typography? (y/N) [No]
  If Yes:
  ? Sans-serif font: [Inter] (for UI/body text)
  ? Serif font: [Georgia] (for headings)
  ? Monospace font: [Fira Code] (for code)
  ? Base font size: [16px]

Step 4: Advanced (Optional)
────────────────────────────
? Customise spacing scale? (y/N) [No]
? Customise breakpoints? (y/N) [No]
? Customise border radius defaults? (y/N) [No]

Step 5: Confirmation
────────────────────
✓ Project: Acme Corporation (@acme/ui)
✓ Primary Colour: #3b82f6 (blue)
✓ Secondary Colour: #a855f7 (purple)
✓ Typography: Inter (default)
✓ Advanced: All defaults

? Proceed with initialisation? (Y/n) [Yes]

Initialising...
✓ Created theme.config.ts
✓ Generated design tokens
✓ Updated package.json
✓ Updated README.md
✓ Updated .claude/CLAUDE.md

🎉 Template initialised successfully!

Next steps:
  npm install
  npm run dev
  npm run storybook:web
```

### 5.2 Default Token Configuration

**All tokens should have sensible defaults that can be used without customisation:**

```typescript
// src/config/theme.config.ts (generated by init CLI)

export const themeConfig = {
  colours: {
    // User provided or defaults
    primary: '#3b82f6', // User input or default
    secondary: '#a855f7', // User input or default

    // Always defaults (unless advanced mode)
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Neutral colours (always defaults)
    white: '#ffffff',
    black: '#000000',
    grey: {
      50: '#f9fafb',
      // ... full grey scale
    },
  },

  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'], // User input or default
      serif: ['Georgia', 'serif'], // User input or default
      mono: ['Fira Code', 'monospace'], // User input or default
    },
    fontSize: {
      // Always defaults (proven scale)
      base: { size: 16, lineHeight: 24 },
      // ... full type scale
    },
    fontWeight: {
      // Always defaults
      normal: '400',
      bold: '700',
      // ... full weight scale
    },
  },

  spacing: {
    // Always defaults (4px grid)
    // ... full spacing scale
  },

  breakpoints: {
    // Always defaults (mobile-first)
    sm: 640,
    md: 768,
    // ... full breakpoint scale
  },

  shadows: {
    // Always defaults (elevation system)
    // ... full shadow scale
  },

  borders: {
    radius: {
      // Defaults, potentially customisable in advanced mode
      lg: 8, // Default button/card radius
      // ... full radius scale
    },
    width: {
      // Always defaults
      // ... full width scale
    },
  },
}
```

### 5.3 Three-Tier Customisation Levels

| Level        | Prompts                             | Target User         | Use Case                 |
| ------------ | ----------------------------------- | ------------------- | ------------------------ |
| **Quick**    | Client, package, description only   | Rapid prototyping   | Use all defaults         |
| **Standard** | + Brand colours (primary/secondary) | Most projects       | Brand customisation      |
| **Advanced** | + Typography, spacing, borders      | Design system teams | Full token customisation |

**Implementation:**

```typescript
? Initialisation mode:
  1. Quick Start (use all defaults)
  2. Standard (customise brand colours)
  3. Advanced (full token customisation)

Choice: [2]
```

---

## 6. Critical Issues and Recommendations

### 6.1 Critical Issue: Primary Colour Not Used

**Problem:**

- US001 collects `primaryColour` in answers
- No code in US001 uses this value
- `theme.config.ts` doesn't exist until US005 (Sprint 02)
- Token generation doesn't exist until US006 (Sprint 03)

**Evidence:**

```typescript
// scripts/init-template.ts line 49
primaryColour: string // ✅ Collected in UserAnswers

// scripts/init-template.ts line 154-156
export async function createTemplateConfig(_answers: UserAnswers): Promise<void> {
  throw new Error('Not implemented') // ❌ Not implemented
}
```

**Impact:** 🔴 **HIGH** - Users provide colour input that is completely ignored until Sprint 02/03.

**Recommendation:**

- Option A: Remove `primaryColour` from US001 until US005/US006 are complete
- Option B: Implement `createTemplateConfig()` to write a basic theme.config.ts with the primary colour
- Option C: Add note in CLI: "Primary colour will be used in Sprint 02 when theme system is implemented"

**Preferred Solution:** Option B - Implement basic theme.config.ts creation in US001.

### 6.2 Critical Issue: No Fallback System

**Problem:**

- All prompts are required
- No way to skip and use defaults
- No "quick start" mode

**Impact:** 🔴 **HIGH** - Poor developer experience, forces users to make decisions before they understand the system.

**Recommendation:** Make ALL prompts optional with defaults:

```typescript
// Bad (current)
? Primary Colour: [required, must enter value]

// Good (recommended)
? Primary Colour (default: #3b82f6 blue): [press Enter to accept]
```

### 6.3 High Priority: Typography Configuration Missing

**Problem:**

- Font families are hardcoded to Inter/Georgia/Fira Code
- Many clients have brand fonts (e.g., "Helvetica Neue", "SF Pro", "Roboto")
- No way to configure during init

**Impact:** 🔴 **HIGH** - Clients must manually edit token files post-init, defeating the purpose of init CLI.

**Recommendation:** Add typography prompts to US001 or create US001.5:

```typescript
Typography Configuration
────────────────────────
? Primary font (for body text): [Inter]
? Heading font (optional, defaults to primary): []
? Monospace font (for code): [Fira Code]
```

### 6.4 Medium Priority: No Integration with US006

**Problem:**

- US001 doesn't call token generation script
- Users must manually run `npm run generate-tokens` after init
- Two-step process instead of one

**Impact:** 🟡 **MEDIUM** - Extra manual step, potential for forgetting to generate tokens.

**Recommendation:** US001 should call US006's token generation script at the end of initialisation:

```typescript
// At end of main() in scripts/init-template.ts
console.log('Generating design tokens...')
await import('./generate-tokens') // From US006
console.log('✓ Tokens generated')
```

### 6.5 Low Priority: Missing Secondary Colour

**Problem:**

- Collects `primaryColour` only
- Most design systems have secondary colour (US005 defines it)
- Asymmetry between init and final theme config

**Impact:** 🟢 **LOW** - Can use default secondary, but limits brand customisation.

**Recommendation:** Add secondary colour prompt:

```typescript
? Primary Brand Colour: [#3b82f6]
? Secondary Brand Colour (default: #a855f7 purple): [press Enter]
```

---

## 7. Proposed Enhancements

### 7.1 Enhanced US001 Acceptance Criteria

**Add to US001 Scenario 1:**

```markdown
### Scenario 1: Successful Template Initialisation (ENHANCED)

- **Given** a developer runs `npm run init-template` in a new project directory

- **When** they answer interactive prompts:
  - Client name (required)
  - Package name (required)
  - Description (required)
  - Primary brand colour (optional, default: #3b82f6)
  - Secondary brand colour (optional, default: #a855f7)
  - Primary font family (optional, default: Inter)

- **Then** a new template is created with:
  - Updated package.json, README, and documentation
  - **NEW:** Generated `src/config/theme.config.ts` with user colours + defaults
  - **NEW:** Generated token files via `npm run generate-tokens`
  - All references to "@syntek-studio/ui" replaced with client package name
  - **NEW:** Custom brand colours applied throughout token system

- **And** the project is ready to build immediately without additional configuration
```

### 7.2 New User Story: US001.5 - Enhanced Token Init

**Proposed New Story:**

```markdown
# US001.5: Enhanced Token Initialisation

**Status:** To Do (Proposed)
**Priority:** Should Have
**Story Points:** 5
**Sprint:** Sprint 04 (after US006 completes)

## User Story

As a developer initialising a new design system,
I want to configure brand colours and typography during template init,
so that the generated design system uses my brand identity without manual token editing.

## Acceptance Criteria

### Scenario 1: Brand Colour Configuration

- **Given** the init CLI prompts for colours
- **When** I provide primary (#ff5733) and secondary (#33c1ff) colours
- **Then** theme.config.ts is created with these colours
- **And** token generation runs automatically
- **And** all colour tokens include my brand colours with auto-generated shades

### Scenario 2: Typography Configuration

- **Given** the init CLI prompts for fonts (optional)
- **When** I specify "Helvetica Neue" as primary font
- **Then** theme.config.ts uses this font in sans family
- **And** all components use Helvetica Neue by default

### Scenario 3: Quick Start Mode

- **Given** I choose "Quick Start" mode
- **When** init runs
- **Then** all prompts use defaults
- **And** I only provide client name and package name
- **And** full token system is generated with sensible defaults

## Dependencies

- US005 (Centralised Theme Config) - must be complete
- US006 (Token Generation Script) - must be complete

## Tasks

- [ ] Add brand colour prompts (primary/secondary)
- [ ] Add typography prompts (optional)
- [ ] Add "Quick Start" mode
- [ ] Integrate with US006 token generation
- [ ] Create theme.config.ts during init
- [ ] Auto-run generate-tokens at end of init
- [ ] Update documentation
```

### 7.3 Configuration File Schema

**Proposed theme.config.ts Schema (US005 Enhanced):**

```typescript
// src/config/theme.config.ts

/**
 * Centralised design system theme configuration.
 *
 * This file is the single source of truth for all design tokens.
 * Generated during template initialisation by init-template CLI.
 *
 * To regenerate tokens after editing: npm run generate-tokens
 */

export interface ThemeConfig {
  meta: {
    name: string // Client name
    package: string // Package name
    version: string // Theme config version
    generatedAt: string // ISO timestamp
  }

  colours: {
    primary: string // Base colour, shades auto-generated
    secondary: string // Base colour, shades auto-generated
    success: string
    warning: string
    error: string
    info: string
    neutral: {
      white: string
      black: string
      grey: string // Base grey, shades auto-generated
    }
  }

  typography: {
    fontFamily: {
      sans: string[]
      serif: string[]
      mono: string[]
    }
    fontSize: {
      base: number // Base unit, scale auto-generated
    }
  }

  spacing: {
    base: number // Base unit (4px), scale auto-generated
  }

  breakpoints: {
    sm: number
    md: number
    lg: number
    xl: number
    '2xl': number
  }

  borders: {
    radius: {
      default: number // lg (8px) or custom
    }
  }
}

export const themeConfig: ThemeConfig = {
  meta: {
    name: '{{CLIENT_NAME}}', // Replaced by init CLI
    package: '{{PACKAGE_NAME}}', // Replaced by init CLI
    version: '1.0.0',
    generatedAt: '{{GENERATED_AT}}', // Replaced by init CLI
  },

  colours: {
    primary: '{{PRIMARY_COLOUR}}', // User input or #3b82f6
    secondary: '{{SECONDARY_COLOUR}}', // User input or #a855f7
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    neutral: {
      white: '#ffffff',
      black: '#000000',
      grey: '#6b7280', // Base grey-500, generates 50-900
    },
  },

  typography: {
    fontFamily: {
      sans: ['{{SANS_FONT}}', 'system-ui', 'sans-serif'], // User input or Inter
      serif: ['{{SERIF_FONT}}', 'serif'], // User input or Georgia
      mono: ['{{MONO_FONT}}', 'monospace'], // User input or Fira Code
    },
    fontSize: {
      base: 16, // Base font size, scale auto-generated
    },
  },

  spacing: {
    base: 4, // 4px base unit
  },

  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },

  borders: {
    radius: {
      default: 8, // lg radius for buttons/cards
    },
  },
}
```

---

## 8. Implementation Priority Matrix

| Enhancement                     | Priority    | Effort | Sprint     | Dependency      |
| ------------------------------- | ----------- | ------ | ---------- | --------------- |
| Create theme.config.ts in US001 | 🔴 Critical | Medium | Sprint 01  | None            |
| Add secondary colour prompt     | 🔴 High     | Low    | Sprint 01  | theme.config.ts |
| Make all prompts optional       | 🔴 High     | Low    | Sprint 01  | None            |
| Add typography prompts          | 🟡 Medium   | Medium | Sprint 04  | US005, US006    |
| Auto-run token generation       | 🟡 Medium   | Low    | Sprint 03  | US006           |
| Add "Quick Start" mode          | 🟢 Low      | Low    | Sprint 04  | None            |
| Add advanced mode (spacing/etc) | 🟢 Low      | High   | Sprint 08+ | US006           |

---

## 9. Token Types Checklist

**All token types that SHOULD be configurable (with priority):**

### High Priority (Should configure during init)

- ✅ Primary brand colour (currently collected, not used)
- ❌ Secondary brand colour
- ❌ Primary font family (sans)
- ❌ Heading font family (serif)
- ❌ Monospace font family

### Medium Priority (Optional, good defaults exist)

- ❌ Success/warning/error/info semantic colours
- ❌ Base font size (16px default)
- ❌ Default border radius (8px default)

### Low Priority (Advanced mode only)

- ❌ Spacing base unit (4px)
- ❌ Breakpoint values (mobile-first standards)
- ❌ Shadow opacity/intensity
- ❌ Grey scale base colour

### Not Configurable (System-generated)

- Colour shades (50-900) - Auto-generated from base
- Font size scale (xs-6xl) - Auto-generated from base
- Font weight scale (100-900) - Standard scale
- Spacing scale (0-96) - Auto-generated from base unit
- Border width scale - Standard values

---

## 10. Documentation Gaps

**Missing Documentation for Token Init:**

| Document              | Status     | Should Contain                       |
| --------------------- | ---------- | ------------------------------------ |
| docs/SETUP.md         | ❌ Missing | How to initialise with custom tokens |
| docs/TOKENS.md        | ❌ Missing | Token customisation guide            |
| src/config/README.md  | ❌ Missing | How theme.config.ts works            |
| scripts/README.md     | ❌ Missing | Init CLI usage and options           |
| template.config.json  | ❌ Missing | No schema documentation              |
| theme.config.ts       | ❌ Missing | Not created during init              |
| docs/THEMING-GUIDE.md | ⏳ Planned | US033 Sprint 23                      |

**Recommendation:** Create token documentation as part of US001 enhancement or US005.

---

## 11. Testing Gaps

**Current Test Coverage (scripts/**tests**/init-template.test.ts):**

| Test Category              | Coverage | Gaps                          |
| -------------------------- | -------- | ----------------------------- |
| Input validation           | ✅ Good  | None                          |
| Primary colour validation  | ✅ Good  | None                          |
| Theme config creation      | ❌ None  | Function not implemented      |
| Token generation           | ❌ None  | Not integrated with US006     |
| Colour shade generation    | ❌ None  | No tests for auto-shade logic |
| Font family validation     | ❌ None  | No font prompts yet           |
| Default fallback behaviour | ❌ None  | No optional prompts yet       |

**Recommendation:** Add tests for theme.config.ts creation and token generation integration.

---

## 12. Summary and Action Items

### Current State

- ✅ Init CLI exists and collects basic inputs
- ✅ Comprehensive token infrastructure exists
- ✅ Token generation system planned (US006)
- ❌ No integration between init CLI and token system
- ❌ No fallback/default system
- ❌ Typography not configurable
- ❌ Primary colour collected but not used

### Critical Path to Complete Token Init

**Immediate (Sprint 01 - US001):**

1. Implement `createTemplateConfig()` to create basic theme.config.ts
2. Write primary colour to theme.config.ts
3. Add secondary colour prompt
4. Make colour prompts optional with defaults
5. Document that tokens will be generated in Sprint 03

**Short Term (Sprint 02-03 - US005/US006):**

1. Complete US005 (theme.config.ts schema)
2. Complete US006 (token generation script)
3. Integrate US006 into US001 init flow
4. Auto-generate tokens at end of init

**Medium Term (Sprint 04+ - US001.5 or similar):**

1. Add typography prompts (optional)
2. Add "Quick Start" mode
3. Add advanced mode for spacing/breakpoints/borders
4. Create comprehensive token documentation

### Recommendations

**Option A: Enhance US001 Immediately**

- Add theme.config.ts creation to US001
- Add secondary colour prompt
- Make all prompts optional
- Document that full token generation comes in Sprint 03
- **Pros:** Single cohesive story, better UX
- **Cons:** Adds scope to Sprint 01

**Option B: Create US001.5 After US006**

- Complete US001 as minimal viable (current scope)
- Wait for US005 and US006 to complete
- Create US001.5 to enhance init with full token config
- **Pros:** Clearer separation, stays on schedule
- **Cons:** Two-phase init experience, potential rework

**Option C: Move US005 to Sprint 01**

- Combine US001 and US005 into Sprint 01
- Create theme.config.ts structure immediately
- Complete token init in single sprint
- **Pros:** Complete solution from start
- **Cons:** High sprint 01 point total (19 points)

**Recommended Approach:** **Option B with enhancements**

- Keep US001 in Sprint 01 (current scope)
- Add basic theme.config.ts creation to US001 (small addition)
- Complete US005/US006 in Sprint 02/03 as planned
- Create US001.5 in Sprint 04 to add typography and advanced options
- This balances immediate value with phased delivery

---

## Appendix A: Token Initialisation Examples

### Example 1: Quick Start (All Defaults)

```bash
$ npm run init-template

Welcome to UI Design System Template Initialisation

? Client Name: Acme Corporation
? Package Name: @acme/ui
? Description: Acme design system
? Initialisation mode: Quick Start (use all defaults)

✓ Creating theme.config.ts with default tokens
✓ Generating design tokens
✓ Updating package.json
✓ Updating README.md

🎉 Template initialised successfully!

Next steps:
  npm install
  npm run dev
  npm run storybook:web
```

### Example 2: Standard Init (Brand Colours)

```bash
$ npm run init-template

Welcome to UI Design System Template Initialisation

? Client Name: Acme Corporation
? Package Name: @acme/ui
? Description: Acme design system
? Initialisation mode: Standard (customise brand colours)

Brand Colours
─────────────
? Primary brand colour (default: #3b82f6 blue): #ff5733
? Secondary brand colour (default: #a855f7 purple): #33c1ff
? Use default semantic colours (success/warning/error)? Yes

✓ Creating theme.config.ts with custom brand colours
✓ Generating colour shades (50-900)
✓ Generating design tokens
✓ Updating package.json
✓ Updating README.md

🎉 Template initialised successfully with custom brand colours!

Your brand colours:
  Primary:   #ff5733 (red-orange)
  Secondary: #33c1ff (sky blue)

Next steps:
  npm install
  npm run dev
  npm run storybook:web
```

### Example 3: Advanced Init (Full Customisation)

```bash
$ npm run init-template

Welcome to UI Design System Template Initialisation

? Client Name: Acme Corporation
? Package Name: @acme/ui
? Description: Acme design system
? Initialisation mode: Advanced (full token customisation)

Brand Colours
─────────────
? Primary brand colour: #ff5733
? Secondary brand colour: #33c1ff

Typography
──────────
? Primary font (body text) (default: Inter): Helvetica Neue
? Heading font (default: same as primary): Playfair Display
? Monospace font (default: Fira Code): [Enter for default]
? Base font size (default: 16px): [Enter for default]

Advanced Options
────────────────
? Customise spacing scale? No
? Customise breakpoints? No
? Default border radius (default: 8px): 12px

✓ Creating theme.config.ts with custom configuration
✓ Generating colour shades (50-900)
✓ Generating typography scale from Helvetica Neue
✓ Generating design tokens
✓ Updating package.json
✓ Updating README.md

🎉 Template initialised successfully!

Configuration:
  Brand:      #ff5733 primary, #33c1ff secondary
  Typography: Helvetica Neue (body), Playfair Display (headings)
  Borders:    12px default radius

Next steps:
  npm install
  npm run dev
  npm run storybook:web
```

---

## Appendix B: Theme Config Schema Reference

**Complete theme.config.ts schema (for US005 reference):**

```typescript
interface ThemeConfig {
  // Metadata
  meta: {
    name: string // Client/company name
    package: string // npm package name
    version: string // Config version (semver)
    generatedAt: string // ISO timestamp
  }

  // Colours (base values, shades auto-generated)
  colours: {
    brand: {
      primary: string // Hex colour
      secondary: string // Hex colour
    }
    semantic: {
      success: string
      warning: string
      error: string
      info: string
    }
    neutral: {
      white: string
      black: string
      grey: string // Base grey, generates 50-900
    }
  }

  // Typography
  typography: {
    fontFamily: {
      sans: string[] // Array for font stack
      serif: string[]
      mono: string[]
    }
    fontSize: {
      base: number // Base font size in px
    }
    fontWeight: {
      // Usually left as defaults, but could be customised
      // for variable fonts
    }
  }

  // Spacing (4px grid system)
  spacing: {
    base: number // Base unit (usually 4)
  }

  // Responsive breakpoints
  breakpoints: {
    xs: number // Usually 0 or 360
    sm: number // Usually 640
    md: number // Usually 768
    lg: number // Usually 1024
    xl: number // Usually 1280
    '2xl': number // Usually 1536
  }

  // Shadows (elevation system)
  shadows: {
    opacity: number // Shadow opacity multiplier
  }

  // Borders
  borders: {
    radius: {
      default: number // Default radius (usually 8)
    }
    width: {
      default: number // Default border width (usually 1 or 2)
    }
  }
}
```

---

**End of Review**

**Reviewer:** Code Review Agent
**Date:** 02/01/2026
**Status:** Ready for Discussion
**Follow-up Action:** Present to team for decision on Option A/B/C implementation strategy
