# Psych Lab

A lab for exploring Remepy's Parkinson's psychological intervention: its scripts, activities, films and flow, quoted verbatim from the sources, inside the app's **30-minute whole-session limit**.

The repository includes **87 session flows, 51 completed narrated animation trios, source snapshots, original documents, storyboard generators, finished media, and review evidence**. Eight scheduled practice recordings have **not yet been recorded**. Missing recordings keep their planned slots and are marked. Other unresolved source/media gaps remain visible.

## See the Lab

The Lab is a responsive website ([plan and record](docs/WEBSITE_PLAN.md)). Open it from any device at its **[private claude.ai page](https://claude.ai/artifact/JxJ3F78P4PfDVpouwa3iXZ)** (visible only to its owner unless shared from the page's Share menu), or run it locally. Locally, the films and recordings play from the repository, so download them first (about 0.5 GB):

```bash
git lfs pull --include="voice-over/mp4/*-animated.mp4,psych-lab/intervention/media/*.mp3,psych-lab/intervention/media/*.mp4"
```

```bash
npm start
```

Then open http://127.0.0.1:63684. It has Home, Sessions (walk and time all 87 sessions), App (the program day by day, in Hebrew), Films & scripts and Activities, with per-page review notes saved in your browser and exported as JSON. To open it on a phone on the same Wi-Fi, run `npm start -- --lan` and use the network address it prints; anyone on that network can then open it while it runs. A page names any film or recording that is not downloaded rather than replacing it.

The Lab's earlier connected Claude Design canvases are kept as a frozen record. Start at **[Home](https://claude.ai/artifact/WAWMSHN8NVvUtk2Mp5vaW6)**, which links:

| Canvas | What it shows |
| --- | --- |
| [Original design](https://claude.ai/artifact/TddJCUmCTkkuhubb6ovHzm) | The preserved design: persona, design system, daily experience, practices and games, program rhythm, the 51 films with storyboards, Ruth's journey |
| [Activities](https://claude.ai/artifact/GfG5m5VUL9zqniG5M9FHzT) | One board per activity: intro pages, schedules, every Inner Voice thought, Cardversation card and reflection screen, the recordings |
| [Films & scripts](https://claude.ai/artifact/KkY7FBBxvJtd38pTcKNsLT) | Each film beside the script document it narrates, differences highlighted |
| [Phone preview](https://claude.ai/artifact/8NYov7M3HXKPhX49GV6WMw) | Walk and time any of the 87 sessions on a phone, as the sources sequence them, against the 30-minute planned day; the App prototype board lives the program day by day in Hebrew: each app day as Protocol.xlsx lays it out, with psychology playable and the other modules as marked slots (Today, Journey, Library, missed days, the week-13+ rhythm) |

The canvases are private to their owner until shared from each page's Share menu. They are republished only when the owner asks.

## Draw instead of describing: the sketchpad

The sketchpad lets you direct Claude's designs by drawing on them. You draw on a design in the board (on the Mac, or later an iPad), press **Send to Claude**, and a pane beside the chat in the Claude desktop app hands the marks to Claude, which changes the design; the board reloads with the result. It is a Claude Code plugin in `sketchpad/`; designs live in `studio/designs/`. Plan, setup on the Mac and what was checked: [docs/SKETCHPAD_PLAN.md](docs/SKETCHPAD_PLAN.md).

In a local Claude Code session in this folder (desktop app Code tab, or a terminal):

```text
/plugin install sketchpad --marketplace ./
```

## Build and check

Use Node.js 22+, Python 3.11+, Git LFS, and FFmpeg/FFprobe. Open in a GitHub Codespace/dev container for a ready-made Linux environment, or install the dependencies in [docs/CLOUD.md](docs/CLOUD.md).

```bash
git clone https://github.com/Reakwind/psych-lab.git
cd psych-lab
bash scripts/cloud-bootstrap.sh
```

```bash
npm start                # build the website into site/dist/ and serve it on 127.0.0.1:63684
npm run site             # build the website only
npm run canvas           # regenerate the canvas boards in canvas/<canvas>/project/
npm test                 # sequence, canvas, website, verbatim, ownership, policy, and Git safety tests
npm run check            # tracked-source syntax and credential scan
npm run media:check      # verify every referenced recording/video with FFprobe
npm run doctor           # agent readiness: tools, guards, task claim, LFS media, GitHub access
```

Canvas boards are published to their canvas with Claude's Artifact tool when the owner asks (see [AGENTS.md](AGENTS.md), "Where output goes"). PR CI uses code and LFS pointers; full media verification is an explicit workflow to avoid repeated archive downloads.

## Work autonomously

Read [AGENTS.md](AGENTS.md), [the agent workflow](docs/AGENT_WORKFLOW.md), and [cloud setup](docs/CLOUD.md). Claude Code reads [CLAUDE.md](CLAUDE.md) and repository hook settings automatically.

Every agent uses an isolated workspace, a unique task branch with a committed claim of its owned paths, and attributed commits; a readable PR is opened only when the owner asks for one. Overlapping claims fail CI; protected main requires current, passing checks. Hooks reject destructive Git operations and foreign-branch pushes. Each agent merges its own PR with `scripts/agents.py merge` once required checks are green and every review finding is handled, then starts its next task on a fresh branch with `scripts/agents.py next`.

## Project map

| Path | Contents |
| --- | --- |
| `sketchpad/` | The sketchpad plugin: the relay and drawing board (`relay/`), the mod with its pane (`hooks/`), Claude's instructions (`skills/`) and tests |
| `studio/` | Designs to draw on (`designs/`); sketch packets (`sketches/`) stay local |
| `site/` | The responsive local Lab website: generator (`build.mjs`), local server (`serve.mjs`), page styles and scripts (`src/`) and self-hosted fonts (`vendor/fonts/`) |
| `canvas/` | Canvas registry, board generator and the committed boards of each canvas |
| `psych-lab/` | Source/media audit, film-script pairing, production tools |
| `psych-lab/intervention/` | Program manifest built from the sources, session sequencing (`core.mjs`), source snapshots and media |
| `animation-kit/` | Animation code, storyboard tools, original artifact mirror, finished films |
| `voice-over/` | Hebrew voice recordings, timings, synthesis source/tools |
| Root DOCX / CSV | Original project specifications, scripts, and timeline |
| `docs/` | Architecture, cloud setup, agent workflow and task manifests |

Source hierarchy, content conflicts, and current limitations are documented in [architecture](docs/ARCHITECTURE.md). Review notes on the website are kept per page in the browser and exported as JSON; on the canvases they are comments.

Credentials, disposable frame/synthesis caches, installed dependencies, and machine logs are excluded. Finished media and original source documents use Git LFS. The repository being public does not select an open-source license; preserve existing authorship and rights notices.
