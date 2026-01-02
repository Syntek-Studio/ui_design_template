# Sprint 20: Component Generator & Multi-Theme

**Sprint Goal:** Build component generator CLI and multi-theme support
**ClickUp List ID:** [901519283777](https://app.clickup.com/90151635198/v/l/li/901519283777)
**Total Points:** 11
**Priority Focus:** Could Have
**Phase:** Phase 7 - Advanced Features

## Stories

| ID    | Title                                                       | Points | Priority   | Phase   |
| ----- | ----------------------------------------------------------- | ------ | ---------- | ------- |
| US024 | Component Generator CLI                                     | 8      | Could Have | Phase 7 |
| US004 | Template README with Client-Specific Customisation (part 2) | 3      | Must Have  | Phase 1 |

**Sprint Total: 11 points**

## Dependencies

- Component structure patterns established
- Template system complete

## Sprint Deliverables

- Component generator CLI tool
- Automated component scaffolding
- Complete Template README

## Acceptance Criteria

- [ ] Generator CLI creates new components
- [ ] Web and mobile variants generated
- [ ] Storybook stories auto-generated
- [ ] Test files auto-generated
- [ ] Template README finalised
- [ ] All code is reviewed and merged
- [ ] Documentation updated

## Implementation Notes

The component generator should create both web and mobile variants with all necessary boilerplate (stories, tests, index files).

## Repository Breakdown

| Story ID | Backend | Frontend Web | Frontend Mobile | Shared UI     |
| -------- | ------- | ------------ | --------------- | ------------- |
| US024    | ❌      | ❌           | ❌              | ✅ (scripts/) |
| US004    | ❌      | ❌           | ❌              | ✅ (docs/)    |

## Risk Assessment

| Risk                 | Likelihood | Impact | Mitigation                  |
| -------------------- | ---------- | ------ | --------------------------- |
| Generator complexity | Medium     | Medium | Start with simple templates |
| Template maintenance | Medium     | Low    | Version template files      |

---

**Created:** 01/01/2026
**Language:** British English (en_GB)
**Timezone:** Europe/London
