const { seg, eo, eio, eob, lerp } = kit;
const BADGE = (cls, inner) => '<g class="' + cls + '"><circle class="shade" cy="8" r="70"/><circle r="70" style="fill:color-mix(in srgb, var(--main) 18%, var(--ground));stroke:var(--second);stroke-width:6"/>' + inner + '</g>';
const BODY = '<circle class="skin" cx="0" cy="-24" r="16"/><path class="knit" d="M-26 34 C-26 0 -16 -6 0 -6 C16 -6 26 0 26 34Z"/>';
const SENSES = '<path class="light" d="M-38 0 Q0 -32 38 0 Q0 32 -38 0Z"/><path class="ink" style="stroke-width:5" d="M-38 0 Q0 -32 38 0 Q0 32 -38 0Z"/><circle class="metal" r="12"/>';
const ROOM = '<path class="wood-lt" d="M-34 34 V-6 L0 -34 L34 -6 V34Z"/><path class="ink" style="stroke-width:5" d="M-34 34 V-6 L0 -34 L34 -6 V34Z"/><rect class="wood" x="-10" y="8" width="20" height="26"/>';
const B = [[4.5, 800, BODY, 'הגוף'], [5.0, 540, SENSES, 'החושים'], [5.6, 280, ROOM, 'הסביבה']];
kit.scene('g-channels', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) +
      '<g transform="translate(578 866)">' + R.roots('gc-a') + '</g><g transform="translate(622 866) scale(-1 1)">' + R.roots('gc-b') + '</g>' + R.seated('gc', 0) +
      B.map((b, k) => BADGE('gc-k' + k, b[2])).join('') + '</svg>' + B.map((b, k) => '<div class="tag gc-t' + k + '">' + b[3] + '</div>').join('') +
      '<div class="tag tag-cool gc-cap">דרך פשוטה לרגע הנוכחי</div></div>'));
    Object.assign(this, R.refs(kit, 'gc', ['body', 'eyes', 'mouth', 'k0', 'k1', 'k2', 't0', 't1', 't2', 'cap']));
    this.mouth.setAttribute('d', 'M-12 24 Q2 36 16 24');
  },
  render(t) {
    R.blink(this.eyes, t, 1.4);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.01, 4) + ')');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 1.4, 1.9))), eo(seg(t, 1.4, 1.9)));
    // three ways back to the present: the body, the senses, the surroundings
    B.forEach(([a, x], k) => {
      this['k' + k].setAttribute('transform', 'translate(' + x + ' ' + (250 + Math.sin(t * 1.4 + k) * 6) + ') scale(' + eob(seg(t, a, a + 0.5), 1.8) + ')');
      R.place(this['t' + k], x, lerp(352, 340, eo(seg(t, a + 0.2, a + 0.6))), eo(seg(t, a + 0.2, a + 0.6)));
    });
  },
});
