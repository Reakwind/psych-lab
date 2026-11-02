const { seg, eo, eio, eob, lerp } = kit;
// part 6: the brain keeps learning all through life — Ruth smiles while the plant by the window grows new leaves
const Q = [[1.25, 1], [2.42, -1], [4.14, 1], [5.31, -1]];
kit.scene('w-grow', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.seated('w3', 80) +
      '<path class="w3-stem" pathLength="1" d="M134 640 C130 560 150 500 140 440" style="fill:none;stroke:var(--main);stroke-width:9;stroke-linecap:round;opacity:0"/>' +
      Q.map((q, k) => '<g class="w3-l' + k + '">' + R.leaf('w3-lf' + k, q[1]) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool w3-top">המוח ממשיך ללמוד ולהסתגל לאורך החיים</div><div class="tag w3-age">גם בגיל מבוגר</div><div class="tag tag-warm w3-pd">וגם כשחיים עם פרקינסון</div></div>'));
    Object.assign(this, R.refs(kit, 'w3', ['body', 'head', 'eyes', 'mouth', 'stem', 'top', 'age', 'pd', 'l0', 'l1', 'l2', 'l3']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.8);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4) + ')');
    this.head.setAttribute('transform', 'rotate(' + (-6 * eio(seg(t, 1.0, 1.8))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 1.4 ? R.mouthHappy : R.mouthNeutral);
    this.stem.style.strokeDasharray = eo(seg(t, 0.8, 5.8)) + ' 1'; this.stem.style.opacity = t > 0.8 ? 1 : 0;
    Q.forEach(([a, s], k) => this['l' + k].setAttribute('transform', 'translate(' + (136 + 4 * s) + ' ' + lerp(620, 450, k / 3) + ') scale(' + Math.max(0.001, eob(seg(t, a, a + 0.6), 1.6)) + ')'));
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
    R.place(this.age, 330, lerp(192, 180, eo(seg(t, 4.1, 4.5))), eo(seg(t, 4.1, 4.5)));
    R.place(this.pd, 330, lerp(262, 250, eo(seg(t, 5.3, 5.7))), eo(seg(t, 5.3, 5.7)));
  },
});
