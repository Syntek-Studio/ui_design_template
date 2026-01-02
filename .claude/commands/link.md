---
description: Link package for local development
allowed-tools: Bash(npm link:*), Bash(yalc:*)
---

Link the package for local development in consuming apps.

**Using npm link:**

````bash

# In this package:

npm link

# In consuming app:

npm link @syntek-studio/ui
```text

**Using yalc (recommended):**
```bash

# In this package:

yalc push

# In consuming app:

yalc add @syntek-studio/ui
```text

**After changes:**
```bash

# Rebuild and push

npm run build && yalc push
````

$ARGUMENTS
