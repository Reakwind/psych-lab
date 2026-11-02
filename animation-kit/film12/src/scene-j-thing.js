const { seg, eo, eio, eob, lerp } = kit;
kit.scene('j-thing', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('j13', 0) +
      '<g transform="translate(540 236) scale(.74) translate(-540 -280)">' + R.cloud('j13-cloud') + '</g>' +
      [[480, 452, 22], [452, 428, 16], [430, 404, 10]].map(([x, y, r]) => '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:rgba(0,0,0,.12);stroke-width:4"/>').join('') +
      '<circle class="j13-gl" cx="540" cy="236" r="96" style="fill:var(--accent);opacity:0"/>' + ['a', 'b', 'g'].map((l, k) => R.bust('j13-b' + k, l)).join('') + '<g class="j13-nt"><g transform="scale(2)">' + R.note('j13-note') + '</g></g></svg>' +
      '<div class="tag j13-n0">חבר</div><div class="tag tag-warm j13-c">שמרגישים איתו בנוח וסומכים עליו</div><div class="tag tag-warm j13-a">או משהו אחד שהייתם רוצים לחלוק</div></div>'));
    Object.assign(this, R.refs(kit, 'j13', ['body', 'head', 'eyes', 'mouth', 'gl', 'nt', 'n0', 'a', 'c']));
    this.b = [0, 1, 2].map((k) => kit.stage.querySelector('.j13-b' + k));
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4.0) + ')');
    // the people step back; one thing she'd like to share glows in the middle of the thought
    this.eyes.setAttribute('transform', t < 4.6 ? 'translate(0 -2) scale(1 .15)' : '');
    const off = eio(seg(t, 0.2, 0.9));
    [[770, 1.12, 1], [540, 0.78, 0.4], [310, 0.78, 0.4]].forEach(([x, s, o], k) => R.setG(this.b[k], lerp(x, k === 0 ? 830 : x, off), 236, s * (1 - off * (k ? 1 : 0.35)), o * (1 - off * (k ? 1 : 0.2))));
    R.place(this.n0, lerp(770, 830, off), 300, 1 - eo(seg(t, 0.2, 0.6)));
    R.setG(this.nt, 540, 236 + Math.sin(t * 1.4) * 5, eob(seg(t, 0.7, 1.3), 1.6), eo(seg(t, 0.7, 0.9)));
    this.gl.style.opacity = 0.3 * eo(seg(t, 0.9, 1.6)) * (0.85 + 0.15 * Math.sin(t * 3));
    this.head.setAttribute('transform', 'rotate(' + Math.sin(t * 0.5) * 3 + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.c, 540, 960, 1 - eo(seg(t, 0.1, 0.4)));
    R.place(this.a, 540, lerp(972, 960, eo(seg(t, 0.54, 0.9))), eo(seg(t, 0.54, 0.9)));
  },
});
