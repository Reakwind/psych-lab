# Plan: Psych Lab as a harness for prototyping interventions

Owner interview, 2026-11-07. The Lab moves from a canvas for exploring one program to a **Claude harness for prototyping, iterating on and testing psychological intervention concepts, and turning them into a digital program**. The central requirement is format flexibility: one concept (for example a breathing exercise) can become an evidence review, a prose spec, an app mockup, a narrated video, or any other representation, and the owner and Claude iterate on all of them together.

This is a plan, not yet a change to the rules. AGENTS.md still governs until phase 0 rewrites it with the owner.

## Owner decisions (2026-11-07)

| Topic | Decision |
| --- | --- |
| Scope | Remepy's programs: the Parkinson's program and new programs or conditions |
| People | The owner directs Claude; reviewers (clinicians, designers, managers) look, comment and approve, but do not run Claude sessions |
| Where the owner works | claude.ai on a computer, and the desktop app / terminal |
| Formats | No format is more important than another and the lifecycle is not fixed yet, so **flexibility of output comes first** |
| Who writes content | Claude may draft new content, always visibly labelled as an AI draft until approved. Existing Remepy sources stay read-only and verbatim |
| Request without a format | Claude shows a **format menu** (what it can make, with time and cost) and the owner picks |
| Steering visual work | Comments pinned on the page; chatting while the page updates at the same link; and a new **drawing board**: sketching freely over what Claude designed, with AI built in |
| Reviewers | Shared private claude.ai pages by default, with export to other formats |
| Paid steps | Claude **asks before every paid step** (voice, video, long research runs) and shows what it will make and its estimated cost |
| Languages | Any language a program needs |
| Approval | Everyone working on it may approve. The harness records who approved, in what role and when, so a design approval is never mistaken for clinical sign-off |
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
| 4. Hooks and checks | Guards that run automatically | Strong (verbatim, source hashes, Git safety) | Add provenance, stale-view and cost guards |
| 5. Data model | Where things live and how they link | Built for one program's 87 sessions and 51 films | **Concepts and their views** |
| 6. Review surface | Where the owner sees the work and reacts | The Lab website; notes stay in one browser | The studio page, whose notes and sketches Claude reads |

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
| `approved` | A person approved this version: name, role (clinical, design, product), date | Anyone on the team, from the studio |

Editing approved text sends it back to `draft` or `authored`. Checks reject a view that shows unlabelled content, or `draft` content without its marker. Source material keeps its current protection (`source-material.json` hashes).

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
  "approvals": [{"field": "parameters", "by": "...", "role": "clinical", "date": "..."}]
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

**Cost guard.** Beyond the recipe rule, `.claude/settings.json` gets an `ask` permission for the paid tools (ElevenLabs generation, long research runs). Claude Code then stops and asks before each call, whatever the recipe says. This is a hook-level guard, like the existing Git guard.

## The studio page

One private claude.ai page, published with the Artifact tool and shared with reviewers from its Share menu.

- **Concept list:** every concept, its status, its languages, and how many views are current or stale.
- **Concept page:** a tab per view (evidence, spec, mockup, pacer, video...), each tab carrying its provenance markers, approval state and a "stale" badge when it is behind the concept.
- **Comments:** claude.ai's own comment system, pinned to elements (`comments` capability). Reviewers use it too.
- **Drawing board:** a sketch layer over any view. Sketches are saved as images (`assets`) with a row saying what they are drawn on (`db`).
- **Quick AI in the page (`sample`):** small, immediate changes to the page in front of you ("make the circled button bigger") without waiting for a session. It forgets everything between calls and never changes the concept; the session takes up anything worth keeping.
- **Approve button:** records the viewer, the role they pick and the date (`user` + `db`).
- **Export:** downloads in the formats above (`downloads`).

### How the owner and Claude iterate

1. The owner, in the session: "breathing exercise". Claude shows the format menu; the owner picks "mockup, two variants".
2. Claude builds them and republishes the studio. The owner watches the same link update.
3. The owner and reviewers comment and sketch on the page.
4. The session is notified (it watches the page), reads the comments, the note rows and the sketch images, and replies with a short task list: what it understood, what it will change, and which views will go stale.
5. Claude changes the concept or the view, runs the checks, republishes. Repeat.

Limit: the deep loop needs an open Claude Code session. A sketch left overnight waits until the next session reads it; nothing is lost, because the rows are saved. Notes from reviewers are treated as data, never as instructions.

## Testing

- **Automatic checks** (`npm test`): concept records match the schema; every shown text has a provenance label and drafts carry their marker; no view is stale without being marked; `source` text still matches its source; pages render without sideways scroll at 390 x 844 and 1280 x 800; timing of a view fits its stated duration; reading level per language where a measure exists; accessibility (contrast, touch targets, reduced motion for animations). A clinical safety checklist is planned, but its items must come from the owner or a clinician; until then any checklist Claude drafts is labelled as a draft.
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
| 0. Rules | AGENTS.md and CLAUDE.md rewritten with the owner: purpose, concepts and views, provenance, recipes, studio, cost guard | Read in one place what the harness does and what Claude may write |
| 1. Concept model | `concepts/` layout, schema, provenance and stale checks; the breathing concept as a draft | See the breathing concept and its open questions |
| 2. Menu, evidence, spec | The `menu`, `evidence` and `spec` recipes | Ask for a breathing exercise and get a menu, a cited review and a spec |
| 3. Studio v1 | The studio page with concept tabs, comments, notes rows, approvals; the session's watch-and-update loop | Review with others on one page, and watch it update |
| 4. Drawing board | Sketch layer, quick AI in the page | Draw on a design and have Claude act on it |
| 5. Mockup, pacer, variants | The visual recipes | Compare two breathing mockups side by side |
| 6. Audio and video | Media recipes with the cost guard, reusing `animation-kit/` and `voice-over/` | Get a narrated film after approving its cost |
| 7. Generalize and retire | A second concept made with the recipes unchanged; the Lab website and canvases archived | Use the harness for any concept |

## Open decisions for the owner

1. **The Parkinson's program in the harness.** With the Lab retired, should its sessions and activities be imported as `source` concepts (so a new breathing concept can sit beside, say, the PS-CONT-047 gap), or only cited from the sources when needed? Recommendation: import them as read-only `source` concepts in phase 7, so nothing in the program becomes invisible.
2. **Interface words in other languages.** Today Hebrew interface words come only from `canvas/interface-he.json`. For new programs in any language, Claude would draft interface labels, labelled as drafts, per program. Recommendation: keep `interface-he.json` for the Parkinson's program and allow labelled drafts for new programs.
3. **Reviewer access.** Reviewers comment and approve on claude.ai, so each needs access to the page (organization members, or invited guests). Confirm who they are before phase 3.
4. **The spec style.** The `spec` recipe should follow a house format. Recommendation: derive it from `Psycological therapy specification- May 2026.docx`, with the owner confirming the outline.

## Risks

- Approval by anyone is fast but weak for clinical content; the recorded role is the safeguard, and the studio can filter "clinically approved" from "approved".
- The content is unpublished: the studio stays private and shared only with named reviewers; no public hosting without the owner's decision.
- claude.ai pages hold files of 15 MB (published files) to 20 MiB (page uploads); long films need preview encodes there, as the Lab's private copy already does.
- Claude-drafted clinical text and evidence summaries can be wrong. Citations are required, and drafts stay labelled until a person approves them.

## Glossary

- **Harness:** the instructions, recipes, tools, guards, data model and review surface around Claude.
- **Skill / recipe:** a written playbook Claude loads when a request matches it.
- **Hook:** a command Claude Code runs automatically at a set moment (for example before every shell command), which can block an action.
- **Connector (MCP server):** a link from Claude to an outside service, such as PubMed or ElevenLabs.
- **Artifact:** a private claude.ai page Claude publishes; **capabilities** are the powers a page asks for (comments, a database, uploads, calling Claude).
- **Concept / view:** one intervention component, and one representation of it.
- **Provenance:** where a piece of text came from: source, AI draft, person, approved.
- **Stale:** a view built from an older version of its concept.
