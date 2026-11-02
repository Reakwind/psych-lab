const { seg, eo, eio, eob, lerp } = kit;
// we move in on the switch by the door: it has a name
kit.scene('m-name', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="m2-zm">' + R.roomStand('m2', 560) + '<g class="m2-fw">' + R.feel('m2-f') + '</g></g></svg>' +
      '<div class="tag tag-red m2-p">לפעמים עצם המאבק רק מוסיף קושי</div><div class="tag tag-cool m2-a">בטיפול בגישת ACT</div><div class="tag tag-warm m2-b">מתג המאבק</div></div>'));
    Object.assign(this, R.refs(kit, 'm2', ['zm', 'eyes', 'head', 'mouth', 'armL', 'tn', 'fw', 'p', 'a', 'b']));
    this.sw = R.swRefs(kit, 'm2-sw');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    const z = eio(seg(t, 0.4, 2.4)), s = lerp(1, 1.45, z), fx = lerp(540, 470, z), fy = lerp(540, 500, z);
    this.zm.setAttribute('transform', 'translate(' + fx + ' ' + fy + ') scale(' + s + ') translate(' + -fx + ' ' + -fy + ')');
    R.setSwitch(this.sw, 0);
    const glow = Math.sin(Math.PI * seg(t, 4.0, 6.0));
    this.sw.halo.style.opacity = 0.0; this.sw.rock.setAttribute('transform', 'scale(' + (1 + 0.06 * glow) + ')');
    R.setG(this.fw, 320, 440 + Math.sin(t * 1.3) * 6, 1.05, 1);
    this.tn.style.opacity = 0;
    this.head.setAttribute('transform', 'rotate(' + (6 - 14 * eio(seg(t, 3.9, 4.6))) + ' 0 30)');
    this.mouth.setAttribute('d', R.mouthNeutral);
    R.place(this.p, 540, 40, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 2.4, 2.8))), eo(seg(t, 2.4, 2.8)));
    R.place(this.b, 803, lerp(722, 710, eo(seg(t, 4.19, 4.6))), eo(seg(t, 4.19, 4.6)));
  },
});
