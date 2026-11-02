# Session 63 storyboard: the discomfort cycle — one café moment, the parts that feed each other, and a small change that turns it the other way.
import sys, math
sys.path.insert(0, '.')
from sb_common import *

B = 'artifact-files/79280df1-062f-40c5-86a9-f904218fbf5c/project/scripts/'
times, lines = read_board(B + 'S63.dc.html')
assert len(times) == 14
P = f'<rect width="342" height="360" fill="{PAPER}"></rect>'
WARM = '#E66A7A'
# the five parts, in the order Nira tells them (part 7), clockwise from the top
NODES = ['סימפטום בגוף', 'מחשבה', 'תשומת לב', 'רגש ומתח בגוף', 'מה שעשינו']
NC = ['#F7C9D4', '#D7DCE2', '#FFDEA3', '#EDE7F6', '#D6EBC8']

def cafe():
    return (f'<rect width="342" height="360" fill="#F6EBDD"></rect><rect x="0" y="300" width="342" height="60" fill="#E2D2BC"></rect><line x1="0" y1="300" x2="342" y2="300" stroke="{INK}" stroke-width="2"></line>'
            f'<path d="M20 40 h302 v30 q-15 14 -30 0 q-15 14 -30 0 q-15 14 -30 0 q-15 14 -30 0 q-15 14 -30 0 q-15 14 -30 0 q-15 14 -30 0 q-15 14 -30 0 q-15 14 -30 0 q-15 14 -32 0Z" fill="#E8A33D" stroke="{INK}" stroke-width="1.5"></path>'
            f'<rect x="60" y="230" width="222" height="14" rx="4" fill="#C9805A" stroke="{INK}" stroke-width="2"></rect><path d="M171 244 v56 M140 300 h62" stroke="{INK}" stroke-width="4"></path>')

def seat(x, who='ruth', mood='calm'):
    """A figure sitting at the café table, seen from the front (head and shoulders above the table)."""
    col = {'ruth': PLUM, 'f1': '#C98B6B', 'f2': '#5B8DB8'}[who]
    o = f'<path d="M{x - 22} 232 L{x - 22} 200 Q{x - 22} 186 {x} 186 Q{x + 22} 186 {x + 22} 200 L{x + 22} 232Z" fill="{col}" stroke="{INK}" stroke-width="2"></path>'
    if who == 'ruth': return o + head(x, 168, r=16, mood=mood)
    hair = '#3B2A24' if who == 'f1' else '#6B4A3A'
    return o + f'<circle cx="{x}" cy="168" r="16" fill="{SKIN}" stroke="{INK}" stroke-width="2"></circle><path d="M{x - 18} 166 C{x - 22} 140 {x + 22} 140 {x + 18} 166 C{x + 10} 156 {x - 10} 156 {x - 18} 166Z" fill="{hair}"></path><path d="M{x - 5} 174 Q{x} 179 {x + 5} 174" stroke="{INK}" stroke-width="1.5" fill="none"></path>'

def cup(x, y=226):
    return f'<rect x="{x - 9}" y="{y - 14}" width="18" height="16" rx="3" fill="#FFFFFF" stroke="{INK}" stroke-width="1.5"></rect>'

def spot(x, y, r=40):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SPARK}" opacity=".35" stroke="{AMBER}" stroke-width="2" stroke-dasharray="5 4"></circle>'

def node_xy(k, cx=171, cy=190, R=110):
    a = -math.pi / 2 + k * 2 * math.pi / 5
    return round(cx + R * math.cos(a)), round(cy + R * math.sin(a))

def cycle(n=5, cross=False, warm=(), tools=False, rev=False, labels=True, dark=False):
    o = ''
    pts = [node_xy(k) for k in range(5)]
    for k in range(min(n, 5) - (0 if n >= 5 else 1)):
        (x1, y1), (x2, y2) = pts[k], pts[(k + 1) % 5]
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        dx, dy = mx - 171, my - 190; d = math.hypot(dx, dy)
        cxp, cyp = 171 + dx / d * 140, 190 + dy / d * 140
        col = WARM if (k in warm or (k + 1) % 5 in warm) and warm else (INK if not dark else '#55606C')
        o += f'<path d="M{x1} {y1} Q{cxp:.0f} {cyp:.0f} {x2} {y2}" stroke="{col}" stroke-width="2.5" fill="none" stroke-dasharray="{"6 4" if rev else "none"}"></path>'
    if cross:
        for a, b in [(0, 2), (1, 3), (2, 4), (4, 1), (3, 0)]:
            (x1, y1), (x2, y2) = pts[a], pts[b]
            o += f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{SLATE}" stroke-width="1.5" stroke-dasharray="3 4" opacity=".8"></path>'
    for k in range(n):
        x, y = pts[k]
        fill = '#FFF1CC' if k in warm else NC[k]
        o += f'<circle cx="{x}" cy="{y}" r="24" fill="{fill}" stroke="{INK}" stroke-width="2"></circle>'
        if tools and k in TOOLMAP: o += tool(x + 20, y - 20, TOOLMAP[k], r=11)
        if labels: o += lbl(x, y + 36, NODES[k], size=9)
    return o

TOOLMAP = {1: 0, 2: 2, 3: 1, 4: 3}

S = {}
S[1] = cafe() + seat(260, 'f2') + seat(82, 'f1') + seat(171, 'ruth') + cup(150) + tremor(140, 214) + bubble(230, 120, '…', w=40, size=10).replace('#FFFFFF', '#F4F1EA') + lbl(171, 20, 'מפגש 63 · מעגל ההתמודדות עם קושי', size=11, fill='#E3F4F0')
S[2] = cafe() + seat(260, 'f2') + seat(82, 'f1') + seat(171, 'ruth', 'flat') + cup(150) + thought_card(171, 100, 'כולם רואים אותי, כולם מרחמים עליי', w=250)
S[3] = (cafe() + f'<rect width="342" height="360" fill="{INK}" opacity=".25"></rect>' + seat(260, 'f2') + seat(82, 'f1') + spot(171, 190, 54) + seat(171, 'ruth', 'flat') + cup(150)
        + bubble(260, 110, '…', w=50, size=12) + bubble(82, 110, '…', w=50, size=12) + lbl(171, 290, 'מתוחים · משתתפים פחות', size=11))
S[4] = room() + chair() + ruth(150, mood='flat') + phone(200, 210, '☕?') + lbl(171, 40, 'קצת יותר קשה להגיד כן', fill='#FFF1CC', size=12)
S[5] = P + ruth(171, 'stand') + f'<circle cx="171" cy="240" r="60" fill="none" stroke="{SLATE}" stroke-width="2" stroke-dasharray="4 4"></circle><circle cx="171" cy="220" r="120" fill="none" stroke="{AMBER}" stroke-width="2" stroke-dasharray="4 6"></circle>' + lbl(171, 40, 'מה שקורה בגוף, אבל לא רק', fill='#E3F4F0', size=12)
S[6] = P + cycle(labels=False) + lbl(171, 190, 'מעגל', fill='#FFF1CC')
S[7] = P + cycle() + tremor(171, 70, 2)
S[8] = P + cycle(cross=True, dark=True) + lbl(171, 340, 'המעגל ממשיך להתגלגל', size=11)
S[9] = P + cycle(warm=(1,), rev=True) + lbl(171, 340, 'שינוי קטן בחלק אחד', fill='#FFF1CC', size=11)
S[10] = (cafe() + seat(260, 'f2') + seat(82, 'f1') + seat(171, 'ruth') + cup(150) + thought_card(276, 96, 'כולם רואים אותי', w=100).replace('font-size="13"', 'font-size="9"')
         + spot(171, 190, 150).replace('opacity=".35"', 'opacity=".12"') + lbl(171, 290, 'מרחק · סביבנו · לשחרר מתח', size=11))
S[11] = room() + chair() + ruth(110) + battery(240, 110, 0.45, w=40, h=70, label=False) + lbl(240, 170, 'מה שאפשרי עכשיו', size=10) + lbl(171, 40, 'או דווקא לנוח', fill='#E3F4F0', size=12)
S[12] = P + cycle(tools=True)
S[13] = P + ''.join(tool(x, 190, k, r=24) for x, k in [(271, 0), (221, 1), (171, 2), (121, 3), (71, 4)]) + lbl(171, 100, 'הכלי "הנכון"', size=13) + strike(171, 100, 110) + lbl(171, 270, 'לא צריך את כל הדברים האלה', fill='#E3F4F0', size=11)
S[14] = cafe() + seat(260, 'f2') + seat(82, 'f1') + seat(171, 'ruth', 'happy') + cup(150) + bubble(171, 100, 'מה יכול לעזור לי כאן?', w=170, size=12, fill='#FFF1CC')

ACTS = [
  (1, 'Act 1 · At the café', [1, 2, 3, 4], 'Ruth with two friends. Her hand shakes, her voice is soft; a grey thought card; a spotlight on her every move; she shrinks back. Next time, "yes" is harder.'),
  (2, 'Act 2 · More than the body', [5, 6], 'The camera pulls back: the body, and more around it. The pieces arrange into a ring.'),
  (3, 'Act 3 · The cycle', [7, 8], 'Five parts, in Nira\'s order, each with its café icon: symptom → thought → attention → feeling and tension → what we did. Cross-links appear; the ring keeps turning.'),
  (4, 'Act 4 · The other direction', [9, 10, 11], 'One part turns warm and the warmth spreads. Back at the café: distance from the thought, a wider spotlight, shoulders drop; at home, a task that fits the battery, or rest.'),
  (5, 'Act 5 · What could help here?', [12, 13, 14], 'The tool badges settle on the parts. No need for all of them, no "right" one. At the café Ruth pauses and asks.'),
]
SHOT = {
 1: ('A café. Ruth sits between two friends. Her hand shakes a little on the cup; her speech bubble comes out small and faint. Title: מפגש 63 · מעגל ההתמודדות עם קושי.', 'The friends (session 5); tremor marks (3a).', 'Open on the table; push in a little.'),
 2: ('A grey thought card rises above her: "כולם רואים אותי, כולם מרחמים עליי". The friends are unchanged.', 'Thought cards (sessions 4, 7).', 'Card rises from her head.'),
 3: ('The café dims; a spotlight narrows on her hand and mouth. Her shoulders rise, she leans back; the friends\' bubbles carry on without her: מתוחים · משתתפים פחות.', 'Circle of attention (3a, 6) as a spotlight.', 'Light narrows; her bubbles stop.'),
 4: ('Home in her chair. A café invite on the phone; her thumb hovers: קצת יותר קשה להגיד כן.', 'Ruth\'s room and phone.', 'Cut home; phone buzzes.'),
 5: ('Ruth alone on paper. A circle around her body, then a bigger one around that: מה שקורה בגוף, אבל לא רק.', 'Ruth.', 'Pull back.'),
 6: ('The pieces of the café scene slide into a ring of five circles.', 'The café icons.', 'Pieces fly into place.'),
 7: ('The ring builds part by part on Nira\'s words, each with its café icon (shaking hand, grey card, spotlight, tense shoulders, Ruth stepping back): סימפטום בגוף → מחשבה → תשומת לב → רגש ומתח בגוף → מה שעשינו. Arrows draw between them.', 'The five icons from act 1.', 'Each part pops on its word; arrows follow.'),
 8: ('Thin dashed links appear across the ring too (every part touches the others). The ring starts to turn and darkens: המעגל ממשיך להתגלגל.', 'Same ring.', 'Ring rotates.'),
 9: ('The ring stops and turns the other way. One part goes warm and the warmth runs along the arrows: שינוי קטן בחלק אחד.', 'Same ring.', 'Warm colour spreads.'),
 10: ('Back at the café: the grey card floats to arm\'s length, the spotlight widens to the table and the friends, Ruth\'s shoulders drop: מרחק · סביבנו · לשחרר מתח.', 'Arm\'s length (4, 7), circle of attention (3a, 6), her shoulders from act 1.', 'Card drifts off; light opens.'),
 11: ('At home: a smaller task that fits her battery level, then rest on the chair: מה שאפשרי עכשיו · או דווקא לנוח.', 'The battery (session 5); Ruth\'s room.', 'Battery check, then she leans back.'),
 12: ('The ring returns; a tool badge settles on four parts: thoughts, attention and feelings, body, actions.', 'Tool badges (session 1).', 'Badges fly in from the backpack.'),
 13: ('Five tool badges in a row; a tag הכלי "הנכון" is struck through: לא צריך את כל הדברים האלה.', 'Struck tag (sessions 4, 7).', 'Strike draws.'),
 14: ('The café again, warmer now. Ruth pauses and asks: מה יכול לעזור לי כאן?', 'Café from act 1.', 'Back to the opening frame; hold.'),
}
legend1 = ('0 120 342 160', cafe() + seat(260, 'f2') + seat(82, 'f1') + seat(171, 'ruth') + cup(150), '<strong>The café.</strong> One everyday moment that opens and closes the film.')
legend2 = ('20 50 302 290', P + cycle(labels=False), '<strong>The cycle.</strong> Five parts in Nira\'s order; arrows round it and across it.')
legend3 = ('40 160 262 60', P + ''.join(tool(x, 190, k, r=24) for x, k in [(271, 0), (221, 1), (171, 2), (121, 3), (71, 4)]), '<strong>The tool badges.</strong> From the backpack (session 1): each part of the cycle has tools.')
carried = ['<strong>Kept:</strong> Ruth\'s room and phone, the friends and battery (session 5), thought cards and arm\'s length (4, 7), the circle of attention (3a, 6), the tool badges (1).', '<strong>The cycle</strong> follows the spec: its parts, arrows between non-adjacent parts too, influence both ways.', '<strong>Made the same way:</strong> beats on Nira\'s pauses, one video with her voice.']
rows = build(B + 'S63Story.dc.html', times, lines, S, ACTS, SHOT, 'Session 63 · להבין את מעגל ההתמודדות עם קושי',
      'A difficult moment is more than what happens in the body. A symptom, a thought, attention, feelings and tension, and what we do all feed each other in a cycle. The same cycle can turn the other way: a small change in one part helps the others.',
      'Ruth at a café, her hand shakes → a harsh thought, a spotlight, she shrinks back and later avoids → the moment becomes a ring of five parts that keeps turning → one part warms and the ring turns back → small changes at the café and at home → tools on each part → "what could help here?"',
      [legend1, legend2, legend3], carried, 'How it fits the program')
# preview height measured from a headless render of the board
H = 4380
p = B + 'S63Story.dc.html'; page = open(p, encoding='utf-8').read(); open(p, 'w', encoding='utf-8').write(page.replace('"height":4700', f'"height":{H}'))  # set_height
print('rows', rows)
