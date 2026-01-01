# ClickUp Integration Setup Guide

This guide walks you through setting up the ClickUp integration for @template/ui.

## Table of Contents

- [ClickUp Integration Setup Guide](#clickup-integration-setup-guide)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Understanding GitHub Secrets vs Local Environment](#understanding-github-secrets-vs-local-environment)
  - [Step 1: Verify GitHub Secrets (Already Done)](#step-1-verify-github-secrets-already-done)
  - [Step 2: Set Up Local Environment (Optional)](#step-2-set-up-local-environment-optional)
  - [Step 3: Get Your Own ClickUp API Key (Optional)](#step-3-get-your-own-clickup-api-key-optional)
  - [Step 4: Create User Stories in ClickUp](#step-4-create-user-stories-in-clickup)
  - [Step 5: Test the Integration](#step-5-test-the-integration)
    - [Test 1: Branch Creation (GitHub Actions)](#test-1-branch-creation-github-actions)
    - [Test 2: Pull Request (GitHub Actions)](#test-2-pull-request-github-actions)
    - [Test 3: Manual Status Update (GitHub Actions)](#test-3-manual-status-update-github-actions)
    - [Test 4: Local Script Execution (Optional)](#test-4-local-script-execution-optional)
  - [Step 6: Verify Workflow Responses](#step-6-verify-workflow-responses)
  - [Step 7: Configure Status Mapping (Optional)](#step-7-configure-status-mapping-optional)
  - [Troubleshooting](#troubleshooting)
    - ["API Error (HTTP 401)" in GitHub Actions](#api-error-http-401-in-github-actions)
    - ["No task found for US-###"](#no-task-found-for-us-)
    - ["Invalid user story number format"](#invalid-user-story-number-format)
    - [Workflow not triggering](#workflow-not-triggering)
    - [Local script fails with "CLICKUP\_API\_KEY is not set"](#local-script-fails-with-clickup_api_key-is-not-set)
  - [Next Steps](#next-steps)
  - [Support](#support)

## Prerequisites

- ClickUp workspace with API access
- GitHub repository with Actions enabled
- User stories named `US-001`, `US-002`, etc. in ClickUp

## Understanding GitHub Secrets vs Local Environment

**GitHub Secrets** are already configured in your repository and are used automatically by GitHub Actions workflows. You do not need to set up local environment variables unless you want to run the PM scripts locally.

| Scenario | What You Need |
|----------|---------------|
| GitHub Actions runs automatically | Nothing - secrets already configured |
| Run scripts locally (e.g., `./scripts/pm/clickup-import.sh`) | Create `.env` file |
| View workflow logs | Nothing - check Actions tab |
| Manual workflow trigger | Nothing - use GitHub UI |

## Step 1: Verify GitHub Secrets (Already Done)

Your GitHub repository already has these secrets configured in Settings → Secrets and variables → Actions:

```
CLICKUP_API_KEY
CLICKUP_WORKSPACE_ID
CLICKUP_SPACE_ID
CLICKUP_BACKLOG_FOLDER_ID
CLICKUP_SPRINT_FOLDER_ID
```

These are automatically used by the `.github/workflows/clickup-sync.yml` workflow.

## Step 2: Set Up Local Environment (Optional)

Only needed if you want to run PM scripts locally.

Create a `.env` file in the project root (this file is gitignored):

```bash
cp .env.example .env
```

Edit `.env` and ask your team lead for the values:

```bash
CLICKUP_API_KEY=pk_ask_your_team_lead
CLICKUP_WORKSPACE_ID=ask_your_team_lead
CLICKUP_SPACE_ID=ask_your_team_lead
CLICKUP_BACKLOG_FOLDER_ID=ask_your_team_lead
CLICKUP_SPRINT_FOLDER_ID=ask_your_team_lead
```

Never commit this file. It's in `.gitignore` for security.

## Step 3: Get Your Own ClickUp API Key (Optional)

Only needed for local script execution.

1. Log in to ClickUp
2. Go to Settings → Apps
3. Click "Generate" under API Token
4. Copy your API key (starts with `pk_`)
5. Add to your `.env` file

Keep this key secure - it provides full access to your ClickUp workspace.

## Step 4: Create User Stories in ClickUp

User stories must follow this naming convention:
```
US-001: Button Component
US-042: Dark Mode Support
US-123: TypeScript Improvements
```

The number must be exactly 3 digits, and it must match your branch names.

## Step 5: Test the Integration

### Test 1: Branch Creation (GitHub Actions)

Create a feature branch and push:

```bash
git checkout -b us001/test-clickup-integration
git commit --allow-empty -m "test: ClickUp integration"
git push -u origin us001/test-clickup-integration
```

Check:
1. GitHub → Actions → ClickUp Sync (should run automatically)
2. ClickUp → Find task `US-001` (should now be "In Progress")

### Test 2: Pull Request (GitHub Actions)

Create a PR to `testing`:

```bash
gh pr create --base testing --title "us001/test-clickup-integration"
```

Check:
1. GitHub Actions runs automatically
2. ClickUp task `US-001` should now be "In Review"
3. ClickUp task should have a comment with the PR link

### Test 3: Manual Status Update (GitHub Actions)

1. Go to GitHub → Actions → ClickUp Sync
2. Click "Run workflow"
3. Enter task ID (just the numbers, e.g., if the ClickUp task ID is `abc123`, enter `abc123`)
4. Select status (e.g., "In Progress")
5. Click "Run workflow"

### Test 4: Local Script Execution (Optional)

Only if you set up `.env` in Step 2:

```bash
# Test dry run
source .env
./scripts/pm/clickup-import.sh --dry-run

# Test manual status update
./scripts/pm/sync-status.sh 001 "In Progress"
```

## Step 6: Verify Workflow Responses

Check GitHub Actions:
1. Go to your repository → Actions
2. Click on "ClickUp Sync"
3. View the latest workflow run
4. Check for successful API calls

Expected output:
```
Found user story: US-001
Determined status: In Progress
Found task ID: abc123xyz
Successfully updated task to: In Progress
Added comment to task
```

## Step 7: Configure Status Mapping (Optional)

If your ClickUp statuses differ from the defaults, edit:

```bash
config/pm-status-mapping.json
```

Update the status names to match your ClickUp configuration.

## Troubleshooting

### "API Error (HTTP 401)" in GitHub Actions

The GitHub Secret `CLICKUP_API_KEY` is invalid or expired.

To fix:
1. Generate a new API key in ClickUp (Settings → Apps)
2. Update the GitHub Secret:
   - Go to Settings → Secrets and variables → Actions
   - Update `CLICKUP_API_KEY`

### "No task found for US-###"

The task doesn't exist or the name format is wrong. Check:
- Task name includes `US-###` (e.g., `US-001: Button Component`)
- The number matches your branch (e.g., `us001/feature-name`)
- The task is in the configured space

### "Invalid user story number format"

Your branch name must follow the pattern:
```
us001/description  ✓ Correct
us042/feature      ✓ Correct
US-001/feature     ✗ Wrong (lowercase 'us' required)
feature/us001      ✗ Wrong (must start with 'us')
us1/feature        ✗ Wrong (must be 3 digits)
```

### Workflow not triggering

Check:
1. The workflow file exists: `.github/workflows/clickup-sync.yml`
2. GitHub Actions is enabled for your repository
3. The branch name matches the pattern `us[0-9][0-9][0-9]/**`
4. GitHub Secrets are properly configured

### Local script fails with "CLICKUP_API_KEY is not set"

You need to create a `.env` file (see Step 2).

```bash
cp .env.example .env
# Edit .env and add credentials
source .env
./scripts/pm/sync-status.sh 001 "In Progress"
```

## Next Steps

- Read [README.MD](./README.MD) for workflow details
- See [TROUBLESHOOTING.MD](./TROUBLESHOOTING.MD) for common issues
- Review `scripts/pm/README.md` for script documentation

## Support

For issues with:
- ClickUp API: https://docs.clickup.com/en/articles/1367130-getting-started-with-the-clickup-api
- GitHub Actions: Check workflow logs in the Actions tab
- This integration: See TROUBLESHOOTING.MD
