# US001: Template Initialisation CLI

**Status:** 🔄 In Progress (Phase 3 Complete, Nice to Have Complete)
**ClickUp ID:** [86c7a97qj](https://app.clickup.com/t/86c7a97qj)
**Priority:** Must Have
**Story Points:** 8
**Sprint:**Sprint 01

## User Story

As a developer,
I want an interactive CLI tool to initialise a new design system template,
so that I can quickly scaffold a client-specific UI component library without manual setup.

## Acceptance Criteria

### Scenario 1: Successful Template Initialisation

-**Given**a developer runs `npm run init-template` in a new project directory

-**When**they answer interactive prompts (client name, package name, primary colour, description)

-**Then**a new template is created with updated package.json, README, and token files

-**And**all references to "@syntek-studio/ui" are replaced with the client-specific package name

-**And**the project is ready to build immediately without additional configuration

### Scenario 2: Validation of User Input

-**Given**a developer enters invalid package names (uppercase, spaces, special characters)

-**When**the CLI validates the input

-**Then**it shows an error message and prompts again for valid input

-**And**valid package names (lowercase, hyphens allowed) are accepted

### Scenario 3: Directory Already Has Files

-**Given**the target directory contains existing files

-**When**the CLI detects this

-**Then**it asks the user for confirmation to proceed

-**And** only overwrites specified template files, not user files

## Dependencies

- None (Phase 1 foundation)

## Tasks

- [ ] Create scripts/init-template.js with interactive prompts

- [ ] Add prompts for: client name, package name, primary colour, description

- [ ] Implement input validation for package names

- [ ] Create template configuration schema in template.config.json

- [ ] Add template.config.json example file

- [ ] Implement file placeholder replacement logic

- [ ] Add error handling for directory conflicts

- [ ] Add success message with next steps

- [ ] Update package.json with "init-template" script

- [ ] Add testing for CLI input validation

- [ ] Document CLI usage in docs/SETUP.md

## Repository Completion Status

**Story ID:** US001
**Last Updated:** 02/01/2026 17:35

| Repository | Required | Status         | Completed By | Date                |
| ---------- | -------- | -------------- | ------------ | ------------------- |
| Shared UI  | ✅       | 🔄 In Progress | Claude Code  | Started: 02/01/2026 |

### Completion Notes

#### Shared UI (Component Library)

- **Status:** 🔄 In Progress (Phase 3 Complete)
- **Phase 1 Completed:** 02/01/2026 ✅
- **Phase 2 Completed:** 02/01/2026 ✅
- **Phase 3 Completed:** 02/01/2026 ✅
- **Phase 4 Status:** ⬜ Not Started
- **Branch:** `us001/template-init-cli`
- **Commits:** Multiple commits for validators, prompts, main CLI, replacement engine, and error handling
- **Overall Progress:** 75% (3 of 4 phases complete)

**Completed Work:**

- ✅ Phase 1: Core CLI Infrastructure fully implemented and tested
- ✅ Phase 2: Placeholder Replacement Engine fully implemented
- ✅ Phase 3: Validation and Error Handling fully implemented
- ✅ Interactive prompts working with inquirer.js
- ✅ All validation functions implemented with comprehensive JSDoc
- ✅ Welcome and success messages implemented with chalk styling
- ✅ File operations module with async fs/promises API
- ✅ Replacement mapping for package name, client name, colour, description
- ✅ Progress indicators and verification checks
- ✅ npm script added: `npm run init-template`
- ✅ Dependencies installed: inquirer, @types/inquirer, tsx
- ✅ Directory conflict detection (checkDirectoryConflict)
- ✅ Atomic file operations with rollback (processDirectoryWithRollback)
- ✅ Context-specific error messages with remediation steps

**Remaining Work:**

- ⬜ Phase 4: Testing and Documentation
  - template.config.json schema
  - Unit tests for validators
  - Integration tests
  - Documentation in docs/SETUP.md
  - Troubleshooting guide

## Implementation Progress

### Phase 1: Core CLI Infrastructure ✅ COMPLETED

- [x] Install dependencies (inquirer, @types/inquirer, tsx)
- [x] Create validators module with all validation functions
- [x] Create prompts module with interactive prompts
- [x] Implement welcome message
- [x] Implement success message
- [x] Implement confirmation prompt
- [x] Add npm script to package.json
- [x] Update main() function for Phase 1 flow
- [x] Manual testing completed

### Phase 2: Placeholder Replacement Engine ✅ COMPLETED

- [x] Create file-operations module (`scripts/lib/file-operations.ts`)
- [x] Create replacements module (`scripts/lib/replacements.ts`)
- [x] Implement replaceInFile() function with async fs/promises API
- [x] Define replacement mapping (package name, client name, colour, description)
- [x] Add progress indicators with chalk coloured output
- [x] Implement processDirectory() for batch file processing
- [x] Implement backup/restore functionality
- [x] Update main() function with complete workflow
- [x] Add verifyReplacements() to check for remaining placeholders
- [x] TypeScript type checking passes

### Phase 3: Validation and Error Handling ✅ COMPLETED

- [x] Add directory conflict detection (checkDirectoryConflict)
- [x] Implement error handling with graceful cleanup (processDirectoryWithRollback)
- [x] Create helpful error messages with remediation steps
- [x] Test all validators with edge cases
- [x] TypeScript type checking passes

### Phase 4: Testing and Documentation ⬜ NOT STARTED

- [ ] Create template.config.json schema
- [ ] Write unit tests for validators
- [ ] Write integration tests
- [ ] Document CLI in docs/SETUP.md
- [ ] Add troubleshooting guide

### Nice to Have Features ✅ COMPLETED

- [x] Dry-run mode (`--dry-run`): Preview changes without applying them
- [x] Verbose mode (`--verbose`): Detailed logging of all operations
- [x] JSON output mode (`--json`): Structured JSON for automation

**Implementation Details:**

- `scripts/lib/cli-options.ts`: Added `CliOptions` interface and `parseCliOptions()` function
- `scripts/lib/cli-options.ts`: Added `Logger` class with `log()`, `verbose()`, `setJsonData()`, and `outputJson()` methods
- `scripts/lib/cli-options.ts`: Added `JsonOutputData` interface for type-safe JSON output
- `scripts/lib/cli-help.ts`: Added `displayHelp()` and `isHelpRequested()` functions
- `scripts/lib/file-operations.ts`: All functions support `dryRun` and `logger` parameters
- `scripts/init-template.ts`: Full integration of all three modes in the main CLI workflow

## Notes

The CLI should be user-friendly with clear prompts and helpful error messages. It should handle edge cases like existing
directories gracefully.

Phase 1 has been completed successfully with all core CLI infrastructure in place. The implementation uses TypeScript for better type safety and follows all documentation standards outlined in CLAUDE.md.

---

**Last Updated:** 02/01/2026
