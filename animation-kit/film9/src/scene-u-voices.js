const { seg, eo, eio, eob, lerp } = kit;
const MOOD = [1, 0, 1, 0, 0, 1];
kit.scene('u-voices', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roadSide('uv') + R.busSide('uv') +
      '<path class="ink uv-l0" style="stroke-width:5;opacity:0" d="M770 300 L803 432"/><path class="ink uv-l1" style="stroke-width:5;opacity:0" d="M360 380 L412 432"/></svg>' +
      '<div class="thought sm uv-c0">"אין מצב שאתה תצליח לעשות את זה.."</div><div class="thought sm uv-c1">"תסתובב חזרה הביתה זה לא ייגמר טוב."</div></div>'));
    this.o = R.sideRefs(kit, 'uv');
    Object.assign(this, R.refs(kit, 'uv', ['c0', 'c1', 'l0', 'l1']));
  },
  render(t) {
    const o = this.o;
    R.scroll(o, t, 260); R.blink(o.reyes, t, 0.4);
    o.bus.setAttribute('transform', 'translate(0 ' + Math.abs(Math.sin(t * 7)) * -3 + ')');
    // one passenger, then another, says exactly this
    const s0 = t > 1.3 && t < 5.2, s1 = t > 6.3;
    MOOD.forEach((w, k) => { const sp = (k === 1 && s0) || (k === 4 && s1); R.mood(o.v[k], w, sp && Math.floor(t * 5) % 2 === 0); o.v[k].g.setAttribute('transform', 'translate(' + (sp ? Math.sin(t * 40) * 4 : 0) + ' 0) scale(' + (sp ? 1.12 : 1) + ')'); });
    R.put(this.c0, 760, 200 + (1 - eo(seg(t, 1.4, 2.0))) * 40, 0.3 + 0.7 * eob(seg(t, 1.4, 2.0), 1.5), 0, eo(seg(t, 1.4, 1.7)) * (1 - eo(seg(t, 5.9, 6.3))));
    R.put(this.c1, 330, 270 + (1 - eo(seg(t, 6.4, 7.0))) * 40, 0.3 + 0.7 * eob(seg(t, 6.4, 7.0), 1.5), 0, eo(seg(t, 6.4, 6.7)));
    this.l0.style.opacity = eo(seg(t, 1.6, 2.0)) * (1 - eo(seg(t, 5.9, 6.3))); this.l1.style.opacity = eo(seg(t, 6.6, 7.0));
  },
});
