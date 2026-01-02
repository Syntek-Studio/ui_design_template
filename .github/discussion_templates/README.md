# .github/discussion_templates/

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
- [Discussion Templates](#discussion-templates)
- [Template Details](#template-details)
  - [Idea Template](#idea-template)
  - [Question Template](#question-template)
  - [Show and Tell Template](#show-and-tell-template)
- [Starting Discussions](#starting-discussions)
  - [Using Discussions in GitHub](#using-discussions-in-github)
  - [Tips for Good Discussions](#tips-for-good-discussions)
  - [Bad vs Good Example](#bad-vs-good-example)
- [Adding New Templates](#adding-new-templates)
  - [When to Add Templates](#when-to-add-templates)
  - [How to Create New Template](#how-to-create-new-template)
  - [Template Best Practices](#template-best-practices)
  - [Example Custom Template](#example-custom-template)
- [Template File Format](#template-file-format)
  - [YAML Format](#yaml-format)
  - [Field Types](#field-types)
  - [Validation Options](#validation-options)
- [Discussion Best Practices](#discussion-best-practices)
  - [For Participants](#for-participants)
  - [For Maintainers](#for-maintainers)
- [Related Sections](#related-sections)

---

## Overview

The `.github/discussion_templates/` folder contains templates for GitHub Discussions, which provide a space for community conversation, questions, and knowledge sharing. Unlike issues (which track bugs and features), discussions are for open-ended conversation and collaboration.

---

## Directory Tree

```
discussion_templates/
├── README.md                 # This file
├── idea.yml                  # Template for sharing ideas and discussions
├── question.yml              # Template for asking questions
└── show-and-tell.yml         # Template for showcasing work and sharing examples
```

---

## Discussion Templates

| Template            | Purpose                 | Use When                                             |
| ------------------- | ----------------------- | ---------------------------------------------------- |
| `idea.yml`          | Share and discuss ideas | You have a proposal or want community input          |
| `question.yml`      | Ask questions           | You need help or have a question about usage         |
| `show-and-tell.yml` | Showcase work           | You want to share examples or show what you've built |

---

## Template Details

### Idea Template

**File:** `.github/discussion_templates/idea.yml`

**Purpose:** Structured format for sharing ideas and discussing proposals

**Includes:**

- Clear description of the idea
- Problem being solved
- Proposed solution
- Benefits and use cases
- Alternative approaches considered
- Any design mockups or examples

**When to use:**

- You have an idea for a new feature
- You want to suggest changes to existing features
- You want community input on a design approach
- You want to start a discussion about architecture
- You want to propose a new component or pattern

**Example discussion title:**

- "Should we add a Stepper component?"
- "How should we handle accessibility in form components?"
- "Proposal: Create design token system for spacing"

### Question Template

**File:** `.github/discussion_templates/question.yml`

**Purpose:** Structured format for asking questions

**Includes:**

- Clear question statement
- Context and background
- What you've already tried
- Code examples or component usage
- Expected vs actual behaviour

**When to use:**

- You need help using a component
- You're unsure how to implement something
- You want to understand design decisions
- You have a question about project structure
- You need clarification on documentation

**Example discussion title:**

- "How do I customise Button colours?"
- "What's the best way to handle form validation?"
- "How do I integrate this with my TypeScript project?"

### Show and Tell Template

**File:** `.github/discussion_templates/show-and-tell.yml`

**Purpose:** Showcase work, projects, and examples

**Includes:**

- Description of what you're sharing
- Screenshots, videos, or links
- Component combinations or patterns used
- What you learned or built
- Links to code or live examples

**When to use:**

- You've built something with the components
- You want to share an example or pattern
- You want to showcase a creative use case
- You've created a helpful utility or addon
- You want to inspire others with what's possible

**Example discussion title:**

- "Building a product configurator with Button and Modal"
- "Custom hook pattern for managing form state"
- "Creating accessible dropdowns with the Button component"

---

## Starting Discussions

### Using Discussions in GitHub

1. **Go to Discussions tab** in GitHub repository

2. **Click "New Discussion"** button

3. **Select category** (template):
   - "Ideas" - for ideas and proposals
   - "Questions" - for questions and help
   - "Show and Tell" - for examples and showcases

4. **Fill out template** with relevant information

5. **Post discussion** - Community members can reply and contribute

### Tips for Good Discussions

**Clear Title**

- Specific and descriptive
- Indicates the topic or question
- Avoids all-caps or excessive punctuation

**Detailed Description**

- Explain context and background
- Provide specific examples
- Include what you've already tried
- Share relevant code or components

**Supporting Materials**

- Screenshots of your work
- Code examples or snippets
- Links to related documentation
- Videos or GIFs if helpful

**Be Respectful**

- Be open to different viewpoints
- Thank people for their input
- Keep discussion focused and relevant
- Follow community guidelines

### Bad vs Good Example

**Bad Discussion:**

```
Title: Component Question

Description: How do I use this?
```

**Good Discussion:**

```
Title: How do I use the Button component with custom loading state?

Description:
I'm trying to show a loading indicator inside the Button component while submitting a form. Here's what I've tried:

[Code example showing attempt]

Expected: Button shows spinner while submitting
Actual: Loading prop doesn't exist

I found the documentation for basic Button usage, but couldn't find information about loading states. Is this feature supported or should I create a custom implementation?
```

---

## Adding New Templates

### When to Add Templates

Consider adding discussion templates when:

- New category of discussion topics
- Specialised format needed for certain topics
- Community needs more guidance for discussions
- Different team has different discussion needs

### How to Create New Template

1. **Create YAML file** in `.github/discussion_templates/`:

   ```bash
   touch .github/discussion_templates/new-template.yml
   ```

2. **Add template frontmatter**:

   ```yaml
   body:
     - type: markdown
       attributes:
         value: |
           Thank you for starting this discussion!

     - type: textarea
       id: description
       attributes:
         label: Description
         placeholder: Describe...
       validations:
         required: true
   ```

3. **Define template fields**:

   ```yaml
   - type: textarea # Multi-line text input
   - type: input # Single-line text input
   - type: markdown # Static text
   - type: dropdown # Select menu
   - type: checkboxes # Multiple selection
   ```

4. **Commit the template**:
   ```bash
   git add .github/discussion_templates/new-template.yml
   git commit -m "docs(github): add new discussion template"
   ```

### Template Best Practices

- **Clear sections** - Use descriptive labels for each field
- **Helpful placeholders** - Guide users with placeholder text
- **Optional sections** - Mark only essential fields as required
- **Keep it focused** - Don't make templates too long
- **Include instructions** - Add markdown with helpful guidance

### Example Custom Template

```yaml
body:
  - type: markdown
    attributes:
      value: |
        Thank you for sharing a pattern or best practice!

  - type: textarea
    id: pattern-description
    attributes:
      label: Pattern Description
      description: Describe the pattern or best practice you're sharing
      placeholder: What is this pattern and when should it be used?
    validations:
      required: true

  - type: textarea
    id: code-example
    attributes:
      label: Code Example
      description: Share a code example implementing this pattern
      render: typescript
    validations:
      required: true

  - type: textarea
    id: benefits
    attributes:
      label: Why Use This Pattern?
      description: What are the benefits of using this approach?
    validations:
      required: true

  - type: textarea
    id: edge-cases
    attributes:
      label: Edge Cases or Limitations
      description: Are there any edge cases or limitations to be aware of?
```

---

## Template File Format

### YAML Format

Discussion templates use YAML configuration:

```yaml
body:
  - type: markdown
    attributes:
      value: |
        # Welcome!
        Template introduction in markdown

  - type: textarea
    id: field-id
    attributes:
      label: Field Label
      description: Helpful description
      placeholder: Example input
    validations:
      required: true
      min_length: 10
      max_length: 500
```

### Field Types

| Type         | Purpose                  | Example                          |
| ------------ | ------------------------ | -------------------------------- |
| `markdown`   | Static text/instructions | Welcome message, section headers |
| `textarea`   | Multi-line text input    | Descriptions, code examples      |
| `input`      | Single-line text input   | Titles, short answers            |
| `dropdown`   | Select from list         | Category selection               |
| `checkboxes` | Multiple selections      | Feature checklist                |

### Validation Options

- `required: true` - Field must be filled
- `min_length: 10` - Minimum characters
- `max_length: 500` - Maximum characters
- `pattern: '^\d+$'` - Regex pattern validation

---

## Discussion Best Practices

### For Participants

- **Read existing discussions** - Your question might already be answered
- **Search before posting** - Avoid duplicate discussions
- **Be specific** - Provide context and examples
- **Be respectful** - Everyone is volunteering their time
- **Thank contributors** - Acknowledge helpful responses

### For Maintainers

- **Monitor discussions** - Respond to questions promptly
- **Link to docs** - Reference relevant documentation
- **Convert to issues** - If discussion reveals a bug or feature request
- **Archive old discussions** - Keep space tidy for active conversations
- **Learn from discussions** - Use feedback to improve docs and features

---

## Related Sections

- [../README.md](../README.md) - GitHub configuration overview
- [../ISSUE_TEMPLATE/](../ISSUE_TEMPLATE/) - Issue templates
- [../DISCUSSIONS-SETUP.md](../DISCUSSIONS-SETUP.md) - Detailed setup guide
- [../DISCUSSIONS-QUICK-START.md](../DISCUSSIONS-QUICK-START.md) - Quick start guide
- [../../docs/GITGUIDE.md](../../docs/GITGUIDE.md) - Git workflow guide

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
