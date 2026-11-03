# Project and source map

The Lab is viewed in connected Claude Design canvases (Home, Original design, Activities, Films & scripts, Phone preview), registered in `canvas/canvases.json`. `canvas/build.mjs` generates every board on the generated canvases from `psych-lab/intervention/program.json`, `psych-lab/film-scripts.json` and the films' narration record (`voice-over/elevenlabs/prepped-all.json`), using `core.mjs` for sequencing; the committed boards in `canvas/<canvas>/project/` are what is published. Media plays from assets uploaded to each canvas. `psych-lab/audit.py` still builds the source/media audit (`status.json`) used by the production tools.

The original artifact mirror lives under `animation-kit/artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/`. Its runtime, canvas, source boards, Hebrew scripts and 51 completed narrated films are preserved. Generated film sources and storyboards live in `animation-kit/film*/`, `boards_meta/`, and `sb_*.py`. The portable renderer streams frames to FFmpeg, retains the original narration, and uses isolated browser instances. Never render different agents' films into the same output files.

The full intervention lives in `psych-lab/intervention/`. `program.json` is the checked-in runtime manifest; `build.py` derives it from source snapshots, the Lab audit, and real media durations. `core.mjs` handles sourced session/choice sequencing and duration ranges; the Phone preview canvas walks the sessions it sequences, and its App prototype board (`canvas/app-logic.js`, `canvas/app-markup.html`) lays the same sessions out day by day with a practice library, sharing the Phone board's step players (`canvas/flow-markup.html`, `canvas/phone-logic.js`). Its phone is in Hebrew: program text from the sources, and interface words (tabs, buttons, status words) from `canvas/interface-he.json`, an owner-approved register in which every label quotes one whole text piece of an original design board; `scripts/verbatim.py` verifies each label and accepts it on a board only as a whole run. `core.test.mjs` checks the 87 sessions, choices, deduplication, source conflicts, and explicit media gaps. Review notes are canvas comments.

## Source precedence

The owner asked for current Remepy SharePoint/OneDrive sources, and the local snapshots retain source URLs, names and modification dates. `psych-lab/intervention/sources/` and `psych-lab/intervention-audit/sources/` preserve the consulted material. Read the audit and source metadata rather than assuming a filename's authority.

Current production scripts and the active daily schedule define content and order where they supersede older originals. Root specification/scripts DOCX and timeline CSV remain original project evidence and animation history. Current Product clips PS-CONT-013 and PS-CONT-029 are used for sessions 28 and 8 respectively where the old Lab script differs materially. All 51 old films remain available for comparison. Do not silently replace content because the visual canvas, an old file, or a generated manifest disagrees with a newer authored source.

PS-CONT-047 has a source ID conflict: metadata says a breathing introduction while the current Hebrew source video/script is mindfulness and strongly overlaps old S28. The supplied source video is preserved for inspection and held out of the scheduled breathing flow. It must not be substituted with box breathing or treated as resolved without source confirmation.

## Current incompleteness

- Four practice recordings are available: grounding, observing, safe place, and guided relaxation. Guided relaxation is marked draft/not finalized in the supplied production source.
- Eight scheduled recordings have not yet been recorded: PMR (067), breath awareness (070), body scan (071), self-compassion (074), I am enough (103), and pocket tools (104–106). Owner confirmation: 2026-11-02. Timing simulations are clearly labeled.
- Five additional library-only recordings (066, 069, 077, 078, 110) were not supplied; their recording status is not confirmed.
- Patient stories PS-CONT-010 and optional stretch DA-CONT-063 are absent. PS-CONT-047 remains conflicted. Optional Keep copy is not finalized and is off by default.

Timing uses actual recorded durations where possible and explicit ranges/slots elsewhere. Some planned practice minutes may already include the introduction; preserve both estimates instead of counting it twice. Whole-app estimates include source nonpsychological time and do not prove the entire product fits 30 minutes. Skipped or simulated flows are excluded from complete-experience measurements. Do not change the clinical program to make the preview fit.

`psych-lab/intervention/implementation-status.json`, `BUILD_NOTES.md`, audit data, and production review evidence capture the current implementation state. Secrets and local runtime caches are excluded from the public repository; this does not alter the clinical source snapshots.
