#!/bin/bash
#
# ClickUp Sync IDs Script
# Pulls task IDs from ClickUp and updates local markdown files
#
# Usage:
#   ./scripts/pm/clickup-sync-ids.sh [--dry-run]
#
# Required environment variables (or GitHub Secrets):
#   CLICKUP_API_KEY           - Your ClickUp API key
#   CLICKUP_BACKLOG_LIST_ID   - Backlog list ID
#   CLICKUP_SPRINT_FOLDER_ID  - Sprints folder ID
#
# SECURITY: This script has been hardened against command injection
# and credential exposure. Do not modify security controls without review.
#

set -e

# Colours for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Colour

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"

# Load environment variables from .env.dev if it exists
if [[ -f "$PROJECT_DIR/.env.dev" ]]; then
  set -a
  # shellcheck source=/dev/null
  source "$PROJECT_DIR/.env.dev"
  set +a
fi

# Directories
STORIES_DIR="$PROJECT_DIR/docs/STORIES"
SPRINTS_DIR="$PROJECT_DIR/docs/SPRINTS"

# Parse arguments
DRY_RUN=false
for arg in "$@"; do
  case $arg in
    --dry-run)
      DRY_RUN=true
      echo -e "${YELLOW}DRY RUN MODE - No files will be modified${NC}"
      ;;
  esac
done

# ============================================================================
# SECURITY: Input validation functions
# ============================================================================

validate_id() {
  local id_value="$1"
  local id_name="$2"

  if [[ ! "$id_value" =~ ^[a-zA-Z0-9_-]+$ ]]; then
    echo -e "${RED}SECURITY: Invalid $id_name format${NC}" >&2
    return 1
  fi
  return 0
}

# Check required environment variables
check_env() {
  local missing=false
  for var in CLICKUP_API_KEY CLICKUP_BACKLOG_LIST_ID CLICKUP_SPRINT_FOLDER_ID; do
    if [[ -z "${!var}" ]]; then
      echo -e "${RED}Error: $var is not set${NC}"
      missing=true
    fi
  done
  if $missing; then
    echo ""
    echo "Please set the required environment variables or source your .env.dev file:"
    echo "  source .env.dev"
    exit 1
  fi

  # SECURITY: Validate ID formats
  if ! validate_id "$CLICKUP_BACKLOG_LIST_ID" "CLICKUP_BACKLOG_LIST_ID"; then
    exit 1
  fi
  if ! validate_id "$CLICKUP_SPRINT_FOLDER_ID" "CLICKUP_SPRINT_FOLDER_ID"; then
    exit 1
  fi
}

# Fetch all tasks from the backlog list (with pagination)
fetch_backlog_tasks() {
  echo -e "${BLUE}Fetching tasks from ClickUp backlog...${NC}" >&2

  local all_tasks='{"tasks":[]}'
  local page=0
  local has_more=true

  while $has_more; do
    local body
    body=$(curl -s -X GET \
      "https://api.clickup.com/api/v2/list/$CLICKUP_BACKLOG_LIST_ID/task?include_closed=true&subtasks=true&page=$page" \
      -H "Authorization: $CLICKUP_API_KEY" \
      -H "Content-Type: application/json")

    # SECURITY: Validate response is valid JSON
    if ! echo "$body" | jq -e . >/dev/null 2>&1; then
      echo -e "${RED}Invalid JSON response from ClickUp API${NC}" >&2
      echo -e "${RED}Response: ${body:0:200}${NC}" >&2
      return 1
    fi

    # Check for API error
    local err
    err=$(echo "$body" | jq -r '.err // empty')
    if [[ -n "$err" ]]; then
      echo -e "${RED}ClickUp API error: $err${NC}" >&2
      return 1
    fi

    # Get task count on this page
    local task_count
    task_count=$(echo "$body" | jq '.tasks | length')

    if [[ "$task_count" -eq 0 ]]; then
      has_more=false
    else
      # Merge tasks into all_tasks
      all_tasks=$(echo "$all_tasks" "$body" | jq -s '.[0].tasks += .[1].tasks | .[0]')
      page=$((page + 1))
      echo -e "${BLUE}  Fetched page $page ($task_count tasks)...${NC}" >&2
    fi
  done

  echo "$all_tasks"
}

# Fetch all lists from the sprints folder
fetch_sprint_lists() {
  echo -e "${BLUE}Fetching sprint lists from ClickUp...${NC}" >&2

  local body
  body=$(curl -s -X GET \
    "https://api.clickup.com/api/v2/folder/$CLICKUP_SPRINT_FOLDER_ID/list" \
    -H "Authorization: $CLICKUP_API_KEY" \
    -H "Content-Type: application/json")

  # SECURITY: Validate response is valid JSON
  if ! echo "$body" | jq -e . >/dev/null 2>&1; then
    echo -e "${RED}Invalid JSON response from ClickUp API${NC}" >&2
    echo -e "${RED}Response: ${body:0:200}${NC}" >&2
    return 1
  fi

  # Check for API error
  local err
  err=$(echo "$body" | jq -r '.err // empty')
  if [[ -n "$err" ]]; then
    echo -e "${RED}ClickUp API error: $err${NC}" >&2
    return 1
  fi

  echo "$body"
}

# Update a story markdown file with ClickUp task ID
update_story_file() {
  local story_file="$1"
  local task_id="$2"
  local task_url="$3"

  if $DRY_RUN; then
    echo -e "  ${BLUE}[DRY RUN] Would add ClickUp ID: $task_id${NC}"
    return 0
  fi

  # Check if ClickUp ID already exists in the file
  if grep -q "^\*\*ClickUp ID:\*\*" "$story_file"; then
    # Update existing ClickUp ID
    sed -i "s|^\*\*ClickUp ID:\*\*.*|\*\*ClickUp ID:\*\* [$task_id](https://app.clickup.com/t/$task_id)|" "$story_file"
    echo -e "  ${GREEN}Updated ClickUp ID: $task_id${NC}"
  else
    # Insert ClickUp ID after the Status line
    sed -i "/^\*\*Status:\*\*/a **ClickUp ID:** [$task_id](https://app.clickup.com/t/$task_id)" "$story_file"
    echo -e "  ${GREEN}Added ClickUp ID: $task_id${NC}"
  fi
}

# Update a sprint markdown file with ClickUp list ID
update_sprint_file() {
  local sprint_file="$1"
  local list_id="$2"
  local list_url="$3"

  if $DRY_RUN; then
    echo -e "  ${BLUE}[DRY RUN] Would add ClickUp List ID: $list_id${NC}"
    return 0
  fi

  # Check if ClickUp List ID already exists in the file
  if grep -q "^\*\*ClickUp List ID:\*\*" "$sprint_file"; then
    # Update existing ClickUp List ID
    sed -i "s|^\*\*ClickUp List ID:\*\*.*|\*\*ClickUp List ID:\*\* [$list_id]($list_url)|" "$sprint_file"
    echo -e "  ${GREEN}Updated ClickUp List ID: $list_id${NC}"
  else
    # Insert ClickUp List ID after the Sprint Goal line
    sed -i "/^\*\*Sprint Goal:\*\*/a **ClickUp List ID:** [$list_id]($list_url)" "$sprint_file"
    echo -e "  ${GREEN}Added ClickUp List ID: $list_id${NC}"
  fi
}

# Sync story files with ClickUp task IDs
sync_stories() {
  echo -e "\n${BLUE}=== Syncing User Stories ===${NC}\n"

  local tasks_json
  tasks_json=$(fetch_backlog_tasks)
  if [[ $? -ne 0 ]]; then
    return 1
  fi

  local task_count
  task_count=$(echo "$tasks_json" | jq '.tasks | length')
  echo -e "${GREEN}Found $task_count tasks in ClickUp${NC}\n"

  local synced_count=0

  # Process each story file
  for story_file in "$STORIES_DIR"/US[0-9][0-9][0-9]*.md "$STORIES_DIR"/US-[0-9][0-9][0-9]*.md; do
    if [[ ! -f "$story_file" ]]; then
      continue
    fi

    local filename
    filename=$(basename "$story_file")

    # Extract story ID from filename (e.g., US001-TEMPLATE-INIT-CLI.md -> US001)
    local story_id=""
    if [[ "$filename" =~ ^(US-?[0-9]{3}) ]]; then
      story_id="${BASH_REMATCH[1]}"
    fi

    if [[ -z "$story_id" ]]; then
      continue
    fi

    # Normalise to US-### format for searching
    local search_id
    search_id=$(echo "$story_id" | sed 's/^US/US-/' | sed 's/^US--/US-/')

    echo -e "${YELLOW}Processing: $story_id${NC}"

    # Search for matching task in ClickUp (search for both US001 and US-001 formats)
    local task_id
    task_id=$(echo "$tasks_json" | jq -r --arg sid "$story_id" --arg sid2 "$search_id" \
      '.tasks[] | select(.name | (contains($sid) or contains($sid2))) | .id' | head -1)

    if [[ -n "$task_id" && "$task_id" != "null" ]]; then
      update_story_file "$story_file" "$task_id"
      synced_count=$((synced_count + 1))
    else
      echo -e "  ${YELLOW}No matching task found in ClickUp${NC}"
    fi
  done

  echo -e "\n${GREEN}Synced $synced_count stories${NC}"
}

# Sync sprint files with ClickUp list IDs
sync_sprints() {
  echo -e "\n${BLUE}=== Syncing Sprints ===${NC}\n"

  local lists_json
  lists_json=$(fetch_sprint_lists)
  if [[ $? -ne 0 ]]; then
    return 1
  fi

  local list_count
  list_count=$(echo "$lists_json" | jq '.lists | length')
  echo -e "${GREEN}Found $list_count sprint lists in ClickUp${NC}\n"

  local synced_count=0

  # Process each sprint file
  for sprint_file in "$SPRINTS_DIR"/SPRINT-[0-9][0-9].md; do
    if [[ ! -f "$sprint_file" ]]; then
      continue
    fi

    local filename
    filename=$(basename "$sprint_file")

    # Extract sprint number from filename (e.g., SPRINT-01.md -> 01)
    local sprint_num=""
    if [[ "$filename" =~ SPRINT-([0-9]+)\.md ]]; then
      sprint_num="${BASH_REMATCH[1]}"
    fi

    if [[ -z "$sprint_num" ]]; then
      continue
    fi

    # Remove leading zeros for display
    local sprint_display
    sprint_display="${sprint_num#"${sprint_num%%[!0]*}"}"
    [[ -z "$sprint_display" ]] && sprint_display="0"

    echo -e "${YELLOW}Processing: Sprint $sprint_num${NC}"

    # Search for matching list in ClickUp (search for "Sprint 01" or "Sprint 1" patterns)
    local list_id
    local list_url
    list_id=$(echo "$lists_json" | jq -r --arg snum "$sprint_num" --arg sdisp "$sprint_display" \
      '.lists[] | select(.name | (contains("Sprint " + $snum) or contains("Sprint " + $sdisp) or test("Sprint\\s*0?" + $sdisp + "\\b"; "i"))) | .id' | head -1)

    if [[ -n "$list_id" && "$list_id" != "null" ]]; then
      list_url="https://app.clickup.com/90151635198/v/l/li/$list_id"
      update_sprint_file "$sprint_file" "$list_id" "$list_url"
      synced_count=$((synced_count + 1))
    else
      echo -e "  ${YELLOW}No matching sprint list found in ClickUp${NC}"
    fi
  done

  echo -e "\n${GREEN}Synced $synced_count sprints${NC}"
}

# Main execution
main() {
  echo -e "${BLUE}"
  echo "╔═══════════════════════════════════════════╗"
  echo "║     ClickUp ID Sync Script                ║"
  echo "║     Pull IDs to Markdown Files            ║"
  echo "╚═══════════════════════════════════════════╝"
  echo -e "${NC}"

  check_env

  echo -e "${GREEN}✓ Environment variables verified${NC}"

  sync_stories
  sync_sprints

  echo -e "\n${GREEN}=== Sync Complete ===${NC}\n"

  if $DRY_RUN; then
    echo -e "${YELLOW}This was a dry run. No files were modified.${NC}"
    echo "Run without --dry-run to update the markdown files."
  fi
}

main "$@"
