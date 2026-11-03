# Working together without overwriting work

## Quick start for a worker

```bash
bash scripts/cloud-bootstrap.sh --code-only    # or full bootstrap for media work
npm run doctor                                 # every line should be ok/warn, none FAIL
python3 scripts/agents.py status               # open PRs and the scopes they reserve
python3 scripts/agents.py claim --task T --agent A --summary S --scope PATHS...   # manifest + pushed branch, no PR
# then, as you iterate with the owner, one commit per change (code or docs), pushing the branch:
python3 scripts/agents.py commit --message M --why W PATHS...
python3 scripts/agents.py scope --add PATHS --why W    # when the work reaches new paths
# only when the owner asks for a PR (owner rule 2026-11-03):
python3 scripts/agents.py submit --title T --summary S --changes C --validation V --risks R
# fix/answer and resolve every review finding; after pushing fixes ask Codex to re-review:
python3 scripts/agents.py request-review
# once CI is green and Codex has reviewed the exact head:
python3 scripts/agents.py merge    # squash-merge, fast-forward main, trim the worktree
```

A session is one worktree and one branch for one day of work. It ends with one PR holding all of the day's commits, squash-merged after CI is green. GitHub deletes the merged branch, `merge` fast-forwards local main and removes the session's clean worktree, and the next session starts from that main, so it sees everything that was done.

Report blockers, risks and decisions to the owner directly in the conversation with a recommendation; never leave them only in a file or PR body.

## Worker lifecycle

First read AGENTS.md, run `python3 scripts/agents.py status` to list open PRs with their reserved scopes, and choose a bounded task with nonoverlapping paths.

For a local coordinator, create an isolated worktree and reserve it:

```bash
python3 scripts/agents.py start --task video-controls --agent claude-controls \
  --summary 'Restore accessible playback controls on phone screens' \
  --scope canvas/phone-logic.js canvas/phone-markup.html
```

Continue **only inside the worktree path printed by that command**. Do not open two agents in the same checkout. Each worktree has its own ignored `.agent-context.json`. Its committed `docs/agent-tasks/<task>.json` and draft PR preserve the claim. Never pass all of `psych-lab/` to one task if you intend other agents to work on files within it.

If a cloud service already created a `claude/...`, `codex/...`, or `agent/...` branch in its isolated clone, retain it:

```bash
python3 scripts/agents.py claim --task video-controls --agent claude-controls \
  --summary 'Restore accessible playback controls on phone screens' \
  --scope canvas/phone-logic.js canvas/phone-markup.html
```

The claim command checks open PRs for overlapping scopes, commits only its own manifest and pushes only its assigned branch. It opens no PR: by the owner's rule (2026-11-03) work is iterated with commits and a PR is opened only when the owner asks, by `submit`. The `agent-policy` check runs when that PR opens; if two claims race, the oldest open PR reserves that scope and the newer PR is blocked. Claims without a PR are invisible to other sessions, so run one session on the repository at a time. Different exact files can be worked on concurrently; directory claims reserve their descendants. A malformed open claim blocks new reservations until its agent fixes it or the owner closes it. Avoid a single shared task board file that all agents must edit.

If a reservation is interrupted by authentication or network failure, retry the exact same `claim` command in the same checkout with unchanged task, agent, branch and scope. It reuses the reservation commit instead of creating a duplicate. Recovery refuses unrelated uncommitted work or a different contract and preserves those files. Do not delete context, branches, or Git metadata to recover.

Implement, inspect your diff, and commit explicit paths:

```bash
python3 scripts/agents.py commit \
  --message 'fix(preview): keep playback controls reachable on phones' \
  --why 'The review footer covered the player controls at narrow widths.' \
  canvas/phone-logic.js canvas/phone-markup.html
```

Keep commits focused. State why behavior changes and preserve `Task:` and `Agent:` trailers; `--footer` adds further trailers (for example `Co-Authored-By:`) after them. Hooks reject unrelated staged files and possible credentials. New files require an explicit scope reservation before implementation. Do not expand the PR contract silently to win a conflict; coordinate a new claim or a scope transfer first.

Sync with current main without rewriting history:

```bash
python3 scripts/agents.py sync
```

This requires a clean checkout, fetches main, and merges it. A conflict is left intact for inspection. Preserve the files, explain the conflict, and coordinate ownership; never resolve by discarding another agent's changes. Required up-to-date checks force another sync if main advances before merge.

When the owner asks for a PR, submit a concrete reviewable result:

```bash
python3 scripts/agents.py submit \
  --title 'fix(preview): keep playback controls reachable on phones' \
  --summary 'Phone users can reach all playback controls.' \
  --changes 'Adjusted footer spacing and player layout; attached desktop and phone evidence.' \
  --validation 'npm test and npm run check passed; inspected 390×844 and desktop layouts.' \
  --risks 'No clinical copy, sequencing, narration, or timing changes.'
```

The command runs checks, pushes, and opens the PR ready for review with the structured body (or updates it and marks it ready if one is already open). `--footer` appends provider-required attribution after the contract. All GitHub calls are REST-only, so they also work in hosted sessions whose proxies block GraphQL; if marking ready is refused, the command says so and the agent marks the PR ready with its own GitHub integration. Actual visual/media validation must be performed and accurately reported by the agent; a claimed command result is not a substitute for evidence.

## Merging a PR

The owner does not review or approve PRs (decision 2026-11-02) and asks for them when wanted (2026-11-03). Once a requested PR is ready, the session integrates it:

```bash
python3 scripts/agents.py merge     # squash-merges only when everything below holds
```

`merge` refuses unless the PR is submitted (not draft), the local head is pushed and is the PR head, the branch contains current main, every required check from `.github/rulesets/main.json` has succeeded on that exact head (cancelled duplicates are ignored; any failure blocks), every review thread is resolved, and Codex has finished reviewing that exact head. Codex reviews automatically only when a PR opens or leaves draft; after pushing fixes run `python3 scripts/agents.py request-review` (posts `@codex review`) and wait for its result. Before merging, fix each review finding or answer it on its thread, then resolve it. Re-read your full diff for logical conflicts that path ownership cannot detect. The squash commit takes the conventional PR title; the PR keeps every individual commit and the task manifest stays on main as the audit trail. After merging, `merge` prunes the deleted branch's tracking ref, fast-forwards local main (in the primary checkout when main is checked out there and clean), and removes the session's worktree when it is a clean linked worktree; uncommitted work is kept and reported. Never reuse a squash-merged branch: its commits stay outside main and would fail `agent-policy` in the next PR. A second PR within one session is the exception: `next` cuts `<session-branch>--<task>` from main once the first is merged.

Required human approvals are zero because agents share the owner's GitHub identity, which cannot approve its own PR. Scope policy, required checks, resolved threads and the strict current-base rule remain enforced by GitHub.

## Safeguards and boundaries

- GitHub rulesets: no force pushes on any branch; main also cannot be deleted and requires PRs, `quality`, `agent-policy`, resolved conversations, a current base and linear history; no bypass actors. Merged head branches are deleted automatically (repository setting), which is how session branches are trimmed.
- Local hooks: scope/credential checks, commit attribution, own-branch-only fast-forward pushes, and Git LFS upload chaining.
- Claude hook: rejects common destructive Git commands and bypass attempts before Bash execution.
- Trusted-base policy: runs only main's policy code, never executes PR code with privileged tokens, checks live PR data and committed task metadata, and rejects scope overlaps.
- Quality CI: read-only permissions, no secrets, no privileged PR execution, pinned official actions. Media is an explicit heavier check.

Local hooks can be bypassed by arbitrary code or an administrator. Remote rules enforce shared history but an administrator can change the ruleset. Do not issue admin credentials to workers. Path claims prevent overlapping edits; they cannot guarantee semantic compatibility between different files, so re-read the merged result before `merge`. Rules preserve remote history; keep normal backups for local uncommitted work.

Task scope changes and infrastructure/source-policy changes should be separate, narrowly owned PRs. Do not downgrade protections to unblock a task. The owner alone decides repository access, rulesets and clinical content changes; recommend those in the conversation.
