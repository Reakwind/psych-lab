const { seg, eo, eio, eob, lerp } = kit;
// part 5: two practices; the breath card opens into the cutaway of her chest (3b): air in and out, the belly, the chest
const CX = 760, CY = 500;
kit.scene('q-breath', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      '<g class="q3-c0">' + R.frame('q3-f0', 300, 360) + '<g transform="translate(0 -30) scale(2.4)">' + R.tool('q3-tl', 1, 56).replace(/<circle class="shade"[^>]*\/>/, '') + '</g></g>' +
      '<g class="q3-c1">' + R.frame('q3-f1', 300, 360) + '<g transform="translate(0 30) scale(.95)">' + R.bodyIcon('q3-bi') + '</g></g>' +
      '<g class="q3-in">' + R.torso('q3') + '</g></svg>' +
      '<div class="tag tag-cool q3-two">יש לנו כאן שני תרגילים</div><div class="tag tag-warm q3-l0">תשומת לב לנשימה</div><div class="tag q3-l1">סריקת גוף</div>' +
      '<div class="tag tag-cool q3-sens">נשים לב לתחושות שמלוות את הנשימה</div><div class="tag tag-warm q3-air">האוויר נכנס ויוצא</div><div class="tag q3-bel">הבטן</div><div class="tag q3-che">בית החזה</div></div>'));
    Object.assign(this, R.refs(kit, 'q3', ['c0', 'c1', 'in', 'lung', 'belly', 'air', 'two', 'l0', 'l1', 'sens', 'bel', 'che']));
    this.airTag = kit.stage.querySelector('div.q3-air');
    this.dia = kit.stage.querySelector('g.q3-dia');
  },
  render(t) {
    // the two cards deal in, the breath card first (on the right)
    const d0 = eob(seg(t, 0.4, 1.0), 1.3), d1 = eob(seg(t, 0.8, 1.4), 1.3), pick = eio(seg(t, 3.2, 3.8));
    const grow = eio(seg(t, 4.8, 6.0)), gone = eo(seg(t, 5.4, 6.0));
    R.setG(this.c0, lerp(CX, 540, grow), lerp(CY, 540, grow) - 16 * Math.sin(Math.PI * pick), lerp(0.9, 3.2, grow) * d0 * (1 + 0.06 * pick), 1 - gone);
    R.setG(this.c1, 320, CY + 40 * (1 - d1), 0.9 * d1, (1 - 0.6 * pick) * (1 - gone));
    R.place(this.two, 540, lerp(84, 70, eo(seg(t, 0.9, 1.4))), eo(seg(t, 0.9, 1.4)) * (1 - eo(seg(t, 3.6, 4.0))));
    R.place(this.l0, CX, 742, eo(seg(t, 1.0, 1.5)) * (1 - eo(seg(t, 5.0, 5.4))));
    R.place(this.l1, 320, 742, eo(seg(t, 1.4, 1.9)) * (1 - 0.6 * pick) * (1 - eo(seg(t, 5.0, 5.4))));
    // the cutaway grows out of the card
    const s = lerp(0.28, 1, grow);
    this.in.setAttribute('transform', 'translate(' + lerp(CX, 540, grow) + ' ' + lerp(CY, 540, grow) + ') scale(' + s + ') translate(-540 -540)');
    this.in.style.opacity = eo(seg(t, 4.8, 5.6));
    // a calm breath cycle: the air flows in and out, the chest and the belly rise and fall
    const ph = 2 * Math.PI * Math.max(0, t - 5.2) / 4.6, b = (1 - Math.cos(ph)) / 2, inhaling = Math.sin(ph) > 0;
    this.lung.setAttribute('transform', 'translate(540 560) scale(' + (1 + 0.05 * b) + ' ' + (1 + 0.07 * b) + ') translate(-540 -560)');
    this.dia.setAttribute('transform', 'translate(0 ' + (36 * b) + ')');
    this.belly.setAttribute('transform', 'translate(640 0) scale(' + (1 + 0.18 * b) + ' 1) translate(-640 0)');
    this.air.style.strokeDashoffset = (inhaling ? 1 : -1) * t * 0.25; this.air.style.opacity = 0.9 * eo(seg(t, 5.8, 6.3));
    R.place(this.sens, 540, lerp(1002, 990, eo(seg(t, 6.0, 6.5))), eo(seg(t, 6.0, 6.5)));
    R.place(this.airTag, 860, lerp(162, 150, eo(seg(t, 8.3, 8.8))), eo(seg(t, 8.3, 8.8)));
    R.place(this.bel, 880, lerp(812, 800, eo(seg(t, 10.8, 11.3))), eo(seg(t, 10.8, 11.3)));
    R.place(this.che, 230, lerp(522, 510, eo(seg(t, 11.7, 12.2))), eo(seg(t, 11.7, 12.2)));
  },
});
