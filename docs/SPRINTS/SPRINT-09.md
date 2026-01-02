# Sprint 09: Release Automation

**Sprint Goal:** Implement automated release and publishing pipeline
**ClickUp List ID:** [901519283758](https://app.clickup.com/90151635198/v/l/li/901519283758)
**Total Points:** 11
**Priority Focus:** Must Have
**Phase:** Phase 4 - Build & Publishing Pipeline

## Stories

| ID    | Title                                                                   | Points | Priority  | Phase   |
| ----- | ----------------------------------------------------------------------- | ------ | --------- | ------- |
| US014 | GitHub Actions Release and Publishing Pipeline                          | 8      | Must Have | Phase 4 |
| US002 | Template README with Client-Specific Customisation (moved from earlier) | 3      | Must Have | Phase 1 |

**Sprint Total: 11 points**

## Dependencies

- US013 (CI Pipeline) must be complete
- npm publishing credentials configured

## Sprint Deliverables

- Automated release workflow
- npm publishing automation
- Complete CI/CD pipeline

## Acceptance Criteria

- [ ] Release workflow triggers on tags
- [ ] Package publishes to npm automatically
- [ ] Changelog generation automated
- [ ] All code is reviewed and merged
- [ ] Documentation updated

## Implementation Notes

The release pipeline should use semantic versioning and automatically publish to npm when tags are pushed. Consider using semantic-release or similar tooling.

## Repository Breakdown

| Story ID | Backend | Frontend Web | Frontend Mobile | Shared UI     |
| -------- | ------- | ------------ | --------------- | ------------- |
| US014    | ❌      | ❌           | ❌              | ✅ (.github/) |

## Risk Assessment

| Risk                   | Likelihood | Impact | Mitigation                |
| ---------------------- | ---------- | ------ | ------------------------- |
| Publishing credentials | Low        | High   | Secure GitHub Secrets     |
| Version conflicts      | Medium     | Medium | Automated version bumping |

---

**Created:** 01/01/2026
**Language:** British English (en_GB)
**Timezone:** Europe/London
