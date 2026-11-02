const { seg, eo, eio, eob, lerp } = kit;
// on guard, even watering the plant is stiff; noticing the tension and letting some of it go helps both how she feels and how she manages; with time the body learns it
const P5 = 6.51, RX = 400, FY = 900;
kit.scene('q-water', {
  init(kit) {
    const fig = (id, pose) => R.ruth(id, pose).replace('<g class="' + id + '-eyes">', R.faceBits(id) + '<g class="' + id + '-eyes">');
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) +
      '<g transform="translate(160 0)">' + R.chair() + '</g>' +
      '<g class="qw-pl"><g transform="translate(130 860) scale(1) translate(-130 -860)">' + R.plant() + '</g></g>' +
      '<path class="qw-leaf leaf-lt" d="M130 770 C160 720 196 706 226 712 C210 744 170 764 130 770Z" style="fill:color-mix(in srgb, #7FC27A 70%, var(--ground))"/>' +
      '<g class="qw-mw" transform="translate(965 860)">' + R.meter('qw-mt') + '</g>' +
      '<g class="qw-walk"><g class="qw-wa">' + fig('qw2', 'stand') + '</g><g class="qw-wb">' + fig('qw3', 'step') + '</g></g>' +
      '<g class="qw-me" transform="translate(' + RX + ' ' + FY + ') scale(-1 1)">' + fig('qw', 'water') + R.tenseUp('qw-tn') + '</g>' +
      '<path class="qw-stream" pathLength="1" style="fill:none;stroke:#6FB3E0;stroke-width:11;stroke-linecap:round;stroke-dasharray:.1 .05" d="M150 648 C150 700 140 730 136 770"/>' +
      [0, 1, 2, 3].map((k) => '<ellipse class="qw-d' + k + '" rx="7" ry="9" style="fill:#6FB3E0"/>').join('') +
      '<ellipse class="qw-pud" cx="226" cy="872" rx="0" ry="7" style="fill:#9ACBEA"/>' +
      '<g class="qw-sc" opacity="0">' + R.scan('qw-scan') + '</g></svg>' +
      '<div class="tag tag-red qw-a">דרוכים</div><div class="tag qw-b">משפיע על האופן שבו אנחנו מתפקדים</div>' +
      '<div class="tag tag-warm qw-c">לזהות את המתח</div><div class="tag tag-warm qw-d">לעזור לגוף לשחרר חלק ממנו</div>' +
      '<div class="tag tag-cool qw-e">ההרגשה</div><div class="tag tag-cool qw-f">התפקוד</div><div class="tag qw-g">עם הזמן, הגוף יכול ללמוד לעשות את זה בעצמו</div><div class="tag tag-red qw-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'qw', ['pl', 'leaf', 'mt-fill', 'walk', 'wa', 'wb', 'me', 'head', 'eyes', 'mouth', 'can', 'brow', 'tn', 'stream', 'pud', 'sc', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'ml']));
    this.dr = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.qw-d' + k));
  },
  render(t) {
    // she gets up and walks over to the plant (mirrored: she faces left)
    const walk = eio(seg(t, 0, 1.3)), stepping = t < 1.3, st = stepping ? Math.floor(t * 4) % 2 : 0;
    this.walk.style.opacity = stepping ? 1 : 0; this.me.style.opacity = stepping ? 0 : 1;
    this.wa.style.opacity = st ? 0 : 1; this.wb.style.opacity = st ? 1 : 0;
    this.walk.setAttribute('transform', 'translate(' + lerp(660, RX, walk) + ' ' + FY + ') scale(-1 1)');
    // tension, then letting go; later it comes back a little and melts on its own
    const rel = eio(seg(t, P5 + 3.4, P5 + 4.4)), again = Math.sin(Math.PI * seg(t, P5 + 8.4, P5 + 10.6));
    const tense = Math.max(1 - rel, 0.6 * again);
    this.tn.style.opacity = tense * (0.55 + 0.45 * Math.abs(Math.sin(t * 6))) * (t > 1.2 ? 1 : 0);
    const glow = Math.sin(Math.PI * seg(t, P5 + 1.6, P5 + 2.8));
    this.tn.setAttribute('transform', 'translate(0 -370) scale(' + (1 + 0.25 * glow) + ') translate(0 370)');
    this.head.setAttribute('transform', 'translate(0 ' + 9 * tense + ')');
    this.brow.setAttribute('opacity', 0.7 * tense);
    this.can.setAttribute('transform', 'rotate(' + (4 * (1 - rel) * Math.sin(t * 23) - 8 * rel) + ' 140 -270)');
    // the water: a few drops miss the pot while she is stiff; a steady stream once she lets go
    this.dr.forEach((d, k) => {
      const ph = ((t * 1.4 + k * 0.25) % 1), on = t > 2.4 && t < P5 + 3.6;
      d.setAttribute('cx', 214 + k * 9 + ph * 10); d.setAttribute('cy', 664 + ph * 200); d.style.opacity = on && ph < 0.95 ? 1 : 0;
    });
    this.pud.setAttribute('rx', 40 * eo(seg(t, 3.0, 6.0)) * (1 - eo(seg(t, P5 + 6.5, P5 + 7.5))));
    const flow = eo(seg(t, P5 + 7.2, P5 + 7.6));
    this.stream.style.opacity = flow > 0 && t < P5 + 11.8 ? flow * (1 - eo(seg(t, P5 + 11.4, P5 + 11.8))) : 0; this.stream.style.strokeDashoffset = (-t * 0.6).toFixed(3);
    const perk = eob(seg(t, P5 + 7.8, P5 + 8.6), 1.6);
    this.pl.setAttribute('transform', 'translate(130 860) scale(' + (1 + 0.08 * perk) + ' ' + (1 + 0.1 * perk) + ') translate(-130 -860)');
    this.leaf.setAttribute('transform', 'translate(130 770) scale(' + perk + ') translate(-130 -770)'); this.leaf.style.opacity = perk > 0.01 ? 1 : 0;
    // the scan line passes down her body
    const sc = seg(t, P5 + 1.4, P5 + 2.9);
    this.sc.setAttribute('opacity', sc > 0 && sc < 1 ? Math.sin(Math.PI * sc) : 0);
    this.sc.setAttribute('transform', 'translate(' + RX + ' ' + lerp(380, 900, sc) + ')');
    R.look(this.eyes, t, 0.5, 4, 3);
    this.mouth.setAttribute('d', t > P5 + 5.5 ? R.mouthHappy : rel > 0.5 ? R.mouthNeutral : R.mouthFlat);
    R.setMeter(this['mt-fill'], 0.72 - 0.2 * rel + 0.08 * again);
    const o = (a, b) => eo(seg(t, a, a + 0.45)) * (1 - eo(seg(t, b, b + 0.4)));
    R.place(this.a, 600, lerp(262, 250, eo(seg(t, 2.1, 2.55))), o(2.1, P5 + 1.0));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 3.14, 3.6))), o(3.14, P5 + 1.0));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, P5 + 1.49, P5 + 1.95))), o(P5 + 1.49, P5 + 5.3));
    R.place(this.d, 540, lerp(164, 150, eo(seg(t, P5 + 3.38, P5 + 3.8))), o(P5 + 3.38, P5 + 5.3));
    R.place(this.e, 420, lerp(262, 250, eo(seg(t, P5 + 6.42, P5 + 6.85))), o(P5 + 6.42, 99));
    R.place(this.f, 200, lerp(262, 250, eo(seg(t, P5 + 7.44, P5 + 7.85))), o(P5 + 7.44, 99));
    R.place(this.g, 540, lerp(92, 80, eo(seg(t, P5 + 9.31, P5 + 9.75))), o(P5 + 9.31, 99));
    R.place(this.ml, 965, 886, 1);
  },
});
