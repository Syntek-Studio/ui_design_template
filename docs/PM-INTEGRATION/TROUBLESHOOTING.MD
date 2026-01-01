# ClickUp Integration Troubleshooting

Common issues and solutions for the ClickUp integration.

## Table of Contents

- [ClickUp Integration Troubleshooting](#clickup-integration-troubleshooting)
  - [Table of Contents](#table-of-contents)
  - [GitHub Actions Issues](#github-actions-issues)
    - [Workflow doesn't run automatically](#workflow-doesnt-run-automatically)
    - ["API Error (HTTP 401)"](#api-error-http-401)
    - ["No task found for US-###"](#no-task-found-for-us-)
    - ["Invalid task ID format in final output"](#invalid-task-id-format-in-final-output)
    - [Workflow runs but task status doesn't update](#workflow-runs-but-task-status-doesnt-update)
  - [Local Script Issues](#local-script-issues)
    - ["./scripts/pm/sync-status.sh: Permission denied"](#scriptspmsync-statussh-permission-denied)
    - ["Error: CLICKUP\_API\_KEY is not set"](#error-clickup_api_key-is-not-set)
    - ["Error: US number must be exactly 3 digits"](#error-us-number-must-be-exactly-3-digits)
    - ["jq: command not found"](#jq-command-not-found)
  - [ClickUp API Issues](#clickup-api-issues)
    - [Rate Limiting](#rate-limiting)
    - ["Invalid JSON response from ClickUp API"](#invalid-json-response-from-clickup-api)
    - ["Could not extract user ID"](#could-not-extract-user-id)
  - [Branch Naming Issues](#branch-naming-issues)
    - [Branch doesn't trigger workflow](#branch-doesnt-trigger-workflow)
    - [PR to wrong branch](#pr-to-wrong-branch)
  - [Status Mapping Issues](#status-mapping-issues)
    - [Status name doesn't match ClickUp](#status-name-doesnt-match-clickup)
    - [Multiple statuses with same name](#multiple-statuses-with-same-name)
  - [Getting Help](#getting-help)
    - [Check Workflow Logs](#check-workflow-logs)
    - [Enable Debug Logging](#enable-debug-logging)
    - [Common Log Messages](#common-log-messages)
    - [Contact Support](#contact-support)

## GitHub Actions Issues

### Workflow doesn't run automatically

**Problem:** Push to `us###/*` branch doesn't trigger the workflow.

**Solutions:**

1. Check branch name matches pattern:
   ```bash
   us001/feature  ✓
   us042/bugfix   ✓
   feature/us001  ✗
   US-001/test    ✗
   ```

2. Verify workflow file exists:
   ```bash
   ls -la .github/workflows/clickup-sync.yml
   ```

3. Check GitHub Actions is enabled:
   - Go to Settings → Actions → General
   - Ensure "Allow all actions and reusable workflows" is selected

4. Check workflow syntax:
   ```bash
   # View workflow file
   cat .github/workflows/clickup-sync.yml
   ```

### "API Error (HTTP 401)"

**Problem:** Authentication failed with ClickUp API.

**Cause:** Invalid or expired API key in GitHub Secrets.

**Solution:**

1. Generate new API key in ClickUp:
   - Settings → Apps → Regenerate API Token

2. Update GitHub Secret:
   - Repository Settings → Secrets and variables → Actions
   - Edit `CLICKUP_API_KEY`
   - Paste new token

3. Retry workflow:
   - Actions → ClickUp Sync → Re-run failed jobs

### "No task found for US-###"

**Problem:** Workflow can't find the ClickUp task.

**Possible Causes:**

1. Task doesn't exist in ClickUp
2. Task name format is incorrect
3. Task is in a different space
4. Task is archived

**Solutions:**

1. Check task exists in ClickUp:
   ```
   Search for: US-001
   ```

2. Verify task name format:
   ```
   US-001: Button Component  ✓
   [US-001] Button           ✓
   Button Component US-001   ✗
   us-001: button            ✗
   ```

3. Check task is in the correct space:
   - Task must be in the space configured in GitHub Secrets
   - Check `CLICKUP_SPACE_ID` matches the task's space

4. Check task isn't archived:
   - ClickUp → Show archived tasks
   - Unarchive if needed

### "Invalid task ID format in final output"

**Problem:** Task ID validation failed.

**Cause:** ClickUp returned an unexpected task ID format.

**Solution:**

This is a security check. If you see this error:

1. Check the workflow logs for the actual task ID
2. Verify the task exists in ClickUp
3. Try running the workflow again
4. If persistent, contact your team lead

### Workflow runs but task status doesn't update

**Problem:** No errors, but ClickUp status unchanged.

**Solutions:**

1. Check the workflow completed successfully:
   - Actions → ClickUp Sync → View latest run
   - Look for green checkmarks

2. Verify status mapping:
   ```bash
   cat config/pm-status-mapping.json
   ```

3. Check ClickUp task manually:
   - The status might have updated but not appear in your view
   - Refresh the page

4. Check workflow logs for warnings:
   ```
   Status update may have failed. Expected: In Progress, Got: Open
   ```

## Local Script Issues

### "./scripts/pm/sync-status.sh: Permission denied"

**Problem:** Script not executable.

**Solution:**

```bash
chmod +x scripts/pm/*.sh
```

### "Error: CLICKUP_API_KEY is not set"

**Problem:** Environment variables not loaded.

**Solution:**

1. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Add credentials to `.env`:
   ```bash
   CLICKUP_API_KEY=pk_your_key
   # ... other variables
   ```

3. Load environment:
   ```bash
   source .env
   ```

4. Run script:
   ```bash
   ./scripts/pm/sync-status.sh 001 "In Progress"
   ```

### "Error: US number must be exactly 3 digits"

**Problem:** Invalid US number format.

**Solution:**

Use exactly 3 digits:
```bash
./scripts/pm/sync-status.sh 001 "In Progress"  ✓
./scripts/pm/sync-status.sh 1 "In Progress"    ✗
./scripts/pm/sync-status.sh 0001 "In Progress" ✗
```

### "jq: command not found"

**Problem:** `jq` JSON processor not installed.

**Solution:**

Install `jq`:

```bash
# Ubuntu/Debian
sudo apt-get install jq

# macOS
brew install jq

# Windows (WSL)
sudo apt-get install jq
```

## ClickUp API Issues

### Rate Limiting

**Problem:** "Too many requests" error.

**Cause:** ClickUp API rate limit exceeded.

**Solution:**

1. Wait 60 seconds before retrying
2. Scripts include automatic rate limiting
3. Reduce frequency of manual script runs

### "Invalid JSON response from ClickUp API"

**Problem:** ClickUp returned malformed JSON.

**Cause:** Usually a temporary API issue.

**Solution:**

1. Wait 30 seconds and retry
2. Check ClickUp status page: https://status.clickup.com/
3. If persistent, contact ClickUp support

### "Could not extract user ID"

**Problem:** Can't get user information from ClickUp.

**Cause:** API token permissions issue.

**Solution:**

1. Regenerate API token in ClickUp
2. Ensure token has full workspace access
3. Update GitHub Secret or `.env` file

## Branch Naming Issues

### Branch doesn't trigger workflow

**Problem:** Pushed to branch but workflow didn't run.

**Valid Patterns:**
```bash
us001/add-button        ✓
us042/fix-bug           ✓
us999/refactor-code     ✓
```

**Invalid Patterns:**
```bash
US-001/add-button       ✗ (must be lowercase 'us')
feature/us001           ✗ (must start with 'us')
us1/add-button          ✗ (must be 3 digits)
us0001/add-button       ✗ (must be exactly 3 digits)
add-button-us001        ✗ (must start with 'us')
```

**Solution:**

Rename your branch:
```bash
# If you haven't pushed yet
git branch -m us001/add-button

# If you've already pushed
git branch -m us001/add-button
git push origin :old-branch-name
git push -u origin us001/add-button
```

### PR to wrong branch

**Problem:** PR opened to `main` instead of `testing`.

**Branch Flow:**
```
us###/feature → testing → dev → staging → main
```

**Solution:**

1. Close the PR
2. Create new PR to correct branch:
   ```bash
   gh pr create --base testing --title "us001/feature-name"
   ```

## Status Mapping Issues

### Status name doesn't match ClickUp

**Problem:** Script uses "In Progress" but ClickUp expects "In Development".

**Solution:**

1. Check your ClickUp statuses:
   - ClickUp → Space Settings → Statuses

2. Update status mapping:
   ```bash
   # Edit config/pm-status-mapping.json
   {
     "clickup_statuses": {
       "in_progress": "In Development"  // Match your ClickUp status
     }
   }
   ```

3. Update workflow file if needed:
   ```bash
   # Edit .github/workflows/clickup-sync.yml
   # Find status validation and add your custom status
   ```

### Multiple statuses with same name

**Problem:** ClickUp has two "In Review" statuses.

**Solution:**

1. Rename one status in ClickUp to be unique
2. Update status mapping to match
3. ClickUp recommends unique status names per space

## Getting Help

### Check Workflow Logs

1. Go to Actions → ClickUp Sync
2. Click on failed workflow
3. Expand failed step
4. Look for error messages

### Enable Debug Logging

Add this to your branch:
```yaml
# .github/workflows/clickup-sync.yml
# Add after 'env:' in any step
run: |
  set -x  # Enable debug output
  # ... rest of script
```

### Common Log Messages

| Message | Meaning |
|---------|---------|
| `Found user story: US-001` | Branch name parsed successfully |
| `Found task ID: abc123` | ClickUp task located |
| `Successfully updated task to: In Progress` | Status updated |
| `Added comment to task` | PR link added to ClickUp |
| `Subtask status updates complete` | Subtasks synced |

### Contact Support

For issues not covered here:

1. Check ClickUp API docs: https://clickup.com/api/
2. Check GitHub Actions docs: https://docs.github.com/actions
3. Review the integration code: `.github/workflows/clickup-sync.yml`
4. Contact your team lead
