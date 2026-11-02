const { seg, eo, eio, eob, lerp } = kit;
// the aim isn't total calm; sometimes it's enough to help the body shift down a gear
kit.scene('q-gear', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('qg', -120) +
      '<g class="qg-dl" transform="translate(700 360) scale(1.5)">' + R.dial('qg-d').replace('<g class="qg-d-hand">', '<path d="M33 -57.2 A66 66 0 0 1 66 0" style="fill:none;stroke:#D96C6C;stroke-width:12"/><g class="qg-d-hand">') + '</g></svg>' +
      '<div class="tag struck qg-no">רוגע מוחלט</div><div class="tag tag-warm qg-a">לעזור לגוף להוריד הילוך</div><div class="tag tag-red qg-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'qg', ['body', 'head', 'eyes', 'mouth', 'tn', 'pf', 'mt-fill', 'dl', 'd-hand', 'no', 'a', 'ml']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6); this.pf.style.opacity = 0;
    const down = eio(seg(t, 5.2, 6.0));
    this.tn.style.opacity = (1 - down) * 0.6 * (0.55 + 0.45 * Math.abs(Math.sin(t * 6)));
    this.body.setAttribute('transform', 'translate(0 ' + 5 * (1 - down) + ') scale(1 ' + kit.breathe(t, 0.01 + 0.006 * down, 3.4 + down) + ')');
    this.head.setAttribute('transform', 'translate(0 ' + 4 * (1 - down) + ')');
    this.mouth.setAttribute('d', down > 0.5 ? R.mouthHappy : R.mouthNeutral);
    // the meter goes down a notch, not to zero
    R.setMeter(this['mt-fill'], 0.58 - 0.14 * down);
    const d = eob(seg(t, 3.3, 3.9), 1.5);
    this.dl.setAttribute('transform', 'translate(700 360) scale(' + Math.max(0.001, 1.5 * d) + ')'); this.dl.style.opacity = eo(seg(t, 3.3, 3.5));
    this['d-hand'].setAttribute('transform', 'rotate(' + (66 + 3 * Math.sin(t * 9) * (1 - down) - 34 * down) + ')');
    R.place(this.no, 540, lerp(84, 70, eo(seg(t, 1.9, 2.3))), eo(seg(t, 1.9, 2.3)));
    this.no.style.setProperty('--s', eo(seg(t, 2.6, 3.1)));
    R.place(this.a, 700, lerp(570, 558, eo(seg(t, 5.15, 5.6))), eo(seg(t, 5.15, 5.6)));
    R.place(this.ml, 920, 886, 1);
  },
});
