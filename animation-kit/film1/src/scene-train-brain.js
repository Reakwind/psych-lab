const { seg, eo, eio, lerp } = kit;
kit.scene('train-brain', {
  init(kit) {
    const brain = 'M330 410 C318 320 390 240 490 232 C570 222 660 252 706 316 C738 360 734 418 708 446 C716 480 690 506 654 500 C632 528 578 532 548 510 C516 532 462 530 444 504 C404 518 352 502 346 466 C332 452 328 432 330 410Z';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' +
      '<g class="train-brain-left"><rect class="sky" x="-540" width="1620" height="1080"/><path class="grass" d="M-540 770 C0 750 600 780 1080 760 V1080 H-540Z"/>' +
      '<g transform="translate(270 960)">' + R.armsFree(R.ruth('train-brain-r', 'stand'), 'train-brain-r') + '</g></g>' +
      '<g class="train-brain-right"><rect x="540" width="540" height="1080" style="fill:color-mix(in srgb, var(--second) 78%, var(--main))"/>' +
      '<g class="train-brain-lift"><g transform="translate(810 520) scale(.62) translate(-530 -380)"><path class="amber-lt" d="' + brain + '"/>' +
      '<path style="fill:none;stroke:color-mix(in srgb, var(--accent) 70%, var(--second));stroke-width:6;stroke-linecap:round;opacity:.55" d="M392 330 C420 300 460 296 488 318 C510 290 556 286 584 306 M360 400 C392 384 430 392 448 420 C470 396 510 396 530 418 M560 380 C596 360 640 370 664 400 M440 470 C470 452 506 458 520 482"/>' +
      '<circle class="metal" cx="470" cy="392" r="10"/><circle class="metal" cx="560" cy="392" r="10"/><path class="ink" style="stroke-width:7" d="M488 432 Q515 454 542 432"/></g>' +
      '<path class="ink train-brain-arms" style="stroke:var(--accent);stroke-width:12" d="M730 600 L700 660 M890 600 L920 660"/>' +
      '<g class="train-brain-bell"><rect class="metal" x="680" y="660" width="260" height="14" rx="7"/><rect class="slate" x="664" y="634" width="30" height="66" rx="8"/><rect class="slate" x="926" y="634" width="30" height="66" rx="8"/></g></g>' +
      '<rect class="metal" x="536" width="8" height="1080"/></g>' +
      '</svg><div class="tag tag-cool train-brain-body">מאמנים את הגוף</div><div class="tag tag-warm train-brain-mind">ואת המוח</div></div>'));
    Object.assign(this, R.refs(kit, 'train-brain', ['left', 'right', 'lift', 'bell', 'arms', 'body', 'mind']));
    this.r = R.refs(kit, 'train-brain-r', ['armL', 'armR', 'eyes', 'mouth']);
    this.r.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    // the split slides in; Ruth lifts her arms and the brain lifts its weight, in step
    // Ruth alone in the middle first; on "the brain" the frame splits and the brain slides in beside her
    const split = eio(seg(t, 1.8, 2.4));
    this.left.setAttribute('transform', 'translate(' + lerp(270, 0, split) + ' 0)');
    this.right.setAttribute('transform', 'translate(' + lerp(560, 0, split) + ' 0)');
    const rep = (1 - Math.cos(Math.max(0, t - 0.5) * 2.6)) / 2;
    R.raise(this.r, rep * 0.95);
    R.blink(this.r.eyes, t, 1.0);
    const lift = (1 - Math.cos(Math.max(0, t - 2.4) * 2.6)) / 2;
    this.bell.setAttribute('transform', 'translate(0 ' + (-150 * lift) + ')');
    this.arms.setAttribute('d', 'M730 600 L700 ' + (660 - 150 * lift) + ' M890 600 L920 ' + (660 - 150 * lift));
    this.lift.setAttribute('transform', 'translate(0 ' + (-6 * lift) + ')');
    R.place(this.body, lerp(540, 270, split), lerp(140, 128, eo(seg(t, 0.3, 0.8))), eo(seg(t, 0.3, 0.8)));
    R.place(this.mind, 810, lerp(140, 128, eo(seg(t, 2.4, 2.9))), eo(seg(t, 2.4, 2.9)));
  },
});
