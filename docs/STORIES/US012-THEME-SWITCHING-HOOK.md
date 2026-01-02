# US012: Theme Switching Hook Implementation

**Status:** To Do
**ClickUp ID:** [86c7a9851](https://app.clickup.com/t/86c7a9851)
**Priority:** Must Have
**Story Points:** 5
**Sprint:**Sprint 07

## User Story

As a React application developer,
I want a simple hook to switch between light and dark themes,
so that users can toggle themes and the preference is remembered.

## Acceptance Criteria

### Scenario 1: useTheme Hook API

-**Given**an application imports `useTheme` hook

-**When**it calls the hook

-**Then**it returns current theme ('light' or 'dark')

-**And**it provides a setTheme function to change theme

-**And**it provides a toggleTheme function for convenience

### Scenario 2: Theme Persistence

-**Given**a user switches to dark mode

-**When**they close and reopen the application

-**Then**their preference is restored

-**And**theme is stored in localStorage

-**And**key is prefixed with package name (e.g., "mylib-theme")

### Scenario 3: System Preference Detection

-**Given**the application first loads

-**When**no stored preference exists

-**Then**the system prefers-color-scheme is checked

-**And**theme defaults to system preference (light or dark)

-**And** user can still override with explicit choice

## Dependencies

- US011 (Dark Mode Support)

## Tasks

- [ ] Create src/hooks/useTheme.ts hook

- [ ] Implement theme state management

- [ ] Add localStorage persistence

- [ ] Add system preference detection

- [ ] Export useTheme from main index.ts

- [ ] Add TypeScript types for theme values

- [ ] Document hook usage and API

- [ ] Create example: simple theme toggle button

- [ ] Test theme switching in browser

- [ ] Test localStorage persistence

- [ ] Test system preference detection

## Notes

The useTheme hook should be lightweight and not require context providers if used directly. For applications using
multiple theme hooks, a ThemeProvider wrapper can be created as an optional enhancement.

---

**Last Updated:** 01/01/2026
