const { seg, eo, eio, eob, lerp } = kit;
// racing thoughts circle Ruth's head; the dot keeps its simple path round the box; the thoughts slow and drift away and her attention rests on the dot
kit.scene('q-mind', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('q6', -230) + R.box('q6b') +
      '<path class="q6-tr" style="fill:none;stroke:var(--main);stroke-width:10;stroke-linecap:round;stroke-linejoin:round"/>' +
      '<g class="q6-at">' + R.attn('q6a') + '</g>' + [0, 1, 2].map((k) => '<g class="q6-bl' + k + '">' + R.balloon('q6-b' + k) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool q6-p">קצב קבוע</div><div class="tag tag-warm q6-q">מאותתים לגוף שאפשר קצת להוריד הילוך</div>' +
      '<div class="tag q6-a">הספירה והחזרה לתחושת הנשימה</div><div class="tag tag-warm q6-b">לכאן ועכשיו</div><div class="tag tag-cool q6-c">משהו פשוט וברור לחזור אליו</div><div class="tag tag-red q6-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'q6', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'mw', 'mt-fill', 'tr', 'at', 'p', 'q', 'a', 'b', 'c', 'ml']));
    this.x = R.boxRefs(kit, 'q6b'); this.bl = [0, 1, 2].map((k) => kit.stage.querySelector('.q6-bl' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    // the steady trace folds back into the box; the dot then circles it, one side per three seconds
    const back = eio(seg(t, 0.1, 1.1));
    this.tr.setAttribute('d', R.traceD(565, 450, 330, 160, 0, 3.0 + t * 0.22)); this.tr.style.opacity = 1 - back;
    const dp = Math.max(0, t - 0.8) / 3.0;
    R.setBox(this.x, { draw: [back, back, back, back], ticks: back, dot: t > 0.8 ? dp : null, lit: (n) => { const p = dp % 4; return n / 3 <= p + 0.001 && n / 3 > p - 1.0 ? 1 : 0; }, ring: back * (0.45 + 0.4 * (1 - Math.cos(dp * Math.PI / 2)) / 2) });
    this.mw.style.opacity = 1 - eo(seg(t, 0.2, 1.0)); R.setMeter(this['mt-fill'], 0.35); R.place(this.ml, 975, 886, 1 - eo(seg(t, 0.2, 1.0)));
    // the balloons: race round her head, slow down, then drift up and away
    const come = eo(seg(t, 2.6, 3.4)), slow = eio(seg(t, 5.0, 8.0)), away = eio(seg(t, 7.6, 10.0));
    const ang = t * 2.6 - slow * (t - 5.0) * 2.0;
    this.bl.forEach((b, k) => {
      const a = ang + k * 2.09;
      R.setG(b, 270 + Math.cos(a) * 170 + away * (k - 1) * 120, 360 + Math.sin(a) * 50 - away * (260 + k * 40), 0.75 * come, come * (1 - away));
    });
    this.head.setAttribute('transform', 'rotate(' + (-5 + 6 * Math.sin(ang) * come * (1 - away) + 6 * eio(seg(t, 9.6, 10.6))) + ' 0 30)');
    this.mouth.setAttribute('d', come > 0.5 && away < 0.5 ? R.mouthFlat : R.mouthNeutral);
    // her attention: session 3a's circle settles on the dot and follows it
    const at = eob(seg(t, 9.85, 10.5), 1.3), [dx, dy] = R.boxPt(730, 450, 320, 320, dp);
    this.at.setAttribute('transform', 'translate(' + dx + ' ' + dy + ') scale(' + Math.max(0.001, 70 * at) + ')'); this.at.style.opacity = eo(seg(t, 9.85, 10.2));
    this.body.setAttribute('transform', 'scale(1 ' + (1 + 0.03 * (1 - Math.cos(dp * Math.PI / 2)) / 2) + ')');
    R.place(this.p, 730, 130, 1 - eo(seg(t, 0.2, 0.6)));
    R.place(this.q, 540, 40, 1 - eo(seg(t, 0.2, 0.6)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.56, 1.0))), eo(seg(t, 0.56, 1.0)) * (1 - eo(seg(t, 7.3, 7.6))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 7.65, 8.0))), eo(seg(t, 7.65, 8.0)));
    R.place(this.c, 540, lerp(124, 112, eo(seg(t, 11.6, 12.0))), eo(seg(t, 11.6, 12.0)));
  },
});
