---
description: Bump package version
argument-hint: <patch|minor|major>
allowed-tools: Bash(npm version:*), Bash(git:*)
---

Bump the package version following semantic versioning.

**Commands:**

- Patch (bug fixes): `npm version patch`

- Minor (new features): `npm version minor`

- Major (breaking changes): `npm version major`

**Workflow:**

1. Bump version: `npm version $ARGUMENTS`

2. Update CHANGELOG.md

3. Commit and tag: `git push && git push --tags`

4. Publish: `npm publish`

$ARGUMENTS
