# Sprint 16: Modal & Bundle Optimisation

**Sprint Goal:** Add Modal component and optimise bundle size
**ClickUp List ID:** [901519283770](https://app.clickup.com/90151635198/v/l/li/901519283770)
**Total Points:** 11
**Priority Focus:** Could Have
**Phase:** Phase 7 - Advanced Features

## Stories

| ID    | Title                            | Points | Priority   | Phase   |
| ----- | -------------------------------- | ------ | ---------- | ------- |
| US036 | Implement Modal/Dialog Component | 5      | Could Have | Phase 7 |
| US026 | Bundle Size Optimisation         | 5      | Could Have | Phase 7 |

**Sprint Total: 11 points** (Note: 10 points)

## Dependencies

- Existing component library structure

## Sprint Deliverables

- Modal/Dialog component for web and mobile

- Bundle size optimisation implementation

- Tree-shaking configuration

- Code-splitting strategies

## Acceptance Criteria

- [ ] Modal component implemented

- [ ] Modal accessible (keyboard nav, focus trap)

- [ ] Bundle size reduced by at least 20%

- [ ] Tree-shaking functional

- [ ] All code is reviewed and merged

- [ ] Documentation updated

## Implementation Notes

Modal requires careful accessibility implementation including focus management, keyboard navigation, and ARIA
attributes. Bundle optimisation should use modern build tools.

## Repository Breakdown

| Story ID | Backend | Frontend Web | Frontend Mobile | Shared UI    |
| -------- | ------- | ------------ | --------------- | ------------ |
| US036    | ❌      | ✅           | ✅              | ✅ (Modal/)  |
| US026    | ❌      | ❌           | ❌              | ✅ (config/) |

## Risk Assessment

| Risk                           | Likelihood | Impact | Mitigation                     |
| ------------------------------ | ---------- | ------ | ------------------------------ |
| Modal accessibility            | Medium     | High   | Comprehensive a11y testing     |
| Bundle optimisation complexity | Medium     | Medium | Use established build patterns |

---

**Created:** 01/01/2026
**Language:** British English (en_GB)
**Timezone:** Europe/London
