// What the Lab shows, shared by the canvas boards (canvas/build.mjs) and the website (site/build.mjs).
// Everything here is data read from verified repository files: program text (Hebrew) is only ever
// copied from program.json, film-scripts.json, the films' narration record or interface-he.json,
// never written, joined or shortened. Markup, layout and where media is served from belong to each
// renderer; functions that place media take a resolver so each output links its own copies.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {minuteLabel as time, sessionSteps, chooseSteps, practiceSteps, sessionRange, thoughtTheme, reflectionType, introClip} from '../psych-lab/intervention/core.mjs';

export {time, thoughtTheme, reflectionType, introClip};

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const read = p => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
export const P = read('psych-lab/intervention/program.json');
export const FS = read('psych-lab/film-scripts.json');
export const NARRATION = read(FS.narration);
// The phone's Hebrew interface words: owner-approved quotes of the original design (and a few program-source
// cells), each verified by scripts/verbatim.py. Program text never comes from here.
export const INTERFACE_HE = read('canvas/interface-he.json');

export const kindNames = {video: 'Video', audio: 'Guided audio', choice: 'Choose one', breathing: 'Breathing', inner: 'Inner Voice', cards: 'Cardversation', reflection: 'Reflection'};
export const KINDS = [['breathing', 'Breathing'], ['inner', 'Inner Voice'], ['cards', 'Cardversation'], ['reflection', 'Reflection'], ['audio', 'Guided audio'], ['choice', 'Choice groups'], ['video', 'Videos']];
export const THEMES = {motivation: 'Motivation', balanced: 'Balancing thoughts', relaxation: 'Relaxation', mindfulness: 'Mindfulness', compassion: 'Compassion & validation', labels: 'Labels', flexible: 'Flexible thinking (General sheet)'};
export const isFilm = id => /^S\d/.test(id || '');

// ---------- activities ----------
export const shownActivities = () => Object.values(P.activities).filter(a => kindNames[a.kind]);

export function sessionsFor(id) {
  const direct = P.sessions.filter(s => s.activities.some(o => o.id === id)).map(s => ({s, via: null, parameter: s.activities.find(o => o.id === id).parameter}));
  const viaGroups = Object.entries(P.groups).filter(([, options]) => options.some(o => o.id === id))
    .flatMap(([gid]) => P.sessions.filter(s => s.activities.some(o => o.id === gid)).map(s => ({s, via: gid, parameter: ''})));
  return [...direct, ...viaGroups];
}

// One schedule tag per session that plays the activity, directly or as an option of a choice group.
export const scheduleTags = rows => rows.map(({s, via, parameter}) => `${s.id} · week ${s.week}` + (parameter ? ` · ${parameter}` : '') + (via ? ` · option of ${P.activities[via]?.english || via}` : ''));
export const unscheduledNote = a => a.library_only ? 'Not on the V0 timeline: library only.' : 'Not scheduled on the V0 timeline.';

export function issueNotes(item) {
  return [...new Set([...(item?.issues || []), item?.source_conflict, item?.source_note].filter(Boolean))];
}

export const sourceNames = a => (a.sources || []).map(k => P.sources[k]?.title || k);

// The sessions that play one Inner Voice thought sheet, and how many of its thoughts have feedback text.
export function thoughtSheet(a, key) {
  const list = P.thoughts[key] || [];
  const uses = P.sessions.filter(s => s.activities.some(o => o.id === a.id && thoughtTheme(o.parameter) === key)).map(s => s.id);
  return {list, uses, feedback: list.filter(t => t.correct || t.incorrect).length};
}

// ---------- films ----------
export const filmIds = () => Object.keys(FS.films);

// Each line as the script document and the narration record have it; *_changed hold the indexes of differing words.
export function filmLines(id) {
  const film = FS.films[id], record = NARRATION[id];
  const lines = film.lines.map(line => {
    const scene = record.scenes[line.scene];
    return {v: !!line.verbatim, script: line.script.map(q => q.text), sc: line.script_changed || [],
      said: line.verbatim ? null : scene.orig, fc: line.film_changed || [],
      voiced: line.voiced_changed ? scene.sents.map(s => s.plain) : null, vc: line.voiced_changed || []};
  });
  return {film, lines, exact: film.lines.filter(l => l.verbatim).length};
}

// ---------- the Lab as a whole ----------
export function stats() {
  return {activities: shownActivities().length,
    thoughts: Object.values(P.thoughts).flat().length, feedback: Object.values(P.thoughts).flat().filter(t => t.correct || t.incorrect).length,
    cards: P.cards.reduce((n, d) => n + d.cards.length, 0), films: filmIds().length,
    exactFilms: Object.values(FS.films).filter(f => f.lines.every(l => l.verbatim)).length, sessions: P.sessions.length};
}

export function sourceGaps(s = stats()) {
  const status = read('psych-lab/intervention/implementation-status.json');
  return [
    `Eight scheduled practice recordings are not yet recorded: ${status.scheduled_recording_status.ids.join(', ')} (owner confirmation ${status.scheduled_recording_status.confirmed_on}).`,
    `Five library-only recordings were not supplied: ${status.unavailable_library_only_recordings.join(', ')}.`,
    ...Object.entries(status.other_source_gaps).map(([id, why]) => `${id}: ${why}.`),
    `Inner Voice feedback text exists for ${s.feedback} of ${s.thoughts} thoughts.`,
    'Guided relaxation (PS-CONT-065) is a draft edit, marked not finalized in its source.'];
}

export const HELD_OUT_047 = 'The timeline and metadata call this a breathing introduction; the supplied Hebrew source video is a mindfulness text that overlaps old S28. It is kept here for inspection and is never played in the breathing flow.';

// ---------- the phone: sessions and their step screens ----------
// A media resolver places the files a phone screen plays:
//   clip(clip) -> {url, preview}  for a film (clip.id S01…) or a source video (clip.url as program.json names it)
//   audio(url) -> url             for a recording, by its program.json URL
// Either returns null for a file this output does not hold; the screens then say so.
const breathPhases = {'PS-ACT-001': [['Inhale', 3, .6, 1], ['Exhale', 5, 1, .6]], 'PS-ACT-005': [['Inhale', 3, .6, 1], ['Hold', 3, 1, 1], ['Exhale', 3, 1, .6], ['Hold', 3, .6, .6]], 'PS-ACT-019': [['Inhale', 2, .6, .88], ['Top-up', 1, .88, 1], ['Exhale', 6, 1, .6]], 'PS-ACT-020': [['Inhale', 5.5, .6, 1], ['Exhale', 5.5, 1, .6]]};

function phoneClip(clip, media) {
  if (!clip) return null;
  const placed = media.clip(clip) || {url: null, preview: false};
  return {id: clip.id, url: placed.url, seconds: clip.seconds, preview: placed.preview};
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

function phoneStep(st, session, media) {
  const out = {kind: st.kind, activity: st.activity || null};
  if (st.kind === 'video') Object.assign(out, {clip: phoneClip(st.clip, media), seconds: st.seconds, trailer: !!st.trailer, source_id: st.source_id});
  if (st.kind === 'context') Object.assign(out, {hebrew: st.content.hebrew || '', english: st.content.english || ''});
  if (st.kind === 'breathing') Object.assign(out, {seconds: st.seconds, phases: breathPhases[st.activity] || breathPhases['PS-ACT-001']});
  if (st.kind === 'audio') Object.assign(out, {seconds: st.seconds, audio: st.audio ? {url: media.audio(st.audio.url), seconds: st.audio.seconds, status: st.audio.status} : null});
  if (st.kind === 'inner') out.theme = thoughtTheme(st.parameter);
  if (st.kind === 'reflection') out.reflection = reflectionScript(P.activities[st.activity], session);
  return out;
}

// Screen steps for a sequence core.mjs made; a choice carries each option's own steps (one branch is added when picked).
function flowSteps(steps, session, settings, media) {
  return steps.map((st, i) => {
    const step = phoneStep(st, session, media);
    if (st.kind === 'choice') {
      const a = P.activities[st.activity];
      const introduced = steps.slice(0, i).filter(s => s.kind === 'video').flatMap(s => [s.source_id, s.clip?.id]);
      step.options = a.options.map(o => ({id: o.id, steps: chooseSteps(P, o.id, session, settings, {}, o.parameter, introduced).map(x => phoneStep(x, session, media))}));
    }
    return step;
  });
}

function phoneSessions(media) {
  return P.sessions.map(session => {
    const out = flowSteps(sessionSteps(P, session, {intros: 'timeline', durations: {}, keeps: false}, {}), session, {intros: 'timeline', durations: {}}, media);
    const range = sessionRange(P, session, {}, {});
    const hasChoice = session.activities.some(o => P.activities[o.id].kind === 'choice');
    return {n: session.number, id: session.id, title: session.title, english: session.english, week: session.week, day: session.app_day,
      acts: session.activities.map(o => o.id), range: time(range.low) + (range.high - range.low > 1 ? '–' + time(range.high) : ''),
      low: Math.round(range.low), high: Math.round(range.high),
      missing: range.missing.map(id => P.activities[id]?.english || id),
      choice: hasChoice && range.missing.length ? 'Includes every option of the choice; choosing a recorded practice may avoid a gap.' : '',
      steps: out};
  });
}

function actRecord(id) {
  const a = P.activities[id];
  return {id, kind: a.kind, title: a.title, english: a.english, subtitle: a.subtitle || '', lead: a.lead || '', bullets: a.bullets || [], equipment: a.equipment || '', safety: a.safety || '',
    planned: a.audio?.seconds || a.planned_seconds || 0};
}

// Everything the session player needs: all 87 sessions' screens, the activities they use, the thoughts and cards.
export function phoneData(media) {
  const sessions = phoneSessions(media);
  const used = new Set();
  const walk = steps => steps.forEach(s => { if (s.activity) used.add(s.activity); (s.options || []).forEach(o => { used.add(o.id); walk(o.steps); }); });
  sessions.forEach(s => { s.acts.forEach(id => used.add(id)); walk(s.steps); });
  const acts = Object.fromEntries([...used].map(id => [id, actRecord(id)]));
  const typeLabel = type => Object.values(P.thoughts).flat().find(t => t.type === type && t.type_he)?.type_he || '';
  return {sessions, acts, daily: P.daily_totals_minutes,
    thoughts: Object.fromEntries(Object.entries(P.thoughts).map(([k, v]) => [k, v.map(t => ({text: t.text, keep: !!t.keep, type: t.type, type_he: t.type_he || '', correct: t.correct || '', incorrect: t.incorrect || ''}))])),
    cards: P.cards.map(d => ({name: d.name, action: d.type === 'action', cards: d.cards.map(c => ({number: c.number, a: c.a || '', b: c.b || '', ideas_a: c.ideas_a || '', ideas_b: c.ideas_b || '', followups: (c.followups || []).filter(f => f.text).map(f => ({text: f.text, ideas: f.ideas || ''}))}))})),
    labels: {let: typeLabel('Let it go'), keep: typeLabel('Take it in')}};
}

// ---------- the app prototype: the program day by day ----------
// The spec's post-12-week suggestion (Psycological therapy specification- May 2026.docx, "Thoughts for after
// the 12 weeks"), quoted exactly; each day opens the program's own choice group or activity for it.
const SPEC = 'Psycological therapy specification- May 2026.docx';
const LOOP = [
  ['PS-ACT-012', 'Day 1 – choice between relaxation exercises: PMR, guided imagery relaxation, guided imagery safe place, grounding'],
  ['PS-ACT-006', 'Day 2 – choice between breathing exercises: belly, square, coherent, sigh'],
  ['PS-ACT-013', 'Day 3 – choice between “self-care” reflections – gratitude, self-compassion, pleasant moment, I am enough audio'],
  ['PS-ACT-007', 'Day 4 – choice between mindfulness exercises – awareness of breath, body scan, observing thoughts, mindful eating, mindful walking, attention to hands and feet'],
  ['PS-ACT-004', 'Day 5 – Card game (can be self reflection or with someone)'],
  ['PS-ACT-002', 'Day 6 – combined inner voice workout'],
  ['PS-ACT-008', 'Day 7 – choice between in-the-moment tools to practice – one breath reset, soften one place, three anchors']];
const SPEC_MISSED = 'Logic for missed days – the anchor should be prioritized and not to be missed.';
const SPEC_LIBRARY = 'In the library (or wherever else the user will be able to go back to the practice) the user should be able to skip the intro.';
const LIBRARY_KINDS = ['breathing', 'audio', 'inner', 'cards', 'reflection'];

// Protocol.xlsx names a module one way in its week sheets and another in its 'Status 1st month' sheet;
// this Lab table pairs them. 'Mindset' is the psychology session itself. An unknown name stops the build.
const PROTOCOL_STATUS = {'PT practice': 'PT', 'OT practice': 'OT', 'Dance practice': 'Dance', 'Sustained P': 'Sustained P.', 'Pitch glides': 'Pitch Glides',
  'Reading': 'Reading', 'Speech Reading': 'Reading', 'Maze play': 'Maze', 'TipTap': 'Tiptap', 'Orchestra': 'Orchestra', 'Lived experience': 'Lived Experience'};

function protocolPlans() {
  const status = Object.fromEntries(P.protocol.status.map(r => [r.item, r]));
  const plan = key => P.protocol[key].days.map(day => day.map(x => {
    const psych = x.activity === 'Mindset';
    if (!psych && !status[PROTOCOL_STATUS[x.activity]]) throw Error('Protocol activity without a status row: ' + x.activity);
    const st = psych ? null : status[PROTOCOL_STATUS[x.activity]], mod = P.protocol.modules[x.activity] || {pages: [], scripts: []};
    // The first-month workouts are the codes the status sheet lists (e.g. 'A1+B1 * 3 Levels').
    const month1 = st ? (st.content.match(/[A-C]\d/g) || []) : [];
    return {name: x.activity, minutes: x.minutes, rounds: x.rounds, med: x.time_since_med, category: x.category, psych, status: st,
      pages: mod.pages.map(p => ({...p, month1: month1.includes(p.code), keys: p.scripts.concat((p.excerpts || []).map(ex => ex.script + '#' + p.id)), excerpts: undefined})), scripts: mod.scripts};
  }));
  // Each module script once, as its paragraphs; text exactly as its snapshot in sources/module-scripts has it.
  // A page excerpt is the run of the script from its section heading up to the next section's heading.
  const paras = text => text.split('\n').filter(t => t.trim());
  const scripts = Object.fromEntries(Object.entries(P.protocol.scripts).map(([slug, m]) => {
    const snap = read(m.path);
    return [slug, {title: m.title, updated: m.updated_at.slice(0, 10), path: m.path, paras: paras(snap.content)}];
  }));
  const excerptKey = ex => ex.script + '#' + ex.n;
  for (const mod of Object.values(P.protocol.modules)) for (const pg of mod.pages) (pg.excerpts || []).forEach((ex, k) => {
    const m = P.protocol.scripts[ex.script], content = read(m.path).content;
    const at = content.indexOf(ex.from), end = ex.to ? content.indexOf(ex.to, at + 1) : content.length;
    if (at < 0 || end < 0) throw Error('Script section not found: ' + ex.script);
    ex.n = pg.id;  // a key without program text in it
    scripts[excerptKey(ex)] = {title: m.title, section: ex.from, updated: m.updated_at.slice(0, 10), path: m.path, paras: paras(content.slice(at, end))};
  });
  return {light: plan('light'), heavy: plan('heavy'), sheets: {light: P.protocol.light.sheet, heavy: P.protocol.heavy.sheet}, scripts};
}

// The session player's data plus the library, the week-13+ loop, the Hebrew interface words and the Protocol.xlsx day.
export function appData(media) {
  const base = phoneData(media);
  // A practice joins the library once the user has met it: in a session, or as an option of a session's choice.
  const met = {}, offered = {};
  const meet = (id, n) => { if (!(id in met)) met[id] = n; (offered[id] = offered[id] || []).push(n); };
  for (const s of P.sessions) for (const o of s.activities) { meet(o.id, s.number); (P.activities[o.id].options || []).forEach(x => meet(x.id, s.number)); }
  const repeat = {intros: 'repeat', durations: {}};
  // Library and loop flows replay a practice without its intro film (spec: the library can skip the intro).
  const library = Object.keys(met).filter(id => LIBRARY_KINDS.includes(P.activities[id].kind)).sort((a, b) => met[a] - met[b]).map(id => {
    const session = P.sessions[met[id] - 1], a = P.activities[id];
    return {id, kind: a.kind, met: met[id], in: [...new Set(offered[id])], week: session.week, recording: a.recording_status || '',
      steps: flowSteps(practiceSteps(P, id, session, repeat, {}, ''), session, repeat, media).concat([{kind: 'complete'}])};
  });
  const last = P.sessions[P.sessions.length - 1];
  const loop = LOOP.map(([id, spec], k) => {
    const session = Object.assign({}, last, {context: null});
    return {day: k + 1, id, spec, steps: flowSteps(practiceSteps(P, id, session, repeat, {}, ''), session, repeat, media).concat([{kind: 'complete'}])};
  });
  const ids = new Set(Object.keys(base.acts));
  const walk = steps => steps.forEach(s => { if (s.activity) ids.add(s.activity); (s.options || []).forEach(o => { ids.add(o.id); walk(o.steps); }); });
  library.forEach(x => { ids.add(x.id); walk(x.steps); });
  loop.forEach(x => { ids.add(x.id); walk(x.steps); });
  base.acts = Object.fromEntries([...ids].sort().map(id => [id, actRecord(id)]));
  const ui = Object.fromEntries([...INTERFACE_HE.labels, ...INTERFACE_HE.program_labels].map(x => [x.key, x.text]));
  return Object.assign(base, {library, loop, ui, protocol: protocolPlans(), firstDay: P.sessions[0].app_day, lastDay: last.app_day,
    spec: {source: SPEC, missed: SPEC_MISSED, library: SPEC_LIBRARY}});
}
