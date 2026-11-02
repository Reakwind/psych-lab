const { seg, eo, eio, eob, lerp } = kit;
kit.scene('t-fill', {
  init(kit) {
    let tiles = '';
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) tiles += '<rect class="tl-t' + (i * 3 + j) + '" x="' + (446 + i * 44) + '" y="' + (304 + j * 44) + '" width="40" height="40" rx="8" style="fill:color-mix(in srgb, var(--accent) 35%, var(--ground));stroke:var(--second);stroke-width:4"/>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.profile('tl') + '<g>' + tiles + '</g>' +
      '<rect class="tl-slot" x="490" y="348" width="40" height="40" rx="8" style="fill:none;stroke:var(--accent);stroke-width:5;stroke-dasharray:8 6"/>' +
      '<rect class="tl-piece" x="-20" y="-20" width="40" height="40" rx="8" style="stroke:var(--second);stroke-width:4"/></svg>' +
      '<div class="tag tl-a">כשחסר מידע</div><div class="tag tag-cool tl-b">משלים לפי מה שמכירים</div><div class="tag tag-warm tl-c">ולפי איך שמרגישים</div></div>'));
    Object.assign(this, R.refs(kit, 'tl', ['bulb', 'slot', 'piece', 'a', 'b', 'c', 't4']));
    this.bulb.style.opacity = 0; this.t4.style.opacity = 0;
  },
  render(t) {
    // a piece is missing; the brain fills it from what it knows — tinted by today's mood
    this.slot.style.opacity = (0.5 + 0.5 * Math.sin(t * 6)) * (1 - eo(seg(t, 4.8, 5.0)));
    const f = eio(seg(t, 3.8, 4.9));
    this.piece.setAttribute('transform', 'translate(' + lerp(860, 510, f) + ' ' + (lerp(760, 368, f) - Math.sin(f * Math.PI) * 120) + ') rotate(' + (1 - f) * 40 + ')');
    this.piece.style.fill = 'color-mix(in srgb, ' + (t > 6.2 ? '#6D7FA6' : 'var(--accent)') + ' ' + Math.round(lerp(35, 70, eo(seg(t, 6.1, 6.8)))) + '%, var(--ground))';
    this.piece.style.opacity = eo(seg(t, 3.6, 3.9));
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 0.9, 1.4))), eo(seg(t, 0.9, 1.4)) * (1 - eo(seg(t, 3.6, 3.9))));
    R.place(this.b, 540, lerp(84, 70, eo(seg(t, 3.8, 4.3))), eo(seg(t, 3.8, 4.3)));
    R.place(this.c, 540, lerp(1000, 988, eo(seg(t, 6.1, 6.6))), eo(seg(t, 6.1, 6.6)));
  },
});