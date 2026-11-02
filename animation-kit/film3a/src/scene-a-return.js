const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-return', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.overhead('ae') + '<g transform="translate(770 540) scale(1.25)">' + R.ruthTop('ae') + '</g>' +
      '<g transform="translate(610 200)">' + R.calendar('ae-cal') + '</g>' +
      '<path class="ae-br" pathLength="1" style="fill:none;stroke:var(--main);stroke-width:10;stroke-linecap:round" d="M480 520 C520 440 480 380 540 330 C600 280 680 260 740 200"/><g class="ae-b">' + R.balloon('ae-bl') + '</g></svg>' +
      '<div class="tag tag-cool ae-cap">נשימה, וחוזרים</div><div class="tag ae-next">עד הנדידה הבאה</div></div>'));
    Object.assign(this, R.refs(kit, 'ae', ['br', 'b', 'cap', 'next']));
    this.eyes = kit.stage.querySelector('.ae-eyes');
  },
  render(t) {
    this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)');
    // a breath reaches out from her belly and brings the thought back home
    const br = eo(seg(t, 1.3, 2.0)), back = eio(seg(t, 2.0, 3.4)), again = eio(seg(t, 4.5, 6.0));
    this.br.style.strokeDasharray = br * (1 - back) + ' 1';
    this.br.style.strokeDashoffset = -back;
    const x = lerp(lerp(760, 248, back), 360, again), y = lerp(lerp(190, 470, back), 330, again);
    this.b.setAttribute('transform', 'translate(' + x + ' ' + (y + Math.sin(t * 2) * 6) + ') scale(' + lerp(1.2, 0.8, back) * lerp(1, 1.3, again) + ')');
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 2.0, 2.5))), eo(seg(t, 2.0, 2.5)));
    R.place(this.next, 540, lerp(940, 928, eo(seg(t, 4.5, 5.0))), eo(seg(t, 4.5, 5.0)));
  },
});
