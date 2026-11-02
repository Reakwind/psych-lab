const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-interesting', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080"><g class="ai2-c0">' + R.dayCard('ai2-sun', 'sun') + '</g><g class="ai2-c1">' + R.dayCard('ai2-cl', 'cloud') + '</g></svg>' +
      '<div class="tag ai2-t0">ירגיע</div><div class="tag tag-warm ai2-i0">מעניין</div><div class="tag ai2-t1">חוסר סבלנות · עייפות</div><div class="tag tag-warm ai2-i1">גם זה מעניין</div></div>'));
    Object.assign(this, R.refs(kit, 'ai2', ['c0', 'c1', 't0', 'i0', 't1', 'i1']));
  },
  render(t) {
    // one day the practice calms — interesting; another day it stirs impatience or tiredness — also interesting
    const a = eio(seg(t, 0.3, 1.0)), b = eio(seg(t, 4.6, 5.3));
    this.c0.setAttribute('transform', 'translate(740 ' + (lerp(1300, 440, a) + Math.sin(t * 1.4) * 6) + ') rotate(-4) scale(1.4)');
    this.c1.setAttribute('transform', 'translate(340 ' + (lerp(1300, 440, b) + Math.sin(t * 1.4 + 1) * 6) + ') rotate(4) scale(1.4)');
    R.place(this.t0, 740, lerp(660, 648, eo(seg(t, 2.6, 3.0))), eo(seg(t, 2.6, 3.0)));
    R.place(this.i0, 740, lerp(740, 728, eo(seg(t, 3.7, 4.1))), eo(seg(t, 3.7, 4.1)));
    R.place(this.t1, 340, lerp(660, 648, eo(seg(t, 6.0, 6.4))), eo(seg(t, 6.0, 6.4)));
    R.place(this.i1, 340, lerp(740, 728, eo(seg(t, 7.8, 8.2))), eo(seg(t, 7.8, 8.2)));
  },
});
