# config/

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
- [Configuration Files](#configuration-files)
- [Project Management Configuration](#project-management-configuration)
  - [pm-config.json](#pm-configjson)
  - [pm-status-mapping.json](#pm-status-mappingjson)
- [Usage Guide](#usage-guide)
  - [For Developers](#for-developers)
  - [For Project Managers](#for-project-managers)
  - [For DevOps/Administrators](#for-devopsadministrators)
  - [Setup Steps](#setup-steps)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
  - [Tasks Not Syncing](#tasks-not-syncing)
  - [Status Mapping Issues](#status-mapping-issues)
- [Related Sections](#related-sections)

---

## Overview

The `config/` folder contains project-wide configuration files for project management integration, build tools, and external services. These files define how the project integrates with ClickUp, GitHub, and other tools used in the development workflow.

---

## Directory Tree

```
config/
├── README.md                        # This file
├── pm-config.json                   # ClickUp and PM integration settings
└── pm-status-mapping.json           # Status mappings for GitHub-ClickUp sync
```

---

## Configuration Files

| File                     | Purpose                                                                       |
| ------------------------ | ----------------------------------------------------------------------------- |
| `pm-config.json`         | Main configuration for ClickUp integration with workspace, list, and team IDs |
| `pm-status-mapping.json` | Defines how GitHub events map to ClickUp task statuses                        |

---

## Project Management Configuration

### pm-config.json

Stores the primary configuration for ClickUp integration.

**Contents:**

- `teamId` - ClickUp team/workspace identifier
- `listId` - ClickUp list ID for project tasks
- `workspaceId` - ClickUp workspace identifier (if applicable)
- `apiEndpoint` - ClickUp API endpoint (default: official ClickUp API)

**Example:**

```json
{
  "teamId": "1234567",
  "listId": "987654321",
  "workspaceId": "workspace123",
  "apiEndpoint": "https://api.clickup.com/api/v2"
}
```

**Usage:**

- Read by PM integration scripts
- Used in GitHub Actions workflows
- Referenced by ClickUp sync scripts

**How to Update:**

1. Obtain IDs from ClickUp workspace settings
2. Edit `pm-config.json` with correct values
3. Commit changes (do not expose sensitive IDs in public repos)
4. Set GitHub Secrets for CI/CD environments

### pm-status-mapping.json

Defines how GitHub events translate to ClickUp task statuses.

**Structure:**

```json
{
  "statuses": {
    "in-progress": "In Progress",
    "in-review": "In Review",
    "accepted": "Accepted",
    "accepted-customer": "Accepted Customer"
  },
  "githubEvents": {
    "branch-created": "in-progress",
    "pr-opened": "in-review",
    "pr-merged-staging": "accepted",
    "pr-merged-main": "accepted-customer"
  }
}
```

**Status Mapping:**

| GitHub Event             | Mapped Status     | ClickUp Status    |
| ------------------------ | ----------------- | ----------------- |
| Branch `us###/*` created | in-progress       | In Progress       |
| PR opened to testing/dev | in-review         | In Review         |
| PR merged to staging     | accepted          | Accepted          |
| PR merged to main        | accepted-customer | Accepted Customer |

**Usage:**

- Defines status flow for task synchronisation
- Used by GitHub Actions workflows
- Referenced by ClickUp sync scripts

**How to Update:**

1. Identify new status or event
2. Add to appropriate section
3. Ensure status exists in ClickUp
4. Test synchronisation workflow
5. Document change in commit message

---

## Usage Guide

### For Developers

**You typically don't need to modify config files**, but should understand:

1. **Branch naming** - Follow `us###/description` pattern to auto-sync with ClickUp
2. **PR workflow** - Opening PRs to testing/dev triggers status updates
3. **Status visibility** - Check ClickUp to see task status reflected from GitHub

### For Project Managers

**Configuration affects automatic status updates:**

1. **Initial setup** - Provide ClickUp workspace/list IDs to DevOps
2. **Status verification** - Confirm statuses in ClickUp match workflow
3. **Task tracking** - Monitor task status based on GitHub activity

### For DevOps/Administrators

**You are responsible for configuration management:**

1. **Initial configuration** - Set up pm-config.json with correct IDs
2. **GitHub Secrets** - Configure sensitive values in GitHub Actions
3. **Status mapping** - Maintain pm-status-mapping.json as workflows change
4. **Testing** - Verify configuration with test branch and PR
5. **Documentation** - Update config when changing status flow

### Setup Steps

1. **Get ClickUp credentials:**

   ```
   - Team ID from ClickUp workspace settings
   - List ID from the specific list settings
   - API token from account settings
   ```

2. **Update pm-config.json:**

   ```bash
   # Edit config file with actual IDs
   nano config/pm-config.json
   ```

3. **Configure GitHub Secrets:**
   - Go to GitHub repo Settings → Secrets and Variables → Actions
   - Add secrets:
     - `CLICKUP_API_TOKEN`
     - `CLICKUP_TEAM_ID`
     - `CLICKUP_LIST_ID`

4. **Test configuration:**

   ```bash
   # Create test branch
   git checkout -b us000/test-pm-integration
   git push origin us000/test-pm-integration

   # Create test PR
   # Verify ClickUp task status updates
   ```

5. **Verify status mapping:**
   - Ensure pm-status-mapping.json matches your workflow
   - Update if using different branch strategy

---

## Environment Variables

These configuration values should be stored as **GitHub Secrets** (not in config files):

| Variable            | Source                         | Usage                |
| ------------------- | ------------------------------ | -------------------- |
| `CLICKUP_API_TOKEN` | ClickUp Account Settings       | API authentication   |
| `CLICKUP_TEAM_ID`   | From pm-config.json or ClickUp | Workspace identifier |
| `CLICKUP_LIST_ID`   | From pm-config.json or ClickUp | Task list identifier |

**Security Note:** Never commit API tokens or sensitive IDs to version control. Use GitHub Secrets for CI/CD.

---

## Troubleshooting

### Tasks Not Syncing

**Likely causes:**

1. Incorrect team/list IDs in pm-config.json
2. GitHub Secrets not configured
3. API token expired or invalid
4. Branch naming convention not followed (`us###/*`)

**Solutions:**

1. Verify IDs in pm-config.json
2. Check GitHub Secrets configuration
3. Regenerate ClickUp API token if needed
4. Ensure branch follows naming pattern

### Status Mapping Issues

**Likely causes:**

1. Status name doesn't match ClickUp status
2. Workflow branches different from mapping
3. Custom status not configured in ClickUp

**Solutions:**

1. Verify status names match exactly in ClickUp
2. Update pm-status-mapping.json for your workflow
3. Create custom statuses in ClickUp if needed

---

## Related Sections

- [../README.md](../README.md) - Main project documentation
- [../docs/PM-INTEGRATION/](../docs/PM-INTEGRATION/) - PM integration documentation
- [../.github/workflows/](../.github/workflows/) - GitHub Actions workflows
- [../.claude/CLAUDE.md](../.claude/CLAUDE.md#project-management) - Project management conventions

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
