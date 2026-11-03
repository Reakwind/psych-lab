# Autonomous agent working agreement

Read this file, README.md, docs/CLOUD.md, and docs/AGENT_WORKFLOW.md before editing.

## Purpose: an exploration lab

This is a lab for exploring Remepy's Parkinson's psychological program: its scripts, activities, films and flow. The owner feeds context about the app and the program; agents help visualize, conceptualize and prototype it (including Claude Design prototypes) and engage with it in a lab-like environment. Nothing in the program needs fixing. Gaps in the sources, such as unrecorded practices or the PS-CONT-047 conflict, are facts to show, not work items.

**Source material is read-only, and everything built must reflect it verbatim.** This is the most important check in the repository.
- Never edit, rename or delete source material: the root DOCX/CSV originals, `psych-lab/intervention/sources/`, `psych-lab/intervention-audit/sources/`, `psych-lab/intervention/media/`, `animation-kit/artifact-files/`, and new owner-supplied material in `sources/`. `source-material.json` lists them with hashes; `npm run check`, the pre-commit hook and `agent-policy` reject any change. New sources may be added, then recorded with `python3 scripts/source_guard.py register`.
- Program content shown in anything we build (Hebrew and English scripts, activity text, titles, narration) is quoted exactly as the source has it, with its source ID. Never translate, paraphrase, shorten, invent or "improve" it. Where no source text exists, show that it is missing rather than writing a substitute. Lab interface labels may be authored but must never pass for program content. Hebrew interface words (tabs, buttons, status words) on a phone prototype come only from `canvas/interface-he.json`, which quotes the original design's wording as the owner approved (2026-11-03); never add program text to it, and never write new Hebrew labels of your own.

The Lab holds 87 session flows and 51 script/audio/storyboard/film trios. Read docs/ARCHITECTURE.md for source precedence.

## Where output goes: the canvases

The owner views the Lab in connected Claude Design canvases, not a website. Everything built for the owner to see goes onto a canvas; there is no local Lab server, and none should be added. Start at Home, which links every canvas (registry: `canvas/canvases.json`):

- Home: https://claude.ai/artifact/WAWMSHN8NVvUtk2Mp5vaW6
- Original design (the preserved design canvas: persona, design system, flows, the 51 films and storyboards, Ruth's journey): https://claude.ai/artifact/TddJCUmCTkkuhubb6ovHzm
- Activities: https://claude.ai/artifact/GfG5m5VUL9zqniG5M9FHzT
- Films & scripts: https://claude.ai/artifact/KkY7FBBxvJtd38pTcKNsLT
- Phone preview: https://claude.ai/artifact/8NYov7M3HXKPhX49GV6WMw

How to put work there:
- Boards that show program content are generated from repository data (`node canvas/build.mjs`, or a generator beside it), never hand-typed, so the verbatim rule holds. Committed copies live in `canvas/<canvas>/project/`; publish them to their canvas with the Artifact tool (`root` = `canvas/<canvas>`), canvas.json and Main.dc.html first.
- Before publishing, `npm test` must pass: `tests/test_canvas.py` checks that boards are current, verbatim (`scripts/verbatim.py`; film boards with `--narration`) and use only media their own canvas holds. Render changed boards with the canvas runtime and look at them.
- Media is uploaded to the canvas that plays it (assets do not cross canvases); record every asset in `canvas/canvases.json` or the `canvas/assets-*.txt` maps. Source media stays untouched in the repository.
- New work that fits no existing canvas gets its own canvas from the Design type, linked from Home and every sibling and added to `canvas/canvases.json`. Change the original design canvas only with the owner's agreement.
- Tell the owner in the conversation what changed on which canvas, with its link.

## Ownership is mandatory

1. One session, one isolated worktree, one branch, one PR per day (owner decision 2026-11-02). Every change, code or docs, is its own commit on the session branch; at the end of the day the session's PR carries all of them and is squash-merged once CI is green. Never share a mutable checkout, render output directory, or browser debugging port with another agent.
2. Run `python3 scripts/agents.py setup`, then `npm run doctor` (readiness: tools, guards, claim, LFS media, GitHub access). Use `start` for a new local worktree or `claim` to adopt a cloud-provider branch. Keep the provider's assigned branch name; do not rename it. `scripts/agents.py` talks to GitHub through REST only (`gh api`), because hosted agent proxies block the GraphQL API that `gh pr ...` uses; do not replace it with `gh pr` commands.
3. Claim the session's files or directory prefixes through an early draft PR (the day's PR). Wait for `agent-policy` to pass before implementation. When the day's work reaches new paths, widen the claim with `python3 scripts/agents.py scope --add PATHS --why ...` before editing them; it updates the manifest, local context and PR contract together. Inspect open PRs and their scope contracts. The oldest open PR wins a conflicting claim; later sessions split their work or wait.
4. Change only your reserved files and your own task manifest. Shared files require a separate task or explicit, coordinated transfer after the previous claim closes. No global mutable lock file. Do not edit another task's manifest or context.
5. Keep a readable PR body with purpose, behavior changes, validation, risks/source impact, and ownership. Preserve the hidden agent contract. Use conventional subjects and `Task:` / `Agent:` commit trailers. State the reason for each meaningful change.

## Git safety

- Never commit or push directly to main. Owner decisions (2026-11-02): do not wait for the owner to read or approve PRs, and work in daily sessions. Commit each change as you go (`agents.py commit`). At the end of the day run `agents.py submit`, then integrate the day's PR with `python3 scripts/agents.py merge` once it is ready: submitted (not draft), current with main, every required check green on the exact head, Codex finished reviewing that exact head (`agents.py request-review` after fix pushes), and every review finding fixed or answered and resolved. The command refuses otherwise. `merge` squash-merges, then prunes the merged branch's tracking ref, fast-forwards local main and removes the session's clean local worktree; GitHub deletes the merged branch. The next session starts from that main with its own branch and claim, so it sees everything that was done. A squash-merged branch is never reused. Clinical content still needs specific owner authorization, as stated above.
- Never use reset, clean, checkout to discard files, restore of working files, rebase, amend, force pushes (including force-with-lease), mirror pushes, ref deletion, branch deletion/renaming, worktree pruning/removal, history filtering, or Git metadata edits. Branches and worktrees are trimmed only by the merge step: GitHub deletes a merged head branch, and `agents.py merge` removes the merged session's clean worktree. Never delete branches or worktrees yourself; GitHub rules block force pushes on every branch and deletion of main.
- Never bypass hooks or policy: no `--no-verify`, `-c core.hooksPath=...`, policy removal, alternate Git index/config overrides, or scripts that perform equivalent destructive operations.
- Do not use broad `git add .` / `git add -A`, stash away someone else's work, resolve conflicts with ours/theirs wholesale, or replace unrelated files. Stage explicitly owned paths through `scripts/agents.py commit`.
- Sync using fetch and merge from origin/main. If a conflict or dirty checkout blocks progress, preserve everything, report the exact files, and coordinate. Do not auto-discard changes or auto-resolve clinical copy.
- Use `scripts/agents.py submit` after checks. Push only your own branch, with ordinary fast-forward updates.

## Validation and handoff

Run `npm test` and `npm run check`. For media work, hydrate LFS and run `npm run media:check`, the existing encoded-film/audio checks, and visual review of relevant frames. For canvas or UX changes, render the changed boards (desktop pages and the 390 x 844 phone) and look at them before publishing. Do not count skipped/simulated flows as complete timing evidence. Keep clinical source gaps visible.

Report to the owner directly in the conversation, plainly: every blocker, failure, risk, source gap, skipped check, and decision you need, each with your recommendation. Repository files, status JSON and PR bodies are records, not the place to tell the owner something; never leave a problem only there.

Do not invent narration, claims, therapy examples, timing evidence, recorded media, or source authority. For animation work also read animation-kit/WORKFLOW.md; its creative guidance applies, while this agreement governs Git, publication, ownership, and user communication.

Never commit credentials, .env files, temporary signed URLs, local agent context, dependency folders, render-frame caches, or machine-specific paths. Do not send messages to others or publish elsewhere without task authorization. Do not select a public code/content license on the owner's behalf.

## Enforcement boundary

Git hooks and Claude hooks prevent common accidents in a cooperative checkout. Arbitrary code or an administrator can bypass local hooks; do not claim they are a security sandbox. GitHub rules independently block force pushes and branch deletion, require scoped PR policy and quality checks, and keep main current. Agents should receive selected-repository, ordinary write access through their provider integration, never an administrator token. Repository settings, rulesets and access changes belong to the owner; recommend them in the conversation rather than changing them.

The initial publishing coordinator may bootstrap the first main commit before protections exist; after publication all further changes use PRs.
