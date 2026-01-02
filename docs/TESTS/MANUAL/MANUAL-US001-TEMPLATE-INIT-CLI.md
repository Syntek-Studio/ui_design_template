# Manual Testing Guide: US001 Template Initialisation CLI

**Last Updated:** 02/01/2026
**Author:** Test Writer Agent
**Story:** US001 - Template Initialisation CLI

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Test Environment Setup](#test-environment-setup)
- [Test Scenarios](#test-scenarios)
  - [Scenario 1: Happy Path - Fresh Initialisation with Scoped Package](#scenario-1-happy-path---fresh-initialisation-with-scoped-package)
  - [Scenario 2: Happy Path - Unscoped Package Name](#scenario-2-happy-path---unscoped-package-name)
  - [Scenario 3: Input Validation - Invalid Package Name (Uppercase)](#scenario-3-input-validation---invalid-package-name-uppercase)
  - [Scenario 4: Input Validation - Invalid Package Name (Spaces)](#scenario-4-input-validation---invalid-package-name-spaces)
  - [Scenario 5: Input Validation - Invalid Hex Colour (No Hash)](#scenario-5-input-validation---invalid-hex-colour-no-hash)
  - [Scenario 6: Input Validation - Invalid Hex Colour (Wrong Length)](#scenario-6-input-validation---invalid-hex-colour-wrong-length)
  - [Scenario 7: Input Validation - Empty Description](#scenario-7-input-validation---empty-description)
  - [Scenario 8: Re-initialisation - Already Initialized](#scenario-8-re-initialisation---already-initialized)
  - [Scenario 9: Cancellation - Cancel at Confirmation](#scenario-9-cancellation---cancel-at-confirmation)
  - [Scenario 10: Cancellation - CTRL+C During Prompts](#scenario-10-cancellation---ctrlc-during-prompts)
  - [Scenario 11: Special Characters - Client Name with Apostrophe](#scenario-11-special-characters---client-name-with-apostrophe)
  - [Scenario 12: Special Characters - Client Name with Ampersand](#scenario-12-special-characters---client-name-with-ampersand)
  - [Scenario 13: Edge Case - Very Long Description (500 Characters)](#scenario-13-edge-case---very-long-description-500-characters)
  - [Scenario 14: Edge Case - Very Long Package Name (214 Characters)](#scenario-14-edge-case---very-long-package-name-214-characters)
  - [Scenario 15: Verification - Build Still Works After Init](#scenario-15-verification---build-still-works-after-init)
  - [Scenario 16: Verification - Type Check Passes](#scenario-16-verification---type-check-passes)
  - [Scenario 17: Verification - Tests Still Run](#scenario-17-verification---tests-still-run)
- [Regression Checklist](#regression-checklist)
- [Known Issues](#known-issues)
- [Platform-Specific Testing](#platform-specific-testing)
  - [macOS](#macos)
  - [Linux](#linux)
  - [Windows](#windows)
- [Performance Testing](#performance-testing)
- [Sign-Off](#sign-off)
- [Troubleshooting](#troubleshooting)
  - [Issue: "Cannot find module 'inquirer'"](#issue-cannot-find-module-inquirer)
  - [Issue: "Permission denied" when running CLI](#issue-permission-denied-when-running-cli)
  - [Issue: Tests failing after initialization](#issue-tests-failing-after-initialization)
  - [Issue: Package.json becomes invalid JSON](#issue-packagejson-becomes-invalid-json)

## Prerequisites

- [ ] Node.js 18+ installed
- [ ] npm 9+ installed
- [ ] Fresh clone of ui_design_template repository
- [ ] No existing `template.config.json` file (for fresh init tests)
- [ ] Dependencies installed: `npm install`

## Test Environment Setup

```bash
# Clone the repository (for fresh testing)
git clone <repository-url> test-template-init
cd test-template-init

# Install dependencies
npm install

# Verify test command works
npm test
```

---

## Test Scenarios

### Scenario 1: Happy Path - Fresh Initialisation with Scoped Package

**Purpose:** Verify the main initialisation workflow works end-to-end with a scoped package name.

**Steps:**

1. Ensure you're in a fresh clone with no `template.config.json`
2. Run: `npm run init-template`
3. When prompted for "client/company name", enter: `Test Corporation`
4. When prompted for "package name", accept the default or enter: `@test-corp/ui`
5. When prompted for "primary brand colour", enter: `#3b82f6`
6. When prompted for "description", accept the default or enter: `Test Corporation design system for web and mobile`
7. When shown the confirmation summary, select "Yes" to proceed

**Expected Result:**

- CLI displays welcome message: "🎨 Template Initialization Wizard"
- All prompts appear with default values populated
- Confirmation summary shows all entered values correctly
- Progress indicators appear during file operations
- Success messages show which files were updated:
  - ✓ Updated package.json
  - ✓ Updated README.md
  - ✓ Updated .claude/CLAUDE.md
  - ✓ Updated src/index.ts
- `template.config.json` is created in project root
- Success message displays with next steps
- Total execution time < 60 seconds

**Verification:**

```bash
# Check template.config.json was created
cat template.config.json

# Should contain:
# - initialized: true
# - packageName: "@test-corp/ui"
# - clientName: "Test Corporation"
# - primaryColour: "#3b82f6"
# - initializedAt: <ISO timestamp>

# Check package.json was updated
grep '"name":' package.json
# Should show: "name": "@test-corp/ui"

grep '"author":' package.json
# Should show: "author": "Test Corporation" (or similar)

# Check README.md was updated
grep '@test-corp/ui' README.md
# Should find at least one occurrence

grep 'Test Corporation' README.md
# Should find at least one occurrence

# Verify no placeholders remain
grep -r '@syntek-studio/ui' . --exclude-dir=node_modules
# Should return no results (or only in .git history)

grep -r '@template/ui' . --exclude-dir=node_modules
# Should return no results

grep -r 'Syntek Studio' . --exclude-dir=node_modules --exclude=CHANGELOG.md
# Should return no results (except in CHANGELOG which is historical)
```

**Pass Criteria:**

- All prompts display correctly with sensible defaults
- All files are updated correctly
- `template.config.json` is created with correct structure
- No template placeholders remain
- CLI completes successfully in under 60 seconds

---

### Scenario 2: Happy Path - Unscoped Package Name

**Purpose:** Verify initialisation works with an unscoped package name.

**Steps:**

1. Start with a fresh clone (or delete `template.config.json` if re-testing)
2. Run: `npm run init-template`
3. Enter client name: `Acme`
4. Enter package name: `acme-ui` (unscoped, no @ symbol)
5. Enter colour: `#ff5733`
6. Enter description: `Acme UI component library`
7. Confirm

**Expected Result:**

- CLI accepts unscoped package name without errors
- `package.json` updated to `"name": "acme-ui"`
- All other replacements work correctly

**Pass Criteria:**

- Unscoped package names are handled correctly
- All replacements succeed

---

### Scenario 3: Input Validation - Invalid Package Name (Uppercase)

**Purpose:** Verify package name validation rejects uppercase letters.

**Steps:**

1. Run: `npm run init-template`
2. Enter client name: `Test`
3. Enter package name: `@Test/UI` (contains uppercase)
4. Observe validation error

**Expected Result:**

- Validation error appears immediately
- Error message states: "Package name must be lowercase with hyphens, dots, or underscores only" (or similar)
- User is re-prompted for package name
- Can enter valid package name after error

**Pass Criteria:**

- Uppercase package names are rejected
- Helpful error message is shown
- User can retry input

---

### Scenario 4: Input Validation - Invalid Package Name (Spaces)

**Purpose:** Verify package name validation rejects spaces.

**Steps:**

1. Run: `npm run init-template`
2. Enter client name: `Test`
3. Enter package name: `@test/ui library` (contains space)
4. Observe validation error

**Expected Result:**

- Validation error appears
- Error message indicates spaces are not allowed
- User is re-prompted

**Pass Criteria:**

- Package names with spaces are rejected
- Clear error message
- Re-prompt works

---

### Scenario 5: Input Validation - Invalid Hex Colour (No Hash)

**Purpose:** Verify hex colour validation rejects colours without # symbol.

**Steps:**

1. Run: `npm run init-template`
2. Complete client name and package name prompts successfully
3. Enter colour: `3b82f6` (missing # symbol)
4. Observe validation error

**Expected Result:**

- Validation error: "Colour must be a valid hex code (e.g., #3b82f6 or #fff)"
- User is re-prompted for colour
- Can enter valid colour after error

**Pass Criteria:**

- Hex colours without # are rejected
- Helpful error message with examples
- Re-prompt works

---

### Scenario 6: Input Validation - Invalid Hex Colour (Wrong Length)

**Purpose:** Verify hex colour validation rejects invalid lengths.

**Steps:**

1. Run: `npm run init-template`
2. Complete prompts up to colour
3. Enter colour: `#ffff` (4 digits, invalid)
4. Observe validation error

**Expected Result:**

- Validation error appears
- User is re-prompted
- Valid 3 or 6 digit hex is accepted on retry

**Pass Criteria:**

- Invalid hex lengths (not 3 or 6) are rejected
- Re-prompt allows correction

---

### Scenario 7: Input Validation - Empty Description

**Purpose:** Verify description validation rejects empty input.

**Steps:**

1. Run: `npm run init-template`
2. Complete prompts up to description
3. Clear the default and leave description empty (or just whitespace)
4. Observe validation error

**Expected Result:**

- Validation error: "Description cannot be empty"
- User is re-prompted
- Must enter non-empty description to proceed

**Pass Criteria:**

- Empty descriptions are rejected
- Whitespace-only descriptions are rejected
- Clear error message

---

### Scenario 8: Re-initialisation - Already Initialized

**Purpose:** Verify behaviour when running init on already initialized template.

**Steps:**

1. Initialize template successfully (Scenario 1)
2. Run: `npm run init-template` again
3. Observe warning message

**Expected Result:**

- Warning appears: "⚠️ Already initialized as @test-corp/ui" (or whatever package name was used)
- Prompt asks: "Re-initialize? This will overwrite previous configuration." (Yes/No)
- If "No" selected: CLI exits gracefully with message "✅ Initialization cancelled"
- If "Yes" selected: Proceeds with new initialisation, overwrites `template.config.json`

**Pass Criteria:**

- Already-initialized state is detected
- User is warned before proceeding
- Can cancel safely
- Can re-initialize if confirmed

---

### Scenario 9: Cancellation - Cancel at Confirmation

**Purpose:** Verify user can cancel during confirmation prompt.

**Steps:**

1. Run: `npm run init-template`
2. Enter all prompts with valid values
3. At confirmation summary, select "No"

**Expected Result:**

- CLI displays: "❌ Initialization cancelled"
- No files are modified
- No `template.config.json` is created
- Process exits with code 0

**Pass Criteria:**

- Cancellation works at confirmation step
- No files are modified
- Clean exit

---

### Scenario 10: Cancellation - CTRL+C During Prompts

**Purpose:** Verify graceful handling of CTRL+C interruption.

**Steps:**

1. Run: `npm run init-template`
2. Start entering prompts
3. Press CTRL+C (or CTRL+D on some systems)

**Expected Result:**

- CLI exits immediately
- No partial state left behind
- No `template.config.json` created
- No files modified

**Pass Criteria:**

- CTRL+C exits cleanly
- No partial modifications
- No corrupted files

---

### Scenario 11: Special Characters - Client Name with Apostrophe

**Purpose:** Verify special characters in client name are handled correctly.

**Steps:**

1. Run: `npm run init-template`
2. Enter client name: `O'Reilly Media`
3. Accept suggested package name or enter: `@oreilly/ui`
4. Complete other prompts
5. Confirm

**Expected Result:**

- Client name with apostrophe is accepted
- Apostrophe is preserved in replacements
- Files are updated correctly with `O'Reilly Media`
- No errors occur

**Pass Criteria:**

- Special characters in client name work correctly
- Replacements preserve special characters

---

### Scenario 12: Special Characters - Client Name with Ampersand

**Purpose:** Verify ampersands are handled correctly.

**Steps:**

1. Run: `npm run init-template`
2. Enter client name: `Procter & Gamble`
3. Complete other prompts
4. Confirm

**Expected Result:**

- Ampersand is accepted and preserved
- Replacements work correctly

**Pass Criteria:**

- Ampersands work in client names
- No encoding issues

---

### Scenario 13: Edge Case - Very Long Description (500 Characters)

**Purpose:** Verify maximum description length is enforced.

**Steps:**

1. Run: `npm run init-template`
2. Complete prompts up to description
3. Enter exactly 500 characters: `a`.repeat(500)
4. Try entering 501 characters on next attempt

**Expected Result:**

- 500 characters is accepted (passes validation)
- 501 characters is rejected with error: "Description must be 500 characters or less"

**Pass Criteria:**

- 500 character limit is enforced
- Exactly 500 characters is valid

---

### Scenario 14: Edge Case - Very Long Package Name (214 Characters)

**Purpose:** Verify maximum package name length is enforced.

**Steps:**

1. Run: `npm run init-template`
2. Enter client name: `Test`
3. Enter package name with exactly 214 characters
4. Try package name with 215 characters on retry if validation fails

**Expected Result:**

- 214 characters is accepted
- 215 characters is rejected with error about character limit

**Pass Criteria:**

- 214 character limit is enforced correctly

---

### Scenario 15: Verification - Build Still Works After Init

**Purpose:** Verify that the initialized template can still build successfully.

**Steps:**

1. Initialize template successfully (Scenario 1)
2. Run: `npm run build`

**Expected Result:**

- Build completes without errors
- `dist/` directory is created
- `dist/index.js`, `dist/index.mjs`, and `dist/index.d.ts` exist

**Pass Criteria:**

- Post-initialization build works
- No build errors

---

### Scenario 16: Verification - Type Check Passes

**Purpose:** Verify TypeScript compilation works after initialization.

**Steps:**

1. Initialize template successfully
2. Run: `npm run type-check`

**Expected Result:**

- Type checking completes without errors
- No TypeScript errors in updated files

**Pass Criteria:**

- Type checking passes
- No type errors introduced

---

### Scenario 17: Verification - Tests Still Run

**Purpose:** Verify existing tests still work after initialization.

**Steps:**

1. Initialize template successfully
2. Run: `npm test`

**Expected Result:**

- All tests run
- No new test failures introduced by initialization
- Template init tests pass

**Pass Criteria:**

- Test suite runs successfully
- No regressions

---

## Regression Checklist

After making changes to the CLI, verify these still work:

- [ ] Package.json remains valid JSON
- [ ] README.md maintains correct markdown formatting
- [ ] CLAUDE.md maintains correct markdown formatting
- [ ] All file paths use forward slashes (cross-platform compatibility)
- [ ] UTF-8 encoding is preserved in all files
- [ ] Line endings are preserved (LF vs CRLF)
- [ ] Git operations still work (add, commit, push)
- [ ] Storybook still launches: `npm run storybook:web`
- [ ] Dev mode still works: `npm run dev`

---

## Known Issues

_Document any known issues or limitations here as they're discovered:_

- None currently

---

## Platform-Specific Testing

### macOS

- [ ] Test on macOS 12+ (Monterey or later)
- [ ] Verify file paths work correctly
- [ ] Verify colour rendering in terminal

### Linux

- [ ] Test on Ubuntu 22.04+
- [ ] Test on other distributions if available
- [ ] Verify terminal colours work

### Windows

- [ ] Test on Windows 10/11
- [ ] Test in PowerShell
- [ ] Test in Git Bash
- [ ] Test in WSL2
- [ ] Verify file path handling (backslashes vs forward slashes)
- [ ] Verify terminal colours (may need special handling)

---

## Performance Testing

**Objective:** Verify execution completes in under 60 seconds.

**Steps:**

1. Run: `time npm run init-template` (on Unix systems)
2. Or run: `Measure-Command { npm run init-template }` (on Windows PowerShell)
3. Complete all prompts
4. Record execution time

**Expected Result:**

- Total time from start to finish: < 60 seconds
- File operations complete in < 5 seconds
- Prompt responses are immediate (< 100ms)

**Pass Criteria:**

- Meets 60 second requirement
- Feels responsive to user

---

## Sign-Off

| Tester | Date       | Platform       | Status | Notes |
| ------ | ---------- | -------------- | ------ | ----- |
| _Name_ | DD/MM/YYYY | macOS / Linux  | ✅/❌  |       |
| _Name_ | DD/MM/YYYY | Windows        | ✅/❌  |       |
| _Name_ | DD/MM/YYYY | CI Environment | ✅/❌  |       |

---

## Troubleshooting

### Issue: "Cannot find module 'inquirer'"

**Solution:**

```bash
npm install
```

### Issue: "Permission denied" when running CLI

**Solution:**

```bash
# Ensure script has execute permissions (Unix)
chmod +x scripts/init-template.ts

# Or run via npm script
npm run init-template
```

### Issue: Tests failing after initialization

**Solution:**

- Check that all placeholders were replaced
- Verify `template.config.json` was created correctly
- Try re-running initialization
- Check git diff to see what changed

### Issue: Package.json becomes invalid JSON

**Solution:**

- Restore from backup: `git checkout package.json`
- Report as bug - this should never happen
- JSON validation should prevent this

---

**End of Manual Testing Guide**
