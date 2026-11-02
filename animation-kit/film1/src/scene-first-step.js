const { seg, eo, eio, eob, lerp } = kit;
kit.scene('first-step', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.chair() +
      '<g class="first-step-glow"><ellipse class="amber-lt" cx="560" cy="868" rx="190" ry="60" opacity=".6"/></g>' +
      '<g class="first-step-stone">' + R.stone('first-step-s', 560, 870, 130) + '</g>' +
      '<g transform="translate(560 860)"><g class="first-step-body">' + R.ruth('first-step-r', 'stand') + '</g></g>' +
      '<g class="first-step-heart"><path class="amber-dk" d="M0 30 C-46 0 -26 -40 0 -16 C26 -40 46 0 0 30Z"/><path class="light" opacity=".5" d="M-18 -14 q8 -8 14 2"/></g>' +
      '</svg><div class="tag tag-cool first-step-time">כמה דקות לעצמכם</div><div class="tag tag-warm first-step-step">זה כבר צעד משמעותי</div></div>'));
    Object.assign(this, R.refs(kit, 'first-step', ['glow', 'stone', 'body', 'heart', 'time', 'step']));
    this.top = kit.stage.querySelector('.first-step-s-top');
    this.r = R.refs(kit, 'first-step-r', ['eyes', 'head', 'mouth']);
  },
  render(t) {
    R.blink(this.r.eyes, t, 1.8);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    this.r.mouth.setAttribute('d', t > 5.6 ? 'M-12 24 Q2 38 16 24' : 'M-10 26 Q2 32 14 26');
    this.r.head.setAttribute('transform', 'rotate(' + (-4 * Math.sin(t * 0.8)) + ' 0 30)');
    // back home: the stone of today rises under her feet and warms up
    const up = eob(seg(t, 5.3, 6.0), 1.6), warm = eo(seg(t, 5.7, 6.6));
    this.stone.setAttribute('transform', 'translate(560 870) scale(' + up + ') translate(-560 -870)');
    this.top.style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(warm * 100) + '%, color-mix(in srgb, var(--accent) 22%, var(--ground)))';
    this.glow.style.opacity = warm * (0.8 + 0.2 * Math.sin(t * 2.4));
    const h = eob(seg(t, 6.0, 6.8), 1.6);
    this.heart.setAttribute('transform', 'translate(' + 660 + ' ' + (lerp(560, 360, h) + Math.sin(t * 2) * 6) + ') scale(' + lerp(0.3, 1.6, h) + ')');
    this.heart.style.opacity = eo(seg(t, 6.0, 6.3));
    R.place(this.time, 540, lerp(110, 96, eo(seg(t, 3.0, 3.6))), eo(seg(t, 3.0, 3.6)));
    R.place(this.step, 540, lerp(186, 174, eo(seg(t, 5.8, 6.4))), eo(seg(t, 5.8, 6.4)));
  },
});
