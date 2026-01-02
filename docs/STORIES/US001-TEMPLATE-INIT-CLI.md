# US001: Template Initialisation CLI

**Status:** To Do
**ClickUp ID:** [86c7a97qj](https://app.clickup.com/t/86c7a97qj)
**Priority:** Must Have
**Story Points:** 8
**Sprint:** Sprint 01

## User Story

As a developer,
I want an interactive CLI tool to initialise a new design system template,
so that I can quickly scaffold a client-specific UI component library without manual setup.

## Acceptance Criteria

### Scenario 1: Successful Template Initialisation

- **Given** a developer runs `npm run init-template` in a new project directory
- **When** they answer interactive prompts (client name, package name, primary colour, description)
- **Then** a new template is created with updated package.json, README, and token files
- **And** all references to "@template/ui" are replaced with the client-specific package name
- **And** the project is ready to build immediately without additional configuration

### Scenario 2: Validation of User Input

- **Given** a developer enters invalid package names (uppercase, spaces, special characters)
- **When** the CLI validates the input
- **Then** it shows an error message and prompts again for valid input
- **And** valid package names (lowercase, hyphens allowed) are accepted

### Scenario 3: Directory Already Has Files

- **Given** the target directory contains existing files
- **When** the CLI detects this
- **Then** it asks the user for confirmation to proceed
- **And** only overwrites specified template files, not user files

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

## Notes

The CLI should be user-friendly with clear prompts and helpful error messages. It should handle edge cases like existing directories gracefully.

---

**Last Updated:** 01/01/2026
