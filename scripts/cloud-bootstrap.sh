#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
for tool in git git-lfs node npm python3 ffprobe; do
  command -v "$tool" >/dev/null || { echo "Missing $tool; use the dev container or install dependencies in docs/CLOUD.md." >&2; exit 1; }
done
node -e 'if(Number(process.versions.node.split(".")[0])<22)process.exit(1)'
python3 -c 'import sys; assert sys.version_info >= (3, 11), "Python 3.11+ required"'
python3 scripts/agents.py setup
npm ci --ignore-scripts
if [[ "${1:-}" != "--code-only" ]]; then
  git lfs pull
  npm run media:check
fi
npm test
echo 'Ready. Run npm run start:cloud and forward port 63684; claim a task before editing.'
