const { seg, eo, eio, eob, lerp } = kit;
// each tool works a little differently, the idea is the same; and the program will try them all: they settle on the stones of Ruth's path
const X = [840, 640, 440, 240];
kit.scene('x-path', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="x12-pth">' + R.land('x12p', { sun: true }) + '<g class="x12-rw" transform="translate(320 1050) scale(.72)">' + R.ruthBack('x12r', false) + '</g></g>' +
      '<g class="x12-rm">' + R.roomSeat('x12', 0) + '<circle class="x12-gl" cx="500" cy="600" r="250" style="fill:var(--accent);opacity:0"/></g>' + R.CALM.map((c, k) => R.cbadge('x12-c' + k, c, 64)).join('') + '</svg>' +
      '<div class="tag tag-warm x12-a">כל אחד מהם עובד קצת אחרת</div><div class="tag x12-b">לעזור לגוף ולתודעה להתמודד קצת יותר טוב</div><div class="tag tag-cool x12-c">וזה מה שנעשה במהלך התכנית</div><div class="tag tag-red x12-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'x12', ['pth', 'rm', 'gl', 'body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'mt-fill', 'a', 'b', 'c', 'ml']));
    this.cb = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.x12-c' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.02, 4.6) + ')');
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    R.setMeter(this['mt-fill'], 0.5 - 0.05 * eio(seg(t, 4.3, 6.0)));
    const sw = eio(seg(t, 7.5, 8.4)), fly = eio(seg(t, 7.9, 9.4));
    this.rm.style.opacity = 1 - sw; this.pth.style.opacity = sw;
    this.gl.style.opacity = 0.2 * eo(seg(t, 4.3, 5.0)) * (0.8 + 0.2 * Math.sin(t * 2.5));
    const w = seg(t, 1.8, 4.2), on = w > 0 && w < 1 ? 1 : 0;
    this.cb.forEach((c, k) => {
      const [sx, sy, ss] = R.onStone(k);
      const own = [`scale(${1 + 0.15 * Math.sin(t * 6) * on} ${1 - 0.1 * Math.sin(t * 6) * on})`, `translate(0 ${-14 * Math.abs(Math.sin(t * 4)) * on})`, `rotate(${40 * Math.sin(t * 3) * on})`, `translate(${12 * Math.sin(t * 2.5) * on} ${-10 * Math.sin(t * 2.5) * on})`][k];
      c.setAttribute('transform', 'translate(' + lerp(X[k], sx, fly) + ' ' + (lerp(230, sy, fly) - Math.sin(Math.PI * fly) * 80 + Math.sin(t * 1.4 + k) * 4) + ') scale(' + lerp(1.14, ss, fly) + ') ' + own);
    });
    this.head.setAttribute('transform', 'rotate(' + 4 * Math.sin(t * 0.7) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthHappy);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.9, 2.3))), eo(seg(t, 1.9, 2.3)) * (1 - eo(seg(t, 4.0, 4.3))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 4.25, 4.6))), eo(seg(t, 4.25, 4.6)) * (1 - eo(seg(t, 7.6, 7.9))));
    R.place(this.c, 540, lerp(54, 40, eo(seg(t, 8.14, 8.5))), eo(seg(t, 8.14, 8.5)));
    R.place(this.ml, 920, 886, 1 - sw);
  },
});
