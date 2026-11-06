# Plan: the responsive local Lab website

Owner decision, 2026-11-06: turn the Lab into a responsive website hosted locally for now. It becomes the owner's main review surface. The Claude Design canvases stay as they are and are updated only when the owner asks.

## Decisions (owner, 2026-11-06)

1. **Website first, canvases frozen.** The site is the main review surface. The canvases keep their current boards; `canvas/build.mjs --check` and `tests/test_canvas.py` keep passing so they stay reproducible, but they are republished only on request.
2. **Original design canvas: linked, not copied.** The site links to it. Its boards are fixed-size Design components, so showing them inside the site would not be responsive, and changing that canvas needs the owner's agreement.
3. **Review notes: per page, in the browser, with JSON export.** As the retired local site did. They do not follow the owner between devices.
4. **Loopback by default, `--lan` for a real phone.** `npm start` serves on `127.0.0.1` only; `npm start -- --lan` also listens on the local network so the owner can open the site on a phone on the same Wi-Fi.

## Why a new renderer

The canvas boards cannot simply be served. They have fixed sizes (760 × 1240, 880 × 844 and so on), they need the Design canvas runtime (`dc-runtime.js`, which loads React and Babel from a CDN), and their media points at canvas uploads (`/_blob/...`). The data underneath them is independent of the canvases: `psych-lab/intervention/program.json`, `psych-lab/film-scripts.json`, the films' narration record, `canvas/interface-he.json` and the sequencing in `psych-lab/intervention/core.mjs`. The site reads the same files, so the verbatim rule holds for both.

## Approach

A static site generator and a small local server, without a framework. This matches the repository (two pinned dev dependencies), lets `scripts/verbatim.py` check every generated page, and produces static files that can be hosted elsewhere later.

```
site/
  build.mjs     reads the repository data → site/dist/ (not committed; rebuilt by npm start)
  serve.mjs     dependency-free Node server: dist/ plus repository media
  src/          responsive CSS, page templates, vanilla JS players
  vendor/       self-hosted fonts (open licences only), so the site works offline
```

- **Shared content layer.** What to show (session steps, activity sections, film/script pairs, missing-source markers) moves out of `canvas/build.mjs` into one module both outputs use. `node canvas/build.mjs --check` must stay green throughout: the canvases do not change.
- **Media.** The server maps the media URLs that `program.json` names to the repository files and answers byte-range requests (video seeking; Safari needs them). A file Git LFS has not downloaded shows a visible "media not downloaded" marker. The site needs the 51 films (`voice-over/mp4/`, the files the audit in `psych-lab/status.json` names) and the MP3/MP4 recordings, about 0.5 GB instead of the full 1.3 GB:
  `git lfs pull --include="voice-over/mp4/*-animated.mp4,psych-lab/intervention/media/*.mp3,psych-lab/intervention/media/*.mp4"`.
  PS-CONT-013 and PS-CONT-047 play their originals; the canvases' 15 MB per-file limit does not apply.
- **Commands.** `npm run site` builds; `npm start` builds and serves at `http://127.0.0.1:63684` (the retired site's port); `npm start -- --lan` for a phone on the same network.
- **Same text rules as the canvases** (AGENTS.md): program content verbatim with its source ID, gaps shown as gaps, the Lab interface in English, Hebrew interface words on the phone prototype only from `canvas/interface-he.json`.

## Pages

| Page | Phone (390 px) | Desktop (≥ 1280 px) |
| --- | --- | --- |
| Home | Counts and section links, stacked | Grid |
| Films & scripts (51) | Video on top; script, narration and differences as tabs | Video beside the script, differences highlighted |
| Activities (one page per current canvas board) | Filter chips by kind and theme; tables become stacked rows | Index sidebar, full tables |
| Sessions (87, timed) | The player fills the screen | 390 × 844 phone frame with the timing panel beside it |
| App prototype (Hebrew, RTL) | Full screen, as the app | Phone frame with day and missed-day controls beside it |
| PS-CONT-047 | Its own page, held out of the breathing flow | Same |
| Original design | Link to its canvas | Same |

Across all pages: mobile-first CSS; Hebrew keeps `dir="rtl"` and `lang="he"`; touch targets of at least 44 px; safe-area insets; video plays inline; the breathing animation respects `prefers-reduced-motion`. Timing runs stay in browser storage with a JSON export, as on the phone board.

## Phases

Each phase is its own commit on the session branch; the owner checks each one in a running server.

0. **Rules.** AGENTS.md, CLAUDE.md, README, ARCHITECTURE and CLOUD say the site exists and is the main review surface; the dev container forwards its port.
1. **Shared content layer** pulled out of `canvas/build.mjs`; canvas output byte-identical.
2. **Skeleton.** Server, build, layout, navigation, design tokens copied unchanged from the original `ui.css`, Home page.
3. **Films & scripts.** Simple pages, heavy on media, so they prove the media path first.
4. **Activities.**
5. **Sessions player.** Port `canvas/phone-logic.js` and `canvas/flow-markup.html` to vanilla JS. The largest piece.
6. **App prototype.** Port `canvas/app-logic.js`, reusing the phase 5 step players.
7. **Tests.** `tests/test_site.py`: the build is repeatable; every generated page passes `scripts/verbatim.py` (film pages with `--narration`); every media reference resolves to a repository file; in a browser at 390 × 844 and 1280 × 800 there is no horizontal scroll, a session can be walked and video seeks. Every page is rendered at both sizes and looked at before it is reported done.

## Later hosting

The output is static, so it can move to a host later (Cloudflare is connected to the owner's sessions). The 23 MB PS-CONT-013 original is close to Cloudflare's 25 MiB static-asset limit, and this is unpublished program content: any hosted copy needs sign-in protection (for example Cloudflare Access), not a public URL. Hosting is a separate owner decision.
