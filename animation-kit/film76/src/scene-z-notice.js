const { seg, eo, eio, eob, lerp } = kit;
// first, notice: say to yourself, "I really don't want to exercise now. It's hard for me to start." — without judging yourself,
// without trying to change the feeling right away: just notice what is happening
const P8 = 10.23;
kit.scene('z-notice', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.gym('zn', -150) + '<g class="zn-ring">' + R.attn('zn') + '</g>' + R.strip('zn') + '</svg>' + R.stripTag('zn') +
      '<div class="thought q zn-c1">אני ממש לא רוצה להתאמן עכשיו.</div><div class="thought q zn-c2">קשה לי להתחיל.</div>' +
      '<div class="tag struck zn-j">לשפוט את עצמנו</div><div class="tag struck zn-k">לשנות מיד את ההרגשה</div><div class="tag tag-warm zn-p">פשוט לשים לב למה שקורה</div></div>'));
    Object.assign(this, R.refs(kit, 'zn', ['body', 'head', 'eyes', 'mouth', 'db', 'mat-flat', 'mat-roll', 'ring', 'strip', 'c1', 'c2', 'j', 'k', 'p']));
    this.S = R.stripRefs(kit, 'zn');
  },
  render(t) {
    R.setMat({ flat: this['mat-flat'], roll: this['mat-roll'] }, 0);
    this.db.setAttribute('transform', 'translate(640 905)');
    this.body.setAttribute('transform', 'translate(0 4) scale(1 ' + kit.breathe(t, 0.01, 3.8) + ')');
    R.setStrip(this.S, t, 0, 0.9, eo(seg(t, 0, 0.5)));
    // her words, on cards
    R.put(this.c1, 740, 380 + 4 * Math.sin(t * 1.3), lerp(0.9, 1, eob(seg(t, 4.6, 5.1), 1.6)), -2, eo(seg(t, 4.6, 4.9)));
    R.put(this.c2, 760, 540 + 4 * Math.sin(t * 1.3 + 1), lerp(0.9, 1, eob(seg(t, 7.4, 7.9), 1.6)), 2, eo(seg(t, 7.4, 7.7)));
    // no judging, no rushing to change it: just a soft circle of attention around what is there
    const r = eio(seg(t, P8 + 5.0, P8 + 6.4));
    this.ring.setAttribute('transform', 'translate(740 460) scale(' + lerp(200, 300, r) + ')'); this.ring.style.opacity = r;
    R.look(this.eyes, t, 0.6, 4, -1);
    this.head.setAttribute('transform', 'rotate(' + 5 * eio(seg(t, 4.4, 5.0)) + ' 0 30)');
    this.mouth.setAttribute('d', t > P8 + 6 ? R.SMILE : R.FLAT);
    const o = (a, b) => eo(seg(t, a, a + 0.45)) * (1 - eo(seg(t, b, b + 0.4)));
    R.place(this.j, 330, lerp(262, 250, eo(seg(t, P8 + 0.64, P8 + 1.0))), o(P8 + 0.64, P8 + 5.0)); this.j.style.setProperty('--s', eo(seg(t, P8 + 1.2, P8 + 1.7)));
    R.place(this.k, 330, lerp(342, 330, eo(seg(t, P8 + 3.06, P8 + 3.4))), o(P8 + 3.06, P8 + 5.0)); this.k.style.setProperty('--s', eo(seg(t, P8 + 3.6, P8 + 4.1)));
    R.place(this.p, 740, lerp(792, 780, eo(seg(t, P8 + 5.08, P8 + 5.5))), o(P8 + 5.08, 99));
  },
});
