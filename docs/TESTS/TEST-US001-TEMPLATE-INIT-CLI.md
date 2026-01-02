# Test Specification: US001 Template Initialisation CLI

**Last Updated:** 02/01/2026
**Author:** Test Writer Agent
**Story:** US001 - Template Initialisation CLI
**Testing Framework:** Vitest
**Test Location:** `scripts/__tests__/`

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Test Architecture](#test-architecture)
  - [Test Types](#test-types)
  - [Testing Strategy](#testing-strategy)
- [Unit Tests](#unit-tests)
  - [validators.test.ts](#validatorstestts)
    - [Test Coverage](#test-coverage)
    - [validatePackageName Tests](#validatepackagename-tests)
    - [validateHexColour Tests](#validatehexcolour-tests)
    - [validateDescription Tests](#validatedescription-tests)
    - [validateClientName Tests](#validateclientname-tests)
  - [replacements.test.ts](#replacementstestts)
    - [Test Coverage](#test-coverage-1)
    - [createReplacementMap Tests](#createreplacementmap-tests)
    - [getFilesToModify Tests](#getfilestomodify-tests)
    - [escapeRegExp Tests](#escaperegexp-tests)
    - [applyReplacements Tests](#applyreplacements-tests)
  - [file-operations.test.ts](#file-operationstestts)
    - [Test Coverage](#test-coverage-2)
    - [fileExists Tests](#fileexists-tests)
    - [readFile Tests](#readfile-tests)
    - [writeFile Tests](#writefile-tests)
    - [replaceInFile Tests](#replaceinfile-tests)
    - [createBackup Tests](#createbackup-tests)
    - [restoreFromBackup Tests](#restorefrombackup-tests)
- [Integration Tests](#integration-tests)
  - [init-template.test.ts](#init-templatetestts)
    - [Test Coverage](#test-coverage-3)
    - [checkDirectoryConflict Tests](#checkdirectoryconflict-tests)
    - [createTemplateConfig Tests](#createtemplateconfig-tests)
    - [performReplacements Tests](#performreplacements-tests)
    - [verifyReplacements Tests](#verifyreplacements-tests)
    - [main Integration Tests](#main-integration-tests)
- [Test Utilities](#test-utilities)
  - [Test Setup and Teardown](#test-setup-and-teardown)
- [Running Tests](#running-tests)
  - [Run All Tests](#run-all-tests)
  - [Run Specific Test File](#run-specific-test-file)
  - [Run Tests in Watch Mode](#run-tests-in-watch-mode)
  - [Run Tests with Coverage](#run-tests-with-coverage)
  - [Run Tests with Verbose Output](#run-tests-with-verbose-output)
- [Test Results Format](#test-results-format)
- [Expected Test Status](#expected-test-status)
  - [Current Status: RED (All Tests Failing)](#current-status-red-all-tests-failing)
  - [Next Status: GREEN (After Implementation)](#next-status-green-after-implementation)
  - [Final Status: REFACTOR (Optimisation)](#final-status-refactor-optimisation)
- [Coverage Goals](#coverage-goals)
- [Related Documentation](#related-documentation)
- [Acceptance Criteria Mapping](#acceptance-criteria-mapping)
- [Known Limitations](#known-limitations)
- [Troubleshooting Test Failures](#troubleshooting-test-failures)
  - ["Cannot find module" errors](#cannot-find-module-errors)
  - [Tests timeout](#tests-timeout)
  - ["ENOENT: no such file or directory"](#enoent-no-such-file-or-directory)
  - [Random test failures](#random-test-failures)

## Overview

This document specifies all automated tests for the Template Initialisation CLI (US001). The CLI transforms the @syntek-studio/ui template into a client-specific UI component library through interactive prompts, validation, and automated file replacement.

---

## Test Architecture

### Test Types

| Test Type       | Location                                  | Purpose                                |
| --------------- | ----------------------------------------- | -------------------------------------- |
| **Unit Tests**  | `scripts/__tests__/*.test.ts`             | Test individual functions in isolation |
| **Integration** | `scripts/__tests__/init-template.test.ts` | Test complete CLI workflow end-to-end  |
| **Manual**      | `docs/TESTS/MANUAL/MANUAL-US001-*.md`     | Human testing scenarios                |

### Testing Strategy

This project uses **Test-Driven Development (TDD)**:

1. **RED:** Tests are written first and fail (current state)
2. **GREEN:** Minimal implementation makes tests pass
3. **REFACTOR:** Code is cleaned up while keeping tests passing

All tests are currently in the RED phase - implementation stubs throw "Not implemented" errors.

---

## Unit Tests

### validators.test.ts

**File:** `scripts/__tests__/validators.test.ts`
**Module Under Test:** `scripts/lib/validators.ts`
**Total Test Cases:** 60+

#### Test Coverage

| Function              | Test Cases | Edge Cases | Error Cases |
| --------------------- | ---------- | ---------- | ----------- |
| `validatePackageName` | 20+        | 5          | 10          |
| `validateHexColour`   | 15+        | 3          | 12          |
| `validateDescription` | 8+         | 3          | 5           |
| `validateClientName`  | 6+         | 2          | 3           |

#### validatePackageName Tests

**Valid Cases:**

- Scoped package names: `@acme/ui`, `@my-company/design-system`
- Unscoped package names: `acme-ui`, `my-design-system`
- Hyphens, dots, underscores: `@company/ui.kit`, `company_ui_kit`
- Tildes: `@company/~ui`
- Numbers: `@company2/ui2`
- Exactly 214 characters (max length)

**Invalid Cases:**

- Uppercase letters: `@Acme/ui`, `Acme-UI`
- Spaces: `@acme/ui library`
- Names over 214 characters
- Names starting with dot or underscore: `.ui`, `_ui`
- Malformed scoped packages: `@/ui`, `@company/`
- Special characters: `@company/ui!`, `company$ui`

**Edge Cases:**

- Empty package names
- Multiple scopes (invalid): `@scope1/@scope2/ui`
- Minimum length: `@a/b`, `a`

#### validateHexColour Tests

**Valid Cases:**

- 6-digit hex (lowercase): `#3b82f6`, `#ffffff`
- 6-digit hex (uppercase): `#3B82F6`, `#FFFFFF`
- 6-digit hex (mixed case): `#3b82F6`
- 3-digit hex: `#fff`, `#ABC`, `#FfF`

**Invalid Cases:**

- No hash symbol: `3b82f6`, `fff`
- Invalid hex digits: `#gggggg`, `#xyz`
- Wrong length: `#ff`, `#ffff`, `#fffff`, `#fffffff`
- Special characters: `#3b82f$`, `#fff!`
- Spaces: `#fff fff`

**Edge Cases:**

- Empty strings
- Hash symbol only: `#`
- Multiple hash symbols: `##ffffff`

#### validateDescription Tests

**Valid Cases:**

- Simple descriptions: `A design system`
- Special characters: `Acme's design system for web & mobile`
- Numbers: `Design system v2.0 for 2026`
- Punctuation: `A modern, responsive design system.`
- Exactly 500 characters

**Invalid Cases:**

- Empty descriptions: `""`
- Whitespace-only: `"   "`, `"\t"`, `"\n"`
- Over 500 characters

**Edge Cases:**

- Single character: `A`
- Descriptions with newlines
- Descriptions with emojis: `Design system 🎨`
- Leading/trailing whitespace

#### validateClientName Tests

**Valid Cases:**

- Simple names: `Acme`, `Acme Corporation`
- Special characters: `O'Reilly Media`, `Smith & Co.`, `AT&T`
- Numbers: `3M Corporation`, `Company 123`
- Hyphens: `Hewlett-Packard`
- Exactly 100 characters

**Invalid Cases:**

- Empty names
- Whitespace-only
- Over 100 characters

**Edge Cases:**

- Single character: `X`
- Leading/trailing whitespace

---

### replacements.test.ts

**File:** `scripts/__tests__/replacements.test.ts`
**Module Under Test:** `scripts/lib/replacements.ts`
**Total Test Cases:** 35+

#### Test Coverage

| Function               | Test Cases | Edge Cases | Error Cases |
| ---------------------- | ---------- | ---------- | ----------- |
| `createReplacementMap` | 5          | 1          | 0           |
| `getFilesToModify`     | 6          | 0          | 0           |
| `escapeRegExp`         | 11         | 2          | 0           |
| `applyReplacements`    | 13         | 3          | 0           |

#### createReplacementMap Tests

**Behaviour Tested:**

- Creates correct mapping from user answers
- Maps `@syntek-studio/ui` → user package name
- Maps `@template/ui` → user package name
- Maps `Syntek Studio` → user client name
- Maps default description → user description
- Handles unscoped package names
- Handles special characters in client name

#### getFilesToModify Tests

**Behaviour Tested:**

- Returns array of file paths
- Includes `package.json`
- Includes `README.md`
- Includes `.claude/CLAUDE.md`
- Includes `src/index.ts`
- Returns unique paths (no duplicates)
- Returns relative paths (not absolute)

#### escapeRegExp Tests

**Behaviour Tested:**

- Escapes special regex characters: `@`, `-`, `/`, `.`, `(`, `)`, `[`, `]`, `*`, `+`, `?`, `$`, `^`, `|`, `{`, `}`
- Handles strings with no special characters
- Handles empty strings
- Creates valid regex patterns

#### applyReplacements Tests

**Behaviour Tested:**

- Replaces all occurrences of placeholders
- Handles multiple different replacements
- Preserves content that shouldn't be replaced
- Handles content with no placeholders
- Handles empty content
- Handles empty replacement map
- Preserves line breaks and formatting
- Handles special characters in replacement text
- Case-sensitive replacements
- Multiline content

---

### file-operations.test.ts

**File:** `scripts/__tests__/file-operations.test.ts`
**Module Under Test:** `scripts/lib/file-operations.ts`
**Total Test Cases:** 45+

#### Test Coverage

| Function            | Test Cases | Edge Cases | Error Cases |
| ------------------- | ---------- | ---------- | ----------- |
| `fileExists`        | 5          | 0          | 0           |
| `readFile`          | 7          | 0          | 1           |
| `writeFile`         | 8          | 0          | 0           |
| `replaceInFile`     | 9          | 0          | 2           |
| `createBackup`      | 5          | 0          | 1           |
| `restoreFromBackup` | 4          | 0          | 2           |

#### fileExists Tests

**Behaviour Tested:**

- Returns true for existing files
- Returns false for non-existent files
- Returns true for existing directories
- Handles absolute paths
- Handles relative paths

#### readFile Tests

**Behaviour Tested:**

- Reads file content correctly
- Reads multiline content
- Reads JSON content as string
- Reads empty files
- Handles special characters
- Handles UTF-8 encoded content (Unicode, emojis)
- Throws error for non-existent files

#### writeFile Tests

**Behaviour Tested:**

- Writes content to file
- Creates file if it doesn't exist
- Overwrites existing file
- Writes multiline content
- Writes empty content
- Writes JSON content
- Writes UTF-8 encoded content
- Preserves file formatting

#### replaceInFile Tests

**Behaviour Tested:**

- Replaces content and returns true when changes made
- Returns false when no changes made
- Handles multiple replacements
- Replaces all occurrences
- Preserves formatting and line breaks
- Handles empty replacement map
- Handles special regex characters in search string
- Throws error for non-existent files

#### createBackup Tests

**Behaviour Tested:**

- Creates backup with `.backup` extension
- Preserves original file content in backup
- Does not modify original file
- Overwrites existing backup
- Throws error for non-existent files

#### restoreFromBackup Tests

**Behaviour Tested:**

- Restores file from backup
- Removes backup file after restoration
- Throws error if backup doesn't exist
- Creates original file if it doesn't exist but backup does

---

## Integration Tests

### init-template.test.ts

**File:** `scripts/__tests__/init-template.test.ts`
**Module Under Test:** `scripts/init-template.ts`
**Total Test Cases:** 20+

#### Test Coverage

| Function                 | Test Cases | Edge Cases | Error Cases |
| ------------------------ | ---------- | ---------- | ----------- |
| `checkDirectoryConflict` | 5          | 1          | 0           |
| `createTemplateConfig`   | 5          | 0          | 0           |
| `performReplacements`    | 5          | 1          | 0           |
| `verifyReplacements`     | 6          | 0          | 0           |
| `main` (integration)     | 3          | 0          | 0           |

#### checkDirectoryConflict Tests

**Behaviour Tested:**

- Returns no conflict when `template.config.json` doesn't exist
- Returns conflict when template is already initialized
- Returns no conflict when `initialized` is false
- Handles corrupted `template.config.json` gracefully
- Returns conflict details with client name

#### createTemplateConfig Tests

**Behaviour Tested:**

- Creates `template.config.json` with correct structure
- Includes all required fields: `initialized`, `packageName`, `clientName`, `primaryColour`, `description`
- Includes initialization timestamp
- Includes original template information
- Formats JSON with proper indentation (2 spaces)
- Overwrites existing config file

#### performReplacements Tests

**Behaviour Tested:**

- Replaces content in all specified files
- Returns array of results with file paths and modification status
- Marks files as modified only if changes were made
- Handles files with multiple occurrences of placeholders
- Preserves file formatting and structure (especially JSON)

#### verifyReplacements Tests

**Behaviour Tested:**

- Returns true when all placeholders are replaced
- Returns false when placeholders remain
- Checks all relevant files
- Detects remaining `@syntek-studio/ui` placeholders
- Detects remaining `@template/ui` placeholders
- Detects remaining "Syntek Studio" placeholders

#### main Integration Tests

**Behaviour Tested:**

- Completes full initialization workflow
- Creates all expected outputs (`template.config.json`, modified files)
- Handles re-initialization scenario (overwrites previous config)

---

## Test Utilities

### Test Setup and Teardown

All tests that modify files use temporary test directories:

```typescript
beforeEach(async () => {
  await fs.mkdir(testDir, { recursive: true })
  process.chdir(testDir)
})

afterEach(async () => {
  process.chdir(path.join(testDir, '..'))
  await fs.rm(testDir, { recursive: true, force: true })
})
```

This ensures:

- Tests are isolated
- No pollution of actual project files
- Clean state for each test
- Automatic cleanup

---

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Specific Test File

```bash
npm test validators.test.ts
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Tests with Verbose Output

```bash
npm run test:verbose
```

---

## Test Results Format

Tests will output results in the following format:

```
✓ scripts/__tests__/validators.test.ts (60)
  ✓ validatePackageName (35)
    ✓ Valid Package Names (12)
    ✓ Invalid Package Names (18)
    ✓ Edge Cases (5)
  ✓ validateHexColour (15)
  ✓ validateDescription (8)
  ✓ validateClientName (2)

✓ scripts/__tests__/replacements.test.ts (35)
✓ scripts/__tests__/file-operations.test.ts (45)
✓ scripts/__tests__/init-template.test.ts (20)

Test Files  4 passed (4)
Tests  160 passed (160)
Duration  XX.XXs
```

---

## Expected Test Status

### Current Status: RED (All Tests Failing)

All tests are currently **failing** because implementation stubs throw `Error('Not implemented')`.

This is expected and correct for TDD:

```
✗ validatePackageName should accept valid scoped package names
  Error: Not implemented
```

### Next Status: GREEN (After Implementation)

After `/syntek-dev-suite:frontend` or `/syntek-dev-suite:backend` implements the functions, tests should **pass**:

```
✓ validatePackageName should accept valid scoped package names
```

### Final Status: REFACTOR (Optimisation)

After tests pass, code can be refactored for:

- Performance
- Readability
- Maintainability

Tests ensure refactoring doesn't break functionality.

---

## Coverage Goals

**Target Coverage:**

| Metric            | Target | Current |
| ----------------- | ------ | ------- |
| Line Coverage     | 90%+   | 0%      |
| Branch Coverage   | 85%+   | 0%      |
| Function Coverage | 95%+   | 0%      |

**Excluded from Coverage:**

- `node_modules/`
- `dist/`
- `**/*.d.ts`
- `**/*.config.*`
- `scripts/__tests__/**`

---

## Related Documentation

- **Manual Testing:** `docs/TESTS/MANUAL/MANUAL-US001-TEMPLATE-INIT-CLI.md`
- **Architectural Plan:** `docs/PLANS/PLAN-US001-TEMPLATE-INIT-CLI.MD`
- **User Stories:** `docs/STORIES/`

---

## Acceptance Criteria Mapping

| Story Acceptance Criteria                | Test Coverage                               |
| ---------------------------------------- | ------------------------------------------- |
| CLI prompts for client info              | Integration: `main` test                    |
| All inputs validated with error messages | Unit: `validators.test.ts` (60+ tests)      |
| Replaces placeholders in all files       | Integration: `performReplacements` tests    |
| Creates `template.config.json`           | Integration: `createTemplateConfig` tests   |
| Displays success message                 | Manual: Scenario 1                          |
| Handles already-initialized gracefully   | Integration: `checkDirectoryConflict` tests |
| Execution time < 60 seconds              | Manual: Performance Testing                 |

---

## Known Limitations

1. **Mocking Inquirer:** Integration tests for `main()` cannot fully test interactive prompts without mocking `inquirer`. This is deferred to manual testing.

2. **Console Output:** Success messages and colour output are tested manually, not in unit tests.

3. **File Permissions:** Tests may fail on systems with restrictive file permissions. Ensure test directories are writable.

4. **Cross-Platform Paths:** Tests use `path.join()` for cross-platform compatibility. If tests fail on Windows, check path separators.

---

## Troubleshooting Test Failures

### "Cannot find module" errors

**Solution:**

```bash
npm install
```

### Tests timeout

**Cause:** Infinite loops or hanging file operations.

**Solution:**

- Check file paths are correct
- Ensure cleanup in `afterEach` runs
- Increase timeout: `npm test -- --timeout=10000`

### "ENOENT: no such file or directory"

**Cause:** Test directory creation failed.

**Solution:**

- Check write permissions
- Ensure `beforeEach` completes successfully
- Verify path construction uses `path.join()`

### Random test failures

**Cause:** Tests are not isolated (shared state).

**Solution:**

- Ensure each test uses unique test directory
- Verify `afterEach` cleanup runs
- Check for global state mutation

---

**Document Version:** 1.0
**Last Updated:** 02/01/2026
**Status:** Tests Written (RED Phase)
**Next Step:** Implement functions to make tests pass (GREEN Phase)
