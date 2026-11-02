const { seg, eo, eio, eob, lerp } = kit;
// threads from each role to Ruth: how she sees herself, her ties, what she gives
kit.scene('r-threads', {
  init(kit) {
    const thr = R.RING.map(([x, y], k) => '<path class="rt-t' + k + '" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:5;stroke-linecap:round;stroke-dasharray:0 1" d="M' + x + ' ' + y + ' Q' + ((x + 540) / 2) + ' ' + ((y + 700) / 2 + 60) + ' 540 700"/>').join('');
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".55"/>' + thr +
      '<g transform="translate(540 1010)">' + R.ruth('rt', 'stand') + '</g><circle class="rt-core amber" cx="540" cy="700" r="16" opacity="0"/>' +
      R.RING.map((p, k) => '<g transform="translate(' + p[0] + ' ' + p[1] + ')">' + R.role('rt-b' + k, k) + '</g>').join('') +
      R.RING.map((p, k) => '<g class="rt-h' + k + '"><path class="amber-dk" d="M0 14 C-22 0 -14 -20 0 -10 C14 -20 22 0 0 14Z"/></g>').join('') + '</svg>' +
      '<div class="tag tag-cool rt-a">איך אנחנו רואים את עצמנו</div><div class="tag rt-b">הקשרים שלנו</div><div class="tag tag-warm rt-c">תורמים לאחרים</div></div>'));
    Object.assign(this, R.refs(kit, 'rt', ['head', 'eyes', 'mouth', 'core', 'a', 'b', 'c']));
    this.t = R.RING.map((p, k) => kit.stage.querySelector('.rt-t' + k));
    this.h = R.RING.map((p, k) => kit.stage.querySelector('.rt-h' + k));
    this.g = R.RING.map((p, k) => kit.stage.querySelector('.rt-b' + k + '-glow'));
  },
  render(t) {
    R.blink(this.eyes, t, 1.5);
    this.t.forEach((el, k) => { const p = eio(seg(t, 0.4 + k * 0.18, 1.6 + k * 0.18)); el.style.strokeDasharray = p + ' 1'; el.style.opacity = p > 0 ? 1 : 0; });
    // part of who she is: the threads glow into her
    this.core.setAttribute('opacity', eo(seg(t, 3.5, 4.0)) * (0.7 + 0.3 * Math.sin(t * 3)));
    // her ties: the badges glow
    this.g.forEach((el, k) => el.setAttribute('opacity', 0.45 * eo(seg(t, 5.0 + k * 0.1, 5.6 + k * 0.1))));
    // what she gives: little hearts travel out along the threads
    this.h.forEach((el, k) => {
      const p = seg(t, 7.2 + k * 0.12, 8.6 + k * 0.12), [x, y] = R.RING[k], mx = (x + 540) / 2, my = (y + 700) / 2 + 60;
      const u = 1 - p, px = u * u * 540 + 2 * u * p * mx + p * p * x, py = u * u * 700 + 2 * u * p * my + p * p * y;
      el.setAttribute('transform', 'translate(' + px + ' ' + py + ') scale(1.4)'); el.style.opacity = p > 0 && p < 1 ? 1 : 0;
    });
    R.place(this.a, 826, lerp(860, 848, eo(seg(t, 3.6, 4.1))), eo(seg(t, 3.6, 4.1)));
    R.place(this.b, 250, lerp(860, 848, eo(seg(t, 5.1, 5.6))), eo(seg(t, 5.1, 5.6)));
    R.place(this.c, 250, lerp(960, 948, eo(seg(t, 7.2, 7.7))), eo(seg(t, 7.2, 7.7)));
    this.mouth.setAttribute('d', 'M-12 24 Q2 34 16 24');
  },
});
