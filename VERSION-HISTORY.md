# Version History

**Last Updated**: 03/01/2026
**Version**: 0.9.1
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Unreleased](#unreleased)
  - [Technical Changes](#technical-changes)
- [0.9.1 - 03/01/2026](#091---03012026)
  - [Summary](#summary)
  - [Security Fixes](#security-fixes)
  - [Bug Fixes](#bug-fixes)
  - [Files Changed](#files-changed)
  - [Documentation Notes](#documentation-notes)
  - [Architecture Notes](#architecture-notes)
- [0.9.0 - 02/01/2026](#090---02012026)
  - [Summary](#summary)
  - [Breaking Changes](#breaking-changes)
  - [Database Migrations](#database-migrations)
  - [API Changes](#api-changes)
  - [Files Changed](#files-changed)
  - [Configuration Changes](#configuration-changes)
  - [Documentation Notes](#documentation-notes)
  - [Architecture Notes](#architecture-notes)
- [0.8.0 - 02/01/2026](#080---02012026)
  - [Summary](#summary-1)
  - [Breaking Changes](#breaking-changes-1)
  - [Database Migrations](#database-migrations-1)
  - [API Changes](#api-changes-1)
  - [Files Changed](#files-changed-1)
  - [Configuration Changes](#configuration-changes-1)
  - [Documentation Notes](#documentation-notes-1)
  - [Architecture Notes](#architecture-notes-1)
- [0.7.2 - 02/01/2026](#072---02012026)
  - [Summary](#summary)
  - [Breaking Changes](#breaking-changes)
  - [Database Migrations](#database-migrations)
  - [API Changes](#api-changes)
  - [Files Changed](#files-changed)
  - [Configuration Changes](#configuration-changes)
  - [Documentation Notes](#documentation-notes)
  - [Architecture Notes](#architecture-notes)
- [0.7.1 - 02/01/2026](#071---02012026)
  - [Summary](#summary)
  - [Breaking Changes](#breaking-changes)
  - [Database Migrations](#database-migrations)
  - [API Changes](#api-changes)
  - [Files Changed](#files-changed)
  - [Configuration Changes](#configuration-changes)
  - [Documentation Notes](#documentation-notes)
- [0.7.0 - 01/01/2026](#070---01012026)
  - [Summary](#summary-1)
  - [Breaking Changes](#breaking-changes-1)
  - [Database Migrations](#database-migrations-1)
  - [API Changes](#api-changes-1)
  - [Files Changed](#files-changed-1)
  - [Configuration Changes](#configuration-changes-1)
  - [Security Notes](#security-notes)
  - [Architecture Notes](#architecture-notes)
- [0.6.0 - 01/01/2026](#060---01012026)
  - [Summary](#summary-2)
  - [Breaking Changes](#breaking-changes-2)
  - [Database Migrations](#database-migrations-2)
  - [API Changes](#api-changes-2)
  - [Files Changed](#files-changed-2)
  - [Removed Files](#removed-files)
  - [Configuration Changes](#configuration-changes-2)
  - [Documentation Notes](#documentation-notes-1)
  - [Architecture Notes](#architecture-notes-1)
- [0.5.1 - 29/12/2024](#051---29122024)
  - [Summary](#summary-3)
  - [Breaking Changes](#breaking-changes-3)
  - [Database Migrations](#database-migrations-3)
  - [API Changes](#api-changes-3)
  - [Files Changed](#files-changed-3)
  - [Documentation Notes](#documentation-notes-2)
- [0.5.0 - 29/12/2024](#050---29122024)
  - [Summary](#summary-4)
  - [Breaking Changes](#breaking-changes-4)
  - [Database Migrations](#database-migrations-4)
  - [API Changes](#api-changes-4)
  - [Files Changed](#files-changed-4)
  - [Architecture Notes](#architecture-notes-2)
- [0.4.0 - 29/12/2024](#040---29122024)
  - [Summary](#summary-5)
  - [Breaking Changes](#breaking-changes-5)
  - [Database Migrations](#database-migrations-5)
  - [API Changes](#api-changes-5)
  - [Files Changed](#files-changed-5)
  - [Performance Notes](#performance-notes)
- [0.3.0 - 29/12/2024](#030---29122024)
  - [Summary](#summary-6)
  - [Breaking Changes](#breaking-changes-6)
  - [Database Migrations](#database-migrations-6)
  - [API Changes](#api-changes-6)
  - [Files Changed](#files-changed-6)
  - [Configuration Changes](#configuration-changes-3)
- [0.2.1 - 29/12/2024](#021---29122024)
  - [Summary](#summary-7)
  - [Breaking Changes](#breaking-changes-7)
  - [Database Migrations](#database-migrations-7)
  - [API Changes](#api-changes-7)
  - [Files Changed](#files-changed-7)
  - [Dependencies Updated](#dependencies-updated)
- [0.2.0 - 29/12/2024](#020---29122024)
  - [Summary](#summary-8)
  - [Breaking Changes](#breaking-changes-8)
  - [Database Migrations](#database-migrations-8)
  - [API Changes](#api-changes-8)
  - [Files Changed](#files-changed-8)
  - [Documentation Notes](#documentation-notes-3)
- [0.1.1 - 29/12/2024](#011---29122024)
  - [Summary](#summary-9)
  - [Breaking Changes](#breaking-changes-9)
  - [Database Migrations](#database-migrations-9)
  - [API Changes](#api-changes-9)
  - [Files Changed](#files-changed-9)
  - [Configuration Changes](#configuration-changes-4)
- [0.1.0 - 29/12/2024](#010---29122024)
  - [Summary](#summary-10)
  - [Breaking Changes](#breaking-changes-10)
  - [Database Migrations](#database-migrations-10)
  - [API Changes](#api-changes-10)
  - [Files Changed](#files-changed-10)
  - [Dependencies Updated](#dependencies-updated-1)
  - [Configuration Changes](#configuration-changes-5)
  - [Performance Notes](#performance-notes-1)
  - [Security Notes](#security-notes-1)
  - [Architecture Notes](#architecture-notes-3)

---

## [Unreleased]

### Technical Changes

- Nothing yet

---

## [0.9.1] - 03/01/2026

### Summary

Security hardening and test remediation for template initialisation CLI (US001 Phase 4 completion). Addressed all medium-severity security vulnerabilities and resolved test suite failures, achieving 100% test pass rate (160/160 tests).

### Security Fixes

#### M-01: Path Traversal Protection

Added `validateFilePath()` function in `scripts/lib/file-operations.ts` (lines 34-74):

- Prevents directory traversal attacks using `..` path components
- Validates file paths against project root using `path.resolve()` and `path.relative()`
- Blocks null byte injection (`\0`) in file paths
- Throws descriptive errors for invalid paths

**Impact:** Prevents malicious file path inputs from accessing files outside the project directory.

#### M-02: Input Sanitisation

Added context-aware sanitisation functions in `scripts/lib/replacements.ts` (lines 139-216):

- `sanitiseForJSON()` - Escapes double quotes and backslashes for JSON files
- `sanitiseForMarkdown()` - Removes `<` and `>` characters to prevent HTML injection
- `sanitiseReplacementValue()` - Applies appropriate sanitisation based on file extension

**Impact:** Prevents injection attacks through user-provided replacement values.

#### L-01: Enhanced Package Name Validation

Enhanced validation in `scripts/lib/validators.ts`:

- Added minimum length check (3 characters minimum)
- Added non-ASCII character detection and warning
- Improved error messages with specific npm naming rules
- Maintained existing validation for special characters, uppercase, and npm reserved names

**Impact:** Ensures package names comply with npm registry requirements and prevents encoding issues.

### Bug Fixes

#### Test Suite Remediation (9 Failures Fixed)

**`createTemplateConfig` Tests (5 failures):**

- Added `package.json` file creation in test setup (`beforeEach`)
- Fixed mock filesystem to include all required files
- Ensured test directory structure matches production requirements

**`performReplacements` Test (1 failure):**

- Changed test file from `test.md` to `README.md` to match actual implementation
- Updated test expectations to use real template files

**`verifyReplacements` Tests (3 failures):**

- Created all required template files in `beforeEach` hook
- Added proper UTF-8 content with placeholders
- Ensured file existence before verification

**Result:** 160/160 tests passing (100% pass rate)

### Files Changed

#### Implementation Files (Security Hardening)

| File                             | Changes                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------- |
| `scripts/lib/file-operations.ts` | Added `validateFilePath()` function (+83 lines)                                  |
|                                  | Integrated path validation into `readFile()` and `writeFile()`                   |
|                                  | Added comprehensive JSDoc documentation                                          |
| `scripts/lib/replacements.ts`    | Added `sanitiseForJSON()`, `sanitiseForMarkdown()`, `sanitiseReplacementValue()` |
|                                  | Updated `applyReplacements()` to call sanitisation (+130 lines)                  |
|                                  | Added comprehensive JSDoc documentation                                          |
| `scripts/lib/validators.ts`      | Enhanced `validatePackageName()` with minimum length and ASCII checks (+123)     |
|                                  | Improved error messaging                                                         |
|                                  | Added comprehensive JSDoc documentation                                          |

#### Test Files (Remediation)

| File                                        | Changes                                          |
| ------------------------------------------- | ------------------------------------------------ |
| `scripts/__tests__/init-template.test.ts`   | Fixed mock filesystem setup (+50 lines)          |
|                                             | Added `package.json` creation in `beforeEach`    |
|                                             | Updated file path references                     |
| `scripts/__tests__/validators.test.ts`      | Added tests for new validation rules (+16 lines) |
|                                             | Updated test expectations                        |
| `scripts/__tests__/file-operations.test.ts` | Fixed async timing issues                        |
| `scripts/__tests__/replacements.test.ts`    | Added sanitisation tests                         |

#### Documentation Files

| File                                                             | Status  |
| ---------------------------------------------------------------- | ------- |
| `docs/REFACTORING/REFACTOR-US001-CLI-2026-01-03.MD`              | Created |
| `docs/AUDITS/SECURITY/SECURITY-AUDIT-US001.md`                   | Updated |
| `docs/AUDITS/SYNTAX/SYNTAX-REVIEW-US001.md`                      | Updated |
| `docs/AUDITS/COMPLIANCE/GDPR-COMPLIANCE-REPORT-US001.md`         | Updated |
| `docs/REVIEWS/REVIEW-US001-TDD-SETUP-2026-01-02.MD`              | Updated |
| `docs/SPRINTS/LOGS/COMPLETION-2026-01-03-US001-PHASE-4-FINAL.md` | Created |
| `docs/SETUP.md`                                                  | Created |
| `README.md`                                                      | Updated |
| `template.config.schema.json`                                    | Created |

### Documentation Notes

This release completes US001 (Template Initialisation CLI) with all security vulnerabilities addressed and comprehensive test coverage achieved. The CLI is now production-ready with:

- Path traversal protection
- Input sanitisation for JSON and Markdown files
- Enhanced package name validation
- 100% test pass rate (160/160 tests)
- Security grade: B+ (Good)
- Code review grade: A- (Excellent)

### Architecture Notes

The security fixes maintain the existing modular architecture:

- Path validation is isolated in `file-operations.ts`
- Sanitisation logic is self-contained in `replacements.ts`
- Validation enhancements are confined to `validators.ts`

All security functions are fully tested and documented with JSDoc. The fixes do not introduce breaking changes and maintain backward compatibility with existing usage patterns.

---

## [0.9.0] - 02/01/2026

### Summary

Implemented Phase 2 (Placeholder Replacement Engine) of the template initialisation CLI tool (US001). Created comprehensive file operations module supporting UTF-8 file I/O, in-place content replacement, and backup/rollback capability. Implemented replacement mapping system that transforms user inputs into placeholder-replacement pairs and applies them across multiple files. Added complete workflow orchestration in main CLI script with directory conflict detection, configuration persistence, replacement execution, and verification.

### Breaking Changes

None - extends existing CLI functionality, no changes to library API or existing features.

### Database Migrations

Not applicable - library project.

### API Changes

None - CLI tool is for template initialisation only, not part of exported library API.

### Files Changed

**New Files Added:**

| File                             | Changes                                                                                                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scripts/lib/file-operations.ts` | Created comprehensive file system operations module (235 lines) with UTF-8 file I/O, backup/restore functionality, and progress indicators for batch processing   |
| `scripts/lib/replacements.ts`    | Created replacement mapping module (187 lines) with placeholder-to-replacement transformation, file target listing, regex escaping, and batch content replacement |

**Files Modified:**

| File                        | Changes                                                                                                                                                                                                                                                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scripts/init-template.ts`  | Updated main CLI with complete Phase 2 workflow: `checkDirectoryConflict()` prevents re-initialisation, `createTemplateConfig()` persists configuration to JSON, `performReplacements()` orchestrates file replacement with progress feedback, `verifyReplacements()` validates all placeholders replaced (lines 1-280) |
| `scripts/lib/prompts.ts`    | No functional changes - compatible with Phase 2 workflow                                                                                                                                                                                                                                                                |
| `scripts/lib/validators.ts` | No functional changes - compatible with Phase 2 workflow                                                                                                                                                                                                                                                                |

### Configuration Changes

None - no new configuration files or environment variables required.

### Documentation Notes

**File Operations Module (`file-operations.ts`):**

- `fileExists(filePath: string): Promise<boolean>` - Async file existence check
- `readFile(filePath: string): Promise<string>` - UTF-8 file read operation
- `writeFile(filePath: string, content: string): Promise<void>` - UTF-8 file write operation
- `replaceInFile(filePath: string, replacements: ReplacementMap): Promise<void>` - In-place content replacement with regex escaping
- `createBackup(filePath: string): Promise<string>` - Creates `.bak` backup files before modifications
- `restoreFromBackup(backupPath: string, originalPath: string): Promise<void>` - Rollback capability for failed operations
- `processDirectory(files: string[], replacements: ReplacementMap): Promise<void>` - Batch file processing with progress indicators

**Replacement Mapping Module (`replacements.ts`):**

- `UserAnswers` interface - TypeScript type defining CLI input structure (packageName, packageScope, description, clientName, primaryColour)
- `ReplacementMap` type - Record<string, string> mapping placeholders to replacement values
- `createReplacementMap(answers: UserAnswers): ReplacementMap` - Transforms user inputs into placeholder pairs (e.g., `{{PACKAGE_NAME}}` → actual name)
- `getFilesToModify(): string[]` - Returns comprehensive list of files containing placeholders (package.json, README.md, design tokens, component files)
- `escapeRegExp(string: string): string` - Escapes special regex characters in replacement values
- `applyReplacements(content: string, replacements: ReplacementMap): string` - Applies all placeholder replacements to content string

**Main CLI Workflow Updates (`init-template.ts`):**

- `checkDirectoryConflict(): Promise<boolean>` - Checks for existing `template.config.json` to prevent accidental re-initialisation
- `createTemplateConfig(answers: UserAnswers): Promise<void>` - Persists user answers to `template.config.json` for future reference
- `performReplacements(answers: UserAnswers): Promise<void>` - Orchestrates replacement process with progress feedback (creates backups, applies replacements, logs results)
- `verifyReplacements(): Promise<void>` - Validates no `{{PLACEHOLDER}}` patterns remain in processed files
- Updated `main()` function - Complete Phase 2 workflow: welcome → inputs → confirm → conflict check → replacements → verify → config save → success

### Architecture Notes

**Phase 2 Capabilities:**

- Processes 15+ files across package configuration, documentation, and design tokens
- Supports placeholders: `{{PACKAGE_NAME}}`, `{{PACKAGE_SCOPE}}`, `{{DESCRIPTION}}`, `{{CLIENT_NAME}}`, `{{PRIMARY_COLOUR}}`, `{{PACKAGE_FULL_NAME}}`
- Automatic backup creation before file modifications (`.bak` files)
- Rollback capability if replacement process fails
- Verification step ensures complete placeholder replacement
- Configuration persistence for reference and debugging

**Implementation Status:**

- ✅ Phase 1 Complete: Core CLI Infrastructure (v0.8.0)
- ✅ Phase 2 Complete: Placeholder Replacement Engine (v0.9.0)
- ⏳ Phase 3 Pending: Comprehensive Testing & Error Handling
- ⏳ Phase 4 Pending: Advanced Features (dry-run mode, custom placeholders, undo capability)

**Error Handling:**

- File operations wrapped in try-catch blocks with backup restoration
- Conflict detection prevents accidental data loss
- Verification step catches incomplete replacements
- Progress indicators inform user of long-running operations

**Testing Status:**

- File operations module ready for unit testing
- Replacement mapping module ready for unit testing
- End-to-end workflow ready for integration testing
- Manual testing guide can be expanded for Phase 2 verification

---

## [0.8.0] - 02/01/2026

### Summary

Implemented Phase 1 (Core CLI Infrastructure) of the template initialisation CLI tool (US001). Created interactive prompts
using inquirer.js with comprehensive input validation for package names, hex colours, descriptions, and client names. Added
welcome and success messages with chalk styling. Implemented confirmation workflow allowing users to review inputs before
proceeding. Added npm script `init-template` for CLI execution.

### Breaking Changes

None - new feature addition, no changes to existing functionality.

### Database Migrations

Not applicable - library project.

### API Changes

None - CLI tool is for template initialisation only, not part of exported library API.

### Files Changed

**New Files Added:**

| File                        | Changes                                                                          |
| --------------------------- | -------------------------------------------------------------------------------- |
| `scripts/lib/validators.ts` | Added comprehensive validation functions with JSDoc documentation (166 lines)    |
| `scripts/lib/prompts.ts`    | Added interactive CLI prompt functions with inquirer.js (148 lines)              |
| `scripts/init-template.ts`  | Updated main CLI entry point with Phase 1 implementation (main function updated) |

**Configuration Files Modified:**

| File                | Changes                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------- |
| `package.json`      | Added inquirer@^13.1.0, @types/inquirer@^9.0.9, tsx@^4.21.0 dependencies                 |
| `package.json`      | Added `init-template` script: `"init-template": "npx tsx scripts/init-template.ts"`      |
| `package-lock.json` | Updated with new dependency resolutions for inquirer, @types/inquirer, tsx, and sub-deps |

**Documentation Updated:**

| File                                                      | Changes                                                       |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| `docs/PLANS/PLAN-US001-TEMPLATE-INIT-CLI.MD`              | Updated Phase 1 status to completed with implementation notes |
| `docs/STORIES/US001-TEMPLATE-INIT-CLI.md`                 | Added repository completion status and Phase 1 progress       |
| `docs/SPRINTS/LOGS/COMPLETION-2026-01-02-US001-PHASE1.MD` | Created Phase 1 completion log                                |

### Configuration Changes

| File           | Key                               | Change                                      |
| -------------- | --------------------------------- | ------------------------------------------- |
| `package.json` | `scripts.init-template`           | Added: `"npx tsx scripts/init-template.ts"` |
| `package.json` | `devDependencies.inquirer`        | Added: `^13.1.0`                            |
| `package.json` | `devDependencies.@types/inquirer` | Added: `^9.0.9`                             |
| `package.json` | `devDependencies.tsx`             | Added: `^4.21.0`                            |

### Documentation Notes

- All validation functions include comprehensive JSDoc documentation
- All prompt functions include user-friendly error messages and help text
- Welcome message displays project branding using chalk styling
- Success message provides clear next steps for users
- Confirmation prompt allows users to review all inputs before proceeding

**Validation Functions Implemented:**

- `validatePackageName()` - Validates npm package naming rules (lowercase, no spaces, hyphens/underscores only)
- `validateHexColour()` - Validates 3 or 6 digit hex colour codes with # prefix
- `validateDescription()` - Validates description length (10-200 characters)
- `validateClientName()` - Validates client name length (2-100 characters)

**Prompt Functions Implemented:**

- `displayWelcomeMessage()` - Shows branded welcome message with project information
- `promptUserInputs()` - Collects all required inputs with default value generation
- `confirmInputs()` - Displays summary and requests confirmation
- `displaySuccessMessage()` - Shows completion message with next steps

### Architecture Notes

**Phase 1 Implementation:**

Phase 1 establishes the core CLI infrastructure:

1. **Interactive Prompts**: Uses inquirer.js for professional CLI experience
2. **Input Validation**: Comprehensive validation with helpful error messages
3. **User Experience**: Welcome/success messages, confirmation workflow, default values
4. **TypeScript Safety**: All functions fully typed with JSDoc documentation

**CLI Workflow:**

```text
1. Display welcome message
2. Prompt for user inputs (package name, scope, description, client name, primary colour)
3. Validate each input with immediate feedback
4. Display summary of all inputs
5. Request confirmation
6. Display success message with next steps
```

**Next Phases:**

- **Phase 2**: Placeholder replacement engine for updating template files
- **Phase 3**: Validation and error handling (directory conflicts, file permissions)
- **Phase 4**: Testing and documentation (integration tests, user guide)

**Testing Status:**

- Manual testing completed for all prompt functions
- All validation functions tested with valid and invalid inputs
- CLI can be cancelled at any prompt with Ctrl+C
- Default value generation working correctly

---

## [0.7.2] - 02/01/2026

### Summary

Implemented TDD RED phase for template initialisation CLI tool (US001). Created comprehensive test suite with 154
tests across 4 test files covering validators, string replacements, file operations, and end-to-end initialisation
flow. Added implementation stubs that intentionally throw "Not implemented" errors to ensure tests fail correctly.
Created extensive documentation including test plans, manual testing guides, architectural plans, and review documents.

### Breaking Changes

None - development infrastructure only.

### Database Migrations

Not applicable - library project.

### API Changes

None - no changes to exported library functions.

### Files Changed

**Test Files Added:**

| File                                        | Changes                                                                |
| ------------------------------------------- | ---------------------------------------------------------------------- |
| `scripts/__tests__/validators.test.ts`      | Added 35 tests for input validation (package name, scope, description) |
| `scripts/__tests__/replacements.test.ts`    | Added 30 tests for string replacement operations                       |
| `scripts/__tests__/file-operations.test.ts` | Added 42 tests for file system operations                              |
| `scripts/__tests__/init-template.test.ts`   | Added 47 tests for end-to-end initialisation workflow                  |

**Implementation Stubs Added:**

| File                             | Changes                                                       |
| -------------------------------- | ------------------------------------------------------------- |
| `scripts/lib/validators.ts`      | Added validation function stubs (throw "Not implemented")     |
| `scripts/lib/replacements.ts`    | Added replacement function stubs (throw "Not implemented")    |
| `scripts/lib/file-operations.ts` | Added file operation function stubs (throw "Not implemented") |
| `scripts/lib/prompts.ts`         | Added prompt function stubs (throw "Not implemented")         |
| `scripts/init-template.ts`       | Added main CLI entry point stub (throw "Not implemented")     |

**Documentation Added:**

| File                                                  | Changes                                              |
| ----------------------------------------------------- | ---------------------------------------------------- |
| `docs/PLANS/PLAN-US001-TEMPLATE-INIT-CLI.MD`          | Added comprehensive architectural plan (1,058 lines) |
| `docs/TESTS/TEST-US001-TEMPLATE-INIT-CLI.md`          | Added detailed test plan (649 lines)                 |
| `docs/TESTS/MANUAL/MANUAL-US001-TEMPLATE-INIT-CLI.md` | Added manual testing guide (660 lines)               |
| `docs/REVIEWS/REVIEW-US001-TDD-SETUP-2026-01-02.MD`   | Added TDD setup review (406 lines)                   |
| `docs/REVIEWS/REVIEW-TEST-COVERAGE-2026-01-02.MD`     | Added test coverage review (577 lines)               |

**Configuration Files Modified:**

| File               | Changes                                                                   |
| ------------------ | ------------------------------------------------------------------------- |
| `vitest.config.ts` | Added Vitest configuration for unit testing (globals, coverage reporting) |
| `package.json`     | Updated with test scripts and dependencies                                |

### Configuration Changes

| File               | Key                 | Change                                |
| ------------------ | ------------------- | ------------------------------------- |
| `vitest.config.ts` | `test.globals`      | Set to true for global test functions |
| `vitest.config.ts` | `test.environment`  | Set to node for Node.js environment   |
| `vitest.config.ts` | `coverage.provider` | Set to v8 for code coverage           |
| `vitest.config.ts` | `coverage.reporter` | Configured text, json, html reporters |
| `package.json`     | `scripts.test`      | Updated to use vitest                 |

### Documentation Notes

- Comprehensive test plan defines expected behaviour for all CLI operations
- Manual testing guide provides step-by-step validation procedures
- Architectural plan outlines system design, component interactions, and error handling
- TDD setup review validates RED phase implementation
- Test coverage review analyses test completeness and identifies gaps

**Test Coverage Breakdown:**

- **Validators**: 35 tests covering package name, scope, description validation
- **Replacements**: 30 tests covering placeholder replacement in various file types
- **File Operations**: 42 tests covering file reading, writing, copying, deletion
- **End-to-End**: 47 tests covering complete initialisation workflow

### Architecture Notes

**TDD Methodology:**

- **RED Phase** (Current): Tests written first, all failing intentionally
- **GREEN Phase** (Next): Implement functions to make tests pass
- **REFACTOR Phase** (Future): Optimise and clean up implementation

**Test Structure:**

```text
scripts/
├── __tests__/
│   ├── validators.test.ts       # Input validation tests
│   ├── replacements.test.ts     # String replacement tests
│   ├── file-operations.test.ts  # File system operation tests
│   └── init-template.test.ts    # End-to-end workflow tests
└── lib/
    ├── validators.ts            # Validation function stubs
    ├── replacements.ts          # Replacement function stubs
    ├── file-operations.ts       # File operation stubs
    └── prompts.ts               # User prompt stubs
```

**Implementation Approach:**

- All functions return "Not implemented" errors to ensure tests fail correctly
- Test suite validates expected behaviour before implementation exists
- Documentation-driven development with comprehensive planning and review

---

## [0.7.1] - 02/01/2026

### Summary

Comprehensive markdown linting fixes across the entire codebase. Resolved 1,776+ markdown linting issues including
remark-lint undefined references, line length violations, heading spacing, list spacing, duplicate headings, code block
language specifiers, and bare URL formatting. Added `.markdownlint.json` and `.remarkrc.json` configuration files.

### Breaking Changes

None - documentation formatting only.

### Database Migrations

Not applicable - library project.

### API Changes

None - documentation formatting only.

### Files Changed

**Configuration Files Added:**

- `.markdownlint.json` - Markdown linting rules (120 char limit, GFM tables, emphasis styling)
- `.remarkrc.json` - Remark linting configuration (allows GFM checkboxes)

**Documentation Files Modified (99 files):**

- `.claude/CLAUDE.md` - Fixed line length, heading spacing, list spacing
- `.claude/README.md` - Fixed markdown formatting
- `.claude/SYNTEK-GUIDE.md` - Fixed extensive formatting issues
- `.claude/commands/*.md` - Fixed formatting in all command files (8 files)
- `.github/CODE_OF_CONDUCT.md` - Fixed heading and list spacing
- `.github/CONTRIBUTING.md` - Fixed formatting issues
- `.github/ISSUE_TEMPLATE/bug_report.md` - Fixed spacing
- `.github/SECURITY.md` - Fixed formatting
- `.storybook-web/README.md` - Fixed markdown issues
- `CHANGELOG.md` - Added missing link definitions for versions [0.6.0] and [0.7.0]
- `DOCUMENTATION-INDEX.md` - Fixed extensive formatting
- `README.md` - Fixed line length and spacing
- `RELEASES.md` - Fixed duplicate "Previous Releases" heading, added link definition
- `VERSION-HISTORY.md` - Added link definitions for all version references
- `docs/GITGUIDE.md` - Fixed formatting
- `docs/METRICS/README.md` - Fixed formatting
- `docs/README.md` - Fixed extensive formatting
- `docs/SPRINTS/README.md` - Fixed formatting
- `docs/SPRINTS/SPRINT-*.md` - Fixed formatting in all 23 sprint files
- `docs/SPRINTS/SPRINT-INDEX.md` - Fixed formatting
- `docs/STORIES/*.md` - Fixed formatting in all 42 user story files
- `scripts/pm/README.md` - Fixed malformed code blocks
- `src/README.md` - Fixed formatting
- `src/mobile/README.md` - Fixed formatting
- `src/mobile/components/README.md` - Fixed formatting
- `src/tokens/README.md` - Fixed formatting
- `src/utils/README.md` - Fixed formatting
- `src/web/README.md` - Fixed formatting
- `src/web/components/README.md` - Fixed formatting

**Key Fixes Applied:**

1. **remark-lint-no-undefined-references (637 alerts)** - Added link definitions to CHANGELOG.md and VERSION-HISTORY.md
2. **MD013 (line length - 707 alerts)** - Wrapped long lines, configured 120 char limit with table/code exclusions
3. **MD022 (heading spacing - 127 alerts)** - Added blank lines before/after all headings
4. **MD032 (list spacing - 136 alerts)** - Added blank lines around all lists
5. **MD024 (duplicate headings - 86 alerts)** - Fixed duplicate "Previous Releases" heading in RELEASES.md
6. **MD036 (emphasis as heading - 41 alerts)** - Configured as intentional styling pattern
7. **MD040 (code block language - 39 alerts)** - Added language specifiers (text, bash, markdown, json, etc.)
8. **Bare URLs** - Wrapped all bare URLs in angle brackets for proper rendering

### Configuration Changes

**Markdown Linting Configuration:**

```json
{
  "line-length": {
    "line_length": 120,
    "code_blocks": false,
    "tables": false
  },
  "no-inline-html": {
    "allowed_elements": ["br", "kbd", "details", "summary"]
  },
  "emphasis-style": false
}
```

**Remark Configuration:**

```json
{
  "plugins": [
    "remark-preset-lint-recommended",
    ["remark-lint-list-item-indent", "space"],
    ["remark-lint-checkbox-character-style", { "checked": "x", "unchecked": " " }]
  ]
}
```

### Documentation Notes

- All markdown files now pass markdownlint and remark-lint validation
- Consistent 120 character line length across all documentation
- Proper heading hierarchy and spacing throughout
- All code blocks now have language specifiers for syntax highlighting
- Link references properly defined for version numbers
- No functionality changes - purely formatting improvements

---

## [0.7.0] - 01/01/2026

### Summary

Comprehensive CI/CD infrastructure implementation with GitHub Actions workflows for continuous integration, automated
releases, security scanning (CodeQL, njsscan, Codacy), dependency management, and developer tooling with pre-commit
hooks. Renamed package to @syntek-studio/ui and enhanced developer experience with VS Code settings.

### Breaking Changes

| Change                                                 | Migration Path                                                         | Affected Files                       |
| ------------------------------------------------------ | ---------------------------------------------------------------------- | ------------------------------------ |
| Package renamed from @template/ui to @syntek-studio/ui | Update package.json imports from `@template/ui` to `@syntek-studio/ui` | `package.json` in consuming projects |

### Database Migrations

Not applicable - library project.

### API Changes

None - infrastructure and configuration only.

### Files Changed

| File                                        | Changes                                                                                  |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `.github/workflows/ci.yml`                  | Added CI workflow for linting, type-checking, testing, and building on all pull requests |
| `.github/workflows/release.yml`             | Added automated release workflow triggered on tags (v*.*.\*)                             |
| `.github/workflows/publish-github.yml`      | Added GitHub Packages publishing workflow                                                |
| `.github/workflows/version-check.yml`       | Added version consistency validation workflow                                            |
| `.github/workflows/codeql.yml`              | Added CodeQL security analysis workflow                                                  |
| `.github/workflows/njsscan.yml`             | Added njsscan security scanning workflow                                                 |
| `.github/workflows/codacy-analysis.yml`     | Added Codacy static code analysis workflow                                               |
| `.github/workflows/dependency-review.yml`   | Added dependency vulnerability scanning workflow                                         |
| `.github/dependabot.yml`                    | Added Dependabot configuration for automated dependency updates                          |
| `.github/CONTRIBUTING.md`                   | Added comprehensive contributing guidelines                                              |
| `.github/CODE_OF_CONDUCT.md`                | Added Contributor Covenant Code of Conduct                                               |
| `.github/SECURITY.md`                       | Added security policy and vulnerability reporting guidelines                             |
| `.github/ISSUE_TEMPLATE/bug_report.md`      | Added bug report issue template                                                          |
| `.github/ISSUE_TEMPLATE/feature_request.md` | Added feature request issue template                                                     |
| `.github/PULL_REQUEST_TEMPLATE.md`          | Added pull request template                                                              |
| `.husky/pre-commit`                         | Added pre-commit hook for lint-staged                                                    |
| `package.json`                              | Renamed to @syntek-studio/ui, added husky and lint-staged configuration                  |
| `.vscode/settings.json`                     | Enhanced VS Code workspace settings for TypeScript, ESLint, and formatting               |

### Configuration Changes

| File                            | Key                   | Change                                                             |
| ------------------------------- | --------------------- | ------------------------------------------------------------------ |
| `package.json`                  | `name`                | Changed from @template/ui to @syntek-studio/ui                     |
| `package.json`                  | `lint-staged`         | Added pre-commit hooks for TypeScript, ESLint, and Prettier        |
| `package.json`                  | `scripts.prepare`     | Added husky installation script                                    |
| `.github/workflows/ci.yml`      | `on`                  | Configured to run on pull requests and pushes to main/dev branches |
| `.github/workflows/release.yml` | `on.push.tags`        | Configured to trigger on version tags (v*.*.\*)                    |
| `.github/dependabot.yml`        | `updates`             | Configured weekly npm dependency updates                           |
| `.vscode/settings.json`         | `editor.formatOnSave` | Set to true for automatic formatting                               |
| `.vscode/settings.json`         | `typescript.tsdk`     | Set to use workspace TypeScript version                            |

### Security Notes

- CodeQL analysis scans for JavaScript/TypeScript security vulnerabilities on every push

- njsscan performs Node.js-specific security scanning

- Codacy provides static code analysis with security checks

- Dependency review workflow blocks PRs with vulnerable dependencies

- Dependabot automatically creates PRs for security updates

- Pre-commit hooks enforce code quality and type safety before commits

- Security policy (SECURITY.md) provides clear vulnerability reporting process

### Architecture Notes

**CI/CD Pipeline:**

- All pull requests run comprehensive checks: lint, type-check, test, build

- Version tags automatically trigger release creation and publishing

- GitHub Packages integration for internal package distribution

- Version consistency validation ensures package.json matches git tags

**Security Infrastructure:**

- Multi-layered security scanning (CodeQL, njsscan, Codacy)

- Automated dependency vulnerability detection

- Weekly Dependabot updates for npm packages

- Pre-commit hooks prevent committing code quality issues

**Developer Experience:**

- Husky + lint-staged enforce code quality locally

- VS Code settings provide consistent editor configuration

- Issue and PR templates guide contributions

- Contributing guidelines streamline collaboration

---

## [0.6.0] - 01/01/2026

### Summary

Added ClickUp project management integration with bidirectional GitHub synchronisation, comprehensive sprint planning
documentation, and project management infrastructure.

### Breaking Changes

None - all changes are backwards compatible.

### Database Migrations

Not applicable - library project.

### API Changes

None - infrastructure and documentation only.

### Files Changed

| File                                     | Changes                                                                          |
| ---------------------------------------- | -------------------------------------------------------------------------------- |
| `.github/workflows/clickup-sync.yml`     | Added GitHub Actions workflow for ClickUp synchronisation                        |
| `.env.example`                           | Added environment variable template for ClickUp API                              |
| `.vscode/extensions.json`                | Added recommended VS Code extensions                                             |
| `.vscode/settings.json`                  | Added VS Code workspace settings                                                 |
| `config/clickup.json`                    | Added ClickUp API configuration                                                  |
| `config/pm-status-mapping.json`          | Added PM status mapping for workflow automation                                  |
| `scripts/pm/`                            | Added PM integration scripts for manual task management                          |
| `scripts/env/`                           | Moved environment scripts from root (dev.sh, staging.sh, production.sh, test.sh) |
| `docs/PM-INTEGRATION/README.md`          | Added PM integration overview                                                    |
| `docs/PM-INTEGRATION/SETUP.md`           | Added PM setup guide                                                             |
| `docs/PM-INTEGRATION/TROUBLESHOOTING.md` | Added PM troubleshooting guide                                                   |
| `docs/SPRINTS/`                          | Added 23 sprint planning documents + index                                       |
| `docs/STORIES/`                          | Added 39 user story definitions + delivery plan                                  |
| `.claude/CLAUDE.md`                      | Updated with PM integration documentation                                        |
| `.gitignore`                             | Updated to exclude environment files                                             |
| `DOCUMENTATION-INDEX.md`                 | Updated with PM documentation links                                              |
| `README.md`                              | Updated with PM integration section                                              |

### Removed Files

| File            | Reason                                                       |
| --------------- | ------------------------------------------------------------ |
| `dev.sh`        | Moved to `scripts/env/dev.sh` for better organisation        |
| `staging.sh`    | Moved to `scripts/env/staging.sh` for better organisation    |
| `production.sh` | Moved to `scripts/env/production.sh` for better organisation |
| `test.sh`       | Moved to `scripts/env/test.sh` for better organisation       |

### Configuration Changes

| File                                 | Key                    | Change                                             |
| ------------------------------------ | ---------------------- | -------------------------------------------------- |
| `config/clickup.json`                | `api_base_url`         | Set to ClickUp API v2 endpoint                     |
| `config/pm-status-mapping.json`      | `status_mapping`       | Configured branch/PR to ClickUp status transitions |
| `.github/workflows/clickup-sync.yml` | `on.push/pull_request` | Configured triggers for automatic sync             |

### Documentation Notes

- Comprehensive sprint planning with 23 sprint documents

- 39 user stories defined with acceptance criteria

- PM integration guides for setup and troubleshooting

- Bidirectional sync documentation for GitHub ↔ ClickUp

### Architecture Notes

- GitHub Actions workflow enables automatic ClickUp status updates

- Branch naming convention (`us###/description`) links to ClickUp tasks

- Status mapping: Branch push → In Progress, PR opened → In Review, PR merged → Accepted

---

## [0.5.1] - 29/12/2024

### Summary

Comprehensive documentation overhaul with standardised metadata headers, British English conventions, and improved
structure across all documentation files.

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

Added utility system and enhanced Button components for both web and mobile platforms with improved styling utilities
and type safety.

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

Added comprehensive type system for design tokens and enhanced all token files with TypeScript types and documentation
headers.

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

Enhanced Storybook configuration with TypeScript support, migrated preview configuration from JavaScript to TypeScript,
and added comprehensive Storybook documentation.

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

Introduction of version management system with VERSION-HISTORY.md, CHANGELOG.md, and RELEASES.md for comprehensive
version tracking.

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

Added project configuration and tooling setup including EditorConfig, Git attributes, npm configuration, Prettier,
global TypeScript definitions, and enhanced TypeScript configuration.

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

Initial release of @template/ui shared component library. Established core architecture for cross-platform React
components with TypeScript, Tailwind CSS 4, and Nativewind 4. Implemented comprehensive design token system and
development tooling.

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

**Note:** This project is in pre-MVP (0.x.x) versioning. Breaking changes may occur between minor versions until 1.0.0
is released.

[unreleased]: https://github.com/Syntek-Studio/ui_design_template/compare/v0.7.2...HEAD
[0.7.2]: https://github.com/Syntek-Studio/ui_design_template/compare/v0.7.1...v0.7.2
[0.7.1]: https://github.com/Syntek-Studio/ui_design_template/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/Syntek-Studio/ui_design_template/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/Syntek-Studio/ui_design_template/compare/v0.5.1...v0.6.0
[0.5.1]: https://github.com/Syntek-Studio/ui_design_template/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/Syntek-Studio/ui_design_template/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/Syntek-Studio/ui_design_template/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/Syntek-Studio/ui_design_template/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/Syntek-Studio/ui_design_template/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/Syntek-Studio/ui_design_template/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/Syntek-Studio/ui_design_template/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/Syntek-Studio/ui_design_template/releases/tag/v0.1.0
