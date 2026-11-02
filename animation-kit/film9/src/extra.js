// Session 9 additions: Ruth's bus (side view, the cab over her shoulder, the inside looking back, from behind), the road through her path landscape, the heart it leads to, signposts.
Object.assign(R, {
  // the heart at the end of the road: what matters (centre 0,0)
  heart(id) {
    return '<g class="' + id + '"><circle class="' + id + '-glow" r="70" style="fill:var(--accent);opacity:.3"/><path d="M0 34 C-56 0 -40 -48 0 -20 C40 -48 56 0 0 34Z" style="fill:#D96C6C;stroke:var(--second);stroke-width:6;stroke-linejoin:round"/>' +
      '<path class="light" opacity=".55" d="M-22 -14 q8 -10 18 -2"/></g>';
  },
  // road through the path landscape (land coordinates); the stones give way to the road
  ROAD: 'M240 1080 C420 900 650 770 570 610 C536 546 546 500 549 468 L563 468 C566 500 582 546 606 610 C700 790 540 920 860 1080Z',
  ROADC: 'M550 1080 C540 910 676 776 588 610 C556 546 556 500 556 468',
  roadLand(p, o) {
    o = o || {};
    return '<g class="nostones">' + R.land(p, { sun: true, sunX: 850, sunY: 250 }) + '</g>' + '<path class="' + p + '-branch road-st" style="stroke-width:110"/><path class="' + p + '-branchc" style="fill:none;stroke:var(--ground);stroke-width:6;stroke-dasharray:28 26;opacity:.8"/>' +
      '<path class="road" d="' + R.ROAD + '"/><path class="' + p + '-center" d="' + R.ROADC + '" style="fill:none;stroke:var(--ground);stroke-width:6;stroke-dasharray:28 26;opacity:.8"/>' +
      '<g class="' + p + '-hrt" transform="translate(556 432) scale(.55)">' + R.heart(p + '-h') + '</g>';
  },
  // the bus from behind, origin at the bottom centre, about 200 wide
  busBack(id) {
    return '<g class="' + id + '"><ellipse class="shade" cx="0" cy="0" rx="120" ry="16"/><rect class="metal" x="-90" y="-30" width="40" height="34" rx="10"/><rect class="metal" x="50" y="-30" width="40" height="34" rx="10"/>' +
      '<rect class="amber" x="-104" y="-250" width="208" height="232" rx="26"/><rect class="amber-dk" x="-104" y="-80" width="208" height="20"/>' +
      '<rect class="glass" x="-82" y="-226" width="164" height="96" rx="12"/><path class="light" opacity=".6" d="M-60 -140 L-20 -220 H0 L-40 -140Z"/>' +
      '<circle class="' + id + '-tl" cx="-78" cy="-40" r="12" style="fill:#D96C6C"/><circle class="' + id + '-tr" cx="78" cy="-40" r="12" style="fill:#D96C6C"/><rect class="metal" x="-110" y="-26" width="220" height="16" rx="8"/></g>';
  },
  // ---- the side view: the bus heading left, Ruth at the wheel in front, six passenger windows (k = 0 is the rightmost) ----
  WIN: [914, 792, 670, 548, 426, 304],
  busSide(p) {
    let s = '<g transform="translate(540 790) scale(1.12) translate(-540 -790)"><g class="' + p + '-bus"><ellipse class="shade" cx="540" cy="840" rx="500" ry="22"/><rect x="100" y="456" width="890" height="180" style="fill:color-mix(in srgb, var(--ground) 60%, white)"/>' +
      '<g transform="translate(170 712) scale(.72)">' + R.ruth(p + '-r', 'sit') + '</g>';
    R.WIN.forEach((x, k) => { s += '<g class="' + p + '-px' + k + '"><g transform="translate(' + (x - 2) + ' 566) scale(.58)">' + R.voice(p + '-v' + k) + '</g></g>'; });
    let holes = 'M110 470 h124 v150 h-124Z';
    R.WIN.forEach((x) => { holes += ' M' + (x - 54) + ' 470 h108 v140 h-108Z'; });
    s += '<path class="amber" style="fill-rule:evenodd" d="M126 430 H954 Q1000 430 1000 476 V724 Q1000 770 954 770 H126 Q80 770 80 724 V476 Q80 430 126 430Z ' + holes + '"/>' +
      '<rect class="amber-dk" x="80" y="660" width="920" height="26"/><rect class="slate" x="170" y="410" width="740" height="24" rx="10"/>' +
      '<path class="ink" style="stroke-width:6;opacity:.8" d="' + holes + '"/>' +
      '<circle class="light" cx="100" cy="720" r="16"/><rect x="986" y="700" width="14" height="40" rx="6" style="fill:#D96C6C"/>' +
      '<path class="ink" style="stroke-width:5;opacity:.5" d="M240 640 V760"/>';
    [250, 840].forEach((x, k) => { s += '<circle class="shade" cx="' + x + '" cy="770" r="76"/><g class="' + p + '-wh' + k + '" transform="translate(' + x + ' 770)"><circle class="metal" r="64"/><circle class="slate" r="28"/><path class="light" opacity=".5" d="M0 -28 V28 M-28 0 H28" style="stroke:var(--ground);stroke-width:6"/></g>'; });
    return s + '</g></g>';
  },
  // a window's centre in stage coordinates (the side-view bus is drawn at 1.12)
  wx(k) { return 540 + (R.WIN[k] - 540) * 1.12; }, WTOP: 432,
  // sky, hills, trees and the road for the side view; id-far, id-trees, id-dash scroll as the bus drives
  roadSide(p) {
    const far = 'M0 470 C180 410 360 448 540 440 C720 432 900 410 1080 470', near = 'M0 620 C220 576 470 620 720 598 C880 586 980 600 1080 620';
    const two = (d, cls, y1) => '<path class="' + cls + '" d="' + d + ' V1080 H0Z"/><path class="' + cls + '" transform="translate(-1080 0)" d="' + d + ' V1080 H0Z"/>';
    let trees = '';
    [120, 460, 700, 950].forEach((x) => { [0, -1080].forEach((o) => { trees += '<g transform="translate(' + (x + o) + ' 640)"><rect class="wood" x="-8" y="-40" width="16" height="50" rx="6"/><circle class="leaf" cy="-80" r="56"/><circle class="leaf-lt" cx="-16" cy="-96" r="22" opacity=".6"/></g>'; }); });
    let dash = '';
    for (let x = -160; x < 1240; x += 160) dash += '<rect x="' + x + '" y="922" width="90" height="12" rx="6" style="fill:var(--ground);opacity:.85"/>';
    return '<rect class="sky" width="1080" height="1080"/><g class="' + p + '-far">' + two(far, 'hill-far') + '</g><g class="' + p + '-near">' + two(near, 'hill-near') + '</g><g class="' + p + '-trees">' + trees + '</g>' +
      '<rect class="road" x="0" y="790" width="1080" height="290"/><rect class="road-dk" x="0" y="790" width="1080" height="12"/><g class="' + p + '-dash">' + dash + '</g>';
  },
  // scroll the side-view scenery for a bus moving left at speed v (px/s)
  scroll(o, t, v) {
    const m = (x, P) => ((x % P) + P) % P;
    o.far.setAttribute('transform', 'translate(' + m(t * v * 0.15, 1080) + ' 0)');
    o.near.setAttribute('transform', 'translate(' + m(t * v * 0.35, 1080) + ' 0)');
    o.trees.setAttribute('transform', 'translate(' + m(t * v * 0.5, 1080) + ' 0)');
    o.dash.setAttribute('transform', 'translate(' + m(t * v, 160) + ' 0)');
    [o.wh0, o.wh1].forEach((w, k) => w && w.setAttribute('transform', 'translate(' + [250, 840][k] + ' 770) rotate(' + (-t * v * 0.9) + ')'));
  },
  // everything a side-view scene animates: scenery, wheels, Ruth, the six passengers (o.v[k], o.px[k])
  sideRefs(kit, p) {
    const q = (n) => kit.stage.querySelector('.' + p + '-' + n);
    const o = { far: q('far'), near: q('near'), trees: q('trees'), dash: q('dash'), wh0: q('wh0'), wh1: q('wh1'), bus: q('bus'), reyes: q('r-eyes'), rmouth: q('r-mouth'), rhead: q('r-head') };
    o.px = R.WIN.map((x, k) => q('px' + k)); o.v = R.WIN.map((x, k) => R.voiceRefs(kit, p + '-v' + k));
    return o;
  },
  // pop a passenger group in (1) or out (0) of its window, with a little bounce
  popIn(g, x, p) { const s = p <= 0 ? 0.001 : p >= 1 ? 1 : p; g.setAttribute('transform', 'translate(' + x + ' 560) scale(' + s + ') translate(' + -x + ' -560)'); g.style.opacity = p > 0 ? 1 : 0; },
  // a passenger's mood: 'warm' (pleasant) or 'grey' (hard), loud = mouth open
  mood(v, warm, loud) {
    v.warm.setAttribute('opacity', warm); v.mouth.setAttribute('d', loud ? 'M-4 -2 Q10 26 24 -2 Q10 6 -4 -2Z' : warm > 0.5 ? 'M-4 2 Q10 14 24 2' : 'M-2 6 Q10 2 22 6');
    v.mouth.style.fill = loud ? 'var(--second)' : 'none';
  },
  voiceRefs(kit, id) { const q = (n) => kit.stage.querySelector('.' + id + '-' + n); return { g: q('voice'), warm: q('warm'), mouth: q('mouth'), eyes: q('eyes') }; },
  // ---- the cab: over Ruth's shoulder, through the windshield; id-route, id-hrt, id-mir (mirror), id-nav (phone), id-hands ----
  cab(p, o) {
    o = o || {};
    let s = '<rect width="1080" height="1080" class="cab"/><clipPath id="' + p + '-ws"><rect x="60" y="60" width="960" height="600" rx="44"/></clipPath>' +
      '<g clip-path="url(#' + p + '-ws)"><g class="' + p + '-view" transform="translate(60 -111) scale(.889)">' + R.roadLand(p) +
      '<path class="' + p + '-route" pathLength="1" d="' + R.ROADC + '" style="fill:none;stroke:var(--accent);stroke-width:16;stroke-linecap:round;opacity:0"/></g></g>' +
      '<rect x="60" y="60" width="960" height="600" rx="44" style="fill:none;stroke:color-mix(in srgb, var(--second) 85%, var(--ground));stroke-width:22"/>';
    if (o.mirror) {
      s += '<g class="' + p + '-mir"><rect class="metal" x="776" y="84" width="220" height="104" rx="26"/><clipPath id="' + p + '-mc"><rect x="788" y="96" width="196" height="80" rx="18"/></clipPath><rect class="glass" x="788" y="96" width="196" height="80" rx="18"/>' +
        '<g clip-path="url(#' + p + '-mc)">' + [0, 1, 2].map((k) => '<g class="' + p + '-mq' + k + '"><g transform="translate(' + (834 + k * 54) + ' 150) scale(.3)">' + R.voice(p + '-m' + k) + '</g></g>').join('') + '</g></g>';
    }
    s += '<path class="slate-dk" d="M0 650 Q540 600 1080 650 V1080 H0Z"/><path class="slate" d="M0 670 Q540 624 1080 670 V700 Q540 654 0 700Z" opacity=".6"/>';
    if (o.nav) {
      s += '<g class="' + p + '-nav"><rect class="metal" x="730" y="596" width="250" height="160" rx="20"/><rect x="744" y="610" width="222" height="132" rx="10" style="fill:color-mix(in srgb, var(--main) 14%, white)"/>' +
        '<path class="' + p + '-nr" pathLength="1" d="M770 724 C820 700 790 660 850 650 C900 640 900 630 930 628" style="fill:none;stroke:var(--main);stroke-width:8;stroke-linecap:round;stroke-dasharray:1 1"/>' +
        '<circle cx="770" cy="724" r="10" class="amber"/><g transform="translate(934 630) scale(.32)">' + R.heart(p + '-nh') + '</g></g>';
    }
    // the wheel, Ruth from behind, her hands on the wheel
    s += '<circle cx="430" cy="860" r="210" style="fill:none;stroke:var(--second);stroke-width:30"/><circle cx="430" cy="860" r="210" style="fill:none;stroke:color-mix(in srgb, var(--second) 60%, var(--ground));stroke-width:8"/>' +
      '<g class="' + p + '-ruth"><path class="knit" d="M150 1080 C160 930 250 868 430 860 C610 868 700 930 710 1080Z"/><path class="knit-dk" opacity=".5" d="M430 860 C610 868 700 930 710 1080 H640 C630 960 560 900 430 880Z"/>' +
      '<rect class="skin-dk" x="396" y="790" width="68" height="80" rx="20"/>' +
      '<g class="' + p + '-head"><ellipse class="skin-dk" cx="326" cy="720" rx="22" ry="36"/><ellipse class="skin-dk" cx="534" cy="720" rx="22" ry="36"/>' +
      '<ellipse class="hair-dk" cx="430" cy="700" rx="112" ry="122"/><path class="hair" d="M330 700 C326 620 380 590 430 590 C480 590 534 620 530 700 C500 670 470 660 430 660 C390 660 360 670 330 700Z"/>' +
      '<path class="ink" style="stroke-width:4;opacity:.25" d="M400 600 C392 660 392 740 404 800 M460 600 C470 660 470 740 456 800"/><path class="ink" style="stroke-width:7;opacity:.7" d="M318 704 L250 696 M542 704 L610 696"/></g></g>' +
      '<g class="' + p + '-hands"><path style="fill:none;stroke:var(--main);stroke-width:64;stroke-linecap:round" d="M250 990 L236 780 M610 990 L624 780"/>' +
      '<ellipse class="skin" cx="234" cy="760" rx="38" ry="34"/><ellipse class="skin" cx="626" cy="760" rx="38" ry="34"/></g>';
    return s;
  },
  // ---- inside the bus, from the windshield looking back: Ruth at the wheel on the left, passengers behind (id-q0..3) ----
  QS: [[800, 640, 1.2], [640, 440, 0.6], [910, 450, 0.7], [760, 340, 0.45]],
  busFront(p) {
    let s = '<rect width="1080" height="1080" class="wall-lo"/><path class="slate" opacity=".35" d="M0 0 H1080 V150 L780 230 H300 L0 150Z"/>' +
      '<path class="glass" d="M0 170 L290 240 V430 L0 470Z M1080 170 L790 240 V430 L1080 470Z"/><rect class="glass" x="380" y="250" width="320" height="170" rx="20"/><path class="light" opacity=".5" d="M420 400 L480 266 H510 L450 400Z"/>' +
      '<path class="road" d="M300 560 H780 L1080 1080 H0Z" opacity=".55"/>';
    R.QS.slice().reverse().forEach(([x, y, k], i) => {
      const j = R.QS.length - 1 - i;
      s += '<rect class="slate-dk" x="' + (x - 110 * k) + '" y="' + (y - 40 * k) + '" width="' + 220 * k + '" height="' + 210 * k + '" rx="' + 30 * k + '"/>' +
        '<g class="' + p + '-q' + j + '"><g transform="translate(' + x + ' ' + y + ') scale(' + k + ')">' + R.voice(p + '-v' + j) + '</g></g>' +
        '<rect class="slate" x="' + (x - 120 * k) + '" y="' + (y + 60 * k) + '" width="' + 240 * k + '" height="' + 60 * k + '" rx="' + 20 * k + '"/>';
    });
    s += '<rect class="slate-dk" x="150" y="520" width="300" height="420" rx="40"/><g class="' + p + '-rr" transform="translate(300 940) scale(1.1)"><g class="' + p + '-body">' + R.ruth(p, 'sit') + '</g></g>' +
      '<path class="slate-dk" d="M0 970 Q300 930 620 980 V1080 H0Z"/><path class="ink" style="stroke-width:20" d="M320 990 L340 940"/>' +
      '<ellipse cx="320" cy="905" rx="170" ry="56" style="fill:none;stroke:var(--second);stroke-width:22"/>';
    return s;
  },
  // a signpost by the road with a program activity on it: 0 walking, 1 a hand, 2 speaking, 3 the app
  sign(id, k) {
    const g = [
      '<circle class="ink" style="fill:var(--second);stroke:none" cx="4" cy="-38" r="12"/><path class="ink" style="stroke-width:12" d="M0 -20 L-6 14 L-24 44 M-6 14 L14 44 M-2 -12 L-26 6 M0 -12 L24 0"/>',
      '<path class="skin" style="stroke:var(--second);stroke-width:6;stroke-linejoin:round" d="M-26 40 L-30 -6 Q-30 -16 -22 -16 Q-14 -16 -14 -6 V-32 Q-14 -42 -6 -42 Q2 -42 2 -32 V-38 Q2 -48 10 -48 Q18 -48 18 -38 V-30 Q18 -40 26 -40 Q34 -40 34 -30 V14 Q34 40 10 44Z"/>',
      '<circle class="skin" style="stroke:var(--second);stroke-width:6" cx="-12" cy="0" r="30"/><path class="ink" style="stroke-width:6" d="M-6 10 q8 4 14 -2"/><path class="ink" style="stroke:var(--accent);stroke-width:7" d="M28 -16 q12 16 0 32 M42 -28 q22 28 0 56"/>',
      '<rect x="-24" y="-44" width="48" height="88" rx="10" style="fill:var(--second)"/><rect x="-17" y="-34" width="34" height="62" rx="5" style="fill:color-mix(in srgb, var(--main) 20%, white)"/><circle class="amber" cx="0" cy="-4" r="9"/>',
    ][k];
    return '<g class="' + id + '"><rect class="wood" x="-7" y="0" width="14" height="150" rx="6"/><circle class="shade" cx="4" cy="6" r="74"/><circle r="74" style="fill:color-mix(in srgb, var(--ground) 40%, white);stroke:var(--second);stroke-width:6"/>' + g + '</g>';
  },
});
