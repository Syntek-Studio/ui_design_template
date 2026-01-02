# scripts/**tests**/

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
- [Test Files](#test-files)
- [Running Tests](#running-tests)
- [Writing New Tests](#writing-new-tests)
- [Related Sections](#related-sections)

---

## Overview

The `__tests__/` directory contains automated tests for all script modules using Vitest. Tests ensure that template initialisation functions work correctly with various inputs and edge cases.

---

## Directory Tree

```
__tests__/
├── README.md                     # This file
├── validators.test.ts            # Tests for input validators
├── file-operations.test.ts       # Tests for file I/O operations
├── replacements.test.ts          # Tests for placeholder replacement
└── init-template.test.ts         # Tests for template initialisation
```

---

## Test Files

| File                      | Tests                                                         |
| ------------------------- | ------------------------------------------------------------- |
| `validators.test.ts`      | Package name, hex colour, description, client name validation |
| `file-operations.test.ts` | File existence, read/write, replace, backup/restore           |
| `replacements.test.ts`    | Replacement map creation, placeholder detection, file list    |
| `init-template.test.ts`   | Complete initialisation workflow integration                  |

---

## Running Tests

```bash
npm test                    # Run all tests
npm test -- validators.test.ts  # Run specific file
npm test -- --watch         # Watch mode
npm run test:coverage       # With coverage report
npm run test:verbose        # Detailed output
./scripts/env/test.sh       # Full QA suite
```

---

## Writing New Tests

```typescript
import { describe, it, expect } from 'vitest'
import { functionToTest } from '../lib/module'

describe('functionToTest', () => {
  it('should return expected output for valid input', () => {
    expect(functionToTest('valid')).toBe(true)
  })

  it('should return error for invalid input', () => {
    const result = functionToTest('')
    expect(result).not.toBe(true)
    expect(typeof result).toBe('string')
  })
})
```

---

## Related Sections

- [../README.md](../README.md) - Scripts overview
- [../lib/README.md](../lib/README.md) - Library modules being tested
- [../../vitest.config.ts](../../vitest.config.ts) - Vitest configuration

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
