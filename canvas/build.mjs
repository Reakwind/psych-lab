#!/usr/bin/env node
// Builds the Psych Lab's connected Design canvases (Home, Activities, Films & scripts, Phone preview)
// from verified repository data. Program text (Hebrew) is only ever copied from program.json,
// film-scripts.json or the films' narration record, never written, joined or shortened here; every
// interface word is an English Lab label. Where the sources hold no text, boards say so.
//
//   node canvas/build.mjs            write canvas/<canvas>/project/...
//   node canvas/build.mjs --check    fail if the written boards are not what this script builds
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {minuteLabel as time, sessionSteps, chooseSteps, sessionRange, thoughtTheme, reflectionType, introClip} from '../psych-lab/intervention/core.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const read = p => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const P = read('psych-lab/intervention/program.json');
const FS = read('psych-lab/film-scripts.json');
const NARRATION = read(FS.narration);
const REG = read('canvas/canvases.json');
const ORIGINAL = read('canvas/original-films.json').films;
const pairs = f => Object.fromEntries(fs.readFileSync(path.join(HERE, f), 'utf8').trim().split('\n').map(l => l.split(' ')));
const FILM_ASSETS = {films: pairs('assets-films.txt'), phone: pairs('assets-phone.txt')};
const URL = Object.fromEntries(Object.entries(REG.canvases).map(([k, v]) => [k, v.url]));
const TITLE = Object.fromEntries(Object.entries(REG.canvases).map(([k, v]) => [k, v.title]));
// Fixed so a rebuild produces the same files; it records when the canvases were created.
const CREATED = '2026-11-02T13:45:00Z';

// ---------- helpers ----------
const esc = s => {
  const text = String(s ?? '');
  if (text.includes('{{')) throw Error('Text would be read as a template hole: ' + text.slice(0, 40));
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};
const he = (tag, text, cls = '') => `<${tag} class="he${cls ? ' ' + cls : ''}" dir="rtl" lang="he">${esc(text)}</${tag}>`;
const en = (tag, text, cls = '') => `<${tag}${cls ? ` class="${cls}"` : ''}>${esc(text)}</${tag}>`;
const noSource = what => `<p class="gap"><strong>No source text</strong> · ${esc(what)}</p>`;
const link = (href, text, cls = '') => `<a href="${esc(href)}"${cls ? ` class="${cls}"` : ''}${href.startsWith('https://') ? ' target="_blank" rel="noopener"' : ''}>${esc(text)}</a>`;
// The JSON a board's script reads. Strings stay whole, so the verbatim check sees each one as the source has it.
const jsData = value => JSON.stringify(value).replace(/<\/(script)/gi, '<\\/$1').replace(/[\u2028\u2029]/g, c => '\\u' + c.charCodeAt(0).toString(16));
const kindNames = {video: 'Video', audio: 'Guided audio', choice: 'Choose one', breathing: 'Breathing', inner: 'Inner Voice', cards: 'Cardversation', reflection: 'Reflection'};
const isFilm = id => /^S\d/.test(id || '');
const filmAsset = (canvas, filmId) => ORIGINAL[filmId] && FILM_ASSETS[canvas][ORIGINAL[filmId]] ? '/_blob/' + FILM_ASSETS[canvas][ORIGINAL[filmId]] : null;
const mediaAsset = (canvas, url) => REG.media[canvas]?.[url] || null;

// Rough text height so a board's frame holds its content; the root also scrolls if an estimate runs short.
function textHeight(text, width, size = 16, line = 1.6) {
  const perLine = Math.max(8, Math.floor(width / (size * 0.53)));
  return String(text || '').split('\n').reduce((n, part) => n + Math.max(1, Math.ceil(part.length / perLine)), 0) * size * line;
}

const LAB_CSS = `body{margin:0}
a{color:#2B6A62}a:hover{color:#00201C}
.lab{box-sizing:border-box;background:#F5FBF8;color:#171D1B;font:15px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;overflow-y:auto}
.he{font-family:Rubik,system-ui,sans-serif;text-align:right;unicode-bidi:plaintext}
.kicker{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#3F4946;font-weight:600;margin:0}
.title{font-size:28px;line-height:1.3;margin:4px 0 2px;font-weight:600}
.sub{color:#3F4946;margin:0}
.sec{border-top:1px solid #BEC9C5;padding-top:12px;margin-top:16px}
.sec h3{margin:0 0 8px;font-size:12px;color:#3F4946;text-transform:uppercase;letter-spacing:.06em}
.meta{font-size:13px;color:#3F4946;margin:4px 0}
.gap{display:inline-block;background:#FFDEA3;color:#261900;border-radius:8px;padding:4px 10px;font-size:13px;margin:4px 0}
.issue{background:#FFF4DC;color:#261900;border-radius:8px;padding:6px 10px;font-size:13px;margin:6px 0}
.tag{display:inline-block;background:#E3EAE7;color:#3F4946;border-radius:999px;padding:2px 10px;font-size:12px;margin:0 6px 6px 0}
.text{font-size:17px;line-height:1.7;margin:6px 0}
.box{background:#FFFFFF;border:1px solid #DDE4E1;border-radius:12px;padding:12px 14px;margin:10px 0}
.lbl{font-size:12px;color:#3F4946;margin-top:8px}
ul.he{padding-right:20px;padding-left:0}
mark{background:#F1D79C;color:inherit;border-radius:3px;padding:0 2px}
table{border-collapse:collapse;width:100%}
td,th{border-top:1px solid #DDE4E1;padding:8px 6px;vertical-align:top;text-align:left;font-size:13px}
th{color:#3F4946;font-weight:600}
td.he{font-size:16px}`;
const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&amp;display=swap" rel="stylesheet">';

function board({title, w, h, body, css = '', logic = 'class Component extends DCLogic {\n  renderVals() { return {}; }\n}', uiCss = 'ui.css', lang = 'en'}) {
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<script src="./support.js"></script>
<link rel="stylesheet" href="${uiCss}">
</head>
<body>
<x-dc>
<helmet>
${FONTS}
<style>
${LAB_CSS}
${css}
</style>
</helmet>
${body}
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":${w},"height":${h}}}'>
${logic}
</script>
</body>
</html>
`;
}

const labPage = (w, h, inner) => `<div class="lab" style="width: ${w}px; height: ${h}px; padding: 32px 36px">\n${inner}\n</div>`;

function navLinks(current) {
  const order = ['home', 'original', 'activities', 'films', 'phone'];
  return `<p class="meta" style="display: flex; flex-wrap: wrap; gap: 14px">${order.filter(k => k !== current).map(k => link(URL[k], (k === 'home' ? '← ' : '') + TITLE[k])).join(' ')}</p>`;
}

function canvasIndex(title, boards, notes = {}) {
  return {v: 3, createdOnFiles: {v: 1, at: CREATED}, title, launch: {view: 'canvas'}, pages: [],
    boards: Object.fromEntries(boards.map(b => [b.path, b.frame])), order: boards.map(b => b.path), notes, designSystems: []};
}

// Lay boards out in rows (80 px apart), each row under its title note.
function layout(rows, startY, colW, perRow) {
  const boards = [], notes = {};
  let y = startY;
  for (const row of rows) {
    if (!row.items.length) continue;
    y += 240;
    notes[row.id] = {x: 0, y: y - 240, text: row.title, kind: 'title1', maxW: Math.min(perRow, row.items.length) * (colW + 80) - 80};
    for (let i = 0; i < row.items.length; i += perRow) {
      const chunk = row.items.slice(i, i + perRow);
      const tallest = Math.max(...chunk.map(b => b.h));
      chunk.forEach((b, j) => boards.push({path: b.path, frame: {x: j * (colW + 80), y, w: b.w, h: b.h, title: b.title, ...(b.interactive ? {is_interactive: true} : {})}, html: b.html}));
      y += tallest + 160;
    }
  }
  return {boards, notes, end: y};
}

// ---------- Activities ----------
const ACT_W = 760, ACT_INNER = ACT_W - 72;
const KINDS = [['breathing', 'Breathing'], ['inner', 'Inner Voice'], ['cards', 'Cardversation'], ['reflection', 'Reflection'], ['audio', 'Guided audio'], ['choice', 'Choice groups'], ['video', 'Videos']];
const THEMES = {motivation: 'Motivation', balanced: 'Balancing thoughts', relaxation: 'Relaxation', mindfulness: 'Mindfulness', compassion: 'Compassion & validation', labels: 'Labels', flexible: 'Flexible thinking (General sheet)'};
const activityFile = id => `a/${id}.dc.html`;

function sessionsFor(id) {
  const direct = P.sessions.filter(s => s.activities.some(o => o.id === id)).map(s => ({s, via: null, parameter: s.activities.find(o => o.id === id).parameter}));
  const viaGroups = Object.entries(P.groups).filter(([, options]) => options.some(o => o.id === id))
    .flatMap(([gid]) => P.sessions.filter(s => s.activities.some(o => o.id === gid)).map(s => ({s, via: gid, parameter: ''})));
  return [...direct, ...viaGroups];
}

function issueNotes(item) {
  return [...new Set([...(item?.issues || []), item?.source_conflict, item?.source_note].filter(Boolean))];
}

function filmMention(clip, label) {
  if (!clip) return '';
  if (isFilm(clip.id)) return `<p class="meta">${esc(label)} ${esc(clip.id)} · ${time(clip.seconds)} · ${link(URL.films, 'watch beside its script in Films & scripts')}</p>`;
  return `<p class="meta">${esc(label)} ${esc(clip.id.replace(/^SOURCE-/, ''))} · ${time(clip.seconds)} · current Remepy app video, plays in ${link(URL.phone, 'Phone preview')}</p>`;
}

function activityBoard(a) {
  const parts = [], H = [];
  const add = (html, h) => { parts.push(html); H.push(h); };
  add(`${en('p', `${kindNames[a.kind] || 'Video'} · ${a.id}`, 'kicker')}\n${he('h2', a.title, 'title')}\n${en('p', a.english, 'sub')}`, 110);
  // Intro page
  const intro = [];
  let ih = 50;
  if (a.subtitle) { intro.push(he('p', a.subtitle, 'text')); ih += textHeight(a.subtitle, ACT_INNER, 17, 1.7) + 12; }
  if (a.lead) { intro.push(he('p', a.lead, 'text')); ih += textHeight(a.lead, ACT_INNER, 17, 1.7) + 12; }
  if (a.bullets?.length) { intro.push(`<ul class="he text" dir="rtl" lang="he">${a.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>`); ih += a.bullets.reduce((n, b) => n + textHeight(b, ACT_INNER - 30, 17, 1.7), 0) + 30; }
  for (const extra of [a.equipment, a.safety]) if (extra) { intro.push(he('p', extra, 'text')); ih += textHeight(extra, ACT_INNER, 17, 1.7) + 12; }
  if (!intro.length) { intro.push(noSource('intro page text')); ih += 40; }
  const sourceNames = (a.sources || []).map(k => P.sources[k]?.title || k);
  if (sourceNames.length) { intro.push(`<p class="meta">From: ${sourceNames.map(esc).join(' · ')}</p>`); ih += textHeight(sourceNames.join(' · '), ACT_INNER, 13) + 10; }
  add(`<section class="sec"><h3>Intro page</h3>\n${intro.join('\n')}\n</section>`, ih);
  // Intro film
  if (a.intro_id) {
    const introAct = P.activities[a.intro_id];
    const clip = introClip(P, a);
    const lines = [];
    let fh = 50;
    if (introAct && introAct.id !== a.id) { lines.push(he('p', introAct.title, 'text')); fh += 40; }
    if (clip) { lines.push(filmMention(clip, 'Film')); fh += 30; } else { lines.push(`<p class="meta">${esc(a.intro_id)} · no film for this intro in the Lab copy.</p>`); fh += 30; }
    if (introAct && introAct.id !== a.id) for (const n of issueNotes(introAct)) { lines.push(en('p', n, 'issue')); fh += textHeight(n, ACT_INNER, 13) + 20; }
    if (introAct?.review_media) { lines.push(`<p class="meta">The conflicted source video is held out of the flow; inspect it in ${link(URL.phone, 'Phone preview')}.</p>`); fh += 30; }
    add(`<section class="sec"><h3>Intro film · ${esc(a.intro_id)}</h3>\n${lines.join('\n')}\n</section>`, fh);
  }
  // Schedule
  const rows = sessionsFor(a.id);
  if (!rows.length) add(`<section class="sec"><h3>Schedule</h3>\n${en('p', a.library_only ? 'Not on the V0 timeline: library only.' : 'Not scheduled on the V0 timeline.', 'meta')}\n</section>`, 70);
  else {
    const tags = rows.map(({s, via, parameter}) => `${s.id} · week ${s.week}` + (parameter ? ` · ${parameter}` : '') + (via ? ` · option of ${P.activities[via]?.english || via}` : ''));
    add(`<section class="sec"><h3>Schedule · ${rows.length} session${rows.length === 1 ? '' : 's'}</h3>\n<p>${tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</p>\n</section>`, 60 + Math.ceil(tags.join('    ').length * 6.6 / ACT_INNER + 1) * 30);
  }
  // Content
  if (a.kind === 'video') {
    add(`<section class="sec"><h3>Film</h3>\n${a.clip ? filmMention(a.clip, 'Film') : `<p class="meta">${esc(a.id)} · no film in the Lab copy.</p>`}\n</section>`, 70);
  } else if (a.kind === 'breathing') {
    add(`<section class="sec"><h3>Practice</h3>\n<p class="meta">Planned length ${time(a.planned_seconds)}.</p>\n${noSource('in-practice prompts, pacing and timing')}\n</section>`, 110);
  } else if (a.kind === 'audio') {
    if (a.audio) {
      const src = mediaAsset('activities', a.audio.url);
      add(`<section class="sec"><h3>Recording</h3>\n${src ? `<audio controls="controls" preload="none" src="${src}" style="width: 100%"></audio>` : '<p class="gap">Recording not on this canvas</p>'}\n<p class="meta">${time(a.audio.seconds)} · ${esc(a.audio.status)}</p>\n${noSource('written practice script (the recording is the source)')}\n</section>`, 160);
    } else {
      add(`<section class="sec"><h3>Recording</h3>\n<p class="meta">Planned length ${time(a.planned_seconds)} · ${a.recording_status === 'not_yet_recorded' ? 'not yet recorded' : 'recording not available'}.</p>\n${noSource('practice script')}\n</section>`, 110);
    }
  } else if (a.kind === 'choice') {
    const opts = (a.options || []).map(o => {
      const item = P.activities[o.id];
      const desc = [o.description, o.parameter].filter(Boolean).join(' · ');
      return `<div class="box"><p class="meta">${link(activityFile(o.id).slice(2), o.id)}</p>${item ? he('p', item.title, 'text') : ''}${desc ? `<p class="meta">${esc(desc)}</p>` : ''}</div>`;
    });
    add(`<section class="sec"><h3>Options · choose one</h3>\n${opts.join('\n')}\n</section>`, 50 + (a.options || []).length * 96);
  } else if (a.kind === 'inner') {
    const items = Object.entries(THEMES).map(([key, label]) => {
      const list = P.thoughts[key] || [];
      const uses = P.sessions.filter(s => s.activities.some(o => o.id === a.id && thoughtTheme(o.parameter) === key)).map(s => s.id);
      return `<div class="box">${link(`${a.id}-${key}.dc.html`, `${label} · ${list.length} thoughts`)}<p class="meta">Feedback text for ${list.filter(t => t.correct || t.incorrect).length} · played in ${esc(uses.join(', ') || 'no scheduled session')}</p></div>`;
    });
    add(`<section class="sec"><h3>Thought sheets</h3>\n${items.join('\n')}\n</section>`, 50 + items.length * 92);
  } else if (a.kind === 'cards') {
    const items = P.cards.map((deck, i) => `<div class="box"><p class="meta">${link(`${a.id}-deck-${i + 1}.dc.html`, `Deck ${i + 1}`)}</p>${he('p', deck.name, 'text')}<p class="meta">${deck.cards.length} cards${deck.type === 'action' ? ' · action deck' : ''}</p></div>`);
    add(`<section class="sec"><h3>Decks</h3>\n${items.join('\n')}\n</section>`, 50 + items.length * 92);
  } else if (a.kind === 'reflection') {
    const type = reflectionType(a.id);
    const rowsR = P.reflections[type] || [];
    const html = [`<p class="meta">${rowsR.length} rows from the mindful-moments sheet, in sheet order.</p>`];
    let rh = 70, current = null;
    for (const r of rowsR) {
      if (r.screen !== current) { if (current !== null) html.push('</div>'); current = r.screen; html.push(`<div class="box"><p class="kicker">${esc(r.screen)}</p>`); rh += 60; }
      html.push(`<p class="lbl">${esc(r.field || '—')}</p>`);
      if (r.hebrew) { html.push(he('p', r.hebrew, 'text')); rh += textHeight(r.hebrew, ACT_INNER - 30, 17, 1.7) + 26; } else { html.push(noSource('Hebrew for this row')); rh += 60; }
      if (r.female && r.female !== r.hebrew) { html.push('<p class="lbl">Female form</p>', he('p', r.female, 'text')); rh += textHeight(r.female, ACT_INNER - 30, 17, 1.7) + 26; }
    }
    if (current !== null) html.push('</div>');
    add(`<section class="sec"><h3>Screens</h3>\n${html.join('\n')}\n</section>`, rh);
  }
  const own = issueNotes(a);
  if (own.length) add(`<section class="sec"><h3>Source notes</h3>\n${own.map(n => en('p', n, 'issue')).join('\n')}\n</section>`, 50 + own.reduce((n, x) => n + textHeight(x, ACT_INNER, 13) + 24, 0));
  const h = Math.min(8000, Math.round((H.reduce((n, x) => n + x, 0) + 120) * 1.12));
  return {path: activityFile(a.id), w: ACT_W, h, title: `${a.id} · ${a.english}`,
    html: board({title: `${a.id} · ${a.english}`, w: ACT_W, h, uiCss: '../ui.css', body: labPage(ACT_W, h, parts.join('\n'))})};
}

function thoughtBoard(a, key, label) {
  const list = P.thoughts[key] || [];
  const uses = P.sessions.filter(s => s.activities.some(o => o.id === a.id && thoughtTheme(o.parameter) === key)).map(s => s.id);
  const w = 1100, inner = w - 72;
  let h = 190;
  const rows = list.map(t => {
    const fb = (t.correct || t.incorrect)
      ? [t.correct ? `<p class="lbl">Right answer</p>${he('p', t.correct, 'text')}` : '', t.incorrect ? `<p class="lbl">Wrong answer</p>${he('p', t.incorrect, 'text')}` : ''].join('')
      : noSource('feedback');
    h += Math.max(textHeight(t.text, inner * 0.34, 16), textHeight(t.english, inner * 0.22, 13), (t.correct || t.incorrect) ? textHeight(t.correct, inner * 0.3, 16) + textHeight(t.incorrect, inner * 0.3, 16) + 50 : 40) + 26;
    return `<tr><td class="he" dir="rtl" lang="he" style="width: 34%">${esc(t.text)}</td><td style="width: 12%">${t.type_he ? he('span', t.type_he, 'tag') : en('span', t.type, 'tag')}</td><td style="width: 22%">${esc(t.english)}</td><td style="width: 32%">${fb}</td></tr>`;
  });
  h = Math.min(8000, Math.round(h * 1.1));
  const body = `${en('p', `Inner Voice · ${a.id} · thought sheet`, 'kicker')}\n${en('h2', label, 'title')}\n<p class="meta">${list.length} thoughts · feedback text for ${list.filter(t => t.correct || t.incorrect).length} · played in ${esc(uses.join(', ') || 'no scheduled session')} · ${link(activityFile(a.id).slice(2), 'back to Inner Voice')}</p>\n<table><tr><th>Thought</th><th>Type</th><th>English</th><th>Feedback</th></tr>\n${rows.join('\n')}\n</table>`;
  return {path: `a/${a.id}-${key}.dc.html`, w, h, title: `Inner Voice · ${label}`, html: board({title: `Inner Voice · ${label}`, w, h, uiCss: '../ui.css', body: labPage(w, h, body)})};
}

function deckBoard(a, deck, i) {
  const w = 900, inner = w - 72;
  let h = 190;
  const cards = deck.cards.map(c => {
    const out = [`<p class="kicker">Card ${esc(c.number)}</p>`];
    h += 50;
    for (const [q, ideas, label] of [[c.a, c.ideas_a, deck.type === 'action' ? 'Action' : 'Question 1'], [c.b, c.ideas_b, 'Question 2']]) {
      if (!q) continue;
      out.push(`<p class="lbl">${label}</p>`, he('p', q, 'text'));
      h += textHeight(q, inner - 30, 17, 1.7) + 26;
      if (ideas) { out.push('<p class="lbl">Ideas</p>', `<p class="he text" dir="rtl" lang="he" style="white-space: pre-line; color: #3F4946">${esc(ideas)}</p>`); h += textHeight(ideas, inner - 30, 17, 1.7) + 26; }
    }
    for (const f of c.followups || []) {
      if (!f.text) continue;
      out.push('<p class="lbl">Follow-up</p>', he('p', f.text, 'text'));
      h += textHeight(f.text, inner - 30, 17, 1.7) + 26;
      if (f.ideas) { out.push(`<p class="he text" dir="rtl" lang="he" style="white-space: pre-line; color: #3F4946">${esc(f.ideas)}</p>`); h += textHeight(f.ideas, inner - 30, 17, 1.7) + 8; }
    }
    h += 30;
    return `<div class="box">${out.join('\n')}</div>`;
  });
  h = Math.min(8000, Math.round(h * 1.1));
  const body = `${en('p', `Cardversation · ${a.id} · deck ${i + 1}`, 'kicker')}\n${he('h2', deck.name, 'title')}\n<p class="meta">${deck.cards.length} cards${deck.type === 'action' ? ' · action deck' : ''} · ${link(activityFile(a.id).slice(2), 'back to Cardversation')}</p>\n${cards.join('\n')}`;
  return {path: `a/${a.id}-deck-${i + 1}.dc.html`, w, h, title: `Cardversation · deck ${i + 1}`, html: board({title: `Cardversation deck ${i + 1}`, w, h, uiCss: '../ui.css', body: labPage(w, h, body)})};
}

function buildActivities() {
  const acts = Object.values(P.activities).filter(a => kindNames[a.kind]);
  const rows = KINDS.map(([kind, label]) => {
    const items = [];
    for (const a of acts.filter(x => x.kind === kind)) {
      items.push(activityBoard(a));
      if (kind === 'inner') for (const [key, l] of Object.entries(THEMES)) items.push(thoughtBoard(a, key, l));
      if (kind === 'cards') P.cards.forEach((deck, i) => items.push(deckBoard(a, deck, i)));
    }
    return {id: 'row-' + kind, title: `${label} · ${acts.filter(x => x.kind === kind).length}`, items};
  });
  const counts = KINDS.map(([kind, label]) => `${label} ${acts.filter(a => a.kind === kind).length}`).join(' · ');
  const index = KINDS.map(([kind, label]) => `<div class="box"><p class="kicker">${esc(label)}</p><p>${acts.filter(a => a.kind === kind).map(a => link(activityFile(a.id), a.id)).join(' · ')}</p></div>`).join('\n');
  const mainH = 760;
  const main = {path: 'Main.dc.html', w: 1100, h: mainH, title: 'Activities · index',
    html: board({title: 'Activities', w: 1100, h: mainH, body: labPage(1100, mainH, `${navLinks('activities')}
${en('p', 'Psych Lab', 'kicker')}
${en('h1', 'Activities', 'title')}
<p class="sub">One board per activity with everything program.json holds for it: intro page, intro film, schedule, every thought, card and reflection screen, and the recordings. Hebrew is quoted verbatim from the sources; labels are English; a gap says No source text.</p>
<p class="meta">${esc(acts.length)} activities · ${esc(counts)} · built ${esc(P.built_at)} from psych-lab/intervention/program.json</p>
${index}`)})};
  const laid = layout(rows, mainH + 80, ACT_W, 6);
  return {main, ...laid};
}

// ---------- Films & scripts ----------
const FILM_W = 1240;
function filmBoard(id) {
  const film = FS.films[id], record = NARRATION[id];
  const lines = film.lines.map(line => {
    const scene = record.scenes[line.scene];
    return {v: !!line.verbatim, script: line.script.map(q => q.text), sc: line.script_changed || [],
      said: line.verbatim ? null : scene.orig, fc: line.film_changed || [],
      voiced: line.voiced_changed ? scene.sents.map(s => s.plain) : null, vc: line.voiced_changed || []};
  });
  const exact = film.lines.filter(l => l.verbatim).length;
  const right = FILM_W - 72 - 400;
  let h = 260;
  for (const l of lines) {
    h += 54 + l.script.reduce((n, t) => n + textHeight(t, right, 18, 1.75), 0);
    if (l.said) h += 30 + textHeight(l.said, right, 16, 1.75);
    if (l.voiced) h += 30 + textHeight(l.voiced.join(' '), right, 16, 1.75);
  }
  h += film.not_narrated.length ? 60 : 0;
  h = Math.max(760, Math.min(8000, Math.round(h * 1.08)));
  const src = filmAsset('films', id);
  const notNarrated = film.not_narrated.length ? `<details style="margin-top: 16px"><summary class="meta">Script text not in the film (${film.not_narrated.length})</summary>\n${film.not_narrated.map(q => he('p', q.text, 'text')).join('\n')}\n</details>` : '';
  const later = film.later_version ? `<p class="issue">A later copy-edit of this script exists: ${esc(film.later_version.id)} in Psychology Hebrew.docx, with ${esc(film.later_version.differences)} differences from the film. The film follows the document beside it.</p>` : '';
  const body = `<div class="lab" style="width: ${FILM_W}px; height: ${h}px; padding: 32px 36px; display: flex; gap: 40px; align-items: flex-start">
<div style="width: 360px; flex-shrink: 0; display: flex; flex-direction: column; gap: 10px">
${en('p', 'Film beside its script', 'kicker')}
${en('h2', 'Film ' + id, 'title')}
${src ? `<video controls="controls" preload="none" playsinline="playsinline" src="${src}" style="width: 360px; height: 360px; object-fit: cover; border-radius: 16px; background: #E9EFEC; display: block"></video>` : '<p class="gap">Video not on this canvas</p>'}
<p class="meta" style="margin-bottom: 0">Script document</p>
<p class="meta" style="margin-top: 0; overflow-wrap: anywhere"><code>${esc(film.source)}</code></p>
<p class="meta">${exact} of ${film.lines.length} lines narrated word for word · voiced with the ElevenLabs API</p>
${later}
<p class="meta">Highlighted words differ between the script and what was narrated.</p>
<p class="meta">${link(URL.activities, 'Activities')} · ${link(URL.phone, 'Phone preview')} · ${link(URL.home, 'Home')}</p>
</div>
<div style="flex: 1 1 auto; min-width: 0">
<sc-for list="{{lines}}" as="line" hint-placeholder-count="6">
<section class="sec" style="margin-top: 0; margin-bottom: 14px">
<sc-if value="{{line.v}}" hint-placeholder-val="{{ true }}"><span class="tag">Word for word</span></sc-if>
<sc-if value="{{line.nv}}" hint-placeholder-val="{{ false }}"><span class="tag" style="background: #F3E2BD; color: #6B4D12">Differs from the script</span></sc-if>
<sc-for list="{{line.script}}" as="q" hint-placeholder-count="1"><p class="he text" dir="rtl" lang="he" style="font-size: 18px"><sc-for list="{{q.words}}" as="w" hint-placeholder-count="8"><sc-if value="{{w.m}}" hint-placeholder-val="{{ false }}"><mark>{{w.t}}</mark></sc-if><sc-if value="{{w.p}}" hint-placeholder-val="{{ true }}"><span>{{w.t}}</span></sc-if> </sc-for></p></sc-for>
<sc-if value="{{line.hasSaid}}" hint-placeholder-val="{{ false }}"><p class="lbl">Narrated as</p><p class="he text" dir="rtl" lang="he" style="background: #EFF5F2; border-radius: 8px; padding: 4px 10px; font-size: 16px"><sc-for list="{{line.said}}" as="w" hint-placeholder-count="8"><sc-if value="{{w.m}}" hint-placeholder-val="{{ false }}"><mark>{{w.t}}</mark></sc-if><sc-if value="{{w.p}}" hint-placeholder-val="{{ true }}"><span>{{w.t}}</span></sc-if> </sc-for></p></sc-if>
<sc-if value="{{line.hasVoiced}}" hint-placeholder-val="{{ false }}"><p class="lbl">Text sent to ElevenLabs (adjusted for pronunciation)</p><p class="he text" dir="rtl" lang="he" style="background: #EFF5F2; border-radius: 8px; padding: 4px 10px; font-size: 16px"><sc-for list="{{line.voiced}}" as="w" hint-placeholder-count="8"><sc-if value="{{w.m}}" hint-placeholder-val="{{ false }}"><mark>{{w.t}}</mark></sc-if><sc-if value="{{w.p}}" hint-placeholder-val="{{ true }}"><span>{{w.t}}</span></sc-if> </sc-for></p></sc-if>
</section>
</sc-for>
${notNarrated}
</div>
</div>`;
  const logic = `class Component extends DCLogic {
  // Each line as the script document and the narration record have it; words are split only to mark differences.
  data() { return ${jsData({lines})}; }
  renderVals() {
    const split = (texts, changed) => {
      const marks = new Set(changed || []);
      let at = 0;
      return texts.map((t) => ({ words: t.replace(/\\s+/g, ' ').trim().split(' ').filter(Boolean).map((w) => { const m = marks.has(at++); return { t: w, m, p: !m }; }) }));
    };
    return {
      lines: this.data().lines.map((l) => ({
        v: l.v, nv: !l.v,
        script: split(l.script, l.sc),
        hasSaid: !!l.said, said: l.said ? split([l.said], l.fc)[0].words : [],
        hasVoiced: !!l.voiced, voiced: l.voiced ? split(l.voiced, l.vc).flatMap((q) => q.words) : []
      }))
    };
  }
}`;
  return {path: `f/${id}.dc.html`, w: FILM_W, h, title: `Film ${id}`, interactive: false, html: board({title: `Film ${id} beside its script`, w: FILM_W, h, uiCss: '../ui.css', body, logic})};
}

function buildFilms() {
  const ids = Object.keys(FS.films);
  const exactAll = ids.filter(id => FS.films[id].lines.every(l => l.verbatim)).length;
  const mainH = 560;
  const main = {path: 'Main.dc.html', w: 1100, h: mainH, title: 'Films & scripts · index',
    html: board({title: 'Films & scripts', w: 1100, h: mainH, body: labPage(1100, mainH, `${navLinks('films')}
${en('p', 'Psych Lab', 'kicker')}
${en('h1', 'Films & scripts', 'title')}
<p class="sub">Each of the ${ids.length} animated films beside the script document it narrates. Script lines are quoted from the documents in sources/film-scripts/; the narrated text comes from the films' narration record (${esc(FS.narration)}). Highlighted words differ.</p>
<p class="meta">${exactAll} of ${ids.length} films are narrated word for word. Spoken audio itself is not compared, only the text sent for voicing.</p>
<div class="box"><p>${ids.map(id => link(`f/${id}.dc.html`, id)).join(' · ')}</p></div>`)})};
  const rows = [{id: 'row-films', title: `Films · ${ids.length}`, items: ids.map(filmBoard)}];
  return {main, ...layout(rows, mainH + 80, FILM_W, 4)};
}

// ---------- Phone preview ----------
const breathPhases = {'PS-ACT-001': [['Inhale', 3, .6, 1], ['Exhale', 5, 1, .6]], 'PS-ACT-005': [['Inhale', 3, .6, 1], ['Hold', 3, 1, 1], ['Exhale', 3, 1, .6], ['Hold', 3, .6, .6]], 'PS-ACT-019': [['Inhale', 2, .6, .88], ['Top-up', 1, .88, 1], ['Exhale', 6, 1, .6]], 'PS-ACT-020': [['Inhale', 5.5, .6, 1], ['Exhale', 5.5, 1, .6]]};

function phoneClip(clip) {
  if (!clip) return null;
  const url = isFilm(clip.id) ? filmAsset('phone', clip.id) : mediaAsset('phone', clip.url);
  return {id: clip.id, url, seconds: clip.seconds, preview: REG.media.previews.includes(clip.url)};
}

function reflectionScript(a, session) {
  const type = reflectionType(a.id);
  const rows = (screen, field) => P.reflections[type].filter(r => r.screen.toLowerCase() === screen.toLowerCase() && (!field || r.field === field));
  const text = (screen, field) => { const l = rows(screen, field); return l[0]?.hebrew || l[0]?.english || ''; };
  let parts = type === 'pleasant' ? ['Recall', 'Return', 'Emotions', 'Body', 'Thoughts', 'Notice now'] : type === 'gratitude' ? ['Bring to mind', 'Focus', 'Effect', 'Appreciate'] : ['Invite', 'Look back', 'Notice', 'Make room', 'Action'];
  if (!session.context) parts = ['Context', ...parts];
  const variant = session.number % 5;
  return {
    parts: parts.map(part => {
      let list = rows(part, 'Prompt');
      if (!list.length) list = rows(part).filter(r => /^\d+$/.test(r.field));
      if (!list.length && part === 'Context') list = rows(part);
      const related = type === 'pleasant' ? ({Recall: 'Ideas', Emotions: 'Emotion words', Body: 'Body words', Thoughts: 'Thought phrases'}[part]) : (part === 'Invite' || part === 'Bring to mind') ? 'Ideas' : null;
      return {part, prompt: list.length ? list[variant % list.length].hebrew : '',
        ideasLabel: related ? text(part, 'Button 1') : '', ideas: related ? rows(related).map(r => r.hebrew).filter(Boolean) : [],
        hold: text(part, 'Hold label') || (['Look back', 'Notice', 'Make room'].includes(part) ? text('Reflection screens', 'Hold label') : ''),
        next: text(part, 'Button 2') || text(part, 'Button')};
    }),
    title: text('Summary', 'Title'), subtitle: text('Summary', 'Subtitle'),
    tip: P.reflections[type].filter(r => r.screen === 'Tip 1' && r.field === 'Body')[0]?.hebrew || ''
  };
}

function phoneStep(st, session) {
  const out = {kind: st.kind, activity: st.activity || null};
  if (st.kind === 'video') Object.assign(out, {clip: phoneClip(st.clip), seconds: st.seconds, trailer: !!st.trailer, source_id: st.source_id});
  if (st.kind === 'context') Object.assign(out, {hebrew: st.content.hebrew || '', english: st.content.english || ''});
  if (st.kind === 'breathing') Object.assign(out, {seconds: st.seconds, phases: breathPhases[st.activity] || breathPhases['PS-ACT-001']});
  if (st.kind === 'audio') Object.assign(out, {seconds: st.seconds, audio: st.audio ? {url: mediaAsset('phone', st.audio.url), seconds: st.audio.seconds, status: st.audio.status} : null});
  if (st.kind === 'inner') out.theme = thoughtTheme(st.parameter);
  if (st.kind === 'reflection') out.reflection = reflectionScript(P.activities[st.activity], session);
  return out;
}

function phoneSessions() {
  return P.sessions.map(session => {
    const steps = sessionSteps(P, session, {intros: 'timeline', durations: {}, keeps: false}, {});
    const out = steps.map((st, i) => {
      const step = phoneStep(st, session);
      if (st.kind === 'choice') {
        const a = P.activities[st.activity];
        const introduced = steps.slice(0, i).filter(s => s.kind === 'video').flatMap(s => [s.source_id, s.clip?.id]);
        step.options = a.options.map(o => ({id: o.id, steps: chooseSteps(P, o.id, session, {intros: 'timeline', durations: {}}, {}, o.parameter, introduced).map(x => phoneStep(x, session))}));
      }
      return step;
    });
    const range = sessionRange(P, session, {}, {});
    return {n: session.number, id: session.id, title: session.title, english: session.english, week: session.week, day: session.app_day,
      acts: session.activities.map(o => o.id), range: time(range.low) + (range.high - range.low > 1 ? '–' + time(range.high) : ''), steps: out};
  });
}

function phoneData() {
  const sessions = phoneSessions();
  const used = new Set();
  const walk = steps => steps.forEach(s => { if (s.activity) used.add(s.activity); (s.options || []).forEach(o => { used.add(o.id); walk(o.steps); }); });
  sessions.forEach(s => { s.acts.forEach(id => used.add(id)); walk(s.steps); });
  const acts = Object.fromEntries([...used].map(id => {
    const a = P.activities[id];
    return [id, {id, kind: a.kind, title: a.title, english: a.english, subtitle: a.subtitle || '', lead: a.lead || '', bullets: a.bullets || [], equipment: a.equipment || '', safety: a.safety || '',
      planned: a.audio?.seconds || a.planned_seconds || 0}];
  }));
  const typeLabel = type => Object.values(P.thoughts).flat().find(t => t.type === type && t.type_he)?.type_he || '';
  return {sessions, acts,
    thoughts: Object.fromEntries(Object.entries(P.thoughts).map(([k, v]) => [k, v.map(t => ({text: t.text, keep: !!t.keep, type: t.type, type_he: t.type_he || '', correct: t.correct || '', incorrect: t.incorrect || ''}))])),
    cards: P.cards.map(d => ({name: d.name, action: d.type === 'action', cards: d.cards.map(c => ({number: c.number, a: c.a || '', b: c.b || '', ideas_a: c.ideas_a || '', ideas_b: c.ideas_b || '', followups: (c.followups || []).filter(f => f.text).map(f => ({text: f.text, ideas: f.ideas || ''}))}))})),
    labels: {let: typeLabel('Let it go'), keep: typeLabel('Take it in')}};
}

const PHONE_LOGIC = fs.readFileSync(path.join(HERE, 'phone-logic.js'), 'utf8');
const PHONE_MARKUP = fs.readFileSync(path.join(HERE, 'phone-markup.html'), 'utf8');

function buildPhone() {
  const data = phoneData();
  const phone = {path: 'Phone.dc.html', w: 390, h: 844, title: 'Phone · all 87 sessions', interactive: true,
    html: `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Phone preview</title>
<script src="./support.js"></script>
<link rel="stylesheet" href="ui.css">
</head>
<body>
<x-dc>
<helmet>
${FONTS}
<style>
body{margin:0}
.lab{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;direction:ltr;text-align:left}
.he{font-family:Rubik,system-ui,sans-serif;direction:rtl;text-align:right}
.gap{display:block;background:#FFDEA3;color:#261900;border-radius:12px;padding:10px 14px;font:14px/1.45 system-ui,sans-serif;direction:ltr;text-align:left}
.srow{display:flex;flex-direction:column;align-items:stretch;gap:2px;width:100%;min-height:64px;border:0;border-bottom:1px solid #DDE4E1;background:transparent;padding:10px 4px;cursor:pointer;text-align:right;color:inherit}
.opt{display:flex;justify-content:space-between;align-items:center;gap:12px;width:100%;min-height:72px;border:1.5px solid #BEC9C5;border-radius:20px;background:#FFFFFF;padding:12px 16px;cursor:pointer;color:inherit;margin-bottom:10px}
.word{display:inline-block;background:#E3EAE7;border-radius:999px;padding:4px 12px;margin:0 0 8px 8px;font-size:16px}
.orb{width:180px;height:180px;border-radius:50%;background:#B3EFE4;margin:0 auto;transition:transform .1s linear}
</style>
</helmet>
${PHONE_MARKUP}
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":390,"height":844}}'>
class Component extends DCLogic {
  // Every session's steps, sequenced by core.mjs from program.json; program text exactly as the sources have it.
  data() { if (!this._d) this._d = ${jsData(data)}; return this._d; }
${PHONE_LOGIC}
}
</script>
</body>
</html>
`};
  const intro047 = P.activities['PS-CONT-047'];
  const src047 = mediaAsset('phone', '/intervention/media/PS-CONT-047.mp4');
  const notes047 = issueNotes(intro047);
  const heldH = 820;
  const held = {path: 'HeldOut-047.dc.html', w: 520, h: heldH, title: 'PS-CONT-047 · held out of the flow',
    html: board({title: 'PS-CONT-047 held out', w: 520, h: heldH, body: labPage(520, heldH, `${en('p', 'Source conflict', 'kicker')}
${en('h2', 'PS-CONT-047', 'title')}
<p class="sub">The timeline and metadata call this a breathing introduction; the supplied Hebrew source video is a mindfulness text that overlaps old S28. It is kept here for inspection and is never played in the breathing flow.</p>
${src047 ? `<video controls="controls" preload="none" playsinline="playsinline" src="${src047}" style="width: 220px; height: 391px; border-radius: 16px; background: #E9EFEC; display: block; margin: 12px 0"></video>` : ''}
<p class="meta">720p preview encode for the canvas; the original file stays in psych-lab/intervention/media/PS-CONT-047.mp4.</p>
${notes047.map(n => en('p', n, 'issue')).join('\n')}`)})};
  const mainH = 844;
  const main = {path: 'Main.dc.html', w: 760, h: mainH, title: 'Phone preview · about',
    html: board({title: 'Phone preview', w: 760, h: mainH, body: labPage(760, mainH, `${navLinks('phone')}
${en('p', 'Psych Lab', 'kicker')}
${en('h1', 'Phone preview', 'title')}
<p class="sub">Press Play on the phone to walk any of the 87 psychology sessions as core.mjs sequences them from program.json: intro pages, films, choices, breathing, recordings, Inner Voice, Cardversation and reflections.</p>
<div class="box">
<p class="kicker">What the phone shows</p>
<p>Hebrew only where a program source has it. Interface words are English Lab labels. Screens whose program text is in no source (motivation, post-practice question, in-practice breathing prompts, choice heading, missing Inner Voice feedback, closing message) show No source text.</p>
<p>Breathing phase names and timings are Lab assumptions. Missing recordings and videos keep their time slot and say so. Sessions 8 and 28 play the current Remepy app clips PS-CONT-029 and PS-CONT-013; PS-CONT-013 is a 720p preview encode.</p>
</div>
<div class="box">
<p class="kicker">Not carried over from the local preview</p>
<p>Timing runs, review notes, favourites and the tool library. Leave notes as canvas comments instead.</p>
</div>`)})};
  const boards = [
    {path: main.path, frame: {x: 0, y: 0, w: main.w, h: main.h, title: main.title}, html: main.html},
    {path: phone.path, frame: {x: 840, y: 0, w: 390, h: 844, title: phone.title, is_interactive: true}, html: phone.html},
    {path: held.path, frame: {x: 1310, y: 0, w: held.w, h: held.h, title: held.title}, html: held.html}];
  return {boards, notes: {}};
}

// ---------- Home ----------
function buildHome(stats) {
  const status = read('psych-lab/intervention/implementation-status.json');
  const tiles = [
    ['original', 'The preserved design canvas: who we design for, the design system, daily experience, practices and games, program rhythm, the 51 animated script films with their storyboards, Ruth\'s journey and the scene library.'],
    ['activities', `${stats.activities} activities, one board each: intro pages, intro films, schedules, all ${stats.thoughts} Inner Voice thoughts, ${stats.cards} Cardversation cards, every reflection screen and the four recordings.`],
    ['films', `The ${stats.films} films beside the script documents they narrate; ${stats.exactFilms} are word for word and differences are highlighted.`],
    ['phone', `Walk any of the ${stats.sessions} psychology sessions on a phone, in the order the sources give them.`]];
  const gaps = [
    `Eight scheduled practice recordings are not yet recorded: ${status.scheduled_recording_status.ids.join(', ')} (owner confirmation ${status.scheduled_recording_status.confirmed_on}).`,
    `Five library-only recordings were not supplied: ${status.unavailable_library_only_recordings.join(', ')}.`,
    ...Object.entries(status.other_source_gaps).map(([id, why]) => `${id}: ${why}.`),
    `Inner Voice feedback text exists for ${stats.feedback} of ${stats.thoughts} thoughts.`,
    'Guided relaxation (PS-CONT-065) is a draft edit, marked not finalized in its source.'];
  const w = 1280, h = 1000;
  const body = labPage(w, h, `${en('p', 'Remepy · Parkinson\'s psychological program', 'kicker')}
<h1 class="title" style="font-size: 40px">Psych Lab</h1>
<p class="sub" style="max-width: 900px">A lab for exploring the program's scripts, activities, films and flow. Program text on these canvases is quoted verbatim from source files in the Git repository, with its source; where no source text exists, the boards say so instead of filling the gap.</p>
<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; margin-top: 24px">
${tiles.map(([k, text]) => `<a href="${URL[k]}" target="_blank" rel="noopener" class="box" style="display: block; text-decoration: none; color: inherit; padding: 20px 22px; margin: 0"><p class="kicker">Canvas</p><p style="font-size: 22px; font-weight: 600; margin: 4px 0 6px; color: #2B6A62">${esc(TITLE[k])} →</p><p style="margin: 0">${esc(text)}</p></a>`).join('\n')}
</div>
<section class="sec" style="margin-top: 28px"><h3>Gaps the sources leave open</h3>
${gaps.map(g => en('p', g, 'meta')).join('\n')}
</section>
<section class="sec"><h3>How these canvases are made</h3>
<p class="meta">Built by canvas/build.mjs in the Reakwind/psych-lab repository from program.json (built ${esc(P.built_at)}), film-scripts.json and the films' narration record, and checked with scripts/verbatim.py before publishing. Source files are read-only.</p>
</section>`);
  return {boards: [{path: 'Main.dc.html', frame: {x: 0, y: 0, w, h, title: 'Psych Lab · home'}, html: board({title: 'Psych Lab', w, h, body})}], notes: {}};
}

// ---------- Original design: one navigation board ----------
// The original canvas is the preserved design and is not generated; with the owner's agreement
// (2026-11-02) it gains this one board linking back to Home and the other canvases.
function buildOriginalNav() {
  const w = 1440, h = 420;
  const tiles = ['home', 'activities', 'films', 'phone'].map(k => `<a href="${URL[k]}" target="_blank" rel="noopener" class="box" style="display: block; text-decoration: none; color: inherit; padding: 18px 20px; margin: 0"><p class="kicker">Canvas</p><p style="font-size: 22px; font-weight: 600; margin: 4px 0 0; color: #2B6A62">${esc(TITLE[k])} →</p></a>`);
  const body = labPage(w, h, `${en('p', 'Psych Lab', 'kicker')}
<h1 class="title" style="font-size: 40px">This is the original design canvas</h1>
<p class="sub" style="max-width: 1000px">It is preserved as designed: who we design for, the design system, daily experience, practices and games, program rhythm, the animated script films with their storyboards, Ruth's journey and the scene library. The Lab's other canvases are built from the repository's verified sources.</p>
<div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; margin-top: 28px">
${tiles.join('\n')}
</div>`);
  return {path: 'LabNav.dc.html', frame: {x: 0, y: -880, w, h, title: 'Psych Lab · back to Home'}, html: board({title: 'Psych Lab navigation', w, h, body})};
}

function emitOriginalNav(check) {
  const nav = buildOriginalNav();
  const target = path.join(HERE, 'original', 'project', nav.path);
  const frame = path.join(HERE, 'original', 'frame.json');
  const files = [[target, nav.html], [frame, JSON.stringify({[nav.path]: nav.frame}, null, 1) + '\n']];
  const problems = [];
  for (const [file, content] of files) {
    if (check) { if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== content) problems.push(path.relative(ROOT, file)); }
    else { fs.mkdirSync(path.dirname(file), {recursive: true}); fs.writeFileSync(file, content); }
  }
  return {problems, count: 1};
}

// ---------- write ----------
function emit(name, title, built, check) {
  const dir = path.join(HERE, name, 'project');
  const files = {'canvas.json': JSON.stringify(canvasIndex(title, built.boards, built.notes), null, 1) + '\n'};
  for (const b of built.boards) files[b.path] = b.html;
  const problems = [];
  for (const [rel, content] of Object.entries(files)) {
    const target = path.join(dir, rel);
    if (check) {
      if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== content) problems.push(path.relative(ROOT, target));
    } else {
      fs.mkdirSync(path.dirname(target), {recursive: true});
      fs.writeFileSync(target, content);
    }
  }
  if (!check && fs.existsSync(dir)) {
    const keep = new Set(Object.keys(files));
    const walk = d => fs.readdirSync(d, {withFileTypes: true}).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
    for (const f of walk(dir)) if (!keep.has(path.relative(dir, f))) fs.rmSync(f);
  }
  return {problems, count: built.boards.length};
}

const check = process.argv.includes('--check');
const activities = buildActivities();
const films = buildFilms();
const stats = {activities: Object.values(P.activities).filter(a => kindNames[a.kind]).length,
  thoughts: Object.values(P.thoughts).flat().length, feedback: Object.values(P.thoughts).flat().filter(t => t.correct || t.incorrect).length,
  cards: P.cards.reduce((n, d) => n + d.cards.length, 0), films: Object.keys(FS.films).length,
  exactFilms: Object.values(FS.films).filter(f => f.lines.every(l => l.verbatim)).length, sessions: P.sessions.length};
const results = {
  home: emit('home', TITLE.home, buildHome(stats), check),
  activities: emit('activities', TITLE.activities, {boards: [{path: activities.main.path, frame: {x: 0, y: 0, w: activities.main.w, h: activities.main.h, title: activities.main.title}, html: activities.main.html}, ...activities.boards], notes: activities.notes}, check),
  films: emit('films', TITLE.films, {boards: [{path: films.main.path, frame: {x: 0, y: 0, w: films.main.w, h: films.main.h, title: films.main.title}, html: films.main.html}, ...films.boards], notes: films.notes}, check),
  phone: emit('phone', TITLE.phone, buildPhone(), check),
  original: emitOriginalNav(check)};
const stale = Object.values(results).flatMap(r => r.problems);
if (check && stale.length) { console.error('Canvas boards are not current; run node canvas/build.mjs:\n  ' + stale.join('\n  ')); process.exit(1); }
console.log(Object.entries(results).map(([k, r]) => `${k}: ${r.count} boards`).join(' · ') + (check ? ' · current' : ' · written'));
