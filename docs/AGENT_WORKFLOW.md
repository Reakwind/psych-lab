# Working together without overwriting work

## Worker lifecycle

First read AGENTS.md, inspect `gh pr list --repo Reakwind/psych-lab`, and choose a bounded task with nonoverlapping paths.

For a local coordinator, create an isolated worktree and reserve it:

```bash
python3 scripts/agents.py start --task video-controls --agent claude-controls \
  --summary 'Restore accessible playback controls on phone screens' \
  --scope psych-lab/intervention/app.mjs psych-lab/intervention/style.css
```

Continue **only inside the worktree path printed by that command**. Do not open two agents in the same checkout. Each worktree has its own ignored `.agent-context.json`. Its committed `docs/agent-tasks/<task>.json` and draft PR preserve the claim. Never pass all of `psych-lab/` to one task if you intend other agents to work on files within it.

If a cloud service already created a `claude/...`, `codex/...`, or `agent/...` branch in its isolated clone, retain it:

```bash
python3 scripts/agents.py claim --task video-controls --agent claude-controls \
  --summary 'Restore accessible playback controls on phone screens' \
  --scope psych-lab/intervention/app.mjs psych-lab/intervention/style.css
```

The claim command commits only its own manifest, pushes only its assigned branch, and opens a draft PR. Wait for `agent-policy` to pass before implementing. If two claims race, the oldest open PR reserves that scope and the newer PR is blocked. Different exact files can be worked on concurrently; directory claims reserve their descendants. A malformed open claim blocks new reservations until the integrator fixes it. Avoid a single shared task board file that all agents must edit.

If a reservation is interrupted by authentication or network failure, retry the exact same `claim` command in the same checkout with unchanged task, agent, branch and scope. It reuses the reservation commit and draft PR instead of creating duplicates. Recovery refuses unrelated uncommitted work or a different contract and preserves those files. Do not delete context, branches, or Git metadata to recover.

Implement, inspect your diff, and commit explicit paths:

```bash
python3 scripts/agents.py commit \
  --message 'fix(preview): keep playback controls reachable on phones' \
  --why 'The review footer covered the player controls at narrow widths.' \
  psych-lab/intervention/app.mjs psych-lab/intervention/style.css
```

Keep commits focused. State why behavior changes and preserve `Task:` and `Agent:` trailers. Hooks reject unrelated staged files and possible credentials. New files require an explicit scope reservation before implementation. Do not expand the PR contract silently to win a conflict; coordinate a new claim or a scope transfer first.

Sync with current main without rewriting history:

```bash
python3 scripts/agents.py sync
```

This requires a clean checkout, fetches main, and merges it. A conflict is left intact for inspection. Preserve the files, explain the conflict, and coordinate ownership; never resolve by discarding another agent's changes. Required up-to-date checks force another sync if main advances before merge.

Submit a concrete reviewable result:

```bash
python3 scripts/agents.py submit \
  --title 'fix(preview): keep playback controls reachable on phones' \
  --summary 'Phone users can reach all playback controls.' \
  --changes 'Adjusted footer spacing and player layout; attached desktop and phone evidence.' \
  --validation 'npm test and npm run check passed; inspected 390×844 and desktop layouts.' \
  --risks 'No clinical copy, sequencing, narration, or timing changes.'
```

The command runs checks, pushes, updates the structured PR body, and marks the PR ready. Actual visual/media validation must be performed and accurately reported by the agent; a claimed command result is not a substitute for evidence.

## Integrator lifecycle

Assign one integrator at a time. Workers stop at ready PRs. The integrator reviews the changes, authored sources, scope, validation and current head; checks for logical conflicts that path ownership cannot detect; then squash-merges one PR at a time:

```bash
gh pr checks NUMBER --repo Reakwind/psych-lab --required
gh pr view NUMBER --repo Reakwind/psych-lab --json headRefOid
gh pr merge NUMBER --repo Reakwind/psych-lab --squash --match-head-commit EXACT_HEAD_SHA
```

Never use `--admin` or `--delete-branch`. Preserve branches and task manifests as an audit trail. After one merge, later agents fetch/merge main and rerun checks. Squash commit titles inherit the conventional PR title; the structured PR body explains the final change.

Required independent human approvals are set to zero so agents using the same GitHub identity can complete the workflow. A single account cannot approve its own PR. The assigned integrator review, scope policy, required checks, and strict current-base rule remain mandatory. If separate worker and reviewer identities are available, the owner can require a code-owner approval without deadlocking autonomous work.

## Safeguards and boundaries

- GitHub rulesets: no branch deletion or force pushes across branches; main requires PRs, `quality`, `agent-policy`, resolved conversations, a current base and linear history; no bypass actors.
- Local hooks: scope/credential checks, commit attribution, own-branch-only fast-forward pushes, and Git LFS upload chaining.
- Claude hook: rejects common destructive Git commands and bypass attempts before Bash execution.
- Trusted-base policy: runs only main's policy code, never executes PR code with privileged tokens, checks live PR data and committed task metadata, and rejects scope overlaps.
- Quality CI: read-only permissions, no secrets, no privileged PR execution, pinned official actions. Media is an explicit heavier check.

Local hooks can be bypassed by arbitrary code or an administrator. Remote rules enforce shared history but an administrator can change the ruleset. Do not issue admin credentials to workers. Path claims prevent overlapping edits; they cannot guarantee semantic compatibility between different files, so integrator review still matters. Rules preserve remote history; keep normal backups for local uncommitted work.

Task scope changes and infrastructure/source-policy changes should be separate, narrowly owned integrator PRs. Do not downgrade protections to unblock a worker. The owner alone decides repository access and clinical content changes.
