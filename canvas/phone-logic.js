  constructor(props) {
    super(props);
    this.state = { view: 'list', s: 0, i: 0, steps: [], sub: {}, runs: this.loadRuns(), plan: 'light', paused: false, showJson: false };
    this.run = null;
  }
  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 200);
    // The run clock counts visible time only: it stops while the page is hidden or the clock is paused.
    this.clock = setInterval(() => { if (this.run && this.run.since) this.setState({ now: Date.now() }); }, 1000);
    this.onVisibility = () => {
      if (!this.run || this.run.done) return;
      if (document.visibilityState === 'visible') { if (!this.state.paused) this.run.since = Date.now(); }
      else this.bank(true);
      this.setState({ now: Date.now() });
    };
    document.addEventListener('visibilitychange', this.onVisibility);
  }
  componentWillUnmount() { clearInterval(this.timer); clearInterval(this.clock); document.removeEventListener('visibilitychange', this.onVisibility); this.holdStop(); }
  // ---- timing: visible time per run and per step, as the retired preview's review panel measured it ----
  loadRuns() { try { return JSON.parse(window.localStorage.getItem('psych-lab-phone-runs-v1') || '[]'); } catch (e) { return []; } }
  saveRuns(runs) { try { window.localStorage.setItem('psych-lab-phone-runs-v1', JSON.stringify(runs)); return true; } catch (e) { return false; } }
  bank(stop) {
    const r = this.run;
    if (!r || !r.since) return;
    const now = Date.now(), d = now - r.since;
    r.ms += d;
    if (r.current) r.current.ms += d;
    r.since = stop ? null : now;
  }
  runMs() { const r = this.run; return r ? r.ms + (r.since ? Date.now() - r.since : 0) : 0; }
  startRun(session) {
    this.run = { session: session.n, id: session.id, started_at: new Date().toISOString(), ms: 0, since: Date.now(), steps: [], current: null, reasons: [], missing: [], selections: {}, done: false };
    this.setState({ paused: false });
  }
  accelerate(reason) { if (this.run && this.run.reasons.indexOf(reason) < 0) this.run.reasons.push(reason); }
  gap(id) { if (this.run && id && this.run.missing.indexOf(id) < 0) this.run.missing.push(id); }
  // How the step being left was used: skipping, scrubbing and missing content make the run a partial preview.
  judgeStep() {
    const st = this.state.steps[this.state.i], sub = this.state.sub;
    if (!this.run || !st) return;
    if (st.kind === 'video') {
      if (!(st.clip && st.clip.url)) { this.gap(st.source_id || st.activity); this.accelerate('missing video slot'); }
      else if (!this.mediaDone) this.accelerate('video left before it ended');
    }
    if (st.kind === 'audio') {
      if (!(st.audio && st.audio.url)) { this.gap(st.activity); this.accelerate('missing practice recording'); }
      else if (!this.mediaDone) this.accelerate('recording left before it ended');
    }
    if (st.kind === 'breathing' && !sub.finished) this.accelerate('practice ended early');
  }
  finishRun(completed, reason) {
    const r = this.run;
    if (!r || r.done) return;
    this.bank(true);
    if (reason) this.accelerate(reason);
    r.done = true;
    const record = { session: r.session, id: r.id, started_at: r.started_at, ended_at: new Date().toISOString(),
      visible_seconds: Math.round(r.ms / 1000), completed, complete_experience: completed && !r.reasons.length && !r.missing.length,
      reasons: r.reasons.slice(), missing_assets: r.missing.slice(), selections: Object.assign({}, r.selections),
      screens: r.steps.map((x) => ({ step: x.label, seconds: Math.round(x.ms / 1000) })) };
    const runs = [record].concat(this.state.runs).slice(0, 200);
    this.saveRuns(runs);
    this.setState({ runs, paused: false });
  }
  leave(patch) { if (this.run && !this.run.done) this.finishRun(false, 'left before the end'); this.holdStop(); this.setState(Object.assign({ sub: {} }, patch)); }
  // Reflection hold button: as in the retired preview, holding it for 3.5 s moves on; letting go early
  // cancels. Continue beside it is the explicit bypass.
  holdStart() {
    if (this.holdTimer) return;
    const t0 = Date.now();
    this.holdTimer = setInterval(() => {
      const f = Math.min(1, (Date.now() - t0) / 3500);
      if (f >= 1) { this.holdStop(); this.setSub({ part: this.state.sub.part + 1, ideas: false }); }
      else this.setState({ hold: f });
    }, 50);
  }
  holdStop() { if (this.holdTimer) { clearInterval(this.holdTimer); this.holdTimer = null; } if (this.state.hold) this.setState({ hold: 0 }); }
  // Breathing practice clock; phase names and timings are Lab assumptions, not program text.
  tick() {
    const st = this.state.steps[this.state.i], sub = this.state.sub;
    if (this.state.view !== 'flow' || !st || st.kind !== 'breathing' || !sub.running || sub.finished) return;
    const progress = Math.min(st.seconds, sub.progress + 0.2);
    const finished = progress >= st.seconds;
    this.setState({ sub: Object.assign({}, sub, { progress, phaseAt: sub.phaseAt + 0.2 * sub.pace, finished, running: !finished }) });
  }
  fmt(x) { const n = Math.max(0, Math.round(x || 0)); return Math.floor(n / 60) + ':' + String(n % 60).padStart(2, '0'); }
  enter(steps, i) {
    const st = steps[i], sub = {};
    if (st && st.kind === 'inner') {
      const pool = this.data().thoughts[st.theme] || this.data().thoughts.flexible;
      sub.deck = pool.map((t) => [Math.random(), t]).sort((a, b) => a[0] - b[0]).slice(0, 8).map((x) => x[1]);
      sub.card = 0; sub.answer = null;
    }
    if (st && st.kind === 'cards') { sub.topic = null; sub.card = 0; sub.offset = 0; sub.solo = true; sub.ideas = {}; sub.follow = false; }
    if (st && st.kind === 'reflection') { sub.part = 0; sub.ideas = false; }
    if (st && st.kind === 'breathing') { sub.running = false; sub.progress = 0; sub.phaseAt = 0; sub.pace = 1; sub.finished = false; }
    this.holdStop();
    this.mediaDone = false; this.mediaLast = 0;
    const names = { prepage: 'Before you begin', video: 'Video', context: 'Context', choice: 'Choose one practice', breathing: 'Breathing practice', audio: 'Guided audio', inner: 'Inner Voice round', cards: 'Conversation cards', reflection: 'Guided reflection', motivation: 'Choose your motivation', rating: 'Practice feedback', complete: 'Session summary' };
    if (this.run && !this.run.done && st) {
      this.bank(false);
      const act = this.data().acts[st.activity];
      const label = (names[st.kind] || st.kind) + (st.kind === 'video' && st.clip ? ' · ' + st.clip.id.replace(/^SOURCE-/, '') : act ? ' · ' + act.english : '');
      this.run.current = { label, ms: 0 };
      this.run.steps.push(this.run.current);
    }
    this.setState({ steps, i, sub, view: 'flow', hold: 0 });
    if (st && st.kind === 'complete') this.finishRun(true);
  }
  next() { const s = this.state; if (s.i < s.steps.length - 1) { this.judgeStep(); this.enter(s.steps, s.i + 1); } }
  setSub(patch) { this.setState({ sub: Object.assign({}, this.state.sub, patch) }); }
  renderVals() {
    const D = this.data(), s = this.state, sub = s.sub, fmt = (x) => this.fmt(x);
    const kinds = { video: 'Video', audio: 'Guided audio', choice: 'Choose one', breathing: 'Breathing', inner: 'Inner Voice', cards: 'Cardversation', reflection: 'Reflection' };
    const session = D.sessions[s.s];
    const v = {
      isList: s.view === 'list', isOverview: s.view === 'overview', isFlow: s.view === 'flow',
      sessionCount: D.sessions.length,
      sessions: D.sessions.map((x, k) => ({ label: 'Session ' + x.n + ' · week ' + x.week + ' · app day ' + x.day, title: x.title, pick: () => this.setState({ view: 'overview', s: k }) })),
      sessionLabel: 'Session ' + session.n + ' of ' + D.sessions.length,
      sessionTitle: session.title, sessionEnglish: session.english,
      range: session.range + ' of recorded or planned content, plus reading and choosing time',
      overviewActs: session.acts.map((id) => ({ title: D.acts[id].title, kind: kinds[D.acts[id].kind] || 'Video' })),
      hasMotivation: session.n === 1,
      start: () => { this.startRun(session); this.enter(session.steps.slice(), 0); },
      toList: () => this.leave({ view: 'list' }),
      prevSession: () => this.setState({ view: 'overview', s: Math.max(0, s.s - 1) }),
      nextSession: () => this.leave({ view: 'overview', s: Math.min(D.sessions.length - 1, s.s + 1) }),
      hasNextSession: s.s < D.sessions.length - 1,
      close: () => this.leave({ view: 'overview' }),
      go: () => this.next()
    };
    const st = s.steps[s.i] || {}, a = D.acts[st.activity] || null;
    v.stepText = 'Session ' + session.n + ' · step ' + (s.i + 1) + ' of ' + s.steps.length;
    v.progressStyle = 'width: ' + Math.round((s.i + 1) / Math.max(1, s.steps.length) * 100) + '%';
    ['prepage', 'context', 'video', 'choice', 'breathing', 'audio', 'inner', 'cards', 'reflection', 'motivation', 'rating', 'complete'].forEach((k) => { v['k' + k[0].toUpperCase() + k.slice(1)] = st.kind === k; });
    v.actTitle = a ? a.title : ''; v.hasActTitle = !!a;
    // Intro page
    if (a) {
      v.preKind = kinds[a.kind] || 'Video';
      v.preSubtitle = a.subtitle; v.preHasSubtitle = !!a.subtitle;
      v.preLead = a.lead; v.preHasLead = !!a.lead;
      v.preBullets = a.bullets.map((t) => ({ t })); v.preHasBullets = a.bullets.length > 0;
      v.preEquipment = a.equipment; v.preHasEquipment = !!a.equipment;
      v.preSafety = a.safety; v.preHasSafety = !!a.safety;
      v.preEmpty = !a.subtitle && !a.lead && !a.bullets.length && !a.equipment && !a.safety;
      v.preButton = a.kind === 'video' ? 'Watch' : a.kind === 'choice' ? 'Choose a practice' : 'Continue';
    }
    // Context page
    if (st.kind === 'context') { v.ctxText = st.hebrew || st.english; v.ctxIsHe = !!st.hebrew; v.ctxIsEn = !st.hebrew; }
    // Video
    if (st.kind === 'video') {
      const clip = st.clip;
      v.vidKind = st.trailer ? 'Practice intro' : 'Video';
      v.vidHas = !!(clip && clip.url); v.vidMissing = !v.vidHas; v.vidSrc = v.vidHas ? clip.url : '';
      v.vidMeta = (clip ? clip.id.replace(/^SOURCE-/, '') + ' · ' : '') + fmt(st.seconds) + (clip && clip.preview ? ' · 720p preview encode' : '');
      v.vidSlot = 'Time slot kept for review: ' + fmt(st.seconds) + '.';
      v.vidLead = a ? a.lead : ''; v.vidHasLead = !!(a && a.lead);
    }
    // Choice
    if (st.kind === 'choice') {
      v.choiceOptions = (st.options || []).map((o) => {
        const item = D.acts[o.id];
        return { title: item.title, english: item.english, kind: kinds[item.kind] || 'Video', time: fmt(item.planned),
          pick: () => { if (this.run) this.run.selections[st.activity] = o.id; this.enter(s.steps.slice(0, s.i + 1).concat(o.steps, s.steps.slice(s.i + 1)), s.i + 1); } };
      });
    }
    // Breathing
    if (st.kind === 'breathing') {
      const phases = st.phases, total = phases.reduce((n, p) => n + p[1], 0);
      let pos = (sub.phaseAt || 0) % total, phase = phases[0];
      for (const p of phases) { phase = p; if (pos < p[1]) break; pos -= p[1]; }
      const scale = phase[2] + (phase[3] - phase[2]) * Math.min(1, pos / phase[1]);
      v.orbStyle = 'transform: scale(' + scale.toFixed(3) + ')';
      v.brPhase = sub.finished ? 'Done' : !sub.progress ? 'Ready' : phase[0];
      v.brCount = sub.progress && !sub.finished ? String(Math.ceil(phase[1] - pos)) : '';
      v.brClock = fmt(sub.progress) + ' / ' + fmt(st.seconds);
      v.brToggleLabel = sub.running ? 'Pause' : 'Start';
      v.brToggle = () => { if (!sub.finished) this.setSub({ running: !sub.running }); };
      v.brSlower = () => this.setSub({ pace: Math.max(0.6, (sub.pace || 1) - 0.1) });
      v.brFaster = () => this.setSub({ pace: Math.min(1.5, (sub.pace || 1) + 0.1) });
      v.brFinished = !!sub.finished;
    }
    // Guided audio
    if (st.kind === 'audio') {
      v.auHas = !!(st.audio && st.audio.url); v.auMissing = !v.auHas; v.auSrc = v.auHas ? st.audio.url : '';
      v.auMeta = v.auHas ? fmt(st.audio.seconds) + ' · ' + st.audio.status : '';
      v.auPlanned = 'Planned length ' + fmt(st.seconds) + '.';
    }
    // Inner Voice
    if (st.kind === 'inner') {
      const deck = sub.deck || [], card = deck[sub.card];
      v.ivPlaying = !!card; v.ivDone = !card;
      if (card) {
        const answered = sub.answer !== null && sub.answer !== undefined;
        const right = answered && sub.answer === card.keep, feedback = answered ? (right ? card.correct : card.incorrect) : '';
        v.ivText = card.text; v.ivCount = (sub.card + 1) + ' / ' + deck.length;
        v.ivAnswered = answered; v.ivUnanswered = !answered;
        v.ivShowType = answered && !!card.type_he; v.ivType = card.type_he;
        v.ivHasFeedback = answered && !!feedback; v.ivNoFeedback = answered && !feedback; v.ivFeedback = feedback;
        v.ivLetLabel = D.labels.let; v.ivKeepLabel = D.labels.keep;
        v.ivLet = () => this.setSub({ answer: false }); v.ivKeep = () => this.setSub({ answer: true });
        v.ivNext = () => this.setSub({ card: sub.card + 1, answer: null });
      }
    }
    // Cardversation
    if (st.kind === 'cards') {
      v.cdChoosing = sub.topic === null || sub.topic === undefined; v.cdPlaying = !v.cdChoosing;
      v.cdSoloCls = sub.solo ? 'is-selected' : ''; v.cdTogetherCls = sub.solo ? '' : 'is-selected';
      v.cdSoloPressed = sub.solo ? 'true' : 'false'; v.cdTogetherPressed = sub.solo ? 'false' : 'true';
      v.cdSolo = () => this.setSub({ solo: true }); v.cdTogether = () => this.setSub({ solo: false });
      v.cdTopics = D.cards.map((d, k) => ({ name: d.name, pick: () => this.setSub({ topic: k, offset: Math.floor(Math.random() * d.cards.length), card: 0, ideas: {}, follow: false }) }));
      v.cdPick = () => { const k = Math.floor(Math.random() * D.cards.length); this.setSub({ topic: k, offset: Math.floor(Math.random() * D.cards[k].cards.length), card: 0, ideas: {}, follow: false }); };
      if (v.cdPlaying) {
        const deck = D.cards[sub.topic], card = deck.cards[(sub.offset + sub.card) % deck.cards.length];
        v.cdDeck = deck.name; v.cdCardLabel = 'Card ' + (sub.card + 1);
        v.cdSides = (deck.action ? ['a'] : ['a', 'b']).filter((side) => card[side]).map((side) => {
          const show = !!(sub.ideas || {})[side];
          return { label: deck.action ? 'Action card' : side === 'a' ? 'Question 1' : 'Question 2', q: card[side], ideas: card['ideas_' + side],
            hasIdeas: !!card['ideas_' + side], show, toggleLabel: show ? 'Hide ideas' : 'Ideas',
            toggle: () => this.setSub({ ideas: Object.assign({}, sub.ideas, { [side]: !show }) }) };
        });
        v.cdFollowups = card.followups; v.cdHasFollow = card.followups.length > 0; v.cdShowFollow = !!sub.follow;
        v.cdFollowLabel = sub.follow ? 'Hide follow-up questions' : 'Follow-up questions';
        v.cdToggleFollow = () => this.setSub({ follow: !sub.follow });
        v.cdNextLabel = sub.card < 1 ? 'Next card' : 'Another card';
        v.cdNext = () => this.setSub({ card: sub.card + 1, ideas: {}, follow: false });
        v.cdCanFinish = sub.card >= 1;
        v.cdAnother = () => this.setSub({ topic: null });
      }
    }
    // Reflection
    if (st.kind === 'reflection') {
      const R = st.reflection, part = R.parts[sub.part];
      v.rfInPart = !!part; v.rfSummary = !part;
      if (part) {
        v.rfPartLabel = part.part;
        v.rfPrompt = part.prompt; v.rfHasPrompt = !!part.prompt; v.rfNoPrompt = !part.prompt;
        v.rfMissing = 'prompt for this step (' + part.part + ')';
        v.rfHasIdeas = part.ideas.length > 0; v.rfShowIdeas = !!sub.ideas;
        v.rfIdeasHe = !!part.ideasLabel && !sub.ideas; v.rfIdeasLabel = part.ideasLabel;
        v.rfIdeasLab = !v.rfIdeasHe; v.rfIdeasLabLabel = sub.ideas ? 'Hide ideas' : 'Ideas';
        v.rfToggleIdeas = () => this.setSub({ ideas: !sub.ideas });
        v.rfIdeas = part.ideas.map((t) => ({ t }));
        v.rfHold = part.hold; v.rfHasHold = !!part.hold;
        v.rfNext = part.next; v.rfHasNext = !part.hold && !!part.next; v.rfLabNext = !part.hold && !part.next;
        v.rfGo = () => { this.holdStop(); this.setSub({ part: sub.part + 1, ideas: false }); };
        const held = Math.round((s.hold || 0) * 100);
        v.rfHoldStyle = 'background: linear-gradient(to left, #1C4A44 ' + held + '%, var(--primary) ' + held + '%); touch-action: none';
        v.rfHoldStart = (e) => { if (e && e.preventDefault) e.preventDefault(); this.holdStart(); };
        v.rfHoldStop = () => this.holdStop();
        v.rfHoldKey = (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this.holdStart(); } };
      } else {
        v.rfSumTitle = R.title; v.rfHasSumTitle = !!R.title; v.rfNoSumTitle = !R.title;
        v.rfSumSub = R.subtitle; v.rfHasSumSub = !!(R.title && R.subtitle);
        v.rfTip = R.tip; v.rfHasTip = !!R.tip;
      }
    }
    // Media use, for timing: ended, or scrubbed forward past what was watched.
    v.mediaEnded = () => { this.mediaDone = true; };
    v.mediaTime = (e) => { const el = e && e.target; if (el && !el.seeking) this.mediaLast = el.currentTime; };
    v.mediaSeeking = (e) => { const el = e && e.target; if (el && el.currentTime > (this.mediaLast || 0) + 2) this.accelerate('scrubbed media'); };
    // Timing panel
    const r = this.run, live = !!(r && !r.done && s.view === 'flow');
    v.tSession = s.view === 'list' ? 'Choose a session in the phone' : session.id + ' · ' + session.english;
    v.tDay = 'App day ' + session.day + ' · psych week ' + session.week;
    v.tContent = fmt(session.low) + (session.high - session.low > 1 ? '–' + fmt(session.high) : '');
    const cycle = (session.n - 1) % 7, other = (D.daily[s.plan][cycle] - 3) * 60;
    const lo = other + session.low, hi = other + session.high;
    v.tPlanLabel = 'Protocol.xlsx ' + s.plan + ' speech plan, day ' + (cycle + 1) + ' of 7: ' + D.daily[s.plan][cycle] + ' min of activities, 3 of them psychology';
    v.tDayTotal = fmt(lo) + (hi - lo > 1 ? '–' + fmt(hi) : '') + ' / 30:00 planned day';
    v.tOver = lo > 1800; v.tWithin = !v.tOver;
    v.tOtherStyle = 'width: ' + Math.min(100, other / 1800 * 100).toFixed(1) + '%; background: #9AA9A5';
    v.tPsychStyle = 'width: ' + Math.max(0, Math.min(100 - other / 1800 * 100, session.high / 1800 * 100)).toFixed(1) + '%; background: ' + (hi > 1800 ? '#B47D43' : '#2B6A62');
    v.planLight = () => this.setState({ plan: 'light' }); v.planHeavy = () => this.setState({ plan: 'heavy' });
    v.lightCls = s.plan === 'light' ? 'is-selected' : ''; v.heavyCls = s.plan === 'heavy' ? 'is-selected' : '';
    v.lightPressed = s.plan === 'light' ? 'true' : 'false'; v.heavyPressed = s.plan === 'heavy' ? 'true' : 'false';
    v.tMissing = session.missing.map((t) => ({ t })); v.tHasMissing = session.missing.length > 0; v.tNoMissing = !v.tHasMissing;
    v.tChoiceNote = session.choice;
    v.tClock = fmt(this.runMs() / 1000);
    v.tLive = live;
    v.tState = !r || r.done && s.view !== 'flow' ? 'Start a session in the phone to measure it.'
      : r.done ? (this.state.runs[0] && this.state.runs[0].complete_experience ? 'Complete experience recorded.' : 'Preview complete · contains skipped, simulated or missing content.')
      : s.paused ? 'Clock paused. Resume when ready.'
      : r.reasons.length ? 'Partial preview · ' + r.reasons.join(', ')
      : 'Measuring visible time through the session.';
    v.tPauseLabel = s.paused ? 'Resume clock' : 'Pause clock';
    v.tPause = () => { if (!live) return; if (s.paused) { this.run.since = Date.now(); this.setState({ paused: false }); } else { this.bank(true); this.setState({ paused: true }); } };
    v.tSteps = r ? r.steps.map((x, k) => ({ label: x.label, time: fmt(x.ms / 1000 + (x === r.current && r.since ? (Date.now() - r.since) / 1000 : 0)), current: x === r.current && !r.done, done: !(x === r.current && !r.done) })) : [];
    v.tHasSteps = v.tSteps.length > 0;
    v.runSummary = 'Time in this session: ' + fmt((r ? r.ms : 0) / 1000);
    v.runPartial = !!(r && r.done && this.state.runs[0] && !this.state.runs[0].complete_experience);
    v.tRuns = s.runs.slice(0, 12).map((x) => ({ label: x.id + ' · ' + fmt(x.visible_seconds), status: x.complete_experience ? 'complete experience' : x.completed ? 'partial: ' + (x.reasons.join(', ') || 'missing content') : 'not finished' }));
    v.tHasRuns = s.runs.length > 0; v.tRunCount = s.runs.length + ' timed run' + (s.runs.length === 1 ? '' : 's') + ' saved in this browser';
    v.tToggleJson = () => this.setState({ showJson: !s.showJson }); v.tJsonLabel = s.showJson ? 'Hide runs as JSON' : 'Show runs as JSON';
    v.tShowJson = s.showJson; v.tJson = s.showJson ? JSON.stringify(s.runs, null, 1) : '';
    v.tClear = () => { this.saveRuns([]); this.setState({ runs: [], showJson: false }); };
    return v;
  }
