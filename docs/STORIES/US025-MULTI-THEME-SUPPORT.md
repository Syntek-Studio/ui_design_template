# US025: Multi-Theme Support for Design System

**Status:** To Do
**ClickUp ID:** [86c7a990h](https://app.clickup.com/t/86c7a990h)
**Priority:** Could Have
**Story Points:** 8
**Sprint:**Sprint 21

## User Story

As a design system user,
I want to support multiple themes (e.g., client-specific branding),
so that applications can switch between different visual styles at runtime.

## Acceptance Criteria

### Scenario 1: Theme Configuration

-**Given**multiple theme configurations exist

-**When**a theme is selected

-**Then**all tokens are swapped to match the selected theme

-**And**colours, spacing, and typography can vary per theme

-**And**components automatically use the active theme

### Scenario 2: Runtime Theme Switching

-**Given**an application loads

-**When**user selects a different theme

-**Then**all components immediately reflect the new theme

-**And**theme preference is persisted to localStorage

-**And**no page reload is required

### Scenario 3: Theme Provider

-**Given**an application wraps components in ThemeProvider

-**When**theme context is accessed by components

-**Then**all components receive current theme tokens

-**And**theme can be changed from any component

-**And** TypeScript types ensure theme tokens are always defined

## Dependencies

- US005 (Centralised Theme Config)

- US006 (Token Generation Script)

- US012 (Theme Switching Hook)

## Tasks

- [ ] Create theme configuration structure for multiple themes

- [ ] Implement ThemeProvider context component

- [ ] Create useThemeTokens() hook for accessing current tokens

- [ ] Implement theme token substitution logic

- [ ] Add theme switching capability

- [ ] Create theme persistence logic

- [ ] Generate token files for each theme

- [ ] Document theme creation and customisation

- [ ] Add theme switching example

- [ ] Test theme switching in Storybook

- [ ] Add support for custom theme creation

## Notes

Multi-theme support enables powerful use cases like client branding, seasonal themes, and accessibility-focused themes.
Implementation should be performant to avoid unnecessary re-renders.

---

**Last Updated:** 01/01/2026
