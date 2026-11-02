const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-flex', {
  init(kit) {
    let blocks = '';
    for (let k = 0; k < 7; k++) blocks += '<g class="ex-b' + k + '"><rect class="slate-dk" x="-90" y="-22" width="180" height="44" rx="10"/><rect class="slate" x="-84" y="-16" width="168" height="16" rx="6"/></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<g transform="translate(330 962)">' + R.armsFree(R.ruth('ex', 'stand'), 'ex') + '</g>' +
      '<g transform="translate(560 300) scale(.8)">' + R.battery('ex') + '</g>' + blocks + '</svg>' +
      '<div class="tag tag-cool ex-a">גם כשיש אנרגיה</div><div class="tag tag-warm ex-b">קשובים לעצמכם</div><div class="tag ex-c">לא להעמיס יותר מדי</div></div>'));
    Object.assign(this, R.refs(kit, 'ex', ['head', 'eyes', 'mouth', 'armR', 'fill', 'a', 'b', 'c']));
    this.bs = [0, 1, 2, 3, 4, 5, 6].map((k) => kit.stage.querySelector('.ex-b' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 1.0);
    R.setBattery(this.fill, 0.85 - 0.04 * seg(t, 3, 11));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 2.6, 3.1))), eo(seg(t, 2.6, 3.1)) * (1 - eo(seg(t, 8.0, 8.4))));
    // even with plenty of energy, the jobs can pile up; she stops and checks in with herself
    const stop = eio(seg(t, 8.3, 9.0)), shed = eio(seg(t, 11.2, 12.4));
    this.bs.forEach((el, k) => {
      const a = 3.2 + k * 0.7, p = eob(seg(t, a, a + 0.4), 1.4), held = k < 5 || t < a;
      const x = 820 + (k >= 4 ? shed * (k - 3) * 140 : 0), y = 836 - k * 48 - (1 - p) * 400 + (k >= 4 ? shed * 200 : 0);
      el.setAttribute('transform', 'translate(' + x + ' ' + y + ') rotate(' + ((k >= 4 ? shed * 20 : 0) + Math.sin(t * 6 + k) * (k > 3 ? 2 * (1 - stop) : 0)) + ')');
      el.style.opacity = (t < a ? 0 : 1) * (k >= 4 ? 1 - shed : 1);
    });
    this.armR.setAttribute('transform', 'rotate(' + (-80 * stop * (1 - eio(seg(t, 12.6, 13.2)))) + ' 52 -326)');
    this.head.setAttribute('transform', 'rotate(' + (-6 * stop) + ' 0 30)');
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 8.4, 8.9))), eo(seg(t, 8.4, 8.9)) * (1 - eo(seg(t, 11.0, 11.3))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 11.2, 11.7))), eo(seg(t, 11.2, 11.7)));
  },
});