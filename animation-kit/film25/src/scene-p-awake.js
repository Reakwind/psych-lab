const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 540, 250], AT = [2.9, 4.4, 5.3];
kit.scene('p-awake', {
  init(kit) {
    const art = [
      '<clipPath id="pw2-cl"><rect x="-140" y="-160" width="280" height="320" rx="24"/></clipPath><g clip-path="url(#pw2-cl)"><g transform="scale(.6) translate(-520 -690)">' + R.chair() + '<g transform="translate(500 742)">' + R.ruth('pw2', 'sit') + '</g></g></g>',
      '<g transform="scale(.8)">' + R.hourglass('pw2-h') + '</g>',
      '<rect class="metal" x="-110" y="-3" width="220" height="6" rx="3"/><circle class="amber" cx="110" cy="0" r="20"/><path class="slate" d="M-112 -20 a20 20 0 1 0 0 40 a26 26 0 0 1 0 -40Z"/>' +
        '<path class="ink" style="stroke-width:5;stroke-dasharray:10 10" d="M-20 -100 V-6"/><g transform="translate(-20 -100)">' + R.tool('pw2-t', 1, 34) + '</g>'];
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + X.map((x, k) => '<g class="pw2-c' + k + '">' + R.frame('pw2-f' + k, 280, 320) + art[k] + '</g>').join('') + '</svg>' +
      '<div class="tag tag-cool pw2-top">אם חשוב לכם להישאר ערים</div><div class="tag pw2-t0">תנוחה אחרת</div><div class="tag pw2-t1">תרגול קצר יותר</div><div class="tag pw2-t2">שעה אחרת ביום</div></div>'));
    Object.assign(this, R.refs(kit, 'pw2', ['c0', 'c1', 'c2', 'top', 't0', 't1', 't2', 'eyes']));
  },
  render(t) {
    R.blink(this.eyes, t, 0.3);
    R.place(this.top, 540, lerp(84, 70, eo(seg(t, 0.5, 1.0))), eo(seg(t, 0.5, 1.0)));
    AT.forEach((a, k) => {
      // all three are there from the start, each comes forward on its words
      const p = eob(seg(t, 0.1 + k * 0.2, 0.6 + k * 0.2), 1.5), on = eio(seg(t, a, a + 0.5));
      this['c' + k].setAttribute('transform', 'translate(' + X[k] + ' 450) scale(' + p * (0.92 + 0.12 * on) + ')');
      this['c' + k].style.opacity = 0.45 + 0.55 * on;
      R.place(this['t' + k], X[k], lerp(672, 660, eo(seg(t, a + 0.1, a + 0.6))), eo(seg(t, a + 0.1, a + 0.6)));
    });
  },
});
