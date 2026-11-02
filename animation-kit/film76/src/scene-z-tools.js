const { seg, eo, eio, eob, lerp } = kit;
// we've been through quite a few tools together — will you remember which one to use, and when? thoughts and feelings, attention, calming,
// energy, starting without motivation, what matters, being kinder to ourselves… but we don't usually remember lists by heart
const P2 = 9.88, P3 = 25.97;
const IN = [3.14, 5.1, 5.62, 6.98, 8.57, 10.7, 14.12].map((x) => x + P2);
const ARC = [0, 1, 2, 3, 4, 5, 6].map((k) => { const a = (72 - k * 24) * Math.PI / 180; return [540 + 420 * Math.sin(a), 600 - 400 * Math.cos(a)]; });
kit.scene('z-tools', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g transform="translate(540 960)">' + R.packed('zt') + '</g>' +
      '<g class="zt-list"><rect class="shade" x="-112" y="-410" width="236" height="890" rx="26"/><rect x="-120" y="-420" width="240" height="890" rx="26" style="fill:color-mix(in srgb, var(--ground) 35%, white);stroke:var(--second);stroke-width:6"/></g>' +
      '<g class="zt-q"><circle r="46" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/><text y="20" text-anchor="middle" style="font:700 58px Rubik, sans-serif;fill:var(--second)">?</text></g>' +
      [0, 1, 2, 3, 4, 5, 6].map((k) => '<g class="zt-b' + k + '">' + R.way('zt-w' + k, k, 56) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool zt-title" style="white-space:normal;width:820px;text-align:center;border-radius:28px">מפגש 76 · לשים לב ← להתייצב ← לבחור ← לעשות צעד ← לפרגן לעצמנו</div>' +
      '<div class="tag tag-warm zt-a">באיזה כלי להשתמש, ומתי?</div>' + R.WAYS.map((w, k) => '<div class="tag zt-t' + k + '">' + w + '</div>').join('') +
      '<div class="tag tag-warm zt-c">לא זוכרים רשימות בעל פה</div></div>'));
    Object.assign(this, R.refs(kit, 'zt', ['eyes', 'mouth', 'head', 'list', 'q', 'title', 'a', 'c']));
    this.b = [0, 1, 2, 3, 4, 5, 6].map((k) => kit.stage.querySelector('.zt-b' + k)); this.tg = R.WAYS.map((w, k) => kit.stage.querySelector('.zt-t' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    // the badges come out of her backpack one by one into an arc around her; then they line up into a long list
    const toList = eio(seg(t, P3 + 1.4, P3 + 2.6));
    this.list.setAttribute('transform', 'translate(880 ' + lerp(1600, 540, toList) + ')');
    this.b.forEach((b, k) => {
      const a = IN[k], p = eio(seg(t, a - 0.2, a + 0.5)), s = eob(seg(t, a - 0.2, a + 0.5), 1.4);
      let x = lerp(540, ARC[k][0], p), y = lerp(640, ARC[k][1], p) - 60 * Math.sin(Math.PI * p);
      const lx = 880, ly = 190 + k * 118, d = eio(seg(t, P3 + 1.6 + k * 0.1, P3 + 2.4 + k * 0.1));
      x = lerp(x, lx, d); y = lerp(y, ly, d);
      const wob = Math.sin(t * 5 + k) * 4 * eo(seg(t, P3 + 2.6, P3 + 3.0));
      b.setAttribute('transform', 'translate(' + (x + wob) + ' ' + (y + Math.sin(t * 1.4 + k) * 4) + ') scale(' + Math.max(0.001, s * lerp(1, 0.86, d)) + ')');
      b.style.opacity = t > a - 0.2 ? 1 : 0;
      const nx = IN[k + 1] || P3; R.place(this.tg[k], 540, lerp(1002, 990, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, nx - 0.15, nx + 0.15))));
    });
    const puzzled = eo(seg(t, P3 + 2.0, P3 + 2.6));
    this.q.setAttribute('transform', 'translate(' + (640 + 4 * Math.sin(t * 3)) + ' 390) scale(' + Math.max(0.001, eob(seg(t, 4.78, 5.3), 1.6) * (1 - eo(seg(t, P2 - 0.2, P2 + 0.3))) + eob(seg(t, P3 + 2.2, P3 + 2.8), 1.6)) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-6 * puzzled + 2 * Math.sin(t * 0.8)) + ' 0 30)');
    R.look(this.eyes, t, 0.4, t > P2 + 3 && t < P3 ? 3 * Math.sin(t * 0.7) : 0, t > P2 + 3 && t < P3 ? -3 : 0);
    this.mouth.setAttribute('d', puzzled > 0.5 ? R.SAD : t > P2 + 3 ? R.BIG : R.SMILE);
    R.place(this.title, 540, lerp(56, 44, eo(seg(t, 0.1, 0.6))), eo(seg(t, 0.1, 0.6)) * (1 - eo(seg(t, 4.2, 4.6))));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 4.78, 5.2))), eo(seg(t, 4.78, 5.2)) * (1 - eo(seg(t, P2 - 0.2, P2 + 0.3))));
    R.place(this.c, 360, lerp(302, 290, eo(seg(t, P3 + 2.16, P3 + 2.6))), eo(seg(t, P3 + 2.16, P3 + 2.6)));
  },
});
