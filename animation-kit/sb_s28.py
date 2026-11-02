# Session 28 storyboard: attention is a beam of light — wherever Ruth points it, sensations appear; practice is noticing where it drifted and bringing it gently back.
import sys
sys.path.insert(0, '.')
from sb_s25to37_kit import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S28.dc.html')
assert len(times) == 20

def hand_close(x=171, y=210):
    """Close-up: Ruth's left hand resting on the armrest."""
    return (f'<rect x="0" y="0" width="342" height="360" fill="#EFE7F3"></rect><rect x="-10" y="{y + 10}" width="362" height="70" rx="30" fill="#B9A6C9" stroke="{INK}" stroke-width="2.5"></rect>'
            f'<path d="M-10 {y - 10} L{x - 40} {y} " stroke="{PLUM}" stroke-width="44" stroke-linecap="round"></path>'
            f'<path d="M{x - 50} {y - 6} Q{x - 20} {y - 34} {x + 30} {y - 20} L{x + 76} {y - 22} Q{x + 86} {y - 14} {x + 76} {y - 8} L{x + 40} {y - 4} L{x + 80} {y} Q{x + 88} {y + 8} {x + 78} {y + 12} L{x + 30} {y + 14} Q{x - 20} {y + 24} {x - 50} {y + 14}Z" fill="{SKIN}" stroke="{INK}" stroke-width="2.5"></path>')

def spark_mark(x, y, kind):
    return {'touch': f'<path d="M{x - 20} {y} h40" stroke="{AMBER}" stroke-width="3" stroke-dasharray="4 4"></path>',
            'temp': f'<path d="M{x} {y - 14} v20" stroke="#E66A7A" stroke-width="5" stroke-linecap="round"></path><circle cx="{x}" cy="{y + 8}" r="6" fill="#E66A7A"></circle>',
            'tingle': ''.join(f'<circle cx="{x + dx}" cy="{y + dy}" r="2.4" fill="{AMBER}"></circle>' for dx, dy in ((-8, -4), (0, 6), (8, -6), (4, -12))),
            'move': f'<path d="M{x - 10} {y} q5 -6 10 0 t10 0" fill="none" stroke="{TEAL}" stroke-width="3"></path>'}[kind]

def bodyscan(k):
    """Ruth on the mat with the beam at point k (0 feet → 4 head)."""
    pts = [(222, 296), (190, 290), (150, 282), (110, 280), (72, 288)]
    x, y = pts[k]
    return lying(eyes_closed=True) + ''.join(f'<circle cx="{px}" cy="{py - 24}" r="4" fill="{AMBER if i <= k else "#FFFFFF"}" stroke="{INK}" stroke-width="1"></circle>' for i, (px, py) in enumerate(pts)) + spotlight(x, y, 40, 0.35)

def leaf(x, y, a, c='#6E9E58'):
    return f'<path d="M{x} {y} q{12 * a} -18 {26 * a} -6 q-10 14 -{26 * a} 6Z" fill="{c}" stroke="{INK}" stroke-width="1.2"></path>'

def magnifier(x, y):
    return f'<circle cx="{x}" cy="{y}" r="30" fill="#FFFFFF" fill-opacity=".3" stroke="{INK}" stroke-width="3"></circle><line x1="{x + 21}" y1="{y + 21}" x2="{x + 42}" y2="{y + 42}" stroke="{INK}" stroke-width="6" stroke-linecap="round"></line>'

S = {}
S[1] = (room() + chair() + ruth(150) + chair_hand(184, 264) + spotlight(184, 262, 34, 0.5)
        + lbl(171, 40, 'מפגש 28 · תשומת לב לנשימה ולסריקת גוף', fill='#E3F4F0') + lbl(250, 180, 'כף יד שמאל', size=12))
S[2] = (hand_close() + spotlight(190, 205, 130, 0.25) + spark_mark(180, 236, 'touch') + spark_mark(250, 160, 'temp') + spark_mark(120, 170, 'tingle') + spark_mark(240, 250, 'move')
        + lbl(260, 60, 'המגע במשטח', size=11) + lbl(171, 90, 'הטמפרטורה', size=11) + lbl(80, 60, 'עקצוץ קטן', size=11) + lbl(171, 320, 'מתח או תנועה', size=11))
S[3] = (hand_close() + f'<g opacity=".45">{spark_mark(180, 236, "touch")}{spark_mark(250, 160, "temp")}{spark_mark(120, 170, "tingle")}{spark_mark(240, 250, "move")}</g>'
        + lbl(171, 60, 'היו שם גם קודם', size=12) + lbl(171, 320, 'מה שהשתנה: תשומת הלב', fill='#FFF1CC'))
S[4] = (room() + chair() + ruth(150) + spotlight(290, 90, 30, 0.35) + balloon(290, 90) + f'<path d="M170 190 C200 120 250 100 270 96" fill="none" stroke="{AMBER}" stroke-width="2" stroke-dasharray="4 6"></path>'
        + arrow(250, 140, 186, 236, AMBER) + lbl(110, 100, 'לאן הקשב נדד?', size=11) + lbl(171, 40, 'ומחזירים ברכות לכאן ועכשיו', fill='#E3F4F0'))
S[5] = (room() + chair() + ruth(150) + glow(150, 252, 28, 20) + f'<path d="M38 292 C38 250 40 220 46 190" stroke="#4E8B5F" stroke-width="3" fill="none"></path>'
        + leaf(40, 270, 1) + leaf(42, 245, -1) + leaf(44, 222, 1) + leaf(46, 200, -1, '#9CC5A1')
        + lbl(110, 110, 'סקרנות', size=11) + lbl(250, 110, 'יציבות', size=11) + lbl(250, 150, 'אי מאמץ', size=11) + lbl(110, 150, 'חמלה עצמית', size=11)
        + lbl(171, 40, 'חוזרים שוב ושוב · מאמנים', fill='#FFF1CC'))
S[6] = (P + f'<rect x="190" y="90" width="120" height="160" rx="12" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect>' + tool(250, 150, 1, 28)
        + f'<rect x="32" y="90" width="120" height="160" rx="12" fill="#FFFFFF" stroke="{INK}" stroke-width="2"></rect><path d="M92 112 a12 12 0 1 1 0.1 0 M92 136 v50 M70 150 h44 M92 186 l-14 40 M92 186 l14 40" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round"></path><path d="M44 170 h96" stroke="{AMBER}" stroke-width="3"></path>'
        + lbl(250, 280, 'מודעות לנשימה', size=11) + lbl(92, 280, 'סריקת גוף', size=11) + lbl(171, 40, 'שני תרגילים מוכרים', fill='#E3F4F0'))
S[7] = (room() + chair() + ruth(150, mood='calm') + spotlight(150, 256, 40, 0.45) + anchor_icon(150, 256, 0.8) + wave(80, 150, 140, 10, 2)
        + lbl(171, 40, 'העוגן: הנשימה', fill='#E3F4F0'))
S[8] = room() + bodyscan(2) + lbl(171, 40, 'מעבירים את תשומת הלב בגוף', fill='#E3F4F0')
S[9] = (room() + chair() + ruth(150, mood='happy') + meter(280, 190, 0.25) + arrow(310, 120, 310, 190, '#5BAA6A')
        + lbl(90, 90, 'פחות מתח וחרדה', size=11) + lbl(90, 130, 'ויסות רגשות', size=11) + lbl(171, 290, 'רווחה נפשית לאורך זמן', size=11) + lbl(171, 40, 'מחקרים מראים', fill='#FFF1CC'))
S[10] = (room() + chair() + ruth(110) + mat(190, 306, 140) + ruth_lie(222, 296) + closed_eyes(198, 294)
         + lbl(110, 110, 'בישיבה', size=11) + lbl(260, 220, 'בשכיבה', size=11) + lbl(171, 40, 'עיניים פקוחות או עצומות', fill='#E3F4F0'))
S[11] = (room() + lying(eyes_closed=True) + string(76, 278, 250, 110) + balloon(256, 96) + sound(40, 160) + spark(110, 220, 'lit')
         + lbl(256, 150, 'תכנונים · מחשבות', size=11) + lbl(171, 40, 'ברגע ששמתם לב: רגע של קשיבות', fill='#FFF1CC'))
S[12] = (room() + lying(eyes_closed=True) + spotlight(140, 282, 44, 0.3) + string(76, 278, 150, 230) + balloon(150, 220) + head(72, 288, mood='happy')
         + lbl(171, 40, 'חוזרים, עם חיוך', fill='#E3F4F0') + lbl(171, 130, 'גם זה חלק מהתרגול', size=12))
S[13] = (room() + win('night') + lying(eyes_closed=True, blanket=True) + battery(270, 150, 0.7) + arrow(220, 190, 220, 120, '#5BAA6A') + lbl(171, 40, 'נרדמתם? זה גם בסדר', fill='#E3F4F0'))
S[14] = (P + daycard(171, 170, 'sun', 'רגועים ומרוכזים') + lbl(171, 40, 'אין תוצאה שצריך להגיע אליה', fill='#FFF1CC'))
S[15] = (P + daycard(250, 150, 'sun', 'רגועים') + daycard(92, 150, 'cloud', 'חוסר שקט')
         + lbl(92, 230, 'מוסחות · עייפות · רעשים', size=10) + lbl(171, 300, 'המציאות של הרגע הזה', fill='#E3F4F0') + f'<text x="171" y="160" text-anchor="middle" font-size="22" font-weight="700" fill="{INK}">=</text>')
S[16] = (room() + chair() + ruth(150) + magnifier(250, 200) + lbl(171, 40, 'שמים לב למה שיש', fill='#E3F4F0') + lbl(80, 100, 'לשפוט', size=11) + strike(80, 100, 50) + lbl(80, 140, 'לשנות', size=11) + strike(80, 140, 50))
S[17] = (room() + lying(eyes_closed=True) + calm_disc(171, 270, 120) + tremor(220, 270) + f'<path d="M84 270 q6 6 0 12" stroke="{SLATE}" stroke-width="2" fill="none"></path>'
         + lbl(250, 200, 'רעד', size=11) + lbl(171, 160, 'תנועות לא רצוניות', size=11) + lbl(80, 220, 'בליעה', size=11) + lbl(171, 40, 'גם זה חלק מהתרגול', fill='#FFF1CC'))
S[18] = (room() + lying(eyes_closed=False) + f'<path d="M150 250 q20 -20 40 0" stroke="{AMBER}" stroke-width="3" fill="none"></path>' + arrow(186, 246, 192, 254, AMBER) + cushion(250, 280)
         + lbl(171, 40, 'מקשיבים לגוף · ומתאימים', fill='#E3F4F0'))
S[19] = (room() + chair() + ruth(150) + roots(160, 316) + roots(176, 316) + spotlight(150, 240, 70, 0.25)
         + lbl(171, 40, 'פחות התנגדות · יותר יציבות', fill='#E3F4F0'))
S[20] = land(sun=True) + stones(PATH, lit=(0, 1)) + ruth(250, 'stand', 'happy') + lbl(171, 40, 'להתנסות ולראות מה עובד בשבילכם', fill='#FFF1CC')

ACTS = [
  (1, 'Act 1 · Your left hand', [1, 2, 3], 'The room dims and a beam of attention lands on Ruth\'s left hand; touch, warmth, tingling, tension appear. They were there before; only the beam moved.'),
  (2, 'Act 2 · Drifting, and coming back', [4, 5], 'The beam wanders from thought to thing on its own; Ruth notices and brings it gently back. Each return grows the plant: curiosity, steadiness, ease, self-compassion.'),
  (3, 'Act 3 · Two familiar practices', [6, 7, 8, 9], 'Breath awareness: the beam rests on the breath, an anchor. Body scan: it travels through the body. Research: less stress, better balance.'),
  (4, 'Act 4 · Before you start', [10, 11, 12, 13], 'Sit or lie, eyes open or closed. Drifting off and noticing is the moment of mindfulness; come back with a smile. Falling asleep is fine too.'),
  (5, 'Act 5 · No result to reach', [14, 15, 16], 'Calm one time, restless another; both are just this moment. Curious, not judging.'),
  (6, 'Act 6 · Moving is fine', [17, 18], 'Tremor, movement and swallowing are part of it; shifting position is listening to the body.'),
  (7, 'Act 7 · Steadier', [19, 20], 'With practice the beam steadies and Ruth meets things with more stability. Try it and see what works.'),
]
SHOT = {
 1: ('Ruth in her armchair; the room dims and a warm beam lands on her left hand on the armrest: כף יד שמאל. Title: מפגש 28 · תשומת לב לנשימה ולסריקת גוף.', 'Ruth\'s room. The beam is session 3a\'s circle of attention, now one she can move: the film\'s anchor.', 'Room dims; the beam settles.'),
 2: ('Close-up of the hand in the beam; four sensations appear in turn: המגע במשטח · הטמפרטורה · עקצוץ קטן · מתח או תנועה.', 'A careful close-up of the hand (not a zoom of the room).', 'Each mark on its word.'),
 3: ('The beam widens and the sensations show faintly even in the dim: היו שם גם קודם → מה שהשתנה: תשומת הלב.', 'Same close-up.', 'Beam moves off and back.'),
 4: ('Back in the room: the beam jumps by itself from a thought balloon to a clock to the window; Ruth notices (לאן הקשב נדד?) and draws it gently back to herself: ומחזירים ברכות לכאן ועכשיו.', 'Balloon from 3a/6.', 'Beam drifts, then returns.'),
 5: ('The beam keeps returning to her breath and body; each return the plant by the window grows a leaf: סקרנות · יציבות · אי מאמץ · חמלה עצמית.', 'The plant from every session.', 'Leaf on each quality.'),
 6: ('Two practice cards: מודעות לנשימה (the breath badge) and סריקת גוף (a figure with a scan line).', 'Breath badge from session 1.', 'Cards deal in.'),
 7: ('The beam rests on Ruth\'s belly; the anchor from 3a sits there as the breath wave moves: העוגן: הנשימה.', 'Anchor from 3a, breath wave from 3b.', 'Anchor settles.'),
 8: ('Ruth on the mat; the beam travels from her feet up through legs, belly and chest to her head, dots lighting along the way.', 'Mat from 3a.', 'Beam glides upward.'),
 9: ('Ruth smiling in the chair; the tension meter (3b) sinks: פחות מתח וחרדה · ויסות רגשות · רווחה נפשית לאורך זמן. Tag: מחקרים מראים.', 'Meter from 3b.', 'Meter drops.'),
 10: ('Two postures side by side, sitting and lying (3a); Ruth\'s eyes open, then close: עיניים פקוחות או עצומות.', 'Postures from 3a.', 'Eyes blink shut.'),
 11: ('On the mat, a balloon drifts off to plans and thoughts, and a sound from outside; a spark (session 2) lights the moment she notices: רגע של קשיבות.', 'Balloon; the spark from session 2.', 'Spark pops on "שמתם לב".'),
 12: ('The string draws the balloon back to her breath; Ruth smiles: חוזרים, עם חיוך · גם זה חלק מהתרגול.', 'Balloon, beam.', 'Balloon returns.'),
 13: ('Night at the window; Ruth has dozed off under a blanket, her battery (5) charging: נרדמתם? זה גם בסדר.', 'Battery from 5.', 'Window darkens.'),
 14: ('A sunny practice card (3a): רגועים ומרוכזים. Tag: אין תוצאה שצריך להגיע אליה.', 'Day cards from 3a.', 'Card flips.'),
 15: ('A cloudy card joins it: חוסר שקט, מוסחות, עייפות, רעשים. An equals sign between them: המציאות של הרגע הזה.', 'Same.', 'Second card flips.'),
 16: ('A curious magnifier looks at Ruth; לשפוט and לשנות are struck through: שמים לב למה שיש.', 'Struck tags from earlier sessions.', 'Strike lines draw.'),
 17: ('Inside the circle of attention: a tremor, a small involuntary movement, a swallow: גם זה חלק מהתרגול.', 'Circle and tremor marks from 3a.', 'Each mark on its word.'),
 18: ('Ruth shifts to a more comfortable position on the mat: מקשיבים לגוף · ומתאימים.', 'Mat, cushion.', 'She rolls and settles.'),
 19: ('Back in the chair, the beam steady around her and the roots (session 6) at her feet: פחות התנגדות · יותר יציבות.', 'Roots from session 6.', 'Beam steadies.'),
 20: ('Out on the path of stones, Ruth walks on: להתנסות ולראות מה עובד בשבילכם.', 'Path from session 1.', 'Stones light.'),
}
legend1 = ('0 0 342 360', room() + chair() + ruth(150) + chair_hand(184, 264) + spotlight(184, 262, 40, 0.5), '<strong>The beam of attention.</strong> Session 3a\'s circle, now a light Ruth can point: what it lands on, she feels.')
legend2 = ('0 0 342 360', room() + lying(eyes_closed=True) + string(76, 278, 250, 110) + balloon(256, 96), '<strong>The balloon.</strong> From 3a and 6: attention drifting off; noticing it and coming back is the practice.')
legend3 = ('0 0 342 360', room() + bodyscan(3), '<strong>The scan.</strong> On the mat, the beam travels through the body, or rests on the breath as an anchor.')
carried = ['<strong>Kept:</strong> Ruth\'s room and mat, the circle of attention, balloon, anchor, postures and day cards (3a), the meter and breath wave (3b), the spark (2), the battery (5), roots (6), the path (1).',
           '<strong>Close-up:</strong> the hand gets its own drawing, not a zoom into the room.',
           '<strong>Made the same way:</strong> beats on Ariel\'s pauses, one video with his voice.']
rows = build(B + 'S28Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 28 · מבוא לתשומת לב לנשימה ולסריקת גוף',
      'Attention works like a beam of light: what it lands on, we notice. Mindfulness practice trains moving it on purpose, to the breath or through the body, and gently bringing it back when it drifts, without judging or chasing a result.',
      'A beam lands on Ruth\'s hand and sensations appear → it drifts and she brings it back → it rests on her breath, then travels through her body → drifting, dozing, restless days are all part of it → tremor and moving too → the beam steadies.',
      [legend1, legend2, legend3], carried, 'How it fits the program')
set_height(B + 'S28Story.dc.html', 5950)
print('rows', rows)
