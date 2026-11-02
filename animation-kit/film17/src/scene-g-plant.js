const { seg, eo, eio, eob, lerp } = kit;
// you can't order a plant to grow, but you can water it: Ruth waters the plant by her window and it puts out a new leaf; the two calm tools from session 14 appear
kit.scene('g-plant', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false }) + '<g transform="translate(150 860)">' + R.growPlant('g3p') + '</g>' +
      '<g class="g3-rw"><g transform="scale(-1 1)">' + R.ruth('g3', 'water') + '</g></g><g class="g3-dw">' + R.drops('g3d') + '</g>' +
      '<g class="g3-mw" transform="translate(975 860)">' + R.meter('g3-mt') + '</g>' + R.cbadge('g3-c0', 'relax', 64) + R.cbadge('g3-c1', 'imagery', 64) + '</svg>' +
      '<div class="order g3-o">עכשיו תירדם.</div><div class="tag tag-red g3-p">אי אפשר לתת לגוף ולמוח פקודה להירגע</div><div class="tag tag-warm g3-a">אבל אפשר לעזור לו!</div><div class="tag tag-cool g3-b">הגוף יודע איך להירגע</div>' +
      '<div class="tag tag-warm g3-c">לתת לו את התנאים</div><div class="tag g3-d">הרפיה ודמיון מודרך</div><div class="tag tag-red g3-ml">מתח</div></div>'));
    Object.assign(this, R.refs(kit, 'g3', ['rw', 'dw', 'eyes', 'head', 'mouth', 'can', 'mt-fill', 'c0', 'c1', 'o', 'p', 'a', 'b', 'c', 'd', 'ml']));
    this.lv = kit.stage.querySelector('.g3p-lv'); this.nl = kit.stage.querySelector('.g3p-nl'); this.dr = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.g3d-d' + k));
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    // Ruth (facing left) tips her can over the plant; drops fall; the plant lifts and a new leaf unfurls
    this.rw.setAttribute('transform', 'translate(390 975)');
    const tip = eio(seg(t, 2.7, 3.4)) * (1 - eio(seg(t, 7.4, 8.0)));
    this.can.setAttribute('transform', 'rotate(' + (-28 * tip) + ' 140 -270)');
    this.dw.setAttribute('transform', 'translate(' + (390 - 236) + ' ' + (975 - 226) + ')');
    this.dr.forEach((d, k) => { const p = ((t * 1.3 + k * 0.25) % 1); d.setAttribute('transform', 'translate(' + (-6 * p) + ' ' + 120 * p + ')'); d.style.opacity = tip > 0.6 && t < 7.4 ? 1 - p * 0.6 : 0; });
    const grow = eio(seg(t, 5.0, 7.6));
    this.lv.setAttribute('transform', 'translate(0 -90) scale(' + lerp(0.82, 1.08, grow) + ') translate(0 90)');
    this.nl.setAttribute('transform', 'translate(6 -96) scale(' + Math.max(0.001, eob(seg(t, 6.0, 7.0), 1.4)) + ') translate(-6 96)');
    R.setMeter(this['mt-fill'], lerp(0.72, 0.5, eio(seg(t, 5.5, 8.0))));
    this.head.setAttribute('transform', 'rotate(' + (tip * 6) + ' 0 30)');
    this.mouth.setAttribute('d', t > 5.5 ? R.mouthHappy : R.mouthNeutral);
    // the two calm tools from session 14
    [this.c0, this.c1].forEach((c, k) => R.setG(c, [800, 620][k], 340 + Math.sin(t * 1.4 + k) * 5, 1.1 * eob(seg(t, 8.8 + k * 0.3, 9.3 + k * 0.3), 1.6), eo(seg(t, 8.8 + k * 0.3, 9.0 + k * 0.3))));
    R.put(this.o, 600, 420, 1, 2, 1 - eo(seg(t, 0.0, 0.5)));
    R.place(this.p, 540, 40, 1 - eo(seg(t, 0.0, 0.3)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.33, 0.7))), eo(seg(t, 0.33, 0.7)) * (1 - eo(seg(t, 2.3, 2.6))));
    R.place(this.b, 540, lerp(54, 40, eo(seg(t, 2.6, 3.0))), eo(seg(t, 2.6, 3.0)) * (1 - eo(seg(t, 8.4, 8.7))));
    R.place(this.c, 540, lerp(124, 112, eo(seg(t, 5.68, 6.0))), eo(seg(t, 5.68, 6.0)) * (1 - eo(seg(t, 8.4, 8.7))));
    R.place(this.d, 710, lerp(442, 430, eo(seg(t, 8.81, 9.2))), eo(seg(t, 8.81, 9.2)));
    R.place(this.ml, 975, 886, 1);
  },
});
