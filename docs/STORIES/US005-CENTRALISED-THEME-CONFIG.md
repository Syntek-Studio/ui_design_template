# US005: Centralised Theme Configuration System

**Status:** To Do
**ClickUp ID:** [86c7a97wm](https://app.clickup.com/t/86c7a97wm)
**Priority:** Must Have
**Story Points:** 8
**Sprint:** Sprint 02

## User Story

As a design system maintainer,
I want a centralised theme configuration file that defines all design tokens in one place,
so that I can manage the entire design system from a single source of truth and generate token files automatically.

## Acceptance Criteria

### Scenario 1: Theme Configuration Structure

- **Given** src/config/theme.config.ts exists
- **When** the configuration is loaded
- **Then** it contains all colour definitions, spacing scales, typography settings, breakpoints
- **And** each section is clearly organised and documented
- **And** it includes base values that can be extended

### Scenario 2: Colour Palette Definition

- **Given** theme.config.ts defines base colours (e.g., primary: "#3b82f6")
- **When** tokens are generated
- **Then** colour shades (50-900) are automatically generated from base colours
- **And** semantic colours (success, error, warning, info) are defined
- **And** the palette is accessible and follows contrast guidelines

### Scenario 3: Token Export Format

- **Given** theme.config.ts is configured
- **When** tokens are generated
- **Then** exports are available in multiple formats: TypeScript, CSS, JSON
- **And** token values can be used in code and styles without duplication
- **And** type definitions are generated for TypeScript usage

## Dependencies

- None (foundation for Phase 2)

## Tasks

- [ ] Create src/config/theme.config.ts with complete theme definition
- [ ] Define colours section: primary, secondary, semantic, neutral with base values
- [ ] Define spacing scale: 0 to 96 in 4px increments
- [ ] Define typography: font families, sizes (xs to 4xl), weights (normal to bold)
- [ ] Define breakpoints: xs, sm, md, lg, xl, 2xl
- [ ] Define shadows: none, sm, base, lg, xl, inner
- [ ] Define borders: radius values, width values
- [ ] Add documentation with colour accessibility notes
- [ ] Export theme configuration for use in token generation
- [ ] Add TypeScript types for theme structure

## Notes

The theme configuration should be the single source of truth for all design decisions. It should be well-documented and easy to understand for designers and developers.

---

**Last Updated:** 01/01/2026
