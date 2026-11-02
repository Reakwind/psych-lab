const { seg, eo, eio, eob, lerp } = kit;
kit.scene('p-bias', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.profile('pb') +
      '<g class="pb-al"><circle r="70" style="fill:#D96C6C;opacity:.3"/><circle r="40" style="fill:#D9534F;stroke:var(--second);stroke-width:5"/><path class="ink" style="stroke:#D9534F;stroke-width:8" d="M-70 -50 l-22 -18 M70 -50 l22 -18 M0 -86 v-26"/></g></svg>' +
      '<div class="tag tag-cool pb-a">הטיה מובנית</div><div class="tag pb-b">לדברים שעלולים להיות מאיימים</div><div class="tag tag-warm pb-c">מנגנון הישרדותי חשוב</div></div>'));
    Object.assign(this, R.refs(kit, 'pb', ['bulb', 'al', 'a', 'b', 'c']));
    this.bulb.style.opacity = 0;
  },
  render(t) {
    // inside the head: the alarm from session 7, built in to spot what might be a threat
    const on = eob(seg(t, 1.0, 1.6), 1.6), fast = seg(t, 4.0, 5.2);
    const pulse = Math.sin(t * lerp(4, 10, fast));
    this.al.setAttribute('transform', 'translate(520 360) scale(' + on * (1 + 0.08 * pulse) + ')');
    this.al.style.opacity = on > 0 ? 0.75 + 0.25 * pulse : 0;
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.1, 1.6))), eo(seg(t, 1.1, 1.6)));
    R.place(this.b, 540, lerp(176, 164, eo(seg(t, 4.1, 4.6))), eo(seg(t, 4.1, 4.6)) * (1 - eo(seg(t, 7.0, 7.3))));
    R.place(this.c, 540, lerp(176, 164, eo(seg(t, 7.3, 7.8))), eo(seg(t, 7.3, 7.8)));
  },
});
