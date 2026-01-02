# US001: Template Initialisation CLI

**Status:** To Do
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
**Last Updated:** 02/01/2026 16:45

| Repository | Required | Status         | Completed By | Date       |
| ---------- | -------- | -------------- | ------------ | ---------- |
| Shared UI  | ✅       | 🔄 In Progress | Claude Code  | 02/01/2026 |

### Completion Notes

#### Shared UI (Component Library)

- **Status:** In Progress (Phase 1 Complete)
- **Phase 1 Completed:** 02/01/2026
- **Branch:** us001/template-init-cli
- **Commits:** Multiple commits for validators, prompts, and main CLI
- **Notes:**
  - Phase 1 (Core CLI Infrastructure) fully implemented and tested
  - Interactive prompts working with inquirer.js
  - All validation functions implemented with comprehensive JSDoc
  - Welcome and success messages implemented with chalk styling
  - npm script added: `npm run init-template`
  - Dependencies installed: inquirer, @types/inquirer, tsx
  - Remaining: Phases 2-4 (Replacement Engine, Validation/Error Handling, Testing/Documentation)

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

### Phase 2: Placeholder Replacement Engine ⬜ NOT STARTED

- [ ] Create file-operations module
- [ ] Create replacements module
- [ ] Implement replaceInFile() function
- [ ] Define replacement mapping
- [ ] Add progress indicators
- [ ] Test replacements

### Phase 3: Validation and Error Handling ⬜ NOT STARTED

- [ ] Add directory conflict detection
- [ ] Implement error handling
- [ ] Create helpful error messages

### Phase 4: Testing and Documentation ⬜ NOT STARTED

- [ ] Create template.config.json schema
- [ ] Write unit tests for validators
- [ ] Write integration tests
- [ ] Document CLI in docs/SETUP.md
- [ ] Add troubleshooting guide

## Notes

The CLI should be user-friendly with clear prompts and helpful error messages. It should handle edge cases like existing
directories gracefully.

Phase 1 has been completed successfully with all core CLI infrastructure in place. The implementation uses TypeScript for better type safety and follows all documentation standards outlined in CLAUDE.md.

---

**Last Updated:** 02/01/2026
