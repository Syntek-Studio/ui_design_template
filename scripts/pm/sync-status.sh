#!/bin/bash
#
# ClickUp Status Sync Script
#
# Manually updates a user story task status in ClickUp from the command line.
# Provides a simple way to keep ClickUp in sync with development progress without
# needing to access the web interface.
#
# Usage:
#   ./scripts/pm/sync-status.sh <us-number> <status>
#
# Examples:
#   ./scripts/pm/sync-status.sh 001 "In Progress"
#   ./scripts/pm/sync-status.sh 042 "In Review"
#   ./scripts/pm/sync-status.sh 015 "Accepted"
#
# Arguments:
#   us-number  - User story number (3 digits, e.g., 001, 042)
#                Will search for task named "US-###" in ClickUp
#   status     - Target status (case-sensitive, see valid statuses below)
#
# Valid statuses:
#   - Open
#   - Pending
#   - In Progress
#   - In Review
#   - Accepted
#   - Accepted Customer
#   - Blocked
#   - Completed
#   - Closed
#   - Rejected
#   - Rejected Customer
#
# Required environment variables:
#   CLICKUP_API_KEY   - ClickUp API authentication token
#                      Generate at: https://app.clickup.com/settings/apps
#   CLICKUP_SPACE_ID  - ClickUp space ID
#                      Find in space settings or .env.dev
#
# How it works:
#   1. Validates input format (3-digit US number, valid status)
#   2. Checks required environment variables
#   3. Authenticates with ClickUp API
#   4. Searches for task matching "US-###" pattern
#   5. Updates task status via ClickUp API
#   6. Verifies update was successful
#
# Exit codes:
#   0 - Status updated successfully
#   1 - Invalid arguments, missing environment variables, or API error
#
# Troubleshooting:
#   - "CLICKUP_API_KEY is not set" → Export API key: export CLICKUP_API_KEY="..."
#   - "CLICKUP_SPACE_ID is not set" → Export space ID: export CLICKUP_SPACE_ID="..."
#   - "No task found for US-###" → Task doesn't exist in ClickUp
#   - "Failed to authenticate" → API key may be expired/invalid
#   - "Failed to update task" → Check task permissions and status validity
#

set -e

# ANSI colour codes for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No colour - resets formatting

# Validate command line arguments
# Requires exactly 2 arguments: US number and status
if [[ $# -lt 2 ]]; then
  echo -e "${RED}Error: Missing arguments${NC}"
  echo "Usage: $0 <us-number> <status>"
  echo ""
  echo "Example: $0 001 \"In Progress\""
  echo ""
  echo "Valid statuses:"
  echo "  - Open"
  echo "  - Pending"
  echo "  - In Progress"
  echo "  - In Review"
  echo "  - Accepted"
  echo "  - Accepted Customer"
  echo "  - Blocked"
  echo "  - Completed"
  echo "  - Closed"
  exit 1
fi

US_NUMBER="$1"
STATUS="$2"

# Validate US number format
# Must be exactly 3 digits (e.g., 001, 042, 999)
if [[ ! "$US_NUMBER" =~ ^[0-9]{3}$ ]]; then
  echo -e "${RED}Error: US number must be exactly 3 digits (e.g., 001)${NC}"
  exit 1
fi

# Validate status against allowed values
# Use case statement for clear list of valid statuses
case "$STATUS" in
  "Open"|"Pending"|"In Progress"|"In Review"|"Accepted"|"Accepted Customer"|"Blocked"|"Completed"|"Closed"|"Rejected"|"Rejected Customer")
    ;;
  *)
    echo -e "${RED}Error: Invalid status: $STATUS${NC}"
    echo "Valid statuses: Open, Pending, In Progress, In Review, Accepted, Accepted Customer, Blocked, Completed, Closed"
    exit 1
    ;;
esac

# Check for required environment variables
# Script cannot proceed without authentication credentials
if [[ -z "$CLICKUP_API_KEY" ]]; then
  echo -e "${RED}Error: CLICKUP_API_KEY is not set${NC}"
  exit 1
fi

if [[ -z "$CLICKUP_SPACE_ID" ]]; then
  echo -e "${RED}Error: CLICKUP_SPACE_ID is not set${NC}"
  exit 1
fi

SEARCH_TERM="US-$US_NUMBER"
echo -e "${BLUE}Searching for task: $SEARCH_TERM${NC}"

# Get user ID from ClickUp API
# Required to construct the correct API endpoint for task search
# Request includes HTTP status code for error checking
USER_RESPONSE=$(curl -s -w "\n%{http_code}" -X GET \
  'https://api.clickup.com/api/v2/user' \
  -H "Authorization: $CLICKUP_API_KEY")

USER_HTTP_CODE=$(echo "$USER_RESPONSE" | tail -n1)
USER_BODY=$(echo "$USER_RESPONSE" | sed '$d')

if [[ "$USER_HTTP_CODE" -ne 200 ]]; then
  echo -e "${RED}Error: Failed to authenticate with ClickUp (HTTP $USER_HTTP_CODE)${NC}"
  exit 1
fi

USER_ID=$(echo "$USER_BODY" | jq -r '.user.id // empty')

if [[ -z "$USER_ID" ]]; then
  echo -e "${RED}Error: Could not extract user ID${NC}"
  exit 1
fi

# Search for task in the specified space
# Includes closed tasks to find completed items
# Filters by space_ids to limit results to this project
HTTP_RESPONSE=$(curl -s -w "\n%{http_code}" -X GET \
  "https://api.clickup.com/api/v2/team/$USER_ID/task?space_ids[]=$CLICKUP_SPACE_ID&include_closed=true" \
  -H "Authorization: $CLICKUP_API_KEY" \
  -H "Content-Type: application/json")

HTTP_CODE=$(echo "$HTTP_RESPONSE" | tail -n1)
RESPONSE=$(echo "$HTTP_RESPONSE" | sed '$d')

if [[ "$HTTP_CODE" -ne 200 ]]; then
  echo -e "${RED}Error: Failed to search tasks (HTTP $HTTP_CODE)${NC}"
  exit 1
fi

# Find task with matching US number in the response
# Extracts first matching task ID from JSON response
# Returns empty if no matching task found
TASK_ID=$(echo "$RESPONSE" | jq -r --arg search "$SEARCH_TERM" '.tasks[] | select(.name | contains($search)) | .id' | head -1)

if [[ -z "$TASK_ID" || "$TASK_ID" == "null" ]]; then
  echo -e "${RED}Error: No task found for $SEARCH_TERM${NC}"
  exit 1
fi

echo -e "${GREEN}Found task ID: $TASK_ID${NC}"
echo -e "${BLUE}Updating status to: $STATUS${NC}"

# Prepare JSON payload for status update
# Uses jq to safely construct JSON without shell injection risk
PAYLOAD=$(jq -n --arg status "$STATUS" '{status: $status}')

# Update task status via ClickUp API
# Uses PUT method to modify the task
HTTP_RESPONSE=$(curl -s -w "\n%{http_code}" -X PUT \
  "https://api.clickup.com/api/v2/task/$TASK_ID" \
  -H "Authorization: $CLICKUP_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

HTTP_CODE=$(echo "$HTTP_RESPONSE" | tail -n1)
RESPONSE=$(echo "$HTTP_RESPONSE" | sed '$d')

if [[ "$HTTP_CODE" -ne 200 ]]; then
  echo -e "${RED}Error: Failed to update task (HTTP $HTTP_CODE)${NC}"
  exit 1
fi

# Verify the update was successful
# Compares returned status with requested status
UPDATED_STATUS=$(echo "$RESPONSE" | jq -r '.status.status // empty')

if [[ "$UPDATED_STATUS" == "$STATUS" ]]; then
  echo -e "${GREEN}Successfully updated $SEARCH_TERM to: $STATUS${NC}"
else
  echo -e "${YELLOW}Warning: Status may not have updated correctly${NC}"
  echo "Expected: $STATUS"
  echo "Got: $UPDATED_STATUS"
fi
