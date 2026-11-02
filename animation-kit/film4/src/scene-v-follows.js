const { seg, eo, eio, eob, lerp } = kit;
// the words it uses, on Ariel's words: interprets, reacts, remarks, hands out advice
const SAYS = [[2.4, 'מפרש'], [3.85, 'מגיב'], [4.9, 'מעיר הערות'], [6.55, 'מחלק עצות']];
kit.scene('v-follows', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.chair() +
      '<g class="vf-walker"><g class="vf-a">' + R.ruth('vf-a', 'stand') + '</g><g class="vf-b">' + R.ruth('vf-b', 'step') + '</g></g>' +
      '<g class="vf-vg">' + R.voice('vf-v') + '</g></svg>' + SAYS.map((s, k) => '<div class="tag vf-s' + k + '">' + s[1] + '</div>').join('') +
      '<div class="tag tag-cool vf-cap">מלווה אותנו כל היום</div></div>'));
    Object.assign(this, R.refs(kit, 'vf', ['walker', 'a', 'b', 'vg', 'cap', 's0', 's1', 's2', 's3']));
    this.ea = kit.stage.querySelector('.vf-a-eyes'); this.eb = kit.stage.querySelector('.vf-b-eyes'); this.ve = kit.stage.querySelector('.vf-v-eyes');
  },
  render(t) {
    R.blink(this.ea, t, 0.2); R.blink(this.eb, t, 0.2); R.blink(this.ve, t, 1.9);
    // Ruth goes about her day across the room; the voice floats along at her shoulder
    const go = eio(seg(t, 0.2, 8.0)), walking = t > 0.2 && t < 8.0;
    const x = lerp(820, 300, go), step = walking ? Math.floor(t * 2.2) % 2 : 0;
    this.a.style.opacity = step ? 0 : 1; this.b.style.opacity = step ? 1 : 0;
    this.walker.setAttribute('transform', 'translate(' + x + ' ' + (962 + (walking ? Math.abs(Math.sin(t * Math.PI * 2.2)) * -6 : 0)) + ')');
    const vx = x + 210 - 40 * Math.sin(t * 0.9), vy = 410 + Math.sin(t * 2.2) * 10;
    this.vg.setAttribute('transform', 'translate(' + vx + ' ' + vy + ') scale(.9)');
    // each remark pops out of the voice and drifts up
    [this.s0, this.s1, this.s2, this.s3].forEach((el, k) => {
      const a = SAYS[k][0], p = eob(seg(t, a, a + 0.4), 1.6), up = seg(t, a, a + 2.2);
      R.place(el, vx + 60 + (k % 2 ? 60 : -20), vy - 150 - up * 90, Math.min(eo(seg(t, a, a + 0.3)), 1 - eo(seg(t, a + 1.6, a + 2.2))));
      el.style.transform += ' scale(' + p + ')';
    });
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
  },
});
