const { seg, eo, eio, eob, lerp } = kit;
// even that small move frees a little room: the pile settles back to what it was, and she breathes
kit.scene('m-breathe', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSw('m22', -200) + '<g class="m22-bw">' + R.battery('m22-b') + '</g>' +
      '<circle class="m22-gl" cx="300" cy="640" r="230" style="fill:var(--accent);opacity:.2"/><g class="m22-hw" transform="translate(300 640) scale(.42)">' + R.heart('m22-h') + '</g></svg>' + R.pileHtml('m22') +
      '<div class="tag tag-cool m22-p">לכיוון של תמיכה בעצמנו</div><div class="tag tag-warm m22-pc">5%</div><div class="tag m22-a">התנועה הקטנה הזאת</div><div class="tag tag-cool m22-b">יכולה לפנות לנו מעט מרחב</div><div class="tag tag-warm m22-c">ולתת לנו רגע לנשום</div></div>'));
    Object.assign(this, R.refs(kit, 'm22', ['body', 'eyes', 'head', 'mouth', 'tn', 'bw', 'b-fill', 'gl', 'p', 'pc', 'a', 'b', 'c']));
    this.sw = R.swRefs(kit, 'm22-sw'); this.pl = R.pileRefs(kit, 'm22');
  },
  render(t) {
    this.tn.style.opacity = 0;
    if (t > 5.8) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.6);
    R.setSwitch(this.sw, 1, 1, 0.9);
    this.bw.setAttribute('transform', 'translate(' + R.BAT[0] + ' ' + R.BAT[1] + ') scale(.8)'); R.setBattery(this['b-fill'], lerp(0.12, 0.3, eio(seg(t, 4.0, 6.0))));
    // the extra slabs slide away; the pile shrinks to the first difficulty and the anxiety
    const go = eio(seg(t, 3.9, 5.2)), sc = lerp(1.16, 1.0, go);
    this.pl.forEach((el, k) => {
      const [x, y] = R.slabAt(k, sc);
      const leave = k < 2 ? 0 : eio(seg(t, 3.9 + (7 - k) * 0.08, 4.8 + (7 - k) * 0.08));
      R.put(el, x + 260 * leave, y, sc, 8 * leave, k === 7 ? 0 : 1 - leave);
    });
    const br = (1 - Math.cos(2 * Math.PI * Math.max(0, t - 5.4) / 4.0)) / 2;
    this.gl.setAttribute('r', 230 + 30 * br);
    this.body.setAttribute('transform', 'scale(1 ' + (1 + 0.035 * br) + ')');
    this.head.setAttribute('transform', 'rotate(' + (4 + 3 * br) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.p, 540, 112, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.pc, R.SW[0], 650, 1 - eo(seg(t, 0.4, 0.9)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.5, 0.9))), eo(seg(t, 0.5, 0.9)) * (1 - eo(seg(t, 3.8, 4.1))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 4.15, 4.5))), eo(seg(t, 4.15, 4.5)));
    R.place(this.c, 540, lerp(124, 112, eo(seg(t, 5.58, 5.9))), eo(seg(t, 5.58, 5.9)));
  },
});
