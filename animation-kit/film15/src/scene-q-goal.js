const { seg, eo, eio, eob, lerp } = kit;
// the point: a few moments for the breath, listening to the body, a rhythm that feels good. The soft square breathes slowly beside Ruth.
kit.scene('q-goal', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('qg', -230, false) +
      '<circle class="qg-gl" cx="270" cy="620" r="250" style="fill:var(--accent);opacity:0"/>' + R.box('qgb') + R.cbadge('qg-pz', 'pause', 64) + '</svg>' +
      '<div class="tag tag-cool qg-p">ותמיד אפשר לעצור את התרגול</div><div class="tag qg-a">להקדיש כמה רגעים לנשימה</div><div class="tag tag-cool qg-b">להקשיב לגוף</div>' +
      '<div class="tag tag-warm qg-c">ולמצוא מקצב וזרם נשימה שנעים לכם</div><div class="tag tag-warm qg-d">בואו ננשום</div></div>'));
    Object.assign(this, R.refs(kit, 'qg', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'gl', 'pz', 'p', 'a', 'b', 'c', 'd']));
    this.x = R.boxRefs(kit, 'qgb');
  },
  render(t) {
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    if (t > 8.3) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.4);
    const back = eio(seg(t, 0.2, 1.2)), br = (1 - Math.cos(2 * Math.PI * t / 5.0)) / 2;
    R.setG(this.pz, 730, 450, 1.7 * (1 - back), 1 - back);
    const s = 300 + 20 * br;
    R.setBox(this.x, { w: s, h: s + 20, soft: 1, rad: 120, dot: 1 + t / 2.6, ticks: 0, lit: 0, ring: 0.35 + 0.5 * br, alpha: back });
    this.gl.style.opacity = 0.16 * eo(seg(t, 3.2, 4.2)) * (0.7 + 0.3 * br);
    this.body.setAttribute('transform', 'scale(1 ' + (1 + 0.03 * br) + ')');
    this.head.setAttribute('transform', 'rotate(' + (3 + 3 * br) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.p, 540, 40, 1 - eo(seg(t, 0.0, 0.3)));
    const out = 1 - eo(seg(t, 7.4, 7.8));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.4, 0.8))), eo(seg(t, 0.4, 0.8)) * out);
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 3.24, 3.6))), eo(seg(t, 3.24, 3.6)) * out);
    R.place(this.c, 540, lerp(196, 184, eo(seg(t, 4.72, 5.1))), eo(seg(t, 4.72, 5.1)) * out);
    R.place(this.d, 540, lerp(54, 40, eo(seg(t, 7.82, 8.2))), eo(seg(t, 7.82, 8.2)));
  },
});
