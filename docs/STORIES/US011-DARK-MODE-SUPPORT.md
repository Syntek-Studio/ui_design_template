# US011: Dark Mode Support in Design System

**Status:** To Do
**Priority:** Must Have
**Story Points:** 8
**Sprint:** Sprint 06

## User Story

As a design system user,
I want the component library to support dark mode,
so that end-user applications can provide a dark theme without custom styling.

## Acceptance Criteria

### Scenario 1: Dark Mode Token Configuration
- **Given** theme.config.ts is configured
- **When** dark mode is enabled
- **Then** alternative colour tokens are generated for dark backgrounds
- **And** contrast is maintained for accessibility in dark mode
- **And** semantic colours (error, success, warning) are adjusted for dark backgrounds

### Scenario 2: Dark Mode CSS Classes
- **Given** a component is rendered with `dark` class
- **When** it displays
- **Then** Tailwind dark: prefix classes apply dark mode styles
- **And** all colour tokens have dark mode variants
- **And** transitions between light and dark are smooth

### Scenario 3: Dark Mode Theme Hook
- **Given** a React application uses the component library
- **When** it imports useTheme() hook
- **Then** it can check current theme and switch between light/dark
- **And** theme preference is persisted to localStorage
- **And** system preference (prefers-color-scheme) is respected by default

## Dependencies

- US005 (Centralised Theme Config)
- US006 (Token Generation Script)

## Tasks

- [ ] Create dark mode colour definitions in theme.config.ts
- [ ] Generate dark mode token variants in token generation
- [ ] Export dark mode colour alternatives
- [ ] Create useTheme() hook for theme switching
- [ ] Implement theme persistence to localStorage
- [ ] Add system preference detection (prefers-color-scheme)
- [ ] Create dark mode CSS custom properties
- [ ] Update all component stories to show both light and dark modes
- [ ] Test contrast ratios in dark mode
- [ ] Document dark mode usage in component documentation
- [ ] Add dark mode support to Storybook

## Notes

Dark mode should be automatically handled by Tailwind's dark mode support. The main work is defining appropriate colour values and creating the theme switching hook for applications.

---

**Last Updated:** 01/01/2026
