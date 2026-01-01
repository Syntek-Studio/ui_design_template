# User Stories

**Last Updated:** 01/01/2026
**Version:** 1.1
**Language:** British English (en_GB)

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Quick Start](#quick-start)
- [Story Structure](#story-structure)
- [Project Phases](#project-phases)
  - [Phase 1: Template Infrastructure (Must Have)](#phase-1-template-infrastructure-must-have)
  - [Phase 2: Theme Configuration System (Must Have)](#phase-2-theme-configuration-system-must-have)
  - [Phase 3: Component Theming Integration (Must Have)](#phase-3-component-theming-integration-must-have)
  - [Phase 4: Build \& Publishing Pipeline (Must Have)](#phase-4-build--publishing-pipeline-must-have)
  - [Phase 5: Documentation \& Storybook (Should Have)](#phase-5-documentation--storybook-should-have)
  - [Phase 6: Testing Framework (Should Have)](#phase-6-testing-framework-should-have)
  - [Phase 7: Advanced Features (Could Have)](#phase-7-advanced-features-could-have)
- [Sprint Assignments](#sprint-assignments)
- [Priority Summary](#priority-summary)
- [Key Files](#key-files)
- [Story Status Workflow](#story-status-workflow)
- [Using Stories for Sprint Planning](#using-stories-for-sprint-planning)
- [Development Workflow](#development-workflow)
- [Story Examples by Category](#story-examples-by-category)
  - [Infrastructure Stories](#infrastructure-stories)
  - [Component Stories](#component-stories)
  - [Documentation Stories](#documentation-stories)
  - [Testing Stories](#testing-stories)
- [Adding New Stories](#adding-new-stories)
- [Next Steps](#next-steps)
- [Resources](#resources)
- [Questions?](#questions)

## Overview

This directory contains comprehensive user stories for the @template/ui component library project. These stories define the work required to build a production-ready, enterprise-grade design system template.

**Total Stories:** 39
**Total Points:** 238
**Total Sprints:** 23
**Sprint Capacity:** 11 points per sprint (2 weeks)

## Quick Start

1. **Start here:** Read [INDEX.md](INDEX.md) for complete overview and roadmap
2. **View sprints:** See [../SPRINTS/SPRINT-INDEX.md](../SPRINTS/SPRINT-INDEX.md) for sprint breakdown
3. **Check progress:** Each story has a status field (To Do, In Progress, In Review, Accepted)
4. **Plan sprints:** Use story points for capacity planning (11 points per sprint)

## Story Structure

Each user story follows this format:

```markdown
# US###: [Title]

**Status:** [To Do | In Progress | In Review | Accepted]
**Priority:** [Must Have | Should Have | Could Have]
**Story Points:** [Fibonacci: 1, 2, 3, 5, 8]
**Sprint:** [Sprint ##]

## User Story

As a [role],
I want [feature],
so that [benefit].

## Acceptance Criteria

[Scenario-based acceptance criteria in BDD format]

## Dependencies

[List of dependent stories or systems]

## Tasks

[Checklist of implementation tasks]

## Notes

[Additional context and technical notes]
```

## Project Phases

### Phase 1: Template Infrastructure (Must Have)

Foundation for scaffolding new design systems from the template.

- Stories: US001-004
- Total Points: 19
- Sprints: 01-03

### Phase 2: Theme Configuration System (Must Have)

Centralised design token management and automated generation.

- Stories: US005-007
- Total Points: 21
- Sprints: 02-04

### Phase 3: Component Theming Integration (Must Have)

Integrate tokens into components and enable theme switching.

- Stories: US008-012
- Total Points: 28
- Sprints: 04-07

### Phase 4: Build & Publishing Pipeline (Must Have)

Automated CI/CD, versioning, and npm publishing.

- Stories: US013-015, US031
- Total Points: 26
- Sprints: 08-10

### Phase 5: Documentation & Storybook (Should Have)

Comprehensive documentation and interactive component showcase.

- Stories: US016-018, US030, US032-035
- Total Points: 40
- Sprints: 06-07, 11-13, 15

### Phase 6: Testing Framework (Should Have)

Unit, accessibility, and visual regression testing.

- Stories: US019-021
- Total Points: 15
- Sprints: 13-15

### Phase 7: Advanced Features (Could Have)

Extended functionality and additional components.

- Stories: US022-029, US036-039
- Total Points: 89
- Sprints: 08, 15-23

## Sprint Assignments

| Sprint | Stories             | Points | Theme                          |
| ------ | ------------------- | ------ | ------------------------------ |
| 01     | US001, US002        | 11     | Template Foundation            |
| 02     | US003, US005        | 11     | Template Completion            |
| 03     | US006, US004        | 13     | Token Generation System        |
| 04     | US007, US008        | 10     | Token Validation & Defaults    |
| 05     | US009, US010        | 10     | Component Theming Integration  |
| 06     | US011, US030        | 11     | Dark Mode & ADRs               |
| 07     | US012, US032, US035 | 11     | Theme Hook & Guides            |
| 08     | US013, US023        | 11     | CI/CD Foundation               |
| 09     | US014               | 8      | Release Automation             |
| 10     | US015, US031        | 10     | Versioning & Setup Guide       |
| 11     | US017, US033        | 13     | Enhanced Storybook             |
| 12     | US016               | 8      | Automated Documentation        |
| 13     | US018, US019        | 10     | Storybook Deployment & Testing |
| 14     | US020, US021        | 10     | Comprehensive Testing          |
| 15     | US034, US022        | 10     | Testing Docs & Input Component |
| 16     | US036, US026        | 10     | Modal & Bundle Optimisation    |
| 17     | US037, US027        | 13     | Form & Token Versioning        |
| 18     | US038               | 8      | Navigation Components          |
| 19     | US039               | 8      | Utility Components             |
| 20     | US024               | 8      | Component Generator            |
| 21     | US025               | 8      | Multi-Theme Support            |
| 22     | US028               | 8      | Internationalisation           |
| 23     | US029               | 8      | Migration Tooling              |

## Priority Summary

| Priority    | Count  | Points  | Sprint Range   |
| ----------- | ------ | ------- | -------------- |
| Must Have   | 16     | 94      | 01-10          |
| Should Have | 11     | 55      | 06-07, 11-15   |
| Could Have  | 12     | 89      | 08, 15-23      |
| **Total**   | **39** | **238** | **23 sprints** |

## Key Files

| File                                                                   | Purpose                          |
| ---------------------------------------------------------------------- | -------------------------------- |
| [INDEX.md](INDEX.md)                                                   | Complete index and roadmap       |
| [DELIVERY-PLAN.md](DELIVERY-PLAN.md)                                   | Delivery timeline and milestones |
| [../SPRINTS/SPRINT-INDEX.md](../SPRINTS/SPRINT-INDEX.md)               | Sprint breakdown and tracking    |
| [US001-TEMPLATE-INIT-CLI.md](US001-TEMPLATE-INIT-CLI.md)               | Phase 1: Template CLI            |
| [US005-CENTRALISED-THEME-CONFIG.md](US005-CENTRALISED-THEME-CONFIG.md) | Phase 2: Theme configuration     |
| [US013-GITHUB-ACTIONS-CI.md](US013-GITHUB-ACTIONS-CI.md)               | Phase 4: CI/CD pipeline          |
| [US016-AUTO-COMPONENT-DOCS.md](US016-AUTO-COMPONENT-DOCS.md)           | Phase 5: Auto documentation      |
| [US019-VITEST-CONFIGURATION.md](US019-VITEST-CONFIGURATION.md)         | Phase 6: Testing framework       |

## Story Status Workflow

Stories progress through these statuses:

1. **To Do** - Ready to be worked on
2. **In Progress** - Currently being implemented
3. **In Review** - Complete, awaiting code review
4. **Accepted** - Approved and merged

Update the status field in each story file as work progresses.

## Using Stories for Sprint Planning

1. **Review sprint:** Check the assigned sprint in each story
2. **Verify dependencies:** Ensure dependent stories are complete
3. **Update status:** Mark stories as "In Progress" when starting
4. **Track progress:** Use story points for velocity tracking
5. **Complete sprint:** Mark all stories as "Accepted" when done

## Development Workflow

For each story:

1. **Create branch:** `us###/short-description` (e.g., `us001/template-init-cli`)
2. **Reference story:** Link to the story file in commits
3. **Track progress:** Update story status in real-time
4. **Submit PR:** Reference story number in PR title
5. **Mark done:** Update story status to "Accepted" when merged

## Story Examples by Category

### Infrastructure Stories

- [US001: Template Initialisation CLI](US001-TEMPLATE-INIT-CLI.md) - Sprint 01
- [US013: GitHub Actions CI Pipeline](US013-GITHUB-ACTIONS-CI.md) - Sprint 08

### Component Stories

- [US010: Refactor Button to Use Tokens](US010-REFACTOR-BUTTON-USE-TOKENS.md) - Sprint 05
- [US022: Input Component](US022-ADDITIONAL-COMPONENTS-INPUT.md) - Sprint 15
- [US036: Modal Component](US036-COMPONENT-MODAL.md) - Sprint 16

### Documentation Stories

- [US016: Auto Component Docs](US016-AUTO-COMPONENT-DOCS.md) - Sprint 12
- [US031: Setup Guide](US031-SETUP-GUIDE.md) - Sprint 10
- [US032: Contributing Guide](US032-CONTRIBUTING-GUIDE.md) - Sprint 07

### Testing Stories

- [US019: Vitest Configuration](US019-VITEST-CONFIGURATION.md) - Sprint 13
- [US020: Accessibility Testing](US020-ACCESSIBILITY-TESTING.md) - Sprint 14
- [US021: Visual Regression Testing](US021-VISUAL-REGRESSION-TESTING.md) - Sprint 14

## Adding New Stories

When adding a new story:

1. **Follow the template** provided in the structure section
2. **Use sequential numbering** (US040, US041, etc.)
3. **Set appropriate priority** (Must/Should/Could Have)
4. **Estimate story points** using Fibonacci scale (max 8 points)
5. **Assign to a sprint** based on capacity (11 points per sprint)
6. **Define clear acceptance criteria** in BDD format
7. **List dependencies** on other stories
8. **Update INDEX.md** with new story reference

## Next Steps

**For Project Managers:**

1. Review [INDEX.md](INDEX.md) for complete overview
2. Review [../SPRINTS/SPRINT-INDEX.md](../SPRINTS/SPRINT-INDEX.md) for sprint breakdown
3. Use the roadmap for release planning
4. Prioritise Must Have stories for initial releases
5. Consider team capacity when adjusting sprints

**For Developers:**

1. Pick a story from the current sprint
2. Create a branch following naming conventions
3. Implement the story following the acceptance criteria
4. Submit a PR referencing the story number
5. Update the story status as work progresses

**For Product Owners:**

1. Use stories as basis for stakeholder communication
2. Track progress through status updates
3. Refine stories based on team feedback
4. Manage priority changes and scope adjustments

## Resources

- [Project README](../../README.md) - Project overview
- [CLAUDE.md](../../.claude/CLAUDE.md) - Development guidelines
- [Sprint Index](../SPRINTS/SPRINT-INDEX.md) - Sprint breakdown
- [Delivery Plan](DELIVERY-PLAN.md) - Timeline and milestones

## Questions?

Refer to the specific story file for details, or check the related documentation in the docs/ folder.

---

**Last Updated:** 01/01/2026
**Maintained By:** Development Team
**Language:** British English (en_GB)
