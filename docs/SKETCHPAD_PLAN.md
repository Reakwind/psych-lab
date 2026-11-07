# Plan: the iPad sketchpad

**Status: a draft the owner is still refining (2026-11-07).** It changes no rules: AGENTS.md still governs. It replaces `docs/HARNESS_PLAN.md`, the earlier "harness" framing that the owner set aside.

## The problem

Today the owner directs Claude's prototypes in prose: comments or chat. The picture in the owner's head reaches Claude through a chain of translations, and each one loses something:

**the picture in the owner's head → the owner's words → Claude's reading of those words → Claude's design**

The owner has to hope it was described well and understood. The aim is to cut out the middle steps: the owner **draws, edits, uploads and speaks directly on what Claude made**, with an iPad and its pencil, and Claude reads all of it and changes the design.

## Owner decisions (2026-11-07)

| Topic | Decision |
| --- | --- |
| Centre of the plan | Drawing on an iPad to give Claude ideas quickly and iterate on them, inside the Claude desktop app or claude.ai or both |
| Equipment | A MacBook with the Claude desktop app, and an iPad with a stylus |
| Ways to give direction | Freehand sketching, direct editing, uploads (images, PDFs, video, documents), voice memos |
| Where to draw | On top of the design itself |
| Claude's response | **Just build it**: change the design straight away and show before and after; the owner corrects it if it is wrong |
| Paid steps | Claude asks before every paid step (voice, video, long research runs) |
| Safety features | None added: no new guards or blocking features |
| Content | Any language. Claude may draft new program content, labelled as a draft until approved; existing Remepy sources stay read-only and verbatim |

## How it works

Three pieces, packaged as **one plugin** installed in the Claude desktop app on the Mac:

```
 iPad (pencil)                       MacBook: Claude desktop app, Code tab, a local session
┌────────────────────────┐   home   ┌───────────────────────────────────────────────────────┐
│ 1. THE BOARD           │   Wi-Fi  │ 2. THE RELAY                 3. THE MOD               │
│ a web page in Safari   │ ───────► │ a small server the mod       a pane beside the chat:  │
│ Claude's design under  │ strokes, │ starts; serves the board,    your strokes live, and   │
│ the pen; draw, edit,   │ packets  │ saves each sketch to disk    on Send it hands the     │
│ drop files, speak      │          │                              sketch to Claude         │
│ result appears here    │ ◄─────── │ serves the new version  ◄──  Claude changes the       │
└────────────────────────┘ new      └──────────────────────────── design files ─────────────┘
                           version
```

1. **The board** is a web page the iPad opens in Safari (added to the home screen, it runs full screen). It shows whatever Claude is designing (an app mockup, a document, a video frame) with a drawing layer on top. A web page is the only thing that takes the pencil's input with pressure and tilt and ignores the palm. The drawing layer can come from an open-source whiteboard library (Excalidraw, MIT licence) rather than being built from scratch.
2. **The relay** is a small server on the Mac (Node, like the Lab's own server), started by the mod and kept running for the session. It serves the board and the design to the iPad over the home Wi-Fi, passes strokes on as they are drawn, and saves each sketch to a folder on disk. Nothing leaves the home network.
3. **The mod** runs inside Claude Code in the desktop app. It draws a **pane beside the chat** showing the strokes as they arrive, and the address the iPad opens (as a code to scan). When the owner presses **Send** on the iPad, the mod hands the sketch to Claude with a prompt of its own ("sketch 12 arrived: read `sketches/12/`"). No copying, no describing.

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
- The Mac and the iPad on the same Wi-Fi.

## What the docs say it cannot do (checked 2026-11-07)

From the mods documentation (code.claude.com/docs/en/plugins/mods/overview) and the mod reference:

- **No pane on the iPad.** The iPad's Claude app runs chats and follows sessions, but what a mod draws appears only on the computer. So the board is a web page, not a mod.
- **No pane in cloud sessions.** A mod's code runs there, but nothing it draws is shown. The full experience needs a local session on the Mac.
- **A pane cannot show a web page.** It draws text, buttons and vector graphics: enough to show the strokes and controls, not to host the board itself.

## What must be tested first

These are expected to work from the documentation but have not been tried together:

1. Drawing with the pencil in Safari over the design, with no scrolling or zooming taking over the gesture.
2. Strokes reaching the pane on the Mac quickly enough to feel live.
3. The mod starting the relay, and handing a packet to Claude when the session is idle (and queueing it when Claude is busy).
4. The whiteboard library working inside the board, over a live design.
5. **Voice:** Safari allows the microphone only on a secure (HTTPS) page, and a page served from the Mac over Wi-Fi is not secure by default. Options: a local certificate trusted on the iPad (a one-time setup), or recording voice in the Claude app instead.

Claude can write the plugin and test most of it here (the mod's own checks and tests, the board in a headless browser with simulated pen strokes). The pencil, the Wi-Fi and the pane in the desktop app can only be tried by the owner on the Mac and iPad.

## Phases

Each phase is its own commit; the owner tries it on the Mac and iPad before the next starts.

| Phase | Built | The owner can then |
| --- | --- | --- |
| 1. The loop | Relay, a plain drawing layer over one design page, the pane with live strokes and Send, the skill | Draw on the iPad, watch it appear beside the chat, and see Claude's change come back to the iPad |
| 2. Board v1 | Whiteboard library, element anchors, uploads, before and after, version history | Mark up any design and go back a version in one tap |
| 3. Edits and voice | Direct editing on the board; voice memos timed with the pen | Show a change by doing it, or say it while pointing |
| 4. Psych Lab work | Use it on real work: the breathing exercise pilot as an app mockup, a pacer animation, a spec page, video frames | Shape an intervention by drawing on it |
| 5. Away from home | The same board through a private claude.ai page instead of the home Wi-Fi, for cloud sessions (no pane there; the sketch still reaches Claude) | Sketch when the Mac is not on the same network |

## Kept from the earlier plan, for later

These ideas from `HARNESS_PLAN.md` are parked, not dropped, until the sketchpad works:

- **One concept, many views:** a concept record (for example a breathing exercise) with its evidence review, spec, mockup and video as linked views, marked stale when the concept changes.
- **Recipes:** a written playbook per format (evidence, spec, mockup, pacer, audio, video, export) and a format menu when no format is named.
- **Retiring the Lab website and canvases** once newer tools cover what they do; sources and media stay.

## Open decisions for the owner

1. **Voice on the iPad:** set up a local certificate once (voice in the board, timed with the pen), or record voice separately?
2. **What to draw on first:** recommendation: a new breathing-exercise mockup, so phase 1 works on real Psych Lab material.

## Glossary

- **Local session:** a Claude Code session running on the owner's Mac (the Code tab of the desktop app), as opposed to a cloud session like the one that wrote this plan.
- **Plugin:** a package that adds to Claude Code; it can hold a mod, skills and more.
- **Mod:** code in a plugin that runs inside Claude Code and can draw panes beside the chat, start programs and send Claude a prompt.
- **Skill:** written instructions Claude loads when a task matches them.
- **Relay:** the small server on the Mac between the iPad and the mod.
- **Sketch packet:** everything sent with one Send: strokes, snapshot, anchors, edits, uploads, voice.
