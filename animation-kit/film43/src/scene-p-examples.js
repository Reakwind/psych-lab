const { seg, eo, eio, eob, lerp } = kit;
const MSG = '<rect class="metal" x="-30" y="-48" width="60" height="96" rx="10"/><rect x="-24" y="-40" width="48" height="72" rx="5" style="fill:color-mix(in srgb, var(--ground) 60%, white)"/><path class="amber" d="M-16 -26 h32 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-20 l-10 8 v-8 h-2 a6 6 0 0 1 -6 -6 v-14 a6 6 0 0 1 6 -6Z"/>';
const TALK = '<circle class="skin" cx="-26" cy="0" r="22"/><path class="knit" d="M-56 50 C-54 20 2 20 4 50Z"/><circle class="nira-skin" cx="28" cy="2" r="22"/><path class="fra-top" d="M-2 52 C0 22 56 22 58 52Z"/><path class="light" d="M-20 -50 h40 a8 8 0 0 1 8 8 v10 a8 8 0 0 1 -8 8 h-20 l-10 8 v-8 h-10 a8 8 0 0 1 -8 -8 v-10 a8 8 0 0 1 8 -8Z" style="stroke:var(--second);stroke-width:3"/>';
const DONE = '<path style="fill:none;stroke:var(--main);stroke-width:16;stroke-linecap:round;stroke-linejoin:round" d="M-34 2 L-8 28 L38 -26"/>';
const SUN = '<circle class="amber" r="30"/>' + [0, 1, 2, 3, 4, 5, 6, 7].map((k) => '<rect class="amber" x="-4" y="-52" width="8" height="14" rx="4" transform="rotate(' + k * 45 + ')"/>').join('');
const THINK = R.CH.mind.replace('class="light"', 'class="amber-lt"');
const E = [[1.4, 820, 300, '<g transform="translate(-3 8) scale(.6)">' + R.mug('px-m') + '</g>', 'קפה טעים'], [2.6, 540, 300, MSG, 'הודעה ששמחתם לקבל'], [4.1, 260, 300, TALK, 'שיחה טובה'],
  [5.4, 820, 680, DONE, 'משהו שסיימתם'], [7.3, 540, 680, SUN, 'כמה דקות בשמש'], [10.3, 260, 680, THINK, 'מחשבה נעימה']];
kit.scene('p-examples', {
  init(kit) {
    kit.stage.append(kit.h('<div class="ground"><svg class="art" viewBox="0 0 1080 1080">' + E.map((e, k) => '<g class="px-e' + k + '">' + R.badge('px-b' + k, e[3]) + '</g>').join('') + '</svg>' +
      E.map((e, k) => '<div class="tag px-t' + k + '">' + e[4] + '</div>').join('') + '</div>'));
    Object.assign(this, R.refs(kit, 'px', ['e0', 'e1', 'e2', 'e3', 'e4', 'e5', 't0', 't1', 't2', 't3', 't4', 't5']));
  },
  render(t) {
    // a tasty coffee, a welcome message, a good talk, something finished, minutes in the sun, a pleasant thought
    E.forEach(([a, x, y], k) => {
      R.xf(this['e' + k], x, y + Math.sin(t * 1.5 + k) * 5, 1.3 * eob(seg(t, a - 0.2, a + 0.3), 1.7), eo(seg(t, a - 0.2, a)));
      R.place(this['t' + k], x, lerp(y + 128, y + 116, eo(seg(t, a, a + 0.4))), eo(seg(t, a, a + 0.4)));
    });
  },
});
