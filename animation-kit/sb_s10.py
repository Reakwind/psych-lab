# Session 10 storyboard: observing thoughts — thoughts float up like balloons; instead of being carried off, Ruth watches them, names them, and comes back to her breath.
import sys
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S10.dc.html')
assert len(times) == 13
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'

def balloon(x, y, text=None, s=1.0, fill='#FFFFFF'):
    """A drifting thought, the cloud balloon from sessions 3a and 6; text = a tag hung under it."""
    d = (f'M{x - 30 * s} {y + 14 * s} C{x - 46 * s} {y + 14 * s} {x - 46 * s} {y - 10 * s} {x - 28 * s} {y - 12 * s} C{x - 26 * s} {y - 34 * s} {x + 4 * s} {y - 38 * s} {x + 10 * s} {y - 20 * s} '
         f'C{x + 24 * s} {y - 34 * s} {x + 46 * s} {y - 22 * s} {x + 40 * s} {y - 4 * s} C{x + 52 * s} {y + 2 * s} {x + 48 * s} {y + 14 * s} {x + 36 * s} {y + 14 * s}Z')
    o = f'<path d="{d}" fill="{fill}" stroke="{INK}" stroke-width="2"></path>' + ''.join(f'<circle cx="{x + (k - 1) * 10 * s}" cy="{y}" r="{2.6 * s}" fill="{SLATE}"></circle>' for k in range(3))
    return o + (lbl(x, y + 30 * s, text, size=11) if text else '')

def string(x1, y1, x2, y2):
    return f'<path d="M{x1} {y1} C{(x1 + x2) / 2} {y1 - 30} {(x1 + x2) / 2} {y2 + 30} {x2} {y2}" fill="none" stroke="{SLATE}" stroke-width="1.6" stroke-dasharray="4 4"></path>'

def glow(x, y, rx, ry):
    return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{SPARK}" opacity=".35" stroke="{AMBER}" stroke-width="2"></ellipse>'

def gap(x1, x2, y):
    return f'<path d="M{x1} {y} H{x2} M{x1} {y - 8} v16 M{x2} {y - 8} v16" stroke="{INK}" stroke-width="2"></path>'

def inside(mood='flat'):
    """Ruth deep inside one thought: the balloon fills the frame, the room is gone."""
    return (f'<rect width="342" height="360" fill="#E9EEF3"></rect>' + balloon(171, 190, s=4.6, fill='#FFFFFF').replace(f'fill="{SLATE}"', 'fill="none"')
            + f'<g transform="translate(70 40) scale(.6)">{ruth(171, "stand", mood)}</g>')

def ariel_phone(x, y):
    return (f'<rect x="{x}" y="{y}" width="56" height="90" rx="9" fill="{INK}"></rect><rect x="{x + 5}" y="{y + 8}" width="46" height="70" rx="5" fill="#DDE8F2"></rect>'
            f'<circle cx="{x + 28}" cy="{y + 36}" r="11" fill="{SKIN}"></circle><path d="M{x + 17} {y + 33} Q{x + 28} {y + 18} {x + 39} {y + 33}Z" fill="{BEARD}"></path>'
            f'<path d="M{x + 18} {y + 38} Q{x + 28} {y + 54} {x + 38} {y + 38}Z" fill="{BEARD}"></path><path d="M{x + 14} {y + 76} v-14 q14 -10 28 0 v14Z" fill="{ARIEL}"></path>')

ROOM = room() + chair()

S = {}
S[1] = (ROOM + ruth(150) + lbl(171, 28, 'מפגש 10 · התבוננות במחשבות', fill='#E3F4F0') + string(150, 196, 70, 110) + string(150, 196, 260, 96)
        + balloon(70, 96, 'זיכרונות', .7) + balloon(170, 74, 'תוכניות', .7) + balloon(262, 84, 'דאגות', .7) + balloon(110, 150, 'שאלות', .6) + balloon(238, 150, 'משאלות', .6))
S[2] = inside() + lbl(171, 330, 'עמוק בתוך המחשבה', fill='#FFF1CC')
S[3] = ROOM + ruth(150) + balloon(80, 90, s=.8) + balloon(200, 70, s=.7) + arrow(120, 90, 260, 90, SLATE, 2) + lbl(171, 28, 'להתבונן', fill='#E3F4F0') + lbl(250, 130, 'במקום ללכת איתה', size=11)
S[4] = (ROOM + ruth(150) + glow(150, 252, 30, 22) + balloon(70, 96, s=.7) + lbl(70, 128, '"זה זיכרון"', fill='#FFF1CC', size=11) + balloon(171, 70, s=.7) + lbl(171, 102, '"זה תכנון"', fill='#FFF1CC', size=11)
        + balloon(272, 96, s=.7) + lbl(272, 128, '"זאת דאגה"', fill='#FFF1CC', size=11) + lbl(250, 230, 'חוזרים לנשימה', size=11) + lbl(171, 22, 'הנה מחשבה · לתת לה שם', size=11))
S[5] = (P + balloon(171, 90, s=.9) + lbl(171, 170, 'להפסיק לחשוב', size=13) + strike(171, 170, 110) + lbl(171, 220, 'לחלק ציונים', size=13) + strike(171, 220, 100)
        + lbl(171, 270, 'להחליף במחשבות חיוביות', size=13) + strike(171, 270, 180))
S[6] = bighead(f'<circle cx="171" cy="150" r="20" fill="{SPARK}" opacity=".7"></circle>') + balloon(300, 60, s=.6) + gap(236, 290, 100) + lbl(171, 330, 'לזהות · ממרחק בריא', fill='#FFF1CC')
S[7] = (ROOM + ruth(110) + balloon(250, 80, s=.8) + arrow(210, 60, 120, 60, SLATE, 2) + lbl(250, 130, 'חולפת', fill='#E3F4F0', size=11)
        + lbl(270, 210, 'להאמין', size=11) + strike(270, 210, 50) + lbl(270, 246, 'לפתור', size=11) + strike(270, 246, 46) + lbl(270, 282, 'לפעול', size=11) + strike(270, 282, 46))
S[8] = room(door_open=True) + chair() + ruth(150) + balloon(250, 90, s=.8) + gap(170, 212, 120) + lbl(171, 28, 'המרחק הקטן הזה', fill='#E3F4F0') + lbl(171, 340, 'בוחרים איך להגיב', fill='#FFF1CC', size=12)
S[9] = ROOM + ruth(150) + balloon(171, 60, s=.6) + bubble(100, 120, 'דפוס חשיבה שמוכר לי?', w=170, size=11) + bubble(246, 160, 'רוצה להמשיך איתה עכשיו?', w=170, size=11)
S[10] = ROOM + ruth(150) + balloon(56, 130, s=.5) + arrow(80, 150, 40, 190, SLATE, 2) + bubble(220, 80, 'יש כאן משהו שדורש פעולה?', w=190, size=11) + bubble(220, 140, 'או לתת לה לעבור?', w=140, size=11)
S[11] = inside() + ariel_phone(270, 230) + balloon(298, 210, s=.35) + lbl(171, 330, 'זה קורה לי כל הזמן. ולכולם.', fill='#FFF1CC', size=12)
S[12] = ROOM + ruth(150) + string(160, 196, 200, 120) + balloon(204, 108, s=.7) + arrow(250, 80, 214, 104, AMBER) + glow(168, 316, 26, 8) + lbl(171, 28, 'שמתם לב שנסחפתם', size=11) + lbl(171, 340, 'חוזרים לרגע הזה', fill='#E3F4F0', size=12)
S[13] = (ROOM + glow(150, 250, 90, 70) + ruth(150, mood='happy') + balloon(60, 70, s=.4) + balloon(290, 90, s=.35)
         + lbl(171, 28, 'יותר בקלות · יותר חמלה', fill='#FFF1CC', size=12) + lbl(171, 340, 'מרחב ויציבות פנימית', fill='#E3F4F0', size=12))

ACTS = [
  (1, 'Act 1 · A mind that never stops', [1, 2], 'Balloons float up from Ruth: memories, plans, worries, questions, wishes. One swells until she\'s inside it and the room is gone.'),
  (2, 'Act 2 · Watching instead', [3, 4, 5], 'Now she stays in her chair and watches them pass, names one or two, and comes back to her breath. Not stopping, grading or swapping thoughts.'),
  (3, 'Act 3 · A healthy distance', [6, 7, 8], 'The head cutaway: the brain\'s ability to see a thought from a distance, as something passing. That small gap opens the door to choosing a response.'),
  (4, 'Act 4 · A moment to ask', [9, 10], 'Is this a familiar pattern? Do I want to stay with it? Does it need action, or can it pass?'),
  (5, 'Act 5 · Drifting is part of it', [11, 12, 13], 'She\'ll drift again; Ariel says it happens to him too. Noticing the drift is the moment to come back. With practice: easier, kinder, steadier.'),
]
SHOT = {
 1: ('Ruth in her chair; small cloud balloons float up from her, each with a tag: זיכרונות, תוכניות, דאגות, שאלות, משאלות. Title: מפגש 10 · התבוננות במחשבות.', 'Room; the thought balloon on a string (sessions 3a, 6) is the anchor.', 'Balloons rise one per word.'),
 2: ('One balloon swells to fill the frame; Ruth is inside it and the room fades: עמוק בתוך המחשבה.', 'Same balloon.', 'Push in until the balloon swallows the room.'),
 3: ('Back in the chair: balloons drift past the window; her eyes follow but she stays put: להתבונן, במקום ללכת איתה.', 'Room.', 'Pop back out of the balloon.'),
 4: ('One by one a balloon gets a name tag: "זה זיכרון", "זה תכנון", "זאת דאגה"; then a soft glow at her chest: חוזרים לנשימה.', 'Glow of noticing (session 6).', 'Tags stick on each name; glow on "נשימה".'),
 5: ('Three tags struck through: להפסיק לחשוב, לחלק ציונים, להחליף במחשבות חיוביות. The balloon floats on.', 'Struck tags (session 7).', 'Strikes draw in turn.'),
 6: ('The head cutaway from session 2, the bulb aglow; a balloon outside it at a measured gap: לזהות · ממרחק בריא.', 'Head cutaway.', 'Dip into the head.'),
 7: ('A balloon drifts across the room and out: חולפת. Beside it להאמין · לפתור · לפעול, each struck: no need to, right away.', 'Room.', 'Balloon drifts; strikes draw.'),
 8: ('The small gap between Ruth and the balloon; the room\'s door opens a crack of light: בוחרים איך להגיב.', 'Arm\'s length bracket and the door (session 7).', 'Door swings open.'),
 9: ('Two questions rise beside Ruth: דפוס חשיבה שמוכר לי? · רוצה להמשיך איתה עכשיו?', 'Room.', 'Bubbles pop in turn.'),
 10: ('Two more: יש כאן משהו שדורש פעולה? · או לתת לה לעבור? The balloon slips out of the window.', 'Room window.', 'Balloon drifts out on "לעבור".'),
 11: ('Ruth is inside a thought again. Ariel on her phone, his own little balloon beside him: זה קורה לי כל הזמן. ולכולם.', 'Ariel on Ruth\'s phone (sessions 3a, 6).', 'Push into the balloon again; phone pops in.'),
 12: ('She notices; the string draws the balloon back to its place, her feet glow on the floor: חוזרים לרגע הזה.', 'String and feet glow (session 6).', 'Balloon shrinks back; room returns.'),
 13: ('Calm wide shot: Ruth smiles, small balloons drift by at a distance, warm light around her: יותר בקלות · יותר חמלה · מרחב ויציבות פנימית.', 'Room.', 'Slow pull back; hold.'),
}
legend1 = ('0 0 342 360', ROOM + ruth(150) + string(150, 196, 260, 96) + balloon(262, 84, 'דאגות', .7), '<strong>The thought balloon.</strong> From sessions 3a and 6: thoughts float up and drift by; Ruth can watch them pass.')
legend2 = ('0 0 342 360', inside(), '<strong>Inside a thought.</strong> When she\'s carried off, the balloon fills the frame and the room disappears.')
legend3 = ('0 0 342 360', room(door_open=True) + chair() + ruth(150) + balloon(250, 90, s=.8) + gap(170, 212, 120), '<strong>A small distance.</strong> The gap between Ruth and the thought, and the door it opens.')
carried = ['<strong>Kept:</strong> Ruth\'s room, the balloon and string (3a, 6), the head cutaway (2), arm\'s length and the door (7), Ariel on her phone.', '<strong>Words on screen</strong> are Ariel\'s; the thought balloons carry no invented thoughts.', '<strong>Made the same way:</strong> beats on Ariel\'s pauses, one video with his voice.']
rows = build(B + 'S10Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 10 · התבוננות במחשבות',
      'The mind makes thoughts nonstop, and we\'re often inside one before we notice. Instead of being carried off, we can watch a thought, name it, and come back to the breath. That small distance lets us choose how to respond, and drifting off is part of the practice.',
      'Balloons float up from Ruth → one swallows her and the room vanishes → she watches them pass, names them, breathes → a small gap, a door opens → she drifts again (Ariel too) → notices, comes back to the room, calmer.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
_p = B + 'S10Story.dc.html'; _s = open(_p, encoding='utf-8').read()
open(_p, 'w', encoding='utf-8').write(_s.replace('"height":4700', '"height":4200'))
print('rows', rows)
