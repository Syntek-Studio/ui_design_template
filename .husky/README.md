# .husky/

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
- [Git Hooks](#git-hooks)
- [Hook Details](#hook-details)
  - [pre-commit Hook](#pre-commit-hook)
  - [pre-push Hook](#pre-push-hook)
  - [post-merge Hook](#post-merge-hook)
- [How Hooks Work](#how-hooks-work)
  - [Hook Lifecycle](#hook-lifecycle)
  - [Hook Behaviour](#hook-behaviour)
- [Bypassing Hooks](#bypassing-hooks)
  - [When You Might Need To](#when-you-might-need-to)
  - [How to Bypass](#how-to-bypass)
    - [Skip pre-commit hook](#skip-pre-commit-hook)
    - [Skip pre-push hook](#skip-pre-push-hook)
    - [Skip all hooks](#skip-all-hooks)
  - [Note](#note)
- [Adding New Hooks](#adding-new-hooks)
  - [Common Git Hooks Available](#common-git-hooks-available)
  - [To Add a New Hook](#to-add-a-new-hook)
  - [Hook Script Template](#hook-script-template)
- [Troubleshooting](#troubleshooting)
  - [Hooks Not Running](#hooks-not-running)
  - [Permission Denied](#permission-denied)
  - [Hooks Running Slowly](#hooks-running-slowly)
- [Related Sections](#related-sections)

---

## Overview

The `.husky/` folder contains Git hooks that automate code quality checks and project maintenance tasks. Git hooks are scripts that run automatically at specific points in the Git workflow, helping enforce code standards and prevent common mistakes.

**Purpose:**

- Enforce code quality standards before commits
- Prevent incomplete or broken code from being pushed
- Automatically update dependencies after merges
- Ensure compliance with project conventions

---

## Directory Tree

```
.husky/
├── README.md                 # This file
├── _/                        # Husky internal files
│   └── .gitignore           # Ignore husky runtime files
├── pre-commit               # Run linting and type checks
├── pre-push                 # Prevent push with failing tests
└── post-merge               # Update dependencies after merge
```

---

## Git Hooks

| Hook         | Purpose                          | Runs When                       |
| ------------ | -------------------------------- | ------------------------------- |
| `pre-commit` | Lint and type-check staged files | Before `git commit`             |
| `pre-push`   | Run tests and type checks        | Before `git push`               |
| `post-merge` | Update dependencies              | After `git merge` or `git pull` |

---

## Hook Details

### pre-commit Hook

**File:** `.husky/pre-commit`

**Purpose:** Ensures code quality before committing

**What it does:**

1. Runs ESLint on staged files
2. Runs TypeScript type checking
3. Aborts commit if issues found

**When it runs:** Before `git commit`

**If it fails:** You must fix linting errors before committing

**Example:**

```bash
$ git commit -m "Add new component"
# pre-commit hook runs...
# ESLint finds style errors
# Commit aborted, fix errors and try again
$ npm run lint:fix
$ git add .
$ git commit -m "Add new component"
# Now pre-commit passes and commit succeeds
```

### pre-push Hook

**File:** `.husky/pre-push`

**Purpose:** Prevents pushing broken code

**What it does:**

1. Runs full test suite
2. Runs type checking
3. Blocks push if tests fail

**When it runs:** Before `git push`

**If it fails:** Tests must pass before pushing

**Example:**

```bash
$ git push origin feature-branch
# pre-push hook runs tests...
# Some tests fail
# Push aborted
$ npm test
# Fix failing tests
$ git push origin feature-branch
# Tests pass, push succeeds
```

### post-merge Hook

**File:** `.husky/post-merge`

**Purpose:** Keeps dependencies up to date after merging

**What it does:**

1. Checks if `package-lock.json` was modified
2. Runs `npm install` if dependencies changed
3. Updates local dependencies automatically

**When it runs:** After `git merge` or `git pull`

**Why:** Prevents using outdated packages after pulling changes

**Example:**

```bash
$ git pull origin main
# Remote includes new dependencies
# post-merge hook runs...
# npm install executes automatically
# Local dependencies updated
```

---

## How Hooks Work

### Hook Lifecycle

1. **Staging code** - Add changes with `git add`
2. **pre-commit runs** - Checks staged files for quality
3. **Committing** - Create commit message
4. **Commit created** - Code saved to local repository
5. **pre-push runs** - Verify tests and type checks
6. **Push to remote** - Send commits to GitHub
7. **post-merge runs** - (When pulling or merging)

### Hook Behaviour

- Hooks run **automatically** - No manual execution needed
- Hooks run **silently** if successful - Only output on failure
- Hooks can be **bypassed** if necessary (not recommended)
- Hooks respect `.gitignore` - Ignored files are skipped

---

## Bypassing Hooks

### When You Might Need To

- Emergency hotfixes (not recommended)
- Temporary debugging commits (not recommended)
- Testing hook modifications

### How to Bypass

**Warning:** Bypassing hooks circumvents quality checks. Only do this if you understand the risks.

#### Skip pre-commit hook

```bash
git commit --no-verify -m "message"
# or
git commit -n -m "message"
```

#### Skip pre-push hook

```bash
git push --no-verify
# or
git push -n
```

#### Skip all hooks

```bash
HUSKY=0 git push
```

### Note

Bypassing hooks is **strongly discouraged**. If hooks are blocking your work, it means there are legitimate issues to fix. Fix them instead of skipping checks.

---

## Adding New Hooks

### Common Git Hooks Available

- `pre-commit` - Before committing (already configured)
- `pre-push` - Before pushing (already configured)
- `post-merge` - After merging (already configured)
- `commit-msg` - Validate commit message
- `pre-rebase` - Before rebasing
- `post-checkout` - After checking out branch

### To Add a New Hook

1. **Create hook file** in `.husky/` directory:

   ```bash
   touch .husky/commit-msg
   ```

2. **Add executable permissions**:

   ```bash
   chmod +x .husky/commit-msg
   ```

3. **Write hook script**:

   ```bash
   #!/bin/sh
   . "$(dirname "$0")/_/husky.sh"

   # Your hook logic here
   npm run validate-commit-msg
   ```

4. **Test the hook** with git operations

5. **Commit the hook** to version control:
   ```bash
   git add .husky/commit-msg
   git commit -m "add(hooks): implement commit message validation"
   ```

### Hook Script Template

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Script name for logging
SCRIPT_NAME="hook-name"

# Optional: Add debug output
# echo "Running $SCRIPT_NAME..."

# Run your check
if ! npm run your-check-command; then
  echo "Error: $SCRIPT_NAME failed"
  exit 1
fi

exit 0
```

---

## Troubleshooting

### Hooks Not Running

**Problem:** Git hooks are not executing

**Solutions:**

1. Verify Husky is installed:

   ```bash
   npm list husky
   ```

2. Reinstall Husky:

   ```bash
   npm install husky --save-dev
   npx husky install
   ```

3. Ensure hook files are executable:
   ```bash
   chmod +x .husky/pre-commit
   chmod +x .husky/pre-push
   chmod +x .husky/post-merge
   ```

### Permission Denied

**Problem:** "Permission denied" when hooks try to run

**Solution:** Make hooks executable:

```bash
chmod +x .husky/*
git add .husky
git commit -m "chore(hooks): fix executable permissions"
```

### Hooks Running Slowly

**Problem:** Hooks take a long time to run

**Solution:**

- Optimise the commands in hooks
- Run type-check only on changed files
- Consider splitting checks between commits and pushes

---

## Related Sections

- [../README.md](../README.md) - Main project documentation
- [../docs/GITGUIDE.md](../docs/GITGUIDE.md) - Git workflow guide
- [../package.json](../package.json) - NPM scripts and dependencies
- [../.claude/CLAUDE.md](../.claude/CLAUDE.md) - Project conventions

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
