const { seg, eo, eio, eob, lerp } = kit;
const P = [['a', 'חבר', 4.29, 770], ['b', 'בן משפחה', 4.93, 540], ['g', 'כל אדם אחר', 6.3, 310]];
kit.scene('j-think', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('j12', 0) +
      '<g class="j12-cl"><g transform="translate(540 236) scale(.74) translate(-540 -280)">' + R.cloud('j12-cloud') + '</g></g>' +
      [0, 1, 2].map((k) => '<circle class="j12-pf' + k + '" r="' + (22 - k * 6) + '" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:rgba(0,0,0,.12);stroke-width:4"/>').join('') +
      '<circle class="j12-gl" cx="770" cy="196" r="96" style="fill:var(--accent);opacity:0"/>' + P.map((p, k) => R.bust('j12-b' + k, p[0])).join('') + '</svg>' +
      P.map((p, k) => '<div class="tag j12-n' + k + '">' + p[1] + '</div>').join('') + '<div class="tag tag-cool j12-a">תחשבו עכשיו על אדם אחד כזה</div><div class="tag tag-warm j12-c">שמרגישים איתו בנוח וסומכים עליו</div></div>'));
    Object.assign(this, R.refs(kit, 'j12', ['body', 'head', 'eyes', 'mouth', 'cl', 'gl', 'a', 'c']));
    this.b = P.map((p, k) => kit.stage.querySelector('.j12-b' + k)); this.n = P.map((p, k) => kit.stage.querySelector('.j12-n' + k));
    this.pf = [0, 1, 2].map((k) => kit.stage.querySelector('.j12-pf' + k));
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4.0) + ')');
    // Ruth closes her eyes and thinks of one person: a friend, family, anyone she trusts; in the pause, one of them warms
    const shut = t > 1.0;
    this.eyes.setAttribute('transform', shut ? 'translate(0 -2) scale(1 .15)' : '');
    [[480, 452], [452, 428], [430, 404]].forEach(([x, y], k) => { this.pf[k].setAttribute('cx', x); this.pf[k].setAttribute('cy', y); this.pf[k].style.opacity = eo(seg(t, 1.2 + k * 0.15, 1.4 + k * 0.15)); });
    const c = eob(seg(t, 1.6, 2.3), 1.3);
    this.cl.setAttribute('transform', 'translate(540 236) scale(' + Math.max(0.001, c) + ') translate(-540 -236)'); this.cl.style.opacity = eo(seg(t, 1.6, 1.8));
    const pick = eio(seg(t, 9.6, 11.0));
    P.forEach(([look, w, a, x], k) => {
      R.setG(this.b[k], x, 236 + Math.sin(t * 1.3 + k) * 4, 0.78 * eob(seg(t, a - 0.3, a + 0.3), 1.5) * (k === 0 ? 1 + 0.12 * pick : 1), (t > a - 0.3 ? 1 : 0) * (k === 0 ? 1 : 1 - 0.6 * pick));
      R.place(this.n[k], x, lerp(312, 300, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (k === 0 ? 1 : 1 - 0.6 * pick));
    });
    this.gl.style.opacity = 0.3 * pick;
    this.head.setAttribute('transform', 'rotate(' + Math.sin(t * 0.5) * 3 + ' 0 30)');
    this.mouth.setAttribute('d', pick > 0.5 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.a, 540, lerp(972, 960, eo(seg(t, 0.32, 0.7))), eo(seg(t, 0.32, 0.7)) * (1 - eo(seg(t, 7.7, 8.0))));
    R.place(this.c, 540, lerp(972, 960, eo(seg(t, 8.06, 8.4))), eo(seg(t, 8.06, 8.4)));
  },
});
