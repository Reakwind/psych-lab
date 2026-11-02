const { seg, eo, eio, eob, lerp } = kit;
kit.scene('a-goodtime', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.dayLine('ag', 760, [975, 760, 480]) +
      '<rect class="ag-scan" x="-60" y="420" width="120" height="380" rx="30" style="fill:var(--main);opacity:0"/>' +
      '<path class="ag-drop ink" style="stroke-width:5;stroke-dasharray:10 12;opacity:0" d="M870 500 V756"/><g class="ag-mk">' + R.tool('ag-b', 1, 50) + '</g></svg>' +
      '<div class="tag tag-cool ag-cap">תגלו מה מתאים לכם</div><div class="tag tag-warm ag-when">כשהתרופה משפיעה</div></div>'));
    Object.assign(this, R.refs(kit, 'ag', ['curve', 'scan', 'drop', 'mk', 'cap', 'when']));
  },
  render(t) {
    this.curve.style.strokeDasharray = '1 0';
    R.place(this.cap, 540, lerp(84, 70, eo(seg(t, 2.2, 2.7))), eo(seg(t, 2.2, 2.7)));
    // looking along the hours of the day...
    const sc = seg(t, 5.0, 8.4);
    this.scan.setAttribute('x', lerp(980, 820, eio(sc)) - 60);
    this.scan.style.opacity = 0.12 * Math.sin(Math.PI * sc);
    // ...a practice lands on a high point, just after a pill
    const d = eob(seg(t, 8.6, 9.3), 1.4);
    this.mk.setAttribute('transform', 'translate(870 ' + lerp(-100, 450, d) + ')');
    this.drop.style.opacity = 0.6 * eo(seg(t, 9.2, 9.6));
    R.place(this.when, 870, lerp(340, 328, eo(seg(t, 9.3, 9.8))), eo(seg(t, 9.3, 9.8)));
  },
});
