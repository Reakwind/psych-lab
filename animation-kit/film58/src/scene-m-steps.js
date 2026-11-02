const { seg, eo, eio, eob, lerp } = kit;
// three small steps, right to left: a phone call, a few minutes of movement, a kind word
const ST = [[830, 3.0, 'שיחת טלפון'], [540, 6.4, 'כמה דקות של תנועה'], [250, 10.4, 'מילה טובה']];
kit.scene('m-steps', {
  init(kit) {
    let mover = R.armsFree(R.ruth('ms-r', 'stand'), 'ms-r');
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + '<g transform="translate(540 1080) scale(1.4) translate(-540 -1080)">' + R.land('ms') + '</g>' +
      ST.map((s, k) => R.stone('ms-s' + k, s[0], 940, 136)).join('') +
      '<g class="ms-i0"><g transform="scale(1.25)">' + R.phoneCall('ms-ph') + '</g></g>' +
      '<g class="ms-i1"><g transform="scale(.66)">' + mover + '</g></g>' +
      '<g class="ms-i2"><g transform="scale(1.3)">' + R.kindWord('ms-kw') + '</g></g></svg>' +
      ST.map((s, k) => '<div class="tag ms-t' + k + '">' + s[2] + '</div>').join('') + '</div>'));
    kit.css('.ms-st0,.ms-st1,.ms-st2,.ms-st3,.ms-st4{display:none}');
    this.i = [0, 1, 2].map((k) => kit.stage.querySelector('.ms-i' + k));
    this.top = [0, 1, 2].map((k) => kit.stage.querySelector('.ms-s' + k + '-top'));
    this.tg = [0, 1, 2].map((k) => kit.stage.querySelector('.ms-t' + k));
    Object.assign(this, R.refs(kit, 'ms-r', ['armL', 'armR', 'eyes']));
  },
  render(t) {
    ST.forEach(([x, a], k) => {
      const p = seg(t, a, a + 0.6), lit = eo(seg(t, a, a + 0.4));
      this.top[k].style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(22 + 78 * lit) + '%, var(--ground))';
      const bob = Math.sin(t * 1.6 + k) * 6;
      const y = k === 1 ? 940 : 720;
      this.i[k].setAttribute('transform', 'translate(' + x + ' ' + (y + (1 - eo(p)) * 40 + (k === 1 ? 0 : bob)) + ') scale(' + eob(p, 1.6) + ')');
      this.i[k].style.opacity = eo(seg(t, a, a + 0.25));
      R.place(this.tg[k], x, lerp(452, 440, eo(seg(t, a + 0.2, a + 0.7))), eo(seg(t, a + 0.2, a + 0.7)));
    });
    // the small Ruth stretches: arms up and down a few times
    R.blink(this.eyes, t, 0.4);
    R.raise(this, t > 6.6 ? 0.45 + 0.4 * Math.sin((t - 6.6) * 2.4) : 0);
  },
});
