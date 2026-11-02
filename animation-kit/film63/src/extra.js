// Session 63 additions: the café with Ruth and two friends, the discomfort cycle (five parts, arrows round and across), an invite on the phone.
Object.assign(R, {
  // the café: warm wall, a big window, hanging lamps, wooden floor
  cafe(p) {
    return '<rect width="1080" height="1080" style="fill:color-mix(in srgb, var(--accent) 16%, var(--ground))"/>' +
      '<rect x="0" y="0" width="1080" height="70" style="fill:color-mix(in srgb, var(--main) 55%, var(--ground))"/>' +
      [0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => '<path style="fill:' + (k % 2 ? 'var(--ground)' : 'color-mix(in srgb, var(--main) 55%, var(--ground))') + '" d="M' + (k * 120) + ' 70 h120 v36 q-60 30 -120 0Z"/>').join('') +
      '<rect class="wood-lt" x="120" y="190" width="840" height="380" rx="18"/><rect class="glass" x="140" y="210" width="800" height="340" rx="10"/>' +
      '<path class="light" opacity=".6" d="M200 530 L330 230 H380 L250 530Z M640 530 L770 230 H800 L670 530Z"/><rect class="wood-lt" x="532" y="210" width="16" height="340"/>' +
      '<path class="hill-near" opacity=".5" d="M140 470 C300 430 500 470 700 440 C820 424 900 440 940 450 V550 H140Z"/>' +
      [270, 810].map((x) => '<path class="ink" style="stroke-width:4" d="M' + x + ' 106 V170"/><path class="amber" d="M' + (x - 50) + ' 210 Q' + x + ' 130 ' + (x + 50) + ' 210Z"/><ellipse class="' + p + '-lamp" cx="' + x + '" cy="214" rx="40" ry="8" style="fill:color-mix(in srgb, var(--accent) 40%, white)"/>').join('') +
      '<rect x="0" y="640" width="1080" height="440" class="wood-lt" style="fill:color-mix(in srgb, var(--accent) 34%, var(--ground))"/><rect class="shade" x="0" y="636" width="1080" height="8"/>' +
      '<path class="floor-dk" opacity=".3" d="M0 760 H1080 V766 H0Z M0 900 H1080 V906 H0Z"/>';
  },
  // the round café table in front of the three of them (top at y 800)
  table(id) {
    return '<g class="' + id + '"><rect class="wood" x="514" y="820" width="52" height="220"/><ellipse class="shade" cx="540" cy="1050" rx="170" ry="16"/><rect class="wood" x="440" y="1030" width="200" height="22" rx="10"/>' +
      '<ellipse class="wood" cx="540" cy="818" rx="430" ry="56"/><ellipse class="wood-lt" cx="540" cy="804" rx="430" ry="52"/></g>';
  },
  cup(id) {
    return '<g class="' + id + '"><path class="ink" style="stroke-width:7" d="M26 -26 q22 0 22 16 q0 16 -22 16"/><path d="M-30 -44 H30 L24 6 Q22 14 14 14 H-14 Q-22 14 -24 6Z" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/><ellipse class="amber-dk" cx="0" cy="-40" rx="26" ry="6"/></g>';
  },
  // a speech bubble with three dots (sz scales it); id-dots can be dimmed
  chat(id) {
    return '<g class="' + id + '"><path class="shade" transform="translate(4 6)" d="M-70 -40 H70 Q90 -40 90 -20 V20 Q90 40 70 40 H-10 L-30 66 L-30 40 H-70 Q-90 40 -90 20 V-20 Q-90 -40 -70 -40Z"/>' +
      '<path d="M-70 -40 H70 Q90 -40 90 -20 V20 Q90 40 70 40 H-10 L-30 66 L-30 40 H-70 Q-90 40 -90 20 V-20 Q-90 -40 -70 -40Z" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:5"/>' +
      '<g class="' + id + '-dots"><circle class="metal" cx="-30" cy="0" r="9"/><circle class="metal" cx="0" cy="0" r="9"/><circle class="metal" cx="30" cy="0" r="9"/></g></g>';
  },
  // zigzag tension marks (draw beside the shoulders)
  tense(id) {
    return '<g class="' + id + '"><path class="ink" style="stroke:#D96C6C;stroke-width:7" d="M-110 -150 l-14 -14 l18 -6 l-14 -16 M110 -150 l14 -14 l-18 -6 l14 -16"/></g>';
  },
  // the five parts of the cycle, in the order Nira tells them
  CYC: [[540, 262, 'סימפטום בגוף'], [825, 470, 'מחשבה'], [716, 806, 'תשומת לב'], [364, 806, 'רגש ומתח בגוף'], [255, 470, 'מה שעשינו']],
  // label spots: above the top node, beside the side nodes, below the bottom ones
  CLAB: [[540, 150], [880, 580], [740, 920], [340, 920], [200, 580]],
  cycIcon(k) {
    return [
      // a hand that shakes
      '<path class="skin" d="M-30 34 C-36 0 -34 -18 -26 -30 C-22 -36 -14 -34 -14 -26 L-12 -40 C-12 -50 0 -50 0 -40 L2 -42 C2 -52 14 -52 14 -42 L16 -34 C16 -42 28 -42 28 -32 L26 4 C26 22 18 34 4 38Z" style="stroke:var(--second);stroke-width:4"/>' +
        '<path class="ink" style="stroke-width:5;opacity:.75" d="M40 -30 q8 -8 16 0 t16 0 M44 -4 q8 -8 16 0 t16 0 M40 22 q8 -8 16 0 t16 0"/>',
      // a grey thought card
      '<rect x="-52" y="-34" width="104" height="68" rx="16" style="fill:color-mix(in srgb, var(--second) 18%, var(--ground));stroke:var(--second);stroke-width:5"/><path class="ink" style="stroke-width:5;opacity:.6" d="M-30 -10 H30 M-30 10 H14"/>',
      // the spotlight of attention on a small figure
      '<circle r="50" style="fill:var(--accent);opacity:.22"/><circle r="50" style="fill:none;stroke:var(--accent);stroke-width:5;stroke-dasharray:10 8"/><circle class="skin" cx="0" cy="-12" r="13"/><path class="knit" d="M-20 30 C-20 8 -12 2 0 2 C12 2 20 8 20 30Z"/>',
      // a worried face with tense shoulders
      '<circle class="skin" cx="0" cy="-4" r="30"/><path class="ink" style="stroke-width:5" d="M-12 14 Q0 6 12 14 M-14 -12 l8 4 M14 -12 l-8 4"/><path class="ink" style="stroke:#D96C6C;stroke-width:5" d="M-46 -36 l-10 -10 l14 -4 l-10 -12 M46 -36 l10 -10 l-14 -4 l10 -12"/>',
      // stepping back from the conversation: a bubble getting smaller, an arrow away
      '<path d="M-44 -30 H20 Q34 -30 34 -16 V8 Q34 22 20 22 H-14 L-28 40 L-28 22 H-44 Q-58 22 -58 8 V-16 Q-58 -30 -44 -30Z" style="fill:color-mix(in srgb, var(--ground) 30%, white);stroke:var(--second);stroke-width:4;opacity:.55"/><path class="ink" style="stroke-width:7" d="M14 30 H54 M42 18 L54 30 L42 42"/>'
    ][k];
  },
  // the cycle: nodes (id-n0..4, each with id-n{k}-disc), arrows round (id-a0..4) and across (id-x0..4)
  cycle(id) {
    const C = R.CYC, cx = 540, cy = 560, rr = 300;
    let s = '<g class="' + id + '-cyc"><circle class="' + id + '-ring" cx="' + cx + '" cy="' + cy + '" r="' + rr + '" style="fill:none;stroke:var(--second);stroke-width:4;stroke-dasharray:6 14;opacity:.25"/>';
    [[0, 2], [1, 3], [2, 4], [3, 0], [4, 1]].forEach(([a, b], k) => { s += '<path class="' + id + '-x' + k + '" style="fill:none;stroke:var(--second);stroke-width:5;stroke-dasharray:4 14;stroke-linecap:round;opacity:0" d="M' + C[a][0] + ' ' + C[a][1] + ' L' + C[b][0] + ' ' + C[b][1] + '"/>'; });
    for (let k = 0; k < 5; k++) {
      const a0 = (-90 + k * 72 + 17) * Math.PI / 180, a1 = (-90 + k * 72 + 55) * Math.PI / 180;
      const x0 = cx + rr * Math.cos(a0), y0 = cy + rr * Math.sin(a0), x1 = cx + rr * Math.cos(a1), y1 = cy + rr * Math.sin(a1);
      const t = a1 + Math.PI / 2, hx = x1 - 22 * Math.cos(t - 0.5), hy = y1 - 22 * Math.sin(t - 0.5), kx = x1 - 22 * Math.cos(t + 0.5), ky = y1 - 22 * Math.sin(t + 0.5);
      s += '<path class="' + id + '-a' + k + '" pathLength="1" style="fill:none;stroke:var(--second);stroke-width:9;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0 1" d="M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A' + rr + ' ' + rr + ' 0 0 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + '"/>' +
        '<path class="' + id + '-ah' + k + '" style="fill:none;stroke:var(--second);stroke-width:9;stroke-linecap:round;stroke-linejoin:round;opacity:0" d="M' + hx.toFixed(1) + ' ' + hy.toFixed(1) + ' L' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' L' + kx.toFixed(1) + ' ' + ky.toFixed(1) + '"/>';
    }
    C.forEach(([x, y], k) => {
      s += '<g class="' + id + '-n' + k + '" transform="translate(' + x + ' ' + y + ')"><circle class="shade" cy="10" r="84"/><circle class="' + id + '-n' + k + '-disc" r="84" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:6"/>' + R.cycIcon(k) + '</g>';
    });
    return s + '<circle class="' + id + '-dot" r="16" style="fill:var(--accent);opacity:0"/></g>';
  },
  // a point on the ring at angle a (degrees, 0 = top, clockwise)
  ringAt(a) { const r = (a - 90) * Math.PI / 180; return [540 + 300 * Math.cos(r), 560 + 300 * Math.sin(r)]; },
  // an invitation on the phone: a coffee cup and a yes button (id-yes)
  invite(id) {
    return '<g class="' + id + '"><rect class="shade" x="-74" y="-124" width="160" height="260" rx="26"/><rect x="-80" y="-132" width="160" height="260" rx="26" style="fill:var(--second)"/>' +
      '<rect x="-66" y="-114" width="132" height="210" rx="14" style="fill:color-mix(in srgb, var(--ground) 70%, white)"/>' +
      '<g transform="translate(0 -40) scale(.9)">' + R.cup(id + '-c') + '</g><rect class="' + id + '-yes" x="-44" y="34" width="88" height="40" rx="20" style="fill:#6FAE7A"/><path class="ink" style="stroke:white;stroke-width:6" d="M-14 54 l10 10 l20 -20"/></g>';
  },
});
// the whole café shot: Ruth between two friends behind the table, a cup by her hand, chat bubbles, a dimming veil with a spotlight hole (id-hole)
R.cafeShot = function (id) {
  return R.cafe(id) +
    '<g transform="translate(220 770)">' + R.friend(id + '-fa', 'a', 'sit') + '</g><g transform="translate(860 770)">' + R.friend(id + '-fb', 'b', 'sit') + '</g>' +
    '<g transform="translate(540 770)"><g class="' + id + '-body">' + R.ruth(id, 'sit') + '</g></g>' + '<g class="' + id + '-ten" transform="translate(540 770)">' + R.tense(id + '-tz') + '</g>' +
    R.table(id + '-tb') + '<g class="' + id + '-cupg" transform="translate(604 770)">' + R.cup(id + '-cup') + '</g><g class="' + id + '-tr" transform="translate(630 740)">' + R.tremor(id + '-t') + '</g>' +
    '<g class="' + id + '-ba" transform="translate(240 360)">' + R.chat(id + '-ca') + '</g><g class="' + id + '-bb" transform="translate(850 360)">' + R.chat(id + '-cb') + '</g><g class="' + id + '-br" transform="translate(420 400)">' + R.chat(id + '-cr') + '</g>' +
    '<mask id="' + id + '-mask"><rect width="1080" height="1080" fill="white"/><circle class="' + id + '-hole" cx="560" cy="660" r="900" fill="black"/></mask>' +
    '<rect class="' + id + '-veil" width="1080" height="1080" mask="url(#' + id + '-mask)" style="fill:color-mix(in srgb, var(--second) 85%, var(--main))" opacity="0"/>';
};
R.cafeRefs = function (kit, id) {
  const o = R.refs(kit, id, ['head', 'eyes', 'mouth', 'body', 'ten', 'cupg', 'tr', 'ba', 'bb', 'br', 'hole', 'veil']);
  o.fa = kit.stage.querySelector('.' + id + '-fa-eyes'); o.fb = kit.stage.querySelector('.' + id + '-fb-eyes');
  o.fah = kit.stage.querySelector('.' + id + '-fa-head'); o.fbh = kit.stage.querySelector('.' + id + '-fb-head');
  o.fam = kit.stage.querySelector('.' + id + '-fa-mouth'); o.fbm = kit.stage.querySelector('.' + id + '-fb-mouth');
  return o;
};
// friends chatting: heads bob, mouths move, bubbles pulse
R.chatter = function (c, t, on) {
  R.blink(c.fa, t, 1.1); R.blink(c.fb, t, 2.6);
  c.fah.setAttribute('transform', 'rotate(' + (6 + 3 * Math.sin(t * 1.7)) + ' 0 30)'); c.fbh.setAttribute('transform', 'rotate(' + (-6 + 3 * Math.sin(t * 1.3 + 1)) + ' 0 30)');
  c.fam.setAttribute('d', on && Math.floor(t * 4) % 2 ? 'M-10 24 Q2 38 14 24' : 'M-12 24 Q2 34 16 24');
  c.fbm.setAttribute('d', on && Math.floor(t * 4 + 1) % 2 ? 'M-10 24 Q2 38 14 24' : 'M-12 24 Q2 34 16 24');
  c.ba.setAttribute('transform', 'translate(240 ' + (360 + Math.sin(t * 2.4) * 6) + ') scale(.9)'); c.bb.setAttribute('transform', 'translate(850 ' + (360 + Math.sin(t * 2.1 + 1) * 6) + ') scale(.9)');
};
