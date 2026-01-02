# .github/ISSUE_TEMPLATE/

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
- [Issue Templates](#issue-templates)
- [Template Details](#template-details)
  - [Bug Report Template](#bug-report-template)
  - [Feature Request Template](#feature-request-template)
- [Creating Issues](#creating-issues)
  - [Using Issue Templates in GitHub](#using-issue-templates-in-github)
  - [Tips for Good Issues](#tips-for-good-issues)
  - [Bad vs Good Example](#bad-vs-good-example)
- [Adding New Templates](#adding-new-templates)
  - [When to Add Templates](#when-to-add-templates)
  - [How to Create New Template](#how-to-create-new-template)
  - [Template Best Practices](#template-best-practices)
  - [Example Custom Template](#example-custom-template)
- [Template File Format](#template-file-format)
  - [Markdown Format](#markdown-format)
  - [Best Practices](#best-practices)
- [Related Sections](#related-sections)

---

## Overview

The `.github/ISSUE_TEMPLATE/` folder contains issue templates that provide structured formats for reporting bugs and requesting features. These templates ensure consistent information gathering and help maintainers and contributors triage issues effectively.

---

## Directory Tree

```
ISSUE_TEMPLATE/
├── README.md                 # This file
├── bug_report.md             # Template for reporting bugs
└── feature_request.md        # Template for requesting features
```

---

## Issue Templates

| Template             | Purpose                           | Use When                                         |
| -------------------- | --------------------------------- | ------------------------------------------------ |
| `bug_report.md`      | Structured bug report format      | Something is not working as expected             |
| `feature_request.md` | Structured feature request format | You want to request a new feature or enhancement |

---

## Template Details

### Bug Report Template

**File:** `.github/ISSUE_TEMPLATE/bug_report.md`

**Purpose:** Provides a structured format for reporting bugs

**Includes:**

- Description of the issue
- Steps to reproduce
- Expected vs actual behaviour
- Environment details (browser, OS, version)
- Relevant screenshots or logs

**When to use:**

- Something is broken or not working correctly
- Unexpected error or warning message
- Feature not behaving as documented
- Performance or usability problems

**Example issue title:**

- "Button component not responding to click on iOS"
- "TypeError when rendering modal with empty children"
- "Tailwind classes not applying to mobile components"

### Feature Request Template

**File:** `.github/ISSUE_TEMPLATE/feature_request.md`

**Purpose:** Provides a structured format for requesting features

**Includes:**

- Clear description of feature
- Use cases and motivation
- Proposed solution (if any)
- Alternative approaches considered
- Additional context

**When to use:**

- You want a new component or feature
- You want to enhance existing functionality
- You want to improve documentation
- You want to refactor or optimise something

**Example issue title:**

- "Add loading state to Button component"
- "Implement Dropdown menu component"
- "Create dark mode design tokens"

---

## Creating Issues

### Using Issue Templates in GitHub

1. **Go to Issues tab** in GitHub repository

2. **Click "New Issue"** button

3. **Select template** from options:
   - "Bug report" - for reporting bugs
   - "Feature request" - for requesting features

4. **Fill out template** with relevant information

5. **Submit issue** - GitHub will auto-assign labels and notify relevant team members

### Tips for Good Issues

**Clear Title**

- Specific, not vague ("Button fails to render" not "Something broken")
- Includes relevant context ("...on mobile" or "...in production")

**Detailed Description**

- Explain what you expected to happen
- Explain what actually happened
- Provide steps to reproduce (for bugs)

**Environment Info**

- Browser and version
- Operating system
- Package version from package.json
- Device type (mobile, desktop, tablet)

**Supporting Materials**

- Screenshots or video recordings
- Code snippets or error messages
- Links to affected components
- Browser console errors

### Bad vs Good Example

**Bad Issue:**

```
Title: Button broken

Description: The button doesn't work
```

**Good Issue:**

```
Title: Button component not responding to clicks on iOS Safari

Description:
- When clicking the button on iOS Safari, it does not trigger onClick
- Expected: onClick handler to be called and state to update
- Actual: No handler fires, button appears unresponsive

Steps to reproduce:
1. Open component in iOS Safari
2. Click on button component
3. Check console for errors

Environment:
- iOS 17.2
- Safari 17.2
- @syntek-studio/ui v0.7.1
```

---

## Adding New Templates

### When to Add Templates

Consider adding templates when:

- New type of issue frequently reported
- Specialised information needed for specific issue type
- Community contribution guidelines need specific format
- Different teams need different information structures

### How to Create New Template

1. **Create markdown file** in `.github/ISSUE_TEMPLATE/`:

   ```bash
   touch .github/ISSUE_TEMPLATE/custom-issue.md
   ```

2. **Add frontmatter** (GitHub-specific metadata):

   ```yaml
   ---
   name: Custom Issue
   about: Description of when to use this template
   title: '[CUSTOM] '
   labels: ''
   assignees: ''
   ---
   ```

3. **Add template content**:

   ```markdown
   ## Description

   Clear description of the issue...

   ## Context

   Additional context or background...

   ## Expected outcome

   What should happen...
   ```

4. **Commit the template**:
   ```bash
   git add .github/ISSUE_TEMPLATE/custom-issue.md
   git commit -m "docs(github): add custom issue template"
   ```

### Template Best Practices

- **Keep it focused** - Don't include irrelevant sections
- **Use headers** - Clear section organisation with `##`
- **Add explanations** - Help text in comments for complex fields
- **Set defaults** - Frontmatter can set default labels and assignees
- **Keep it brief** - Only ask essential information

### Example Custom Template

```yaml
---
name: Documentation Issue
about: Report missing or unclear documentation
title: "[DOCS] "
labels: 'documentation'
assignees: 'doc-maintainer'
---

## What documentation is missing or unclear?
Describe the documentation issue...

## What section does this affect?
- [ ] API Documentation
- [ ] Setup Guide
- [ ] Component Documentation
- [ ] Contributing Guide
- [ ] Other

## Where should this be documented?
Where in our docs should this content appear?

## Suggested content
If you have ideas for what the documentation should include, share them here.
```

---

## Template File Format

### Markdown Format

Issue templates use GitHub Flavoured Markdown with special YAML frontmatter:

```yaml
---
name: Template Name # Display name in issue creation dialog
about: Short description # Appears under template name
title: Default issue title # Pre-filled title (use [PREFIX] format)
labels: 'bug,help-wanted' # Auto-apply labels
assignees: 'username' # Auto-assign to user (optional)
---
## Template content starts here
This markdown content appears in the issue form...
```

### Best Practices

- **Name:** Clear, one-word or short phrase (e.g., "Bug Report", "Feature Request")
- **About:** 1-2 sentences on when to use template
- **Title:** Prefix format like `[BUG]` or `[FEATURE]` for easy searching
- **Labels:** Relevant labels that categorise the issue type
- **Content:** Clear sections with explanatory text

---

## Related Sections

- [../README.md](../README.md) - GitHub configuration overview
- [../discussion_templates/](../discussion_templates/) - GitHub discussions templates
- [../../docs/GITGUIDE.md](../../docs/GITGUIDE.md) - Git workflow guide
- [../../README.md](../../README.md) - Main project documentation

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
