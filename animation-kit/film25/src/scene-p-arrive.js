const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-arrive', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="pa-room">' + R.room({ shoes: false }) + R.matSide('pa-m', 830, 890, 300) +
      '<g transform="translate(-150 0)">' + R.chair() + '<g transform="translate(500 742)"><g class="pa-body">' + R.ruth('pa', 'sit') + '</g></g></g>' +
      '<path class="pa-push" pathLength="1" style="fill:none;stroke:var(--accent);stroke-width:12;stroke-linecap:round" d="M470 520 C560 470 660 560 720 760"/><path class="pa-head2 ink" style="stroke:var(--accent);stroke-width:12" d="M690 740 L722 772 L740 730"/></g>' +
      '<g class="pa-top" opacity="0">' + R.lying('pb') + '<g class="pa-ring">' + R.attn('pa-r') + '</g><path class="pa-out ink" style="stroke-width:6;opacity:0" d="M170 520 q-30 -10 -60 0 M170 560 q-34 10 -66 30"/></g>' +
      '<rect class="pa-veil" width="1080" height="1080" style="fill:var(--ground);opacity:0"/></svg>' +
      '<div class="tag tag-warm pa-eff">קצת מאמץ כדי להתחיל</div><div class="tag pa-rel">ואז אפשר לשחרר</div><div class="tag tag-cool pa-here">זהו, הגעתי</div></div>'));
    Object.assign(this, R.refs(kit, 'pa', ['room', 'body', 'head', 'eyes', 'mouth', 'push', 'head2', 'top', 'ring', 'out', 'veil', 'eff', 'rel', 'here']));
    this.te = kit.stage.querySelector('.pb-eyes'); this.tm = kit.stage.querySelector('.pb-mouth'); this.glow = kit.stage.querySelector('.pb-glow');
    this.ring.setAttribute('transform', 'translate(500 540) scale(470)');
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    // a little effort to get going: she leans forward toward the mat
    const lean = eio(seg(t, 1.3, 2.4));
    this.body.setAttribute('transform', 'rotate(' + 9 * lean + ' 0 0)');
    this.head.setAttribute('transform', 'rotate(' + (-10 * lean) + ' 0 30)');
    this.mouth.setAttribute('d', lean > 0.5 ? 'M-10 28 Q2 26 14 28' : 'M-10 26 Q2 32 14 26');
    this.push.style.strokeDasharray = eo(seg(t, 1.6, 2.6)) + ' 1'; this.push.style.opacity = t > 1.6 ? 1 : 0;
    this.head2.style.opacity = eo(seg(t, 2.5, 2.7));
    R.place(this.eff, 540, lerp(84, 70, eo(seg(t, 1.5, 2.0))), eo(seg(t, 1.5, 2.0)) * (1 - eo(seg(t, 3.6, 4.0))));
    // ...and once she's there, she lets go
    const v = Math.sin(Math.PI * seg(t, 3.4, 4.4));
    this.veil.style.opacity = v;
    const top = t > 3.9;
    this.top.setAttribute('opacity', top ? 1 : 0); this.room.setAttribute('opacity', top ? 0 : 1);
    this.te.setAttribute('transform', t > 6.6 ? 'translate(0 -2) scale(1 .15)' : '');
    const sigh = Math.sin(Math.PI * seg(t, 6.2, 7.6));
    this.out.style.opacity = 0.7 * sigh; this.out.setAttribute('transform', 'translate(' + (-20 * seg(t, 6.2, 7.6)) + ' 0)');
    this.glow.style.opacity = 0.25 * eo(seg(t, 6.6, 7.6));
    this.tm.setAttribute('d', t > 7.2 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
    this.ring.style.opacity = 0.8 * eo(seg(t, 4.2, 5.2));
    R.place(this.rel, 540, lerp(84, 70, eo(seg(t, 4.4, 4.9))), eo(seg(t, 4.4, 4.9)) * (1 - eo(seg(t, 7.2, 7.5))));
    R.place(this.here, 540, lerp(84, 70, eo(seg(t, 7.5, 8.0))), eo(seg(t, 7.5, 8.0)));
  },
});
