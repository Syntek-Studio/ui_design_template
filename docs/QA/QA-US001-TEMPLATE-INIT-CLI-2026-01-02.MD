# QA Report: US001 Template Initialisation CLI

**Date:** 02/01/2026 18:30
**Analyst:** QA Tester Agent
**Status:** CRITICAL ISSUES FOUND
**Test Environment:** Integration Tests (Vitest)
**Build/Commit:** us001/template-init-cli branch

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Executive Summary](#executive-summary)
- [CRITICAL (Blocks Deployment)](#critical-blocks-deployment)
  - [1. Test Environment Path Resolution Failure](#1-test-environment-path-resolution-failure)
  - [2. Multiple Placeholder Occurrence Replacement Failure](#2-multiple-placeholder-occurrence-replacement-failure)
- [HIGH (Must Fix Before Production)](#high-must-fix-before-production)
  - [3. Test Coverage Gap - File Path Assumptions](#3-test-coverage-gap---file-path-assumptions)
  - [4. Test Environment Isolation Issues](#4-test-environment-isolation-issues)
- [MEDIUM (Should Fix)](#medium-should-fix)
  - [5. Incomplete Error Handling in Tests](#5-incomplete-error-handling-in-tests)
  - [6. No Tests for Dry-Run Mode](#6-no-tests-for-dry-run-mode)
  - [7. No Performance Tests](#7-no-performance-tests)
- [LOW (Consider Fixing)](#low-consider-fixing)
  - [8. Test Data Realism](#8-test-data-realism)
  - [9. Missing Tests for Template Config Schema](#9-missing-tests-for-template-config-schema)
  - [10. No Tests for Rollback Functionality](#10-no-tests-for-rollback-functionality)
- [Test Scenarios Needed](#test-scenarios-needed)
  - [Critical Priority](#critical-priority)
  - [High Priority](#high-priority)
  - [Medium Priority](#medium-priority)
  - [Low Priority](#low-priority)
- [Test Execution Summary](#test-execution-summary)
- [Root Cause Summary](#root-cause-summary)
  - [Primary Issues](#primary-issues)
  - [Secondary Issues](#secondary-issues)
- [Impact Assessment](#impact-assessment)
  - [If Deployed As-Is](#if-deployed-as-is)
  - [User Experience Impact](#user-experience-impact)
  - [Business Impact](#business-impact)
- [Recommendations](#recommendations)
  - [Immediate Actions (Before Deployment)](#immediate-actions-before-deployment)
  - [Short-term Actions (Next Sprint)](#short-term-actions-next-sprint)
  - [Long-term Actions (Future)](#long-term-actions-future)
- [Next Steps](#next-steps)
  - [Required Before Merging](#required-before-merging)
  - [Recommended Before Merging](#recommended-before-merging)
  - [Handoff Signals](#handoff-signals)
- [Conclusion](#conclusion)

## Executive Summary

The US001 Template Initialisation CLI has **9 failing tests** out of 159 total tests, representing a **94.3% pass rate**. However, all failures are concentrated in the integration test suite (`init-template.test.ts`), which tests the end-to-end workflow. The failures fall into two categories:

1. **Missing Test Environment Setup (8 failures)** - Tests fail because they expect files that don't exist in the test environment
2. **Replacement Logic Bug (1 failure)** - Multiple occurrences of placeholders not being replaced correctly

Whilst the core modules (validators, file operations, replacements) all pass their unit tests, the integration tests reveal **critical issues that would block production deployment**.

---

## CRITICAL (Blocks Deployment)

### 1. Test Environment Path Resolution Failure

**Severity:** CRITICAL
**Impact:** Integration tests cannot run successfully, indicating potential production issues with file path resolution
**Test Suite:** `init-template.test.ts`

**Failed Tests:**

- `createTemplateConfig should create template.config.json with correct structure`
- `createTemplateConfig should include initialization timestamp`
- `createTemplateConfig should include original template information`
- `createTemplateConfig should format JSON with proper indentation`
- `createTemplateConfig should overwrite existing config file`
- `verifyReplacements should return true when all placeholders are replaced`
- `verifyReplacements should detect remaining @syntek-studio/ui placeholders`
- `verifyReplacements should detect remaining "Syntek Studio" placeholders`

**Root Cause Analysis:**

The tests use `process.chdir()` to change to a temporary test directory (`__test-temp-integration__`), but the functions being tested (`createTemplateConfig` and `verifyReplacements`) attempt to read files using **relative paths** without accounting for the changed working directory.

**Error Pattern:**

```
Error: ENOENT: no such file or directory, open 'package.json'
Error: ENOENT: no such file or directory, open '.claude/CLAUDE.md'
```

**Why This Happens:**

1. Test creates temporary directory: `/mnt/archive/.../ui_design_template/__test-temp-integration__`
2. Test executes `process.chdir(testDir)` to enter temp directory
3. Test calls `createTemplateConfig()` which tries to read `package.json`
4. The function uses `readFile('package.json')` - a relative path
5. **However**, `readFile()` is looking in the current working directory, which is the temp directory
6. The temp directory only contains **mock files created by the test setup**
7. But `createTemplateConfig()` needs to read the **actual project's package.json** to get version info
8. **The test setup creates mock files but doesn't create `package.json` in all test scenarios**

**Specific Problem in Code:**

In `init-template.ts` line 190:

```typescript
// Read current package.json to get version
const packageJsonContent = await readFile('package.json')
const packageJson = JSON.parse(packageJsonContent)
```

This assumes `package.json` exists in the current working directory, but:

- In test scenarios for `createTemplateConfig`, the test changes to a temp directory
- The temp directory may not have `package.json` created yet
- The function should either use absolute paths or the test should ensure all required files exist

**Similar Issue in `verifyReplacements()`:**

Line 338 reads files using `getFilesToModify()` which returns:

```typescript
;['package.json', 'README.md', '.claude/CLAUDE.md', 'src/index.ts']
```

All relative paths, which fail when the working directory is the temp test directory that doesn't contain these files.

**Impact Assessment:**

- **Test Environment:** All integration tests for these functions fail
- **Production Risk:** If the CLI is run from an unexpected directory, it could fail with the same ENOENT errors
- **User Experience:** Users would see cryptic file-not-found errors instead of helpful messages

**Reproduce:**

```bash
cd /mnt/archive/OldRepos/syntek/ui_design_template
npm test -- init-template.test.ts
```

---

### 2. Multiple Placeholder Occurrence Replacement Failure

**Severity:** CRITICAL
**Impact:** Placeholders with multiple occurrences in the same file are not fully replaced
**Test Suite:** `init-template.test.ts`

**Failed Test:**

- `performReplacements should handle files with multiple occurrences of placeholders`

**Error Message:**

```
AssertionError: expected '@syntek-studio/ui is great. Use @synt…' to be '@test/ui is great. Use @test/ui today!'
```

**Root Cause Analysis:**

The test creates a file with **two occurrences** of the same placeholder:

```
'@syntek-studio/ui is great. Use @syntek-studio/ui today!'
```

Expected result after replacement:

```
'@test/ui is great. Use @test/ui today!'
```

Actual result (truncated in error):

```
'@syntek-studio/ui is great. Use @synt…'
```

This indicates that the replacement is **partial or incomplete** when multiple instances of the same placeholder exist in a single file.

**Investigation Needed:**

The `replaceInFile()` function in `file-operations.ts` likely uses regex replacement. Need to verify:

1. Is the regex using the global flag (`/pattern/g`)?
2. Are special characters in the placeholder properly escaped?
3. Does the replacement happen iteratively or in a single pass?

**Why This is Critical:**

- Package name `@syntek-studio/ui` appears multiple times in:
  - README.md (examples, installation instructions, import statements)
  - package.json (potentially in dependencies, peerDependencies)
  - .claude/CLAUDE.md (multiple references in documentation)
  - src/index.ts (JSDoc comments)

If only the **first occurrence** is replaced, the template will ship with mixed references, creating:

- Broken import statements
- Incorrect documentation
- Confused users
- Failed builds in consuming projects

**Impact Assessment:**

- **Functional Impact:** HIGH - Template will be partially initialised
- **Data Integrity:** Critical - Mixed package names would break imports
- **User Trust:** Critical - Users would lose confidence in the tool

**Reproduce:**

```bash
cd /mnt/archive/OldRepos/syntek/ui_design_template
npm test -- init-template.test.ts -t "should handle files with multiple occurrences"
```

---

## HIGH (Must Fix Before Production)

### 3. Test Coverage Gap - File Path Assumptions

**Severity:** HIGH
**Impact:** Tests don't validate behaviour when run from different directories

**Analysis:**

All integration tests assume the CLI is run from the project root directory. There are no tests covering:

- Running from a subdirectory
- Running with absolute paths
- Running when symlinks are involved
- Running when the project is in a path with spaces

**Missing Test Scenarios:**

```typescript
// NOT TESTED: Running from subdirectory
it('should work when run from scripts/ directory', async () => {
  process.chdir('scripts')
  // Does the CLI still find files?
})

// NOT TESTED: Paths with spaces
it('should handle project paths with spaces', async () => {
  const testDir = '/tmp/my project/ui lib'
  // Does the CLI handle this?
})

// NOT TESTED: Absolute vs relative paths
it('should handle both absolute and relative paths', async () => {
  // Test with both path types
})
```

**Why This Matters:**

- Users may run `npm run init-template` from any directory
- CI/CD pipelines may execute from unexpected locations
- Different operating systems handle paths differently

**Recommendation:**

- Add tests for different execution contexts
- Consider using `path.resolve()` for all file operations
- Add validation to ensure CLI is run from project root

---

### 4. Test Environment Isolation Issues

**Severity:** HIGH
**Impact:** Tests mutate global state (process.cwd()), risking test pollution

**Analysis:**

The tests use `process.chdir()` to change the working directory:

```typescript
beforeEach(async () => {
  await fs.mkdir(testDir, { recursive: true })
  process.chdir(testDir) // MUTATES GLOBAL STATE
})

afterEach(async () => {
  process.chdir(path.join(testDir, '..')) // RESTORES
  await fs.rm(testDir, { recursive: true, force: true })
})
```

**Problems:**

1. **Race Conditions:** If tests run in parallel, `process.chdir()` affects all tests
2. **Cleanup Failure:** If `afterEach` fails, subsequent tests run in wrong directory
3. **Debugging Difficulty:** Hard to debug when global state is mutated
4. **Test Reliability:** Tests may pass in isolation but fail when run together

**Better Approach:**

Instead of changing the global working directory, pass the working directory as a parameter:

```typescript
// Instead of this:
await createTemplateConfig(answers)

// Do this:
await createTemplateConfig(answers, { cwd: testDir })
```

**Recommendation:**

- Refactor functions to accept optional `cwd` parameter
- Remove `process.chdir()` from tests
- Use absolute paths in test assertions

---

## MEDIUM (Should Fix)

### 5. Incomplete Error Handling in Tests

**Severity:** MEDIUM
**Impact:** Tests don't verify error messages or recovery behaviour

**Analysis:**

No tests verify what happens when:

- `package.json` is invalid JSON
- `package.json` is missing the `version` field
- Template files are read-only
- Disk is full during file writes
- User interrupts the process mid-replacement

**Example Missing Test:**

```typescript
it('should handle corrupted package.json gracefully', async () => {
  await fs.writeFile('package.json', 'not valid json{{{', 'utf-8')

  await expect(createTemplateConfig(answers)).rejects.toThrow(/package.json is not valid JSON/)
})
```

**Why This Matters:**

- Error handling is mentioned in US001 acceptance criteria
- Users need helpful error messages
- Partial failures should be recoverable

**Recommendation:**

- Add negative test cases for each function
- Verify error messages are user-friendly
- Test rollback behaviour when operations fail partway

---

### 6. No Tests for Dry-Run Mode

**Severity:** MEDIUM
**Impact:** Cannot verify dry-run mode works correctly

**Analysis:**

The CLI implements three modes:

- `--dry-run`: Preview changes without applying them
- `--verbose`: Detailed logging
- `--json`: Structured JSON output

**Test Coverage:**

- ✅ Unit tests exist for individual modules
- ✅ Integration tests exist for default mode
- ❌ **No tests for `--dry-run` mode**
- ❌ **No tests for `--verbose` mode**
- ❌ **No tests for `--json` mode**

**Missing Test Examples:**

```typescript
it('should not modify files in dry-run mode', async () => {
  const originalContent = await fs.readFile('package.json', 'utf-8')

  await performReplacements(answers, true, true) // dry-run = true

  const afterContent = await fs.readFile('package.json', 'utf-8')
  expect(afterContent).toBe(originalContent) // Should be unchanged
})

it('should still return results in dry-run mode', async () => {
  const results = await performReplacements(answers, true, true)

  expect(results.length).toBeGreaterThan(0)
  expect(results[0].modified).toBe(true) // Would have been modified
})
```

**Why This Matters:**

- Users rely on `--dry-run` to preview changes
- If dry-run mode is broken, users might accidentally initialise templates
- This is a safety feature that must be tested

**Recommendation:**

- Add integration tests for all CLI modes
- Verify dry-run doesn't modify files
- Verify verbose mode outputs expected logs
- Verify JSON mode produces valid JSON

---

### 7. No Performance Tests

**Severity:** MEDIUM
**Impact:** Unknown performance characteristics with large files or many placeholders

**Analysis:**

No tests measure:

- Time to process large files (1MB+ README)
- Time to process many files (100+ files)
- Memory usage during replacement
- Behaviour with deeply nested directories

**Potential Performance Issues:**

1. **Reading entire files into memory:**

   ```typescript
   const content = await readFile(filePath) // Could be huge
   ```

2. **Regex replacement on large strings:**

   ```typescript
   content = content.replace(new RegExp(escapedKey, 'g'), value)
   ```

3. **No streaming for large files**

**Edge Cases to Test:**

- README.md with 10,000 occurrences of `@syntek-studio/ui`
- 1GB package.json (malicious or corrupted)
- 1000 files in the project
- Circular symlinks

**Recommendation:**

- Add performance tests for typical scenarios
- Set reasonable limits (max file size, max occurrences)
- Consider streaming for large files
- Add timeout protection

---

## LOW (Consider Fixing)

### 8. Test Data Realism

**Severity:** LOW
**Impact:** Tests use minimal data that doesn't reflect real-world usage

**Analysis:**

Test data is extremely simple:

```typescript
const answers = {
  clientName: 'Test',
  packageName: '@test/ui',
  description: 'Test',
  primaryColour: '#3b82f6',
}
```

**Real-world Examples That Should Be Tested:**

```typescript
// Long client names
clientName: 'Acme Corporation International Ltd.'

// Complex package names
packageName: '@acme-corp/design-system-2024'

// Multi-line descriptions
description: 'A comprehensive design system...\n\nFeatures:\n- 50+ components'

// Unusual colours
primaryColour: '#ff00ff'
```

**Why This Matters:**

- Edge cases in real client names (apostrophes, ampersands, unicode)
- Package names with numbers, multiple hyphens
- Descriptions with special characters or quotes
- Colours in different formats (rgb, named colours)

**Recommendation:**

- Add realistic test fixtures
- Test with actual client data (anonymised)
- Include unicode, emoji, and special characters

---

### 9. Missing Tests for Template Config Schema

**Severity:** LOW
**Impact:** No validation that `template.config.json` conforms to expected schema

**Analysis:**

The code creates a `TemplateConfig` object:

```typescript
const config: TemplateConfig = {
  initialized: true,
  initializedAt: new Date().toISOString(),
  packageName: answers.packageName,
  clientName: answers.clientName,
  primaryColour: answers.primaryColour,
  description: answers.description,
  originalTemplate: '@syntek-studio/ui',
  templateVersion: packageJson.version,
}
```

**Missing Validation:**

- No schema validation (JSON Schema, Zod, etc.)
- No tests for required fields
- No tests for field types
- No tests for field constraints (string lengths, format)

**Example Missing Test:**

```typescript
it('should have all required fields in template.config.json', async () => {
  await createTemplateConfig(answers)

  const config = JSON.parse(await fs.readFile('template.config.json', 'utf-8'))

  expect(config).toHaveProperty('initialized')
  expect(config).toHaveProperty('initializedAt')
  expect(config).toHaveProperty('packageName')
  expect(config).toHaveProperty('clientName')
  expect(config).toHaveProperty('primaryColour')
  expect(config).toHaveProperty('description')
  expect(config).toHaveProperty('originalTemplate')
  expect(config).toHaveProperty('templateVersion')
})
```

**Recommendation:**

- Add schema validation tests
- Consider adding runtime validation with Zod or JSON Schema
- Document expected schema in `docs/SETUP.md`

---

### 10. No Tests for Rollback Functionality

**Severity:** LOW
**Impact:** Cannot verify that rollback works when replacements fail partway

**Analysis:**

The code implements `processDirectoryWithRollback()` but there are no tests that:

- Trigger a failure during replacement
- Verify that previous changes are rolled back
- Verify that backup files are cleaned up after successful operation
- Verify that backup files are preserved after failure

**Example Missing Test:**

```typescript
it('should rollback all changes if one file fails', async () => {
  // Make one file read-only to trigger failure
  await fs.chmod('README.md', 0o444)

  await expect(performReplacements(answers)).rejects.toThrow()

  // Verify package.json was rolled back
  const content = await fs.readFile('package.json', 'utf-8')
  expect(content).toContain('@syntek-studio/ui') // Original content restored
})
```

**Why This Matters:**

- Rollback is a critical safety feature
- Partial replacements could corrupt the template
- Users need confidence that failures won't leave project in broken state

**Recommendation:**

- Add tests that trigger failures during replacement
- Verify rollback restores original state
- Test backup file cleanup

---

## Test Scenarios Needed

Based on the failures and gaps identified, these test scenarios should be added:

### Critical Priority

1. **File path resolution from different working directories**
   - Test running CLI from project root
   - Test running CLI from subdirectories
   - Test with absolute vs relative paths

2. **Multiple placeholder occurrences**
   - Test file with 2+ occurrences of same placeholder
   - Test file with all placeholders appearing multiple times
   - Test README with dozens of package name references

3. **Test environment setup completeness**
   - Ensure all required files exist in test temp directory
   - Mock package.json with realistic content
   - Create complete project structure in temp directory

### High Priority

4. **Error handling and recovery**
   - Invalid JSON in package.json
   - Missing fields in package.json
   - Read-only files during replacement
   - Disk full scenarios
   - User interrupt (SIGINT) during operation

5. **CLI modes testing**
   - Dry-run mode doesn't modify files
   - Verbose mode produces detailed logs
   - JSON mode produces parseable output
   - Help mode shows usage information

6. **Path edge cases**
   - Paths with spaces
   - Paths with special characters
   - Symlinked directories
   - Windows vs Unix path separators

### Medium Priority

7. **Performance and limits**
   - Large files (1MB+ README)
   - Many files (100+ project files)
   - Files with thousands of placeholders
   - Memory usage stays reasonable

8. **Realistic data testing**
   - Client names with unicode, apostrophes
   - Package names with complex formats
   - Multi-line descriptions
   - Various colour formats

9. **Rollback testing**
   - Rollback on failure halfway through
   - Backup cleanup on success
   - Backup preservation on failure
   - Partial failure recovery

### Low Priority

10. **Schema validation**
    - Template config schema conformance
    - Field type validation
    - Required field checking
    - Field constraint validation

---

## Test Execution Summary

| Suite                   | Total   | Passed  | Failed | Pass Rate |
| ----------------------- | ------- | ------- | ------ | --------- |
| file-operations.test.ts | ~50     | ~50     | 0      | 100%      |
| validators.test.ts      | ~40     | ~40     | 0      | 100%      |
| replacements.test.ts    | ~30     | ~30     | 0      | 100%      |
| init-template.test.ts   | 39      | 30      | 9      | 76.9%     |
| **Total**               | **159** | **150** | **9**  | **94.3%** |

**Analysis:**

- ✅ Unit tests for individual modules: **100% pass rate**
- ❌ Integration tests: **76.9% pass rate**
- 🔴 **All failures are in integration tests** - this is concerning

The pattern suggests that while individual functions work correctly in isolation, the **integration between functions** has issues, particularly around:

- Working directory assumptions
- File path resolution
- Test environment setup
- Multiple occurrence handling

---

## Root Cause Summary

### Primary Issues

1. **Integration test environment doesn't match production environment**
   - Tests change working directory but functions expect files in specific locations
   - No mocking of file system in a way that matches production structure

2. **Replacement logic bug with multiple occurrences**
   - Single file with multiple placeholder instances not handled correctly
   - Likely missing global flag in regex or iteration issue

### Secondary Issues

3. **Test coverage gaps**
   - No tests for CLI modes (dry-run, verbose, json)
   - No tests for error scenarios
   - No tests for rollback functionality

4. **Test design issues**
   - Global state mutation with `process.chdir()`
   - Unrealistic test data
   - Missing performance tests

---

## Impact Assessment

### If Deployed As-Is

**Severity: CRITICAL - Do Not Deploy**

1. **Users would experience file-not-found errors** when running the CLI from certain directories
2. **Templates would be partially initialised** with some placeholder references remaining
3. **No confidence in error recovery** since rollback isn't tested
4. **Dry-run mode reliability unknown** - users might accidentally overwrite files

### User Experience Impact

- **Frustration:** Cryptic ENOENT errors instead of helpful messages
- **Lost Time:** Debugging why placeholders weren't fully replaced
- **Trust Loss:** Tool appears unreliable or broken
- **Manual Cleanup:** Users would need to manually fix incomplete replacements

### Business Impact

- **Reputation Risk:** First release with critical bugs damages credibility
- **Support Burden:** High volume of support requests for common failures
- **Adoption Risk:** Users abandon tool after bad first experience

---

## Recommendations

### Immediate Actions (Before Deployment)

1. **Fix file path resolution in integration tests**
   - Option A: Create complete project structure in test temp directory
   - Option B: Refactor functions to accept `cwd` parameter
   - Option C: Use absolute paths throughout

2. **Fix multiple placeholder occurrence bug**
   - Debug `replaceInFile()` function
   - Ensure global regex flag is used
   - Add explicit test for this scenario

3. **Add tests for CLI modes**
   - Test dry-run doesn't modify files
   - Test verbose mode logs
   - Test JSON mode output

4. **Remove `process.chdir()` from tests**
   - Pass working directory as parameter
   - Use absolute paths in assertions
   - Improve test isolation

### Short-term Actions (Next Sprint)

5. **Add error handling tests**
   - Invalid JSON scenarios
   - Missing file scenarios
   - Permission denied scenarios

6. **Add realistic test data**
   - Real client names
   - Complex package names
   - Multi-line descriptions

7. **Add performance tests**
   - Large file handling
   - Many file scenarios
   - Memory usage validation

### Long-term Actions (Future)

8. **Add schema validation**
   - JSON Schema for template config
   - Runtime validation
   - Better error messages

9. **Improve documentation**
   - Document expected directory structure
   - Add troubleshooting guide
   - Add CLI usage examples

---

## Next Steps

### Required Before Merging

1. Fix all 9 failing tests
2. Run full regression test suite
3. Manual testing of CLI in clean environment
4. Code review focused on path handling

### Recommended Before Merging

5. Add tests for CLI modes (dry-run, verbose, json)
6. Add error handling tests
7. Remove global state mutation from tests
8. Add test coverage report

### Handoff Signals

- **Run `/syntek-dev-suite:debug`** to investigate the file path resolution issue and multiple occurrence bug
- **Run `/syntek-dev-suite:test-writer`** to add missing test cases for CLI modes and error scenarios
- **Run `/syntek-dev-suite:refactor`** to improve test isolation and remove `process.chdir()` usage
- **Run `/syntek-dev-suite:docs`** to update `docs/SETUP.md` with CLI usage and troubleshooting

---

## Conclusion

The US001 Template Initialisation CLI is **not ready for deployment**. Whilst core functionality is implemented and unit tests pass, the integration tests reveal **critical path resolution issues** and a **replacement logic bug** that would cause template initialisation to fail or be incomplete in production.

The **94.3% overall pass rate is misleading** - the 9 failures are all in integration tests that simulate real-world usage, making them far more critical than the passing unit tests.

**Estimated effort to fix:**

- Critical issues: 4-6 hours
- High priority issues: 4-6 hours
- Medium priority issues: 8-10 hours
- **Total: 16-22 hours**

**Recommendation:** Do not merge to `testing` or `dev` until all critical and high priority issues are resolved and verified.
