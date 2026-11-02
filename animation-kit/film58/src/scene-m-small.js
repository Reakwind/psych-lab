const { seg, eo, eio, eob, lerp } = kit;
kit.scene('m-small', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + '<g transform="translate(540 1080) scale(1.4) translate(-540 -1080)">' + R.land('ml') + '</g>' + R.stone('ml-s', 270, 940, 130) +
      '<g class="ml-bo">' + R.boulder('ml-b') + '</g><path class="ml-x" pathLength="1" style="fill:none;stroke:#C0392B;stroke-width:16;stroke-linecap:round" d="M660 620 L920 880 M920 620 L660 880"/>' +
      '<circle class="ml-glow" cx="270" cy="940" r="190" style="fill:var(--accent)" opacity="0"/></svg>' +
      '<div class="tag tag-cool ml-big">צעד לא צריך להיות גדול</div><div class="tag tag-warm ml-ok">נגיש ואפשרי</div></div>'));
    kit.css('.ml-st0,.ml-st1,.ml-st2{display:none}');
    Object.assign(this, R.refs(kit, 'ml', ['bo', 'x', 'glow', 'big', 'ok']));
    this.top = kit.stage.querySelector('.ml-s-top');
  },
  render(t) {
    // not big: the boulder rises, then is crossed out and fades
    const up = eob(seg(t, 0.4, 1.2), 1.3), x = eo(seg(t, 2.0, 2.6)), fade = eio(seg(t, 2.8, 3.6));
    this.bo.setAttribute('transform', 'translate(790 ' + (960 + (1 - up) * 400) + ') scale(1.2)'); this.bo.style.opacity = 1 - 0.75 * fade;
    this.x.style.strokeDasharray = x + ' 1'; this.x.style.opacity = x > 0 ? 1 - 0.75 * fade : 0;
    R.place(this.big, 540, lerp(84, 70, eo(seg(t, 0.6, 1.1))), eo(seg(t, 0.6, 1.1)));
    // reachable and possible: the small stone lights up
    const lit = eo(seg(t, 4.4, 5.0));
    this.top.style.fill = 'color-mix(in srgb, var(--accent) ' + Math.round(22 + 78 * lit) + '%, var(--ground))';
    this.glow.setAttribute('opacity', 0.22 * lit * (0.8 + 0.2 * Math.sin(t * 3)));
    R.place(this.ok, 270, lerp(780, 768, eo(seg(t, 4.6, 5.1))), eo(seg(t, 4.6, 5.1)));
  },
});
