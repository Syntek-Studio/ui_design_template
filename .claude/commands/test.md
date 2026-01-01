---
description: Run the test suite
allowed-tools: Bash(npm test:*), Bash(npm run type-check:*), Bash(npm run lint:*)
---

Run the project's test suite.

**Run:** `./test.sh`

This script will:
1. Run the test suite
2. Run type checking
3. Run linting

**Additional Commands:**
- Watch mode: `npm test -- --watch`
- With coverage: `npm test -- --coverage`
- Single file: `npm test -- $ARGUMENTS`

$ARGUMENTS
