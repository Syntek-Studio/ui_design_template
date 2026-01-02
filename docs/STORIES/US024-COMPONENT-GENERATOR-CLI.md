# US024: Component Generator CLI

**Status:** To Do
**ClickUp ID:** [86c7a98xk](https://app.clickup.com/t/86c7a98xk)
**Priority:** Could Have
**Story Points:** 8
**Sprint:** Sprint 20

## User Story

As a component developer,
I want a CLI tool to generate new component scaffolding,
so that I can quickly create new components following the established patterns.

## Acceptance Criteria

### Scenario 1: Interactive Component Generation

- **Given** `npm run new-component ComponentName` is executed
- **When** the CLI prompts for configuration
- **Then** it asks: component name, description, web/mobile/both, with initial variant
- **And** component folder structure is created
- **And** all necessary files are generated with boilerplate

### Scenario 2: Generated Files

- **Given** component generator completes
- **When** checking the generated structure
- **Then** files include: ComponentName.tsx, ComponentName.stories.tsx, index.ts
- **And** interfaces and types are properly defined
- **And** component follows established patterns
- **And** TypeScript is properly configured

### Scenario 3: Integration with Design System

- **Given** a new component is generated
- **When** it's created
- **Then** it imports design tokens automatically
- **And** it uses componentDefaults when applicable
- **And** it includes accessibility attributes
- **And** Storybook story template is included

## Dependencies

- All component infrastructure established
- Design system patterns solidified

## Tasks

- [ ] Create scripts/new-component.js
- [ ] Add interactive prompts for component configuration
- [ ] Create web component template
- [ ] Create mobile component template
- [ ] Create component story template
- [ ] Create index.ts template
- [ ] Add TypeScript interface generation
- [ ] Add import statements for tokens and utilities
- [ ] Create component folder structure
- [ ] Add accessibility checklist to generated story
- [ ] Document component generator usage
- [ ] Test generated components work correctly

## Notes

Component generator should accelerate development and ensure consistency. Templates should be easy to customize for project-specific needs whilst maintaining established patterns.

---

**Last Updated:** 01/01/2026
