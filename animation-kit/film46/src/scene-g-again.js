const { seg, eo, eio, eob, lerp } = kit;
// again and again the circle catches the warm moments as they pass; each time it is a little quicker and brighter
const SP = 180, OFF0 = R.dayStop(0, 540 + SP * 1.3)[0];
kit.scene('g-again', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('ga', -120) + R.dayBar('ga', 220) + R.dayItems('ga') +
      '<g class="ga-ring">' + R.attn('ga') + '</g><g class="ga-ping"><circle r="110" style="fill:none;stroke:var(--accent);stroke-width:8"/></g>' +
      [0, 1, 2].map((k) => '<circle class="ga-d' + k + '" cx="' + (580 - k * 40) + '" cy="350" r="12" style="fill:var(--ground);stroke:var(--second);stroke-width:4"/>').join('') + '</svg>' +
      '<div class="tag tag-cool ga-a">שוב ושוב</div><div class="tag ga-b">מאמנים את היכולת שלנו לראות</div><div class="tag tag-warm ga-c">ולהנות מהם ביומיום</div></div>'));
    Object.assign(this, R.refs(kit, 'ga', ['body', 'head', 'eyes', 'mouth', 'ring', 'ping', 'd0', 'd1', 'd2', 'a', 'b', 'c']));
    this.it = R.DAYK.map((_, i) => kit.stage.querySelector('.ga-i' + i));
    this.gl = R.DAYK.map((k, i) => (k === 'w' ? kit.stage.querySelector('.ga-w' + i + '-glow') : null));
  },
  render(t) {
    R.blink(this.eyes, t, 0.3);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    const off = OFF0 + SP * t;
    R.placeDay(this.it, 220, off);
    // count the catches so far, and how close a warm one is now
    let near = 0, n = 0;
    for (let s = 0; s <= t; s += 1 / 30) { const o = OFF0 + SP * s; R.DAYK.forEach((k, i) => { if (k === 'w' && Math.abs(R.dayX(i, o) - 540) < 3) n += 1; }); }
    n = Math.min(3, Math.round(n / 1));
    R.DAYK.forEach((k, i) => {
      if (k !== 'w') return; const x = R.dayX(i, off), c = Math.max(0, 1 - Math.abs(x - 540) / 120);
      near = Math.max(near, c); this.gl[i].style.opacity = (0.3 + 0.12 * n) * c;
      this.it[i].setAttribute('transform', 'translate(' + x + ' 220) scale(' + (0.8 + 0.3 * c) + ')');
    });
    R.xf(this.ring, 540, 220, 110 + Math.sin(t * 2.4) * 4 + 10 * near, 0.75 + 0.25 * Math.min(1, n / 3));
    R.xf(this.ping, 540, 220, 1 + 0.4 * (1 - near), near > 0.05 ? near * 0.8 : 0);
    [0, 1, 2].forEach((k) => (this['d' + k].style.fill = n > k ? 'var(--accent)' : 'var(--ground)'));
    this.head.setAttribute('transform', 'rotate(' + (6 * near) + ' 0 30) translate(0 ' + (-4 * near) + ')');
    this.mouth.setAttribute('d', near > 0.3 || t > 7.2 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(1002, 990, eo(seg(t, 1.0, 1.5))), eo(seg(t, 1.0, 1.5)) * (1 - eo(seg(t, 5.0, 5.3))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 5.3, 5.8))), eo(seg(t, 5.3, 5.8)));
    R.place(this.c, 540, lerp(1002, 990, eo(seg(t, 7.4, 7.9))), eo(seg(t, 7.4, 7.9)));
  },
});
