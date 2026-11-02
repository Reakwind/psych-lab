const { seg, eo, eio, eob, lerp } = kit;
// imagine a switch that clicks on when we start to fight: she shoves at the cloud, and it lights
kit.scene('m-imagine', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="m3-zm" transform="translate(470 500) scale(1.45) translate(-470 -500)">' + R.roomStand('m3', 560) + '<g class="m3-fw">' + R.feel('m3-f') + '</g></g></svg>' +
      '<div class="tag tag-cool m3-p">בטיפול בגישת ACT</div><div class="tag tag-warm m3-q">מתג המאבק</div><div class="tag tag-cool m3-a">לדמיין שיש לנו מתג</div><div class="tag tag-red m3-b">שנדלק כשאנחנו מתחילים להיאבק</div></div>'));
    Object.assign(this, R.refs(kit, 'm3', ['zm', 'eyes', 'head', 'mouth', 'armL', 'tn', 'fw', 'p', 'q', 'a', 'b']));
    this.sw = R.swRefs(kit, 'm3-sw');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    const push = eio(seg(t, 4.0, 4.4)) * (1 - eio(seg(t, 5.9, 6.5))), shove = push * Math.sin(t * 14) * 4;
    const on = t > 4.33 && t < 6.2 ? 1 : 0;
    R.setSwitch(this.sw, on);
    R.setG(this.fw, 320 + shove * 0.5, 440 + Math.sin(t * 1.3) * 6, 1.05 + 0.08 * push, 1);
    this.armL.setAttribute('transform', 'rotate(' + (125 * push + shove) + ' -52 -326)');
    this.tn.style.opacity = push * (0.6 + 0.4 * Math.abs(Math.sin(t * 9)));
    this.head.setAttribute('transform', 'rotate(' + (t < 3.8 ? -8 : 6 * push) + ' 0 30)');
    this.mouth.setAttribute('d', push > 0.5 ? R.mouthFlat : R.mouthNeutral);
    R.place(this.p, 540, 40, 1 - eo(seg(t, 0.0, 0.4)));
    R.place(this.q, 803, 710, 1);
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 1.0, 1.4))), eo(seg(t, 1.0, 1.4)));
    R.place(this.b, 540, lerp(124, 112, eo(seg(t, 4.33, 4.7))), eo(seg(t, 4.33, 4.7)));
  },
});
