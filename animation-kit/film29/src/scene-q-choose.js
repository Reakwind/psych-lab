const { seg, eo, eio, eob, lerp } = kit;
// part 4: on its own the beam hops from thought to thought and thing to thing; then Ruth chooses where it goes
const STOPS = [[462, 718, 110], [800, 230, 120], [940, 430, 110], [540, 250, 100], [185, 440, 130], [800, 230, 120], [440, 640, 160]];
const AT = [[5.0, 5.6], [6.3, 6.8], [8.1, 8.6], [9.2, 9.7], [9.9, 10.4], [10.8, 12.2]];
kit.scene('q-choose', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false, clock: 'q2-cl' }) + R.seated('q2', -60) +
      '<g transform="translate(800 230) scale(1.6)">' + R.balloon('q2-b1') + '</g><g transform="translate(940 430) scale(1.3)">' + R.balloon('q2-b2') + '</g>' + R.beam('q2b') + '</svg>' +
      '<div class="tag tag-cool q2-next">וזה חלק גדול מהתרגולים הבאים</div><div class="tag q2-auto">ממחשבה למחשבה, מדבר לדבר</div><div class="tag tag-warm q2-pick">אנחנו נבחר לאן להפנות אותה</div></div>'));
    Object.assign(this, R.refs(kit, 'q2', ['body', 'head', 'eyes', 'mouth', 'next', 'auto', 'pick']));
    this.b = R.beamRefs(kit, 'q2b');
  },
  render(t) {
    R.blink(this.eyes, t, 0.3);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    let [x, y, r] = STOPS[0];
    AT.forEach(([a, b], k) => { const p = eio(seg(t, a, b)); x = lerp(x, STOPS[k + 1][0], p); y = lerp(y, STOPS[k + 1][1], p); r = lerp(r, STOPS[k + 1][2], p); });
    // while it wanders by itself the beam jitters and its rim spins; once she chooses, it holds still
    const wander = eo(seg(t, 4.8, 5.2)) * (1 - eo(seg(t, 10.8, 12.2)));
    x += wander * 10 * Math.sin(t * 5.3); y += wander * 8 * Math.cos(t * 4.1);
    R.setBeam(this.b, x, y, r, 1, 1, -t * 0.08 * wander);
    // her head follows where the attention goes, then settles
    const look = Math.max(-8, Math.min(8, (x - 440) / 40));
    this.head.setAttribute('transform', 'rotate(' + lerp(look, 0, eio(seg(t, 10.8, 11.8))) + ' 0 30) translate(0 ' + (-6 * eio(seg(t, 10.6, 11.2))) + ')');
    R.place(this.next, 540, lerp(84, 70, eo(seg(t, 0.5, 1.0))), eo(seg(t, 0.5, 1.0)) * (1 - eo(seg(t, 4.6, 5.0))));
    R.place(this.auto, 540, lerp(84, 70, eo(seg(t, 7.9, 8.4))), eo(seg(t, 7.9, 8.4)) * (1 - eo(seg(t, 10.4, 10.7))));
    R.place(this.pick, 540, lerp(84, 70, eo(seg(t, 10.8, 11.3))), eo(seg(t, 10.8, 11.3)));
    this.mouth.setAttribute('d', t > 11.6 ? R.mouthHappy : R.mouthNeutral);
  },
});
