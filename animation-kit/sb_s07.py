# Session 7 storyboard: thoughts are not facts — one unanswered call, three readings, the brain's shortcuts, and a question mark.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S07.dc.html')
assert len(times) == 26
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'

def card(x, y, text, kind='plain', w=None, size=11):
    return thought_card(x, y, text, kind, w=w).replace('font-size="13"', f'font-size="{size}"')

def ringing(x, y):
    return phone(x, y, '…').replace(lbl(x + 11, y - 18, '…', size=12), '') + f'<path d="M{x + 28} {y + 6} q8 8 0 16 M{x + 34} {y} q14 14 0 28" stroke="{AMBER}" stroke-width="2.5" fill="none" stroke-linecap="round"></path>'

def puzzle(x, y, missing=True, fill_col=None):
    o = ''
    for i in range(3):
        for j in range(3):
            if missing and (i, j) == (1, 1): continue
            c = fill_col if (fill_col and (i, j) == (1, 1)) else '#E7DCCB'
            o += f'<rect x="{x - 66 + i * 44}" y="{y - 66 + j * 44}" width="42" height="42" rx="6" fill="{c}" stroke="{INK}" stroke-width="2"></rect>'
    return o

def brainhead(content=''):
    return bighead(content)

S = {}
S[1] = room() + chair() + ruth(150) + ringing(200, 210) + friend(290).replace('186', '186') + lbl(171, 40, 'מפגש 7 · מחשבות הן לא עובדות', fill='#E3F4F0')
S[2] = (room() + chair() + ruth(150, mood='flat') + phone(200, 210, 'הודעה ✓') + f'<circle cx="270" cy="110" r="30" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></circle><path d="M270 92 v18 l12 8" stroke="{INK}" stroke-width="2.5" fill="none"></path>'
        + lbl(270, 160, 'כמה שעות', size=11))
S[3] = room() + chair() + ruth(150, mood='flat') + card(171, 70, 'קרה לה משהו') + card(90, 130, 'היא מתעלמת ממני', w=130) + card(258, 130, 'היא בטח עסוקה', w=120)
S[4] = P + phone(160, 180, '…').replace(lbl(171, 162, '…', size=12), '') + ''.join(f'<path d="M171 230 L{x} 300" stroke="{SLATE}" stroke-width="1.5" stroke-dasharray="3 4"></path>' for x in (80, 171, 262)) + lbl(171, 60, 'אותו מצב · מחשבה אחרת', fill='#FFF1CC')
S[5] = (P + ''.join(f'<g transform="translate({dx} 40) scale(.33)">{room()}{ruth(160, "stand", m)}</g>' for dx, m in ((228, 'flat'), (114, 'flat'), (0, 'happy')))
        + lbl(285, 190, 'דואגת · מתקשרת', size=10) + lbl(171, 190, 'נפגעת · כועסת', size=10) + lbl(57, 190, 'ממשיכה ביום', size=10) + lbl(171, 280, 'מה שנחשוב → מה שנרגיש → מה שנעשה', size=10))
S[6] = P + card(270, 170, 'מחשבה', w=80) + arrow(224, 170, 196, 170) + card(160, 170, 'רגש', w=60) + arrow(124, 170, 100, 170) + card(60, 170, 'מעשה', w=60) + lbl(171, 60, 'משפיעות', fill='#E3F4F0')
S[7] = P + f'<rect x="96" y="120" width="150" height="90" rx="10" fill="#9AA3AD" stroke="{INK}" stroke-width="3"></rect>' + f'<text x="171" y="172" text-anchor="middle" font-size="14" font-weight="700" fill="#FFFFFF">היא מתעלמת ממני</text>' + lbl(210, 230, 'עובדה?', fill='#FFF1CC')
S[8] = P + card(171, 170, 'היא מתעלמת ממני', w=160) + lbl(171, 90, 'מחשבה ≠ עובדה', fill='#FFF1CC')
S[9] = brainhead(puzzle(171, 150)) + lbl(171, 330, 'המוח משלים מהר', fill='#E3F4F0')
S[10] = brainhead(puzzle(171, 150, missing=False, fill_col='#9AA3AD')) + lbl(171, 330, 'לפי מה שמכירים · ואיך שמרגישים', fill='#FFF1CC')
S[11] = (P + f'<path d="M40 300 C80 200 140 300 180 200 C220 110 280 160 300 80" fill="none" stroke="#D9CBB0" stroke-width="18" stroke-linecap="round"></path>'
         + f'<path d="M40 300 L270 110" fill="none" stroke="{AMBER}" stroke-width="5" stroke-dasharray="8 6"></path><circle cx="300" cy="80" r="12" fill="#5BAA6A" stroke="{INK}" stroke-width="2"></circle><circle cx="270" cy="110" r="8" fill="{AMBER}"></circle>'
         + lbl(171, 40, 'קיצורי דרך', fill='#E3F4F0') + lbl(250, 160, 'מהר, פחות מדויק', size=11))
S[12] = (P + f'<path d="M40 300 L230 130" fill="none" stroke="{AMBER}" stroke-width="5" stroke-dasharray="8 6"></path><ellipse cx="230" cy="140" rx="40" ry="14" fill="{INK}"></ellipse>'
         + lbl(171, 40, 'מלכודות חשיבה', fill='#FFF1CC') + lbl(260, 190, 'לכיוון השלילי', size=11))
S[13] = brainhead(f'<circle cx="171" cy="150" r="22" fill="#D9534F" stroke="{INK}" stroke-width="2"></circle><path d="M150 120 q-14 -14 0 -30 M192 120 q14 -14 0 -30" stroke="#D9534F" stroke-width="3" fill="none"></path>') + lbl(171, 330, 'בנוי לזהות סכנות', fill='#E3F4F0')
S[14] = (room() + chair() + ruth(110, mood='flat') + card(240, 90, 'לא חזרו אליי עם תוצאות הבדיקה', w=170, size=10)
         + ''.join(f'<rect x="{200 + k * 22}" y="{150 + k * 30}" width="40" height="10" fill="#9AA3AD" stroke="{INK}" stroke-width="1.5"></rect>' for k in range(4)) + arrow(220, 160, 290, 270, '#D9534F') + lbl(250, 300, 'התרחיש הכי גרוע', size=11))
S[15] = (P + card(171, 90, 'אם לא כמו פעם, אין טעם בכלל', w=210) + f'<rect x="80" y="180" width="180" height="16" rx="8" fill="#E7DCCB" stroke="{INK}" stroke-width="2"></rect>'
         + f'<circle cx="86" cy="188" r="16" fill="{INK}"></circle><circle cx="254" cy="188" r="16" fill="{INK}"></circle>' + lbl(171, 240, 'הכול או כלום', size=11))
S[16] = P + card(171, 160, 'בטח משהו לא בסדר', w=160) + lbl(110, 118, 'מחשבה', fill='#FFF1CC', size=11) + lbl(171, 60, 'לזהות, לא להפסיק', fill='#E3F4F0')
S[17] = room() + ruth(110, 'stand') + card(250, 130, 'בטח משהו לא בסדר', w=140, size=10) + f'<path d="M140 180 H178 M140 172 v16 M178 172 v16" stroke="{INK}" stroke-width="2"></path>' + lbl(171, 40, 'נוצר קצת מרחב', fill='#E3F4F0')
S[18] = P + card(171, 160, 'שום דבר אף פעם לא מסתדר לי.', w=230, size=12)
S[19] = P + card(171, 160, 'שום דבר אף פעם לא מסתדר לי?', w=230, size=12).replace('#D7DCE2', '#FFFFFF') + f'<circle cx="64" cy="160" r="20" fill="{SPARK}" opacity=".5"></circle>' + lbl(171, 230, 'רק סימן שאלה', fill='#FFF1CC')
S[20] = (P + card(171, 110, 'שום דבר אף פעם לא מסתדר לי?', w=230, size=12).replace('#D7DCE2', '#FFFFFF') + card(110, 200, 'עובדה?', 'plain', w=80) + card(240, 200, 'דרך אחרת להסתכל?', 'kind', w=140, size=10))
S[21] = (P + f'<path d="M171 300 C171 240 180 180 214 130" stroke="#6E9E58" stroke-width="8" fill="none" stroke-linecap="round"></path><path d="M214 130 C234 124 242 136 236 146 C224 146 216 140 214 130Z" fill="#6E9E58"></path>' + lbl(171, 60, 'גמישות מחשבתית', fill='#FFF1CC'))
S[22] = (room() + chair() + ruth(110, mood='happy') + f'<rect x="200" y="80" width="110" height="190" rx="14" fill="{INK}"></rect><rect x="208" y="92" width="94" height="166" rx="8" fill="#F4F1EA"></rect>'
         + card(255, 130, 'לזהות', w=70) + card(255, 175, 'מרחק', w=70) + card(255, 220, 'לבחור', 'kind', w=70) + lbl(171, 40, 'פעילויות באפליקציה', fill='#E3F4F0'))
S[23] = P + lbl(171, 90, 'לחשוב חיובי', size=14) + strike(171, 90, 100) + card(270, 200, 'מחשבה', w=80) + f'<path d="M224 200 L196 200" stroke="{INK}" stroke-width="3" stroke-dasharray="4 6"></path>' + card(150, 200, 'רגש · מעשה', w=100) + lbl(171, 280, 'לא כל מחשבה קובעת', fill='#E3F4F0')
S[24] = room() + chair() + ruth(150, mood='flat') + wave(60, 120, 220, 22, 4, col='#8C5C82') + lbl(171, 40, 'לא להתווכח, לא למהר', fill='#FFF1CC')
S[25] = room() + chair() + ruth(150) + bubble(110, 110, 'מה עובר לי בראש?', w=140) + bubble(250, 160, 'עובדה או פרשנות?', w=140)
S[26] = (room(door_open=True) + chair() + ruth(150, mood='happy') + lbl(171, 40, 'מרווח קטן · אפשרות אחרת', fill='#E3F4F0'))

ACTS = [
  (1, 'Act 1 · No answer', [1, 2], 'Ruth calls a good friend; no answer. A message, a few hours, still nothing.'),
  (2, 'Act 2 · Three readings', [3, 4, 5], 'Three thoughts about the same silent phone, and three different afternoons.'),
  (3, 'Act 3 · Thoughts feel like facts', [6, 7, 8], 'Thought → feeling → action. A thought can harden into a "fact" — but it isn\'t one.'),
  (4, 'Act 4 · The brain fills gaps', [9, 10, 11], 'Inside the head from session 2: a puzzle missing a piece, filled in with what we know and how we feel; quick shortcuts, less accurate.'),
  (5, 'Act 5 · Thinking traps', [12, 13, 14, 15], 'Shortcuts can lead into traps, often toward the worst; the brain\'s alarm; jumping to the worst case, all-or-nothing.'),
  (6, 'Act 6 · Notice it', [16, 17], 'The aim isn\'t to stop these thoughts but to recognise them. Labelled as a thought, it moves to arm\'s length.'),
  (7, 'Act 7 · Add a question mark', [18, 19, 20, 21], 'The full stop becomes a question mark; now Ruth can check it. That\'s mental flexibility, the bending reed.'),
  (8, 'Act 8 · Practised in the app', [22, 23], 'Activities to notice, distance and choose; not positive thinking, just not letting every thought decide.'),
  (9, 'Act 9 · Next time', [24, 25, 26], 'A strong feeling: no arguing, just pause and ask. A small gap opens a door.'),
]
SHOT = {
 1: ('Ruth in her chair calls a friend; the phone rings unanswered. Title: מפגש 7 · מחשבות הן לא עובדות.', 'Room, phone; the friend from session 5.', 'Phone rings out.'),
 2: ('She sends a message; a clock spins through hours; still one grey tick.', 'Same.', 'Clock hands race.'),
 3: ('Three thought cards rise one after another: קרה לה משהו / היא מתעלמת ממני / היא בטח עסוקה.', 'Thought cards from session 4.', 'Cards rise on each quote.'),
 4: ('The phone in the middle, unchanged; three paths lead from it: אותו מצב, מחשבה אחרת.', 'Same phone.', 'Paths branch out.'),
 5: ('Three small Ruths: one worried, calling again; one hurt and angry; one carrying on with her day.', 'Ruth.', 'Each panel on its sentence.'),
 6: ('Thought → feeling → action, as three linked cards.', 'Cards.', 'Arrows draw.'),
 7: ('A thought card hardens into a grey slab stamped "עובדה?".', 'The heavy card from session 4.', 'Card hardens.'),
 8: ('The slab softens back into a card: מחשבה ≠ עובדה.', 'Same card.', 'Stamp lifts.'),
 9: ('Inside the head (session 2\'s cutaway): a puzzle with a missing piece; the brain hurries to complete it.', 'Head cutaway from session 2.', 'Dip into the head.'),
 10: ('The gap is filled with a grey piece, coloured by memory and mood.', 'Same.', 'Piece drops in.'),
 11: ('A long winding road and a dashed shortcut that ends just beside the target: fast, less accurate.', 'Path idea from session 1.', 'Shortcut draws on.'),
 12: ('The shortcut ends in a pit: מלכודות חשיבה, tilted toward the negative.', 'Same.', 'Pit opens.'),
 13: ('Back in the head: an alarm light flashes, built to spot danger, quicker under stress.', 'Head cutaway.', 'Alarm pulses.'),
 14: ('Ruth with a card, "no test results yet"; the steps tumble straight down to the worst case.', 'Room.', 'Steps fall.'),
 15: ('An all-or-nothing switch with only its two ends: "if not like before, no point at all".', 'Cards.', 'Switch snaps to an end.'),
 16: ('A label מחשבה is stuck on a thought card: recognising, not stopping.', 'Cards.', 'Label sticks on.'),
 17: ('Ruth steps back; a gap opens between her and the card: נוצר קצת מרחב.', 'Arm\'s length from session 4.', 'Gap draws.'),
 18: ('A card: "שום דבר אף פעם לא מסתדר לי."', 'Cards.', 'Card pops.'),
 19: ('The full stop turns into a question mark; the card lightens.', 'Same card.', 'Dot morphs into "?".'),
 20: ('Two small cards appear under it: עובדה? and דרך אחרת להסתכל?', 'Same.', 'Cards branch.'),
 21: ('The bending reed from session 3a: גמישות מחשבתית.', 'Reed from 3a.', 'Reed sways.'),
 22: ('Ruth\'s phone with activity cards: לזהות, מרחק, לבחור.', 'Phone and the Inner Voice game look.', 'Cards slide up.'),
 23: ('"Think positive" struck through; the arrow from thought to feeling and action loosens.', 'Struck tag from session 4.', 'Arrow fades to dashes.'),
 24: ('A strong wave of feeling rises in Ruth; no arguing, no rushing.', 'Feeling wave from session 4.', 'Wave swells.'),
 25: ('She pauses and asks: מה עובר לי בראש? עובדה או פרשנות?', 'Room.', 'Questions pop.'),
 26: ('The room\'s door opens a crack of warm light: a small gap, another way to respond.', 'Ruth\'s room door.', 'Door swings open slightly.'),
}
legend1 = ('0 0 342 360', room() + chair() + ruth(150) + ringing(200, 210), '<strong>The unanswered call.</strong> One everyday situation the whole session returns to.')
legend2 = ('0 0 342 360', bighead(puzzle(171, 150)), '<strong>Inside the head.</strong> Session 2\'s cutaway: a puzzle the brain completes quickly, sometimes wrongly.')
legend3 = ('0 100 342 140', P + card(171, 160, 'שום דבר אף פעם לא מסתדר לי?', w=230, size=12), '<strong>The question mark.</strong> Same words, one mark: a thought becomes something to check.')
carried = ['<strong>Kept:</strong> Ruth\'s room and phone, the head cutaway (session 2), thought cards and arm\'s length (session 4), the reed (3a).', '<strong>Thought examples</strong> are exactly the ones Nira says.', '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S07Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 7 · מחשבות הן לא עובדות',
      'The same situation can be read in very different ways, and each reading changes how we feel and act. Thoughts are the brain\'s fast interpretations, sometimes caught in traps. Noticing them, and adding a question mark, opens a little room to respond differently.',
      'A call goes unanswered → three thoughts, three different days → a thought hardens into a "fact" → the brain fills gaps with shortcuts and traps → label it, step back → add a question mark → the door opens a crack.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
print('rows', rows)
