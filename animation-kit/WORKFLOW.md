# Session films: how they are made

Each session of Ruth's program (the Parkinson's psychological program) gets one animated film with the guide's recorded voice (Nira or Ariel). The films live in the Claude Design canvas "Parkinson's Psych Lab": https://claude.ai/artifact/FxjXM8gBnVYfkijShdBQcb. Each session's board (`project/scripts/SXX.dc.html`) is a video player that Ruth's journey embeds. All 51 planned Lab films are finished. Use sessions 1–7 as the original reference for look, pacing and quality. The owner now reviews work on the connected Psych Lab canvases (Home: https://claude.ai/artifact/WAWMSHN8NVvUtk2Mp5vaW6; the films are on its Original design and Films & scripts canvases), built from this repository; read ../AGENTS.md and ../docs/AGENT_WORKFLOW.md for current ownership, Git, PR and publishing rules.

## Non-negotiables (from the user)

- **Sources of truth:** the spec docx, the timeline CSV and the scripts docx in the project folder. The scripts are final. Never invent narration, examples or claims. Thoughts, examples and labels on screen must come from the narration (or, for thought cards, from the Inner Voice game deck in `InnerVoice.dc.html`). The canvas never decides content.
- **Storyboard first, then the film.** For every session, make and save a storyboard board in the local artifact mirror before animating. The user said "a great storyboard is a must before making the animation". **Do not ask the user to approve anything, and never wait on the user.** The work runs autonomously. Review your own storyboard critically against sessions 1–7 (coherent story, sound-off test, anchors, nothing invented), then build the film.
- **The user reviews only at the very end, when every film is done.** Never ask the user to review a silent animation or loose parts. Check the frames yourself (contact sheets) and fix what's wrong. Report to the main session, not the user.
- **Coherence over pretty parts.** Each film has one central idea, one continuous world (Ruth's living room and her path) and recurring anchors that change rather than cut. A viewer with the sound off should still follow the story.
- Ruth is the character; Nira or Ariel narrates (`who:` in the board). Hebrew, right to left: on-screen text reads right to left, and the first item goes on the right.

## Folder layout (this folder, `animation-kit/`)

- `kit/shared.js`, `kit/base.css`: the shared drawing kit (Ruth, Nira, Ariel, friends, the room, the path, the backpack, tools, battery, pacer, day line, thought cards, inner voice, the profile head cutaway, and more). **Read-only for parallel sessions.** Put new helpers in your film's `src/extra.js` (`Object.assign(R, { ... })`) and `src/extra.css`; the harness includes them after the kit.
- `filmN/`: one folder per finished film, with `src/scenes.json` and `src/scene-*.js`. Read these before writing your own; `film5`, `film6` and `film7` are the most recent.
- `artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/`: the local mirror of the canvas files, and the publish root.
- `audio/`: narration files (`sXX-voice.m4a`) and pause maps (`sXX-pauses.txt`).
- `sb_common.py` plus `sb_s0X.py`: the storyboard generator and examples. `video_board.py`, `wt.py`, `sheet.py`, `build_harness.py`, `capture.mjs`: the tools.
- `boards_meta/`: per-session metadata written by `video_board.py`.

## File ownership (parallel sessions share this folder and the canvas)

- Touch only your own sessions' files: `filmXX/`, `audio/sXX-*`, `sb_sXX.py`, `boards_meta/SXX.json`, `project/scripts/SXXStory.dc.html` and `project/scripts/SXX.dc.html`.
- **Never edit** `project/canvas.json`, `Ruth.dc.html`, other boards, `kit/*`, `sb_common.py`, `build_harness.py` or another session's files. Storyboard slots already exist on the canvas for every remaining session. If `sb_common.py` lacks a sketch helper, define it inside your own `sb_sXX.py`.
- Historical Claude canvas publishing instructions (use only if a task explicitly asks to publish there): send only your own paths. Use `files: {"project/scripts/SXXStory.dc.html": ...}` and/or `SXX.dc.html`, with `root` set to the `artifact-files/79280df1-…` folder. Read the artifact first (`action: "read"`) if your session hasn't. Don't use `force`.

## Pipeline for one session (SXX)

Run everything from `animation-kit/`.

1. **Narration and timing.** Read the parts from `project/scripts/SXX.dc.html` (`times: [[start, end], ...]` and `{ t: '...' }` lines).
   - Find the audio blob id in the board (`_blob/<id>`). Download it with the Artifact tool: `action: "read"`, `url` = the canvas, `path` = the blob id, `out_dir` = `audio/`. Rename it to `audio/sxx-voice.m4a` (lower-case session id).
   - Build the pause map: `ffmpeg -hide_banner -i audio/sxx-voice.m4a -af silencedetect=noise=-35dB:d=0.2 -f null - 2>&1 | grep silence_end | awk '{printf "%.2f(%.2f) ", $5-$8, $8}' > audio/sxx-pauses.txt`
   - Word timings: `python3 -I wt.py SXX <part> <word> [<word> ...]` estimates when words are spoken, in seconds from the part's start. For counted exercises (breathing counts and similar), take exact times from the pause map, as in `film3b/src/scene-b-practice.js`.
2. **Storyboard.** Write `sb_sXX.py`, copying the structure of `sb_s05.py` / `sb_s07.py`.
   - Content: the core idea, the sound-off test, anchors, acts, and one rough SVG frame per narration part with On screen / Carries over / Transition.
   - Run it to write `project/scripts/SXXStory.dc.html`.
   - Set the preview height: render with headless Chrome (see "Checks"), measure the content height, and put it in `data-props` `$preview.height` (the canvas slot is 8200 tall).
   - Publish only that file. Check it yourself (render it, look at every frame), then go straight on to the film; don't wait for anyone.
3. **Scenes.** Create `filmXX/src/`:
   - `ln -s ../../kit/shared.js filmXX/src/shared.js` and `ln -s ../../kit/base.css filmXX/src/base.css`
   - `scenes.json`: ids and durations. Usually one scene per narration part; group parts into one scene when a shot must not cut (as the 3b breathing practice did). Durations must add up to the narration length.
   - One `scene-<id>.js` per scene: `kit.scene(id, { init(kit) {...}, render(t) {...} })`, using `kit.seg/eo/eio/eob/lerp`, `R.refs`, `R.place` / `R.put` for HTML tags and cards.
   - Put each beat on the word it illustrates, using the `wt.py` times.
4. **Build and check.** `python3 -I build_harness.py filmXX`, then `node capture.mjs "$PWD/filmXX/harness.html" filmXX/st stills <t1,t2,...>` (two or more stills per scene), then `python3 -I sheet.py filmXX/st filmXX/sheet 16`. Look at every sheet and fix, then repeat.
5. **Render.** Run in the background:
   - `node capture.mjs "$PWD/filmXX/harness.html" filmXX/frames video 30`
   - `ffmpeg -y -loglevel error -framerate 30 -i filmXX/frames/f%05d.jpg -i audio/sxx-voice.m4a -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -c:a aac -b:a 128k -shortest -movflags +faststart filmXX/sxx-full.mp4`
   - Then sample a few frames from the MP4 to confirm, and delete `filmXX/frames` (it's large).
   - **Required before publishing:** `python3 -I verify_film.py filmXX filmXX/sxx-full.mp4 16`. It must print an empty `bad` list. Two renders once picked the same debugging port and filmed each other's pages; `capture.mjs` is now guarded against that, and the check proves the MP4 is this film.
6. **Publish.**
   - Upload the MP4 to the canvas as an asset (`asset: true`, `url` = the canvas, `file_path` = the MP4), which gives `/_blob/<id>`.
   - Run `python3 -I video_board.py SXX /_blob/<id>` to rebuild `SXX.dc.html` as the video player.
   - Publish `SXX.dc.html`.
   - Copy the MP4 to `../voice-over/mp4/SXX-animated.mp4`.

## Checks before anything reaches the user (lessons from sessions 1–7)

- **Readable at phone size.** The video shows at about 342 px wide, so 1080 px frames shrink to about a third. Keep tags at 32 px or more, thought cards at 34 px or more, and large icons.
- **No labels on faces or over each other.** Stagger or move them, and keep them inside the frame (a tag is about 30 px of padding plus its text).
- **No stray dots.** A path drawn with `stroke-dasharray` and round caps shows dots at length 0, so hide it (opacity 0) until it starts drawing.
- **The frame is always covered.** Camera pans and zooms must not leave background strips. No empty halves of the frame.
- **Recurring characters and anchors stay consistent** with sessions 1–7: Ruth's room, the path of stones, the backpack and tool badges, the battery (energy), the day line (time and pills), the circle of attention, thought cards and arm's length, the inner voice, and the head cutaway.
- **Check every scene in stills,** then sample the encoded MP4. The film's length must match the narration (`ffprobe`).

## Checks (commands)

- Storyboard height: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=2600,9000 --virtual-time-budget=4000 --screenshot=/tmp/sbXX.png "file://$PWD/artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/SXXStory.dc.html"`. Crop and look at it in parts (ffmpeg `crop=2600:2700:0:Y,scale=1300:-1`).
- Two Chrome renders at once are fine. Keep it to one full-video render per session at a time.

## Lessons from the parallel batches (main-session review)

- **Keep Ruth's world vivid.** Don't wash the whole room behind a heavy veil while badges or cards are on screen. S58 used a 55% veil for long stretches, which made Ruth and the room look faded and lifeless. A dimming layer may go to about 0.28 opacity, at most, and only while the foreground needs it. Better still, clear space and place the foreground items where they don't need a veil.
- **Nothing half-cut at the frame edges.** Strips and badges sliding in or out should be fully off-frame when they aren't in use, not parked half-visible at the top edge.
- **Folder names:** `film<id>` with the id as written in the session id, without the S and without leading-zero changes: `film8`, `film33a`, `film99`.
- **No user contact at all.** No questions and no wrap-up box asks. Report to the main session only.
- **Ruth stays readable.** On a 342 px phone screen, Ruth drawn at about 0.3 scale (tiny on a distant stone, or a dot on a day line) is barely visible. Keep her at roughly 0.5 scale or larger for any shot that lasts, and don't leave frames mostly empty.
