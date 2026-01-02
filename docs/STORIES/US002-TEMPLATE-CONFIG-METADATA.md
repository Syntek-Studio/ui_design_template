# US002: Template Configuration Metadata

**Status:** To Do
**ClickUp ID:** [86c7a97tq](https://app.clickup.com/t/86c7a97tq)
**Priority:** Must Have
**Story Points:** 3
**Sprint:** Sprint 01

## User Story

As a template maintainer,
I want to define template metadata and configuration in a standardised format,
so that initialisation tools and build processes can reliably extract and use this information.

## Acceptance Criteria

### Scenario 1: Template Metadata Configuration

- **Given** a template project directory
- **When** template.config.json exists in the root
- **Then** it contains: name, description, version, author, repository, license
- **And** it includes template-specific fields: defaultPrimaryColour, defaultPackageName, variables

### Scenario 2: Variable Substitution Schema

- **Given** template.config.json defines substitution variables
- **When** the init CLI reads this file
- **Then** it prompts the user for each variable
- **And** variables are correctly replaced in template files during initialisation

### Scenario 3: Validation of Config Format

- **Given** template.config.json exists
- **When** the build process reads it
- **Then** it validates the JSON format is correct
- **And** it reports clear errors if required fields are missing

## Dependencies

- US001 (Template Init CLI)

## Tasks

- [ ] Create template.config.json in project root
- [ ] Define schema: name, description, version, author, repository, license
- [ ] Add template variables section with substitution keys
- [ ] Add example variables for client name, package name, colours
- [ ] Create JSON schema file for validation (template.config.schema.json)
- [ ] Add validation logic to init script
- [ ] Document template.config.json format in docs/SETUP.md
- [ ] Add TypeScript types for template config

## Notes

The template.config.json should be simple and extensible, allowing projects to define custom variables for their specific needs.

---

**Last Updated:** 01/01/2026
