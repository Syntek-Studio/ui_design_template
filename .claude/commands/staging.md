---
description: Build for staging (prerelease)
allowed-tools: Bash(npm:*), Bash(./test.sh:*), Bash(./staging.sh:*)
---

Build and prepare a staging/prerelease version.

**Run:** `./staging.sh`

This script will:
1. Run the test suite first
2. Build the package
3. Bump prerelease version

After running, use `npm publish --tag staging` to publish the prerelease.

$ARGUMENTS
