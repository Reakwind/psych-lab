// Session 76 additions. New here: the five steps as round badges (notice = the eye tool, steady = the breath waves, choose = the compass,
// take a step = a lit stone, acknowledge = a warm heart) and the strip that shows them across the top of the room; badges for the seven ways
// practised in the program. Repeated so this film builds on its own: the compass (session 73), the dumbbell and trophy (session 25),
// Ruth wearing her backpack (session 14), the open door (session 70).
Object.assign(R, {
  STEPS: ['לשים לב', 'להתייצב', 'לבחור', 'לקחת צעד', 'לפרגן'],
  SX: [930, 735, 540, 345, 150],
  compass(id, r) {
    r = r || 100;
    let ticks = '';
    for (let k = 0; k < 8; k++) ticks += '<rect class="slate" x="' + (-r * 0.03) + '" y="' + (-r * 0.8) + '" width="' + (r * 0.06) + '" height="' + (r * (k % 2 ? 0.08 : 0.14)) + '" rx="' + (r * 0.03) + '" transform="rotate(' + k * 45 + ')"/>';
    return '<g class="' + id + '"><circle class="' + id + '-glow" r="' + (r * 1.45) + '" style="fill:var(--accent)" opacity="0"/><circle class="shade" cy="' + (r * 0.1) + '" r="' + r + '"/>' +
      '<circle r="' + r + '" style="fill:color-mix(in srgb, var(--main) 45%, var(--ground));stroke:var(--second);stroke-width:' + (r * 0.06) + '"/><circle r="' + (r * 0.84) + '" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:' + (r * 0.025) + '"/>' + ticks +
      '<g class="' + id + '-needle"><path d="M0 ' + (-r * 0.7) + ' L' + (r * 0.15) + ' 0 L' + (-r * 0.15) + ' 0Z" style="fill:var(--accent);stroke:var(--second);stroke-width:' + (r * 0.025) + ';stroke-linejoin:round"/>' +
      '<path d="M0 ' + (r * 0.7) + ' L' + (r * 0.15) + ' 0 L' + (-r * 0.15) + ' 0Z" class="slate" style="stroke:var(--second);stroke-width:' + (r * 0.025) + ';stroke-linejoin:round"/></g><circle r="' + (r * 0.08) + '" class="metal"/></g>';
  },
  aim(cx, cy, x, y) { return Math.atan2(x - cx, cy - y) * 180 / Math.PI; },
  // the five steps as round badges, radius r; id-glow behind
  stepB(id, k, r) {
    r = r || 56;
    const fills = ['color-mix(in srgb, var(--accent) 30%, var(--ground))', 'color-mix(in srgb, var(--main) 18%, var(--ground))', 'color-mix(in srgb, var(--main) 30%, var(--ground))', 'color-mix(in srgb, var(--accent) 16%, white)', 'color-mix(in srgb, var(--accent) 45%, var(--ground))'];
    const g = [
      '<path class="light" d="M-34 0 Q0 -30 34 0 Q0 30 -34 0Z"/><path class="ink" style="stroke-width:5" d="M-34 0 Q0 -30 34 0 Q0 30 -34 0Z"/><circle class="metal" r="11"/><circle class="light" cx="4" cy="-4" r="3"/>',
      '<path class="ink" style="stroke-width:6" d="M-30 -14 q10 -12 20 0 t20 0 t20 0 M-30 4 q10 -12 20 0 t20 0 t20 0 M-30 22 q10 -12 20 0 t20 0 t20 0"/>',
      '<g transform="scale(.36)">' + R.compass(id + '-cm', 100) + '</g>',
      '<ellipse class="stone-dk" cx="0" cy="14" rx="36" ry="14"/><ellipse class="stone-lit" cx="0" cy="10" rx="34" ry="12"/><path class="ink" style="stroke-width:5" d="M-10 -10 L0 -26 L10 -10 M0 -26 V-2"/>',
      '<path class="amber-dk" d="M0 26 C-40 2 -26 -32 0 -12 C26 -32 40 2 0 26Z"/><path class="light" opacity=".55" d="M-16 -12 q6 -6 12 0"/>'][k];
    return '<g class="' + id + '"><circle class="' + id + '-glow" r="' + (r * 1.35) + '" style="fill:var(--accent)" opacity="0"/><circle class="shade" cy="' + (r * 0.12) + '" r="' + r + '"/><circle r="' + r + '" style="fill:' + fills[k] + ';stroke:var(--second);stroke-width:5"/><g transform="scale(' + (r / 56) + ')">' + g + '</g></g>';
  },
  // the strip of five step badges across the top (id-s0..4) with the current step's tag (an HTML tag, id-cap)
  strip(id) { return '<g class="' + id + '-strip">' + R.SX.map((x, k) => '<g class="' + id + '-s' + k + '" transform="translate(' + x + ' 104)">' + R.stepB(id + '-sb' + k, k, 46) + '</g>').join('') + '</g>'; },
  stripTag(id) { return R.STEPS.map((s, k) => '<div class="tag tag-warm ' + id + '-cap' + k + '">' + s + '</div>').join(''); },
  stripRefs(kit, id) { return { s: [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.' + id + '-s' + k)), g: [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.' + id + '-sb' + k + '-glow')), cap: [0, 1, 2, 3, 4].map((k) => kit.stage.querySelector('.' + id + '-cap' + k)) }; },
  // show the strip with step `cur` lit from time `at` (earlier steps stay done, later ones dim)
  setStrip(S, t, cur, at, o) {
    o = o == null ? 1 : o;
    const lit = kit.eo(kit.seg(t, at, at + 0.5));
    S.s.forEach((el, k) => {
      const on = k < cur ? 1 : k === cur ? lit : 0;
      el.style.opacity = o * (0.45 + 0.55 * on);
      el.setAttribute('transform', 'translate(' + R.SX[k] + ' 104) scale(' + (k === cur ? 1 + 0.18 * lit + 0.1 * Math.sin(Math.PI * kit.seg(t, at, at + 0.6)) : 1) + ')');
      S.g[k].setAttribute('opacity', k === cur ? 0.35 * lit : 0);
      R.place(S.cap[k], R.SX[k], kit.lerp(200, 188, lit), k === cur ? lit * o : 0);
    });
  },
  // the seven ways practised in the program: thoughts and feelings, attention, calming, energy, starting without motivation, what matters, kindness to ourselves
  way(id, k, r) {
    r = r || 56;
    if (k === 0) return R.tool(id, 0, r);
    if (k === 1) return R.tool(id, 2, r);
    if (k === 2) return R.tool(id, 1, r);
    if (k === 6) return R.tool(id, 3, r);
    const fills = ['', '', '', '#CFE6CF', 'color-mix(in srgb, var(--accent) 16%, white)', 'color-mix(in srgb, var(--main) 30%, var(--ground))'];
    const g = {
      3: '<rect x="-18" y="-30" width="36" height="58" rx="8" style="fill:var(--ground);stroke:var(--second);stroke-width:5"/><rect x="-8" y="-38" width="16" height="8" rx="3" style="fill:var(--second)"/><rect x="-11" y="-12" width="22" height="34" rx="3" style="fill:#6FAE7A"/>',
      4: '<path class="amber" style="stroke:var(--second);stroke-width:4" d="M0 -40 C5 -10 10 -5 40 0 C10 5 5 10 0 40 C-5 10 -10 5 -40 0 C-10 -5 -5 -10 0 -40Z"/>',
      5: '<g transform="scale(.36)">' + R.compass(id + '-cm', 100) + '</g>' }[k];
    return '<g class="' + id + '"><circle class="shade" cy="' + (r * 0.12) + '" r="' + r + '"/><circle r="' + r + '" style="fill:' + fills[k] + ';stroke:var(--second);stroke-width:5"/><g transform="scale(' + (r / 56) + ')">' + g + '</g></g>';
  },
  WAYS: ['מחשבות ורגשות', 'למקד את הקשב', 'להירגע', 'לנהל את האנרגיה', 'להתחיל לפעול גם כשאין מוטיבציה', 'להתחבר למה שחשוב לנו', 'להיות טובים לעצמנו'],
  dumbbell(id) {
    return '<g class="' + id + '"><ellipse class="shade" cx="0" cy="34" rx="70" ry="9"/><rect class="metal" x="-40" y="-8" width="80" height="16" rx="8"/><rect class="slate-dk" x="-62" y="-30" width="24" height="60" rx="8"/><rect class="slate-dk" x="38" y="-30" width="24" height="60" rx="8"/></g>';
  },
  // an exercise mat: rolled up (u = 0) to flat on the floor (u = 1); origin = its right end on the floor
  mat(id) { return '<g class="' + id + '"><rect class="' + id + '-flat mat" x="-400" y="-14" width="400" height="22" rx="10"/><g class="' + id + '-roll"><circle class="mat" cx="0" cy="-26" r="36" style="stroke:color-mix(in srgb, var(--main) 50%, var(--ground));stroke-width:6"/><circle cx="0" cy="-26" r="16" style="fill:none;stroke:color-mix(in srgb, var(--main) 50%, var(--ground));stroke-width:5"/></g></g>'; },
  setMat(r, u) { r.flat.setAttribute('width', Math.max(1, 400 * u)); r.flat.setAttribute('x', -400 * u); r.roll.setAttribute('transform', 'translate(' + (-400 * u) + ' 0) scale(' + (1 - 0.65 * u) + ')'); r.roll.style.opacity = u > 0.97 ? 0 : 1; },
  trophy(id) {
    return '<g class="' + id + '"><path class="ink" style="stroke-width:12" d="M-70 -90 C-130 -90 -126 -10 -60 -6 M70 -90 C130 -90 126 -10 60 -6"/>' +
      '<path class="amber" d="M-80 -120 H80 V-60 C80 0 40 30 0 34 C-40 30 -80 0 -80 -60Z" style="stroke:var(--second);stroke-width:6"/><path class="light" opacity=".45" d="M-56 -104 h20 v50 c0 20 -8 34 -20 40Z"/>' +
      '<rect class="amber-dk" x="-14" y="30" width="28" height="44" style="stroke:var(--second);stroke-width:6"/><rect class="wood" x="-60" y="70" width="120" height="34" rx="8" style="stroke:var(--second);stroke-width:6"/></g>';
  },
  openDoor(id) {
    return '<g class="' + id + '" opacity="0"><rect class="amber-lt" x="820" y="450" width="190" height="410" rx="6"/><path class="light" opacity=".8" d="M820 860 L1010 860 L1080 1080 L700 1080Z"/><path class="wood" d="M820 450 L760 476 L760 860 L820 860Z"/>' +
      '<path class="hill-near" d="M820 760 C880 740 940 750 1010 736 V860 H820Z"/><circle class="amber" cx="950" cy="560" r="34"/></g>';
  },
  // Ruth standing with her backpack on (front view): the bag behind her, straps in front
  packed(id, pose, free) { const fig = free ? R.armsFree(R.ruth(id, pose || 'stand'), id) : R.ruth(id, pose || 'stand'); return '<g class="' + id + '-w">' + R.packBehind(id) + fig + R.straps(id) + '</g>'; },
  // the room with Ruth in her armchair (dx), the exercise mat by the door and her dumbbell
  gym(id, dx) { return R.room({}) + '<g class="' + id + '-mt" transform="translate(800 872)">' + R.mat(id + '-mat') + '</g>' + R.seated(id, dx) + '<g class="' + id + '-db">' + R.dumbbell(id + '-dbl') + '</g>'; },
  look(eyes, t, off, dx, dy) { const p = ((t + (off || 0)) % 4.1); eyes.setAttribute('transform', 'translate(' + (dx || 0) + ' ' + (dy || 0) + ')' + (p > 3.95 ? ' translate(0 -2) scale(1 .15)' : '')); },
  shut(eyes) { eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); },
  SMILE: 'M-10 26 Q2 32 14 26', BIG: 'M-12 24 Q2 38 16 24', FLAT: 'M-10 29 L14 29', SAD: 'M-10 31 Q2 25 14 31',
  puffs(id) { return '<g class="' + id + '"><path style="fill:none;stroke:var(--main);stroke-width:6;stroke-linecap:round" d="M62 -190 q12 6 0 14 M78 -196 q16 10 0 26 M94 -202 q20 14 0 38"/></g>'; },
  // a soft grey cloud for an overcast sky
  greyCloud(id) { return '<path class="' + id + '" d="M-120 30 C-170 30 -170 -30 -120 -34 C-118 -80 -50 -96 -20 -60 C10 -110 100 -96 100 -40 C150 -44 160 30 110 30Z" style="fill:color-mix(in srgb, var(--second) 25%, var(--ground))"/>'; },
});
