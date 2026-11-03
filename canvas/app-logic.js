  // App shell over the Phone preview's players (class Player): app days, Today, Journey, Practices and a lab rail.
  // The program never changes here: each day opens the session core.mjs sequences for it. English is Lab labelling.
  constructor(props) {
    super(props);
    const app = this.loadApp();
    Object.assign(this.state, { app, view: app.started ? 'today' : 'onboard', tab: 'today', open: {}, preview: null, jump: 1 });
    this.flow = null;
  }
  // Runs and progress stay in this browser, apart from the Phone preview's timing log.
  loadRuns() { try { return JSON.parse(window.localStorage.getItem('psych-lab-app-runs-v1') || '[]'); } catch (e) { return []; } }
  saveRuns(runs) { try { window.localStorage.setItem('psych-lab-app-runs-v1', JSON.stringify(runs)); return true; } catch (e) { return false; } }
  freshApp() { return { started: false, day: this.data().firstDay, mode: 'resume', done: {}, loopDone: {}, active: {}, uses: {}, library: 0, seconds: 0, log: [] }; }
  loadApp() {
    try { const x = JSON.parse(window.localStorage.getItem('psych-lab-app-v1') || 'null'); if (x && x.done) return Object.assign(this.freshApp(), x); } catch (e) {}
    return this.freshApp();
  }
  saveApp(app) { try { window.localStorage.setItem('psych-lab-app-v1', JSON.stringify(app)); } catch (e) {} }
  putApp(app) { this.saveApp(app); this.setState({ app }); }
  copyApp() {
    const a = this.state.app;
    return Object.assign({}, a, { done: Object.assign({}, a.done), loopDone: Object.assign({}, a.loopDone), active: Object.assign({}, a.active), uses: Object.assign({}, a.uses), log: a.log.slice() });
  }
  note(app, what) { app.log = [{ day: app.day, what }].concat(app.log).slice(0, 80); }

  // ---- the program day by day ----
  isDone(app, n) { return app.done[n] !== undefined && app.done[n] !== null; }
  // A practice is met once any completed session has offered it, directly or as a choice option.
  met(app, item) { return item.in.some((n) => this.isDone(app, n)); }
  firstOpen(app) { return this.data().sessions.find((x) => !this.isDone(app, x.n)) || null; }
  loopFor(app, k) { const L = this.data().loop[((k % 7) + 7) % 7]; return { kind: 'loop', loop: L, done: app.loopDone[app.day] === L.day }; }
  // What Today offers. Resume: the next session not yet done, one a day. Calendar: the session planned for this app day.
  today(app) {
    const D = this.data(), day = app.day, last = D.sessions[D.sessions.length - 1];
    if (day < D.firstDay) return { kind: 'rest' };
    if (app.mode === 'calendar') {
      const s = D.sessions.find((x) => x.day === day);
      if (s) return { kind: 'session', s, done: this.isDone(app, s.n) };
      return day > D.lastDay ? this.loopFor(app, day - D.lastDay - 1) : { kind: 'rest' };
    }
    const doneToday = D.sessions.filter((x) => app.done[x.n] === day);
    if (doneToday.length) return { kind: 'session', s: doneToday[doneToday.length - 1], done: true, next: this.firstOpen(app) };
    const open = this.firstOpen(app);
    if (open) return { kind: 'session', s: open, done: false };
    return this.loopFor(app, day - app.done[last.n] - 1);
  }
  unlocked(app, s) {
    if (this.isDone(app, s.n)) return true;
    if (app.mode === 'calendar') return s.day <= app.day;
    const open = this.firstOpen(app);
    return !!open && s.n <= open.n;
  }
  missedDays(app) {
    let total = 0, run = 0;
    for (let d = this.data().firstDay; d < app.day; d += 1) { if (app.active[d]) run = 0; else { total += 1; run += 1; } }
    return { total, run };
  }
  meta(id) {
    const a = this.data().acts[id] || {};
    const map = { video: ['lead-video', 'play_circle', 'Video'], audio: ['lead-audio', 'headphones', 'Guided audio'], breathing: ['lead-breath', 'air', 'Breathing'],
      inner: ['lead-game', 'sports_esports', 'Inner Voice game'], cards: ['lead-game', 'style', 'Card game'], reflection: ['lead-choice', 'favorite', 'Reflection'], choice: ['lead-choice', 'touch_app', 'Choose one'] };
    const m = map[a.kind] || map.video;
    return { lead: m[0], icon: m[1], kind: m[2], a };
  }
  stepRows(ids) {
    const D = this.data();
    return ids.map((id) => {
      const m = this.meta(id), lib = D.library.find((x) => x.id === id);
      const gap = lib && lib.recording === 'not_yet_recorded' ? ' · not recorded yet' : '';
      const time = m.a.kind === 'choice' ? '' : ' · ' + this.fmt(m.a.planned);
      return { title: m.a.title, lead: m.lead, icon: m.icon, sub: m.kind + time + gap };
    });
  }
  optionIds(id) {
    const st = this.data().loop.find((l) => l.id === id);
    const choice = st && st.steps.find((x) => x.kind === 'choice');
    return choice ? choice.options.map((o) => o.id) : [id];
  }

  // ---- flows ----
  startFlow(flow, steps, runId) {
    this.flow = flow;
    this.startRun({ n: flow.n || 0, id: runId });
    const patch = { preview: null };
    if (flow.type === 'session') patch.s = this.data().sessions.findIndex((x) => x.n === flow.n);
    this.setState(patch);
    this.enter(steps.slice(), 0);
  }
  startSession(s) { this.startFlow({ type: 'session', n: s.n }, s.steps, s.id); }
  startPractice(item) { this.startFlow({ type: 'practice', id: item.id }, item.steps, item.id); }
  startLoop(L) { this.startFlow({ type: 'loop', day: L.day, id: L.id }, L.steps, 'rhythm-day-' + L.day); }
  enter(steps, i) {
    super.enter(steps, i);
    if (steps[i] && steps[i].kind === 'complete') this.completeFlow();
  }
  completeFlow() {
    const f = this.flow, D = this.data();
    if (!f || f.recorded) return;
    f.recorded = true;
    const app = this.copyApp(), secs = this.run ? Math.round(this.run.ms / 1000) : 0;
    app.seconds += secs; app.active[app.day] = true;
    if (f.type === 'session') {
      const s = D.sessions.find((x) => x.n === f.n);
      if (this.isDone(app, f.n)) this.note(app, 'Repeated session ' + f.n + ' · ' + this.fmt(secs));
      else { app.done[f.n] = app.day; this.note(app, 'Session ' + f.n + ' done · ' + s.english + ' · ' + this.fmt(secs)); }
    } else if (f.type === 'practice') {
      app.uses[f.id] = (app.uses[f.id] || 0) + 1; app.library += 1;
      this.note(app, 'Practice from the library · ' + (D.acts[f.id] || {}).english + ' · ' + this.fmt(secs));
    } else {
      app.loopDone[app.day] = f.day;
      this.note(app, 'Rhythm day ' + f.day + ' · ' + (D.acts[f.id] || {}).english + ' · ' + this.fmt(secs));
    }
    this.putApp(app);
  }
  // Ends an open flow: an unfinished run is saved as interrupted and noted in the diary held by `app`.
  closeFlow(app) {
    const f = this.flow;
    if (f && !f.recorded && this.run && !this.run.done) {
      this.note(app, 'Left ' + (f.type === 'session' ? 'session ' + f.n : f.type === 'practice' ? 'a practice' : 'rhythm day ' + f.day) + ' before the end');
      this.finishRun(false, 'left before the end');
    }
    this.holdStop();
    this.flow = null;
  }
  leaveFlow() {
    const app = this.copyApp();
    this.closeFlow(app);
    this.putApp(app);
    this.setState({ view: this.state.tab, sub: {} });
  }

  // ---- lab rail actions ----
  advance(days) {
    const app = this.copyApp();
    this.closeFlow(app);
    const t = this.today(app);
    if (t.kind !== 'rest' && !t.done) this.note(app, 'Nothing done on day ' + app.day);
    if (days > 1) this.note(app, 'Missed days ' + (app.day + 1) + '–' + (app.day + days - 1));
    app.day += days;
    this.putApp(app);
    this.setState({ view: 'today', tab: 'today', preview: null, open: {}, sub: {} });
  }
  jumpTo(n) {
    const D = this.data(), target = D.sessions.find((x) => x.n === n);
    if (!target) return;
    const app = this.copyApp();
    this.closeFlow(app);
    app.done = {}; app.loopDone = {}; app.active = {};
    D.sessions.filter((x) => x.n < n).forEach((x) => { app.done[x.n] = x.day; app.active[x.day] = true; });
    app.day = target.day;
    this.note(app, 'Lab: jumped to session ' + n + ' (earlier sessions marked done on their planned days)');
    this.putApp(app);
    this.setState({ view: 'today', tab: 'today', preview: null, open: {}, sub: {} });
  }

  renderVals() {
    const v = super.renderVals();
    const D = this.data(), s = this.state, app = s.app, fmt = (x) => this.fmt(x), f = this.flow;
    const t = this.today(app), total = D.sessions.length, doneCount = Object.keys(app.done).length;
    const missed = this.missedDays(app);
    const view = s.view;
    Object.assign(v, {
      isOnboard: view === 'onboard', isToday: view === 'today', isJourney: view === 'journey', isPreview: view === 'preview', isLibrary: view === 'library',
      showNav: ['today', 'journey', 'library', 'preview'].includes(view),
      navToday: s.tab === 'today' ? 'is-active' : '', navJourney: s.tab === 'journey' ? 'is-active' : '', navLibrary: s.tab === 'library' ? 'is-active' : '',
      toToday: () => this.setState({ view: 'today', tab: 'today', preview: null }),
      toJourney: () => this.setState({ view: 'journey', tab: 'journey', preview: null }),
      toLibrary: () => this.setState({ view: 'library', tab: 'library', preview: null }),
      firstDay: D.firstDay,
      onboardNote: 'App day 1 is orientation for the other modules; psychology session 1 is shown on app day ' + D.firstDay + ' (program.json assumption).',
      begin: () => { const a = this.freshApp(); a.started = true; this.note(a, 'Started the program'); this.putApp(a); this.setState({ view: 'today', tab: 'today' }); },
      doneLine: doneCount + ' of ' + total + ' sessions done',
      pctStyle: 'width: ' + Math.round(doneCount / total * 100) + '%',
      dayLabel: 'App day ' + app.day + (app.day >= D.firstDay ? ' · week ' + (Math.floor((app.day - D.firstDay) / 7) + 1) : ''),
      sTotal: total
    });
    // Week strip: the seven app days of this calendar week.
    const start = D.firstDay + 7 * Math.max(0, Math.floor((app.day - D.firstDay) / 7));
    v.week = Array.from({ length: 7 }, (_, k) => {
      const d = start + k, active = !!app.active[d];
      const cls = active ? 'wk-done' : d === app.day ? 'wk-today' : d < app.day ? 'wk-missed' : 'wk-future';
      return { label: 'Day ' + d, cls, icon: active ? 'check' : d === app.day ? 'radio_button_unchecked' : d < app.day ? 'remove' : '' };
    });
    // Today
    v.showMissed = missed.run > 0 && t.kind !== 'rest';
    v.missedTitle = 'Missed ' + missed.run + (missed.run === 1 ? ' day' : ' days');
    v.missedText = app.mode === 'calendar' ? 'Calendar rule: today shows the session planned for today. Earlier sessions not done wait in the journey.'
      : 'Resume rule: the journey continues at the next session not done' + (t.s ? ', session ' + t.s.n : '') + '. Nothing is skipped.';
    v.todayOpen = (t.kind === 'session' || t.kind === 'loop') && !t.done;
    v.todayDone = (t.kind === 'session' || t.kind === 'loop') && !!t.done;
    v.todayRest = t.kind === 'rest';
    v.restTitle = 'No psychology session today';
    v.restText = app.day < D.firstDay ? 'App day 1 is orientation.' : 'No session is planned for app day ' + app.day + '. Use Next day in the lab controls.';
    if (t.kind === 'session') {
      v.heroPill = 'Session ' + t.s.n + ' of ' + total;
      v.heroTitle = t.s.title; v.heroEnglish = t.s.english;
      v.heroSteps = this.stepRows(t.s.acts); v.heroHasSpec = false; const lo = Math.max(1, Math.round(t.s.low / 60)), hi = Math.max(lo, Math.round(t.s.high / 60));
      v.heroPill += ' · about ' + (hi > lo ? lo + '–' + hi : lo) + ' min'; v.heroCta = 'Start';
      v.startToday = () => this.startSession(t.s);
      v.doneTitle = t.s.title; v.doneSub = 'Session ' + t.s.n + ' · ' + t.s.english;
      v.replayToday = () => this.startSession(t.s);
      const nx = app.mode === 'resume' && t.done ? t.next : null;
      v.hasNext = !!nx;
      if (nx) { const m = this.meta(nx.acts[0]); Object.assign(v, { nextTitle: nx.title, nextSub: 'Session ' + nx.n + ' · planned for tomorrow · you can go ahead', nextLead: m.lead, nextIcon: m.icon, goNext: () => this.startSession(nx) }); }
    }
    if (t.kind === 'loop') {
      const L = t.loop, a = D.acts[L.id];
      v.heroPill = 'Week 13+ · rhythm day ' + L.day + ' of 7';
      v.heroTitle = a.title; v.heroEnglish = a.english;
      v.heroSteps = this.stepRows(this.optionIds(L.id)); v.heroHasSpec = true; v.heroSpec = L.spec; v.heroCta = 'Start';
      v.startToday = () => this.startLoop(L);
      v.doneTitle = a.title; v.doneSub = 'Rhythm day ' + L.day + ' of 7 · ' + a.english;
      v.replayToday = () => this.startLoop(L); v.hasNext = false;
    }
    const behind = app.mode === 'calendar' ? D.sessions.filter((x) => x.day < app.day && !this.isDone(app, x.n)) : [];
    v.hasCatchUp = behind.length > 0;
    v.catchUpTitle = behind.length + ' earlier session' + (behind.length === 1 ? '' : 's') + ' not done';
    const unlockedLib = D.library.filter((x) => this.met(app, x));
    v.recent = unlockedLib.slice(-2).reverse().map((x) => this.libItem(x, app));
    v.hasRecent = view === 'today' && v.recent.length > 0 && !v.todayOpen;
    // Journey
    const current = t.kind === 'session' ? t.s.week : t.kind === 'loop' ? 0 : 1;
    const weeks = [...new Set(D.sessions.map((x) => x.week))];
    v.weeks = weeks.map((w) => {
      const list = D.sessions.filter((x) => x.week === w), open = s.open[w] !== undefined ? s.open[w] : w === current;
      const dn = list.filter((x) => this.isDone(app, x.n)).length;
      return { label: 'Week ' + w, sub: dn + ' of ' + list.length + ' done · app days ' + list[0].day + '–' + list[list.length - 1].day,
        open, expanded: open ? 'true' : 'false', chevron: open ? 'expand_less' : 'expand_more',
        toggle: () => this.setState({ open: Object.assign({}, s.open, { [w]: !open }) }),
        rows: list.map((x) => this.journeyRow(x, app, t)) };
    });
    v.loopRows = D.loop.map((l) => ({ title: D.acts[l.id].title, label: 'Day ' + l.day + ' · ' + D.acts[l.id].english }));
    // Session preview
    if (view === 'preview' && s.preview) {
      const x = D.sessions.find((y) => y.n === s.preview), dn = this.isDone(app, x.n);
      Object.assign(v, { pvWhere: 'Session ' + x.n + ' · week ' + x.week + ' · planned for app day ' + x.day + (dn ? ' · done' : ''),
        pvTitle: x.title, pvEnglish: x.english, pvSteps: this.stepRows(x.acts),
        pvRange: 'About ' + x.range + ' of films, recordings and activities, plus reading and choosing.',
        pvHasGaps: x.missing.length > 0, pvGaps: 'Not in the Lab copy yet: ' + x.missing.join(', ') + '. Its time slot is kept.',
        pvCta: dn ? 'Do it again' : 'Start', pvIcon: dn ? 'replay' : 'play_arrow', pvStart: () => this.startSession(x) });
    }
    // Practices library
    const groups = [['breathing', 'Breathing'], ['audio', 'Guided audio'], ['games', 'Games'], ['reflection', 'Reflections']];
    v.libGroups = groups.map(([k, label]) => ({ label, items: D.library.filter((x) => (k === 'games' ? ['inner', 'cards'].includes(x.kind) : x.kind === k)).map((x) => this.libItem(x, app)) })).filter((g) => g.items.length);
    v.libLine = unlockedLib.length + ' of ' + D.library.length + ' practices met so far';
    v.libEmpty = unlockedLib.length === 0;
    v.specLibrary = D.spec.library; v.specMissed = D.spec.missed; v.specSource = D.spec.source;
    // Flow chrome
    if (f) {
      const n = (s.i + 1) + ' of ' + s.steps.length;
      v.stepText = f.type === 'session' ? 'Session ' + f.n + ' · ' + n : f.type === 'practice' ? 'Practice · ' + n : 'Rhythm day ' + f.day + ' · ' + n;
      v.completeTitle = f.type === 'session' ? 'Session complete' : f.type === 'practice' ? 'Practice complete' : 'Done for today';
    }
    v.close = () => this.leaveFlow();
    v.finish = () => { this.flow = null; this.leave({ view: 'today', tab: 'today' }); };
    v.finishLabel = 'Back to Today';
    // Lab rail
    v.rDay = 'App day ' + app.day;
    v.rWhere = (app.day >= D.firstDay ? 'Calendar week ' + (Math.floor((app.day - D.firstDay) / 7) + 1) + ' · ' : '') + (app.mode === 'resume' ? 'resume rule' : 'calendar rule');
    v.rOffered = t.kind === 'session' ? 'Today: session ' + t.s.n + ' · ' + t.s.english + (t.done ? ' · done' : '')
      : t.kind === 'loop' ? 'Today: rhythm day ' + t.loop.day + ' · ' + D.acts[t.loop.id].english + (t.done ? ' · done' : '') : 'Today: no psychology session';
    v.nextDay = () => this.advance(1); v.skipDays = () => this.advance(4);
    v.reset = () => { this.closeFlow(this.copyApp()); this.putApp(this.freshApp()); this.setState({ view: 'onboard', tab: 'today', open: {}, preview: null, sub: {} }); };
    const jt = Math.max(1, Math.min(total, s.jump)), js = D.sessions[jt - 1];
    v.jTarget = jt; v.jTitle = 'Session ' + jt + ' · ' + js.english + ' · app day ' + js.day + ' · week ' + js.week;
    const setJump = (d) => this.setState({ jump: Math.max(1, Math.min(total, jt + d)) });
    v.jMinus10 = () => setJump(-10); v.jMinus1 = () => setJump(-1); v.jPlus1 = () => setJump(1); v.jPlus10 = () => setJump(10);
    v.jGo = () => this.jumpTo(jt);
    v.resumeCls = app.mode === 'resume' ? 'is-selected' : ''; v.calendarCls = app.mode === 'calendar' ? 'is-selected' : '';
    v.resumePressed = app.mode === 'resume' ? 'true' : 'false'; v.calendarPressed = app.mode === 'calendar' ? 'true' : 'false';
    v.modeResume = () => { const a = this.copyApp(); a.mode = 'resume'; this.putApp(a); };
    v.modeCalendar = () => { const a = this.copyApp(); a.mode = 'calendar'; this.putApp(a); };
    v.modeNote = app.mode === 'resume'
      ? 'Resume: each day offers the next session not yet done, so missed days push the rest of the program later and nothing is skipped. The spec does not settle this; both rules are Lab readings of it.'
      : 'Calendar: each day offers the session planned for that app day. Sessions from missed days stay open in the journey to catch up.';
    const fs = f && f.type === 'session' ? D.sessions.find((x) => x.n === f.n) : t.kind === 'session' ? t.s : null;
    v.rState = v.tState;
    const plan = fs ? fs.range : f && f.type === 'practice' ? fmt((D.acts[f.id] || {}).planned) : '';
    v.rPlanLine = plan ? 'Content plan ' + plan + ' of recorded media and planned activity time; reading and choosing are extra.'
      : t.kind === 'loop' || (f && f.type === 'loop') ? 'Content plan depends on the practice chosen.' : 'No session today.';
    v.rGaps = (fs ? fs.missing : []).map((x) => ({ t: 'Not in the Lab copy: ' + x }));
    v.rHasGaps = v.rGaps.length > 0;
    v.sDone = doneCount; v.sMissed = missed.total; v.sLibrary = app.library; v.sTime = fmt(app.seconds);
    v.log = app.log.slice(0, 14).map((x) => ({ when: 'Day ' + x.day, what: x.what }));
    v.hasLog = v.log.length > 0; v.noLog = !v.hasLog;
    return v;
  }
  journeyRow(x, app, t) {
    const dn = this.isDone(app, x.n), today = t.kind === 'session' && t.s.n === x.n && !t.done, open = this.unlocked(app, x);
    const behind = app.mode === 'calendar' && !dn && x.day < app.day;
    const look = dn ? ['background: var(--primary); color: var(--on-primary)', 'check', 'icon-fill', 'done on day ' + app.done[x.n]]
      : today ? ['background: var(--primary-container); color: var(--on-primary-container); box-shadow: inset 0 0 0 3px var(--primary)', 'play_arrow', 'icon-fill', 'today']
      : behind ? ['background: var(--tertiary-container); color: var(--on-tertiary-container)', 'history', '', 'planned for day ' + x.day + ' · not done']
      : open ? ['background: var(--secondary-container); color: var(--on-secondary-container)', 'play_arrow', '', 'open']
      : ['background: var(--surface-high); color: var(--on-surface-variant)', 'lock', '', 'app day ' + x.day];
    return { title: x.title, sub: 'Session ' + x.n + ' · ' + look[3], dotStyle: look[0], icon: look[1], fill: look[2], locked: !open,
      open: () => { if (open) this.setState({ view: 'preview', preview: x.n }); } };
  }
  libItem(x, app) {
    const m = this.meta(x.id), open = this.met(app, x), uses = app.uses[x.id] || 0;
    const sub = open ? m.kind + ' · ' + this.fmt(m.a.planned) + (x.recording === 'not_yet_recorded' ? ' · not recorded yet' : '') + (uses ? ' · opened ' + uses + '×' : '')
      : 'Met in session ' + x.met + ' · week ' + x.week;
    return { title: m.a.title, lead: m.lead, icon: m.icon, sub, locked: !open, opacity: open ? '1' : '.5', trail: open ? 'play_arrow' : 'lock',
      open: () => { if (open) this.startPractice(x); } };
  }
