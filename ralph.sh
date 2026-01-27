#!/bin/bash
# Ralph - Long-running AI agent loop (ONE story per iteration)
# Usage: ./ralph.sh [--babysit] [max_iterations]

set -e

# Dependency checks
command -v jq >/dev/null 2>&1 || { echo "Error: jq is required but not installed. Aborting."; exit 1; }
command -v git >/dev/null 2>&1 || { echo "Error: git is required but not installed. Aborting."; exit 1; }

# Parse arguments
MAX_ITERATIONS=100
BABYSIT_MODE=false

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

# Check for RALPH.md
[ -f "$RALPH_FILE" ] || { echo "Error: RALPH.md not found at $RALPH_FILE. Aborting."; exit 1; }
PROGRESS_FILE="$SCRIPT_DIR/progress.txt"
ARCHIVE_DIR="$SCRIPT_DIR/archive"
LAST_BRANCH_FILE="$SCRIPT_DIR/.last-branch"

# Archive previous run if branch changed
if [ -f "$PRD_FILE" ] && [ -f "$LAST_BRANCH_FILE" ]; then
  CURRENT_BRANCH=$(jq -r '.branchName // empty' "$PRD_FILE" 2>/dev/null || echo "")
  LAST_BRANCH=$(cat "$LAST_BRANCH_FILE" 2>/dev/null || echo "")

  if [ -n "$CURRENT_BRANCH" ] && [ -n "$LAST_BRANCH" ] && [ "$CURRENT_BRANCH" != "$LAST_BRANCH" ]; then
    # Archive the previous run
    DATE=$(date +%Y-%m-%d)
    # Strip "ralph/" prefix from branch name for folder
    FOLDER_NAME=$(echo "$LAST_BRANCH" | sed 's|^ralph/||')
    ARCHIVE_FOLDER="$ARCHIVE_DIR/$DATE-$FOLDER_NAME"

    echo "Archiving previous run: $LAST_BRANCH"
    mkdir -p "$ARCHIVE_FOLDER"
    [ -f "$PRD_FILE" ] && cp "$PRD_FILE" "$ARCHIVE_FOLDER/"
    [ -f "$PROGRESS_FILE" ] && cp "$PROGRESS_FILE" "$ARCHIVE_FOLDER/"
    echo "   Archived to: $ARCHIVE_FOLDER"

    # Reset progress file for new run
    echo "# Ralph Progress Log" > "$PROGRESS_FILE"
    echo "Started: $(date)" >> "$PROGRESS_FILE"
    echo "---" >> "$PROGRESS_FILE"
  fi
fi

# Track current branch
if [ -f "$PRD_FILE" ]; then
  CURRENT_BRANCH=$(jq -r '.branchName // empty' "$PRD_FILE" 2>/dev/null || echo "")
  if [ -n "$CURRENT_BRANCH" ]; then
    echo "$CURRENT_BRANCH" > "$LAST_BRANCH_FILE"
  fi
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

# Store initial HEAD commit to detect new commits
PREV_HEAD=$(git rev-parse HEAD 2>/dev/null || echo "")

# Marker file for completion signal
COMPLETION_MARKER="$SCRIPT_DIR/.ralph-complete"

for i in $(seq 1 $MAX_ITERATIONS); do
  echo ""
  echo "==============================================================="
  echo "  Ralph Iteration $i of $MAX_ITERATIONS"
  echo "==============================================================="

  # Clear completion marker before running
  rm -f "$COMPLETION_MARKER"

  # Run Claude Code with the ralph prompt
  # --babysit mode: interactive (no --print), requires manual exit (Ctrl+D)
  # normal mode: --print for automatic exit after completion
  if [ "$BABYSIT_MODE" = true ]; then
    echo "Running in babysit mode (interactive - press Ctrl+D to exit Claude)..."
    claude --dangerously-skip-permissions "$(cat "$RALPH_FILE")" || true
  else
    claude --print --dangerously-skip-permissions "$(cat "$RALPH_FILE")" 2>&1 || true
  fi

  # Check for completion signal via marker file
  if [ -f "$COMPLETION_MARKER" ]; then
    echo ""
    echo "Ralph completed all tasks!"
    echo "Completed at iteration $i of $MAX_ITERATIONS"
    rm -f "$COMPLETION_MARKER"
    exit 0
  fi

  # Check if any story was completed by looking at new commits since before the iteration
  NEW_COMMITS=$(git log --oneline "$PREV_HEAD"..HEAD 2>/dev/null || echo "")
  if echo "$NEW_COMMITS" | grep -q "feat:"; then
    echo "Story completed in iteration $i:"
    echo "$NEW_COMMITS" | grep "feat:" | sed 's/^/  /'
  else
    echo "No story completed in iteration $i (may have failed or been blocked)"
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
