const { seg, eo, eio, eob, lerp } = kit;
// parts 3–5 in one shot: the inner voice grades the practice, the card becomes a task, then it is put aside
const P4 = 14.25, P5 = 26.19;
const ROWS = [[5.0, 'הצלחתי להירגע?'], [7.3, 'עקבתי אחרי ההנחיות?'], [10.7, 'הייתי מרוכזת מספיק?']];
kit.scene('p-card', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.lying('pc') + '<g class="pc-ring">' + R.attn('pc') + '</g>' +
      '<g class="pc-zz"><path class="ink" style="stroke:#C0392B;stroke-width:7" d="M300 400 l14 -22 l14 22 l14 -22 l14 22 M300 704 l14 -22 l14 22 l14 -22 l14 22"/></g>' +
      '<g class="pc-vg"><g transform="scale(1.5)">' + R.voice('pc-v') + '</g></g></svg>' +
      R.rcard('pc-card', ROWS.map((r) => r[1]), 'עוד משימה') +
      '<div class="tag pc-grade">המוח אוהב לחלק ציונים</div><div class="tag tag-warm pc-stress">מתח ותסכול</div>' +
      '<div class="tag tag-cool pc-ease">גישה של אי מאמץ</div><div class="tag tag-warm pc-now">לתת מקום למה שקורה עכשיו</div></div>'));
    Object.assign(this, R.refs(kit, 'pc', ['eyes', 'mouth', 'armR', 'ring', 'zz', 'vg', 'grade', 'stress', 'ease', 'now']));
    this.card = kit.stage.querySelector('.pc-card'); this.stamp = kit.stage.querySelector('.pc-card-stamp');
    this.rows = [0, 1, 2].map((k) => kit.stage.querySelector('.pc-card-r' + k)); this.xs = [0, 1, 2].map((k) => kit.stage.querySelector('.pc-card-x' + k));
    this.vm = kit.stage.querySelector('.pc-v-mouth');
  },
  render(t) {
    // eyes closed, practising
    if (t > 0.6) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 1.0);
    // the grey inner voice pops up by her head and holds up a report card
    const leave = eio(seg(t, P5 + 0.5, P5 + 2.2));
    const v = eob(seg(t, 0.4, 1.0), 1.6);
    this.vg.setAttribute('transform', 'translate(' + lerp(190, -160, leave) + ' ' + (236 + Math.sin(t * 1.8) * 6) + ') scale(' + v + ')');
    const talking = (t > 4.8 && t < 13.4) || (t > P4 + 0.3 && t < P4 + 11);
    this.vm.setAttribute('d', talking && Math.floor(t * 6) % 2 ? 'M-2 2 Q10 16 22 2' : 'M-2 4 Q10 10 22 4');
    const c = eob(seg(t, 3.5, 4.1), 1.4);
    R.put(this.card, lerp(690, 1500, leave), 196 + (1 - c) * 40, 0.4 + 0.6 * c, -2 + 14 * leave, eo(seg(t, 3.5, 3.8)));
    ROWS.forEach(([a], k) => (this.rows[k].style.opacity = eo(seg(t, a, a + 0.4))));
    // trying to get it "right": crosses in every box, and it turns into one more task
    this.xs.forEach((x, k) => { const a = P4 + 5.6 + k * 0.35, p = eob(seg(t, a, a + 0.3), 2); x.style.opacity = t > a ? 1 : 0; x.style.transform = 'scale(' + p + ')'; });
    const st = eob(seg(t, P4 + 7.5, P4 + 7.9), 2);
    this.stamp.style.opacity = t > P4 + 7.5 ? 1 : 0; this.stamp.style.transform = 'rotate(-8deg) scale(' + lerp(1.8, 1, st) + ')';
    // tension: marks at her shoulders, her mouth tightens
    const z = eo(seg(t, P4 + 10.1, P4 + 10.5)) * (1 - eo(seg(t, P5 + 2.4, P5 + 3.2)));
    this.zz.style.opacity = z; this.zz.setAttribute('transform', 'translate(' + Math.sin(t * 30) * 2 * z + ' 0)');
    this.mouth.setAttribute('d', z > 0.3 ? 'M-10 30 Q2 24 14 30' : t > P5 + 3 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    R.place(this.grade, 540, lerp(940, 928, eo(seg(t, 0.5, 1.0))), eo(seg(t, 0.5, 1.0)) * (1 - eo(seg(t, P4 + 9.8, P4 + 10.1))));
    R.place(this.stress, 540, lerp(940, 928, eo(seg(t, P4 + 10.2, P4 + 10.7))), eo(seg(t, P4 + 10.2, P4 + 10.7)) * (1 - eo(seg(t, P5 + 0.4, P5 + 0.8))));
    // instead: no effort. The card goes, and the circle of attention opens around her
    const g = eio(seg(t, P5 + 2.6, P5 + 6.5));
    this.ring.setAttribute('transform', 'translate(500 540) scale(' + lerp(150, 470, g) + ')');
    this.ring.style.opacity = eo(seg(t, P5 + 2.4, P5 + 3.2));
    R.place(this.ease, 540, lerp(84, 70, eo(seg(t, P5 + 2.8, P5 + 3.3))), eo(seg(t, P5 + 2.8, P5 + 3.3)));
    R.place(this.now, 540, lerp(940, 928, eo(seg(t, P5 + 6.5, P5 + 7.0))), eo(seg(t, P5 + 6.5, P5 + 7.0)));
  },
});
