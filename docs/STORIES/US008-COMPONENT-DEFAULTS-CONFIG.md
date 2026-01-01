# US008: Component Default Props Configuration

**Status:** To Do
**Priority:** Must Have
**Story Points:** 5
**Sprint:** Sprint 04

## User Story

As a design system maintainer,
I want to define default props for all components in a centralised configuration,
so that components use consistent defaults across the entire system and client projects can override them as needed.

## Acceptance Criteria

### Scenario 1: Default Props Definition
- **Given** src/config/component-defaults.ts is created
- **When** it is loaded
- **Then** it exports default props for every component (Button, Input, Card, etc.)
- **And** each component's defaults include: variant, size, colour, disabled state
- **And** defaults are typed and match component prop interfaces

### Scenario 2: Component Configuration
- **Given** a component uses defaults
- **When** it is rendered without specific props
- **Then** it applies the default values from component-defaults.ts
- **And** passed props override the defaults
- **And** TypeScript ensures type safety for overrides

### Scenario 3: Client-Specific Overrides
- **Given** a client project wants custom defaults
- **When** they import components
- **Then** they can create a custom defaults file and extend the base configuration
- **And** their overrides are merged with the base defaults
- **And** the component uses the merged configuration

## Dependencies

- US005 (Centralised Theme Config)
- Components already exist (Button, etc.)

## Tasks

- [ ] Create src/config/component-defaults.ts
- [ ] Define defaults for all existing components: Button, Input, Card
- [ ] Add default variant, size, colour for each component
- [ ] Export types for component defaults
- [ ] Update component implementations to use defaults
- [ ] Add TypeScript types for defaults configuration
- [ ] Document how to extend defaults in client projects
- [ ] Add examples of overriding defaults
- [ ] Test that defaults are properly applied
- [ ] Create utilities for merging default configs

## Notes

Component defaults should be carefully chosen based on design system best practices and common use cases. They should enable developers to use components without thinking about props in most situations.

---

**Last Updated:** 01/01/2026
