const { seg, eo, eio, eob, lerp } = kit;
// look at the compass and choose which way to go; look at the options on the next screen and choose what fits you best today
const PT = [[0, -215, 0], [210, 0, 1], [-210, 0, 3], [0, 215, 4]];   // north: people, east: a hobby, west: taking part, south: the spark
const CY = [330, 520, 710];
kit.scene('y-choose', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('yc', -190) +
      '<g class="yc-cg"><g>' + R.compass('yc-c', 130) + '</g>' + PT.map((p, k) => '<g transform="translate(' + p[0] + ' ' + p[1] + ')">' + R.matter('yc-m' + k, p[2], 56) + '</g>').join('') + '</g>' +
      '<g class="yc-ph">' + R.bigPhone('yc') + '</g>' +
      CY.map((y, k) => '<g class="yc-o' + k + '"><rect x="-150" y="-70" width="300" height="140" rx="26" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/>' + R.matter('yc-om' + k, R.WANT[k], 50) + '</g>').join('') +
      '</svg><div class="tag tag-warm yc-a">להסתכל על המצפן, ולבחור לאיזה כיוון ללכת</div><div class="tag tag-warm yc-q">מה הכי מתאים לכם היום?</div></div>'));
    Object.assign(this, R.refs(kit, 'yc', ['body', 'head', 'eyes', 'mouth', 'cg', 'c-needle', 'c-glow', 'ph', 'a', 'q']));
    this.o = [0, 1, 2].map((k) => kit.stage.querySelector('.yc-o' + k));
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    R.blink(this.eyes, t, 0.6); this.mouth.setAttribute('d', R.BIG);
    // the compass, then it moves up out of the way as her phone rises
    const mv = eio(seg(t, 3.6, 4.6)), c = eob(seg(t, 0, 0.6), 1.3);
    this.cg.setAttribute('transform', 'translate(' + lerp(760, 250, mv) + ' ' + lerp(390, 190, mv) + ') scale(' + Math.max(0.001, c * lerp(1, 0.45, mv)) + ')');
    // the needle looks around each direction, then rests
    const dirs = [0, 90, -90, 180, 0], s = seg(t, 1.4, 3.4) * 4, i = Math.min(3, Math.floor(s)), f = eio(Math.min(1, (s - i) * 1.6));
    this['c-needle'].setAttribute('transform', 'rotate(' + (t < 1.4 ? 20 * Math.sin(t * 3) : lerp(dirs[i], dirs[i + 1], f)) + ')');
    this['c-glow'].setAttribute('opacity', 0.2 * eo(seg(t, 2.6, 3.2)));
    const up = eio(seg(t, 3.8, 4.8));
    this.ph.setAttribute('transform', 'translate(300 ' + lerp(1100, 60, up) + ') scale(.8)');
    this.o.forEach((el, k) => { const a = 4.7 + k * 0.4, p = eob(seg(t, a, a + 0.5), 1.6); el.setAttribute('transform', 'translate(732 ' + (CY[k] + (1 - eo(seg(t, a, a + 0.5))) * 30) + ') scale(' + Math.max(0.001, p) + ')'); el.style.opacity = eo(seg(t, a, a + 0.2)); });
    const lk = t < 3.6 ? 1 : 1 - 2 * up;
    this.head.setAttribute('transform', 'rotate(' + 7 * Math.max(-1, Math.min(1, lk)) + ' 0 30)'); R.look(this.eyes, t, 0.6, 4, -2);
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.13, 1.6))), eo(seg(t, 1.13, 1.6)) * (1 - eo(seg(t, 6.3, 6.6))));
    R.place(this.q, 540, lerp(84, 70, eo(seg(t, 6.65, 7.1))), eo(seg(t, 6.65, 7.1)));
  },
});
