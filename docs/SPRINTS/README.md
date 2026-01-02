# Sprint Planning - @syntek-studio/ui Design System

**Last Updated:** 01/01/2026
**Version:** 1.0
**Language:** British English (en_GB)
**Timezone:**Europe/London

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
  - [Key Metrics](#key-metrics)
- [Quick Start](#quick-start)
- [Sprint Structure](#sprint-structure)
- [How to Use This Directory](#how-to-use-this-directory)
  - [For Project Managers](#for-project-managers)
  - [For Developers](#for-developers)
  - [For Product Owners](#for-product-owners)
- [Sprint Planning Principles](#sprint-planning-principles)
  - [1. Point Allocation](#1-point-allocation)
  - [2. MoSCoW Priority Order](#2-moscow-priority-order)
  - [3. Dependency Respect](#3-dependency-respect)
  - [4. Phase Progression](#4-phase-progression)
- [Key Files](#key-files)
- [Sprint Status Workflow](#sprint-status-workflow)
  - [Status Definitions](#status-definitions)
  - [Updating Status](#updating-status)

---

## Overview

This directory contains the complete sprint plan for the @syntek-studio/ui component library project. All 39 user stories
(238 story points) have been organised into 23 balanced sprints, each targeting 11 story points per 2-week sprint.

### Key Metrics

-**Total Stories:**39

-**Total Points:**238

-**Total Sprints:**23

-**Sprint Duration:**2 weeks

-**Target Velocity:**11 points/sprint

-**Estimated Timeline:**46 weeks (~11.5 months)

---

## Quick Start

1.**Start here:**Read [SPRINT-INDEX.md](SPRINT-INDEX.md) for complete overview

2.**Current sprint:**Check [SPRINT-01.md](SPRINT-01.md) to begin

3.**Track progress:**Update sprint files as work completes

4.**Review regularly:** Hold sprint reviews and retrospectives

---

## Sprint Structure

Each sprint file follows this format:

```markdown
# Sprint ##: [Theme Name]

**Sprint Goal:** One-sentence objective
**Total Points:** 11
**Priority Focus:** Must Have | Should Have | Could Have
**Phase:**Phase # - Phase Name

## Stories

[Table of stories with IDs, titles, points, priority, phase]

## Dependencies

[List of prerequisite stories]

## Sprint Deliverables

[Key outputs from this sprint]

## Acceptance Criteria

[Checklist of completion criteria]

## Implementation Notes

[Technical guidance and context]

## Repository Breakdown

[Which repos are affected by which stories]

## Risk Assessment

[Identified risks and mitigation strategies]
```

---

## How to Use This Directory

### For Project Managers

1.**Planning:**

- Review [SPRINT-INDEX.md](SPRINT-INDEX.md) for overall roadmap
- Use MoSCoW priorities to guide sprint selection
- Track velocity to adjust future sprint planning

2. **Monitoring:**
   - Update sprint status as work progresses
   - Track points completed vs. committed
   - Identify blockers early

3. **Reporting:**
   - Use sprint summaries for stakeholder updates
   - Track phase completion milestones
   - Report velocity trends

### For Developers

1. **Sprint Preparation:**
   - Read current sprint file thoroughly
   - Review story dependencies in docs/STORIES/
   - Clarify acceptance criteria before starting

2. **During Sprint:**
   - Create branch: `us###/short-description`
   - Update story status in docs/STORIES/ files
   - Track progress against acceptance criteria

3. **Sprint Completion:**
   - Update sprint file with actual completion
   - Document blockers and learnings
   - Prepare for sprint review

### For Product Owners

1. **Prioritisation:**
   - Validate sprint priorities align with business goals
   - Adjust scope if needed (respecting dependencies)
   - Approve acceptance criteria

2. **Stakeholder Management:**
   - Communicate sprint goals and progress
   - Manage expectations on delivery timelines
   - Gather feedback for sprint retrospectives

---

## Sprint Planning Principles

### 1. Point Allocation

Each sprint targets **exactly 11 story points** (or as close as possible given story combinations).

**Valid combinations:**

- 8 + 3 = 11 (most common)

- 5 + 3 + 3 = 11 (limited by 3-point availability)

- 5 + 5 + 1 = 11 (no 1-point stories available)

**Acceptable variance:**±2 points (9-13 points)

### 2. MoSCoW Priority Order

Sprints follow this priority order:

1.**Must Have**(Sprints 1-10) — Core infrastructure and functionality

2.**Should Have**(Sprints 7-15) — Documentation and testing

3.**Could Have**(Sprints 15-23) — Advanced features

### 3. Dependency Respect

Stories with dependencies must be completed in order:

-**Critical Path:**Sprints 1-10 form the core dependency chain

-**Parallel Work:**Sprints 11-23 offer opportunities for parallel development

### 4. Phase Progression

Sprints are organised by project phases:

| Phase   | Sprints | Focus                         |
| ------- | ------- | ----------------------------- |
| Phase 1 | 1-3     | Template Infrastructure       |
| Phase 2 | 3-4     | Theme Configuration System    |
| Phase 3 | 4-7     | Component Theming Integration |
| Phase 4 | 7-10    | Build & Publishing Pipeline   |
| Phase 5 | 10-13   | Documentation & Storybook     |
| Phase 6 | 13-15   | Testing Framework             |
| Phase 7 | 15-23   | Advanced Features             |

---

## Key Files

| File                               | Purpose                              |
| ---------------------------------- | ------------------------------------ |
| [SPRINT-INDEX.md](SPRINT-INDEX.md) | Complete sprint overview and summary |
| [SPRINT-01.md](SPRINT-01.md)       | First sprint: Template foundation    |
| [SPRINT-##.md](SPRINT-01.md)       | Individual sprint plans (01-23)      |
| [README.md](README.md)             | This file - sprint planning guide    |

---

## Sprint Status Workflow

Sprints progress through these statuses:

```text
Planned → In Progress → In Review → Completed
```

### Status Definitions

-**Planned:**Sprint is defined and ready to start

-**In Progress:**Team is actively working on sprint stories

-**In Review:**Sprint work complete, undergoing review

-**Completed:** All stories accepted and merged

### Updating Status

Update the sprint file header when status changes:

`````markdown
**Status:** In Progress
**Started:** 15/01/2026
**Target Completion:** 28/01/2026

````markdown
---

## Updating Sprint Progress

### 1. Start of Sprint

- [ ] Update sprint status to "In Progress"

- [ ] Add start date

- [ ] Review and confirm acceptance criteria

- [ ] Identify any blockers or dependencies

### 2. During Sprint

- [ ] Update story status in docs/STORIES/ files

- [ ] Track progress against acceptance criteria

- [ ] Document blockers in sprint file

- [ ] Update velocity tracking

### 3. End of Sprint

- [ ] Mark sprint status as "Completed"

- [ ] Add completion date

- [ ] Update velocity in SPRINT-INDEX.md

- [ ] Document lessons learned

- [ ] Prepare sprint retrospective

### Example Update

```markdown

## Sprint Metrics (Post-Sprint)

| Metric | Planned | Actual |
|--------|---------|--------|
| Points Committed | 11 | 11 |
| Points Completed | - | 9 |
| Stories Completed | - | 1/2 |
| Velocity | - | 9 |

## Retrospective Notes

**What went well:**
- CLI tool implementation was smooth

- Good collaboration on architecture

**What could improve:**
- Underestimated configuration complexity

- Need clearer acceptance criteria upfront

**Action items:**
- [ ] Refine story estimates for similar work

- [ ] Add more detailed acceptance criteria

- [ ] Carry over US002 (2 points) to Sprint 2
```markdown

---

## Sprint Retrospectives

Hold a retrospective at the end of each sprint to:

1. **Review what went well**— Celebrate successes

2.**Identify improvements**— Address challenges

3.**Create action items**— Specific, measurable improvements

4.**Update velocity** — Adjust future sprint planning

### Retrospective Template

Add to the bottom of each completed sprint file:

```markdown
## Sprint Retrospective

**Date:** DD/MM/YYYY
**Attendees:**[List team members]

### What Went Well

- [Success 1]

- [Success 2]

### What Could Improve

- [Challenge 1]

- [Challenge 2]

### Action Items

- [ ] [Action 1] — Owner: [Name], Due: [Date]

- [ ] [Action 2] — Owner: [Name], Due: [Date]

### Velocity Adjustment

- Previous velocity: X points

- This sprint velocity: Y points

- Adjusted target: Z points
```
````
`````

```

---

## Resources

### Internal Documentation

- [User Stories Index](../STORIES/INDEX.md) — All user stories

- [Delivery Plan](../STORIES/DELIVERY-PLAN.md) — High-level roadmap

- [Project README](../../README.md) — Project overview

- [CLAUDE.md](../../.claude/CLAUDE.md) — Development guidelines

### Sprint Planning Tools

-**ClickUp:**Project management and tracking

-**GitHub:**Branch naming, PR workflow

-**Velocity Tracking:**SPRINT-INDEX.md velocity table

### Best Practices

- Follow conventional commit messages

- Update story status in real-time

- Review dependencies before starting work

- Hold regular sprint reviews and retrospectives

---

## Questions?

-**Sprint planning:**Refer to SPRINT-INDEX.md

-**Story details:** Check docs/STORIES/US###-\*.md files

- **Process questions:** Review CLAUDE.md or ask the team

---

**Created:** 01/01/2026
**Maintained By:** Development Team
**Language:** British English (en_GB)
**Timezone:** Europe/London
```
