const { seg, eo, eio, eob, lerp } = kit;
// on the day line: anxiety can rise as a pill wears off, in certain situations, or for no clear reason
const SP = [['כשההשפעה של התרופה מתחילה לרדת', 3.9, 790, 230], ['מצבי חיים מסוימים', 8.17, 560, 150], ['בלי סיבה ברורה', 11.55, 290, 230]];
kit.scene('x-pills', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.dayLine('x5', 760, [975, 760, 480]) +
      '<circle class="x5-dip" cx="790" cy="640" r="18" style="fill:#D96C6C;opacity:0"/><g class="x5-cal" transform="translate(560 690) scale(.7)">' + R.calendar('x5-cl') + '</g>' +
      '<g class="x5-q" transform="translate(290 690)"><circle r="40" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/><text y="16" text-anchor="middle" style="font:700 46px var(--sans);fill:var(--second)">?</text></g>' +
      SP.map((s, k) => '<g class="x5-m' + k + '"><g transform="scale(.48)">' + R.meter('x5-mt' + k) + '</g></g>').join('') + '</svg>' +
      SP.map((s, k) => '<div class="tag tag-warm x5-n' + k + '">' + s[0] + '</div>').join('') + '<div class="tag tag-cool x5-a">החרדה מתגברת</div></div>'));
    Object.assign(this, R.refs(kit, 'x5', ['curve', 'pill0', 'pill1', 'pill2', 'dip', 'cal', 'q', 'a']));
    this.m = SP.map((s, k) => kit.stage.querySelector('.x5-m' + k)); this.f = SP.map((s, k) => kit.stage.querySelector('.x5-mt' + k + '-fill')); this.n = SP.map((s, k) => kit.stage.querySelector('.x5-n' + k));
  },
  render(t) {
    this.curve.style.strokeDasharray = eio(seg(t, 0.2, 2.2)) + ' 1';
    [this.pill0, this.pill1, this.pill2].forEach((el, k) => el.setAttribute('transform', 'translate(' + [975, 760, 480][k] + ' 806) scale(' + Math.max(0.001, eob(seg(t, 0.4 + k * 0.25, 0.9 + k * 0.25), 2)) + ')'));
    this.dip.style.opacity = eo(seg(t, 3.6, 4.0)) * (0.7 + 0.3 * Math.sin(t * 5));
    const pop = (el, a, x, y) => { const p = eob(seg(t, a - 0.3, a + 0.2), 1.6); el.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + Math.max(0.001, p * (el === this.cal ? 0.7 : 1)) + ')'); el.style.opacity = eo(seg(t, a - 0.3, a - 0.1)); };
    pop(this.cal, 8.0, 560, 690); pop(this.q, 11.4, 290, 690);
    SP.forEach(([w, a, x, y], k) => {
      R.setG(this.m[k], x, 500, eob(seg(t, a - 0.3, a + 0.2), 1.4), eo(seg(t, a - 0.3, a - 0.1)));
      R.setMeter(this.f[k], 0.2 + 0.65 * eio(seg(t, a, a + 1.2)));
      R.place(this.n[k], k === 0 ? 720 : x, lerp(y + 12, y, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.5, 1.9))), eo(seg(t, 1.5, 1.9)));
  },
});
