# Plan: the sketchpad (Mac, and optionally iPad)

**Status (2026-11-07): phase 1 is built (see "What was built" at the end); the rest is a draft the owner is still refining.** It changes no rules: AGENTS.md still governs. It replaces `docs/HARNESS_PLAN.md`, the earlier "harness" framing that the owner set aside.

## The problem

Today the owner directs Claude's prototypes in prose: comments or chat. The picture in the owner's head reaches Claude through a chain of translations, and each one loses something:

**the picture in the owner's head → the owner's words → Claude's reading of those words → Claude's design**

The owner has to hope it was described well and understood. The aim is to cut out the middle steps: the owner **draws, edits, uploads and speaks directly on what Claude made**, on the Mac or, optionally, on an iPad with its pencil, and Claude reads all of it and changes the design.

## Owner decisions (2026-11-07)

| Topic | Decision |
| --- | --- |
| Centre of the plan | Drawing to give Claude ideas quickly and iterate on them, inside the Claude desktop app or claude.ai or both |
| Equipment | A MacBook with the Claude desktop app. **Drawing works on the Mac on its own; the iPad with a stylus is optional** |
| Ways to give direction | Freehand sketching, direct editing, uploads (images, PDFs, video, documents), voice memos |
| Where to draw | On top of the design itself |
| Claude's response | **Just build it**: change the design straight away and show before and after; the owner corrects it if it is wrong |
| Paid steps | Claude asks before every paid step (voice, video, long research runs) |
| Safety features | None added: no new guards or blocking features |
| Content | Any language. Claude may draft new program content, labelled as a draft until approved; existing Remepy sources stay read-only and verbatim |

## How it works

Three pieces, packaged as **one plugin** installed in the Claude desktop app on the Mac:

```
 Where you draw (any of these)          MacBook: Claude desktop app, Code tab, a local session
┌──────────────────────────────┐       ┌──────────────────────────────────────────────────────┐
│ 1. THE BOARD (one web page)  │       │ 2. THE RELAY                 3. THE MOD              │
│ · in the desktop app's       │ ────► │ a small server the mod       a pane beside the chat: │
│   preview panel, on the Mac  │strokes│ starts; serves the board,    your strokes live, and  │
│ · in a Mac browser window    │packets│ saves each sketch to disk    on Send it hands the    │
│ · on the iPad (optional)     │       │                              sketch to Claude        │
│ result appears here          │ ◄──── │ serves the new version  ◄──  Claude changes the      │
└──────────────────────────────┘ new   └─────────────────────────── design files ─────────────┘
                                 version
```

1. **The board** is one web page that shows whatever Claude is designing (an app mockup, a document, a video frame) with a drawing layer on top. Because it is a web page, the same board opens wherever the owner wants to draw:
   - **On the Mac, inside the Claude desktop app:** the Code tab can show a local web page in its preview panel next to the chat, so the board, the chat and the sketch pane are all in one window. Drawing is with the trackpad or a mouse.
   - **On the Mac, in a browser window** (Safari or Chrome), if the preview panel does not suit.
   - **On the iPad (optional),** in Safari, added to the home screen so it runs full screen, with the pencil's pressure and tilt, ignoring the palm.

   A trackpad or mouse draws rougher lines than a pencil, so the board offers shape tools (box, circle, arrow, straight line, text) beside freehand. The drawing layer can come from an open-source whiteboard library (Excalidraw, MIT licence) that already has them, rather than being built from scratch. With an iPad, the owner can also switch between devices mid-sketch: both show the same board.
2. **The relay** is a small server on the Mac (Node, like the Lab's own server), started by the mod and kept running for the session. It serves the board and the design to the Mac itself and, when an iPad is used, to the iPad over the home Wi-Fi; it passes strokes on as they are drawn and saves each sketch to a folder on disk. Nothing leaves the Mac or the home network.
3. **The mod** runs inside Claude Code in the desktop app. It draws a **pane beside the chat** showing the strokes as they arrive, and, for an iPad, the address to open (as a code to scan). When the owner presses **Send** on the board, the mod hands the sketch to Claude with a prompt of its own ("sketch 12 arrived: read `sketches/12/`"). No copying, no describing.

**The fourth piece is plain instructions:** a skill shipped in the same plugin tells Claude how to read a sketch (the snapshot, which element each mark touches, what was said) and what to do: build the change, show before and after, keep the previous version.

### What one "Send" contains

Everything the owner did since the last Send, kept together as one **sketch packet** in its own folder:

| Input | Saved as | How Claude reads it |
| --- | --- | --- |
| Freehand marks | The strokes (vectors) and a snapshot of the design with the strokes drawn in | Claude looks at the snapshot image; the strokes give exact positions |
| What each mark touches | For each stroke, the element of the design under it and the design's version | Named in the packet, so "this" is never ambiguous |
| Direct edits | Element, property, before and after ("moved 40 px down", "font 18 → 24") | Claude makes the same change in the real source |
| Uploads | The files, pinned to where they were dropped | Images and PDFs directly; videos as frames taken from them |
| Voice | The recording, a transcript, and timings lined up with the pen | "This one" resolves to what the pen touched at that moment |

Claude reads rough sketches well for layout and intent ("big circle in the middle, button under it") but not as exact measurements; direct edits carry precision and voice carries intent, so the inputs work best together.

### What it needs on the Mac

- The repository cloned on the Mac, opened in a **local session** in the Code tab of the Claude desktop app (the pane does not appear in cloud sessions).
- The plugin installed in the desktop app from the repository (it can act as its own plugin marketplace).
- For the iPad only: the Mac and the iPad on the same Wi-Fi.

## What the docs say it cannot do (checked 2026-11-07)

From the mods documentation (code.claude.com/docs/en/plugins/mods/overview) and the mod reference:

- **No pane on the iPad.** The iPad's Claude app runs chats and follows sessions, but what a mod draws appears only on the computer. So the board is a web page, not a mod.
- **The pane itself is not the board.** In the desktop app a pane can take pointer input and draw vector shapes, so simple marks inside the pane are possible, but it cannot show the design underneath. Drawing *on the design* happens in the board page, in the preview panel or a browser.
- **No pane in cloud sessions.** A mod's code runs there, but nothing it draws is shown. The full experience needs a local session on the Mac.
- **A pane cannot show a web page.** It draws text, buttons and vector graphics: enough to show the strokes and controls, not to host the board itself.

## What must be tested first

These are expected to work from the documentation but have not been tried together:

1. The board in the desktop app's preview panel: drawing with the trackpad over the design, and Send.
2. On the iPad (optional): drawing with the pencil in Safari over the design, with no scrolling or zooming taking over the gesture.
3. Strokes reaching the pane on the Mac quickly enough to feel live.
4. The mod starting the relay, and handing a packet to Claude when the session is idle (and queueing it when Claude is busy).
5. The whiteboard library working inside the board, over a live design.
6. **Voice:** on the Mac, the board is served from the Mac itself (`localhost`), which browsers treat as secure, so the microphone should work there. On the iPad, Safari allows the microphone only on a secure (HTTPS) page, and a page served from the Mac over Wi-Fi is not secure by default. Options there: a local certificate trusted on the iPad (a one-time setup), or recording voice on the Mac.

Claude can write the plugin and test most of it here (the mod's own checks and tests, the board in a headless browser with simulated pen strokes). The preview panel, the pane in the desktop app, and the pencil and Wi-Fi for the iPad can only be tried by the owner on the Mac and iPad.

## Phases

Each phase is its own commit; the owner tries it on the Mac (and the iPad, where it applies) before the next starts.

| Phase | Built | The owner can then |
| --- | --- | --- |
| 1. The loop, on the Mac | Relay, a plain drawing layer over one design page, opened in the desktop app's preview panel; the pane with live strokes and Send; the skill | Draw on the Mac beside the chat and see Claude's change appear on the board |
| 1b. Add the iPad | The same board over the home Wi-Fi, with pencil input and a code to scan in the pane | Draw with the pencil on the iPad and see it on the Mac |
| 2. Board v1 | Whiteboard library, element anchors, uploads, before and after, version history | Mark up any design and go back a version in one tap |
| 3. Edits and voice | Direct editing on the board; voice memos timed with the pen | Show a change by doing it, or say it while pointing |
| 4. Psych Lab work | Use it on real work: the breathing exercise pilot as an app mockup, a pacer animation, a spec page, video frames | Shape an intervention by drawing on it |
| 5. Away from home | The same board through a private claude.ai page instead of the home Wi-Fi, for cloud sessions (no pane there; the sketch still reaches Claude) | Sketch when the Mac is not on the same network |

## What was built: phase 1 (2026-11-07)

The owner asked for phase 1. It is the plugin in `sketchpad/`, listed by the repository's marketplace file (`.claude-plugin/marketplace.json`), and one design to draw on.

| Part | Where | What it does |
| --- | --- | --- |
| Relay | `sketchpad/relay/server.mjs` | Serves the board and `studio/designs/`, on this computer only (`127.0.0.1:63690`, or the next free port). Saves each Send to `studio/sketches/<id>/` (`packet.json`, `snapshot.png`, `strokes.png`, `before/`), reloads boards when a design's files change, and reports each event to the mod. Also runs on its own: `node sketchpad/relay/server.mjs`. |
| Board | `sketchpad/relay/board/` | The design in a frame with a drawing layer: Draw and Use modes, three inks, undo, clear, a note, Send. Pen pressure where there is a pen; palm ignored once a pencil is used; trackpad scrolling moves the design while drawing. Each mark is numbered and sent with the elements it touches or encloses, and a snapshot of the whole design with the marks on it (made in the browser by html-to-image, MIT, vendored). |
| Mod | `sketchpad/hooks/register.tsx` | In a project with `studio/designs/`, starts the relay when the session starts and opens the **Sketchpad** pane: the board's address, the marks as they are drawn, the sketches sent. On Send it hands the packet to Claude as a prompt of its own. `/sketchpad` opens the pane and starts the board anywhere. |
| Skill | `sketchpad/skills/sketchpad/SKILL.md` | How Claude reads a packet (snapshot first, then the marks and what they touch), what common marks mean, and to change the design straight away and reply one line per mark. |
| First design | `studio/designs/breathing/` | A breathing-exercise mockup with a working pacer, labelled "AI draft · not from the Remepy sources". |

Sketch packets are not committed (`.gitignore`); designs are.

**Checked here:** `tests/test_sketchpad.py` (in `npm test`): the relay's files, packets, reports and refusals; a real browser drawing a loop around the breathing circle at 1280 x 800 and 390 x 844 and sending it, the packet naming `#breath-circle` and carrying a snapshot; the mod's validation and its own tests (`claude plugin test sketchpad`: the board starting, live marks, a Send handed to Claude, the pane on the terminal and desktop surfaces); the designs self-contained and labelled. The mod type-checks against the engine's types. A rehearsal of the whole loop (Send, a change to the design file, the board reloading with the sent marks cleared) passed in a browser.

**Not checked here (needs the owner's Mac):** the pane in the desktop app, the board in the desktop app's preview panel, the relay starting from the desktop app (finding Node), and the prompt arriving in a real session.

### Setting it up on the Mac

Needs Node.js 22 or later (the repository already does) and the desktop app's Claude Code 2.1.286 or later (`/status` in a Code session shows it).

1. Get this work onto the Mac. It is on the branch `claude/nifty-noether-h0tgfc` until a PR merges it:
   `git clone https://github.com/Reakwind/psych-lab.git`, then `cd psych-lab` and `git checkout claude/nifty-noether-h0tgfc`.
2. In the Claude desktop app, open the **Code** tab and start a **local** session in the `psych-lab` folder.
3. Install the plugin from the repository's own marketplace. In the session type `/plugin install sketchpad --marketplace ./` and choose "this repo only". Or, in a terminal in the folder: `claude plugin install sketchpad --marketplace ./ --scope local`. Then start a new session (or run `/reload-plugins`).
4. The **Sketchpad** pane opens beside the chat with the board's address. Open it in the desktop app's preview panel, or in a browser.
5. Draw on the breathing mockup, add a note if words help, press **Send to Claude**.

The plugin is copied into Claude Code when installed: after pulling a newer version, update it from `/plugin` (Installed → sketchpad → Update now).

## Kept from the earlier plan, for later

These ideas from `HARNESS_PLAN.md` are parked, not dropped, until the sketchpad works:

- **One concept, many views:** a concept record (for example a breathing exercise) with its evidence review, spec, mockup and video as linked views, marked stale when the concept changes.
- **Recipes:** a written playbook per format (evidence, spec, mockup, pacer, audio, video, export) and a format menu when no format is named.
- **Retiring the Lab website and canvases** once newer tools cover what they do; sources and media stay.

## Open decisions for the owner

1. **Voice on the iPad:** set up a local certificate once (voice in the board on the iPad, timed with the pen), or record voice only on the Mac?
2. **What to draw on first:** recommendation: a new breathing-exercise mockup, so phase 1 works on real Psych Lab material.

## Glossary

- **Local session:** a Claude Code session running on the owner's Mac (the Code tab of the desktop app), as opposed to a cloud session like the one that wrote this plan.
- **Plugin:** a package that adds to Claude Code; it can hold a mod, skills and more.
- **Mod:** code in a plugin that runs inside Claude Code and can draw panes beside the chat, start programs and send Claude a prompt.
- **Skill:** written instructions Claude loads when a task matches them.
- **Relay:** the small server on the Mac between the board and the mod.
- **Preview panel:** the part of the desktop app's Code tab that shows a web page running on the Mac, next to the chat.
- **Sketch packet:** everything sent with one Send: strokes, snapshot, anchors, edits, uploads, voice.
