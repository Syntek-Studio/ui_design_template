# docs/PLANS/

**Last Updated**: 02/01/2026
**Version**: 0.7.1
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Directory Tree](#directory-tree)
- [Files](#files)
- [Plan Documentation](#plan-documentation)
  - [Plan Structure](#plan-structure)
  - [Plan Types](#plan-types)
- [Creating New Plans](#creating-new-plans)
  - [When to Create a Plan](#when-to-create-a-plan)
  - [Plan Naming Convention](#plan-naming-convention)
  - [Plan Checklist](#plan-checklist)
  - [Example Plan Outline](#example-plan-outline)
- [Related Sections](#related-sections)

---

## Overview

The `docs/PLANS/` folder contains architectural plans, design specifications, and strategic roadmaps for major features and initiatives. These documents capture the "why" behind significant decisions and provide detailed guidance for implementation.

---

## Directory Tree

```
PLANS/
├── README.md                            # This file
├── PLAN-TEMPLATE-REPOSITORY.MD          # Architectural plan for template repository
├── PLAN-US001-TEMPLATE-INIT-CLI.MD      # Implementation plan for template initialisation CLI
└── TEMPLATE-SUMMARY.MD                  # Summary of template features and architecture
```

---

## Files

| File                              | Purpose                                                                                                               |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `PLAN-TEMPLATE-REPOSITORY.MD`     | Comprehensive architectural plan documenting the template repository design, structure, and considerations            |
| `PLAN-US001-TEMPLATE-INIT-CLI.MD` | Detailed implementation plan for the template initialisation CLI including requirements, design, and testing strategy |
| `TEMPLATE-SUMMARY.MD`             | High-level summary of template features, components, and architectural decisions                                      |

---

## Plan Documentation

### Plan Structure

Each plan document typically includes:

- **Executive Summary** - High-level overview of the feature or initiative
- **Objectives** - Clear goals and desired outcomes
- **Requirements** - Functional and non-functional requirements
- **Design** - Architectural design and component breakdown
- **Implementation Strategy** - Step-by-step implementation approach
- **Testing Plan** - Quality assurance and testing strategy
- **Timeline** - Estimated effort and completion timeline
- **Risks and Mitigation** - Potential challenges and solutions
- **Success Criteria** - How to measure if the plan is successful

### Plan Types

**Architectural Plans** (`PLAN-*.MD`)

- Document major features or system components
- Define system design and relationships
- Explain design decisions and rationale
- Guide development teams during implementation

**Summary Documents** (`TEMPLATE-*.MD`)

- Provide high-level overview of features
- Document key components and their relationships
- Capture important architectural decisions
- Serve as quick reference guides

---

## Creating New Plans

### When to Create a Plan

Create a new plan when:

- Implementing a major feature or initiative
- Refactoring significant portions of the system
- Making architectural decisions affecting multiple systems
- Planning a major release or version update
- Defining strategy for a new module or subsystem

### Plan Naming Convention

Plans use CAPITALISED filenames with descriptive names:

- `PLAN-[FEATURE-NAME].MD` - For feature-specific plans
- `PLAN-[US###]-[DESCRIPTION].MD` - For user story implementations
- `[COMPONENT]-SUMMARY.MD` - For summary documents

### Plan Checklist

When creating a new plan:

1. **Create the file** in `docs/PLANS/` with descriptive name
2. **Include metadata** at the top (Last Updated, Version, etc.)
3. **Add table of contents** with proper anchor links
4. **Write executive summary** - 2-3 paragraphs maximum
5. **Define objectives** - What are we trying to achieve?
6. **Document requirements** - Functional and non-functional
7. **Design the solution** - Architecture, components, relationships
8. **Plan implementation** - Steps, milestones, dependencies
9. **Define testing strategy** - How to verify success
10. **Set success criteria** - How to measure completion

### Example Plan Outline

```markdown
# Plan: [Feature Name]

## Executive Summary

Brief overview of what is being planned and why.

## Objectives

- Objective 1
- Objective 2

## Requirements

### Functional Requirements

- Requirement 1
- Requirement 2

### Non-Functional Requirements

- Performance criteria
- Security requirements

## Design

### Architecture Overview

Description and diagram of system design.

### Component Breakdown

List and describe major components.

## Implementation Strategy

Step-by-step approach to implementation.

## Testing Plan

How to verify the implementation is correct.

## Timeline

Estimated effort and completion dates.

## Risks and Mitigation

Potential challenges and solutions.

## Success Criteria

How to measure if plan was successful.
```

---

## Related Sections

- [../README.md](../README.md) - Documentation index
- [../STORIES/](../STORIES/) - User stories and requirements
- [../SPRINTS/](../SPRINTS/) - Sprint planning and tracking
- [../../.claude/CLAUDE.md](../../.claude/CLAUDE.md) - Project conventions

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
