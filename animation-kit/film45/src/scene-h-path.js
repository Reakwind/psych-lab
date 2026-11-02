const { seg, eo, eio, eob, lerp } = kit;
// Ruth's path (session 1): coping and readjusting; it is hard enough; then the critic drops one more weight on her pack
const CAM = (c) => 'translate(540 1020) scale(1.6) translate(-540 -1020)';
kit.scene('h-path', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g transform="' + CAM() + '">' + R.land('hp') +
      '<g class="hp-walker"><g class="hp-a">' + R.ruthBack('hp-a', false) + '</g><g class="hp-b">' + R.ruthBack('hp-b', true) + '</g><g class="hp-wt" transform="translate(30 -262) scale(1.05)">' + R.weight() + '</g></g>' +
      '<g class="hp-vg">' + R.voice('hp-v') + '</g></g></svg>' +
      '<div class="tag tag-cool hp-a">התמודדות והסתגלות מחדש</div><div class="tag hp-b">וזה מספיק קשה בפני עצמו</div></div>'));
    Object.assign(this, R.refs(kit, 'hp', ['walker', 'a', 'b', 'wt', 'vg', 'a', 'b']));
    this.ta = kit.stage.querySelector('.tag.hp-a'); this.tb = kit.stage.querySelector('.tag.hp-b');
    this.ga = kit.stage.querySelector('g.hp-a'); this.gb = kit.stage.querySelector('g.hp-b');
    this.st = kit.stage.querySelector('.hp-st2'); this.v = R.refs(kit, 'hp-v', ['eyes', 'mouth']);
    this.v.mouth.setAttribute('d', 'M-2 10 Q10 2 22 10');
  },
  render(t) {
    R.blink(this.v.eyes, t, 1.1);
    // she climbs; one stone ahead shifts, and she pauses and adjusts her step
    const shift = eio(seg(t, 3.3, 4.0));
    this.st.setAttribute('transform', 'translate(' + (-40 * shift + Math.sin(Math.PI * 6 * seg(t, 3.3, 4.0)) * 6) + ' 0)');
    const k = lerp(0.15, 0.85, eio(seg(t, 0.2, 3.3))) + lerp(0, 0.45, eio(seg(t, 4.4, 8.6)));
    const [x, y, r] = R.onPath(k), s = 0.66 * r / 130;
    const walking = (t > 0.2 && t < 3.3) || (t > 4.4 && t < 8.6), step = walking ? Math.floor(t * 1.8) % 2 : 0;
    this.ga.style.opacity = step ? 0 : 1; this.gb.style.opacity = step ? 1 : 0;
    const lean = 3 + 5 * eio(seg(t, 6.2, 7.2)) + 3 * eio(seg(t, 8.0, 8.6));
    this.walker.setAttribute('transform', 'translate(' + (x - 12 * Math.sin(Math.PI * seg(t, 3.5, 4.4))) + ' ' + (y + (walking ? Math.abs(Math.sin(t * Math.PI * 1.8)) * -5 : 0)) + ') scale(' + s + ') rotate(' + lean + ')');
    // the critic turns up and drops one more weight on top
    R.xf(this.vg, x + 190 * s, y - 520 * s + Math.sin(t * 2.2) * 6, 1.1 * s * eob(seg(t, 7.0, 7.5), 1.5), eo(seg(t, 7.0, 7.2)));
    const drop = eio(seg(t, 7.6, 8.2));
    this.wt.setAttribute('transform', 'translate(30 ' + lerp(-820, -262, drop) + ') scale(1.05)');
    this.wt.style.opacity = eo(seg(t, 7.5, 7.7));
    R.place(this.ta, 540, lerp(84, 70, eo(seg(t, 3.6, 4.1))), eo(seg(t, 3.6, 4.1)));
    R.place(this.tb, 540, lerp(176, 164, eo(seg(t, 6.2, 6.7))), eo(seg(t, 6.2, 6.7)));
  },
});
