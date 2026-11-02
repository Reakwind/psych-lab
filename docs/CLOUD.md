# Cloud environments

## GitHub Codespaces / dev containers

Open this repository in a Codespace or any Dev Containers implementation. `.devcontainer/` builds Node.js 22 on Debian with Python, FFmpeg, Chromium, Git LFS and GitHub CLI. The setup hydrates media, installs pinned npm dependencies, installs guards, and runs tests. Forward port 63684, then run `npm run start:cloud`. Keep the forwarded port private unless explicitly sharing the preview.

One cloud environment per concurrently active agent is the simplest isolation. For several agents on one host use `scripts/agents.py start`, which creates separate Git worktrees and branches. Allocate different preview ports when sharing a host; e.g. `python3 psych-lab/serve.py --port 63685` and set `PSYCH_LAB_URL=http://127.0.0.1:63685` for playback checks. The capture tool already allocates its own Chrome debugging port and profile.

## Claude Code in the cloud

Connect `Reakwind/psych-lab` through Claude's GitHub integration and select it for the session. This repository cannot install that external integration or choose your Claude account's environment settings for you.

Use an environment with Node 22+, Python 3.11+, FFmpeg, Chromium, Git LFS, and GitHub CLI. For a Debian/Ubuntu environment with Node already installed, an environment setup can use:

```bash
sudo apt-get update
sudo apt-get install -y python3 ffmpeg chromium git-lfs gh
bash scripts/cloud-bootstrap.sh
```

Run from the checked-out repository. The Claude SessionStart hook also reinstalls guards on startup/resume; it does not silently install system packages or rewrite the provider branch. Keep the provider-assigned branch and use `claim`, as explained in [AGENT_WORKFLOW.md](AGENT_WORKFLOW.md). GitHub CLI must be authenticated with repository write and PR access for draft claims. Prefer the provider's selected-repository integration/short-lived credentials; do not copy a personal administrator token into an agent environment.

If the environment blocks package/LFS downloads, allow the specific GitHub, Git LFS object-storage, npm, and Debian package endpoints required by its setup, following your provider's network controls. Report the concrete blocked host rather than weakening all network policy. `bash scripts/cloud-bootstrap.sh --code-only` deliberately skips LFS for code tasks; it cannot validate or play missing recordings. Browser rendering needs Chromium or `npx playwright install chromium`. `CHROME_PATH` can explicitly select an installed browser.

Claude's cloud authentication, branch behavior, and environment controls depend on the selected provider/account. See [official Claude cloud documentation](https://code.claude.com/docs/en/claude-code-on-the-web) and [hook documentation](https://code.claude.com/docs/en/hooks).

Hosted Claude sessions can authenticate Git through a proxy outside the sandbox. The push guard accepts a loopback HTTP(S) proxy whose repository path ends in `/Reakwind/psych-lab`, while still checking the owned destination branch and fast-forward ancestry. For a provider-managed proxy on another host, set `AGENT_GIT_PROXY_ORIGIN` to its exact original origin URL in the trusted environment setup; the repository path must still match. Never put a token or password in this setting or change it to bypass ownership rules. GitHub API/PR access through `gh` is required in addition to Git proxy access; if unavailable, the environment must supply selected-repository credentials before autonomous task reservation can work.

## Media and content

All finished media and binary source documents are versioned using Git LFS. Disposable raw render frames and synthesis cache are reproducible and excluded. The source recordings, completed films, animation source, original artifact mirror, documents, and review evidence are included. Run `git lfs pull` after a clone that skipped smudging. Run `npm run media:check` before making playback or duration claims.

LFS storage and downloads are subject to the repository owner's GitHub plan/billing. PR checks avoid downloading the archive on every push. The manually dispatched Full media verification workflow hydrates the archive and verifies referenced media and LFS object integrity. See [GitHub's LFS documentation](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage).

No cloud keys or APIs are required to run the saved Lab, inspect source snapshots, or render existing narration. Optional voice synthesis tools have their own requirements and need user-provided credentials stored outside Git. Original legacy capture scripts are retained for provenance; use `psych-lab/production/render.mjs` or `animation-kit/capture.mjs` for the portable supported pipeline.
