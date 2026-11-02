const { seg, eo, eio, eob, lerp } = kit;
// adapting keeps her tied to what matters in each role, in a way that fits today. The put-away role leaves a quiet gap.
kit.scene('r-still', {
  init(kit) {
    const thr = R.RING.map(([x, y], k) => k === 4 ? '' : '<path class="rs-t' + k + '" style="fill:none;stroke:var(--accent);stroke-width:6;stroke-linecap:round" d="M' + x + ' ' + y + ' Q' + ((x + 540) / 2) + ' ' + ((y + 700) / 2 + 60) + ' 540 700"/>').join('');
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".55"/>' + thr +
      '<g transform="translate(540 1010)">' + R.ruth('rs', 'stand') + '</g>' +
      R.RING.map((p, k) => k === 4 ? '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="62" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:10 10;opacity:.35"/>' : '<g transform="translate(' + p[0] + ' ' + p[1] + ')">' + R.role('rs-b' + k, k) + '</g>').join('') + '</svg>' +
      '<div class="tag tag-warm rs-a">מחוברים למה שחשוב לנו</div><div class="tag tag-cool rs-b">מה שאפשרי עבורנו היום</div></div>'));
    Object.assign(this, R.refs(kit, 'rs', ['head', 'eyes', 'mouth', 'a', 'b']));
    this.t = R.RING.map((p, k) => kit.stage.querySelector('.rs-t' + k));
    this.disc = R.RING.map((p, k) => kit.stage.querySelector('.rs-b' + k + '-disc'));
    this.g = R.RING.map((p, k) => kit.stage.querySelector('.rs-b' + k + '-glow'));
  },
  render(t) {
    R.blink(this.eyes, t, 0.5);
    // the threads warm up again; some badges take a new, softer shape
    this.t.forEach((el, k) => { if (!el) return; el.style.strokeOpacity = 0.35 + 0.65 * eo(seg(t, 3.0 + k * 0.12, 3.8 + k * 0.12)); el.style.strokeDasharray = '14 10'; el.style.strokeDashoffset = (-t * 30).toFixed(1); });
    this.g.forEach((el, k) => { if (el) el.setAttribute('opacity', 0.4 * eo(seg(t, 3.2 + k * 0.1, 3.9 + k * 0.1))); });
    const sh = eio(seg(t, 0.8, 2.2));
    [1, 6].forEach((k) => { this.disc[k].setAttribute('transform', 'scale(' + (1 + 0.12 * sh) + ' ' + (1 - 0.1 * sh) + ')'); this.disc[k].style.strokeDasharray = sh > 0.5 ? '14 9' : 'none'; });
    R.place(this.a, 800, lerp(860, 848, eo(seg(t, 3.4, 3.9))), eo(seg(t, 3.4, 3.9)));
    R.place(this.b, 260, lerp(960, 948, eo(seg(t, 7.0, 7.5))), eo(seg(t, 7.0, 7.5)));
    this.mouth.setAttribute('d', t > 3.4 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
