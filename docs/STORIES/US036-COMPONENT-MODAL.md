# US036: Implement Modal/Dialog Component

**Status:** To Do
**ClickUp ID:** [86c7a99v4](https://app.clickup.com/t/86c7a99v4)
**Priority:** Should Have
**Story Points:** 5
**Sprint:**Sprint 16

## User Story

As an application developer,
I want a Modal/Dialog component,
so that I can display overlays for important user interactions.

## Acceptance Criteria

### Scenario 1: Modal Component

-**Given**developer imports Modal component

-**When**it renders with isOpen prop

-**Then**modal appears as overlay

-**And**background is darkened (backdrop)

-**And**content is centered on screen

-**And**scroll on body is prevented when open

### Scenario 2: Accessibility

-**Given**modal is displayed

-**When**accessibility checks run

-**Then**focus is trapped within modal

-**And**ESC key closes the modal

-**And**ARIA attributes are properly set

-**And**modal role is "dialog" or "alertdialog"

### Scenario 3: Mobile Responsiveness

-**Given**modal is displayed on mobile

-**When**screen size is small

-**Then**modal takes appropriate width/height

-**And**content is scrollable if needed

-**And**close button is easily accessible

-**And** modal doesn't exceed viewport

## Dependencies

- US005 (Centralised Theme Config)

- US008 (Component Defaults Config)

## Tasks

- [ ] Create src/web/components/Modal/Modal.tsx

- [ ] Create src/mobile/components/Modal/Modal.native.tsx

- [ ] Implement backdrop with click-to-close functionality

- [ ] Add focus trap implementation

- [ ] Add keyboard handling (ESC to close)

- [ ] Implement animation for open/close

- [ ] Create Modal stories with examples

- [ ] Add accessibility tests

- [ ] Write unit tests for Modal

- [ ] Document Modal component API

- [ ] Add TypeScript types for modal props

- [ ] Create example: confirmation dialog

## Notes

Modal component should handle focus management and keyboard accessibility properly. It should work well on all screen
sizes and provide clear user feedback for all interactions.

---

**Last Updated:** 01/01/2026
