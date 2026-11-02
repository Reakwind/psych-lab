const { seg, eo, eio, eob, lerp } = kit;
// parts 15–16; part 16 starts at 3.77
const P = 3.77;
kit.scene('p-anchor', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('pn2') + '<g class="pn2-ring">' + R.attn('pn2') + '</g>' +
      '<g class="pn2-q"><g transform="scale(1.3)">' + R.balloon('pn2-b') + '</g><text x="0" y="16" text-anchor="middle" style="font-size:52px;font-weight:700;fill:var(--second)">?</text></g>' +
      '<g class="pn2-an"><g class="pn2-anc" transform="scale(.8)">' + R.anchor('pn2-a') + '</g></g>' +
      '<g class="pn2-snd"><path class="ink" style="stroke:var(--accent);stroke-width:9" d="M150 230 q16 20 0 40 M172 214 q28 36 0 72 M194 198 q40 52 0 104"/></g>' +
      '<ellipse class="pn2-g0" cx="530" cy="463" rx="56" ry="36" style="fill:var(--accent);opacity:0"/><ellipse class="pn2-g1" cx="530" cy="617" rx="56" ry="36" style="fill:var(--accent);opacity:0"/>' +
      '<ellipse class="pn2-g2" cx="800" cy="540" rx="50" ry="70" style="fill:var(--accent);opacity:0"/></svg>' +
      '<div class="tag tag-warm pn2-hard">קשיים נפוצים</div><div class="tag pn2-unc">לפעמים לא נעים להתמקד בנשימה</div><div class="tag tag-cool pn2-other">עוגן אחר</div>' +
      '<div class="tag pn2-sd">צלילים</div><div class="tag pn2-hf">תחושות בידיים או ברגליים</div></div>'));
    Object.assign(this, R.refs(kit, 'pn2', ['eyes', 'mouth', 'ring', 'q', 'dots', 'an', 'anc', 'snd', 'g0', 'g1', 'g2', 'hard', 'unc', 'other', 'sd', 'hf']));
    kit.stage.querySelectorAll('.pn2-b .metal').forEach((d) => (d.style.opacity = 0));
    this.ap = kit.stage.querySelectorAll('.pn2-a .ink');
    this.ring.setAttribute('transform', 'translate(500 540) scale(470)'); this.ring.style.opacity = 0.8;
    this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
  },
  render(t) {
    // some common difficulties
    const q = eob(seg(t, 0.5, 1.0), 1.6) * (1 - eo(seg(t, P + 0.2, P + 0.6)));
    this.q.setAttribute('transform', 'translate(300 ' + (230 + Math.sin(t * 2) * 6) + ') scale(' + q + ')');
    R.place(this.hard, 540, lerp(84, 70, eo(seg(t, 0.9, 1.4))), eo(seg(t, 0.9, 1.4)) * (1 - eo(seg(t, P + 0.3, P + 0.6))));
    // the breath as an anchor can feel unpleasant...
    const an = eob(seg(t, P + 0.2, P + 0.7), 1.6), bad = eo(seg(t, P + 0.9, P + 1.4)), lift = eio(seg(t, P + 5.2, P + 6.4));
    this.an.setAttribute('transform', 'translate(' + (514 + Math.sin(t * 22) * 4 * bad * (1 - lift)) + ' ' + lerp(560, 300, lift) + ')');
    this.anc.setAttribute('transform', 'scale(' + 0.8 * an + ')'); this.an.style.opacity = 1 - eo(seg(t, P + 5.8, P + 6.6));
    this.ap.forEach((p) => (p.style.stroke = bad > 0.5 ? '#C0392B' : 'var(--second)'));
    this.mouth.setAttribute('d', bad > 0.5 && lift < 0.5 ? 'M-10 30 Q2 24 14 30' : 'M-10 26 Q2 32 14 26');
    R.place(this.unc, 540, lerp(84, 70, eo(seg(t, P + 0.9, P + 1.4))), eo(seg(t, P + 0.9, P + 1.4)) * (1 - eo(seg(t, P + 6.4, P + 6.8))));
    // ...so attention can rest elsewhere: sounds, the hands, the feet
    R.place(this.other, 540, lerp(84, 70, eo(seg(t, P + 6.8, P + 7.3))), eo(seg(t, P + 6.8, P + 7.3)));
    const sd = eo(seg(t, P + 7.3, P + 7.8));
    this.snd.style.opacity = sd; this.snd.setAttribute('transform', 'translate(' + Math.sin(t * 6) * 3 + ' 0)');
    R.place(this.sd, 250, lerp(212, 200, sd), sd);
    const pulse = (a) => eo(seg(t, a, a + 0.5)) * (0.3 + 0.08 * Math.sin(t * 3));
    this.g0.style.opacity = pulse(P + 8.8); this.g1.style.opacity = pulse(P + 8.8); this.g2.style.opacity = pulse(P + 9.6);
    R.place(this.hf, 540, lerp(940, 928, eo(seg(t, P + 8.8, P + 9.3))), eo(seg(t, P + 8.8, P + 9.3)));
  },
});
