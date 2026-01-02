# Bug Fix: [Short Descriptive Title]

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
  - [Summary](#summary)
- [Investigation](#investigation)
  - [Symptoms](#symptoms)
    - [What Was Observed](#what-was-observed)
    - [Expected Behaviour](#expected-behaviour)
    - [Actual Behaviour](#actual-behaviour)
    - [Steps to Reproduce (if applicable)](#steps-to-reproduce-if-applicable)
    - [Affected Areas](#affected-areas)
    - [Environment](#environment)
  - [Root Cause Analysis](#root-cause-analysis)
    - [Investigation Process](#investigation-process)
    - [Hypothesis Testing](#hypothesis-testing)
    - [The Root Cause](#the-root-cause)
      - [Category 1: \[Category Name\]](#category-1-category-name)
      - [Category 2: \[Category Name\]](#category-2-category-name)
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
- [Appendix (Optional)](#appendix-optional)
  - [Example: Alert Triage for False Positives](#example-alert-triage-for-false-positives)
  - [Example: Detailed Technical Analysis](#example-detailed-technical-analysis)
  - [Example: Impact Analysis](#example-impact-analysis)

---

## Overview

| Field               | Value                                 |
| ------------------- | ------------------------------------- |
| **Bug ID**          | BUG-XXX                               |
| **Date Identified** | DD/MM/YYYY                            |
| **Date Fixed**      | DD/MM/YYYY                            |
| **Severity**        | Critical/High/Medium/Low              |
| **Branch**          | [branch-name]                         |
| **Commit**          | [commit-hash or TBD]                  |
| **Reporter**        | [Name, Tool, or User Story]           |
| **Fixed By**        | [Developer Name or Agent]             |
| **Status**          | Identified/In Progress/Fixed/Verified |

### Summary

[Provide a 2-3 sentence overview of the bug, its impact, and the fix applied. This should give readers immediate context without needing to read the entire document.]

**Example:**

> The authentication service failed to validate JWT tokens correctly, allowing expired tokens to pass verification. This created a security vulnerability affecting all API endpoints. The fix implements proper expiry checking and adds comprehensive test coverage.

---

## Investigation

### Symptoms

#### What Was Observed

[Describe what was seen, error messages, unexpected behaviour, or alerts raised]

**Example:**

> GitHub Security tab showed 5 critical alerts for CWE-798 (hardcoded credentials).

#### Expected Behaviour

[Describe what should have happened]

#### Actual Behaviour

[Describe what actually happened]

#### Steps to Reproduce (if applicable)

1. [Step one]
2. [Step two]
3. [Step three]

#### Affected Areas

[List files, modules, or components affected]

**Example:**

- `src/auth/token-validator.ts`
- `src/middleware/auth.middleware.ts`

#### Environment

| Environment | Affected |
| ----------- | -------- |
| Development | Yes/No   |
| Testing     | Yes/No   |
| Staging     | Yes/No   |
| Production  | Yes/No   |
| CI/CD       | Yes/No   |

---

### Root Cause Analysis

#### Investigation Process

[Describe the steps taken to investigate the bug]

**Example:**

1. Reviewed error logs from production
2. Examined token validation logic
3. Tested with expired tokens
4. Checked JWT library documentation

#### Hypothesis Testing

[Use a table to track hypotheses tested during investigation]

| Hypothesis          | Result    | Notes                          |
| ------------------- | --------- | ------------------------------ |
| [First hypothesis]  | Confirmed | [Evidence that confirmed this] |
| [Second hypothesis] | Ruled Out | [Why this was ruled out]       |
| [Third hypothesis]  | Partial   | [Partial confirmation details] |

#### The Root Cause

[Provide a clear technical explanation of what caused the bug]

**Technical Details:**

[Include code snippets, configuration examples, or architecture diagrams if helpful]

```typescript
// Example of the buggy code pattern
function validateToken(token: string) {
  // Missing expiry check
  return jwt.verify(token, SECRET)
}
```

**Categories (if multiple root causes):**

If the bug has multiple contributing factors, break them down:

##### Category 1: [Category Name]

[Explanation]

##### Category 2: [Category Name]

[Explanation]

#### Why This Bug Occurred

[Explain the circumstances that led to the bug being introduced]

**Example:**

1. **Incomplete security review** - Token validation was added quickly without security audit
2. **Missing test coverage** - No tests for expired token scenarios
3. **Library version** - Older JWT library didn't fail loudly on expired tokens

---

## Resolution

### The Fix

[Provide a clear explanation of how the bug was fixed]

#### Code Changes

**File: [filename] - [Description of change]**

**Before:**

```typescript
// Old buggy code
function example() {
  // ...
}
```

**After:**

```typescript
// Fixed code
function example() {
  // ...
}
```

**Rationale:** [Why this specific change fixes the issue]

#### Why This Fix Works

[Explain the technical reasoning behind why the fix resolves the bug]

**Key Points:**

1. [First key point]
2. [Second key point]
3. [Third key point]

#### Alternative Solutions Considered

| Solution              | Pros         | Cons            | Why Rejected/Chosen |
| --------------------- | ------------ | --------------- | ------------------- |
| [Solution 1]          | [Advantages] | [Disadvantages] | Rejected - [reason] |
| [Solution 2 (chosen)] | [Advantages] | [Disadvantages] | **Chosen**          |
| [Solution 3]          | [Advantages] | [Disadvantages] | Rejected - [reason] |

---

### Files Changed

| File                 | Change Type | Description         |
| -------------------- | ----------- | ------------------- |
| [path/to/file1.ts]   | Modified    | [Brief description] |
| [path/to/file2.ts]   | Modified    | [Brief description] |
| [path/to/newfile.ts] | Created     | [Brief description] |

#### Code Diff Summary

[Provide a high-level summary of changes made to each file]

**Example:**

- **auth/token-validator.ts:** Added expiry check on line 45, updated error handling on lines 67-72
- **middleware/auth.middleware.ts:** Integrated new validation function, added logging

---

## Verification & Prevention

### Testing

#### Manual Testing Checklist

- [ ] Test with valid token
- [ ] Test with expired token
- [ ] Test with malformed token
- [ ] Test with missing token
- [ ] Verify error messages are appropriate
- [ ] Confirm behaviour in all environments

#### Automated Test Examples

```typescript
// Example test case to prevent regression
describe('Token Validation', () => {
  it('should reject expired tokens', () => {
    const expiredToken = generateExpiredToken()
    expect(() => validateToken(expiredToken)).toThrow('Token expired')
  })
})
```

#### Regression Test Cases

| Test Case     | Description                | Priority |
| ------------- | -------------------------- | -------- |
| [Test case 1] | [What this test validates] | High     |
| [Test case 2] | [What this test validates] | Medium   |
| [Test case 3] | [What this test validates] | Low      |

---

### Prevention

#### How to Prevent Similar Bugs

[List specific practices, patterns, or checks to prevent this class of bug]

**Example:**

1. **Always validate token expiry** - Check `exp` claim before accepting tokens
2. **Comprehensive security testing** - Include expired/malformed token tests
3. **Security review checklist** - Add authentication logic to required review items

#### Linting/Static Analysis

[Specify which tools can catch this bug or similar issues]

**Example:**
This bug CAN be caught by:

- **ESLint security plugin** - Rule `detect-jwt-no-expiry`
- **SonarQube** - Security hotspot for JWT usage
- **Semgrep** - Custom rule for token validation patterns

#### Pre-Commit Checks

[Suggest git hooks or CI checks to prevent this bug]

**Example:**

```bash
# Add to pre-commit hook
npm run test:security
npm run lint:security
```

---

## References

### Related Issues

**Related Bugs:**

- BUG-XXX - [Brief description]

**Related User Stories:**

- US-XXX - [Brief description]

**Related PRs:**

- PR #XXX - [Brief description]

### External References

- [Link Title](URL) - Description
- [Link Title](URL) - Description

**Documentation:**

- [Library/Framework docs](URL)
- [Security guideline](URL)

---

## Appendix (Optional)

[Use this section for additional context that doesn't fit in the main flow]

### Example: Alert Triage for False Positives

If security scanners raised alerts that were determined to be false positives:

| Alert        | Location    | Why False Positive |
| ------------ | ----------- | ------------------ |
| [Alert name] | [file:line] | [Explanation]      |

### Example: Detailed Technical Analysis

[Any deep technical details, performance benchmarks, or additional investigation notes]

### Example: Impact Analysis

[Detailed analysis of the bug's impact on users, systems, or business]

---

**Instructions for Using This Template:**

1. **Copy this template** and rename to `BUG-XXX-[DESCRIPTIVE-NAME].md`
2. **Replace all bracketed placeholders** `[like this]` with actual content
3. **Delete placeholder text** and examples
4. **Remove unused sections** - If a section doesn't apply, remove it entirely
5. **Maintain British English** - Use "behaviour", "optimisation", "organisation", etc.
6. **Use FULL CAPITALISATION** for file names - e.g., `BUG-001-AUTHENTICATION-FAILURE.md`
7. **Update Table of Contents** - Ensure all links work after customisation

**Section Guidelines:**

- **Keep Summary concise** - 2-3 sentences maximum
- **Be thorough in Root Cause** - Future developers need to understand WHY
- **Show code changes** - Before/after examples are invaluable
- **Include test cases** - Prevent regressions
- **Link related issues** - Create traceability

**When to Use Appendix:**

- False positive triage from security scanners
- Detailed performance analysis
- Extended technical background
- Decision-making process documentation
- Post-mortem analysis
