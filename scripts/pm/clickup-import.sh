#!/bin/bash
#
# ClickUp Import Script
# Imports user stories and sprints from markdown files to ClickUp
#
# Usage:
#   ./scripts/pm/clickup-import.sh [--dry-run] [--stories-only] [--sprints-only]
#
# Required environment variables (or GitHub Secrets):
#   CLICKUP_API_KEY           - Your ClickUp API key
#   CLICKUP_BACKLOG_FOLDER_ID - Backlog folder ID (list is auto-discovered)
#   CLICKUP_SPACE_ID          - Space ID
#   CLICKUP_SPRINT_FOLDER_ID  - Sprints folder ID
#
# SECURITY: This script has been hardened against command injection
# and credential exposure. Do not modify security controls without review.
#

# Don't use set -e as it causes issues with arithmetic operations
# set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================================================
# SECURITY: Input sanitisation functions
# ============================================================================

# Sanitise text input - removes control characters, limits length
# Usage: sanitise_text "input" [max_length]
sanitise_text() {
  local input="$1"
  local max_length="${2:-500}"

  # Remove control characters except newline/tab, limit to safe characters
  echo "$input" | tr -cd '[:alnum:][:space:][:punct:]' | tr -s ' ' | head -c "$max_length"
}

# Validate ID format - alphanumeric only
# Usage: validate_id "id_value" "id_name"
validate_id() {
  local id_value="$1"
  local id_name="$2"

  if [[ ! "$id_value" =~ ^[a-zA-Z0-9_-]+$ ]]; then
    echo -e "${RED}SECURITY: Invalid $id_name format${NC}" >&2
    return 1
  fi
  return 0
}

# Validate story ID format (US### or US-###)
# Usage: validate_story_id "US001" or "US-001"
validate_story_id() {
  local story_id="$1"

  if [[ ! "$story_id" =~ ^US-?[0-9]{3}$ ]]; then
    echo -e "${RED}SECURITY: Invalid story ID format: $story_id${NC}" >&2
    return 1
  fi
  return 0
}

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"

# Directories - using new individual file structure
STORIES_DIR="$PROJECT_DIR/docs/STORIES"
SPRINTS_DIR="$PROJECT_DIR/docs/SPRINTS"

# Parse arguments
DRY_RUN=false
STORIES_ONLY=false
SPRINTS_ONLY=false

for arg in "$@"; do
  case $arg in
    --dry-run)
      DRY_RUN=true
      echo -e "${YELLOW}DRY RUN MODE - No changes will be made to ClickUp${NC}"
      ;;
    --stories-only)
      STORIES_ONLY=true
      ;;
    --sprints-only)
      SPRINTS_ONLY=true
      ;;
  esac
done

# Check required environment variables
check_env() {
  local missing=false
  for var in CLICKUP_API_KEY CLICKUP_BACKLOG_FOLDER_ID CLICKUP_SPACE_ID CLICKUP_SPRINT_FOLDER_ID; do
    if [[ -z "${!var}" ]]; then
      echo -e "${RED}Error: $var is not set${NC}"
      missing=true
    fi
  done
  if $missing; then
    echo ""
    echo "Please set the required environment variables:"
    echo "  export CLICKUP_API_KEY='your-api-key'"
    echo "  export CLICKUP_BACKLOG_FOLDER_ID='your-backlog-folder-id'"
    echo "  export CLICKUP_SPACE_ID='your-space-id'"
    echo "  export CLICKUP_SPRINT_FOLDER_ID='your-sprint-folder-id'"
    exit 1
  fi

  # SECURITY: Validate ID formats
  if ! validate_id "$CLICKUP_BACKLOG_FOLDER_ID" "CLICKUP_BACKLOG_FOLDER_ID"; then
    exit 1
  fi
  if ! validate_id "$CLICKUP_SPACE_ID" "CLICKUP_SPACE_ID"; then
    exit 1
  fi
  if ! validate_id "$CLICKUP_SPRINT_FOLDER_ID" "CLICKUP_SPRINT_FOLDER_ID"; then
    exit 1
  fi
}

# Get the first list ID from a folder
get_list_from_folder() {
  local folder_id="$1"

  # SECURITY: Validate folder_id format
  if ! validate_id "$folder_id" "folder_id"; then
    return 1
  fi

  local response=$(curl -s -X GET \
    "https://api.clickup.com/api/v2/folder/$folder_id/list" \
    -H "Authorization: $CLICKUP_API_KEY")

  local list_id=$(echo "$response" | jq -r '.lists[0].id // empty')

  if [[ -n "$list_id" && "$list_id" != "null" ]]; then
    echo "$list_id"
  else
    echo ""
    return 1
  fi
}

# API helper function with security hardening
clickup_api() {
  local method="$1"
  local endpoint="$2"
  local data="$3"

  # SECURITY: Validate method is allowed
  case "$method" in
    GET|POST|PUT|DELETE)
      ;;
    *)
      echo -e "${RED}SECURITY: Invalid HTTP method: $method${NC}" >&2
      return 1
      ;;
  esac

  # SECURITY: Validate endpoint starts with /
  if [[ ! "$endpoint" =~ ^/ ]]; then
    echo -e "${RED}SECURITY: Invalid endpoint format${NC}" >&2
    return 1
  fi

  # SECURITY: Rate limiting - add small delay between requests
  sleep 0.1

  local response
  local http_code

  if [[ -n "$data" ]]; then
    response=$(curl -s -w "\n%{http_code}" -X "$method" \
      "https://api.clickup.com/api/v2$endpoint" \
      -H "Authorization: $CLICKUP_API_KEY" \
      -H "Content-Type: application/json" \
      -d "$data")
  else
    response=$(curl -s -w "\n%{http_code}" -X "$method" \
      "https://api.clickup.com/api/v2$endpoint" \
      -H "Authorization: $CLICKUP_API_KEY" \
      -H "Content-Type: application/json")
  fi

  http_code=$(echo "$response" | tail -n1)
  local body=$(echo "$response" | sed '$d')

  # SECURITY: Check for API errors without exposing sensitive data
  if [[ "$http_code" -ge 400 ]]; then
    echo -e "${RED}API Error (HTTP $http_code)${NC}" >&2
    # Only output error message, not full response which may contain sensitive data
    echo "$body" | jq -r '.err // .error // "Unknown error"' 2>/dev/null || echo "Request failed"
    return 1
  fi

  echo "$body"
}

# Custom Field IDs
MOSCOW_FIELD_ID="77b5208c-bf08-45dd-b6a5-4dc1ac2ac113"
STORY_POINTS_FIELD_ID="77c09337-0717-4aeb-a202-aa3ae862b3c0"

# Map MoSCoW priority to ClickUp priority and custom field option ID
# Must Have = 1 (Urgent), Should Have = 2 (High), Could Have = 3 (Normal), Won't Have = 4 (Low)
get_clickup_priority() {
  local moscow="$1"
  case "$moscow" in
    "Must Have"|"Critical"|"Urgent") echo 1 ;;
    "Should Have"|"High") echo 2 ;;
    "Could Have"|"Medium"|"Normal") echo 3 ;;
    "Won't Have"|"Low") echo 4 ;;
    *) echo 3 ;;  # Default to Normal
  esac
}

# Get MoSCoW custom field option ID
get_moscow_option_id() {
  local moscow="$1"
  case "$moscow" in
    "Must Have") echo "ba53d333-c94f-4d85-96b7-dea0983d3ee7" ;;
    "Should Have") echo "78264206-e10e-4945-b263-afe6029d6313" ;;
    "Could Have") echo "69790587-6245-4415-a1ad-b04ad9c113ff" ;;
    "Won't Have") echo "5ae4f17e-547b-4f10-8f1b-e64b002cacb2" ;;
    *) echo "69790587-6245-4415-a1ad-b04ad9c113ff" ;;  # Default to Could Have
  esac
}

# Get Story Points custom field option ID
get_story_points_option_id() {
  local points="$1"
  case "$points" in
    "1") echo "5fd7e1cd-ea54-482e-9ecc-028e48276d23" ;;
    "2") echo "0611d383-74f8-4518-93fe-59294b47404e" ;;
    "3") echo "eb221ac2-a513-4952-a3fe-04267138f944" ;;
    "5") echo "29f11762-e1bb-4451-b156-3942e73a7d73" ;;
    "8") echo "cb97e79a-c0ee-49c5-8b36-59b689e4f2ee" ;;
    "13") echo "0cfc581d-be80-43e7-963c-a3c04f69cc36" ;;
    "21") echo "1ce78644-498d-4fc8-ba88-c2bca1b16f2a" ;;
    *) echo "29f11762-e1bb-4451-b156-3942e73a7d73" ;;  # Default to 5
  esac
}

# Create a task in ClickUp and return the task ID
create_task() {
  local list_id="$1"
  local name="$2"
  local description="$3"
  local priority="$4"
  local points="$5"
  local status="$6"

  # SECURITY: Validate list_id format
  if ! validate_id "$list_id" "list_id"; then
    return 1
  fi

  # SECURITY: Sanitise name (description can be longer for markdown)
  name=$(sanitise_text "$name" 200)

  # Get ClickUp priority number
  local cu_priority=$(get_clickup_priority "$priority")

  # Get custom field option IDs
  local moscow_option_id=$(get_moscow_option_id "$priority")
  local points_option_id=$(get_story_points_option_id "$points")

  # SECURITY: Validate status is allowed
  case "$status" in
    Open|Pending|"In Progress"|"In Review"|Completed|Closed|"To Do")
      # Map "To Do" to "Open"
      if [[ "$status" == "To Do" ]]; then
        status="Open"
      fi
      ;;
    *)
      status="Open"
      ;;
  esac

  # SECURITY: Use jq to safely construct JSON payload (prevents injection)
  # Include custom fields for MoSCoW and Story Points
  local payload=$(jq -n \
    --arg name "$name" \
    --arg desc "$description" \
    --argjson priority "$cu_priority" \
    --arg status "$status" \
    --arg moscow_field_id "$MOSCOW_FIELD_ID" \
    --arg moscow_option_id "$moscow_option_id" \
    --arg points_field_id "$STORY_POINTS_FIELD_ID" \
    --arg points_option_id "$points_option_id" \
    '{
      name: $name,
      markdown_description: $desc,
      priority: $priority,
      status: $status,
      custom_fields: [
        {
          id: $moscow_field_id,
          value: $moscow_option_id
        },
        {
          id: $points_field_id,
          value: $points_option_id
        }
      ]
    }')

  if $DRY_RUN; then
    echo -e "${BLUE}[DRY RUN] Would create task: $name${NC}"
    echo "  Priority: $priority ($cu_priority), Status: $status, Points: $points"
    echo ""
    return 0
  fi

  local response=$(clickup_api "POST" "/list/$list_id/task" "$payload")
  local task_id=$(echo "$response" | jq -r '.id // empty')

  # SECURITY: Validate returned task ID
  if [[ -n "$task_id" && "$task_id" != "null" ]]; then
    if validate_id "$task_id" "task_id" 2>/dev/null; then
      echo -e "${GREEN}✓ Created: $name (ID: $task_id)${NC}"
      echo "  Priority: $priority, Points: $points"
      # Output task ID for subtask creation
      echo "$task_id"
    else
      echo -e "${RED}✗ Invalid task ID returned${NC}"
      return 1
    fi
  else
    echo -e "${RED}✗ Failed to create: $name${NC}"
    echo "$response" | jq -r '.err // empty' 2>/dev/null
    return 1
  fi
}

# Create a subtask (checklist item) for a task
create_subtask() {
  local task_id="$1"
  local subtask_name="$2"

  # SECURITY: Validate task_id format
  if ! validate_id "$task_id" "task_id"; then
    return 1
  fi

  # SECURITY: Sanitise subtask name
  subtask_name=$(sanitise_text "$subtask_name" 500)

  if $DRY_RUN; then
    echo -e "    ${BLUE}[DRY RUN] Would create subtask: $subtask_name${NC}"
    return 0
  fi

  # Create as a subtask (child task)
  local payload=$(jq -n \
    --arg name "$subtask_name" \
    --arg parent "$task_id" \
    '{
      name: $name,
      parent: $parent
    }')

  local response=$(clickup_api "POST" "/list/$BACKLOG_LIST_ID/task" "$payload")
  local subtask_id=$(echo "$response" | jq -r '.id // empty')

  if [[ -n "$subtask_id" && "$subtask_id" != "null" ]]; then
    echo -e "    ${GREEN}✓ Subtask: $subtask_name${NC}"
  else
    echo -e "    ${YELLOW}⚠ Could not create subtask: $subtask_name${NC}"
  fi
}

# Create a list (for sprints) in ClickUp
create_list() {
  local folder_id="$1"
  local name="$2"

  # SECURITY: Validate folder_id format
  if ! validate_id "$folder_id" "folder_id"; then
    return 1
  fi

  # SECURITY: Sanitise name
  name=$(sanitise_text "$name" 100)

  # SECURITY: Use jq to safely construct JSON payload
  local payload=$(jq -n --arg name "$name" '{name: $name}')

  if $DRY_RUN; then
    echo -e "${BLUE}[DRY RUN] Would create list: $name${NC}"
    echo "0"  # Return fake ID
    return 0
  fi

  local response=$(clickup_api "POST" "/folder/$folder_id/list" "$payload")
  local list_id=$(echo "$response" | jq -r '.id // empty')

  # SECURITY: Validate returned list ID
  if [[ -n "$list_id" && "$list_id" != "null" ]]; then
    if validate_id "$list_id" "list_id" 2>/dev/null; then
      echo -e "${GREEN}✓ Created list: $name (ID: $list_id)${NC}"
      echo "$list_id"
    else
      echo -e "${RED}✗ Invalid list ID returned${NC}"
      echo ""
      return 1
    fi
  else
    echo -e "${RED}✗ Failed to create list: $name${NC}"
    echo ""
    return 1
  fi
}

# Parse user stories from individual files
parse_user_stories() {
  echo -e "\n${BLUE}=== Parsing User Stories ===${NC}\n"

  if [[ ! -d "$STORIES_DIR" ]]; then
    echo -e "${RED}Error: Stories directory not found: $STORIES_DIR${NC}"
    return 1
  fi

  local story_count=0

  # Process each US*.md file in order (supports both US001 and US-001 formats)
  for story_file in "$STORIES_DIR"/US[0-9][0-9][0-9]*.md "$STORIES_DIR"/US-[0-9][0-9][0-9]*.md; do
    if [[ ! -f "$story_file" ]]; then
      continue
    fi

    local filename=$(basename "$story_file")
    local story_id=""
    local story_title=""
    local story_priority="Medium"
    local story_points="5"
    local story_status="Open"
    local tasks=()
    local in_tasks_section=false

    # Read the full file content for the description (excluding Tasks section)
    local full_description=""
    local current_section=""

    # Parse the story file
    while IFS= read -r line; do
      # Get story ID and title from first H1 (e.g., "# US001: Title" or "# US-001: Title")
      if [[ "$line" =~ ^#[[:space:]]+(US-?[0-9]{3}):[[:space:]]+(.+)$ && -z "$story_id" ]]; then
        story_id="${BASH_REMATCH[1]}"
        story_title="${BASH_REMATCH[2]}"
      fi

      # Track current section
      if [[ "$line" =~ ^##[[:space:]]+(.+)$ ]]; then
        current_section="${BASH_REMATCH[1]}"
        if [[ "$current_section" == "Tasks" ]]; then
          in_tasks_section=true
        else
          in_tasks_section=false
        fi
      fi

      # Parse metadata from header
      if [[ "$line" =~ ^\*\*Priority:\*\*[[:space:]]+(.+)$ ]]; then
        story_priority="${BASH_REMATCH[1]}"
      fi

      if [[ "$line" =~ ^\*\*(Story[[:space:]]Points|Estimate):\*\*[[:space:]]+([0-9]+) ]]; then
        local points_match="${BASH_REMATCH[2]}"
        if [[ "$points_match" =~ ^[0-9]+$ ]]; then
          story_points="$points_match"
        fi
      fi

      if [[ "$line" =~ ^\*\*Status:\*\*[[:space:]]+(.+)$ ]]; then
        story_status="${BASH_REMATCH[1]}"
      fi

      # Collect tasks (lines starting with - [ ])
      if $in_tasks_section && [[ "$line" =~ ^-[[:space:]]\[[[:space:]x]\][[:space:]]+(.+)$ ]]; then
        tasks+=("${BASH_REMATCH[1]}")
      fi

      # Build full description (exclude Tasks section and metadata, include rest)
      if [[ ! "$line" =~ ^\*\*(Status|Priority|Story[[:space:]]Points|Sprint|Estimate):\*\* ]] && \
         [[ "$current_section" != "Tasks" ]] && \
         [[ ! "$line" =~ ^#[[:space:]]+(US-?[0-9]{3}): ]] && \
         [[ ! "$line" =~ ^---$ ]] && \
         [[ ! "$line" =~ ^\*\*Last[[:space:]]Updated ]]; then
        full_description+="$line"$'\n'
      fi

    done < "$story_file"

    # SECURITY: Validate story_id before processing
    if [[ -n "$story_id" && -n "$story_title" ]]; then
      if validate_story_id "$story_id"; then
        echo -e "\n${YELLOW}Processing: $story_id: $story_title${NC}"

        # Create the main task and capture the task ID
        local task_output=$(create_task "$BACKLOG_LIST_ID" "$story_id: $story_title" "$full_description" "$story_priority" "$story_points" "$story_status")
        echo "$task_output" | grep -v '^[a-z0-9]*$'  # Print output except raw task ID

        # Extract task ID from output (last line that looks like an ID)
        local task_id=$(echo "$task_output" | grep -E '^[a-z0-9]+$' | tail -1)

        # Create subtasks for each task item
        if [[ -n "$task_id" && ${#tasks[@]} -gt 0 ]]; then
          echo "  Creating ${#tasks[@]} subtasks..."
          for task_item in "${tasks[@]}"; do
            create_subtask "$task_id" "$task_item"
          done
        fi

        story_count=$((story_count + 1))
      else
        echo -e "${YELLOW}Skipping invalid story ID: $story_id${NC}"
      fi
    fi
  done

  echo -e "\n${GREEN}Processed $story_count user stories${NC}"
}

# Parse sprints and create lists
parse_sprints() {
  echo -e "\n${BLUE}=== Parsing Sprints ===${NC}\n"

  if [[ ! -d "$SPRINTS_DIR" ]]; then
    echo -e "${RED}Error: Sprints directory not found: $SPRINTS_DIR${NC}"
    return 1
  fi

  local sprint_count=0

  for sprint_file in "$SPRINTS_DIR"/SPRINT-[0-9][0-9].md; do
    if [[ ! -f "$sprint_file" ]]; then
      continue
    fi

    local filename=$(basename "$sprint_file")
    local sprint_title=""

    # Parse sprint file
    while IFS= read -r line; do
      # Get sprint title from first H1
      if [[ "$line" =~ ^#[[:space:]]+(.+)$ && -z "$sprint_title" ]]; then
        sprint_title="${BASH_REMATCH[1]}"
      fi
    done < "$sprint_file"

    if [[ -n "$sprint_title" ]]; then
      echo -e "\n${YELLOW}Processing: $sprint_title${NC}"

      # Create the sprint list
      list_id=$(create_list "$CLICKUP_SPRINT_FOLDER_ID" "$sprint_title" 2>&1 | tail -1)

      if [[ -n "$list_id" && "$list_id" != "0" ]]; then
        # Find story references in the sprint
        while IFS= read -r line; do
          # Find story references (e.g., "[US-001]" or "| US-001 |")
          if [[ "$line" =~ \[?(US-[0-9]{3})\]? ]]; then
            echo "  - Found reference to ${BASH_REMATCH[1]}"
          fi
        done < "$sprint_file"
      fi

      sprint_count=$((sprint_count + 1))
    fi
  done

  echo -e "\n${GREEN}Processed $sprint_count sprints${NC}"
}

# Main execution
main() {
  echo -e "${BLUE}"
  echo "╔═══════════════════════════════════════════╗"
  echo "║     ClickUp Import Script                 ║"
  echo "║     Lenovo Portal                         ║"
  echo "╚═══════════════════════════════════════════╝"
  echo -e "${NC}"

  check_env

  echo -e "${GREEN}✓ Environment variables verified${NC}"
  echo ""

  # Get backlog list ID from folder, or create one if it doesn't exist
  echo -e "${BLUE}Fetching backlog list ID...${NC}"
  BACKLOG_LIST_ID=$(get_list_from_folder "$CLICKUP_BACKLOG_FOLDER_ID")
  if [[ -z "$BACKLOG_LIST_ID" ]]; then
    echo -e "${YELLOW}No list found in backlog folder, creating one...${NC}"
    BACKLOG_LIST_ID=$(create_list "$CLICKUP_BACKLOG_FOLDER_ID" "Backlog" 2>&1 | tail -1)
    if [[ -z "$BACKLOG_LIST_ID" || "$BACKLOG_LIST_ID" == "0" ]]; then
      echo -e "${RED}Error: Could not create backlog list${NC}"
      exit 1
    fi
  fi
  echo -e "${GREEN}✓ Using backlog list ID: $BACKLOG_LIST_ID${NC}"
  echo ""

  if ! $SPRINTS_ONLY; then
    parse_user_stories
  fi

  if ! $STORIES_ONLY; then
    parse_sprints
  fi

  echo -e "\n${GREEN}=== Import Complete ===${NC}\n"

  if $DRY_RUN; then
    echo -e "${YELLOW}This was a dry run. No changes were made to ClickUp.${NC}"
    echo "Run without --dry-run to actually import the data."
  fi
}

main "$@"
