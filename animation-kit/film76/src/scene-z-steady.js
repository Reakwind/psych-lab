const { seg, eo, eio, eob, lerp } = kit;
// then, steady: a slow breath, noticing what is around us, or a moment to calm down and regroup — no need for total calm, just a moment before deciding
const P10 = 12.49;
kit.scene('z-steady', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.gym('zs', -150) + '<g class="zs-ring">' + R.attn('zs') + '</g>' +
      '<g transform="translate(350 866)">' + R.roots('zs-rt') + '</g><g transform="translate(350 742)">' + R.puffs('zs-pf') + '</g>' +
      '<g class="zs-hg">' + R.hourglass('zs-h') + '</g>' + R.strip('zs') + '</svg>' + R.stripTag('zs') +
      '<div class="tag zs-a">נשימה איטית</div><div class="tag zs-b">לשים לב למה שנמצא מסביבנו</div><div class="tag zs-c">רגע להירגע ולהתארגן מחדש</div>' +
      '<div class="tag struck zs-d">רוגע מוחלט</div><div class="tag tag-warm zs-e">רגע לפני שמחליטים מה עושים</div></div>'));
    Object.assign(this, R.refs(kit, 'zs', ['body', 'head', 'eyes', 'mouth', 'db', 'mat-flat', 'mat-roll', 'ring', 'rt-r', 'pf', 'hg', 'a', 'b', 'c', 'd', 'e']));
    this.S = R.stripRefs(kit, 'zs');
  },
  render(t) {
    R.setMat({ flat: this['mat-flat'], roll: this['mat-roll'] }, 0);
    this.db.setAttribute('transform', 'translate(640 905)');
    R.setStrip(this.S, t, 1, 1.12);
    // a slow breath: the chest rises and falls slowly, a long breath out
    const br = t > 3.4 && t < 7.0 ? Math.sin(Math.PI * seg(t, 3.5, 6.9)) : 0;
    this.body.setAttribute('transform', 'scale(1 ' + (1 + 0.035 * br + (kit.breathe(t, 0.01, 4.4) - 1)) + ')');
    this.pf.style.opacity = t > 5.3 && t < 7.0 ? 0.5 + 0.5 * Math.abs(Math.sin(t * 3)) : 0;
    if (t > 3.5 && t < 6.6) R.shut(this.eyes); else R.blink(this.eyes, t, 0.6);
    // noticing what is around: the circle of attention opens over the room
    const r = eio(seg(t, 6.8, 8.6));
    this.ring.setAttribute('transform', 'translate(' + lerp(350, 540, r) + ' ' + lerp(620, 600, r) + ') scale(' + lerp(150, 560, r) + ')'); this.ring.style.opacity = eo(seg(t, 6.6, 7.0)) * (1 - 0.6 * eo(seg(t, 9.4, 10.2)));
    R.look(this.eyes, t, 0.6, t > 7 && t < 9.4 ? 5 * Math.sin((t - 7) * 1.4) : 0, 0);
    // a moment to settle: roots from her feet
    const rt = eio(seg(t, 9.5, 11.0));
    this['rt-r'].style.strokeDasharray = rt + ' 1'; this['rt-r'].style.opacity = rt > 0 ? 1 : 0;
    // not total calm: a moment before deciding — the hourglass turns once
    const h = eob(seg(t, P10 + 4.4, P10 + 4.9), 1.6);
    this.hg.setAttribute('transform', 'translate(760 640) scale(' + Math.max(0.001, 0.9 * h) + ') rotate(' + 180 * eio(seg(t, P10 + 5.2, P10 + 6.6)) + ')');
    this.mouth.setAttribute('d', t > 9.6 ? R.SMILE : R.FLAT);
    const o = (a, b) => eo(seg(t, a, a + 0.45)) * (1 - eo(seg(t, b, b + 0.4)));
    R.place(this.a, 760, lerp(352, 340, eo(seg(t, 3.66, 4.1))), o(3.66, 6.6));
    R.place(this.b, 760, lerp(352, 340, eo(seg(t, 6.78, 7.2))), o(6.78, 9.3));
    R.place(this.c, 760, lerp(352, 340, eo(seg(t, 9.52, 9.9))), o(9.52, P10 + 0.2));
    R.place(this.d, 760, lerp(352, 340, eo(seg(t, P10 + 2.16, P10 + 2.5))), o(P10 + 2.16, P10 + 4.3)); this.d.style.setProperty('--s', eo(seg(t, P10 + 2.7, P10 + 3.2)));
    R.place(this.e, 760, lerp(352, 340, eo(seg(t, P10 + 4.54, P10 + 4.9))), o(P10 + 4.54, 99));
  },
});
