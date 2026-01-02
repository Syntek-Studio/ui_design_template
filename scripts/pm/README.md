# PM Integration Scripts

This directory contains scripts for integrating with ClickUp project management.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Available Scripts](#available-scripts)
  - [clickup-import.sh](#clickup-importsh)
  - [sync-status.sh](#sync-statussh)
- [File Structure Requirements](#file-structure-requirements)
  - [User Stories](#user-stories)
  - [Sprints](#sprints)
- [Security Notes](#security-notes)
- [Troubleshooting](#troubleshooting)
  - ["API Error (HTTP 401)"](#api-error-http-401)
  - ["No task found for US-###"](#no-task-found-for-us-)
  - ["Invalid story ID format"](#invalid-story-id-format)

## Available Scripts

### clickup-import.sh

Imports user stories and sprints from markdown files to ClickUp.

```bash
./scripts/pm/clickup-import.sh [--dry-run] [--stories-only] [--sprints-only]
```

**Options:**

- `--dry-run` - Preview changes without making API calls

- `--stories-only` - Only import user stories, skip sprints

- `--sprints-only` - Only import sprints, skip user stories

**Required Environment Variables:**

```bash
export CLICKUP_API_KEY="pk_your_key_here"
export CLICKUP_SPACE_ID="your_space_id"
export CLICKUP_BACKLOG_FOLDER_ID="your_backlog_folder_id"
export CLICKUP_SPRINT_FOLDER_ID="your_sprint_folder_id"
export CLICKUP_WORKSPACE_ID="your_workspace_id"
```

Ask the lead Dev for the above variables.

### sync-status.sh

Updates ClickUp task status based on git branch activity.

```bash
./scripts/pm/sync-status.sh <us-number> <status>
```

**Example:**

```bash
./scripts/pm/sync-status.sh 001 "In Progress"
```

**Supported Statuses:**

- Open

- Pending

- In Progress

- In Review

- Accepted

- Accepted Customer

- Blocked

- Completed

- Closed

## File Structure Requirements

### User Stories

User stories should be in `docs/STORIES/` with the format:

```text
docs/STORIES/US-001-story-title.md
```

Each story file should follow this structure:

```markdown
# US-001: Story Title

**As a** developer
**I want** to create reusable components
**So that** we can maintain consistency

**Status:** Open
**Estimate:** 5
```

### Sprints

Sprints should be in `docs/SPRINTS/` with the format:

```text
docs/SPRINTS/SPRINT-01.md
```

## Security Notes

All scripts include:

- Input validation and sanitisation

- API token protection (never logged)

- Rate limiting

- HTTP error handling

- JSON injection prevention

## Troubleshooting

### "API Error (HTTP 401)"

Your ClickUp API key is invalid or expired. Generate a new one at:
<https://app.clickup.com/settings/apps>

### "No task found for US-###"

The task doesn't exist in ClickUp yet. Run the import script first:

```bash
./scripts/pm/clickup-import.sh --dry-run
```

### "Invalid story ID format"

User story files must be named `US-###-description.md` with exactly 3 digits.
