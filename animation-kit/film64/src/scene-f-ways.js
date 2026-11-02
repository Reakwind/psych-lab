const { seg, eo, eio, eob, lerp } = kit;
// several ways to practise: look at the thoughts, reconnect with the moment, answer yourself more kindly
const IN = [5.5, 9.2, 13.1];
const TG = ['להסתכל על המחשבות', 'להתחבר מחדש לרגע', 'יותר הבנה, פחות ביקורת'];
kit.scene('f-ways', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('fw', 0) +
      '<g class="fw-ring">' + R.attn('fw') + '</g><g class="fw-mug" transform="translate(690 650) scale(.8)">' + R.mug('fw-m') + '</g>' +
      '<g class="fw-vg"><g class="fw-vs">' + R.voice('fw-v') + '</g></g>' +
      R.WAYS.map(([x], k) => '<circle class="fw-slot' + k + '" cx="' + x + '" cy="150" r="56" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:10 10;opacity:0"/>').join('') +
      R.WAYS.slice(0, 3).map(([x, k], i) => '<g class="fw-w' + i + '">' + R.tool('fw-t' + i, k, 56) + '</g>').join('') + '</svg>' +
      R.loud('fw') + TG.map((s, k) => '<div class="tag fw-l' + k + '">' + s + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'fw', ['body', 'head', 'eyes', 'mouth', 'ring', 'mug', 'vg', 'vs', 'c', 'bang']));
    this.slot = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.fw-slot' + k));
    this.w = [0, 1, 2].map((k) => kit.stage.querySelector('.fw-w' + k));
    this.l = [0, 1, 2].map((k) => kit.stage.querySelector('.fw-l' + k));
    this.v = R.refs(kit, 'fw-v', ['eyes', 'mouth', 'grey', 'warm']);
    this.steam = kit.stage.querySelector('.fw-m-steam');
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    // empty places for the ways, then a badge drops into each on its words
    this.slot.forEach((el, k) => { el.style.opacity = 0.5 * eo(seg(t, 0.8 + k * 0.15, 1.3 + k * 0.15)); });
    this.w.forEach((el, k) => { el.setAttribute('transform', 'translate(' + R.WAYS[k][0] + ' 150) scale(' + eob(seg(t, IN[k], IN[k] + 0.5), 1.8) + ')'); });
    this.l.forEach((el, k) => { const a = IN[k] + 0.2, b = IN[k + 1] ? IN[k + 1] - 0.3 : 99; R.place(el, Math.max(200, Math.min(880, R.WAYS[k][0])), lerp(238, 226, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)) * (1 - eo(seg(t, b, b + 0.4)))); });
    // 1 · looking at the thought from a little way off
    const c1 = eo(seg(t, 5.7, 6.3)) * (1 - eo(seg(t, 9.0, 9.6)));
    R.put(this.c, 800, 440 + Math.sin(t * 1.6) * 6, 0.85, 0, c1); R.calm(this.c, this.bang, 1);
    // 2 · back to the moment: the circle of attention opens around her and her tea
    const r2 = eio(seg(t, 9.4, 10.8)), o2 = eo(seg(t, 9.4, 10.0)) * (1 - 0.6 * eo(seg(t, 13.0, 13.8)));
    this.ring.setAttribute('transform', 'translate(560 650) scale(' + lerp(120, 320, r2) + ')'); this.ring.style.opacity = o2;
    this.mug.style.opacity = eo(seg(t, 9.6, 10.2)); this.steam.setAttribute('transform', 'translate(0 ' + (-4 * Math.sin(t * 2)) + ')');
    // 3 · a kinder inner voice: grey turns warm
    const v = eob(seg(t, 13.2, 13.8), 1.8), warm = eio(seg(t, 14.6, 15.6));
    this.vg.setAttribute('transform', 'translate(800 ' + (420 + Math.sin(t * 2.2) * 8) + ')'); this.vs.setAttribute('transform', 'scale(' + 1.25 * v + ')');
    this.v.warm.setAttribute('opacity', warm); this.v.grey.setAttribute('opacity', 1 - warm);
    this.v.mouth.setAttribute('d', warm > 0.5 ? 'M-4 2 Q10 16 24 2' : 'M-2 6 Q10 0 22 6'); R.blink(this.v.eyes, t, 2.4);
    const look = t < 9.4 ? eio(seg(t, 5.8, 6.6)) : t > 13.3 ? eio(seg(t, 13.6, 14.3)) : 0;
    this.head.setAttribute('transform', 'rotate(' + 7 * look + ' 0 30)');
    R.look(this.eyes, t, 0.9, 3 * look, 0);
    this.mouth.setAttribute('d', t > 15.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
