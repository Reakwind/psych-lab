# Session 3b storyboard: belly breathing — notice, understand, then three paced breaths with Ariel.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S03b.dc.html')
assert len(times) == 29
TEAL = '#4FA3A0'

def pacer(x, y, r, label=None, dots=None):
    """The breathing pacer: a soft circle that grows on the in-breath and shrinks on the out-breath, with count dots."""
    o = f'<circle cx="{x}" cy="{y}" r="{r + 16}" fill="{TEAL}" opacity=".12"></circle><circle cx="{x}" cy="{y}" r="{r}" fill="#CFE8E4" stroke="{TEAL}" stroke-width="3"></circle>'
    if label: o += f'<text x="{x}" y="{y + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="{INK}">{html.escape(label)}</text>'
    if dots:
        n, lit = dots
        o += ''.join(f'<circle cx="{x - (n - 1) * 9 + i * 18}" cy="{y + r + 28}" r="6" fill="{TEAL if i < lit else "#FFFFFF"}" stroke="{INK}" stroke-width="1.5"></circle>' for i in range(n))
    return o

def lying(belly_up=False, hand=True, x=96):
    o = mat(60, 300, 230) + cushion(84, 292) + ruth_lie(x, 290)
    if belly_up: o = o.replace(f'<rect x="{x - 10}" y="278"', f'<rect x="{x - 10}" y="272"')
    if hand: o += f'<ellipse cx="{x + 46}" cy="{272 if belly_up else 278}" rx="12" ry="7" fill="{SKIN}" stroke="{INK}" stroke-width="1.5"></ellipse>'
    return o

def meter(x, y, level):
    return (f'<rect x="{x - 10}" y="{y - 70}" width="20" height="80" rx="10" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>'
            f'<rect x="{x - 6}" y="{y + 6 - 72 * level}" width="12" height="{72 * level}" rx="6" fill="#E66A7A"></rect>' + lbl(x, y + 30, 'מתח', size=11))

def nose_mouth(x, y):
    return (f'<circle cx="{x}" cy="{y}" r="34" fill="{SKIN}" stroke="{INK}" stroke-width="2"></circle><path d="M{x - 4} {y - 6} q-6 14 4 14" fill="none" stroke="{INK}" stroke-width="2"></path>'
            f'<path d="M{x - 10} {y + 18} q10 6 20 0" fill="none" stroke="{INK}" stroke-width="2"></path>')

P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
S = {}
S[1] = room() + chair() + ruth(140, mood='happy') + ariel(250, wave=True) + tool(250, 120, 1, 22) + lbl(171, 40, 'מפגש 3 · נשימה בטנית', fill='#E3F4F0')
S[2] = room() + chair() + ruth(160) + f'<path d="M176 212 q20 -6 34 4" fill="none" stroke="{TEAL}" stroke-width="3" stroke-dasharray="4 5"></path>' + lbl(171, 40, 'רק לשים לב', fill='#E3F4F0')
S[3] = (P + nose_mouth(86, 150) + lbl(86, 206, 'אף או פה?', size=12) + wave(190, 120, 120, 14, 6) + wave(190, 200, 120, 14, 2) + lbl(250, 236, 'מהירה או איטית?', size=12)
        + lbl(171, 40, 'לא משנים כלום', fill='#FFF1CC'))
S[4] = (room() + chair() + ruth(160, mood='flat') + wave(40, 110, 260, 10, 9, col='#C0392B') + f'<circle cx="280" cy="190" r="14" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></circle><path d="M280 182 v8 l6 4" stroke="{INK}" stroke-width="2" fill="none"></path>'
        + lbl(171, 40, 'לחץ: מהירה ושטחית', fill='#FFF1CC'))
S[5] = (room() + chair() + ruth(160, mood='happy') + wave(40, 110, 260, 26, 2) + f'<circle cx="300" cy="70" r="16" fill="{SPARK}" stroke="{INK}" stroke-width="1.5"></circle>'
        + lbl(171, 40, 'רוגע: איטית ועמוקה', fill='#E3F4F0'))
S[6] = (P + wave(40, 120, 200, 22, 2) + f'<circle cx="270" cy="200" r="26" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></circle><path d="M270 200 l14 -14" stroke="{INK}" stroke-width="3" stroke-linecap="round"></path>'
        + f'<path d="M150 170 C150 230 200 250 240 220" fill="none" stroke="{TEAL}" stroke-width="3"></path><path d="M232 212 l10 8 l-12 4" fill="none" stroke="{TEAL}" stroke-width="3"></path>'
        + meter(86, 260, 0.35) + lbl(171, 40, 'גם בכיוון ההפוך', fill='#E3F4F0') + lbl(270, 250, 'נשיפה ארוכה', size=11))
S[7] = P + meter(120, 230, 0.3) + tool(230, 180, 1, 34) + f'<path d="M212 220 l12 12 l24 -26" fill="none" stroke="#2E8B57" stroke-width="5" stroke-linecap="round"></path>' + lbl(171, 40, 'לא נעלם · כלי שימושי', fill='#FFF1CC') + lbl(230, 262, 'מוכח מחקרית', size=11)
S[8] = torso(belly=1, flow='in') + lbl(171, 340, 'הבטן עולה בשאיפה', fill='#E3F4F0') + lbl(80, 220, 'סרעפת', size=11)
S[9] = room() + lying(belly_up=True) + lbl(171, 40, 'קל יותר בשכיבה על הגב', fill='#E3F4F0')
S[10] = P + pacer(110, 170, 50, 'שאיפה', (3, 3)) + pacer(240, 170, 34, 'נשיפה', (5, 5)) + lbl(171, 40, 'שלוש פנימה · חמש החוצה', fill='#FFF1CC')
S[11] = room() + lying() + pacer(171, 140, 36) + lbl(171, 40, 'יד על הבטן', fill='#E3F4F0')
S[12] = room() + lying() + pacer(171, 140, 36) + lbl(171, 40, 'בלי להתאמץ', fill='#E3F4F0')
S[13] = room() + lying() + pacer(171, 140, 30, '3 · 2 · 1')
S[14] = room() + lying(belly_up=True) + pacer(171, 140, 56, 'פנימה', (3, 3))
S[15] = room() + lying() + pacer(171, 140, 30, 'החוצה', (5, 5))
S[16] = room() + lying(belly_up=True) + pacer(171, 140, 56, 'פנימה')
S[17] = room() + lying() + pacer(171, 140, 30, 'החוצה')
S[18] = room() + lying(belly_up=True) + pacer(171, 140, 56, 'פנימה')
S[19] = room() + lying() + pacer(171, 140, 30, 'החוצה')
S[20] = room() + lying(hand=False) + f'<circle cx="171" cy="140" r="30" fill="none" stroke="{TEAL}" stroke-width="2" stroke-dasharray="4 6" opacity=".6"></circle>' + lbl(171, 40, 'יופי', fill='#FFF1CC')
S[21] = (room() + mat(60, 300, 230) + cushion(84, 292) + f'<path d="M210 290 q30 -20 70 0 v10 h-70Z" fill="#B9A6C9" stroke="{INK}" stroke-width="1.5"></path>'
        + ruth_lie(96, 290) + lbl(171, 40, 'סביבה נוחה, תנוחה נוחה', fill='#E3F4F0') + lbl(250, 270, 'שמיכה', size=11))
S[22] = room() + lying() + pacer(171, 140, 40) + f'<circle cx="290" cy="140" r="22" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></circle><path d="M290 140 l-12 -10" stroke="{INK}" stroke-width="3" stroke-linecap="round"></path>' + lbl(171, 40, 'לשנות את הקצב כשצריך', fill='#E3F4F0')
S[23] = (room() + lying(hand=False) + f'<path d="M120 230 a14 14 0 1 1 10 -10 a8 8 0 1 0 -6 6" fill="none" stroke="{SLATE}" stroke-width="2"></path>'
         + wave(170, 150, 120, 10, 2) + f'<polygon points="290,120 304,126 310,140 304,154 290,160 276,154 270,140 276,126" fill="#C0392B" stroke="{INK}" stroke-width="1.5"></polygon>'
         + lbl(171, 40, 'סחרחורת? חוזרים לנשימה טבעית', fill='#FFF1CC') + lbl(290, 180, 'עוצרים', size=11))
S[24] = room() + chair() + ruth(150) + f'<rect x="220" y="250" width="70" height="56" rx="8" fill="#D7DCE2" stroke="{INK}" stroke-width="2"></rect>' + lbl(255, 230, 'ציפיות', size=11) + lbl(171, 40, 'שמים בצד', fill='#E3F4F0')
S[25] = P + lbl(171, 130, 'חייבים להירגע', size=14) + strike(171, 130, 120) + lbl(171, 190, 'חוויה מיוחדת', size=14) + strike(171, 190, 110) + lbl(171, 40, 'לא חייבים', fill='#FFF1CC')
S[26] = P + wave(40, 130, 260, 20, 2) + lbl(171, 170, 'רגועה וזורמת', size=12) + wave(40, 250, 260, 10, 5, col=SLATE) + lbl(171, 290, 'משעממת ולא נוחה', size=12)
S[27] = room() + lying(hand=False) + f'<path d="M110 150 h120 v60 h-120Z" fill="none" stroke="{AMBER}" stroke-width="3" rx="10"></path><path d="M170 150 v60 M110 180 h120" stroke="{AMBER}" stroke-width="3"></path>' + wave(120, 180, 100, 8, 2) + lbl(171, 40, 'כמה רגעים לעצמנו', fill='#E3F4F0')
S[28] = room().replace(PAPER, '#EFEAE0') + lying() + lbl(171, 40, 'קחו רגע להתמקם', fill='#E3F4F0')
S[29] = room().replace(PAPER, '#EFEAE0') + lying() + pacer(171, 140, 36) + f'<path d="M164 128 v24 l20 -12Z" fill="{INK}"></path>' + lbl(171, 40, 'כשאתם מוכנים', fill='#FFF1CC')

ACTS = [
  (1, 'Act 1 · Just notice', [1, 2, 3], 'Ariel, excited, introduces the practice; first, Ruth simply notices her breath without changing it.'),
  (2, 'Act 2 · The breath follows us', [4, 5], 'Stress makes the wave fast and shallow; calm makes it slow and deep, all by itself.'),
  (3, 'Act 3 · And it works both ways', [6, 7], 'Ruth turns the dial: a longer out-breath lowers the tension meter. Not to zero, but a proven, useful tool.'),
  (4, 'Act 4 · Into the belly', [8, 9, 10], 'Inside view: the diaphragm drops and the belly rises. Easiest lying down; the rhythm is three in, five out.'),
  (5, 'Act 5 · Three breaths together', [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 'Ruth on the mat, hand on belly; the pacer grows and shrinks exactly on Ariel\'s counts.'),
  (6, 'Act 6 · Make it fit you', [21, 22, 23], 'Set up comfortably, adjust the pace, step back to natural breathing if dizzy, stop if it\'s too much.'),
  (7, 'Act 7 · No expectations', [24, 25, 26, 27, 28, 29], 'Expectations go aside; any day is fine. A few moments for yourself, then the pacer waits for Ruth to begin.'),
]
SHOT = {
 1: ('Ruth in the armchair, Ariel beside her, excited; the breath-wave badge glows above him. Title: מפגש 3 · נשימה בטנית.', 'Ariel and the room from 3a; the breath badge from session 1\'s backpack.', 'Cut in on the room.'),
 2: ('Ruth settles, eyes closed; a faint dashed line of air moves at her nose: רק לשים לב.', 'Same room.', 'Slow push in on Ruth.'),
 3: ('Two quiet questions: a face with nose and mouth (אף או פה?) and two waves, fast and slow (מהירה או איטית?). Nothing changes yet.', 'The breath wave is the session\'s main motif.', 'Each question fades in on its words.'),
 4: ('A doorbell-and-clock moment: Ruth tense, the wave above her goes tight, fast and red.', 'The wave.', 'The wave tightens on "לחץ".'),
 5: ('Sun at the window: Ruth relaxed, the wave slow, deep and teal. Caption: קורה מעצמו.', 'The wave.', 'The wave slows down smoothly.'),
 6: ('Ruth turns a dial; the out-breath stretches longer, and the tension meter drops.', 'The wave and a tension meter.', 'Dial turns; meter falls.'),
 7: ('The meter settles low but not to zero; the breath badge gets a check mark: כלי שימושי, מוכח מחקרית.', 'Breath badge.', 'Check mark draws on.'),
 8: ('Side cutaway of Ruth\'s torso (like the head close-up in session 2): the diaphragm drops and the belly rises with the in-breath; the chest stays still.', 'Same cutaway style as session 2\'s head.', 'Dip to light into the cutaway.'),
 9: ('Ruth lying on her back on the mat, hand on her belly, rising and falling: קל יותר בשכיבה.', 'Mat and cushion from 3a.', 'Dip back out to the room.'),
 10: ('The rhythm card: a growing circle with three dots (in) and a shrinking circle with five dots (out).', 'The pacer used in Act 5.', 'Dots fill as Ariel counts.'),
 11: ('Ruth lies down, hand on belly; the pacer circle appears above her.', 'Pacer.', 'Pacer fades in.'),
 12: ('Pacer idles gently: בלי להתאמץ.', 'Pacer.', 'Hold.'),
 13: ('The pacer shows 3 · 2 · 1 as Ariel counts down.', 'Pacer.', 'Numbers on Ariel\'s counts.'),
 14: ('In: the pacer grows over three counts, three dots fill, and Ruth\'s belly and hand rise.', 'Pacer, Ruth\'s belly.', 'Timed exactly to the recording.'),
 15: ('Out: the pacer shrinks over five counts, five dots fill, and the belly lowers.', 'Same.', 'Timed exactly to the recording.'),
 16: ('In, without counts: the pacer grows again.', 'Same.', 'On Ariel\'s word.'),
 17: ('Out.', 'Same.', 'On Ariel\'s word.'),
 18: ('In.', 'Same.', 'On Ariel\'s word.'),
 19: ('Out.', 'Same.', 'On Ariel\'s word.'),
 20: ('The pacer dissolves; Ruth smiles and breathes naturally: יופי.', 'Same.', 'Pacer fades out.'),
 21: ('Ruth arranges the mat, cushion and blanket: סביבה נוחה, תנוחה נוחה.', 'Mat and cushion.', 'Props slide into place.'),
 22: ('A pace dial beside the pacer turns slower: לשנות את הקצב כשצריך, לא מאומץ.', 'Pacer and dial.', 'Dial turns.'),
 23: ('A small dizzy swirl near Ruth\'s head → the pacer gives way to a natural wave; a gentle stop sign: עוצרים אם זה יותר מדי.', 'Wave from Act 2.', 'Swirl, then calm.'),
 24: ('Ruth sets a grey box labelled ציפיות aside on the floor.', 'Room.', 'Box lowered aside.'),
 25: ('Two expectations struck through: חייבים להירגע, חוויה מיוחדת.', 'Same.', 'Strike lines draw on.'),
 26: ('Two days\' waves: one calm and flowing, one bored and uncomfortable. Both are fine.', 'The wave.', 'Second wave draws on.'),
 27: ('A ribbon wraps a few moments of Ruth\'s breath like a small gift: כמה רגעים לעצמנו.', 'Wave.', 'Ribbon ties on.'),
 28: ('The room dims a little; Ruth settles on the mat: קחו רגע להתמקם.', 'Room, mat.', 'Light lowers.'),
 29: ('The pacer waits above her with a play mark: כשאתם מוכנים. Leads straight into the breathing practice.', 'Pacer; the next screen in the journey is the Breathing practice.', 'Hold on the waiting pacer.'),
}

legend1 = ('0 0 342 360', P + wave(40, 130, 260, 26, 2) + wave(40, 240, 260, 10, 8, col='#C0392B'), '<strong>The breath wave.</strong> Fast and red under stress, slow and teal when calm; the same badge as in session 1\'s backpack.')
legend2 = ('0 0 342 360', P + pacer(171, 170, 60, None, (3, 2)), '<strong>The pacer.</strong> Grows for three, shrinks for five, timed to Ariel\'s counts; the same look as the Breathing practice that follows.')
legend3 = ('0 0 342 360', torso(belly=1), '<strong>The torso cutaway.</strong> One inside view, drawn like session 2\'s head close-up, to show the belly rising.')
carried = ['<strong>Kept:</strong> Ruth\'s room, Ariel, the mat and cushion from 3a, the breath badge from session 1.',
           '<strong>Exact timing:</strong> in Act 5 every count is placed on Ariel\'s own word in the recording, so the pacer and the voice stay together at any playback speed.',
           '<strong>Made the same way:</strong> one video with his voice, checked before you see it.']
rows = build(B + 'S03bStory.dc.html', times, lines, S, ACTS, SHOT, 'Session 3b · נשימה בטנית',
      'Breath reflects how we feel, and it also works the other way: a slower, belly-led breath with a longer exhale can lower tension. Try it gently, adjust it to yourself, and expect nothing special.',
      'Ruth notices her breath → stress makes the wave fast, calm makes it slow → she turns it slower herself → inside, the belly rises → three paced breaths on the mat → tips, no expectations → the pacer waits for her.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
print('rows', rows)
