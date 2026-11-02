export const minuteLabel = seconds => {
  const n = Math.max(0, Math.round(seconds || 0));
  return Math.floor(n / 60) + ':' + String(n % 60).padStart(2, '0');
};

export function firstScheduled(program, id) {
  return program.sessions.find(s => s.activities.some(a => a.id === id))?.number ?? Infinity;
}

export function shouldIntroduce(program, id, session, settings = {}, seen = {}) {
  if (settings.intros === 'first') return true;
  if (settings.intros === 'repeat') return false;
  if (seen[id]) return false;
  return firstScheduled(program, id) >= session.number;
}

// The film that introduces an activity. PS-CONT-109's intro has no clip of its own; its film is S58.
export function introClip(program, a) {
  const intro = program.activities[a.intro_id];
  return intro?.clip || (a.intro_id === 'PS-CONT-109' ? program.clips.S58 : null);
}

function introStep(program, a) {
  if (!a.intro_id) return [];
  const intro = program.activities[a.intro_id];
  const clip = introClip(program, a);
  return [{kind: 'video', activity: a.id, source_id: a.intro_id, clip,
    seconds: clip?.seconds ?? intro?.planned_seconds ?? 120, trailer: true,
    missing: !clip}];
}

export function practiceSteps(program, id, session, settings = {}, seen = {}, parameter = '', options = {}) {
  const a = program.activities[id];
  if (!a) throw Error('Unknown activity: ' + id);
  const steps = [];
  if (!options.noPrepage) steps.push({kind: 'prepage', activity: id});
  if (a.kind === 'video') {
    steps.push({kind: 'video', activity: id, source_id: id, clip: a.clip,
      seconds: a.clip?.seconds ?? a.planned_seconds, missing: !a.clip});
  } else {
    if (shouldIntroduce(program, id, session, settings, seen)) steps.push(...introStep(program, a));
    if (a.kind === 'choice') steps.push({kind: 'choice', activity: id});
    else steps.push({kind: a.kind, activity: id, parameter,
      seconds: a.audio?.seconds ?? settings.durations?.[id] ?? a.planned_seconds, audio: a.audio ?? null});
  }
  return steps;
}

export function sessionSteps(program, session, settings = {}, seen = {}) {
  const steps = [];
  let contextUsed = false;
  for (const o of session.activities) {
    const matchingContext = session.context && (!session.context.activity_id || session.context.activity_id === o.id);
    if (!contextUsed && matchingContext && (o.information_id || session.context.source === 'psych-context')) {
      steps.push({kind: 'context', activity: o.id, content: session.context});
      contextUsed = true;
    }
    steps.push(...practiceSteps(program, o.id, session, settings, seen, o.parameter));
    if (session.number === 1) steps.push({kind: 'motivation', activity: o.id});
  }
  if (session.activities.some(o => program.activities[o.id].kind !== 'video')) steps.push({kind: 'rating'});
  if (settings.keeps) steps.push({kind: 'keeps'});
  steps.push({kind: 'complete'});
  return steps;
}

export function chooseSteps(program, id, session, settings = {}, seen = {}, parameter = '', introduced = []) {
  // The chooser adds exactly one selected branch. It never queues sibling options.
  return practiceSteps(program, id, session, settings, seen, parameter).filter(st =>
    !(st.kind === 'video' && st.trailer && (introduced.includes(st.source_id) || introduced.includes(st.clip?.id))));
}

function activityRange(program, id, session, settings, seen, selections, parameter, inheritedIntros = new Map()) {
  const a = program.activities[id];
  let low = 0, high = 0, missing = [];
  const introduced = new Map(inheritedIntros);
  for (const st of practiceSteps(program, id, session, settings, seen, parameter)) {
    if (st.kind === 'video') {
      if (st.trailer && introduced.has(st.source_id)) continue;
      low += st.seconds; high += st.seconds;
      introduced.set(st.source_id, st.seconds);
      if (st.missing) missing.push(st.source_id);
    } else if (st.kind === 'choice') {
      const selected = selections[id];
      const opts = selected ? a.options.filter(o => o.id === selected) : a.options;
      const ranges = opts.map(o => activityRange(program, o.id, session, settings, seen, selections, o.parameter, introduced));
      low += Math.min(...ranges.map(r => r.low));
      high += Math.max(...ranges.map(r => r.high));
      missing.push(...ranges.flatMap(r => r.missing));
    } else if (st.seconds != null) {
      if (st.kind === 'audio' && !st.audio && a.duration_uncertain) {
        const introSeconds = program.activities[a.intro_id]?.clip?.seconds ?? 0;
        low += Math.max(0, st.seconds - introSeconds);
      } else low += st.seconds;
      high += st.seconds;
      if (st.kind === 'audio' && !st.audio) missing.push(id);
    }
  }
  return {low, high, missing: [...new Set(missing)]};
}

export function sessionRange(program, session, settings = {}, seen = {}, selections = {}) {
  const ranges = session.activities.map(o => activityRange(program, o.id, session, settings, seen, selections, o.parameter));
  const motivation = session.number === 1 ? 60 : 0;
  return {low: motivation+ranges.reduce((n,r) => n+r.low,0), high:motivation+ranges.reduce((n,r)=>n+r.high,0), missing:[...new Set(ranges.flatMap(r=>r.missing))]};
}

export function thoughtTheme(parameter = '') {
  const p = parameter.toLowerCase();
  if (p.includes('motivation')) return 'motivation';
  if (p.includes('unbalanced') || p.includes('balanced')) return 'balanced';
  if (p.includes('relax')) return 'relaxation';
  if (p.includes('mindful')) return 'mindfulness';
  if (p.includes('compassion') || p.includes('validation')) return 'compassion';
  if (p.includes('label')) return 'labels';
  return 'flexible';
}

export const reflectionType = id => id === 'PS-ACT-009' ? 'pleasant' : id === 'PS-ACT-010' ? 'gratitude' : 'matters';
