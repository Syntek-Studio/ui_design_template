# Sprint 22: Internationalisation Support

**Sprint Goal:** Implement i18n support for the design system
**Total Points:** 11
**Priority Focus:** Could Have
**Phase:** Phase 7 - Advanced Features

## Stories

| ID | Title | Points | Priority | Phase |
|----|-------|--------|----------|-------|
| US028 | Internationalisation (i18n) Support | 8 | Could Have | Phase 7 |
| US037 | Implement Form Component System (remainder from Sprint 17) | 3 | Could Have | Phase 7 |

**Sprint Total: 11 points**

## Dependencies

- Component library structure established

## Sprint Deliverables

- i18n framework integration
- Component string externalisation
- Language switching support
- Complete form components

## Acceptance Criteria

- [ ] i18n library integrated
- [ ] Component strings externalised
- [ ] Language switching functional
- [ ] RTL support implemented
- [ ] Form components finalised
- [ ] All code is reviewed and merged
- [ ] Documentation updated

## Implementation Notes

i18n support should handle both LTR and RTL languages. Consider using react-i18next or similar library.

## Repository Breakdown

| Story ID | Backend | Frontend Web | Frontend Mobile | Shared UI |
|----------|---------|--------------|-----------------|-----------|
| US028 | ❌ | ✅ | ✅ | ✅ (i18n/) |
| US037 | ❌ | ✅ | ✅ | ✅ (components/) |

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| RTL layout issues | High | High | Thorough RTL testing |
| Translation management | Medium | Medium | Use translation management tools |

---

**Created:** 01/01/2026
**Language:** British English (en_GB)
**Timezone:** Europe/London
