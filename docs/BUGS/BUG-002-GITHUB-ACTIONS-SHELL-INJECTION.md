# Bug Fix: GitHub Actions Shell Injection Vulnerabilities

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
  - [Summary](#summary)
- [Investigation](#investigation)
  - [Symptoms](#symptoms)
    - [What Was Observed](#what-was-observed)
    - [Expected Behaviour](#expected-behaviour)
    - [Actual Behaviour](#actual-behaviour)
    - [Steps to Reproduce](#steps-to-reproduce)
    - [Affected Areas](#affected-areas)
    - [Environment](#environment)
  - [Root Cause Analysis](#root-cause-analysis)
    - [Investigation Process](#investigation-process)
    - [Hypothesis Testing](#hypothesis-testing)
    - [The Root Cause](#the-root-cause)
    - [Why This Bug Occurred](#why-this-bug-occurred)
- [Resolution](#resolution)
  - [The Fix](#the-fix)
    - [Code Changes](#code-changes)
    - [Why This Fix Works](#why-this-fix-works)
    - [Alternative Solutions Considered](#alternative-solutions-considered)
  - [Files Changed](#files-changed)
    - [Code Diff Summary](#code-diff-summary)
- [Verification \& Prevention](#verification--prevention)
  - [Testing](#testing)
    - [Manual Testing Checklist](#manual-testing-checklist)
    - [Automated Test Examples](#automated-test-examples)
    - [Regression Test Cases](#regression-test-cases)
  - [Prevention](#prevention)
    - [How to Prevent Similar Bugs](#how-to-prevent-similar-bugs)
    - [Linting/Static Analysis](#lintingstatic-analysis)
    - [Pre-Commit Checks](#pre-commit-checks)
- [References](#references)
  - [Related Issues](#related-issues)
  - [External References](#external-references)
- [Appendix](#appendix)
  - [Alert Triage for False Positives](#alert-triage-for-false-positives)
  - [Why These Were Initially Flagged](#why-these-were-initially-flagged)
  - [Recommendations for Scanner Configuration](#recommendations-for-scanner-configuration)

---

## Overview

| Field               | Value                                   |
| ------------------- | --------------------------------------- |
| **Bug ID**          | BUG-002                                 |
| **Date Identified** | 02/01/2026                              |
| **Date Fixed**      | 02/01/2026                              |
| **Severity**        | Medium                                  |
| **Branch**          | main                                    |
| **Commit**          | TBD                                     |
| **Reporter**        | GitHub Code Scanning (Semgrep, Checkov) |
| **Fixed By**        | Claude Agent (Debug)                    |
| **Status**          | Fixed                                   |

### Summary

Multiple GitHub Actions workflows contained potential shell injection vulnerabilities where GitHub context variables were interpolated directly into shell scripts instead of being passed via environment variables. This created a theoretical attack vector for code injection through maliciously crafted branch names or PR titles. The fix moves all GitHub context variables to `env:` blocks and adds input validation where appropriate.

---

## Investigation

### Symptoms

#### What Was Observed

GitHub Code Scanning raised the following alerts:

1. **Semgrep yaml.github-actions.security.run-shell-injection** (Lines 52, 358 in clickup-sync.yml)
2. **CKV_GHA_2** - Shell injection vulnerability (Lines 50, 354 in clickup-sync.yml)
3. **CKV_GHA_7** - Workflow dispatch inputs not empty (Line 21 in clickup-sync.yml)
4. **Unpinned actions** - Actions not pinned to commit SHA (release.yml:37, codacy.yml:21)

#### Expected Behaviour

All GitHub context variables should be passed to shell scripts via `env:` blocks, not direct `${{ }}` interpolation within `run:` blocks.

#### Actual Behaviour

Some workflows used direct interpolation patterns like:

```yaml
run: |
  BRANCH="${{ github.base_ref }}"
```

Instead of the safe pattern:

```yaml
env:
  BRANCH: ${{ github.base_ref }}
run: |
  echo "$BRANCH"
```

#### Steps to Reproduce

1. Run GitHub Code Scanning or Checkov on the repository
2. Observe security alerts for shell injection vulnerabilities
3. Review the flagged workflow files

#### Affected Areas

- `.github/workflows/clickup-sync.yml`
- `.github/workflows/version-check.yml`
- `.github/workflows/release.yml`

#### Environment

| Environment | Affected |
| ----------- | -------- |
| Development | No       |
| Testing     | No       |
| Staging     | No       |
| Production  | Yes (CI) |

---

### Root Cause Analysis

#### Investigation Process

1. Read all three affected workflow files completely
2. Identified each flagged line and its context
3. Analysed whether the variable was passed via `env:` block or direct interpolation
4. Assessed the actual attack vector for each case
5. Determined which alerts were genuine vulnerabilities vs false positives

#### Hypothesis Testing

| Hypothesis                                          | Result    | Notes                                                    |
| --------------------------------------------------- | --------- | -------------------------------------------------------- |
| All flagged lines are shell injection risks         | Partial   | Some already used safe patterns via `env:` blocks        |
| Actions are unpinned to version tags                | Ruled Out | Already pinned to full commit SHAs with version comments |
| workflow_dispatch inputs are dangerous              | Ruled Out | Inputs are validated before use (regex + allowlist)      |
| `github.base_ref` direct interpolation is dangerous | Confirmed | Could allow injection via malicious branch names         |

#### The Root Cause

**Direct interpolation of GitHub context variables in shell scripts.**

When you write:

```yaml
run: |
  VERSION="${{ steps.version.outputs.version }}"
```

GitHub Actions performs string interpolation BEFORE the shell executes. If the value contains shell metacharacters like `$(command)` or backticks, they will be executed.

**Technical Details:**

Vulnerable pattern in `clickup-sync.yml:104`:

```yaml
run: |
  BASE_REF="${{ github.base_ref }}"
```

Vulnerable pattern in `version-check.yml:20`:

```yaml
run: |
  CHANGED_FILES=$(git diff --name-only origin/${{ github.base_ref }}...HEAD)
```

#### Why This Bug Occurred

1. **Developer convenience** - Direct interpolation is shorter to write
2. **Incomplete security awareness** - The subtle difference between `env:` block and direct interpolation was not immediately obvious
3. **Mixed patterns** - Some steps in the same file used safe patterns while others did not, indicating inconsistent security review

---

## Resolution

### The Fix

Changed all direct interpolations to use `env:` blocks and added input validation where appropriate.

#### Code Changes

**1. clickup-sync.yml - Move context variables to env block**

**Before:**

```yaml
- name: Determine Status Based on Event
  id: status
  if: steps.extract.outputs.skip != 'true' && steps.extract.outputs.manual != 'true'
  run: |
    EVENT="${{ github.event_name }}"
    ACTION="${{ github.event.action }}"
    BASE_REF="${{ github.base_ref }}"
    MERGED="${{ github.event.pull_request.merged }}"
```

**After:**

```yaml
- name: Determine Status Based on Event
  id: status
  if: steps.extract.outputs.skip != 'true' && steps.extract.outputs.manual != 'true'
  env:
    # SECURITY: Pass GitHub context via env vars to prevent shell injection
    EVENT: ${{ github.event_name }}
    ACTION: ${{ github.event.action }}
    BASE_REF: ${{ github.base_ref }}
    MERGED: ${{ github.event.pull_request.merged }}
  run: |
    # SECURITY: Variables are now passed via environment, not direct interpolation
```

**Rationale:** Environment variable isolation prevents shell metacharacters from being executed.

**2. version-check.yml - Secure base_ref usage**

**Before:**

```yaml
- name: Get changed files
  id: changed
  run: |
    CHANGED_FILES=$(git diff --name-only origin/${{ github.base_ref }}...HEAD)
```

**After:**

```yaml
- name: Get changed files
  id: changed
  env:
    # SECURITY: Pass base_ref via env var to prevent shell injection
    BASE_REF: ${{ github.base_ref }}
  run: |
    # SECURITY: Using env var instead of direct interpolation
    CHANGED_FILES=$(git diff --name-only "origin/$BASE_REF"...HEAD)
```

**Rationale:** Passing via environment variable and proper quoting prevents injection attacks.

**3. release.yml - Add validation and secure version usage**

**Before:**

```yaml
- name: Get changelog entry
  id: changelog
  run: |
    VERSION="${{ steps.version.outputs.version }}"
    CHANGELOG=$(sed -n "/## \[${VERSION}\]/,/## \[/p" CHANGELOG.md | sed '$d' | tail -n +2)
```

**After:**

```yaml
- name: Get changelog entry
  id: changelog
  env:
    # SECURITY: Pass version via env var to prevent shell injection
    VERSION: ${{ steps.version.outputs.version }}
  run: |
    # SECURITY: Validate version format before use
    if [[ ! "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9.]+)?$ ]]; then
      echo "::error::Invalid version format: $VERSION"
      exit 1
    fi
    CHANGELOG=$(sed -n "/## \[${VERSION}\]/,/## \[/p" CHANGELOG.md | sed '$d' | tail -n +2)
```

**Rationale:** Adds defence-in-depth with explicit format validation for semver pattern.

#### Why This Fix Works

**Key Points:**

1. **Environment variable isolation** - When passed via `env:` blocks, values are set as actual environment variables, not interpolated into the script text
2. **Shell quoting protection** - Environment variables accessed as `$VAR` or `"$VAR"` in bash are not subject to the same injection risks as direct interpolation
3. **Input validation** - Added explicit format validation for VERSION to ensure it matches expected semver pattern
4. **Defence in depth** - Even if an attacker could control the variable value, shell metacharacters in environment variables are not executed

#### Alternative Solutions Considered

| Solution                 | Pros                     | Cons                              | Why Rejected/Chosen |
| ------------------------ | ------------------------ | --------------------------------- | ------------------- |
| `env:` blocks            | Standard, clean, secure  | Slightly more verbose             | **Chosen**          |
| Shell escaping functions | Works with direct interp | Error-prone, hard to maintain     | Rejected            |
| Intermediate files       | Maximum isolation        | Overcomplicated for this use case | Rejected            |
| Disable workflows        | Eliminates risk entirely | Breaks CI/CD functionality        | Rejected            |

---

### Files Changed

| File                                  | Change Type | Description                                                                 |
| ------------------------------------- | ----------- | --------------------------------------------------------------------------- |
| `.github/workflows/clickup-sync.yml`  | Modified    | Added `env:` block to "Determine Status" step                               |
| `.github/workflows/version-check.yml` | Modified    | Added `env:` blocks to "Get changed files" and "Version check passed" steps |
| `.github/workflows/release.yml`       | Modified    | Added `env:` block and validation to "Get changelog entry" step             |

#### Code Diff Summary

- **clickup-sync.yml:** Lines 98-108 - Added `env:` block with 4 variables
- **version-check.yml:** Lines 16-24 - Added `env:` block for BASE_REF; Lines 65-75 - Added `env:` block for CODE_CHANGED
- **release.yml:** Lines 26-41 - Added `env:` block for VERSION and validation regex

---

## Verification & Prevention

### Testing

#### Manual Testing Checklist

- [x] clickup-sync.yml still functions (push to us###/\* branch)
- [ ] version-check.yml still functions (PR with code changes)
- [ ] release.yml still functions (VERSION file change merged to main)
- [x] No new security alerts after fixes

#### Automated Test Examples

```bash
#!/bin/bash
# test_workflow_security.sh

# Check for direct interpolation in run blocks
# This is a simplified check - full security scanning recommended

for file in .github/workflows/*.yml; do
  # Look for run: blocks that contain ${{ patterns
  if grep -Pzo '(?s)run:\s*\|[^-]*\$\{\{' "$file" >/dev/null 2>&1; then
    echo "FAIL: $file contains direct interpolation in run block"
    exit 1
  fi
done

echo "PASS: No direct interpolation found in run blocks"
```

#### Regression Test Cases

| Test Case                             | Description                            | Priority |
| ------------------------------------- | -------------------------------------- | -------- |
| `test_workflow_security_scan`         | Run Checkov on all workflow files      | High     |
| `test_no_direct_interpolation_in_run` | Grep for `\$\{\{` inside `run:` blocks | High     |

---

### Prevention

#### How to Prevent Similar Bugs

1. **Coding Practice:** ALWAYS use `env:` blocks when passing GitHub context variables to shell scripts. Never use `${{ }}` directly inside `run:` blocks.

2. **Code Review:** Check all `run:` blocks for direct `${{ }}` interpolation. The only safe uses are:
   - In `if:` conditions
   - In `with:` parameters to actions
   - In `env:` value assignments

3. **Testing:** Run Checkov or similar security scanners on workflow changes before merging.

4. **Documentation:** Add security comments explaining WHY env blocks are used.

#### Linting/Static Analysis

This bug IS caught by:

- **Checkov** (rules CKV_GHA_2, CKV_GHA_7)
- **Semgrep** (rule yaml.github-actions.security.run-shell-injection)
- **GitHub Code Scanning** (when enabled with appropriate ruleset)

#### Pre-Commit Checks

Consider adding a pre-commit hook that runs:

```bash
checkov -f .github/workflows/*.yml --check CKV_GHA_2
```

---

## References

### Related Issues

**Related Bugs:**

- BUG-001 - Codacy Remark-Lint False Positives (separate issue, not security-related)

**Related User Stories:**

- N/A (Infrastructure/Security fix)

**Related PRs:**

- TBD (This fix)

### External References

- [GitHub Security Hardening Guide](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions#understanding-the-risk-of-script-injections)
- [Checkov CKV_GHA_2 Documentation](https://www.checkov.io/5.Policy%20Index/github_actions.html)
- [Semgrep GitHub Actions Rules](https://semgrep.dev/r?q=github-actions+security)

---

## Appendix

### Alert Triage for False Positives

The following alerts from the security scanners were determined to be false positives after investigation:

| Alert                        | Location             | Why False Positive                                                        |
| ---------------------------- | -------------------- | ------------------------------------------------------------------------- |
| Shell injection via HEAD_REF | clickup-sync.yml:54  | Already passed via `env:` block at line 54, not direct interpolation      |
| Shell injection via PR_TITLE | clickup-sync.yml:356 | Already passed via `env:` block AND sanitised with `tr` at line 372       |
| Shell injection via BASE_REF | clickup-sync.yml:358 | Already passed via `env:` block in "Add Comment" step                     |
| Unpinned action              | release.yml:38       | Already pinned to SHA `a06a81a03ee405af7f2048a818ed3f03bbf83c7b` (v2.5.0) |
| Unpinned action              | codacy.yml:22        | Already pinned to SHA `562ee3e92b8e92df8b67e0a5ff8aa8e261919c08` (v4.4.7) |
| CKV_GHA_7 workflow_dispatch  | clickup-sync.yml:21  | Inputs are validated with regex and allowlist at lines 64-79              |

### Why These Were Initially Flagged

Security scanners often use pattern matching that cannot fully understand context:

1. **Line number misattribution** - Scanners flag the line where the variable appears, not necessarily where it's used unsafely
2. **Cached results** - Some alerts may persist from before fixes were applied
3. **Pattern matching limitations** - Scanners see `${{ github.head_ref }}` and flag it, even when it's in a safe `env:` block
4. **Version tag detection** - Some scanners flag `@v2` even when a pinned SHA is also present

### Recommendations for Scanner Configuration

1. **Suppress false positives** - Add inline comments or .checkov.yaml exceptions for confirmed false positives
2. **Regular triage** - Review security alerts weekly and document findings
3. **Use multiple tools** - Cross-reference Checkov, Semgrep, and GitHub's built-in scanning
