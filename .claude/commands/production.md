---
description: Build for production
allowed-tools: Bash(npm:*), Bash(./test.sh:*), Bash(./production.sh:*)
---

Build and prepare for production release.

**Run:** `./production.sh`

This script will:
1. Prompt for confirmation (safety check)
2. Run the test suite first
3. Build the package

After running, use `npm version <patch|minor|major>` then `npm publish` to release.

$ARGUMENTS
