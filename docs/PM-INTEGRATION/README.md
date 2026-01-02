# docs/PM-INTEGRATION/

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
- [Files](#files)
- [What is PM Integration](#what-is-pm-integration)
  - [Key Features](#key-features)
  - [Status Flow](#status-flow)
  - [Configuration Files](#configuration-files)
- [How to Use](#how-to-use)
  - [For Developers](#for-developers)
  - [For Project Managers](#for-project-managers)
  - [For DevOps/Admin](#for-devopsadmin)
- [Configuration](#configuration)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
  - [Common Issues](#common-issues)
- [Related Sections](#related-sections)

---

## Overview

The `docs/PM-INTEGRATION/` folder contains documentation for the project management integration system, specifically ClickUp integration with GitHub. This system provides bidirectional synchronisation between GitHub branches, pull requests, and ClickUp tasks, enabling seamless workflow automation.

---

## Directory Tree

```
PM-INTEGRATION/
├── README.md                 # This file
├── README.MD                 # Setup and configuration guide
├── SETUP-GUIDE.MD            # Step-by-step setup instructions
└── TROUBLESHOOTING.MD        # Common issues and solutions
```

---

## Files

| File                 | Purpose                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| `README.MD`          | Comprehensive overview of ClickUp integration with GitHub, configuration details, and status flow mapping  |
| `SETUP-GUIDE.MD`     | Step-by-step instructions for setting up ClickUp integration with GitHub Actions and environment variables |
| `TROUBLESHOOTING.MD` | Common issues, debugging techniques, and solutions for PM integration problems                             |

---

## What is PM Integration

The project management integration system automates the synchronisation between GitHub and ClickUp:

### Key Features

- **Automatic Status Sync** - ClickUp task status updates based on GitHub branch and PR events
- **Bidirectional Updates** - Changes in GitHub are reflected in ClickUp and vice versa
- **Workflow Automation** - GitHub Actions workflows handle synchronisation automatically
- **Branch Naming Convention** - Branch names like `us###/description` link to ClickUp automatically
- **PR Event Tracking** - Pull request events (opened, merged) trigger status updates

### Status Flow

| GitHub Event             | ClickUp Status    |
| ------------------------ | ----------------- |
| Branch `us###/*` created | In Progress       |
| PR opened to `testing`   | In Review         |
| PR opened to `dev`       | In Review         |
| PR merged to `staging`   | Accepted          |
| PR merged to `main`      | Accepted Customer |

### Configuration Files

**config/pm-config.json** - Main configuration file containing:

- ClickUp workspace and list IDs
- GitHub repository settings
- Task status mappings

**config/pm-status-mapping.json** - Detailed status mapping:

- Maps GitHub events to ClickUp statuses
- Defines custom field values
- Controls synchronisation behaviour

---

## How to Use

### For Developers

1. **Create branches** following the naming convention: `us###/description`

   ```bash
   git checkout -b us001/add-button-component
   ```

2. **Push the branch** - GitHub Actions automatically updates ClickUp status to "In Progress"

3. **Open pull requests** - Status changes to "In Review" when PR is opened to `testing` or `dev`

4. **Merge to staging** - Status changes to "Accepted" when PR is merged to `staging`

5. **Merge to main** - Status changes to "Accepted Customer" when PR is merged to `main`

### For Project Managers

1. **View task status** - ClickUp automatically reflects GitHub progress
2. **Monitor PR workflow** - See which tasks are in review or completed
3. **Track completion** - Completed tasks show "Accepted Customer" when merged to main

### For DevOps/Admin

1. **Review SETUP-GUIDE.MD** - Configure GitHub Actions secrets
2. **Verify configuration** - Ensure `config/pm-config.json` is correct
3. **Check workflows** - Validate `.github/workflows/clickup-sync.yml`
4. **Troubleshoot issues** - Reference TROUBLESHOOTING.MD

---

## Configuration

### Prerequisites

- GitHub repository with Actions enabled
- ClickUp workspace with at least one list
- ClickUp API token
- GitHub personal access token

### Environment Variables

Required GitHub Secrets:

- `CLICKUP_API_TOKEN` - ClickUp API authentication
- `CLICKUP_TEAM_ID` - ClickUp team identifier
- `CLICKUP_LIST_ID` - ClickUp list for tasks

See **SETUP-GUIDE.MD** for detailed configuration steps.

---

## Troubleshooting

### Common Issues

**Tasks not syncing**

- Verify GitHub Secrets are configured
- Check branch naming convention (`us###/*`)
- Ensure ClickUp API token is valid

**Wrong status shown**

- Review `config/pm-status-mapping.json`
- Check GitHub Actions workflow logs
- Verify ClickUp list permissions

**Duplicate tasks created**

- Clear webhook history in GitHub
- Reset ClickUp task IDs
- Re-run synchronisation script

See **TROUBLESHOOTING.MD** for detailed solutions.

---

## Related Sections

- [../README.md](../README.md) - Documentation index
- [../STORIES/](../STORIES/) - User stories linked to ClickUp
- [../SPRINTS/](../SPRINTS/) - Sprint planning
- [../../.claude/CLAUDE.md](../../.claude/CLAUDE.md#project-management) - Project management conventions
- [../../config/](../../config/) - Configuration files

---

**Last Updated:** 02/01/2026
**Maintainer**: Development Team
