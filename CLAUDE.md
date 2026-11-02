@AGENTS.md

Follow the tool-neutral agreement in AGENTS.md. SessionStart installs repository Git hooks. PreToolUse checks shell commands for destructive Git operations. Do not remove or bypass either guard.

For a Claude Code cloud session, keep the provider-created `claude/...` branch and use `python3 scripts/agents.py claim`; never rename the branch or force-push. Run `bash scripts/cloud-bootstrap.sh` in the environment setup, then claim a scoped draft PR before implementation. See docs/CLOUD.md for dependencies, media, network access, and preview commands.

Do not assume the old Claude artifact is the editable source of truth. The local Psych Lab and this Git repository are the current review surface. Original boards and completed media are preserved in this repository.
