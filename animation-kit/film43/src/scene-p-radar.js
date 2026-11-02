const { seg, eo, eio, eob, lerp } = kit;
const X = [830, 670, 510, 350, 190], WARM = [1, 3];
kit.scene('p-radar', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      '<rect class="floor" x="0" y="860" width="1080" height="220"/><rect class="floor-dk" x="0" y="860" width="1080" height="10"/>' +
      '<g transform="translate(540 860)">' + R.radar('pr-r', 380) + '</g>' + R.dayBar('pr', 300) +
      X.map((x, k) => '<g class="pr-s' + k + '">' + (WARM.includes(k) ? R.warm('pr-w' + k, 'heart') : R.grey('pr-g' + k, 150)) + '</g>').join('') + '</svg>' +
      '<div class="tag pr-a">נשים לב יותר לרגעים לא נעימים</div><div class="tag tag-cool pr-b">הרגעים הנעימים נדחקים הצידה</div><div class="tag tag-warm pr-c">הם קרו</div><div class="tag pr-d">חומקים מתחת לרדאר</div></div>'));
    Object.assign(this, R.refs(kit, 'pr', ['a', 'b', 'c', 'd']));
    this.beam = kit.stage.querySelector('.pr-r-beam');
    this.s = X.map((_, k) => kit.stage.querySelector('.pr-s' + k)); this.gl = WARM.map((k) => kit.stage.querySelector('.pr-w' + k + '-glow'));
  },
  render(t) {
    // the radar sweeps back and forth; grey moments loom larger and get picked up
    const ang = -90 + 80 * Math.sin(t * 1.1);
    this.beam.setAttribute('transform', 'rotate(' + (ang - 14) + ')');
    const big = eio(seg(t, 1.6, 2.6)), push = eio(seg(t, 6.6, 8.0));
    X.forEach((x, k) => {
      if (WARM.includes(k)) {
        const tx = lerp(x, k === 1 ? 760 : 320, push), ty = lerp(300, 950, push) - Math.sin(Math.PI * push) * 60;
        this.s[k].setAttribute('transform', 'translate(' + tx + ' ' + ty + ') scale(' + (1 - 0.3 * eio(seg(t, 3.8, 4.8))) + ')');
      } else {
        const dir = Math.atan2(300 - 860, x - 540) * 180 / Math.PI, ping = Math.max(0, 1 - Math.abs(((ang - dir + 540) % 360) - 180) / 12);
        this.s[k].setAttribute('transform', 'translate(' + x + ' 300) scale(' + (1 + 0.25 * big + 0.08 * ping) + ')');
      }
    });
    // they did happen: a glow below the horizon, out of the beam's reach
    this.gl.forEach((g) => (g.style.opacity = 0.45 * eio(seg(t, 9.6, 10.4)) * (0.8 + 0.2 * Math.sin(t * 3))));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.4, 1.9))), eo(seg(t, 1.4, 1.9)) * (1 - eo(seg(t, 6.4, 6.7))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 6.7, 7.2))), eo(seg(t, 6.7, 7.2)) * (1 - eo(seg(t, 9.4, 9.7))));
    R.place(this.c, 540, lerp(84, 70, eo(seg(t, 9.7, 10.2))), eo(seg(t, 9.7, 10.2)));
    R.place(this.d, 540, lerp(1002, 990, eo(seg(t, 11.8, 12.3))), eo(seg(t, 11.8, 12.3)));
  },
});
