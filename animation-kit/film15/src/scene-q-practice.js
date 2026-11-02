const { seg, eo, eio, eob, lerp } = kit;
// parts 10–18 in one unbroken shot; times are seconds from the scene start (global 91.31), taken from Ariel's counts in the recording
const COUNT = [[4.33, '3'], [5.43, '2'], [6.70, '1']];
const PH = [8.11, 11.85, 15.60, 19.35, 23.09, 26.85, 30.57, 34.34], END = 38.09;
const BEAT = [[0, 1.07, 2.33], [0, 1.08, 2.34], [0, 1.08, 2.34], [0, 1.08, 2.34], [0, 1.25, 2.5], [0, 1.25, 2.5], [0, 1.25, 2.5], [0, 1.25, 2.5]];
const WORD = ['שאיפה', 'עצירה', 'נשיפה', 'עצירה'];
kit.scene('q-practice', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + R.roomSeat('qp', -230, false) + R.box('qpb') +
      '<g class="qp-r0"><circle r="22" style="stroke:var(--second);stroke-width:5"/></g><g class="qp-r1"><circle r="22" style="stroke:var(--second);stroke-width:5"/></g></svg>' +
      '<div class="count qp-word"></div><div class="tag qp-a">ניתן לאוויר לצאת החוצה</div></div>'));
    Object.assign(this, R.refs(kit, 'qp', ['body', 'eyes', 'head', 'mouth', 'tn', 'pf', 'r0', 'r1', 'word', 'a']));
    this.x = R.boxRefs(kit, 'qpb');
  },
  render(t) {
    this.tn.style.opacity = 0; this.pf.style.opacity = 0;
    if (t > 3.0 && t < END + 0.4) this.eyes.setAttribute('transform', 'translate(0 -2) scale(1 .15)'); else R.blink(this.eyes, t, 0.4);
    // where are we: phase i, how far along it
    let i = -1; PH.forEach((a, k) => { if (t >= a) i = k; });
    const done = t >= END;
    let dot = 0;
    if (i >= 0 && !done) dot = (i % 4) + Math.min(1, (t - PH[i]) / ((PH[i + 1] || END) - PH[i]));
    if (done) dot = 4;
    // count marks light on each beat; a new round starts dark
    const round = i < 0 ? -1 : Math.floor(i / 4);
    const lit = (n) => {
      if (i < 0 || done) return 0;
      const side = Math.floor(n / 3), ph = round * 4 + side;
      return ph <= i && t >= PH[ph] + BEAT[ph][n % 3] - 0.05 ? 1 : 0;
    };
    // the pacer: empties as the air goes out, then swells on each in-breath, stays full, shrinks, stays small
    let full = lerp(0.45, 0.0, eio(seg(t, 0.6, 3.6)));
    if (i >= 0) full = R.fill(t, PH.map((a, k) => [a, k % 4]), 3.4);
    if (done) full = 0;
    const pulse = t < PH[0] && t > 4.1 ? 1 + 0.18 * Math.sin(Math.PI * ((t - 4.1) % 1.15) / 1.15) : 1;
    R.setBox(this.x, { dot, dotS: pulse, lit, ring: 0.3 + 0.7 * full });
    this.body.setAttribute('transform', 'scale(1 ' + (1 + 0.035 * full) + ')');
    this.head.setAttribute('transform', 'rotate(' + (2 + 2 * full) + ' 0 30)');
    this.mouth.setAttribute('d', t > END + 0.5 ? R.mouthHappy : R.mouthNeutral);
    // the word in the middle of the box: the countdown, then the phase
    let w = '';
    COUNT.forEach(([a, c]) => { if (t >= a - 0.05 && t < a + 1.0) w = c; });
    if (i >= 0 && !done) w = WORD[i % 4];
    if (this.word.textContent !== w) this.word.textContent = w;
    this.word.classList.toggle('big', w.length === 1);
    R.put(this.word, 730, 450, 1, 0, w ? 1 : 0);
    // two round markers above the box, right one first
    [this.r0, this.r1].forEach((r, k) => {
      const on = round === k || (round > k) || done;
      r.setAttribute('transform', 'translate(' + (k ? 690 : 770) + ' 150) scale(' + Math.max(0.001, eo(seg(t, 7.2, 7.8))) + ')');
      r.firstChild.style.fill = on ? 'var(--main)' : 'var(--ground)';
    });
    R.place(this.a, 540, lerp(54, 40, eo(seg(t, 0.3, 0.7))), eo(seg(t, 0.3, 0.7)) * (1 - eo(seg(t, 6.9, 7.3))));
  },
});
