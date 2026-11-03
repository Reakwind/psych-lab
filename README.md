# Psych Lab

A lab for exploring Remepy's Parkinson's psychological intervention: its scripts, activities, films and flow, quoted verbatim from the sources, inside the app's **30-minute whole-session limit**.

The repository includes **87 session flows, 51 completed narrated animation trios, source snapshots, original documents, storyboard generators, finished media, and review evidence**. Eight scheduled practice recordings have **not yet been recorded**. Missing recordings keep their planned slots and are marked. Other unresolved source/media gaps remain visible.

## See the Lab

The Lab is viewed in connected Claude Design canvases. Start at **[Home](https://claude.ai/artifact/WAWMSHN8NVvUtk2Mp5vaW6)**, which links:

| Canvas | What it shows |
| --- | --- |
| [Original design](https://claude.ai/artifact/TddJCUmCTkkuhubb6ovHzm) | The preserved design: persona, design system, daily experience, practices and games, program rhythm, the 51 films with storyboards, Ruth's journey |
| [Activities](https://claude.ai/artifact/GfG5m5VUL9zqniG5M9FHzT) | One board per activity: intro pages, schedules, every Inner Voice thought, Cardversation card and reflection screen, the recordings |
| [Films & scripts](https://claude.ai/artifact/KkY7FBBxvJtd38pTcKNsLT) | Each film beside the script document it narrates, differences highlighted |
| [Phone preview](https://claude.ai/artifact/8NYov7M3HXKPhX49GV6WMw) | Walk and time any of the 87 sessions on a phone, as the sources sequence them, against the 30-minute planned day; the App prototype board lives the program day by day in Hebrew (Today, Journey, Library, missed days, the week-13+ rhythm) |

The canvases are private to their owner until shared from each page's Share menu.

## Build and check

Use Node.js 22+, Python 3.11+, Git LFS, and FFmpeg/FFprobe. Open in a GitHub Codespace/dev container for a ready-made Linux environment, or install the dependencies in [docs/CLOUD.md](docs/CLOUD.md).

```bash
git clone https://github.com/Reakwind/psych-lab.git
cd psych-lab
bash scripts/cloud-bootstrap.sh
```

```bash
npm run canvas           # regenerate the canvas boards in canvas/<canvas>/project/
npm test                 # sequence, canvas, verbatim, ownership, policy, and Git safety tests
npm run check            # tracked-source syntax and credential scan
npm run media:check      # verify every referenced recording/video with FFprobe
npm run doctor           # agent readiness: tools, guards, task claim, LFS media, GitHub access
```

Boards are published to their canvas with Claude's Artifact tool (see [AGENTS.md](AGENTS.md), "Where output goes"). PR CI uses code and LFS pointers; full media verification is an explicit workflow to avoid repeated archive downloads.

## Work autonomously

Read [AGENTS.md](AGENTS.md), [the agent workflow](docs/AGENT_WORKFLOW.md), and [cloud setup](docs/CLOUD.md). Claude Code reads [CLAUDE.md](CLAUDE.md) and repository hook settings automatically.

Every agent uses an isolated workspace, a unique task branch, an early draft PR with explicit owned paths, attributed commits, and a readable final PR. Overlapping claims fail CI; protected main requires current, passing checks. Hooks reject destructive Git operations and foreign-branch pushes. Each agent merges its own PR with `scripts/agents.py merge` once required checks are green and every review finding is handled, then starts its next task on a fresh branch with `scripts/agents.py next`.

## Project map

| Path | Contents |
| --- | --- |
| `canvas/` | Canvas registry, board generator and the committed boards of each canvas |
| `psych-lab/` | Source/media audit, film-script pairing, production tools |
| `psych-lab/intervention/` | Program manifest built from the sources, session sequencing (`core.mjs`), source snapshots and media |
| `animation-kit/` | Animation code, storyboard tools, original artifact mirror, finished films |
| `voice-over/` | Hebrew voice recordings, timings, synthesis source/tools |
| Root DOCX / CSV | Original project specifications, scripts, and timeline |
| `docs/` | Architecture, cloud setup, agent workflow and task manifests |

Source hierarchy, content conflicts, and current limitations are documented in [architecture](docs/ARCHITECTURE.md). Review notes are left as comments on the canvases.

Credentials, disposable frame/synthesis caches, installed dependencies, and machine logs are excluded. Finished media and original source documents use Git LFS. The repository being public does not select an open-source license; preserve existing authorship and rights notices.
