#!/usr/bin/env node
// Builds the responsive local Psych Lab website (docs/WEBSITE_PLAN.md) into site/dist/.
// Everything it shows comes from canvas/content.mjs, the content layer the canvas boards use, so program
// text (Hebrew) is only ever copied from the verified repository data, never written, joined or shortened
// here. Interface words are English Lab labels, except the app prototype's Hebrew interface words, which
// come from canvas/interface-he.json. Media plays from the repository files; a file Git LFS has not
// downloaded is listed as missing on the page that needs it, never replaced.
//
//   node site/build.mjs              write site/dist/
//   node site/build.mjs --out DIR    write somewhere else (tests)
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {time, introClip, reflectionType, read, P, FS, kindNames, KINDS, THEMES, isFilm, shownActivities, sessionsFor, scheduleTags,
  unscheduledNote, issueNotes, sourceNames, thoughtSheet, filmIds, filmLines, stats as labStats, sourceGaps, HELD_OUT_047, phoneData, appData} from '../canvas/content.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const outArg = process.argv.indexOf('--out');
const OUT = outArg > 0 && process.argv[outArg + 1] ? path.resolve(process.argv[outArg + 1]) : path.join(HERE, 'dist');
// The output folder is deleted and rewritten, so it must be a build folder: never the repository, a folder
// holding it, or a folder inside it other than site/dist; an existing folder elsewhere must be a previous build.
{
  const inside = (dir, root) => dir === root || dir.startsWith(root + path.sep);
  const ok = OUT === path.join(HERE, 'dist') || (!inside(OUT, ROOT) && !inside(ROOT, OUT) && (!fs.existsSync(OUT) || fs.readdirSync(OUT).length === 0 || fs.existsSync(path.join(OUT, 'media.json'))));
  if (!ok) { console.error(`Refusing to replace ${OUT}: --out must be a new or empty folder, or an earlier site build, outside the repository.`); process.exit(1); }
}
const REG = read('canvas/canvases.json');
const AUDIT = read('psych-lab/status.json');
const UI_CSS = 'animation-kit/artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/ui.css';
const text = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const MEDIA_PULL = 'git lfs pull --include="voice-over/mp4/*-animated.mp4,psych-lab/intervention/media/*.mp3,psych-lab/intervention/media/*.mp4"';

// ---------- helpers ----------
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const he = (tag, t, cls = '') => `<${tag} class="he${cls ? ' ' + cls : ''}" dir="rtl" lang="he">${esc(t)}</${tag}>`;
const en = (tag, t, cls = '') => `<${tag}${cls ? ` class="${cls}"` : ''}>${esc(t)}</${tag}>`;
const noSource = what => `<p class="gap"><strong>No source text</strong> · ${esc(what)}</p>`;
const link = (href, t, cls = '') => `<a href="${esc(href)}"${cls ? ` class="${cls}"` : ''}${href.startsWith('https://') ? ' target="_blank" rel="noopener"' : ''}>${esc(t)}</a>`;
const jsData = value => JSON.stringify(value).replace(/<\/(script)/gi, '<\\/$1').replace(/[\u2028\u2029]/g, c => '\\u' + c.charCodeAt(0).toString(16));
// A repository path whose folder names may be Hebrew: each segment is isolated so they read in order, left to right.
const pathHtml = p => p.split('/').map((seg, i, all) => {
  const dot = i === all.length - 1 ? seg.lastIndexOf('.') : -1;
  return `<span class="path-seg">${dot > 0 ? `<bdi>${esc(seg.slice(0, dot))}</bdi>${esc(seg.slice(dot))}` : `<bdi>${esc(seg)}</bdi>`}</span>`;
}).join('/');
const plural = (n, one, many = one + 's') => `${n} ${n === 1 ? one : many}`;

// ---------- media: repository files, served by site/serve.mjs from the list written to media.json ----------
const LFS = 'version https://git-lfs.github.com/spec/v1';
const served = new Map();   // URL -> repository path
let pageMissing = null;     // repository paths a page needs that Git LFS has not downloaded
function place(repoPath) {
  if (!repoPath) return null;
  const abs = path.join(ROOT, repoPath);
  if (!fs.existsSync(abs)) return null;
  const fd = fs.openSync(abs, 'r'), head = Buffer.alloc(LFS.length);
  fs.readSync(fd, head, 0, head.length, 0);
  fs.closeSync(fd);
  if (head.toString('utf8') === LFS) { if (pageMissing) pageMissing.add(repoPath); return null; }
  const url = '/media/' + repoPath.split('/').map(encodeURIComponent).join('/');
  served.set(url, repoPath);
  return url;
}
// The audit (psych-lab/status.json) names each film's finished video; program.json names source media as /intervention/media/...
const FILM_FILE = Object.fromEntries(AUDIT.sessions.map(s => [s.id, s.animation_path]));
const programFile = url => (url && url.startsWith('/intervention/') ? 'psych-lab' + url : null);
const filmUrl = id => place(FILM_FILE[id]);
const SITE_MEDIA = {clip: clip => ({url: isFilm(clip.id) ? filmUrl(clip.id) : place(programFile(clip.url)), preview: false}),
  audio: url => place(programFile(url))};

function missingBanner(missing) {
  if (!missing.size) return '';
  return `<p class="banner" role="status"><strong>${plural(missing.size, 'media file')} on this page ${missing.size === 1 ? 'is' : 'are'} not downloaded on this computer</strong>, so ${missing.size === 1 ? 'it shows' : 'they show'} as missing. To play ${missing.size === 1 ? 'it' : 'them'}, run <code>${esc(MEDIA_PULL)}</code> and restart <code>npm start</code>.</p>`;
}

// ---------- page shell ----------
const NAV = [['/', 'Home'], ['/sessions/', 'Sessions'], ['/app/', 'App'], ['/films/', 'Films'], ['/activities/', 'Activities']];
const PAGES = new Map();    // output path -> html

function page({file, title, section, body, css = [], scripts = [], cls = 'page', missing = new Set(), description = '', bannerAfter = false}) {
  const nav = NAV.map(([href, label]) => `<a href="${href}"${href === section ? ' aria-current="page"' : ''}>${esc(label)}</a>`).join('');
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#F5FBF8">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Ccircle cx=%2216%22 cy=%2216%22 r=%2214%22 fill=%22%232B6A62%22/%3E%3Ccircle cx=%2216%22 cy=%2216%22 r=%227%22 fill=%22%23B3EFE4%22/%3E%3C/svg%3E">
<title>${esc(title)} · Psych Lab</title>
${description ? `<meta name="description" content="${esc(description)}">\n` : ''}<link rel="stylesheet" href="/assets/fonts/fonts.css">
<link rel="stylesheet" href="/assets/ui.css">
<link rel="stylesheet" href="/assets/site.css">
${css.map(c => `<link rel="stylesheet" href="${c}">`).join('\n')}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-head">
<a class="brand" href="/">Psych Lab</a>
<nav class="site-nav" aria-label="Lab sections">${nav}</nav>
<button class="notes-btn" type="button" data-notes-toggle aria-expanded="false" aria-controls="notes">Notes</button>
</header>
<aside class="notes" id="notes" hidden aria-label="Review notes for this page">
<h2>Notes on this page</h2>
<p class="meta">Kept in this browser only. Export to hand them on.</p>
<textarea aria-label="Your notes on this page"></textarea>
<div class="row-btns"><button class="pbtn primary" type="button" data-notes-export>Export all notes (JSON)</button><button class="pbtn" type="button" data-notes-close>Close</button></div>
<p class="meta" data-notes-status></p>
</aside>
<main id="main" class="${cls}">
${bannerAfter ? '' : missingBanner(missing)}${body}${bannerAfter ? missingBanner(missing) : ''}
</main>
<footer class="site-foot">
<p>Program text is quoted verbatim from the source files in the repository, with its source; where no source text exists the page says so. Built by site/build.mjs from program.json (built ${esc(P.built_at)}), film-scripts.json and the films' narration record.</p>
</footer>
<script src="/assets/notes.js" defer></script>
${scripts.map(s => `<script src="${s}" defer></script>`).join('\n')}
</body>
</html>
`;
  PAGES.set(file, html);
}

// Build one page's body while recording the media it needs that are not downloaded.
function withMedia(fn) {
  pageMissing = new Set();
  const body = fn();
  const missing = pageMissing;
  pageMissing = null;
  return {body, missing};
}

// ---------- Home ----------
function buildHome(stats, playerMissing) {
  const downloaded = Object.values(FILM_FILE).filter(f => place(f)).length;
  const tiles = [
    ['/sessions/', 'Sessions', `Walk and time any of the ${stats.sessions} psychology sessions on a phone, in the order the sources give them, against the 30-minute planned day.`],
    ['/app/', 'App prototype', 'Live the program as Ruth would, one app day at a time, in Hebrew: Today, Journey, the practice library, missed days and the week-13+ rhythm, inside the whole app day of Protocol.xlsx.'],
    ['/films/', 'Films & scripts', `The ${stats.films} films beside the script documents they narrate; ${stats.exactFilms} are word for word and differences are highlighted.`],
    ['/activities/', 'Activities', `${stats.activities} activities, one page each: intro pages, intro films, schedules, all ${stats.thoughts} Inner Voice thoughts, ${stats.cards} Cardversation cards, every reflection screen and the recordings.`]];
  const canvases = ['home', 'original', 'activities', 'films', 'phone'].map(k => `<li>${link(REG.canvases[k].url, REG.canvases[k].title + ' ↗')}</li>`).join('');
  const body = `${en('p', 'Remepy · Parkinson\'s psychological program', 'kicker')}
<h1 class="title">Psych Lab</h1>
<p class="sub">A lab for exploring the program's scripts, activities, films and flow. Program text here is quoted verbatim from source files in the repository, with its source; where no source text exists, the page says so instead of filling the gap.</p>
<div class="grid grid-2" style="margin-top: 20px">
${tiles.map(([href, label, t]) => `<a class="box tile" href="${href}"><p class="kicker">Lab</p><p class="tile-title">${esc(label)} →</p><p>${esc(t)}</p></a>`).join('\n')}
</div>
<section class="sec"><h2>Gaps the sources leave open</h2>
${sourceGaps(stats).map(g => en('p', g, 'meta')).join('\n')}
<p class="meta">PS-CONT-047 is held out of the breathing flow; ${link('/sessions/held-out-047.html', 'see why')}.</p>
</section>
<section class="sec"><h2>Media on this computer</h2>
<p class="meta">${downloaded} of ${Object.keys(FILM_FILE).length} films downloaded${playerMissing.size ? ` · ${plural(playerMissing.size, 'file')} the session player uses ${playerMissing.size === 1 ? 'is' : 'are'} not downloaded` : ' · every file the session player uses is downloaded'}.</p>
${downloaded < Object.keys(FILM_FILE).length || playerMissing.size ? `<p class="meta">To download them: <code>${esc(MEDIA_PULL)}</code>, then restart <code>npm start</code>.</p>` : ''}
</section>
<section class="sec"><h2>The design canvases</h2>
<p class="meta">The original design stays on its canvas: persona, design system, daily experience, practices and games, program rhythm, the films with their storyboards and Ruth's journey. The Lab's generated canvases are kept as they were on 2026-11-06 and updated only on request.</p>
<ul class="meta">${canvases}</ul>
</section>`;
  page({file: 'index.html', title: 'Home', section: '/', body, description: 'Psych Lab: Remepy\'s Parkinson\'s psychological program, quoted from its sources.'});
}

// ---------- Films & scripts ----------
// Words are split only to mark the ones that differ; each line's text stays whole for the verbatim check.
function marked(texts, changed) {
  const marks = new Set(changed || []);
  let at = 0;
  return texts.map(t => t.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).map(w => (marks.has(at++) ? `<mark>${esc(w)}</mark>` : esc(w))).join(' '));
}

function filmSessions(sessions) {
  const by = {};
  const walk = (steps, n) => steps.forEach(st => { if (st.clip && isFilm(st.clip.id)) (by[st.clip.id] = by[st.clip.id] || new Set()).add(n); (st.options || []).forEach(o => walk(o.steps, n)); });
  sessions.forEach(s => walk(s.steps, s.n));
  return id => [...(by[id] || [])].sort((a, b) => a - b);
}

function buildFilms(playedIn) {
  const ids = filmIds();
  ids.forEach((id, k) => {
    const {film, lines, exact} = filmLines(id);
    const {body, missing} = withMedia(() => {
      const src = filmUrl(id);
      const sessions = playedIn(id);
      const later = film.later_version ? `<p class="issue">A later copy-edit of this script exists: ${esc(film.later_version.id)} in Psychology Hebrew.docx, with ${esc(film.later_version.differences)} differences from the film. The film follows the document beside it.</p>` : '';
      const rows = lines.map(l => {
        const said = l.said ? `<p class="lbl">Narrated as</p><p class="he text said" dir="rtl" lang="he">${marked([l.said], l.fc)[0]}</p>` : '';
        const voiced = l.voiced ? `<p class="lbl">Text sent to ElevenLabs (adjusted for pronunciation)</p><div class="said">${marked(l.voiced, l.vc).map(h => `<p class="he text" dir="rtl" lang="he">${h}</p>`).join('')}</div>` : '';
        return `<section class="line">${l.v ? '<span class="tag">Word for word</span>' : '<span class="tag tag-warn">Differs from the script</span>'}
${marked(l.script, l.sc).map(h => `<p class="he text" dir="rtl" lang="he">${h}</p>`).join('\n')}${said}${voiced}</section>`;
      }).join('\n');
      const notNarrated = film.not_narrated.length ? `<details class="sec"><summary class="meta">Script text not in the film (${film.not_narrated.length})</summary>\n${film.not_narrated.map(q => he('p', q.text, 'text')).join('\n')}\n</details>` : '';
      const prev = ids[k - 1], next = ids[k + 1];
      return `<div class="film">
<div class="film-side">
${en('p', 'Film beside its script', 'kicker')}
${en('h1', 'Film ' + id, 'title')}
${src ? `<video class="film-video" controls preload="metadata" playsinline src="${src}"></video>` : '<p class="gap">Film video not available on this computer</p>'}
<p class="meta">${exact} of ${film.lines.length} lines narrated word for word · voiced with the ElevenLabs API</p>
<p class="meta">${sessions.length ? `Plays in ${sessions.length === 1 ? 'session' : 'sessions'} ${sessions.join(', ')} · ${link('/sessions/', 'Sessions')}` : 'Not played in a scheduled session.'}</p>
<p class="lbl">Script document</p>
<p class="meta"><code class="path" dir="ltr">${pathHtml(film.source)}</code></p>
${later}
<p class="meta">Highlighted words differ between the script and what was narrated.</p>
</div>
<div>
${rows}
${notNarrated}
<nav class="pager" aria-label="Films">${prev ? link(`/films/${prev}.html`, '← ' + prev) : '<span></span>'}${link('/films/', 'All films')}${next ? link(`/films/${next}.html`, next + ' →') : '<span></span>'}</nav>
</div>
</div>`;
    });
    page({file: `films/${id}.html`, title: `Film ${id}`, section: '/films/', body, missing});
  });
  const exactAll = ids.filter(id => FS.films[id].lines.every(l => l.verbatim)).length;
  const rows = ids.map(id => {
    const {film, exact} = filmLines(id);
    const sessions = playedIn(id);
    return `<li><a href="/films/${id}.html"><div class="rid">Film ${esc(id)}</div><div class="meta">${exact} of ${film.lines.length} lines word for word${film.not_narrated.length ? ` · ${film.not_narrated.length} not narrated` : ''}</div><div class="meta">${sessions.length ? `${sessions.length === 1 ? 'Session' : 'Sessions'} ${sessions.join(', ')}` : 'No scheduled session'}</div></a></li>`;
  }).join('\n');
  const body = `${en('p', 'Psych Lab', 'kicker')}
<h1 class="title">Films &amp; scripts</h1>
<p class="sub">Each of the ${ids.length} animated films beside the script document it narrates. Script lines are quoted from the documents in sources/film-scripts/; the narrated text comes from the films' narration record (${esc(FS.narration)}). Highlighted words differ.</p>
<p class="meta">${exactAll} of ${ids.length} films are narrated word for word. Spoken audio itself is not compared, only the text sent for voicing.</p>
<ul class="rows">${rows}</ul>`;
  page({file: 'films/index.html', title: 'Films & scripts', section: '/films/', body});
}

// ---------- Activities ----------
const activityHref = id => `/activities/${id}.html`;

function filmMention(clip, label) {
  if (!clip) return '';
  if (isFilm(clip.id)) return `<p class="meta">${esc(label)} ${esc(clip.id)} · ${time(clip.seconds)} · ${link(`/films/${clip.id}.html`, 'watch beside its script')}</p>`;
  return `<p class="meta">${esc(label)} ${esc(clip.id.replace(/^SOURCE-/, ''))} · ${time(clip.seconds)} · current Remepy app video, plays in ${link('/sessions/', 'Sessions')}</p>`;
}

function activityPage(a) {
  const {body, missing} = withMedia(() => {
    const parts = [];
    parts.push(`${en('p', `${kindNames[a.kind] || 'Video'} · ${a.id}`, 'kicker')}\n${he('h1', a.title, 'title')}\n${en('p', a.english, 'sub')}`);
    const intro = [];
    if (a.subtitle) intro.push(he('p', a.subtitle, 'text'));
    if (a.lead) intro.push(he('p', a.lead, 'text'));
    if (a.bullets?.length) intro.push(`<ul class="he text" dir="rtl" lang="he">${a.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>`);
    for (const extra of [a.equipment, a.safety]) if (extra) intro.push(he('p', extra, 'text'));
    if (!intro.length) intro.push(noSource('intro page text'));
    const names = sourceNames(a);
    if (names.length) intro.push(`<p class="meta">From: ${names.map(esc).join(' · ')}</p>`);
    parts.push(`<section class="sec"><h2>Intro page</h2>\n${intro.join('\n')}\n</section>`);
    if (a.intro_id) {
      const introAct = P.activities[a.intro_id], clip = introClip(P, a), lines = [];
      if (introAct && introAct.id !== a.id) lines.push(he('p', introAct.title, 'text'));
      lines.push(clip ? filmMention(clip, 'Film') : `<p class="meta">${esc(a.intro_id)} · no film for this intro in the Lab copy.</p>`);
      if (introAct && introAct.id !== a.id) for (const n of issueNotes(introAct)) lines.push(en('p', n, 'issue'));
      if (introAct?.review_media) lines.push(`<p class="meta">The conflicted source video is held out of the flow; ${link('/sessions/held-out-047.html', 'inspect it here')}.</p>`);
      parts.push(`<section class="sec"><h2>Intro film · ${esc(a.intro_id)}</h2>\n${lines.join('\n')}\n</section>`);
    }
    const rows = sessionsFor(a.id);
    parts.push(rows.length
      ? `<section class="sec"><h2>Schedule · ${plural(rows.length, 'session')}</h2>\n<p>${scheduleTags(rows).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</p>\n</section>`
      : `<section class="sec"><h2>Schedule</h2>\n${en('p', unscheduledNote(a), 'meta')}\n</section>`);
    if (a.kind === 'video') {
      parts.push(`<section class="sec"><h2>Film</h2>\n${a.clip ? filmMention(a.clip, 'Film') : `<p class="meta">${esc(a.id)} · no film in the Lab copy.</p>`}\n</section>`);
    } else if (a.kind === 'breathing') {
      parts.push(`<section class="sec"><h2>Practice</h2>\n<p class="meta">Planned length ${time(a.planned_seconds)}.</p>\n${noSource('in-practice prompts, pacing and timing')}\n</section>`);
    } else if (a.kind === 'audio') {
      if (a.audio) {
        const src = place(programFile(a.audio.url));
        parts.push(`<section class="sec"><h2>Recording</h2>\n${src ? `<audio controls preload="none" src="${src}" style="width: 100%"></audio>` : '<p class="gap">Recording not available on this computer</p>'}\n<p class="meta">${time(a.audio.seconds)} · ${esc(a.audio.status)}</p>\n${noSource('written practice script (the recording is the source)')}\n</section>`);
      } else {
        parts.push(`<section class="sec"><h2>Recording</h2>\n<p class="meta">Planned length ${time(a.planned_seconds)} · ${a.recording_status === 'not_yet_recorded' ? 'not yet recorded' : 'recording not available'}.</p>\n${noSource('practice script')}\n</section>`);
      }
    } else if (a.kind === 'choice') {
      const opts = (a.options || []).map(o => {
        const item = P.activities[o.id], desc = [o.description, o.parameter].filter(Boolean).join(' · ');
        return `<div class="box"><p class="meta">${link(activityHref(o.id), o.id)}</p>${item ? he('p', item.title, 'text') : ''}${desc ? `<p class="meta">${esc(desc)}</p>` : ''}</div>`;
      });
      parts.push(`<section class="sec"><h2>Options · choose one</h2>\n<div class="grid grid-2">${opts.join('\n')}</div>\n</section>`);
    } else if (a.kind === 'inner') {
      const items = Object.entries(THEMES).map(([key, label]) => {
        const {list, uses, feedback} = thoughtSheet(a, key);
        return `<div class="box">${link(`/activities/${a.id}-${key}.html`, `${label} · ${list.length} thoughts`)}<p class="meta">Feedback text for ${feedback} · played in ${esc(uses.join(', ') || 'no scheduled session')}</p></div>`;
      });
      parts.push(`<section class="sec"><h2>Thought sheets</h2>\n<div class="grid grid-2">${items.join('\n')}</div>\n</section>`);
    } else if (a.kind === 'cards') {
      const items = P.cards.map((deck, i) => `<div class="box"><p class="meta">${link(`/activities/${a.id}-deck-${i + 1}.html`, `Deck ${i + 1}`)}</p>${he('p', deck.name, 'text')}<p class="meta">${deck.cards.length} cards${deck.type === 'action' ? ' · action deck' : ''}</p></div>`);
      parts.push(`<section class="sec"><h2>Decks</h2>\n<div class="grid grid-2">${items.join('\n')}</div>\n</section>`);
    } else if (a.kind === 'reflection') {
      const rowsR = P.reflections[reflectionType(a.id)] || [];
      const html = [`<p class="meta">${rowsR.length} rows from the mindful-moments sheet, in sheet order.</p>`];
      let current = null;
      for (const r of rowsR) {
        if (r.screen !== current) { if (current !== null) html.push('</div>'); current = r.screen; html.push(`<div class="box"><p class="kicker">${esc(r.screen)}</p>`); }
        html.push(`<p class="lbl">${esc(r.field || '—')}</p>`);
        html.push(r.hebrew ? he('p', r.hebrew, 'text') : noSource('Hebrew for this row'));
        if (r.female && r.female !== r.hebrew) html.push('<p class="lbl">Female form</p>', he('p', r.female, 'text'));
      }
      if (current !== null) html.push('</div>');
      parts.push(`<section class="sec"><h2>Screens</h2>\n${html.join('\n')}\n</section>`);
    }
    const own = issueNotes(a);
    if (own.length) parts.push(`<section class="sec"><h2>Source notes</h2>\n${own.map(n => en('p', n, 'issue')).join('\n')}\n</section>`);
    parts.push(`<nav class="pager" aria-label="Activities">${link('/activities/', '← All activities')}<span></span></nav>`);
    return parts.join('\n');
  });
  page({file: `activities/${a.id}.html`, title: `${a.id} · ${a.english}`, section: '/activities/', body, missing, cls: 'page page-narrow'});
}

function thoughtPage(a, key, label) {
  const {list, uses, feedback} = thoughtSheet(a, key);
  const rows = list.map(t => {
    const fb = (t.correct || t.incorrect)
      ? [t.correct ? `<p class="lbl">Right answer</p>${he('p', t.correct, 'text')}` : '', t.incorrect ? `<p class="lbl">Wrong answer</p>${he('p', t.incorrect, 'text')}` : ''].join('')
      : noSource('feedback');
    return `<tr><td class="he" dir="rtl" lang="he" data-label="Thought">${esc(t.text)}</td><td data-label="Type">${t.type_he ? he('span', t.type_he, 'tag') : en('span', t.type, 'tag')}</td><td data-label="English">${esc(t.english)}</td><td data-label="Feedback">${fb}</td></tr>`;
  });
  const body = `${en('p', `Inner Voice · ${a.id} · thought sheet`, 'kicker')}
${en('h1', label, 'title')}
<p class="meta">${list.length} thoughts · feedback text for ${feedback} · played in ${esc(uses.join(', ') || 'no scheduled session')} · ${link(activityHref(a.id), 'back to Inner Voice')}</p>
<table class="table"><thead><tr><th style="width: 32%">Thought</th><th style="width: 12%">Type</th><th style="width: 22%">English</th><th>Feedback</th></tr></thead>
<tbody>
${rows.join('\n')}
</tbody></table>`;
  page({file: `activities/${a.id}-${key}.html`, title: `Inner Voice · ${label}`, section: '/activities/', body});
}

function deckPage(a, deck, i) {
  const cards = deck.cards.map(c => {
    const out = [`<p class="kicker">Card ${esc(c.number)}</p>`];
    for (const [q, ideas, label] of [[c.a, c.ideas_a, deck.type === 'action' ? 'Action' : 'Question 1'], [c.b, c.ideas_b, 'Question 2']]) {
      if (!q) continue;
      out.push(`<p class="lbl">${label}</p>`, he('p', q, 'text'));
      if (ideas) out.push('<p class="lbl">Ideas</p>', `<p class="he text" dir="rtl" lang="he" style="white-space: pre-line; color: var(--on-surface-variant)">${esc(ideas)}</p>`);
    }
    for (const f of c.followups || []) {
      if (!f.text) continue;
      out.push('<p class="lbl">Follow-up</p>', he('p', f.text, 'text'));
      if (f.ideas) out.push(`<p class="he text" dir="rtl" lang="he" style="white-space: pre-line; color: var(--on-surface-variant)">${esc(f.ideas)}</p>`);
    }
    return `<div class="box">${out.join('\n')}</div>`;
  });
  const body = `${en('p', `Cardversation · ${a.id} · deck ${i + 1}`, 'kicker')}
${he('h1', deck.name, 'title')}
<p class="meta">${deck.cards.length} cards${deck.type === 'action' ? ' · action deck' : ''} · ${link(activityHref(a.id), 'back to Cardversation')}</p>
<div class="grid grid-2">${cards.join('\n')}</div>`;
  page({file: `activities/${a.id}-deck-${i + 1}.html`, title: `Cardversation · deck ${i + 1}`, section: '/activities/', body});
}

function buildActivities() {
  const acts = shownActivities();
  for (const a of acts) {
    activityPage(a);
    if (a.kind === 'inner') for (const [key, label] of Object.entries(THEMES)) thoughtPage(a, key, label);
    if (a.kind === 'cards') P.cards.forEach((deck, i) => deckPage(a, deck, i));
  }
  const counts = KINDS.map(([kind, label]) => `${label} ${acts.filter(a => a.kind === kind).length}`).join(' · ');
  const chips = KINDS.map(([kind, label]) => `<a href="#${kind}">${esc(label)} · ${acts.filter(a => a.kind === kind).length}</a>`).join('');
  const groups = KINDS.map(([kind, label]) => `<section class="sec" id="${kind}"><h2>${esc(label)}</h2>
<ul class="rows">${acts.filter(a => a.kind === kind).map(a => `<li><a href="${activityHref(a.id)}"><div class="rid">${esc(a.id)}</div>${he('div', a.title)}<div class="meta">${esc(a.english)}</div></a></li>`).join('\n')}</ul>
</section>`).join('\n');
  const body = `${en('p', 'Psych Lab', 'kicker')}
<h1 class="title">Activities</h1>
<p class="sub">One page per activity with everything program.json holds for it: intro page, intro film, schedule, every thought, card and reflection screen, and the recordings. Hebrew is quoted verbatim from the sources; labels are English; a gap says No source text.</p>
<p class="meta">${acts.length} activities · ${esc(counts)}</p>
<nav class="chips" aria-label="Activity kinds">${chips}</nav>
${groups}`;
  page({file: 'activities/index.html', title: 'Activities', section: '/activities/', body});
}

// ---------- Sessions player and app prototype: the canvases' own boards, run by site/src/dc-lite.js ----------
const PHONE_LOGIC = text('canvas/phone-logic.js');
const APP_LOGIC = text('canvas/app-logic.js');
const FLOW_MARKUP = text('canvas/flow-markup.html');
const PHONE_MARKUP = text('canvas/phone-markup.html').replace('<!-- flow-markup.html -->\n', FLOW_MARKUP);
const APP_MARKUP = text('canvas/app-markup.html').replace('<!-- flow-markup.html -->\n', FLOW_MARKUP);
const ASSETS = {};          // output path -> content

function buildPlayers() {
  const sessions = withMedia(() => phoneData(SITE_MEDIA));
  ASSETS['assets/sessions.js'] = `// Generated by site/build.mjs: canvas/phone-logic.js over every session's screens, sequenced by core.mjs from program.json.
class Component extends DCLogic {
  // Every session's steps, sequenced by core.mjs from program.json; program text exactly as the sources have it.
  data() { if (!this._d) this._d = ${jsData(sessions.body)}; return this._d; }
${PHONE_LOGIC}
}
DCLite.mount(document.getElementById('player'), ${jsData(PHONE_MARKUP)}, Component);
`;
  const app = withMedia(() => appData(SITE_MEDIA));
  ASSETS['assets/app.js'] = `// Generated by site/build.mjs: canvas/app-logic.js over the Phone preview's players (canvas/phone-logic.js).
class Player extends DCLogic {
  // Every session's steps, sequenced by core.mjs from program.json; program text exactly as the sources have it.
  data() { if (!this._d) this._d = ${jsData(app.body)}; return this._d; }
${PHONE_LOGIC}
}
class Component extends Player {
${APP_LOGIC}
}
DCLite.mount(document.getElementById('player'), ${jsData(APP_MARKUP)}, Component);
`;
  const playerCss = ['/assets/phone-board.css'];
  page({file: 'sessions/index.html', title: 'Sessions', section: '/sessions/', cls: 'page player-page', missing: sessions.missing, bannerAfter: true, css: playerCss,
    scripts: ['/assets/dc-lite.js', '/assets/sessions.js'],
    body: `<h1 class="kicker player-title" style="text-align: center; margin: 0 0 8px">Sessions · walk and time all ${P.sessions.length}</h1>
<div class="player" id="player" aria-label="Session player"></div>
<section class="player-about">
<div class="grid grid-2">
<div class="box"><p class="kicker">What the phone shows</p>
<p>Press a session, then Start, to walk it as core.mjs sequences it from program.json: intro pages, films, choices, breathing, recordings, Inner Voice, Cardversation and reflections. Hebrew only where a program source has it; interface words are English Lab labels. Screens whose program text is in no source (motivation, post-practice question, in-practice breathing prompts, choice heading, missing Inner Voice feedback, closing message) show No source text.</p>
<p>Breathing phase names and timings are Lab assumptions. Missing recordings and videos keep their time slot and say so. Sessions 8 and 28 play the current Remepy app clips PS-CONT-029 and PS-CONT-013, here in their original files.</p></div>
<div class="box"><p class="kicker">Timing</p>
<p>The panel measures visible time per session and per step, compares the content plan with the 30-minute planned day (Protocol.xlsx light or heavy speech plan), and keeps a log of timed runs in this browser. A run counts as a complete experience only when nothing was skipped, scrubbed, missing or ended early.</p>
<p>${link('/sessions/held-out-047.html', 'PS-CONT-047 is held out of the breathing flow')}: its source video conflicts with its metadata.</p></div>
</div>
</section>`});
  page({file: 'app/index.html', title: 'App prototype', section: '/app/', cls: 'page player-page', missing: app.missing, bannerAfter: true, css: [...playerCss, '/assets/app-board.css'],
    scripts: ['/assets/dc-lite.js', '/assets/app.js'],
    body: `<h1 class="kicker player-title" style="text-align: center; margin: 0 0 8px">App prototype · live the program day by day</h1>
<div class="player" id="player" aria-label="App prototype"></div>
<section class="player-about">
<div class="grid grid-2">
<div class="box"><p class="kicker">How it works</p>
<p>The app lives the program as Ruth would, one app day at a time, in Hebrew: Today offers the next session not yet done (missed days move the rest later; owner decision 2026-11-03), Journey lists all ${P.sessions.length}, and the Library gathers the breathing, recordings, games and reflections met so far, to repeat without their intro film. The lab controls move the calendar, miss days and jump ahead; after session ${P.sessions.length} it follows the spec's suggested 7-day rhythm. It plays the same sessions and step screens as ${link('/sessions/', 'Sessions')}.</p></div>
<div class="box"><p class="kicker">The whole app day</p>
<p>Each app day follows Protocol.xlsx (light or heavy speech week): PT or OT practice, speech or dance, a game, a lived-experience video and Mindset, the psychology session. Psychology plays in full; every other module is a marked slot with its source name, planned minutes and first-month status, because the Lab holds none of their screens or media.</p>
<p>Program text is quoted from the sources; the Hebrew interface words (tabs, buttons, status words) quote the original design, as the owner approved, and are listed with their files in canvas/interface-he.json. Progress stays in this browser.</p></div>
</div>
</section>`});
  return sessions;
}

function buildHeldOut() {
  const intro = P.activities['PS-CONT-047'];
  const {body, missing} = withMedia(() => {
    const src = place('psych-lab/intervention/media/PS-CONT-047.mp4');
    return `${en('p', 'Source conflict', 'kicker')}
${en('h1', 'PS-CONT-047', 'title')}
<p class="sub">${esc(HELD_OUT_047)}</p>
${src ? `<video class="film-video portrait" controls preload="metadata" playsinline src="${src}" style="margin: 16px 0"></video>` : '<p class="gap">Source video not available on this computer</p>'}
<p class="meta">The original file, psych-lab/intervention/media/PS-CONT-047.mp4.</p>
${issueNotes(intro).map(n => en('p', n, 'issue')).join('\n')}
<nav class="pager" aria-label="Sessions">${link('/sessions/', '← Sessions')}${link(activityHref('PS-CONT-047'), 'Activity page')}</nav>`;
  });
  page({file: 'sessions/held-out-047.html', title: 'PS-CONT-047 held out', section: '/sessions/', body, missing, cls: 'page page-narrow'});
}

// ---------- write ----------
const stats = labStats();
const players = buildPlayers();
buildHome(stats, players.missing);
buildFilms(filmSessions(players.body.sessions));
buildActivities();
buildHeldOut();

ASSETS['assets/site.css'] = fs.readFileSync(path.join(HERE, 'src/site.css'), 'utf8');
ASSETS['assets/dc-lite.js'] = fs.readFileSync(path.join(HERE, 'src/dc-lite.js'), 'utf8');
ASSETS['assets/notes.js'] = fs.readFileSync(path.join(HERE, 'src/notes.js'), 'utf8');
// The original design's stylesheet (a protected source), copied unchanged, as the canvases ship it.
ASSETS['assets/ui.css'] = text(UI_CSS);
ASSETS['assets/phone-board.css'] = text('canvas/phone-board.css');
ASSETS['assets/app-board.css'] = text('canvas/app-board.css');

fs.rmSync(OUT, {recursive: true, force: true});
const write = (rel, content) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), {recursive: true}); fs.writeFileSync(f, content); };
for (const [rel, html] of PAGES) write(rel, html);
for (const [rel, content] of Object.entries(ASSETS)) write(rel, content);
for (const f of fs.readdirSync(path.join(HERE, 'vendor/fonts'))) if (/\.(woff2|css)$/.test(f)) write(`assets/fonts/${f}`, fs.readFileSync(path.join(HERE, 'vendor/fonts', f)));
write('media.json', JSON.stringify(Object.fromEntries([...served].sort()), null, 1) + '\n');
console.log(`site: ${PAGES.size} pages, ${served.size} media files served from the repository${players.missing.size ? `, ${players.missing.size} player media files not downloaded` : ''} · ${path.relative(ROOT, OUT) || OUT}`);
