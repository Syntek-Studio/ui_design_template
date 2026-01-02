# scripts/lib/

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
- [Modules](#modules)
  - [validators.ts](#validatorsts)
  - [prompts.ts](#promptsts)
  - [file-operations.ts](#file-operationsts)
  - [replacements.ts](#replacementsts)
- [Usage Examples](#usage-examples)
  - [Validating Input](#validating-input)
  - [File Operations](#file-operations)
- [Related Sections](#related-sections)

---

## Overview

The `lib/` directory contains reusable utility modules for the template initialisation workflow. These modules handle user input prompts, validation, file operations, and string replacement logic.

---

## Directory Tree

```
lib/
├── README.md                # This file
├── validators.ts            # Input validation functions
├── prompts.ts               # Interactive CLI prompts
├── file-operations.ts       # Async file read/write utilities
└── replacements.ts          # Placeholder replacement logic
```

---

## Modules

### validators.ts

Input validation functions returning `true` if valid or error message string if invalid.

| Function                    | Validates                                 |
| --------------------------- | ----------------------------------------- |
| `validatePackageName(name)` | npm package names (scoped: `@scope/name`) |
| `validateHexColour(colour)` | Hex codes (`#RGB` or `#RRGGBB`)           |
| `validateDescription(desc)` | Non-empty, max 500 chars                  |
| `validateClientName(name)`  | Non-empty, max 100 chars                  |

### prompts.ts

Interactive CLI prompts using inquirer.js.

| Function                                  | Purpose                                                |
| ----------------------------------------- | ------------------------------------------------------ |
| `promptUserInputs()`                      | Collect client name, package name, description, colour |
| `confirmInputs(answers)`                  | Display summary and confirm                            |
| `displayWelcomeMessage()`                 | Show welcome message                                   |
| `displaySuccessMessage(answers, results)` | Show completion summary                                |

### file-operations.ts

Async file system utilities.

| Function                            | Purpose                             |
| ----------------------------------- | ----------------------------------- |
| `fileExists(path)`                  | Check if file/directory exists      |
| `readFile(path)`                    | Read file content as UTF-8          |
| `writeFile(path, content)`          | Write content to file               |
| `replaceInFile(path, replacements)` | Replace content, return if modified |
| `createBackup(path)`                | Create .backup copy                 |
| `restoreFromBackup(path)`           | Restore from .backup                |

### replacements.ts

Placeholder replacement logic.

| Function                          | Purpose                          |
| --------------------------------- | -------------------------------- |
| `createReplacementMap(answers)`   | Create placeholder→value map     |
| `applyReplacements(content, map)` | Apply replacements to content    |
| `getFilesToModify()`              | List files to modify during init |
| `hasPlaceholders(content)`        | Check for remaining placeholders |

---

## Usage Examples

### Validating Input

```typescript
import { validatePackageName, validateHexColour } from './lib/validators'

const pkgResult = validatePackageName('@acme/ui')
if (pkgResult !== true) console.error(pkgResult)

const colourResult = validateHexColour('#3b82f6')
if (colourResult !== true) console.error(colourResult)
```

### File Operations

```typescript
import { readFile, replaceInFile } from './lib/file-operations'

const content = await readFile('package.json')
const modified = await replaceInFile('package.json', {
  '@syntek-studio/ui': '@acme/ui',
})
```

---

## Related Sections

- [../README.md](../README.md) - Scripts overview
- [../**tests**/README.md](../__tests__/README.md) - Test suite
- [../init-template.ts](../init-template.ts) - Main CLI entry point

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
