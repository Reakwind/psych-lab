const { seg, eo, eio, eob, lerp } = kit;
kit.scene('g-nocalm', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + R.seated('gn', -160) +
      '<g class="gn-pic">' + R.perfect('gn') + '</g><path class="gn-x" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:16;stroke-linecap:round" d="M690 270 L910 530 M910 270 L690 530"/></svg>' +
      '<div class="tag gn-q">צריך שקט מושלם?</div><div class="tag tag-warm gn-cap">לא צריך לחכות</div></div>'));
    Object.assign(this, R.refs(kit, 'gn', ['body', 'eyes', 'pic', 'x', 'q', 'cap']));
  },
  render(t) {
    R.blink(this.eyes, t, 1.0);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    // the old idea — a perfectly still, calm body first — and its answer
    const s = eio(seg(t, 0.4, 1.2));
    this.pic.setAttribute('transform', 'translate(' + lerp(1300, 800, s) + ' 400) rotate(3)');
    R.place(this.q, 800, lerp(592, 580, eo(seg(t, 3.4, 3.9))), eo(seg(t, 3.4, 3.9)));
    this.x.style.strokeDasharray = eo(seg(t, 6.6, 7.2)) + ' 1'; this.x.style.opacity = t > 6.6 ? 1 : 0;
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 7.7, 8.2))), eo(seg(t, 7.7, 8.2)));
  },
});
