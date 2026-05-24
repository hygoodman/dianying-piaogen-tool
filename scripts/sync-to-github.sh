#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

branch="$(git branch --show-current)"
if [[ -z "$branch" ]]; then
  echo "[sync-to-github] No current branch; skip." >&2
  exit 0
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "[sync-to-github] Working tree has uncommitted changes; pushing committed history only." >&2
fi

if git push origin "$branch"; then
  echo "[sync-to-github] Synced $branch to origin."
  exit 0
fi

echo "[sync-to-github] Push failed. Configure GitHub credentials, then run: git push origin $branch" >&2
exit 1
