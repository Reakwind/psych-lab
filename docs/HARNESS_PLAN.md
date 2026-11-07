# Plan: Psych Lab as a harness for prototyping interventions

Owner interview, 2026-11-07. The Lab moves from a canvas for exploring one program to a **Claude harness for prototyping, iterating on and testing psychological intervention concepts, and turning them into a digital program**. The central requirement is format flexibility: one concept (for example a breathing exercise) can become an evidence review, a prose spec, an app mockup, a narrated video, or any other representation, and the owner and Claude iterate on all of them together.

**Status: a draft the owner is still refining; not yet committed to.** It changes no rules: AGENTS.md still governs until phase 0 rewrites it with the owner.

The owner's main aim (2026-11-07): move away from directing prototypes in prose. Today the image in the owner's head reaches the agent through comments or chat, and the owner has to hope it was described well and understood. The harness lets the owner **sketch, edit, upload, write and speak** directly on what Claude made, and Claude reads all of it and iterates. See "Showing, not telling".

## Owner decisions (2026-11-07)

| Topic | Decision |
| --- | --- |
| Scope | Remepy's programs: the Parkinson's program and new programs or conditions |
| People | The owner directs Claude; reviewers (clinicians, designers, managers) look, comment and approve, but do not run Claude sessions |
| Where the owner works | claude.ai on a computer, and the desktop app / terminal |
| Formats | No format is more important than another and the lifecycle is not fixed yet, so **flexibility of output comes first** |
| Who writes content | Claude may draft new content, always visibly labelled as an AI draft until approved. Existing Remepy sources stay read-only and verbatim |
| Request without a format | Claude shows a **format menu** (what it can make, with time and cost) and the owner picks |
| Steering visual work | **The central feature.** Freehand sketching on top of the design, direct editing, uploads (images, PDFs, video, documents) and voice memos, plus comments and chat while the page updates at the same link |
| Claude's response to direction | **Just build it**: Claude changes the design straight away and shows before and after; the owner corrects it if it is wrong |
| Drawing device | An **iPad with a stylus as the input device**, drawing live into the session's page, whether the session runs on the owner's computer or in the cloud |
| Reviewers | Shared private claude.ai pages by default, with export to other formats |
| Paid steps | Claude **asks before every paid step** (voice, video, long research runs) and shows what it will make and its estimated cost |
| Languages | Any language a program needs |
| Approval | Everyone working on it may approve; the approval is kept as a simple record of who and when |
| Testing | Automatic checks, team review, and comparing variants. Real-user testing is not in scope for now |
| Existing Lab | Retired once the harness can do what it does (see "Retiring the Lab") |
| Surface | **One studio page**: a private claude.ai page holding every concept, with a tab per format, the drawing board and comments |
| Pilot | A breathing exercise, taken through every format before anything is generalized |

## What a harness is (and what this one adds)

Claude on its own is a general assistant. A harness is everything around it that makes it a specialist. It has six parts:

| Part | What it is | Today | After this plan |
| --- | --- | --- | --- |
| 1. Instructions | `AGENTS.md` / `CLAUDE.md`: what Claude knows about the job and its rules | Strong, mostly about Git safety and verbatim sources | Rewritten around concepts, views, provenance and the studio |
| 2. Recipes (skills) | Playbooks in `.claude/skills/` that Claude loads when a request matches one | None, so Claude improvises and the owner cannot predict what it will do | One recipe per format, plus the format menu |
| 3. Tools and connectors | What Claude can reach: PubMed, Consensus, bioRxiv, ClinicalTrials.gov, ElevenLabs, claude.ai pages, a browser | Connected, but nothing says when to use which | Each recipe names its tools |
| 4. Hooks and checks | Guards that run automatically | Strong (verbatim, source hashes, Git safety) | Unchanged; no new guards or blocking features (owner, 2026-11-07) |
| 5. Data model | Where things live and how they link | Built for one program's 87 sessions and 51 films | **Concepts and their views** |
| 6. Review surface | Where the owner sees the work and reacts | The Lab website; notes stay in one browser | The studio page, where the owner sketches, edits, uploads and speaks, and Claude reads it all |

The biggest single gap is part 2: without recipes, "make a breathing exercise" has no defined meaning.

## The core idea: one concept, many views

A **concept** is one intervention component with a stable ID (`breathing-paced`, say). It holds what is true about the exercise regardless of format: goal, mechanism, steps, parameters, audience, cautions, evidence links and open questions.

A **view** is one representation of a concept: an evidence review, a spec document, a mockup, an animated pacer, an audio guide, a video, slides. Every view records which concept version it was built from. When the concept changes, the harness marks views built from an older version as **stale**, and the studio shows them that way.

```
concepts/
  breathing-paced/
    concept.json           the concept record (generated pages read it; never hand-copied)
    views/
      evidence/            review with citations, from the research recipe
      spec/                prose spec (Markdown source, exports to DOCX/PDF)
      mockup/              interactive phone mockup
      pacer/               animated breathing pacer
      audio/  video/       produced media, only after a cost approval
    notes/                 owner and reviewer notes and sketches, pulled from the studio
```

### Provenance: every piece of text says where it came from

The verbatim rule generalizes into a provenance label on every content field and every view:

| Label | Meaning | Who sets it |
| --- | --- | --- |
| `source` | Quoted exactly from a Remepy source, with its source ID. Read-only, as today | The import from `sources/` |
| `draft` | Written by Claude. Shown with a visible "AI draft" marker everywhere it appears | Claude |
| `authored` | Written by a person | Whoever wrote it |
| `approved` | A person approved this version: name and date | Anyone on the team, from the studio |

Editing approved text sends it back to `draft` or `authored`. The labels are part of how views are generated, so they appear without a separate check. Source material keeps its current protection (`source-material.json` hashes).

An illustrative record (structure only; the values are placeholders, not program content):

```json
{
  "id": "breathing-paced",
  "version": 3,
  "title": {"en": {"text": "Paced breathing", "provenance": "draft"}},
  "languages": ["he", "en"],
  "steps": [{"id": "s1", "text": {"he": {"text": "...", "provenance": "draft"}}}],
  "parameters": {"inhale_s": 4, "exhale_s": 6, "cycles": 6},
  "evidence": ["views/evidence/review.md#claims"],
  "cautions": [],
  "open_questions": ["..."],
  "approvals": [{"field": "parameters", "by": "...", "date": "..."}]
}
```

## Recipes: what Claude does for each request

Each recipe is a skill file that states its inputs, its steps, the tools it uses, its checks, where its output goes and its cost. Because the playbook is written down, the owner can read what Claude will do, and change it.

| Recipe | Makes | Uses | Cost |
| --- | --- | --- | --- |
| `concept` | Creates or edits a concept record; shows what changed and which views went stale | Repository | Free |
| `menu` | The **format menu**: for a concept with no format named, lists the views that exist, what is stale, and what can be made, with time and cost | Concept record | Free |
| `evidence` | Literature review: effectiveness, for whom, delivery parameters, cautions; every claim linked to a citation | PubMed, Consensus, bioRxiv, ClinicalTrials.gov | Free; long runs ask first |
| `spec` | Prose spec in the owner's spec style, exportable to DOCX/PDF | Concept, evidence | Free |
| `mockup` | Interactive phone mockup in any language and direction (RTL for Hebrew) | The phone frame and design tokens from the Lab | Free |
| `pacer` | Animated, timed exercise (for breathing: a pacer that follows the parameters) | Browser animation | Free |
| `variants` | Two or three versions of one view side by side, with a comparison table | Any recipe above | Like the recipe |
| `audio` | Narrated guide | ElevenLabs | **Asks first** |
| `video` | Animated, narrated film | `animation-kit/`, ElevenLabs | **Asks first** |
| `export` | DOCX, PDF, slides, MP4, JSON | Document and media tools | Free |

New formats are added as new recipes. That is how the harness stays open-ended while the lifecycle is undecided.

**Paid steps.** The `audio`, `video` and long `evidence` recipes show what they will make and the estimated cost and wait for the owner's yes, as the owner decided. This is a step in the recipe, not a hook or permission block.

## Showing, not telling (the central feature)

Prose loses detail at every hand-over: **the image in the owner's head → the owner's words → Claude's reading of them → Claude's code.** The harness removes the middle steps. Everything the owner does on a design is recorded with what it was done *to*, so Claude does not have to work out what "this" or "a bit bigger" means.

### Ways to give direction (all four chosen by the owner)

| Input | What the owner does | What Claude receives |
| --- | --- | --- |
| **Freehand sketch** | Draws on a transparent layer on top of the live design (a mockup, a video frame, a document): circles, arrows, crossings-out, handwriting, rough new shapes | The strokes as vectors, a snapshot of the view with the strokes drawn in, and the element under each stroke with the view and its version |
| **Direct editing** | Drags, resizes, retypes text, picks colours on the design itself | The exact change: element, property, before and after (for example "moved 40 px down", "font 18 → 24"). Claude makes the same change in the real source |
| **Uploads** | Drops screenshots, inspiration images, PDFs, videos or documents onto the spot they refer to | The file, pinned to where it was dropped. Claude reads images and PDFs directly, videos through frames taken from them, documents as text |
| **Voice memos** | Talks while drawing or pointing ("this one... slower, and softer blue") | A transcript with timings lined up with the pen, so "this one" resolves to what the pen touched at that second |

Comments and chat stay available beside these.

Each time the owner presses **Send**, the board saves one **direction packet**: the snapshot, the strokes, the anchors, the edits, the uploads and the transcript, together, so Claude reads them as one instruction and nothing gets separated.

**Claude's response: just build it** (owner decision). Claude makes the change at once and shows the result **before and after** in the same place. Every version is kept, so going back to the previous one is one tap.

Claude reads rough sketches well for layout and intent ("big circle in the middle, button under it") but not as precise measurements. Direct editing covers precision, and voice adds intent, so the inputs work best together.

**Drawing tool.** Rather than build one, embed an open-source whiteboard library (Excalidraw, MIT licence), if it runs inside a claude.ai page (to be tested).

### The iPad as an input device

The owner's goal: draw with the stylus on an iPad while the session runs on the computer or in the cloud, and see it appear in the session.

**How it can work.** The studio is a claude.ai page, so it opens on both the iPad (Safari or the Claude app) and the computer. Its `room` capability connects everyone who has the page open at that moment: pen strokes on the iPad stream live to the page on the computer. The session that publishes the page can join the same room, so Claude can follow the drawing as it happens. On Send, the packet is saved (`db` and `assets`), so it stays even if nobody is watching. Because the link runs through the claude.ai page and not the session's machine, it works the same for a cloud session and a desktop session.

Safari gives the stylus's pressure and tilt (Pointer Events), and the board can ignore the palm while the pen is down.

**Fallback for a desktop session:** the local server (`npm start -- --lan`) serves the same board to the iPad over the home Wi-Fi, without claude.ai in between.

**What must be tested first (phase 1 spike):**

1. Drawing with the stylus inside a claude.ai page on the iPad, without the page scrolling or the app taking over the gesture.
2. How quickly strokes appear on the computer.
3. How the session joins the room, and whether a Send wakes the session or only a comment or republish does. If only those do, Send also posts a short comment that wakes it.
4. Excalidraw (or another whiteboard library) loading inside a claude.ai page.
5. Recording a voice memo in a claude.ai page on the iPad (microphone permission), and which transcription to use: the browser's own speech recognition (free) or ElevenLabs (paid, so it would ask each time under the paid-step rule).

## The studio page

One private claude.ai page, published with the Artifact tool and shared with reviewers from its Share menu.

- **Concept list:** every concept, its status, its languages, and how many views are current or stale.
- **Concept page:** a tab per view (evidence, spec, mockup, pacer, video...), each tab carrying its provenance markers, approval state and a "stale" badge when it is behind the concept.
- **Comments:** claude.ai's own comment system, pinned to elements (`comments` capability). Reviewers use it too.
- **Board on every view:** the sketch layer, direct editing, uploads and voice memos described in "Showing, not telling", on any view, from the computer or the iPad.
- **Quick AI in the page (`sample`):** small, immediate changes to the page in front of you ("make the circled button bigger") without waiting for a session. It forgets everything between calls and never changes the concept; the session takes up anything worth keeping.
- **Approve button:** records the viewer and the date (`user` + `db`).
- **Export:** downloads in the formats above (`downloads`).

### How the owner and Claude iterate

1. The owner, in the session: "breathing exercise". Claude shows the format menu; the owner picks "mockup, two variants".
2. Claude builds them and republishes the studio. The owner watches the same link update.
3. The owner sketches, edits, uploads or speaks on the page (on the computer or the iPad) and presses Send. Reviewers do the same or comment.
4. The session is notified, reads the direction packet and builds the change straight away.
5. The page shows before and after in place; the owner keeps it, goes back, or sends the next direction. Repeat.

Limit: the deep loop needs an open Claude Code session. A sketch left overnight waits until the next session reads it; nothing is lost, because the rows are saved.

## Testing

- **Automatic checks** (`npm test`), reported in the studio beside each view: concept records match the schema; stale views are marked; `source` text still matches its source; pages render without sideways scroll at 390 x 844 and 1280 x 800; timing of a view against its stated duration; reading level per language where a measure exists; accessibility (contrast, touch targets, reduced motion for animations). They report; they do not stop work.
- **Team review:** comments, sketches and approvals in the studio.
- **Variants:** the `variants` recipe, with the comparison kept as a view of the concept, so a choice and its reason are recorded.

## Retiring the Lab

The owner decided to retire the current Lab (website, canvases) once the harness covers what it does. What that means under the repository's rules:

- **Sources and media stay.** The DOCX/CSV originals, `psych-lab/intervention/sources/`, the media and the 51 films are read-only source material and are never deleted. The harness can still cite them as `source`.
- **The website and canvases are archived, not deleted:** their generators and committed boards stay in history and the links are listed as retired. This happens in the last phase, after the harness shows the pilot in every format.
- AGENTS.md's "Where output goes" section and the frozen-canvas rules are replaced in phase 0.

## Phases

Each phase is its own commit on the session branch; the owner tries it before the next one starts. After each phase, the owner can do something new:

| Phase | Built | The owner can then |
| --- | --- | --- |
| 0. Rules | AGENTS.md and CLAUDE.md rewritten with the owner: purpose, concepts and views, provenance, recipes, studio, paid-step confirmation | Read in one place what the harness does and what Claude may write |
| 1. Input spike | A small private test page: draw with the stylus on the iPad, see it on the computer, and the session receives it; the five tests above | Know which parts of the board work as planned, before building on them |
| 2. Concept model and board v1 | `concepts/` layout and the breathing concept as a draft; the studio page with freehand sketching on top of the design, uploads, Send, and before/after with versions | Draw on a breathing mockup, from the iPad, and watch Claude change it |
| 3. Direct editing and voice | Drag, resize, retype and recolour as instructions; voice memos linked to the pen | Show a change by doing it, or say it while pointing |
| 4. Menu, evidence, spec | The `menu`, `evidence` and `spec` recipes; comments and approvals in the studio | Ask for a breathing exercise and get a menu, a cited review and a spec, and mark them up the same way |
| 5. Mockup, pacer, variants | The visual recipes | Compare two breathing mockups side by side and sketch on both |
| 6. Audio and video | Media recipes that confirm cost first, reusing `animation-kit/` and `voice-over/`; sketching on video frames | Get a narrated film after approving its cost, and mark up any frame |
| 7. Generalize and retire | A second concept made with the recipes unchanged; the Lab website and canvases archived | Use the harness for any concept |

## Open decisions for the owner

1. **The Parkinson's program in the harness.** With the Lab retired, should its sessions and activities be imported as `source` concepts (so a new breathing concept can sit beside, say, the PS-CONT-047 gap), or only cited from the sources when needed? Recommendation: import them as read-only `source` concepts in phase 7, so nothing in the program becomes invisible.
2. **Interface words in other languages.** Today Hebrew interface words come only from `canvas/interface-he.json`. For new programs in any language, Claude would draft interface labels, labelled as drafts, per program. Recommendation: keep `interface-he.json` for the Parkinson's program and allow labelled drafts for new programs.
3. **Reviewer access.** Reviewers comment and approve on claude.ai, so each needs access to the page (organization members, or invited guests). Confirm who they are before phase 3.
4. **The spec style.** The `spec` recipe should follow a house format. Recommendation: derive it from `Psycological therapy specification- May 2026.docx`, with the owner confirming the outline.

5. **Voice transcription.** The browser's free speech recognition, or ElevenLabs (paid, so it would ask before each memo)? Recommendation: decide after the phase 1 spike shows how well the free one handles Hebrew.

## Technical limits

- The content is unpublished: the studio stays private and shared only with named reviewers; no public hosting without the owner's decision.
- claude.ai pages hold files of 15 MB (published files) to 20 MiB (page uploads); long films need preview encodes there, as the Lab's private copy already does.

## Glossary

- **Harness:** the instructions, recipes, tools, hooks, data model and review surface around Claude.
- **Skill / recipe:** a written playbook Claude loads when a request matches it.
- **Hook:** a command Claude Code runs automatically at a set moment (for example before every shell command), which can block an action.
- **Connector (MCP server):** a link from Claude to an outside service, such as PubMed or ElevenLabs.
- **Artifact:** a private claude.ai page Claude publishes; **capabilities** are the powers a page asks for (comments, a database, uploads, calling Claude).
- **Concept / view:** one intervention component, and one representation of it.
- **Provenance:** where a piece of text came from: source, AI draft, person, approved.
- **Stale:** a view built from an older version of its concept.
