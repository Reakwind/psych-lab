  constructor(props) {
    super(props);
    this.state = { view: 'list', s: 0, i: 0, steps: [], sub: {} };
  }
  componentDidMount() { this.timer = setInterval(() => this.tick(), 200); }
  componentWillUnmount() { clearInterval(this.timer); this.holdStop(); }
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
    this.setState({ steps, i, sub, view: 'flow', hold: 0 });
  }
  next() { const s = this.state; if (s.i < s.steps.length - 1) this.enter(s.steps, s.i + 1); }
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
      start: () => this.enter(session.steps.slice(), 0),
      toList: () => this.setState({ view: 'list', sub: {} }),
      prevSession: () => this.setState({ view: 'overview', s: Math.max(0, s.s - 1) }),
      nextSession: () => this.setState({ view: 'overview', s: Math.min(D.sessions.length - 1, s.s + 1), sub: {} }),
      hasNextSession: s.s < D.sessions.length - 1,
      close: () => this.setState({ view: 'overview', sub: {} }),
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
          pick: () => this.enter(s.steps.slice(0, s.i + 1).concat(o.steps, s.steps.slice(s.i + 1)), s.i + 1) };
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
    return v;
  }
