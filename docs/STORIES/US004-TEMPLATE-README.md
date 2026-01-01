# US004: Template README with Client-Specific Customisation

**Status:** To Do
**Priority:** Must Have
**Story Points:** 5
**Sprint:** Sprint 03

## User Story

As a template user,
I want a customisable README.md template that gets populated with project-specific information,
so that the scaffolded project has proper documentation out of the box.

## Acceptance Criteria

### Scenario 1: Template README Generation
- **Given** the init CLI is run with client details
- **When** README.template.md is processed
- **Then** placeholders like {{clientName}}, {{packageName}}, {{description}} are replaced
- **And** the generated README.md is specific to the client project
- **And** it includes all standard sections: features, installation, quick start, commands

### Scenario 2: Documentation Structure
- **Given** a generated README.md
- **When** a developer reads it
- **Then** it contains clear sections for: Overview, Installation, Quick Start, Development, Components
- **And** it links to the correct documentation files for the project
- **And** installation instructions use the client-specific package name

### Scenario 3: Customisation of Features
- **Given** the template defines optional feature sections
- **When** the init CLI prompts for features (e.g., "include testing setup?")
- **Then** the README includes only the relevant feature sections
- **And** documentation links point to the correct setup guides

## Dependencies

- US001 (Template Init CLI)
- US002 (Template Config Metadata)

## Tasks

- [ ] Create README.template.md with placeholder variables
- [ ] Define sections: Overview, Features, Installation, Quick Start, Development, Contributing
- [ ] Add placeholder variables: {{clientName}}, {{packageName}}, {{description}}, {{year}}
- [ ] Implement conditional section inclusion based on user choices
- [ ] Add code examples with correct import paths
- [ ] Create replacement logic in init script
- [ ] Add validation for generated README.md structure
- [ ] Ensure all documentation links are correct

## Notes

The template README should be comprehensive yet concise, providing enough information for developers to get started quickly whilst linking to detailed documentation for deeper dives.

---

**Last Updated:** 01/01/2026
