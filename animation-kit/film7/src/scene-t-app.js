const { seg, eo, eio, eob, lerp } = kit;
const A = [[7.1, 'לזהות מחשבות', 360, 'sm'], [9.4, 'לקחת קצת מרחק', 520, 'sm'], [10.6, 'לבחור איך להגיב', 680, 'sm kind']];
kit.scene('t-app', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><div class="ty-move" style="position:absolute;inset:0"><svg class="art" viewBox="0 0 1080 1080">' + R.bigPhone('ty') + '</svg>' +
      A.map((a, k) => '<div class="thought ' + a[3] + ' ty-c' + k + '" style="width:400px">' + a[1] + '</div>').join('') + '</div><div class="tag tag-cool ty-cap">באפליקציה: מגוון פעילויות</div></div>'));
    Object.assign(this, R.refs(kit, 'ty', ['move', 'c0', 'c1', 'c2', 'cap']));
  },
  render(t) {
    const up = eio(seg(t, 0.2, 1.1));
    this.move.style.transform = 'translateY(' + lerp(1000, 0, up) + 'px)';
    R.place(this.cap, 540, lerp(64, 52, eo(seg(t, 1.9, 2.4))), eo(seg(t, 1.9, 2.4)));
    // in the app: noticing thoughts, taking a step back, choosing a response
    A.forEach(([a, , y], k) => R.put(this['c' + k], 540, y + (1 - eo(seg(t, a, a + 0.5))) * 40, eob(seg(t, a, a + 0.5), 1.4), 0, eo(seg(t, a, a + 0.25))));
  },
});