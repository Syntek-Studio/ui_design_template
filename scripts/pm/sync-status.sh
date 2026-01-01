#!/bin/bash
#
# ClickUp Status Sync Script
# Manually update a ClickUp task status from the command line
#
# Usage:
#   ./scripts/pm/sync-status.sh <us-number> <status>
#
# Example:
#   ./scripts/pm/sync-status.sh 001 "In Progress"
#
# Required environment variables:
#   CLICKUP_API_KEY   - Your ClickUp API token
#   CLICKUP_SPACE_ID  - Space ID
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Validate inputs
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
if [[ ! "$US_NUMBER" =~ ^[0-9]{3}$ ]]; then
  echo -e "${RED}Error: US number must be exactly 3 digits (e.g., 001)${NC}"
  exit 1
fi

# Validate status
case "$STATUS" in
  "Open"|"Pending"|"In Progress"|"In Review"|"Accepted"|"Accepted Customer"|"Blocked"|"Completed"|"Closed"|"Rejected"|"Rejected Customer")
    ;;
  *)
    echo -e "${RED}Error: Invalid status: $STATUS${NC}"
    echo "Valid statuses: Open, Pending, In Progress, In Review, Accepted, Accepted Customer, Blocked, Completed, Closed"
    exit 1
    ;;
esac

# Check environment variables
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

# Get user ID
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

# Search for task in space
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

# Find task with matching US number
TASK_ID=$(echo "$RESPONSE" | jq -r --arg search "$SEARCH_TERM" '.tasks[] | select(.name | contains($search)) | .id' | head -1)

if [[ -z "$TASK_ID" || "$TASK_ID" == "null" ]]; then
  echo -e "${RED}Error: No task found for $SEARCH_TERM${NC}"
  exit 1
fi

echo -e "${GREEN}Found task ID: $TASK_ID${NC}"
echo -e "${BLUE}Updating status to: $STATUS${NC}"

# Update task status
PAYLOAD=$(jq -n --arg status "$STATUS" '{status: $status}')

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

# Verify update
UPDATED_STATUS=$(echo "$RESPONSE" | jq -r '.status.status // empty')

if [[ "$UPDATED_STATUS" == "$STATUS" ]]; then
  echo -e "${GREEN}Successfully updated $SEARCH_TERM to: $STATUS${NC}"
else
  echo -e "${YELLOW}Warning: Status may not have updated correctly${NC}"
  echo "Expected: $STATUS"
  echo "Got: $UPDATED_STATUS"
fi
