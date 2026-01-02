# US009: Platform-Specific Component Overrides

**Status:** To Do
**ClickUp ID:** [86c7a9810](https://app.clickup.com/t/86c7a9810)
**Priority:** Must Have
**Story Points:** 5
**Sprint:** Sprint 05

## User Story

As a component developer,
I want to define platform-specific overrides (web vs mobile) in a centralised configuration,
so that components can have different default props or styling based on the target platform.

## Acceptance Criteria

### Scenario 1: Platform Override Definition

- **Given** src/config/platform-overrides.ts exists
- **When** it is loaded
- **Then** it defines platform-specific overrides for web and mobile
- **And** overrides are specific to each component
- **And** web overrides take precedence on web platform, mobile on React Native

### Scenario 2: Mobile-Specific Adjustments

- **Given** a component has different requirements on mobile
- **When** the component is used in React Native
- **Then** mobile-specific overrides are applied
- **And** example: Button might use larger touch targets on mobile
- **And** Text components have mobile-specific line heights

### Scenario 3: Build-Time Platform Selection

- **Given** a component is imported
- **When** the build system processes it
- **Then** the correct platform implementation is selected (web or mobile)
- **And** platform-specific overrides are applied
- **And** unused platform code is tree-shaken from the bundle

## Dependencies

- US008 (Component Defaults Config)
- Both web and mobile component implementations exist

## Tasks

- [ ] Create src/config/platform-overrides.ts
- [ ] Define platform-specific overrides for existing components
- [ ] Add mobile touch target size overrides (minimum 44x44pt)
- [ ] Add text component mobile line height overrides
- [ ] Add input component mobile keyboard handling overrides
- [ ] Export types for platform overrides
- [ ] Update component implementations to use overrides
- [ ] Document platform differences in component docs
- [ ] Test overrides on both web and React Native
- [ ] Create utilities for applying platform-specific config

## Notes

Platform-specific overrides should be minimal and focused on actual differences between platforms. Most styling should be shared through design tokens and Nativewind classes.

---

**Last Updated:** 01/01/2026
