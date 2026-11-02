# Full intervention prototype

Purpose: experience the sourced psychology program end to end and measure its burden within a 30-minute app day. This implementation does not shorten or reorder the clinical program.

Current workbooks: Inner Voice is built from the owner's current `sources/activity-sheets/inner voice workout.xlsx` (2026-11-02; the September snapshot in `sources/inner-voice.json` stays as it was). Its answer buttons use the sheet's own Hebrew type names (לאמץ / לשחרר), and an answered card shows its type. Daily app minutes are summed from each day's activities in `sources/activity-sheets/Protocol.xlsx`; that sheet's own light-speech total for day 7 says 23, while its listed activities add up to 25; the owner confirmed 25 is correct (2026-11-02). `tests/test_inner_voice.py` checks both against the spreadsheets.

Activities explorer (`/intervention/activities.html`, the Lab's Activities button): one page per activity with everything program.json holds for it (intro page, intro film with a link to its script check, schedule, every thought, card or reflection screen, recordings) and each gap marked 'No source text'. It writes English labels only.

Wording rule: the phone shows Hebrew only where a program source has it (titles, leads, thoughts, cards, reflection prompts and buttons). Interface words are English Lab labels in a system font, and screens whose program text is not in any source (motivation, post-practice question, in-practice breathing prompts, choice heading, Inner Voice feedback gaps, closing message) show a 'No source text' marker. `npm run verbatim -- psych-lab/intervention/app.mjs psych-lab/intervention/index.html` checks this; a test keeps it so.

Design: retain the Lab's sage teal (#2B6A62), pale mint (#F5FBF8, #B3EFE4), amber (#FFDEA3), and ink (#171D1B). Hebrew patient screens use the existing Rubik/system font stack, large text, one task per screen, and large touch controls. The desktop shell pairs a session index with a phone preview and a separate English review panel. Sources and prototype assumptions belong in the review panel.

The current V0 timeline controls the 87 psychology sessions. These are psychology session IDs, distinct from app day 1 orientation. Current pre-pages, activity copy, context tables, and trailer mappings supplement it. Choice groups select one practice; selected methods get their own introduction when new. Repeat/library visits can omit previously seen introductions. No chosen practice is replaced with its trailer.

Timing distinguishes source media duration, planned practice duration, actual screen time, and accelerated/skipped review runs. Weekly non-psychology allocations are taken from Protocol.xlsx and remain an editable comparison assumption. Missing assets remain visible gaps; silence is never reported as a sourced recording.

The original boards and 51 rendered videos remain available. Review state, favorites, notes, and run measurements are saved locally in the browser. The prototype does not write to SharePoint or the production app.


Implementation and verification:
- `build.py` compiles read-only snapshots into `program.json`; `core.mjs` owns the sequence, choice branches, and content-time ranges.
- The existing preview server exposes `/intervention/`; the Lab entry is `/?view=intervention&day=1`.
- Current product clips are used for sessions 8 and 28 because their October Hebrew scripts differ substantially from the older Lab animations. Original films are preserved.
- Asset 047 has a conflict: timeline/metadata say breathing; the current Hebrew production script is mindfulness text. The downloaded source video is available for inspection and is held out of the breathing flow.
- Four source recordings play in full: grounding 2:34, observing thoughts 5:23, safe-place imagery 5:48, guided relaxation 6:29. Guided relaxation is explicitly a draft edit.
- Eight scheduled practice recordings, five additional library-only recordings, the patient-story video, and the optional stretch video remain unavailable in the accessible source folders. Their steps remain navigable and explicitly marked.
- The optional Keep layer is off by default because finalized per-session key points were not supplied. Its preview is excluded from complete timing runs.
- Review note focus pauses measurement and media. Review skips, scrubs, missing content, and simulated audio are tracked separately. Test profiles use `?test=1` and separate local storage.
- `node --test psych-lab/intervention/core.test.mjs` passes 11 checks across all 87 sessions and all choice branches, including shared-trailer deduplication and bundled-duration uncertainty.
- Browser checks cover S03 films then breathing, S33 single-choice branching, all eight Inner Voice cards, Cardversation questions/hints/end, all Pleasant Moment stages, source audio playback, current 8/28 product clips, note-taking pause, and a 390 x 844 mobile view.
