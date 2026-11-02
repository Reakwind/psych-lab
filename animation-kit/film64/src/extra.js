// Session 64 additions: the loud thought card (its "!!!" can be circled and faded), a talk bubble, the reed bending, and the four-way badge row.
Object.assign(R, {
  LOUD: 'הכול אצלי כישלון',
  // the loud thought as an HTML card: id-c is the card, id-bang its exclamation marks
  loud(id, extra) {
    return '<div class="thought sm heavy ' + id + '-c' + (extra ? ' ' + extra : '') + '">' + R.LOUD + '<span class="bang ' + id + '-bang">!!!</span></div>';
  },
  // the card calms as h goes 0 → 1: heavy grey to plain, the exclamation marks fade
  calm(card, bang, h) {
    card.classList.toggle('heavy', h < 0.5);
    card.style.background = 'color-mix(in srgb, var(--second) ' + Math.round(52 - 42 * h) + '%, var(--ground))';
    card.style.color = h < 0.5 ? 'var(--ground)' : 'var(--second)';
    bang.style.opacity = 1 - h;
    bang.style.marginInlineStart = (-28 * h) + 'px';
  },
  // eyes that look aside (dx, dy) and still blink
  look(eyes, t, off, dx, dy) { const p = ((t + (off || 0)) % 4.1); eyes.setAttribute('transform', 'translate(' + (dx || 0) + ' ' + (dy || 0) + ')' + (p > 3.95 ? ' translate(0 -2) scale(1 .15)' : '')); },
  // a speech bubble with three dots (id-dots)
  talk(id) {
    return '<g class="' + id + '"><path class="shade" transform="translate(4 6)" d="M-70 -40 H70 Q90 -40 90 -20 V20 Q90 40 70 40 H-10 L-30 66 L-30 40 H-70 Q-90 40 -90 20 V-20 Q-90 -40 -70 -40Z"/>' +
      '<path d="M-70 -40 H70 Q90 -40 90 -20 V20 Q90 40 70 40 H-10 L-30 66 L-30 40 H-70 Q-90 40 -90 20 V-20 Q-90 -40 -70 -40Z" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/>' +
      '<g class="' + id + '-dots"><circle class="metal" cx="-30" cy="0" r="9"/><circle class="metal" cx="0" cy="0" r="9"/><circle class="metal" cx="30" cy="0" r="9"/></g></g>';
  },
  // the reed badge (session 7) drawn so it can bend: id-stem, and id-tip (the leaf at its tip)
  reedB(id) {
    return '<g class="' + id + '"><circle class="shade" cy="7" r="56"/><circle r="56" style="fill:color-mix(in srgb, var(--accent) 22%, var(--ground));stroke:var(--second);stroke-width:5"/>' +
      '<path class="' + id + '-stem" style="fill:none;stroke:var(--main);stroke-width:8;stroke-linecap:round" d="M0 40 C0 10 6 -16 20 -36"/><path class="leaf" d="M4 0 C-14 -6 -22 4 -18 12 C-8 12 0 6 4 0Z"/>' +
      '<g class="' + id + '-tip"><path class="leaf" d="M20 -36 C34 -40 40 -30 36 -22 C28 -22 22 -28 20 -36Z"/></g></g>';
  },
  // bend the reed by b (-1..1): the stem curves and the tip leaf follows
  bend(stem, leaf, b) {
    const tx = 20 + 26 * b, ty = -36 + 6 * Math.abs(b);
    stem.setAttribute('d', 'M0 40 C0 10 ' + (6 + 14 * b) + ' -16 ' + tx + ' ' + ty);
    if (leaf) leaf.setAttribute('transform', 'translate(' + (tx - 20) + ' ' + (ty + 36) + ')');
  },
  // the four ways, in Nira's order: thoughts, the moment, a kinder voice, someone to talk to (tool badges 0, 2, 3, 4)
  WAYS: [[870, 0], [650, 2], [430, 3], [210, 4]],
});
