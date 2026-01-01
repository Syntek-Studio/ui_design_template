# US020: Accessibility Testing with jest-axe

**Status:** To Do
**Priority:** Should Have
**Story Points:** 5
**Sprint:** Sprint 14

## User Story

As a component developer,
I want to automatically test components for accessibility violations,
so that all components meet WCAG standards and are accessible to users with disabilities.

## Acceptance Criteria

### Scenario 1: jest-axe Integration
- **Given** a test file imports testing utilities
- **When** a component test uses checkA11y() function
- **Then** axe accessibility checks are run against rendered component
- **And** violations are reported with severity levels
- **And** test fails if critical violations are found

### Scenario 2: Accessibility Rules
- **Given** components are tested with jest-axe
- **When** tests run
- **Then** checks include: colour contrast, ARIA attributes, semantic HTML
- **And** missing alt text is detected
- **And** missing labels are detected
- **And** keyboard navigation issues are identified

### Scenario 3: Accessibility Reporting
- **Given** accessibility tests run
- **When** violations are found
- **Then** violation details are logged with: rule name, description, fix suggestion
- **And** violations can be excluded for justified cases
- **And** accessibility score is tracked over time

## Dependencies

- US019 (Vitest Configuration)

## Tasks

- [ ] Install jest-axe and dependencies
- [ ] Create test utility: checkA11y() wrapper
- [ ] Add jest-axe integration to test-utils
- [ ] Create accessibility test template
- [ ] Add accessibility tests for Button component
- [ ] Add accessibility tests for Input component
- [ ] Add accessibility tests for Card component
- [ ] Document accessibility testing best practices
- [ ] Create rules for ignoring false positives
- [ ] Add accessibility testing to CI pipeline
- [ ] Document WCAG compliance in component docs

## Notes

Accessibility testing should be done at component level, testing for common issues. Not all accessibility issues can be caught automatically, so manual testing and user feedback are also important.

---

**Last Updated:** 01/01/2026
