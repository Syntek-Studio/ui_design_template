# ClickUp Integration

This document describes the ClickUp project management integration for the @template/ui component library.

## Table of Contents

- [ClickUp Integration](#clickup-integration)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Quick Start](#quick-start)
    - [GitHub Secrets (Already Configured)](#github-secrets-already-configured)
    - [Local Environment (Only for CLI Scripts)](#local-environment-only-for-cli-scripts)
    - [Branch Naming Convention](#branch-naming-convention)
  - [Workflow Integration](#workflow-integration)
    - [Automatic Status Updates](#automatic-status-updates)
    - [Branch Structure](#branch-structure)
    - [Manual Status Updates](#manual-status-updates)
  - [Available Statuses](#available-statuses)
  - [Scripts](#scripts)
    - [Import User Stories](#import-user-stories)
    - [Sync Task Status](#sync-task-status)
  - [Configuration Files](#configuration-files)
  - [Security](#security)
  - [Environment Variables vs GitHub Secrets](#environment-variables-vs-github-secrets)
  - [Troubleshooting](#troubleshooting)
  - [Setup Guide](#setup-guide)

## Overview

The ClickUp integration provides automatic bidirectional synchronisation between GitHub and ClickUp, enabling:

- Automatic status updates when branches are created or PRs are opened
- Task status tracking through the development workflow
- PR links added as comments to ClickUp tasks
- Manual status updates via GitHub Actions workflow

## Quick Start

### GitHub Secrets (Already Configured)

The following secrets are configured in your GitHub repository Settings → Secrets and variables → Actions:
- `CLICKUP_API_KEY`
- `CLICKUP_WORKSPACE_ID`
- `CLICKUP_SPACE_ID`
- `CLICKUP_BACKLOG_FOLDER_ID`
- `CLICKUP_SPRINT_FOLDER_ID`

These are used automatically by GitHub Actions workflows.

### Local Environment (Only for CLI Scripts)

If you want to run the PM scripts locally (e.g., `./scripts/pm/clickup-import.sh`), you need to set environment variables:

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your credentials
# (This file is gitignored and never committed)
```

The `.env` file is only needed for local script execution. GitHub Actions uses the repository secrets instead.

### Branch Naming Convention

All feature branches must follow the pattern:
```
us<number>/<description>
```

Examples:
- `us001/add-button-component`
- `us042/implement-dark-mode`
- `us123/refactor-type-system`

The user story number must be exactly 3 digits and match a task in ClickUp with the format `US-001`, `US-042`, etc.

## Workflow Integration

### Automatic Status Updates

| Event | Target Branch | ClickUp Status |
|-------|--------------|----------------|
| Branch pushed | `us###/*` | `In Progress` |
| PR opened | `testing` | `In Review` |
| PR opened | `dev` | `In Review` |
| PR opened | `staging` | `Accepted` |
| PR opened | `main` | `Accepted Customer` |
| PR merged | `testing` | `In Review` |
| PR merged | `dev` | `In Review` |
| PR merged | `staging` | `Accepted` |
| PR merged | `main` | `Accepted Customer` |

### Branch Structure

The project follows this branch progression:

```
feature/us###/description → testing → dev → staging → main
```

Each merge moves the task through the workflow:
1. **Open/Pending** - Task created in ClickUp backlog
2. **In Progress** - Developer creates `us###/*` branch
3. **In Review** - PR opened to `testing` or `dev`
4. **Accepted** - PR merged to `staging`
5. **Accepted Customer** - PR merged to `main`
6. **Completed** - Task fully done and deployed

### Manual Status Updates

You can manually trigger a status update via GitHub Actions:

1. Go to Actions → ClickUp Sync
2. Click "Run workflow"
3. Enter the task ID (numbers only, without `CU-` prefix)
4. Select the desired status
5. Click "Run workflow"

## Available Statuses

The following statuses are available in ClickUp:

| Status | Description |
|--------|-------------|
| **Open** | Task is created but not started |
| **Pending** | Task is waiting to start |
| **In Progress** | Developer is actively working |
| **In Review** | Code is in PR review |
| **Accepted** | Code reviewed and accepted (staging) |
| **Accepted Customer** | Deployed to production |
| **Blocked** | Work cannot proceed due to blocker |
| **Rejected** | Code review rejected |
| **Rejected Customer** | Customer rejected the work |
| **Completed** | Task fully complete |
| **Closed** | Task archived/closed |

## Scripts

### Import User Stories

Import user stories from markdown files to ClickUp:

```bash
# Set up environment variables first
source .env

# Run in dry-run mode to preview
./scripts/pm/clickup-import.sh --dry-run

# Actually create tasks
./scripts/pm/clickup-import.sh
```

### Sync Task Status

Manually update a task status:

```bash
# Set up environment variables first
source .env

# Update status
./scripts/pm/sync-status.sh 001 "In Progress"
```

## Configuration Files

| File | Purpose |
|------|---------|
| `.github/clickup-config.json` | Main ClickUp configuration |
| `config/pm-config.json` | PM tool settings |
| `config/pm-status-mapping.json` | Status mapping rules |
| `.env.example` | Environment variable template (for local use) |

## Security

All scripts and workflows follow security best practices:

- API tokens never logged or exposed
- Input validation and sanitisation
- Rate limiting on API calls
- HTTP error handling
- JSON injection prevention
- Credentials stored in GitHub Secrets, never in code

## Environment Variables vs GitHub Secrets

| Use Case | Method | Why |
|----------|--------|-----|
| **GitHub Actions** | GitHub Secrets | Automatic, secure, no local setup needed |
| **Local Scripts** | `.env` file | Only when running scripts manually on your machine |
| **CI/CD Pipelines** | GitHub Secrets | Workflows access secrets automatically |

You only need the `.env` file if you're running the scripts locally. All GitHub Actions use the repository secrets.

## Troubleshooting

See [TROUBLESHOOTING.MD](./TROUBLESHOOTING.MD) for common issues and solutions.

## Setup Guide

For detailed setup instructions, see [SETUP-GUIDE.MD](./SETUP-GUIDE.MD).
