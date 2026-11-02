const { seg, eo, eio, eob, lerp } = kit;
// the beam hops by itself: a thought, another thought, the clock, the window; then she notices and brings it gently back
const STOPS = [[440, 600, 150], [800, 230, 120], [940, 420, 110], [540, 250, 110], [185, 440, 140], [440, 640, 150]];
const AT = [[1.8, 2.4], [3.5, 4.0], [4.6, 5.1], [5.3, 5.8], [10.2, 12.2]];
kit.scene('m-wander', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false, clock: 'mw-cl' }) + R.seated('mw', -60) +
      '<g transform="translate(800 230) scale(1.6)">' + R.balloon('mw-b1') + '</g><g transform="translate(940 420) scale(1.3)">' + R.balloon('mw-b2') + '</g>' + R.beam('mwb') + '</svg>' +
      '<div class="tag mw-auto">ממחשבה למחשבה, מדבר לדבר</div><div class="tag tag-warm mw-where">שמים לב לאן הקשב נדד</div><div class="tag tag-cool mw-back">ומחזירים ברכות, לכאן ועכשיו</div></div>'));
    Object.assign(this, R.refs(kit, 'mw', ['body', 'head', 'eyes', 'mouth', 'auto', 'where', 'back']));
    this.b = R.beamRefs(kit, 'mwb');
  },
  render(t) {
    R.blink(this.eyes, t, 0.3);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    let [x, y, r] = STOPS[0];
    AT.forEach(([a, b], k) => { const p = eio(seg(t, a, b)); x = lerp(x, STOPS[k + 1][0], p); y = lerp(y, STOPS[k + 1][1], p); r = lerp(r, STOPS[k + 1][2], p); });
    R.setBeam(this.b, x, y, r, 1, 1);
    // her head follows where the attention went
    const look = t < 6.2 ? (x - 440) / 40 : lerp((185 - 440) / 40, 0, eio(seg(t, 10.2, 12.0)));
    this.head.setAttribute('transform', 'rotate(' + Math.max(-8, Math.min(8, look)) + ' 0 30)');
    R.place(this.auto, 540, lerp(84, 70, eo(seg(t, 2.0, 2.5))), eo(seg(t, 2.0, 2.5)) * (1 - eo(seg(t, 7.9, 8.3))));
    R.place(this.where, 540, lerp(84, 70, eo(seg(t, 8.3, 8.8))), eo(seg(t, 8.3, 8.8)) * (1 - eo(seg(t, 10.0, 10.3))));
    R.place(this.back, 540, lerp(84, 70, eo(seg(t, 10.3, 10.8))), eo(seg(t, 10.3, 10.8)));
    this.mouth.setAttribute('d', t > 12 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
