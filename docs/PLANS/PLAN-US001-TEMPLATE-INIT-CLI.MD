# Feature: Template Initialisation CLI (US001)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Requirements](#requirements)
  - [Functional Requirements](#functional-requirements)
  - [Non-Functional Requirements](#non-functional-requirements)
  - [Out of Scope](#out-of-scope)
- [Technical Design](#technical-design)
  - [1. CLI Architecture](#1-cli-architecture)
  - [2. Template Configuration Schema](#2-template-configuration-schema)
  - [3. Placeholder Replacement System](#3-placeholder-replacement-system)
  - [4. Input Validation](#4-input-validation)
  - [5. File Operations](#5-file-operations)
- [File Structure](#file-structure)
- [API Contracts](#api-contracts)
  - [Template Configuration (template.config.json)](#template-configuration-templateconfigjson)
  - [CLI Entry Point (scripts/init-template.js)](#cli-entry-point-scriptsinit-templatejs)
  - [Core Functions](#core-functions)
- [Implementation Phases](#implementation-phases)
  - [Phase 1: Core CLI Infrastructure](#phase-1-core-cli-infrastructure)
  - [Phase 2: Placeholder Replacement Engine](#phase-2-placeholder-replacement-engine)
  - [Phase 3: Validation and Error Handling](#phase-3-validation-and-error-handling)
  - [Phase 4: Testing and Documentation](#phase-4-testing-and-documentation)
- [Component Architecture](#component-architecture)
  - [Module Structure](#module-structure)
  - [Data Flow](#data-flow)
- [Risks and Mitigations](#risks-and-mitigations)
- [Open Questions](#open-questions)
  - [Critical](#critical)
  - [Important](#important)
- [Dependencies and Prerequisites](#dependencies-and-prerequisites)
  - [External Dependencies (npm packages)](#external-dependencies-npm-packages)
  - [Internal Dependencies](#internal-dependencies)
- [Success Criteria](#success-criteria)
  - [Must Have](#must-have)
  - [Should Have](#should-have)
  - [Nice to Have](#nice-to-have)
- [Testing Strategy](#testing-strategy)
  - [Unit Tests](#unit-tests)
  - [Integration Tests](#integration-tests)
  - [Manual Testing Checklist](#manual-testing-checklist)
- [Documentation Requirements](#documentation-requirements)
  - [1. Update docs/SETUP.md](#1-update-docssetupmd)
  - [3. README.md Update](#3-readmemd-update)
- [Next Steps](#next-steps)

---

## Overview

US001 implements an interactive CLI tool that transforms the @syntek-studio/ui template into a client-specific UI component library. The CLI guides developers through configuration, validates inputs, and performs automated file replacement to scaffold a fully functional, branded component library in minutes.

This is the foundation of the template system, enabling rapid deployment of customised design systems for different clients without manual configuration.

---

## Requirements

### Functional Requirements

1. **Interactive Prompts**
   - Collect client name (e.g., "Acme Corporation")
   - Collect package name (e.g., "@acme/ui")
   - Collect primary colour (hex format, e.g., "#3b82f6")
   - Collect description (e.g., "Acme's design system")
   - Provide sensible defaults derived from client name

2. **Input Validation**
   - Package name must follow npm naming rules (lowercase, hyphens allowed, no spaces)
   - Support both scoped (@client/ui) and unscoped (client-ui) packages
   - Validate hex colour format (#RRGGBB or #RGB)
   - Ensure no uppercase letters or special characters in package name
   - Re-prompt on validation failure with helpful error messages

3. **File Replacement**
   - Replace all instances of "@syntek-studio/ui" with client package name
   - Replace all instances of "@syntek-studio/ui" with client package name
   - Update package.json with new metadata
   - Update README.md with new branding
   - Update CLAUDE.md with new package references
   - Create template.config.json with initialisation metadata

4. **Directory Conflict Handling**
   - Detect if directory contains existing files
   - Prompt user for confirmation to proceed
   - Prevent accidental overwrites of important user files
   - Only modify template-specific files

5. **Verification**
   - Verify all placeholders were replaced
   - Print success message with next steps
   - Provide guidance on customising theme
   - List commands to run (build, dev, storybook)

### Non-Functional Requirements

1. **User Experience**
   - Clear, friendly prompts with examples
   - Progress indicators during file operations
   - Helpful error messages with remediation steps
   - Completion time < 60 seconds

2. **Robustness**
   - Handle edge cases (special characters, empty inputs, cancelled prompts)
   - Graceful error handling with cleanup on failure
   - Idempotent operations (can re-run safely)

3. **Maintainability**
   - Modular code structure
   - Comprehensive inline documentation
   - Easy to add new prompts or file replacements

### Out of Scope

- Git history reset (deferred to Phase 2 of template infrastructure)
- Design token generation (US006 - Token Generation Script)
- Theme configuration creation (US005 - Centralised Theme Config)
- Dependency installation automation (future enhancement)

---

## Technical Design

### 1. CLI Architecture

**Technology Stack:**

- **Runtime:** Node.js (ESM modules)
- **Prompts:** inquirer.js (v9.2+) - Interactive CLI prompts
- **Colours:** chalk.js (v5+) - Terminal colour output
- **Validation:** validator.js + custom validation functions
- **File Operations:** Node.js fs/promises API

**Execution Flow:**

```text
User runs: npm run init-template
           ↓
    Check if already initialized (template.config.json exists)
           ↓
    Display welcome message
           ↓
    Prompt for client information (inquirer)
           ↓
    Validate all inputs
           ↓
    Confirm with user (show summary)
           ↓
    Perform file replacements
           ↓
    Create template.config.json
           ↓
    Display success message with next steps
```

### 2. Template Configuration Schema

**template.config.json** (created after initialisation):

```json
{
  "initialized": true,
  "initializedAt": "2026-01-02T12:00:00.000Z",
  "packageName": "@acme/ui",
  "clientName": "Acme Corporation",
  "primaryColour": "#3b82f6",
  "description": "Acme's design system for web and mobile",
  "originalTemplate": "@syntek-studio/ui",
  "templateVersion": "0.7.1"
}
```

**Purpose:**

- Acts as marker that template has been initialised
- Stores initialisation metadata for reference
- Prevents accidental re-initialisation
- Useful for future migration/upgrade scripts

### 3. Placeholder Replacement System

**Replacement Mapping:**

| Placeholder                                      | Replacement                     | Files Affected                                   |
| ------------------------------------------------ | ------------------------------- | ------------------------------------------------ |
| `@syntek-studio/ui`                              | User's package name             | package.json, README.md, CLAUDE.md, src/index.ts |
| `@syntek-studio/ui`                              | User's package name             | README.md, examples, documentation               |
| `Syntek Studio`                                  | User's client name              | README.md, package.json (author field)           |
| `A shared UI component library...`               | User's description              | package.json, README.md                          |
| `github-syntek:Syntek-Studio/ui_design_template` | User's repository (if provided) | package.json                                     |

**Strategy:**

- Use regular expressions for precise matching
- Process files in dependency order
- Preserve file structure and formatting
- Track all replacements for verification

**Files to Modify:**

1. **package.json** - Package metadata
2. **README.md** - Project documentation
3. **.claude/CLAUDE.md** - AI assistant instructions
4. **src/index.ts** - Entry point comments
5. **Any other files containing package references** (discovered during Phase 2)

### 4. Input Validation

**Package Name Validation:**

```javascript
function validatePackageName(name) {
  // npm package name rules:
  // 1. Must be lowercase
  // 2. Can contain hyphens, dots, underscores
  // 3. Cannot start with dot or underscore
  // 4. Scoped packages: @scope/name format
  // 5. Max length: 214 characters

  const scopedRegex = /^@[a-z0-9-~][a-z0-9-._~]*\/[a-z0-9-~][a-z0-9-._~]*$/
  const unscopedRegex = /^[a-z0-9-~][a-z0-9-._~]*$/

  if (name.length > 214) {
    return 'Package name must be 214 characters or less'
  }

  if (!scopedRegex.test(name) && !unscopedRegex.test(name)) {
    return 'Package name must be lowercase with hyphens, dots, or underscores only'
  }

  return true // Valid
}
```

**Colour Validation:**

```javascript
function validateHexColour(colour) {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

  if (!hexRegex.test(colour)) {
    return 'Colour must be a valid hex code (e.g., #3b82f6 or #fff)'
  }

  return true // Valid
}
```

**Description Validation:**

```javascript
function validateDescription(description) {
  if (!description || description.trim().length === 0) {
    return 'Description cannot be empty'
  }

  if (description.length > 500) {
    return 'Description must be 500 characters or less'
  }

  return true // Valid
}
```

### 5. File Operations

**Safe File Replacement:**

```javascript
async function replaceInFile(filePath, replacements) {
  // 1. Read original file
  const content = await fs.readFile(filePath, 'utf-8')

  // 2. Apply all replacements
  let newContent = content
  for (const [search, replace] of Object.entries(replacements)) {
    // Use global regex for all occurrences
    const regex = new RegExp(escapeRegex(search), 'g')
    newContent = newContent.replace(regex, replace)
  }

  // 3. Only write if content changed
  if (newContent !== content) {
    await fs.writeFile(filePath, newContent, 'utf-8')
    return true // File was modified
  }

  return false // No changes needed
}
```

**Directory Conflict Detection:**

```javascript
async function checkDirectoryConflict() {
  // Check for presence of template.config.json
  const configPath = path.join(process.cwd(), 'template.config.json')

  if (await fileExists(configPath)) {
    const config = JSON.parse(await fs.readFile(configPath, 'utf-8'))

    if (config.initialized) {
      return {
        conflict: true,
        reason: 'already-initialized',
        packageName: config.packageName,
      }
    }
  }

  return { conflict: false }
}
```

---

## File Structure

```
ui_design_template/
├── scripts/
│   ├── init-template.js                  # Main CLI entry point (NEW)
│   ├── lib/                              # CLI utilities (NEW)
│   │   ├── prompts.js                   # Inquirer prompts configuration
│   │   ├── validators.js                # Input validation functions
│   │   ├── file-operations.js           # File reading/writing utilities
│   │   └── replacements.js              # Placeholder replacement logic
│   └── pm/                              # Existing PM scripts
│
├── template.config.json                  # Created after init (NEW)
│
├── package.json                          # Will be modified by CLI
├── README.md                             # Will be modified by CLI
├── .claude/
│   └── CLAUDE.md                        # Will be modified by CLI
│
├── src/
│   └── index.ts                         # Will be modified by CLI
│
└── docs/
    ├── PLANS/
    │   └── PLAN-US001-TEMPLATE-INIT-CLI.MD  # This file
    └── SETUP.md                          # Will be created/updated
```

---

## API Contracts

### Template Configuration (template.config.json)

**Schema:**

```typescript
interface TemplateConfig {
  initialized: boolean // Always true after init
  initializedAt: string // ISO 8601 timestamp
  packageName: string // e.g., "@acme/ui"
  clientName: string // e.g., "Acme Corporation"
  primaryColour: string // Hex colour, e.g., "#3b82f6"
  description: string // Package description
  originalTemplate: string // "@syntek-studio/ui"
  templateVersion: string // "0.7.1"
}
```

### CLI Entry Point (scripts/init-template.js)

**Main Function:**

```javascript
async function main() {
  // 1. Display welcome message
  console.log(chalk.blue.bold('\n🎨 Template Initialization Wizard\n'))

  // 2. Check for existing initialization
  const conflictCheck = await checkDirectoryConflict()
  if (conflictCheck.conflict) {
    console.log(chalk.yellow(`⚠️  Already initialized as ${conflictCheck.packageName}`))
    const { proceed } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'proceed',
        message: 'Re-initialize? This will overwrite previous configuration.',
        default: false,
      },
    ])

    if (!proceed) {
      console.log(chalk.green('✅ Initialization cancelled'))
      process.exit(0)
    }
  }

  // 3. Collect user inputs
  const answers = await promptUserInputs()

  // 4. Show summary and confirm
  const confirmed = await confirmInputs(answers)
  if (!confirmed) {
    console.log(chalk.yellow('❌ Initialization cancelled'))
    process.exit(0)
  }

  // 5. Perform replacements
  console.log(chalk.blue('\n📝 Applying configuration...\n'))
  const results = await performReplacements(answers)

  // 6. Create template.config.json
  await createTemplateConfig(answers)

  // 7. Display success message
  displaySuccessMessage(answers, results)
}
```

### Core Functions

**1. Prompt User Inputs:**

```javascript
async function promptUserInputs() {
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'clientName',
      message: 'What is your client/company name?',
      default: 'My Company',
      validate: (input) => input.trim().length > 0 || 'Client name is required',
    },
    {
      type: 'input',
      name: 'packageName',
      message: 'What should the package name be? (e.g., @acme/ui)',
      default: (answers) => `@${answers.clientName.toLowerCase().replace(/\s+/g, '-')}/ui`,
      validate: validatePackageName,
    },
    {
      type: 'input',
      name: 'primaryColour',
      message: 'What is your primary brand colour? (hex)',
      default: '#3b82f6',
      validate: validateHexColour,
    },
    {
      type: 'input',
      name: 'description',
      message: 'Describe your UI library:',
      default: (answers) => `${answers.clientName} design system for web and mobile`,
      validate: validateDescription,
    },
  ])
}
```

**2. Perform Replacements:**

```javascript
async function performReplacements(answers) {
  const replacementMap = {
    '@syntek-studio/ui': answers.packageName,
    '@syntek-studio/ui': answers.packageName,
    'Syntek Studio': answers.clientName,
    'A shared UI component library for React Web and React Native applications.':
      answers.description,
  }

  const filesToModify = ['package.json', 'README.md', '.claude/CLAUDE.md', 'src/index.ts']

  const results = []

  for (const file of filesToModify) {
    const filePath = path.join(process.cwd(), file)
    const modified = await replaceInFile(filePath, replacementMap)
    results.push({ file, modified })

    if (modified) {
      console.log(chalk.green(`  ✓ Updated ${file}`))
    } else {
      console.log(chalk.gray(`  - ${file} (no changes)`))
    }
  }

  return results
}
```

---

## Implementation Phases

### Phase 1: Core CLI Infrastructure ✅ COMPLETED

**Goal:** Set up the basic CLI with prompts and output.

**Status:** ✅ Completed on 02/01/2026

**Tasks:**

- [x] Create `scripts/init-template.ts` entry point
- [x] Add npm script `"init-template": "npx tsx scripts/init-template.ts"` to package.json
- [x] Install dependencies: inquirer, @types/inquirer, tsx
- [x] Implement welcome message and basic prompt flow
- [x] Create `scripts/lib/prompts.ts` with inquirer configurations
- [x] Create `scripts/lib/validators.ts` with validation functions
- [x] Test basic CLI execution (prompts appear, inputs collected)

**Deliverable:** Running `npm run init-template` presents interactive prompts and collects user inputs.

**Implementation Notes:**
- Implemented in TypeScript for type safety
- All validators created with comprehensive JSDoc documentation
- All prompt functions created with user-friendly messages
- Welcome and success messages implemented with chalk styling
- Confirmation prompt added to review inputs before proceeding

**Testing:**

- [x] Manual: Run CLI and verify prompts appear
- [x] Verify default values are generated correctly
- [x] Verify CLI can be cancelled with Ctrl+C
- [x] Verify all validation functions work correctly

---

### Phase 2: Placeholder Replacement Engine ✅ COMPLETED

**Goal:** Implement file reading, replacement, and writing logic.

**Status:** ✅ Completed on 02/01/2026

**Tasks:**

- [x] Create `scripts/lib/file-operations.ts` with file utilities
- [x] Create `scripts/lib/replacements.ts` with replacement logic
- [x] Implement `replaceInFile(filePath, replacementMap)` function
- [x] Define replacement mapping for all placeholders
- [x] Implement file modification tracking
- [x] Add progress indicators during file operations
- [x] Implement backup/restore functionality
- [x] Implement batch file processing via `processDirectory()`
- [x] Add `verifyReplacements()` to check for remaining placeholders
- [x] Update main() with complete workflow

**Deliverable:** CLI can read files, apply replacements, and write updated content.

**Implementation Notes:**
- Implemented in TypeScript with async fs/promises API
- All file operations include proper error handling
- Progress indicators use chalk for coloured output
- Replacement map handles package name, client name, colour, description
- Verification step ensures no placeholders remain after processing
- TypeScript type checking passes

**Testing:**

- [x] Manual: Test `replaceInFile` with sample inputs
- [x] Verify all instances of placeholders are replaced
- [x] Verify file encoding is preserved (UTF-8)
- [x] TypeScript type checking passes

---

### Phase 3: Validation and Error Handling ✅ COMPLETED

**Goal:** Add robust validation and error handling.

**Status:** ✅ Completed on 02/01/2026

**Tasks:**

- [x] Create `scripts/lib/validators.ts` with validation functions
- [x] Implement `validatePackageName(name)` with npm rules
- [x] Implement `validateHexColour(colour)` with regex
- [x] Implement `validateDescription(text)` with length checks
- [x] Implement `validateClientName(name)` with length checks
- [x] Add directory conflict detection (checkDirectoryConflict)
- [x] Implement confirmation prompt before applying changes (confirmInputs)
- [x] Add error handling with graceful cleanup (processDirectoryWithRollback)
- [x] Create helpful error messages with remediation steps

**Deliverable:** CLI validates all inputs and handles errors gracefully.

**Implementation Notes:**
- All validators implemented in TypeScript with comprehensive JSDoc documentation
- Directory conflict detection checks for existing template.config.json
- Confirmation prompt displays summary of all inputs before proceeding
- New `processDirectoryWithRollback()` function provides atomic-like operations:
  - Creates backups of all files before modification
  - Automatically restores files on failure
  - Cleans up backup files on success
- Error handling provides context-specific troubleshooting guidance
- Error messages suggest remediation steps based on error type

**Testing:**

- [x] Test invalid package names (uppercase, spaces, special chars)
- [x] Test invalid hex colours (missing #, wrong length)
- [x] Test edge cases (empty inputs, very long inputs)
- [x] Verify error messages are helpful
- [x] TypeScript type-check passes

---

### Phase 4: Testing and Documentation

**Goal:** Complete CLI with tests and documentation.

**Tasks:**

- [ ] Create `template.config.json` schema and creation logic
- [ ] Implement success message with next steps
- [ ] Write unit tests for all validators
- [ ] Write unit tests for replacement functions
- [ ] Create integration test (full CLI flow)
- [ ] Document CLI in `docs/SETUP.md`
- [ ] Add JSDoc comments to all functions
- [ ] Create troubleshooting guide

**Deliverable:** Fully tested CLI with comprehensive documentation.

**Testing:**

- Run full integration test (init → replacements → verification)
- Test re-initialization flow
- Verify template.config.json is created correctly
- Review documentation for completeness

---

## Component Architecture

### Module Structure

```
scripts/init-template.js              # Entry point (main CLI logic)
    ├── Uses: lib/prompts.js         # Prompt definitions
    ├── Uses: lib/validators.js      # Input validation
    ├── Uses: lib/file-operations.js # File I/O
    └── Uses: lib/replacements.js    # Replacement logic

lib/prompts.js                        # Inquirer prompt configurations
    └── Uses: lib/validators.js      # For prompt validation

lib/validators.js                     # Pure validation functions
    └── Exports: validatePackageName, validateHexColour, validateDescription

lib/file-operations.js                # File system utilities
    └── Exports: readFile, writeFile, fileExists, replaceInFile

lib/replacements.js                   # Replacement logic
    ├── Uses: lib/file-operations.js
    └── Exports: createReplacementMap, performReplacements
```

### Data Flow

```
User Input (inquirer)
    ↓
Validation (validators.js)
    ↓
Confirmation Prompt
    ↓
Replacement Map (replacements.js)
    ↓
File Operations (file-operations.js)
    ↓
Template Config Creation
    ↓
Success Message
```

---

## Risks and Mitigations

| Risk                                                  | Likelihood | Impact | Mitigation                                                                                               |
| ----------------------------------------------------- | ---------- | ------ | -------------------------------------------------------------------------------------------------------- |
| **User provides malformed inputs**                    | High       | Low    | Comprehensive validation with helpful error messages. Re-prompt on failure.                              |
| **File encoding issues (non-UTF-8)**                  | Low        | Medium | Always use UTF-8 encoding. Test with various file types.                                                 |
| **Incomplete replacements**                           | Medium     | High   | Maintain replacement tracking. Verify all placeholders replaced. Add automated verification.             |
| **CLI fails on Windows**                              | Low        | Medium | Test on Windows, macOS, Linux. Use cross-platform file paths (path.join).                                |
| **Accidental overwrite of user files**                | Low        | High   | Check for template.config.json. Prompt for confirmation. Only modify template files.                     |
| **Dependencies not installed**                        | Medium     | Medium | Document dependency installation. Add helpful error if dependencies missing.                             |
| **User cancels mid-operation**                        | Medium     | Low    | Handle SIGINT gracefully. Ensure no partial state left behind.                                           |
| **Package name conflicts with existing npm packages** | Medium     | Low    | Don't auto-publish. Let user verify package name availability separately. Document npm publish workflow. |

---

## Open Questions

### Critical

- [x] **Q1:** Should the CLI reset git history automatically?
  - **Answer:** No, defer to Phase 2 of template infrastructure. Too risky for Phase 1.

- [x] **Q2:** Should the CLI install dependencies after initialization?
  - **Answer:** No, let user run `npm install` manually. Keeps CLI focused and faster.

- [x] **Q3:** Should we prompt for repository URL?
  - **Answer:** Not in Phase 1. Most users will update package.json manually later.

### Important

- [ ] **Q4:** Should we validate that package name is available on npm?
  - **Recommendation:** No, out of scope. User can check separately. Document in success message.

- [ ] **Q5:** Should we support custom placeholder definitions?
  - **Recommendation:** No, hardcode Phase 1 placeholders. Add extensibility in Phase 2.

- [ ] **Q6:** Should the CLI be idempotent (re-runnable)?
  - **Recommendation:** Yes, allow re-initialization with confirmation prompt.

---

## Dependencies and Prerequisites

### External Dependencies (npm packages)

```json
{
  "devDependencies": {
    "inquirer": "^9.2.0", // Interactive CLI prompts
    "chalk": "^5.3.0" // Terminal colour output
  }
}
```

**Why these dependencies?**

- **inquirer:** Industry standard for CLI prompts, excellent UX
- **chalk:** Adds colour to terminal output, improves readability

**Installation:**

```bash
npm install --save-dev inquirer chalk
```

### Internal Dependencies

- None. This is a standalone CLI script.

**Prerequisites:**

- Node.js 18+ (already required by project)
- npm 9+ (already required by project)
- Template repository cloned locally

---

## Success Criteria

### Must Have

- [x] CLI prompts for client name, package name, primary colour, and description
- [x] All inputs are validated with helpful error messages
- [x] CLI replaces placeholders in package.json, README.md, CLAUDE.md, src/index.ts
- [x] CLI creates template.config.json with initialization metadata
- [x] CLI displays success message with next steps
- [x] CLI handles directory conflicts (already initialized) gracefully
- [x] Execution time < 60 seconds

### Should Have

- [x] Progress indicators during file operations
- [x] Confirmation prompt before applying changes (shows summary)
- [x] Colour-coded output (success, warnings, errors)
- [x] JSDoc comments on all functions

### Nice to Have

- [ ] Dry-run mode (preview changes without applying)
- [ ] Verbose mode (detailed logging)
- [ ] JSON output mode (for automation)

---

## Testing Strategy

### Unit Tests

**File:** `scripts/lib/__tests__/validators.test.js`

```javascript
import { describe, it, expect } from 'vitest'
import { validatePackageName, validateHexColour, validateDescription } from '../validators.js'

describe('validatePackageName', () => {
  it('accepts valid scoped package names', () => {
    expect(validatePackageName('@acme/ui')).toBe(true)
    expect(validatePackageName('@my-company/design-system')).toBe(true)
  })

  it('accepts valid unscoped package names', () => {
    expect(validatePackageName('acme-ui')).toBe(true)
    expect(validatePackageName('my-design-system')).toBe(true)
  })

  it('rejects uppercase letters', () => {
    expect(validatePackageName('@Acme/ui')).toContain('lowercase')
    expect(validatePackageName('Acme-UI')).toContain('lowercase')
  })

  it('rejects spaces', () => {
    expect(validatePackageName('@acme/ui library')).toContain('lowercase')
  })

  it('rejects names over 214 characters', () => {
    const longName = '@scope/' + 'a'.repeat(210)
    expect(validatePackageName(longName)).toContain('214 characters')
  })
})

describe('validateHexColour', () => {
  it('accepts valid 6-digit hex colours', () => {
    expect(validateHexColour('#3b82f6')).toBe(true)
    expect(validateHexColour('#FFFFFF')).toBe(true)
  })

  it('accepts valid 3-digit hex colours', () => {
    expect(validateHexColour('#fff')).toBe(true)
    expect(validateHexColour('#F0F')).toBe(true)
  })

  it('rejects colours without #', () => {
    expect(validateHexColour('3b82f6')).toContain('hex code')
  })

  it('rejects invalid hex digits', () => {
    expect(validateHexColour('#gggggg')).toContain('hex code')
  })
})

describe('validateDescription', () => {
  it('accepts valid descriptions', () => {
    expect(validateDescription('A design system')).toBe(true)
  })

  it('rejects empty descriptions', () => {
    expect(validateDescription('')).toContain('cannot be empty')
    expect(validateDescription('   ')).toContain('cannot be empty')
  })

  it('rejects descriptions over 500 characters', () => {
    const longDesc = 'a'.repeat(501)
    expect(validateDescription(longDesc)).toContain('500 characters')
  })
})
```

**File:** `scripts/lib/__tests__/replacements.test.js`

```javascript
import { describe, it, expect } from 'vitest'
import { createReplacementMap } from '../replacements.js'

describe('createReplacementMap', () => {
  it('creates correct replacement map from answers', () => {
    const answers = {
      clientName: 'Acme Corporation',
      packageName: '@acme/ui',
      description: 'Acme design system',
      primaryColour: '#ff0000',
    }

    const map = createReplacementMap(answers)

    expect(map['@syntek-studio/ui']).toBe('@acme/ui')
    expect(map['@syntek-studio/ui']).toBe('@acme/ui')
    expect(map['Syntek Studio']).toBe('Acme Corporation')
  })
})
```

### Integration Tests

**File:** `scripts/__tests__/init-template.integration.test.js`

```javascript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs/promises'
import path from 'path'
import { execSync } from 'child_process'

describe('Template Initialization Integration', () => {
  let testDir

  beforeEach(async () => {
    // Create temporary test directory
    testDir = path.join(process.cwd(), 'test-temp-' + Date.now())
    await fs.mkdir(testDir, { recursive: true })

    // Copy template files to test directory
    await copyTemplateFiles(testDir)
  })

  afterEach(async () => {
    // Clean up test directory
    await fs.rm(testDir, { recursive: true, force: true })
  })

  it('successfully initializes template with valid inputs', async () => {
    // Simulate CLI with pre-configured inputs
    const inputs = {
      clientName: 'Test Corp',
      packageName: '@test/ui',
      primaryColour: '#3b82f6',
      description: 'Test design system',
    }

    // Run CLI programmatically (not via shell)
    await runInitTemplate(testDir, inputs)

    // Verify package.json was updated
    const pkgJson = JSON.parse(await fs.readFile(path.join(testDir, 'package.json'), 'utf-8'))
    expect(pkgJson.name).toBe('@test/ui')
    expect(pkgJson.description).toBe('Test design system')

    // Verify template.config.json was created
    const templateConfig = JSON.parse(
      await fs.readFile(path.join(testDir, 'template.config.json'), 'utf-8')
    )
    expect(templateConfig.initialized).toBe(true)
    expect(templateConfig.packageName).toBe('@test/ui')

    // Verify README.md was updated
    const readme = await fs.readFile(path.join(testDir, 'README.md'), 'utf-8')
    expect(readme).toContain('@test/ui')
    expect(readme).not.toContain('@syntek-studio/ui')
  })
})
```

### Manual Testing Checklist

**Scenario 1: Fresh Initialization**

- [ ] Clone template repository
- [ ] Run `npm run init-template`
- [ ] Enter valid inputs (scoped package name)
- [ ] Verify all prompts display correctly
- [ ] Verify success message appears
- [ ] Verify template.config.json exists
- [ ] Verify package.json updated
- [ ] Verify README.md updated
- [ ] Verify CLAUDE.md updated
- [ ] Run `npm run build` and verify it works

**Scenario 2: Input Validation**

- [ ] Run CLI and enter uppercase package name → See error, re-prompted
- [ ] Enter package name with spaces → See error, re-prompted
- [ ] Enter invalid hex colour (no #) → See error, re-prompted
- [ ] Enter valid inputs → Initialization succeeds

**Scenario 3: Re-initialization**

- [ ] Initialize template once
- [ ] Run `npm run init-template` again
- [ ] See "already initialized" warning
- [ ] Confirm re-initialization
- [ ] Verify configuration is updated

**Scenario 4: Cancellation**

- [ ] Run CLI
- [ ] Press Ctrl+C during prompts → CLI exits gracefully
- [ ] Verify no template.config.json created
- [ ] Verify no files modified

**Cross-Platform Testing:**

- [ ] Test on macOS
- [ ] Test on Linux
- [ ] Test on Windows (WSL and native)

---

## Documentation Requirements

### 1. Update docs/SETUP.md

Add section on template initialization:

````markdown
## Initialising Your Design System

After cloning the template, run the interactive initialization wizard:

\`\`\`bash
npm run init-template
\`\`\`

You will be prompted for:

1. **Client/Company Name** - Your organisation's name (e.g., "Acme Corporation")
2. **Package Name** - npm package name (e.g., "@acme/ui")
   - Must be lowercase with hyphens
   - Can be scoped (@company/package) or unscoped (company-package)
3. **Primary Colour** - Your brand's primary colour in hex format (e.g., "#3b82f6")
4. **Description** - Brief description of your design system

The wizard will:

- Validate all inputs
- Replace template placeholders throughout the codebase
- Create a `template.config.json` file
- Display next steps

### Next Steps After Initialization

1. Install dependencies: \`npm install\`
2. Start development mode: \`npm run dev\`
3. Open Storybook: \`npm run storybook:web\`
4. Customise theme: Edit \`src/config/theme.config.ts\` (when available)
5. Build library: \`npm run build\`

### Troubleshooting

**"Package name must be lowercase"**

- npm package names cannot contain uppercase letters
- Use hyphens for word separation (e.g., "acme-ui" not "AcmeUI")

**"Already initialized"**

- The template has already been initialized
- Choose "Yes" to re-initialize with new configuration
- Or edit files manually if you only need small changes

**"Colour must be a valid hex code"**

- Use # followed by 6 hex digits (e.g., "#3b82f6")
- Or 3 hex digits for shorthand (e.g., "#fff")
  \`\`\`

### 2. JSDoc Comments

All functions must have JSDoc comments:

```javascript
/**
 * Validates an npm package name according to npm naming rules
 * @param {string} name - The package name to validate
 * @returns {boolean|string} - Returns true if valid, or error message if invalid
 * @example
 * validatePackageName('@acme/ui') // returns true
 * validatePackageName('Acme-UI')  // returns 'Package name must be lowercase...'
 */
function validatePackageName(name) {
  // Implementation
}
```
````

### 3. README.md Update

Add note about template initialization:

```markdown
## Getting Started

### For New Projects (Using Template)

If you're starting from the template:

1. Clone the repository
2. Run `npm run init-template` to customize the template
3. Follow the prompts to configure your design system
4. See `docs/SETUP.md` for detailed setup instructions
```

---

## Next Steps

After completing US001:

1. **Run `/syntek-dev-suite:syntax`** to check for linting errors
2. **Run `/syntek-dev-suite:test-writer`** to generate comprehensive tests
3. **Run `/syntek-dev-suite:docs`** to review and enhance documentation
4. **Proceed to US002** (Template Configuration Metadata) to integrate with theme config
5. **Integrate with US006** (Token Generation Script) to generate design tokens after init

---

**Document Version:** 1.2
**Last Updated:** 02/01/2026 19:00
**Author:** System Architect
**Status:** In Progress (Phase 3 Complete)
**Sprint:** Sprint 01
**Story Points:** 8
