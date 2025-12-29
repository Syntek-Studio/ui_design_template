# Git Commit Guide

This guide follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for consistent, readable commit history.

## Table of Contents

- [Git Commit Guide](#git-commit-guide)
  - [Table of Contents](#table-of-contents)
  - [Commit Template](#commit-template)
  - [Definitions](#definitions)
    - [Types](#types)
    - [Scope](#scope)
    - [Description](#description)
    - [Body](#body)
  - [Git Commit Commands](#git-commit-commands)
    - [Quick Method: Command Line](#quick-method-command-line)
    - [Editor Method: Full Template](#editor-method-full-template)
    - [Git Editor Commands](#git-editor-commands)
      - [Finding Your Current Editor](#finding-your-current-editor)
      - [Setting Your Preferred Editor](#setting-your-preferred-editor)
      - [Editor-Specific Commands](#editor-specific-commands)
  - [Useful Git Commands](#useful-git-commands)
    - [Viewing History](#viewing-history)
    - [Amending Commits](#amending-commits)
    - [Undoing Changes](#undoing-changes)
  - [Pull Request Workflow](#pull-request-workflow)
    - [Branch Strategy](#branch-strategy)
    - [PR Flow Steps](#pr-flow-steps)
  - [PR Template](#pr-template)
    - [Title Format](#title-format)
    - [PR Body Template](#pr-body-template)
    - [Example PR](#example-pr)
  - [Best Practices](#best-practices)
    - [Commit Messages](#commit-messages)
    - [Pull Requests](#pull-requests)
    - [Code Review](#code-review)

## Commit Template

```
type(scope): Description - Summarise

Body - What did you do?

Files Changed:
- List the files you generated or edited
- For created apps just list app-name created
- For files use app-name/folder/file OR app-name/file

Still to do:
- For this user story what is there still to do
```

## Definitions

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | A new feature | `feat(button): add disabled state` |
| `fix` | A bug fix | `fix(card): correct padding on mobile` |
| `docs` | Documentation changes | `docs(readme): update installation steps` |
| `style` | Formatting, missing semicolons, etc.; no code change | `style(button): fix indentation` |
| `refactor` | Code change that neither fixes a bug nor adds a feature | `refactor(tokens): reorganize color structure` |
| `perf` | Code change that improves performance | `perf(card): optimize re-renders` |
| `test` | Adding missing tests or correcting existing tests | `test(button): add variant tests` |
| `build` | Changes to build system or external dependencies | `build: upgrade tailwind to v4` |
| `ci` | Changes to CI configuration files and scripts | `ci: add storybook deployment` |
| `chore` | Other changes that don't modify src or test files | `chore: update gitignore` |
| `revert` | Reverts a previous commit | `revert: undo button changes` |

### Scope

A small scope indicating the part of the codebase affected. Examples:
- `button`, `card`, `input` - Component names
- `tokens`, `theme`, `colors` - Design system parts
- `build`, `deps`, `config` - Infrastructure
- `storybook`, `docs` - Documentation/tooling

### Description

A concise summary (50 chars or less) of what changed. Use imperative mood: "add" not "added", "fix" not "fixed".

### Body

Detailed explanation of what you did and why. Answer:
- **What** changed?
- **Why** was it needed?
- **How** does it work?

## Git Commit Commands

### Quick Method: Command Line

Stage your changes:
```bash
git add .
```

Commit with multi-line message using `-m` flags:
```bash
git commit -m "feat(button): add loading state with spinner animation" \
-m "Added loading prop to Button component that displays a spinner icon and disables interaction. Implemented for both web and native platforms with consistent styling." \
-m "Files Changed:
- src/components/Button/Button.types.ts
- src/components/Button/Button.web.tsx
- src/components/Button/Button.native.tsx
- stories/Button.stories.tsx" \
-m "Still to do:
- Add accessibility labels for loading state
- Add unit tests for loading behavior"
```

**Tip**: The `\` character lets you continue the command on a new line for readability.

### Editor Method: Full Template

For longer commits, use an editor:

```bash
git add .
git commit
```

This opens your default Git editor. Write your commit using the template, then save and close.

### Git Editor Commands

#### Finding Your Current Editor
```bash
git var GIT_EDITOR
```

Common outputs:
- `vim` or `editor` → Vim
- `nano` → Nano
- `code` → VS Code

#### Setting Your Preferred Editor
```bash
# Set VS Code (recommended for beginners)
git config --global core.editor "code --wait"

# Set Nano
git config --global core.editor "nano"

# Set Vim
git config --global core.editor "vim"
```

#### Editor-Specific Commands

| Editor | Save & Exit | Abort |
|--------|-------------|-------|
| **Vim** | `Esc` → `:wq` → `Enter` | `Esc` → `:q!` → `Enter` |
| **Nano** | `Ctrl+O` → `Enter` → `Ctrl+X` | `Ctrl+X` → `N` |
| **VS Code** | `Ctrl+S` or `Cmd+S` → Close tab | Close tab without saving |

## Useful Git Commands

### Viewing History
```bash
# See commit history
git log --oneline --graph --all

# See what changed in last commit
git show

# See changes in a specific file
git log -p src/components/Button/Button.web.tsx
```

### Amending Commits
```bash
# Fix the last commit message
git commit --amend

# Add forgotten files to last commit
git add forgotten-file.ts
git commit --amend --no-edit
```

### Undoing Changes
```bash
# Unstage files (keep changes)
git reset HEAD file.ts

# Discard changes in working directory
git checkout -- file.ts

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

---

## Pull Request Workflow

### Branch Strategy

```
main (production)
  ↑
staging (pre-production)
  ↑
dev (development)
  ↑
testing (QA)
  ↑
feature/your-feature (your work)
```

### PR Flow Steps

1. **Development** → Create PR from `feature/your-feature` to `testing`
   - Complete all automatic tests
   - Perform manual testing
   - Follow PR Template below

2. **QA Testing** → Testing team reviews
   - ✅ **Pass**: QA creates PR from `testing` to `dev`
   - ❌ **Fail**: PR sent back with feedback

3. **Lead Dev Review** → Lead reviews code
   - ✅ **Approve**: Creates PR from `dev` to `staging`
   - ❌ **Changes needed**: PR sent back with feedback

4. **Staging Deploy** → Deploy to staging environment
   - Client tests the feature
   - ✅ **Approve**: PR created to `main`
   - ❌ **Changes needed**: Sent back to development

5. **Production** → Merge to `main` and deploy

---

## PR Template

### Title Format
```
user-story-number/your-feature-name
```

**Examples:**
- `US-123/add-loading-button-state`
- `BUG-456/fix-card-mobile-padding`
- `FEAT-789/implement-dark-mode`

### PR Body Template

```markdown
## Summary
Brief description of what this PR does (2-3 sentences).

## Changes Made
- List all the bodies of your commit messages
- Summarize the key changes

## Files Changed
- List the files you generated or edited
- For created apps just list app-name created
- For files use app-name/folder/file OR app-name/file

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Storybook stories updated (if applicable)
- [ ] Tested on Chrome/Safari
- [ ] Tested on iOS/Android (if native changes)

## Screenshots/Videos
(If applicable, add screenshots or screen recordings)

## Still to do
- For this sprint what is there still to do
- Any known limitations or future improvements

## Related Issues
Closes #123
Relates to #456
```

### Example PR

**Title:** `US-456/add-button-loading-state`

**Body:**
```markdown
## Summary
Added loading state to Button component with spinner animation. Supports both web and React Native platforms.

## Changes Made
- Added `loading` prop to Button component
- Created Spinner component for loading indicator
- Disabled button interaction during loading state
- Updated Storybook stories with loading examples

## Files Changed
- src/components/Button/Button.types.ts
- src/components/Button/Button.web.tsx
- src/components/Button/Button.native.tsx
- src/components/Spinner/Spinner.web.tsx
- src/components/Spinner/Spinner.native.tsx
- stories/Button.stories.tsx

## Testing
- [x] Unit tests pass
- [x] Manual testing completed
- [x] Storybook stories updated
- [x] Tested on Chrome/Safari
- [x] Tested on iOS/Android

## Screenshots
![Button Loading State](link-to-screenshot.png)

## Still to do
- Add accessibility labels for screen readers
- Performance testing with slow network conditions

## Related Issues
Closes #456
```

---

## Best Practices

### Commit Messages
- ✅ **DO**: Keep subject line under 50 characters
- ✅ **DO**: Use imperative mood ("add" not "added")
- ✅ **DO**: Explain *why* in the body, not just *what*
- ❌ **DON'T**: Use vague messages like "fix stuff" or "updates"
- ❌ **DON'T**: Commit unrelated changes together

### Pull Requests
- ✅ **DO**: Keep PRs focused on one feature/fix
- ✅ **DO**: Update documentation and tests
- ✅ **DO**: Rebase on target branch before creating PR
- ❌ **DON'T**: Create PRs with 100+ files changed
- ❌ **DON'T**: Mix multiple features in one PR

### Code Review
- Respond to feedback within 24 hours
- Mark conversations as resolved when addressed
- Thank reviewers for their time and feedback
- Ask questions if feedback is unclear