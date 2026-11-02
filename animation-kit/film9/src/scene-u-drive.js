const { seg, eo, eio, eob, lerp } = kit;
kit.scene('u-drive', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.cab('ud', { mirror: true }) + '</svg>' +
      '<div class="tag tag-cool ud-title">מפגש 9 · נהג האוטובוס</div><div class="tag ud-a">בכיסא הנהג, הידיים על ההגה</div><div class="tag tag-warm ud-b">יש כיוון שאליו רוצים לנסוע</div><div class="tag ud-c">אבל לא לבד</div></div>'));
    Object.assign(this, R.refs(kit, 'ud', ['view', 'route', 'center', 'h-glow', 'mir', 'mq0', 'mq1', 'mq2', 'hands', 'head', 'title', 'a', 'b', 'c']));
    this.m = [0, 1, 2].map((k) => R.voiceRefs(kit, 'ud-m' + k));
    R.mood(this.m[0], 0, true); R.mood(this.m[1], 1, false); R.mood(this.m[2], 0, false);
  },
  render(t) {
    // on the road toward the heart; hands come up onto the wheel; then faces in the mirror: not alone
    this.view.setAttribute('transform', 'translate(60 ' + (-111 + Math.sin(t * 5) * 2) + ') scale(.889)');
    this.center.style.strokeDashoffset = -t * 90;
    const h = eio(seg(t, 4.3, 5.2));
    this.hands.setAttribute('transform', 'translate(0 ' + lerp(320, 0, h) + ')');
    const r = eio(seg(t, 6.4, 8.4));
    this.route.style.strokeDasharray = r + ' 1'; this.route.style.opacity = r > 0 ? 0.85 : 0;
    this['h-glow'].setAttribute('r', 70 + 18 * Math.sin(t * 3) * eo(seg(t, 6.4, 7)));
    this.mir.style.opacity = eo(seg(t, 9.0, 9.4));
    [0, 1, 2].forEach((k) => { const p = eob(seg(t, 9.4 + k * 0.3, 9.8 + k * 0.3), 2); this['mq' + k].setAttribute('transform', 'translate(' + (834 + k * 54) + ' 150) scale(' + p + ') translate(' + -(834 + k * 54) + ' -150)'); });
    this.head.setAttribute('transform', 'translate(430 720) rotate(' + 6 * eio(seg(t, 9.2, 9.9)) + ') translate(-430 -720)');
    R.place(this.title, 540, lerp(124, 110, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)) * (1 - eo(seg(t, 3.2, 3.6))));
    R.place(this.a, 540, lerp(124, 110, eo(seg(t, 3.6, 4.0))), eo(seg(t, 3.6, 4.0)) * (1 - eo(seg(t, 8.8, 9.2))));
    R.place(this.b, 540, lerp(214, 200, eo(seg(t, 6.5, 6.9))), eo(seg(t, 6.5, 6.9)) * (1 - eo(seg(t, 8.8, 9.2))));
    R.place(this.c, 886, lerp(222, 210, eo(seg(t, 10.0, 10.4))), eo(seg(t, 10.0, 10.4)));
  },
});
