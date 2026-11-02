const { seg, eo, eio, eob, lerp } = kit;
// an uneven breath: amplitude wanders along the line
const uneven = (x0, y, w, t) => { let d = ''; for (let i = 0; i <= 90; i++) { const u = i / 90, a = 26 + 18 * Math.sin(u * 7.3 + 1) * Math.sin(u * 2.1 + t * 0.3); d += (i ? ' L' : 'M') + (x0 + w * u).toFixed(1) + ' ' + (y - a * Math.sin(u * 5.2 * Math.PI - t * 1.6)).toFixed(1); } return d; };
kit.scene('p-whatever', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('pw') + '<g class="pw-ring">' + R.attn('pw') + '</g>' +
      '<path class="pw-wave" style="fill:none;stroke:var(--main);stroke-width:10;stroke-linecap:round"/>' +
      '<path class="pw-str" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:8 10;opacity:.5"/><g class="pw-b">' + R.balloon('pw-bl') + '</g>' +
      '<g class="pw-tg">' + R.tremor('pw') + '</g></svg>' +
      '<div class="tag pw-t0">הנשימה</div><div class="tag pw-t1">המחשבות</div><div class="tag pw-t2">הגוף</div>' +
      '<div class="tag tag-cool pw-m1">אולי רגועים יותר</div><div class="tag tag-warm pw-m2">ואולי לא</div></div>'));
    Object.assign(this, R.refs(kit, 'pw', ['eyes', 'mouth', 'ring', 'wave', 'str', 'b', 'tg', 't0', 't1', 't2', 'm1', 'm2']));
    this.ring.setAttribute('transform', 'translate(500 540) scale(470)'); this.ring.style.opacity = 0.8;
    this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
  },
  render(t) {
    // the breath can be uneven...
    const w = eo(seg(t, 0.3, 1.1));
    this.wave.setAttribute('d', uneven(440, 200, 440, t)); this.wave.style.opacity = w;
    R.place(this.t0, 660, lerp(72, 60, w), w);
    // ...thoughts can wander...
    const out = eio(seg(t, 3.0, 4.6)), bx = lerp(250, 300, out), by = lerp(500, 190, out);
    this.b.setAttribute('transform', 'translate(' + bx + ' ' + (by + Math.sin(t * 2) * 6) + ') scale(' + eob(seg(t, 2.9, 3.4), 1.6) * 1.4 + ')');
    this.str.setAttribute('d', 'M250 540 C200 420 ' + (bx - 30) + ' ' + (by + 140) + ' ' + bx + ' ' + (by + 30)); this.str.style.opacity = 0.5 * eo(seg(t, 3.2, 3.6));
    R.place(this.t1, 300, lerp(272, 260, eo(seg(t, 3.6, 4.1))), eo(seg(t, 3.6, 4.1)));
    // ...the body can move
    const tr = eo(seg(t, 5.2, 5.6));
    this.tg.style.opacity = tr; this.tg.setAttribute('transform', 'translate(' + (548 + Math.sin(t * 40) * 3) + ' 650) rotate(90)');
    R.place(this.t2, 600, lerp(772, 760, tr), tr);
    // maybe calmer, maybe not
    R.place(this.m1, 720, lerp(940, 928, eo(seg(t, 7.0, 7.5))), eo(seg(t, 7.0, 7.5)));
    R.place(this.m2, 330, lerp(940, 928, eo(seg(t, 8.8, 9.3))), eo(seg(t, 8.8, 9.3)));
    this.mouth.setAttribute('d', t > 8.8 ? 'M-10 28 Q2 26 14 28' : t > 7.0 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
