@AGENTS.md

Follow the tool-neutral agreement in AGENTS.md. SessionStart installs repository Git hooks and prints an offline readiness report (`agents.py doctor --offline`). PreToolUse checks shell commands for destructive Git operations. Do not remove or bypass either guard.

For a Claude Code cloud session, keep the provider-created `claude/...` branch and use `python3 scripts/agents.py claim`; never rename the branch or force-push. Run `bash scripts/cloud-bootstrap.sh --code-only` for code/docs tasks (drop `--code-only` for media work), then claim a scoped draft PR before implementation. See docs/CLOUD.md for dependencies, media, network access, and preview commands.

Claude cloud sessions reach GitHub REST through a credential proxy; GraphQL is blocked, so `gh pr list/create/edit/ready` fail while `gh api` works. `agents.py claim`, `status` and `submit` are REST-only and work there. Pass `--footer` to `submit` for any attribution lines the session requires. The guard skips a heredoc body only when Bash passes it on as inert data: a fully quoted delimiter (`<<'EOF'`, so `$(...)` is not expanded), a terminator line, and no shell or other executor receiving it or later in the pipeline. Use `python3 - <<'EOF'` or `cat > file <<'EOF'` for text that mentions Git commands; unquoted heredocs are inspected as commands. Prefer files for longer scripts.

Do not assume the old Claude artifact is the editable source of truth. The local Psych Lab and this Git repository are the current review surface. Original boards and completed media are preserved in this repository.
