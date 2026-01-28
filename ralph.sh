#!/bin/bash
# Ralph - Long-running AI agent loop (ONE story per iteration)
# Usage: ./ralph.sh [--babysit] [max_iterations]

# Ensure running with bash
if [ -z "$BASH_VERSION" ]; then
  echo "Error: This script must be run with bash, not sh."
  echo "Usage: bash ralph.sh [args]"
  exit 1
fi

set -e

# Dependency checks
command -v jq >/dev/null 2>&1 || { echo "Error: jq is required but not installed. Aborting."; exit 1; }
command -v git >/dev/null 2>&1 || { echo "Error: git is required but not installed. Aborting."; exit 1; }

# Parse arguments
MAX_ITERATIONS=100
BABYSIT_MODE=false
MAX_CONSECUTIVE_FAILURES=5

while [[ $# -gt 0 ]]; do
  case "$1" in
    --babysit)
      BABYSIT_MODE=true
      ;;
    *)
      # Assume it's max_iterations if it's a number
      if [[ "$1" =~ ^[0-9]+$ ]]; then
        MAX_ITERATIONS="$1"
      fi
      ;;
  esac
  shift
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RALPH_FILE="$SCRIPT_DIR/RALPH.md"
PRD_FILE="$SCRIPT_DIR/prd.json"
PROGRESS_FILE="$SCRIPT_DIR/progress.txt"
ARCHIVE_DIR="$SCRIPT_DIR/archive"
LAST_BRANCH_FILE="$SCRIPT_DIR/.last-branch"
LOCK_FILE="$SCRIPT_DIR/.ralph.lock"
COMPLETION_MARKER="$SCRIPT_DIR/.ralph-complete"

# Check for RALPH.md
[ -f "$RALPH_FILE" ] || { echo "Error: RALPH.md not found at $RALPH_FILE. Aborting."; exit 1; }

# Check for prd.json (CRITICAL: must exist)
[ -f "$PRD_FILE" ] || { echo "Error: prd.json not found at $PRD_FILE. Aborting."; exit 1; }

# Acquire lock file to prevent concurrent runs using mkdir (atomic operation)
if ! mkdir "$LOCK_FILE.dir" 2>/dev/null; then
  LOCK_PID=$(cat "$LOCK_FILE" 2>/dev/null || echo "unknown")
  echo "Error: Ralph is already running (PID: $LOCK_PID)"
  echo "If this is incorrect, remove $LOCK_FILE and $LOCK_FILE.dir"
  exit 1
fi
echo $$ > "$LOCK_FILE"

# Cleanup function for signals
cleanup() {
  echo ""
  echo "Ralph interrupted. Cleaning up..."
  rm -f "$LOCK_FILE"
  rmdir "$LOCK_FILE.dir" 2>/dev/null
  exit 130
}

trap cleanup SIGINT SIGTERM
trap "rm -f '$LOCK_FILE'; rmdir '$LOCK_FILE.dir' 2>/dev/null" EXIT

# Archive previous run if branch changed
if [ -f "$LAST_BRANCH_FILE" ]; then
  # Get CURRENT_BRANCH with proper error reporting
  if ! CURRENT_BRANCH=$(jq -r '.branchName // empty' "$PRD_FILE" 2>&1); then
    echo "Warning: Failed to parse branchName from prd.json"
    echo "jq error: $CURRENT_BRANCH"
    CURRENT_BRANCH=""
  fi

  LAST_BRANCH=$(cat "$LAST_BRANCH_FILE" 2>/dev/null || echo "")

  if [ -n "$CURRENT_BRANCH" ] && [ -n "$LAST_BRANCH" ] && [ "$CURRENT_BRANCH" != "$LAST_BRANCH" ]; then
    # Archive the previous run
    TIMESTAMP=$(date +%Y%m%d-%H%M%S)
    # Strip "ralph/" prefix from branch name for folder
    FOLDER_NAME=$(echo "$LAST_BRANCH" | sed 's|^ralph/||')
    ARCHIVE_FOLDER="$ARCHIVE_DIR/$TIMESTAMP-$FOLDER_NAME"

    echo "Archiving previous run: $LAST_BRANCH"
    if ! mkdir -p "$ARCHIVE_FOLDER"; then
      echo "Warning: Failed to create archive directory $ARCHIVE_FOLDER"
      echo "Skipping archive for this run (previous PRD/progress will be lost)."
    else
      cp "$PRD_FILE" "$ARCHIVE_FOLDER/" || echo "Warning: Failed to copy PRD to archive"
      cp "$PROGRESS_FILE" "$ARCHIVE_FOLDER/" || echo "Warning: Failed to copy progress to archive"
      echo "   Archived to: $ARCHIVE_FOLDER"
    fi

    # Reset progress file for new run (matches initial format)
    echo "# Ralph Progress Log" > "$PROGRESS_FILE"
    echo "Started: $(date)" >> "$PROGRESS_FILE"
    echo "---" >> "$PROGRESS_FILE"
  fi
fi

# Track current branch and ensure we're on the correct branch
if [ -f "$PRD_FILE" ]; then
  # Get CURRENT_BRANCH with proper error reporting
  if ! CURRENT_BRANCH=$(jq -r '.branchName // empty' "$PRD_FILE" 2>&1); then
    echo "Warning: Failed to parse branchName from prd.json"
    echo "jq error: $CURRENT_BRANCH"
    CURRENT_BRANCH=""
  fi

  if [ -n "$CURRENT_BRANCH" ]; then
    # Write to .last-branch with error handling
    if ! echo "$CURRENT_BRANCH" > "$LAST_BRANCH_FILE" 2>/dev/null; then
      echo "Warning: Could not write to $LAST_BRANCH_FILE"
      echo "Branch tracking will not work across runs."
    fi

    # Ensure we're on the correct branch (CRITICAL: RALPH.md Step 3)
    ACTUAL_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
    if [ "$ACTUAL_BRANCH" != "$CURRENT_BRANCH" ]; then
      echo "Switching to required branch: $CURRENT_BRANCH"
      if git show-ref --verify --quiet "refs/heads/$CURRENT_BRANCH" 2>/dev/null; then
        git checkout "$CURRENT_BRANCH" || { echo "Error: Failed to checkout branch $CURRENT_BRANCH. Aborting."; exit 1; }
      else
        echo "Branch $CURRENT_BRANCH does not exist. Creating from main..."
        git checkout main 2>/dev/null || git checkout -b main origin/main || { echo "Error: Neither 'main' nor 'origin/main' branch found. Aborting."; exit 1; }
        git checkout -b "$CURRENT_BRANCH" || { echo "Error: Failed to create branch $CURRENT_BRANCH. Aborting."; exit 1; }
      fi
    fi
  else
    echo "Error: No branchName specified in prd.json. Aborting."
    exit 1
  fi
else
  echo "Error: prd.json not found. Aborting."
  exit 1
fi

# Initialize progress file if it doesn't exist
if [ ! -f "$PROGRESS_FILE" ]; then
  echo "# Ralph Progress Log" > "$PROGRESS_FILE"
  echo "Started: $(date)" >> "$PROGRESS_FILE"
  echo "---" >> "$PROGRESS_FILE"
fi

echo "Starting Ralph (ONE STORY PER ITERATION) - Max iterations: $MAX_ITERATIONS"
if [ "$BABYSIT_MODE" = true ]; then
  echo "  Babysit mode: ENABLED (interactive Claude Code)"
fi

# Check if there are remaining stories to work on (MEDIUM: avoid wasted iterations)
if ! REMAINING=$(jq -r '.userStories[] | select(.passes == false) | .id' "$PRD_FILE" 2>/dev/null); then
  echo "Error: Failed to parse prd.json. Aborting."
  exit 1
fi

REMAINING_COUNT=$(echo "$REMAINING" | grep -c '.' 2>/dev/null || echo "0")
if [ "$REMAINING_COUNT" -eq 0 ]; then
  echo "All stories are complete! Nothing to do."
  exit 0
fi
echo "Found $REMAINING_COUNT remaining stories to complete."

# Store initial HEAD commit to detect new commits
PREV_HEAD=$(git rev-parse HEAD 2>/dev/null || echo "")

# Initialize consecutive failure counter
FAILED_ITERATIONS=0

for i in $(seq 1 $MAX_ITERATIONS); do
  echo ""
  echo "==============================================================="
  echo "  Ralph Iteration $i of $MAX_ITERATIONS"
  echo "==============================================================="

  # Check for completion signal from PREVIOUS iteration FIRST (HIGH: fix race condition)
  if [ -f "$COMPLETION_MARKER" ]; then
    echo ""
    echo "Ralph completed all tasks!"
    echo "Completed at iteration $i of $MAX_ITERATIONS"
    exit 0
  fi

  # Clear completion marker before running new iteration
  rm -f "$COMPLETION_MARKER"

  # Run Claude Code with the ralph prompt
  # --babysit mode: interactive (no --print), requires manual exit (Ctrl+D)
  # normal mode: --print for automatic exit after completion
  if [ "$BABYSIT_MODE" = true ]; then
    echo "Running in babysit mode (interactive - press Ctrl+D to exit Claude)..."
    claude --dangerously-skip-permissions "$(cat "$RALPH_FILE")" || true
  else
    claude --dangerously-skip-permissions --print < "$SCRIPT_DIR/RALPH.md" 2>&1 | tee /dev/stderr || true
  fi

  # Check for completion signal via marker file (post-run check)
  if [ -f "$COMPLETION_MARKER" ]; then
    echo ""
    echo "Ralph completed all tasks!"
    echo "Completed at iteration $i of $MAX_ITERATIONS"
    exit 0
  fi

  # Check if any story was completed by looking at new commits since before the iteration
  # Accepts both "feat: US-XXX - Title" format (RALPH.md spec) and raw "US-XXX" pattern for flexibility
  NEW_COMMITS=$(git log --oneline "$PREV_HEAD"..HEAD 2>/dev/null || echo "")
  if echo "$NEW_COMMITS" | grep -qE "feat:|US-[0-9]{3}"; then
    echo "Story completed in iteration $i:"
    echo "$NEW_COMMITS" | grep -E "feat:|US-[0-9]{3}" | sed 's/^/  /'
    FAILED_ITERATIONS=0
  else
    echo "No story completed in iteration $i (may have failed or been blocked)"
    FAILED_ITERATIONS=$((FAILED_ITERATIONS + 1))
    echo "Consecutive failures: $FAILED_ITERATIONS/$MAX_CONSECUTIVE_FAILURES"

    # HIGH: Exit after too many consecutive failures
    if [ $FAILED_ITERATIONS -ge $MAX_CONSECUTIVE_FAILURES ]; then
      echo ""
      echo "Error: Too many consecutive failures ($FAILED_ITERATIONS). Aborting."
      echo "Check $PROGRESS_FILE for details."
      exit 1
    fi
  fi

  # Update PREV_HEAD for next iteration
  PREV_HEAD=$(git rev-parse HEAD 2>/dev/null || echo "")

  echo "Iteration $i complete. Continuing..."
  sleep 2
done

echo ""
echo "Ralph reached max iterations ($MAX_ITERATIONS) without completing all tasks."
echo "Check $PROGRESS_FILE for status."
exit 1
