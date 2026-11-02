// Activities explorer: every activity with all of its sourced content, one page each.
// Program text (Hebrew) is only ever read from program.json, which is built from the sources and
// verified verbatim. This file writes English Lab labels only; where the sources hold no text,
// the page says so instead of filling the gap.
import {minuteLabel as time, thoughtTheme, reflectionType, introClip} from './core.mjs';

const $ = id => document.getElementById(id);
const make = (tag, text = '', cls = '') => {const e = document.createElement(tag); if (text) e.textContent = text; if (cls) e.className = cls; return e;};
const he = (tag, text, cls = '') => {const e = make(tag, text, cls); e.lang = 'he'; e.dir = 'rtl'; return e;};
const noSource = what => {const e = make('p', '', 'no-source'); e.append(make('strong', 'No source text'), make('span', ' · ' + what)); return e;};
const section = (title, ...children) => {const s = make('section'); s.append(make('h3', title), ...children); return s;};

const KINDS = [['breathing', 'Breathing'], ['inner', 'Inner Voice'], ['cards', 'Cardversation'], ['reflection', 'Reflection'], ['audio', 'Guided audio'], ['choice', 'Choice groups']];
const KIND_NAME = Object.fromEntries(KINDS);
const THEMES = {motivation: 'Motivation', balanced: 'Balancing thoughts', relaxation: 'Relaxation', mindfulness: 'Mindfulness', compassion: 'Compassion & validation', labels: 'Labels', flexible: 'Flexible thinking (General sheet)'};
let P, selected, theme = 'motivation';

function activities() {return Object.values(P.activities).filter(a => KIND_NAME[a.kind]);}

function renderList() {
  const q = $('search').value.trim().toLowerCase();
  const list = $('list'); list.replaceChildren();
  for (const [kind, label] of KINDS) {
    const items = activities().filter(a => a.kind === kind && (!q || `${a.id} ${a.title} ${a.english}`.toLowerCase().includes(q)));
    if (!items.length) continue;
    list.append(make('div', `${label} · ${items.length}`, 'group'));
    for (const a of items) {
      const b = make('button', '', 'item'); b.type = 'button';
      b.setAttribute('aria-current', String(a.id === selected));
      b.append(he('span', a.title, 'he'), make('span', a.english, 'en'), make('span', a.id, 'id'));
      b.addEventListener('click', () => show(a.id));
      list.append(b);
    }
  }
}

function sessionsFor(id) {
  const direct = P.sessions.filter(s => s.activities.some(o => o.id === id)).map(s => ({s, via: null, parameter: s.activities.find(o => o.id === id).parameter}));
  const viaGroups = Object.entries(P.groups).filter(([, options]) => options.some(o => o.id === id))
    .flatMap(([gid]) => P.sessions.filter(s => s.activities.some(o => o.id === gid)).map(s => ({s, via: gid, parameter: ''})));
  return [...direct, ...viaGroups];
}

function schedule(a) {
  const rows = sessionsFor(a.id);
  if (!rows.length) return section('Schedule', make('p', a.library_only ? 'Not on the V0 timeline: library only.' : 'Not scheduled on the V0 timeline.', 'meta'));
  const chips = make('div', '', 'sessions');
  for (const {s, via, parameter} of rows) {
    chips.append(make('span', `${s.id} · week ${s.week}` + (parameter ? ` · ${parameter}` : '') + (via ? ` · option of ${P.activities[via]?.english || via}` : ''), 'chip'));
  }
  return section(`Schedule · ${rows.length} session${rows.length === 1 ? '' : 's'}`, chips);
}

function introPage(a) {
  const parts = [];
  if (a.subtitle) parts.push(he('p', a.subtitle, 'subtitle'));
  if (a.lead) parts.push(he('p', a.lead, 'he-text'));
  if (a.bullets?.length) {const ul = he('ul', '', 'he-list'); a.bullets.forEach(x => ul.append(make('li', x))); parts.push(ul);}
  if (a.equipment) parts.push(he('p', a.equipment, 'he-text'));
  if (a.safety) parts.push(he('p', a.safety, 'he-text'));
  if (!parts.length) parts.push(noSource('intro page text'));
  const names = (a.sources || []).map(k => P.sources[k]?.title || k).join(' · ');
  if (names) parts.push(make('p', 'From: ' + names, 'meta'));
  return section('Intro page', ...parts);
}

function film(clip, id, label) {
  const v = make('video'); v.controls = true; v.preload = 'metadata'; v.src = clip.url; v.setAttribute('aria-label', id + ' ' + label);
  const parts = [v, make('p', `${id} · film ${clip.id} · ${time(clip.seconds)}`, 'meta')];
  if (/^S\d/.test(clip.id)) {const link = make('a', 'Script beside narration, word by word'); link.href = `/?session=${clip.id}&tab=script`; link.target = '_top'; parts.push(link);}
  return parts;
}

function notes(item) {
  return [...new Set([...(item?.issues || []), item?.source_conflict, item?.source_note].filter(Boolean))].map(x => make('p', x, 'issue'));
}

function introFilm(a) {
  if (!a.intro_id) return null;
  const intro = P.activities[a.intro_id];
  const parts = [];
  if (intro && intro.id !== a.id) parts.push(he('p', intro.title, 'he-text'));
  const clip = introClip(P, a);  // the same resolution the phone preview uses
  if (clip) parts.push(...film(clip, a.intro_id, 'intro film'));
  else parts.push(make('p', `${a.intro_id} · no film for this intro in the Lab copy.`, 'meta'));
  // Facts recorded on the intro itself (such as the PS-CONT-047 conflict) belong on this page too.
  if (intro && intro.id !== a.id) parts.push(...notes(intro));
  if (intro?.review_media) {
    const link = make('a', 'Inspect the conflicted source video (held out of the flow)'); link.href = intro.review_media; link.target = '_blank'; link.rel = 'noopener';
    parts.push(link);
  }
  return section('Intro film', ...parts);
}

function ownFilm(a) {
  return section('Film', ...(a.clip ? film(a.clip, a.id, 'film') : [make('p', `${a.id} · no film in the Lab copy.`, 'meta')]));
}

function thoughtTable(rows) {
  const t = make('table'); const head = make('tr');
  ['Thought', 'Type', 'English', 'Feedback'].forEach(h => head.append(make('th', h)));
  t.append(head);
  for (const r of rows) {
    const tr = make('tr');
    const type = he('span', r.type_he || r.type, 'type ' + (r.keep ? 'keep' : 'let'));
    const fb = make('td');
    if (r.correct || r.incorrect) {
      if (r.correct) fb.append(make('div', 'Right answer:', 'meta'), he('div', r.correct, 'he-text'));
      if (r.incorrect) fb.append(make('div', 'Wrong answer:', 'meta'), he('div', r.incorrect, 'he-text'));
    } else fb.append(noSource('feedback'));
    const cell = he('td', r.text, 'he-cell'); const tc = make('td'); tc.append(type);
    tr.append(cell, tc, make('td', r.english, 'meta'), fb); t.append(tr);
  }
  return t;
}

function innerVoice() {
  const tabs = make('div', '', 'tabs');
  for (const [key, label] of Object.entries(THEMES)) {
    const b = make('button', `${label} · ${P.thoughts[key]?.length || 0}`); b.type = 'button';
    b.setAttribute('aria-pressed', String(key === theme));
    b.addEventListener('click', () => {theme = key; show(selected);});
    tabs.append(b);
  }
  const uses = P.sessions.filter(s => s.activities.some(o => o.id === 'PS-ACT-002' && thoughtTheme(o.parameter) === theme)).map(s => s.id);
  const rows = P.thoughts[theme] || [];
  const withFeedback = rows.filter(r => r.correct || r.incorrect).length;
  return section('Thoughts', tabs,
    make('p', `${rows.length} thoughts · feedback text for ${withFeedback} · played in ${uses.join(', ') || 'no scheduled session'}`, 'meta'),
    thoughtTable(rows));
}

function cards() {
  const parts = [];
  for (const deck of P.cards) {
    parts.push(he('h3', deck.name)); parts.push(make('p', `${deck.cards.length} cards` + (deck.type === 'action' ? ' · action deck' : ''), 'meta'));
    for (const c of deck.cards) {
      const box = make('div', '', 'card');
      box.append(make('div', `Card ${c.number}`, 'meta'));
      for (const [q, ideas, label] of [[c.a, c.ideas_a, deck.type === 'action' ? 'Action' : 'Question 1'], [c.b, c.ideas_b, 'Question 2']]) {
        if (!q) continue;
        box.append(make('div', label, 'meta'), he('p', q, 'q'));
        if (ideas) box.append(he('div', ideas, 'ideas'));
      }
      for (const f of c.followups || []) {
        if (!f.text) continue;
        box.append(make('div', 'Follow-up', 'meta'), he('p', f.text, 'q'));
        if (f.ideas) box.append(he('div', f.ideas, 'ideas'));
      }
      parts.push(box);
    }
  }
  return section('Decks', ...parts);
}

function reflection(a) {
  const type = reflectionType(a.id);
  const rows = P.reflections[type] || [];
  const parts = [make('p', `${rows.length} rows from the mindful-moments sheet, in sheet order.`, 'meta')];
  let current = null, box = null;
  for (const r of rows) {
    if (r.screen !== current) {current = r.screen; box = make('div', '', 'screen'); box.append(make('h4', r.screen)); parts.push(box);}
    const field = make('div', '', 'field');
    const text = make('div'); text.append(he('div', r.hebrew, 'he-text'));
    if (r.female && r.female !== r.hebrew) text.append(make('div', 'Female form:', 'meta'), he('div', r.female, 'he-text'));
    if (!r.hebrew) text.append(noSource('Hebrew for this row'));
    field.append(make('div', r.field || '—', 'label'), text);
    box.append(field);
  }
  return section('Screens', ...parts);
}

function practice(a) {
  if (a.kind === 'breathing') return section('Practice', make('p', `Planned length ${time(a.planned_seconds)}.`, 'meta'), noSource('in-practice prompts, pacing and timing'));
  if (a.kind === 'audio') {
    if (a.audio) {const au = make('audio'); au.controls = true; au.preload = 'metadata'; au.src = a.audio.url; return section('Recording', au, make('p', `${time(a.audio.seconds)} · ${a.audio.status}`, 'meta'), noSource('written practice script (the recording is the source)'));}
    return section('Recording', make('p', `Planned length ${time(a.planned_seconds)} · ${a.recording_status === 'not_yet_recorded' ? 'not yet recorded' : 'recording not available'}.`, 'meta'), noSource('practice script'));
  }
  return null;
}

function options(a) {
  const parts = [];
  for (const o of a.options || []) {
    const item = P.activities[o.id]; const row = make('div', '', 'option');
    const b = make('button', o.id); b.type = 'button'; b.addEventListener('click', () => show(o.id));
    row.append(b, he('span', item?.title || '', 'he-text'), make('span', [o.description, o.parameter].filter(Boolean).join(' · '), 'meta'));
    parts.push(row);
  }
  return section('Options', ...parts);
}

function show(id) {
  selected = id; renderList();
  const a = P.activities[id]; const main = $('main'); main.replaceChildren(); main.scrollTop = 0;
  const detail = make('div', '', 'detail');
  detail.append(make('div', `${KIND_NAME[a.kind] || 'Video'} · ${a.id}`, 'kicker'), he('h2', a.title, 'he'), make('p', a.english, 'en-name'));
  detail.append(introPage(a));
  const film = introFilm(a); if (film) detail.append(film);
  detail.append(schedule(a));
  const content = a.kind === 'video' ? ownFilm(a) : a.kind === 'inner' ? innerVoice() : a.kind === 'cards' ? cards() : a.kind === 'reflection' ? reflection(a) : a.kind === 'choice' ? options(a) : practice(a);
  if (content) detail.append(content);
  const own = notes(a);
  if (own.length) detail.append(section('Source notes', ...own));
  main.append(detail);
  const url = new URL(location.href); url.searchParams.set('a', id); history.replaceState(null, '', url);
}

try {
  const response = await fetch('/intervention/program.json');
  if (!response.ok) throw Error('program.json unavailable');
  P = await response.json();
  const wanted = new URLSearchParams(location.search).get('a');
  $('search').addEventListener('input', renderList);
  show(P.activities[wanted] && KIND_NAME[P.activities[wanted].kind] ? wanted : 'PS-ACT-001');
} catch (error) {
  $('main').replaceChildren(make('p', 'The activities could not load. ' + error.message, 'empty'));
}
