// Ruth's living room, Ruth herself, the spark and the scale: drawn once, reused by every scene so the world never changes between cuts.
// Stage is 1080 square. Effort sits on the RIGHT pan (where a Hebrew reader starts), reward on the LEFT.
window.CAPTIONS = true; // review captions; set false before exporting for the app, which shows its own
window.R = {
  PIV: [540, 175], ARM: 290,
  room(o) {
    o = o || {};
    let s = '<rect class="wall-lo" x="0" y="650" width="1080" height="210"/><rect class="shade" x="0" y="646" width="1080" height="6"/>' +
      '<rect class="floor" x="0" y="860" width="1080" height="220"/><rect class="floor-dk" x="0" y="860" width="1080" height="12"/>' +
      '<path class="floor-dk" opacity=".35" d="M0 940 H1080 V946 H0Z M0 1020 H1080 V1026 H0Z"/>' +
      '<rect class="wood-lt" x="62" y="322" width="246" height="236" rx="14"/><rect class="glass" x="80" y="340" width="210" height="200" rx="6"/>' +
      '<path class="light" opacity=".7" d="M100 520 L170 360 H200 L130 520Z"/><path class="wood-lt" d="M182 340 h8 v200 h-8Z M80 436 h210 v8 h-210Z"/>' +
      '<rect class="wood" x="52" y="552" width="266" height="16" rx="8"/>' +
      '<path class="knit-lt" d="M248 300 C276 380 262 470 300 590 L320 590 L322 300Z"/>';
    if (o.clock) s += '<g class="' + o.clock + '"><circle class="light" cx="540" cy="250" r="52"/><circle class="ink" cx="540" cy="250" r="52"/><circle class="metal" cx="540" cy="250" r="6"/></g>';
    if (o.open) s += '<rect class="amber-lt" x="820" y="450" width="190" height="410" rx="6"/><path class="light" opacity=".8" d="M820 860 L1010 860 L1080 1080 L700 1080Z"/><path class="wood" d="M820 450 L760 476 L760 860 L820 860Z"/>';
    else s += '<rect class="wood" x="820" y="450" width="190" height="410" rx="6"/><rect class="wood-lt" opacity=".55" x="848" y="482" width="134" height="150" rx="6"/><rect class="wood-lt" opacity=".55" x="848" y="660" width="134" height="170" rx="6"/><circle class="amber" cx="846" cy="668" r="10"/>';
    if (o.shoes !== false) s += '<g class="' + (o.shoes || 'shoes') + '">' + R.shoe(726, 858) + R.shoe(772, 860) + '</g>';
    if (o.plant !== false) s += R.plant();
    return s;
  },
  shoe(x, y) { return '<path class="slate-dk" d="M' + x + ' ' + y + ' q0 -26 22 -28 q14 0 18 12 l20 6 q10 4 8 10 Z"/><rect class="light" opacity=".5" x="' + (x + 6) + '" y="' + (y - 3) + '" width="56" height="3"/>'; },
  plant() {
    return '<g class="plant"><ellipse class="shade" cx="130" cy="862" rx="62" ry="10"/>' +
      '<path class="leaf" d="M130 770 C90 720 70 690 64 640 C100 660 122 700 130 770Z M130 770 C150 700 180 670 214 650 C206 700 172 740 130 770Z M130 770 C120 700 124 650 140 600 C156 650 150 710 130 770Z"/>' +
      '<path class="leaf-lt" d="M130 770 C108 730 96 700 92 668 C116 690 126 724 130 770Z"/>' +
      '<path class="amber-dk" d="M84 770 H176 L164 860 H96Z"/><rect class="amber" x="78" y="764" width="104" height="22" rx="6"/></g>';
  },
  chair() {
    return '<ellipse class="shade" cx="520" cy="864" rx="230" ry="16"/><rect class="chair-dk" x="352" y="820" width="18" height="42" rx="6"/><rect class="chair-dk" x="670" y="820" width="18" height="42" rx="6"/>' +
      '<path class="chair" d="M360 820 V600 Q360 552 410 552 H630 Q680 552 680 600 V820Z"/><path class="chair-dk" opacity=".45" d="M630 552 Q680 552 680 600 V820 H640 V600 Q640 566 630 552Z"/>' +
      '<rect class="chair" x="318" y="690" width="78" height="140" rx="34"/><rect class="chair" x="644" y="690" width="78" height="140" rx="34"/>' +
      '<rect class="chair-dk" x="380" y="736" width="280" height="90" rx="26"/>';
  },
  // Ruth, drawn around a local origin. pose: sit (origin = hips on the seat), stand / step / water (origin = between the feet), bend (origin = feet).
  ruth(id, pose) {
    const head = '<g class="' + id + '-head"><path class="hair-dk" d="M-58 -10 C-66 -70 -30 -102 4 -100 C44 -98 66 -66 58 -6 C56 18 44 30 36 34 L-40 34 C-52 26 -56 12 -58 -10Z"/>' +
      '<ellipse class="skin" cx="0" cy="-4" rx="44" ry="50"/><path class="hair" d="M-48 -16 C-48 -72 -6 -92 24 -84 C52 -76 58 -44 52 -22 C30 -44 -6 -54 -48 -16Z"/>' +
      '<g class="' + id + '-eyes"><circle class="metal" cx="-16" cy="-2" r="5"/><circle class="metal" cx="18" cy="-2" r="5"/></g>' +
      '<circle class="ink" style="stroke-width:3.5" cx="-16" cy="-2" r="15"/><circle class="ink" style="stroke-width:3.5" cx="18" cy="-2" r="15"/><path class="ink" style="stroke-width:3.5" d="M-1 -4 h4"/>' +
      '<ellipse class="skin-dk" opacity=".6" cx="-26" cy="20" rx="9" ry="5"/><ellipse class="skin-dk" opacity=".6" cx="30" cy="20" rx="9" ry="5"/>' +
      '<path class="ink ' + id + '-mouth" style="stroke-width:4" d="M-10 26 Q2 32 14 26"/></g>';
    const torso = '<path class="knit" d="M-72 0 C-78 -60 -74 -120 -56 -150 Q-30 -168 0 -168 Q30 -168 56 -150 C74 -120 78 -60 72 0Z"/>' +
      '<path class="knit-dk" opacity=".55" d="M30 -166 Q56 -152 62 -120 C72 -70 74 -30 72 0 H40 C46 -60 44 -120 30 -166Z"/><path class="light" opacity=".85" d="M-16 -168 L0 -120 L16 -168Z"/>' +
      '<circle class="knit-lt" cx="0" cy="-100" r="5"/><circle class="knit-lt" cx="0" cy="-70" r="5"/><circle class="knit-lt" cx="0" cy="-40" r="5"/>';
    const neck = '<rect class="skin-dk" x="-14" y="-186" width="28" height="24" rx="8"/>';
    if (pose === 'sit') {
      return '<g class="' + id + '-ruth"><path class="skirt" d="M-66 -6 C-30 -16 70 -14 118 4 L126 40 C80 52 -40 50 -70 34Z"/>' +
        '<path class="skin" d="M96 30 h26 l6 84 h-26Z M60 34 h26 l4 82 h-26Z"/><path class="slate-dk" d="M58 112 h40 q14 0 16 12 h-56Z M96 110 h40 q14 0 16 12 h-56Z"/>' +
        torso.replace(/0Z"/, '0Z"') + neck + '<g transform="translate(0 -218)">' + head + '</g>' +
        '<path class="knit" d="M-66 -140 C-92 -90 -80 -40 -30 -10 L-10 -30 C-46 -50 -52 -96 -40 -128Z"/><path class="knit" d="M66 -140 C92 -90 84 -40 40 -12 L22 -30 C52 -50 56 -96 42 -128Z"/>' +
        '<ellipse class="skin" cx="-12" cy="-22" rx="20" ry="14"/><ellipse class="skin" cx="22" cy="-24" rx="20" ry="14"/></g>';
    }
    const legs = pose === 'step' ? '<path class="skin" d="M-36 -200 l24 0 l-30 196 h-24Z M12 -200 l24 0 l36 192 h-24Z"/>' + R.shoe(-74, 2).replace('slate-dk', 'slate-dk') + R.shoe(40, 2)
      : '<path class="skin" d="M-34 -200 h26 l-2 196 h-26Z M8 -200 h26 l2 196 h-26Z"/>' + R.shoe(-48, 2) + R.shoe(0, 2);
    const arms = pose === 'water'
      ? '<path class="knit" d="M-60 -330 C-84 -280 -82 -230 -70 -196 L-50 -200 C-60 -240 -58 -280 -42 -316Z"/><path class="knit" d="M58 -330 C96 -320 128 -300 150 -270 L134 -254 C112 -280 88 -296 52 -300Z"/>' +
        '<g class="' + id + '-can"><path class="main-can glass" d="M130 -272 h70 l-6 64 h-58Z"/><path class="ink" style="stroke-width:4" d="M200 -258 L246 -236 M140 -272 q30 -30 54 0"/><rect class="knit-dk" x="130" y="-276" width="70" height="10" rx="4"/></g>'
      : '<path class="knit" d="M-60 -330 C-84 -280 -82 -230 -70 -196 L-50 -200 C-60 -240 -58 -280 -42 -316Z"/><path class="knit" d="M60 -330 C84 -280 82 -230 70 -196 L50 -200 C60 -240 58 -280 42 -316Z"/><ellipse class="skin" cx="-62" cy="-192" rx="14" ry="16"/><ellipse class="skin" cx="62" cy="-192" rx="14" ry="16"/>';
    const body = '<g transform="translate(0 -200)"><path class="skirt" d="M-64 -40 L64 -40 L80 40 L-80 40Z"/>' + torso.replace(/-168/g, '-168') + '</g>';
    const lean = pose === 'bend' ? ' transform="rotate(24 0 -200)"' : '';
    return '<g class="' + id + '-ruth"><ellipse class="shade" cx="0" cy="4" rx="80" ry="10"/>' + legs + '<g' + lean + '>' + body.replace('translate(0 -200)', 'translate(0 -200)') +
      '<g transform="translate(0 -200)">' + neck.replace('-186', '-186') + '</g><g transform="translate(0 -418)">' + head + '</g>' + arms + '</g></g>';
  },
  spark(id) {
    return '<g class="' + id + '-spark"><circle class="' + id + '-ring ink" style="stroke-width:4;stroke-dasharray:10 12" r="40"/>' +
      '<circle class="' + id + '-glow amber-lt" r="64" opacity=".5"/><path class="' + id + '-star amber" d="M0 -46 C6 -12 12 -6 46 0 C12 6 6 12 0 46 C-6 12 -12 6 -46 0 C-12 -6 -6 -12 0 -46Z"/></g>';
  },
  scale(id, right, left) {
    const pan = (k, items) => '<g class="' + id + '-pan' + k + '"><path class="ink" style="stroke-width:3" d="M0 0 L-92 150 M0 0 L92 150"/>' + (items || '') +
      '<path class="' + (k === 'R' ? 'slate' : 'amber') + '" d="M-110 150 H110 Q100 196 0 198 Q-100 196 -110 150Z"/><path class="' + (k === 'R' ? 'slate-dk' : 'amber-dk') + '" d="M-110 150 H110 Q108 160 104 166 H-104 Q-108 160 -110 150Z"/></g>';
    return '<g class="' + id + '-scale"><path class="metal" d="M532 175 h16 l10 150 h-36Z"/><rect class="metal" x="496" y="320" width="88" height="16" rx="8"/>' +
      pan('R', right) + pan('L', left) +
      '<g class="' + id + '-beam"><rect class="metal" x="240" y="166" width="600" height="18" rx="9"/><circle class="amber" cx="540" cy="175" r="16"/><circle class="metal" cx="540" cy="175" r="7"/></g></g>';
  },
  // effort blocks and reward tokens, drawn relative to a pan's hang point
  block(cls, x, w, h, y) { y = y == null ? 150 : y; return '<g class="' + cls + '"><rect class="slate-dk" x="' + (x - w / 2) + '" y="' + (y - h) + '" width="' + w + '" height="' + h + '" rx="10"/><rect class="slate" x="' + (x - w / 2 + 6) + '" y="' + (y - h + 6) + '" width="' + (w - 12) + '" height="' + (h / 2 - 6) + '" rx="6"/></g>'; },
  token(cls, kind, x, r) {
    const c = '<g class="' + cls + '"><g transform="translate(' + x + ' ' + (150 - r) + ')">';
    if (kind === 'heart') return c + '<path class="amber-dk" d="M0 ' + (r * .8) + ' C' + (-r * 1.3) + ' 0 ' + (-r * .7) + ' ' + (-r * 1.1) + ' 0 ' + (-r * .4) + ' C' + (r * .7) + ' ' + (-r * 1.1) + ' ' + (r * 1.3) + ' 0 0 ' + (r * .8) + 'Z"/></g></g>';
    if (kind === 'talk') return c + '<path class="light" d="M' + (-r) + ' ' + (-r * .7) + ' h' + (2 * r) + ' v' + (r * 1.2) + ' h' + (-r) + ' l' + (-r * .5) + ' ' + (r * .5) + ' v' + (-r * .5) + ' h' + (-r * .5) + 'Z"/><circle class="metal" cx="' + (-r * .4) + '" cy="' + (-r * .1) + '" r="' + (r * .12) + '"/><circle class="metal" cx="0" cy="' + (-r * .1) + '" r="' + (r * .12) + '"/><circle class="metal" cx="' + (r * .4) + '" cy="' + (-r * .1) + '" r="' + (r * .12) + '"/></g></g>';
    if (kind === 'compass') return c + '<circle class="leaf-lt" r="' + r + '"/><circle class="ink" style="stroke-width:4" r="' + r + '"/><path class="amber-dk" d="M0 ' + (-r * .75) + ' L' + (r * .22) + ' 0 L0 ' + (r * .75) + ' L' + (-r * .22) + ' 0Z"/></g></g>';
    return c + '<circle class="amber-lt" r="' + r + '"/><circle class="amber" r="' + (r * .55) + '"/></g></g>';
  },

  // the scale lives in a thought bubble above Ruth: a soft cloud behind it keeps the room quiet
  cloud(cls) {
    return '<g class="' + cls + '"><path class="shade" transform="translate(0 10)" d="M130 520 C60 520 36 446 80 404 C26 360 48 262 126 252 C114 150 220 96 300 126 C352 50 474 40 540 82 C606 40 730 50 780 126 C862 96 968 150 956 252 C1034 262 1054 360 1000 404 C1044 446 1020 520 950 520Z"/>' +
      '<path class="light" opacity=".92" d="M130 520 C60 520 36 446 80 404 C26 360 48 262 126 252 C114 150 220 96 300 126 C352 50 474 40 540 82 C606 40 730 50 780 126 C862 96 968 150 956 252 C1034 262 1054 360 1000 404 C1044 446 1020 520 950 520Z"/></g>';
  },
  // Ruth's head in side profile, facing right, with the top of the skull cut away to show the brain.
  // Inside sits the "spark-maker": a light bulb wired into the brain. Classes: p-brain, p-nerves, p-bulb, plus R.spark(p) parts.
  profile(p) {
    const skull = 'M246 520 C226 330 360 170 540 168 C700 166 812 262 826 398 C832 452 818 496 842 540 L874 600 C882 616 872 628 856 630 L842 632 C848 646 846 660 836 666 C842 678 838 694 824 700 C826 734 808 760 776 764 C720 790 640 800 580 788 C500 772 430 740 384 700 C310 640 254 590 246 520Z';
    return '<rect width="1080" height="1080" style="fill:color-mix(in srgb, var(--main) 14%, var(--ground))"/>' +
      '<circle cx="540" cy="520" r="470" style="fill:color-mix(in srgb, var(--ground) 70%, white)"/>' +
      '<path class="skin" d="' + skull + '"/>' +
      '<path class="skin-dk" opacity=".55" d="M384 700 C310 640 254 590 246 520 C244 470 250 420 262 380 C290 540 370 660 500 730 C580 770 690 772 776 764 C720 790 640 800 580 788 C500 772 430 740 384 700Z"/>' +
      // ear and the arm of her glasses
      '<path class="skin-dk" d="M470 520 C430 500 404 540 414 590 C422 630 452 652 482 640 C474 600 476 560 470 520Z"/><path class="ink" style="stroke-width:4;opacity:.5" d="M452 548 C436 566 440 604 458 620"/>' +
      '<path class="ink" style="stroke-width:9" d="M470 530 L760 512"/>' +
      // hair: a soft grey bob over the back and top of the head
      '<path class="hair" d="M232 560 C200 360 330 150 540 140 C700 132 820 220 846 360 C780 300 700 280 640 300 C520 260 400 330 360 470 C340 560 360 660 410 720 C330 720 250 660 232 560Z"/>' +
      '<path class="hair-dk" opacity=".55" d="M232 560 C220 470 236 390 270 320 C270 450 300 580 380 700 C320 690 250 640 232 560Z"/>' +
      '<path class="ink" style="stroke-width:4;opacity:.18" d="M300 300 C340 250 400 220 470 210 M280 420 C300 360 340 320 400 290 M700 200 C760 220 800 260 820 310"/>' +
      // face: brow, eye behind the lens, glasses, mouth and cheek
      '<path class="ink" style="stroke-width:8" d="M748 464 C770 452 796 452 814 462"/>' +
      '<ellipse class="' + p + '-eye metal" cx="790" cy="512" rx="9" ry="10"/>' +
      '<ellipse class="light" opacity=".28" cx="786" cy="514" rx="44" ry="40"/><ellipse class="ink" style="stroke-width:8" cx="786" cy="514" rx="44" ry="40"/>' +
      '<path class="ink" style="stroke-width:6" d="M806 690 C820 692 830 690 836 684"/>' +
      '<ellipse class="skin-dk" opacity=".6" cx="740" cy="600" rx="34" ry="20"/>' +
      // the cutaway: skull rim, a dark cavity, and the brain inside
      '<g class="' + p + '-cut"><clipPath id="' + p + '-clip"><ellipse cx="510" cy="370" rx="218" ry="166"/></clipPath>' +
      '<ellipse cx="510" cy="370" rx="234" ry="182" style="fill:color-mix(in srgb, var(--ground) 55%, white)"/>' +
      '<ellipse cx="510" cy="370" rx="218" ry="166" style="fill:color-mix(in srgb, var(--second) 78%, var(--main))"/>' +
      '<g clip-path="url(#' + p + '-clip)"><g transform="translate(510 368) scale(.93) translate(-530 -380)"><g class="' + p + '-brain">' +
      '<path class="amber-lt" d="M330 410 C318 320 390 240 490 232 C570 222 660 252 706 316 C738 360 734 418 708 446 C716 480 690 506 654 500 C632 528 578 532 548 510 C516 532 462 530 444 504 C404 518 352 502 346 466 C332 452 328 432 330 410Z"/>' +
      '<path class="amber-lt" style="fill:color-mix(in srgb, var(--accent) 52%, var(--ground))" d="M372 470 C352 492 360 528 392 538 C424 548 456 534 462 512 C430 520 396 504 372 470Z"/>' +
      '<path class="amber-dk" opacity=".45" d="M548 510 C556 540 552 570 540 590 L520 590 C526 566 526 536 514 512Z"/>' +
      '<path style="fill:none;stroke:color-mix(in srgb, var(--accent) 70%, var(--second));stroke-width:5;stroke-linecap:round;opacity:.55" d="M392 330 C420 300 460 296 488 318 C510 290 556 286 584 306 M620 290 C650 300 676 326 684 356 M360 400 C392 384 430 392 448 420 C470 396 510 396 530 418 M560 380 C596 360 640 370 664 400 M440 470 C470 452 506 458 520 482 M590 452 C620 440 652 450 668 472 M380 486 C398 496 424 500 444 494 M392 520 C410 526 430 526 446 520"/>' +
      '</g>' +
      '<path class="' + p + '-nerves" style="fill:none;stroke:var(--accent);stroke-width:5;stroke-linecap:round;stroke-dasharray:2 16" d="M528 360 C480 330 430 320 392 330 M548 360 C590 320 640 310 680 330 M520 400 C470 420 430 440 404 470 M556 404 C600 420 640 440 664 464"/>' +
      // the spark-maker: a light bulb wired into the brain
      '<g class="' + p + '-bulb"><ellipse class="shade" cx="540" cy="452" rx="40" ry="8"/>' +
      '<path class="metal" d="M516 404 h48 v14 h-48Z M520 420 h40 v10 h-40Z M526 432 h28 v12 h-28Z"/>' +
      '<circle cx="540" cy="354" r="58" style="fill:color-mix(in srgb, var(--ground) 40%, white);opacity:.9"/>' +
      '<path class="ink" style="stroke-width:5" d="M498 394 C474 372 470 334 492 312 C520 284 564 286 588 314 C608 340 604 374 582 394 L564 404 L516 404Z"/>' +
      '<g transform="translate(540 352) scale(.62)">' + R.spark(p) + '</g>' +
      '<path class="ink" style="stroke-width:3;opacity:.45" d="M528 404 L530 376 M552 404 L550 376"/></g></g></g>' +
      '<ellipse cx="510" cy="370" rx="234" ry="182" style="fill:none;stroke:var(--second);stroke-width:6;opacity:.85"/></g>';
  },
  refs(kit, id, names) { const o = {}; for (const n of names) o[n] = kit.stage.querySelector('.' + id + '-' + n); return o; },
  // tilt the beam by deg (positive: effort side down); pans hang straight with a little swing
  setScale(r, deg, swing) {
    const [px, py] = R.PIV, a = deg * Math.PI / 180, c = Math.cos(a) * R.ARM, s = Math.sin(a) * R.ARM, w = swing || 0;
    r.beam.setAttribute('transform', 'rotate(' + deg + ' ' + px + ' ' + py + ')');
    r.panR.setAttribute('transform', 'translate(' + (px + c) + ' ' + (py + s) + ') rotate(' + w + ')');
    r.panL.setAttribute('transform', 'translate(' + (px - c) + ' ' + (py - s) + ') rotate(' + w + ')');
    return { R: [px + c, py + s + 200], L: [px - c, py - s + 200] };
  },
  place(el, x, y, o) { el.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,0)'; if (o != null) el.style.opacity = o; },
  blink(eyes, t, off) { const p = ((t + (off || 0)) % 4.1); eyes.setAttribute('transform', p > 3.95 ? 'translate(0 -2) scale(1 .15)' : ''); },
  caption(kit, text) { if (window.CAPTIONS) kit.stage.append(kit.h('<p class="cap">' + text + '</p>')); },
  // ---- session 1: the path, the backpack, Nira, the tools ----
  PATH: [[540, 1000, 130], [462, 880, 104], [560, 790, 86], [496, 716, 70], [562, 656, 58], [516, 606, 48], [566, 566, 40], [532, 534, 32], [560, 508, 26], [544, 488, 20], [556, 472, 16]],
  stone(cls, x, y, r) {
    return '<g class="' + cls + '"><ellipse class="stone-dk" cx="' + x + '" cy="' + (y + r * 0.1) + '" rx="' + r + '" ry="' + (r * 0.4) + '"/><ellipse class="stone ' + cls + '-top" cx="' + x + '" cy="' + y + '" rx="' + (r * 0.96) + '" ry="' + (r * 0.34) + '"/>' +
      '<ellipse class="light" opacity=".45" cx="' + (x - r * 0.25) + '" cy="' + (y - r * 0.1) + '" rx="' + (r * 0.4) + '" ry="' + (r * 0.1) + '"/></g>';
  },
  land(p, o) {
    o = o || {};
    let s = '<rect class="sky" width="1080" height="1080"/>' +
      '<circle class="' + p + '-sun" cx="' + (o.sunX || 820) + '" cy="' + (o.sunY || 300) + '" r="70" style="fill:var(--accent);opacity:' + (o.sun ? 1 : 0) + '"/>' +
      '<path class="hill-far" d="M0 470 C180 410 360 448 540 440 C730 430 900 392 1080 446 V1080 H0Z"/>' +
      '<path class="hill-near" d="M0 600 C220 556 470 600 720 578 C880 566 980 556 1080 584 V1080 H0Z"/>' +
      '<path class="grass" d="M0 780 C260 740 560 770 820 750 C930 742 1010 744 1080 756 V1080 H0Z"/>' +
      '<g class="' + p + '-tufts"><path class="hill-near" d="M120 840 l10 -30 l8 30 l10 -24 l6 24Z M900 860 l10 -30 l8 30 l10 -24 l6 24Z M260 980 l10 -30 l8 30 l10 -24 l6 24Z M820 1000 l10 -30 l8 30 l10 -24 l6 24Z"/></g>';
    R.PATH.forEach(([x, y, r], k) => { s += R.stone(p + '-st' + k, x, y, r); });
    return s;
  },
  // a backpack worn by a front-facing figure: the bag shows behind her, the straps in front
  BAG: [170, 1060],
  PILE: [[118, 958], [196, 964], [156, 928], [232, 932]],
  weight() { return '<ellipse class="shade" cx="0" cy="34" rx="46" ry="10"/><ellipse class="weight-dk" cx="0" cy="6" rx="44" ry="34"/><ellipse class="weight" cx="0" cy="0" rx="42" ry="32"/><ellipse class="light" opacity=".35" cx="-12" cy="-12" rx="14" ry="6"/>'; },
  bagDown(id) { return '<g class="' + id + '-bagdown" transform="translate(' + R.BAG[0] + ' ' + R.BAG[1] + ') rotate(6) scale(.8)">' + R.packBehind(id) + '</g>'; },
  pile(id) { return '<g class="' + id + '-pile">' + R.PILE.map(([x, y]) => '<g transform="translate(' + x + ' ' + y + ') scale(.6)">' + R.weight() + '</g>').join('') + '</g>'; },
  packBehind(id) {
    return '<g class="' + id + '-pack"><rect class="pack-dk" x="-112" y="-424" width="224" height="238" rx="46"/><rect class="pack" x="-104" y="-430" width="208" height="226" rx="42"/><rect class="pack-lt" opacity=".5" x="-80" y="-422" width="160" height="40" rx="18"/></g>';
  },
  straps(id) {
    return '<g class="' + id + '-straps"><path class="pack-dk" d="M-58 -368 C-66 -330 -66 -290 -60 -246 L-44 -246 C-48 -290 -48 -330 -40 -366Z M58 -368 C66 -330 66 -290 60 -246 L44 -246 C48 -290 48 -330 40 -366Z"/></g>';
  },
  // the same bag seen through: a soft outline over her body with the four heavy stones inside
  packX(id) {
    const w = (k, x, y) => '<g class="' + id + '-w' + k + '"><ellipse class="weight-dk" cx="' + x + '" cy="' + (y + 6) + '" rx="40" ry="32"/><ellipse class="weight" cx="' + x + '" cy="' + y + '" rx="38" ry="30"/><ellipse class="light" opacity=".35" cx="' + (x - 12) + '" cy="' + (y - 10) + '" rx="14" ry="6"/></g>';
    return '<g class="' + id + '-xray"><rect x="-104" y="-370" width="208" height="226" rx="42" style="fill:color-mix(in srgb, var(--ground) 30%, white);opacity:.8"/>' +
      '<rect x="-104" y="-370" width="208" height="226" rx="42" style="fill:none;stroke:var(--second);stroke-width:5;stroke-dasharray:14 10"/>' +
      w(0, -48, -310) + w(1, 48, -310) + w(2, -48, -216) + w(3, 48, -216) + '</g>';
  },
  // Ruth seen from behind, walking up the path, her backpack on her back
  ruthBack(id, step) {
    const legs = step ? '<path class="skin" d="M-36 -200 l24 0 l-14 196 h-24Z M12 -200 l24 0 l20 192 h-24Z"/>' + R.shoe(-62, 2) + R.shoe(20, 0)
      : '<path class="skin" d="M-34 -200 h26 l-2 196 h-26Z M8 -200 h26 l2 196 h-26Z"/>' + R.shoe(-48, 2) + R.shoe(0, 2);
    return '<g class="' + id + '-ruth"><ellipse class="shade" cx="0" cy="4" rx="80" ry="10"/>' + legs +
      '<path class="skirt" d="M-64 -240 L64 -240 L80 -160 L-80 -160Z"/>' +
      '<path class="knit" d="M-72 -200 C-78 -260 -74 -320 -56 -350 Q-30 -368 0 -368 Q30 -368 56 -350 C74 -320 78 -260 72 -200Z"/>' +
      '<path class="knit" d="M-60 -330 C-84 -280 -82 -230 -70 -196 L-50 -200 C-60 -240 -58 -280 -42 -316Z M60 -330 C84 -280 82 -230 70 -196 L50 -200 C60 -240 58 -280 42 -316Z"/>' +
      '<ellipse class="skin" cx="-62" cy="-192" rx="14" ry="16"/><ellipse class="skin" cx="62" cy="-192" rx="14" ry="16"/>' +
      '<g transform="translate(0 -418)"><ellipse class="skin-dk" cx="-46" cy="0" rx="10" ry="16"/><ellipse class="skin-dk" cx="46" cy="0" rx="10" ry="16"/>' +
      '<path class="hair-dk" d="M-50 10 C-60 -60 -30 -96 0 -96 C30 -96 60 -60 50 10 C40 34 -40 34 -50 10Z"/><path class="hair" d="M-44 0 C-50 -56 -24 -86 0 -86 C24 -86 50 -56 44 0 C30 18 -30 18 -44 0Z"/>' +
      '<path class="ink" style="stroke-width:3;opacity:.3" d="M-10 -80 C-14 -50 -14 -20 -10 6 M14 -78 C18 -50 18 -22 14 4"/></g>' +
      '<g class="' + id + '-pack"><rect class="pack-dk" x="-84" y="-372" width="168" height="196" rx="38"/><rect class="pack" x="-78" y="-378" width="156" height="186" rx="34"/>' +
      '<rect class="pack-dk" x="-58" y="-300" width="116" height="74" rx="20"/><rect class="pack-lt" opacity=".6" x="-58" y="-372" width="116" height="30" rx="14"/></g></g>';
  },
  // Nira, the psychologist whose voice we hear: drawn like Ruth, but younger, curly dark hair, amber top
  nira(id, pose) {
    let s = R.ruth(id, pose || 'stand');
    s = s.replace(/<circle class="ink" style="stroke-width:3.5"[^>]*r="15"\/>/g, '').replace('<path class="ink" style="stroke-width:3.5" d="M-1 -4 h4"/>', '');
    s = s.replace(/class="knit-lt"/g, 'class="nira-top-dk"').replace(/class="knit-dk"/g, 'class="nira-top-dk"').replace(/class="knit"/g, 'class="nira-top"')
      .replace(/class="skirt"/g, 'class="nira-pants"').replace(/class="hair-dk"/g, 'class="nira-hair-dk"').replace(/class="hair"/g, 'class="nira-hair"')
      .replace(/class="skin-dk"/g, 'class="nira-skin-dk"').replace(/class="skin"/g, 'class="nira-skin"');
    const curls = '<g class="nira-hair"><circle cx="-40" cy="-62" r="22"/><circle cx="-12" cy="-80" r="24"/><circle cx="20" cy="-78" r="22"/><circle cx="44" cy="-56" r="20"/><circle cx="-54" cy="-30" r="18"/><circle cx="54" cy="-26" r="16"/></g>';
    return s.replace('<g class="' + id + '-eyes">', curls + '<g class="' + id + '-eyes">');
  },
  niraBack(id, step) {
    return R.ruthBack(id, step).replace(/class="knit"/g, 'class="nira-top"').replace(/class="skirt"/g, 'class="nira-pants"').replace(/class="hair-dk"/g, 'class="nira-hair-dk"').replace(/class="hair"/g, 'class="nira-hair"')
      .replace(/class="skin-dk"/g, 'class="nira-skin-dk"').replace(/class="skin"/g, 'class="nira-skin"').replace(/<g class="[^"]*-pack">.*?<\/g><\/g>$/, '</g>');
  },
  // the five tools of the program, as round badges
  tool(cls, k, r) {
    r = r || 56;
    const fills = ['color-mix(in srgb, var(--main) 30%, var(--ground))', 'color-mix(in srgb, var(--main) 18%, var(--ground))', 'color-mix(in srgb, var(--accent) 30%, var(--ground))', 'color-mix(in srgb, var(--accent) 45%, var(--ground))', 'color-mix(in srgb, var(--main) 42%, var(--ground))'];
    const g = [
      '<path class="light" d="M-30 10 C-44 10 -44 -12 -28 -12 C-28 -30 -4 -34 4 -20 C16 -30 34 -20 30 -6 C42 -4 40 14 28 14Z"/><path class="ink" style="stroke-width:5" d="M-30 10 C-44 10 -44 -12 -28 -12 C-28 -30 -4 -34 4 -20 C16 -30 34 -20 30 -6 C42 -4 40 14 28 14 L-30 14"/><path class="ink" style="stroke-width:5" d="M-8 2 q8 -10 16 0"/>',
      '<path class="ink" style="stroke-width:6" d="M-30 -14 q10 -12 20 0 t20 0 t20 0 M-30 4 q10 -12 20 0 t20 0 t20 0 M-30 22 q10 -12 20 0 t20 0 t20 0"/>',
      '<path class="light" d="M-34 0 Q0 -30 34 0 Q0 30 -34 0Z"/><path class="ink" style="stroke-width:5" d="M-34 0 Q0 -30 34 0 Q0 30 -34 0Z"/><circle class="metal" r="11"/><circle class="light" cx="4" cy="-4" r="3"/>',
      '<path class="amber-dk" d="M0 26 C-40 2 -26 -32 0 -12 C26 -32 40 2 0 26Z"/><path class="light" opacity=".55" d="M-16 -12 q6 -6 12 0"/>',
      '<circle class="ink" style="stroke-width:7" cx="-12" cy="0" r="18"/><circle class="ink" style="stroke-width:7" cx="12" cy="0" r="18"/>'
    ][k];
    return '<g class="' + cls + '"><circle class="shade" cy="' + (r * 0.12) + '" r="' + r + '"/><circle r="' + r + '" style="fill:' + fills[k] + ';stroke:var(--second);stroke-width:5"/><g transform="scale(' + (r / 56) + ')">' + g + '</g></g>';
  },

  // swap a standing figure's hanging arms for two arms that can rotate at the shoulder (id-armL, id-armR)
  armsFree(markup, id) {
    return markup.replace(/<path class="(knit|nira-top)" d="M-60 -330 [^"]*"\/><path class="\1" d="M60 -330 [^"]*"\/><ellipse class="(skin|nira-skin)" cx="-62"[^>]*\/><ellipse class="\2" cx="62"[^>]*\/>/, (m, top, skin) =>
      '<g class="' + id + '-armL"><path class="' + top + '" d="M-60 -330 C-84 -280 -82 -230 -70 -196 L-50 -200 C-60 -240 -58 -280 -42 -316Z"/><ellipse class="' + skin + '" cx="-62" cy="-192" rx="14" ry="16"/></g>' +
      '<g class="' + id + '-armR"><path class="' + top + '" d="M60 -330 C84 -280 82 -230 70 -196 L50 -200 C60 -240 58 -280 42 -316Z"/><ellipse class="' + skin + '" cx="62" cy="-192" rx="14" ry="16"/></g>');
  },
  // raise both arms by a (0..1); arms swing out and up around the shoulders
  raise(r, a) {
    r.armL.setAttribute('transform', 'rotate(' + (a * 150) + ' -52 -326)');
    r.armR.setAttribute('transform', 'rotate(' + (-a * 150) + ' 52 -326)');
  },

};