const { seg, eo, eio, eob, lerp } = kit;
// something unpleasant drifts in; Ruth pushes it away, and the pushing only makes it bigger. The switch waits on the wall.
kit.scene('m-push', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomStand('m1', 560) + '<g class="m1-fw">' + R.feel('m1-f') + '</g></svg>' +
      '<div class="tag m1-t">מפגש 16 · מתג המאבק</div><div class="tag tag-cool m1-a">כשמשהו לא נעים קורה לנו</div><div class="tag tag-warm m1-b">טבעי שננסה להיאבק בו</div><div class="tag tag-red m1-c">לפעמים עצם המאבק רק מוסיף קושי</div></div>'));
    Object.assign(this, R.refs(kit, 'm1', ['eyes', 'head', 'mouth', 'armL', 'armR', 'tn', 'fw', 't', 'a', 'b', 'c']));
    this.sw = R.swRefs(kit, 'm1-sw');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    R.setSwitch(this.sw, 0);
    // the cloud drifts in; she shoves at it; on "only adds" it swells and darkens
    const come = eo(seg(t, 0.6, 1.6)), push = eio(seg(t, 3.2, 3.8)) * (1 - eio(seg(t, 7.9, 8.5))), shove = push * Math.sin(t * 14) * 4;
    const grow = eob(seg(t, 6.0, 7.0), 1.4);
    R.setG(this.fw, lerp(150, 320, come) + shove * 0.5, 440 + Math.sin(t * 1.3) * 6, 0.85 + 0.2 * grow, come);
    this.armL.setAttribute('transform', 'rotate(' + (125 * push + shove) + ' -52 -326)');
    this.tn.style.opacity = push * (0.6 + 0.4 * Math.abs(Math.sin(t * 9)));
    this.head.setAttribute('transform', 'rotate(' + (6 * come) + ' 0 30)');
    this.mouth.setAttribute('d', push > 0.5 ? R.mouthFlat : come > 0.5 ? R.mouthSad : R.mouthNeutral);
    R.place(this.t, 540, 40, eo(seg(t, 0.0, 0.3)) * (1 - eo(seg(t, 0.9, 1.2))));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.0, 1.4))), eo(seg(t, 1.0, 1.4)) * (1 - eo(seg(t, 4.5, 4.8))));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 2.4, 2.8))), eo(seg(t, 2.4, 2.8)) * (1 - eo(seg(t, 4.5, 4.8))));
    R.place(this.c, 540, lerp(54, 40, eo(seg(t, 4.87, 5.2))), eo(seg(t, 4.87, 5.2)));
  },
});
