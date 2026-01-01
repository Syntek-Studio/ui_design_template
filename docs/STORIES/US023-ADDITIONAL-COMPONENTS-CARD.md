# US023: Implement Card/Container Component

**Status:** To Do
**Priority:** Should Have
**Story Points:** 3
**Sprint:** Sprint 08

## User Story

As an application developer,
I want a Card component for displaying grouped content,
so that I can easily create layouts with visual separation and depth.

## Acceptance Criteria

### Scenario 1: Card Component Structure
- **Given** an application imports Card component
- **When** it renders content inside Card
- **Then** content is wrapped with consistent padding and styling
- **And** card has subtle shadow for depth
- **And** card respects design tokens for spacing and colours

### Scenario 2: Card Variants
- **Given** a Card is rendered with different props
- **When** variant prop is specified (elevated, outlined, flat)
- **Then** appropriate styling is applied:
  - elevated: with shadow
  - outlined: with border only
  - flat: no shadow or border
- **And** all variants maintain proper contrast

### Scenario 3: Responsive Behaviour
- **Given** a Card is rendered on different screen sizes
- **When** viewport changes
- **Then** card adapts padding and font sizes for mobile
- **And** card remains readable on all breakpoints
- **And** touch targets are appropriate for mobile

## Dependencies

- US005 (Centralised Theme Config)
- US008 (Component Defaults Config)

## Tasks

- [ ] Create src/web/components/Card/Card.tsx
- [ ] Create src/mobile/components/Card/Card.native.tsx
- [ ] Add Card stories showing variants
- [ ] Implement elevated, outlined, flat variants
- [ ] Add responsive padding adjustments
- [ ] Write unit tests for Card component
- [ ] Add Card to component exports
- [ ] Create examples: card with title and content
- [ ] Document Card usage and variants
- [ ] Ensure shadow tokens are used correctly

## Notes

Card component should be simple and flexible, primarily serving as a content container with optional visual styling. It should support all common use cases: lists of cards, single cards, card groups.

---

**Last Updated:** 01/01/2026
