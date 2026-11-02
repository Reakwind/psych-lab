// Session 16 additions: the struggle switch on the wall of Ruth's room (a rocker with a red light that can also turn into a dimmer knob),
// HTML slabs that stack into a pile of what the struggle adds, a grey cloud of an unpleasant feeling, and a block on her path.
// Repeated from earlier films so this one builds on its own: tension marks and mouths (session 14), the heart of what matters (session 9), lit stones (session 12).
Object.assign(R, {
  setG(g, x, y, s, o) { g.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + Math.max(0.001, s == null ? 1 : s) + ')'); if (o != null) g.style.opacity = o; },
  tense(id) { return '<g class="' + id + '"><path style="fill:none;stroke:#C0392B;stroke-width:6;stroke-linecap:round;stroke-linejoin:round" d="M-110 -170 l12 -14 l8 14 l12 -14 M78 -184 l12 14 l8 -14 l12 14"/></g>'; },
  heart(id) {
    return '<g class="' + id + '"><circle class="' + id + '-glow" r="70" style="fill:var(--accent);opacity:.3"/><path d="M0 34 C-56 0 -40 -48 0 -20 C40 -48 56 0 0 34Z" style="fill:#D96C6C;stroke:var(--second);stroke-width:6;stroke-linejoin:round"/>' +
      '<path class="light" opacity=".55" d="M-22 -14 q8 -10 18 -2"/></g>';
  },
  litStone(top, p) { top.style.fill = 'color-mix(in srgb, var(--accent) ' + (22 + 78 * p).toFixed(1) + '%, var(--ground))'; },
  mouthNeutral: 'M-10 26 Q2 32 14 26', mouthHappy: 'M-12 24 Q2 38 16 24', mouthFlat: 'M-10 29 L14 29', mouthSad: 'M-10 31 Q2 25 14 31', mouthYawn: 'M-8 22 Q2 16 12 22 Q12 40 2 40 Q-8 40 -8 22Z',
  mouthO: 'M-4 24 Q2 18 8 24 Q8 34 2 34 Q-4 34 -4 24Z',

  // the struggle switch, centred on 0,0 (plate 120 × 180). Parts: id-rock (the rocker; id-up lit when on), id-led and id-halo (the red light), id-dial and id-knob (the dimmer)
  SW: [700, 540],
  switchSvg(id) {
    return '<g class="' + id + '"><circle class="' + id + '-halo" cy="-128" r="40" style="fill:#D96C6C;opacity:0"/><circle class="' + id + '-led" cy="-128" r="14" style="fill:color-mix(in srgb, var(--second) 25%, var(--ground));stroke:var(--second);stroke-width:4"/>' +
      '<rect class="shade" x="-54" y="-82" width="120" height="180" rx="20"/><rect x="-60" y="-90" width="120" height="180" rx="20" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:6"/>' +
      '<g class="' + id + '-rock"><rect x="-34" y="-62" width="68" height="124" rx="12" style="fill:color-mix(in srgb, var(--second) 18%, var(--ground));stroke:var(--second);stroke-width:4"/>' +
      '<rect class="' + id + '-dn" x="-28" y="4" width="56" height="52" rx="9" style="fill:color-mix(in srgb, var(--second) 45%, var(--ground))"/>' +
      '<rect class="' + id + '-up" x="-28" y="-56" width="56" height="52" rx="9" style="fill:#D96C6C;opacity:0"/></g>' +
      '<g class="' + id + '-dial" opacity="0"><circle r="44" style="fill:color-mix(in srgb, var(--second) 18%, var(--ground));stroke:var(--second);stroke-width:5"/>' +
      [0, 1, 2, 3, 4, 5, 6].map((k) => '<rect x="-3" y="-60" width="6" height="12" rx="3" transform="rotate(' + (-135 + k * 45) + ')" style="fill:var(--second);opacity:.5"/>').join('') +
      '<g class="' + id + '-knob"><path d="M0 0 V-34" style="stroke:#C0392B;stroke-width:9;stroke-linecap:round"/></g><circle r="9" style="fill:var(--second)"/></g></g>';
  },
  swRefs(kit, id) { return R.refs(kit, id, ['rock', 'up', 'dn', 'led', 'halo', 'dial', 'knob']); },
  // v: 0 off .. 1 on; dim: 0 rocker .. 1 dimmer knob; level: knob 0..1 (1 = full on)
  setSwitch(r, v, dim, level) {
    r.up.style.opacity = v; r.dn.style.opacity = 1 - v;
    r.rock.setAttribute('transform', 'scale(' + (1 - 0.06 * Math.sin(Math.PI * v)) + ')');
    const l = (dim || 0) > 0.5 ? (level == null ? v : level) : v;
    r.led.style.fill = 'color-mix(in srgb, #E04B3F ' + (100 * l).toFixed(0) + '%, color-mix(in srgb, var(--second) 25%, var(--ground)))';
    r.halo.style.opacity = 0.35 * l;
    const d = dim || 0;
    r.rock.style.opacity = 1 - d; r.dial.setAttribute('opacity', d);
    r.knob.setAttribute('transform', 'rotate(' + (-135 + 270 * (level == null ? 1 : level)) + ')');
  },
  // Ruth's room with her in the armchair (dx), the switch on the wall, tension marks in her coordinates
  roomSw(id, dx) {
    return R.room({ plant: false }) + '<g class="' + id + '-sww" transform="translate(' + R.SW[0] + ' ' + R.SW[1] + ')">' + R.switchSvg(id + '-sw') + '</g>' +
      R.seated(id, dx) + '<g transform="translate(' + (500 + dx) + ' 742)">' + R.tense(id + '-tn') + '</g>';
  },
  // the room with Ruth standing (free arms), the switch on the wall
  roomStand(id, x) {
    return R.room({ plant: false }) + '<g class="' + id + '-sww" transform="translate(' + R.SW[0] + ' ' + R.SW[1] + ')">' + R.switchSvg(id + '-sw') + '</g>' +
      '<g class="' + id + '-w" transform="translate(' + x + ' 975)">' + R.armsFree(R.ruth(id, 'stand'), id) + R.tense(id + '-tn').replace('<g class', '<g transform="translate(0 -230)" class') + '</g>';
  },
  // an unpleasant feeling: a grey cloud with a small frown (centre 0,0, about 260 wide); id-face
  feel(id) {
    const d = 'M-110 50 C-160 50 -160 -20 -110 -26 C-116 -90 -40 -110 -10 -66 C20 -120 110 -100 104 -40 C160 -40 160 50 110 50Z';
    return '<g class="' + id + '"><path class="shade" transform="translate(0 10)" d="' + d + '"/><path d="' + d + '" style="fill:color-mix(in srgb, var(--second) 45%, var(--ground));stroke:var(--second);stroke-width:6;stroke-linejoin:round"/>' +
      '<g class="' + id + '-face"><circle cx="-24" cy="2" r="7" style="fill:var(--second)"/><circle cx="24" cy="2" r="7" style="fill:var(--second)"/><path d="M-20 30 Q0 18 20 30" style="fill:none;stroke:var(--second);stroke-width:6;stroke-linecap:round"/></g></g>';
  },
  // the pile: slabs stacked from the floor at x, slot k (0 = bottom)
  PILE: [905, 1004, 74],
  slabAt(k, s) { const [x, y, h] = R.PILE; return [x, y - h / 2 - k * h * (s || 1)]; },
  // a block lying on her path (centre-bottom origin)
  pathBlock(id) {
    return '<g class="' + id + '"><ellipse class="shade" cx="0" cy="4" rx="110" ry="16"/><rect x="-100" y="-120" width="200" height="120" rx="18" style="fill:color-mix(in srgb, var(--second) 55%, var(--ground));stroke:var(--second);stroke-width:6"/>' +
      '<rect x="-84" y="-108" width="168" height="40" rx="12" style="fill:color-mix(in srgb, var(--second) 35%, var(--ground))"/></g>';
  },
  // the slabs of the pile (HTML), in stacking order; red ones are what the switch adds
  PILES: [['קושי גופני', ''], ['חרדה', ''], ['תסכול', 'red'], ['כעס', 'red'], ['', 'blank'], ['', 'blank'], ['', 'blank'], ['עוד מתח', '']],
  pileHtml(id) { return R.PILES.map(([w, c], k) => '<div class="slab ' + c + ' ' + id + '-p' + k + '">' + w + '</div>').join(''); },
  pileRefs(kit, id) { return R.PILES.map((p, k) => kit.stage.querySelector('.' + id + '-p' + k)); },
  // show(k) → 0..1 (drops in from above as it appears); s = slab scale; wob = a shake
  setPile(els, show, s, wob) {
    els.forEach((el, k) => {
      const v = show(k), [x, y] = R.slabAt(k, s || 1);
      R.put(el, x + (wob || 0) * Math.sin(k * 1.7 + (wob || 0) * 3), y - 260 * (1 - kit.eo(v)), s || 1, (wob || 0) * 0.4 * Math.sin(k * 2.3), v > 0.001 ? Math.min(1, v * 3) : 0);
    });
  },
  // the room furniture shared by the seated scenes: the battery (top left) and the pile's slots
  BAT: [130, 200],
  xMark(id, r) {
    return '<g class="' + id + '"><path class="' + id + '-a" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:14;stroke-linecap:round;stroke-dasharray:1 1" d="M' + (-r) + ' ' + (-r) + ' L' + r + ' ' + r + '"/>' +
      '<path class="' + id + '-b" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:14;stroke-linecap:round;stroke-dasharray:1 1" d="M' + r + ' ' + (-r) + ' L' + (-r) + ' ' + r + '"/></g>';
  },
  drawOn(p, v) { p.style.strokeDashoffset = 1 - v; p.style.opacity = v > 0.002 ? 1 : 0; },
});
