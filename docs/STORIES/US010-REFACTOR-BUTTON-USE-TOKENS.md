# US010: Refactor Button Component to Use Generated Tokens

**Status:** To Do
**Priority:** Must Have
**Story Points:** 5
**Sprint:** Sprint 05

## User Story

As a component developer,
I want to refactor the Button component to use centralised tokens and configuration,
so that the component reflects the design system's latest tokens and respects client customisations.

## Acceptance Criteria

### Scenario 1: Button Uses Token Colours
- **Given** the Button component is refactored
- **When** it renders with a variant (primary, secondary, success, etc.)
- **Then** colours come from the generated token files
- **And** hover/active states use tokens for proper colour transitions
- **And** disabled state uses appropriate tokens

### Scenario 2: Button Uses Default Configuration
- **Given** Button is rendered without all props
- **When** it is instantiated
- **Then** it applies defaults from component-defaults.ts
- **And** mobile version applies platform-specific overrides
- **And** passed props override defaults

### Scenario 3: Backward Compatibility
- **Given** existing code uses the Button component
- **When** the refactored version is released
- **Then** all existing usage still works without changes
- **And** new token-based styling is applied automatically
- **And** component API remains the same

## Dependencies

- US005 (Centralised Theme Config)
- US006 (Token Generation Script)
- US008 (Component Defaults Config)
- US009 (Platform Overrides Config)

## Tasks

- [ ] Update web Button.tsx to import and use tokens
- [ ] Update mobile Button.native.tsx to import and use tokens
- [ ] Apply colours from tokens.colours in all states
- [ ] Use spacing tokens for padding/margins
- [ ] Use typography tokens for font sizing
- [ ] Apply component defaults configuration
- [ ] Apply platform-specific overrides
- [ ] Test all button variants with new token system
- [ ] Update Button stories to showcase token-based styling
- [ ] Ensure backwards compatibility with existing prop names
- [ ] Run accessibility tests on refactored component

## Notes

This refactoring is an important milestone that demonstrates the token system working end-to-end. It should be tested thoroughly to ensure all styles are correct and performance is not impacted.

---

**Last Updated:** 01/01/2026
