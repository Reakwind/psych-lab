# Autonomous agent working agreement

Read this file, README.md, docs/CLOUD.md, and docs/AGENT_WORKFLOW.md before editing.

## Purpose and clinical constraints

This is a source-based preview of Remepy's Parkinson's psychological intervention. The owner uses the Psych Lab to experience all 87 sessions and assess whether the psychological work fits within the product's 30-minute whole-session limit. Preserve the intervention and measure it. Identify possible cuts for discussion; do not shorten, rewrite, or replace clinical content without a specific task authorizing that change.

The full intervention lives at `/?view=intervention&day=1`. The Lab contains 51 completed script/audio/storyboard/film trios. Eight scheduled practice recordings have not been recorded yet (owner confirmed 2026-11-02); their labeled simulations must never count as a complete recorded experience. See `psych-lab/intervention/implementation-status.json` for other source gaps. Read docs/ARCHITECTURE.md for source precedence and the held-out PS-CONT-047 conflict.

## Ownership is mandatory

1. One agent, one isolated checkout/worktree, one unique branch, one task, one PR. Never share a mutable checkout, render output directory, or browser debugging port with another agent.
2. Run `python3 scripts/agents.py setup`, then `npm run doctor` (readiness: tools, guards, claim, LFS media, GitHub access). Use `start` for a new local worktree or `claim` to adopt a cloud-provider branch. Keep the provider's assigned branch name; do not rename it. `scripts/agents.py` talks to GitHub through REST only (`gh api`), because hosted agent proxies block the GraphQL API that `gh pr ...` uses; do not replace it with `gh pr` commands.
3. Claim exact files or directory prefixes through an early draft PR. Wait for `agent-policy` to pass before implementation. Inspect open PRs and their scope contracts. The oldest open PR wins a conflicting claim; later agents split their task or wait.
4. Change only your reserved files and your own task manifest. Shared files require a separate task or explicit, coordinated transfer after the previous claim closes. No global mutable lock file. Do not edit another task's manifest or context.
5. Keep a readable PR body with purpose, behavior changes, validation, risks/source impact, and ownership. Preserve the hidden agent contract. Use conventional subjects and `Task:` / `Agent:` commit trailers. State the reason for each meaningful change.

## Git safety

- Never commit or push directly to main. Owner decision (2026-11-02): do not wait for the owner to read or approve PRs. Each agent integrates its own PR with `python3 scripts/agents.py merge` once it is ready: submitted (not draft), current with main, every required check green on the exact head, Codex finished reviewing that exact head (`agents.py request-review` after fix pushes), and every review finding fixed or answered and resolved. The command refuses otherwise. Merge one PR at a time. Start every later task with `python3 scripts/agents.py next`, which cuts `<session-branch>--<task>` from main and claims it; a squash-merged branch cannot be reused because its old commits would ride along with the wrong trailers. Clinical content still needs specific owner authorization, as stated above.
- Never use reset, clean, checkout to discard files, restore of working files, rebase, amend, force pushes (including force-with-lease), mirror pushes, ref deletion, branch deletion/renaming, worktree pruning/removal, history filtering, or Git metadata edits. Do not delete even merged branches; server rules preserve history.
- Never bypass hooks or policy: no `--no-verify`, `-c core.hooksPath=...`, policy removal, alternate Git index/config overrides, or scripts that perform equivalent destructive operations.
- Do not use broad `git add .` / `git add -A`, stash away someone else's work, resolve conflicts with ours/theirs wholesale, or replace unrelated files. Stage explicitly owned paths through `scripts/agents.py commit`.
- Sync using fetch and merge from origin/main. If a conflict or dirty checkout blocks progress, preserve everything, report the exact files, and coordinate. Do not auto-discard changes or auto-resolve clinical copy.
- Use `scripts/agents.py submit` after checks. Push only your own branch, with ordinary fast-forward updates.

## Validation and handoff

Run `npm test` and `npm run check`. For media work, hydrate LFS and run `npm run media:check`, the existing encoded-film/audio checks, and visual review of relevant frames. For UX changes, inspect desktop and phone layouts and attach evidence. Do not count skipped/simulated flows as complete timing evidence. Keep clinical source gaps visible.

Report to the owner directly in the conversation, plainly: every blocker, failure, risk, source gap, skipped check, and decision you need, each with your recommendation. Repository files, status JSON and PR bodies are records, not the place to tell the owner something; never leave a problem only there.

Do not invent narration, claims, therapy examples, timing evidence, recorded media, or source authority. For animation work also read animation-kit/WORKFLOW.md; its creative guidance applies, while this agreement governs Git, publication, ownership, and user communication.

Never commit credentials, .env files, temporary signed URLs, local agent context, dependency folders, render-frame caches, or machine-specific paths. Do not send messages to others or publish elsewhere without task authorization. Do not select a public code/content license on the owner's behalf.

## Enforcement boundary

Git hooks and Claude hooks prevent common accidents in a cooperative checkout. Arbitrary code or an administrator can bypass local hooks; do not claim they are a security sandbox. GitHub rules independently block force pushes and branch deletion, require scoped PR policy and quality checks, and keep main current. Agents should receive selected-repository, ordinary write access through their provider integration, never an administrator token. Repository settings, rulesets and access changes belong to the owner; recommend them in the conversation rather than changing them.

The initial publishing coordinator may bootstrap the first main commit before protections exist; after publication all further changes use PRs.
