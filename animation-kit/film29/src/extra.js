// Session 29 additions. The beam of attention, the hand close-up, the magnifier and the practice cards are copied from session 28 (film28/src/extra.js)
// so the two films look the same; the beam's veil is lighter here (0.28 at most, per the review). New: a dinner plate for the drifting balloon,
// a sandglass, a row of "return" dots, a natural breath trace, and a few small helpers.
Object.assign(R, {
  beam(id) {
    return '<defs><radialGradient id="' + id + '-g"><stop offset=".62" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>' +
      '<mask id="' + id + '-m" maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1080"><rect width="1080" height="1080" fill="#fff"/><circle class="' + id + '-hole" r="1" fill="url(#' + id + '-g)"/></mask></defs>' +
      '<rect class="' + id + '-dim" width="1080" height="1080" mask="url(#' + id + '-m)" style="fill:#1A2340;opacity:0"/>' +
      '<g class="' + id + '-rim"><circle r="1" style="fill:#FFE6A8;opacity:.22"/><circle class="' + id + '-dash" r="1" style="fill:none;stroke:var(--accent);stroke-width:.022;stroke-dasharray:.06 .05;opacity:.95"/></g>';
  },
  beamRefs(kit, id) { const q = (c) => kit.stage.querySelector('.' + id + c); return { hole: q('-hole'), dim: q('-dim'), rim: q('-rim'), dash: q('-dash') }; },
  // centre x, y, radius r; dim 0..1 darkens the rest (0.28 at most); rim 0..1 shows the dashed edge; spin turns the dashes (a wandering beam)
  setBeam(b, x, y, r, dim, rim, spin) {
    b.hole.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + r * 1.25 + ')');
    b.dim.style.opacity = 0.28 * dim;
    b.rim.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + r + ')'); b.rim.style.opacity = rim == null ? dim : rim;
    b.dash.style.strokeDashoffset = spin || 0;
  },
  handClose(id) {
    return '<rect width="1080" height="1080" style="fill:color-mix(in srgb, var(--accent) 14%, var(--ground))"/>' +
      '<rect class="shade" x="-40" y="700" width="1180" height="260" rx="120"/><rect class="chair" x="-40" y="660" width="1180" height="280" rx="130"/><rect class="chair-dk" opacity=".35" x="-40" y="860" width="1180" height="80" rx="40"/>' +
      '<g class="' + id + '-hand"><path class="knit" d="M-40 560 C120 540 260 548 360 570 L380 700 C260 712 120 716 -40 716Z"/><path class="knit-dk" opacity=".5" d="M-40 690 C120 690 260 690 380 684 L380 700 C260 712 120 716 -40 716Z"/>' +
      '<rect class="knit-lt" x="340" y="562" width="44" height="142" rx="18"/>' +
      '<path class="skin" d="M380 590 C440 560 560 556 640 580 L860 596 C890 600 892 632 862 636 L700 640 L880 650 C910 654 910 688 880 690 L700 690 L860 704 C888 708 886 738 858 738 L640 728 C560 740 450 730 380 700Z"/>' +
      '<path class="skin" d="M520 590 C560 520 620 500 690 506 C720 510 716 540 690 544 C640 550 610 570 600 596Z"/>' +
      '<path class="skin-dk" opacity=".5" d="M380 700 C450 730 560 740 640 728 L858 738 C870 738 878 732 882 724 L640 714 C560 724 460 714 380 690Z"/>' +
      '<path class="ink" style="stroke-width:4;opacity:.35" d="M700 640 L860 640 M700 690 L860 690"/></g>';
  },
  magnifier(id) {
    return '<g class="' + id + '"><circle r="96" style="fill:color-mix(in srgb, var(--ground) 30%, white);opacity:.35"/><circle r="96" style="fill:none;stroke:var(--second);stroke-width:14"/><path class="ink" style="stroke-width:26" d="M70 70 L170 170"/><path class="light" opacity=".7" d="M-60 -30 a66 66 0 0 1 40 -40" style="fill:none;stroke:white;stroke-width:10;stroke-linecap:round"/></g>';
  },
  frame(id, w, h) {
    return '<g class="' + id + '"><rect class="shade" x="' + (-w / 2 + 8) + '" y="' + (-h / 2 + 10) + '" width="' + w + '" height="' + h + '" rx="28"/><rect x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '" rx="28" style="fill:color-mix(in srgb, var(--ground) 45%, white);stroke:var(--second);stroke-width:6"/></g>';
  },
  bodyIcon(id) {
    return '<g class="' + id + '"><circle cx="0" cy="-110" r="34" class="skin"/><path class="knit" d="M-50 -66 Q0 -84 50 -66 L60 30 H-60Z"/><path class="skirt" d="M-56 30 H56 L50 130 H10 L0 60 L-10 130 H-50Z"/>' +
      '<rect class="' + id + '-line" x="-90" y="-4" width="180" height="8" rx="4" style="fill:var(--accent)"/></g>';
  },
  // dinner: a plate with food, a fork and a knife (centre 0,0)
  plate(id) {
    return '<g class="' + id + '"><ellipse class="shade" cx="4" cy="10" rx="62" ry="40"/><ellipse rx="62" ry="40" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/>' +
      '<ellipse rx="40" ry="24" style="fill:none;stroke:color-mix(in srgb, var(--second) 30%, var(--ground));stroke-width:3"/><ellipse cx="-8" cy="-2" rx="22" ry="12" class="amber"/><ellipse cx="14" cy="4" rx="14" ry="9" class="leaf-lt"/>' +
      '<path class="ink" style="stroke-width:7" d="M-86 -30 V36 M-94 -30 V-6 M-78 -30 V-6 M86 -30 C100 -10 98 10 86 14 V36"/></g>';
  },
  // the thought balloon from 3a holding a picture (the balloon is drawn larger so the picture fits)
  dream(id, inner) {
    const d = 'M-120 40 C-160 40 -164 -20 -116 -26 C-114 -88 -36 -104 -2 -66 C28 -100 108 -88 106 -24 C150 -20 150 40 108 40Z';
    return '<g class="' + id + '"><path class="shade" transform="translate(0 10)" d="' + d + '"/><path d="' + d + '" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:6"/>' +
      '<g transform="translate(-6 -16) scale(.8)">' + (inner || '') + '</g></g>';
  },
  // n small dots in a row (centre 0,0), lit by the scene: id-d0..
  dots(id, n, gap) {
    let s = '<g class="' + id + '">';
    for (let k = 0; k < n; k++) s += '<circle class="' + id + '-d' + k + '" cx="' + ((k - (n - 1) / 2) * (gap || 56)) + '" r="18" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:5"/>';
    return s + '</g>';
  },
  lightDot(el, p) { el.style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(100 * p) + '%, color-mix(in srgb, var(--ground) 40%, white))'; },
  // a soft, uneven trace of the breath as it happens (scrolls left with time t)
  breathTrace(x0, y, w, t) {
    let d = '';
    for (let i = 0; i <= 90; i++) {
      const x = x0 + w * i / 90, u = t * 0.9 - (1 - i / 90) * 3.2;
      const yy = y - (26 + 10 * Math.sin(u * 0.7) + 6 * Math.sin(u * 1.9)) * Math.sin(u * 1.45 + 0.4 * Math.sin(u * 0.5));
      d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + yy.toFixed(1);
    }
    return d;
  },
  setG(g, x, y, s, o) { g.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + Math.max(0.001, s == null ? 1 : s) + ')'); if (o != null) g.style.opacity = o; },
  closeEyes(eyes) { eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); },
  mouthNeutral: 'M-10 26 Q2 32 14 26', mouthHappy: 'M-12 24 Q2 38 16 24', mouthFlat: 'M-10 29 L14 29',
});
