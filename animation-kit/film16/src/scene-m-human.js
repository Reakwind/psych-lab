const { seg, eo, eio, eob, lerp } = kit;
// there's no off: the switch snaps back on, twice. It happens to all of us, again and again: four people, four little lights.
const FIG = [[200, 'ruth'], [420, 'a'], [640, 'b'], [870, 'ariel']];
const BLINK = [[9.6, 11.8], [10.1, 12.2], [10.5, 11.95], [10.9, 12.4]];
kit.scene('m-human', {
  init(kit) {
    const fig = (id, k) => k === 'ruth' ? R.ruth(id, 'stand') : k === 'ariel' ? R.ariel(id, 'stand') : R.friend(id, k);
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ plant: false, shoes: false }) + '<rect width="1080" height="1080" style="fill:var(--ground);opacity:.35"/>' +
      '<g class="m15-big">' + R.switchSvg('m15-sw') + '</g>' +
      FIG.map(([x, k], j) => '<g class="m15-f' + j + '">' + fig('m15p' + j, k) + '<g transform="translate(0 -560) scale(.42)">' + R.switchSvg('m15-s' + j) + '</g></g>').join('') + '</svg>' +
      '<div class="tag m15-a">אני לא יודע איך פשוט מכבים את המתג הזה</div><div class="tag tag-warm m15-b">אין פעולה אחת שאפשר לעשות ומיד להפסיק להיאבק</div>' +
      '<div class="tag tag-cool m15-c">מנגנון אנושי וטבעי</div><div class="tag tag-warm m15-d">שקורה לכולנו, שוב ושוב</div></div>'));
    Object.assign(this, R.refs(kit, 'm15', ['big', 'a', 'b', 'c', 'd']));
    this.sw = R.swRefs(kit, 'm15-sw'); this.s = FIG.map((f, j) => R.swRefs(kit, 'm15-s' + j)); this.f = FIG.map((f, j) => kit.stage.querySelector('.m15-f' + j));
    this.e = FIG.map((f, j) => R.refs(kit, 'm15p' + j, ['eyes', 'mouth']));
  },
  render(t) {
    // the big switch: flicked off, it springs straight back on, twice
    const off = (t > 2.62 && t < 3.15) || (t > 5.44 && t < 5.95);
    R.setSwitch(this.sw, off ? 0 : 1);
    const sh = Math.max(Math.exp(-(t - 3.15) * 9) * (t > 3.15 ? 1 : 0), Math.exp(-(t - 5.95) * 9) * (t > 5.95 ? 1 : 0));
    const mv = eio(seg(t, 7.9, 8.9));
    this.big.setAttribute('transform', 'translate(' + (540 + 10 * Math.sin(t * 60) * sh) + ' ' + lerp(540, 300, mv) + ') scale(' + lerp(2.3, 0.85, mv) + ')');
    // the people: rise into view, each with a small switch that clicks on at its own moment
    this.f.forEach((g, j) => {
      const up = eo(seg(t, 8.3 + j * 0.15, 8.9 + j * 0.15)), [x] = FIG[j];
      g.setAttribute('transform', 'translate(' + x + ' ' + lerp(1500, 1050, up) + ') scale(.62)'); g.style.opacity = up > 0.001 ? 1 : 0;
      const [a, b] = BLINK[j], on = (t > a && t < b - 0.5) || t > b ? 1 : 0;
      R.setSwitch(this.s[j], on);
      R.blink(this.e[j].eyes, t, j * 0.9);
      this.e[j].mouth.setAttribute('d', on ? R.mouthFlat : R.mouthNeutral);
    });
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.4, 0.8))), eo(seg(t, 0.4, 0.8)) * (1 - eo(seg(t, 7.6, 7.9))));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 4.08, 4.4))), eo(seg(t, 4.08, 4.4)) * (1 - eo(seg(t, 7.6, 7.9))));
    R.place(this.c, 540, lerp(54, 40, eo(seg(t, 9.48, 9.8))), eo(seg(t, 9.48, 9.8)));
    R.place(this.d, 540, lerp(124, 112, eo(seg(t, 10.82, 11.1))), eo(seg(t, 10.82, 11.1)));
  },
});
