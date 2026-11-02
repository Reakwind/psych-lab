# Session 29 storyboard: the beam of attention from session 28 returns. What it lands on, Ruth feels; she chooses where it goes (breath, a body scan),
# and when it drifts to dinner she just brings it back. No result to reach, moving is fine, any posture.
import sys
sys.path.insert(0, '.')
from sb_s25to37_kit import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S29.dc.html')
assert len(times) == 16

def hand_close(x=171, y=210):
    """Close-up: Ruth's left hand resting on the armrest (as in session 28)."""
    return (f'<rect x="0" y="0" width="342" height="360" fill="#EFE7F3"></rect><rect x="-10" y="{y + 10}" width="362" height="70" rx="30" fill="#B9A6C9" stroke="{INK}" stroke-width="2.5"></rect>'
            f'<path d="M-10 {y - 10} L{x - 40} {y} " stroke="{PLUM}" stroke-width="44" stroke-linecap="round"></path>'
            f'<path d="M{x - 50} {y - 6} Q{x - 20} {y - 34} {x + 30} {y - 20} L{x + 76} {y - 22} Q{x + 86} {y - 14} {x + 76} {y - 8} L{x + 40} {y - 4} L{x + 80} {y} Q{x + 88} {y + 8} {x + 78} {y + 12} L{x + 30} {y + 14} Q{x - 20} {y + 24} {x - 50} {y + 14}Z" fill="{SKIN}" stroke="{INK}" stroke-width="2.5"></path>')

def spark_mark(x, y, kind):
    return {'touch': f'<path d="M{x - 20} {y} h40" stroke="{AMBER}" stroke-width="3" stroke-dasharray="4 4"></path>',
            'temp': f'<path d="M{x} {y - 14} v20" stroke="#E66A7A" stroke-width="5" stroke-linecap="round"></path><circle cx="{x}" cy="{y + 8}" r="6" fill="#E66A7A"></circle>',
            'tingle': ''.join(f'<circle cx="{x + dx}" cy="{y + dy}" r="2.4" fill="{AMBER}"></circle>' for dx, dy in ((-8, -4), (0, 6), (8, -6), (4, -12))),
            'move': f'<path d="M{x - 10} {y} q5 -6 10 0 t10 0" fill="none" stroke="{TEAL}" stroke-width="3"></path>'}[kind]

def marks(o=1):
    return f'<g opacity="{o}">' + spark_mark(180, 236, 'touch') + spark_mark(250, 160, 'temp') + spark_mark(120, 170, 'tingle') + spark_mark(240, 250, 'move') + '</g>'

def bodyscan(k):
    pts = [(222, 296), (190, 290), (150, 282), (110, 280), (72, 288)]
    x, y = pts[k]
    return lying(eyes_closed=True) + ''.join(f'<circle cx="{px}" cy="{py - 24}" r="4" fill="{AMBER if i <= k else "#FFFFFF"}" stroke="{INK}" stroke-width="1"></circle>' for i, (px, py) in enumerate(pts)) + spotlight(x, y, 40, 0.25)

def magnifier(x, y):
    return f'<circle cx="{x}" cy="{y}" r="30" fill="#FFFFFF" fill-opacity=".3" stroke="{INK}" stroke-width="3"></circle><line x1="{x + 21}" y1="{y + 21}" x2="{x + 42}" y2="{y + 42}" stroke="{INK}" stroke-width="6" stroke-linecap="round"></line>'

def plate(x, y):
    """Dinner: a plate with a fork and knife (inside a thought balloon)."""
    return (f'<circle cx="{x}" cy="{y}" r="15" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></circle><circle cx="{x}" cy="{y}" r="9" fill="#F3C9A8" stroke="{INK}" stroke-width="1"></circle>'
            f'<path d="M{x - 22} {y - 12} v24 M{x + 22} {y - 12} v24" stroke="{INK}" stroke-width="2" stroke-linecap="round"></path>')

def guide_phone(x, y):
    return (f'<rect x="{x - 18}" y="{y - 30}" width="36" height="60" rx="6" fill="{INK}"></rect><rect x="{x - 14}" y="{y - 25}" width="28" height="48" rx="3" fill="#DCE7F2"></rect>'
            f'<circle cx="{x}" cy="{y - 6}" r="7" fill="{SKIN}"></circle><path d="M{x - 7} {y - 2} q7 10 14 0" fill="{BEARD}"></path><rect x="{x - 9}" y="{y + 4}" width="18" height="16" rx="5" fill="{ARIEL}"></rect>')

def returns(x, y, lit):
    return ''.join(f'<circle cx="{x - 30 + i * 20}" cy="{y}" r="7" fill="{AMBER if i < lit else "#FFFFFF"}" stroke="{INK}" stroke-width="1.5"></circle>' for i in range(4))

def heart(x, y, s=1):
    return f'<path d="M{x} {y + 12 * s} C{x - 22 * s} {y} {x - 14 * s} {y - 18 * s} {x} {y - 7 * s} C{x + 14 * s} {y - 18 * s} {x + 22 * s} {y} {x} {y + 12 * s}Z" fill="#E66A7A" stroke="{INK}" stroke-width="1.5"></path>'

ROOM = room() + chair()
S = {}
S[1] = (ROOM + ruth(150) + chair_hand(184, 264) + spotlight(184, 262, 34, 0.25)
        + lbl(171, 40, 'מפגש 29 · תשומת לב לנשימה וסריקת גוף', fill='#E3F4F0', size=12) + lbl(250, 180, 'כף יד שמאל', size=12))
S[2] = (hand_close() + spotlight(190, 205, 130, 0.2) + marks()
        + lbl(260, 60, 'המגע במשטח', size=11) + lbl(171, 96, 'הטמפרטורה', size=11) + lbl(80, 60, 'עקצוץ קטן', size=11) + lbl(171, 320, 'מתח או תנועה', size=11))
S[3] = (hand_close() + marks(.45) + spotlight(300, 70, 60, 0.2)
        + lbl(171, 60, 'התחושות היו שם גם קודם', size=12) + lbl(171, 320, 'מה שהשתנה: תשומת הלב', fill='#FFF1CC'))
S[4] = (ROOM + ruth(150) + balloon(286, 92) + f'<circle cx="230" cy="130" r="14" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></circle>'
        + f'<path d="M286 110 C250 150 230 160 230 144 M230 144 C150 160 90 170 50 178" fill="none" stroke="{AMBER}" stroke-width="2" stroke-dasharray="4 6"></path>'
        + spotlight(150, 252, 30, 0.2) + arrow(200, 200, 160, 244, AMBER) + lbl(110, 100, 'ממחשבה למחשבה, מדבר לדבר', size=11) + lbl(171, 40, 'אנחנו בוחרים לאן להפנות אותה', fill='#E3F4F0'))
S[5] = (P + f'<rect x="30" y="70" width="282" height="260" rx="14" fill="#EAF1EF" stroke="{INK}" stroke-width="1.5"></rect>'
        + f'<path d="M120 320 L120 170 Q120 120 170 116 L200 116 Q230 120 236 160 L240 320Z" fill="{PLUM}" stroke="{INK}" stroke-width="2"></path>'
        + f'<ellipse cx="180" cy="200" rx="36" ry="44" fill="#E9A3AE" stroke="{INK}" stroke-width="1.5"></ellipse><path d="M146 250 q34 -20 70 0" stroke="#D9534F" stroke-width="5" fill="none"></path>'
        + f'<path d="M300 110 C270 110 250 112 236 120" stroke="{TEAL}" stroke-width="4" stroke-dasharray="6 6" fill="none"></path>' + arrow(250, 290, 268, 290, AMBER)
        + lbl(260, 90, 'האוויר נכנס ויוצא', size=11) + lbl(84, 200, 'בית החזה', size=11) + lbl(84, 280, 'הבטן', size=11) + lbl(171, 34, 'תשומת לב לנשימה', fill='#E3F4F0'))
S[6] = (ROOM + ruth(150, mood='calm') + closed_eyes(150, 212) + spotlight(150, 256, 40, 0.2) + wave(70, 130, 200, 10, 2)
        + lbl(171, 40, 'לא משנים את הנשימה', size=12) + strike(171, 40, 150) + lbl(171, 90, 'רק שמים לב לנשימה שכבר מתרחשת', fill='#E3F4F0', size=11))
S[7] = room() + bodyscan(2) + lbl(171, 40, 'סריקת גוף: מאזור לאזור', fill='#E3F4F0')
S[8] = (ROOM + ruth(150) + closed_eyes(150, 212) + string(160, 196, 260, 110) + balloon(266, 96, plate(266, 92)) + hourglass(60, 90)
        + lbl(171, 40, 'ואחרי חצי דקה…', size=12) + lbl(266, 150, 'ארוחת הערב', size=11))
S[9] = (ROOM + ruth(150) + string(160, 196, 260, 110) + balloon(266, 96, plate(266, 92)) + spark(206, 160, 'lit')
        + lbl(171, 40, 'כלום. זה חלק מהתרגול', fill='#E3F4F0') + lbl(171, 300, 'שמתם לב? כבר שמתם לב', fill='#FFF1CC'))
S[10] = (ROOM + ruth(150, mood='calm') + spotlight(150, 256, 34, 0.2) + guide_phone(290, 120) + arrow(260, 130, 180, 230, AMBER)
         + lbl(80, 110, 'לנשימה', size=11) + lbl(80, 150, 'לאזור בגוף', size=11) + lbl(290, 70, 'לקול שמנחה', size=11) + lbl(171, 40, 'פשוט חוזרים', fill='#E3F4F0'))
S[11] = (ROOM + ruth(150, mood='calm') + string(160, 196, 230, 120) + balloon(236, 112) + returns(171, 300, 3)
         + lbl(171, 40, 'הקשב ינדוד · ושוב נחזיר אותו', size=11) + lbl(171, 80, 'לשים לב ולחזור: זה התרגול', fill='#FFF1CC'))
S[12] = (ROOM + ruth(150, mood='happy') + daycard(280, 120, 'sun', 'רגועים')
         + lbl(171, 40, 'רגועים · מחוברים יותר לגוף', fill='#E3F4F0'))
S[13] = (ROOM + ruth(150, mood='flat') + daycard(280, 120, 'cloud', '')
         + lbl(70, 90, 'עייפות', size=11) + lbl(70, 128, 'חוסר שקט', size=11) + lbl(70, 166, 'מתח', size=11) + lbl(171, 40, 'תחושה לא נעימה', size=11))
S[14] = (P + daycard(250, 150, 'sun', 'רגועים') + daycard(92, 150, 'cloud', 'עייפות') + f'<text x="171" y="160" text-anchor="middle" font-size="22" font-weight="700" fill="{INK}">=</text>'
         + lbl(171, 40, 'אין תוצאה שמנסים להגיע אליה', fill='#FFF1CC') + magnifier(171, 250)
         + lbl(70, 310, 'לשפוט', size=11) + strike(70, 310, 50) + lbl(171, 330, 'לשנות', size=11) + strike(171, 330, 50) + lbl(272, 310, 'לעשות משהו', size=11) + strike(272, 310, 70))
S[15] = (ROOM + ruth(166) + calm_disc(166, 250, 90) + tremor(196, 262) + arrow(130, 300, 110, 290, AMBER)
         + lbl(171, 40, 'לא צריך לשבת בלי לזוז', fill='#E3F4F0') + lbl(171, 90, 'צריך לזוז? זזים', size=12))
S[16] = (room() + chair() + ruth(110) + mat(190, 306, 140) + ruth_lie(222, 296) + closed_eyes(198, 294) + heart(171, 120)
         + lbl(110, 110, 'בישיבה', size=11) + lbl(260, 220, 'בשכיבה', size=11) + lbl(171, 40, 'כמה דקות של תשומת לב מכל הלב', fill='#FFF1CC', size=12))

ACTS = [
  (1, 'Act 1 · Your left hand', [1, 2, 3], 'The beam of attention from session 28 lands on Ruth\'s left hand. In close-up: touch, warmth, a tingle, tension. They were there before; only the beam moved.'),
  (2, 'Act 2 · Choosing where it goes', [4], 'The beam hops by itself from thought to thing; then Ruth takes hold of it and points it where she chooses.'),
  (3, 'Act 3 · Two practices', [5, 6, 7], 'Breath: a cutaway shows the air, the chest and the belly; the beam only watches the breath that is already there. Body scan: on the mat, area by area.'),
  (4, 'Act 4 · Thinking about dinner', [8, 9, 10, 11], 'Half a minute in, a balloon floats off to dinner. Nothing is wrong: noticing it is the spark. Back to the breath, the body or the guide\'s voice, as often as it takes.'),
  (5, 'Act 5 · No result to reach', [12, 13, 14], 'A sunny card one time, a cloudy one another; both are just what\'s there. No judging, changing or fixing.'),
  (6, 'Act 6 · Your way, today', [15, 16], 'Moving is part of the moment; sitting or lying, eyes open or closed. Ruth settles in for a few wholehearted minutes.'),
]
SHOT = {
 1: ('Ruth in her armchair. A warm beam (session 28) narrows from the whole room onto her left hand on the armrest: כף יד שמאל. Title: מפגש 29 · תשומת לב לנשימה וסריקת גוף.', 'Ruth\'s room, armchair. The beam of attention is session 28\'s anchor.', 'The beam narrows on "כף יד שמאל".'),
 2: ('Close-up of the hand (session 28\'s drawing) in the beam. Four marks, each on its word: a dashed line under the palm (המגע במשטח), a small thermometer (הטמפרטורה), amber dots (עקצוץ קטן), a wavy line (מתח או תנועה).', 'Hand close-up from 28.', 'Marks pop on their words.'),
 3: ('The beam drifts off the hand; the marks stay, only fainter: התחושות היו שם גם קודם. It comes back and they brighten: מה שהשתנה: תשומת הלב.', 'Same close-up.', 'Beam off and back; cut back to the room.'),
 4: ('In the room the beam hops by itself: a thought balloon, the clock, the window (ממחשבה למחשבה, מדבר לדבר). Then Ruth lifts her head; the beam slows and settles where she points it: אנחנו בוחרים לאן להפנות אותה.', 'Balloon and clock from sessions 3a/28.', 'Beam hops, then glides home under her control.'),
 5: ('Two practice cards (breath, body scan) deal in for a beat; the breath card opens into the side cutaway of Ruth\'s chest from 3b: air flows in and out, the chest and belly rise. Tags on the words: האוויר שנכנס ויוצא · הבטן · בית החזה.', 'Practice cards from 28; torso cutaway from 3b.', 'Card zooms into the cutaway.'),
 6: ('Back in the chair, eyes closed, the beam resting on her belly. Her own breath draws a soft, uneven wave. לא משנים את הנשימה, then: רק שמים לב לנשימה שכבר מתרחשת.', 'Breath wave from 3b, beam.', 'Wave draws as she breathes.'),
 7: ('Overhead, Ruth on the mat; the beam travels from her feet to her head, dots lighting one area at a time: סריקת גוף: מאזור לאזור.', 'Mat and overhead view from 3a/28.', 'Beam glides upward.'),
 8: ('Ruth practising, eyes closed; a small hourglass runs, then a balloon floats off on its string holding a plate and cutlery: ארוחת הערב. The beam follows it away.', 'Balloon on a string (3a, 28).', 'Balloon drifts up.'),
 9: ('Ruth opens her eyes: she noticed. A spark (session 2) lights between her and the balloon: כלום. זה חלק מהתרגול → שמתם לב? כבר שמתם לב.', 'The spark from session 2.', 'Spark pops on "שמתם לב".'),
 10: ('The string reels the balloon back; the beam returns to her belly. Three places to come back to: the breath, the body, and Ariel on her phone as the guiding voice: לנשימה · לאזור בגוף · לקול שמנחה.', 'Ariel on the phone (3a).', 'Each option lights on its word.'),
 11: ('The balloon drifts and returns again and again; each return lights a small dot in a row: הקשב ינדוד · ושוב נחזיר אותו → לשים לב ולחזור: זה התרגול.', 'Balloon, beam.', 'A dot per return.'),
 12: ('Ruth finishes, smiling; a sunny practice card (3a): רגועים · מחוברים יותר לגוף.', 'Day cards from 3a/28.', 'Card flips in.'),
 13: ('Another time: a cloudy card; Ruth\'s face neutral; tags around her on the words: עייפות · חוסר שקט · מתח · תחושה לא נעימה.', 'Same.', 'Cloud slides over the sun.'),
 14: ('Both cards side by side with an equals sign: אין תוצאה שמנסים להגיע אליה. The magnifier from 28 just looks; לשפוט · לשנות · לעשות משהו are struck through: רק שמים לב למה שנמצא.', 'Magnifier and struck tags from 28.', 'Strikes draw on each word.'),
 15: ('Ruth in the chair inside the circle of attention; her hand trembles, a leg shifts: לא צריך לשבת בלי לזוז → גם התנועתיות היא חלק מהרגע. She shifts to a comfier position: צריך לזוז? זזים.', 'Circle of attention and tremor marks from 3a.', 'She shifts; the cushion squashes.'),
 16: ('Sitting and lying side by side (3a); eyes open, then closed: בישיבה או בשכיבה · עיניים פקוחות או עצומות. The chair version stays; the beam widens into a warm glow over her: כמה דקות של תשומת לב מכל הלב.', 'Postures from 3a/28, the beam.', 'Split merges; glow fills the room.'),
}
legend1 = ('0 0 342 360', ROOM + ruth(150) + chair_hand(184, 264) + spotlight(184, 262, 40, 0.25), '<strong>The beam of attention.</strong> From session 28: what it lands on, Ruth notices. This time she learns to choose where it goes.')
legend2 = ('0 0 342 360', ROOM + ruth(150) + string(160, 196, 260, 110) + balloon(266, 96, plate(266, 92)), '<strong>The balloon on a string.</strong> Attention drifting (to dinner); noticing and reeling it back is the practice.')
legend3 = ('0 0 342 360', P + daycard(250, 150, 'sun', 'רגועים') + daycard(92, 150, 'cloud', 'עייפות'), '<strong>Day cards.</strong> From 3a: calm one time, tired another. Both count; there is no result to reach.')
carried = ['<strong>Kept:</strong> Ruth\'s room, armchair and mat, the beam and hand close-up (28), the balloon (3a), the breath wave and torso cutaway (3b), postures and day cards (3a), the spark (2), Ariel on the phone (3a).',
           '<strong>Not repeating 28:</strong> the new beats are choosing where the beam goes, the breath cutaway, the dinner balloon and the row of returns.',
           '<strong>Made the same way:</strong> beats on Ariel\'s pauses, one video with his voice. Veil kept light (0.28 at most).']
rows = build(B + 'S29Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 29 · תשומת לב לנשימה וסריקת גוף',
      'Attention works like a beam: the sensations were always there, and what changes is where we point it. In the two practices Ruth chooses where it goes, to the breath or through the body, and every time it drifts (to dinner), noticing and coming back is the practice itself. No result to reach.',
      'A beam lands on Ruth\'s hand and sensations appear → it hops around until she takes hold of it → it watches her breath, then travels through her body → it drifts to dinner, a spark as she notices, and back, again and again → sunny or cloudy, both are fine → she shifts, settles, and gives herself a few minutes.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
set_height(B + 'S29Story.dc.html', 5320)
print('rows', rows)
