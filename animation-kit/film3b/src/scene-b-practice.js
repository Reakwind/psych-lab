const { seg, eo, eio, eob, lerp } = kit;
// all times are seconds from the start of this scene (global 109.06), taken from Ariel's counts in the recording
const INS = [[24.17, [24.17, 25.26, 26.51]], [33.99, []], [43.99, []]];
const OUTS = [[27.91, [27.91, 29.01, 30.26, 31.52, 32.77]], [37.74, []], [47.74, []]];
const COUNT = [[20.41, '3'], [21.51, '2'], [22.77, '1']];
kit.scene('b-practice', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('bp') + '<g class="bp-pg">' + R.pacer('bp-p', 5) + '</g></svg>' +
      '<div class="count bp-word"></div><div class="tag tag-cool bp-cap">שלוש נשימות יחד</div><div class="tag tag-warm bp-hand">יד על הבטן</div>' +
      '<div class="tag bp-easy">בלי להתאמץ</div><div class="tag tag-warm bp-good">יופי</div><div class="tag tag-cool bp-nat">חוזרים לנשימה הטבעית</div></div>'));
    Object.assign(this, R.refs(kit, 'bp', ['glow', 'armR', 'eyes', 'mouth', 'pg', 'word', 'cap', 'hand', 'easy', 'good', 'nat']));
    this.p = R.refs(kit, 'bp-p', ['ring', 'core', 'd0', 'd1', 'd2', 'd3', 'd4']);
  },
  render(t) {
    // settle: hand on the belly, eyes closed
    const on = eio(seg(t, 6.5, 7.4));
    if (t > 9.0) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.4);
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 1.3, 1.8))), eo(seg(t, 1.3, 1.8)) * (1 - eo(seg(t, 10.4, 10.8))));
    R.place(this.hand, 514, lerp(712, 700, eo(seg(t, 6.6, 7.1))), eo(seg(t, 6.6, 7.1)) * (1 - eo(seg(t, 10.0, 10.5))));
    R.place(this.easy, 540, lerp(84, 70, eo(seg(t, 11.4, 11.9))), eo(seg(t, 11.4, 11.9)) * (1 - eo(seg(t, 15.6, 16.0))));
    // the pacer: idles, lets the air out, counts down, then grows on each in-breath and shrinks on each out-breath
    let s = 0.7 + 0.03 * Math.sin(t * 1.4), word = '', lit = -1, litCol = 'var(--main)';
    s = lerp(s, 0.55, eio(seg(t, 16.3, 19.0)));
    COUNT.forEach(([a, w]) => { if (t >= a - 0.1 && t < a + 1.0) word = w; });
    INS.forEach(([a, cs]) => { if (t >= a) { s = lerp(0.55, 1.0, eio(seg(t, a, a + 3.4))); word = 'פנימה'; lit = cs.length ? cs.filter((c) => t >= c).length - 1 : Math.min(2, Math.floor((t - a) / 1.15)); litCol = 'var(--main)'; } });
    OUTS.forEach(([a, cs]) => { if (t >= a) { s = lerp(1.0, 0.55, eio(seg(t, a, a + 5.8))); word = 'החוצה'; lit = cs.length ? cs.filter((c) => t >= c).length - 1 : Math.min(4, Math.floor((t - a) / 1.25)); litCol = 'var(--accent)'; } });
    if (t >= 53.99) { s = 0.55; word = ''; lit = -1; }
    const done = eo(seg(t, 55.6, 56.6));
    this.pg.setAttribute('transform', 'translate(540 165) scale(' + (eo(seg(t, 7.8, 8.6)) * 0.95) + ')');
    this.pg.style.opacity = 1 - done;
    this.p.core.setAttribute('r', 110 * s); this.p.ring.setAttribute('r', 150 * s);
    [this.p.d0, this.p.d1, this.p.d2, this.p.d3, this.p.d4].forEach((el, k) => { el.style.fill = k <= lit ? litCol : 'var(--ground)'; });
    if (this.word.textContent !== word) this.word.textContent = word;
    R.put(this.word, word.length > 2 ? 290 : 540, 165, 1, 0, word ? 1 - done : 0);
    // her belly and hand rise and fall with it
    const b = (s - 0.55) / 0.45;
    R.handOn(this.armR, on, b * on);
    this.glow.style.opacity = 0.3 * b * on;
    this.mouth.setAttribute('d', t > 55.5 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.good, 540, lerp(84, 70, eo(seg(t, 55.7, 56.2))), eo(seg(t, 55.7, 56.2)));
    R.place(this.nat, 540, lerp(940, 928, eo(seg(t, 57.2, 57.7))), eo(seg(t, 57.2, 57.7)));
  },
});
