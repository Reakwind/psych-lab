const { seg, eo, eio, eob, lerp } = kit;
const HEART = '<svg width="120" height="110" viewBox="-60 -56 120 110" aria-hidden="true"><path d="M-50 40 C-50 20 -30 14 -10 26 L10 38 L50 18 V48 H-50Z" style="fill:color-mix(in srgb, var(--accent) 38%, var(--ground));stroke:var(--second);stroke-width:5;stroke-linejoin:round"/>' +
  '<path d="M0 20 C-34 0 -24 -34 0 -16 C24 -34 34 0 0 20Z" style="fill:#D96C6C;stroke:var(--second);stroke-width:5;stroke-linejoin:round"/></svg>';
kit.scene('k-action', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) + R.sideTable('k14') + R.pileSvg('k14', 3) + R.seated('k14', 0) + R.deckSvg('k14') + R.sidesSvg('k14', false, false) + '</svg>' +
      R.qcard('k14-q', 'מי תמיד מצליח להצחיק אתכם?') + R.qcard('k14-ac', HEART + '<span>קלף פעולה</span>', 'act') + '<div class="tag tag-cool k14-a">פעולה קטנה ומיטיבה</div></div>'));
    Object.assign(this, R.refs(kit, 'k14', ['body', 'head', 'eyes', 'mouth', 'q', 'ac', 'pc2', 'a']));
    this.sd = R.sidesRefs(kit, 'k14');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 3.6) + ')');
    R.SIDES.forEach((p, k) => { const [x, y] = R.smallSide(k); R.setG(this.sd.w[k], x, y + Math.sin(t * 1.3 + k) * 3, 0.5); });
    // between the question cards comes a green action card: a small, kind thing to do
    if (t < 1.5) R.riseCard(this.q, seg(t, 0.2, 1.0), 760, 340, 1, 3); else R.toPile(this.q, seg(t, 1.5, 2.1), 760, 340, 3, 2, null);
    this.pc2.style.opacity = t > 2.0 ? 1 : 0;
    R.riseCard(this.ac, seg(t, 1.9, 2.8), 760, 350, 1.05, -2);
    const glow = 1 + 0.03 * Math.sin(t * 5) * eo(seg(t, 2.8, 3.2));
    if (t > 2.8) R.flipCard(this.ac, 760, 350, 1.05 * glow, -2, 1, 1);
    this.head.setAttribute('transform', 'rotate(' + lerp(0, 6, eio(seg(t, 2.0, 2.8))) + ' 0 30)');
    this.mouth.setAttribute('d', t > 3.0 ? R.mouthHappy : R.mouthNeutral);
    R.place(this.a, 540, lerp(972, 960, eo(seg(t, 5.09, 5.5))), eo(seg(t, 5.09, 5.5)));
  },
});
