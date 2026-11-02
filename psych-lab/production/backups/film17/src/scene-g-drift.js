const { seg, eo, eio, eob, lerp } = kit;
// attention wanders (a thought balloon on a string tugs her away, as in session 10); that's part of it; she comes back to her breath and Ariel's voice
kit.scene('g-drift', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('g16', -200, false) + '<circle class="g16-gl" cx="300" cy="620" r="240" style="fill:var(--main);opacity:0"/>' +
      '<g transform="translate(296 704) scale(1.1)">' + R.phone('g16ph', 0, 0, 'ariel') + '<g transform="translate(40 0)">' + R.sound('g16-sd') + '</g></g>' +
      '<path class="g16-str" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:10 10;opacity:.7"/><g class="g16-bw">' + R.balloon('g16-bl') + '</g></svg>' +
      '<div class="tag tag-cool g16-p">מקשיבים ונושמים, והמוח עושה את שלו</div><div class="tag g16-a">הקשב שלנו לא יישאר עם ההנחיה כל הזמן</div><div class="tag tag-warm g16-b">וזה ממש חלק מהתרגול</div>' +
      '<div class="tag tag-cool g16-c">אפשר לחזור לנשימה</div><div class="tag tag-warm g16-d">ולקול של ההנחיה</div></div>'));
    Object.assign(this, R.refs(kit, 'g16', ['body', 'eyes', 'head', 'mouth', 'tn', 'gl', 'sd', 'str', 'bw', 'p', 'a', 'b', 'c', 'd']));
  },
  render(t) {
    this.tn.style.opacity = 0;
    const away = eio(seg(t, 0.6, 3.4)), notice = eio(seg(t, 7.0, 7.8)), back = eio(seg(t, 8.6, 10.4));
    if (t < 0.6 || t > 10.6) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.6);
    // the balloon drifts off to the right, pulling her gaze; she notices; it lets go and drifts away as she returns
    const bx = lerp(420, 820, away) + 200 * back, by = lerp(430, 260, away) - 140 * back + Math.sin(t * 1.4) * 8;
    R.setG(this.bw, bx, by, 1.5, eo(seg(t, 0.5, 0.9)) * Math.pow(1 - back, 2));
    const hx = 320, hy = 440, mx = (hx + bx) / 2, my = Math.max(hy, by) + 50 * (1 - back);
    this.str.setAttribute('d', 'M' + hx + ' ' + hy + ' Q' + mx + ' ' + my + ' ' + bx + ' ' + (by + 30));
    this.str.style.opacity = 0.7 * eo(seg(t, 0.5, 0.9)) * (1 - eo(seg(t, 8.6, 9.2)));
    this.head.setAttribute('transform', 'rotate(' + (-14 * away * (1 - back) + 4 * back) + ' 0 30)');
    this.mouth.setAttribute('d', notice > 0.5 && back < 0.5 ? R.mouthO : R.mouthHappy);
    const br = (1 - Math.cos(2 * Math.PI * Math.max(0, t - 10.5) / 4.2)) / 2;
    this.gl.style.opacity = 0.14 * eo(seg(t, 10.5, 11.0)) * (0.6 + 0.4 * br);
    this.body.setAttribute('transform', 'scale(1 ' + (1 + 0.03 * br) + ')');
    this.sd.style.opacity = t > 11.1 ? 0.4 + 0.6 * Math.abs(Math.sin(t * 5)) : 0.3 * (1 - away);
    R.place(this.p, 540, 40, 1 - eo(seg(t, 0.0, 0.3)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.4, 0.8))), eo(seg(t, 0.4, 0.8)) * (1 - eo(seg(t, 9.6, 9.9))));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 4.96, 5.3))), eo(seg(t, 4.96, 5.3)) * (1 - eo(seg(t, 9.6, 9.9))));
    R.place(this.c, 540, lerp(54, 40, eo(seg(t, 10.0, 10.4))), eo(seg(t, 10.0, 10.4)));
    R.place(this.d, 540, lerp(124, 112, eo(seg(t, 11.18, 11.5))), eo(seg(t, 11.18, 11.5)));
  },
});
