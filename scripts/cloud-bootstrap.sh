#!/usr/bin/env bash
# Prepare a fresh checkout for autonomous agent work.
#   --code-only  skip Git LFS media hydration (~1.3 GB) for code/docs tasks
set -euo pipefail
cd "$(dirname "$0")/.."
mode="${1:-}"
required=(git git-lfs node npm python3)
[[ "$mode" == "--code-only" ]] || required+=(ffprobe)
for tool in "${required[@]}"; do
  command -v "$tool" >/dev/null || { echo "Missing $tool; use the dev container or install dependencies in docs/CLOUD.md." >&2; exit 1; }
done
node -e 'if(Number(process.versions.node.split(".")[0])<22)process.exit(1)' || { echo 'Node.js 22+ required.' >&2; exit 1; }
python3 -c 'import sys; assert sys.version_info >= (3, 11), "Python 3.11+ required"'
python3 scripts/agents.py setup
npm ci --ignore-scripts
if [[ "$mode" != "--code-only" ]]; then
  git lfs pull
  npm run media:check
fi
npm test
python3 scripts/agents.py doctor || true
echo 'Ready. Run npm run start:cloud and forward port 63684; claim a task before editing.'
