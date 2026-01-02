# US039: Implement Utility Components (Badge, Avatar, Alert, Tooltip)

**Status:** To Do
**ClickUp ID:** [86c7a99z6](https://app.clickup.com/t/86c7a99z6)
**Priority:** Should Have
**Story Points:** 8
**Sprint:**Sprint 19

## User Story

As an application developer,
I want a set of utility components for common UI patterns,
so that I can build interfaces faster without creating custom components.

## Acceptance Criteria

### Scenario 1: Badge Component

-**Given**developer needs to display status indicators

-**When**Badge component is used

-**Then**it displays small, coloured labels

-**And**variants include: default, success, warning, error, info

-**And**size variants are available (small, medium, large)

### Scenario 2: Avatar Component

-**Given**application displays user images

-**When**Avatar component is used

-**Then**it shows circular user image

-**And**initials fallback if no image available

-**And**size variants are available

-**And**presence indicator can be shown

### Scenario 3: Alert Component

-**Given**application needs to show alert messages

-**When**Alert component is used

-**Then**variants include: info, success, warning, error

-**And**icon is shown with appropriate colour

-**And**optional close button is available

-**And** dismissible alerts can be closed

## Dependencies

- US008 (Component Defaults Config)

## Tasks

- [ ] Create src/web/components/Badge/Badge.tsx

- [ ] Create src/mobile/components/Badge/Badge.native.tsx

- [ ] Create src/web/components/Avatar/Avatar.tsx

- [ ] Create src/mobile/components/Avatar/Avatar.native.tsx

- [ ] Create src/web/components/Alert/Alert.tsx

- [ ] Create src/mobile/components/Alert/Alert.native.tsx

- [ ] Create src/web/components/Tooltip/Tooltip.tsx

- [ ] Create src/mobile/components/Tooltip/Tooltip.native.tsx

- [ ] Add component stories with all variants

- [ ] Write unit and accessibility tests

- [ ] Document component APIs

- [ ] Create accessibility checklist for each

## Notes

Utility components should be simple, focused, and reusable. They should follow consistent patterns with other components
in the system and integrate seamlessly with the design tokens.

---

**Last Updated:** 01/01/2026
