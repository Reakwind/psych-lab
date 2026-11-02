const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-nostill', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) +
      '<g class="an2-ring" transform="translate(340 640) scale(300)">' + R.attn('an2') + '</g>' + R.seated('an2', -160) +
      '<g class="an2-tg">' + R.tremor('an2') + '</g><g transform="translate(800 400) rotate(3)">' + R.perfect('an2p') + '</g>' +
      '<path class="an2-x" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:16;stroke-linecap:round" d="M690 270 L910 530 M910 270 L690 530"/></svg>' +
      '<div class="tag tag-warm an2-cap">לא צריך לשבת בלי לזוז</div></div>'));
    Object.assign(this, R.refs(kit, 'an2', ['ring', 'body', 'head', 'eyes', 'tg', 'x', 'cap']));
  },
  render(t) {
    // the perfect picture is crossed out; Ruth practises as she is, tremor and all, inside a soft circle of attention
    this.x.style.strokeDasharray = eo(seg(t, 1.7, 2.3)) + ' 1'; this.x.style.opacity = t > 1.7 ? 1 : 0;
    const r = eo(seg(t, 2.4, 3.8));
    this.ring.style.opacity = r;
    this.ring.setAttribute('transform', 'translate(340 640) scale(' + lerp(200, 300, r) + ')');
    this.tg.setAttribute('transform', 'translate(' + (316 + Math.sin(t * 40) * 3) + ' 712)');
    const closed = t > 3.0;
    this.eyes.setAttribute('transform', closed ? 'translate(0 -2) scale(1 .15)' : ''); if (!closed) R.blink(this.eyes, t, 0.9);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 3.6) + ')');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 1.4, 1.9))), eo(seg(t, 1.4, 1.9)));
  },
});
