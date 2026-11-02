# Publication and cloud handoff verification

Verified on 2026-11-02 against the public repository https://github.com/Reakwind/psych-lab.

## Published project

The source, original documents and artifact runtime, 87-session intervention, 51 finished animation trios, narration, practice media and review evidence are published. Finished media and binary source documents are held in Git LFS (approximately 1.3 GB of unique archived objects, including version history). Credentials, installed dependencies, disposable frame/synthesis caches and machine logs are excluded. A tracked-file credential scan passed before publication.

The original complete playback audit remains in `psych-lab/production/review/lab/`. A separate portable renderer smoke check for S01 and S99, with desktop and 390×844 phone evidence, is in `psych-lab/production/review/cloud-handoff/`. Both films played at 1080×1080 with advancing playback and expected durations.

## Cloud and media checks

- A fresh HTTPS clone of the public repository successfully ran `bash scripts/cloud-bootstrap.sh --code-only`: dependency installation, Git guard installation and all then-current tests passed without relying on the original checkout or private runtime paths.
- [Initial Linux quality CI](https://github.com/Reakwind/psych-lab/actions/runs/41407772525) passed.
- [Full Linux media verification](https://github.com/Reakwind/psych-lab/actions/runs/41408004656) passed: GitHub downloaded the LFS archive, FFprobe verified all 58 referenced audio/video files, and `git lfs fsck` passed.
- The final local suite passes 32 tests: 11 sourced intervention/sequence tests and 21 command, scope, ownership, identity and real temporary-repository Git tests. PR CI records the final Linux result.
- The dev-container definition is included. Docker is unavailable on the publishing Mac, so that image was not locally built; Linux media and code checks ran in GitHub Actions.

## Actual agent lifecycle

[PR #1](https://github.com/Reakwind/psych-lab/pull/1) was reserved from the clean isolated clone through `scripts/agents.py claim`. It created the attributed reservation commit and machine-readable task manifest, pushed only the owned `agent/cloud-handoff-20261102` branch, and opened a draft PR. Both `quality` and `agent-policy` passed against the actual PR head. Retrying the unchanged claim reused its commit and PR successfully. The final implementation is submitted and merged through the same required checks; GitHub retains the exact review, commit and merge record.

Temporary-repository tests reject history rewrites, ref deletion, main/foreign-branch pushes, unowned staged work, credential publication and destructive command wrappers. Scope tests permit independent files and give the oldest overlapping claim priority. Recovery tests preserve unrelated uncommitted work and reject contract changes. These tests do not attempt destructive actions against the real repository.

## Server protection readback

Active rulesets are recorded in `.github/rulesets/` as a readable snapshot of the server configuration; these files do not apply themselves. Every branch rejects deletion and non-fast-forward updates. Main also requires PRs, the GitHub Actions `quality` and `agent-policy` checks, a current base, resolved conversations, squash-only merges and linear history. Both rulesets have no bypass actors. Auto-deleting merged branches and merge/rebase commits are disabled.

Required independent approvals are zero to support agents using the same account; workers still hand off to one designated integrator. Local hooks are cooperative guards rather than a security sandbox, and a repository administrator can edit server protections. Give cloud workers selected-repository ordinary write access instead of administrator credentials. Connecting a Claude account/environment to this repository remains an account-side setup step described in `docs/CLOUD.md`.
