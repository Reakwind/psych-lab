const { seg, eo, eio, eob, lerp } = kit;
// then the part that's easy to forget: acknowledge yourself — not for a perfect result, but for stopping, noticing, choosing and finding a step that fits.
// you can even tell yourself: "It was hard to start today, and still I found something that worked for me."
const P16 = 14.53, TK = [[9.0, 'עצרתם'], [9.7, 'שמתם לב'], [10.9, 'בחרתם'], [11.6, 'מצאתם צעד שמתאים לכם']];
kit.scene('z-credit', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.gym('zk', -150) + '<g class="zk-tr">' + R.trophy('zk-t') + '</g><g class="zk-vg">' + R.voice('zk-v') + '</g>' + R.strip('zk') + '</svg>' + R.stripTag('zk') +
      '<div class="tag zk-a">החלק שקל לשכוח</div><div class="tag struck zk-b">תוצאה מושלמת</div>' + TK.map((k, i) => '<div class="tag tag-warm zk-k' + i + '">' + k[1] + '</div>').join('') +
      '<div class="thought kind zk-q">"היה לי קשה להתחיל היום, ובכל זאת מצאתי משהו שעבד בשבילי."</div></div>'));
    Object.assign(this, R.refs(kit, 'zk', ['body', 'head', 'eyes', 'mouth', 'db', 'mat-flat', 'mat-roll', 'tr', 'vg', 'a', 'b', 'q']));
    this.v = R.refs(kit, 'zk-v', ['grey', 'warm', 'eyes', 'mouth']); this.S = R.stripRefs(kit, 'zk'); this.k = TK.map((k, i) => kit.stage.querySelector('.zk-k' + i));
  },
  render(t) {
    R.setMat({ flat: this['mat-flat'], roll: this['mat-roll'] }, 1);
    this.db.setAttribute('transform', 'translate(640 905)');
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 3.8) + ')');
    R.setStrip(this.S, t, 4, 2.92);
    R.blink(this.eyes, t, 0.6); this.mouth.setAttribute('d', R.BIG);
    this.head.setAttribute('transform', 'rotate(' + (t > P16 ? 5 * eio(seg(t, P16, P16 + 0.8)) : 2 * Math.sin(t * 0.8)) + ' 0 30)');
    // not a trophy for a perfect result
    const tr = eob(seg(t, 4.95, 5.5), 1.5) * (1 - eo(seg(t, 7.8, 8.3)));
    this.tr.setAttribute('transform', 'translate(760 470) scale(' + Math.max(0.001, 0.95 * tr) + ')'); this.tr.style.opacity = tr > 0.01 ? 1 - 0.4 * eo(seg(t, 6.0, 6.6)) : 0;
    // her inner voice, warm, and her own words to herself
    const v = eob(seg(t, P16 + 0.2, P16 + 0.8), 1.6);
    this.vg.setAttribute('transform', 'translate(540 ' + (330 + 6 * Math.sin(t * 2)) + ') scale(' + Math.max(0.001, 1.3 * v) + ')');
    this.v.warm.setAttribute('opacity', 1); this.v.grey.setAttribute('opacity', 0); this.v.mouth.setAttribute('d', 'M-4 2 Q10 16 24 2'); R.blink(this.v.eyes, t, 2.1);
    R.put(this.q, 760, 560 + 4 * Math.sin(t * 1.3), lerp(0.9, 1, eob(seg(t, P16 + 2.39, P16 + 2.9), 1.6)), 0, eo(seg(t, P16 + 2.39, P16 + 2.7)));
    const o = (a, b) => eo(seg(t, a, a + 0.45)) * (1 - eo(seg(t, b, b + 0.4)));
    R.place(this.a, 760, lerp(312, 300, eo(seg(t, 1.89, 2.3))), o(1.89, 4.6));
    R.place(this.b, 760, lerp(312, 300, eo(seg(t, 4.95, 5.4))), o(4.95, 7.8)); this.b.style.setProperty('--s', eo(seg(t, 6.0, 6.5)));
    TK.forEach(([a], i) => R.place(this.k[i], 760, lerp(312, 300, eo(seg(t, a, a + 0.4))) + i * 86, o(a, P16 - 0.3)));
  },
});
