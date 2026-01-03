# Setup Guide

This guide walks through setting up your custom design system from the @syntek-studio/ui template.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Initialising Your Design System](#initialising-your-design-system)
  - [Running the Initialization CLI](#running-the-initialization-cli)
  - [CLI Prompts](#cli-prompts)
    - [1. Client/Company Name](#1-clientcompany-name)
    - [2. Package Name](#2-package-name)
    - [3. Primary Brand Colour](#3-primary-brand-colour)
    - [4. Description](#4-description)
    - [5. Confirmation](#5-confirmation)
  - [CLI Options](#cli-options)
    - [Dry-Run Mode](#dry-run-mode)
    - [Verbose Mode](#verbose-mode)
    - [JSON Output Mode](#json-output-mode)
    - [Combining Options](#combining-options)
    - [Help](#help)
- [Next Steps After Initialization](#next-steps-after-initialization)
  - [1. Install Dependencies](#1-install-dependencies)
  - [2. Verify Build](#2-verify-build)
  - [3. Start Development Mode](#3-start-development-mode)
  - [4. Open Storybook](#4-open-storybook)
  - [5. Run Type Checking](#5-run-type-checking)
  - [6. Run Linting](#6-run-linting)
  - [7. Customise Theme](#7-customise-theme)
  - [8. Create Components](#8-create-components)
  - [9. Set Up Version Control](#9-set-up-version-control)
  - [10. Update Repository URL](#10-update-repository-url)
- [Configuration Files](#configuration-files)
  - [template.config.json](#templateconfigjson)
- [Troubleshooting](#troubleshooting)
  - ["Package name must be lowercase"](#package-name-must-be-lowercase)
  - ["Already initialized"](#already-initialized)
  - ["Colour must be a valid hex code"](#colour-must-be-a-valid-hex-code)
  - ["File not found" Errors During Initialization](#file-not-found-errors-during-initialization)
  - ["Permission denied" Errors](#permission-denied-errors)
  - ["Unexpected token" or JSON Parse Errors](#unexpected-token-or-json-parse-errors)
  - [CLI Exits Without Completing](#cli-exits-without-completing)
  - ["Some placeholders may not have been replaced"](#some-placeholders-may-not-have-been-replaced)
  - [Node.js or npm Version Too Old](#nodejs-or-npm-version-too-old)
  - [Initialization Succeeds But Build Fails](#initialization-succeeds-but-build-fails)
- [Manual Initialization (Advanced)](#manual-initialization-advanced)
  - [1. Update package.json](#1-update-packagejson)
  - [2. Update README.md](#2-update-readmemd)
  - [3. Update .claude/CLAUDE.md](#3-update-claudeclaudemd)
  - [4. Update src/index.ts](#4-update-srcindexts)
  - [5. Create template.config.json](#5-create-templateconfigjson)
  - [6. Verify Changes](#6-verify-changes)
- [Additional Resources](#additional-resources)

---

## Prerequisites

Before initializing the template, ensure the following:

- **Node.js:** Version 18 or higher
- **npm:** Version 9 or higher
- **Git:** For version control (recommended)

Verify versions:

```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 9.0.0
```

---

## Initialising Your Design System

After cloning the template repository, the first step is to customize it for your project using the interactive initialization wizard.

### Running the Initialization CLI

```bash
npm run init-template
```

This command launches an interactive CLI that guides the customization process.

**What the CLI does:**

1. Checks if the template has already been initialized
2. Prompts for project-specific information (client name, package name, colours, description)
3. Validates all inputs to ensure they meet npm and project requirements
4. Displays a summary and asks for confirmation
5. Replaces all template placeholders throughout the codebase
6. Creates a `template.config.json` file to record initialization
7. Verifies all replacements completed successfully
8. Displays success message with next steps

---

### CLI Prompts

The initialization wizard will prompt for the following information:

#### 1. Client/Company Name

**Prompt:** `What is your client/company name?`

**Example:** `Acme Corporation`

**Rules:**

- Cannot be empty
- Maximum 100 characters
- Accepts letters, numbers, spaces, and special characters (apostrophes, ampersands, hyphens)

**Purpose:** Replaces "Syntek Studio" throughout documentation and metadata.

---

#### 2. Package Name

**Prompt:** `What should the package name be?`

**Example:** `@acme/ui` or `acme-ui`

**Rules:**

- Must be lowercase
- Can contain hyphens, dots, underscores, tildes
- Cannot start with a dot or underscore
- Maximum 214 characters
- Can be scoped (`@scope/package`) or unscoped (`package-name`)

**Purpose:** Replaces "@syntek-studio/ui" in package.json, README.md, examples, and imports.

**Valid examples:**

- `@acme/ui` (scoped, recommended)
- `acme-ui` (unscoped)
- `@my-company/design-system`
- `company-design-tokens`

**Invalid examples:**

- `Acme-UI` ❌ (uppercase not allowed)
- `acme ui` ❌ (spaces not allowed)
- `@acme/UI-Kit` ❌ (uppercase not allowed)
- `.acme-ui` ❌ (cannot start with dot)

---

#### 3. Primary Brand Colour

**Prompt:** `What is your primary brand colour? (hex)`

**Example:** `#3b82f6`

**Rules:**

- Must start with `#`
- Must be 3 or 6 hex digits (0-9, a-f, A-F)
- Case-insensitive

**Purpose:** Replaces the default blue colour (`#3b82f6`) in design tokens.

**Valid examples:**

- `#3b82f6` (6-digit lowercase)
- `#FFF` (3-digit uppercase)
- `#f0f0f0` (6-digit mixed case)

**Invalid examples:**

- `3b82f6` ❌ (missing `#`)
- `#gggggg` ❌ (invalid hex digits)
- `#12345` ❌ (wrong length)

---

#### 4. Description

**Prompt:** `Describe your UI library:`

**Example:** `Acme's design system for web and mobile`

**Rules:**

- Cannot be empty
- Maximum 500 characters
- Accepts any characters (letters, numbers, punctuation, emojis)

**Purpose:** Replaces the default description in package.json and README.md.

---

#### 5. Confirmation

After entering all information, the CLI displays a summary:

```
✓ Ready to initialize!

Client Name:       Acme Corporation
Package Name:      @acme/ui
Primary Colour:    #3b82f6
Description:       Acme's design system for web and mobile

? Do you want to proceed with these settings? (Y/n)
```

- **Y (Yes):** Proceeds with initialization
- **n (No):** Loops back to prompts, allowing re-entry

---

### CLI Options

The initialization CLI supports several command-line options for different workflows:

#### Dry-Run Mode

Preview changes without modifying files:

```bash
npm run init-template -- --dry-run
```

**Use cases:**

- Preview what files will be changed
- Test the CLI without making permanent changes
- Verify inputs before committing

**Output:**

- Shows which files would be modified
- Displays what changes would be made
- Does not create or modify any files
- Does not create `template.config.json`

---

#### Verbose Mode

Show detailed logging of all operations:

```bash
npm run init-template -- --verbose
```

**Use cases:**

- Debugging initialization issues
- Understanding exactly what the CLI is doing
- Detailed logging for CI/CD pipelines

**Output:**

- Shows every file operation step-by-step
- Displays regex patterns used for replacements
- Shows backup creation and cleanup
- Provides timing information

---

#### JSON Output Mode

Output structured JSON for automation:

```bash
npm run init-template -- --json
```

**Use cases:**

- Integrating with CI/CD pipelines
- Scripted/automated initialization
- Programmatic parsing of results

**Output format:**

```json
{
  "success": true,
  "answers": {
    "clientName": "Acme Corporation",
    "packageName": "@acme/ui",
    "primaryColour": "#3b82f6",
    "description": "Acme design system"
  },
  "filesModified": 4,
  "files": [
    { "file": "package.json", "modified": true },
    { "file": "README.md", "modified": true },
    { "file": ".claude/CLAUDE.md", "modified": true },
    { "file": "src/index.ts", "modified": true }
  ],
  "verified": true
}
```

---

#### Combining Options

Options can be combined:

```bash
# Dry-run with verbose logging
npm run init-template -- --dry-run --verbose

# Dry-run with JSON output
npm run init-template -- --dry-run --json
```

---

#### Help

Display help information:

```bash
npm run init-template -- --help
```

---

## Next Steps After Initialization

After successful initialization:

### 1. Install Dependencies

```bash
npm install
```

Installs all project dependencies including React, TypeScript, Tailwind CSS, Storybook, and testing libraries.

---

### 2. Verify Build

```bash
npm run build
```

Builds the component library to the `dist/` directory. This ensures all imports and configurations are correct.

---

### 3. Start Development Mode

```bash
npm run dev
```

Runs the build process in watch mode. File changes trigger automatic rebuilds.

---

### 4. Open Storybook

```bash
npm run storybook:web
```

Launches Storybook on http://localhost:6006 to view and develop components interactively.

---

### 5. Run Type Checking

```bash
npm run type-check
```

Runs TypeScript type checking across the entire codebase.

---

### 6. Run Linting

```bash
npm run lint
```

Checks code style and catches common errors using ESLint.

---

### 7. Customise Theme

Edit design tokens and theme configuration:

- **Colours:** Will be available in a future release (US006 - Token Generation Script)
- **Typography:** Will be available in a future release
- **Spacing:** Will be available in a future release

---

### 8. Create Components

Add new components using the project structure:

```bash
npm run new-component
```

_Note: This command will be available in future releases. For now, manually create components following the existing patterns._

---

### 9. Set Up Version Control

Initialize git repository (if not already done):

```bash
git init
git add .
git commit -m "feat: Initialize template as @acme/ui

Initialized from @syntek-studio/ui template.

Configured with:
- Client: Acme Corporation
- Package: @acme/ui
- Primary colour: #3b82f6

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### 10. Update Repository URL

Update the repository URL in `package.json`:

```json
{
  "repository": {
    "type": "git",
    "url": "git@github.com:your-org/your-ui-library.git"
  }
}
```

---

## Configuration Files

### template.config.json

Created automatically after initialization. **Do not edit manually.**

**Location:** Project root

**Purpose:**

- Records initialization metadata
- Prevents accidental re-initialization
- Stores original template information for future migrations

**Schema:** See `template.config.schema.json` for full schema definition

**Example:**

```json
{
  "initialized": true,
  "initializedAt": "2026-01-02T12:00:00.000Z",
  "packageName": "@acme/ui",
  "clientName": "Acme Corporation",
  "primaryColour": "#3b82f6",
  "description": "Acme's design system for web and mobile",
  "originalTemplate": "@syntek-studio/ui",
  "templateVersion": "0.9.0"
}
```

**If you need to re-initialize:**

1. Delete `template.config.json`
2. Run `npm run init-template` again
3. Note: This will overwrite previous customizations

---

## Troubleshooting

### "Package name must be lowercase"

**Problem:** npm package names cannot contain uppercase letters.

**Solution:** Use lowercase letters with hyphens for word separation.

```bash
# ❌ Invalid
Acme-UI
AcmeUI
@Acme/ui

# ✅ Valid
acme-ui
@acme/ui
@acme/design-system
```

---

### "Already initialized"

**Problem:** The template has already been initialized (template.config.json exists).

**Solution:**

**Option 1:** Edit files manually for small changes

- Update package.json, README.md, etc. directly

**Option 2:** Re-initialize completely

```bash
# Delete the configuration file
rm template.config.json

# Run initialization again
npm run init-template
```

**Warning:** Re-initialization will overwrite all customizations. Commit your work to git first.

---

### "Colour must be a valid hex code"

**Problem:** The colour format is incorrect.

**Solution:** Use `#` followed by 3 or 6 hexadecimal digits.

```bash
# ❌ Invalid
3b82f6          # Missing #
#gggggg         # Invalid hex digits
#12345          # Wrong length

# ✅ Valid
#3b82f6         # 6-digit
#fff            # 3-digit shorthand
#FF5733         # Uppercase works too
```

---

### "File not found" Errors During Initialization

**Problem:** The CLI cannot find expected project files.

**Solution:**

1. Ensure running from project root directory:

```bash
# Check current directory
pwd

# Should output: /path/to/ui_design_template
```

2. Verify all template files exist:

```bash
ls -la package.json README.md .claude/CLAUDE.md src/index.ts
```

3. If files are missing, re-clone the template repository.

---

### "Permission denied" Errors

**Problem:** Insufficient permissions to modify files.

**Solution:**

1. Check file permissions:

```bash
ls -la package.json README.md
```

2. Ensure you have write permissions in the directory:

```bash
# Try creating a test file
touch test.txt && rm test.txt
```

3. If using Windows, run terminal as administrator or check antivirus settings.

---

### "Unexpected token" or JSON Parse Errors

**Problem:** A JSON file (package.json or template.config.json) is corrupted.

**Solution:**

1. Validate JSON syntax:

```bash
# On macOS/Linux
cat package.json | python3 -m json.tool

# On Windows
type package.json | python -m json.tool
```

2. Restore from version control:

```bash
git checkout package.json
```

3. If no git history, re-clone the template repository.

---

### CLI Exits Without Completing

**Problem:** Process interrupted or crashed mid-initialization.

**Solution:**

1. Check for backup files:

```bash
ls -la *.backup
```

2. Restore backups if initialization failed:

```bash
# Automatic rollback should handle this
# But if backups exist manually:
mv package.json.backup package.json
mv README.md.backup README.md
# ... etc
```

3. Delete incomplete template.config.json:

```bash
rm template.config.json
```

4. Run initialization again:

```bash
npm run init-template
```

---

### "Some placeholders may not have been replaced"

**Problem:** Verification detected remaining template placeholders.

**Solution:**

1. Check which files still contain placeholders:

```bash
grep -r "@syntek-studio/ui" .
grep -r "Syntek Studio" .
```

2. Manually update remaining occurrences.

3. If the issue persists, file a bug report at:
   https://github.com/Syntek-Studio/ui_design_template/issues

---

### Node.js or npm Version Too Old

**Problem:** Using Node.js < 18 or npm < 9.

**Solution:**

1. Check versions:

```bash
node --version
npm --version
```

2. Update Node.js:

- **Using nvm (recommended):**

```bash
nvm install 20
nvm use 20
```

- **Download from nodejs.org:** https://nodejs.org/

3. Verify installation:

```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 9.0.0
```

---

### Initialization Succeeds But Build Fails

**Problem:** Template initialized successfully but `npm run build` fails.

**Solution:**

1. Install dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

2. Run type checking to identify issues:

```bash
npm run type-check
```

3. Check for circular dependencies:

```bash
npm ls
```

4. Ensure all peer dependencies are installed (especially for React Native).

---

## Manual Initialization (Advanced)

If the CLI fails or you prefer manual setup:

### 1. Update package.json

```json
{
  "name": "@your-company/ui",
  "description": "Your description",
  "author": "Your Company Name",
  "repository": {
    "type": "git",
    "url": "git@github.com:your-org/your-repo.git"
  }
}
```

### 2. Update README.md

Replace all occurrences of:

- `@syntek-studio/ui` → Your package name
- `Syntek Studio` → Your company name
- Default description → Your description

### 3. Update .claude/CLAUDE.md

Replace `@syntek-studio/ui` with your package name in import examples.

### 4. Update src/index.ts

Update JSDoc comments and file overview with your package information.

### 5. Create template.config.json

```json
{
  "initialized": true,
  "initializedAt": "2026-01-02T12:00:00.000Z",
  "packageName": "@your-company/ui",
  "clientName": "Your Company",
  "primaryColour": "#3b82f6",
  "description": "Your description",
  "originalTemplate": "@syntek-studio/ui",
  "templateVersion": "0.9.0"
}
```

### 6. Verify Changes

```bash
# Search for remaining template placeholders
grep -r "@syntek-studio/ui" . --exclude-dir=node_modules
grep -r "Syntek Studio" . --exclude-dir=node_modules

# Build to verify
npm run build
```

---

## Additional Resources

- **Template Repository:** https://github.com/Syntek-Studio/ui_design_template
- **Issue Tracker:** https://github.com/Syntek-Studio/ui_design_template/issues
- **Documentation:** See `docs/` directory for more guides

---

**Last Updated:** 02/01/2026
**Template Version:** 0.9.0
