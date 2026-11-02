# Psych Lab

An interactive preview and animation workshop for Remepy's Parkinson's psychological intervention. Experience the sourced intervention end to end, measure its duration within the app's **30-minute whole-session limit**, and record UX notes before deciding where to cut.

The repository includes **87 session flows, 51 completed narrated animation trios, source snapshots, original documents, storyboard generators, finished media, and review evidence**. Eight scheduled practice recordings have **not yet been recorded**. Simulations retain their planned slots and are explicitly excluded from complete-experience timing. Other unresolved source/media gaps remain visible.

## Run the Lab

Use Node.js 22+, Python 3.11+, Git LFS, and FFmpeg/FFprobe. Open in a GitHub Codespace/dev container for a ready-made Linux environment, or install the dependencies in [docs/CLOUD.md](docs/CLOUD.md).

```bash
git clone https://github.com/Reakwind/psych-lab.git
cd psych-lab
bash scripts/cloud-bootstrap.sh
npm start
```

Open **http://127.0.0.1:63684/?view=intervention&day=1**. In a cloud environment run `npm run start:cloud` and forward port **63684**. Git LFS must hydrate the media; tiny pointer files cannot play.

```bash
npm test                 # sequence, ownership, policy, and Git safety tests
npm run check            # tracked-source syntax and credential scan
npm run media:check      # verify every referenced recording/video with FFprobe
npm run doctor           # agent readiness: tools, guards, task claim, LFS media, GitHub access
```

PR CI uses code and LFS pointers; full media verification is an explicit workflow to avoid repeated archive downloads.

## Work autonomously

Read [AGENTS.md](AGENTS.md), [the agent workflow](docs/AGENT_WORKFLOW.md), and [cloud setup](docs/CLOUD.md). Claude Code reads [CLAUDE.md](CLAUDE.md) and repository hook settings automatically.

Every agent uses an isolated workspace, a unique task branch, an early draft PR with explicit owned paths, attributed commits, and a readable final PR. Overlapping claims fail CI; protected main requires current, passing checks. Hooks reject destructive Git operations and foreign-branch pushes. Each agent merges its own PR with `scripts/agents.py merge` once required checks are green and every review finding is handled, then starts its next task on a fresh branch with `scripts/agents.py next`.

## Project map

| Path | Contents |
| --- | --- |
| `psych-lab/` | Local server, session viewer, audit, production tools |
| `psych-lab/intervention/` | Full sourced intervention, timing/review UI, program manifest |
| `animation-kit/` | Animation code, storyboard tools, original artifact mirror, finished films |
| `voice-over/` | Hebrew voice recordings, timings, synthesis source/tools |
| Root DOCX / CSV | Original project specifications, scripts, and timeline |
| `docs/` | Architecture, cloud setup, agent workflow and task manifests |

Source hierarchy, content conflicts, and current limitations are documented in [architecture](docs/ARCHITECTURE.md). Browser review notes are saved in that browser's local storage; export review JSON to hand them off. They do not sync through Git automatically.

Credentials, disposable frame/synthesis caches, installed dependencies, and machine logs are excluded. Finished media and original source documents use Git LFS. The repository being public does not select an open-source license; preserve existing authorship and rights notices.
