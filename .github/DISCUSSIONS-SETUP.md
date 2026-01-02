# GitHub Discussions Setup Guide

**Last Updated**: 02/01/2026
**Version**: 1.0.0
**Language**: British English (en_GB)

---

This guide provides instructions for setting up GitHub Discussions on the @syntek-studio/ui repository. Discussions enable
the community to ask questions, share ideas, announce updates, and showcase their work without creating formal issues or
pull requests.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Discussion Categories](#discussion-categories)
  - [Categories to Create](#categories-to-create)
- [Category Details](#category-details)
  - [Announcements](#announcements)
  - [Q\&A](#qa)
  - [Ideas](#ideas)
  - [Show and Tell](#show-and-tell)
  - [General](#general)
- [Discussion Templates](#discussion-templates)
  - [Q\&A Template](#qa-template)
  - [Ideas Template](#ideas-template)
  - [Show and Tell Template](#show-and-tell-template)
- [Moderation Guidelines](#moderation-guidelines)
  - [Maintaining a Healthy Community](#maintaining-a-healthy-community)
  - [Actions to Take](#actions-to-take)
  - [Pinning Important Discussions](#pinning-important-discussions)
- [Best Practices](#best-practices)
  - [For Maintainers](#for-maintainers)
  - [For Contributors](#for-contributors)
- [Configuration Steps](#configuration-steps)
  - [Step 1: Enable Discussions](#step-1-enable-discussions)
  - [Step 2: Create Discussion Categories](#step-2-create-discussion-categories)
    - [Create Each Category](#create-each-category)
  - [Step 3: Create Discussion Templates](#step-3-create-discussion-templates)
  - [Step 4: Pin Welcome Discussion](#step-4-pin-welcome-discussion)

---

## Overview

GitHub Discussions provides a space for community conversations about:

- **Questions about using the library**: Get answers from maintainers and experienced contributors

- **Ideas and feature requests**: Propose enhancements and discuss design decisions

- **Showcasing work**: Share how you're using @syntek-studio/ui in your projects

- **Project announcements**: Share updates, releases, and important information

- **General discussions**: Off-topic conversations and community building

Discussions complement the existing issue and pull request workflows and help keep the repository focused on bug reports
and feature work.

---

## Discussion Categories

### Categories to Create

1. **Announcements**- Project updates and releases

2.**Q&A**- Questions and answers

3.**Ideas**- Feature suggestions and proposals

4.**Show and Tell**- Community projects and examples

5.**General** - Off-topic conversation

---

## Category Details

### Announcements

**Emoji**: Megaphone (📣)

**Purpose**: Share important project updates, new releases, breaking changes, and other announcements.

**Who can start discussions**: Maintainers only (moderated)

**Description**:

```text
Official announcements about @syntek-studio/ui releases, breaking changes, and project updates.

This category is for maintainer announcements only. For discussions about changes, please use the General category.
```

**Example topics**:

- Version 0.8.0 released with Tooltip component

- Breaking changes in Tailwind CSS 4 upgrade

- End-of-life notice for version 0.5.x

- Roadmap updates

---

### Q&A

**Emoji**: Question Mark (❓)

**Purpose**: Ask and answer questions about using @syntek-studio/ui, troubleshooting, and implementation guidance.

**Who can start discussions**: Everyone

**Description**:

```text
Ask questions about using @syntek-studio/ui, troubleshooting issues, and implementation advice.

Before posting:

- Check the documentation at https://docs.template.ui (or your docs URL)

- Search existing questions to see if your question is already answered

- For bugs, please open an issue instead

Mark your question as answered once resolved!
```

**Example topics**:

- How to customise Button styling with Tailwind?

- How to use Mobile.Card in a React Native app?

- Why is TypeScript complaining about my component props?

- Best practices for styling responsive layouts?

---

### Ideas

**Emoji**: Light Bulb (💡)

**Purpose**: Propose new components, features, or improvements to the library.

**Who can start discussions**: Everyone

**Description**:

```text
Suggest new components, features, or improvements to @syntek-studio/ui.

Before posting:

- Check if a similar idea already exists

- Explain the use case and why this addition would be valuable

- Provide examples or mockups if possible

- Discuss trade-offs and alternatives

Ideas that gain community interest may be converted to issues and added to the roadmap.
```

**Example topics**:

- Add a Tabs component with accessibility features

- Support CSS-in-JS styling options

- Create a theme customisation guide

- Add more icon variants to the Icon component

---

### Show and Tell

**Emoji**: Party Popper (🎉)

**Purpose**: Share your projects, components, extensions, or creative uses of @syntek-studio/ui.

**Who can start discussions**: Everyone

**Description**:

```text
Share your projects, applications, or creative uses of @syntek-studio/ui.

This is a space to celebrate the community and show what's being built with our components!

Please include:

- Link to your project (GitHub, live site, etc.)

- Brief description of what you built

- How you're using @syntek-studio/ui

- (Optional) Screenshots or demo links
```

**Example topics**:

- Built an e-commerce dashboard with Button and Card components

- Created a design system wrapper around @syntek-studio/ui for our company

- Contributions: I published my custom Tooltip variations as a package

- Showcase: My open-source admin panel uses @syntek-studio/ui

---

### General

**Emoji**: Chat Bubble (💬)

**Purpose**: Off-topic conversation, project discussion, and community building.

**Who can start discussions**: Everyone

**Description**:

```text
General conversation about @syntek-studio/ui and related topics.

Use this category for:

- Discussions about React Web and React Native development

- Feedback and suggestions about the project

- Community discussions

- Anything else that doesn't fit other categories

Keep conversations respectful and follow the Code of Conduct.
```

**Example topics**:

- Tailwind CSS vs other styling approaches

- React Native vs web component differences

- Best practices for component design

- Feedback on the library's direction

---

## Discussion Templates

Discussion templates help structure conversations and gather important information. Users will see a template option
when creating a new discussion.

### Q&A Template

**File**: `.github/discussion_templates/question.yml`

````yaml
title: 'Your Question Here'
labels: ['question']
body:
  - type: markdown
    attributes:
      value: |
        Thank you for your question! Please provide as much detail as possible to help us assist you.

  - type: textarea
    id: question
    attributes:
      label: Question
      description: What is your question?
      placeholder: |
        Example: How do I customise the Button component's colour?
    validations:
      required: true

  - type: dropdown
    id: component
    attributes:
      label: Component
      description: Which component are you asking about? (if applicable)
      options:
        - Button
        - Card
        - Input
        - Select
        - Checkbox
        - Radio
        - Switch
        - Icon
        - Other
    validations:
      required: false

  - type: dropdown
    id: platform
    attributes:
      label: Platform
      description: Which platform are you developing for?
      options:
        - Web
        - Mobile (React Native)
        - Both
        - Not Sure
    validations:
      required: false

  - type: textarea
    id: code
    attributes:
      label: Code Example
      description: If applicable, please provide a minimal code example that demonstrates your question.
      placeholder: |
        ```typescript
        import { Button } from '@syntek-studio/ui';

        export function MyComponent() {
          return <Button onClick={() => {}}>Click me</Button>;
        }
        ```text
      render: typescript
    validations:
      required: false

  - type: textarea
    id: context
    attributes:
      label: Additional Context
      description: Any other context or information that might help us understand your question?
      placeholder: |
        - Package version: 0.7.0
        - React version: 18.2.0
        - Browser: Chrome 120
        - Error messages: (if any)
    validations:
      required: false

  - type: checkboxes
    id: checklist
    attributes:
      label: Checklist
      options:
        - label: I've read the documentation
          required: false
        - label: I've searched existing discussions
          required: false
        - label: I've provided a minimal code example
          required: false
````

---

### Ideas Template

**File**: `.github/discussion_templates/idea.yml`

````yaml
title: 'Idea: Your Feature Suggestion'
labels: ['idea']
body:
  - type: markdown
    attributes:
      value: |
        Thank you for your suggestion! We value community input on how to improve @syntek-studio/ui.

  - type: textarea
    id: problem
    attributes:
      label: Problem or Use Case
      description: What problem does this idea solve? What's the use case?
      placeholder: |
        Example: Currently, there's no way to create an accessible tabs component.
        I need a Tabs component that supports keyboard navigation and ARIA attributes.
    validations:
      required: true

  - type: textarea
    id: solution
    attributes:
      label: Proposed Solution
      description: How would you like this to work? Describe the API or interface.
      placeholder: |
        ```typescript
        import { Tabs } from '@syntek-studio/ui';

        export function MyTabs() {
          return (
            <Tabs defaultValue="tab1">
              <Tabs.List>
                <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="tab1">Content 1</Tabs.Content>
              <Tabs.Content value="tab2">Content 2</Tabs.Content>
            </Tabs>
          );
        }
        ```text
      render: typescript
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives Considered
      description: What other approaches have you considered?
      placeholder: |
        - Using Headless UI (not web + mobile)
        - Custom implementation (too much boilerplate)
      validations:
      required: false

  - type: dropdown
    id: platforms
    attributes:
      label: Platforms
      description: Which platforms would benefit from this feature?
      options:
        - Web
        - Mobile (React Native)
        - Both
    validations:
      required: true

  - type: textarea
    id: context
    attributes:
      label: Additional Context
      description: Any other information, examples, or mockups?
      placeholder: |
        - Links to similar components in other libraries
        - Screenshots or design mockups
        - User feedback or requests
    validations:
      required: false

  - type: checkboxes
    id: checklist
    attributes:
      label: Checklist
      options:
        - label: I've searched for similar ideas
          required: false
        - label: I've provided example code or mockups
          required: false
        - label: I've considered accessibility implications
          required: false
````

---

### Show and Tell Template

**File**: `.github/discussion_templates/show-and-tell.yml`

```yaml
title: 'Showcase: Project Name'
labels: ['show-and-tell']
body:
  - type: markdown
    attributes:
      value: |
        Excited to share your project? We'd love to see what you've built with @syntek-studio/ui!

  - type: textarea
    id: project
    attributes:
      label: Project Name & Description
      description: What is your project called and what does it do?
      placeholder: |
        Example: MyStore Admin Dashboard
        A modern admin dashboard for managing e-commerce inventory with real-time updates.
    validations:
      required: true

  - type: textarea
    id: usage
    attributes:
      label: How You're Using @syntek-studio/ui
      description: Which components from @syntek-studio/ui are you using and how?
      placeholder: |
        - Button for all interactive elements
        - Card for inventory item cards
        - Input and Select for forms
        - Icon for navigation and status indicators
    validations:
      required: true

  - type: textarea
    id: links
    attributes:
      label: Links
      description: Share links to your project (GitHub repo, live site, etc.)
      placeholder: |
        - GitHub: https://github.com/yourname/project
        - Live Demo: https://mystore-admin.example.com
        - Blog Post: https://example.com/blog/...
    validations:
      required: true

  - type: dropdown
    id: type
    attributes:
      label: Project Type
      options:
        - Open Source Project
        - Commercial Product
        - Design System/Component Wrapper
        - Learning Project
        - Other
    validations:
      required: false

  - type: dropdown
    id: platforms
    attributes:
      label: Platforms Used
      description: Which platforms does your project target?
      options:
        - Web Only
        - Mobile (React Native) Only
        - Both Web and Mobile
        - Web Components in Native App
    validations:
      required: true

  - type: textarea
    id: details
    attributes:
      label: Additional Details
      description: Tell us more about your project!
      placeholder: |
        - Team size, if applicable
        - How long it took to build
        - Lessons learned using @syntek-studio/ui
        - What customisations you made
        - (Optional) Screenshots or demo GIFs
    validations:
      required: false

  - type: checkboxes
    id: checklist
    attributes:
      label: Checklist
      options:
        - label: I've included working links
          required: false
        - label: I've included screenshots or demos (if applicable)
          required: false
        - label: I've credited the @syntek-studio/ui library
          required: false
```

---

## Moderation Guidelines

### Maintaining a Healthy Community

Discussions should remain respectful and constructive. Moderators should:

1. **Welcome new contributors**- Make sure first-time discussants feel valued

2.**Redirect off-topic conversations**- Move spam or off-topic content to General

3.**Archive resolved discussions**- Mark solved Q&As as answered

4.**Link related content**- Connect discussions to issues, PRs, or docs when relevant

5.**Enforce the Code of Conduct**- Ensure discussions follow project standards

### Actions to Take

| Situation                              | Action                                                      |
| -------------------------------------- | ----------------------------------------------------------- |
| Question is answered                   | Mark as answered; ask original poster to select best answer |
| Discussion is off-topic                | Move to General category (only mods can do this)            |
| Spam or inappropriate content          | Delete or hide discussion; warn user if needed              |
| Duplicate discussion                   | Link to original; ask to consolidate if helpful             |
| Excellent contribution                 | React with thumbs up; thank the contributor                 |
| Feature request with community support | Create GitHub issue if suitable; link both                  |
| Question answered in docs              | Link to relevant documentation; offer to clarify            |

### Pinning Important Discussions

Pin important discussions in each category:

-**Announcements**: Latest release or roadmap update

- **Q&A**: Frequently asked questions

- **Ideas**: Community voting on popular feature requests

- **Show and Tell**: Featured community projects

- **General**: Monthly discussion thread or welcome message

---

## Best Practices

### For Maintainers

1. **Respond promptly**- Reply to new discussions within 24-48 hours

2.**Be encouraging**- Thank people for ideas and contributions

3.**Provide clear guidance**- Link to docs, existing issues, or solutions

4.**Set expectations**- Let community know what ideas might be accepted

5.**Highlight good examples**- Pin or promote discussions that others can learn from

6.**Convert to issues**- Create issues from popular feature requests with community consensus

7.**Announce releases**- Use Announcements category for important updates

### For Contributors

1.**Search first**- Check if your question or idea already exists

2.**Provide context**- Include version numbers, code examples, and error messages

3.**Be specific**- Ask clear questions or explain ideas thoroughly

4.**Read feedback**- Be open to suggestions and alternative approaches

5.**Share knowledge**- Help answer questions from other community members

6.**Be respectful**- Follow the Code of Conduct in all discussions

7.**Mark as resolved** - Update your Q&A with solutions you find

---

## Configuration Steps

### Step 1: Enable Discussions

1. Go to your repository settings: `Settings` → `Features`

2. Check the box next to "Discussions"

3. Save changes

### Step 2: Create Discussion Categories

Navigate to `Discussions` tab, then click `New Category`:

#### Create Each Category

**Announcements**

- Title: Announcements

- Emoji: 📣 (megaphone)

- Description: Official project updates and releases

- Allow new discussions: Restricted to maintainers

**Q&A**

- Title: Q&A

- Emoji: ❓ (question mark)

- Description: Ask and answer questions about @syntek-studio/ui

- Allow new discussions: Everyone

**Ideas**

- Title: Ideas

- Emoji: 💡 (light bulb)

- Description: Suggest new components and features

- Allow new discussions: Everyone

**Show and Tell**

- Title: Show and Tell

- Emoji: 🎉 (party popper)

- Description: Share your projects and creative uses of @syntek-studio/ui

- Allow new discussions: Everyone

**General**

- Title: General

- Emoji: 💬 (chat bubble)

- Description: Off-topic discussion and community building

- Allow new discussions: Everyone

### Step 3: Create Discussion Templates

1. Navigate to `.github/discussion_templates/` folder (create if it doesn't exist)

2. Create the following `.yml` files:
   - `question.yml` (use the Q&A Template provided above)
   - `idea.yml` (use the Ideas Template provided above)
   - `show-and-tell.yml` (use the Show and Tell Template provided above)

3. Commit and push to `main` branch

### Step 4: Pin Welcome Discussion

Create a pinned discussion in General category:

**Title**: Welcome to @syntek-studio/ui Discussions!

**Content**:

```````markdown
# Welcome to @syntek-studio/ui Discussions

This is a space for the community to ask questions, share ideas, and celebrate projects built with @syntek-studio/ui.

## Getting Started

- **Have a question?**Post in [Q&A](../../discussions?discussions_q=category%3AQ%26A)

-**Have an idea?**Share it in [Ideas](../../discussions?discussions_q=category%3AIdeas)

-**Want to show off your project?**Post in [Show and Tell](../../discussions?discussions_q=category%3A%22Show+and+tell%22)

-**Want to chat?** Start a [General](../../discussions?discussions_q=category%3AGeneral) discussion

## Guidelines

Please read our [Code of Conduct](../.github/CODE_OF_CONDUCT.md) and [Contributing Guide](../.github/CONTRIBUTING.md).

## Quick Links

- Documentation: [docs.template.ui](https://docs.template.ui)

- Issues & Bug Reports: [GitHub Issues](../../issues)

- Roadmap: [View on ClickUp](https://app.clickup.com/...)

Looking forward to your contributions!

``````markdown
### Step 5: Link to Discussions in Key Files

Update the following files to link to Discussions:

**README.md**

Add under a "Community" or "Getting Help" section:

`````markdown
## Getting Help

- **Questions?**Ask in [Discussions → Q&A](../../discussions?discussions_q=category%3AQ%26A)

-**Have an idea?**Share it in [Discussions → Ideas](../../discussions?discussions_q=category%3AIdeas)

-**Found a bug?** [Open an issue](../../issues/new)

````text

**CONTRIBUTING.md**

Add at the end:

```markdown

## Questions?

Open a [discussion](../../discussions) for questions or ideas.
````
`````
``````
```````

````

```

```

```

```

```

### Step 6: Set Up Notification Settings (Optional)

As a maintainer, configure notifications:

1. Go to `Settings` → `Notifications`

2. Enable notifications for discussions

3. Set preferences for different discussion categories

---

## Maintenance Checklist

Use this checklist to maintain healthy discussions:

- [ ] Weekly: Review new discussions and respond to unanswered questions

- [ ] Weekly: Mark resolved Q&As as answered

- [ ] Monthly: Archive old discussions that are resolved

- [ ] Monthly: Review and pin outstanding feature ideas

- [ ] Quarterly: Review and update category descriptions if needed

- [ ] Quarterly: Create announcement of featured community projects

---

## Related Documentation

- [Contributing Guide](CONTRIBUTING.md)

- [Code of Conduct](CODE_OF_CONDUCT.md)

- [Security Policy](SECURITY.md)

- [GitHub Discussions Documentation](https://docs.github.com/en/discussions)

---

**Last Reviewed**: 02/01/2026

For questions about discussions setup, contact the maintainers or open a discussion!
```
````
