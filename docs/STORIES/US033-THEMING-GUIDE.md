# US033: Theming and Customisation Guide

**Status:** To Do
**Priority:** Should Have
**Story Points:** 5
**Sprint:** Sprint 11

## User Story

As a design system implementer,
I want comprehensive theming documentation,
so that I can effectively customise the design system for specific clients.

## Acceptance Criteria

### Scenario 1: Theme Customisation
- **Given** developer wants to create a custom theme
- **When** they read docs/GUIDES/THEMING.md
- **Then** instructions for creating theme configuration are provided
- **And** examples show common customisations
- **And** token structure is clearly explained
- **And** inheritance and overrides are documented

### Scenario 2: Token Extension
- **Given** client needs additional tokens
- **When** they read the token extension guide
- **Then** process for adding custom tokens is documented
- **And** examples show adding custom colours
- **And** examples show adding custom spacing values
- **And** type safety for custom tokens is maintained

### Scenario 3: Theme Application
- **Given** custom theme is created
- **When** developer wants to use it
- **Then** instructions for applying theme are provided
- **And** examples show component usage with custom theme
- **And** runtime theme switching is documented
- **And** theme persistence is explained

## Dependencies

- US005 (Centralised Theme Config)
- US011 (Dark Mode Support)
- US025 (Multi-Theme Support)

## Tasks

- [ ] Create docs/GUIDES/THEMING.md
- [ ] Document theme configuration structure
- [ ] Create theme customisation checklist
- [ ] Add examples: customising primary colour
- [ ] Add examples: adding custom spacing values
- [ ] Document colour generation algorithm
- [ ] Explain accessibility considerations
- [ ] Document override mechanisms
- [ ] Add examples: light/dark theme variations
- [ ] Document token naming conventions
- [ ] Add validation and testing tips

## Notes

Theming documentation is crucial for clients implementing the design system. It should be practical and include many examples of common customisations.

---

**Last Updated:** 01/01/2026
