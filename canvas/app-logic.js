  // App shell over the Phone preview's players (class Player): app days, Today, Journey, Library and a lab rail.
  // The program never changes here: each day opens the next session core.mjs sequences. The phone's Hebrew
  // interface words come from the owner-approved register (data().ui, canvas/interface-he.json); program text
  // comes from program.json; the lab rail is English.
  constructor(props) {
    super(props);
    this._app = this.loadApp();
    Object.assign(this.state, { app: this._app, view: 'today', tab: 'today', preview: null, jump: 1, earlier: false });
    this.flow = null;
  }
  // Runs and progress stay in this browser, apart from the Phone preview's timing log.
  loadRuns() { try { return JSON.parse(window.localStorage.getItem('psych-lab-app-runs-v1') || '[]'); } catch (e) { return []; } }
  saveRuns(runs) { try { window.localStorage.setItem('psych-lab-app-runs-v1', JSON.stringify(runs)); return true; } catch (e) { return false; } }
  freshApp() { return { day: this.data().firstDay, plan: 'light', done: {}, loopDone: {}, active: {}, modules: {}, uses: {}, library: 0, seconds: 0, log: [{ day: this.data().firstDay, what: 'Started the program' }] }; }
  loadApp() {
    try { const x = JSON.parse(window.localStorage.getItem('psych-lab-app-v1') || 'null'); if (x && x.done) return Object.assign(this.freshApp(), x); } catch (e) {}
    return this.freshApp();
  }
  saveApp(app) { try { window.localStorage.setItem('psych-lab-app-v1', JSON.stringify(app)); } catch (e) {} }
  // The latest app state is also kept on the instance, so two updates in one click never read a stale copy.
  putApp(app) { this._app = app; this.saveApp(app); this.setState({ app }); }
  copyApp() {
    const a = this._app || this.state.app;
    return Object.assign({}, a, { done: Object.assign({}, a.done), loopDone: Object.assign({}, a.loopDone), active: Object.assign({}, a.active),
      modules: Object.assign({}, a.modules), uses: Object.assign({}, a.uses), log: a.log.slice() });
  }
  note(app, what) { app.log = [{ day: app.day, what }].concat(app.log).slice(0, 80); }
  // The step screens' interface words, in Hebrew from the register (the Phone preview keeps English).
  labels() {
    const U = this.data().ui;
    return { c: 'he', showParts: false, continue: U.continue, watch: U.start, choosePractice: U.choosePractice, chooseOnePractice: U.chooseOne,
      kinds: { video: U.kVideo, audio: U.kAudio, choice: U.kChoice, breathing: U.kBreath, inner: U.kGame, cards: U.kGame, reflection: U.kPractice },
      video: U.kVideo, intro: U.kIntro, kAudio: U.kAudio, phase: { Inhale: U.inhale, Exhale: U.exhale, Hold: U.hold, 'Top-up': U.inhale },
      ready: U.ready, done: U.finish, start: U.start, pause: U.pause, slower: U.slower, slowerAria: U.slower, faster: U.faster, fasterAria: U.faster,
      finishPractice: U.finishPractice, endEarly: U.endEarly, nextThought: U.nextThought, roundDone: U.roundDone, chooseTopic: U.chooseOne,
      alone: U.alone, together: U.together, luck: U.luck, card: U.card, actionCard: U.actionCard, q1: U.sideA, q2: U.sideB, ideas: U.ideas, hideIdeas: U.ideas,
      followUp: U.followUp, hideFollowUp: U.followUp, nextCard: U.nextCard, anotherCard: U.nextCard, finish: U.finish, backDecks: U.backDecks,
      breathGap: 'in-practice prompts and guidance (timing is a Lab assumption; the phase words quote the original design)' };
  }

  // ---- the program day by day (missed-day rule: resume, owner decision 2026-11-03) ----
  isDone(app, n) { return app.done[n] !== undefined && app.done[n] !== null; }
  // A practice is met once any completed session has offered it, directly or as a choice option.
  met(app, item) { return item.in.some((n) => this.isDone(app, n)); }
  firstOpen(app) { return this.data().sessions.find((x) => !this.isDone(app, x.n)) || null; }
  loopFor(app, k) { const L = this.data().loop[((k % 7) + 7) % 7]; return { kind: 'loop', loop: L, done: app.loopDone[app.day] === L.day }; }
  // Today offers the next session not yet done, one a day; after the last one, the spec's 7-day rhythm.
  today(app) {
    const D = this.data(), last = D.sessions[D.sessions.length - 1];
    const doneToday = D.sessions.filter((x) => app.done[x.n] === app.day);
    if (doneToday.length) return { kind: 'session', s: doneToday[doneToday.length - 1], done: true, next: this.firstOpen(app) };
    const open = this.firstOpen(app);
    if (open) return { kind: 'session', s: open, done: false };
    return this.loopFor(app, app.day - app.done[last.n] - 1);
  }
  unlocked(app, s) { const open = this.firstOpen(app); return this.isDone(app, s.n) || (!!open && s.n <= open.n); }
  missedDays(app) {
    let total = 0, run = 0;
    for (let d = this.data().firstDay; d < app.day; d += 1) { if (app.active[d]) run = 0; else { total += 1; run += 1; } }
    return { total, run };
  }
  meta(id) {
    const a = this.data().acts[id] || {}, L = this.labels();
    const map = { video: ['lead-video', 'play_circle'], audio: ['lead-audio', 'headphones'], breathing: ['lead-breath', 'air'], inner: ['lead-game', 'sports_esports'],
      cards: ['lead-game', 'style'], reflection: ['lead-choice', 'favorite'], choice: ['lead-choice', 'touch_app'] };
    const m = map[a.kind] || map.video;
    return { lead: m[0], icon: m[1], kind: L.kinds[a.kind] || L.kinds.video, a };
  }
  unrecorded(id) { const lib = this.data().library.find((x) => x.id === id); return !!lib && lib.recording === 'not_yet_recorded'; }
  stepRows(ids) {
    return ids.map((id) => {
      const m = this.meta(id);
      return { title: m.a.title, lead: m.lead, icon: m.icon, sub: m.kind + (m.a.kind === 'choice' ? '' : ' · ' + this.fmt(m.a.planned)), gap: this.unrecorded(id) };
    });
  }
  optionIds(id) {
    const st = this.data().loop.find((l) => l.id === id);
    const choice = st && st.steps.find((x) => x.kind === 'choice');
    return choice ? choice.options.map((o) => o.id) : [id];
  }
  range(s) { return this.fmt(s.low) + (s.high - s.low > 1 ? '–' + this.fmt(s.high) : ''); }

  // ---- the whole app day, as Protocol.xlsx lays it out ----
  // Weekly cycle day: app day 2 is cycle day 1 (the sources do not fix the offset; program.json assumption).
  cycle(app) { return ((app.day - this.data().firstDay) % 7 + 7) % 7; }
  dayPlan(app) { return this.data().protocol[app.plan || 'light'][this.cycle(app)]; }
  // A passed slot is remembered for its own week sheet and row, so switching light/heavy never carries it over.
  moduleKey(app, k) { return (app.plan || 'light') + ':' + k; }
  moduleDone(app, k) { return (app.modules[app.day] || []).indexOf(this.moduleKey(app, k)) >= 0; }
  mindsetSteps(t) { return (t.kind === 'session' ? t.s.steps : t.loop.steps).filter((st) => st.kind !== 'complete'); }
  // The day as one flow: each protocol item in order. Other modules are slots; Mindset is today's psychology.
  dayFlow(app, t) {
    const steps = [];
    this.dayPlan(app).forEach((x, k) => {
      if (x.psych) { if (!t.done) steps.push(...this.mindsetSteps(t)); }
      else if (!this.moduleDone(app, k)) steps.push({ kind: 'module', index: k, key: this.moduleKey(app, k), item: x });
    });
    return steps.concat([{ kind: 'complete' }]);
  }
  startDay(t) {
    const app = this._app;
    this.startFlow({ type: 'day', psych: !t.done, n: t.kind === 'session' ? t.s.n : 0, loopDay: t.kind === 'loop' ? t.loop.day : 0, id: t.kind === 'loop' ? t.loop.id : null },
      this.dayFlow(app, t), 'day-' + app.day);
  }
  startModule(k, x) { this.startFlow({ type: 'module', index: k }, [{ kind: 'module', index: k, key: this.moduleKey(this._app, k), item: x }, { kind: 'complete' }], 'module-' + x.name); }
  passModule(st) {
    const app = this.copyApp(), list = (app.modules[app.day] || []).slice();
    if (list.indexOf(st.key) < 0) list.push(st.key);
    // Nothing of the module played, so this run can never count as complete timing evidence.
    this.gap(st.item.name); this.accelerate('simulated module slot');
    app.modules[app.day] = list; app.active[app.day] = true;
    this.note(app, st.item.name + ' · slot passed (' + st.item.minutes + ' min planned, not in the Lab)');
    this.putApp(app);
    this.next();
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
    if (f.type === 'module') {
      // passModule already recorded the slot.
    } else if (f.type === 'day') {
      if (f.psych && f.n && !this.isDone(app, f.n)) app.done[f.n] = app.day;
      if (f.psych && f.loopDay) app.loopDone[app.day] = f.loopDay;
      this.note(app, 'Whole day ' + app.day + ' done (' + (D.protocol[app.plan || 'light'] && this.dayPlan(app).length) + ' items) · ' + this.fmt(secs));
    } else if (f.type === 'session') {
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
    if (!this.today(app).done) this.note(app, 'Nothing done on day ' + app.day);
    if (days > 1) this.note(app, 'Missed days ' + (app.day + 1) + '–' + (app.day + days - 1));
    app.day += days;
    this.putApp(app);
    this.setState({ view: 'today', tab: 'today', preview: null, earlier: false, sub: {} });
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
    this.setState({ view: 'today', tab: 'today', preview: null, earlier: false, sub: {} });
  }

  renderVals() {
    const v = super.renderVals();
    const D = this.data(), U = D.ui, s = this.state, app = s.app, fmt = (x) => this.fmt(x), f = this.flow;
    const t = this.today(app), total = D.sessions.length, doneCount = Object.keys(app.done).length;
    const missed = this.missedDays(app), view = s.view;
    const of = (a, b) => a + ' ' + U.of + ' ' + b;
    Object.assign(v, {
      U, isToday: view === 'today', isJourney: view === 'journey', isPreview: view === 'preview', isLibrary: view === 'library',
      showNav: ['today', 'journey', 'library', 'preview'].includes(view),
      navToday: s.tab === 'today' ? 'is-active' : '', navJourney: s.tab === 'journey' ? 'is-active' : '', navLibrary: s.tab === 'library' ? 'is-active' : '',
      toToday: () => this.setState({ view: 'today', tab: 'today', preview: null }),
      toJourney: () => this.setState({ view: 'journey', tab: 'journey', preview: null }),
      toLibrary: () => this.setState({ view: 'library', tab: 'library', preview: null }),
      whereLine: U.session + ' ' + of(t.kind === 'session' ? t.s.n : total, total),
      doneLine: of(doneCount, total) + ' ' + U.sessionsDone,
      journeyLine: of(doneCount, total) + ' ' + U.done,
      pctStyle: 'width: ' + Math.round(doneCount / total * 100) + '%'
    });
    // Week strip: the seven app days of this calendar week (numbers only).
    const start = D.firstDay + 7 * Math.max(0, Math.floor((app.day - D.firstDay) / 7));
    v.week = Array.from({ length: 7 }, (_, k) => {
      const d = start + k, active = !!app.active[d];
      const cls = active ? 'wk-done' : d === app.day ? 'wk-today' : d < app.day ? 'wk-missed' : 'wk-future';
      return { label: String(d), cls, icon: active ? 'check' : d === app.day ? 'radio_button_unchecked' : d < app.day ? 'remove' : '' };
    });
    // Today
    v.showMissed = missed.run > 0;
    v.todayOpen = !t.done; v.todayDone = !!t.done;
    v.isLoop = t.kind === 'loop';
    if (t.kind === 'session') {
      Object.assign(v, { heroPill: U.todaySession + ' ' + t.s.n, heroTime: this.range(t.s), heroTitle: t.s.title, heroSteps: this.stepRows(t.s.acts),
        startToday: () => this.startSession(t.s), doneHead: U.todayDone, doneTitle: t.s.title, replayToday: () => this.startSession(t.s) });
      const nx = t.done ? t.next : null;
      v.hasNext = !!nx;
      if (nx) { const m = this.meta(nx.acts[0]); Object.assign(v, { nextTitle: nx.title, nextSub: U.session + ' ' + nx.n + ' · ' + U.jumpAhead, nextLead: m.lead, nextIcon: m.icon, goNext: () => this.startSession(nx) }); }
    } else {
      const L = t.loop, a = D.acts[L.id];
      Object.assign(v, { loopChip: 'Week 13+ · rhythm day ' + L.day + ' of 7 · spec suggestion', heroTitle: a.title, heroSteps: this.stepRows(this.optionIds(L.id)),
        startToday: () => this.startLoop(L), doneHead: U.practiceDone, doneTitle: a.title, replayToday: () => this.startLoop(L), hasNext: false });
    }
    // Today's protocol day: every item in order, with today's psychology as its Mindset item.
    const plan = this.dayPlan(app), sheet = D.protocol.sheets[app.plan || 'light'], cyc = this.cycle(app) + 1;
    const planned = plan.reduce((n, x) => n + x.minutes, 0);
    const looks = { Practice: ['lead-breath', 'directions_walk'], Play: ['lead-game', 'sports_esports'], Mindset: ['lead-video', 'groups'] };
    v.dayChip = sheet + ' week · day ' + cyc + ' of 7 · ' + planned + ' min';
    v.dayRows = plan.map((x, k) => {
      const done = x.psych ? !!t.done : this.moduleDone(app, k), look = x.psych ? ['lead-audio', 'psychology'] : looks[x.category] || looks.Practice;
      return { psych: x.psych, module: !x.psych, name: x.name, title: x.psych ? v.heroTitle : '', sub: x.category + ' · ' + x.minutes + ' min',
        lead: look[0], icon: look[1], done, slot: !x.psych && !done, todo: x.psych && !done,
        open: () => (x.psych ? (t.kind === 'session' ? this.startSession(t.s) : this.startLoop(t.loop)) : this.startModule(k, x)) };
    });
    const dayLeft = v.dayRows.some((r) => !r.done);
    v.dayLeft = dayLeft;
    v.startDay = () => this.startDay(t);
    v.rPlanRows = plan.map((x) => ({ name: x.name + (x.psych ? ' (psychology session)' : ''), minutes: x.minutes + ' min', cat: x.category }));
    v.rPlanTotal = planned + ' min planned of the 30-minute day · ' + sheet + ' week, cycle day ' + cyc;
    v.rPsychLine = t.kind === 'session' ? 'Mindset is planned at 3 min; today\'s session holds ' + this.range(t.s) + ' of films, recordings and activities.' : 'Mindset is planned at 3 min; today is a week-13+ rhythm day.';
    v.lightCls2 = (app.plan || 'light') === 'light' ? 'is-selected' : ''; v.heavyCls2 = app.plan === 'heavy' ? 'is-selected' : '';
    v.lightPressed2 = v.lightCls2 ? 'true' : 'false'; v.heavyPressed2 = v.heavyCls2 ? 'true' : 'false';
    v.planLight2 = () => { const a = this.copyApp(); a.plan = 'light'; this.putApp(a); };
    v.planHeavy2 = () => { const a = this.copyApp(); a.plan = 'heavy'; this.putApp(a); };
    // A module slot in a flow
    const step = s.steps[s.i] || {};
    v.kModule = step.kind === 'module';
    if (v.kModule) {
      const x = step.item, st = x.status || {};
      v.mod = { name: x.name, kicker: x.category + ' · Protocol.xlsx, ' + sheet + ' week, day ' + cyc,
        facts: [['Duration (min)', String(x.minutes)], ['Rounds', x.rounds], ['Time since med (min)', x.med]].filter((r) => r[1]).map((r) => ({ k: r[0], v: r[1] })),
        statusHead: 'Status 1st month · ' + (st.area || '') + ' · ' + (st.item || ''),
        status: [['Trailers', st.trailers], ['Content', st.content], ['Non Video Content', st.non_video_content], ['Copy', st.copy], ['', st.note]].filter((r) => r[1]).map((r) => ({ k: r[0], v: r[1] })) };
      v.modGo = () => this.passModule(step);
    }
    const unlockedLib = D.library.filter((x) => this.met(app, x));
    v.recent = unlockedLib.slice(-2).reverse().map((x) => this.libItem(x, app));
    v.hasRecent = v.recent.length > 0 && !v.todayOpen;
    // Journey: as in the original design, a list from just before today, with earlier sessions on request.
    const cur = t.kind === 'session' ? t.s.n : total;
    const from = s.earlier ? 1 : Math.max(1, cur - 2);
    v.hasEarlier = from > 1; v.earlierLabel = U.showEarlier + ' ' + (from - 1);
    v.showEarlier = () => this.setState({ earlier: true });
    v.journey = D.sessions.filter((x) => x.n >= from).map((x) => this.journeyRow(x, app, t));
    v.loopChipJ = 'Week 13+ · the spec\'s suggested 7-day rhythm';
    v.loopRows = D.loop.map((l) => ({ title: D.acts[l.id].title, day: String(l.day) }));
    // Session preview
    if (view === 'preview' && s.preview) {
      const x = D.sessions.find((y) => y.n === s.preview), dn = this.isDone(app, x.n);
      Object.assign(v, { pvWhere: U.session + ' ' + x.n + ' · ' + (dn ? U.statusDone : U.statusOpen), pvTitle: x.title, pvSteps: this.stepRows(x.acts),
        pvRange: this.range(x), pvHasGaps: x.missing.length > 0, pvGaps: 'Not in the Lab copy yet: ' + x.missing.join(', ') + '. Its time slot is kept.',
        pvCta: dn ? U.again : U.start, pvIcon: dn ? 'replay' : 'play_arrow', pvStart: () => this.startSession(x) });
    }
    // Library: every practice met so far, ready to repeat without its intro film.
    v.library = D.library.map((x) => this.libItem(x, app));
    v.libEmpty = unlockedLib.length === 0;
    // Flow chrome
    v.completeTitle = U.todayDone; v.finishLabel = U.backToday;
    v.finish = () => { this.flow = null; this.leave({ view: 'today', tab: 'today' }); };
    if (f) {
      const n = of(s.i + 1, s.steps.length);
      v.stepText = f.type === 'session' ? U.session + ' ' + f.n + ' · ' + n : f.type === 'day' || f.type === 'module' ? U.tabToday + ' · ' + n : U.kPractice + ' · ' + n;
      v.completeTitle = f.type === 'session' || (f.type === 'day' && f.psych) ? U.todayDone : U.practiceDone;
      v.finishLabel = f.type === 'practice' ? U.backLibrary : U.backToday;
      v.finish = () => { const tab = f.type === 'practice' ? 'library' : 'today'; this.flow = null; this.leave({ view: tab, tab }); };
    }
    v.close = () => this.leaveFlow();
    // Lab rail (English)
    v.rDay = 'App day ' + app.day;
    v.rWhere = 'Calendar week ' + (Math.floor((app.day - D.firstDay) / 7) + 1) + ' · ' + (missed.run ? missed.run + ' day' + (missed.run === 1 ? '' : 's') + ' missed before today' : 'no missed days before today');
    v.rOffered = t.kind === 'session' ? 'Today: session ' + t.s.n + ' · ' + t.s.english + (t.done ? ' · done' : '')
      : 'Today: rhythm day ' + t.loop.day + ' · ' + D.acts[t.loop.id].english + (t.done ? ' · done' : '');
    v.nextDay = () => this.advance(1); v.skipDays = () => this.advance(4);
    v.reset = () => { this.closeFlow(this.copyApp()); this.putApp(this.freshApp()); this.setState({ view: 'today', tab: 'today', preview: null, earlier: false, sub: {} }); };
    const jt = Math.max(1, Math.min(total, s.jump)), js = D.sessions[jt - 1];
    v.jTarget = jt; v.jTitle = 'Session ' + jt + ' · ' + js.english + ' · app day ' + js.day + ' · week ' + js.week;
    const setJump = (d) => this.setState({ jump: Math.max(1, Math.min(total, jt + d)) });
    v.jMinus10 = () => setJump(-10); v.jMinus1 = () => setJump(-1); v.jPlus1 = () => setJump(1); v.jPlus10 = () => setJump(10);
    v.jGo = () => this.jumpTo(jt);
    v.specMissed = D.spec.missed; v.specLibrary = D.spec.library; v.specSource = D.spec.source;
    v.rLoop = t.kind === 'loop'; v.rLoopSpec = t.kind === 'loop' ? t.loop.spec : '';
    const fs = f ? (f.type === 'session' ? D.sessions.find((x) => x.n === f.n) : null) : t.kind === 'session' ? t.s : null;
    v.rState = v.tState;
    const content = fs ? fs.range : f && f.type === 'practice' ? fmt((D.acts[f.id] || {}).planned) : '';
    v.rPlanLine = content ? 'Content plan ' + content + ' of recorded media and planned activity time; reading and choosing are extra.' : 'Content plan depends on the practice chosen.';
    v.rGaps = (fs ? fs.missing : []).map((x) => ({ t: 'Not in the Lab copy: ' + x }));
    v.rHasGaps = v.rGaps.length > 0;
    v.sDone = doneCount; v.sTotal = total; v.sMissed = missed.total; v.sLibrary = app.library; v.sTime = fmt(app.seconds);
    v.log = app.log.slice(0, 14).map((x) => ({ when: 'Day ' + x.day, what: x.what }));
    v.hasLog = v.log.length > 0;
    return v;
  }
  journeyRow(x, app, t) {
    const U = this.data().ui, dn = this.isDone(app, x.n), today = t.kind === 'session' && t.s.n === x.n && !t.done, open = this.unlocked(app, x);
    const look = dn ? ['background: var(--primary); color: var(--on-primary)', 'check', 'icon-fill', U.statusDone]
      : today ? ['background: var(--primary-container); color: var(--on-primary-container); box-shadow: inset 0 0 0 3px var(--primary)', 'play_arrow', 'icon-fill', U.tabToday]
      : open ? ['background: var(--secondary-container); color: var(--on-secondary-container)', 'play_arrow', '', U.statusOpen]
      : ['background: var(--surface-high); color: var(--on-surface-variant)', 'lock', '', U.statusLater];
    return { title: x.title, sub: U.session + ' ' + x.n + ' · ' + look[3], dotStyle: look[0], icon: look[1], fill: look[2], locked: !open,
      open: () => { if (open) this.setState({ view: 'preview', preview: x.n }); } };
  }
  libItem(x, app) {
    const U = this.data().ui, m = this.meta(x.id), open = this.met(app, x);
    return { title: m.a.title, lead: m.lead, icon: m.icon, sub: open ? m.kind + ' · ' + this.fmt(m.a.planned) : U.session + ' ' + x.met + ' · ' + U.statusLater,
      gap: open && x.recording === 'not_yet_recorded', locked: !open, opacity: open ? '1' : '.5', trail: open ? 'play_arrow' : 'lock',
      open: () => { if (open) this.startPractice(x); } };
  }
