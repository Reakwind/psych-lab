const { seg, eo, eio, eob, lerp } = kit;
// ten blocks: earlier days lie further to the right (morning side); the last little heart sits three days back
kit.scene('m-when', {
  init(kit) {
    const M = R.M58;
    let s = '';
    for (let j = -4; j < 6; j++) s += '<g transform="translate(' + (946 - j * 142) + ' 0)">' + R.task('mn-b' + (j + 4)) + '</g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('mn', 230) +
      '<rect width="1080" height="1080" style="fill:var(--ground)" opacity=".28"/>' +
      '<g class="mn-strip">' + s + '<g transform="translate(' + (946 + 3 * 142) + ' -82)">' + R.heart('mn-h', 1.1) + '</g><circle class="mn-ring" cx="' + (946 + 3 * 142) + '" cy="0" r="92" style="fill:none;stroke:var(--accent);stroke-width:8" opacity="0"/></g>' +
      '<g transform="translate(330 640)">' + R.matter('mn-m', 0, 84) + '</g></svg>' +
      '<div class="q mn-q">מתי לאחרונה הצלחתי לתת לו מקום?</div></div>'));
    Object.assign(this, R.refs(kit, 'mn', ['head', 'eyes', 'mouth', 'body', 'strip', 'ring', 'q']));
  },
  render(t) {
    const M = R.M58;
    R.blink(this.eyes, t, 1.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    const q = seg(t, 0.1, 0.7);
    R.put(this.q, 540, 120 + (1 - eo(q)) * 30, eob(q, 1.4), 0, eo(seg(t, 0.1, 0.4)));
    // back through the past days until the last time it had room
    const back = eio(seg(t, 0.8, 2.8));
    this.strip.setAttribute('transform', 'translate(' + (-426 * back) + ' ' + (M.SY + 110) + ')');
    this.ring.setAttribute('opacity', eo(seg(t, 2.9, 3.4)) * (0.7 + 0.3 * Math.sin(t * 3)));
    this.head.setAttribute('transform', 'rotate(' + (-4 - 4 * back) + ' 0 30)');
    this.mouth.setAttribute('d', t > 3.0 ? 'M-12 24 Q2 34 16 24' : 'M-10 26 Q2 32 14 26');
  },
});
