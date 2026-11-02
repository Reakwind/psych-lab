const { seg, eo, eio, eob, lerp } = kit;
// fit the activity to what's possible right now, or rest, if that's what the body needs
kit.scene('c-rest', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('cr2', -170) +
      '<g transform="translate(860 330) scale(.8)">' + R.battery('cr2') + '</g><g class="cr2-task"><rect class="slate-dk" x="-150" y="-150" width="300" height="150" rx="18"/><rect class="slate" x="-138" y="-138" width="276" height="56" rx="12"/></g>' +
      '<rect class="cr2-dim" width="1080" height="1080" style="fill:color-mix(in srgb, var(--second) 60%, var(--main))" opacity="0"/></svg>' +
      '<div class="tag tag-warm cr2-a">מה שאפשרי עבורנו עכשיו</div><div class="tag tag-cool cr2-b">או דווקא לנוח</div></div>'));
    Object.assign(this, R.refs(kit, 'cr2', ['head', 'eyes', 'mouth', 'body', 'fill', 'bolt', 'task', 'dim', 'a', 'b']));
  },
  render(t) {
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.012, 4.4) + ')');
    // a task cut down to fit the battery
    const fit = eio(seg(t, 1.0, 2.2));
    this.task.setAttribute('transform', 'translate(860 ' + 860 + ') scale(' + lerp(1, 0.5, fit) + ' 1)');
    R.setBattery(this.fill, 0.42 + 0.2 * eio(seg(t, 5.0, 7.4)));
    // or rest: she leans back, eyes closed, the light softens, the battery slowly refills
    const rest = eio(seg(t, 4.4, 5.4));
    this.eyes.setAttribute('transform', rest > 0.5 ? 'translate(0 -2) scale(1 .15)' : ''); if (rest <= 0.5) R.blink(this.eyes, t, 0.3);
    this.head.setAttribute('transform', 'rotate(' + (-10 * rest) + ' 0 30)');
    this.dim.setAttribute('opacity', 0.1 * rest);
    this.bolt.style.opacity = 0.9 * rest;
    this.task.style.opacity = 1 - 0.6 * rest;
    this.mouth.setAttribute('d', 'M-10 26 Q2 32 14 26');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.6, 1.1))), eo(seg(t, 0.6, 1.1)));
    R.place(this.b, 540, lerp(176, 164, eo(seg(t, 4.5, 5.0))), eo(seg(t, 4.5, 5.0)));
  },
});
