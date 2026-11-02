const { seg, eo, eio, eob, lerp } = kit;
// part 7: physical practice — Ruth raises her arms again and again; not only her muscles train: in her head the movement's path wears in
const T0 = 4.6, PER = 1.9, IN = 9.67;
kit.scene('w-move', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({ shoes: false }) +
      '<g transform="translate(360 866)">' + R.armsFree(R.ruth('w4', 'stand'), 'w4') + '</g>' + R.dots('w4-dt', 4, 56) +
      '<defs><clipPath id="w4-cc"><circle cx="540" cy="520" r="470"/></clipPath></defs>' +
      '<g class="w4-in"><circle class="shade" cx="8" cy="12" r="232"/><g transform="scale(.46) translate(-540 -520)"><g clip-path="url(#w4-cc)">' + R.profile('w4h') + R.brainPath('w4h') + '</g></g><circle r="216" style="fill:none;stroke:var(--second);stroke-width:8"/></g></svg>' +
      '<div class="tag tag-cool w4-gym">אולי אתם כבר מכירים את זה מהתרגול הגופני</div><div class="tag tag-cool w4-rep">כשחוזרים שוב ושוב על תנועה</div>' +
      '<div class="tag w4-mus">לא מאמנים רק את השרירים</div><div class="tag tag-warm w4-brain">המוח לומד לבצע אותה ביעילות</div></div>'));
    Object.assign(this, R.refs(kit, 'w4', ['armL', 'armR', 'eyes', 'mouth', 'in', 'gym', 'rep', 'mus', 'brain']));
    this.r = { armL: this.armL, armR: this.armR };
    this.d = [0, 1, 2, 3].map((k) => kit.stage.querySelector('.w4-dt-d' + k)); this.dt = kit.stage.querySelector('.w4-dt');
    this.b = R.brainRefs(kit, 'w4h'); kit.stage.querySelector('.w4h-bulb').style.opacity = 0;
  },
  render(t) {
    R.blink(this.eyes, t, 0.4);
    // the arm raise, again and again
    const ph = Math.max(0, t - T0), rep = Math.floor(ph / PER), a = t > T0 && t < 14.0 ? (1 - Math.cos(2 * Math.PI * ph / PER)) / 2 : 0;
    R.raise(this.r, 0.75 * a);
    this.mouth.setAttribute('d', t > T0 ? R.mouthHappy : R.mouthNeutral);
    R.setG(this.dt, 360, 300, 1, eo(seg(t, T0, T0 + 0.4)));
    this.d.forEach((el, n) => R.lightDot(el, eo(seg(t, T0 + PER * (n + 0.5) - 0.2, T0 + PER * (n + 0.5) + 0.1))));
    // the inset: inside her head the movement's path wears in with every repetition
    const ins = eob(seg(t, IN - 0.2, IN + 0.4), 1.4);
    this.in.setAttribute('transform', 'translate(790 430) scale(' + Math.max(0.001, ins) + ')'); this.in.style.opacity = eo(seg(t, IN - 0.2, IN + 0.1));
    const lr = Math.max(0, t - IN) / PER;
    R.setBrain(this.b, Math.min(1, 0.2 + 0.25 * lr), t > IN ? (lr % 1) : -1, 0);
    R.place(this.gym, 540, lerp(84, 70, eo(seg(t, 0.4, 0.9))), eo(seg(t, 0.4, 0.9)) * (1 - eo(seg(t, 4.3, 4.6))));
    R.place(this.rep, 540, lerp(84, 70, eo(seg(t, 4.6, 5.1))), eo(seg(t, 4.6, 5.1)));
    R.place(this.mus, 360, lerp(972, 960, eo(seg(t, 6.9, 7.4))), eo(seg(t, 6.9, 7.4)));
    R.place(this.brain, 790, lerp(712, 700, eo(seg(t, 11.1, 11.6))), eo(seg(t, 11.1, 11.6)));
  },
});
