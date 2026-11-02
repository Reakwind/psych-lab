const { seg, eo, eio, eob, lerp } = kit;
kit.scene('e-low', {
  init(kit) {
    const blk = (cls, x, y, w, h) => '<g class="' + cls + '"><rect class="slate-dk" x="' + (x - w / 2) + '" y="' + (y - h / 2) + '" width="' + w + '" height="' + h + '" rx="12"/><rect class="slate" x="' + (x - w / 2 + 6) + '" y="' + (y - h / 2 + 6) + '" width="' + (w - 12) + '" height="' + (h / 2 - 6) + '" rx="8"/></g>';
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.room({}) + R.seated('el', -120) +
      '<g class="el-mug">' + R.mug('el-m') + '</g><g transform="translate(860 360) scale(1.1)">' + R.battery('el') + '</g>' +
      '<rect class="el-red" x="800" y="452" width="120" height="6" rx="3" style="fill:#C0392B;opacity:0"/>' +
      blk('el-big', 860, 700, 200, 110) + blk('el-s0', 790, 700, 64, 64) + blk('el-s1', 860, 700, 64, 64) + blk('el-s2', 930, 700, 64, 64) + '</svg>' +
      '<div class="tag tag-cool el-a">סוללה נמוכה: מתאימים</div><div class="tag el-easy">משהו קל יותר</div><div class="tag el-brk">הפסקה</div><div class="tag el-split">לחלק לחלקים</div>' +
      '<div class="tag tag-warm el-chg">מה יטעין אותי?</div><div class="tag tag-warm el-zero">לא לרוקן לגמרי</div></div>'));
    Object.assign(this, R.refs(kit, 'el', ['body', 'head', 'eyes', 'mouth', 'mug', 'fill', 'bolt', 'red', 'big', 's0', 's1', 's2', 'a', 'easy', 'brk', 'split', 'chg', 'zero']));
    this.steam = kit.stage.querySelector('.el-m-steam');
  },
  render(t) {
    R.blink(this.eyes, t, 0.6);
    this.body.setAttribute('transform', 'scale(1 ' + kit.breathe(t, 0.008, 3.6) + ')');
    R.place(this.a, 540, lerp(84, 70, eo(seg(t, 1.0, 1.5))), eo(seg(t, 1.0, 1.5)));
    // adapt: something lighter, a break with a cup of tea, the big job split in three
    R.place(this.easy, 540, lerp(184, 172, eo(seg(t, 4.5, 5.0))), eo(seg(t, 4.5, 5.0)) * (1 - eo(seg(t, 5.6, 5.9))));
    const m = eob(seg(t, 5.7, 6.2), 1.6);
    this.mug.setAttribute('transform', 'translate(580 640) scale(' + m * 0.8 + ')'); this.steam.setAttribute('transform', 'translate(0 ' + (-((t * 10) % 10)) + ')');
    R.place(this.brk, 580, lerp(552, 540, eo(seg(t, 5.8, 6.3))), eo(seg(t, 5.8, 6.3)) * (1 - eo(seg(t, 8.0, 8.4))));
    const sp = eio(seg(t, 6.7, 7.5));
    this.big.style.opacity = eo(seg(t, 6.2, 6.5)) * (1 - sp);
    [this.s0, this.s1, this.s2].forEach((el, k) => { el.style.opacity = sp; el.setAttribute('transform', 'translate(' + ((k - 1) * 30 * sp) + ' 0)'); });
    R.place(this.split, 860, lerp(812, 800, eo(seg(t, 7.0, 7.5))), eo(seg(t, 7.0, 7.5)));
    // what charges it a little; and never all the way to empty
    const chg = eio(seg(t, 11.5, 12.8));
    R.setBattery(this.fill, lerp(0.22, 0.4, chg));
    this.bolt.style.opacity = chg * (0.7 + 0.3 * Math.sin(t * 6)) * (1 - eo(seg(t, 14.0, 14.6)));
    R.place(this.chg, 540, lerp(184, 172, eo(seg(t, 11.5, 12.0))), eo(seg(t, 11.5, 12.0)) * (1 - eo(seg(t, 14.6, 15.0))));
    this.red.style.opacity = eo(seg(t, 15.0, 15.5));
    R.place(this.zero, 860, lerp(512, 500, eo(seg(t, 15.1, 15.6))), eo(seg(t, 15.1, 15.6)));
    this.mouth.setAttribute('d', t > 6.0 ? 'M-12 24 Q2 36 16 24' : 'M-10 26 Q2 32 14 26');
  },
});